<script setup lang="ts">
/**
 * «Інформація про фінансову діяльність».
 *
 * The old site published this as a flat list of ~110 PDFs (баланси, кошториси, штатні розписи,
 * звіти) going back to 2016 — no figures in the page at all. So this is a document list like the
 * rest of the «Відвідувачу» area, not a dashboard: `SharedDocumentList` already brings the year
 * filter and the file metadata.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('university.financialReports.title'),
  meta: [{ name: 'description', content: () => t('university.financialReports.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.financialReports.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.financialReports.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.financialReports.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-10">
        {{ t('university.financialReports.intro') }}
      </p>

      <SharedDocumentList section="financial-activity" />
    </div>
  </div>
</template>
