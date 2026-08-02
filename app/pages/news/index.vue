<script setup lang="ts">
import { aggregate, readItems } from '@directus/sdk'
import type { DirectusArticle } from '~/types/news'
import { resolveMediaSrc } from '~/utils/directusMedia'

definePageMeta({ layout: 'default' })

const { t, localePath, locale } = useSafeI18nWithRouter()
const { client } = useDirectus()
const { mediaResolvers } = useMediaResolvers()
const { localized } = useLocalizedField()

useHead({
  title: () => t('sections.news.title'),
  meta: [{ name: 'description', content: () => t('sections.news.title') }],
})

const PAGE_SIZE = 12

const route = useRoute()
const router = useRouter()

/**
 * The page number lives in the URL so a listing page is shareable, crawlable and
 * survives a reload — with 400+ migrated articles the archive is deep enough that
 * "newest 12 only" hides most of it.
 */
const currentPage = computed(() => {
  const raw = Number(Array.isArray(route.query.page) ? route.query.page[0] : route.query.page)
  return Number.isFinite(raw) && raw >= 1 ? Math.floor(raw) : 1
})

/**
 * Several categories can be active at once — `?category=arts&category=akredytatsiia`. An article
 * matches if it carries **any** of them, which is what a reader expects from filter chips.
 */
const selectedCategorySlugs = computed<string[]>(() => {
  const raw = route.query.category
  const values = Array.isArray(raw) ? raw : raw ? [raw] : []
  return [...new Set(values.map(String).filter(Boolean))]
})

const { data: categoriesData } = await useAsyncData('news-categories', () =>
  client.request(readItems('categories', { sort: ['name'] })),
)
const categories = computed(() => categoriesData.value ?? [])

const articleFilter = computed(() =>
  selectedCategorySlugs.value.length
    ? { categories: { categories_id: { slug: { _in: selectedCategorySlugs.value } } } }
    : {},
)

const { data: articlesData, pending } = await useAsyncData(
  'news-listing',
  () =>
    client.request(
      readItems('articles', {
        fields: ['*', { cover: ['*'] }, { categories: [{ categories_id: ['*'] }] }],
        sort: ['-date_published'],
        limit: PAGE_SIZE,
        offset: (currentPage.value - 1) * PAGE_SIZE,
        ...(selectedCategorySlugs.value.length ? { filter: articleFilter.value } : {}),
      }),
    ),
  { watch: [currentPage, selectedCategorySlugs] },
)

const { data: totalData } = await useAsyncData(
  'news-total',
  () =>
    client.request(
      aggregate('articles', {
        // countDistinct, not count: filtering on the categories M2M joins the junction, so a
        // plain count returns one row per (article, category) pair and inflates the total.
        aggregate: { countDistinct: 'id' },
        ...(selectedCategorySlugs.value.length ? { query: { filter: articleFilter.value } } : {}),
      }),
    ),
  { watch: [selectedCategorySlugs] },
)

const articles = computed(() => articlesData.value ?? [])

const totalArticles = computed(() => {
  const raw = (totalData.value?.[0] as { countDistinct?: { id?: string | number } } | undefined)
    ?.countDistinct?.id
  const parsed = typeof raw === 'string' ? Number(raw) : raw
  return typeof parsed === 'number' && Number.isFinite(parsed) ? parsed : 0
})

const totalPages = computed(() => Math.max(1, Math.ceil(totalArticles.value / PAGE_SIZE)))

/** Windowed page numbers: always first and last, plus neighbours of the current page. */
const pageNumbers = computed<(number | 'gap')[]>(() => {
  const total = totalPages.value
  const current = currentPage.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages = new Set<number>([1, total, current])
  for (const offset of [-1, 1]) {
    const page = current + offset
    if (page > 1 && page < total) pages.add(page)
  }
  const sorted = [...pages].sort((a, b) => a - b)

  const result: (number | 'gap')[] = []
  sorted.forEach((page, index) => {
    if (index > 0 && page - (sorted[index - 1] as number) > 1) result.push('gap')
    result.push(page)
  })
  return result
})

function pageLink(page: number) {
  const query: Record<string, string | string[]> = {}
  if (selectedCategorySlugs.value.length) query.category = selectedCategorySlugs.value
  if (page > 1) query.page = String(page)
  return { path: localePath('/news'), query }
}

function isCategorySelected(slug: string): boolean {
  return selectedCategorySlugs.value.includes(slug)
}

/** Changing the filter always returns to page 1 — offsets do not carry over. */
function applyCategories(slugs: string[]) {
  const query: Record<string, string | string[]> = {}
  if (slugs.length) query.category = slugs
  router.push({ path: localePath('/news'), query })
}

/** Chips toggle: clicking an active one removes it, so a filter can be undone where it was set. */
function toggleCategory(slug: string) {
  const current = selectedCategorySlugs.value
  applyCategories(
    current.includes(slug) ? current.filter(item => item !== slug) : [...current, slug],
  )
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat(locale.value === 'uk' ? 'uk-UA' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

function articlePublishedAt(article: DirectusArticle): string {
  return article.date_published ?? article.publishedAt ?? article.date_created ?? ''
}

/** An article can sit in several categories — the card lists them on one line. */
function categoryNames(article: DirectusArticle): string {
  return articleCategories(article)
    .map((category) => localized(category, 'name'))
    .join(' · ')
}

function articleCoverSrc(cover: DirectusArticle['cover']): string {
  return resolveMediaSrc(cover, mediaResolvers, CARD_COVER_TRANSFORM)
}

/** Crop anchor from the focal point an editor set on the file in Directus. */
function coverPosition(cover: DirectusArticle['cover']): string {
  return objectPositionFromFile(cover)
}

function articleCoverAlt(cover: DirectusArticle['cover'], titleFallback: string): string {
  if (cover != null && typeof cover === 'object' && cover.alternativeText) {
    return cover.alternativeText
  }
  return titleFallback
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Page header -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
              {{ t('sections.news.tag') }}
            </div>
            <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
              {{ t('sections.news.title') }}
            </h1>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Category filters -->
      <div v-if="categories.length" class="flex flex-wrap gap-2 mb-10">
        <button
          class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
          :class="
            selectedCategorySlugs.length === 0
              ? 'bg-navy text-white border-navy'
              : 'bg-white text-navy border-border hover:border-navy'
          "
          @click="applyCategories([])"
        >
          {{ t('news.allCategories') }}
        </button>
        <button
          v-for="category in categories"
          :key="category.id"
          type="button"
          :aria-pressed="isCategorySelected(category.slug)"
          class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280 inline-flex items-center gap-1.5"
          :class="
            isCategorySelected(category.slug)
              ? 'bg-navy text-white border-navy'
              : 'bg-white text-navy border-border hover:border-navy'
          "
          @click="toggleCategory(category.slug)"
        >
          {{ localized(category, 'name') }}
          <svg
            v-if="isCategorySelected(category.slug)"
            class="w-3 h-3 opacity-70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <!-- Loading skeleton -->
      <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="i in 6"
          :key="i"
          class="bg-off-white border border-border rounded-16 overflow-hidden animate-pulse"
        >
          <div class="h-48 bg-border" />
          <div class="p-5 space-y-3">
            <div class="h-3 bg-border rounded w-1/4" />
            <div class="h-5 bg-border rounded w-4/5" />
            <div class="h-3 bg-border rounded w-3/5" />
            <div class="h-3 bg-border rounded w-1/4" />
          </div>
        </div>
      </div>

      <!-- Articles grid -->
      <div v-else-if="articles.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="article in articles"
          :key="article.id"
          :to="localePath(`/news/${article.slug}`)"
          class="group bg-off-white border border-border rounded-16 overflow-hidden no-underline flex flex-col transition-all duration-280 hover:border-gold hover:-translate-y-1 hover:shadow-gold"
        >
          <!-- Cover image -->
          <div class="h-48 bg-navy-mid overflow-hidden relative">
            <img
              v-if="article.cover && articleCoverSrc(article.cover)"
              :style="{ objectPosition: coverPosition(article.cover) }"
              :src="articleCoverSrc(article.cover)"
              :alt="articleCoverAlt(article.cover, localized(article, 'title'))"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-280 group-hover:scale-105"
            />
            <div
              v-else
              class="w-full h-full bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center"
            >
              <svg class="w-10 h-10 text-gold/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          </div>

          <!-- Card body -->
          <div class="p-5 flex flex-col flex-1">
            <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-2">
              {{ categoryNames(article) }}
            </div>
            <div class="font-playfair text-[16px] font-semibold text-navy leading-snug flex-1 mb-3">
              {{ localized(article, 'title') }}
            </div>
            <p v-if="localized(article, 'excerpt')" class="text-sm text-text-muted line-clamp-2 mb-3">
              {{ localized(article, 'excerpt') }}
            </p>
            <div class="text-xs text-text-muted">{{ formatDate(articlePublishedAt(article)) }}</div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-else class="py-24 text-center text-text-muted">
        {{ t('news.noArticles') }}
      </div>

      <!-- Pagination -->
      <nav
        v-if="totalPages > 1"
        class="mt-12 flex flex-col items-center gap-4"
        :aria-label="t('sections.news.title')"
      >
        <div class="flex flex-wrap items-center justify-center gap-1.5">
          <NuxtLink
            v-if="currentPage > 1"
            :to="pageLink(currentPage - 1)"
            class="px-3 py-1.5 rounded-10 text-sm font-medium text-navy border border-border no-underline transition-colors duration-280 hover:border-navy"
            rel="prev"
          >
            ← {{ t('news.prevPage') }}
          </NuxtLink>

          <template v-for="(page, index) in pageNumbers" :key="`${page}-${index}`">
            <span v-if="page === 'gap'" class="px-1.5 text-text-muted select-none">…</span>
            <NuxtLink
              v-else-if="page !== currentPage"
              :to="pageLink(page)"
              class="min-w-[2.25rem] text-center px-2.5 py-1.5 rounded-10 text-sm font-medium text-navy border border-border no-underline transition-colors duration-280 hover:border-navy"
            >
              {{ page }}
            </NuxtLink>
            <span
              v-else
              aria-current="page"
              class="min-w-[2.25rem] text-center px-2.5 py-1.5 rounded-10 text-sm font-semibold text-white bg-navy border border-navy"
            >
              {{ page }}
            </span>
          </template>

          <NuxtLink
            v-if="currentPage < totalPages"
            :to="pageLink(currentPage + 1)"
            class="px-3 py-1.5 rounded-10 text-sm font-medium text-navy border border-border no-underline transition-colors duration-280 hover:border-navy"
            rel="next"
          >
            {{ t('news.nextPage') }} →
          </NuxtLink>
        </div>

        <p class="text-body-sm text-text-muted">
          {{ t('news.pageInfo', { page: currentPage, total: totalPages }) }} ·
          {{ totalArticles }} {{ t('news.articlesCount') }}
        </p>
      </nav>
    </div>
  </div>
</template>
