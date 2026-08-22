<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusProgramme, ProgrammeLevel } from '~/types/directus'

/**
 * Освітні програми.
 *
 * The list is whatever the university publishes in Directus. It used to be nine hardcoded cards
 * with plausible names and codes that nobody had checked; those are gone — an empty collection
 * now reads as empty rather than as a catalogue.
 */
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()
const { client } = useDirectus()
const { localized } = useLocalizedField()

useHead({
  title: () => t('nav.links.programs'),
  meta: [{ name: 'description', content: () => t('education.programs.subtitle') }],
})

type LevelFilter = ProgrammeLevel | null

const selectedLevel = ref<LevelFilter>(null)

const levelOptions: { value: LevelFilter; labelKey: string }[] = [
  { value: null, labelKey: 'education.programs.allLevels' },
  { value: 'bachelor', labelKey: 'education.programs.levelBachelor' },
  { value: 'master', labelKey: 'education.programs.levelMaster' },
  { value: 'graduate', labelKey: 'education.programs.levelGraduate' },
]

const { data } = await useAsyncData('education-programmes', () =>
  client.request(
    readItems('programmes', {
      fields: ['id', 'slug', 'title', 'titleEn', 'level', 'faculty', 'facultyEn'],
      sort: ['title'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }),
  ),
)

const programmes = computed<DirectusProgramme[]>(() => (data.value as DirectusProgramme[] | null) ?? [])

const filteredProgrammes = computed(() =>
  selectedLevel.value
    ? programmes.value.filter(programme => programme.level === selectedLevel.value)
    : programmes.value,
)

function levelLabelKey(level: string): string {
  const key: Record<string, string> = {
    bachelor: 'education.programs.levelBachelor',
    master: 'education.programs.levelMaster',
    graduate: 'education.programs.levelGraduate',
  }
  return key[level] ?? level
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.programs.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.programs.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.programs.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!--
        Нормативна база освітніх програм. Та сама добірка, що й у центрі забезпечення якості
        освіти: клієнт просив, щоб вона відкривалася й тут, на початку сторінки, а не лише на
        вкладці центру.
      -->
      <section class="mb-14">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
          {{ t('education.programs.documentsTitle') }}
        </h2>
        <SharedDocumentList section="quality-centre-programmes" />
      </section>

      <!-- Level filter: pointless while the collection is empty. -->
      <div v-if="programmes.length" class="flex flex-wrap gap-2 mb-10">
        <button
          v-for="opt in levelOptions"
          :key="opt.value ?? 'all'"
          type="button"
          class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
          :class="
            selectedLevel === opt.value
              ? 'bg-navy text-white border-navy'
              : 'bg-white text-navy border-border hover:border-navy'
          "
          @click="selectedLevel = opt.value"
        >
          {{ t(opt.labelKey) }}
        </button>
      </div>

      <div v-if="filteredProgrammes.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="programme in filteredProgrammes"
          :key="programme.id"
          :to="localePath(`/programs/${programme.slug}`)"
          class="group bg-white border border-border rounded-14 overflow-hidden no-underline transition-all duration-280 hover:border-gold/40 hover:shadow-gold"
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
            <span
              class="inline-block text-[11px] font-semibold uppercase tracking-wider text-gold mb-2"
            >
              {{ t(levelLabelKey(programme.level)) }}
            </span>
            <h2 class="font-playfair text-lg font-semibold text-navy mb-1 group-hover:text-navy">
              {{ localized(programme, 'title') }}
            </h2>
            <p v-if="localized(programme, 'faculty')" class="text-body-sm text-text-muted">
              {{ localized(programme, 'faculty') }}
            </p>
          </div>
        </NuxtLink>
      </div>

      <SharedSectionPending v-else />
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
