/**
 * Restores JWT from `localStorage` into the Nuxt cookie before other plugins run.
 * Keeps sessions across reloads when the cookie alone is missing or not yet applied.
 */
import {
  STRAPI_JWT_COOKIE_NAME,
  STRAPI_JWT_LS_KEY,
  getStrapiJwtCookieOptions,
} from '~/types/auth'

export default defineNuxtPlugin({
  name: 'strapi-jwt-restore',
  enforce: 'pre',
  setup() {
    if (!import.meta.client) return

    const fromLs = localStorage.getItem(STRAPI_JWT_LS_KEY)
    if (!fromLs || fromLs.length === 0) return

    const jwt = useCookie<string | null>(STRAPI_JWT_COOKIE_NAME, getStrapiJwtCookieOptions())
    if (!jwt.value) {
      jwt.value = fromLs
    }
  },
})
