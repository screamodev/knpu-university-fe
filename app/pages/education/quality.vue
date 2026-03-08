<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.qualityCenter'),
  meta: [{ name: 'description', content: () => t('education.quality.subtitle') }],
})

const goalIds = ['g1', 'g2', 'g3'] as const
const teamIds = ['t1', 't2', 't3', 't4'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.quality.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.quality.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.quality.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro: 2-col text + placeholder image -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div>
          <h2 class="font-playfair text-xl font-bold text-navy mb-3">
            {{ t('education.quality.missionTitle') }}
          </h2>
          <p class="text-body text-text-muted">
            {{ t('education.quality.missionText') }}
          </p>
        </div>
        <div
          class="rounded-16 overflow-hidden bg-gradient-to-br from-navy-mid to-navy-deep aspect-[4/3] flex items-center justify-center shrink-0"
        >
          <svg
            class="w-16 h-16 text-gold/20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Mission / goals blocks: 3 in a row -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('education.quality.goalsTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div
          v-for="id in goalIds"
          :key="id"
          class="flex flex-col gap-3"
        >
          <div
            class="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center text-gold shrink-0"
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy">
            {{ t(`education.quality.goals.${id}.title`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t(`education.quality.goals.${id}.text`) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Team section: bg-off-white band, 3-4 team cards -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('education.quality.teamTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="id in teamIds"
            :key="id"
            class="bg-white border border-border rounded-16 p-6 flex flex-col items-center text-center"
          >
            <div
              class="w-20 h-20 rounded-full bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center mb-4 shrink-0"
              aria-hidden
            >
              <span class="text-gold/60 font-playfair text-xl font-bold">
                {{ t(`education.quality.team.${id}.name`).charAt(0) }}
              </span>
            </div>
            <h3 class="font-playfair text-base font-semibold text-navy mb-1">
              {{ t(`education.quality.team.${id}.name`) }}
            </h3>
            <p class="text-body-sm text-text-muted">
              {{ t(`education.quality.team.${id}.role`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
