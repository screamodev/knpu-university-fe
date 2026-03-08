<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.scholarships'),
  meta: [{ name: 'description', content: () => t('admissions.scholarships.subtitle') }],
})

const scholarshipCards = [
  {
    titleKey: 'academicTitle' as const,
    amountKey: 'academicAmount' as const,
    eligibilityKey: 'academicEligibility' as const,
    descKey: 'academicDesc' as const,
  },
  {
    titleKey: 'socialTitle' as const,
    amountKey: 'socialAmount' as const,
    eligibilityKey: 'socialEligibility' as const,
    descKey: 'socialDesc' as const,
  },
  {
    titleKey: 'presidentialTitle' as const,
    amountKey: 'presidentialAmount' as const,
    eligibilityKey: 'presidentialEligibility' as const,
    descKey: 'presidentialDesc' as const,
  },
  {
    titleKey: 'namedTitle' as const,
    amountKey: 'namedAmount' as const,
    eligibilityKey: 'namedEligibility' as const,
    descKey: 'namedDesc' as const,
  },
] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('admissions.scholarships.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.scholarships.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('admissions.scholarships.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('admissions.scholarships.intro') }}
      </p>
    </div>

    <!-- Scholarship type cards (4 stacked, gold left border) -->
    <div class="bg-off-white border-t border-border py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-0">
          <div
            v-for="card in scholarshipCards"
            :key="card.titleKey"
            class="bg-white border border-border rounded-16 p-6 lg:p-8 border-l-4 border-l-gold mb-6 last:mb-0"
          >
            <h3 class="font-playfair text-xl font-semibold text-navy mb-2">
              {{ t(`admissions.scholarships.${card.titleKey}`) }}
            </h3>
            <p class="text-body font-medium text-gold mb-3">
              {{ t(`admissions.scholarships.${card.amountKey}`) }}
            </p>
            <p class="text-body-sm text-navy font-medium mb-2">
              {{ t(`admissions.scholarships.${card.eligibilityKey}`) }}
            </p>
            <p class="text-body text-text-muted">
              {{ t(`admissions.scholarships.${card.descKey}`) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- How to apply CTA block -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <div class="bg-slate-50 border border-border rounded-16 p-8 lg:p-10">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-4">
          {{ t('admissions.scholarships.howToApplyTitle') }}
        </h2>
        <p class="text-body text-text-muted mb-8 max-w-2xl">
          {{ t('admissions.scholarships.howToApplyText') }}
        </p>
        <NuxtLink
          :to="localePath('/contacts')"
          class="inline-flex py-3.5 px-9 bg-gold text-navy-deep no-underline rounded-[10px] font-bold text-sm font-geologica transition-all duration-280 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-gold"
        >
          {{ t('admissions.scholarships.howToApplyButton') }} →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
