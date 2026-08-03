<script setup lang="ts">
/**
 * Студентський парламент.
 *
 * The client asked for the section structure knmu.edu.ua uses for its student self-government,
 * left empty: nothing is carried over from the old site, only the news feed has to work from day
 * one. Every prose block therefore renders a "being filled in" note until the parliament supplies
 * copy; news and documents are already live from Directus, so they can publish without a deploy.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('student.council.title'),
  meta: [{ name: 'description', content: () => t('student.council.subtitle') }],
})

/** Prose sections that are intentionally empty for now, in the order the client listed them. */
const emptySections = [
  'aboutTitle',
  'missionTitle',
  'objectivesTitle',
] as const

const leadershipBlocks = ['chairTitle', 'deputiesTitle', 'facultyChairsTitle'] as const
const contactRows = ['contactsAddress', 'contactsEmail', 'contactsTrustBox', 'contactsSocials'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.council.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.council.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.council.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Про парламент / Місія / Завдання -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <section v-for="key in emptySections" :key="key">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-3">
          {{ t(`student.council.${key}`) }}
        </h2>
        <p class="text-body text-text-muted max-w-3xl">
          {{ t('student.council.sectionEmpty') }}
        </p>
      </section>
    </div>

    <!-- Контакти -->
    <div class="bg-off-white border-t border-border py-12">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
          {{ t('student.council.contactsTitle') }}
        </h2>
        <dl class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="row in contactRows" :key="row">
            <dt class="text-[11px] font-semibold tracking-wider uppercase text-text-muted mb-1.5">
              {{ t(`student.council.${row}`) }}
            </dt>
            <dd class="text-body-sm text-text-muted">
              {{ t('student.council.sectionEmpty') }}
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Керівництво -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('student.council.leadershipTitle') }}
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          v-for="key in leadershipBlocks"
          :key="key"
          class="bg-white border border-border rounded-16 p-6"
        >
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`student.council.${key}`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t('student.council.sectionEmpty') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Сектори / Ревізійна комісія -->
    <div class="bg-off-white border-y border-border py-12">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section>
          <h2 class="font-playfair text-2xl font-bold text-navy mb-3">
            {{ t('student.council.sectorsTitle') }}
          </h2>
          <p class="text-body text-text-muted">{{ t('student.council.sectionEmpty') }}</p>
        </section>
        <section>
          <h2 class="font-playfair text-2xl font-bold text-navy mb-3">
            {{ t('student.council.auditTitle') }}
          </h2>
          <p class="text-body text-text-muted">{{ t('student.council.sectionEmpty') }}</p>
        </section>
      </div>
    </div>

    <!-- Новини: live from the «Студентський парламент» category -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('student.council.newsTitle') }}
      </h2>
      <SharedStructureUnitNews category-slug="studentskyi-parlament" :limit="6" />
    </div>

    <!-- Документи: editors add rows in Directus, section `student-council` -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('student.council.documentsTitle') }}
      </h2>
      <SharedDocumentList section="student-council" />
    </div>
  </div>
</template>
