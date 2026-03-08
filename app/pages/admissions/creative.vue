<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.creative'),
  meta: [{ name: 'description', content: () => t('admissions.creative.subtitle') }],
})

const competitionIds = ['c1', 'c2', 'c3'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('admissions.creative.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.creative.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('admissions.creative.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <p class="max-w-3xl text-body text-text-muted">
        {{ t('admissions.creative.intro') }}
      </p>
    </div>

    <!-- Competition cards: 3 stacked, each 2-col (image left, content right) -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-14">
      <div class="space-y-8">
        <article
          v-for="id in competitionIds"
          :key="id"
          class="bg-off-white border border-border rounded-16 overflow-hidden flex flex-col sm:flex-row"
        >
          <div
            class="sm:w-2/5 min-h-[200px] sm:min-h-0 bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center shrink-0"
          >
            <svg
              class="w-14 h-14 text-gold/20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
            >
              <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" />
            </svg>
          </div>
          <div class="p-6 sm:p-8 flex-1">
            <h2 class="font-playfair text-xl font-bold text-navy">
              {{ t(`admissions.creative.competitions.${id}.specialty`) }}
            </h2>
            <p class="mt-1 text-body-sm font-medium text-gold">
              {{ t(`admissions.creative.competitions.${id}.type`) }}
            </p>
            <ul class="mt-4 space-y-1.5 text-body-sm text-text-muted">
              <li
                v-for="(_, reqIndex) in 3"
                :key="reqIndex"
                class="flex gap-2"
              >
                <span class="text-gold shrink-0">—</span>
                {{ t(`admissions.creative.competitions.${id}.req${reqIndex + 1}`) }}
              </li>
            </ul>
            <p class="mt-4 text-body-sm text-text-muted">
              <span class="font-medium text-navy">{{ t('admissions.creative.datesLabel') }}:</span>
              {{ t(`admissions.creative.competitions.${id}.dates`) }}
            </p>
          </div>
        </article>
      </div>
    </div>

    <!-- Preparation tips callout: gold left border -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="border-l-4 border-gold bg-gold/5 rounded-r-12 pl-6 pr-6 py-6">
        <h3 class="font-playfair text-lg font-bold text-navy">
          {{ t('admissions.creative.tipsTitle') }}
        </h3>
        <p class="mt-2 text-body text-text-muted">
          {{ t('admissions.creative.tipsText') }}
        </p>
      </div>
    </div>
  </div>
</template>
