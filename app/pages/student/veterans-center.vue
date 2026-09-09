<script setup lang="ts">
/**
 * Центр ветеранського розвитку.
 *
 * Сторінка була шаблонною: чотири «послуги» без текстів і три вигадані програми підтримки.
 * Замість них — опис, напрями діяльності та перелік проведених заходів, які надіслав сам Центр
 * (`app/content/pages/veterans-center.uk.json`). Положення про Центр лежить у нормативних
 * документах, тож сторінка веде туди, а не дублює файл.
 */
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.veteransCenter'),
  meta: [{ name: 'description', content: () => t('student.veteransCenter.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero: respectful darker tone -->
    <div class="bg-gradient-to-b from-navy-deep to-navy-deep py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.veteransCenter.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.veteransCenter.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.veteransCenter.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedStaticPageBody slug="veterans-center" />

      <div class="mt-14">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-4">
          {{ t('student.veteransCenter.regulationTitle') }}
        </h2>
        <NuxtLink
          :to="localePath('/university/regulations')"
          class="inline-flex rounded-16 border border-border p-6 no-underline hover:border-gold transition-colors"
        >
          <span class="font-playfair text-lg font-semibold text-navy">
            {{ t('student.veteransCenter.regulationLink') }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
