<script setup lang="ts">
import {
  countStructureItems,
  STRUCTURE_ASSOCIATIONS,
  STRUCTURE_FACULTIES,
  STRUCTURE_GOVERNANCE,
  STRUCTURE_GROUPS,
  STRUCTURE_INSTITUTES,
} from '~/utils/structure'

definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()
const { localized } = useLocalizedField()

useHead({
  title: () => t('nav.links.structure'),
  meta: [{ name: 'description', content: () => t('university.structure.subtitle') }],
})

const unitSections = computed(() => [
  { titleKey: 'university.structure.institutesTitle', units: STRUCTURE_INSTITUTES },
  { titleKey: 'university.structure.facultiesTitle', units: STRUCTURE_FACULTIES },
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
      <p class="mt-3 text-body-sm text-text-muted">
        {{ t('university.structure.asOf') }}
      </p>
    </div>

    <!-- Collegiate governing bodies -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-8 lg:pb-12">
      <h2 class="font-playfair text-xl font-bold text-navy mb-6">
        {{ localized(STRUCTURE_GOVERNANCE, 'name') }}
      </h2>
      <SharedStructureItemList :items="STRUCTURE_GOVERNANCE.items" />
    </div>

    <!-- Administration -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-8 lg:pb-12">
      <h2 class="font-playfair text-xl font-bold text-navy">
        {{ t('university.structure.administrationTitle') }}
      </h2>
      <p class="mt-1 text-body-sm text-text-muted">
        {{ t('university.structure.administrationAddress') }}
      </p>
      <SharedLeadershipBoard class="mt-6" />
      <NuxtLink
        :to="localePath('/university/rectorate')"
        class="mt-6 inline-flex items-center gap-2 text-navy font-medium hover:underline"
      >
        {{ t('university.structure.administrationLink') }}
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>

    <!-- Institutes and faculties: one card per unit, each with its own page -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-8 lg:pb-12 flex flex-col gap-12">
      <section v-for="section in unitSections" :key="section.titleKey">
        <h2 class="font-playfair text-xl font-bold text-navy mb-6">
          {{ t(section.titleKey) }}
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article
            v-for="unit in section.units"
            :key="unit.name"
            class="bg-off-white border border-border rounded-16 p-6 border-l-4 border-l-gold flex flex-col"
          >
            <h3 class="font-playfair text-lg font-semibold text-navy">
              <a
                v-if="unit.external"
                :href="unit.external"
                target="_blank"
                rel="noopener noreferrer"
                class="text-navy no-underline hover:text-gold transition-colors duration-280"
              >
                {{ localized(unit, 'name') }}
                <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
              </a>
              <NuxtLink
                v-else-if="unit.slug"
                :to="localePath(`/university/structure/${unit.slug}`)"
                class="text-navy no-underline hover:text-gold transition-colors duration-280"
              >
                {{ localized(unit, 'name') }}
              </NuxtLink>
              <template v-else>{{ localized(unit, 'name') }}</template>
            </h3>
            <p v-if="localized(unit, 'summary')" class="mt-2 text-body-sm text-text-muted">
              {{ localized(unit, 'summary') }}
            </p>
            <p class="mt-2 text-body-sm text-text-muted">
              {{ countStructureItems(unit) }} {{ t('university.structure.subdivisionsCount') }}
            </p>

            <!-- External unit: subdivisions accordion only (title links out) -->
            <details v-if="unit.external && unit.items.length" class="group mt-4">
              <summary
                class="flex items-center gap-2 cursor-pointer list-none select-none text-body-sm font-medium text-navy"
              >
                {{ t('university.structure.subdivisionsTitle') }}
                <svg
                  class="w-4 h-4 text-text-muted transition-transform group-open:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <SharedStructureItemList class="mt-3" :items="unit.items" />
            </details>
          </article>
        </div>
      </section>
    </div>

    <!-- Administrative subdivisions, grouped by supervising member of the rectorate -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-8 lg:pb-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-2">
        {{ t('university.structure.administrativeTitle') }}
      </h2>
      <p class="text-body-sm text-text-muted mb-8 max-w-3xl">
        {{ t('university.structure.administrativeNote') }}
      </p>
      <div class="flex flex-col gap-10">
        <section v-for="group in STRUCTURE_GROUPS" :key="group.id" class="flex flex-col gap-4">
          <h3 class="font-playfair text-lg font-semibold text-navy">
            {{ localized(group, 'name') }}
          </h3>
          <SharedStructureItemList :items="group.items" />
        </section>
      </div>
    </div>

    <!-- «Skovoroda associations» -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16 flex flex-col gap-10">
      <div>
        <h2 class="font-playfair text-2xl font-bold text-navy mb-2">
          {{ t('university.structure.associationsTitle') }}
        </h2>
        <p class="text-body-sm text-text-muted max-w-3xl">
          {{ t('university.structure.associationsNote') }}
        </p>
      </div>
      <section v-for="group in STRUCTURE_ASSOCIATIONS" :key="group.id" class="flex flex-col gap-4">
        <h3 class="font-playfair text-lg font-semibold text-navy">
          {{ localized(group, 'name') }}
        </h3>
        <SharedStructureItemList :items="group.items" />
      </section>

      <!-- Link to the faculties & departments overview -->
      <div class="pt-8 border-t border-border">
        <NuxtLink
          :to="localePath(t('university.structure.linkToFacultiesUrl'))"
          class="inline-flex items-center gap-2 text-navy font-medium hover:underline"
        >
          {{ t('university.structure.linkToFaculties') }}
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
