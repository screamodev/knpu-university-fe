<script setup lang="ts">
/**
 * Проєкт Еразмус+ perfect.
 *
 * Опис, склад партнерів і контакти надіслав координатор проєкту; на сторінці Erasmus+ плитка
 * «Проєкти» веде сюди, а не на теку Google Drive.
 */
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('university.erasmus.projects.perfect.title'),
  meta: [{ name: 'description', content: () => t('university.erasmus.projects.perfect.text') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('university.erasmus.projectsTitle') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.erasmus.projects.perfect.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.erasmus.projects.perfect.text') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedStaticPageBody slug="erasmus-perfect" />

      <NuxtLink
        :to="localePath('/university/erasmus')"
        class="mt-12 inline-flex items-center gap-2 text-navy font-medium hover:underline"
      >
        ← {{ t('university.erasmus.backToErasmus') }}
      </NuxtLink>
    </div>
  </div>
</template>
