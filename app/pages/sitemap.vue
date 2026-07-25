<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()
const { items } = useNavigation()
const { localized } = useLocalizedField()

useSeoMeta({
  title: () => t('seo.sitemap.title'),
  description: () => t('seo.sitemap.description'),
})

interface FlatNavLink {
  path: string
  labelKey: string
  external?: boolean
}

interface NavSection {
  titleKey: string
  links: FlatNavLink[]
}

const navSections = computed((): NavSection[] => {
  const sections: NavSection[] = []
  for (const item of items) {
    const links: FlatNavLink[] = []

    if (item.columns) {
      for (const column of item.columns) {
        for (const link of column.links) {
          links.push({ path: link.path, labelKey: link.key, external: link.external })
        }
      }
    }

    if (item.path && item.columns?.length) {
      links.unshift({ path: item.path, labelKey: item.labelKey, external: item.external })
    } else if (item.path && !item.columns?.length) {
      links.push({ path: item.path, labelKey: item.labelKey, external: item.external })
    }

    if (links.length > 0) {
      sections.push({ titleKey: item.labelKey, links })
    }
  }
  return sections
})

/**
 * Institute / faculty pages under /university/structure. They are not in the
 * mega menu (it would double its height), so the sitemap lists them explicitly;
 * units that run their own site are linked outward, exactly as on the hub page.
 */
const structureUnits = computed(() =>
  STRUCTURE_UNITS.map((unit) => ({
    name: localized(unit, 'name'),
    path: unit.external ?? `/university/structure/${unit.slug}`,
    external: Boolean(unit.external),
  })),
)

const serviceLinks: FlatNavLink[] = [
  { path: '/privacy', labelKey: 'footer.privacy' },
  { path: '/accessibility', labelKey: 'footer.accessibility' },
  { path: '/feedback', labelKey: 'utility.feedback' },
  { path: MEMORIAL_EXTERNAL_URL, labelKey: 'nav.links.memorial', external: true },
  { path: '/admissions/ask', labelKey: 'nav.admissions.ask' },
  { path: '/admissions/edebo', labelKey: 'nav.admissions.edebo' },
  { path: '/login', labelKey: 'auth.headerLogin' },
]
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('standalonePages.sitemap.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('standalonePages.sitemap.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('standalonePages.sitemap.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
      <section v-for="section in navSections" :key="section.titleKey">
        <h2 class="font-playfair text-xl font-semibold text-navy mb-4 pb-2 border-b border-border">
          {{ t(section.titleKey) }}
        </h2>
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 list-none p-0 m-0">
          <li v-for="link in section.links" :key="`${section.titleKey}-${link.path}`">
            <a
              v-if="link.external"
              :href="link.path"
              target="_blank"
              rel="noopener noreferrer"
              class="text-body-sm text-text-muted hover:text-gold no-underline transition-colors py-1 inline-block"
            >
              {{ t(link.labelKey) }}
            </a>
            <NuxtLink
              v-else
              :to="localePath(link.path)"
              class="text-body-sm text-text-muted hover:text-gold no-underline transition-colors py-1 inline-block"
            >
              {{ t(link.labelKey) }}
            </NuxtLink>
          </li>
        </ul>
      </section>

      <section class="border-t border-border pt-12">
        <h2 class="font-playfair text-xl font-semibold text-navy mb-4">
          {{ t('university.structure.title') }}
        </h2>
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 list-none p-0 m-0">
          <li v-for="unit in structureUnits" :key="unit.path">
            <a
              v-if="unit.external"
              :href="unit.path"
              target="_blank"
              rel="noopener noreferrer"
              class="text-body-sm text-text-muted hover:text-gold no-underline transition-colors py-1 inline-block"
            >
              {{ unit.name }}
            </a>
            <NuxtLink
              v-else
              :to="localePath(unit.path)"
              class="text-body-sm text-text-muted hover:text-gold no-underline transition-colors py-1 inline-block"
            >
              {{ unit.name }}
            </NuxtLink>
          </li>
        </ul>
      </section>

      <section class="border-t border-border pt-12">
        <h2 class="font-playfair text-xl font-semibold text-navy mb-4">
          {{ t('standalonePages.sitemap.servicesTitle') }}
        </h2>
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 list-none p-0 m-0">
          <li v-for="link in serviceLinks" :key="`svc-${link.path}`">
            <a
              v-if="link.external"
              :href="link.path"
              target="_blank"
              rel="noopener noreferrer"
              class="text-body-sm text-text-muted hover:text-gold no-underline transition-colors py-1 inline-block"
            >
              {{ t(link.labelKey) }}
            </a>
            <NuxtLink
              v-else
              :to="localePath(link.path)"
              class="text-body-sm text-text-muted hover:text-gold no-underline transition-colors py-1 inline-block"
            >
              {{ t(link.labelKey) }}
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
