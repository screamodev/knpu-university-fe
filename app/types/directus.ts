/**
 * Directus collections, files, auth, and rich-text editor JSON (TipTap ↔ API).
 * Consumed by `createDirectus<DirectusSchema>()` in `useDirectus` and app data layers.
 */

import type { DirectusRole, DirectusUser } from '~/types/auth'

// ——— Schema (SDK) —————————————————————————————————————————————————————————

/** Maps Directus collection names to row types for `@directus/sdk`. */
export interface DirectusSchema {
  admission_exam_programs: DirectusAdmissionExamProgram[]
  admission_open_days: DirectusAdmissionOpenDay[]
  articles: DirectusArticle[]
  categories: DirectusCategory[]
  education_schedule_key_dates: DirectusEducationScheduleKeyDate[]
  education_schedule_periods: DirectusEducationSchedulePeriod[]
  events: DirectusEvent[]
  financial_reports: DirectusFinancialReport[]
  gallery_categories: DirectusGalleryCategory[]
  gallery_items: DirectusGalleryItem[]
  memorial_entries: DirectusMemorialEntry[]
  newspaper_issues: DirectusNewspaperIssue[]
  partners: DirectusPartner[]
  programmes: DirectusProgramme[]
  prozorro_procurements: DirectusProzorroProcurement[]
  science_conferences: DirectusScienceConference[]
  science_defenses: DirectusScienceDefense[]
  student_schedule_documents: DirectusStudentScheduleDocument[]
  university_orders: DirectusUniversityOrder[]
  directus_files: DirectusFile[]
  directus_users: DirectusUser[]
  directus_roles: DirectusRole[]
}

// ——— Files ———————————————————————————————————————————————————————————————

/** Subset of Directus `directus_files` fields used by the Nuxt app. */
export interface DirectusFile {
  id: string
  /** Optional resolved public URL (legacy-style or computed `/assets/:id`). */
  url?: string | null
  /** Legacy field name; Directus uses `title` for captions when needed. */
  alternativeText?: string | null
  storage?: string
  filename_disk?: string | null
  filename_download?: string | null
  title?: string | null
  type?: string | null
  folder?: string | null
  uploaded_by?: string | null
  created_on?: string | null
  modified_by?: string | null
  modified_on?: string | null
  charset?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
  duration?: number | null
  description?: string | null
  location?: string | null
  tags?: string | null
  metadata?: Record<string, unknown> | null
  focal_point_x?: number | null
  focal_point_y?: number | null
  tus_id?: string | null
  tus_data?: unknown | null
  uploaded_on?: string | null
}

// ——— Shared enums ——————————————————————————————————————————————————————————

export type ProgrammeLevel = 'bachelor' | 'master' | 'graduate'

export type DirectusContentStatus = 'published' | 'draft' | 'archived'

/** ISO date or datetime returned by Directus for date-like fields. */
export type DirectusDateLike = string

// ——— Rich-text blocks (editor JSON; stored as markdown string or JSON in API) —

/** A single node inside a rich-text block (TipTap / legacy-shaped JSON). */
export interface RichTextBlockChild {
  type: 'text' | 'link'
  text?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  url?: string
  children?: RichTextBlockChild[]
}

export type RichTextBlockTextAlign = 'left' | 'center' | 'right' | 'justify'

/**
 * Minimal image shape used when importing markdown into blocks before a real file id exists.
 * Prefer `DirectusFile` for persisted uploads.
 */
export interface RichTextImageStub {
  id: string
  url: string
  alternativeText?: string | null
  width?: number
  height?: number
}

/** Top-level block in article / programme / event body content. */
export interface RichTextBlock {
  type: 'paragraph' | 'heading' | 'list' | 'list-item' | 'quote' | 'code' | 'image'
  children: RichTextBlockChild[]
  level?: 1 | 2 | 3 | 4 | 5 | 6
  textAlign?: RichTextBlockTextAlign
  format?: 'ordered' | 'unordered'
  /** Inline image: Directus file, markdown stub, or legacy-shaped JSON from the editor. */
  image?: DirectusFile | RichTextImageStub | LegacyImage | null
}

export type LegacyBlock = RichTextBlock
export type LegacyBlockChild = RichTextBlockChild
export type LegacyBlockTextAlign = RichTextBlockTextAlign

/** Legacy `formats.*`; Directus uses transform query params on `/assets/:id`. */
export interface LegacyImageFormat {
  url: string
  width: number
  height: number
}

/**
 * Legacy media shape; new code should use `DirectusFile` and `assetUrl()`.
 */
export interface LegacyImage {
  id: number
  documentId: string
  url: string
  alternativeText: string | null
  width: number
  height: number
  formats: {
    thumbnail?: LegacyImageFormat
    small?: LegacyImageFormat
    medium?: LegacyImageFormat
    large?: LegacyImageFormat
  } | null
}

// ——— Legacy REST wrappers (remove when all list calls use the SDK) ————

export interface LegacyResponse<T> {
  data: T
  meta: Record<string, unknown>
}

export interface LegacyPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface LegacyPaginatedResponse<T> {
  data: T[]
  meta: {
    pagination: LegacyPagination
  }
}

// ——— Collections ———————————————————————————————————————————————————————————

export interface DirectusCategory {
  id: string
  /** Same as `id`; prefer `id` for Directus. */
  documentId?: string
  name: string
  nameEn: string | null
  slug: string
  date_created?: string
  date_updated?: string
}

export interface DirectusArticle {
  id: string
  /** Legacy document id alias; use `id`. */
  documentId?: string
  title: string
  titleEn: string | null
  slug: string
  excerpt: string | null
  excerptEn: string | null
  content: RichTextBlock[] | string | null
  contentEn: RichTextBlock[] | string | null
  /** M2O → `directus_files`; may be unexpanded id string. */
  cover: DirectusFile | string | null
  /** M2M → `directus_files`; expanded or junction rows depending on query. */
  attachments: DirectusFile[] | DirectusArticleAttachmentLink[] | string[] | null
  author: string | null
  date_published: string | null
  /** Legacy field name; use `date_published`. */
  publishedAt?: string
  date_created: string
  /** Legacy field name; use `date_created`. */
  createdAt?: string
  date_updated: string
  /** Legacy field name; use `date_updated`. */
  updatedAt?: string
  /** M2M → `categories` through `articles_categories`; expanded or junction rows. */
  categories: (DirectusCategory | DirectusArticleCategoryLink | string)[] | null
  status?: DirectusContentStatus
}

/** Junction row shape for the `articles_categories` M2M. */
export interface DirectusArticleCategoryLink {
  id?: number
  articles_id?: string
  categories_id?: string | DirectusCategory
}

/** Junction row shape when M2M is queried without deep expansion (optional). */
export interface DirectusArticleAttachmentLink {
  id?: number
  articles_id?: string
  directus_files_id?: string | DirectusFile
}

export interface DirectusProgramme {
  id: string
  slug: string
  title: string
  titleEn: string | null
  level: ProgrammeLevel
  faculty: string | null
  facultyEn: string | null
  description: string | null
  descriptionEn: string | null
  content: RichTextBlock[] | string | null
  contentEn: RichTextBlock[] | string | null
  cover: DirectusFile | string | null
  duration: string | null
  formOfStudy: string | null
  date_published: string | null
  /** Legacy field name; use `date_published`. */
  publishedAt?: string
  date_created?: string
  date_updated?: string
  status?: DirectusContentStatus
}

export interface DirectusEvent {
  id: string
  slug: string
  title: string
  titleEn: string | null
  description: string | null
  descriptionEn: string | null
  content: RichTextBlock[] | string | null
  contentEn: RichTextBlock[] | string | null
  date: string
  endDate: string | null
  location: string | null
  locationEn: string | null
  tag: string | null
  tagEn: string | null
  cover: DirectusFile | string | null
  date_published: string | null
  /** Legacy field name; use `date_published`. */
  publishedAt?: string
  date_created?: string
  date_updated?: string
  status?: DirectusContentStatus
}

export interface DirectusMemorialEntry {
  id: string
  name: string
  nameEn: string | null
  role: string
  roleEn: string | null
  photo: DirectusFile | string | null
  order: number
  status?: DirectusContentStatus
}

export interface DirectusGalleryCategory {
  id: string
  name: string
  nameEn: string | null
  slug: string
  order: number
  status?: DirectusContentStatus
}

export interface DirectusGalleryItem {
  id: string
  title: string
  titleEn: string | null
  image: DirectusFile | string | null
  category: DirectusGalleryCategory | string | null
  order: number
  colSpan: number
  rowSpan: number
  status?: DirectusContentStatus
}

export interface DirectusPartner {
  id: string
  slug: string
  name: string
  nameEn: string | null
  description: string | null
  descriptionEn: string | null
  website: string | null
  logo: DirectusFile | string | null
  country: string | null
  countryEn: string | null
  date_published?: string | null
  date_created?: string
  date_updated?: string
  status?: DirectusContentStatus
}

export type ScheduleSemesterType = 'autumn' | 'spring'
export type EducationSchedulePeriodType = 'study' | 'exam' | 'vacation' | 'internship'
export type ProcurementState = 'completed' | 'active' | 'planned'

export interface DirectusStudentScheduleDocument {
  id: string
  status?: DirectusContentStatus
  title: string
  titleEn: string | null
  faculty: string | null
  facultyEn: string | null
  groupCode: string | null
  semester: ScheduleSemesterType | null
  academicYear: string | null
  validFrom: DirectusDateLike | null
  validTo: DirectusDateLike | null
  file: DirectusFile | string | null
  order: number
}

export interface DirectusEducationSchedulePeriod {
  id: string
  status?: DirectusContentStatus
  name: string
  nameEn: string | null
  semesterType: ScheduleSemesterType
  periodType: EducationSchedulePeriodType
  dateStart: DirectusDateLike
  dateEnd: DirectusDateLike
  academicYear: string | null
  order: number
}

export interface DirectusEducationScheduleKeyDate {
  id: string
  status?: DirectusContentStatus
  event: string
  eventEn: string | null
  dateLabel: string | null
  dateLabelEn: string | null
  academicYear: string | null
  order: number
}

export interface DirectusAdmissionOpenDay {
  id: string
  status?: DirectusContentStatus
  title: string
  titleEn: string | null
  description: string | null
  descriptionEn: string | null
  eventDate: DirectusDateLike
  location: string | null
  locationEn: string | null
  registrationUrl: string | null
  order: number
}

export interface DirectusAdmissionExamProgram {
  id: string
  status?: DirectusContentStatus
  subject: string
  subjectEn: string | null
  level: ProgrammeLevel
  description: string | null
  descriptionEn: string | null
  programmeFile: DirectusFile | string | null
  order: number
}

/** One issue of the university newspaper «Учитель»; the site composes the label itself. */
export interface DirectusNewspaperIssue {
  id: string
  status?: DirectusContentStatus
  /** As printed on the issue: `7`, `8-9`. */
  number: string
  /** Continuous number shown in brackets: `360`, `349-350`. */
  serial: string
  /** First day of the issue's month — drives sorting and the year filter. */
  issueDate: DirectusDateLike
  title: string | null
  titleEn: string | null
  pdfFile: DirectusFile | string | null
  cover: DirectusFile | string | null
  order: number
}

export interface DirectusUniversityOrder {
  id: string
  status?: DirectusContentStatus
  orderNumber: string
  orderDate: DirectusDateLike
  title: string
  titleEn: string | null
  category: string | null
  categoryEn: string | null
  year: number | null
  documentFile: DirectusFile | string | null
  order: number
}

export interface DirectusProzorroProcurement {
  id: string
  status?: DirectusContentStatus
  tenderNumber: string
  title: string
  titleEn: string | null
  amount: number | null
  currency: string | null
  procurementDate: DirectusDateLike | null
  state: ProcurementState
  prozorroUrl: string | null
  order: number
}

export interface DirectusScienceDefense {
  id: string
  status?: DirectusContentStatus
  candidateName: string
  candidateNameEn: string | null
  dissertationTitle: string
  dissertationTitleEn: string | null
  specialty: string | null
  specialtyEn: string | null
  defenseDate: DirectusDateLike
  board: string | null
  boardEn: string | null
  result: string | null
  resultEn: string | null
  isUpcoming: boolean
  order: number
}

export interface DirectusScienceConference {
  id: string
  status?: DirectusContentStatus
  title: string
  titleEn: string | null
  description: string | null
  descriptionEn: string | null
  conferenceType: string | null
  location: string | null
  locationEn: string | null
  eventDate: DirectusDateLike
  isUpcoming: boolean
  participantsSummary: string | null
  participantsSummaryEn: string | null
  order: number
}

export interface DirectusFinancialReport {
  id: string
  status?: DirectusContentStatus
  reportYear: number
  title: string
  titleEn: string | null
  summary: string | null
  summaryEn: string | null
  revenue: number | null
  expenses: number | null
  stateFunding: number | null
  ownRevenue: number | null
  reportFile: DirectusFile | string | null
  order: number
}

export type LegacyProgramme = DirectusProgramme
export type LegacyEvent = DirectusEvent
export type LegacyPartner = DirectusPartner

export type { DirectusRole, DirectusUser }
