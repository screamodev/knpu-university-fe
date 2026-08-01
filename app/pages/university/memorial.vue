<script setup lang="ts">
import { readItems } from '@directus/sdk'
import { resolveMediaSrc } from '~/utils/directusMedia'
import { MEMORIAL_EXTERNAL_URL } from '~/utils/memorialUrl'

definePageMeta({ layout: 'default' })

// Page kept in repo but hidden: send visitors to the official external memorial.
await navigateTo(MEMORIAL_EXTERNAL_URL, { external: true, replace: true })

const { t } = useSafeI18nWithRouter()
const { client } = useDirectus()
const { localized } = useLocalizedField()
const { mediaResolvers } = useMediaResolvers()

useHead({
  title: () => t('nav.links.memorial'),
  meta: [{ name: 'description', content: () => t('university.memorial.subtitle') }],
})

const { data: memorialEntriesData } = await useAsyncData('memorial-entries', () =>
  client.request(
    readItems('memorial_entries', {
      fields: ['id', 'name', 'nameEn', 'role', 'roleEn', { photo: ['id', 'title', 'filename_download', 'description'] }],
      sort: ['order'],
      filter: { status: { _eq: 'published' } },
    }),
  ),
)

const memorialEntries = computed(() => memorialEntriesData.value ?? [])
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Darker hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('university.memorial.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.memorial.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.memorial.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <p class="max-w-3xl mx-auto text-center text-body text-text-muted">
        {{ t('university.memorial.intro') }}
      </p>
    </div>

    <!-- Portrait grid -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div v-if="memorialEntries.length" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="entry in memorialEntries"
          :key="entry.id"
          class="flex flex-col items-center text-center"
        >
          <div
            class="w-full aspect-square max-w-[200px] mx-auto rounded-12 overflow-hidden bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center"
          >
            <img
              v-if="resolveMediaSrc(entry.photo, mediaResolvers)"
              :src="resolveMediaSrc(entry.photo, mediaResolvers)"
              :alt="localized(entry, 'name')"
              class="w-full h-full object-cover"
            />
            <svg
              v-else
              class="w-10 h-10 text-gold/20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </div>
          <p class="mt-3 font-medium text-navy text-body-sm">
            {{ localized(entry, 'name') }}
          </p>
          <p class="text-body-sm text-text-muted">
            {{ localized(entry, 'role') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Closing motif: quote + candle -->
    <div class="bg-off-white border-t border-border py-14 lg:py-20">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="flex justify-center mb-6">
          <svg
            class="w-10 h-10 text-gold/70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
          >
            <path d="M12 22c0-4-2-6-2-10 0-2 1-4 2-4s2 2 2 4c0 4-2 6-2 10" />
            <path d="M12 8v14" />
            <path d="M8 22h8" />
          </svg>
        </div>
        <p class="font-playfair text-xl text-navy max-w-xl mx-auto">
          {{ t('university.memorial.closingQuote') }}
        </p>
      </div>
    </div>
  </div>
</template>
