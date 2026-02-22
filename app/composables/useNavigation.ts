export interface NavLink {
  path: string
  key: string
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
            { path: '/university/symbolism', key: 'nav.links.symbolism' },
            { path: '/university/memorial', key: 'nav.links.memorial' },
            { path: '/university/volunteering', key: 'nav.links.volunteering' },
            { path: '/university/gallery', key: 'nav.links.gallery' },
            { path: '/university/newspaper', key: 'nav.links.newspaper' },
          ],
        },
        {
          titleKey: 'nav.university.management',
          links: [
            { path: '/university/rectorate', key: 'nav.links.rectorate' },
            { path: '/university/council', key: 'nav.links.academicCouncil' },
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
            { path: '/university/statute', key: 'nav.links.statute' },
            { path: '/university/public-info', key: 'nav.links.publicInfo' },
            { path: '/university/orders', key: 'nav.links.orders' },
            { path: '/university/financial-reports', key: 'nav.links.financialReports' },
            { path: '/university/prozorro', key: 'nav.links.prozorro' },
          ],
        },
        {
          titleKey: 'nav.university.international',
          links: [
            { path: '/university/erasmus', key: 'nav.links.erasmus' },
            { path: '/university/mobility', key: 'nav.links.mobility' },
            { path: '/university/partners', key: 'nav.links.partners' },
            { path: '/university/inclusive', key: 'nav.links.inclusive' },
            { path: '/university/anticorruption', key: 'nav.links.anticorruption' },
            { path: '/university/integrity', key: 'nav.links.integrity' },
          ],
        },
      ],
    },
    {
      labelKey: 'nav.labels.admissions',
      path: '/admissions',
      minWidth: '860px',
      columns: [
        {
          titleKey: 'nav.admissions.levels',
          links: [
            { path: '/admissions/bachelor', key: 'nav.links.bachelor' },
            { path: '/admissions/master', key: 'nav.links.master' },
            { path: '/admissions/graduate', key: 'nav.links.graduate' },
            { path: '/admissions/second-degree', key: 'nav.links.secondDegree' },
          ],
        },
        {
          titleKey: 'nav.admissions.howTo',
          links: [
            { path: '/admissions/rules', key: 'nav.links.rules' },
            { path: '/admissions/specialties', key: 'nav.links.specialties' },
            { path: '/admissions/creative', key: 'nav.links.creative' },
            { path: '/admissions/budget', key: 'nav.links.budget' },
            { path: '/admissions/exams', key: 'nav.links.exams' },
          ],
        },
        {
          titleKey: 'nav.admissions.support',
          links: [
            { path: '/admissions/tuition', key: 'nav.links.tuition' },
            { path: '/admissions/benefits', key: 'nav.links.benefits' },
            { path: '/admissions/veterans', key: 'nav.links.veterans' },
            { path: '/admissions/inclusive-edu', key: 'nav.links.inclusiveEdu' },
            { path: '/admissions/dormitories', key: 'nav.links.dormitories' },
            { path: '/admissions/scholarships', key: 'nav.links.scholarships' },
          ],
        },
        {
          titleKey: 'nav.admissions.prep',
          links: [
            { path: '/admissions/prep-courses', key: 'nav.links.prepCourses' },
            { path: '/admissions/open-days', key: 'nav.links.openDays' },
            { path: '/admissions/3d-tour', key: 'nav.links.3dTour' },
          ],
        },
      ],
      cta: {
        primaryKey: 'nav.admissions.edebo',
        primaryPath: '/admissions/edebo',
        secondaryKey: 'nav.admissions.ask',
        secondaryPath: '/admissions/ask',
      },
      admissionBlock: {
        tagKey: 'nav.admissions.reception2026',
        dateKey: 'nav.admissions.march1',
        descKey: 'nav.admissions.receptionStart',
      },
    },
    {
      labelKey: 'nav.labels.education',
      minWidth: '720px',
      columns: [
        {
          titleKey: 'nav.education.structure',
          links: [
            { path: '/education/faculties', key: 'nav.links.faculties' },
            { path: '/education/departments', key: 'nav.links.departments' },
            { path: '/education/programs', key: 'nav.links.programs' },
            { path: '/education/curriculum', key: 'nav.links.curriculum' },
            { path: '/education/electives', key: 'nav.links.electives' },
          ],
        },
        {
          titleKey: 'nav.education.quality',
          links: [
            { path: '/education/schedule', key: 'nav.links.processSchedule' },
            { path: '/education/accreditation', key: 'nav.links.accreditation' },
            { path: '/education/quality', key: 'nav.links.qualityCenter' },
            { path: '/education/monitoring', key: 'nav.links.monitoring' },
            { path: '/education/rankings', key: 'nav.links.rankings' },
            { path: '/education/practice', key: 'nav.links.practice' },
          ],
        },
        {
          titleKey: 'nav.education.forms',
          links: [
            { path: '/education/distance', key: 'nav.links.distance' },
            { path: '/education/remote', key: 'nav.links.remote' },
            { path: '/education/dual', key: 'nav.links.dual' },
            { path: '/education/continuing', key: 'nav.links.continuing' },
            { path: '/education/students', key: 'nav.links.studentContingent' },
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
            { path: '/science/directions', key: 'nav.links.directions' },
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
            { path: '/science/journals', key: 'nav.links.journals' },
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
            { path: '/science/defenses', key: 'nav.links.defenses' },
          ],
        },
      ],
    },
    {
      labelKey: 'nav.labels.student',
      minWidth: '800px',
      columns: [
        {
          titleKey: 'nav.student.digital',
          links: [
            { path: '/student/schedule', key: 'nav.links.schedule' },
            { path: '/student/moodle', key: 'nav.links.moodle' },
            { path: '/student/grades', key: 'nav.links.grades' },
            { path: '/student/email', key: 'nav.links.email' },
          ],
        },
        {
          titleKey: 'nav.student.life',
          links: [
            { path: '/student/dormitories', key: 'nav.links.dormitories' },
            { path: '/student/psychology', key: 'nav.links.psychology' },
            { path: '/student/social', key: 'nav.links.social' },
            { path: '/student/canteens', key: 'nav.links.canteens' },
            { path: '/student/medical', key: 'nav.links.medical' },
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
    {
      labelKey: 'nav.memorialPage',
      path: 'https://sites.google.com/hnpu.edu.ua/memorial/',
      external: true,
    },
  ]
  return { items }
}
