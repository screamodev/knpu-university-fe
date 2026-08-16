<script setup lang="ts">
/**
 * Вступ іноземних здобувачів вищої освіти — «For Abroad Enrollees».
 *
 * Текст двома мовами надав Центр міжнародної освіти. Сторінка окрема, бо покликання на неї стоїть
 * і в центрі, і на головній: іноземний вступник заходить не через структуру підрозділів.
 */
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('admissions.foreign.title'),
  meta: [{ name: 'description', content: () => t('admissions.foreign.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('admissions.foreign.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.foreign.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('admissions.foreign.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedStaticPageBody slug="admissions-foreign" />

      <div class="mt-12 flex flex-wrap gap-4">
        <a
          href="https://apply.studyinukraine.gov.ua"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-12 bg-gold text-navy font-semibold px-6 py-3 no-underline hover:bg-gold-light transition-colors"
        >
          {{ t('admissions.foreign.applyCta') }}
          <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
        </a>
        <NuxtLink
          :to="localePath('/university/structure/international-education')"
          class="inline-flex items-center gap-2 rounded-12 border border-navy text-navy font-semibold px-6 py-3 no-underline hover:bg-navy hover:text-white transition-colors"
        >
          {{ t('admissions.foreign.centreCta') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
