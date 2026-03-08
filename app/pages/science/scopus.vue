<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.scopus'),
  meta: [{ name: 'description', content: () => t('science.scopus.subtitle') }],
})

const statIds = ['scopus', 'wos', 'hIndex'] as const
const publicationIds = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const

const publicationBadges: Record<(typeof publicationIds)[number], { scopus: boolean; wos: boolean }> = {
  p1: { scopus: true, wos: false },
  p2: { scopus: true, wos: true },
  p3: { scopus: true, wos: false },
  p4: { scopus: true, wos: true },
  p5: { scopus: false, wos: true },
  p6: { scopus: true, wos: false },
  p7: { scopus: true, wos: true },
  p8: { scopus: true, wos: false },
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('science.scopus.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.scopus.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.scopus.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('science.scopus.intro') }}
      </p>

      <!-- Stats band: 3 gold numbers -->
      <div class="bg-navy py-16 rounded-16 mb-14">
        <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div v-for="id in statIds" :key="id" class="flex flex-col items-center">
            <div class="font-playfair text-4xl md:text-5xl font-bold text-gold leading-none mb-2">
              {{ t(`science.scopus.stats.${id}.num`) }}
            </div>
            <div class="text-[15px] text-white/60">
              {{ t(`science.scopus.stats.${id}.label`) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Table-style publications list -->
      <div class="overflow-x-auto">
        <div class="min-w-[600px] space-y-3">
          <!-- Header row (desktop) -->
          <div
            class="hidden sm:grid gap-4 px-4 py-3 text-body-sm font-semibold text-text-muted border-b border-border"
            style="grid-template-columns: 1fr 1.5fr 1fr 60px 100px"
          >
            <span>{{ t('science.scopus.tableAuthor') }}</span>
            <span>{{ t('science.scopus.tableTitle') }}</span>
            <span>{{ t('science.scopus.tableJournal') }}</span>
            <span>{{ t('science.scopus.tableYear') }}</span>
            <span>{{ t('science.scopus.tableDatabase') }}</span>
          </div>
          <div
            v-for="id in publicationIds"
            :key="id"
            class="bg-off-white border border-border rounded-12 p-4 sm:px-4 sm:py-3 flex flex-col sm:grid sm:gap-4 sm:items-center gap-2"
            style="grid-template-columns: 1fr 1.5fr 1fr 60px 100px"
          >
            <span class="text-body-sm text-navy">
              {{ t(`science.scopus.publications.${id}.authors`) }}
            </span>
            <span class="font-medium text-navy">
              {{ t(`science.scopus.publications.${id}.title`) }}
            </span>
            <span class="text-body-sm text-text-muted">
              {{ t(`science.scopus.publications.${id}.journal`) }}
            </span>
            <span class="text-body-sm text-text-muted">
              {{ t(`science.scopus.publications.${id}.year`) }}
            </span>
            <span class="flex flex-wrap gap-1.5 justify-end">
              <span
                v-if="publicationBadges[id].scopus"
                class="inline-block px-2.5 py-0.5 rounded-100 text-xs font-medium bg-gold/15 text-gold border border-gold/30"
              >
                Scopus
              </span>
              <span
                v-if="publicationBadges[id].wos"
                class="inline-block px-2.5 py-0.5 rounded-100 text-xs font-medium bg-gold/15 text-gold border border-gold/30"
              >
                WOS
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
