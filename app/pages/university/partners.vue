<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusPartner } from '~/types/directus'
import { resolveMediaSrc } from '~/utils/directusMedia'

definePageMeta({ layout: 'default' })

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

useHead({
  title: () => t('sections.partners.title'),
  meta: [{ name: 'description', content: () => t('sections.partners.title') }],
})

const { data: partnersData, pending } = useAsyncData('partners-listing', () =>
  client.request(
    readItems('partners', {
      fields: ['*', { logo: ['*'] }],
      limit: 48,
    }),
  ),
)

const partners = computed(() => partnersData.value ?? [])

function isExternalUrl(url: string | null): boolean {
  if (!url) return false
  return url.startsWith('http://') || url.startsWith('https://')
}

function normalizeWebsiteUrl(url: string | null): string | null {
  if (!url?.trim()) return null
  const trimmed = url.trim()
  if (isExternalUrl(trimmed)) return trimmed
  return `https://${trimmed}`
}

function partnerLogoSrc(logo: DirectusPartner['logo']): string {
  return resolveMediaSrc(logo, mediaResolvers)
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Page header -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('sections.partners.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('sections.partners.title') }}
        </h1>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Loading skeleton -->
      <div
        v-if="pending"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="i in 8"
          :key="i"
          class="bg-off-white border border-border rounded-16 p-6 animate-pulse"
        >
          <div class="h-20 bg-border rounded-12 mb-4" />
          <div class="h-5 bg-border rounded w-3/4 mb-2" />
          <div class="h-3 bg-border rounded w-1/2 mb-4" />
          <div class="h-4 bg-border rounded w-full" />
          <div class="h-4 bg-border rounded w-2/3 mt-2" />
        </div>
      </div>

      <!-- Partners grid -->
      <div
        v-else-if="partners.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <article
          v-for="partner in partners"
          :key="partner.id"
          :id="partner.slug"
          class="bg-off-white border border-border rounded-16 overflow-hidden flex flex-col transition-all duration-280 hover:border-gold hover:shadow-gold"
        >
          <!-- Logo / name header -->
          <div
            class="p-6 min-h-[140px] flex items-center justify-center bg-white border-b border-border"
          >
            <img
              v-if="partner.logo && partnerLogoSrc(partner.logo)"
              :src="partnerLogoSrc(partner.logo)"
              :alt="localized(partner, 'name')"
              class="max-h-20 max-w-full object-contain"
            />
            <span
              v-else
              class="font-playfair text-lg font-semibold text-navy text-center"
            >
              {{ localized(partner, 'name') }}
            </span>
          </div>

          <!-- Card body -->
          <div class="p-5 flex flex-col flex-1">
            <h2 class="font-playfair text-[18px] font-semibold text-navy mb-2 leading-snug">
              {{ localized(partner, 'name') }}
            </h2>
            <p
              v-if="localized(partner, 'country')"
              class="text-sm text-text-muted mb-3"
            >
              {{ localized(partner, 'country') }}
            </p>
            <p
              v-if="localized(partner, 'description')"
              class="text-sm text-slate-600 leading-relaxed flex-1 line-clamp-4"
            >
              {{ localized(partner, 'description') }}
            </p>
            <a
              v-if="partner.website"
              :href="normalizeWebsiteUrl(partner.website) ?? '#'"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors no-underline"
            >
              {{ t('partners.visitWebsite') }}
              <svg
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </article>
      </div>

      <!-- Empty state -->
      <div v-else class="py-24 text-center text-text-muted">
        {{ t('partners.noPartners') }}
      </div>
    </div>
  </div>
</template>
