<script setup lang="ts">
import type { FileLinkItem } from '~/components/shared/FileLinkList.vue'
import type { DirectusMonitoringSurvey } from '~/types/directus'

/**
 * Одна анкета моніторингу: заголовок (посилання на форму, якщо вона відкрита), дослідницька
 * група, програма й результати. Виділено зі сторінки `/education/monitoring`, щоб ту саму картку
 * можна було показати і в акордеоні напряму, і у вкладеному акордеоні (анкета № 1 →
 * «Анкета по факультетам»).
 */
const props = withDefaults(
  defineProps<{
    survey: DirectusMonitoringSurvey
    /** Не писати «Результати ще не оприлюднені» — для анкет, які існують лише як форма. */
    hidePending?: boolean
  }>(),
  { hidePending: false },
)

const { t, locale } = useSafeI18nWithRouter()
const { localized } = useLocalizedField()

/** Results are stored newest-last on the legacy page; show the most recent year first. */
const resultItems = computed<FileLinkItem[]>(() =>
  [...(props.survey.results ?? [])]
    .filter(result => result.status !== 'draft' && result.status !== 'archived')
    .sort((left, right) => String(right.year ?? '').localeCompare(String(left.year ?? '')))
    .map(result => ({
      id: result.id,
      title: result.year || t('education.monitoring.resultsLabel'),
      file: result.file,
      externalUrl: result.externalUrl,
    })),
)

const programmeItems = computed<FileLinkItem[]>(() => {
  if (!props.survey.programmeFile) return []
  return [{
    id: `${props.survey.id}-programme`,
    title: t('education.monitoring.programmeLabel'),
    file: props.survey.programmeFile,
  }]
})
</script>

<template>
  <article class="border-l-4 border-gold pl-4 sm:pl-5">
    <h4 class="font-medium text-navy">
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
    </h4>
    <p v-if="survey.researchGroup" class="text-body-sm text-text-muted mt-1">
      {{ t('education.monitoring.researchGroupLabel') }}: {{ survey.researchGroup }}
    </p>

    <div v-if="!hidePending || programmeItems.length || resultItems.length" class="mt-3 space-y-2">
      <SharedFileLinkList v-if="programmeItems.length" :items="programmeItems" dense />
      <div v-if="resultItems.length">
        <p class="text-body-sm font-semibold text-navy mb-1.5">
          {{ t('education.monitoring.resultsLabel') }}
        </p>
        <SharedFileLinkList :items="resultItems" dense />
      </div>
      <p
        v-if="!programmeItems.length && !resultItems.length"
        class="text-body-sm text-text-muted"
      >
        {{ locale === 'en' ? 'Results are not published yet.' : 'Результати ще не оприлюднені.' }}
      </p>
    </div>
  </article>
</template>
