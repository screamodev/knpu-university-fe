import type { SearchType } from './types'

/**
 * Which Directus collections the search reads, and how a row becomes a result.
 *
 * This is the one file to touch when a collection is added — everything else in
 * `server/utils/search/` is generic. Collections that are empty today are listed anyway, so they
 * become searchable the moment editors fill them.
 *
 * Deliberately absent: `dissertation_council_files` (1 804 rows whose titles are opponents' names;
 * they would flood results, and the same text is already indexed inside the council's body) and
 * `legacy_redirects` (machine data, no reader ever wants it).
 */

export interface CollectionSource {
  collection: string
  type: SearchType
  /** Title fields; `en` falls back to `uk` when the row has no translation. */
  title: { uk: string; en?: string }
  /**
   * A fixed heading, for singletons that have no title of their own — «Студентське
   * самоврядування» is a page, not a row someone named.
   */
  titleText?: { uk: string; en: string }
  /** Everything else worth matching on. Same fallback rule. */
  body?: { uk: string[]; en?: string[] }
  /** `null` drops the row — used where a row without a slug has nowhere to link. */
  url: (row: Record<string, any>) => string | null
  dateField?: string
  /** `categories` has no status column, so it must not be filtered on one. */
  hasStatus?: boolean
}

export const SEARCH_COLLECTIONS: CollectionSource[] = [
  {
    collection: 'articles',
    type: 'news',
    title: { uk: 'title', en: 'titleEn' },
    body: { uk: ['excerpt', 'content', 'author'], en: ['excerptEn', 'contentEn'] },
    dateField: 'date_published',
    url: row => (row.slug ? `/news/${row.slug}` : null),
  },
  {
    collection: 'dissertation_councils',
    type: 'council',
    title: { uk: 'candidateName', en: 'candidateNameEn' },
    body: {
      uk: ['councilCode', 'dissertationTitle', 'specialty', 'branch', 'contentHtml'],
      en: ['dissertationTitleEn'],
    },
    dateField: 'defenseDate',
    url: row => (row.legacySlug ? `/science/dissertation-councils/${row.legacySlug}` : null),
  },
  {
    collection: 'documents',
    type: 'document',
    title: { uk: 'title', en: 'titleEn' },
    // `section` is an English enum slug («admissions-committee»); it is how the row is routed to a
    // page, not something a reader would ever type.
    body: { uk: ['description'], en: ['descriptionEn'] },
    dateField: 'documentDate',
    // A document row is the file — link straight at it, as `DocumentList` already does.
    url: row => (row.file ? `asset:${row.file}` : row.externalUrl || null),
  },
  {
    collection: 'university_orders',
    type: 'document',
    title: { uk: 'title', en: 'titleEn' },
    body: { uk: ['orderNumber', 'category'], en: ['categoryEn'] },
    dateField: 'orderDate',
    url: () => '/university/orders',
  },
  {
    collection: 'newspaper_issues',
    type: 'document',
    title: { uk: 'title', en: 'titleEn' },
    body: { uk: ['number', 'serial'] },
    url: () => '/university/newspaper',
  },
  {
    collection: 'science_directions',
    type: 'science',
    title: { uk: 'department', en: 'departmentEn' },
    body: { uk: ['topic', 'supervisor'] },
    url: () => '/science/directions',
  },
  {
    collection: 'science_schools',
    type: 'science',
    title: { uk: 'name', en: 'nameEn' },
    body: { uk: ['leader', 'founder'] },
    url: () => '/science/directions',
  },
  {
    collection: 'science_conferences',
    type: 'science',
    title: { uk: 'title', en: 'titleEn' },
    body: {
      uk: ['description', 'location', 'participantsSummary'],
      en: ['descriptionEn', 'locationEn', 'participantsSummaryEn'],
    },
    dateField: 'eventDate',
    url: () => '/science/conferences',
  },
  {
    collection: 'accreditation_certificates',
    type: 'document',
    title: { uk: 'title', en: 'titleEn' },
    body: { uk: ['branch', 'specialtyCode', 'level'] },
    url: () => '/education/accreditation',
  },
  {
    collection: 'accreditation_dossiers',
    type: 'document',
    title: { uk: 'programmeTitle' },
    body: { uk: ['academicYear', 'level'] },
    url: () => '/education/quality',
  },
  {
    collection: 'monitoring_surveys',
    type: 'document',
    title: { uk: 'title', en: 'titleEn' },
    body: { uk: ['number', 'area', 'researchGroup'] },
    url: () => '/education/monitoring',
  },
  {
    collection: 'contingent_reports',
    type: 'document',
    title: { uk: 'title' },
    body: { uk: ['academicYear', 'formOfStudy'] },
    dateField: 'reportDate',
    url: () => '/education/students',
  },
  {
    collection: 'student_schedule_documents',
    type: 'document',
    title: { uk: 'title', en: 'titleEn' },
    body: { uk: ['faculty', 'groupCode'], en: ['facultyEn'] },
    url: () => '/student/schedule',
  },
  {
    collection: 'programmes',
    type: 'programme',
    title: { uk: 'title', en: 'titleEn' },
    body: {
      uk: ['description', 'content', 'faculty', 'duration', 'formOfStudy'],
      en: ['descriptionEn', 'contentEn', 'facultyEn'],
    },
    url: row => (row.slug ? `/programs/${row.slug}` : '/education/programs'),
  },
  {
    collection: 'events',
    type: 'event',
    title: { uk: 'title', en: 'titleEn' },
    body: {
      uk: ['description', 'content', 'location', 'tag'],
      en: ['descriptionEn', 'contentEn', 'locationEn', 'tagEn'],
    },
    dateField: 'eventDate',
    url: row => (row.slug ? `/events/${row.slug}` : '/events'),
  },
  {
    collection: 'admission_open_days',
    type: 'page',
    title: { uk: 'title', en: 'titleEn' },
    body: { uk: ['description', 'location'], en: ['descriptionEn', 'locationEn'] },
    url: () => '/admissions/open-days',
  },
  {
    collection: 'admission_exam_programs',
    type: 'page',
    title: { uk: 'subject', en: 'subjectEn' },
    body: { uk: ['description'], en: ['descriptionEn'] },
    url: () => '/admissions/exams',
  },
  {
    collection: 'vacancies',
    type: 'other',
    title: { uk: 'title', en: 'titleEn' },
    body: { uk: ['description', 'company', 'location'], en: ['descriptionEn'] },
    url: () => '/student/vacancies',
  },
  {
    collection: 'partners',
    type: 'other',
    title: { uk: 'name', en: 'nameEn' },
    body: { uk: ['description', 'country'], en: ['descriptionEn', 'countryEn'] },
    url: () => '/university/partners',
  },
  {
    collection: 'prozorro_procurements',
    type: 'other',
    title: { uk: 'title', en: 'titleEn' },
    body: { uk: ['tenderNumber'] },
    dateField: 'procurementDate',
    url: () => '/university/prozorro',
  },
  {
    collection: 'gallery_items',
    type: 'other',
    title: { uk: 'title', en: 'titleEn' },
    url: () => '/university/gallery',
  },
  {
    collection: 'memorial_entries',
    type: 'other',
    title: { uk: 'name', en: 'nameEn' },
    body: { uk: ['role'], en: ['roleEn'] },
    url: () => '/university/memorial',
  },
  {
    collection: 'student_council_info',
    type: 'page',
    title: { uk: '' },
    titleText: { uk: 'Студентське самоврядування', en: 'Student self-government' },
    body: { uk: ['about', 'mission', 'objectives', 'address'] },
    url: () => '/student/council',
  },
  {
    collection: 'student_council_members',
    type: 'other',
    title: { uk: 'name', en: 'nameEn' },
    body: { uk: ['role', 'faculty'], en: ['roleEn'] },
    url: () => '/student/council',
  },
  {
    collection: 'student_council_sectors',
    type: 'other',
    title: { uk: 'name', en: 'nameEn' },
    body: { uk: ['description'], en: ['descriptionEn'] },
    url: () => '/student/council',
  },
  {
    collection: 'categories',
    type: 'other',
    title: { uk: 'name', en: 'nameEn' },
    hasStatus: false,
    url: row => (row.slug ? `/news?category=${row.slug}` : '/news'),
  },
]
