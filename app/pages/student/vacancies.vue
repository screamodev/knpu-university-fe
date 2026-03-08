<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.vacancies'),
  meta: [{ name: 'description', content: () => t('student.vacancies.subtitle') }],
})

type FilterKey = 'all' | 'fullTime' | 'partTime' | 'internship'

const activeFilter = ref<FilterKey>('all')

const filterKeys: { value: FilterKey; labelKey: string }[] = [
  { value: 'all', labelKey: 'student.vacancies.filterAll' },
  { value: 'fullTime', labelKey: 'student.vacancies.filterFullTime' },
  { value: 'partTime', labelKey: 'student.vacancies.filterPartTime' },
  { value: 'internship', labelKey: 'student.vacancies.filterInternship' },
]

const vacancyIds = ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8'] as const

const filteredVacancyIds = computed(() => {
  if (activeFilter.value === 'all') return vacancyIds
  return vacancyIds.filter((id) => {
    const type = t(`student.vacancies.vacancies.${id}.type`) as string
    return type === activeFilter.value
  })
})

function typeLabelKey(type: string): string {
  if (type === 'internship') return 'student.vacancies.filterInternship'
  if (type === 'fullTime') return 'student.vacancies.filterFullTime'
  if (type === 'partTime') return 'student.vacancies.filterPartTime'
  return type
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
          v-for="id in filteredVacancyIds"
          :key="id"
          class="bg-white border border-border rounded-16 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-280 hover:border-gold/40"
        >
          <div class="flex-1 min-w-0">
            <p class="text-body-sm text-text-muted mb-1">
              {{ t(`student.vacancies.vacancies.${id}.company`) }}
            </p>
            <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
              {{ t(`student.vacancies.vacancies.${id}.position`) }}
            </h3>
            <div class="flex flex-wrap gap-2 items-center text-body-sm text-text-muted">
              <span
                class="inline-flex items-center rounded-8 bg-gold/15 px-2.5 py-1 text-gold font-medium"
              >
                {{ t(typeLabelKey(t(`student.vacancies.vacancies.${id}.type`))) }}
              </span>
              <span>{{ t(`student.vacancies.vacancies.${id}.location`) }}</span>
              <span>·</span>
              <span>{{ t('student.vacancies.posted') }}: {{ t(`student.vacancies.vacancies.${id}.posted`) }}</span>
            </div>
          </div>
        </article>
        <p
          v-if="filteredVacancyIds.length === 0"
          class="text-body text-text-muted py-8 text-center"
        >
          {{ t('student.vacancies.emptyState') }}
        </p>
      </div>
    </div>
  </div>
</template>
