<script setup lang="ts">
/**
 * Документи про вищу освіту → Замовлення дублікату документу про вищу освіту.
 *
 * Текст порядку замовлення і посилання на зразки заяв (PDF) надіслав навчальний відділ
 * (`app/content/pages/higher-education-documents.uk.json`, правки 08.10).
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.higherEducationDocuments'),
  meta: [{ name: 'description', content: () => t('education.higherEducationDocuments.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.higherEducationDocuments.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.higherEducationDocuments.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.higherEducationDocuments.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedStaticPageBody slug="higher-education-documents" />
    </div>
  </div>
</template>
