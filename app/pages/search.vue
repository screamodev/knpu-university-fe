<script setup lang="ts">
import type { SearchHit, SearchResponse, SearchType } from '~~/server/utils/search/types'

/**
 * Full search results.
 *
 * Server-rendered on purpose: a result set is something people send to each other («ось де це
 * лежить»), so the URL has to carry the query and the page has to render without JavaScript.
 * The header overlay is the quick path; this is the one with filters and paging.
 */
definePageMeta({ layout: 'default' })

const route = useRoute()
const router = useRouter()
const { t, locale, localePath } = useSafeI18nWithRouter()

const PAGE_SIZE = 20

const query = computed(() => String(route.query.q ?? '').trim())
const activeType = computed<SearchType | null>(() => {
  const value = String(route.query.type ?? '')
  return value ? (value as SearchType) : null
})
const page = computed(() => Math.max(1, Number(route.query.page ?? 1) || 1))

const input = ref(query.value)
watch(query, value => (input.value = value))

const { data, pending } = await useFetch<SearchResponse>('/api/search', {
  query: computed(() => ({
    q: query.value,
    locale: locale.value,
    type: activeType.value ?? undefined,
    limit: PAGE_SIZE,
    offset: (page.value - 1) * PAGE_SIZE,
  })),
  default: () => ({ query: '', total: 0, types: [], hits: [] }),
})

const results = computed(() => data.value ?? { query: '', total: 0, types: [], hits: [] })
const pageCount = computed(() => Math.ceil(results.value.total / PAGE_SIZE))

useHead({
  title: () => (query.value ? `${t('search.resultsFor')} «${query.value}»` : t('search.title')),
  // A search result page has nothing to offer an index.
  meta: [{ name: 'robots', content: 'noindex, follow' }],
})

function submit() {
  const term = input.value.trim()
  if (!term) return
  router.push({ path: localePath('/search'), query: { q: term } })
}

function selectType(type: SearchType | null) {
  router.push({
    path: localePath('/search'),
    query: { q: query.value, ...(type ? { type } : {}) },
  })
}

function goToPage(next: number) {
  router.push({
    path: localePath('/search'),
    query: {
      q: query.value,
      ...(activeType.value ? { type: activeType.value } : {}),
      ...(next > 1 ? { page: next } : {}),
    },
  })
}

function isExternal(url: string): boolean {
  return /^https?:\/\//.test(url)
}

function hitTo(hit: SearchHit): string {
  return isExternal(hit.url) ? hit.url : localePath(hit.url)
}

/** Path shown under the title, so a reader can tell where the hit lives before clicking. */
function hitLocation(hit: SearchHit): string {
  return isExternal(hit.url) ? t('documents.externalLink') : hit.url
}

function formatDate(value: string | null | undefined): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-14">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('search.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('search.title') }}
        </h1>

        <form class="mt-6 max-w-2xl flex gap-3" @submit.prevent="submit">
          <input
            v-model="input"
            type="search"
            class="flex-1 py-3 px-5 rounded-12 border-2 border-white/20 bg-white/5 text-white font-geologica outline-none placeholder:text-white/30 focus:border-gold transition-colors"
            :placeholder="t('search.placeholder')"
            :aria-label="t('search.placeholder')"
          >
          <button
            type="submit"
            class="bg-gold text-navy-deep border-none py-3 px-6 rounded-12 font-semibold font-geologica cursor-pointer hover:bg-gold-light transition-colors"
          >
            {{ t('search.submit') }}
          </button>
        </form>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- No query yet -->
      <p v-if="!query" class="text-body text-text-muted py-10 text-center bg-off-white border border-border rounded-16">
        {{ t('search.prompt') }}
      </p>

      <template v-else>
        <p class="text-body-sm text-text-muted mb-6">
          <template v-if="pending">{{ t('search.searching') }}</template>
          <template v-else>{{ t('search.found', { count: results.total }) }} «{{ query }}»</template>
        </p>

        <!-- Type filters -->
        <div v-if="results.types.length > 1" class="flex flex-wrap gap-2 mb-8">
          <button
            type="button"
            class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
            :class="!activeType ? 'bg-navy text-white border-navy' : 'bg-white text-navy border-border hover:border-navy'"
            @click="selectType(null)"
          >
            {{ t('search.filterAll') }}
          </button>
          <button
            v-for="group in results.types"
            :key="group.type"
            type="button"
            class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
            :class="activeType === group.type ? 'bg-navy text-white border-navy' : 'bg-white text-navy border-border hover:border-navy'"
            @click="selectType(group.type)"
          >
            {{ t(`search.types.${group.type}`) }}
            <span class="opacity-60">{{ group.count }}</span>
          </button>
        </div>

        <!-- Results -->
        <ul v-if="results.hits.length" class="list-none p-0 m-0 space-y-4">
          <li
            v-for="hit in results.hits"
            :key="hit.id"
            class="border border-border rounded-16 p-5 hover:border-gold transition-colors"
          >
            <NuxtLink
              :to="hitTo(hit)"
              :target="isExternal(hit.url) ? '_blank' : undefined"
              :rel="isExternal(hit.url) ? 'noopener noreferrer' : undefined"
              class="no-underline"
            >
              <span class="flex items-center gap-2 mb-1">
                <span class="text-[11px] font-semibold tracking-wider uppercase text-gold">
                  {{ t(`search.types.${hit.type}`) }}
                </span>
                <span v-if="formatDate(hit.date)" class="text-body-sm text-text-muted">
                  · {{ formatDate(hit.date) }}
                </span>
              </span>
              <span class="block font-playfair text-lg font-semibold text-navy">{{ hit.title }}</span>
              <span v-if="hit.snippet" class="block text-body-sm text-text-muted mt-1 search-snippet" v-html="hit.snippet" />
              <span class="block text-[12px] text-text-muted/70 mt-2 truncate">{{ hitLocation(hit) }}</span>
            </NuxtLink>
          </li>
        </ul>

        <p v-else-if="!pending" class="text-body text-text-muted py-10 text-center bg-off-white border border-border rounded-16">
          {{ t('search.empty') }}
        </p>

        <!-- Paging -->
        <div v-if="pageCount > 1" class="mt-10 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            class="px-4 py-1.5 rounded-100 text-sm border border-border bg-white text-navy disabled:opacity-40 disabled:cursor-not-allowed hover:border-navy transition-colors"
            :disabled="page <= 1"
            @click="goToPage(page - 1)"
          >
            ←
          </button>
          <span class="text-body-sm text-text-muted px-2">{{ page }} / {{ pageCount }}</span>
          <button
            type="button"
            class="px-4 py-1.5 rounded-100 text-sm border border-border bg-white text-navy disabled:opacity-40 disabled:cursor-not-allowed hover:border-navy transition-colors"
            :disabled="page >= pageCount"
            @click="goToPage(page + 1)"
          >
            →
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.search-snippet :deep(mark) {
  background: theme('colors.gold-pale');
  color: inherit;
  font-weight: 600;
  border-radius: 3px;
  padding: 0 2px;
}
</style>
