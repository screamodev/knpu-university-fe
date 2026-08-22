import {
  ACADEMIC_MOBILITY_EXTERNAL_URL,
  ADMISSION_RULES_2026_URL,
  ADMISSIONS_LEGACY_URL,
  JOURNALS_EXTERNAL_URL,
  WINTER_ADMISSIONS_LEGACY_URL,
} from '~/utils/externalSites'
import { ANTICORRUPTION_EXTERNAL_URL, MEMORIAL_EXTERNAL_URL } from '~/utils/memorialUrl'

export interface NavLink {
  path: string
  key: string
  external?: boolean
}

export interface NavColumn {
  titleKey: string
  links: NavLink[]
}

export interface NavItem {
  labelKey: string
  path?: string
  external?: boolean
  minWidth?: string
  columns?: NavColumn[]
  cta?: { primaryKey: string; primaryPath: string; secondaryKey: string; secondaryPath: string }
  admissionBlock?: { tagKey: string; dateKey: string; descKey: string }
}

export function useNavigation(): { items: NavItem[] } {
  const items: NavItem[] = [
    {
      labelKey: 'nav.labels.university',
      minWidth: '960px',
      columns: [
        {
          titleKey: 'nav.university.about',
          links: [
            { path: '/university/history', key: 'nav.links.history' },
            { path: '/university/mission', key: 'nav.links.mission' },
            // «Символіка університету» struck off the menu by the client; the page stays.
            { path: MEMORIAL_EXTERNAL_URL, key: 'nav.links.memorial', external: true },
            { path: '/university/wartime', key: 'nav.links.wartime' },
            { path: '/university/volunteering', key: 'nav.links.volunteering' },
            { path: '/university/gallery', key: 'nav.links.gallery' },
            { path: '/university/newspaper', key: 'nav.links.newspaper' },
            { path: '/news/announcements', key: 'nav.links.announcements' },
          ],
        },
        {
          titleKey: 'nav.university.management',
          links: [
            { path: '/university/rectorate', key: 'nav.links.rectorate' },
            { path: '/university/council', key: 'nav.links.academicCouncil' },
            { path: '/university/scientific-secretary', key: 'nav.links.scientificSecretary' },
            { path: '/university/supervisory-board', key: 'nav.links.supervisoryBoard' },
            { path: '/university/structure', key: 'nav.links.structure' },
            { path: '/university/faculties', key: 'nav.links.facultiesAndDepts' },
            { path: '/university/press', key: 'nav.links.press' },
            { path: '/university/contacts', key: 'nav.links.contacts' },
          ],
        },
        {
          titleKey: 'nav.university.publicity',
          links: [
            // «Статут і ліцензії» struck off the menu by the client — the licences entry below
            // covers it; the page stays reachable by its address.
            { path: '/university/licenses', key: 'nav.links.licenses' },
            { path: '/university/public-info', key: 'nav.links.publicInfo' },
            { path: '/university/orders', key: 'nav.links.orders' },
            { path: '/university/financial-reports', key: 'nav.links.financialReports' },
            { path: '/university/prozorro', key: 'nav.links.prozorro' },
            { path: '/university/rector-report', key: 'nav.links.rectorReport' },
            { path: '/university/regulations', key: 'nav.links.regulations' },
            { path: '/university/regulation-drafts', key: 'nav.links.regulationDrafts' },
            { path: '/university/facilities', key: 'nav.links.facilities' },
            { path: '/university/vacancies', key: 'nav.links.universityVacancies' },
            { path: '/university/attestation', key: 'nav.links.attestation' },
            { path: '/university/language-exam', key: 'nav.links.languageExam' },
          ],
        },
        {
          titleKey: 'nav.university.international',
          links: [
            { path: '/university/erasmus', key: 'nav.links.erasmus' },
            // Академічна мобільність is run on its own Google Site; the local page was removed.
            { path: ACADEMIC_MOBILITY_EXTERNAL_URL, key: 'nav.links.mobility', external: true },
            { path: '/university/partners', key: 'nav.links.partners' },
            { path: '/university/agreements', key: 'nav.links.agreements' },
            { path: '/university/inclusive', key: 'nav.links.inclusive' },
            { path: ANTICORRUPTION_EXTERNAL_URL, key: 'nav.links.anticorruption', external: true },
            // «Академічна доброчесність» moved to Наука → Наукова діяльність at the client's request.
          ],
        },
      ],
    },
    {
      // Приймальна комісія веде вступ на старому сайті й попросила лишити всю інформацію там,
      // тож розділ «Вступ» тут — це набір посилань на hnpu.edu.ua. Місцеві сторінки
      // (/admissions/*) нікуди не зникли, просто на них більше не веде меню: клієнт просив
      // саме приховати пункти «Освітні рівні», «Підготовка», пільги й стипендії та плашку
      // «Прийом 2026», а не видаляти сторінки.
      labelKey: 'nav.labels.admissions',
      path: ADMISSIONS_LEGACY_URL,
      external: true,
      minWidth: '860px',
      columns: [
        {
          titleKey: 'nav.admissions.howTo',
          links: [
            { path: ADMISSIONS_LEGACY_URL, key: 'nav.links.admissionCommittee', external: true },
            { path: ADMISSION_RULES_2026_URL, key: 'nav.links.rules', external: true },
            { path: ADMISSIONS_LEGACY_URL, key: 'nav.links.admissionResults', external: true },
            { path: '/admissions/archive/2025', key: 'nav.links.admissionArchive' },
            { path: ADMISSIONS_LEGACY_URL, key: 'nav.links.specialties', external: true },
            { path: ADMISSIONS_LEGACY_URL, key: 'nav.links.creative', external: true },
            { path: ADMISSIONS_LEGACY_URL, key: 'nav.links.budget', external: true },
            { path: ADMISSIONS_LEGACY_URL, key: 'nav.links.exams', external: true },
            { path: WINTER_ADMISSIONS_LEGACY_URL, key: 'nav.links.winterAdmission', external: true },
          ],
        },
        {
          titleKey: 'nav.admissions.support',
          links: [
            { path: '/admissions/tuition', key: 'nav.links.tuition' },
            { path: '/admissions/dormitories', key: 'nav.links.dormitories' },
          ],
        },
      ],
      cta: {
        primaryKey: 'nav.admissions.edebo',
        primaryPath: '/admissions/edebo',
        secondaryKey: 'nav.admissions.ask',
        secondaryPath: '/admissions/ask',
      },
    },
    {
      labelKey: 'nav.labels.education',
      minWidth: '720px',
      columns: [
        // Розкладку колонок задав клієнт: «Структура» лишає підрозділи, «Процес та якість»
        // збирає все, що стосується змісту навчання, «Форми навчання» — способи його здобути.
        {
          titleKey: 'nav.education.structure',
          links: [
            { path: '/education/faculties', key: 'nav.links.faculties' },
            { path: '/education/departments', key: 'nav.links.departments' },
            { path: '/education/academic-office', key: 'nav.links.academicOffice' },
            { path: '/education/digital-center', key: 'nav.links.digitalCenter' },
            { path: '/education/quality', key: 'nav.links.qualityCenter' },
          ],
        },
        {
          titleKey: 'nav.education.quality',
          links: [
            { path: '/education/schedule', key: 'nav.links.processSchedule' },
            { path: '/education/programs', key: 'nav.links.programs' },
            { path: '/education/curriculum', key: 'nav.links.curriculum' },
            { path: '/education/students', key: 'nav.links.studentContingent' },
            { path: '/education/electives', key: 'nav.links.electives' },
            { path: '/education/accreditation', key: 'nav.links.accreditation' },
            { path: '/education/monitoring', key: 'nav.links.monitoring' },
            { path: '/education/rankings', key: 'nav.links.rankings' },
          ],
        },
        {
          titleKey: 'nav.education.forms',
          links: [
            { path: '/education/distance', key: 'nav.links.distance' },
            // Distance learning is delivered through Moodle, so the client replaced the
            // «Дистанційне навчання» and «Дуальна освіта» entries with the platform itself.
            // Both pages stay in the app, just unlinked from the menu.
            { path: MOODLE_EXTERNAL_URL, key: 'nav.links.moodle', external: true },
            { path: '/education/continuing', key: 'nav.links.continuing' },
            { path: '/education/practice', key: 'nav.links.practice' },
          ],
        },
      ],
    },
    {
      labelKey: 'nav.labels.science',
      minWidth: '760px',
      columns: [
        {
          titleKey: 'nav.science.activity',
          links: [
            { path: '/science/activity', key: 'nav.links.activity' },
            { path: '/science/directions', key: 'nav.links.directions' },
            { path: '/science/council', key: 'nav.links.scienceCouncil' },
            { path: '/university/integrity', key: 'nav.links.integrity' },
            { path: '/science/plagiarism', key: 'nav.links.plagiarism' },
            { path: '/science/institutes', key: 'nav.links.institutes' },
            { path: '/science/young-scientists', key: 'nav.links.youngScientists' },
            { path: '/science/student-society', key: 'nav.links.studentSociety' },
            { path: '/science/graduate', key: 'nav.links.graduate' },
            { path: '/science/conferences', key: 'nav.links.conferences' },
          ],
        },
        {
          titleKey: 'nav.science.publications',
          links: [
            // Фахові видання are published on a separate OJS site; the local page was removed.
            { path: JOURNALS_EXTERNAL_URL, key: 'nav.links.journals', external: true },
            { path: '/science/collections', key: 'nav.links.collections' },
            { path: '/science/publication-requirements', key: 'nav.links.publicationRequirements' },
            { path: '/science/scopus', key: 'nav.links.scopus' },
            { path: '/science/publishing', key: 'nav.links.publishing' },
          ],
        },
        {
          titleKey: 'nav.science.resources',
          links: [
            { path: '/science/library', key: 'nav.links.library' },
            { path: '/science/catalog', key: 'nav.links.catalog' },
            { path: '/science/repository', key: 'nav.links.repository' },
            { path: '/science/boards', key: 'nav.links.boards' },
            { path: '/science/dissertation-councils', key: 'nav.links.dissertationCouncils' },
            { path: '/science/candidate-support', key: 'nav.links.candidateSupport' },
            // «Захисти дисертацій» withdrawn by the client: the announcements live on the
            // разові ради pages, so the separate page is neither linked nor published.
          ],
        },
      ],
    },
    {
      labelKey: 'nav.labels.student',
      minWidth: '800px',
      columns: [
        {
          // The client struck Moodle, АСУ НЗ / Е-відомості and corporate mail off this column.
          titleKey: 'nav.student.digital',
          links: [
            { path: '/student/schedule', key: 'nav.links.schedule' },
          ],
        },
        {
          // Canteens and medical services struck off as well.
          titleKey: 'nav.student.life',
          links: [
            { path: '/student/dormitories', key: 'nav.links.dormitories' },
            { path: '/student/psychology', key: 'nav.links.psychology' },
            { path: '/student/social', key: 'nav.links.social' },
          ],
        },
        {
          titleKey: 'nav.student.gov',
          links: [
            { path: '/student/council', key: 'nav.links.studentCouncil' },
            { path: '/student/union', key: 'nav.links.union' },
            { path: '/student/sports', key: 'nav.links.sports' },
            { path: '/student/arts', key: 'nav.links.arts' },
          ],
        },
        {
          titleKey: 'nav.student.career',
          links: [
            { path: '/student/career', key: 'nav.links.career' },
            { path: '/student/vacancies', key: 'nav.links.vacancies' },
            { path: '/student/alumni', key: 'nav.links.alumni' },
            { path: '/student/nonformal', key: 'nav.links.nonformal' },
            { path: '/student/veterans-center', key: 'nav.links.veteransCenter' },
          ],
        },
      ],
    },
    // {
    //   labelKey: 'nav.memorialPage',
    //   path: 'https://sites.google.com/KhNPU.edu.ua/memorial/',
    //   external: true,
    // },
  ]
  return { items }
}
