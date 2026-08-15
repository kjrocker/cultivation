# Cultivation

A body cultivation planner for [Amazing Cultivation Simulator](https://store.steampowered.com/app/1048540/Amazing_Cultivation_Simulator/).

Pick a species and a body law, temper and quench body parts, equip secret bodies, and see the
resulting attack/defense/resistance and modifier totals as you build. Builds can be exported as a
code and pasted back in later.

The data is read straight out of the game's own settings files, so the numbers match the game
rather than a hand-maintained spreadsheet.

Runs entirely in the browser — no backend, nothing stored server-side.

## Development

Requires Node and [yarn](https://yarnpkg.com/).

```bash
yarn install
yarn dev          # http://localhost:5173/cultivation
```

The app is served under the `/cultivation` base path because it is deployed to GitHub Pages. The
dev server redirects the root there; `yarn preview` does not, so use the full path against a
preview build.

### Checks

```bash
yarn test         # unit tests (vitest, watch mode)
yarn test:ci      # lint + unit tests, exactly what CI runs
yarn lint         # prettier + eslint
yarn format       # apply prettier
yarn check        # svelte-check
```

End-to-end tests use Playwright and need browsers installed once:

```bash
npx playwright install chromium
yarn e2e          # builds, previews on :4173, then runs tests/
```

### Game data

`ACS/` holds the game's shipped XML settings files, including the official English translation tree.
Those are parsed and flattened into `static/Data/*.json`, which is what the app actually fetches at
runtime — the browser never parses XML.

`ACS/` sits outside `static/` on purpose. It is a build _input_, not something the site serves:
everything in `static/` is copied verbatim into `build/`, so while the XML lived there it shipped
156M of files to production that no client ever requested.

Regenerate that JSON after changing anything under `ACS/` or any reader in `src/lib/data/xml/`, and
commit the result:

```bash
yarn json
```

If the set of XML files changes, also regenerate the file-name union types:

```bash
./makeList.sh     # rewrites src/types/settings.ts and src/types/language.ts
```

Note that exported build codes reference game data by index, so reordering entries in the source
data invalidates previously exported builds.

## Building

```bash
yarn build        # static output in ./build
yarn preview      # serve that build locally
```

Pushes to `main` build and deploy to GitHub Pages automatically.
