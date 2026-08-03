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

const { data: procurementsData } = await useAsyncData('prozorro-procurements', () =>
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

/** The same widget the old site embedded: state purchases for ЄДРПОУ 02125585. */
const PROZORRO_WIDGET_URL
  = 'https://my.zakupki.prom.ua/remote/widget/state_purchase_iframe/'
    + '570e8020-99cd-4510-916c-e34351ba72e2?locale=uk&srn=02125585'
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

    <!--
      The old site published nothing of its own here — its whole page was this prom.ua widget,
      keyed on the university's ЄДРПОУ (srn=02125585). Keeping it means the list stays live
      without anyone re-typing tenders into the CMS.
    -->
    <div class="bg-off-white py-10 lg:py-12">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
          {{ t('university.prozorro.widgetTitle') }}
        </h2>
        <div class="bg-white border border-border rounded-16 overflow-hidden">
          <iframe
            :src="PROZORRO_WIDGET_URL"
            :title="t('university.prozorro.widgetTitle')"
            loading="lazy"
            class="w-full min-h-[800px] border-0"
          />
        </div>
        <p class="mt-3 text-body-sm text-text-muted">
          {{ t('university.prozorro.widgetNote') }}
        </p>
      </div>
    </div>

    <!-- Optional hand-curated rows; hidden entirely while the collection is empty. -->
    <div v-if="procurements.length" class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('university.prozorro.procurementsTitle') }}
      </h2>
      <div class="space-y-4">
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
    </div>

    <!--
      «Інформація про публічні закупівлі» from the client's list: procurement paperwork that is
      not a Prozorro record. Editors add rows in Directus under the `procurement-info` section.
    -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('university.prozorro.documentsTitle') }}
      </h2>
      <SharedDocumentList section="procurement-info" />
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
