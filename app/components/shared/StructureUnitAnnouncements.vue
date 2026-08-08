<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusArticle } from '~/types/news'
import { ANNOUNCEMENTS_CATEGORY_SLUG } from '~/utils/announcements'

/**
 * Sidebar «Оголошення» list under unit contacts — titles as bullets linking to articles.
 * Prefers items tagged with both the unit news category and «ogoloshennya»; falls back to
 * university-wide announcements so the card is not empty on most faculties.
 */
const props = defineProps<{ unitCategorySlug: string }>()

const { t, localePath, locale } = useSafeI18nWithRouter()
const { client } = useDirectus()
const { localized } = useLocalizedField()

const LIMIT = 5

async function fetchAnnouncements(dual: boolean): Promise<DirectusArticle[]> {
  const categoryFilter = dual
    ? {
        _and: [
          { categories: { categories_id: { slug: { _eq: props.unitCategorySlug } } } },
          { categories: { categories_id: { slug: { _eq: ANNOUNCEMENTS_CATEGORY_SLUG } } } },
        ],
      }
    : { categories: { categories_id: { slug: { _eq: ANNOUNCEMENTS_CATEGORY_SLUG } } } }

  return client.request(
    readItems('articles', {
      fields: ['id', 'slug', 'title', 'titleEn', 'date_published', 'publishedAt', 'date_created'],
      sort: ['-date_published'],
      limit: LIMIT,
      filter: categoryFilter,
    }),
  ) as Promise<DirectusArticle[]>
}

const { data } = await useAsyncData(
  () => `structure-announcements-${props.unitCategorySlug}-${locale.value}`,
  async () => {
    const dual = await fetchAnnouncements(true)
    if (dual.length) return dual
    return fetchAnnouncements(false)
  },
  { watch: [() => props.unitCategorySlug] },
)

const articles = computed(() => data.value ?? [])
</script>

<template>
  <div class="bg-off-white border border-border rounded-16 p-5">
    <h2 class="font-playfair text-lg font-bold text-navy mb-4">
      {{ t('university.structure.unit.announcementsTitle') }}
    </h2>

    <ul v-if="articles.length" class="flex flex-col gap-2.5 list-none m-0 p-0">
      <li
        v-for="article in articles"
        :key="article.id"
        class="flex gap-2.5 items-start"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-navy shrink-0 mt-2" aria-hidden />
        <NuxtLink
          :to="localePath(`/news/${article.slug}`)"
          class="text-body-sm text-navy no-underline leading-snug hover:text-gold transition-colors duration-280"
        >
          {{ localized(article, 'title') }}
        </NuxtLink>
      </li>
    </ul>

    <p v-else class="text-body-sm text-text-muted m-0">
      {{ t('university.structure.unit.announcementsEmpty') }}
    </p>
  </div>
</template>
