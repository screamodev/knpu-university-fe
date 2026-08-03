<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.studentContingent'),
  meta: [{ name: 'description', content: () => t('education.students.subtitle') }],
})

</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.students.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.students.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.students.subtitle') }}
        </p>
      </div>
    </div>

    <!--
      Enrolment figures («8 000+ студентів», per-faculty counts, «180+ іноземців») were invented;
      the real numbers come from the academic office.
    -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedSectionPending />
    </div>
  </div>
</template>
