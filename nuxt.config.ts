// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'uk', iso: 'uk-UA', name: 'УКР', file: 'uk.json' },
      { code: 'en', iso: 'en-US', name: 'ENG', file: 'en.json' },
    ],
    defaultLocale: 'uk',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    lazy: false,
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Geologica:wght@300;400;500;600&display=swap',
        },
      ],
    },
  },
})
