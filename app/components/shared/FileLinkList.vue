<script setup lang="ts">
import type { DirectusFile } from '~/types/directus'

/**
 * Plain list of downloadable items.
 *
 * `SharedDocumentList` renders the `documents` collection and owns its query; this is the same
 * row design for everything else that carries files — сертифікати про акредитацію, звіти про
 * контингент, результати анкет — so those pages don't each re-invent the link, the size badge
 * and the empty state.
 */
export interface FileLinkItem {
  id: string
  title: string
  /** Right-hand label: рік, форма навчання, вид документа… */
  badge?: string | null
  file?: DirectusFile | string | null
  externalUrl?: string | null
}

withDefaults(defineProps<{ items: FileLinkItem[]; dense?: boolean }>(), { dense: false })

const { t } = useSafeI18nWithRouter()
const { assetUrl } = useDirectus()

function href(item: FileLinkItem): string | null {
  if (item.file) return assetUrl(item.file as never) ?? null
  return item.externalUrl || null
}

function meta(item: FileLinkItem): string {
  const file = item.file
  if (file && typeof file === 'object') {
    const size = formatFileSize(file.filesize)
    const kind = fileKindLabel(file)
    return [kind, size].filter(Boolean).join(' · ')
  }
  return item.externalUrl ? t('documents.externalLink') : ''
}
</script>

<template>
  <ul v-if="items.length" class="list-none p-0 m-0 space-y-2">
    <li
      v-for="(item, index) in items"
      :key="item.id"
      class="rounded-12 border border-border flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4"
      :class="[index % 2 === 0 ? 'bg-off-white' : 'bg-white', dense ? 'px-4 py-2.5' : 'px-4 py-3']"
    >
      <span v-if="item.badge" class="text-body-sm text-text-muted sm:w-32 shrink-0">
        {{ item.badge }}
      </span>

      <a
        v-if="href(item)"
        :href="href(item)!"
        target="_blank"
        rel="noopener noreferrer"
        class="flex-1 min-w-0 font-medium text-navy hover:text-gold transition-colors no-underline"
      >
        {{ item.title }}
        <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
      </a>
      <span v-else class="flex-1 min-w-0 text-text-muted">{{ item.title }}</span>

      <span v-if="meta(item)" class="text-body-sm shrink-0">
        <span class="inline-block px-2.5 py-0.5 rounded bg-gold/15 text-gold font-medium whitespace-nowrap">
          {{ meta(item) }}
        </span>
      </span>
    </li>
  </ul>

  <p v-else class="text-body-sm text-text-muted py-4">
    {{ t('documents.empty') }}
  </p>
</template>
