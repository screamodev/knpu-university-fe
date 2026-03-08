<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, tm } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.facultiesAndDepts'),
  meta: [{ name: 'description', content: () => t('university.faculties.subtitle') }],
})

const facultyIds = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'] as const

function getFacultyDepartments(facultyId: string): string[] {
  const faculty = tm(`university.faculties.facultiesList.${facultyId}`) as Record<string, unknown> | undefined
  if (!faculty || typeof faculty !== 'object') return []
  const depts = faculty.departments
  return Array.isArray(depts) ? depts : []
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
          v-for="id in facultyIds"
          :key="id"
          class="bg-off-white border border-border rounded-16 p-6 lg:p-8 border-l-4 border-l-gold"
        >
          <div class="mb-4">
            <h2 class="font-playfair text-xl font-bold text-navy mb-2">
              {{ t(`university.faculties.facultiesList.${id}.name`) }}
            </h2>
            <p class="text-body-sm text-text-muted">
              {{ t('university.faculties.dean') }}: {{ t(`university.faculties.facultiesList.${id}.dean`) }}
            </p>
            <p class="text-body-sm text-text-muted">
              {{ t(`university.faculties.facultiesList.${id}.departmentsNum`) }} {{ t('university.faculties.departmentsCount') }} ·
              {{ t(`university.faculties.facultiesList.${id}.students`) }} {{ t('university.faculties.studentsCount') }}
            </p>
          </div>
          <ul class="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
            <li
              v-for="(dept, index) in getFacultyDepartments(id)"
              :key="index"
              class="text-body-sm text-text-muted pl-4 border-l-2 border-slate-200"
            >
              {{ dept }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </div>
</template>
