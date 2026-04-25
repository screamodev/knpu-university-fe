<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusFinancialReport } from '~/types/directus'

definePageMeta({ layout: 'default' })

const { t, locale } = useSafeI18nWithRouter()
const { client, assetUrl } = useDirectus()
const { localized } = useLocalizedField()

useHead({
  title: () => t('nav.links.financialReports'),
  meta: [{ name: 'description', content: () => t('university.financialReports.subtitle') }],
})

const { data: reportsData, pending } = await useAsyncData('financial-reports', () =>
  client.request(
    readItems('financial_reports', {
      fields: [
        'id',
        'reportYear',
        'title',
        'titleEn',
        'summary',
        'summaryEn',
        'revenue',
        'expenses',
        'stateFunding',
        'ownRevenue',
        'order',
        { reportFile: ['id', 'title', 'filename_download'] },
      ],
      sort: ['-reportYear', 'order'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }),
  ),
)

const reports = computed<DirectusFinancialReport[]>(() => {
  return (reportsData.value as DirectusFinancialReport[] | null) ?? []
})

const sortedReports = computed<DirectusFinancialReport[]>(() => {
  return [...reports.value].sort((left, right) => right.reportYear - left.reportYear)
})

const totalRevenue = computed<number>(() => {
  return reports.value.reduce((sum, item) => sum + (item.revenue ?? 0), 0)
})

const totalExpenses = computed<number>(() => {
  return reports.value.reduce((sum, item) => sum + (item.expenses ?? 0), 0)
})

const totalStateFunding = computed<number>(() => {
  return reports.value.reduce((sum, item) => sum + (item.stateFunding ?? 0), 0)
})

const totalOwnRevenue = computed<number>(() => {
  return reports.value.reduce((sum, item) => sum + (item.ownRevenue ?? 0), 0)
})

const totalBalance = computed<number>(() => totalRevenue.value - totalExpenses.value)

const keyFigures = computed<{ key: string; value: string }[]>(() => {
  const budget = totalRevenue.value
  const stateShare = budget > 0 ? (totalStateFunding.value / budget) * 100 : 0
  const ownShare = budget > 0 ? (totalOwnRevenue.value / budget) * 100 : 0
  return [
    { key: 'totalBudget', value: formatCurrency(totalRevenue.value) },
    { key: 'stateShare', value: `${stateShare.toFixed(1)}%` },
    { key: 'ownShare', value: `${ownShare.toFixed(1)}%` },
    { key: 'capital', value: formatCurrency(totalBalance.value) },
  ]
})

const reportMetricLabels = computed(() => {
  if (locale.value === 'en') {
    return {
      revenue: 'Revenue',
      expenses: 'Expenses',
      stateFunding: 'State funding',
      ownRevenue: 'Own revenue',
    }
  }
  return {
    revenue: 'Надходження',
    expenses: 'Видатки',
    stateFunding: 'Державне фінансування',
    ownRevenue: 'Власні надходження',
  }
})

function reportHref(file: DirectusFinancialReport['reportFile']): string {
  if (!file) return '#'
  return assetUrl(file) ?? '#'
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat(locale.value === 'en' ? 'en-US' : 'uk-UA', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 0,
  }).format(value)
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.financialReports.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.financialReports.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.financialReports.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('university.financialReports.intro') }}
      </p>
    </div>

    <!-- Year cards: 3-column, chart placeholder + summary + download -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('university.financialReports.yearCardsTitle') }}
      </h2>
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article
          v-for="i in 3"
          :key="i"
          class="animate-pulse bg-white border border-border rounded-16 p-6"
        >
          <div class="h-8 bg-border rounded w-16 mb-4" />
          <div class="w-full aspect-square max-h-40 rounded-12 bg-border mb-6" />
          <div class="h-4 bg-border rounded w-full mb-2" />
          <div class="h-4 bg-border rounded w-2/3 mb-2" />
          <div class="h-4 bg-border rounded w-3/4" />
        </article>
      </div>
      <div v-else-if="sortedReports.length" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article
          v-for="report in sortedReports"
          :key="report.id"
          class="bg-white border border-border rounded-16 p-6 flex flex-col"
        >
          <h3 class="font-playfair text-xl font-semibold text-navy mb-4">
            {{ report.reportYear }}
          </h3>
          <div
            class="w-full aspect-square max-h-40 rounded-12 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mb-6"
            aria-hidden
          >
            <svg
              class="w-12 h-12 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <line x1="18" y1="20" x2="18" y2="10" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="12" y1="20" x2="12" y2="4" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="6" y1="20" x2="6" y2="14" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <ul class="space-y-2 text-body-sm text-text-muted mb-4">
            <li>
              {{ reportMetricLabels.revenue }}:
              <span class="font-medium text-navy">{{ formatCurrency(report.revenue ?? 0) }}</span>
            </li>
            <li>
              {{ reportMetricLabels.expenses }}:
              <span class="font-medium text-navy">{{ formatCurrency(report.expenses ?? 0) }}</span>
            </li>
            <li>
              {{ reportMetricLabels.stateFunding }}:
              <span class="font-medium text-navy">{{ formatCurrency(report.stateFunding ?? 0) }}</span>
            </li>
            <li>
              {{ reportMetricLabels.ownRevenue }}:
              <span class="font-medium text-navy">{{ formatCurrency(report.ownRevenue ?? 0) }}</span>
            </li>
          </ul>
          <p class="text-body-sm text-text-muted mb-4">
            {{ localized(report, 'summary') || localized(report, 'title') }}
          </p>
          <a
            :href="reportHref(report.reportFile)"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-body-sm font-medium text-gold no-underline hover:text-gold-light transition-colors mt-auto"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke-linecap="round" stroke-linejoin="round" />
              <polyline points="7 10 12 15 17 10" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="12" y1="15" x2="12" y2="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {{ t('university.financialReports.download') }}
          </a>
        </article>
      </div>
      <p v-else class="text-body text-text-muted py-8 text-center bg-off-white border border-border rounded-16">
        {{ locale === 'en' ? 'Financial reports are not published yet.' : 'Фінансові звіти ще не опубліковані.' }}
      </p>
    </div>

    <!-- Key figures: 4 gold numbers -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('university.financialReports.keyFiguresTitle') }}
        </h2>
        <div v-if="sortedReports.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="item in keyFigures"
            :key="item.key"
            class="text-center"
          >
            <p class="font-playfair text-3xl md:text-4xl font-bold text-gold mb-2">
              {{ item.value }}
            </p>
            <p class="text-body-sm text-text-muted">
              {{ t(`university.financialReports.keyFigures.${item.key}.label`) }}
            </p>
          </div>
        </div>
        <p v-else class="text-body text-text-muted py-8 text-center bg-white border border-border rounded-16">
          {{ locale === 'en' ? 'Key figures will appear once reports are available.' : 'Ключові показники з’являться після публікації звітів.' }}
        </p>
      </div>
    </div>
  </div>
</template>
