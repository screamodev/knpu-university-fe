<script setup lang="ts">
import { countStructureItems, STRUCTURE_FACULTIES, STRUCTURE_INSTITUTES } from '~/utils/structure'

definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()
const { localized } = useLocalizedField()

useHead({
  title: () => t('nav.links.faculties'),
  meta: [{ name: 'description', content: () => t('education.faculties.subtitle') }],
})

/**
 * Institutes first, then faculties — same order and same source of truth as
 * /university/structure, so the two pages cannot drift apart.
 */
const sections = computed(() => [
  { titleKey: 'university.structure.institutesTitle', units: STRUCTURE_INSTITUTES },
  { titleKey: 'university.structure.facultiesTitle', units: STRUCTURE_FACULTIES },
])
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.faculties.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.faculties.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.faculties.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Intro -->
      <p class="text-body text-text-muted max-w-3xl mb-4">
        {{ t('education.faculties.intro') }}
      </p>
      <p class="text-body-sm text-text-muted mb-12">
        {{ t('university.structure.asOf') }}
      </p>

      <div class="flex flex-col gap-12">
        <section v-for="section in sections" :key="section.titleKey">
          <h2 class="font-playfair text-xl font-bold text-navy mb-6">
            {{ t(section.titleKey) }}
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- No cover art exists for the units, so the card is text-only: an empty
                 4:3 placeholder was most of the card's height and said nothing. -->
            <article
              v-for="unit in section.units"
              :key="unit.name"
              class="bg-white border border-border border-t-4 border-t-gold rounded-14 overflow-hidden flex flex-col transition-all duration-280 hover:border-gold/40 hover:shadow-gold"
            >
              <div class="p-5 flex flex-col flex-1">
                <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
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
                <p class="text-body-sm text-text-muted mb-3">
                  {{ countStructureItems(unit) }} {{ t('university.structure.subdivisionsCount') }}
                </p>
                <p v-if="localized(unit, 'summary')" class="text-body-sm text-text-muted">
                  {{ localized(unit, 'summary') }}
                </p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
