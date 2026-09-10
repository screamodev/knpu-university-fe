<script setup lang="ts">
/**
 * Освітні програми одного рівня вищої освіти.
 *
 * The Центр забезпечення якості tab «Освітні програми» is three buttons now, one per рівень;
 * each opens this page, which shows that level's drop-downs (one per year) out of the migrated
 * smc content, plus the projects list the centre keeps for programmes under discussion.
 */
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()
const route = useRoute()

/**
 * Межі зрізу — заголовки-обгортки рівнів у перенесеній сторінці центру. Самі випадні списки
 * тепер звуться просто «2023 рік», «2024 рік», тож зачепитися можна лише за обгортку; її власний
 * заголовок ховає `hide-headings`, а тіла в неї немає.
 */
const LEVELS = {
  bachelor: {
    from: 'Освітні програми підготовки здобувачів першого (бакалаврського)',
    to: 'Освітні програми підготовки здобувачів другого',
  },
  master: {
    from: 'Освітні програми підготовки здобувачів другого',
    to: 'Освітні програми підготовки здобувачів третього',
  },
  phd: {
    from: 'Освітні програми підготовки здобувачів третього',
    to: 'Проєкти освітніх програм',
  },
} as const

type Level = keyof typeof LEVELS

const level = computed<Level>(() => {
  const raw = String(route.params.level ?? '')
  return (raw in LEVELS ? raw : 'bachelor') as Level
})

const slice = computed(() => LEVELS[level.value])

useHead({
  title: () => t(`education.studyProgrammes.${level.value}Title`),
  meta: [{ name: 'description', content: () => t('education.studyProgrammes.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.studyProgrammes.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t(`education.studyProgrammes.${level}Title`) }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.studyProgrammes.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedStaticPageBody
        slug="quality-centre-programmes"
        :from="slice.from"
        :to="slice.to"
        hide-headings
      />

      <!-- Проєкти програм: the centre publishes them when a programme goes up for discussion -->
      <SharedAccordion class="mt-3" :title="t('education.studyProgrammes.draftsTitle')">
        <p class="pt-4 text-body-sm text-text-muted">
          {{ t('education.studyProgrammes.draftsEmpty') }}
        </p>
      </SharedAccordion>

      <NuxtLink
        :to="localePath('/education/programs')"
        class="mt-10 inline-flex items-center gap-2 text-navy font-medium hover:underline"
      >
        {{ t('education.studyProgrammes.backLink') }}
      </NuxtLink>
    </div>
  </div>
</template>
