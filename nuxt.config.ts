// https://nuxt.com/docs/api/configuration/nuxt-config
const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {}

export default defineNuxtConfig({
  compatibilityDate: '2026-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  runtimeConfig: {
    /**
     * Base URL for Directus HTTP requests on the **server** (SSR, server routes).
     * When the Nuxt app runs in Docker and Directus is on the host or another compose
     * stack, set `NUXT_DIRECTUS_SERVER_URL` (e.g. http://host.docker.internal:8055).
     * If unset, `public.directusUrl` is used everywhere.
     */
    directusServerUrl: env.NUXT_DIRECTUS_SERVER_URL || '',
    /**
     * Directus live preview. The editor opens `/news/<slug>?preview=<secret>` in an iframe;
     * the server route checks the secret and reads the draft with a read-only Directus token.
     * Both stay server-side — a draft must never be reachable from the browser alone.
     */
    previewSecret: env.NUXT_PREVIEW_SECRET || '',
    directusPreviewToken: env.NUXT_DIRECTUS_PREVIEW_TOKEN || '',
    public: {
      directusUrl:
        env.NUXT_PUBLIC_DIRECTUS_URL ||
        env.DIRECTUS_URL ||
        'http://localhost:8055',
    },
  },
  i18n: {
    restructureDir: false,
    locales: [
      { code: 'uk', iso: 'uk-UA', name: 'УКР', file: 'uk.json' },
      { code: 'en', iso: 'en-US', name: 'ENG', file: 'en.json' },
    ],
    defaultLocale: 'uk',
    strategy: 'prefix_except_default',
    // The university site is Ukrainian first: a visitor whose browser asks for English still
    // lands on the Ukrainian home page. Without this the module's default redirect sent every
    // such visitor to /en and stored an `i18n_redirected=en` cookie for a year.
    detectBrowserLanguage: false,
    // Load from app/locales. With restructureDir: false, langDir is relative to project root
    // (v10 default would resolve to i18n/locales/ which we do not use).
    langDir: 'app/locales',
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
