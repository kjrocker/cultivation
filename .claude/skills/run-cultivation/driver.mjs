#!/usr/bin/env node
// Headless-Chromium driver for the cultivation planner.
//
// Reads one command per line from stdin (or from a file passed as argv[2]) and
// runs it against a Chromium page pointed at the dev server. It exists because
// this repo has no chromium-cli: @playwright/test is already a devDependency and
// its chromium is already downloaded, so playwright-core is the browser handle.
//
// It also starts (and stops) its own vite server, so one command is the whole
// run — see the comment on `server` below for why that matters.
//
//   node .claude/skills/run-cultivation/driver.mjs <<'EOF'
//   nav
//   ready
//   screenshot planner
//   EOF
//
// Every command prints `ok <cmd> ...` or `ERR <cmd> ...`; a failing command
// sets the exit code to 1 but does NOT abort the rest of the script, so one
// run reports every problem instead of only the first.

// @playwright/test pulls in `playwright-core`, not `playwright` — importing the
// latter is ERR_MODULE_NOT_FOUND here.
import { chromium } from 'playwright-core';
import { mkdirSync, readFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { spawn } from 'node:child_process';

// driver.mjs lives at <repo>/.claude/skills/run-cultivation/, so the repo root
// is three levels up.
const ROOT = new URL('../../../', import.meta.url).pathname;
// SERVE=preview serves ./build (what GitHub Pages gets) instead of the dev
// server. Run `yarn build` first — preview does not build.
const MODE = process.env.SERVE === 'preview' ? 'preview' : 'dev';
const PORT = process.env.PORT ?? (MODE === 'preview' ? '4173' : '5173');
const BASE = process.env.APP_URL ?? `http://localhost:${PORT}/cultivation`;
// TMPDIR, not /tmp — a sandboxed agent shell usually cannot write /tmp directly.
const SHOTS = process.env.SHOT_DIR ?? `${process.env.TMPDIR ?? '/tmp'}/cultivation-shots`;
// +layout.svelte renders "Loading..." until all six static stores resolve, so
// the species select is the marker that the planner itself is on screen.
const READY = 'select[name="species"]';

mkdirSync(SHOTS, { recursive: true });

const reachable = async () => {
	try {
		await fetch(BASE, { signal: AbortSignal.timeout(1000) });
		return true;
	} catch {
		return false;
	}
};

// The driver starts its own vite server unless one is already answering. An
// agent shell may put each background command in its own network namespace, so
// a server launched by some *other* shell can be invisible here even though it
// is running; owning the child process is what makes a single command work.
let server = null;
if (await reachable()) {
	console.log(`ok server (reusing ${BASE})`);
} else {
	// vite directly, not `yarn dev` — killing the yarn wrapper orphans the server.
	server = spawn(`${ROOT}node_modules/.bin/vite`, [MODE, '--port', PORT, '--strictPort'], {
		cwd: ROOT,
		stdio: 'ignore'
	});
	const deadline = Date.now() + 60000;
	while (!(await reachable())) {
		if (Date.now() > deadline) {
			console.log('ERR server did not come up on ' + BASE);
			server.kill('SIGKILL');
			process.exit(1);
		}
		await new Promise((r) => setTimeout(r, 500));
	}
	console.log(`ok server (started vite on ${BASE})`);
}

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();

const consoleErrors = [];
page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()));
page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e.message}`));

let failed = false;
let shotN = 0;

// `text=Foo` / `role=...` pass through to Playwright's selector engines; a bare
// string is a CSS selector.
const loc = (sel) => page.locator(sel);

const commands = {
	// nav [path-or-url] — defaults to the app root under the /cultivation base path
	async nav(rest) {
		const target = !rest ? BASE : /^https?:/.test(rest) ? rest : `${BASE}${rest}`;
		await page.goto(target, { waitUntil: 'domcontentloaded' });
		return target;
	},
	// ready — wait for the planner to finish loading its JSON data
	async ready() {
		await loc(READY).waitFor({ state: 'visible', timeout: 30000 });
		return READY;
	},
	async 'wait-for'(rest) {
		await loc(rest).first().waitFor({ state: 'visible', timeout: 30000 });
		return rest;
	},
	async click(rest) {
		await loc(rest).first().click();
		return rest;
	},
	// fill <selector> <value...>  (empty value clears the field)
	async fill(rest) {
		const [sel, ...v] = rest.split(' ');
		await loc(sel).first().fill(v.join(' '));
		return rest;
	},
	// select <selector> <option-value>
	async select(rest) {
		const [sel, ...v] = rest.split(' ');
		await loc(sel).first().selectOption(v.join(' '));
		return rest;
	},
	async press(rest) {
		const [sel, key] = rest.split(' ');
		await loc(sel).first().press(key);
		return rest;
	},
	// text <selector> — print the element's trimmed innerText
	async text(rest) {
		const t = await loc(rest).first().innerText();
		return `${rest} => ${t.replace(/\s+/g, ' ').trim()}`;
	},
	// count <selector> — how many match (0 is a legal answer, not an error)
	async count(rest) {
		return `${rest} => ${await loc(rest).count()}`;
	},
	// eval <js> — runs in the page, result JSON-stringified
	async eval(rest) {
		return JSON.stringify(await page.evaluate(rest));
	},
	// dark on|off — the app has no theme toggle, it reads prefers-color-scheme
	async dark(rest) {
		await page.emulateMedia({ colorScheme: rest === 'off' ? 'light' : 'dark' });
		return rest || 'on';
	},
	// screenshot [name] — full-page png into SHOT_DIR
	async screenshot(rest) {
		const name = rest || `shot-${++shotN}`;
		const path = `${SHOTS}/${name}.png`;
		// animations:'disabled' fast-forwards the slide-over transition — without it
		// a shot taken right after `click Backup` catches the panel half-faded.
		await page.screenshot({ path, fullPage: true, animations: 'disabled' });
		return path;
	},
	// shot-el <name> <selector> — crop to one component
	async 'shot-el'(rest) {
		const [name, ...s] = rest.split(' ');
		const path = `${SHOTS}/${name}.png`;
		await loc(s.join(' ')).first().screenshot({ path, animations: 'disabled' });
		return path;
	},
	// console — dump everything the page logged as an error since launch
	async console() {
		return consoleErrors.length ? `\n  ${consoleErrors.join('\n  ')}` : '(none)';
	}
};

const run = async (line) => {
	const trimmed = line.trim();
	if (!trimmed || trimmed.startsWith('#')) return;
	const [cmd, ...rest] = trimmed.split(' ');
	if (cmd === 'quit' || cmd === 'exit') return 'STOP';
	const fn = commands[cmd];
	if (!fn) {
		failed = true;
		console.log(`ERR unknown command: ${cmd}`);
		return;
	}
	try {
		console.log(`ok ${cmd} ${(await fn(rest.join(' '))) ?? ''}`);
	} catch (e) {
		failed = true;
		console.log(`ERR ${cmd} ${rest.join(' ')} :: ${e.message.split('\n')[0]}`);
	}
};

const source = process.argv[2] ? readFileSync(process.argv[2], 'utf8').split('\n') : null;

if (source) {
	for (const line of source) if ((await run(line)) === 'STOP') break;
} else {
	const rl = createInterface({ input: process.stdin, terminal: false });
	// Prompt goes to stderr so `ready`-polling on stdout stays clean under tmux.
	process.stderr.write('driver> ');
	for await (const line of rl) {
		if ((await run(line)) === 'STOP') break;
		process.stderr.write('driver> ');
	}
}

await browser.close();
if (server) server.kill('SIGTERM');
process.exit(failed ? 1 : 0);
