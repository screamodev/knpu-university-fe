<script setup lang="ts">
/** Архів однієї вступної кампанії: перелік її сторінок, перенесених зі старого сайту. */
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()
const route = useRoute()

const year = computed(() => String(route.params.year ?? ''))
const archive = computed(() => ADMISSIONS_ARCHIVES.find(entry => entry.year === year.value))

if (!archive.value) {
  throw createError({ statusCode: 404, statusMessage: 'Archive not found', fatal: true })
}

useHead({
  title: () => t('admissions.section.archiveTitle', { year: year.value }),
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('admissions.section.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.section.archiveTitle', { year }) }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('admissions.section.archiveSubtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0 m-0">
        <li v-for="page in archive?.pages ?? []" :key="page.slug">
          <NuxtLink
            :to="localePath(`/admissions/info/${page.slug}`)"
            class="group flex items-start gap-3 h-full rounded-12 border border-border bg-white px-5 py-4 no-underline transition-colors duration-280 hover:border-gold"
          >
            <span class="w-2 h-2 rounded-full bg-gold shrink-0 mt-2" aria-hidden />
            <span class="flex-1 text-body text-navy">{{ page.title }}</span>
          </NuxtLink>
        </li>
      </ul>

      <div class="mt-12 flex flex-wrap gap-6">
        <NuxtLink
          :to="localePath('/admissions/committee')"
          class="inline-flex items-center gap-2 text-navy font-medium hover:underline"
        >
          {{ t('admissions.section.backToCommittee') }}
        </NuxtLink>
        <NuxtLink
          v-for="other in ADMISSIONS_ARCHIVES.filter(entry => entry.year !== year)"
          :key="other.year"
          :to="localePath(`/admissions/archive/${other.year}`)"
          class="text-body-sm text-text-muted hover:text-gold"
        >
          {{ other.year }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
