<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('university.attestation.title'),
  meta: [{ name: 'description', content: () => t('university.attestation.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.attestation.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.attestation.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.attestation.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedStaticPageBody slug="attestation" class="mb-12" />

      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('documents.listTitle') }}
      </h2>
      <SharedDocumentList section="attestation" />
    </div>
  </div>
</template>
