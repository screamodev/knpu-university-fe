<script setup lang="ts">
import { readItems } from '@directus/sdk'

definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()
const { client } = useDirectus()
const { localized } = useLocalizedField()

useHead({
  title: () => t('nav.links.facultiesAndDepts'),
  meta: [{ name: 'description', content: () => t('university.faculties.subtitle') }],
})

const { data: facultiesData } = await useAsyncData('faculties-list', () =>
  client.request(
    readItems('faculties', {
      fields: [
        'id',
        'name',
        'nameEn',
        'dean',
        'deanEn',
        'departmentsCount',
        'studentsCount',
        'order',
        { departments: ['id', 'name', 'nameEn', 'order'] },
      ],
      sort: ['order'],
      filter: { status: { _eq: 'published' } },
      deep: {
        departments: {
          _sort: ['order'],
        },
      },
    }),
  ),
)

const faculties = computed(() => facultiesData.value ?? [])
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

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('university.faculties.intro') }}
      </p>
    </div>

    <!-- Faculty cards: bg-off-white, gold left border, department list -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div class="flex flex-col gap-6">
        <article
          v-for="faculty in faculties"
          :key="faculty.id"
          class="bg-off-white border border-border rounded-16 p-6 lg:p-8 border-l-4 border-l-gold"
        >
          <div class="mb-4">
            <h2 class="font-playfair text-xl font-bold text-navy mb-2">
              {{ localized(faculty, 'name') }}
            </h2>
            <p v-if="localized(faculty, 'dean')" class="text-body-sm text-text-muted">
              {{ t('university.faculties.dean') }}: {{ localized(faculty, 'dean') }}
            </p>
            <p class="text-body-sm text-text-muted">
              {{ faculty.departmentsCount }} {{ t('university.faculties.departmentsCount') }} ·
              {{ faculty.studentsCount }} {{ t('university.faculties.studentsCount') }}
            </p>
          </div>
          <ul v-if="faculty.departments?.length" class="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
            <li
              v-for="department in faculty.departments"
              :key="department.id"
              class="text-body-sm text-text-muted pl-4 border-l-2 border-slate-200"
            >
              {{ localized(department, 'name') }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </div>
</template>
