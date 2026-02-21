<script setup lang="ts">
const { t, localePath } = useSafeI18nWithRouter()
</script>

<template>
  <div class="bg-gradient-to-br from-navy-mid to-navy-deep py-14">
    <div class="max-w-container mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
      <div>
        <div class="text-[11px] font-semibold tracking-[0.12em] uppercase text-gold mb-2.5">
          {{ t('sections.announcement.tag') }}
        </div>
        <h2 class="font-playfair text-3xl text-white font-bold leading-tight mb-2 whitespace-pre-line">
          {{ t('sections.announcement.title') }}
        </h2>
        <p class="text-[15px] text-white/60">
          {{ t('sections.announcement.subtitle') }}
        </p>
      </div>
      <NuxtLink
        :to="localePath('/admissions/rules')"
        class="shrink-0 py-3.5 px-9 bg-gold text-navy-deep no-underline rounded-[10px] font-bold text-sm font-geologica transition-all duration-280 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-gold"
      >
        {{ t('sections.announcement.cta') }} →
      </NuxtLink>
    </div>
  </div>
</template>
