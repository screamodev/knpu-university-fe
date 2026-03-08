<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.gallery'),
  meta: [{ name: 'description', content: () => t('university.gallery.subtitle') }],
})

const categoryKeys = ['campus', 'events', 'studentLife', 'sports'] as const
type CategorySlug = (typeof categoryKeys)[number] | null

const selectedCategory = ref<CategorySlug>(null)

/** Masonry grid items: colSpan/rowSpan for lg grid (4 cols); on smaller screens all 1x1 */
const gridItems = [
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 2, rowSpan: 1 },
  { colSpan: 1, rowSpan: 2 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 2, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 2 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
]
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
      <div class="flex flex-wrap gap-2 mb-10">
        <button
          class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
          :class="
            selectedCategory === null
              ? 'bg-navy text-white border-navy'
              : 'bg-white text-navy border-border hover:border-navy'
          "
          @click="selectedCategory = null"
        >
          {{ t('university.gallery.allCategories') }}
        </button>
        <button
          v-for="key in categoryKeys"
          :key="key"
          class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
          :class="
            selectedCategory === key
              ? 'bg-navy text-white border-navy'
              : 'bg-white text-navy border-border hover:border-navy'
          "
          @click="selectedCategory = key"
        >
          {{ t(`university.gallery.categories.${key}`) }}
        </button>
      </div>

      <!-- Masonry-style image grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 grid-auto-rows-[140px]"
      >
        <div
          v-for="(item, index) in gridItems"
          :key="index"
          class="group relative overflow-hidden rounded-16 bg-gradient-to-br from-navy-mid to-navy-deep min-h-[140px] flex items-center justify-center"
          :class="[
            item.colSpan === 2 ? 'lg:col-span-2' : '',
            item.rowSpan === 2 ? 'lg:row-span-2' : '',
          ]"
        >
          <svg
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
            <span
              class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white"
            >
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
                <path d="M11 8v6M8 11h6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
