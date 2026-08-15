/**
 * Sections of the generic `documents` collection.
 *
 * One collection backs every "list of documents" page in the «Відвідувачу» area, so adding
 * another such page is a route plus an entry here — no new collection, no new query.
 *
 * The ids must match the `section` choices in Directus; see
 * `knpu-university-be/snapshots/schema.yaml` (collection `documents`).
 */
export const DOCUMENT_SECTIONS = [
  'rector-report',
  'regulations',
  'regulation-drafts',
  'facilities',
  'vacancies',
  'attestation',
  'procurement-info',
  'financial-activity',
  'inclusive-support',
  'student-council',
  'postgraduate-regulations',
  'licenses',
  'awards',
  'academic-office',
  'education-schedule',
  'scientific-secretary',
  'specialized-councils',
  'quality-centre',
  'quality-centre-programmes',
  'digital-center',
  'admissions-committee',
  // Вступна кампанія: the lists the admissions office has to publish each year.
  'tuition',
  'admissions-programmes',
  'admissions-rating-lists',
  'admissions-recommendations',
  'admissions-enrolment-orders',
  'monitoring',
  'science-schools',
  'contacts',
  'academic-council-decisions',
  'candidate-support',
  'science-council',
  'science-events',
] as const

export type DocumentSection = (typeof DOCUMENT_SECTIONS)[number]

export function isDocumentSection(value: string): value is DocumentSection {
  return (DOCUMENT_SECTIONS as readonly string[]).includes(value)
}
