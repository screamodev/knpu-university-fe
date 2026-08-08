<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusScienceDirection, DirectusScienceSchool } from '~/types/directus'

/**
 * Напрями наукової та мистецької діяльності.
 *
 * Two sources, one page: the наукові школи listed by the university's own Google site, and the
 * per-department research topics from «Основні напрямки наукової і мистецької діяльності кафедр».
 * The departments list is long (44 кафедр), so it is collapsed per department.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()
const { client } = useDirectus()
const { localized } = useLocalizedField()

useHead({
  title: () => t('nav.links.directions'),
  meta: [{ name: 'description', content: () => t('science.directions.subtitle') }],
})

const { data: schoolsData, pending: schoolsPending } = await useAsyncData('science-schools', () =>
  client.request(
    readItems('science_schools', {
      fields: [
        'id',
        'name',
        'nameEn',
        'leader',
        'founder',
        'externalUrl',
        'order',
        { file: ['id', 'filename_download', 'filesize', 'type'] },
      ],
      sort: ['order'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }),
  ),
)

const { data: directionsData, pending: directionsPending } = await useAsyncData('science-directions', () =>
  client.request(
    readItems('science_directions', {
      fields: ['id', 'department', 'departmentEn', 'topic', 'supervisor', 'order'],
      sort: ['order'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }),
  ),
)

const schools = computed<DirectusScienceSchool[]>(
  () => (schoolsData.value as DirectusScienceSchool[] | null) ?? [],
)

const directions = computed<DirectusScienceDirection[]>(
  () => (directionsData.value as DirectusScienceDirection[] | null) ?? [],
)

/** One group per кафедра, in the order of the source document. */
const departments = computed(() => {
  const groups: { department: string; items: DirectusScienceDirection[] }[] = []
  for (const row of directions.value) {
    const name = localized(row, 'department') || row.department
    let bucket = groups.find(entry => entry.department === name)
    if (!bucket) {
      bucket = { department: name, items: [] }
      groups.push(bucket)
    }
    bucket.items.push(row)
  }
  return groups
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('science.directions.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.directions.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.directions.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('science.directions.intro') }}
      </p>

      <!-- Наукові школи -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-2">
        {{ t('science.directions.schoolsTitle') }}
      </h2>
      <p class="text-body-sm text-text-muted max-w-3xl mb-6">
        {{ t('science.directions.schoolsIntro') }}
      </p>

      <div v-if="schoolsPending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="animate-pulse h-36 rounded-16 border border-border bg-off-white" />
      </div>

      <div v-else-if="schools.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="school in schools"
          :key="school.id"
          class="rounded-16 border border-border p-6 flex flex-col gap-2 hover:border-gold transition-colors"
        >
          <h3 class="font-playfair text-lg font-semibold text-navy">
            {{ localized(school, 'name') }}
          </h3>
          <p v-if="school.leader" class="text-body-sm text-text-muted">
            <span class="font-medium text-navy">{{ t('science.directions.leaderLabel') }}:</span>
            {{ school.leader }}
          </p>
          <p v-if="school.founder" class="text-body-sm text-text-muted">
            <span class="font-medium text-navy">{{ t('science.directions.founderLabel') }}:</span>
            {{ school.founder }}
          </p>
          <a
            v-if="school.externalUrl"
            :href="school.externalUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-body-sm font-medium text-navy underline hover:text-gold mt-auto"
          >
            {{ t('science.directions.schoolLink') }}
            <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
          </a>
        </article>
      </div>

      <SharedSectionPending v-else />

      <h2 class="font-playfair text-2xl font-bold text-navy mt-16 mb-2">
        {{ t('science.directions.schoolsDocumentsTitle') }}
      </h2>
      <SharedDocumentList section="science-schools" />

      <!-- Напрями кафедр -->
      <h2 class="font-playfair text-2xl font-bold text-navy mt-16 mb-2">
        {{ t('science.directions.departmentsTitle') }}
      </h2>
      <p class="text-body-sm text-text-muted max-w-3xl mb-6">
        {{ t('science.directions.departmentsIntro') }}
      </p>

      <div v-if="directionsPending" class="space-y-3">
        <div v-for="i in 5" :key="i" class="animate-pulse h-14 rounded-12 border border-border bg-off-white" />
      </div>

      <div v-else-if="departments.length" class="space-y-3">
        <SharedAccordion
          v-for="(group, index) in departments"
          :key="group.department"
          :title="group.department"
          :hint="`${group.items.length}`"
          :open="index === 0"
        >
          <ul class="list-none p-0 m-0 space-y-3 pt-4">
            <li v-for="item in group.items" :key="item.id" class="flex gap-3">
              <span class="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" aria-hidden="true" />
              <div>
                <p class="text-body text-navy">{{ item.topic }}</p>
                <p v-if="item.supervisor" class="text-body-sm text-text-muted mt-0.5">
                  {{ item.supervisor }}
                </p>
              </div>
            </li>
          </ul>
        </SharedAccordion>
      </div>

      <SharedSectionPending v-else />
    </div>
  </div>
</template>
