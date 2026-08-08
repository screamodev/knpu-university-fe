<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusScienceDefense } from '~/types/directus'

definePageMeta({ layout: 'default' })

const { t, locale } = useSafeI18nWithRouter()
const { client } = useDirectus()
const { localized } = useLocalizedField()
const localePath = useLocalePath()

useHead({
  title: () => t('nav.links.defenses'),
  meta: [{ name: 'description', content: () => t('science.defenses.subtitle') }],
})

const { data: defensesData, pending } = await useAsyncData('science-defenses', () =>
  client.request(
    readItems('science_defenses', {
      fields: [
        'id',
        'candidateName',
        'candidateNameEn',
        'dissertationTitle',
        'dissertationTitleEn',
        'specialty',
        'specialtyEn',
        'defenseDate',
        'board',
        'boardEn',
        'result',
        'resultEn',
        'isUpcoming',
        'order',
      ],
      sort: ['-isUpcoming', 'defenseDate', 'order'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }),
  ),
)

const defenses = computed<DirectusScienceDefense[]>(() => {
  return (defensesData.value as DirectusScienceDefense[] | null) ?? []
})

const upcomingDefenses = computed<DirectusScienceDefense[]>(() => {
  return [...defenses.value]
    .filter((item) => item.isUpcoming)
    .sort((left, right) => {
      return Date.parse(left.defenseDate) - Date.parse(right.defenseDate)
    })
})

const pastDefenses = computed<DirectusScienceDefense[]>(() => {
  return [...defenses.value]
    .filter((item) => !item.isUpcoming)
    .sort((left, right) => {
      return Date.parse(right.defenseDate) - Date.parse(left.defenseDate)
    })
})

function formatDefenseDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

function defenseDateBadge(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '--'
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'uk-UA', {
    day: '2-digit',
    month: '2-digit',
  }).format(date)
}

function defenseYear(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '--'
  return String(date.getFullYear())
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('science.defenses.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.defenses.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.defenses.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro + upcoming + past -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-8">
        {{ t('science.defenses.intro') }}
      </p>

      <NuxtLink
        :to="localePath('/science/dissertation-councils')"
        class="block rounded-16 border border-border p-6 no-underline hover:border-gold transition-colors mb-12"
      >
        <span class="block font-playfair text-lg font-semibold text-navy">
          {{ t('nav.links.dissertationCouncils') }}
        </span>
        <span class="block text-body-sm text-text-muted mt-1">
          {{ t('science.dissertationCouncils.subtitle') }}
        </span>
      </NuxtLink>

      <!-- Upcoming defenses: 3 event-style cards -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('science.defenses.upcomingTitle') }}
      </h2>
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <article
          v-for="i in 3"
          :key="i"
          class="animate-pulse bg-white border border-border rounded-16 p-6"
        >
          <div class="w-14 h-14 rounded-12 bg-border mb-4" />
          <div class="h-5 bg-border rounded w-2/3 mb-3" />
          <div class="h-4 bg-border rounded w-3/4 mb-2" />
          <div class="h-4 bg-border rounded w-2/3" />
        </article>
      </div>
      <div v-else-if="upcomingDefenses.length" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <article
          v-for="item in upcomingDefenses"
          :key="item.id"
          class="bg-white border border-border rounded-16 p-6 flex flex-col"
        >
          <div
            class="inline-flex items-center justify-center w-14 h-14 rounded-12 bg-gold/15 text-gold font-playfair text-lg font-bold shrink-0 mb-4"
          >
            {{ defenseDateBadge(item.defenseDate) }}
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-1">
            {{ localized(item, 'candidateName') }}
          </h3>
          <p class="text-body-sm text-text-muted font-medium mb-2">
            {{ localized(item, 'dissertationTitle') }}
          </p>
          <span class="inline-block text-[11px] font-semibold tracking-wider uppercase text-gold mb-1">
            {{ localized(item, 'specialty') || (locale === 'en' ? 'Specialty not specified' : 'Спеціальність не вказано') }}
          </span>
          <p class="text-body-sm text-text-muted mb-2">
            {{ formatDefenseDate(item.defenseDate) }}
          </p>
          <p class="text-body-sm text-text-muted mt-auto">
            {{ localized(item, 'board') || (locale === 'en' ? 'Board not specified' : 'Раду не вказано') }}
          </p>
        </article>
      </div>
      <p v-else class="text-body text-text-muted text-center py-8 bg-off-white border border-border rounded-16 mb-14">
        {{ locale === 'en' ? 'Upcoming defenses are not published yet.' : 'Майбутні захисти ще не опубліковані.' }}
      </p>

      <!-- Past defenses: bg-off-white, table-style list -->
      <section class="bg-off-white rounded-16 border border-border p-8 lg:p-10">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('science.defenses.pastTitle') }}
        </h2>
        <div v-if="pending" class="space-y-3">
          <div
            v-for="i in 4"
            :key="i"
            class="animate-pulse bg-white/80 border border-border rounded-12 p-4 sm:px-4 sm:py-3 flex flex-col sm:grid sm:gap-4 sm:items-center gap-2"
            style="grid-template-columns: 60px 1fr 1.5fr 1fr 100px"
          >
            <div class="h-4 bg-border rounded w-10" />
            <div class="h-4 bg-border rounded w-3/4" />
            <div class="h-4 bg-border rounded w-full" />
            <div class="h-4 bg-border rounded w-2/3" />
            <div class="h-4 bg-border rounded w-16" />
          </div>
        </div>
        <div v-else-if="pastDefenses.length" class="overflow-x-auto">
          <div class="min-w-[600px] space-y-3">
            <!-- Header row (desktop) -->
            <div
              class="hidden sm:grid gap-4 px-4 py-3 text-body-sm font-semibold text-text-muted border-b border-border"
              style="grid-template-columns: 60px 1fr 1.5fr 1fr 100px"
            >
              <span>{{ t('science.defenses.tableYear') }}</span>
              <span>{{ t('science.defenses.tableCandidate') }}</span>
              <span>{{ t('science.defenses.tableTitle') }}</span>
              <span>{{ t('science.defenses.tableSpecialty') }}</span>
              <span>{{ t('science.defenses.tableResult') }}</span>
            </div>
            <div
              v-for="item in pastDefenses"
              :key="item.id"
              class="bg-white/80 border border-border rounded-12 p-4 sm:px-4 sm:py-3 flex flex-col sm:grid sm:gap-4 sm:items-center gap-2"
              style="grid-template-columns: 60px 1fr 1.5fr 1fr 100px"
            >
              <span class="text-body-sm text-text-muted">
                {{ defenseYear(item.defenseDate) }}
              </span>
              <span class="text-body-sm font-medium text-navy">
                {{ localized(item, 'candidateName') }}
              </span>
              <span class="font-medium text-navy">
                {{ localized(item, 'dissertationTitle') }}
              </span>
              <span class="text-body-sm text-text-muted">
                {{ localized(item, 'specialty') || (locale === 'en' ? 'N/A' : 'Н/Д') }}
              </span>
              <span class="text-body-sm text-navy">
                {{ localized(item, 'result') || (locale === 'en' ? 'Result pending' : 'Результат очікується') }}
              </span>
            </div>
          </div>
        </div>
        <p v-else class="text-body text-text-muted py-8 text-center bg-white border border-border rounded-12">
          {{ locale === 'en' ? 'Past defenses are not published yet.' : 'Минулі захисти ще не опубліковані.' }}
        </p>
      </section>
    </div>
  </div>
</template>
