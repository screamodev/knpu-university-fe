<script setup lang="ts">
import type { LinkTile, LinkTileIcon } from '~/components/shared/LinkTileGrid.vue'
import {
  loadStructureTabContent,
  structureTabLabelOverride,
  type StructureNavItem,
  type StructureTabId,
} from '~/utils/structureContent'

/**
 * «Розділи факультету» block on a unit's Головна tab — the layout the client pointed at on
 * knmu.edu.ua.
 *
 * Two sources, both existing data: the unit's other tabs, and the outbound links the migration
 * stored in its Головна content (`links` in `app/content/structure/<unit>/home.<locale>.json`).
 * The tab body hides its own link list on this tab so the links appear once, as tiles.
 */
const props = defineProps<{ slug: string; nav: StructureNavItem[] }>()

const { t, locale } = useSafeI18nWithRouter()

const TAB_ICONS: Record<StructureTabId, LinkTileIcon> = {
  home: 'link',
  admission: 'students',
  structure: 'council',
  history: 'book',
  education: 'award',
  science: 'document',
  students: 'students',
  news: 'globe',
  cooperation: 'shield',
  staff: 'students',
  trust: 'shield',
  // Tabs of the відділ аспірантури і докторантури, which is not a faculty.
  doctoral: 'award',
  regulations: 'document',
  announcements: 'globe',
}

const { data } = await useAsyncData(
  () => `structure-tiles-${props.slug}-${locale.value}`,
  () => loadStructureTabContent(props.slug, 'home', locale.value),
  { watch: [() => props.slug, locale] },
)

const tiles = computed<LinkTile[]>(() => [
  ...props.nav
    .filter(item => item.kind === 'link' || item.tab !== 'home')
    .map(item => item.kind === 'link'
      ? {
          label: (locale.value === 'en' ? item.label.en : undefined) ?? item.label.uk,
          url: item.url,
          icon: 'link' as const,
        }
      : {
          label: structureTabLabelOverride(props.slug, item.tab, locale.value)
            ?? t(`university.structure.unit.tabs.${item.tab}`),
          path: `/university/structure/${props.slug}/${item.tab}`,
          icon: TAB_ICONS[item.tab],
        }),
  ...(data.value?.content.links ?? []).map(link => ({
    label: link.label,
    url: link.url,
    path: link.path,
    icon: 'link' as const,
  })),
])
</script>

<template>
  <section v-if="tiles.length" class="py-12 border-t border-border">
    <h2 class="font-playfair text-xl font-bold text-navy mb-6">
      {{ t('university.structure.unit.sectionsTitle') }}
    </h2>
    <SharedLinkTileGrid :tiles="tiles" :columns="2" />
  </section>
</template>
