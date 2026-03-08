<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.departments'),
  meta: [{ name: 'description', content: () => t('education.departments.subtitle') }],
})

type FacultyFilter = string | null

const selectedFaculty = ref<FacultyFilter>(null)

const facultyOptions: { value: FacultyFilter; labelKey: string }[] = [
  { value: null, labelKey: 'education.departments.allFaculties' },
  { value: 'f1', labelKey: 'education.faculties.cards.f1.name' },
  { value: 'f2', labelKey: 'education.faculties.cards.f2.name' },
  { value: 'f3', labelKey: 'education.faculties.cards.f3.name' },
  { value: 'f4', labelKey: 'education.faculties.cards.f4.name' },
  { value: 'f5', labelKey: 'education.faculties.cards.f5.name' },
  { value: 'f6', labelKey: 'education.faculties.cards.f6.name' },
]

const rowIds = [
  'd1',
  'd2',
  'd3',
  'd4',
  'd5',
  'd6',
  'd7',
  'd8',
  'd9',
  'd10',
  'd11',
  'd12',
] as const

const filteredRowIds = computed(() => {
  if (!selectedFaculty.value) return rowIds
  return rowIds.filter((id) => t(`education.departments.rows.${id}.faculty`) === selectedFaculty.value)
})

function facultyNameForRow(rowId: (typeof rowIds)[number]): string {
  const facultyKey = t(`education.departments.rows.${rowId}.faculty`)
  return t(`education.faculties.cards.${facultyKey}.name`)
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.departments.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.departments.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.departments.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Faculty filter tabs -->
      <div class="flex flex-wrap gap-2 mb-10">
        <button
          v-for="opt in facultyOptions"
          :key="opt.value ?? 'all'"
          type="button"
          class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
          :class="
            selectedFaculty === opt.value
              ? 'bg-navy text-white border-navy'
              : 'bg-white text-navy border-border hover:border-navy'
          "
          @click="selectedFaculty = opt.value"
        >
          {{ t(opt.labelKey) }}
        </button>
      </div>

      <!-- Table-style list: card-rows -->
      <div class="overflow-x-auto">
        <div class="min-w-[600px] space-y-3">
          <div
            class="hidden sm:grid gap-4 px-4 py-3 text-body-sm font-semibold text-text-muted border-b border-border"
            style="grid-template-columns: 1fr 1fr 140px"
          >
            <span>{{ t('education.departments.tableDepartment') }}</span>
            <span>{{ t('education.departments.tableFaculty') }}</span>
            <span>{{ t('education.departments.tableHead') }}</span>
          </div>
          <div
            v-for="id in filteredRowIds"
            :key="id"
            class="bg-off-white border border-border rounded-12 p-4 sm:px-4 sm:py-3 flex flex-col sm:grid sm:gap-4 sm:items-center gap-2"
            style="grid-template-columns: 1fr 1fr 140px"
          >
            <span class="font-medium text-navy">
              {{ t(`education.departments.rows.${id}.name`) }}
            </span>
            <span class="text-body-sm text-text-muted">
              {{ facultyNameForRow(id) }}
            </span>
            <span class="text-body-sm text-text-muted">
              {{ t(`education.departments.rows.${id}.head`) }}
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
