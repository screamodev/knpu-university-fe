<script setup lang="ts">
/**
 * «Виконавча рада (Рада з якості)».
 *
 * Спершу структура вела просто на PDF плану роботи — клієнт попросив сторінку, куди редактори
 * додаватимуть документи ради самі.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('university.qualityBoard.title'),
  meta: [{ name: 'description', content: () => t('university.qualityBoard.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.qualityBoard.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.qualityBoard.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.qualityBoard.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-10">
        {{ t('university.qualityBoard.intro') }}
      </p>
      <SharedDocumentList section="quality-board" />
    </div>
  </div>
</template>
