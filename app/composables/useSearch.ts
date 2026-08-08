import type { SearchResponse, SearchType } from '~~/server/utils/search/types'

/**
 * Site-wide search state, shared by the header overlay and the `/search` page.
 *
 * The overlay is a preview: it asks for a handful of hits as the visitor types, debounced so a
 * fast typist makes one request rather than ten. The full result set, with filters and paging,
 * lives on `/search` — see `app/pages/search.vue`.
 */

const DEBOUNCE_MS = 200
const PREVIEW_LIMIT = 8

export function useSearch() {
  // `useState` rather than `ref`: the trigger button, the overlay and the page are three
  // components, and they have to be looking at the same query.
  const isOpen = useState('search-open', () => false)
  const query = useState('search-query', () => '')
  const results = useState<SearchResponse | null>('search-results', () => null)
  const pending = useState('search-pending', () => false)

  const inputRef = ref<HTMLInputElement | null>(null)
  const { locale } = useSafeI18nWithRouter()

  function open() {
    isOpen.value = true
    nextTick(() => {
      inputRef.value?.focus()
      inputRef.value?.select()
    })
  }

  function close() {
    isOpen.value = false
  }

  function toggle() {
    isOpen.value ? close() : open()
  }

  let timer: ReturnType<typeof setTimeout> | null = null
  let requestId = 0

  async function run(term: string) {
    const trimmed = term.trim()
    if (trimmed.length < 2) {
      results.value = null
      pending.value = false
      return
    }

    const current = ++requestId
    pending.value = true
    try {
      const response = await $fetch<SearchResponse>('/api/search', {
        query: { q: trimmed, locale: locale.value, limit: PREVIEW_LIMIT },
      })
      // A slow earlier request must not overwrite the answer to what is typed now.
      if (current === requestId) results.value = response
    }
    catch {
      if (current === requestId) results.value = null
    }
    finally {
      if (current === requestId) pending.value = false
    }
  }

  function search(term: string) {
    query.value = term
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => run(term), DEBOUNCE_MS)
  }

  function reset() {
    if (timer) clearTimeout(timer)
    query.value = ''
    results.value = null
    pending.value = false
  }

  /** Hits grouped by type, in the order the API ranked them. */
  const grouped = computed(() => {
    const hits = results.value?.hits ?? []
    const buckets = new Map<SearchType, typeof hits>()
    for (const hit of hits) {
      const bucket = buckets.get(hit.type)
      if (bucket) bucket.push(hit)
      else buckets.set(hit.type, [hit])
    }
    return [...buckets.entries()].map(([type, items]) => ({ type, items }))
  })

  return { isOpen, inputRef, query, results, pending, grouped, open, close, toggle, search, reset }
}
