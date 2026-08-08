<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('university.facilities.title'),
  meta: [{ name: 'description', content: () => t('university.facilities.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.facilities.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.facilities.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.facilities.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-10">
        {{ t('university.facilities.intro') }}
      </p>

      <SharedDocumentList section="facilities" />

      <!-- The videos the old site published on this page and on the faculty's own one. -->
      <div class="mt-14">
        <SharedStaticPageBody slug="facilities" />
      </div>
    </div>
  </div>
</template>
