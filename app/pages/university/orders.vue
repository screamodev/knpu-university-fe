<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusUniversityOrder } from '~/types/directus'

definePageMeta({ layout: 'default' })

const { t, locale } = useSafeI18nWithRouter()
const { client, assetUrl } = useDirectus()
const { localized } = useLocalizedField()

useHead({
  title: () => t('nav.links.orders'),
  meta: [{ name: 'description', content: () => t('university.orders.subtitle') }],
})

type YearFilter = string | null

const selectedYear = ref<YearFilter>(null)

const { data: ordersData, pending } = await useAsyncData('university-orders', () =>
  client.request(
    readItems('university_orders', {
      fields: [
        'id',
        'orderNumber',
        'orderDate',
        'title',
        'titleEn',
        'category',
        'categoryEn',
        'year',
        'order',
        { documentFile: ['id', 'title', 'filename_download'] },
      ],
      sort: ['-orderDate', '-order'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }),
  ),
)

const orders = computed<DirectusUniversityOrder[]>(() => {
  return (ordersData.value as DirectusUniversityOrder[] | null) ?? []
})

function extractOrderYear(item: DirectusUniversityOrder): string | null {
  if (item.year !== null && item.year !== undefined) return String(item.year)
  const date = new Date(item.orderDate)
  if (Number.isNaN(date.getTime())) return null
  return String(date.getFullYear())
}

const yearOptions = computed<{ value: YearFilter; label: string }[]>(() => {
  const years = new Set<string>()
  for (const item of orders.value) {
    const year = extractOrderYear(item)
    if (year) years.add(year)
  }
  const sortedYears = Array.from(years).sort((left, right) => Number(right) - Number(left))
  return [
    ...sortedYears.map((year) => ({ value: year, label: year })),
    { value: null, label: t('university.orders.filterAll') },
  ]
})

const filteredOrders = computed<DirectusUniversityOrder[]>(() => {
  if (!selectedYear.value) return orders.value
  return orders.value.filter((item) => extractOrderYear(item) === selectedYear.value)
})

function formatOrderDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'uk-UA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

function orderFileHref(file: DirectusUniversityOrder['documentFile']): string {
  if (!file) return '#'
  return assetUrl(file) ?? '#'
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.orders.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.orders.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.orders.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Intro -->
      <p class="text-body text-text-muted max-w-3xl mb-10">
        {{ t('university.orders.intro') }}
      </p>

      <!-- Year filter tabs: pill buttons -->
      <div class="flex flex-wrap gap-2 mb-10">
        <button
          v-for="opt in yearOptions"
          :key="opt.value ?? 'all'"
          type="button"
          class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
          :class="
            selectedYear === opt.value
              ? 'bg-navy text-white border-navy'
              : 'bg-white text-navy border-border hover:border-navy'
          "
          @click="selectedYear = opt.value as YearFilter"
        >
          {{ opt.label }}
        </button>
      </div>

      <!-- Document list: stacked card-rows, alternating style -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('university.orders.documentsTitle') }}
      </h2>
      <div v-if="pending" class="space-y-3">
        <div
          v-for="i in 4"
          :key="i"
          class="animate-pulse rounded-12 p-4 sm:px-4 sm:py-3 flex flex-col sm:grid sm:gap-4 sm:items-center gap-2 border border-border bg-off-white"
          style="grid-template-columns: 80px 110px 1fr auto"
        >
          <div class="h-4 bg-border rounded w-14" />
          <div class="h-4 bg-border rounded w-20" />
          <div class="h-4 bg-border rounded w-full" />
          <div class="h-4 bg-border rounded w-16" />
        </div>
      </div>
      <div v-else-if="filteredOrders.length" class="space-y-3">
        <div
          v-for="(item, index) in filteredOrders"
          :key="item.id"
          class="rounded-12 p-4 sm:px-4 sm:py-3 flex flex-col sm:grid sm:gap-4 sm:items-center gap-2 border border-border"
          :class="index % 2 === 0 ? 'bg-off-white' : 'bg-white'"
          style="grid-template-columns: 80px 110px 1fr auto"
        >
          <span class="text-body-sm font-medium text-navy">
            {{ item.orderNumber }}
          </span>
          <span class="text-body-sm text-text-muted">
            {{ formatOrderDate(item.orderDate) }}
          </span>
          <a
            :href="orderFileHref(item.documentFile)"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium text-navy hover:text-gold transition-colors no-underline"
          >
            {{ localized(item, 'title') }}
          </a>
          <span class="text-body-sm">
            <span class="inline-block px-2.5 py-0.5 rounded bg-gold/15 text-gold font-medium">
              {{ localized(item, 'category') }}
            </span>
          </span>
        </div>
      </div>
      <p v-else class="text-body text-text-muted py-8 text-center">
        {{ locale === 'en' ? 'No orders found for the selected year.' : 'Для обраного року наказів не знайдено.' }}
      </p>
    </div>
  </div>
</template>
