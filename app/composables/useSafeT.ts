// ---------------------------------------------------------------------------
// i18n helper composables
// ---------------------------------------------------------------------------
//
// WHY THESE EXIST
// ---------------
// Direct `useI18n()` can throw when called outside a Vue setup context
// (e.g. in a utility function or during SSR edge cases). These wrappers
// add try/catch so callers always get a working `t()` function.
//
// THREE FLAVOURS
// --------------
//  useSafeT()              — returns a bare `t(key)` function.
//                            NOT reactive: calls `$i18n.global.t` on every
//                            invocation. Fine for page-level components that
//                            re-mount on navigation. Used by widget components
//                            (NewsSection, ProgramsSection, etc.).
//
//  useSafeI18n()           — same idea, also exposes `tm()`.
//
//  useSafeI18nWithRouter() — the main composable for **layout components**
//                            (NavList, MegaMenu, MobileNav, UtilityBar …).
//                            Returns `t`, `tm`, `locale`, `localePath`,
//                            `switchLocalePath`.
//
// CRITICAL: useScope: 'global'
// ----------------------------
// `useSafeI18nWithRouter` MUST call `useI18n({ useScope: 'global' })`.
// Without it, Vue I18n creates a component-local scope. Layout components
// persist across route changes (they never re-mount), so the local scope's
// `t()` stops reacting to the global locale change triggered by
// `switchLocalePath()`. Symptoms: after switching language via the UI,
// navigation labels show raw keys like "nav.admissions.levels" instead of
// translated text; a full page reload fixes it.
//
// LOCALE FILE LOADING
// -------------------
// Messages come from two sources (see also app/plugins/i18n-messages.ts):
//   1. @nuxtjs/i18n module loads `<langDir>/<file>` per locale
//      (configured in nuxt.config `i18n.langDir` → resolves to app/locales/).
//   2. The i18n-messages plugin merges the same app/locales/*.json files
//      via `mergeLocaleMessage` at startup — this is a safety net so that
//      any keys added only to app/locales/ are guaranteed to be present.
// Both sources must stay in sync. The root-level `locales/` dir is also
// loaded by the module (Nuxt 4 srcDir = app/, but @nuxtjs/i18n may resolve
// langDir from project root depending on version). Keep both dirs identical
// or consolidate into one to avoid drift.
// ---------------------------------------------------------------------------

export function resolveMessageValue(v: unknown): string {
  if (typeof v === 'string') return v
  if (v && typeof v === 'object') {
    const o = v as Record<string, unknown>
    if (typeof o.static === 'string') return o.static
    if (o.body && typeof o.body === 'object') {
      const b = o.body as Record<string, unknown>
      if (typeof b.static === 'string') return b.static
      if (Array.isArray(b.items)) return b.items.map(resolveMessageValue).join('')
    }
  }
  return String(v)
}

export function useSafeT(): (key: string, ...args: any[]) => string {
  return function t(key: string, ...args: any[]): string {
    try {
      const nuxtApp = useNuxtApp()
      const i18n = (nuxtApp as any).$i18n?.global
      if (i18n?.t && typeof i18n.t === 'function') {
        return i18n.t(key, ...args)
      }
    } catch (_) {}
    return key
  }
}

export function useSafeI18n() {
  return {
    t(key: string, ...args: any[]): string {
      try {
        const nuxtApp = useNuxtApp()
        const i18n = (nuxtApp as any).$i18n?.global
        if (i18n?.t && typeof i18n.t === 'function') return i18n.t(key, ...args)
      } catch (_) {}
      return key
    },
    tm(key: string): any {
      try {
        const nuxtApp = useNuxtApp()
        const i18n = (nuxtApp as any).$i18n?.global
        if (i18n?.tm && typeof i18n.tm === 'function') return i18n.tm(key)
      } catch (_) {}
      return {}
    },
  }
}

export function useSafeI18nWithRouter() {
  let t: (key: string, ...args: any[]) => string
  let tm: (key: string) => any
  let locale: { value: string }
  try {
    const i18n = useI18n({ useScope: 'global' })
    t = i18n.t
    tm = typeof i18n.tm === 'function' ? i18n.tm : () => ({})
    locale = i18n.locale
  } catch (_) {
    const nuxtApp = useNuxtApp()
    const g = (nuxtApp as any).$i18n?.global ?? (nuxtApp as any).$i18n
    locale = g?.locale ?? ref('uk')
    t = (key: string, ...args: any[]): string => {
      void (locale as any).value
      try {
        if (g?.t && typeof g.t === 'function') return g.t(key, ...args)
      } catch (_) {}
      return key
    }
    tm = (key: string): any => {
      void (locale as any).value
      try {
        if (g?.tm && typeof g.tm === 'function') return g.tm(key)
      } catch (_) {}
      return {}
    }
  }
  let localePath: (path: string) => string
  let switchLocalePath: (locale: string) => string
  try {
    localePath = useLocalePath()
    switchLocalePath = useSwitchLocalePath()
  } catch (_) {
    localePath = (path: string) => path
    switchLocalePath = (localeCode: string) => (localeCode === 'uk' ? '/' : `/${localeCode}`)
  }
  return { t, tm, localePath, switchLocalePath, locale }
}
