<script setup lang="ts">
import { findStructureUnit } from '~/utils/structure'
import { structureUnitManifest, structureUnitTabs, type StructureTabId } from '~/utils/structureContent'

/**
 * One institute / faculty page, with in-page tabs.
 *
 * `/university/structure/<slug>` renders the Головна tab from its own thin page file; the other
 * tabs come through `[unit]/[tab].vue`. Content is static (see `~/utils/structureContent`),
 * except Структура, which is derived from `structure.ts`, and Новини, which queries Directus.
 */
const props = withDefaults(defineProps<{ slug: string; tab?: StructureTabId }>(), { tab: 'home' })

const { t, localePath } = useSafeI18nWithRouter()
const { localized } = useLocalizedField()

const unit = computed(() => findStructureUnit(props.slug))
const manifest = computed(() => structureUnitManifest(props.slug))
const tabs = computed(() => structureUnitTabs(props.slug))

const unitName = computed(() => (unit.value ? localized(unit.value, 'name') : ''))
const unitSummary = computed(() => (unit.value ? localized(unit.value, 'summary') : ''))
const tag = computed(() =>
  unit.value?.kind === 'institute'
    ? t('university.structure.tagInstitute')
    : t('university.structure.tagFaculty'),
)

const tabLabel = computed(() => t(`university.structure.unit.tabs.${props.tab}`))

/** Tab pages get their own title so each URL is distinct in search results. */
useHead({
  title: () => (props.tab === 'home' ? unitName.value : `${tabLabel.value} — ${unitName.value}`),
  meta: [{ name: 'description', content: () => unitSummary.value || unitName.value }],
})

const hasContentBody = computed(() => (manifest.value?.tabs ?? []).includes(props.tab))
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

    <SharedStructureUnitTabs :slug="slug" :tabs="tabs" :active="tab" />

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Breadcrumb back to the structure hub -->
      <NuxtLink
        :to="localePath('/university/structure')"
        class="inline-flex items-center gap-2 text-body-sm text-navy font-medium hover:text-gold transition-colors duration-280"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
          <path d="M19 12H5m7-7l-7 7 7 7" />
        </svg>
        {{ t('university.structure.backToStructure') }}
      </NuxtLink>

      <div class="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <div class="min-w-0">
          <!-- Структура: derived from the official chart, never from migrated content -->
          <template v-if="tab === 'structure'">
            <h2 class="font-playfair text-xl font-bold text-navy mb-2">
              {{ t('university.structure.subdivisionsTitle') }}
            </h2>
            <p class="text-body-sm text-text-muted mb-6 max-w-3xl">
              {{ t('university.structure.subdivisionsNote') }}
            </p>
            <SharedStructureItemList v-if="unit" :items="unit.items" />

            <template v-if="unit?.associations?.length">
              <h2 class="font-playfair text-xl font-bold text-navy mt-12 mb-2">
                {{ t('university.structure.associationsTitle') }}
              </h2>
              <p class="text-body-sm text-text-muted mb-6 max-w-3xl">
                {{ t('university.structure.associationsNote') }}
              </p>
              <SharedStructureItemList :items="unit.associations" />
            </template>
          </template>

          <!-- Новини: the unit's own feed out of the shared news collection -->
          <SharedStructureUnitNews
            v-else-if="tab === 'news' && unit"
            :category-slug="unit.newsCategorySlug ?? slug"
          />

          <!-- Everything else: migrated legacy content -->
          <SharedStructureUnitTabBody v-else-if="hasContentBody" :slug="slug" :tab="tab" />

          <p v-else class="text-text-muted">
            {{ t('common.comingSoon') }}
          </p>
        </div>

        <SharedStructureUnitContacts
          v-if="manifest?.contacts && unit"
          :contacts="manifest.contacts"
          :kind="unit.kind"
        />
      </div>

      <!-- Cross-links -->
      <div class="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 sm:gap-8">
        <NuxtLink
          :to="localePath('/university/structure')"
          class="inline-flex items-center gap-2 text-navy font-medium hover:text-gold transition-colors duration-280"
        >
          {{ t('university.structure.allUnits') }}
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </NuxtLink>
        <NuxtLink
          :to="localePath('/university/rectorate')"
          class="inline-flex items-center gap-2 text-navy font-medium hover:text-gold transition-colors duration-280"
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
