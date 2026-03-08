<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.orders'),
  meta: [{ name: 'description', content: () => t('university.orders.subtitle') }],
})

type YearFilter = '2026' | '2025' | '2024' | null

const selectedYear = ref<YearFilter>(null)

const yearOptions: { value: YearFilter; labelKey: string }[] = [
  { value: '2026', labelKey: '2026' },
  { value: '2025', labelKey: '2025' },
  { value: '2024', labelKey: '2024' },
  { value: null, labelKey: 'university.orders.filterAll' },
]

const documentIds = ['doc1', 'doc2', 'doc3', 'doc4', 'doc5', 'doc6', 'doc7', 'doc8'] as const

const yearByDoc: Record<string, YearFilter> = {
  doc1: '2026',
  doc2: '2026',
  doc3: '2026',
  doc4: '2025',
  doc5: '2025',
  doc6: '2025',
  doc7: '2025',
  doc8: '2025',
}

const filteredDocumentIds = computed(() => {
  if (!selectedYear.value) return documentIds
  return documentIds.filter((id) => yearByDoc[id] === selectedYear.value)
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.orders.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.orders.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.orders.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Intro -->
      <p class="text-body text-text-muted max-w-3xl mb-10">
        {{ t('university.orders.intro') }}
      </p>

      <!-- Year filter tabs: pill buttons -->
      <div class="flex flex-wrap gap-2 mb-10">
        <button
          v-for="opt in yearOptions"
          :key="opt.value ?? 'all'"
          type="button"
          class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
          :class="
            selectedYear === opt.value
              ? 'bg-navy text-white border-navy'
              : 'bg-white text-navy border-border hover:border-navy'
          "
          @click="selectedYear = opt.value as YearFilter"
        >
          {{ opt.value !== null ? opt.value : t(opt.labelKey) }}
        </button>
      </div>

      <!-- Document list: stacked card-rows, alternating style -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('university.orders.documentsTitle') }}
      </h2>
      <div class="space-y-3">
        <div
          v-for="(id, index) in filteredDocumentIds"
          :key="id"
          class="rounded-12 p-4 sm:px-4 sm:py-3 flex flex-col sm:grid sm:gap-4 sm:items-center gap-2 border border-border"
          :class="index % 2 === 0 ? 'bg-off-white' : 'bg-white'"
          style="grid-template-columns: 80px 90px 1fr auto"
        >
          <span class="text-body-sm font-medium text-navy">
            {{ t(`university.orders.documents.${id}.number`) }}
          </span>
          <span class="text-body-sm text-text-muted">
            {{ t(`university.orders.documents.${id}.date`) }}
          </span>
          <span class="font-medium text-navy">
            {{ t(`university.orders.documents.${id}.title`) }}
          </span>
          <span class="text-body-sm">
            <span class="inline-block px-2.5 py-0.5 rounded bg-gold/15 text-gold font-medium">
              {{ t(`university.orders.documents.${id}.category`) }}
            </span>
          </span>
        </div>
      </div>
      <p v-if="filteredDocumentIds.length === 0" class="text-body text-text-muted py-8 text-center">
        {{ t('common.comingSoon') }}
      </p>
    </div>
  </div>
</template>
