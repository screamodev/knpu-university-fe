<script setup lang="ts">
/**
 * Tab bar shared by a group of sibling pages.
 *
 * `/education/quality` switches tabs inside one route; here each tab is a page of its own
 * (Вчена рада, Служба вченого секретаря, ради, На допомогу здобувачу), so the same pill row
 * is a set of links and the active one is decided by the current path.
 */
export interface SectionTab {
  path: string
  labelKey: string
}

const props = defineProps<{ tabs: SectionTab[] }>()

const { t, localePath } = useSafeI18nWithRouter()
const route = useRoute()

/** Strip the locale prefix so `/en/university/council` still matches its tab. */
const currentPath = computed(() => route.path.replace(/^\/[a-z]{2}(?=\/)/, ''))

const isActive = (tab: SectionTab) =>
  currentPath.value === tab.path || currentPath.value.startsWith(`${tab.path}/`)

const tabs = computed(() => props.tabs)
</script>

<template>
  <nav class="border-b border-border bg-white" :aria-label="t('common.sectionNav')">
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex gap-2 overflow-x-auto">
      <NuxtLink
        v-for="tab in tabs"
        :key="tab.path"
        :to="localePath(tab.path)"
        :aria-current="isActive(tab) ? 'page' : undefined"
        class="shrink-0 py-2 px-4 rounded-100 border text-[13px] font-medium no-underline transition-all duration-280"
        :class="
          isActive(tab)
            ? 'bg-navy border-navy text-white'
            : 'bg-white border-border text-navy hover:border-gold'
        "
      >
        {{ t(tab.labelKey) }}
      </NuxtLink>
    </div>
  </nav>
</template>
