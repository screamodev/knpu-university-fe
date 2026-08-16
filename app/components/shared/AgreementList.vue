<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { AgreementCategory, DirectusCooperationAgreement } from '~/types/directus'

/**
 * Register of cooperation agreements for one category.
 *
 * Built like «Накази з основної діяльності»: one collection, one page per category, a year filter
 * over the whole list. The register keeps the dates as they were written on the old site
 * («2017 р.», «25.12.2012 р.»), so filtering runs on the separate `year` column.
 */
const props = defineProps<{ category: AgreementCategory }>()

const { t, locale } = useSafeI18nWithRouter()
const { client, assetUrl } = useDirectus()

const ASSET_PREFIX = '/assets/'

/**
 * Договір лежить або в нашому сховищі, або на Google Drive підрозділу: у першому випадку в полі
 * стоїть `/assets/<id>` і адресу треба зібрати через Directus, у другому — це вже готова адреса.
 */
function fileHref(url: string): string {
  return url.startsWith(ASSET_PREFIX)
    ? assetUrl(url.slice(ASSET_PREFIX.length)) ?? url
    : url
}

const selectedYear = ref<number | null>(null)

const { data, pending } = await useAsyncData(
  () => `agreements-${props.category}`,
  () =>
    client.request(
      readItems('cooperation_agreements', {
        fields: [
          'id', 'number', 'agreementDate', 'year', 'partner', 'partnerEn',
          'subject', 'subjectEn', 'country', 'countryEn', 'term', 'termEn', 'url', 'order',
        ],
        sort: ['order'],
        filter: { status: { _eq: 'published' }, category: { _eq: props.category } },
        limit: -1,
      }),
    ),
  { watch: [() => props.category] },
)

const agreements = computed<DirectusCooperationAgreement[]>(() =>
  (data.value as DirectusCooperationAgreement[] | null) ?? [],
)

/** International agreements are the only ones with a country column. */
const showCountry = computed(() => props.category === 'international')

const yearOptions = computed(() => {
  const years = [...new Set(agreements.value.map(item => item.year).filter(Boolean) as number[])]
    .sort((left, right) => right - left)
  if (years.length < 2) return []
  return [{ value: null, label: t('documents.filterAll') }, ...years.map(year => ({ value: year, label: String(year) }))]
})

const visibleAgreements = computed(() =>
  selectedYear.value
    ? agreements.value.filter(item => item.year === selectedYear.value)
    : agreements.value,
)

/** English copy is optional — an editor fills it in over time, so fall back to Ukrainian. */
function localizedText(item: DirectusCooperationAgreement, field: 'partner' | 'subject' | 'country' | 'term'): string {
  const english = item[`${field}En` as keyof DirectusCooperationAgreement] as string | null
  return (locale.value === 'en' && english ? english : item[field]) ?? ''
}

/** The subject cell keeps the line breaks of the register — it is a short list, not a paragraph. */
function subjectLines(item: DirectusCooperationAgreement): string[] {
  return localizedText(item, 'subject').split('\n').map(line => line.trim()).filter(Boolean)
}
</script>

<template>
  <div>
    <div v-if="yearOptions.length" class="flex flex-wrap gap-2 mb-8">
      <button
        v-for="option in yearOptions"
        :key="option.value ?? 'all'"
        type="button"
        class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
        :class="
          selectedYear === option.value
            ? 'bg-navy text-white border-navy'
            : 'bg-white text-navy border-border hover:border-navy'
        "
        @click="selectedYear = option.value"
      >
        {{ option.label }}
      </button>
    </div>

    <div v-if="pending" class="space-y-3">
      <div
        v-for="i in 5"
        :key="i"
        class="animate-pulse rounded-12 p-4 border border-border bg-off-white h-20"
      />
    </div>

    <p v-else-if="!visibleAgreements.length" class="text-body text-text-muted">
      {{ t('documents.empty') }}
    </p>

    <ul v-else class="list-none p-0 m-0 border border-border rounded-16 overflow-hidden">
      <li
        v-for="(item, index) in visibleAgreements"
        :key="item.id"
        class="grid grid-cols-[48px_minmax(96px,120px)_1fr] lg:grid-cols-[48px_120px_1fr_minmax(140px,200px)] gap-x-4 gap-y-1 px-4 py-4"
        :class="index % 2 ? 'bg-off-white' : 'bg-white'"
      >
        <span class="text-body-sm text-text-muted">{{ item.number }}</span>
        <span class="text-body-sm text-text-muted">{{ item.agreementDate }}</span>

        <div class="min-w-0">
          <!-- Назва — покликання на файл договору; без файла лишається просто текстом. -->
          <h3 class="text-body-sm font-semibold text-navy leading-snug">
            <a
              v-if="item.url"
              :href="fileHref(item.url)"
              target="_blank"
              rel="noopener noreferrer"
              class="text-navy underline decoration-border hover:text-gold hover:decoration-gold"
            >
              {{ localizedText(item, 'partner') }}
              <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
            </a>
            <template v-else>{{ localizedText(item, 'partner') }}</template>
          </h3>
          <p v-if="showCountry && localizedText(item, 'country')" class="mt-1 text-body-sm text-gold">
            {{ localizedText(item, 'country') }}
          </p>
          <ul v-if="subjectLines(item).length" class="list-none p-0 mt-1 space-y-0.5">
            <li v-for="line in subjectLines(item)" :key="line" class="text-body-sm text-text-muted">
              {{ line }}
            </li>
          </ul>
          <p v-if="localizedText(item, 'term')" class="mt-1 text-body-sm text-text-muted lg:hidden">
            {{ localizedText(item, 'term') }}
          </p>
        </div>

        <span class="hidden lg:block text-body-sm text-text-muted">
          {{ localizedText(item, 'term') }}
        </span>
      </li>
    </ul>
  </div>
</template>
