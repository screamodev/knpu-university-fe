<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.social'),
  meta: [{ name: 'description', content: () => t('student.social.subtitle') }],
})

const categoryKeys = [
  'scholarships',
  'financialAid',
  'orphanSupport',
  'disabilitySupport',
  'warAffected',
  'housingAssistance',
] as const

const steps = [
  { titleKey: 'step1Title' as const, textKey: 'step1Text' as const },
  { titleKey: 'step2Title' as const, textKey: 'step2Text' as const },
  { titleKey: 'step3Title' as const, textKey: 'step3Text' as const },
] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.social.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.social.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.social.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('student.social.intro') }}
      </p>
    </div>

    <!-- Support categories grid: 2x3 -->
    <div class="bg-off-white border-t border-border py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('student.social.categoriesTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="key in categoryKeys"
            :key="key"
            class="bg-white border border-border rounded-16 p-6 flex flex-col gap-3"
          >
            <div class="w-10 h-10 rounded-10 bg-gold/15 flex items-center justify-center text-gold shrink-0">
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 class="font-playfair text-lg font-semibold text-navy">
              {{ t(`student.social.categories.${key}.title`) }}
            </h3>
            <p class="text-body-sm text-text-muted">
              {{ t(`student.social.categories.${key}.text`) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- How to apply: 3-step process -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-10">
        {{ t('student.social.howToApplyTitle') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(step, index) in steps"
          :key="step.titleKey"
          class="flex flex-col"
        >
          <div
            class="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center text-gold font-playfair text-xl font-bold shrink-0 mb-4"
          >
            {{ index + 1 }}
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`student.social.${step.titleKey}`) }}
          </h3>
          <p class="text-body text-text-muted">
            {{ t(`student.social.${step.textKey}`) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
