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
  gallery_categories: DirectusGalleryCategory[]
  gallery_items: DirectusGalleryItem[]
  memorial_entries: DirectusMemorialEntry[]
  newspaper_issues: DirectusNewspaperIssue[]
  documents: DirectusDocument[]
  monitoring_surveys: DirectusMonitoringSurvey[]
  monitoring_survey_results: DirectusMonitoringSurveyResult[]
  accreditation_certificates: DirectusAccreditationCertificate[]
  accreditation_dossiers: DirectusAccreditationDossier[]
  accreditation_dossier_files: DirectusAccreditationDossierFile[]
  contingent_reports: DirectusContingentReport[]
  cooperation_agreements: DirectusCooperationAgreement[]
  science_schools: DirectusScienceSchool[]
  science_directions: DirectusScienceDirection[]
  student_council_info: DirectusStudentCouncilInfo[]
  student_council_members: DirectusStudentCouncilMember[]
  student_council_sectors: DirectusStudentCouncilSector[]
  partners: DirectusPartner[]
  programmes: DirectusProgramme[]
  prozorro_procurements: DirectusProzorroProcurement[]
  science_conferences: DirectusScienceConference[]
  science_defenses: DirectusScienceDefense[]
  dissertation_councils: DirectusDissertationCouncil[]
  dissertation_council_files: DirectusDissertationCouncilFile[]
  structure_pages: DirectusStructurePage[]
  static_pages: DirectusStaticPage[]
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
  /** Parent category id — a кафедра sits under its faculty. Null for top-level categories. */
  parent?: string | null
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

/** A document on one of the «Відвідувачу» pages; `section` decides which page shows it. */
export interface DirectusDocument {
  id: string
  status?: DirectusContentStatus
  section: string
  title: string
  titleEn: string | null
  description: string | null
  descriptionEn: string | null
  /** Optional subheading the list groups rows under — «Денна форма», «Заочна форма»… */
  group?: string | null
  groupEn?: string | null
  documentDate: DirectusDateLike
  /** Either an uploaded file… */
  file: DirectusFile | string | null
  /** …or a link to the document on another site. */
  externalUrl: string | null
  order: number
}

/**
 * Body of one tab of one structure unit, written by an editor.
 *
 * One row per (`unit_slug`, `tab`). While a tab has no row the site serves the content migrated
 * from the old site out of `app/content/structure/` — see `useStructureTabContent`.
 */
export interface DirectusStructurePage {
  id: string
  status?: DirectusContentStatus
  unit_slug: string
  tab: string
  body: string | null
  bodyEn: string | null
  date_updated: DirectusDateLike
}

/**
 * Body of one standalone page migrated from the old site, written by an editor.
 *
 * One row per `slug`. While a page has no row the site serves the migrated copy out of
 * `app/content/pages/` — see `useStaticPageContent`.
 */
export interface DirectusStaticPage {
  id: string
  status?: DirectusContentStatus
  slug: string
  body: string | null
  bodyEn: string | null
  date_updated: DirectusDateLike
}

/** Освітній рівень, as used by the accreditation collections. */
export type EducationLevel = 'bachelor' | 'master' | 'phd'

/** Напрям діяльності a monitoring survey belongs to; groups the list on /education/monitoring. */
export type MonitoringArea =
  | 'community-synergy'
  | 'educational-ecosystem'
  | 'research-innovation'
  | 'international-partnership'
  | 'youth-policy'
  | 'human-capital'
  | 'infrastructure-safety'
  | 'targeted-surveys'
  /** Anything the client's 2026 re-sort did not name; kept so no survey silently disappears. */
  | 'other'

/** One questionnaire of the university's monitoring programme. */
export interface DirectusMonitoringSurvey {
  id: string
  status?: DirectusContentStatus
  /** As numbered on the legacy page: `2`, `11/1`. */
  number: string | null
  area: MonitoringArea
  title: string
  titleEn: string | null
  researchGroup: string | null
  programmeFile: DirectusFile | string | null
  /** The live Google form, when the survey is still open. */
  formUrl: string | null
  order: number
  results?: DirectusMonitoringSurveyResult[]
}

/** Results of one questionnaire for one year. */
export interface DirectusMonitoringSurveyResult {
  id: string
  status?: DirectusContentStatus
  survey: DirectusMonitoringSurvey | string | null
  /** `2024`, or `2026/2027` for surveys reported per academic year. */
  year: string | null
  file: DirectusFile | string | null
  externalUrl: string | null
  order: number
}

/** Сертифікат про акредитацію освітньої програми або спеціальності. */
export interface DirectusAccreditationCertificate {
  id: string
  status?: DirectusContentStatus
  level: EducationLevel
  /** Галузь знань, e.g. `01 Освіта/Педагогіка`. */
  branch: string | null
  specialtyCode: string | null
  title: string
  titleEn: string | null
  file: DirectusFile | string | null
  externalUrl: string | null
  order: number
}

/** Акредитаційна справа однієї освітньої програми (матеріали НАЗЯВО). */
export interface DirectusAccreditationDossier {
  id: string
  status?: DirectusContentStatus
  academicYear: string | null
  level: EducationLevel | null
  programmeTitle: string
  order: number
  files?: DirectusAccreditationDossierFile[]
}

export type AccreditationDossierKind =
  | 'self-assessment'
  | 'visit-program'
  | 'expert-report'
  | 'ger-conclusion'
  | 'naqa-decision'
  | 'other'

export interface DirectusAccreditationDossierFile {
  id: string
  status?: DirectusContentStatus
  dossier: DirectusAccreditationDossier | string | null
  kind: AccreditationDossierKind
  title: string | null
  file: DirectusFile | string | null
  externalUrl: string | null
  order: number
}

/** Monthly report on the number of students, per form of study. */
export interface DirectusContingentReport {
  id: string
  status?: DirectusContentStatus
  academicYear: string | null
  formOfStudy: 'full-time' | 'part-time'
  reportDate: DirectusDateLike
  title: string
  file: DirectusFile | string | null
  order: number
}

/** Наукова школа університету. */
export interface DirectusScienceSchool {
  id: string
  status?: DirectusContentStatus
  name: string
  nameEn: string | null
  leader: string | null
  founder: string | null
  file: DirectusFile | string | null
  externalUrl: string | null
  order: number
}

/** Напрям наукової або мистецької діяльності однієї кафедри. */
export interface DirectusScienceDirection {
  id: string
  status?: DirectusContentStatus
  department: string
  departmentEn: string | null
  topic: string
  supervisor: string | null
  order: number
}

/**
 * Тексти й контакти сторінки «Студентське самоврядування» — singleton the students edit
 * themselves. Every field may be empty: the page shows a «розділ наповнюється» note instead.
 */
export interface DirectusStudentCouncilInfo {
  id: string | null
  status?: DirectusContentStatus
  about: string | null
  mission: string | null
  objectives: string | null
  /** Абзац про нормативну базу над списком документів. */
  legalBasis: string | null
  emblem: DirectusFile | string | null
  photo: DirectusFile | string | null
  address: string | null
  email: string | null
  trustBoxUrl: string | null
  facebook: string | null
  instagram: string | null
  telegram: string | null
}

/** Which block of the student-government page a person belongs to. */
export type StudentCouncilGroup = 'chair' | 'deputy' | 'faculty-chair' | 'audit'

export interface DirectusStudentCouncilMember {
  id: string
  status?: DirectusContentStatus
  group: StudentCouncilGroup
  name: string
  position: string | null
  /** Set for the heads of the faculty student councils. */
  faculty: string | null
  email: string | null
  photo: DirectusFile | string | null
  profileUrl: string | null
  order: number
}

/** Сектор студентського самоврядування. */
export interface DirectusStudentCouncilSector {
  id: string
  status?: DirectusContentStatus
  name: string
  description: string | null
  leadName: string | null
  leadEmail: string | null
  externalUrl: string | null
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

/** Розділ реєстру угод про співпрацю — одна сторінка на розділ. */
export type AgreementCategory =
  | 'napn'
  | 'universities'
  | 'schools'
  | 'organizations'
  | 'international'

/** One row of the cooperation agreements register (`/university/agreements/<category>`). */
export interface DirectusCooperationAgreement {
  id: string
  status?: DirectusContentStatus
  category: AgreementCategory
  number: string | null
  /** As written in the register: `25.12.2012 р.`, `2017 р.` — not a date column. */
  agreementDate: string | null
  year: number | null
  partner: string
  partnerEn: string | null
  subject: string | null
  subjectEn: string | null
  country: string | null
  countryEn: string | null
  term: string | null
  termEn: string | null
  /** File of the agreement: `/assets/<id>` for our own copy, or the unit's Google Drive link. */
  url: string | null
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

/** Kind of document submitted for a PhD defense; drives the grouping on the council page. */
export type DissertationCouncilFileKind =
  | 'dissertation'
  | 'conclusion'
  | 'supervisor'
  | 'opponent'
  | 'review'
  | 'decision'
  | 'video'
  | 'other'

/**
 * Разова спеціалізована вчена рада — one PhD defense, migrated from the old site.
 *
 * `legacySlug` is both the old path segment and the route on this site: links to these pages are
 * recorded in the state dissertation register, so the slug must never change.
 */
export interface DirectusDissertationCouncil {
  id: string
  status?: DirectusContentStatus
  legacySlug: string
  councilCode: string | null
  candidateName: string
  candidateNameEn: string | null
  dissertationTitle: string | null
  dissertationTitleEn: string | null
  specialty: string | null
  branch: string | null
  defenseDate: DirectusDateLike | null
  defenseTime: string | null
  year: number | null
  contentHtml: string | null
  streamUrl: string | null
  legacyUrl: string | null
  order: number
  files?: DirectusDissertationCouncilFile[]
}

export interface DirectusDissertationCouncilFile {
  id: string
  status?: DirectusContentStatus
  council?: DirectusDissertationCouncil | string | null
  kind: DissertationCouncilFileKind | null
  title: string | null
  /** Either a re-hosted file… */
  file: DirectusFile | string | null
  /** …or a link that stayed where it was (the qualified-signature copies on Google Drive). */
  externalUrl: string | null
  /** Path this document had on the old site — what `legacy_redirects` sends visitors from. */
  legacyPath: string | null
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
  /** Посилання на інформаційний лист. */
  url?: string | null
  order: number
}

export type LegacyProgramme = DirectusProgramme
export type LegacyEvent = DirectusEvent
export type LegacyPartner = DirectusPartner

export type { DirectusRole, DirectusUser }
