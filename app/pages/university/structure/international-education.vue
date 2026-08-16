<script setup lang="ts">
/**
 * Центр міжнародної освіти.
 *
 * Підрозділу на сайті не існувало; текст двома мовами, фото працівниць і опис підготовчого
 * відділення надіслав сам центр. Вступ іноземців — окрема сторінка, бо клієнт просив покликання
 * на неї і з центру, і з головної.
 */
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('university.internationalEducation.title'),
  meta: [{ name: 'description', content: () => t('university.internationalEducation.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('university.structure.tagDepartment') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.internationalEducation.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.internationalEducation.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedStaticPageBody slug="international-education" />

      <NuxtLink
        :to="localePath('/admissions/foreign')"
        class="mt-14 flex flex-col sm:flex-row sm:items-center gap-4 rounded-16 bg-navy text-white p-8 no-underline hover:bg-navy-deep transition-colors"
      >
        <span class="flex-1">
          <span class="block font-playfair text-xl font-bold">
            {{ t('university.internationalEducation.admissionCtaTitle') }}
          </span>
          <span class="block text-body-sm text-white/70 mt-1">
            {{ t('university.internationalEducation.admissionCtaText') }}
          </span>
        </span>
        <span class="inline-flex items-center gap-2 rounded-12 bg-gold text-navy font-semibold px-5 py-2.5 shrink-0">
          {{ t('university.internationalEducation.admissionCtaButton') }}
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
