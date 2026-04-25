<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusAdmissionOpenDay } from '~/types/directus'

definePageMeta({ layout: 'default' })

const { t, locale, localePath } = useSafeI18nWithRouter()
const { client } = useDirectus()
const { localized } = useLocalizedField()

useHead({
  title: () => t('nav.links.openDays'),
  meta: [{ name: 'description', content: () => t('admissions.openDays.subtitle') }],
})

const { data: openDaysData, pending } = await useAsyncData('admission-open-days', () =>
  client.request(
    readItems('admission_open_days', {
      fields: ['id', 'title', 'titleEn', 'description', 'descriptionEn', 'eventDate', 'location', 'locationEn', 'registrationUrl', 'order'],
      sort: ['eventDate', 'order'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }),
  ),
)

const openDays = computed<DirectusAdmissionOpenDay[]>(() => {
  return (openDaysData.value as DirectusAdmissionOpenDay[] | null) ?? []
})

const sortedOpenDays = computed<DirectusAdmissionOpenDay[]>(() => {
  return [...openDays.value].sort((left, right) => {
    const leftTime = Date.parse(left.eventDate)
    const rightTime = Date.parse(right.eventDate)
    if (Number.isNaN(leftTime) || Number.isNaN(rightTime)) return 0
    return leftTime - rightTime
  })
})

function formatEventDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

function eventDateBadge(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '--'
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'uk-UA', {
    day: '2-digit',
    month: '2-digit',
  }).format(date)
}

const expectationKeys = ['campusTour', 'meetFaculty', 'qa', 'demoLessons'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('admissions.openDays.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.openDays.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('admissions.openDays.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('admissions.openDays.intro') }}
      </p>
    </div>

    <!-- Upcoming dates: 3 event-style cards -->
    <div class="bg-off-white border-t border-border py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('admissions.openDays.upcomingTitle') }}
        </h2>
        <div v-if="pending" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="i in 3"
            :key="i"
            class="animate-pulse bg-white border border-border rounded-16 p-6"
          >
            <div class="w-14 h-14 rounded-12 bg-border mb-4" />
            <div class="h-5 bg-border rounded w-2/3 mb-3" />
            <div class="h-4 bg-border rounded w-3/4 mb-2" />
            <div class="h-4 bg-border rounded w-full" />
          </div>
        </div>
        <div v-else-if="sortedOpenDays.length" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="event in sortedOpenDays"
            :key="event.id"
            class="bg-white border border-border rounded-16 p-6 flex flex-col"
          >
            <div
              class="inline-flex items-center justify-center w-14 h-14 rounded-12 bg-gold/15 text-gold font-playfair text-lg font-bold shrink-0 mb-4"
            >
              {{ eventDateBadge(event.eventDate) }}
            </div>
            <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
              {{ localized(event, 'title') }}
            </h3>
            <p class="text-body-sm text-text-muted mb-2">
              {{ formatEventDate(event.eventDate) }}
            </p>
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
              {{ localized(event, 'location') || (locale === 'en' ? 'Location not specified' : 'Локацію не вказано') }}
            </p>
            <p class="text-body-sm text-text-muted">
              {{ localized(event, 'description') }}
            </p>
            <a
              v-if="event.registrationUrl"
              :href="event.registrationUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex mt-4 items-center gap-1.5 text-body-sm font-medium text-navy hover:text-gold transition-colors"
            >
              {{ locale === 'en' ? 'Register' : 'Зареєструватися' }}
              <span aria-hidden>-></span>
            </a>
          </div>
        </div>
        <p v-else class="text-body text-text-muted text-center py-8 bg-white border border-border rounded-16">
          {{ locale === 'en' ? 'Open-day events are not published yet.' : 'Події дня відкритих дверей ще не опубліковані.' }}
        </p>
      </div>
    </div>

    <!-- What to expect: 4 icon blocks -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-10">
        {{ t('admissions.openDays.expectTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="key in expectationKeys"
          :key="key"
          class="flex flex-col items-center text-center"
        >
          <div
            class="w-14 h-14 rounded-16 bg-gold/15 flex items-center justify-center text-gold shrink-0 mb-4"
          >
            <svg
              class="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
              />
              <path d="M9 22V12h6v10" />
            </svg>
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`admissions.openDays.expectations.${key}.title`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t(`admissions.openDays.expectations.${key}.text`) }}
          </p>
        </div>
      </div>
    </div>

    <!-- CTA: register -->
    <div class="bg-gradient-to-br from-navy-mid to-navy-deep py-14">
      <div
        class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left"
      >
        <div>
          <h2 class="font-playfair text-3xl text-white font-bold leading-tight mb-2">
            {{ t('admissions.openDays.ctaTitle') }}
          </h2>
          <p class="text-[15px] text-white/60">
            {{ t('admissions.openDays.ctaSubtitle') }}
          </p>
        </div>
        <NuxtLink
          :to="localePath('/contacts')"
          class="shrink-0 py-3.5 px-9 bg-gold text-navy-deep no-underline rounded-[10px] font-bold text-sm font-geologica transition-all duration-280 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-gold"
        >
          {{ t('admissions.openDays.ctaButton') }} →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
