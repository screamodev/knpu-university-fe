<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.statute'),
  meta: [{ name: 'description', content: () => t('university.statute.subtitle') }],
})

</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.statute.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.statute.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.statute.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('university.statute.intro') }}
      </p>
    </div>

    <!--
      Statutory documents: editors upload them in Directus («Нормативна документація»), which is
      where the real files already live. The previous cards linked nowhere (`href="#"`).
    -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('university.statute.documentsTitle') }}
      </h2>
      <SharedDocumentList section="regulations" />

      <p class="mt-10 text-body-sm text-text-muted max-w-3xl">
        {{ t('university.statute.regulatoryNote') }}
      </p>
    </div>
  </div>
</template>
