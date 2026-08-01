<script setup lang="ts">
import type { StructureTabId } from '~/utils/structureContent'

/**
 * Sub-navigation for a unit page. Real links rather than buttons: every tab is its own URL, so
 * it must be crawlable, bookmarkable and middle-clickable.
 */
const props = defineProps<{
  slug: string
  tabs: StructureTabId[]
  active: StructureTabId
}>()

const { t, localePath } = useSafeI18nWithRouter()

function tabHref(tab: StructureTabId) {
  return localePath(
    tab === 'home'
      ? `/university/structure/${props.slug}`
      : `/university/structure/${props.slug}/${tab}`,
  )
}
</script>

<template>
  <nav
    v-if="tabs.length > 1"
    class="border-b border-border"
    :aria-label="t('university.structure.tag')"
  >
    <!-- Nine pills do not fit a phone; scroll them instead of wrapping into three rows. -->
    <ul class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 overflow-x-auto snap-x py-3">
      <li v-for="tab in tabs" :key="tab" class="snap-start shrink-0">
        <NuxtLink
          :to="tabHref(tab)"
          :aria-current="tab === active ? 'page' : undefined"
          class="block px-4 py-1.5 rounded-100 text-sm font-medium border no-underline transition-colors duration-280"
          :class="
            tab === active
              ? 'bg-navy text-white border-navy'
              : 'bg-white text-navy border-border hover:border-navy'
          "
        >
          {{ t(`university.structure.unit.tabs.${tab}`) }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
