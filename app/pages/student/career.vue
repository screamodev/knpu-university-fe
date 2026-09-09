<script setup lang="ts">
/**
 * Центр карʼєрного зростання.
 *
 * Сторінка була шаблонною: шість «послуг» без текстів і вигадана статистика працевлаштування.
 * Замість них — матеріали самого Центру (`app/content/pages/career-centre.uk.json`): наскрізна
 * педагогічна практика, співпраця з роботодавцями, заходи університету, виплати за тристоронньою
 * угодою і контакти. Центр працює при Інституті післядипломної освіти — у схемі структури він
 * стоїть саме там.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.career'),
  meta: [{ name: 'description', content: () => t('student.career.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.career.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.career.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.career.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedStaticPageBody slug="career-centre" />
    </div>
  </div>
</template>
