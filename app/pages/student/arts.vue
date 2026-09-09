<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.arts'),
  meta: [{ name: 'description', content: () => t('student.arts.subtitle') }],
})

const { assetUrl } = useDirectus()

/**
 * Шість колективів із фотографіями, які надіслала пресслужба 09.09 — до того сторінка
 * показувала чотири вигадані ансамблі з градієнтними заглушками. Знімки лежать у медіатеці
 * Directus, тож замінити їх можна в адмінці.
 */
const ensembles = [
  { key: 'cossackChoir', photo: '7a5cbd7d-f081-5b04-b41a-b86e416ec05e' },
  { key: 'starlight', photo: '7cd3cc9f-79ee-529a-b496-67d9a90d3caf' },
  { key: 'studentChoir', photo: 'f6a77684-a6b9-54ab-8d87-c1b60ff6fd24' },
  { key: 'bumerang', photo: '4bd98658-a09a-558f-86df-aafba647db93' },
  { key: 'reforma', photo: 'cb6952f7-42ed-5f17-af47-b31cfcf3762a' },
  { key: 'vilnaDusha', photo: 'e34254c5-75cb-5237-b2ab-7ebf67ecaa4e' },
] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.arts.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.arts.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.arts.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('student.arts.intro') }}
      </p>
    </div>

    <!-- Ensemble cards: 2x2 grid, large gradient image, name, director, members, description -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('student.arts.ensemblesTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <article
          v-for="ensemble in ensembles"
          :key="ensemble.key"
          class="bg-white border border-border rounded-16 overflow-hidden flex flex-col transition-all duration-280 hover:border-gold/40"
        >
          <img
            :src="assetUrl(ensemble.photo, { width: 800, quality: 82 }) ?? undefined"
            :alt="t(`student.arts.ensembles.${ensemble.key}.name`)"
            class="aspect-[4/3] object-cover shrink-0"
            loading="lazy"
          >
          <div class="p-6 flex flex-col flex-1">
            <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
              {{ t(`student.arts.ensembles.${ensemble.key}.name`) }}
            </h3>
            <p v-if="t(`student.arts.ensembles.${ensemble.key}.members`)" class="text-body-sm text-text-muted">
              {{ t(`student.arts.ensembles.${ensemble.key}.members`) }}
            </p>
          </div>
        </article>
      </div>
    </div>

    <!-- Upcoming performances: the three dated events listed here were invented. -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-4">
          {{ t('student.arts.eventsTitle') }}
        </h2>
        <SharedSectionPending />
      </div>
    </div>
  </div>
</template>
