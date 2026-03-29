import {
  STRAPI_JWT_COOKIE_NAME,
  STRAPI_JWT_LS_KEY,
  getStrapiJwtCookieOptions,
} from '~/types/auth'

/**
 * Requires a Strapi JWT (cookie and/or `localStorage` backup). Server is skipped so the client
 * can restore the token from `localStorage` before redirecting.
 */
export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const jwt = useCookie<string | null>(STRAPI_JWT_COOKIE_NAME, getStrapiJwtCookieOptions())

  if (!jwt.value && typeof localStorage !== 'undefined') {
    const fromLs = localStorage.getItem(STRAPI_JWT_LS_KEY)
    if (fromLs && fromLs.length > 0) {
      jwt.value = fromLs
    }
  }

  if (jwt.value) return

  const localePath = useLocalePath()
  return navigateTo({
    path: localePath('/login'),
    query: { redirect: to.fullPath },
  })
})
