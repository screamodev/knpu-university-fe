<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.boards'),
  meta: [{ name: 'description', content: () => t('science.boards.subtitle') }],
})

</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('science.boards.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.boards.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.boards.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro + board cards (gold left border) -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('science.boards.intro') }}
      </p>

      <!--
        The four councils listed here were unverified: one carried speciality code 013 («Початкова
        освіта») under the name «Природничі науки». The real list is published by МОН.
      -->
      <SharedSectionPending />
    </div>
  </div>
</template>
