<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.specialties'),
  meta: [{ name: 'description', content: () => t('admissions.specialties.subtitle') }],
})

type LevelFilter = 'bachelor' | 'master' | 'graduate' | null

const selectedLevel = ref<LevelFilter>(null)

const levelOptions: { value: LevelFilter; labelKey: string }[] = [
  { value: null, labelKey: 'admissions.specialties.allLevels' },
  { value: 'bachelor', labelKey: 'admissions.specialties.levelBachelor' },
  { value: 'master', labelKey: 'admissions.specialties.levelMaster' },
  { value: 'graduate', labelKey: 'admissions.specialties.levelGraduate' },
]

const rowIds = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10'] as const

const filteredRowIds = computed(() => {
  if (!selectedLevel.value) return rowIds
  return rowIds.filter((id) => t(`admissions.specialties.rows.${id}.level`) === selectedLevel.value)
})

function formLabel(formKey: string): string {
  return formKey === 'fullTime' ? t('admissions.specialties.formFullTime') : t('admissions.specialties.formPartTime')
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('admissions.specialties.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.specialties.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('admissions.specialties.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Level filter tabs (pill pattern) -->
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

      <!-- Table-style list: card-rows -->
      <div class="overflow-x-auto">
        <div class="min-w-[600px] space-y-3">
          <!-- Header row (desktop) -->
          <div
            class="hidden sm:grid gap-4 px-4 py-3 text-body-sm font-semibold text-text-muted border-b border-border"
            style="grid-template-columns: 70px 1fr 1fr 70px 80px"
          >
            <span>{{ t('admissions.specialties.tableCode') }}</span>
            <span>{{ t('admissions.specialties.tableName') }}</span>
            <span>{{ t('admissions.specialties.tableFaculty') }}</span>
            <span>{{ t('admissions.specialties.tablePlaces') }}</span>
            <span>{{ t('admissions.specialties.tableForm') }}</span>
          </div>
          <div
            v-for="id in filteredRowIds"
            :key="id"
            class="bg-off-white border border-border rounded-12 p-4 sm:px-4 sm:py-3 flex flex-col sm:grid sm:gap-4 sm:items-center gap-2"
            style="grid-template-columns: 70px 1fr 1fr 70px 80px"
          >
            <span class="text-body-sm font-medium text-navy">
              {{ t(`admissions.specialties.rows.${id}.code`) }}
            </span>
            <span class="font-medium text-navy">
              {{ t(`admissions.specialties.rows.${id}.name`) }}
            </span>
            <span class="text-body-sm text-text-muted">
              {{ t(`admissions.specialties.rows.${id}.faculty`) }}
            </span>
            <span class="text-body-sm text-text-muted">
              {{ t(`admissions.specialties.rows.${id}.places`) }}
            </span>
            <span class="text-body-sm text-text-muted">
              {{ formLabel(t(`admissions.specialties.rows.${id}.form`)) }}
            </span>
          </div>
        </div>
        <p v-if="filteredRowIds.length === 0" class="text-body text-text-muted py-8 text-center">
          {{ t('programs.noPrograms') }}
        </p>
      </div>
    </div>
  </div>
</template>
