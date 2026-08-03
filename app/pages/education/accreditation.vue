<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.accreditation'),
  meta: [{ name: 'description', content: () => t('education.accreditation.subtitle') }],
})

</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.accreditation.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.accreditation.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.accreditation.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('education.accreditation.intro') }}
      </p>

      <h2 class="font-playfair text-2xl font-bold text-navy mb-4">
        {{ t('education.accreditation.cardsTitle') }}
      </h2>
      <!-- Programme accreditations: the six entries here were invented, dates included. -->
      <SharedSectionPending />

      <!-- Callout: gold left border -->
      <div
        class="border-l-4 border-gold bg-off-white border border-border rounded-12 p-6 lg:p-8"
      >
        <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
          {{ t('education.accreditation.calloutTitle') }}
        </h3>
        <p class="text-body text-text-muted">
          {{ t('education.accreditation.calloutText') }}
        </p>
      </div>
    </div>
  </div>
</template>
