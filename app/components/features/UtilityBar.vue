<script setup lang="ts">
const { t, localePath, switchLocalePath, locale } = useSafeI18nWithRouter()
</script>

<template>
  <div class="bg-navy-deep py-[7px] text-[12.5px] text-white/75">
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 max-md:hidden">
      <div class="flex items-center gap-5">
        <a
          :href="`tel:${t('utility.phone').replace(/\s/g, '')}`"
          class="flex items-center gap-1.5 text-white/70 hover:text-gold-light transition-colors duration-280"
        >
          <svg class="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.63 4.35 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {{ t('utility.phone') }}
        </a>
        <a
          href="mailto:rector@hnpu.edu.ua"
          class="flex items-center gap-1.5 text-white/70 hover:text-gold-light transition-colors duration-280"
        >
          <svg class="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          {{ t('utility.email') }}
        </a>
        <span class="flex items-center gap-1.5 text-white/70">
          <svg class="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {{ t('utility.hours') }}
        </span>
      </div>
      <div class="flex items-center gap-3">
        <div class="flex gap-2">
          <a href="#" class="w-[26px] h-[26px] rounded-full border border-white/20 flex items-center justify-center text-[11px] text-white/65 hover:border-gold hover:text-gold transition-all duration-280" title="Facebook">f</a>
          <a href="#" class="w-[26px] h-[26px] rounded-full border border-white/20 flex items-center justify-center text-[11px] text-white/65 hover:border-gold hover:text-gold transition-all duration-280" title="YouTube">▶</a>
          <a href="#" class="w-[26px] h-[26px] rounded-full border border-white/20 flex items-center justify-center text-[11px] text-white/65 hover:border-gold hover:text-gold transition-all duration-280" title="Instagram">◈</a>
          <a href="#" class="w-[26px] h-[26px] rounded-full border border-white/20 flex items-center justify-center text-[11px] text-white/65 hover:border-gold hover:text-gold transition-all duration-280" title="Telegram">✈</a>
        </div>
        <NuxtLink :to="localePath('/feedback')" class="text-[12px] text-white/65 hover:text-gold-light transition-colors duration-280">
          {{ t('utility.feedback') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/cabinet')" class="text-[12px] text-white/65 hover:text-gold-light transition-colors duration-280">
          {{ t('utility.cabinet') }}
        </NuxtLink>
        <div class="flex border border-white/20 rounded overflow-hidden">
          <NuxtLink
            :to="switchLocalePath('uk')"
            class="px-2 py-0.5 text-[11.5px] font-medium transition-all duration-280"
            :class="locale === 'uk' ? 'bg-gold text-navy-deep' : 'text-white/60 hover:bg-white/10 hover:text-white'"
          >
            {{ t('utility.langUk') }}
          </NuxtLink>
          <NuxtLink
            :to="switchLocalePath('en')"
            class="px-2 py-0.5 text-[11.5px] font-medium transition-all duration-280"
            :class="locale === 'en' ? 'bg-gold text-navy-deep' : 'text-white/60 hover:bg-white/10 hover:text-white'"
          >
            {{ t('utility.langEn') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
