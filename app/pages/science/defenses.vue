<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.defenses'),
  meta: [{ name: 'description', content: () => t('science.defenses.subtitle') }],
})

const upcomingIds = ['d1', 'd2', 'd3'] as const
const pastIds = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('science.defenses.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.defenses.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.defenses.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro + upcoming + past -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('science.defenses.intro') }}
      </p>

      <!-- Upcoming defenses: 3 event-style cards -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('science.defenses.upcomingTitle') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <article
          v-for="id in upcomingIds"
          :key="id"
          class="bg-white border border-border rounded-16 p-6 flex flex-col"
        >
          <div
            class="inline-flex items-center justify-center w-14 h-14 rounded-12 bg-gold/15 text-gold font-playfair text-lg font-bold shrink-0 mb-4"
          >
            {{ t(`science.defenses.upcoming.${id}.dateBadge`) }}
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-1">
            {{ t(`science.defenses.upcoming.${id}.candidate`) }}
          </h3>
          <p class="text-body-sm text-text-muted font-medium mb-2">
            {{ t(`science.defenses.upcoming.${id}.dissertation`) }}
          </p>
          <span class="inline-block text-[11px] font-semibold tracking-wider uppercase text-gold mb-1">
            {{ t(`science.defenses.upcoming.${id}.specialty`) }}
          </span>
          <p class="text-body-sm text-text-muted mt-auto">
            {{ t(`science.defenses.upcoming.${id}.board`) }}
          </p>
        </article>
      </div>

      <!-- Past defenses: bg-off-white, table-style list -->
      <section class="bg-off-white rounded-16 border border-border p-8 lg:p-10">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('science.defenses.pastTitle') }}
        </h2>
        <div class="overflow-x-auto">
          <div class="min-w-[600px] space-y-3">
            <!-- Header row (desktop) -->
            <div
              class="hidden sm:grid gap-4 px-4 py-3 text-body-sm font-semibold text-text-muted border-b border-border"
              style="grid-template-columns: 60px 1fr 1.5fr 1fr 100px"
            >
              <span>{{ t('science.defenses.tableYear') }}</span>
              <span>{{ t('science.defenses.tableCandidate') }}</span>
              <span>{{ t('science.defenses.tableTitle') }}</span>
              <span>{{ t('science.defenses.tableSpecialty') }}</span>
              <span>{{ t('science.defenses.tableResult') }}</span>
            </div>
            <div
              v-for="id in pastIds"
              :key="id"
              class="bg-white/80 border border-border rounded-12 p-4 sm:px-4 sm:py-3 flex flex-col sm:grid sm:gap-4 sm:items-center gap-2"
              style="grid-template-columns: 60px 1fr 1.5fr 1fr 100px"
            >
              <span class="text-body-sm text-text-muted">
                {{ t(`science.defenses.past.${id}.year`) }}
              </span>
              <span class="text-body-sm font-medium text-navy">
                {{ t(`science.defenses.past.${id}.candidate`) }}
              </span>
              <span class="font-medium text-navy">
                {{ t(`science.defenses.past.${id}.title`) }}
              </span>
              <span class="text-body-sm text-text-muted">
                {{ t(`science.defenses.past.${id}.specialty`) }}
              </span>
              <span class="text-body-sm text-navy">
                {{ t(`science.defenses.past.${id}.result`) }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
