<script setup lang="ts">
import type { StrapiPaginatedResponse, StrapiProgramme, ProgrammeLevel } from '~/types/strapi'

definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()
const strapi = useStrapi()
const { localized } = useLocalizedField()

useHead({
  title: () => t('sections.programs.title'),
  meta: [{ name: 'description', content: () => t('sections.programs.title') }],
})

const selectedLevel = ref<ProgrammeLevel | null>(null)

const levelLabelKey: Record<string, string> = {
  bachelor: 'programs.levels.bachelor',
  master: 'programs.levels.master',
  graduate: 'programs.levels.graduate',
}

const { data: programmesData, pending } = useAsyncData(
  'programmes-listing',
  () => {
    const params = new URLSearchParams({
      populate: 'cover',
      sort: 'createdAt:desc',
      'pagination[pageSize]': '24',
    })
    if (selectedLevel.value) {
      params.set('filters[level][$eq]', selectedLevel.value)
    }
    return $fetch<StrapiPaginatedResponse<StrapiProgramme>>(
      strapi.apiUrl(`/programmes?${params.toString()}`),
    )
  },
  { watch: [selectedLevel] },
)

const programmes = computed(() => programmesData.value?.data ?? [])
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Page header -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('sections.programs.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('sections.programs.title') }}
        </h1>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Level filter tabs -->
      <div class="flex flex-wrap gap-2 mb-10">
        <button
          class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
          :class="
            selectedLevel === null
              ? 'bg-navy text-white border-navy'
              : 'bg-white text-navy border-border hover:border-navy'
          "
          @click="selectedLevel = null"
        >
          {{ t('programs.allLevels') }}
        </button>
        <button
          v-for="level in (['bachelor', 'master', 'graduate'] as const)"
          :key="level"
          class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
          :class="
            selectedLevel === level
              ? 'bg-navy text-white border-navy'
              : 'bg-white text-navy border-border hover:border-navy'
          "
          @click="selectedLevel = level"
        >
          {{ t(levelLabelKey[level]) }}
        </button>
      </div>

      <!-- Loading skeleton -->
      <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="i in 6"
          :key="i"
          class="bg-off-white border border-border rounded-16 overflow-hidden animate-pulse"
        >
          <div class="h-48 bg-border" />
          <div class="p-5 space-y-3">
            <div class="h-3 bg-border rounded w-1/4" />
            <div class="h-5 bg-border rounded w-4/5" />
            <div class="h-3 bg-border rounded w-3/5" />
          </div>
        </div>
      </div>

      <!-- Programmes grid -->
      <div v-else-if="programmes.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="prog in programmes"
          :key="prog.id"
          :to="localePath(`/programs/${prog.slug}`)"
          class="group bg-off-white border border-border rounded-16 overflow-hidden no-underline flex flex-col transition-all duration-280 hover:border-gold hover:-translate-y-1 hover:shadow-gold"
        >
          <!-- Cover image -->
          <div class="h-48 bg-navy-mid overflow-hidden relative">
            <img
              v-if="prog.cover"
              :src="strapi.imageUrl(prog.cover.url) ?? ''"
              :alt="prog.cover.alternativeText ?? localized(prog, 'title')"
              class="w-full h-full object-cover transition-transform duration-280 group-hover:scale-105"
            />
            <div
              v-else
              class="w-full h-full bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center"
            >
              <svg class="w-10 h-10 text-gold/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
          </div>

          <!-- Card body -->
          <div class="p-5 flex flex-col flex-1">
            <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-2">
              {{ t(levelLabelKey[prog.level]) }}
            </div>
            <div class="font-playfair text-[16px] font-semibold text-navy leading-snug flex-1 mb-3">
              {{ localized(prog, 'title') }}
            </div>
            <p v-if="localized(prog, 'faculty')" class="text-sm text-text-muted">
              {{ localized(prog, 'faculty') }}
            </p>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-else class="py-24 text-center text-text-muted">
        {{ t('programs.noPrograms') }}
      </div>
    </div>
  </div>
</template>
