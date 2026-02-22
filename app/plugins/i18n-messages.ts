import uk from '../locales/uk.json'
import en from '../locales/en.json'

export default defineNuxtPlugin({
  name: 'i18n-messages',
  order: 2,
  setup(nuxtApp) {
    // #region agent log
    const hasI18n = !!(nuxtApp as any).$i18n
    fetch('http://127.0.0.1:7427/ingest/a2ff6a28-00ec-4c49-b949-39dc25c1c38b',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'78383d'},body:JSON.stringify({sessionId:'78383d',hypothesisId:'H1',location:'i18n-messages.ts:before',message:'plugin run',data:{hasI18n},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    const i18n = (nuxtApp as any).$i18n
    const global = i18n?.global ?? i18n
    const hasMerge = !!global?.mergeLocaleMessage
    // #region agent log
    fetch('http://127.0.0.1:7427/ingest/a2ff6a28-00ec-4c49-b949-39dc25c1c38b',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'78383d'},body:JSON.stringify({sessionId:'78383d',hypothesisId:'H2',location:'i18n-messages.ts:global',message:'global check',data:{hasMerge,hasGlobal:!!global},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    if (hasMerge) {
      global.mergeLocaleMessage('uk', uk as Record<string, unknown>)
      global.mergeLocaleMessage('en', en as Record<string, unknown>)
      const tResult = typeof global.t === 'function' ? global.t('hero.tag') : 'no-t'
      const locale = (global as any).locale?.value ?? (global as any).locale
      // #region agent log
      fetch('http://127.0.0.1:7427/ingest/a2ff6a28-00ec-4c49-b949-39dc25c1c38b',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'78383d'},body:JSON.stringify({sessionId:'78383d',hypothesisId:'H3',location:'i18n-messages.ts:after merge',message:'after merge',data:{tHeroTag:tResult,locale: String(locale)},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
    }
  },
})
