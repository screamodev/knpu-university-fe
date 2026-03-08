// ---------------------------------------------------------------------------
// i18n message merge plugin
// ---------------------------------------------------------------------------
// Merges app/locales/*.json into the global Vue I18n instance at startup.
//
// WHY: @nuxtjs/i18n loads locale files from `langDir` (see nuxt.config),
// but the resolution path can vary between Nuxt/module versions. This plugin
// acts as a safety net — it explicitly imports app/locales/{uk,en}.json and
// merges them, so any keys present only in app/locales/ are always available.
//
// Runs once (order: 2, after i18n module init). Merged messages persist for
// the lifetime of the app — they are NOT reset on client-side locale switch
// (lazy: false means no re-fetching).
// ---------------------------------------------------------------------------

import uk from '../locales/uk.json'
import en from '../locales/en.json'

export default defineNuxtPlugin({
  name: 'i18n-messages',
  order: 2,
  setup(nuxtApp) {
    const i18n = (nuxtApp as any).$i18n
    const global = i18n?.global ?? i18n
    if (global?.mergeLocaleMessage) {
      global.mergeLocaleMessage('uk', uk as Record<string, unknown>)
      global.mergeLocaleMessage('en', en as Record<string, unknown>)
    }
  },
})
