<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('university.agreements.categories.schools.title'),
  meta: [{ name: 'description', content: () => t('university.agreements.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.agreements.title') }}
        </div>
        <h1 class="font-playfair text-2xl md:text-3xl font-bold text-white max-w-4xl">
          {{ t('university.agreements.categories.schools.title') }}
        </h1>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedAgreementList category="schools" />
    </div>
  </div>
</template>
