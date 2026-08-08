<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { FileLinkItem } from '~/components/shared/FileLinkList.vue'
import type { DirectusContingentReport } from '~/types/directus'

/**
 * Контингент студентів.
 *
 * The academic office publishes the numbers monthly, one PDF per form of study; the legacy page
 * listed six years of them in a row. Grouping by навчальний рік keeps the current year in view
 * and the archive one click away.
 */
definePageMeta({ layout: 'default' })

const { t, locale } = useSafeI18nWithRouter()
const { client } = useDirectus()
const localePath = useLocalePath()

useHead({
  title: () => t('nav.links.studentContingent'),
  meta: [{ name: 'description', content: () => t('education.students.subtitle') }],
})

const { data, pending } = await useAsyncData('contingent-reports', () =>
  client.request(
    readItems('contingent_reports', {
      fields: [
        'id',
        'academicYear',
        'formOfStudy',
        'reportDate',
        'title',
        'order',
        { file: ['id', 'filename_download', 'filesize', 'type'] },
      ],
      sort: ['-reportDate'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }),
  ),
)

const reports = computed<DirectusContingentReport[]>(
  () => (data.value as DirectusContingentReport[] | null) ?? [],
)

function formatDate(value: DirectusContingentReport['reportDate']): string {
  const date = new Date(String(value))
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'uk-UA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC',
  }).format(date)
}

/** Навчальний рік → форма навчання, newest year first. */
const years = computed(() => {
  const labels = [...new Set(reports.value.map(report => report.academicYear).filter(Boolean))] as string[]
  return labels
    .sort((left, right) => right.localeCompare(left))
    .map(year => ({
      year,
      count: reports.value.filter(report => report.academicYear === year).length,
      forms: (['full-time', 'part-time'] as const).map(form => ({
        form,
        items: reports.value
          .filter(report => report.academicYear === year && report.formOfStudy === form)
          .map<FileLinkItem>(report => ({
            id: report.id,
            title: formatDate(report.reportDate) || report.title,
            file: report.file,
          })),
      })),
    }))
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.students.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.students.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.students.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-10">
        {{ t('education.students.intro') }}
      </p>

      <div v-if="pending" class="space-y-3">
        <div v-for="i in 3" :key="i" class="animate-pulse h-14 rounded-12 border border-border bg-off-white" />
      </div>

      <div v-else-if="years.length" class="space-y-4">
        <SharedAccordion
          v-for="(entry, index) in years"
          :key="entry.year"
          :title="t('education.students.academicYear', { year: entry.year })"
          :hint="`${entry.count}`"
          :open="index === 0"
        >
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
            <div v-for="form in entry.forms" :key="form.form">
              <h3 class="text-body-sm font-semibold uppercase tracking-wider text-text-muted mb-2">
                {{ t(`education.students.forms.${form.form}`) }}
              </h3>
              <SharedFileLinkList :items="form.items" dense />
            </div>
          </div>
        </SharedAccordion>
      </div>

      <SharedSectionPending v-else />

      <div class="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NuxtLink
          :to="localePath('/education/schedule')"
          class="rounded-16 border border-border p-6 no-underline hover:border-gold transition-colors"
        >
          <span class="block font-playfair text-lg font-semibold text-navy">
            {{ t('nav.links.processSchedule') }}
          </span>
          <span class="block text-body-sm text-text-muted mt-1">
            {{ t('education.students.scheduleLink') }}
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
            {{ t('education.students.officeLink') }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
