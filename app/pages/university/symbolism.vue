<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.symbolism'),
  meta: [{ name: 'description', content: () => t('university.symbolism.subtitle') }],
})

const symbols = [
  { key: 'coatOfArms', icon: 'shield' },
  { key: 'flag', icon: 'flag' },
  { key: 'colors', icon: 'palette' },
  { key: 'anthem', icon: 'music' },
] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.symbolism.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.symbolism.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.symbolism.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Symbol cards: alternating image left/right -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div
        v-for="(symbol, index) in symbols"
        :key="symbol.key"
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-10 first:pt-0 last:pb-0"
        :class="index % 2 === 1 ? 'lg:flex-row-reverse' : ''"
      >
        <!-- Image block -->
        <div
          class="rounded-16 overflow-hidden bg-gradient-to-br from-navy-mid to-navy-deep aspect-[4/3] lg:aspect-[3/4] flex items-center justify-center"
          :class="index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'"
        >
          <!-- Coat of arms: shield icon -->
          <svg
            v-if="symbol.icon === 'shield'"
            class="w-20 h-20 text-gold/30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <!-- Flag -->
          <svg
            v-else-if="symbol.icon === 'flag'"
            class="w-20 h-20 text-gold/30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
          >
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" />
          </svg>
          <!-- Colors: palette -->
          <svg
            v-else-if="symbol.icon === 'palette'"
            class="w-20 h-20 text-gold/30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
          >
            <circle cx="13.5" cy="6.5" r=".5" />
            <circle cx="17.5" cy="10.5" r=".5" />
            <circle cx="8.5" cy="7.5" r=".5" />
            <circle cx="6.5" cy="12.5" r=".5" />
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.7-.1 2.5-.3" />
          </svg>
          <!-- Anthem: music -->
          <svg
            v-else
            class="w-20 h-20 text-gold/30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        </div>

        <!-- Text block -->
        <div class="flex flex-col gap-4" :class="index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'">
          <h2 class="font-playfair text-2xl font-bold text-navy">
            {{ t(`university.symbolism.${symbol.key}.title`) }}
          </h2>
          <p class="text-body text-text-muted">
            {{ t(`university.symbolism.${symbol.key}.text`) }}
          </p>
          <!-- Anthem excerpt as styled quote -->
          <blockquote
            v-if="symbol.key === 'anthem'"
            class="mt-2 pl-4 border-l-4 border-gold text-body text-text-muted italic"
          >
            {{ t('university.symbolism.anthem.excerpt') }}
          </blockquote>
          <!-- Official colors: swatches placeholder -->
          <div
            v-if="symbol.key === 'colors'"
            class="flex gap-3 mt-2 flex-wrap"
          >
            <div class="w-12 h-12 rounded-10 bg-navy shrink-0" title="Navy" />
            <div class="w-12 h-12 rounded-10 bg-gold shrink-0" title="Gold" />
            <div class="w-12 h-12 rounded-10 bg-off-white border border-border shrink-0" title="Off-white" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
