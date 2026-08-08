<script setup lang="ts">
import { type LinkTileIcon, linkTileIconPaths } from '~/utils/linkTileIcons'

export type { LinkTileIcon }

export interface LinkTile {
  label: string
  /** Internal route (localised on render) — mutually exclusive with `url`. */
  path?: string
  /** Absolute address on another site. */
  url?: string
  icon?: LinkTileIcon
  /** Rendered but not clickable — used for entries that have no address yet. */
  disabled?: boolean
}

/**
 * Grid of section links: icon, label, trailing arrow.
 *
 * The client asked for the layout used on knmu.edu.ua for a faculty's related sections. Icons are
 * a small inline set rather than an icon library — eight shapes cover everything asked for.
 */
withDefaults(defineProps<{ tiles: LinkTile[]; columns?: 2 | 3 }>(), { columns: 3 })

const { t, localePath } = useSafeI18nWithRouter()
const NuxtLink = resolveComponent('NuxtLink')

function iconPaths(icon: LinkTileIcon | undefined): string[] {
  return linkTileIconPaths(icon)
}
</script>

<template>
  <ul
    class="grid grid-cols-1 gap-4 list-none p-0 m-0"
    :class="columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'"
  >
    <li v-for="tile in tiles" :key="tile.label">
      <component
        :is="tile.disabled ? 'div' : tile.url ? 'a' : NuxtLink"
        v-bind="
          tile.disabled
            ? {}
            : tile.url
              ? { href: tile.url, target: '_blank', rel: 'noopener noreferrer' }
              : { to: localePath(tile.path ?? '/') }
        "
        class="group h-full flex items-center gap-3 px-4 py-3.5 bg-white border border-border rounded-14 no-underline transition-all duration-280"
        :class="
          tile.disabled
            ? 'opacity-55 cursor-default'
            : 'hover:border-gold hover:shadow-gold hover:-translate-y-0.5'
        "
      >
        <span
          class="w-9 h-9 shrink-0 rounded-10 bg-gold/15 flex items-center justify-center"
          aria-hidden
        >
          <svg
            class="w-5 h-5 text-gold"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path v-for="(d, index) in iconPaths(tile.icon)" :key="index" :d="d" />
          </svg>
        </span>

        <span class="flex-1 min-w-0 text-body-sm font-medium text-navy leading-snug">
          {{ tile.label }}
          <span v-if="tile.url" class="sr-only">{{ t('common.opensInNewTab') }}</span>
        </span>

        <svg
          v-if="!tile.disabled"
          class="w-4 h-4 shrink-0 text-navy transition-transform duration-280 group-hover:translate-x-0.5 group-hover:text-gold"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden
        >
          <path :d="tile.url ? 'M7 17L17 7M17 7H8m9 0v9' : 'M5 12h14M12 5l7 7-7 7'" />
        </svg>
      </component>
    </li>
  </ul>
</template>
