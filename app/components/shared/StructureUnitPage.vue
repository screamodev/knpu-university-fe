<script setup lang="ts">
import { findStructureUnit } from '~/utils/structure'
import {
  STRUCTURE_DOCUMENT_TABS,
  structureTabLabelOverride,
  structureUnitManifest,
  structureUnitTabs,
  type StructureTabId,
} from '~/utils/structureContent'
import { isDocumentSection } from '~/utils/documentSections'

/**
 * One institute / faculty page, with in-page tabs.
 *
 * `/university/structure/<slug>` renders the Головна tab from its own thin page file; the other
 * tabs come through `[unit]/[tab].vue`. Content is static (see `~/utils/structureContent`),
 * except Структура, which is derived from `structure.ts`, and Новини, which queries Directus.
 *
 * Головна follows the client collage: intro + contacts, then full-width materials, departments,
 * news preview, and (for faculties/institutes) applicant/graduate CTAs — navy/gold brand.
 */
const props = withDefaults(defineProps<{ slug: string; tab?: StructureTabId }>(), { tab: 'home' })

const { t, localePath, locale } = useSafeI18nWithRouter()
const { localized } = useLocalizedField()

const unit = computed(() => findStructureUnit(props.slug))
const manifest = computed(() => structureUnitManifest(props.slug))
const tabs = computed(() => structureUnitTabs(props.slug))

const unitName = computed(() => (unit.value ? localized(unit.value, 'name') : ''))
const unitSummary = computed(() => (unit.value ? localized(unit.value, 'summary') : ''))
const tag = computed(() => {
  if (unit.value?.kind === 'institute') return t('university.structure.tagInstitute')
  if (unit.value?.kind === 'department') return t('university.structure.tagDepartment')
  if (unit.value?.kind === 'chair') return t('university.structure.tagChair')
  return t('university.structure.tagFaculty')
})

const tabLabel = computed(
  () => structureTabLabelOverride(props.slug, props.tab, locale.value)
    ?? t(`university.structure.unit.tabs.${props.tab}`),
)

/** Tab pages get their own title so each URL is distinct in search results. */
useHead({
  title: () => (props.tab === 'home' ? unitName.value : `${tabLabel.value} — ${unitName.value}`),
  meta: [{ name: 'description', content: () => unitSummary.value || unitName.value }],
})

const hasContentBody = computed(() => (manifest.value?.tabs ?? []).includes(props.tab))

/** A tab backed by the `documents` collection instead of by migrated prose. */
const documentSection = computed(() => {
  if (!(manifest.value?.documentTabs ?? []).includes(props.tab)) return null
  const section = STRUCTURE_DOCUMENT_TABS[props.tab]
  return section && isDocumentSection(section) ? section : null
})

/**
 * News feed for this tab. `news` is the unit's own category; other tabs (Оголошення) name theirs
 * in the manifest, since those articles are university-wide rather than unit-specific.
 */
const isChair = computed(() => unit.value?.kind === 'chair')

/**
 * Категорії новин утворюють дерево: категорія кафедри лежить під факультетською.
 * Кафедра читає свою категорію (slug сторінки) і, поки та порожня, факультетську;
 * факультет — свою разом з усіма кафедральними.
 */
const ownNewsCategory = computed(() =>
  isChair.value ? props.slug : (unit.value?.newsCategorySlug ?? props.slug))

const fallbackNewsCategory = computed(() =>
  isChair.value ? (unit.value?.newsCategorySlug ?? null) : null)

const newsCategory = computed(() => {
  if (props.tab === 'news') return ownNewsCategory.value
  if (!(manifest.value?.categoryTabs ?? []).includes(props.tab)) return null
  return manifest.value?.categorySlugs?.[props.tab] ?? ownNewsCategory.value
})

const homeNewsCategory = computed(() => ownNewsCategory.value)

const homeNewsTitle = computed(() => {
  if (unit.value?.kind === 'institute') return t('university.structure.unit.newsTitleInstitute')
  if (unit.value?.kind === 'department') return t('university.structure.unit.newsTitleUnit')
  // Кафедри have no category of their own — the feed is the faculty's, and says so.
  if (unit.value?.kind === 'chair') return t('university.structure.unit.newsTitleChair')
  return t('university.structure.unit.newsTitleFaculty')
})

const showAudienceCta = computed(
  () => props.tab === 'home' && (unit.value?.kind === 'faculty' || unit.value?.kind === 'institute'),
)
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-14 sm:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          class="flex flex-wrap items-center gap-2 text-[12px] text-white/55 mb-5"
          :aria-label="t('university.structure.unit.breadcrumbHome')"
        >
          <NuxtLink
            :to="localePath('/')"
            class="text-white/55 no-underline hover:text-gold-light transition-colors"
          >
            {{ t('university.structure.unit.breadcrumbHome') }}
          </NuxtLink>
          <span aria-hidden>/</span>
          <NuxtLink
            :to="localePath('/university/structure')"
            class="text-white/55 no-underline hover:text-gold-light transition-colors"
          >
            {{ t('university.structure.backToStructure') }}
          </NuxtLink>
          <span aria-hidden>/</span>
          <span class="text-white/80">{{ unitName }}</span>
        </nav>

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
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
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

          <!-- Новини / Оголошення: a feed out of the shared news collection -->
          <SharedStructureUnitNews
            v-else-if="newsCategory"
            :category-slug="newsCategory"
            :include-children="tab === 'news' && !isChair"
            :fallback-category-slug="tab === 'news' ? fallbackNewsCategory : null"
          />

          <!-- Нормативні документи: rows of the shared `documents` collection -->
          <SharedDocumentList v-else-if="documentSection" :section="documentSection" />

          <!-- Everything else: migrated legacy content (Головна: intro + deanery) -->
          <SharedStructureUnitTabBody
            v-else-if="hasContentBody"
            :slug="slug"
            :tab="tab"
            :show-links="tab !== 'home'"
          />

          <p v-else-if="tab !== 'home'" class="text-text-muted">
            {{ t('common.comingSoon') }}
          </p>
        </div>

        <aside
          v-if="manifest?.contacts && unit"
          class="self-start lg:sticky lg:top-[88px] flex flex-col gap-4"
        >
          <SharedStructureUnitContacts
            :contacts="manifest.contacts"
            :kind="unit.kind"
          />
          <SharedStructureUnitAnnouncements
            v-if="tab === 'home' && !manifest?.hideAnnouncements"
            :unit-category-slug="homeNewsCategory"
          />
        </aside>
      </div>

      <!-- Головна collage: full-width blocks below the intro / contacts row -->
      <template v-if="tab === 'home'">
        <SharedStructureUnitTiles :slug="slug" :tabs="tabs" />

        <SharedStructureUnitDepartments
          v-if="unit?.items?.length"
          :slug="slug"
          :items="unit.items"
        />

        <section class="py-12 border-t border-border">
          <div class="flex flex-wrap items-end justify-between gap-4 mb-6">
            <h2 class="font-playfair text-xl font-bold text-navy">
              {{ homeNewsTitle }}
            </h2>
            <NuxtLink
              :to="localePath(`/university/structure/${slug}/news`)"
              class="text-sm font-medium text-navy no-underline hover:text-gold transition-colors duration-280"
            >
              {{ t('university.structure.unit.newsViewAll') }} →
            </NuxtLink>
          </div>
          <SharedStructureUnitNews
            :category-slug="homeNewsCategory"
            :limit="3"
            :include-children="!isChair"
            :fallback-category-slug="fallbackNewsCategory"
            hide-all-link
          />
          <div class="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-8">
            <NuxtLink
              :to="localePath(`/university/structure/${slug}/news`)"
              class="inline-flex items-center gap-1.5 text-sm font-medium text-navy no-underline hover:text-gold transition-colors duration-280"
            >
              {{ t('university.structure.unit.newsAllFaculty') }}
              <span aria-hidden>›</span>
            </NuxtLink>
            <NuxtLink
              :to="localePath('/news/announcements')"
              class="inline-flex items-center gap-1.5 text-sm font-medium text-navy no-underline hover:text-gold transition-colors duration-280"
            >
              {{ t('university.structure.unit.announcementsAllFaculty') }}
              <span aria-hidden>›</span>
            </NuxtLink>
          </div>
        </section>
      </template>

      <!-- Cross-links (non-home tabs keep the compact footer links) -->
      <div
        v-if="tab !== 'home'"
        class="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 sm:gap-8"
      >
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

    <SharedStructureUnitAudienceCta v-if="showAudienceCta" />
  </div>
</template>
