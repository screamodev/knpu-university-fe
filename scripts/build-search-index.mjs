#!/usr/bin/env node
/**
 * Build the static half of the site search index.
 *
 * Most of this site's text never reaches Directus: the copy of the 135 template pages lives in the
 * locale files, and the migrated faculty and prose pages are committed JSON. None of it changes
 * between deploys, so it is indexed here, once, and shipped inside the server bundle as
 * `server/assets/search-static.json`. The runtime half (Directus rows) is fetched and merged by
 * `server/utils/search/directus.ts`.
 *
 * Wired into `pnpm build`, so `docker/Dockerfile.prod` picks it up with no changes.
 *
 *     node scripts/build-search-index.mjs
 *     node scripts/build-search-index.mjs --verbose
 */

import { createJiti } from 'jiti'
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const APP = join(ROOT, 'app')
const PAGES = join(APP, 'pages')
const OUT = join(ROOT, 'server', 'assets', 'search-static.json')

// The app's own utilities are TypeScript and use the `~` alias; jiti gives us the real thing
// instead of a second, drifting copy of the same rules.
const jiti = createJiti(import.meta.url, { alias: { '~': APP, '~~': ROOT, '@': APP, '@@': ROOT } })

const { stripHtml, collapse, summarize, chunkText } = await jiti.import(
  join(ROOT, 'server/utils/search/text.ts'),
)
const { localeNamespaceRoute, LOCALE_PAGE_NAMESPACES, LOCALE_ROUTE_OVERRIDES } = await jiti.import(
  join(APP, 'utils/searchRoutes.ts'),
)
const { STRUCTURE_UNITS, STRUCTURE_GROUPS, STRUCTURE_ASSOCIATIONS } = await jiti.import(
  join(APP, 'utils/structure.ts'),
)

const verbose = process.argv.includes('--verbose')
const warnings = []

// ── helpers ──────────────────────────────────────────────────────────────────

const readJson = path => JSON.parse(readFileSync(path, 'utf8'))

/** Every route that actually exists, so a mapping can be checked rather than trusted. */
function collectRoutes(dir = PAGES, prefix = '') {
  const routes = new Set()
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      for (const route of collectRoutes(full, `${prefix}/${entry}`)) routes.add(route)
      continue
    }
    if (!entry.endsWith('.vue')) continue
    routes.add(entry === 'index.vue' ? prefix || '/' : `${prefix}/${entry.slice(0, -4)}`)
  }
  return routes
}

const ROUTES = collectRoutes()

function pushDocs(documents, { type, locale, url, title, text, date = null, idBase }) {
  const chunks = chunkText(text)
  chunks.forEach((chunk, index) => {
    documents.push({
      id: `${type}:${locale}:${idBase}:${index}`,
      type,
      locale,
      url,
      title,
      summary: summarize(chunk),
      body: chunk,
      date,
    })
  })
  return chunks.length
}

/** All leaf strings under a locale subtree, in order. */
function leafStrings(node, out = []) {
  if (typeof node === 'string') {
    const value = collapse(node)
    // Skip URLs and lone punctuation — they add noise and never help a query.
    if (value && value.length > 1 && !/^https?:\/\//.test(value)) out.push(value)
  }
  else if (Array.isArray(node)) {
    for (const item of node) leafStrings(item, out)
  }
  else if (node && typeof node === 'object') {
    for (const value of Object.values(node)) leafStrings(value, out)
  }
  return out
}

// ── feed 1: template pages, from the locale files ────────────────────────────

function localeDocuments(locale) {
  const messages = readJson(join(APP, 'locales', `${locale}.json`))
  const navLabels = messages.nav?.links ?? {}
  const documents = []
  const skipped = []

  const add = (route, key, node) => {
    const strings = leafStrings(node)
    if (!strings.length) return
    if (!ROUTES.has(route)) {
      skipped.push(`${key} → ${route}`)
      return
    }
    const title = collapse(node?.title) || collapse(navLabels[key.split('.').pop()]) || route
    pushDocs(documents, {
      type: 'page',
      locale,
      url: route,
      title,
      text: strings.join('\n'),
      idBase: key,
    })
  }

  for (const [namespace, node] of Object.entries(messages)) {
    if (!node || typeof node !== 'object') continue

    const rootRoute = localeNamespaceRoute(namespace)
    if (rootRoute) {
      add(rootRoute, namespace, node)
      continue
    }

    if (namespace !== 'standalonePages' && !LOCALE_PAGE_NAMESPACES.includes(namespace)) continue

    for (const [child, childNode] of Object.entries(node)) {
      if (!childNode || typeof childNode !== 'object') continue
      const route = localeNamespaceRoute(namespace, child)
      if (!route) continue
      add(route, `${namespace}.${child}`, childNode)
    }
  }

  // The homepage collects several namespaces; merge them into one document per locale.
  return { documents, skipped }
}

// ── feed 2: migrated prose pages ─────────────────────────────────────────────

/**
 * Which route renders which `app/content/pages/<slug>.json`.
 *
 * Read out of the templates rather than hardcoded, so a new static page is picked up without
 * touching this script. The councils are the one case that cannot be read: `/science/boards`
 * renders three of them from a `v-for`, inside accordions, with no URL of their own.
 */
function staticPageRoutes() {
  const map = new Map()
  const scan = (dir, prefix = '') => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry)
      if (statSync(full).isDirectory()) {
        scan(full, `${prefix}/${entry}`)
        continue
      }
      if (!entry.endsWith('.vue')) continue
      const route = entry === 'index.vue' ? prefix || '/' : `${prefix}/${entry.slice(0, -4)}`
      const source = readFileSync(full, 'utf8')
      for (const match of source.matchAll(/StaticPageBody[^>]*\bslug="([^"]+)"/g)) {
        map.set(match[1], route)
      }
    }
  }
  scan(PAGES)
  for (const slug of ['council-d-64-053-01', 'council-d-64-053-08', 'council-k-64-053-05']) {
    map.set(slug, '/science/boards')
  }
  return map
}

function staticPageDocuments() {
  const dir = join(APP, 'content', 'pages')
  const routes = staticPageRoutes()
  const documents = []
  const orphans = []

  for (const file of readdirSync(dir).filter(name => name.endsWith('.json'))) {
    const [slug, locale] = file.replace(/\.json$/, '').split('.')
    const route = routes.get(slug)
    if (!route) {
      orphans.push(slug)
      continue
    }
    const content = readJson(join(dir, file))
    const title = collapse(content.title) || slug
    for (const [index, section] of (content.sections ?? []).entries()) {
      const text = stripHtml(section.html)
      if (!text) continue
      pushDocs(documents, {
        type: 'page',
        locale: locale === 'en' ? 'en' : 'uk',
        url: route,
        title: section.heading ? `${title} — ${collapse(section.heading)}` : title,
        text,
        idBase: `${slug}:${index}`,
      })
    }
  }

  return { documents, orphans }
}

// ── feed 3: faculty and unit tabs ────────────────────────────────────────────

function structureDocuments() {
  const dir = join(APP, 'content', 'structure')
  const manifest = readJson(join(dir, 'manifest.json'))
  const documents = []

  const tabLabels = {}
  for (const locale of ['uk', 'en']) {
    const messages = readJson(join(APP, 'locales', `${locale}.json`))
    tabLabels[locale] = messages.university?.structure?.unit?.tabs ?? {}
  }

  for (const unitSlug of Object.keys(manifest)) {
    const unit = STRUCTURE_UNITS.find(item => item.slug === unitSlug)
    const unitDir = join(dir, unitSlug)
    if (!existsSync(unitDir)) continue

    for (const file of readdirSync(unitDir).filter(name => name.endsWith('.json'))) {
      const [tab, rawLocale] = file.replace(/\.json$/, '').split('.')
      const locale = rawLocale === 'en' ? 'en' : 'uk'
      const unitName = (locale === 'en' ? unit?.nameEn : unit?.name) || unit?.name || unitSlug
      const tabLabel = manifest[unitSlug]?.tabLabels?.[tab]?.[locale]
        ?? tabLabels[locale]?.[tab]
        ?? tab
      // `home` is the unit landing page; the rest are tab routes.
      const url = tab === 'home'
        ? `/university/structure/${unitSlug}`
        : `/university/structure/${unitSlug}/${tab}`

      const content = readJson(join(unitDir, file))
      for (const [index, section] of (content.sections ?? []).entries()) {
        const parts = [stripHtml(section.html)]
        for (const person of section.people ?? []) {
          parts.push(collapse([person.name, person.position, person.degree].filter(Boolean).join(' — ')))
        }
        const text = parts.filter(Boolean).join('\n')
        if (!text) continue
        pushDocs(documents, {
          type: 'faculty',
          locale,
          url,
          title: section.heading
            ? `${unitName} — ${collapse(section.heading)}`
            : `${unitName} — ${tabLabel}`,
          text,
          idBase: `${unitSlug}/${tab}:${index}`,
        })
      }
    }
  }

  return documents
}

// ── feed 4: the org chart ────────────────────────────────────────────────────

/**
 * Department, laboratory, museum and centre names. They are the answer to «де кафедра …» and
 * exist only as TypeScript data, so nothing else in the index covers them.
 */
function orgChartDocuments() {
  const documents = []

  const itemNames = (items = [], locale) =>
    items.flatMap(item => [
      locale === 'en' ? item.nameEn || item.name : item.name,
      ...itemNames(item.children ?? [], locale),
    ]).filter(Boolean)

  for (const locale of ['uk', 'en']) {
    for (const unit of STRUCTURE_UNITS) {
      const names = itemNames([...unit.items, ...(unit.associations ?? [])], locale)
      if (!names.length) continue
      const unitName = (locale === 'en' ? unit.nameEn : unit.name) || unit.name
      pushDocs(documents, {
        type: 'faculty',
        locale,
        url: unit.slug ? `/university/structure/${unit.slug}` : '/university/structure',
        title: unitName,
        text: [unitName, (locale === 'en' ? unit.summaryEn : unit.summary) ?? '', ...names]
          .filter(Boolean).join('\n'),
        idBase: `org:${unit.slug ?? unit.name}`,
      })
    }

    for (const group of [...STRUCTURE_GROUPS, ...STRUCTURE_ASSOCIATIONS]) {
      const names = itemNames(group.items, locale)
      if (!names.length) continue
      const groupName = (locale === 'en' ? group.nameEn : group.name) || group.name
      pushDocs(documents, {
        type: 'faculty',
        locale,
        url: '/university/structure',
        title: groupName,
        text: [groupName, ...names].join('\n'),
        idBase: `org-group:${group.id}`,
      })
    }
  }

  return documents
}

// ── run ──────────────────────────────────────────────────────────────────────

// A stale override is a real bug: someone renamed a page and this table did not follow.
for (const [key, route] of Object.entries(LOCALE_ROUTE_OVERRIDES)) {
  if (!ROUTES.has(route)) {
    console.error(`✗ LOCALE_ROUTE_OVERRIDES['${key}'] points at ${route}, which has no page`)
    process.exit(1)
  }
}

const documents = []
let localeDocCount = 0

for (const locale of ['uk', 'en']) {
  const { documents: docs, skipped } = localeDocuments(locale)
  documents.push(...docs)
  localeDocCount += docs.length
  if (skipped.length) warnings.push(`${locale}: ${skipped.length} locale namespaces without a page`)
  if (verbose && skipped.length) skipped.forEach(entry => console.log(`    · ${entry}`))
}

const { documents: pageDocs, orphans } = staticPageDocuments()
if (orphans.length) warnings.push(`content/pages not rendered anywhere: ${orphans.join(', ')}`)
documents.push(...pageDocs)

const structureDocs = structureDocuments()
documents.push(...structureDocs)

const orgDocs = orgChartDocuments()
documents.push(...orgDocs)

// Floor check: catches wholesale breakage (a renamed namespace, a moved content folder) without
// failing on the handful of locale namespaces that legitimately are not pages.
const MIN_DOCUMENTS = 600
if (documents.length < MIN_DOCUMENTS) {
  console.error(`✗ only ${documents.length} search documents (expected at least ${MIN_DOCUMENTS}) — a feed is broken`)
  process.exit(1)
}

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), documents }))

const bytes = statSync(OUT).size
const chars = documents.reduce((total, doc) => total + doc.body.length, 0)
console.log(`✓ ${relative(ROOT, OUT)} — ${documents.length} documents, ${(chars / 1024).toFixed(0)} KB of text, ${(bytes / 1024).toFixed(0)} KB on disk`)
console.log(`  locale pages ${localeDocCount} · prose pages ${pageDocs.length} · faculty tabs ${structureDocs.length} · org chart ${orgDocs.length}`)
for (const warning of warnings) console.log(`  ! ${warning}`)
