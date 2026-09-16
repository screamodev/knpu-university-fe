<script setup lang="ts">
import {
  structureTabLabelOverride,
  type StructureNavItem,
  type StructureTabId,
} from '~/utils/structureContent'

/**
 * Sub-navigation for a unit page. Real links rather than buttons: every tab is its own URL, so
 * it must be crawlable, bookmarkable and middle-clickable. A unit may also send a tab straight
 * to its Google Site (`tabNav` in the manifest) — that pill opens in a new tab.
 *
 * Sticky under the site header (76px) so tabs stay reachable while scrolling long faculty homes.
 */
const props = defineProps<{
  slug: string
  nav: StructureNavItem[]
  active: StructureTabId
}>()

const { t, localePath, locale } = useSafeI18nWithRouter()

function itemLabel(item: StructureNavItem) {
  if (item.kind === 'link') return (locale.value === 'en' ? item.label.en : undefined) ?? item.label.uk
  return structureTabLabelOverride(props.slug, item.tab, locale.value)
    ?? t(`university.structure.unit.tabs.${item.tab}`)
}

function tabHref(tab: StructureTabId) {
  return localePath(
    tab === 'home'
      ? `/university/structure/${props.slug}`
      : `/university/structure/${props.slug}/${tab}`,
  )
}

const pill = 'block px-4 py-1.5 rounded-100 text-sm font-medium border no-underline transition-colors duration-280'
const idle = 'bg-white text-navy border-border hover:border-navy'
</script>

<template>
  <nav
    v-if="nav.length > 1"
    class="sticky top-[76px] z-20 border-b border-border bg-white/95 backdrop-blur-sm"
    :aria-label="t('university.structure.tag')"
  >
    <!-- Nine pills do not fit a phone; scroll them instead of wrapping into three rows. -->
    <ul class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 overflow-x-auto snap-x py-3">
      <li
        v-for="item in nav"
        :key="item.kind === 'tab' ? item.tab : item.url"
        class="snap-start shrink-0"
      >
        <a
          v-if="item.kind === 'link'"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          :class="[pill, idle]"
        >
          {{ itemLabel(item) }}
          <span aria-hidden>↗</span>
          <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
        </a>
        <NuxtLink
          v-else
          :to="tabHref(item.tab)"
          :aria-current="item.tab === active ? 'page' : undefined"
          :class="[pill, item.tab === active ? 'bg-navy text-white border-navy' : idle]"
        >
          {{ itemLabel(item) }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
