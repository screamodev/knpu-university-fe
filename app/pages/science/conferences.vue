<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.conferences'),
  meta: [{ name: 'description', content: () => t('science.conferences.subtitle') }],
})

const eventIds = ['e1', 'e2', 'e3'] as const
const pastIds = ['p1', 'p2', 'p3', 'p4'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('science.conferences.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.conferences.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.conferences.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('science.conferences.intro') }}
      </p>

      <!-- Upcoming events: 3 event-style cards -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('science.conferences.upcomingTitle') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <article
          v-for="id in eventIds"
          :key="id"
          class="bg-white border border-border rounded-16 p-6 flex flex-col"
        >
          <div
            class="inline-flex items-center justify-center w-14 h-14 rounded-12 bg-gold/15 text-gold font-playfair text-lg font-bold shrink-0 mb-4"
          >
            {{ t(`science.conferences.events.${id}.dateBadge`) }}
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`science.conferences.events.${id}.title`) }}
          </h3>
          <span class="inline-block text-[11px] font-semibold tracking-wider uppercase text-gold mb-2">
            {{ t(`science.conferences.events.${id}.type`) }}
          </span>
          <p class="text-body-sm text-text-muted flex items-center gap-2 mb-2">
            <span class="w-5 h-5 rounded bg-slate-100 flex items-center justify-center shrink-0">
              <svg
                class="w-3 h-3 text-slate-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            {{ t(`science.conferences.events.${id}.location`) }}
          </p>
          <p class="text-body-sm text-text-muted mt-auto">
            {{ t(`science.conferences.events.${id}.description`) }}
          </p>
        </article>
      </div>

      <!-- Past events: bg-off-white, 4-column grid of compact cards -->
      <section class="bg-off-white rounded-16 border border-border p-8 lg:p-10">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('science.conferences.pastTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <article
            v-for="id in pastIds"
            :key="id"
            class="bg-white/80 border border-border rounded-12 p-4 text-slate-600"
          >
            <span class="text-[11px] font-semibold tracking-wider text-slate-500 uppercase block mb-2">
              {{ t(`science.conferences.past.${id}.year`) }}
            </span>
            <h3 class="font-playfair text-base font-semibold text-navy mb-2">
              {{ t(`science.conferences.past.${id}.title`) }}
            </h3>
            <p class="text-body-sm text-slate-500">
              {{ t(`science.conferences.past.${id}.participants`) }}
            </p>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>
