<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusProzorroProcurement } from '~/types/directus'

definePageMeta({ layout: 'default' })

const { t, locale } = useSafeI18nWithRouter()
const { client } = useDirectus()
const { localized } = useLocalizedField()

useHead({
  title: () => t('nav.links.prozorro'),
  meta: [{ name: 'description', content: () => t('university.prozorro.subtitle') }],
})

const { data: procurementsData, pending } = await useAsyncData('prozorro-procurements', () =>
  client.request(
    readItems('prozorro_procurements', {
      fields: ['id', 'tenderNumber', 'title', 'titleEn', 'amount', 'currency', 'procurementDate', 'state', 'prozorroUrl', 'order'],
      sort: ['-procurementDate', '-order'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }),
  ),
)

const procurements = computed<DirectusProzorroProcurement[]>(() => {
  return (procurementsData.value as DirectusProzorroProcurement[] | null) ?? []
})

const totalTenders = computed<number>(() => procurements.value.length)
const completedTenders = computed<number>(() => procurements.value.filter((item) => item.state === 'completed').length)
const totalValue = computed<number>(() => {
  return procurements.value.reduce((sum, item) => {
    return sum + (item.amount ?? 0)
  }, 0)
})

const displayCurrency = computed<string>(() => {
  const firstCurrency = procurements.value.find((item) => item.currency)?.currency
  return firstCurrency ?? 'UAH'
})

function formatCurrency(value: number, currency: string): string {
  return new Intl.NumberFormat(locale.value === 'en' ? 'en-US' : 'uk-UA', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

function formatProcurementDate(value: string | null): string {
  if (!value) return locale.value === 'en' ? 'Date not specified' : 'Дату не вказано'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'uk-UA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

const PROZORRO_PORTAL_URL = 'https://prozorro.gov.ua'
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.prozorro.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.prozorro.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.prozorro.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('university.prozorro.intro') }}
      </p>
    </div>

    <!-- Stats band: 3 gold numbers -->
    <div class="bg-off-white py-10 lg:py-12">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('university.prozorro.statsTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div class="text-center">
            <p class="font-playfair text-3xl md:text-4xl font-bold text-gold mb-2">
              {{ totalTenders }}
            </p>
            <p class="text-body-sm text-text-muted">
              {{ t('university.prozorro.stats.totalTenders.label') }}
            </p>
          </div>
          <div class="text-center">
            <p class="font-playfair text-3xl md:text-4xl font-bold text-gold mb-2">
              {{ completedTenders }}
            </p>
            <p class="text-body-sm text-text-muted">
              {{ t('university.prozorro.stats.completed.label') }}
            </p>
          </div>
          <div class="text-center">
            <p class="font-playfair text-3xl md:text-4xl font-bold text-gold mb-2">
              {{ formatCurrency(totalValue, displayCurrency) }}
            </p>
            <p class="text-body-sm text-text-muted">
              {{ t('university.prozorro.stats.totalValue.label') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Procurements list: 5–6 card-rows -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('university.prozorro.procurementsTitle') }}
      </h2>
      <div v-if="pending" class="space-y-4">
        <article
          v-for="i in 3"
          :key="i"
          class="animate-pulse bg-white border border-border rounded-16 p-6"
        >
          <div class="h-4 bg-border rounded w-40 mb-2" />
          <div class="h-5 bg-border rounded w-3/4 mb-3" />
          <div class="h-4 bg-border rounded w-2/3" />
        </article>
      </div>
      <div v-else-if="procurements.length" class="space-y-4">
        <article
          v-for="item in procurements"
          :key="item.id"
          class="bg-white border border-border rounded-16 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div class="flex-1 min-w-0">
            <p class="text-body-sm font-mono text-gold mb-1">
              {{ item.tenderNumber }}
            </p>
            <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
              {{ localized(item, 'title') }}
            </h3>
            <div class="flex flex-wrap items-center gap-3 text-body-sm text-text-muted">
              <span>{{ formatCurrency(item.amount ?? 0, item.currency ?? displayCurrency) }}</span>
              <span>·</span>
              <span>{{ formatProcurementDate(item.procurementDate) }}</span>
            </div>
            <a
              v-if="item.prozorroUrl"
              :href="item.prozorroUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex mt-3 text-body-sm font-medium text-navy hover:text-gold transition-colors no-underline"
            >
              {{ locale === 'en' ? 'View on Prozorro' : 'Переглянути у Prozorro' }}
            </a>
          </div>
          <span
            class="inline-flex items-center px-3 py-1 rounded-full text-body-sm font-medium shrink-0"
            :class="{
              'bg-gold/15 text-gold': item.state === 'completed',
              'bg-slate-100 text-slate-600': item.state === 'active',
              'bg-slate-100 text-slate-500': item.state === 'planned',
            }"
          >
            <template v-if="item.state === 'completed'">
              {{ t('university.prozorro.statusCompleted') }}
            </template>
            <template v-else-if="item.state === 'active'">
              {{ t('university.prozorro.statusActive') }}
            </template>
            <template v-else>
              {{ t('university.prozorro.statusPlanned') }}
            </template>
          </span>
        </article>
      </div>
      <p v-else class="text-body text-text-muted py-8 text-center bg-off-white border border-border rounded-16">
        {{ locale === 'en' ? 'Procurement records are not published yet.' : 'Закупівлі ще не опубліковані.' }}
      </p>
    </div>

    <!-- CTA: external Prozorro -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <article class="bg-white border border-border rounded-16 p-8 lg:p-10 border-l-4 border-l-gold max-w-2xl">
          <h2 class="font-playfair text-2xl font-bold text-navy mb-3">
            {{ t('university.prozorro.ctaTitle') }}
          </h2>
          <p class="text-body text-text-muted mb-6">
            {{ t('university.prozorro.ctaSubtitle') }}
          </p>
          <a
            :href="PROZORRO_PORTAL_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-12 no-underline hover:bg-gold-light transition-colors"
          >
            {{ t('university.prozorro.ctaButton') }}
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </article>
      </div>
    </div>
  </div>
</template>
