<script setup lang="ts">
import type { StrapiPaginatedResponse, StrapiArticle, StrapiCategory } from '~/types/news'

definePageMeta({ layout: 'default' })

const { t, localePath, locale } = useSafeI18nWithRouter()
const strapi = useStrapi()
const { localized } = useLocalizedField()
const { isAdmin } = useAuth()

useHead({
  title: () => t('sections.news.title'),
  meta: [{ name: 'description', content: () => t('sections.news.title') }],
})

const selectedCategorySlug = ref<string | null>(null)

const { data: categoriesData } = await useFetch<StrapiPaginatedResponse<StrapiCategory>>(
  strapi.apiUrl('/categories'),
  { key: 'strapi-categories' },
)
const categories = computed(() => categoriesData.value?.data ?? [])

const { data: articlesData, pending } = useAsyncData(
  'news-listing',
  () => {
    const params = new URLSearchParams({
      'populate[0]': 'cover',
      'populate[1]': 'category',
      sort: 'publishedAt:desc',
      'pagination[pageSize]': '12',
    })
    if (selectedCategorySlug.value) {
      params.set('filters[category][slug][$eq]', selectedCategorySlug.value)
    }
    return $fetch<StrapiPaginatedResponse<StrapiArticle>>(
      strapi.apiUrl(`/articles?${params.toString()}`),
    )
  },
  { watch: [selectedCategorySlug] },
)

const articles = computed(() => articlesData.value?.data ?? [])

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat(locale.value === 'uk' ? 'uk-UA' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
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
          <ClientOnly>
            <div
              v-if="isAdmin"
              class="flex flex-wrap gap-2 shrink-0"
            >
              <NuxtLink
                :to="localePath('/admin/articles/create')"
                class="inline-flex items-center justify-center rounded-10 bg-gold px-4 py-2.5 text-xs font-bold font-geologica text-navy-deep no-underline border border-gold-light/80 shadow-sm hover:bg-gold-light transition-all duration-280"
              >
                {{ t('admin.createArticle') }}
              </NuxtLink>
              <NuxtLink
                :to="localePath('/admin/articles')"
                class="inline-flex items-center justify-center rounded-10 border border-white/35 px-4 py-2.5 text-xs font-bold font-geologica text-white no-underline hover:bg-white/10 transition-colors duration-280"
              >
                {{ t('admin.articlesTitle') }}
              </NuxtLink>
            </div>
            <template #fallback />
          </ClientOnly>
        </div>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Category filters -->
      <div v-if="categories.length" class="flex flex-wrap gap-2 mb-10">
        <button
          class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
          :class="
            selectedCategorySlug === null
              ? 'bg-navy text-white border-navy'
              : 'bg-white text-navy border-border hover:border-navy'
          "
          @click="selectedCategorySlug = null"
        >
          {{ t('news.allCategories') }}
        </button>
        <button
          v-for="category in categories"
          :key="category.id"
          class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
          :class="
            selectedCategorySlug === category.slug
              ? 'bg-navy text-white border-navy'
              : 'bg-white text-navy border-border hover:border-navy'
          "
          @click="selectedCategorySlug = category.slug"
        >
          {{ localized(category, 'name') }}
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
              v-if="article.cover"
              :src="strapi.imageUrl(article.cover.url) ?? ''"
              :alt="article.cover.alternativeText ?? localized(article, 'title')"
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
              {{ article.category ? localized(article.category, 'name') : '' }}
            </div>
            <div class="font-playfair text-[16px] font-semibold text-navy leading-snug flex-1 mb-3">
              {{ localized(article, 'title') }}
            </div>
            <p v-if="localized(article, 'excerpt')" class="text-sm text-text-muted line-clamp-2 mb-3">
              {{ localized(article, 'excerpt') }}
            </p>
            <div class="text-xs text-text-muted">{{ formatDate(article.publishedAt) }}</div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-else class="py-24 text-center text-text-muted">
        {{ t('news.noArticles') }}
      </div>
    </div>
  </div>
</template>
