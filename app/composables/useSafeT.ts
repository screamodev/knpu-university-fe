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
  try {
    const i18n = useI18n()
    t = i18n.t
    tm = typeof i18n.tm === 'function' ? i18n.tm : () => ({})
  } catch (_) {
    t = (key: string, ...args: any[]): string => {
      try {
        const g = (useNuxtApp() as any).$i18n?.global
        if (g?.t && typeof g.t === 'function') return g.t(key, ...args)
      } catch (_) {}
      return key
    }
    tm = (): any => ({})
  }
  let localePath: (path: string) => string
  let switchLocalePath: (locale: string) => string
  let locale: ReturnType<typeof useLocale>
  try {
    localePath = useLocalePath()
    switchLocalePath = useSwitchLocalePath()
    locale = useLocale()
  } catch (_) {
    localePath = (path: string) => path
    switchLocalePath = (localeCode: string) => (localeCode === 'uk' ? '/' : `/${localeCode}`)
    locale = ref('uk') as ReturnType<typeof useLocale>
  }
  return { t, tm, localePath, switchLocalePath, locale }
}
