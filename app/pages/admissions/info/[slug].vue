<script setup lang="ts">
/**
 * Одна сторінка розділу приймальної комісії, перенесена зі старого сайту.
 *
 * Сторінок 150 — від програм вступних випробувань до наказів про зарахування за 2020–2026 роки,
 * тож замість 150 маршрутів тут один: текст береться з `app/content/pages/<slug>.uk.json`, а
 * назва й місце в дереві — з маніфесту розділу.
 */
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()
const route = useRoute()

const slug = computed(() => String(route.params.slug ?? ''))
const page = computed(() => findAdmissionsPage(slug.value))
const archive = computed(() => admissionsArchiveOf(slug.value))

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useHead({
  title: () => page.value?.title ?? t('nav.links.admissionCommittee'),
  meta: [{ name: 'description', content: () => page.value?.title ?? '' }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ archive
            ? t('admissions.section.archiveTag', { year: archive.year })
            : t('admissions.section.tag') }}
        </div>
        <h1 class="font-playfair text-2xl md:text-3xl font-bold text-white">
          {{ page?.title }}
        </h1>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedStaticPageBody :slug="slug" />

      <div class="mt-12 flex flex-wrap gap-4">
        <NuxtLink
          :to="localePath('/admissions/committee')"
          class="inline-flex items-center gap-2 text-navy font-medium hover:underline"
        >
          {{ t('admissions.section.backToCommittee') }}
        </NuxtLink>
        <NuxtLink
          v-if="archive"
          :to="localePath(`/admissions/archive/${archive.year}`)"
          class="inline-flex items-center gap-2 text-navy font-medium hover:underline"
        >
          {{ t('admissions.section.backToArchive', { year: archive.year }) }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
