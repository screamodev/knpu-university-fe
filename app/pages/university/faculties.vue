<script setup lang="ts">
import { STRUCTURE_FACULTIES, STRUCTURE_INSTITUTES, type StructureUnit } from '~/utils/structure'
import { structureUnitManifest } from '~/utils/structureContent'

definePageMeta({ layout: 'default' })

/**
 * "Факультети та кафедри": every institute and faculty with its head and its full list of
 * subdivisions, on one page.
 *
 * Built from `structure.ts` (the 30.06.2026 chart) and the migrated contact block, not from the
 * Directus `faculties` collection — that collection holds two invented demo rows and no longer
 * matches the official structure.
 */
const { t, localePath } = useSafeI18nWithRouter()
const { localized } = useLocalizedField()

useHead({
  title: () => t('nav.links.facultiesAndDepts'),
  meta: [{ name: 'description', content: () => t('university.faculties.subtitle') }],
})

const sections = computed(() => [
  { titleKey: 'university.structure.institutesTitle', units: STRUCTURE_INSTITUTES },
  { titleKey: 'university.structure.facultiesTitle', units: STRUCTURE_FACULTIES },
])

function headOf(unit: StructureUnit): { name: string; title: string } | null {
  const contacts = unit.slug ? structureUnitManifest(unit.slug)?.contacts : undefined
  const name = contacts ? localized(contacts, 'dean') : ''
  if (!name) return null
  return {
    name,
    title: unit.kind === 'institute'
      ? t('university.structure.unit.directorTitle')
      : t('university.structure.unit.deanTitle'),
  }
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.faculties.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.faculties.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.faculties.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-2">
        {{ t('university.faculties.intro') }}
      </p>
      <p class="text-body-sm text-text-muted mb-12">
        {{ t('university.structure.asOf') }}
      </p>

      <div class="flex flex-col gap-12">
        <section v-for="section in sections" :key="section.titleKey">
          <h2 class="font-playfair text-xl font-bold text-navy mb-6">
            {{ t(section.titleKey) }}
          </h2>

          <div class="flex flex-col gap-6">
            <article
              v-for="unit in section.units"
              :key="unit.name"
              class="bg-off-white border border-border border-l-4 border-l-gold rounded-16 p-6 lg:p-8"
            >
              <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div class="min-w-0">
                  <h3 class="font-playfair text-lg font-bold text-navy">
                    {{ localized(unit, 'name') }}
                  </h3>
                  <p v-if="headOf(unit)" class="text-body-sm text-text-muted mt-1">
                    {{ headOf(unit)!.title }}: {{ headOf(unit)!.name }}
                  </p>
                  <p v-if="localized(unit, 'summary')" class="text-body-sm text-text-muted mt-2 max-w-3xl">
                    {{ localized(unit, 'summary') }}
                  </p>
                </div>

                <a
                  v-if="unit.external"
                  :href="unit.external"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="shrink-0 inline-flex items-center gap-2 text-body-sm text-navy font-medium hover:text-gold transition-colors duration-280"
                >
                  {{ t('university.structure.visitOwnWebsite') }}
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
                    <path d="M7 17L17 7M17 7H8m9 0v9" />
                  </svg>
                </a>
                <NuxtLink
                  v-else-if="unit.slug"
                  :to="localePath(`/university/structure/${unit.slug}`)"
                  class="shrink-0 inline-flex items-center gap-2 text-body-sm text-navy font-medium hover:text-gold transition-colors duration-280"
                >
                  {{ t('university.structure.openUnit') }}
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </NuxtLink>
              </div>

              <ul
                v-if="unit.items.length"
                class="mt-5 pt-5 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-none p-0"
              >
                <li
                  v-for="item in unit.items"
                  :key="item.name"
                  class="text-body-sm text-text-muted pl-4 border-l-2 border-border"
                >
                  <a
                    v-if="item.external"
                    :href="item.external"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-navy no-underline hover:text-gold transition-colors duration-280"
                  >
                    {{ localized(item, 'name') }}
                    <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
                  </a>
                  <template v-else>{{ localized(item, 'name') }}</template>
                </li>
              </ul>
            </article>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
