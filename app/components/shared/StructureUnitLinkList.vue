<script setup lang="ts">
import type { StructureTabLink } from '~/utils/structureContent'

/** Outbound documents and services referenced by a tab: schedules on Drive, PDFs, the LMS. */
defineProps<{ links: StructureTabLink[] }>()

const { t } = useSafeI18nWithRouter()
</script>

<template>
  <section v-if="links.length" class="mt-10">
    <h2 class="font-playfair text-xl font-bold text-navy mb-4">
      {{ t('university.structure.unit.documentsTitle') }}
    </h2>
    <ul class="space-y-2">
      <li v-for="link in links" :key="link.url">
        <a
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-start gap-2 px-4 py-3 rounded-12 border border-border bg-off-white text-navy no-underline hover:border-navy transition-colors duration-280"
        >
          <svg class="w-4 h-4 mt-0.5 shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <path d="M15 3h6v6M10 14L21 3" />
          </svg>
          <span>
            {{ link.label }}
            <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
          </span>
        </a>
      </li>
    </ul>
  </section>
</template>
