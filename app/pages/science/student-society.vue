<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.studentSociety'),
  meta: [{ name: 'description', content: () => t('science.studentSociety.subtitle') }],
})

const { assetUrl } = useDirectus()

/**
 * Товариство веде власний Google-сайт — саме туди воно попросило вести з цієї сторінки 09.09.
 * Емблема взята звідти ж і лежить у медіатеці Directus.
 */
const SNT_EMBLEM = '35fd9ec7-9f68-5c67-adee-ff82289c8130'
const SNT_SITE_URL = 'https://sites.google.com/hnpu.edu.ua/studentskenaukovetovarystvo'

const activityIds = ['conferences', 'competitions', 'publications'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('science.studentSociety.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.studentSociety.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.studentSociety.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro + activity cards -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 items-start mb-12">
        <img
          :src="assetUrl(SNT_EMBLEM, { width: 440, format: 'auto' }) ?? undefined"
          :alt="t('science.studentSociety.title')"
          class="w-full max-w-[220px] mx-auto lg:mx-0"
          loading="lazy"
        >
        <div>
          <p class="text-body text-text-muted max-w-3xl">
            {{ t('science.studentSociety.intro') }}
          </p>
          <a
            :href="SNT_SITE_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 inline-flex items-center rounded-10 border border-border px-4 py-2 text-body-sm font-medium text-navy no-underline transition-colors duration-280 hover:border-gold hover:text-gold"
          >
            {{ t('science.studentSociety.siteLink') }}
            <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
          </a>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <article
          v-for="id in activityIds"
          :key="id"
          class="bg-white border border-border rounded-14 overflow-hidden transition-all duration-280 hover:border-gold/40 hover:shadow-gold"
        >
          <div
            class="aspect-[4/3] bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center"
          >
            <div
              class="repeating-diagonal-pattern w-full h-full flex items-center justify-center opacity-30"
              aria-hidden
            />
          </div>
          <div class="p-5">
            <h2 class="font-playfair text-lg font-semibold text-navy mb-3">
              {{ t(`science.studentSociety.activities.${id}.name`) }}
            </h2>
            <p class="text-body-sm text-text-muted">
              {{ t(`science.studentSociety.activities.${id}.description`) }}
            </p>
          </div>
        </article>
      </div>

      <!-- CTA: gradient strip with Join button -->
      <div class="mt-14 bg-gradient-to-br from-navy-mid to-navy-deep py-14 rounded-16">
        <div
          class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left"
        >
          <div>
            <h2 class="font-playfair text-3xl text-white font-bold leading-tight mb-2">
              {{ t('science.studentSociety.ctaTitle') }}
            </h2>
            <p class="text-[15px] text-white/60">
              {{ t('science.studentSociety.ctaSubtitle') }}
            </p>
          </div>
          <NuxtLink
            :to="localePath('/contacts')"
            class="shrink-0 py-3.5 px-9 bg-gold text-navy-deep no-underline rounded-[10px] font-bold text-sm font-geologica transition-all duration-280 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-gold"
          >
            {{ t('science.studentSociety.ctaButton') }} →
          </NuxtLink>
        </div>
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
