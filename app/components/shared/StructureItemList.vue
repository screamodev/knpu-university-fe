<script setup lang="ts">
import type { StructureItem } from '~/utils/structure'

const props = defineProps<{
  items: StructureItem[]
  /** Nested lists render smaller and indented. */
  nested?: boolean
}>()

const { t } = useSafeI18nWithRouter()
const { localized } = useLocalizedField()

const items = computed(() => props.items ?? [])
</script>

<template>
  <ul
    class="flex flex-col gap-2"
    :class="nested ? 'mt-2 pl-4 border-l-2 border-slate-200' : ''"
  >
    <li v-for="(item, index) in items" :key="index">
      <!-- Subdivision with its own site: link out instead of duplicating it here -->
      <a
        v-if="item.external"
        :href="item.external"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex items-start gap-3 py-2 px-4 bg-white border border-border rounded-12 transition-colors duration-280 hover:border-gold/60"
        :class="nested ? 'text-body-sm' : 'text-body'"
      >
        <span class="w-2 h-2 rounded-full bg-gold shrink-0 mt-2" aria-hidden />
        <span class="flex-1 text-navy group-hover:text-primary">
          {{ localized(item, 'name') }}
          <span class="block text-body-sm text-text-muted">
            {{ t('university.structure.ownWebsite') }}
          </span>
        </span>
        <svg
          class="w-4 h-4 text-text-muted shrink-0 mt-1.5"
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

      <!-- Subdivision without a site of its own -->
      <div
        v-else
        class="flex items-start gap-3 py-2 px-4 bg-off-white border border-border rounded-12"
        :class="nested ? 'text-body-sm' : 'text-body'"
      >
        <span class="w-2 h-2 rounded-full bg-slate-300 shrink-0 mt-2" aria-hidden />
        <span class="flex-1 text-navy">{{ localized(item, 'name') }}</span>
      </div>

      <!-- Self-reference by filename: museums / laboratories attached to the item -->
      <StructureItemList v-if="item.children?.length" :items="item.children" nested />
    </li>
  </ul>
</template>
