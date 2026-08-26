<script setup lang="ts">
/**
 * «Рейтинг успішності здобувачів вищої освіти».
 *
 * The centre's «Студенту» tab carried this whole section inline, which buried it under the
 * дисципліни вільного вибору. It is one thing students look for by name, so it gets its own
 * address and the tab keeps a button to it. Content still comes from the migrated static page —
 * same slug, same slice — so editors keep updating it where they always did.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('education.studentRating.title'),
  meta: [{ name: 'description', content: () => t('education.studentRating.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('education.studentRating.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.studentRating.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.studentRating.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedStaticPageBody
        slug="quality-centre-students"
        from="Рейтинг успішності здобувачів вищої освіти"
        to="Графік навчального процесу"
        hide-headings
      />
    </div>
  </div>
</template>
