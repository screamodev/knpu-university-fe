<script setup lang="ts">
/**
 * Волонтерський рух.
 *
 * The four «напрями» cards here were invented; the university's own account of its volunteer
 * work — with photos and a film — is migrated into `app/content/pages/volunteering.uk.json`.
 */
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.volunteering'),
  meta: [{ name: 'description', content: () => t('university.volunteering.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.volunteering.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.volunteering.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.volunteering.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro + the university's own account of its volunteer work -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="max-w-3xl text-body text-text-muted mb-10">
        {{ t('university.volunteering.intro') }}
      </p>

      <SharedStaticPageBody slug="volunteering" />
    </div>

    <!-- CTA banner (AnnouncementBanner pattern) -->
    <div class="bg-gradient-to-br from-navy-mid to-navy-deep py-14">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
        <div>
          <h2 class="font-playfair text-3xl text-white font-bold leading-tight mb-2">
            {{ t('university.volunteering.cta.title') }}
          </h2>
          <p class="text-[15px] text-white/60">
            {{ t('university.volunteering.cta.subtitle') }}
          </p>
        </div>
        <NuxtLink
          :to="localePath('/university/contacts')"
          class="shrink-0 py-3.5 px-9 bg-gold text-navy-deep no-underline rounded-[10px] font-bold text-sm font-geologica transition-all duration-280 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-gold"
        >
          {{ t('university.volunteering.cta.button') }} →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
