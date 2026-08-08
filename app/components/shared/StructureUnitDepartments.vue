<script setup lang="ts">
import type { StructureItem } from '~/utils/structure'
import { type LinkTileIcon, linkTileIconPaths } from '~/utils/linkTileIcons'

/**
 * Department tiles on a unit Головна — navy cards inspired by the client collage,
 * using brand navy/gold instead of the reference site's green.
 */
const props = defineProps<{
  items: StructureItem[]
  slug: string
}>()

const { t, localePath } = useSafeI18nWithRouter()
const { localized } = useLocalizedField()
const NuxtLink = resolveComponent('NuxtLink')

const ICON_CYCLE: LinkTileIcon[] = ['book', 'award', 'students', 'document', 'globe', 'council', 'shield', 'link']

const scrollEl = ref<HTMLElement | null>(null)

const items = computed(() => props.items ?? [])

function iconFor(index: number): LinkTileIcon {
  return ICON_CYCLE[index % ICON_CYCLE.length]!
}

function tileTag(item: StructureItem): unknown {
  if (item.external) return 'a'
  if (item.path) return NuxtLink
  return 'div'
}

function scrollBy(direction: -1 | 1) {
  const el = scrollEl.value
  if (!el) return
  el.scrollBy({ left: direction * Math.min(320, el.clientWidth * 0.8), behavior: 'smooth' })
}
</script>

<template>
  <section v-if="items.length" class="py-12 border-t border-border">
    <div class="flex flex-wrap items-end justify-between gap-4 mb-6">
      <h2 class="font-playfair text-xl font-bold text-navy">
        {{ t('university.structure.unit.departmentsTitle') }}
      </h2>
      <div class="flex items-center gap-3">
        <NuxtLink
          :to="localePath(`/university/structure/${slug}/structure`)"
          class="text-sm font-medium text-navy no-underline hover:text-gold transition-colors duration-280"
        >
          {{ t('university.structure.unit.departmentsAll') }} →
        </NuxtLink>
        <div class="hidden sm:flex gap-2">
          <button
            type="button"
            class="w-9 h-9 rounded-full border border-border bg-white text-navy hover:border-gold hover:text-gold transition-colors duration-280"
            :aria-label="t('university.structure.unit.departmentsTitle')"
            @click="scrollBy(-1)"
          >
            ‹
          </button>
          <button
            type="button"
            class="w-9 h-9 rounded-full border border-border bg-white text-navy hover:border-gold hover:text-gold transition-colors duration-280"
            :aria-label="t('university.structure.unit.departmentsTitle')"
            @click="scrollBy(1)"
          >
            ›
          </button>
        </div>
      </div>
    </div>

    <div
      ref="scrollEl"
      class="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-1 -mx-1 px-1 scroll-smooth"
    >
      <component
        :is="tileTag(item)"
        v-for="(item, index) in items"
        :key="`${localized(item, 'name')}-${index}`"
        v-bind="
          item.external
            ? { href: item.external, target: '_blank', rel: 'noopener noreferrer' }
            : item.path
              ? { to: localePath(item.path) }
              : {}
        "
        class="group snap-start shrink-0 w-[240px] sm:w-[260px] aspect-square rounded-16 bg-navy p-6 flex flex-col justify-between no-underline transition-transform duration-280 hover:-translate-y-1"
      >
        <svg
          class="w-12 h-12 text-gold/80 transition-transform duration-280 group-hover:scale-105"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden
        >
          <path v-for="(d, pathIndex) in linkTileIconPaths(iconFor(index))" :key="pathIndex" :d="d" />
        </svg>
        <div class="font-playfair text-base font-semibold text-white leading-snug">
          {{ localized(item, 'name') }}
          <span v-if="item.external" class="sr-only">{{ t('common.opensInNewTab') }}</span>
        </div>
      </component>
    </div>
  </section>
</template>
