<script setup lang="ts">
/**
 * Дисципліни вільного вибору одного рівня вищої освіти.
 *
 * The «Здобувачу» tab of the quality centre now carries three buttons, one per рівень; each
 * opens this page. The content is the centre's own, sliced out of the migrated smc page — розклад
 * занять, перелік дисциплін, силабуси and онлайн-анкетування, each still a drop-down.
 */
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()
const route = useRoute()

interface Slice {
  titleKey: string
  from: string
  to?: string
}

const LEVELS: Record<string, Slice[]> = {
  bachelor: [
    {
      titleKey: 'listTitle',
      from: 'Перелік дисциплін вільного вибору здобувачів  першого (бакалаврського)',
      to: 'Перелік дисциплін вільного вибору здобувачів  другого',
    },
    {
      titleKey: 'scheduleTitle',
      from: 'Розклад занять дисциплін вільного вибору здобувачів першого (бакалаврського)',
      to: 'НА ДОПОМОГУ ПЕРШОКУРСНИКУ',
    },
    {
      titleKey: 'surveyTitle',
      from: 'Онлайн анкетування дисциплін вільного вибору здобувачів першого (бакалаврського)',
      to: 'Онлайн анкетування дисциплін вільного вибору здобувачів другого',
    },
  ],
  master: [
    {
      titleKey: 'listTitle',
      from: 'Перелік дисциплін вільного вибору здобувачів  другого (магістерського)',
      to: 'Розклад занять дисциплін вільного вибору',
    },
    {
      titleKey: 'surveyTitle',
      from: 'Онлайн анкетування дисциплін вільного вибору здобувачів другого (магістерського)',
      to: 'Перелік дисциплін вільного вибору здобувачів першого року навчання',
    },
  ],
  phd: [
    {
      titleKey: 'listTitle',
      from: 'Перелік дисциплін вільного вибору здобувачів першого року навчання',
      to: 'Онлайн анкетування дисциплін вільного вибору здобувачів третього',
    },
    {
      titleKey: 'surveyTitle',
      from: 'Онлайн анкетування дисциплін вільного вибору здобувачів третього (освітньо-наукового)',
      to: 'Розклад занять дисциплін вільного вибору здобувачів третього',
    },
    {
      titleKey: 'scheduleTitle',
      from: 'Розклад занять дисциплін вільного вибору здобувачів третього (освітньо-наукового)',
      to: 'Перелік дисциплін вільного вибору здобувачів першого (бакалаврського) рівня вищої осві',
    },
  ],
}

const level = computed(() => {
  const raw = String(route.params.level ?? '')
  return raw in LEVELS ? raw : 'bachelor'
})

const slices = computed(() => LEVELS[level.value] ?? [])

useHead({
  title: () => t(`education.freeChoice.${level.value}Title`),
  meta: [{ name: 'description', content: () => t('education.freeChoice.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.freeChoice.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t(`education.freeChoice.${level}Title`) }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.freeChoice.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-12">
      <section v-for="slice in slices" :key="slice.titleKey">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
          {{ t(`education.freeChoice.${slice.titleKey}`) }}
        </h2>
        <SharedStaticPageBody
          slug="quality-centre-students"
          :from="slice.from"
          :to="slice.to"
          hide-headings
        />
      </section>

      <div>
        <NuxtLink
          :to="localePath('/education/quality?tab=students')"
          class="inline-flex items-center gap-2 text-navy font-medium hover:underline"
        >
          {{ t('education.freeChoice.backLink') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
