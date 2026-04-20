/**
 * After hydration: restore user snapshot from sessionStorage for instant UI, then refresh from Directus (`readMe`).
 * When a snapshot exists, refresh runs in the background (`silent`) so the header does not wait on `/users/me`.
 *
 * Must run after `app:mounted`. Restoring the snapshot in the plugin body runs before hydration and sets
 * `user` while SSR still rendered `sessionResolving` (no sessionStorage on server) — Vue hydration mismatch.
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', async () => {
    const { jwt, user, fetchMe, restoreUserSnapshotFromSession } = useAuth()
    if (!jwt.value) {
      return
    }
    restoreUserSnapshotFromSession()
    if (user.value) {
      void fetchMe({ silent: true })
    } else {
      await fetchMe()
    }
  })
})
