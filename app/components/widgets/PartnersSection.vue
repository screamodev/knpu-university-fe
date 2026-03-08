<script setup lang="ts">
import type { StrapiPaginatedResponse, StrapiPartner } from '~/types/strapi'

const { t, localePath } = useSafeI18nWithRouter()
const strapi = useStrapi()
const { localized } = useLocalizedField()

const { data, pending } = useFetch<StrapiPaginatedResponse<StrapiPartner>>(
  strapi.apiUrl('/partners?populate=logo&pagination[limit]=8'),
)

const partners = computed(() => data.value?.data ?? [])
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
      <div v-else class="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center min-h-[120px]">
        <NuxtLink
          v-for="partner in partners"
          :key="partner.id"
          :to="localePath(`/university/partners#${partner.slug}`)"
          class="bg-white border-[1.5px] border-border rounded-12 p-6 h-28 flex items-center justify-center no-underline transition-all duration-280 hover:border-gold hover:shadow-[0_4px_16px_rgba(27,46,75,0.08)]"
        >
          <img
            v-if="partner.logo"
            :src="strapi.imageUrl(partner.logo.url) ?? ''"
            :alt="localized(partner, 'name')"
            class="max-h-14 max-w-full object-contain"
          />
          <span v-else class="text-sm font-medium text-navy truncate">{{ localized(partner, 'name') }}</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
