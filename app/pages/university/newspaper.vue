<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.newspaper'),
  meta: [{ name: 'description', content: () => t('university.newspaper.subtitle') }],
})

const issueKeys = ['1', '2', '3', '4', '5', '6'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.newspaper.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.newspaper.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.newspaper.subtitle') }}
        </p>
      </div>
    </div>

    <!-- About block: 2-column -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div class="space-y-4 text-body text-text-muted">
          <p>{{ t('university.newspaper.aboutText1') }}</p>
          <p>{{ t('university.newspaper.aboutText2') }}</p>
        </div>
        <div
          class="aspect-[3/4] max-h-[420px] w-full rounded-16 overflow-hidden bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center shrink-0"
        >
          <svg
            class="w-16 h-16 text-gold/30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
          >
            <path d="M4 4h16v16H4z" />
            <path d="M4 8h16M4 12h16M4 16h8" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Issues grid -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('university.newspaper.issuesTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="key in issueKeys"
            :key="key"
            class="group bg-white border border-border rounded-16 overflow-hidden flex flex-col transition-all duration-280 hover:border-gold hover:-translate-y-1 hover:shadow-gold"
          >
            <!-- Cover placeholder ~3:4 -->
            <div
              class="aspect-[3/4] bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center shrink-0"
            >
              <svg
                class="w-12 h-12 text-gold/30 transition-transform duration-280 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
              >
                <path d="M4 4h16v16H4z" />
                <path d="M4 8h16M4 12h16M4 16h8" />
              </svg>
            </div>
            <div class="p-5 flex flex-col flex-1">
              <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-1">
                {{ t(`university.newspaper.issues.${key}.number`) }} · {{ t(`university.newspaper.issues.${key}.date`) }}
              </div>
              <p class="text-sm text-text-muted line-clamp-2">
                {{ t(`university.newspaper.issues.${key}.description`) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Archive CTA -->
        <div class="mt-12 text-center">
          <NuxtLink
            :to="localePath('/news')"
            class="inline-flex items-center gap-2 py-3 px-6 bg-navy text-white no-underline rounded-[10px] font-bold text-sm font-geologica transition-all duration-280 hover:bg-navy-mid hover:-translate-y-0.5"
          >
            {{ t('university.newspaper.archiveCta') }} →
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
