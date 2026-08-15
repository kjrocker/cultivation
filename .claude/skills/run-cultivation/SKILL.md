---
name: run-cultivation
description: Build, run, and drive the cultivation body-planner SPA. Use when asked to start the app, screenshot its UI, check a change in the running app, drive the planner headlessly, or run its unit/e2e tests.
---

A client-side SvelteKit SPA (no backend, no SSR) served under the `/cultivation`
base path. Drive it with **`.claude/skills/run-cultivation/driver.mjs`** — a
headless-Chromium REPL that reads one command per line from stdin. The driver
**starts and stops its own vite server**, so a single `node …/driver.mjs <<EOF`
block is the whole run. There is no `chromium-cli` here; the driver is it.

All paths below are relative to the repo root.

## Prerequisites

Node 24 and yarn 4 (already on PATH here). Chromium for Playwright, once:

```bash
npx playwright install chromium
```

That prints `BEWARE: your OS is not officially supported by Playwright;
downloading fallback build.` on this Fedora host — harmless, the fallback build
works. No `apt-get` was needed: Chromium launched with no missing `.so`.

## Setup

```bash
yarn install
```

## Run (agent path)

Pipe commands to the driver. It starts vite, drives the page, kills vite on exit:

```bash
node .claude/skills/run-cultivation/driver.mjs <<'EOF'
nav
ready
fill input[name="name"] Iron Turtle
select select[name="species"] turtle
wait-for li:has-text("Carapace")
select select[name="law"] Body_Gong_2
wait-for text=Barbarian God Heart
click li:has-text("Skull")
wait-for text=Steel Bone
click text=Steel Bone
text li:has-text("Skull")
screenshot planner
dark on
screenshot planner-dark
console
EOF
```

Every line prints `ok <cmd> …` or `ERR <cmd> … :: <reason>`. A failing line does
not abort the rest — the run reports every problem and exits 1.

Screenshots land in **`$TMPDIR/cultivation-shots/`** (`/tmp/cultivation-shots`
if `TMPDIR` is unset); the driver prints each full path. Read them — a blank or
half-rendered page is the normal failure mode, not an error message.

| command | what it does |
|---|---|
| `nav [path]` | goto `http://localhost:5173/cultivation` + optional path |
| `ready` | wait for the planner (data JSON resolved) — do this after every `nav` |
| `wait-for <sel>` | wait for first match to be visible (30s) |
| `click <sel>` / `fill <sel> <v>` / `select <sel> <v>` / `press <sel> <key>` | act |
| `text <sel>` / `count <sel>` | read innerText / match count back |
| `eval <js>` | run JS in the page, print the JSON result |
| `dark on` / `dark off` | flip `prefers-color-scheme` (applies live, no reload) |
| `screenshot [name]` | full-page png |
| `shot-el <name> <sel>` | crop to one element |
| `console` | dump page errors collected since launch |
| `quit` | stop |

Bare selectors are CSS; `text=…` and `li:has-text("…")` are Playwright engines.

Env overrides: `SERVE=preview` serves `./build` on :4173 instead of the dev
server (run `yarn build` first — preview does not build), `PORT=…`,
`SHOT_DIR=…`, `APP_URL=…`.

```bash
yarn build
SERVE=preview node .claude/skills/run-cultivation/driver.mjs <<'EOF'
nav
ready
screenshot preview
EOF
```

For iterative poking, run the same command without a heredoc and type
commands at the `driver> ` prompt (the prompt goes to stderr, so piped
stdout stays clean).

## Run (human path)

```bash
yarn dev     # → http://localhost:5173/cultivation, Ctrl-C to stop
```

The root URL redirects to `/cultivation` under `yarn dev` but **not** under
`yarn preview` — hit the full path there.

## Test

```bash
yarn test:ci        # what CI runs: lint + 5 files, 20 tests, ~1s
yarn vitest --run   # unit tests alone, skipping the lint gate
yarn e2e            # builds, previews on :4173, 4 playwright tests, ~4s
```

`yarn test:ci` exits 0. Its eslint half prints **60 warnings, 0 errors** —
mostly `no-explicit-any` in the XML readers, which are deliberately untyped.
That is the expected baseline, not a regression.

## Gotchas

- **Don't start the server in a separate Bash call.** Background commands in an
  agent shell can land in their own network namespace: `yarn dev` reports
  `ready`, its log looks perfect, and `curl localhost:5173` from the next call
  still returns `000` with no listener in `ss -ltn`. This is exactly why the
  driver spawns vite itself. If you must run a server separately, start it and
  drive it in the *same* Bash invocation.
- **`import 'playwright'` fails.** `@playwright/test@1.28` installs
  `playwright-core` only; `playwright` is not in `node_modules`. Import
  `playwright-core`.
- **Don't remove `/.claude` or `/.mcp.json` from `.prettierignore`.** The agent
  sandbox replaces those paths with unreadable char devices (`crw-rw-rw- nobody
  nobody 1, 3`), so prettier walking the tree dies with `EACCES: permission
  denied, open '.mcp.json'` and takes `yarn test:ci` down with it. They are
  invisible to GitHub Actions, so this breaks agents only — and silently, since
  the file exists in `ls` but reads as `/dev/null`.
- **Quench labels are unsemantic `div`s.** The tempering list items have no
  `role`, no `li`, no button — just `div.cursor-pointer`. `li:has-text("Steel
  Bone")` matches nothing. Click them with `text=Steel Bone`.
- **One label click can bump the count by more than one.** Clicking `Steel Bone`
  takes Skull from `0/8` to `2/8` — `tempering-config.ts` inheritance pulls in
  the prerequisite `Tempered Bone` too. Assert the resulting count, not `+1`.
- **Hover tooltips overlay the next target.** After clicking a label the mouse
  stays there and a tooltip (`Attack +320%`) covers the row below, so a
  follow-up click can silently hit the tooltip. Move on to a different region
  or re-`click` by text rather than position.
- **Screenshots catch the slide-over mid-fade.** Backup/Restore panels animate
  in; a raw `page.screenshot` right after the click shows a half-transparent
  panel. The driver passes `animations: 'disabled'` — keep it if you edit.
- **The browser never parses XML.** It fetches `static/Data/*.json`. Editing
  anything under `ACS/` or `src/lib/data/xml/` changes nothing in the running
  app until that JSON is regenerated (see CLAUDE.md).
- **Vite reloads on any repo file change.** A large concurrent edit (e.g. a git
  operation moving many files) mid-run produces `pageerror: __sveltekit_<hash>
  is not defined` — the HTML and JS chunks came from different module graphs.
  It is not an app bug; re-run the driver.

## Troubleshooting

- **`ERR nav … net::ERR_CONNECTION_REFUSED`**: a server was started by a
  different shell and isn't visible here. Let the driver start its own — don't
  pre-launch one.
- **`Error: ENOENT: no such file or directory, mkdir '/tmp/cultivation-shots'`**:
  the sandbox can't write `/tmp`. The driver now defaults to `$TMPDIR`; pass
  `SHOT_DIR=…` if you need somewhere else.
- **`ERR ready … locator.waitFor: Timeout 30000ms exceeded`**: the page is stuck
  on `Loading...` because one of the six data stores never resolved. Run
  `console` — a 404 on `/cultivation/Data/*.json` means the JSON is missing.
- **`ERR click … Timeout 30000ms exceeded` with `count <sel> => 0`**: the
  selector matched nothing. Use `eval` to inspect the real markup, e.g.
  `eval [...document.querySelectorAll('*')].filter(e=>e.textContent.trim().startsWith('Steel Bone')&&e.children.length<3).map(e=>e.tagName+'.'+e.className).slice(0,6)`
