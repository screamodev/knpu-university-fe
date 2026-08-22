/**
 * Which locale namespace belongs to which route.
 *
 * Most of the site is template pages whose entire copy lives in `app/locales/{uk,en}.json` — 135
 * pages, ~2 500 strings. A search that cannot see them cannot answer «гуртожиток» or «стипендія»,
 * so the build-time indexer walks the locale files and needs to know where each namespace is
 * rendered. The mapping is by convention (`education.digitalCenter` → `/education/digital-center`)
 * with a short table for the handful of keys that do not follow it.
 *
 * `scripts/build-search-index.mjs` checks every route produced here against `app/pages` and fails
 * the build on an override that no longer resolves, so a renamed page cannot silently disappear
 * from search.
 */

/** Namespaces whose direct children are one page each, under `/<namespace>/<child>`. */
export const LOCALE_PAGE_NAMESPACES = [
  'university',
  'admissions',
  'education',
  'science',
  'student',
] as const

/** Namespaces that are one page in their own right. */
export const LOCALE_ROOT_ROUTES: Record<string, string> = {
  news: '/news',
  events: '/events',
  programs: '/programs',
  // Homepage sections.
  hero: '/',
  facts: '/',
  sections: '/',
  quickAccess: '/',
  resources: '/',
  partners: '/',
}

/** `standalonePages.*` does not follow the `/<namespace>/<child>` shape at all. */
export const LOCALE_STANDALONE_ROUTES: Record<string, string> = {
  accessibility: '/accessibility',
  sitemap: '/sitemap',
  privacy: '/privacy',
  feedback: '/feedback',
  admissionsAsk: '/admissions/ask',
  admissionsEdebo: '/admissions/edebo',
}

/**
 * Keys whose page is not `kebabCase(key)`. Kept deliberately short — every entry here is a place
 * where the locale file and the route drifted apart.
 */
export const LOCALE_ROUTE_OVERRIDES: Record<string, string> = {
  'university.rectorreport': '/university/rector-report',
  'university.regulationdrafts': '/university/regulation-drafts',
  // Сторінки підрозділів живуть під /university/structure, а не поруч із рештою розділу.
  'university.monitoringDepartment': '/university/structure/monitoring',
  'university.rectorOffice': '/university/structure/rector-office',
  'university.labourSafety': '/university/structure/labour-safety',
  'university.internationalEducation': '/university/structure/international-education',
}

/** `dissertationCouncils` → `dissertation-councils`. */
export function kebabCase(value: string): string {
  return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

/** Route for one locale namespace child, or `null` when the namespace is not a page. */
export function localeNamespaceRoute(namespace: string, child?: string): string | null {
  if (!child) return LOCALE_ROOT_ROUTES[namespace] ?? null

  if (namespace === 'standalonePages') return LOCALE_STANDALONE_ROUTES[child] ?? null

  if ((LOCALE_PAGE_NAMESPACES as readonly string[]).includes(namespace)) {
    return LOCALE_ROUTE_OVERRIDES[`${namespace}.${child}`] ?? `/${namespace}/${kebabCase(child)}`
  }

  return null
}
