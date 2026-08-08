<script setup lang="ts">
/**
 * Home newspaper CTA — compact navy band linking to the full «Учитель» archive.
 * Issue previews live only on `/university/newspaper`.
 */
const { t, localePath } = useSafeI18nWithRouter()
</script>

<template>
  <section class="bg-navy">
    <div
      class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
    >
      <div class="min-w-0">
        <div class="text-[11px] font-semibold tracking-[0.12em] uppercase text-gold mb-2.5">
          {{ t('university.newspaper.title') }}
        </div>
        <h2 class="font-playfair text-xl sm:text-2xl text-white font-bold leading-snug">
          {{ t('university.newspaper.subtitle') }}
        </h2>
      </div>

      <NuxtLink
        :to="localePath('/university/newspaper')"
        class="shrink-0 self-start sm:self-auto py-3 px-7 bg-gold text-navy-deep no-underline rounded-[10px] font-bold text-sm font-geologica transition-all duration-280 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-gold"
      >
        {{ t('sections.newspaper.all') }} →
      </NuxtLink>
    </div>
  </section>
</template>
