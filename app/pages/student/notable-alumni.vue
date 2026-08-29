<script setup lang="ts">
/**
 * «Видатні випускники».
 *
 * Migrated from the old site at the client's request; the people listed are the sports club's
 * champions, which is why the club page links here. Photos still live on old.hnpu.edu.ua — the
 * text came across, the files did not.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('student.notableAlumni.title'),
  meta: [{ name: 'description', content: () => t('student.notableAlumni.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.notableAlumni.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.notableAlumni.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.notableAlumni.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedStaticPageBody slug="notable-alumni" />
    </div>
  </div>
</template>
