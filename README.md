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
