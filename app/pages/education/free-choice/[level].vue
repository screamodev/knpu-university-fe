<script setup lang="ts">
/**
 * Дисципліни вільного вибору одного рівня вищої освіти.
 *
 * The «Здобувачу» tab of the quality centre carries three buttons, one per рівень; each opens
 * this page. Most of the content is the centre's own, sliced out of the migrated smc page —
 * перелік дисциплін, розклад занять and онлайн-анкетування.
 *
 * Two kinds of block live here. A `content` block shows a stretch of that migrated page; a
 * `documents` block is a section of the `documents` collection, so the centre can publish
 * силабуси (and, for магістратури, розклад) from the admin panel — there is nothing to migrate
 * for those, the old site never had them.
 */
import type { DocumentSection } from '~/utils/documentSections'

definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()
const route = useRoute()

interface ContentBlock {
  titleKey: string
  kind: 'content'
  from: string
  to?: string
  /** Розділи, які клієнт просив згорнути, щоб сторінка читалася зверху вниз. */
  collapsed?: boolean
}

interface DocumentsBlock {
  titleKey: string
  kind: 'documents'
  section: DocumentSection
  collapsed: true
}

type Block = ContentBlock | DocumentsBlock

const LEVELS: Record<string, Block[]> = {
  bachelor: [
    {
      titleKey: 'listTitle',
      kind: 'content',
      from: 'Перелік дисциплін вільного вибору здобувачів  першого (бакалаврського)',
      to: 'Перелік дисциплін вільного вибору здобувачів  другого',
    },
    {
      titleKey: 'syllabiTitle',
      kind: 'documents',
      section: 'free-choice-bachelor-syllabi',
      collapsed: true,
    },
    {
      // Зі старого сайту тут лишалися самі заголовки без жодного файла — клієнт просив їх
      // прибрати, тож розклад теж наповнюється з адмінки.
      titleKey: 'scheduleTitle',
      kind: 'documents',
      section: 'free-choice-bachelor-schedule',
      collapsed: true,
    },
    {
      titleKey: 'surveyTitle',
      kind: 'content',
      from: 'Онлайн анкетування дисциплін вільного вибору здобувачів першого (бакалаврського)',
      to: 'Онлайн анкетування дисциплін вільного вибору здобувачів другого',
      collapsed: true,
    },
  ],
  master: [
    {
      titleKey: 'listTitle',
      kind: 'content',
      from: 'Перелік дисциплін вільного вибору здобувачів  другого (магістерського)',
      to: 'Розклад занять дисциплін вільного вибору',
    },
    {
      titleKey: 'syllabiTitle',
      kind: 'documents',
      section: 'free-choice-master-syllabi',
      collapsed: true,
    },
    {
      titleKey: 'scheduleTitle',
      kind: 'documents',
      section: 'free-choice-master-schedule',
      collapsed: true,
    },
    {
      titleKey: 'surveyTitle',
      kind: 'content',
      from: 'Онлайн анкетування дисциплін вільного вибору здобувачів другого (магістерського)',
      to: 'Перелік дисциплін вільного вибору здобувачів першого року навчання',
      collapsed: true,
    },
  ],
  phd: [
    {
      titleKey: 'listTitle',
      kind: 'content',
      from: 'Перелік дисциплін вільного вибору здобувачів першого року навчання',
      to: 'Онлайн анкетування дисциплін вільного вибору здобувачів третього',
    },
    {
      titleKey: 'surveyTitle',
      kind: 'content',
      from: 'Онлайн анкетування дисциплін вільного вибору здобувачів третього (освітньо-наукового)',
      to: 'Розклад занять дисциплін вільного вибору здобувачів третього',
    },
    {
      titleKey: 'scheduleTitle',
      kind: 'content',
      from: 'Розклад занять дисциплін вільного вибору здобувачів третього (освітньо-наукового)',
      to: 'Перелік дисциплін вільного вибору здобувачів першого (бакалаврського) рівня вищої осві',
    },
  ],
}

const level = computed(() => {
  const raw = String(route.params.level ?? '')
  return raw in LEVELS ? raw : 'bachelor'
})

const blocks = computed(() => LEVELS[level.value] ?? [])

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

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-6">
      <template v-for="block in blocks" :key="block.titleKey">
        <SharedAccordion
          v-if="block.collapsed"
          :title="t(`education.freeChoice.${block.titleKey}`)"
        >
          <div class="pt-4">
            <SharedDocumentList v-if="block.kind === 'documents'" :section="block.section" />
            <SharedStaticPageBody
              v-else
              slug="quality-centre-students"
              :from="block.from"
              :to="block.to"
              hide-headings
            />
          </div>
        </SharedAccordion>

        <section v-else class="mt-6 first:mt-0">
          <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
            {{ t(`education.freeChoice.${block.titleKey}`) }}
          </h2>
          <SharedDocumentList v-if="block.kind === 'documents'" :section="block.section" />
          <SharedStaticPageBody
            v-else
            slug="quality-centre-students"
            :from="block.from"
            :to="block.to"
            hide-headings
          />
        </section>
      </template>

      <div class="mt-6">
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
