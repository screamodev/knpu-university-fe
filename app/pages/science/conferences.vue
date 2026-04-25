<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusScienceConference } from '~/types/directus'

definePageMeta({ layout: 'default' })

const { t, locale } = useSafeI18nWithRouter()
const { client } = useDirectus()
const { localized } = useLocalizedField()

useHead({
  title: () => t('nav.links.conferences'),
  meta: [{ name: 'description', content: () => t('science.conferences.subtitle') }],
})

const { data: conferencesData, pending } = await useAsyncData('science-conferences', () =>
  client.request(
    readItems('science_conferences', {
      fields: [
        'id',
        'title',
        'titleEn',
        'description',
        'descriptionEn',
        'conferenceType',
        'location',
        'locationEn',
        'eventDate',
        'isUpcoming',
        'participantsSummary',
        'participantsSummaryEn',
        'order',
      ],
      sort: ['-isUpcoming', 'eventDate', 'order'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }),
  ),
)

const conferences = computed<DirectusScienceConference[]>(() => {
  return (conferencesData.value as DirectusScienceConference[] | null) ?? []
})

const upcomingConferences = computed<DirectusScienceConference[]>(() => {
  return [...conferences.value]
    .filter((item) => item.isUpcoming)
    .sort((left, right) => Date.parse(left.eventDate) - Date.parse(right.eventDate))
})

const pastConferences = computed<DirectusScienceConference[]>(() => {
  return [...conferences.value]
    .filter((item) => !item.isUpcoming)
    .sort((left, right) => Date.parse(right.eventDate) - Date.parse(left.eventDate))
})

function conferenceDateBadge(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '--'
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'uk-UA', {
    day: '2-digit',
    month: '2-digit',
  }).format(date)
}

function conferenceYear(value: string): string {
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
          {{ t('science.conferences.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.conferences.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.conferences.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('science.conferences.intro') }}
      </p>

      <!-- Upcoming events: 3 event-style cards -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('science.conferences.upcomingTitle') }}
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
          <div class="h-4 bg-border rounded w-full" />
        </article>
      </div>
      <div v-else-if="upcomingConferences.length" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <article
          v-for="item in upcomingConferences"
          :key="item.id"
          class="bg-white border border-border rounded-16 p-6 flex flex-col"
        >
          <div
            class="inline-flex items-center justify-center w-14 h-14 rounded-12 bg-gold/15 text-gold font-playfair text-lg font-bold shrink-0 mb-4"
          >
            {{ conferenceDateBadge(item.eventDate) }}
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ localized(item, 'title') }}
          </h3>
          <span class="inline-block text-[11px] font-semibold tracking-wider uppercase text-gold mb-2">
            {{ item.conferenceType || (locale === 'en' ? 'Conference' : 'Конференція') }}
          </span>
          <p class="text-body-sm text-text-muted flex items-center gap-2 mb-2">
            <span class="w-5 h-5 rounded bg-slate-100 flex items-center justify-center shrink-0">
              <svg
                class="w-3 h-3 text-slate-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            {{ localized(item, 'location') || (locale === 'en' ? 'Location not specified' : 'Локацію не вказано') }}
          </p>
          <p class="text-body-sm text-text-muted mt-auto">
            {{ localized(item, 'description') }}
          </p>
        </article>
      </div>
      <p v-else class="text-body text-text-muted text-center py-8 bg-off-white border border-border rounded-16 mb-14">
        {{ locale === 'en' ? 'Upcoming conferences are not published yet.' : 'Майбутні конференції ще не опубліковані.' }}
      </p>

      <!-- Past events: bg-off-white, 4-column grid of compact cards -->
      <section class="bg-off-white rounded-16 border border-border p-8 lg:p-10">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('science.conferences.pastTitle') }}
        </h2>
        <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <article
            v-for="i in 4"
            :key="i"
            class="animate-pulse bg-white/80 border border-border rounded-12 p-4"
          >
            <div class="h-3 bg-border rounded w-12 mb-2" />
            <div class="h-5 bg-border rounded w-full mb-2" />
            <div class="h-4 bg-border rounded w-2/3" />
          </article>
        </div>
        <div v-else-if="pastConferences.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <article
            v-for="item in pastConferences"
            :key="item.id"
            class="bg-white/80 border border-border rounded-12 p-4 text-slate-600"
          >
            <span class="text-[11px] font-semibold tracking-wider text-slate-500 uppercase block mb-2">
              {{ conferenceYear(item.eventDate) }}
            </span>
            <h3 class="font-playfair text-base font-semibold text-navy mb-2">
              {{ localized(item, 'title') }}
            </h3>
            <p class="text-body-sm text-slate-500">
              {{ localized(item, 'participantsSummary') || localized(item, 'description') || (locale === 'en' ? 'Participants data is not available.' : 'Дані про учасників відсутні.') }}
            </p>
          </article>
        </div>
        <p v-else class="text-body text-text-muted py-8 text-center bg-white border border-border rounded-12">
          {{ locale === 'en' ? 'Past conferences are not published yet.' : 'Минулі конференції ще не опубліковані.' }}
        </p>
      </section>
    </div>
  </div>
</template>
