// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  runtimeConfig: {
    /**
     * Base URL for Strapi HTTP requests on the **server** (SSR, server routes).
     * When the Nuxt app runs in Docker and Strapi is on the host or another compose
     * stack, set `NUXT_STRAPI_SERVER_URL` (e.g. http://host.docker.internal:1337).
     * If unset, `public.strapiUrl` is used everywhere.
     */
    strapiServerUrl: process.env.NUXT_STRAPI_SERVER_URL || '',
    public: {
      strapiUrl:
        process.env.NUXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://localhost:1337',
    },
  },
  i18n: {
    locales: [
      { code: 'uk', iso: 'uk-UA', name: 'УКР', file: 'uk.json' },
      { code: 'en', iso: 'en-US', name: 'ENG', file: 'en.json' },
    ],
    defaultLocale: 'uk',
    strategy: 'prefix_except_default',
    // Load from app/locales. With restructureDir: false, langDir is relative to project root
    // (v10 default would resolve to i18n/locales/ which we do not use).
    restructureDir: false,
    langDir: 'app/locales',
    lazy: false,
  },
  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit'],
    },
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
