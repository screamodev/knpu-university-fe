<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.secondDegree'),
  meta: [{ name: 'description', content: () => t('admissions.secondDegree.subtitle') }],
})

const benefitKeys = ['schedule', 'diploma', 'experience', 'practice', 'network', 'career'] as const
const stepKeys = ['step1', 'step2', 'step3'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('admissions.secondDegree.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.secondDegree.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('admissions.secondDegree.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <p class="max-w-3xl text-body text-text-muted">
        {{ t('admissions.secondDegree.intro') }}
      </p>
    </div>

    <!-- Benefits grid 3x2 -->
    <div class="bg-off-white border-t border-border py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('admissions.secondDegree.benefitsTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="key in benefitKeys"
            :key="key"
            class="bg-white border border-border rounded-12 p-6 flex flex-col gap-3"
          >
            <div class="w-10 h-10 rounded-10 bg-gold/15 flex items-center justify-center text-gold shrink-0">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
              </svg>
            </div>
            <h3 class="font-playfair text-lg font-semibold text-navy">
              {{ t(`admissions.secondDegree.benefits.${key}.title`) }}
            </h3>
            <p class="text-body-sm text-text-muted">
              {{ t(`admissions.secondDegree.benefits.${key}.text`) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- How it works: 3-step horizontal process -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-10">
        {{ t('admissions.secondDegree.howItWorksTitle') }}
      </h2>
      <div class="flex flex-col md:flex-row items-stretch gap-6 md:gap-4">
        <template v-for="(step, index) in stepKeys" :key="step">
          <div class="flex flex-1 flex-col items-center text-center">
            <div class="flex items-center w-full">
              <div
                class="w-12 h-12 rounded-full bg-gold/15 border-2 border-gold flex items-center justify-center text-gold font-playfair font-bold text-lg shrink-0"
              >
                {{ index + 1 }}
              </div>
              <div
                v-if="index < stepKeys.length - 1"
                class="hidden md:block flex-1 h-0.5 bg-border mx-2 min-w-[20px]"
                aria-hidden="true"
              />
            </div>
            <div class="mt-4">
              <h3 class="font-playfair text-lg font-semibold text-navy">
                {{ t(`admissions.secondDegree.steps.${step}.title`) }}
              </h3>
              <p class="mt-2 text-body-sm text-text-muted">
                {{ t(`admissions.secondDegree.steps.${step}.text`) }}
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
