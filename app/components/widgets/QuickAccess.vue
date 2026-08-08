<script setup lang="ts">
import type { LinkTile } from '~/components/shared/LinkTileGrid.vue'
import { type LinkTileIcon, linkTileIconPaths } from '~/utils/linkTileIcons'

/**
 * «Швидкий доступ» on the home page — six high-traffic destinations under the hero.
 *
 * Rendered as the row of pills this band has always used. The icon-tile grid belongs to the
 * faculty and postgraduate pages (`SharedLinkTileGrid`).
 *
 * NuxtLink must be used directly — `:is="'NuxtLink'"` SSR-renders as an unknown custom element
 * with a `to` attribute and never becomes a clickable `<a>`.
 */
const { t, localePath } = useSafeI18nWithRouter()

const MOODLE_EXTERNAL_URL = 'https://lms.hnpu.edu.ua/moodle'

const links = computed<LinkTile[]>(() => [
  { label: t('quickAccess.publicInfo'), path: '/university/public-info', icon: 'document' },
  { label: t('quickAccess.moodle'), url: MOODLE_EXTERNAL_URL, icon: 'document' },
  { label: t('quickAccess.library'), path: '/science/library', icon: 'document' },
  { label: t('quickAccess.quality'), path: '/education/quality', icon: 'document' },
  { label: t('quickAccess.monitoring'), path: '/education/monitoring', icon: 'document' },
  {
    label: t('quickAccess.anticorruption'),
    path: '/university/anticorruption',
    icon: 'document',
  },
])

const chipClass
  = 'inline-flex items-center gap-1.5 py-2 px-3 xl:px-3.5 bg-white border-[1.5px] border-border rounded-100 '
    + 'text-[12px] xl:text-[13px] font-medium text-navy no-underline whitespace-nowrap shrink-0 '
    + 'transition-all duration-280'

const chipInteractiveClass
  = 'hover:border-gold hover:text-gold hover:-translate-y-0.5 '
    + 'hover:shadow-[0_4px_12px_rgba(27,46,75,0.1)]'

function iconPaths(icon: LinkTileIcon | undefined): string[] {
  return linkTileIconPaths(icon)
}
</script>

<template>
  <div class="bg-off-white border-b border-border py-5">
    <div
      class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex flex-nowrap items-center gap-3 min-w-0"
    >
      <span class="text-xs text-text-muted font-medium tracking-wider uppercase shrink-0">
        {{ t('quickAccess.label') }}
      </span>

      <!--
        Horizontal scroll lives on the pills row only. `py-1 -my-1` keeps room for the hover
        lift + border/shadow; without it `overflow-x-auto` clips the top edge (CSS forces
        overflow-y to clip whenever overflow-x is not visible).
      -->
      <div class="flex flex-nowrap items-center gap-2 min-w-0 overflow-x-auto py-1 -my-1">
        <template v-for="link in links" :key="link.label">
          <NuxtLink
            v-if="link.path && !link.disabled"
            :to="localePath(link.path)"
            :class="[chipClass, chipInteractiveClass]"
          >
            <svg
              class="w-3.5 h-3.5 shrink-0 text-gold"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden
            >
              <path v-for="(d, index) in iconPaths(link.icon)" :key="index" :d="d" />
            </svg>
            {{ link.label }}
          </NuxtLink>

          <a
            v-else-if="link.url && !link.disabled"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            :class="[chipClass, chipInteractiveClass]"
          >
            <svg
              class="w-3.5 h-3.5 shrink-0 text-gold"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden
            >
              <path v-for="(d, index) in iconPaths(link.icon)" :key="index" :d="d" />
            </svg>
            {{ link.label }}
            <svg
              class="w-3 h-3 shrink-0 text-text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden
            >
              <path d="M7 17L17 7M17 7H8m9 0v9" />
            </svg>
            <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
          </a>

          <span
            v-else
            :class="[chipClass, 'opacity-55 cursor-default']"
          >
            <svg
              class="w-3.5 h-3.5 shrink-0 text-gold"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden
            >
              <path v-for="(d, index) in iconPaths(link.icon)" :key="index" :d="d" />
            </svg>
            {{ link.label }}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>
