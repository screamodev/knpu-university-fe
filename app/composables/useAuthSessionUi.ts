/**
 * Shared auth session presentation: JWT vs profile load vs `/users/me` failure.
 */
export function useAuthSessionUi() {
  const { jwt, user, mePending, meRestoreCompleted, isAuthenticated, isAdmin, fetchMe } = useAuth()

  const hasSessionToken = computed(() => Boolean(jwt.value && jwt.value.length > 0))

  /**
   * JWT present but user not loaded yet: show skeleton until the first `fetchMe` attempt
   * finishes (avoids flashing sessionMeError during plugin startup / slow network).
   */
  const sessionResolving = computed(
    () =>
      hasSessionToken.value &&
      !user.value &&
      (!meRestoreCompleted.value || mePending.value),
  )

  const sessionMeError = computed(
    () =>
      hasSessionToken.value &&
      !user.value &&
      meRestoreCompleted.value &&
      !mePending.value,
  )

  const showProfile = computed(() => isAuthenticated.value && Boolean(user.value))

  const showSignIn = computed(() => !hasSessionToken.value)

  const displayName = computed(() => {
    const u = user.value
    if (!u) {
      return ''
    }
    return u.username || u.email || ''
  })

  function initialsFromUser(u: { username?: string; email?: string | null } | null): string {
    if (!u) {
      return '?'
    }
    const name = u.username || u.email || '?'
    const cleaned = name.replace(/[^\p{L}\s']/gu, ' ').trim()
    const parts = cleaned.split(/\s+/).filter(Boolean)
    if (parts.length >= 2) {
      const a = parts[0]?.[0]
      const b = parts[1]?.[0]
      if (a && b) {
        return (a + b).toUpperCase()
      }
    }
    return name.slice(0, 2).toUpperCase()
  }

  const initials = computed(() => initialsFromUser(user.value))

  async function retryFetchMe(): Promise<void> {
    await fetchMe()
  }

  return {
    hasSessionToken,
    sessionResolving,
    sessionMeError,
    showProfile,
    showSignIn,
    displayName,
    initials,
    isAdmin,
    retryFetchMe,
  }
}
