<script setup lang="ts">
import { findStructureUnit } from '~/utils/structure'

/**
 * Renders one institute / faculty page from the shared structure data.
 * Each unit gets its own thin page file under app/pages/university/structure/,
 * so routes stay static and independently linkable.
 */
const props = defineProps<{ slug: string }>()

const { t, localePath } = useSafeI18nWithRouter()
const { localized } = useLocalizedField()

const unit = computed(() => findStructureUnit(props.slug))

const unitName = computed(() => (unit.value ? localized(unit.value, 'name') : ''))
const unitSummary = computed(() => (unit.value ? localized(unit.value, 'summary') : ''))
const tag = computed(() =>
  unit.value?.kind === 'institute'
    ? t('university.structure.tagInstitute')
    : t('university.structure.tagFaculty'),
)

useHead({
  title: () => unitName.value,
  meta: [{ name: 'description', content: () => unitSummary.value || unitName.value }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ tag }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ unitName }}
        </h1>
        <p v-if="unitSummary" class="mt-4 text-white/70 max-w-3xl">
          {{ unitSummary }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Breadcrumb back to the structure hub -->
      <NuxtLink
        :to="localePath('/university/structure')"
        class="inline-flex items-center gap-2 text-body-sm text-primary font-medium hover:underline"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
          <path d="M19 12H5m7-7l-7 7 7 7" />
        </svg>
        {{ t('university.structure.backToStructure') }}
      </NuxtLink>

      <!-- Departments, centres, museums and laboratories -->
      <h2 class="font-playfair text-xl font-bold text-navy mt-10 mb-2">
        {{ t('university.structure.subdivisionsTitle') }}
      </h2>
      <p class="text-body-sm text-text-muted mb-6 max-w-3xl">
        {{ t('university.structure.subdivisionsNote') }}
      </p>
      <SharedStructureItemList v-if="unit" :items="unit.items" />

      <!-- «Skovoroda associations» attached to this unit -->
      <template v-if="unit?.associations?.length">
        <h2 class="font-playfair text-xl font-bold text-navy mt-12 mb-2">
          {{ t('university.structure.associationsTitle') }}
        </h2>
        <p class="text-body-sm text-text-muted mb-6 max-w-3xl">
          {{ t('university.structure.associationsNote') }}
        </p>
        <SharedStructureItemList :items="unit.associations" />
      </template>

      <!-- Cross-links -->
      <div class="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 sm:gap-8">
        <NuxtLink
          :to="localePath('/university/structure')"
          class="inline-flex items-center gap-2 text-primary font-medium hover:underline"
        >
          {{ t('university.structure.allUnits') }}
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </NuxtLink>
        <NuxtLink
          :to="localePath('/university/rectorate')"
          class="inline-flex items-center gap-2 text-primary font-medium hover:underline"
        >
          {{ t('university.structure.administrationLink') }}
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
