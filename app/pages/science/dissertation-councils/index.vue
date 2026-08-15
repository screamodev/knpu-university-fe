<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusDissertationCouncil } from '~/types/directus'

/**
 * Разові спеціалізовані вчені ради — the archive of PhD defenses migrated from the old site.
 *
 * 263 councils, so the page groups them by year and filters in the browser: the payload is a few
 * hundred short rows, and a commission looking up one name should not have to page through them.
 */
definePageMeta({ layout: 'default' })

const { t, locale } = useSafeI18nWithRouter()
const { client } = useDirectus()
const { localized } = useLocalizedField()
const localePath = useLocalePath()

useHead({
  title: () => t('science.dissertationCouncils.title'),
  meta: [{ name: 'description', content: () => t('science.dissertationCouncils.subtitle') }],
})

const { data, pending } = await useAsyncData('dissertation-councils', () =>
  client.request(
    readItems('dissertation_councils', {
      fields: [
        'id',
        'legacySlug',
        'councilCode',
        'candidateName',
        'candidateNameEn',
        'dissertationTitle',
        'dissertationTitleEn',
        'specialty',
        'defenseDate',
        'year',
        'order',
      ],
      // `order` mirrors the old site's ordering inside a year, which is by defense date.
      sort: ['-year', 'order'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }),
  ),
)

const councils = computed<DirectusDissertationCouncil[]>(
  () => (data.value as DirectusDissertationCouncil[] | null) ?? [],
)

const query = ref('')
const selectedYear = ref<number | null>(null)

const years = computed(() =>
  [...new Set(councils.value.map(item => item.year).filter((year): year is number => Boolean(year)))]
    .sort((left, right) => right - left),
)

const filtered = computed(() => {
  const needle = query.value.trim().toLowerCase()
  return councils.value.filter((item) => {
    if (selectedYear.value && item.year !== selectedYear.value) return false
    if (!needle) return true
    return [
      item.candidateName,
      item.candidateNameEn,
      item.dissertationTitle,
      item.dissertationTitleEn,
      item.councilCode,
      item.specialty,
    ].some(value => (value ?? '').toLowerCase().includes(needle))
  })
})

/** `[[year, councils], …]`, newest first; undated councils fall into their own group. */
const groups = computed(() => {
  const buckets = new Map<number | null, DirectusDissertationCouncil[]>()
  for (const item of filtered.value) {
    const bucket = buckets.get(item.year ?? null)
    if (bucket) bucket.push(item)
    else buckets.set(item.year ?? null, [item])
  }
  return [...buckets.entries()]
})

function formatDate(value: DirectusDissertationCouncil['defenseDate']): string {
  if (!value) return ''
  const date = new Date(String(value))
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('science.dissertationCouncils.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.dissertationCouncils.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.dissertationCouncils.subtitle') }}
        </p>
      </div>
    </div>

    <SharedSectionTabs :tabs="COUNCIL_TABS" />

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-8">
        {{ t('science.dissertationCouncils.intro') }}
      </p>

      <!-- Search + year chips -->
      <div class="mb-8 space-y-4">
        <label class="block max-w-md">
          <span class="sr-only">{{ t('science.dissertationCouncils.searchLabel') }}</span>
          <input
            v-model="query"
            type="search"
            :placeholder="t('science.dissertationCouncils.searchPlaceholder')"
            class="w-full rounded-12 border border-border px-4 py-2.5 text-body text-navy placeholder:text-text-muted focus:border-navy focus:outline-none transition-colors"
          >
        </label>

        <div v-if="years.length > 1" class="flex flex-wrap gap-2">
          <button
            type="button"
            class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
            :class="selectedYear === null ? 'bg-navy text-white border-navy' : 'bg-white text-navy border-border hover:border-navy'"
            @click="selectedYear = null"
          >
            {{ t('documents.filterAll') }}
          </button>
          <button
            v-for="year in years"
            :key="year"
            type="button"
            class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
            :class="selectedYear === year ? 'bg-navy text-white border-navy' : 'bg-white text-navy border-border hover:border-navy'"
            @click="selectedYear = year"
          >
            {{ year }}
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="space-y-3">
        <div
          v-for="i in 6"
          :key="i"
          class="animate-pulse rounded-12 border border-border bg-off-white p-4 flex gap-4 items-center"
        >
          <div class="h-4 bg-border rounded w-28" />
          <div class="h-4 bg-border rounded w-40" />
          <div class="h-4 bg-border rounded flex-1" />
        </div>
      </div>

      <!-- Councils, grouped by year -->
      <div v-else-if="filtered.length" class="space-y-12">
        <section v-for="[year, items] in groups" :key="year ?? 'undated'">
          <h2 class="font-playfair text-2xl font-bold text-navy mb-5">
            {{ year ?? t('science.dissertationCouncils.undatedGroup') }}
            <span class="text-body-sm font-normal text-text-muted ml-2">{{ items.length }}</span>
          </h2>

          <ul class="space-y-3 list-none p-0 m-0">
            <li v-for="(item, index) in items" :key="item.id">
              <NuxtLink
                :to="localePath(`/science/dissertation-councils/${item.legacySlug}`)"
                class="no-underline rounded-12 border border-border p-4 sm:px-4 sm:py-3 flex flex-col sm:grid sm:gap-4 sm:items-center gap-1.5 hover:border-gold transition-colors"
                :class="index % 2 === 0 ? 'bg-off-white' : 'bg-white'"
                style="grid-template-columns: 150px 1fr 110px"
              >
                <span class="text-body-sm font-medium text-gold whitespace-nowrap">
                  {{ item.councilCode || '—' }}
                </span>

                <span class="min-w-0">
                  <span class="block font-medium text-navy">{{ localized(item, 'candidateName') }}</span>
                  <span v-if="localized(item, 'dissertationTitle')" class="block text-body-sm text-text-muted mt-0.5">
                    {{ localized(item, 'dissertationTitle') }}
                  </span>
                </span>

                <span class="text-body-sm text-text-muted whitespace-nowrap">
                  {{ formatDate(item.defenseDate) || t('science.dissertationCouncils.dateUnset') }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </section>
      </div>

      <p v-else class="text-body text-text-muted py-10 text-center bg-off-white border border-border rounded-16">
        {{ t('science.dissertationCouncils.empty') }}
      </p>

    </div>
  </div>
</template>
