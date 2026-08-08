<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusEducationScheduleKeyDate, DirectusEducationSchedulePeriod } from '~/types/directus'

definePageMeta({ layout: 'default' })

const { t, locale } = useSafeI18nWithRouter()
const { client } = useDirectus()
const { localized } = useLocalizedField()
const localePath = useLocalePath()

useHead({
  title: () => t('nav.links.processSchedule'),
  meta: [{ name: 'description', content: () => t('education.schedule.subtitle') }],
})

const { data: periodsData, pending: periodsPending } = await useAsyncData('education-schedule-periods', () =>
  client.request(
    readItems('education_schedule_periods', {
      fields: ['id', 'name', 'nameEn', 'semesterType', 'periodType', 'dateStart', 'dateEnd', 'academicYear', 'order'],
      sort: ['semesterType', 'order', 'dateStart'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }),
  ),
)

const { data: keyDatesData, pending: keyDatesPending } = await useAsyncData('education-schedule-key-dates', () =>
  client.request(
    readItems('education_schedule_key_dates', {
      fields: ['id', 'event', 'eventEn', 'dateLabel', 'dateLabelEn', 'academicYear', 'order'],
      sort: ['order'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }),
  ),
)

const periods = computed<DirectusEducationSchedulePeriod[]>(() => {
  return (periodsData.value as DirectusEducationSchedulePeriod[] | null) ?? []
})

const keyDates = computed<DirectusEducationScheduleKeyDate[]>(() => {
  return (keyDatesData.value as DirectusEducationScheduleKeyDate[] | null) ?? []
})

const autumnPeriods = computed(() => periods.value.filter((item) => item.semesterType === 'autumn'))
const springPeriods = computed(() => periods.value.filter((item) => item.semesterType === 'spring'))

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'uk-UA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

function periodRange(item: DirectusEducationSchedulePeriod): string {
  return `${formatDate(item.dateStart)} - ${formatDate(item.dateEnd)}`
}

function periodTypeLabel(periodType: DirectusEducationSchedulePeriod['periodType']): string {
  if (locale.value === 'en') {
    if (periodType === 'study') return 'Study'
    if (periodType === 'exam') return 'Exam session'
    if (periodType === 'vacation') return 'Vacation'
    return 'Internship'
  }
  if (periodType === 'study') return 'Навчання'
  if (periodType === 'exam') return 'Екзаменаційна сесія'
  if (periodType === 'vacation') return 'Канікули'
  return 'Практика'
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.schedule.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.schedule.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.schedule.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('education.schedule.intro') }}
      </p>

      <!-- Semester timeline -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('education.schedule.semestersTitle') }}
      </h2>

      <div v-if="periodsPending" class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
        <div
          v-for="i in 2"
          :key="i"
          class="animate-pulse bg-off-white border border-border rounded-16 p-6 lg:p-8"
        >
          <div class="h-5 bg-border rounded w-1/2 mb-4" />
          <ul class="space-y-4">
            <li v-for="j in 4" :key="j" class="h-4 bg-border rounded w-3/4" />
          </ul>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
        <div class="bg-off-white border border-border rounded-16 p-6 lg:p-8">
          <h3 class="font-playfair text-lg font-semibold text-navy mb-5">
            {{ t('education.schedule.semester1') }}
          </h3>
          <ul v-if="autumnPeriods.length" class="space-y-4">
            <li
              v-for="period in autumnPeriods"
              :key="period.id"
              class="flex gap-3 items-start"
            >
              <span
                class="w-2 h-2 rounded-full bg-gold shrink-0 mt-1.5"
                aria-hidden
              />
              <div>
                <p class="font-medium text-navy text-body-sm">
                  {{ localized(period, 'name') }}
                </p>
                <p class="text-body-sm text-text-muted">
                  {{ periodRange(period) }} · {{ periodTypeLabel(period.periodType) }}
                </p>
              </div>
            </li>
          </ul>
          <p v-else class="text-body-sm text-text-muted">
            {{ locale === 'en' ? 'No periods published for autumn semester.' : 'Для осіннього семестру періоди не опубліковані.' }}
          </p>
        </div>

        <div class="bg-off-white border border-border rounded-16 p-6 lg:p-8">
          <h3 class="font-playfair text-lg font-semibold text-navy mb-5">
            {{ t('education.schedule.semester2') }}
          </h3>
          <ul v-if="springPeriods.length" class="space-y-4">
            <li
              v-for="period in springPeriods"
              :key="period.id"
              class="flex gap-3 items-start"
            >
              <span
                class="w-2 h-2 rounded-full bg-gold shrink-0 mt-1.5"
                aria-hidden
              />
              <div>
                <p class="font-medium text-navy text-body-sm">
                  {{ localized(period, 'name') }}
                </p>
                <p class="text-body-sm text-text-muted">
                  {{ periodRange(period) }} · {{ periodTypeLabel(period.periodType) }}
                </p>
              </div>
            </li>
          </ul>
          <p v-else class="text-body-sm text-text-muted">
            {{ locale === 'en' ? 'No periods published for spring semester.' : 'Для весняного семестру періоди не опубліковані.' }}
          </p>
        </div>
      </div>

      <!-- Key dates table -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('education.schedule.keyDatesTitle') }}
      </h2>
      <div class="border border-border rounded-12 overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-border">
              <th class="py-3 px-4 font-semibold text-navy text-body-sm">
                {{ t('education.schedule.tableEvent') }}
              </th>
              <th class="py-3 px-4 font-semibold text-navy text-body-sm">
                {{ t('education.schedule.tableDate') }}
              </th>
            </tr>
          </thead>
          <tbody v-if="keyDatesPending">
            <tr v-for="i in 4" :key="i" class="border-b border-border last:border-b-0">
              <td class="py-3 px-4">
                <div class="h-4 bg-border rounded w-3/4 animate-pulse" />
              </td>
              <td class="py-3 px-4">
                <div class="h-4 bg-border rounded w-1/2 animate-pulse" />
              </td>
            </tr>
          </tbody>
          <tbody v-else-if="keyDates.length">
            <tr
              v-for="(item, index) in keyDates"
              :key="item.id"
              class="border-b border-border last:border-b-0"
              :class="index % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'"
            >
              <td class="py-3 px-4 text-body-sm text-navy">
                {{ localized(item, 'event') }}
              </td>
              <td class="py-3 px-4 text-body-sm text-text-muted">
                {{ localized(item, 'dateLabel') }}
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="2" class="py-5 px-4 text-body-sm text-text-muted text-center">
                {{ locale === 'en' ? 'Key dates are not published yet.' : 'Ключові дати ще не опубліковані.' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Затверджені графіки, як їх публікує навчальний відділ -->
      <h2 class="font-playfair text-2xl font-bold text-navy mt-14 mb-6">
        {{ t('education.schedule.documentsTitle') }}
      </h2>
      <SharedDocumentList section="education-schedule" />

      <div class="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NuxtLink
          :to="localePath('/education/students')"
          class="rounded-16 border border-border p-6 no-underline hover:border-gold transition-colors"
        >
          <span class="block font-playfair text-lg font-semibold text-navy">
            {{ t('nav.links.studentContingent') }}
          </span>
          <span class="block text-body-sm text-text-muted mt-1">
            {{ t('education.schedule.contingentLink') }}
          </span>
        </NuxtLink>
        <NuxtLink
          :to="localePath('/education/academic-office')"
          class="rounded-16 border border-border p-6 no-underline hover:border-gold transition-colors"
        >
          <span class="block font-playfair text-lg font-semibold text-navy">
            {{ t('nav.links.academicOffice') }}
          </span>
          <span class="block text-body-sm text-text-muted mt-1">
            {{ t('education.schedule.officeLink') }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
