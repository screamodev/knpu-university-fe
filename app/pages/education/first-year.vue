<script setup lang="ts">
/**
 * На допомогу першокурснику.
 *
 * Was buried inside the «Здобувачу» tab of the quality centre; the client asked for it as a page
 * of its own, reached by a button. The content is the centre's, migrated from smc.
 */
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('education.firstYear.title'),
  meta: [{ name: 'description', content: () => t('education.firstYear.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.firstYear.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.firstYear.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.firstYear.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedStaticPageBody
        slug="quality-centre-students"
        from="НА ДОПОМОГУ ПЕРШОКУРСНИКУ"
        to="Онлайн анкетування дисциплін вільного вибору здобувачів першого"
        hide-headings
      />

      <NuxtLink
        :to="localePath('/education/quality?tab=students')"
        class="mt-10 inline-flex items-center gap-2 text-navy font-medium hover:underline"
      >
        {{ t('education.firstYear.backLink') }}
      </NuxtLink>
    </div>
  </div>
</template>
