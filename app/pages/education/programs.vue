<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.programs'),
  meta: [{ name: 'description', content: () => t('education.programs.subtitle') }],
})

type LevelFilter = 'bachelor' | 'master' | 'graduate' | null

const selectedLevel = ref<LevelFilter>(null)

const levelOptions: { value: LevelFilter; labelKey: string }[] = [
  { value: null, labelKey: 'education.programs.allLevels' },
  { value: 'bachelor', labelKey: 'education.programs.levelBachelor' },
  { value: 'master', labelKey: 'education.programs.levelMaster' },
  { value: 'graduate', labelKey: 'education.programs.levelGraduate' },
]

const programCardIds = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9'] as const

const filteredProgramIds = computed(() => {
  if (!selectedLevel.value) return programCardIds
  return programCardIds.filter(
    (id) => t(`education.programs.cards.${id}.level`) === selectedLevel.value
  )
})

function levelLabelKey(level: string): string {
  const key: Record<string, string> = {
    bachelor: 'education.programs.levelBachelor',
    master: 'education.programs.levelMaster',
    graduate: 'education.programs.levelGraduate',
  }
  return key[level] ?? level
}

function programSlug(id: string): string {
  const slugs: Record<string, string> = {
    p1: 'primary-education',
    p2: 'preschool-education',
    p3: 'secondary-education-ukrainian',
    p4: 'psychology',
    p5: 'computer-science',
    p6: 'educational-institution-management',
    p7: 'higher-education-pedagogy',
    p8: 'special-needs-education',
    p9: 'educational-sciences',
  }
  return slugs[id] ?? id
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
      <!-- Level filter tabs -->
      <div class="flex flex-wrap gap-2 mb-10">
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

      <!-- Programme cards grid -->
      <div v-if="filteredProgramIds.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="id in filteredProgramIds"
          :key="id"
          :to="localePath(`/programs/${programSlug(id)}`)"
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
              {{ t(levelLabelKey(t(`education.programs.cards.${id}.level`))) }}
            </span>
            <h2 class="font-playfair text-lg font-semibold text-navy mb-1 group-hover:text-navy">
              {{ t(`education.programs.cards.${id}.name`) }}
            </h2>
            <p class="text-body-sm text-text-muted">
              {{ t('education.programs.codeLabel') }}: {{ t(`education.programs.cards.${id}.code`) }}
            </p>
          </div>
        </NuxtLink>
      </div>
      <p v-else class="text-body text-text-muted py-8 text-center">
        {{ t('education.programs.noPrograms') }}
      </p>
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
