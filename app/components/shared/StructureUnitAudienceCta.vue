<script setup lang="ts">
/**
 * Applicant / graduate CTA strip on faculty and institute home pages.
 */
import { ADMISSIONS_LEGACY_URL } from '~/utils/externalSites'

const { t, localePath } = useSafeI18nWithRouter()
</script>

<template>
  <section class="bg-navy">
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
      <a
        :href="ADMISSIONS_LEGACY_URL"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex items-center justify-between gap-4 text-white no-underline font-playfair text-xl sm:text-2xl font-bold hover:text-gold-light transition-colors duration-280"
      >
        <span>{{ t('university.structure.unit.ctaApplicant') }}</span>
        <span class="text-gold transition-transform duration-280 group-hover:translate-x-1" aria-hidden>→</span>
      </a>
      <NuxtLink
        :to="localePath('/student/alumni')"
        class="group flex items-center justify-between gap-4 text-white no-underline font-playfair text-xl sm:text-2xl font-bold hover:text-gold-light transition-colors duration-280 sm:border-l sm:border-white/15 sm:pl-10"
      >
        <span>{{ t('university.structure.unit.ctaGraduate') }}</span>
        <span class="text-gold transition-transform duration-280 group-hover:translate-x-1" aria-hidden>→</span>
      </NuxtLink>
    </div>
  </section>
</template>
