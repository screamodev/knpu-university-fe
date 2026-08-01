<script setup lang="ts">
import { listStructureDepartments, STRUCTURE_UNITS } from '~/utils/structure'
import type { StructureUnit } from '~/utils/structure'

definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()
const { localized } = useLocalizedField()

useHead({
  title: () => t('nav.links.departments'),
  meta: [{ name: 'description', content: () => t('education.departments.subtitle') }],
})

/** Filter by institute / faculty; `null` shows every department. */
const selectedUnit = ref<string | null>(null)

const unitOptions = computed(() => STRUCTURE_UNITS)

const departments = computed(() => {
  const all = listStructureDepartments()
  if (!selectedUnit.value) return all
  return all.filter((entry) => entry.unit.name === selectedUnit.value)
})

/** Departments of a unit we link out to live on that unit's own site. */
function unitHref(unit: StructureUnit): string | undefined {
  return unit.slug ? localePath(`/university/structure/${unit.slug}`) : undefined
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
      <p class="text-body-sm text-text-muted mb-8">
        {{ t('university.structure.asOf') }}
      </p>

      <!-- Unit filter -->
      <div class="flex flex-wrap gap-2 mb-10">
        <button
          type="button"
          class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
          :class="
            selectedUnit === null
              ? 'bg-navy text-white border-navy'
              : 'bg-white text-navy border-border hover:border-navy'
          "
          @click="selectedUnit = null"
        >
          {{ t('education.departments.allFaculties') }}
        </button>
        <button
          v-for="unit in unitOptions"
          :key="unit.name"
          type="button"
          class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280 text-left"
          :class="
            selectedUnit === unit.name
              ? 'bg-navy text-white border-navy'
              : 'bg-white text-navy border-border hover:border-navy'
          "
          @click="selectedUnit = unit.name"
        >
          {{ localized(unit, 'name') }}
        </button>
      </div>

      <!-- Department rows -->
      <div class="overflow-x-auto">
        <div class="min-w-[600px] space-y-3">
          <div
            class="hidden sm:grid gap-4 px-4 py-3 text-body-sm font-semibold text-text-muted border-b border-border"
            style="grid-template-columns: 1.4fr 1fr"
          >
            <span>{{ t('education.departments.tableDepartment') }}</span>
            <span>{{ t('education.departments.tableFaculty') }}</span>
          </div>
          <div
            v-for="entry in departments"
            :key="`${entry.unit.name}-${entry.department.name}`"
            class="bg-off-white border border-border rounded-12 p-4 sm:px-4 sm:py-3 flex flex-col sm:grid sm:gap-4 sm:items-center gap-2"
            style="grid-template-columns: 1.4fr 1fr"
          >
            <a
              v-if="entry.department.external"
              :href="entry.department.external"
              target="_blank"
              rel="noopener noreferrer"
              class="font-medium text-navy hover:text-navy hover:underline inline-flex items-start gap-1.5"
            >
              {{ localized(entry.department, 'name') }}
              <svg class="w-3.5 h-3.5 mt-1 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
                <path d="M7 17L17 7M17 7H8m9 0v9" />
              </svg>
            </a>
            <span v-else class="font-medium text-navy">
              {{ localized(entry.department, 'name') }}
            </span>

            <NuxtLink
              v-if="unitHref(entry.unit)"
              :to="unitHref(entry.unit)"
              class="text-body-sm text-text-muted hover:text-navy hover:underline"
            >
              {{ localized(entry.unit, 'name') }}
            </NuxtLink>
            <span v-else class="text-body-sm text-text-muted">
              {{ localized(entry.unit, 'name') }}
            </span>
          </div>
        </div>
        <p v-if="departments.length === 0" class="text-body text-text-muted py-8 text-center">
          {{ t('programs.noPrograms') }}
        </p>
      </div>
    </div>
  </div>
</template>
