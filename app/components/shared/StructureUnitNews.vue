<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusArticle } from '~/types/news'
import { resolveMediaSrc } from '~/utils/directusMedia'

/**
 * News feed for one unit: the shared `articles` collection filtered by the unit's category.
 * Nothing is duplicated per faculty — an article is tagged with one category and shows up both
 * here and in the site-wide news list.
 *
 * The categories form a tree (`categories.parent`): a кафедра's category sits under its faculty's.
 * `includeChildren` rolls that up on a faculty page, and `fallbackCategorySlug` lets a кафедра page
 * show its faculty's feed until the кафедра starts publishing under its own category.
 */
const props = withDefaults(
  defineProps<{
    categorySlug: string
    limit?: number
    /** Hide the bottom «all news» link when the parent section already provides one. */
    hideAllLink?: boolean
    /** Also show articles of categories whose parent is `categorySlug`. */
    includeChildren?: boolean
    /** Shown as well — used by кафедра pages, whose own category is usually still empty. */
    fallbackCategorySlug?: string | null
  }>(),
  { limit: 9, hideAllLink: false, includeChildren: false, fallbackCategorySlug: null },
)

const { t, localePath, locale } = useSafeI18nWithRouter()
const { client } = useDirectus()
const { mediaResolvers } = useMediaResolvers()
const { localized } = useLocalizedField()

const limit = computed(() => props.limit ?? 9)
const isPreview = computed(() => limit.value <= 3)

/** One `_or` over the unit's own category, its children and the fallback, as configured. */
const categoryFilter = computed(() => {
  const clauses: Record<string, unknown>[] = [
    { categories: { categories_id: { slug: { _eq: props.categorySlug } } } },
  ]
  if (props.includeChildren) {
    clauses.push({ categories: { categories_id: { parent: { slug: { _eq: props.categorySlug } } } } })
  }
  if (props.fallbackCategorySlug) {
    clauses.push({ categories: { categories_id: { slug: { _eq: props.fallbackCategorySlug } } } })
  }
  return clauses.length === 1 ? clauses[0]! : { _or: clauses }
})

const { data } = await useAsyncData(
  () => `structure-news-${props.categorySlug}-${props.fallbackCategorySlug ?? ''}`
    + `-${props.includeChildren ? 'tree' : 'own'}-${locale.value}-${limit.value}`,
  () =>
    client.request(
      readItems('articles', {
        fields: ['*', { cover: ['*'] }],
        sort: ['-date_published'],
        limit: limit.value,
        filter: categoryFilter.value as never,
      }),
    ),
  { watch: [() => props.categorySlug, () => props.fallbackCategorySlug, () => props.includeChildren, limit] },
)

const articles = computed(() => data.value ?? [])

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat(locale.value === 'uk' ? 'uk-UA' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

function publishedAt(article: DirectusArticle): string {
  return article.date_published ?? article.publishedAt ?? article.date_created ?? ''
}

function coverSrc(cover: DirectusArticle['cover']): string {
  return resolveMediaSrc(cover, mediaResolvers, CARD_COVER_TRANSFORM)
}
</script>

<template>
  <div>
    <div
      v-if="articles.length"
      class="grid grid-cols-1 gap-6"
      :class="isPreview ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'"
    >
      <NuxtLink
        v-for="article in articles"
        :key="article.id"
        :to="localePath(`/news/${article.slug}`)"
        class="group bg-off-white border border-border rounded-16 overflow-hidden no-underline flex flex-col transition-all duration-280 hover:border-gold hover:-translate-y-1 hover:shadow-gold"
      >
        <div v-if="article.cover && coverSrc(article.cover)" class="aspect-[5/2] bg-navy-mid overflow-hidden relative">
          <img
            :style="{ objectPosition: objectPositionFromFile(article.cover) }"
            :src="coverSrc(article.cover)"
            :alt="localized(article, 'title')"
            loading="lazy"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-280 group-hover:scale-105"
          />
        </div>
        <div class="p-5 flex flex-col flex-1">
          <div class="font-playfair text-[15px] font-semibold text-navy leading-snug flex-1 mb-3">
            {{ localized(article, 'title') }}
          </div>
          <div class="text-xs text-text-muted">{{ formatDate(publishedAt(article)) }}</div>
          <span
            v-if="isPreview"
            class="mt-3 inline-flex text-sm font-medium text-navy group-hover:text-gold transition-colors"
          >
            {{ t('common.readMore') }}
          </span>
        </div>
      </NuxtLink>
    </div>

    <p v-else class="text-text-muted">
      {{ t('university.structure.unit.newsEmpty') }}
    </p>

    <NuxtLink
      v-if="!hideAllLink"
      :to="{ path: localePath('/news'), query: { category: categorySlug } }"
      class="mt-8 inline-flex items-center gap-2 text-navy font-medium hover:text-gold transition-colors duration-280"
    >
      {{ t('university.structure.unit.newsAll') }}
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </NuxtLink>
  </div>
</template>
