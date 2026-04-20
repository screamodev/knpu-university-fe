<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusPartner } from '~/types/directus'
import { resolveMediaSrc } from '~/utils/directusMedia'

const { t, localePath } = useSafeI18nWithRouter()
const { client, assetUrl, publicUrl } = useDirectus()
const mediaResolvers = {
  assetUrl,
  strapiImageUrl: (path: string) =>
    path.startsWith('http://') || path.startsWith('https://')
      ? path
      : `${publicUrl.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`,
}
const { localized } = useLocalizedField()

const { data, pending, error } = useAsyncData('home-partners', () =>
  client.request(
    readItems('partners', {
      fields: ['*', { logo: ['*'] }],
      limit: 8,
    }),
  ),
)

const partners = computed(() => data.value ?? [])

function partnerLogoSrc(logo: DirectusPartner['logo']): string {
  return resolveMediaSrc(logo, mediaResolvers)
}
</script>

<template>
  <section class="py-20 bg-off-white">
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
      <SharedSectionHeader :tag="t('sections.partners.tag')" :title="t('sections.partners.title')" />
      <div v-if="pending" class="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center min-h-[120px]">
        <div
          v-for="i in 8"
          :key="i"
          class="bg-white border border-border rounded-12 p-6 h-28 flex items-center justify-center animate-pulse"
        >
          <div class="w-20 h-12 bg-slate-200 rounded" />
        </div>
      </div>
      <!-- Error state -->
      <div
        v-else-if="error"
        class="mt-10 flex flex-col items-center justify-center py-16 text-center"
      >
        <div class="w-14 h-14 rounded-full bg-danger/10 flex items-center justify-center mb-4">
          <svg class="w-7 h-7 text-danger" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <p class="text-body-sm text-text-muted max-w-xs">{{ t('sections.partners.error') }}</p>
      </div>

      <!-- Empty state -->
      <div
        v-else-if="partners.length === 0"
        class="mt-10 flex flex-col items-center justify-center py-16 text-center"
      >
        <div class="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <svg class="w-7 h-7 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <p class="text-body-sm text-text-muted max-w-xs">{{ t('sections.partners.empty') }}</p>
      </div>

      <!-- Partners grid -->
      <div v-else class="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center min-h-[120px]">
        <NuxtLink
          v-for="partner in partners"
          :key="partner.id"
          :to="localePath(`/university/partners#${partner.slug}`)"
          class="bg-white border-[1.5px] border-border rounded-12 p-6 h-28 flex items-center justify-center no-underline transition-all duration-280 hover:border-gold hover:shadow-[0_4px_16px_rgba(27,46,75,0.08)]"
        >
          <img
            v-if="partner.logo && partnerLogoSrc(partner.logo)"
            :src="partnerLogoSrc(partner.logo)"
            :alt="localized(partner, 'name')"
            class="max-h-14 max-w-full object-contain"
          />
          <span v-else class="text-sm font-medium text-navy truncate">{{ localized(partner, 'name') }}</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
