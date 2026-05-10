<script setup lang="ts">
const { t, localePath } = useSafeI18nWithRouter()
</script>

<template>
  <section class="py-20 bg-white">
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
      <SharedSectionHeader :tag="t('sections.remembrance.tag')" :title="t('sections.remembrance.title')" />
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
        <NuxtLink
          :to="localePath('/university/memorial')"
          class="group relative block overflow-hidden rounded-14 bg-gradient-to-br from-navy-mid to-navy-deep p-8 no-underline transition-all duration-280 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(27,46,75,0.14)] min-h-[220px]"
        >
          <svg
            class="pointer-events-none absolute -right-1 top-6 h-28 w-28 text-white/10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            aria-hidden="true"
          >
            <path d="M12 22c0-4-2-6-2-10 0-2 1-4 2-4s2 2 2 4c0 4-2 6-2 10" />
            <path d="M12 8v14" />
            <path d="M8 22h8" />
          </svg>
          <div class="relative">
            <div class="mb-3 inline-block rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
              {{ t('sections.remembrance.memorial.tag') }}
            </div>
            <h2 class="font-playfair text-xl font-bold leading-snug text-white md:text-2xl pr-14">
              {{ t('sections.remembrance.memorial.title') }}
            </h2>
            <p class="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
              {{ t('sections.remembrance.memorial.body') }}
            </p>
            <span
              class="mt-8 inline-flex items-center rounded-full bg-gold px-5 py-2.5 text-[13px] font-bold font-geologica text-navy-deep transition-all duration-280 group-hover:bg-gold-light group-hover:shadow-gold"
            >
              {{ t('sections.remembrance.memorial.cta') }} →
            </span>
          </div>
        </NuxtLink>
        <NuxtLink
          :to="localePath('/university/wartime')"
          class="group relative block overflow-hidden rounded-14 bg-gradient-to-br from-navy-mid to-navy-deep p-8 no-underline transition-all duration-280 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(27,46,75,0.14)] min-h-[220px]"
        >
          <div class="relative">
            <div class="mb-3 inline-block rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
              {{ t('sections.remembrance.wartime.tag') }}
            </div>
            <h2 class="font-playfair text-xl font-bold leading-snug text-white whitespace-pre-line md:text-2xl">
              {{ t('sections.remembrance.wartime.title') }}
            </h2>
            <p class="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
              {{ t('sections.remembrance.wartime.body') }}
            </p>
            <span
              class="mt-8 inline-flex items-center rounded-full border border-gold/55 bg-transparent px-5 py-2.5 text-[13px] font-bold font-geologica text-gold transition-all duration-280 group-hover:border-gold group-hover:bg-gold/10"
            >
              {{ t('sections.remembrance.wartime.cta') }} →
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
