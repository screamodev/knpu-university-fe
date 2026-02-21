<script setup lang="ts">
const { t, localePath } = useSafeI18nWithRouter()
</script>

<template>
  <section class="relative h-[calc(100vh-111px)] min-h-[560px] max-h-[780px] overflow-hidden bg-navy-deep">
    <div
      class="absolute inset-0 bg-cover bg-center animate-slowZoom"
      style="background-image: linear-gradient(135deg, rgba(15,30,50,0.88) 0%, rgba(27,46,75,0.6) 60%, rgba(15,30,50,0.4) 100%), url('https://images.unsplash.com/photo-1562774053-701939374585?w=1800&q=80');"
    />
    <div
      class="absolute inset-0 opacity-30"
      style="background-image: repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(201,162,39,0.03) 60px, rgba(201,162,39,0.03) 61px);"
    />
    <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-transparent" />
    <div class="relative z-[2] h-full flex flex-col justify-center max-w-container mx-auto px-8">
      <div
        class="inline-flex items-center gap-2 bg-gold/15 border border-gold/35 text-gold-light py-1.5 px-3.5 rounded-100 text-xs font-medium tracking-wider uppercase mb-6 w-fit before:content-[''] before:w-1.5 before:h-1.5 before:bg-gold before:rounded-full"
      >
        {{ t('hero.tag') }}
      </div>
      <h1 class="font-playfair text-[clamp(32px,5vw,58px)] font-bold text-white leading-tight max-w-[720px] mb-5">
        {{ t('hero.titleLine1') }}<br>
        {{ t('hero.titleLine2') }}<br>
        <template v-if="t('hero.titleLine3')">{{ t('hero.titleLine3') }} </template><em class="not-italic text-gold-light">{{ t('hero.titleName') }}</em>
      </h1>
      <p class="text-base text-white/65 max-w-[480px] leading-relaxed mb-10 font-light">
        {{ t('hero.subtitle') }}
      </p>
      <div class="flex items-center gap-4">
        <NuxtLink
          :to="localePath('/admissions/edebo')"
          class="py-3.5 px-8 rounded-[10px] text-[14.5px] font-semibold no-underline font-geologica transition-all duration-280 bg-gold text-navy-deep hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-gold-lg"
        >
          {{ t('hero.ctaApply') }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/university/history')"
          class="py-3.5 px-8 rounded-[10px] text-[14.5px] font-semibold no-underline font-geologica transition-all duration-280 border-[1.5px] border-white/35 text-white bg-white/5 backdrop-blur-sm hover:border-white/70 hover:bg-white/10"
        >
          {{ t('hero.ctaAbout') }}
        </NuxtLink>
      </div>
    </div>
    <div class="absolute bottom-12 right-8 flex gap-0.5 max-lg:hidden">
      <div class="bg-white/5 backdrop-blur-md border border-white/10 py-4 px-6 text-center rounded-l-[12px]">
        <div class="font-playfair text-[28px] font-bold text-gold-light leading-none mb-1">220</div>
        <div class="text-[11px] text-white/55 font-normal leading-snug whitespace-pre-line">{{ t('hero.statYears') }}</div>
      </div>
      <div class="bg-white/5 backdrop-blur-md border border-white/10 py-4 px-6 text-center">
        <div class="font-playfair text-[28px] font-bold text-gold-light leading-none mb-1">8 000+</div>
        <div class="text-[11px] text-white/55 font-normal leading-snug whitespace-pre-line">{{ t('hero.statStudents') }}</div>
      </div>
      <div class="bg-white/5 backdrop-blur-md border border-white/10 py-4 px-6 text-center">
        <div class="font-playfair text-[28px] font-bold text-gold-light leading-none mb-1">30+</div>
        <div class="text-[11px] text-white/55 font-normal leading-snug whitespace-pre-line">{{ t('hero.statJournals') }}</div>
      </div>
      <div class="bg-white/5 backdrop-blur-md border border-white/10 py-4 px-6 text-center rounded-r-[12px]">
        <div class="font-playfair text-[28px] font-bold text-gold-light leading-none mb-1">95+</div>
        <div class="text-[11px] text-white/55 font-normal leading-snug whitespace-pre-line">{{ t('hero.statPrograms') }}</div>
      </div>
    </div>
  </section>
</template>
