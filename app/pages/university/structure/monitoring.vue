<script setup lang="ts">
/**
 * Відділ моніторингу діяльності університету та досліджень у сфері освіти.
 *
 * У структурі запис вів на /education/monitoring — сторінку анкет, а не підрозділу. Текст двома
 * мовами, положення й фото керівниці надіслав сам відділ; новин і оголошень у нього немає, тож
 * унизу лише переходи на моніторинг і нормативну базу.
 */
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('university.monitoringDepartment.title'),
  meta: [{ name: 'description', content: () => t('university.monitoringDepartment.subtitle') }],
})

const relatedLinks = [
  { path: '/education/monitoring', labelKey: 'nav.links.monitoring' },
  { path: '/university/regulations', labelKey: 'nav.links.regulations' },
  { path: '/university/regulation-drafts', labelKey: 'nav.links.regulationDrafts' },
] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('university.structure.tagDepartment') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.monitoringDepartment.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.monitoringDepartment.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedStaticPageBody slug="monitoring-department" />

      <div class="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <NuxtLink
          v-for="link in relatedLinks"
          :key="link.path"
          :to="localePath(link.path)"
          class="rounded-16 border border-border p-6 no-underline hover:border-gold transition-colors"
        >
          <span class="block font-playfair text-lg font-semibold text-navy">{{ t(link.labelKey) }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
