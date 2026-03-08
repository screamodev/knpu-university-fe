<script setup lang="ts">
import type { StrapiPaginatedResponse, StrapiProgramme } from '~/types/strapi'

const { t, localePath } = useSafeI18nWithRouter()
const strapi = useStrapi()
const { localized } = useLocalizedField()

const { data, pending, error } = useFetch<StrapiPaginatedResponse<StrapiProgramme>>(
  strapi.apiUrl('/programmes?populate=cover&sort=createdAt:desc&pagination[limit]=6'),
)

const programs = computed(() => data.value?.data ?? [])

const levelLabelKey: Record<string, string> = {
  bachelor: 'programs.levels.bachelor',
  master: 'programs.levels.master',
  graduate: 'programs.levels.graduate',
}
</script>

<template>
  <section class="py-20 bg-off-white">
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-end justify-between mb-10">
        <SharedSectionHeader :tag="t('sections.programs.tag')" :title="t('sections.programs.title')" />
        <NuxtLink
          :to="localePath('/programs')"
          class="text-sm text-navy no-underline flex items-center gap-1.5 border-b-[1.5px] border-gold pb-0.5 font-medium"
        >
          {{ t('sections.programs.all') }}
          <span>→</span>
        </NuxtLink>
      </div>
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="i in 6"
          :key="i"
          class="border-[1.5px] border-border rounded-14 p-7 bg-white animate-pulse"
        >
          <div class="w-11 h-11 bg-slate-200 rounded-[10px] mb-4" />
          <div class="h-3 bg-slate-200 rounded w-1/4 mb-2" />
          <div class="h-4 bg-slate-200 rounded w-3/4 mb-2" />
          <div class="h-3 bg-slate-200 rounded w-1/2" />
        </div>
      </div>
      <!-- Error state -->
      <div
        v-else-if="error"
        class="flex flex-col items-center justify-center py-16 text-center"
      >
        <div class="w-14 h-14 rounded-full bg-danger/10 flex items-center justify-center mb-4">
          <svg class="w-7 h-7 text-danger" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <p class="text-body-sm text-text-muted max-w-xs">{{ t('sections.programs.error') }}</p>
      </div>

      <!-- Empty state -->
      <div
        v-else-if="programs.length === 0"
        class="flex flex-col items-center justify-center py-16 text-center"
      >
        <div class="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <svg class="w-7 h-7 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </div>
        <p class="text-body-sm text-text-muted max-w-xs">{{ t('sections.programs.empty') }}</p>
      </div>

      <!-- Programs grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <NuxtLink
          v-for="prog in programs"
          :key="prog.id"
          :to="localePath(`/programs/${prog.slug}`)"
          class="relative border-[1.5px] border-border rounded-14 p-7 no-underline transition-all duration-280 bg-white overflow-hidden before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-gold before:scale-y-0 before:origin-bottom before:transition-transform before:duration-280 hover:border-transparent hover:shadow-[0_8px_32px_rgba(27,46,75,0.12)] hover:-translate-y-0.5 hover:before:scale-y-100"
        >
          <div class="w-11 h-11 bg-gold-pale rounded-[10px] flex items-center justify-center mb-4">
            <svg class="w-[22px] h-[22px] text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <div class="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">
            {{ levelLabelKey[prog.level] ? t(levelLabelKey[prog.level]) : prog.level }}
          </div>
          <div class="font-playfair text-[17px] text-navy font-semibold leading-tight mb-2.5">
            {{ localized(prog, 'title') }}
          </div>
          <div class="text-[12.5px] text-text-muted leading-snug">
            {{ localized(prog, 'faculty') || '—' }}
          </div>
          <div class="absolute top-7 right-6 text-border text-lg transition-colors duration-280 group-hover:text-gold">›</div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
