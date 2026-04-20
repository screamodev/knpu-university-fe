/**
 * Restores Directus JSON auth from `localStorage` into the Nuxt cookie before other plugins run.
 * Keeps sessions across reloads when the cookie alone is missing or not yet applied.
 */
import {
  DIRECTUS_SESSION_COOKIE_NAME,
  DIRECTUS_SESSION_LS_KEY,
  getDirectusSessionCookieOptions,
} from '~/types/auth'

export default defineNuxtPlugin({
  name: 'directus-auth-restore',
  enforce: 'pre',
  setup() {
    if (!import.meta.client) return

    const fromLs = localStorage.getItem(DIRECTUS_SESSION_LS_KEY)
    if (!fromLs || fromLs.length === 0) return

    const session = useCookie<string | null>(DIRECTUS_SESSION_COOKIE_NAME, getDirectusSessionCookieOptions())
    if (!session.value) {
      session.value = fromLs
    }
  },
})
