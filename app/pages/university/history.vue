<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.history'),
  meta: [{ name: 'description', content: () => t('university.history.subtitle') }],
})

const timelineEntries = [
  { year: '1804', titleKey: 'university.history.timeline.1804.title', textKey: 'university.history.timeline.1804.text' },
  { year: '1851', titleKey: 'university.history.timeline.1851.title', textKey: 'university.history.timeline.1851.text' },
  { year: '1921', titleKey: 'university.history.timeline.1921.title', textKey: 'university.history.timeline.1921.text' },
  { year: '1991', titleKey: 'university.history.timeline.1991.title', textKey: 'university.history.timeline.1991.text' },
  { year: '2004', titleKey: 'university.history.timeline.2004.title', textKey: 'university.history.timeline.2004.text' },
  { year: '2022', titleKey: 'university.history.timeline.2022.title', textKey: 'university.history.timeline.2022.text' },
]
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.history.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.history.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.history.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro: 2-column -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div class="space-y-4 text-body text-text-muted">
          <p>{{ t('university.history.intro1') }}</p>
          <p>{{ t('university.history.intro2') }}</p>
        </div>
        <div
          class="aspect-[4/5] max-h-[420px] w-full rounded-16 overflow-hidden bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center shrink-0"
        >
          <svg
            class="w-16 h-16 text-gold/30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Timeline -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="relative">
        <!-- Vertical line -->
        <div
          class="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border hidden md:block"
          aria-hidden="true"
        />

        <div class="space-y-12 md:space-y-16">
          <div
            v-for="(entry, index) in timelineEntries"
            :key="entry.year"
            class="relative flex flex-col md:flex-row md:items-start gap-6"
            :class="index % 2 === 0 ? '' : 'md:flex-row-reverse'"
          >
            <!-- Content side -->
            <div
              class="md:w-[calc(50%-2rem)] flex gap-4"
              :class="index % 2 === 0 ? 'md:flex-row md:pr-8' : 'md:flex-row-reverse md:pl-8'"
            >
              <div
                class="w-14 h-14 rounded-full bg-gold flex items-center justify-center text-navy font-playfair text-lg font-bold shrink-0 z-10"
              >
                {{ entry.year }}
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-playfair text-xl font-semibold text-navy">
                  {{ t(entry.titleKey) }}
                </h3>
                <p class="mt-2 text-body-sm text-text-muted">
                  {{ t(entry.textKey) }}
                </p>
              </div>
            </div>

            <!-- Image side -->
            <div
              class="md:w-[calc(50%-2rem)] rounded-16 overflow-hidden bg-gradient-to-br from-navy-mid to-navy-deep aspect-video md:aspect-[4/3] flex items-center justify-center"
            >
              <svg
                class="w-10 h-10 text-gold/30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Facts band -->
    <WidgetsFactsBand />
  </div>
</template>
