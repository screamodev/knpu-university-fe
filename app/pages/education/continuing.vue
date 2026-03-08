<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.continuing'),
  meta: [{ name: 'description', content: () => t('education.continuing.subtitle') }],
})

const programmeKeys = ['p1', 'p2', 'p3', 'p4'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.continuing.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.continuing.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.continuing.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('education.continuing.intro') }}
      </p>
    </div>

    <!-- Programme cards 2x2 -->
    <div class="bg-off-white border-t border-border py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('education.continuing.programmesTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <article
            v-for="key in programmeKeys"
            :key="key"
            class="bg-white border border-border rounded-16 overflow-hidden transition-all duration-280 hover:border-gold/40 hover:shadow-gold flex flex-col"
          >
            <div
              class="aspect-[4/3] bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center shrink-0"
            >
              <div
                class="repeating-diagonal-pattern w-full h-full flex items-center justify-center opacity-30"
                aria-hidden
              />
            </div>
            <div class="p-6 flex flex-col flex-1">
              <h3 class="font-playfair text-lg font-semibold text-navy mb-3">
                {{ t(`education.continuing.programmes.${key}.name`) }}
              </h3>
              <p class="text-body-sm text-text-muted mb-1">
                {{ t(`education.continuing.programmes.${key}.duration`) }}
              </p>
              <p class="text-body-sm text-text-muted mb-3">
                {{ t(`education.continuing.programmes.${key}.audience`) }}
              </p>
              <p class="text-body-sm font-medium text-gold mt-auto pt-2">
                {{ t(`education.continuing.programmes.${key}.price`) }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- CTA banner -->
    <div class="bg-gradient-to-br from-navy-mid to-navy-deep py-14">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
        <div>
          <h2 class="font-playfair text-3xl text-white font-bold leading-tight mb-2">
            {{ t('education.continuing.ctaTitle') }}
          </h2>
          <p class="text-[15px] text-white/60">
            {{ t('education.continuing.ctaSubtitle') }}
          </p>
        </div>
        <NuxtLink
          :to="localePath('/contacts')"
          class="shrink-0 py-3.5 px-9 bg-gold text-navy-deep no-underline rounded-[10px] font-bold text-sm font-geologica transition-all duration-280 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-gold"
        >
          {{ t('education.continuing.ctaButton') }} →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.repeating-diagonal-pattern {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(201, 162, 39, 0.06) 0,
    rgba(201, 162, 39, 0.06) 1px,
    transparent 1px,
    transparent 24px
  );
}
</style>
