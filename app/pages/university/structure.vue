<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, tm, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.structure'),
  meta: [{ name: 'description', content: () => t('university.structure.subtitle') }],
})

function getList(key: string): string[] {
  const value = tm(key)
  if (!Array.isArray(value)) return []
  return value.map((_, index) => t(`${key}.${index}`))
}

const structureSections = computed(() => [
  { titleKey: 'university.structure.faculties', listKey: 'university.structure.facultiesList' },
  { titleKey: 'university.structure.institutes', listKey: 'university.structure.institutesList' },
  { titleKey: 'university.structure.administrative', listKey: 'university.structure.administrativeList' },
  { titleKey: 'university.structure.research', listKey: 'university.structure.researchList' },
  { titleKey: 'university.structure.services', listKey: 'university.structure.servicesList' },
])
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.structure.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.structure.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.structure.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('university.structure.intro') }}
      </p>
    </div>

    <!-- Org-chart sections: grouped blocks with gold dot markers -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div class="flex flex-col gap-10">
        <section
          v-for="section in structureSections"
          :key="section.titleKey"
          class="flex flex-col gap-4"
        >
          <h2 class="font-playfair text-xl font-bold text-navy">
            {{ t(section.titleKey) }}
          </h2>
          <ul class="flex flex-col gap-2">
            <li
              v-for="(item, index) in getList(section.listKey)"
              :key="index"
              class="flex items-center gap-3 py-2 px-4 bg-white border border-border rounded-12"
            >
              <span class="w-2 h-2 rounded-full bg-gold shrink-0" aria-hidden />
              <span class="text-body text-navy">{{ item }}</span>
            </li>
          </ul>
        </section>
      </div>

      <!-- Link to faculties -->
      <div class="mt-12 pt-8 border-t border-border">
        <NuxtLink
          :to="localePath(t('university.structure.linkToFacultiesUrl'))"
          class="inline-flex items-center gap-2 text-primary font-medium hover:underline"
        >
          {{ t('university.structure.linkToFaculties') }}
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
