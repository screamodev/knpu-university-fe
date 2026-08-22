<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { FileLinkItem } from '~/components/shared/FileLinkList.vue'
import type { DirectusMonitoringSurvey, MonitoringArea } from '~/types/directus'

/**
 * Моніторинг.
 *
 * The legacy page was one 300-link wall: ~50 questionnaires, each with a programme PDF and a row
 * of yearly results. Here each напрям діяльності is a collapsed group, and a survey shows its
 * research team, the programme and its results in one card — the same data, findable.
 */
definePageMeta({ layout: 'default' })

const { t, locale, localePath } = useSafeI18nWithRouter()
const { client } = useDirectus()
const { localized } = useLocalizedField()

useHead({
  title: () => t('nav.links.monitoring'),
  meta: [{ name: 'description', content: () => t('education.monitoring.subtitle') }],
})

/** The напрями in the order the legacy page listed them. */
const AREAS: MonitoringArea[] = [
  'educational-activity',
  'programme-implementation',
  'phd-programmes',
  'educational-environment',
  'research',
  'international',
  'youth-policy',
  'management',
  'stakeholders',
  'express',
  'staff-rating',
  'other',
]

const { data, pending } = await useAsyncData('monitoring-surveys', () =>
  client.request(
    readItems('monitoring_surveys', {
      fields: [
        'id',
        'number',
        'area',
        'title',
        'titleEn',
        'researchGroup',
        'formUrl',
        'order',
        { programmeFile: ['id', 'filename_download', 'filesize', 'type'] },
        {
          results: [
            'id',
            'year',
            'externalUrl',
            'order',
            'status',
            { file: ['id', 'filename_download', 'filesize', 'type'] },
          ],
        },
      ],
      sort: ['order'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }),
  ),
)

const surveys = computed<DirectusMonitoringSurvey[]>(
  () => (data.value as DirectusMonitoringSurvey[] | null) ?? [],
)

const groups = computed(() =>
  AREAS
    .map(area => ({ area, items: surveys.value.filter(survey => survey.area === area) }))
    .filter(group => group.items.length > 0),
)

/** Results are stored newest-last on the legacy page; show the most recent year first. */
function resultItems(survey: DirectusMonitoringSurvey): FileLinkItem[] {
  return [...(survey.results ?? [])]
    .filter(result => result.status !== 'draft' && result.status !== 'archived')
    .sort((left, right) => String(right.year ?? '').localeCompare(String(left.year ?? '')))
    .map(result => ({
      id: result.id,
      title: result.year || t('education.monitoring.resultsLabel'),
      file: result.file,
      externalUrl: result.externalUrl,
    }))
}

function programmeItems(survey: DirectusMonitoringSurvey): FileLinkItem[] {
  if (!survey.programmeFile) return []
  return [{
    id: `${survey.id}-programme`,
    title: t('education.monitoring.programmeLabel'),
    file: survey.programmeFile,
  }]
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.monitoring.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.monitoring.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.monitoring.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-8">
        {{ t('education.monitoring.intro') }}
      </p>

      <!-- The quality monitoring chart, full width as the client asked -->
      <figure class="mb-12">
        <img
          src="/images/static/monitoring-system.jpg"
          :alt="t('education.monitoring.schemeAlt')"
          class="w-full h-auto rounded-16 border border-border bg-white"
          loading="lazy"
        >
        <figcaption class="mt-2 text-body-sm text-text-muted">
          {{ t('education.monitoring.schemeCaption') }}
        </figcaption>
      </figure>

      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('education.monitoring.documentsTitle') }}
      </h2>
      <SharedDocumentList section="monitoring" />

      <NuxtLink
        :to="localePath('/university/public-info')"
        class="mt-6 inline-flex items-center gap-2 rounded-12 border border-border bg-off-white px-5 py-3 font-medium text-navy no-underline transition-colors duration-280 hover:border-gold"
      >
        {{ t('nav.links.publicInfo') }}
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </NuxtLink>

      <h2 class="font-playfair text-2xl font-bold text-navy mt-14 mb-2">
        {{ t('education.monitoring.surveysTitle') }}
      </h2>
      <p class="text-body-sm text-text-muted max-w-3xl mb-6">
        {{ t('education.monitoring.surveysIntro') }}
      </p>

      <div v-if="pending" class="space-y-3">
        <div v-for="i in 4" :key="i" class="animate-pulse h-14 rounded-12 border border-border bg-off-white" />
      </div>

      <div v-else-if="groups.length" class="space-y-4">
        <SharedAccordion
          v-for="(group, index) in groups"
          :key="group.area"
          :title="t(`education.monitoring.areas.${group.area}`)"
          :hint="`${group.items.length}`"
          :open="index === 0"
        >
          <div class="space-y-6 pt-4">
            <article
              v-for="survey in group.items"
              :key="survey.id"
              class="border-l-4 border-gold pl-4 sm:pl-5"
            >
              <h3 class="font-medium text-navy">
                <a
                  v-if="survey.formUrl"
                  :href="survey.formUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-navy hover:text-gold no-underline"
                >
                  {{ localized(survey, 'title') }}
                  <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
                </a>
                <template v-else>{{ localized(survey, 'title') }}</template>
              </h3>
              <p v-if="survey.researchGroup" class="text-body-sm text-text-muted mt-1">
                {{ t('education.monitoring.researchGroupLabel') }}: {{ survey.researchGroup }}
              </p>

              <div class="mt-3 space-y-2">
                <SharedFileLinkList
                  v-if="programmeItems(survey).length"
                  :items="programmeItems(survey)"
                  dense
                />
                <div v-if="resultItems(survey).length">
                  <p class="text-body-sm font-semibold text-navy mb-1.5">
                    {{ t('education.monitoring.resultsLabel') }}
                  </p>
                  <SharedFileLinkList :items="resultItems(survey)" dense />
                </div>
                <p
                  v-if="!programmeItems(survey).length && !resultItems(survey).length"
                  class="text-body-sm text-text-muted"
                >
                  {{ locale === 'en' ? 'Results are not published yet.' : 'Результати ще не оприлюднені.' }}
                </p>
              </div>
            </article>
          </div>
        </SharedAccordion>
      </div>

      <SharedSectionPending v-else />

      <!-- Рейтинг НПП веде той самий відділ, але живе окремою сторінкою — вона доволі велика. -->
      <NuxtLink
        :to="localePath('/education/staff-rating')"
        class="mt-14 flex flex-col sm:flex-row sm:items-center gap-4 rounded-16 bg-navy text-white p-8 no-underline hover:bg-navy-deep transition-colors"
      >
        <span class="flex-1">
          <span class="block font-playfair text-xl font-bold">
            {{ t('education.staffRating.title') }}
          </span>
          <span class="block text-body-sm text-white/70 mt-1">
            {{ t('education.staffRating.subtitle') }}
          </span>
        </span>
        <span class="inline-flex items-center gap-2 rounded-12 bg-gold text-navy font-semibold px-5 py-2.5 shrink-0">
          {{ t('education.staffRating.ctaButton') }}
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
