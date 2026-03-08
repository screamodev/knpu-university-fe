# KNPU university — Frontend

Frontend for the University. Built with Nuxt 4 and TypeScript.

## Stack

- **Nuxt 4** — Vue framework
- **TypeScript**
- **Vue 3**

## Architecture

This project uses **[Feature-Sliced Design (FSD)](https://feature-sliced.design/ru/docs/get-started/overview)** for code structure.

FSD is an architectural methodology for frontend applications: a set of rules and conventions for organizing code. Code is split into:

- **Layers** (top to bottom): `app`, `pages`, `widgets`, `features`, `entities`, `shared`. (`processes` is deprecated.) Modules on a layer may only import from layers below.
- **Slices** — group code by business domain within a layer.
- **Segments** — group code by technical purpose within a slice (e.g. `ui`, `model`, `api`, `lib`, `config`).

The app source will be organized according to FSD (e.g. under Nuxt’s `app/` with FSD-style layers and segments).

## Internationalization (i18n)

Two locales: **uk** (default, no URL prefix) and **en** (prefix `/en/`).

### How it works

| Layer | What it does |
|---|---|
| `nuxt.config.ts` → `i18n` | Configures `@nuxtjs/i18n` v10: locales, `prefix_except_default` strategy, `langDir: 'locales'`, `lazy: false` (eager load). |
| `app/locales/{uk,en}.json` | **Primary locale files.** All translation keys live here. Loaded by the module via `langDir` and also merged by the plugin (belt-and-suspenders). |
| `locales/{uk,en}.json` (root) | Mirror of `app/locales/`. Exists because `langDir` resolution differs across Nuxt/module versions. **Keep in sync with `app/locales/`.** |
| `app/plugins/i18n-messages.ts` | Startup plugin that merges `app/locales/*.json` into the global Vue I18n instance via `mergeLocaleMessage`. Safety net for key availability. |
| `app/composables/useSafeT.ts` | Safe wrappers around `useI18n()` with try/catch fallbacks. Three flavours — see comments in the file. |

### Translation key conventions

Navigation keys follow the pattern `nav.<section>.<item>` with three groups:

- `nav.labels.*` — top-level nav button labels (e.g. `nav.labels.admissions`)
- `nav.<section>.*` — mega-menu column titles (e.g. `nav.admissions.levels`)
- `nav.links.*` — individual link labels (e.g. `nav.links.bachelor`)

These keys are defined in `app/composables/useNavigation.ts` as static strings and resolved via `t(key)` in templates.

### Known pitfalls

1. **`useScope: 'global'` is required in layout components.**
   `useSafeI18nWithRouter()` must call `useI18n({ useScope: 'global' })`.
   Without it, Vue I18n creates a component-local scope. Layout components
   (NavList, MegaMenu, MobileNav, UtilityBar) persist across route changes
   and never re-mount, so the local scope's `t()` stops reacting to global
   locale changes. Symptom: after switching language, nav items show raw keys
   like `nav.admissions.levels`; only a full reload fixes it.

2. **Two locale directories must stay in sync.**
   `app/locales/` and root `locales/` both exist because `@nuxtjs/i18n`'s
   `langDir` resolution path varies. If you add a key, add it to both.
   Long-term: consolidate into one source of truth.

3. **`useSafeT()` / `useSafeI18n()` are NOT reactive.**
   They call `$i18n.global.t()` directly without reading a reactive `locale`
   ref. This is fine for page components (they re-mount on navigation) but
   must NOT be used in layout components. Use `useSafeI18nWithRouter()` there.

## References

- [Nuxt 4 — TypeScript](https://nuxt.com/docs/4.x/guide/concepts/typescript)
- [Feature-Sliced Design — Overview](https://feature-sliced.design/ru/docs/get-started/overview)

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm run preview
```
