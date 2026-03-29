import {
  STRAPI_JWT_COOKIE_NAME,
  STRAPI_JWT_LS_KEY,
  getStrapiJwtCookieOptions,
} from '~/types/auth'

/**
 * Requires a Strapi JWT (same token check as `auth.ts`).
 * Role verification (isAdmin) is handled in the page components after `meRestoreCompleted`.
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
