<script setup lang="ts">
import type { LinkTile } from '~/components/shared/LinkTileGrid.vue'
import { type LinkTileIcon, linkTileIconPaths } from '~/utils/linkTileIcons'

/**
 * «Корисні покликання» on the home page — the six destinations the client listed.
 *
 * Rendered as the row of pills this band has always used. The icon-tile grid belongs to the
 * faculty and postgraduate pages (`SharedLinkTileGrid`), which is where the client asked for it.
 *
 * «For Abroad Enrollees» has no address yet, so it renders disabled rather than pointing at a
 * page that does not exist.
 */
const { t, localePath } = useSafeI18nWithRouter()

const links = computed<LinkTile[]>(() => [
  { label: t('quickAccess.quality'), path: '/education/quality', icon: 'award' },
  { label: t('quickAccess.admissions'), path: '/admissions/committee', icon: 'students' },
  { label: t('quickAccess.abroad'), icon: 'globe', disabled: true },
  { label: t('quickAccess.languageExam'), path: '/university/language-exam', icon: 'document' },
  {
    label: t('quickAccess.integrity'),
    url: 'https://sites.google.com/hnpu.edu.ua/akdob',
    icon: 'shield',
  },
  {
    label: t('quickAccess.eduhub'),
    url: 'https://sites.google.com/hnpu.edu.ua/khnpu-eduhub/%D0%BA%D0%B0%D0%BB%D0%B5%D0%BD%D0%B4%D0%B0%D1%80',
    icon: 'book',
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
      class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex flex-nowrap items-center gap-3 min-w-0 overflow-x-auto"
    >
      <span class="text-xs text-text-muted font-medium tracking-wider uppercase shrink-0">
        {{ t('quickAccess.label') }}
      </span>

      <div class="flex flex-nowrap items-center gap-2 min-w-0">
        <component
          :is="link.disabled ? 'span' : link.url ? 'a' : 'NuxtLink'"
          v-for="link in links"
          :key="link.label"
          v-bind="
            link.disabled
              ? {}
              : link.url
                ? { href: link.url, target: '_blank', rel: 'noopener noreferrer' }
                : { to: localePath(link.path ?? '/') }
          "
          :class="[chipClass, link.disabled ? 'opacity-55 cursor-default' : chipInteractiveClass]"
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
            v-if="link.url"
            class="w-3 h-3 shrink-0 text-text-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden
          >
            <path d="M7 17L17 7M17 7H8m9 0v9" />
          </svg>
          <span v-if="link.url" class="sr-only">{{ t('common.opensInNewTab') }}</span>
        </component>
      </div>
    </div>
  </div>
</template>
