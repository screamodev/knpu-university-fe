<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusStudentScheduleDocument } from '~/types/directus'

definePageMeta({ layout: 'default' })

const { t, locale } = useSafeI18nWithRouter()
const { client, assetUrl } = useDirectus()
const { localized } = useLocalizedField()

useHead({
  title: () => t('nav.links.schedule'),
  meta: [{ name: 'description', content: () => t('student.schedule.subtitle') }],
})

type SemesterFilter = 'all' | 'autumn' | 'spring'

const selectedFaculty = ref<string>('all')
const selectedGroup = ref<string>('all')
const selectedSemester = ref<SemesterFilter>('all')

const { data: scheduleDocumentsData, pending } = await useAsyncData('student-schedule-documents', () =>
  client.request(
    readItems('student_schedule_documents', {
      fields: [
        'id',
        'title',
        'titleEn',
        'faculty',
        'facultyEn',
        'groupCode',
        'semester',
        'academicYear',
        'validFrom',
        'validTo',
        { file: ['id', 'title', 'filename_download'] },
      ],
      sort: ['order', '-validFrom'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }),
  ),
)

const scheduleDocuments = computed<DirectusStudentScheduleDocument[]>(() => {
  return (scheduleDocumentsData.value as DirectusStudentScheduleDocument[] | null) ?? []
})

const facultyOptions = computed<string[]>(() => {
  const values = new Set<string>()
  for (const item of scheduleDocuments.value) {
    if (item.faculty) {
      values.add(localized(item, 'faculty'))
    }
  }
  return Array.from(values).sort((a, b) => a.localeCompare(b))
})

const groupOptions = computed<string[]>(() => {
  const values = new Set<string>()
  for (const item of scheduleDocuments.value) {
    if (item.groupCode) {
      values.add(item.groupCode)
    }
  }
  return Array.from(values).sort((a, b) => a.localeCompare(b))
})

const filteredDocuments = computed<DirectusStudentScheduleDocument[]>(() => {
  return scheduleDocuments.value.filter((item) => {
    const localizedFaculty = item.faculty ? localized(item, 'faculty') : null
    const matchFaculty = selectedFaculty.value === 'all' || selectedFaculty.value === localizedFaculty
    const matchGroup = selectedGroup.value === 'all' || selectedGroup.value === item.groupCode
    const matchSemester = selectedSemester.value === 'all' || selectedSemester.value === item.semester
    return matchFaculty && matchGroup && matchSemester
  })
})

function formatDate(value: string | null): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'uk-UA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

function documentValidityLabel(item: DirectusStudentScheduleDocument): string {
  const from = formatDate(item.validFrom)
  const to = formatDate(item.validTo)
  if (from && to) return `${from} - ${to}`
  if (from) return from
  if (to) return to
  return locale.value === 'en' ? 'Validity period not specified' : 'Період дії не вказано'
}

function scheduleFileHref(file: DirectusStudentScheduleDocument['file']): string {
  if (!file) return '#'
  const href = assetUrl(file)
  return href ?? '#'
}

function scheduleFileLabel(file: DirectusStudentScheduleDocument['file']): string {
  if (file && typeof file === 'object') {
    return file.title ?? file.filename_download ?? file.id
  }
  return locale.value === 'en' ? 'Open file' : 'Відкрити файл'
}

function semesterLabel(semester: DirectusStudentScheduleDocument['semester']): string {
  if (semester === 'autumn') return locale.value === 'en' ? 'Autumn semester' : 'Осінній семестр'
  if (semester === 'spring') return locale.value === 'en' ? 'Spring semester' : 'Весняний семестр'
  return locale.value === 'en' ? 'Semester not specified' : 'Семестр не вказано'
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.schedule.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.schedule.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.schedule.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro + schedule documents -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('student.schedule.intro') }}
      </p>

      <!--
        Графік семестрів і канікул — університетський, спільний для всіх груп, тож він стоїть
        над розкладами занять, а не серед них. Читає ту саму секцію документів, що й
        /education/schedule: навчальний відділ публікує графік один раз.
      -->
      <section class="mb-12">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
          {{ t('student.schedule.academicCalendarTitle') }}
        </h2>
        <SharedDocumentList section="education-schedule" />
      </section>

      <section class="bg-off-white rounded-16 border border-border p-6 lg:p-8 mb-10">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label class="flex flex-col gap-2 text-body-sm text-text-muted">
            <span>{{ locale === 'en' ? 'Faculty' : 'Факультет' }}</span>
            <select
              v-model="selectedFaculty"
              class="rounded-12 border border-border bg-white px-3 py-2 text-navy focus:outline-none focus:ring-2 focus:ring-gold/40"
            >
              <option value="all">{{ locale === 'en' ? 'All faculties' : 'Усі факультети' }}</option>
              <option v-for="faculty in facultyOptions" :key="faculty" :value="faculty">
                {{ faculty }}
              </option>
            </select>
          </label>

          <label class="flex flex-col gap-2 text-body-sm text-text-muted">
            <span>{{ locale === 'en' ? 'Group' : 'Група' }}</span>
            <select
              v-model="selectedGroup"
              class="rounded-12 border border-border bg-white px-3 py-2 text-navy focus:outline-none focus:ring-2 focus:ring-gold/40"
            >
              <option value="all">{{ locale === 'en' ? 'All groups' : 'Усі групи' }}</option>
              <option v-for="groupCode in groupOptions" :key="groupCode" :value="groupCode">
                {{ groupCode }}
              </option>
            </select>
          </label>

          <label class="flex flex-col gap-2 text-body-sm text-text-muted">
            <span>{{ locale === 'en' ? 'Semester' : 'Семестр' }}</span>
            <select
              v-model="selectedSemester"
              class="rounded-12 border border-border bg-white px-3 py-2 text-navy focus:outline-none focus:ring-2 focus:ring-gold/40"
            >
              <option value="all">{{ locale === 'en' ? 'All semesters' : 'Усі семестри' }}</option>
              <option value="autumn">{{ locale === 'en' ? 'Autumn' : 'Осінній' }}</option>
              <option value="spring">{{ locale === 'en' ? 'Spring' : 'Весняний' }}</option>
            </select>
          </label>
        </div>
      </section>

      <div v-if="pending" class="space-y-4">
        <div v-for="i in 3" :key="i" class="animate-pulse bg-off-white border border-border rounded-16 p-6">
          <div class="h-4 bg-border rounded w-1/2 mb-3" />
          <div class="h-3 bg-border rounded w-1/3 mb-2" />
          <div class="h-3 bg-border rounded w-1/4" />
        </div>
      </div>

      <div v-else-if="filteredDocuments.length" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <article
          v-for="item in filteredDocuments"
          :key="item.id"
          class="bg-white border border-border rounded-16 p-6 flex flex-col gap-4 transition-all duration-280 hover:border-gold/40"
        >
          <div>
            <h2 class="font-playfair text-xl font-semibold text-navy mb-2">
              {{ localized(item, 'title') }}
            </h2>
            <p class="text-body-sm text-text-muted">
              {{ documentValidityLabel(item) }}
            </p>
          </div>
          <div class="flex flex-wrap gap-2 text-body-sm">
            <span class="inline-flex items-center rounded-8 bg-gold/15 px-2.5 py-1 text-gold font-medium">
              {{ semesterLabel(item.semester) }}
            </span>
            <span v-if="item.groupCode" class="text-text-muted">
              {{ locale === 'en' ? 'Group' : 'Група' }}: {{ item.groupCode }}
            </span>
            <span v-if="item.academicYear" class="text-text-muted">
              {{ locale === 'en' ? 'Academic year' : 'Навчальний рік' }}: {{ item.academicYear }}
            </span>
          </div>
          <div>
            <a
              :href="scheduleFileHref(item.file)"
              class="inline-flex items-center rounded-10 bg-navy px-4 py-2 text-white text-body-sm font-medium no-underline transition-colors duration-280 hover:bg-navy-deep"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ scheduleFileLabel(item.file) }}
            </a>
          </div>
        </article>
      </div>

      <div v-else class="bg-off-white border border-border rounded-16 p-8 text-center text-text-muted">
        {{ locale === 'en' ? 'No active schedule documents found for selected filters.' : 'Для обраних фільтрів активних документів розкладу не знайдено.' }}
      </div>

      <div v-if="scheduleDocuments.length === 0 && !pending" class="bg-off-white border border-border rounded-16 p-8 text-center text-text-muted mt-6">
        {{ locale === 'en' ? 'Schedule documents are not published yet.' : 'Документи розкладу ще не опубліковані.' }}
      </div>
    </div>
  </div>
</template>
