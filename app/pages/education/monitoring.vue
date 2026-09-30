<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusMonitoringSurvey, MonitoringArea } from '~/types/directus'

/**
 * Моніторинг.
 *
 * The legacy page was one 300-link wall: ~50 questionnaires, each with a programme PDF and a row
 * of yearly results. Here each напрям діяльності is a collapsed group, and a survey shows its
 * research team, the programme and its results in one card — the same data, findable.
 */
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()
const { client } = useDirectus()
const { localized } = useLocalizedField()

useHead({
  title: () => t('nav.links.monitoring'),
  meta: [{ name: 'description', content: () => t('education.monitoring.subtitle') }],
})

/**
 * Напрями, у порядку, який задав відділ моніторингу у серпні 2026.
 *
 * «Інфраструктура, ресурси і безпека» поки без анкет — розділ показуємо порожнім навмисно,
 * клієнт просив лишити місце. `other` тримає все, що не потрапило в новий поділ.
 */
const AREAS: MonitoringArea[] = [
  'community-synergy',
  'educational-ecosystem',
  'research-innovation',
  'international-partnership',
  'youth-policy',
  'human-capital',
  'infrastructure-safety',
  'targeted-surveys',
  'other',
]

/**
 * Анкети 1, 11 і 22 мають підваріанти (`11/1`, `11/2` …) — клієнт просив тримати їх в одному
 * акордеоні. Рядок `X/0` — не анкета, а заголовок вкладеного акордеона: під ним ховаються
 * підваріанти `X/1…` (анкета № 1 → «Анкета по факультетам»).
 */
const CLUSTERED_NUMBERS = ['1', '11', '22']

function isNestedHead(survey: DirectusMonitoringSurvey): boolean {
  return /\/0$/.test(String(survey.number ?? '').trim())
}

function clusterKey(survey: DirectusMonitoringSurvey): string {
  const base = String(survey.number ?? '').split('/')[0]?.trim() ?? ''
  return CLUSTERED_NUMBERS.includes(base) ? base : survey.id
}

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

/** Напрям → акордеони; кожна анкета сама по собі, крім кластерів 11 і 22. */
const groups = computed(() =>
  AREAS
    .map((area) => {
      const items = surveys.value.filter(survey => survey.area === area)
      const clusters: { key: string; title: string; items: DirectusMonitoringSurvey[] }[] = []
      for (const survey of items) {
        const key = clusterKey(survey)
        const existing = clusters.find(cluster => cluster.key === key)
        if (existing) existing.items.push(survey)
        else clusters.push({ key, title: localized(survey, 'title'), items: [survey] })
      }
      return {
        area,
        clusters: clusters.map((cluster) => {
          // Кластер із рядком `X/0`: підваріанти `X/N` йдуть у вкладений акордеон з його назвою,
          // усе інше (сама анкета № X) лишається карткою нагорі, як і раніше.
          const head = cluster.items.find(isNestedHead)
          if (!head) return { ...cluster, head: null, direct: cluster.items, nested: [] }
          const prefix = `${String(head.number).split('/')[0]}/`
          const nested = cluster.items.filter(item => item !== head && String(item.number).startsWith(prefix))
          return {
            ...cluster,
            head,
            direct: cluster.items.filter(item => item !== head && !nested.includes(item)),
            nested,
          }
        }),
        count: items.length,
      }
    })
    .filter(group => group.clusters.length > 0),
)
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

      <div v-else-if="groups.length" class="space-y-10">
        <section v-for="group in groups" :key="group.area">
          <h3 class="font-playfair text-xl font-bold text-navy mb-4">
            {{ t(`education.monitoring.areas.${group.area}`) }}
          </h3>
          <div class="space-y-3">
            <SharedAccordion
              v-for="cluster in group.clusters"
              :key="cluster.key"
              :title="cluster.title"
              :hint="cluster.direct.length + cluster.nested.length > 1 ? String(cluster.direct.length + cluster.nested.length) : undefined"
            >
              <div class="space-y-6 pt-4">
                <SharedMonitoringSurveyItem
                  v-for="survey in cluster.direct"
                  :key="survey.id"
                  :survey="survey"
                />

                <SharedAccordion
                  v-if="cluster.head"
                  :title="localized(cluster.head, 'title')"
                  :hint="String(cluster.nested.length)"
                >
                  <div class="space-y-4 pt-4">
                    <SharedMonitoringSurveyItem
                      v-for="survey in cluster.nested"
                      :key="survey.id"
                      :survey="survey"
                      hide-pending
                    />
                  </div>
                </SharedAccordion>
              </div>
            </SharedAccordion>
          </div>
        </section>
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
