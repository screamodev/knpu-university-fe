<script setup lang="ts">
import { readItems } from '@directus/sdk'
import { resolveMediaSrc } from '~/utils/directusMedia'

definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()
const { client } = useDirectus()
const { localized } = useLocalizedField()
const { mediaResolvers } = useMediaResolvers()

useHead({
  title: () => t('nav.links.gallery'),
  meta: [{ name: 'description', content: () => t('university.gallery.subtitle') }],
})

const selectedCategory = ref<string | null>(null)
const currentPage = ref(1)
const itemsPerPage = 12

const { data: categoriesData } = await useAsyncData('gallery-categories', () =>
  client.request(
    readItems('gallery_categories', {
      fields: ['id', 'name', 'nameEn', 'slug', 'order'],
      sort: ['order'],
      filter: { status: { _eq: 'published' } },
    }),
  ),
)

const categories = computed(() => categoriesData.value ?? [])

const categoryFilter = computed(() => {
  if (!selectedCategory.value) {
    return {}
  }

  return { category: { slug: { _eq: selectedCategory.value } } }
})

const { data: totalItemsData } = await useAsyncData(
  'gallery-total-items',
  () =>
    client.request(
      readItems('gallery_items', {
        fields: ['id'],
        sort: ['order'],
        filter: {
          status: { _eq: 'published' },
          ...categoryFilter.value,
        },
        limit: -1,
      }),
    ),
  { watch: [selectedCategory] },
)

const totalItems = computed(() => totalItemsData.value?.length ?? 0)
const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / itemsPerPage)))

watch(selectedCategory, () => {
  currentPage.value = 1
})

watch(totalPages, (newTotalPages) => {
  if (currentPage.value > newTotalPages) {
    currentPage.value = newTotalPages
  }
})

const { data: galleryItemsData, pending } = useAsyncData(
  'gallery-items',
  () =>
    client.request(
      readItems('gallery_items', {
        fields: ['id', 'title', 'titleEn', 'colSpan', 'rowSpan', { image: ['id', 'title', 'filename_download', 'description'] }],
        sort: ['order'],
        filter: {
          status: { _eq: 'published' },
          ...categoryFilter.value,
        },
        page: currentPage.value,
        limit: itemsPerPage,
      }),
    ),
  { watch: [selectedCategory, currentPage] },
)

const galleryItems = computed(() => galleryItemsData.value ?? [])

const hasPreviousPage = computed(() => currentPage.value > 1)
const hasNextPage = computed(() => currentPage.value < totalPages.value)

function selectCategory(categorySlug: string | null): void {
  selectedCategory.value = categorySlug
}

function goToPreviousPage(): void {
  if (!hasPreviousPage.value) {
    return
  }
  currentPage.value -= 1
}

function goToNextPage(): void {
  if (!hasNextPage.value) {
    return
  }
  currentPage.value += 1
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.gallery.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.gallery.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.gallery.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Category tabs -->
      <div v-if="categories.length" class="flex flex-wrap gap-2 mb-10">
        <button
          class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
          :class="
            selectedCategory === null
              ? 'bg-navy text-white border-navy'
              : 'bg-white text-navy border-border hover:border-navy'
          "
          @click="selectCategory(null)"
        >
          {{ t('university.gallery.allCategories') }}
        </button>
        <button
          v-for="category in categories"
          :key="category.id"
          class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
          :class="
            selectedCategory === category.slug
              ? 'bg-navy text-white border-navy'
              : 'bg-white text-navy border-border hover:border-navy'
          "
          @click="selectCategory(category.slug)"
        >
          {{ localized(category, 'name') }}
        </button>
      </div>

      <!-- Masonry-style image grid -->
      <div
        v-if="pending"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 grid-auto-rows-[140px]"
      >
        <div
          v-for="item in itemsPerPage"
          :key="item"
          class="rounded-16 bg-off-white border border-border animate-pulse min-h-[140px]"
        />
      </div>
      <div
        v-else-if="galleryItems.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 grid-auto-rows-[140px]"
      >
        <div
          v-for="item in galleryItems"
          :key="item.id"
          class="group relative overflow-hidden rounded-16 bg-gradient-to-br from-navy-mid to-navy-deep min-h-[140px] flex items-center justify-center"
          :class="[
            item.colSpan > 1 ? 'lg:col-span-2' : '',
            item.rowSpan > 1 ? 'lg:row-span-2' : '',
          ]"
        >
          <img
            v-if="resolveMediaSrc(item.image, mediaResolvers)"
            :src="resolveMediaSrc(item.image, mediaResolvers)"
            :alt="localized(item, 'title')"
            class="w-full h-full object-cover transition-transform duration-280 group-hover:scale-105"
          />
          <svg
            v-else
            class="w-10 h-10 text-gold/30 transition-transform duration-280 group-hover:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <!-- Hover overlay with zoom icon -->
          <div
            class="absolute inset-0 bg-navy-deep/60 opacity-0 group-hover:opacity-100 transition-opacity duration-280 flex items-center justify-center"
            aria-hidden="true"
          >
            <div class="px-4 py-2 rounded-100 bg-white/20 text-white text-body-sm text-center">
              {{ localized(item, 'title') }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="py-24 text-center text-text-muted">
        {{ t('news.noArticles') }}
      </div>

      <div v-if="totalItems > 0" class="flex items-center justify-between gap-4 mt-10">
        <p class="text-body-sm text-text-muted">
          {{ currentPage }} / {{ totalPages }}
        </p>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
            :class="
              hasPreviousPage
                ? 'bg-white text-navy border-border hover:border-navy'
                : 'bg-off-white text-text-muted border-border cursor-not-allowed'
            "
            :disabled="!hasPreviousPage"
            @click="goToPreviousPage"
          >
            Prev
          </button>
          <button
            type="button"
            class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
            :class="
              hasNextPage
                ? 'bg-white text-navy border-border hover:border-navy'
                : 'bg-off-white text-text-muted border-border cursor-not-allowed'
            "
            :disabled="!hasNextPage"
            @click="goToNextPage"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
