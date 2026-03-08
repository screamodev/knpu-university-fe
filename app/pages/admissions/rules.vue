<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.rules'),
  meta: [{ name: 'description', content: () => t('admissions.rules.subtitle') }],
})

const dateKeys = ['march1', 'july15', 'august1', 'august15', 'september1'] as const
const stepKeys = ['step1', 'step2', 'step3', 'step4', 'step5'] as const

const edeboUrl = 'https://vstup.edebo.gov.ua/'
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('admissions.rules.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.rules.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('admissions.rules.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Key dates timeline: horizontal, gold circles -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('admissions.rules.keyDatesTitle') }}
      </h2>
      <div class="flex flex-wrap gap-6 lg:gap-4 items-start">
        <template v-for="(key, index) in dateKeys" :key="key">
          <div class="flex items-center gap-3 flex-1 min-w-[160px]">
            <div
              class="w-4 h-4 rounded-full bg-gold shrink-0 ring-4 ring-gold/20"
              aria-hidden="true"
            />
            <div>
              <p class="font-semibold text-navy text-body-sm">
                {{ t(`admissions.rules.dates.${key}.label`) }}
              </p>
              <p class="text-body-sm text-text-muted mt-0.5">
                {{ t(`admissions.rules.dates.${key}.text`) }}
              </p>
            </div>
          </div>
          <div
            v-if="index < dateKeys.length - 1"
            class="hidden lg:block w-8 h-0.5 bg-border shrink-0 self-center"
            aria-hidden="true"
          />
        </template>
      </div>
    </div>

    <!-- Numbered steps: vertical, 5 steps -->
    <div class="bg-off-white border-t border-border py-14 lg:py-20">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-10">
          {{ t('admissions.rules.stepsTitle') }}
        </h2>
        <ul class="space-y-8">
          <li
            v-for="(step, index) in stepKeys"
            :key="step"
            class="flex gap-4"
          >
            <div
              class="w-10 h-10 rounded-10 bg-gold/15 border border-gold/30 flex items-center justify-center text-gold font-playfair font-bold shrink-0"
            >
              {{ index + 1 }}
            </div>
            <div>
              <h3 class="font-playfair text-lg font-semibold text-navy">
                {{ t(`admissions.rules.steps.${step}.title`) }}
              </h3>
              <p class="mt-2 text-body text-text-muted">
                {{ t(`admissions.rules.steps.${step}.text`) }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- EDEBO CTA -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <div class="bg-navy rounded-16 p-8 lg:p-10 text-white text-center">
        <h2 class="font-playfair text-2xl font-bold mb-3">
          {{ t('admissions.rules.edeboCtaTitle') }}
        </h2>
        <p class="text-white/80 max-w-xl mx-auto mb-6">
          {{ t('admissions.rules.edeboCtaText') }}
        </p>
        <a
          :href="edeboUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center px-6 py-3 rounded-12 bg-gold text-navy font-semibold no-underline hover:bg-gold-light transition-colors"
        >
          {{ t('admissions.rules.edeboCtaButton') }}
          <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <path d="M15 3h6v6M10 14L21 3" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>
