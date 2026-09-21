import {
  ACADEMIC_MOBILITY_EXTERNAL_URL,
  ADMISSION_RULES_2026_URL,
  ADMISSIONS_LEGACY_URL,
  WINTER_ADMISSIONS_LEGACY_URL,
  PSYCHOLOGICAL_SERVICE_URL,
  STUDENT_SCIENTIFIC_SOCIETY_URL,
} from '~/utils/externalSites'
import { PUBLISHING_REGULATION_ASSET } from '~/utils/sciencePages'
import { SCIENCE_UNITS } from '~/utils/scienceUnits'
import { ANTICORRUPTION_EXTERNAL_URL, MEMORIAL_EXTERNAL_URL } from '~/utils/memorialUrl'

export interface NavLink {
  path: string
  /** i18n key of the label; a link built from data carries `label` instead. */
  key?: string
  label?: { uk: string; en?: string }
  external?: boolean
  /** A file from the Directus media library (`/assets/<id>`), opened on the admin host. */
  asset?: boolean
  /** Second-level list, shown beside the link on hover (desktop) — «НДІ, центри, лабораторії». */
  children?: NavLink[]
}

export interface NavColumn {
  titleKey: string
  /** Makes the column heading itself a link — the «Наука» columns are subdivisions with pages. */
  titlePath?: string
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
            // «У час війни» struck off the menu by the client; the page stays at its address.
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
            { path: '/education/monitoring', key: 'nav.links.monitoring' },
            // «Пресцентр (для ЗМІ)» struck off the menu by the client; the page stays.
            // Три записи, які клієнт переніс сюди 07.09: інклюзія й антикорупція з
            // «Міжнародної діяльності», центр ветеранів — зі «Студентства».
            { path: '/university/inclusive', key: 'nav.links.inclusive' },
            { path: ANTICORRUPTION_EXTERNAL_URL, key: 'nav.links.anticorruption', external: true },
            { path: '/student/veterans-center', key: 'nav.links.veteransCenter' },
            { path: '/university/structure/mental-health-centre', key: 'nav.links.mentalHealthCentre' },
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
            { path: '/university/extra-services', key: 'nav.links.extraServices' },
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
            // «Програми Erasmus+» знято з меню (правка 10.09); сторінка лишається за адресою.
            // Академічна мобільність is run on its own Google Site; the local page was removed.
            { path: ACADEMIC_MOBILITY_EXTERNAL_URL, key: 'nav.links.mobility', external: true },
            { path: '/university/partners', key: 'nav.links.partners' },
            { path: '/university/agreements', key: 'nav.links.agreements' },
            // «Інклюзивний простір» і «Антикорупція» переїхали до «Управління» — вони не про
            // міжнародну діяльність.
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
      // Дві колонки замість трьох — панель звузилася, щоб не лишалося порожнього поля.
      minWidth: '520px',
      columns: [
        // Розкладку колонок задав клієнт: «Структура» лишає підрозділи, «Процес та якість»
        // збирає все, що стосується змісту й організації навчання.
        {
          titleKey: 'nav.education.structure',
          links: [
            { path: '/education/faculties', key: 'nav.links.faculties' },
            { path: '/education/departments', key: 'nav.links.departments' },
            { path: '/education/academic-office', key: 'nav.links.academicOffice' },
            { path: '/education/digital-center', key: 'nav.links.digitalCenter' },
            { path: '/education/quality', key: 'nav.links.qualityCenter' },
            // Сторінка центру з'явилася правками 16.09; посилання просили саме сюди.
            { path: '/university/structure/teacher-competence-centre', key: 'nav.links.teacherCompetenceCentre' },
          ],
        },
        {
          titleKey: 'nav.education.quality',
          links: [
            { path: '/education/schedule', key: 'nav.links.processSchedule' },
            { path: '/education/programs', key: 'nav.links.programs' },
            // «Навчальні плани» struck off the menu by the client; the page stays.
            { path: '/education/students', key: 'nav.links.studentContingent' },
            { path: '/education/quality?tab=students', key: 'nav.links.electives' },
            { path: '/education/accreditation', key: 'nav.links.accreditation' },
            { path: '/education/monitoring', key: 'nav.links.monitoring' },
            // «Рейтинги» struck off the menu by the client; the page stays.
            // Колонки «Форми навчання» більше немає (правка 08.09): «Заочна форма» знята з
            // меню, а Moodle і практична підготовка переїхали сюди — це не окремі форми
            // навчання, а частина процесу. Сторінка /education/distance лишається за адресою.
            { path: MOODLE_EXTERNAL_URL, key: 'nav.links.moodle', external: true },
            { path: '/education/practice', key: 'nav.links.practice' },
          ],
        },
      ],
    },
    {
      labelKey: 'nav.labels.science',
      minWidth: '1180px',
      // Меню «Наука» за схемою з правок 16.09 (п. 2): п'ять колонок — підрозділи, кожен зі своїми
      // сторінками. Жовті пункти схеми — сторінки старого сайту, перенесені сюди
      // (`~/utils/sciencePages`), зелені — зовнішні сайти, світло-блакитні — нові сторінки.
      columns: [
        {
          titleKey: 'nav.links.graduate',
          titlePath: '/university/structure/postgraduate',
          links: [
            { path: '/university/structure/postgraduate/admission', key: 'nav.links.pgAdmission' },
            { path: '/university/structure/postgraduate/students', key: 'nav.links.pgStudents' },
            { path: '/university/structure/postgraduate/doctoral', key: 'nav.links.pgDoctoral' },
            { path: '/university/structure/postgraduate/regulations', key: 'nav.links.pgRegulations' },
            { path: '/university/structure/postgraduate/news', key: 'nav.links.pgNews' },
            { path: '/university/structure/postgraduate/announcements', key: 'nav.links.announcements' },
          ],
        },
        {
          titleKey: 'nav.links.scientificSecretary',
          titlePath: '/university/scientific-secretary',
          links: [
            { path: '/university/council', key: 'nav.links.academicCouncil' },
            { path: '/science/boards', key: 'nav.links.boards' },
            { path: '/science/dissertation-councils', key: 'nav.links.dissertationCouncils' },
            { path: '/science/candidate-support', key: 'nav.links.candidateSupport' },
          ],
        },
        {
          titleKey: 'nav.links.library',
          titlePath: '/science/library',
          links: [
            { path: 'https://dspace.hnpu.edu.ua/', key: 'nav.links.repositoryShort', external: true },
            { path: 'https://sites.google.com/hnpu.edu.ua/akdob/', key: 'nav.links.integrity', external: true },
            { path: '/science/bibliographic-indexes', key: 'nav.links.bibliographicIndexes' },
            { path: '/science/notable-scientists', key: 'nav.links.notableScientists' },
            { path: '/science/inexhaustible-treasure', key: 'nav.links.inexhaustibleTreasure' },
            { path: '/science/library-projects', key: 'nav.links.libraryProjects' },
            { path: 'https://library.hnpu.edu.ua/%D0%9F%D1%80%D0%BE%D1%84%D1%96%D0%BB%D1%96-%D0%BD%D0%B0%D1%83%D0%BA%D0%BE%D0%B2%D1%86%D1%96%D0%B2/', key: 'nav.links.scientistProfiles', external: true },
            { path: '/science/scientometric-databases', key: 'nav.links.scientometricDatabases' },
          ],
        },
        {
          titleKey: 'nav.links.scienceDepartment',
          titlePath: '/science/activity',
          links: [
            { path: '/science/rankings', key: 'nav.links.universityRankings' },
            // «Звіт з науково-дослідної роботи» вів на ту саму сторінку рейтингів — окремого звіту на
            // старому сайті немає. Пункт повернеться, коли відділ дасть посилання (правка 17.09).
            { path: 'https://sites.google.com/hnpu.edu.ua/scienceschools/%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BD%D0%B0', key: 'nav.links.scienceSchools', external: true },
            { path: '/science/conferences', key: 'nav.links.conferences' },
            { path: 'https://docs.google.com/document/d/1Cq1Dk_NUbpmL24siq8eDi0LU0c-RZNay/edit', key: 'nav.links.internationalActivity', external: true },
            { path: ACADEMIC_MOBILITY_EXTERNAL_URL, key: 'nav.links.mobility', external: true },
            { path: '/university/agreements', key: 'nav.links.agreements' },
            { path: '/science/grants', key: 'nav.links.grants' },
            { path: 'https://docs.google.com/document/d/1mtLHulwqWn-40zUcYzTstsd0Ngz1X2D5/edit', key: 'nav.links.departmentResearchTopics', external: true },
            {
              path: '/science/research-units',
              key: 'nav.links.researchUnits',
              children: SCIENCE_UNITS.map(unit => ({
                path: unit.path ?? unit.url ?? '/science/research-units',
                label: { uk: unit.name, en: unit.nameEn },
                external: !unit.path && Boolean(unit.url),
              })),
            },
            { path: '/science/council', key: 'nav.links.scienceCouncil' },
            { path: '/science/young-scientists', key: 'nav.links.youngScientists' },
            { path: STUDENT_SCIENTIFIC_SOCIETY_URL, key: 'nav.links.studentSociety', external: true },
            { path: 'https://nauka.gov.ua/infrastructure/r.LcDEsoM3/', key: 'nav.links.uris', external: true },
          ],
        },
        {
          titleKey: 'nav.links.publishing',
          titlePath: '/science/publishing',
          links: [
            { path: `/assets/${PUBLISHING_REGULATION_ASSET}`, key: 'nav.links.departmentRegulation', asset: true },
            { path: '/science/publishing-about', key: 'nav.links.aboutDepartment' },
            { path: '/science/publishing', key: 'nav.links.departmentStaff' },
            { path: '/science/publishing-regulations', key: 'nav.links.pgRegulations' },
            { path: 'https://docs.google.com/document/d/1kFCCAmCKAlEnBGGmxj4AWV5oQSi3_Cur/edit', key: 'nav.links.professionalJournals', external: true },
            { path: '/science/publication-activity', key: 'nav.links.publicationActivity' },
            { path: '/science/publishing-recommendation', key: 'nav.links.publishingRecommendation' },
            { path: '/science/publishing-accompanying', key: 'nav.links.publishingAccompanying' },
            { path: 'https://docs.google.com/document/d/1khEXLCH-KRcw4WYB-ntvSYrvMPZYe6Gr/edit', key: 'nav.links.publishingCouncil', external: true },
            { path: '/science/publishing-useful-links', key: 'nav.links.usefulLinks' },
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
            // «Розклад занять» знято з меню (правка 10.09), натомість тут Moodle: студенти
            // шукають платформу саме в цифрових сервісах. Сторінка розкладу лишається.
            { path: MOODLE_EXTERNAL_URL, key: 'nav.links.moodle', external: true },
            { path: '/education/quality?tab=students', key: 'nav.links.electives' },
          ],
        },
        {
          // Canteens and medical services struck off as well.
          titleKey: 'nav.student.life',
          links: [
            { path: '/admissions/dormitories', key: 'nav.links.dormitories' },
            { path: PSYCHOLOGICAL_SERVICE_URL, key: 'nav.links.psychology', external: true },
            // «Соціальна підтримка» struck off the menu by the client; the page stays.
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
            // «Вакансії та практика» і «Неформальна освіта» struck off the menu by the client;
            // «Центр ветеранського розвитку» переїхав до Університет → Управління. Сторінки лишаються.
            { path: '/student/alumni', key: 'nav.links.alumni' },
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
