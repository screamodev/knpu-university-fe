<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.studentContingent'),
  meta: [{ name: 'description', content: () => t('education.students.subtitle') }],
})

const statKeys = ['total', 'bachelor', 'master', 'graduate'] as const
const facultyKeys = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'] as const
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

    <!-- Stats band (4 gold-number stats) -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-16 overflow-hidden">
        <div
          v-for="(key, i) in statKeys"
          :key="key"
          class="bg-navy py-6 px-4 sm:py-9 sm:px-8 text-center transition-colors duration-280 hover:bg-navy-mid"
          :class="{ 'rounded-l-[12px]': i === 0, 'rounded-r-[12px]': i === statKeys.length - 1 }"
        >
          <div class="font-playfair text-4xl md:text-5xl font-bold text-gold leading-none mb-2">
            {{ t(`education.students.stats.${key}.num`) }}
          </div>
          <div class="text-[13px] text-white/60 leading-snug">
            {{ t(`education.students.stats.${key}.label`) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Breakdown sections -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <!-- Row 1: chart placeholder + faculties list -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-14">
        <div class="bg-off-white border border-border rounded-16 p-6 lg:p-8 flex flex-col">
          <h2 class="font-playfair text-xl font-bold text-navy mb-4">
            {{ t('education.students.byFacultyTitle') }}
          </h2>
          <div
            class="flex-1 min-h-[240px] rounded-12 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-slate-400 text-body-sm"
            aria-hidden
          >
            {{ t('education.students.chartPlaceholder') }}
          </div>
        </div>
        <div class="bg-off-white border border-border rounded-16 p-6 lg:p-8">
          <h2 class="font-playfair text-xl font-bold text-navy mb-4">
            {{ t('education.students.facultiesListTitle') }}
          </h2>
          <ul class="space-y-3">
            <li
              v-for="key in facultyKeys"
              :key="key"
              class="flex justify-between items-baseline gap-4 text-body-sm"
            >
              <span class="text-text-muted">{{ t(`education.students.faculties.${key}.name`) }}</span>
              <span class="font-semibold text-navy shrink-0">{{ t(`education.students.faculties.${key}.count`) }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Row 2: gender placeholder + international count -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        <div class="bg-off-white border border-border rounded-16 p-6 lg:p-8">
          <h2 class="font-playfair text-xl font-bold text-navy mb-4">
            {{ t('education.students.genderTitle') }}
          </h2>
          <div
            class="min-h-[200px] rounded-12 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-slate-400 text-body-sm"
            aria-hidden
          >
            {{ t('education.students.genderPlaceholder') }}
          </div>
        </div>
        <div class="bg-off-white border border-border rounded-16 p-6 lg:p-8 flex flex-col justify-center">
          <h2 class="font-playfair text-xl font-bold text-navy mb-2">
            {{ t('education.students.internationalTitle') }}
          </h2>
          <p class="text-body text-text-muted mb-4">
            {{ t('education.students.internationalIntro') }}
          </p>
          <div class="font-playfair text-4xl font-bold text-gold">
            {{ t('education.students.internationalCount') }}
          </div>
          <p class="text-body-sm text-text-muted mt-1">
            {{ t('education.students.internationalLabel') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
