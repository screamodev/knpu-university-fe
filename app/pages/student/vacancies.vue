<script setup lang="ts">
import { readItems } from '@directus/sdk'

definePageMeta({ layout: 'default' })

const { t, locale } = useSafeI18nWithRouter()
const { client } = useDirectus()
const { localized } = useLocalizedField()

useHead({
  title: () => t('nav.links.vacancies'),
  meta: [{ name: 'description', content: () => t('student.vacancies.subtitle') }],
})

type FilterKey = 'all' | 'fullTime' | 'partTime' | 'internship'
type VacancyType = Exclude<FilterKey, 'all'>

interface VacancyItem {
  id: string | number
  company: string
  companyEn: string | null
  position: string
  positionEn: string | null
  type: VacancyType
  location: string
  locationEn: string | null
  postedAt: string | null
}

const activeFilter = ref<FilterKey>('all')

const filterKeys: { value: FilterKey; labelKey: string }[] = [
  { value: 'all', labelKey: 'student.vacancies.filterAll' },
  { value: 'fullTime', labelKey: 'student.vacancies.filterFullTime' },
  { value: 'partTime', labelKey: 'student.vacancies.filterPartTime' },
  { value: 'internship', labelKey: 'student.vacancies.filterInternship' },
]

const { data: vacanciesData } = await useAsyncData('vacancies-list', () =>
  client.request(
    readItems('vacancies', {
      fields: ['id', 'company', 'companyEn', 'position', 'positionEn', 'type', 'location', 'locationEn', 'postedAt'],
      sort: ['order', '-postedAt'],
      filter: { status: { _eq: 'published' } },
    }),
  ),
)

const vacancies = computed<VacancyItem[]>(() => (vacanciesData.value as VacancyItem[] | null) ?? [])

const filteredVacancies = computed(() => {
  if (activeFilter.value === 'all') return vacancies.value
  return vacancies.value.filter((vacancy) => vacancy.type === activeFilter.value)
})

function typeLabelKey(type: VacancyType): string {
  if (type === 'internship') return 'student.vacancies.filterInternship'
  if (type === 'fullTime') return 'student.vacancies.filterFullTime'
  if (type === 'partTime') return 'student.vacancies.filterPartTime'
  return type
}

function formatPostedAt(value: string | null): string {
  if (!value) {
    return ''
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'uk-UA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.vacancies.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.vacancies.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.vacancies.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('student.vacancies.intro') }}
      </p>
    </div>

    <!-- Filter tabs: pill buttons -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="f in filterKeys"
          :key="f.value"
          type="button"
          class="rounded-full px-5 py-2.5 text-body-sm font-medium transition-colors duration-280"
          :class="
            activeFilter === f.value
              ? 'bg-gold text-navy'
              : 'bg-slate-100 text-text-muted hover:bg-slate-200 hover:text-navy'
          "
          @click="activeFilter = f.value"
        >
          {{ t(f.labelKey) }}
        </button>
      </div>
    </div>

    <!-- Vacancy list: stacked card-rows -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('student.vacancies.vacanciesTitle') }}
      </h2>
      <div class="flex flex-col gap-4">
        <article
          v-for="vacancy in filteredVacancies"
          :key="vacancy.id"
          class="bg-white border border-border rounded-16 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-280 hover:border-gold/40"
        >
          <div class="flex-1 min-w-0">
            <p class="text-body-sm text-text-muted mb-1">
              {{ localized(vacancy, 'company') }}
            </p>
            <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
              {{ localized(vacancy, 'position') }}
            </h3>
            <div class="flex flex-wrap gap-2 items-center text-body-sm text-text-muted">
              <span
                class="inline-flex items-center rounded-8 bg-gold/15 px-2.5 py-1 text-gold font-medium"
              >
                {{ t(typeLabelKey(vacancy.type)) }}
              </span>
              <span>{{ localized(vacancy, 'location') }}</span>
              <template v-if="formatPostedAt(vacancy.postedAt)">
                <span>·</span>
                <span>{{ t('student.vacancies.posted') }}: {{ formatPostedAt(vacancy.postedAt) }}</span>
              </template>
            </div>
          </div>
        </article>
        <p
          v-if="filteredVacancies.length === 0"
          class="text-body text-text-muted py-8 text-center"
        >
          {{ t('student.vacancies.emptyState') }}
        </p>
      </div>
    </div>
  </div>
</template>
