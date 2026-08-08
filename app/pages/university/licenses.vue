<script setup lang="ts">
/**
 * Ліцензія, сертифікати та нагороди університету.
 *
 * Migrated from `/uk/diplomi-ta-sertifikati-hnpu`: two short document lists (the licence and the
 * quality-management certificate, then the 2011 exhibition awards). Сертифікати про акредитацію
 * are a separate, much longer list and live on /education/accreditation.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()
const localePath = useLocalePath()

useHead({
  title: () => t('university.licenses.title'),
  meta: [{ name: 'description', content: () => t('university.licenses.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.licenses.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.licenses.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.licenses.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-10">
        {{ t('university.licenses.intro') }}
      </p>

      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('university.licenses.licenceTitle') }}
      </h2>
      <SharedDocumentList section="licenses" />

      <h2 class="font-playfair text-2xl font-bold text-navy mt-14 mb-2">
        {{ t('university.licenses.awardsTitle') }}
      </h2>
      <p class="text-body-sm text-text-muted mb-6 max-w-3xl">
        {{ t('university.licenses.awardsIntro') }}
      </p>
      <SharedDocumentList section="awards" />

      <div class="mt-14 border-l-4 border-gold bg-off-white border border-border rounded-12 p-6 lg:p-8">
        <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
          {{ t('university.licenses.accreditationTitle') }}
        </h3>
        <p class="text-body text-text-muted mb-4">
          {{ t('university.licenses.accreditationText') }}
        </p>
        <NuxtLink
          :to="localePath('/education/accreditation')"
          class="inline-flex items-center gap-1 font-medium text-navy underline hover:text-gold"
        >
          {{ t('university.licenses.accreditationLink') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
