<script setup lang="ts">
/**
 * Спортивні секції та студентські організації.
 *
 * Сторінка була шаблонною — шість вигаданих секцій із розкладом тренувань. Клієнт попросив
 * перенести сюди зміст сторінки старого сайту «Секції та студентські організації»: опис
 * спортивного клубу, види спорту й секції, документи клубу та переходи до студентських
 * організацій університету.
 */
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('student.sports.title'),
  meta: [{ name: 'description', content: () => t('student.sports.subtitle') }],
})

/** Валеологічний клуб живе тільки на старому сайті — власної сторінки тут у нього немає. */
const VALEOLOGY_CLUB_URL = 'https://old.hnpu.edu.ua/uk/studentskyy-naukovyy-valeologichnyy-klub'

const organisations = [
  // Видатні випускники клубу — чемпіони, тож сторінка живе поруч зі спортклубом.
  { path: '/student/notable-alumni', labelKey: 'student.notableAlumni.title' },
  { path: '/student/council', labelKey: 'nav.links.studentCouncil' },
  { path: '/student/arts', labelKey: 'nav.links.arts' },
  { path: '/student/union', labelKey: 'nav.links.union' },
] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.sports.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.sports.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.sports.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedStaticPageBody slug="student-sports" />

      <h2 class="font-playfair text-2xl font-bold text-navy mt-14 mb-6">
        {{ t('student.sports.documentsTitle') }}
      </h2>
      <SharedDocumentList section="sports-club" />

      <h2 class="font-playfair text-2xl font-bold text-navy mt-14 mb-6">
        {{ t('student.sports.organisationsTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <NuxtLink
          v-for="organisation in organisations"
          :key="organisation.path"
          :to="localePath(organisation.path)"
          class="rounded-16 border border-border p-6 no-underline hover:border-gold transition-colors"
        >
          <span class="block font-playfair text-lg font-semibold text-navy">
            {{ t(organisation.labelKey) }}
          </span>
        </NuxtLink>
        <a
          :href="VALEOLOGY_CLUB_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-16 border border-border p-6 no-underline hover:border-gold transition-colors"
        >
          <span class="block font-playfair text-lg font-semibold text-navy">
            {{ t('student.sports.valeologyClub') }}
            <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
          </span>
        </a>
      </div>
    </div>
  </div>
</template>
