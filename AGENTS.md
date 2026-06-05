# fll2027 — Ghost CMS Theme

Custom Ghost theme for the FIRST LEGO League French National Festival 2027.
Fork of [TryGhost/Source](https://github.com/TryGhost/Source) with an embedded
"Evente" HTML template (Bootstrap 5, jQuery, ES5).

## Quick start

```bash
yarn install        # install deps (uses Yarn, NOT npm)
yarn dev            # gulp: build -> serve + livereload watcher
yarn test           # gscan .  (Ghost theme validator)
yarn test:ci        # gscan --fatal --verbose .
yarn zip            # build + package dist/fll2027.zip
```

Requires Node >= 22.12.0, Ghost >= 5.0.0.

## Build pipeline (gulp)

- **CSS:** `assets/css/screen.css` → PostCSS (easyimport, autoprefixer, cssnano) → `assets/built/screen.css`
- **JS:** `assets/js/lib/*.js` + `assets/js/*.js` → concat → uglify → `assets/built/source.js`
- **Locales:** merged via `@tryghost/theme-translations`

FLL custom CSS under `assets/css/fll/` is **not** processed by gulp — it is loaded
directly by Handlebars partials via `{{#contentFor "styles"}}` blocks.

FLL custom JS under `assets/js/` (hero.js, about.js, banner.js, slider.js, etc.)
is loaded the same way — individually per component, not through the gulp bundle.

## Test

`yarn test` runs **gscan** (Ghost theme validator). No unit tests, no JS tests,
no linter, no formatter, no typecheck.

## CI

`.github/workflows/deploy-theme.yml` — deploys to Ghost Admin API via
`TryGhost/action-deploy-theme@v1` on push to `main`/`master`. Secrets:
`GHOST_ADMIN_API_URL`, `GHOST_ADMIN_API_KEY`.

## Translation

- `locales/fr.json` — primary, fully translated
- `locales/en.json` — empty values (fallback to `{{t "key"}}` string)
- Usage: `{{t "Some string"}}` in `.hbs` files

## Architecture notes

- **Template hierarchy:** `default.hbs` (parent layout) → `home.hbs`, `index.hbs`,
  `post.hbs`, `page.hbs`, `tag.hbs`, `author.hbs` inject via `{{!< default}}`
- **Hero countdown:** hardcoded to March 26, 2027 18:00 CET in `assets/js/hero.js`
- **No monorepo** — single package at root
- **No pre-commit hooks** — no husky, lefthook, or commitlint
- **ES5 + jQuery** — all custom JS uses `(function($) { ... })(jQuery)`
- **Ghost membership** partially implemented (sign-in, subscribe forms);
  footer signup currently disabled in `home.hbs`
