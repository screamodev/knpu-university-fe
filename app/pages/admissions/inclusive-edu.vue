<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.inclusiveEdu'),
  meta: [{ name: 'description', content: () => t('admissions.inclusiveEdu.subtitle') }],
})

const accessibilityKeys = [
  'ramps',
  'signLanguage',
  'assistiveTech',
  'individualPlans',
  'psychologicalSupport',
  'transport',
] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('admissions.inclusiveEdu.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.inclusiveEdu.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('admissions.inclusiveEdu.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('admissions.inclusiveEdu.intro') }}
      </p>
    </div>

    <!-- Accessibility features grid 2x3 -->
    <div class="bg-off-white border-t border-border py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('admissions.inclusiveEdu.featuresTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="key in accessibilityKeys"
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
              {{ t(`admissions.inclusiveEdu.${key}`) }}
            </h3>
            <p class="text-body-sm text-text-muted">
              {{ t(`admissions.inclusiveEdu.${key}Desc`) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Inclusive space: placeholder image + quote -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('admissions.inclusiveEdu.spaceTitle') }}
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div
          class="rounded-16 overflow-hidden bg-gradient-to-br from-navy-mid to-navy-deep aspect-[4/3] flex items-center justify-center shrink-0 order-2 lg:order-1"
        >
          <svg
            class="w-16 h-16 text-gold/20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </div>
        <div class="order-1 lg:order-2">
          <blockquote class="border-l-4 border-l-gold pl-6 py-2">
            <p class="font-playfair text-xl text-navy italic">
              {{ t('admissions.inclusiveEdu.spaceQuote') }}
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  </div>
</template>
