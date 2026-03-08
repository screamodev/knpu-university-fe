<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.faculties'),
  meta: [{ name: 'description', content: () => t('education.faculties.subtitle') }],
})

const facultyCardIds = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.faculties.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.faculties.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.faculties.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Intro -->
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('education.faculties.intro') }}
      </p>

      <!-- Faculty cards grid (2x3 / 3x3) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="id in facultyCardIds"
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
            <h2 class="font-playfair text-lg font-semibold text-navy mb-2">
              {{ t(`education.faculties.cards.${id}.name`) }}
            </h2>
            <p class="text-body-sm text-text-muted mb-2">
              {{ t('education.faculties.dean') }}: {{ t(`education.faculties.cards.${id}.dean`) }}
            </p>
            <p class="text-body-sm text-text-muted mb-3">
              {{ t(`education.faculties.cards.${id}.departments`) }} {{ t('education.faculties.departmentsCount') }},
              {{ t(`education.faculties.cards.${id}.students`) }} {{ t('education.faculties.studentsCount') }}
            </p>
            <p class="text-body-sm text-text-muted line-clamp-2">
              {{ t(`education.faculties.cards.${id}.description`) }}
            </p>
          </div>
        </article>
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
