<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.exams'),
  meta: [{ name: 'description', content: () => t('admissions.exams.subtitle') }],
})

const subjectIds = ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8'] as const

function levelLabel(levelKey: string): string {
  if (levelKey === 'bachelor') return t('admissions.exams.levelBachelor')
  if (levelKey === 'master') return t('admissions.exams.levelMaster')
  return t('admissions.exams.levelGraduate')
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('admissions.exams.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.exams.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('admissions.exams.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <p class="max-w-3xl text-body text-text-muted">
        {{ t('admissions.exams.intro') }}
      </p>
    </div>

    <!-- Accordion-style list: all expanded (no JS), subject name, level tag, description, Download PDF -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('admissions.exams.subjectListTitle') }}
      </h2>
      <div class="space-y-3">
        <article
          v-for="id in subjectIds"
          :key="id"
          class="bg-off-white border border-border rounded-12 overflow-hidden"
        >
          <div class="p-5 sm:p-6">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 class="font-playfair text-lg font-semibold text-navy">
                  {{ t(`admissions.exams.subjects.${id}.name`) }}
                </h3>
                <span
                  class="inline-block mt-2 px-2.5 py-0.5 rounded-100 text-xs font-medium bg-gold/15 text-gold border border-gold/30"
                >
                  {{ levelLabel(t(`admissions.exams.subjects.${id}.level`)) }}
                </span>
              </div>
              <a
                href="#"
                class="inline-flex items-center gap-1.5 text-body-sm font-medium text-navy hover:text-gold transition-colors shrink-0"
              >
                {{ t('admissions.exams.downloadPdf') }}
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
            <p class="mt-4 text-body-sm text-text-muted">
              {{ t(`admissions.exams.subjects.${id}.description`) }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
