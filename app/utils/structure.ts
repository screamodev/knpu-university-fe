/**
 * University structure — single source of truth for the /university/structure section.
 *
 * SOURCE
 * ------
 * «Організаційно-структурна схема ХНПУ імені Г.С. Сковороди (станом 30.06.2026)»
 * — the chart published by the university on 30.06.2026, including its appendices:
 *   Додаток 1 institutes / faculties / departments, Додаток 2 museum complex,
 *   Додатки 3–6 «Skovoroda associations» per supervising vice-rector.
 * This supersedes the older chart that the legacy site still displays (which had,
 * for example, Фізико-математичний факультет and a separate faculty of natural,
 * special and health-preserving education).
 *
 * CONVENTIONS
 * -----------
 *  • `name` / `nameEn` — bilingual labels, resolved through `useLocalizedField()`.
 *    Body names use sentence case ("Вчена рада"), never the chart's all-caps.
 *  • `slug`            — the static page under /university/structure/<slug>.
 *                        Units that run their own website have no slug: we link
 *                        out to `external` instead of duplicating their content.
 *  • `external`        — an address on a domain we do not own (own faculty site,
 *                        Google Sites, a separate subdomain). Rendered as an
 *                        outbound link. Legacy pages on hnpu.edu.ua are *not*
 *                        linked: that is the site this one replaces, so such
 *                        subdivisions are listed as plain text until they get
 *                        their own page here. A department that the 30.06.2026
 *                        chart renames or merges also loses its old link — it
 *                        would point at a page describing the former unit.
 */

/** A department, centre, museum or laboratory inside a unit or group. */
export interface StructureItem {
  name: string
  nameEn: string
  /** Own website on an external domain, if any. */
  external?: string
  /** Laboratories, museums and centres attached to the item above. */
  children?: StructureItem[]
}

/** An institute or a faculty. */
export interface StructureUnit {
  /** Route segment under /university/structure. Omitted for units we link out to. */
  slug?: string
  kind: 'institute' | 'faculty'
  name: string
  nameEn: string
  /** Short blurb shown on the unit page hero and on the hub cards. */
  summary?: string
  summaryEn?: string
  /** Own website on an external domain — when set, no page is built for the unit. */
  external?: string
  /**
   * Slug of the Directus category whose articles are the unit's news feed.
   * Defaults to `slug`; set it only when the category slug has to differ.
   */
  newsCategorySlug?: string
  /** Departments, laboratories and centres (Додаток 1). */
  items: StructureItem[]
  /** «Skovoroda associations» attached to this unit (Додаток 6). */
  associations?: StructureItem[]
}

/** A named list of subdivisions — governance bodies, offices, associations. */
export interface StructureGroup {
  id: string
  name: string
  nameEn: string
  /** Optional note rendered under the group heading. */
  note?: string
  noteEn?: string
  items: StructureItem[]
}

// ---------------------------------------------------------------------------
// Додаток 1 — institutes and faculties
// ---------------------------------------------------------------------------

export const STRUCTURE_INSTITUTES: StructureUnit[] = [
  {
    slug: 'ukrainian-philology',
    kind: 'institute',
    name: 'Навчально-науковий інститут української філології імені Г.Ф. Квітки-Основ’яненка',
    nameEn: 'H.F. Kvitka-Osnovianenko Educational and Research Institute of Ukrainian Philology',
    summary:
      'Осередок україністики університету: кафедри української мови, літератури і журналістики, українознавства й лінгводидактики, теорії і практики англійської мови.',
    summaryEn:
      'The university hub of Ukrainian studies: departments of Ukrainian language, literature and journalism, Ukrainian studies and linguodidactics, and English language theory and practice.',
    items: [
      {
        name: 'Кафедра української літератури та журналістики імені професора Леоніда Ушкалова',
        nameEn: 'Professor Leonid Ushkalov Department of Ukrainian Literature and Journalism',
      },
      {
        name: 'Кафедра української мови імені професора Л. А. Лисиченко',
        nameEn: 'Professor L.A. Lysychenko Department of Ukrainian Language',
      },
      {
        name: 'Кафедра українознавства і лінгводидактики імені професора О.Г. Муромцевої',
        nameEn: 'Professor O.H. Muromtseva Department of Ukrainian Studies and Linguodidactics',
      },
      {
        name: 'Кафедра теорії і практики англійської мови та зарубіжної літератури імені професора Михайла Гетманця',
        nameEn:
          'Professor Mykhailo Hetmanets Department of Theory and Practice of the English Language and World Literature',
        external: 'https://sites.google.com/hnpu.edu.ua/kaf-tpel/головна',
      },
    ],
    associations: [
      { name: 'Український культурний центр', nameEn: 'Ukrainian Cultural Centre' },
      {
        name: 'Регіональний центр польської мови, культури і науки',
        nameEn: 'Regional Centre of Polish Language, Culture and Science',
      },
      {
        name: 'Науково-практична лабораторія з методики викладання філологічних дисциплін у закладах освіти',
        nameEn:
          'Research and Practice Laboratory of Methods of Teaching Philological Disciplines in Educational Institutions',
      },
      {
        name: 'Науково-дослідна лабораторія лінгвістичних експертиз',
        nameEn: 'Research Laboratory of Linguistic Examinations',
      },
    ],
  },
  {
    slug: 'special-education',
    kind: 'institute',
    name: 'Навчально-науковий інститут спеціальної освіти та інклюзії',
    nameEn: 'Educational and Research Institute of Special Education and Inclusion',
    summary:
      'Спеціальна педагогіка, корекційна психопедагогіка і біологія разом із навчально-науковими лабораторіями, центрами інклюзії та ментального здоров’я.',
    summaryEn:
      'Special pedagogy, corrective psychopedagogy and biology, together with research laboratories and the centres for inclusion and mental health.',
    items: [
      {
        name: 'Кафедра анатомії і фізіології людини та медичної підготовки імені професора Я.Р. Синельникова',
        nameEn:
          'Professor Ya.R. Synelnykov Department of Human Anatomy, Physiology and Medical Training',
      },
      {
        name: 'Кафедра біології',
        nameEn: 'Department of Biology',
        children: [
          {
            name: 'Навчально-наукова лабораторія біології рукокрилих',
            nameEn: 'Educational and Research Laboratory of Bat Biology',
          },
        ],
      },
      {
        name: 'Кафедра спеціальної педагогіки',
        nameEn: 'Department of Special Pedagogy',
        children: [
          {
            name: 'Навчально-наукова лабораторія спеціальної та інклюзивної освіти',
            nameEn: 'Educational and Research Laboratory of Special and Inclusive Education',
          },
        ],
      },
      {
        name: 'Кафедра корекційної психопедагогіки та здоров’я людини',
        nameEn: 'Department of Corrective Psychopedagogy and Human Health',
      },
    ],
    associations: [
      { name: 'Гербарій CWP', nameEn: 'CWP Herbarium' },
      { name: 'Еколого-біоетичний центр', nameEn: 'Ecological and Bioethical Centre' },
      { name: 'Сковородинівська біологічна школа', nameEn: 'Skovoroda Biological School' },
      { name: 'Центр ментального здоров’я', nameEn: 'Mental Health Centre' },
      { name: 'Центр інклюзивної освіти', nameEn: 'Centre for Inclusive Education' },
      {
        name: 'Кафедра корекційної психопедагогіки та здоров’я людини',
        nameEn: 'Department of Corrective Psychopedagogy and Human Health',
        children: [
          {
            name: 'Центр діагностики та корекції психофізичного розвитку дітей',
            nameEn: 'Centre for Diagnostics and Correction of Children’s Psychophysical Development',
          },
          {
            name: 'Навчально-наукова лабораторія вивчення проблем здоров’я дітей та молоді',
            nameEn: 'Educational and Research Laboratory on Children’s and Youth Health',
          },
        ],
      },
      {
        name: 'Кафедра анатомії і фізіології людини та медичної підготовки імені професора Я.Р. Синельникова',
        nameEn:
          'Professor Ya.R. Synelnykov Department of Human Anatomy, Physiology and Medical Training',
        children: [{ name: 'Музей анатомії', nameEn: 'Museum of Anatomy' }],
      },
    ],
  },
  {
    kind: 'institute',
    name: 'Інститут післядипломної освіти',
    nameEn: 'Institute of Postgraduate Education',
    external: 'http://ipohnpu.in.ua/',
    items: [
      { name: 'Центр карʼєрного зростання', nameEn: 'Career Development Centre' },
      { name: 'Центр освіти дорослих', nameEn: 'Adult Education Centre' },
      {
        name: 'Центр підготовки вчителів початкових класів до проходження сертифікації педагогічних працівників',
        nameEn: 'Centre for Preparing Primary School Teachers for Teacher Certification',
      },
    ],
  },
]

export const STRUCTURE_FACULTIES: StructureUnit[] = [
  {
    slug: 'history-law',
    kind: 'faculty',
    name: 'Факультет історії і права',
    nameEn: 'Faculty of History and Law',
    summary:
      'Історичні та правові кафедри, кафедра суспільно-економічних дисциплін і географії, археологічна лабораторія.',
    summaryEn:
      'Departments of history and law, social and economic disciplines and geography, and the archaeological laboratory.',
    items: [
      { name: 'Кафедра всесвітньої історії', nameEn: 'Department of World History' },
      { name: 'Кафедра історії України', nameEn: 'Department of History of Ukraine' },
      {
        name: 'Кафедра теорії і методики викладання суспільно-правових дисциплін',
        nameEn: 'Department of Theory and Methods of Teaching Social and Legal Disciplines',
      },
      {
        name: 'Кафедра суспільно-економічних дисциплін і географії',
        nameEn: 'Department of Social and Economic Disciplines and Geography',
        external: 'https://sites.google.com/hnpu.edu.ua/kafedra-econom-geografiyi/головна',
      },
      {
        name: 'Кафедра цивільно-правових дисциплін і трудового права імені професора О.І. Процевського',
        nameEn: 'Professor O.I. Protsevskyi Department of Civil Law Disciplines and Labour Law',
        external: 'http://www.hnpu-laws.in.ua/?p=48',
      },
      {
        name: 'Кафедра державно-правових дисциплін, кримінального права та процесу',
        nameEn: 'Department of State Law Disciplines, Criminal Law and Procedure',
        external: 'http://www.hnpu-laws.in.ua/кафедра-державно-правових-дисциплін/',
      },
      {
        name: 'Навчально-наукова археологічна лабораторія',
        nameEn: 'Educational and Research Archaeological Laboratory',
      },
    ],
    associations: [
      {
        name: 'Навчально-методичний центр факультету історії і права',
        nameEn: 'Educational and Methodological Centre of the Faculty of History and Law',
      },
    ],
  },
  {
    slug: 'mathematics-informatics',
    kind: 'faculty',
    name: 'Факультет математики, інформатики і природничої освіти',
    nameEn: 'Faculty of Mathematics, Computer Science and Natural Science Education',
    summary:
      'Математика, інформатика, фізика і хімія, освітологія та інноваційна педагогіка; до складу входить ботанічний сад.',
    summaryEn:
      'Mathematics, computer science, physics and chemistry, educology and innovative pedagogy; the botanical garden is part of the faculty.',
    items: [
      {
        name: 'Кафедра фізики і хімії',
        nameEn: 'Department of Physics and Chemistry',
        external: 'https://sites.google.com/hnpu.edu.ua/kaf-ph-ch',
        children: [
          {
            name: 'Навчальна лабораторія кафедри фізики і хімії',
            nameEn: 'Teaching Laboratory of the Department of Physics and Chemistry',
          },
        ],
      },
      {
        name: 'Кафедра математики',
        nameEn: 'Department of Mathematics',
        external: 'https://sites.google.com/hnpu.edu.ua/kaf-mathematica',
      },
      { name: 'Кафедра інформатики', nameEn: 'Department of Computer Science' },
      {
        name: 'Кафедра освітології та інноваційної педагогіки',
        nameEn: 'Department of Educology and Innovative Pedagogy',
        external: 'https://sites.google.com/hnpu.edu.ua/osvitology-sait/головна-сторінка',
      },
      { name: 'Ботанічний сад', nameEn: 'Botanical Garden' },
    ],
    associations: [
      { name: 'Студентський АРТ-ХАБ', nameEn: 'Student ART-HUB' },
      {
        name: 'Науково-методична лабораторія освіти дорослих та педагогічного проєктування',
        nameEn: 'Scientific and Methodological Laboratory of Adult Education and Pedagogical Design',
      },
      {
        name: 'Науково-методична міждисциплінарна лабораторія з проблем педагогічної та управлінської акмеології',
        nameEn:
          'Interdisciplinary Scientific and Methodological Laboratory on Pedagogical and Managerial Acmeology',
      },
      {
        name: 'Науково-методична лабораторія сучасних методик навчання фізики і хімії',
        nameEn: 'Scientific and Methodological Laboratory of Modern Physics and Chemistry Teaching Methods',
      },
    ],
  },
  {
    slug: 'arts',
    kind: 'faculty',
    name: 'Факультет мистецтв',
    nameEn: 'Faculty of Arts',
    summary: 'Хореографія, музичне та образотворче мистецтво, дизайн і технології.',
    summaryEn: 'Choreography, music and fine arts, design and technologies.',
    items: [
      { name: 'Кафедра хореографії', nameEn: 'Department of Choreography' },
      { name: 'Кафедра музичного мистецтва', nameEn: 'Department of Music Art' },
      { name: 'Кафедра дизайну і технологій', nameEn: 'Department of Design and Technologies' },
      { name: 'Кафедра образотворчого мистецтва', nameEn: 'Department of Fine Arts' },
    ],
    associations: [
      { name: 'Корейський культурно-мистецький центр', nameEn: 'Korean Cultural and Arts Centre' },
    ],
  },
  {
    slug: 'foreign-philology',
    kind: 'faculty',
    name: 'Факультет іноземної філології',
    nameEn: 'Faculty of Foreign Philology',
    summary:
      'Англійська та східні мови, загальне мовознавство і романо-германська філологія, центр методики навчання іноземних мов.',
    summaryEn:
      'English and Oriental languages, general linguistics and Romance-Germanic philology, and the centre for foreign language teaching methods.',
    items: [
      { name: 'Кафедра англійської філології', nameEn: 'Department of English Philology' },
      {
        name: 'Кафедра загального мовознавства і романо-германської філології',
        nameEn: 'Department of General Linguistics and Romance-Germanic Philology',
      },
      {
        name: 'Кафедра практики англійського усного і писемного мовлення',
        nameEn: 'Department of Practice of English Oral and Written Communication',
      },
      { name: 'Кафедра східних мов', nameEn: 'Department of Oriental Languages' },
    ],
    associations: [
      {
        name: 'Центр методики навчання іноземних мов',
        nameEn: 'Centre for Foreign Language Teaching Methods',
      },
    ],
  },
  {
    kind: 'faculty',
    name: 'Факультет початкового навчання',
    nameEn: 'Faculty of Primary Education',
    external: 'https://sites.google.com/hnpu.edu.ua/pochatkove/факультет',
    items: [
      {
        name: 'Кафедра теорії і методики викладання філологічних дисциплін у дошкільній, початковій і спеціальній освіті',
        nameEn:
          'Department of Theory and Methods of Teaching Philological Disciplines in Preschool, Primary and Special Education',
        external:
          'https://sites.google.com/hnpu.edu.ua/pochatkove/факультет/структурні-підрозділи/кафедра-теорії-і-методики-викладання-філологічних-дисциплін-у-дошкільній-п',
      },
      {
        name: 'Кафедра теорії і методики викладання природничо-математичних дисциплін у дошкільній, початковій і спеціальній освіті',
        nameEn:
          'Department of Theory and Methods of Teaching Natural Science and Mathematical Disciplines in Preschool, Primary and Special Education',
        external:
          'https://sites.google.com/hnpu.edu.ua/pochatkove/факультет/структурні-підрозділи/кафедра-теорії-і-методики-викладання-природничо-математичних-дисциплін',
      },
      {
        name: 'Кафедра початкової і професійної освіти',
        nameEn: 'Department of Primary and Vocational Education',
        external:
          'https://sites.google.com/hnpu.edu.ua/pochatkove/факультет/структурні-підрозділи/кафедра-початкової-і-професійної-освіти',
      },
    ],
    associations: [
      {
        name: 'Науково-консультативний центр читання та дитячої книги',
        nameEn: 'Research and Advisory Centre for Reading and Children’s Books',
        external:
          'https://sites.google.com/hnpu.edu.ua/pochatkove/факультет/структурні-підрозділи/науково-консультативний-центр-читання-та-дитячої-книги',
      },
      {
        name: 'Дитячий простір «Kinder HUB»',
        nameEn: '«Kinder HUB» children’s space',
        external:
          'https://sites.google.com/hnpu.edu.ua/pochatkove/факультет/структурні-підрозділи/дитяча-кімната',
      },
      {
        name: 'Лабораторія методичного забезпечення безперервної системної освіти «Школа – ЗВО»',
        nameEn: 'Laboratory of Methodological Support of the «School — University» Continuous Education System',
        external:
          'https://sites.google.com/hnpu.edu.ua/pochatkove/факультет/структурні-підрозділи/лабораторія-методичного-забезпечення-безперервної-системи-освіти-школа-зво',
      },
    ],
  },
  {
    slug: 'preschool',
    kind: 'faculty',
    name: 'Факультет дошкільної освіти',
    nameEn: 'Faculty of Preschool Education',
    summary:
      'Методики дошкільної освіти, педагогічна антропологія та цифрова дидактика з навчальними лабораторіями.',
    summaryEn:
      'Preschool teaching methods, pedagogical anthropology and digital didactics with their teaching laboratories.',
    items: [
      {
        name: 'Кафедра теорії, технологій і методик дошкільної освіти',
        nameEn: 'Department of Theory, Technologies and Methods of Preschool Education',
        external: 'https://sites.google.com/hnpu.edu.ua/hnpu-kafedra-teoriyi-tehnologi/главная-страница',
      },
      {
        name: 'Кафедра психологічної і педагогічної антропології',
        nameEn: 'Department of Psychological and Pedagogical Anthropology',
      },
      {
        name: 'Кафедра технологій дистанційного навчання і цифрової дидактики в дошкільній освіті',
        nameEn:
          'Department of Distance Learning Technologies and Digital Didactics in Preschool Education',
        external: 'https://sites.google.com/hnpu.edu.ua/kaf-it/головна',
        children: [
          {
            name: 'Навчальна лабораторія кафедри технологій дистанційного навчання і цифрової дидактики в дошкільній освіті',
            nameEn:
              'Teaching Laboratory of the Department of Distance Learning Technologies and Digital Didactics in Preschool Education',
            external: 'https://sites.google.com/hnpu.edu.ua/kaf-it/лабораторія',
          },
        ],
      },
    ],
    associations: [
      { name: 'Навчальний центр «Legoland-HUB»', nameEn: '«Legoland-HUB» training centre' },
      {
        name: 'Навчально-наукова лабораторія LEGO-технологій в дошкільній освіті',
        nameEn: 'Educational and Research Laboratory of LEGO Technologies in Preschool Education',
      },
    ],
  },
  {
    slug: 'physical-education',
    kind: 'faculty',
    name: 'Факультет фізичного виховання і спорту',
    nameEn: 'Faculty of Physical Education and Sports',
    summary:
      'Олімпійський і професійний спорт, спортивно-педагогічні дисципліни, лабораторія біомеханіки та лижна база.',
    summaryEn:
      'Olympic and professional sports, sports pedagogy disciplines, the biomechanics laboratory and the ski base.',
    items: [
      {
        name: 'Кафедра теорії, методики і практики фізичного виховання',
        nameEn: 'Department of Theory, Methods and Practice of Physical Education',
      },
      {
        name: 'Кафедра олімпійського і професійного спорту, спортивних ігор та туризму',
        nameEn: 'Department of Olympic and Professional Sports, Sports Games and Tourism',
      },
      {
        name: 'Кафедра спортивно-педагогічних дисциплін і фітнесу',
        nameEn: 'Department of Sports Pedagogy Disciplines and Fitness',
        external: 'https://sites.google.com/hnpu.edu.ua/kaf-spdif/main',
      },
      {
        name: 'Навчально-наукова лабораторія біофізики, біомеханіки та кінезіології',
        nameEn: 'Educational and Research Laboratory of Biophysics, Biomechanics and Kinesiology',
      },
      { name: 'Лижна база', nameEn: 'Ski Base' },
    ],
  },
  {
    slug: 'social-humanities',
    kind: 'faculty',
    name: 'Факультет соціально-гуманітарних наук і соціальних технологій',
    nameEn: 'Faculty of Social and Humanitarian Sciences and Social Technologies',
    summary:
      'Реабілітаційна психологія і психологія розвитку, політологія та соціологія, соціальна робота, менеджмент та економіка, філософія.',
    summaryEn:
      'Rehabilitation psychology and developmental psychology, political science and sociology, social work, management and economics, philosophy.',
    items: [
      { name: 'Кафедра реабілітаційної психології', nameEn: 'Department of Rehabilitation Psychology' },
      { name: 'Кафедра психології розвитку', nameEn: 'Department of Developmental Psychology' },
      {
        name: 'Кафедра політології, соціології і культурології',
        nameEn: 'Department of Political Science, Sociology and Cultural Studies',
      },
      {
        name: 'Кафедра соціальної роботи і соціальної педагогіки',
        nameEn: 'Department of Social Work and Social Pedagogy',
      },
      { name: 'Кафедра менеджменту та економіки', nameEn: 'Department of Management and Economics' },
      {
        name: 'Кафедра філософії імені професора М. Д. Култаєвої',
        nameEn: 'Professor M.D. Kultaieva Department of Philosophy',
      },
    ],
  },
]

/** Institutes and faculties in one list, in the order used on the hub page. */
export const STRUCTURE_UNITS: StructureUnit[] = [...STRUCTURE_INSTITUTES, ...STRUCTURE_FACULTIES]

/** Units that have a static page of their own under /university/structure. */
export function findStructureUnit(slug: string): StructureUnit | undefined {
  return STRUCTURE_UNITS.find((unit) => unit.slug === slug)
}

/** Direct subdivisions plus the laboratories and museums nested under them. */
export function countStructureItems(unit: StructureUnit): number {
  return unit.items.reduce((total, item) => total + 1 + (item.children?.length ?? 0), 0)
}

export interface DepartmentEntry {
  department: StructureItem
  unit: StructureUnit
}

/**
 * Every «кафедра» in the chart with the unit it belongs to — the flat view used
 * by the departments index. Laboratories, centres and museums are left out:
 * they are listed on the unit pages, under the department they are attached to.
 */
export function listStructureDepartments(): DepartmentEntry[] {
  const entries: DepartmentEntry[] = []
  for (const unit of STRUCTURE_UNITS) {
    for (const item of unit.items) {
      if (item.name.startsWith('Кафедра')) entries.push({ department: item, unit })
    }
  }
  return entries
}

// ---------------------------------------------------------------------------
// Collegiate governance bodies (top of the chart)
// ---------------------------------------------------------------------------

export const STRUCTURE_GOVERNANCE: StructureGroup = {
  id: 'governance',
  name: 'Колегіальні органи управління',
  nameEn: 'Collegiate governing bodies',
  items: [
    { name: 'Наглядова рада', nameEn: 'Supervisory Board' },
    { name: 'Конференція трудового колективу', nameEn: 'Conference of the Staff' },
    { name: 'Загальні збори (конференція) студентів', nameEn: 'General Assembly (Conference) of Students' },
    {
      name: 'Вчена рада',
      nameEn: 'Academic Council',
      children: [{ name: 'Служба вченого секретаря', nameEn: 'Office of the Academic Secretary' }],
    },
    { name: 'Виконавча рада (Рада з якості)', nameEn: 'Executive Board (Quality Board)' },
  ],
}

// ---------------------------------------------------------------------------
// Administrative subdivisions, grouped by the supervising member of the rectorate
// ---------------------------------------------------------------------------

export const STRUCTURE_GROUPS: StructureGroup[] = [
  {
    id: 'rector',
    name: 'Підпорядковані ректору',
    nameEn: 'Reporting to the Rector',
    items: [
      { name: 'Служба ректора', nameEn: 'Rector’s Office' },
      { name: 'Відділ кадрів', nameEn: 'Human Resources Department' },
      { name: 'Загальний відділ', nameEn: 'General Department' },
      { name: 'Архів', nameEn: 'Archive' },
      { name: 'Бухгалтерська служба', nameEn: 'Accounting Service' },
      {
        name: 'Відділ моніторингу діяльності університету та досліджень у сфері освіти',
        nameEn: 'Department for University Activity Monitoring and Educational Research',
      },
      { name: 'Юридичний відділ', nameEn: 'Legal Department' },
      { name: 'Приймальна комісія', nameEn: 'Admissions Office' },
      {
        name: 'Підготовче відділення «Відкритий шлях до вищої освіти»',
        nameEn: '«Open Path to Higher Education» preparatory department',
      },
      { name: 'Відділ охорони праці', nameEn: 'Occupational Safety Department' },
      {
        name: 'Відділ з питань надзвичайних ситуацій, цивільного захисту населення та мобілізації',
        nameEn: 'Department of Emergencies, Civil Protection and Mobilisation',
      },
      { name: 'Служба військового обліку', nameEn: 'Military Registration Service' },
      { name: 'Центр міжнародної освіти', nameEn: 'Centre for International Education' },
      {
        name: 'Уповноважений підрозділ з питань запобігання та виявлення корупції',
        nameEn: 'Authorised Unit for Corruption Prevention and Detection',
      },
    ],
  },
  {
    id: 'first-vice-rector',
    name: 'Підпорядковані першому проректору',
    nameEn: 'Reporting to the First Vice-Rector',
    items: [
      {
        name: 'Центр забезпечення якості освіти',
        nameEn: 'Centre for Educational Quality Assurance',
        external: 'http://smc.hnpu.edu.ua/',
      },
      { name: 'Навчальний відділ', nameEn: 'Academic Affairs Department' },
      { name: 'Відділ практик', nameEn: 'Internships Department' },
      { name: 'Центр цифровізації освіти', nameEn: 'Centre for Digitalisation of Education' },
      {
        name: 'Навчально-спортивний табір «Гайдари»',
        nameEn: '«Haidary» Training and Sports Camp',
      },
    ],
  },
  {
    id: 'vice-rector-research',
    name: 'Підпорядковані проректору з наукової, інноваційної і міжнародної діяльності',
    nameEn: 'Reporting to the Vice-Rector for Research, Innovation and International Activity',
    items: [
      { name: 'Наукова бібліотека', nameEn: 'Research Library' },
      {
        name: 'Відділ аспірантури і докторантури',
        nameEn: 'Postgraduate and Doctoral Studies Department',
      },
      {
        name: 'Відділ наукової, інноваційної і міжнародної діяльності',
        nameEn: 'Department of Research, Innovation and International Activity',
      },
      { name: 'Редакційно-видавничий відділ', nameEn: 'Editorial and Publishing Department' },
    ],
  },
  {
    id: 'vice-rector-student-affairs',
    name: 'Підпорядковані проректору з навчально-виховної роботи',
    nameEn: 'Reporting to the Vice-Rector for Teaching and Student Affairs',
    items: [
      { name: 'Культурно-мистецький центр', nameEn: 'Cultural and Arts Centre' },
      {
        name: 'Музейний комплекс',
        nameEn: 'Museum Complex',
        children: [
          { name: 'Музей історії університету', nameEn: 'Museum of University History' },
          { name: 'Ботанічний музей', nameEn: 'Botanical Museum' },
          {
            name: 'Виставкова зала «Музей букваря та прописів»',
            nameEn: '«Museum of the Primer and Copybooks» exhibition hall',
          },
          {
            name: 'Зоологічний музей імені О.П. Крапивного',
            nameEn: 'O.P. Krapyvnyi Zoological Museum',
          },
          {
            name: 'Музей історії науки «FMF OPEN SPACE»',
            nameEn: '«FMF OPEN SPACE» Museum of the History of Science',
          },
          { name: 'Музей іграшок', nameEn: 'Toy Museum' },
          { name: 'Музей етнодизайну', nameEn: 'Museum of Ethnic Design' },
        ],
      },
      {
        name: 'Відділ зв’язків з громадськістю та засобами масової інформації',
        nameEn: 'Public Relations and Media Department',
      },
      { name: 'Редакція газети «Учитель»', nameEn: 'Editorial Office of the «Uchytel» Newspaper' },
    ],
  },
  {
    id: 'vice-rector-infrastructure',
    name: 'Підпорядковані проректору з розвитку інфраструктури',
    nameEn: 'Reporting to the Vice-Rector for Infrastructure Development',
    items: [
      { name: 'Адміністративно-господарська частина', nameEn: 'Administrative and Maintenance Unit' },
      {
        name: 'Відділ матеріально-технічного постачання. Комора',
        nameEn: 'Logistics Department. Storeroom',
      },
      { name: 'Гараж автомобільного транспорту', nameEn: 'Motor Transport Garage' },
      { name: 'Інженерна група', nameEn: 'Engineering Group' },
      {
        name: 'Навчально-адміністративний комплекс (навчальні корпуси)',
        nameEn: 'Educational and Administrative Complex (academic buildings)',
      },
      { name: 'Гуртожиток №1', nameEn: 'Dormitory No. 1' },
      { name: 'Студмістечко (студентські гуртожитки)', nameEn: 'Campus (student dormitories)' },
    ],
  },
]

// ---------------------------------------------------------------------------
// «Skovoroda associations» — collegiate, working and advisory bodies that
// operate on a voluntary basis (Додатки 3–6), grouped by supervisor
// ---------------------------------------------------------------------------

export const STRUCTURE_ASSOCIATIONS: StructureGroup[] = [
  {
    id: 'assoc-rector',
    name: 'За участю ректора',
    nameEn: 'Chaired by the Rector',
    items: [
      { name: 'Рада деканів', nameEn: 'Council of Deans' },
      { name: 'Рада старійшин', nameEn: 'Council of Elders' },
      {
        name: 'Науково-дослідний інститут експериментальної дидактики',
        nameEn: 'Research Institute of Experimental Didactics',
        children: [
          {
            name: 'Науково-дослідна лабораторія «Дидактика сучасної освіти. Нова українська школа»',
            nameEn: 'Research Laboratory «Didactics of Modern Education. New Ukrainian School»',
          },
          {
            name: 'Науково-дослідна лабораторія «Promotion здоров’я. Психодидактика»',
            nameEn: 'Research Laboratory «Health Promotion. Psychodidactics»',
          },
          {
            name: 'Науково-дослідна лабораторія «Шкільна медицина та психологія»',
            nameEn: 'Research Laboratory «School Medicine and Psychology»',
          },
        ],
      },
      { name: 'Спортивний клуб', nameEn: 'Sports Club' },
      { name: 'Олімпійська спілка', nameEn: 'Olympic Union' },
      { name: 'Юридична клініка', nameEn: 'Legal Clinic' },
      {
        name: 'Окремий науково-освітній центр українського козацтва імені Г.С. Сковороди',
        nameEn: 'H.S. Skovoroda Separate Research and Education Centre of Ukrainian Cossacks',
      },
      {
        name: 'Дослідницько-освітній центр безбар’єрності',
        nameEn: 'Research and Education Centre for Barrier-Free Access',
      },
    ],
  },
  {
    id: 'assoc-first-vice-rector',
    name: 'За участю першого проректора',
    nameEn: 'Chaired by the First Vice-Rector',
    items: [
      { name: 'Освітній хаб', nameEn: 'Education Hub' },
      { name: 'Рада гарантів ОП', nameEn: 'Council of Study Programme Guarantors' },
      { name: 'STEM-центр', nameEn: 'STEM Centre' },
      {
        name: 'Центр інтеграції та розвитку освітніх практик',
        nameEn: 'Centre for Integration and Development of Educational Practices',
      },
      {
        name: 'Навчально-методичний центр технологій альтернативної й додаткової комунікації в освіті',
        nameEn:
          'Educational and Methodological Centre of Augmentative and Alternative Communication Technologies in Education',
      },
    ],
  },
  {
    id: 'assoc-vice-rector-research',
    name: 'За участю проректора з наукової, інноваційної і міжнародної діяльності',
    nameEn: 'Chaired by the Vice-Rector for Research, Innovation and International Activity',
    items: [
      { name: 'Наукова рада', nameEn: 'Research Council' },
      { name: 'Редакційно-видавнича рада', nameEn: 'Editorial and Publishing Council' },
      {
        name: 'Рада молодих учених',
        nameEn: 'Council of Young Scientists',
        external: 'https://sites.google.com/view/rmu2024hnpu',
      },
      {
        name: 'Інститут Григорія Сковороди',
        nameEn: 'Hryhorii Skovoroda Institute',
        children: [
          {
            name: 'Лабораторія з дослідження філософської спадщини Г.С. Сковороди',
            nameEn: 'Laboratory for the Study of H.S. Skovoroda’s Philosophical Heritage',
          },
          {
            name: 'Лабораторія з дослідження літературної спадщини Г.С. Сковороди',
            nameEn: 'Laboratory for the Study of H.S. Skovoroda’s Literary Heritage',
          },
          {
            name: 'Лабораторія з дослідження педагогічної спадщини Г.С. Сковороди',
            nameEn: 'Laboratory for the Study of H.S. Skovoroda’s Pedagogical Heritage',
          },
        ],
      },
      { name: 'Ізраїльський культурно-освітній центр', nameEn: 'Israeli Cultural and Educational Centre' },
      { name: 'Іранський культурно-освітній центр', nameEn: 'Iranian Cultural and Educational Centre' },
      { name: 'Турецький культурно-освітній центр', nameEn: 'Turkish Cultural and Educational Centre' },
      { name: 'Китайський культурно-освітній центр', nameEn: 'Chinese Cultural and Educational Centre' },
      {
        name: 'Регіональний центр японської культури і освіти',
        nameEn: 'Regional Centre of Japanese Culture and Education',
      },
      {
        name: 'Науково-дослідна лабораторія моніторингу та охорони довкілля',
        nameEn: 'Research Laboratory of Environmental Monitoring and Protection',
      },
      {
        name: 'Науково-дослідна лабораторія проблем технологій науково-педагогічних досліджень, прикладної педагогічної діагностики та корекції освітнього процесу',
        nameEn:
          'Research Laboratory of Technologies of Scientific and Pedagogical Research, Applied Pedagogical Diagnostics and Correction of the Educational Process',
      },
      {
        name: 'Науково-дослідна лабораторія біотехнології',
        nameEn: 'Research Laboratory of Biotechnology',
      },
      { name: 'Науково-дослідна психологічна лабораторія', nameEn: 'Research Psychological Laboratory' },
      {
        name: 'Науково-методична лабораторія з охорони, розвитку та вдосконалення голосу представників голосомовних професій',
        nameEn:
          'Scientific and Methodological Laboratory for Protection, Development and Improvement of the Voice of Voice-Profession Practitioners',
      },
      {
        name: 'Науково-методична лабораторія інноваційної математичної освіти',
        nameEn: 'Scientific and Methodological Laboratory of Innovative Mathematics Education',
      },
      {
        name: 'Науково-методична лабораторія інноваційних технологій початкової освіти',
        nameEn: 'Scientific and Methodological Laboratory of Innovative Primary Education Technologies',
      },
      {
        name: 'Науково-методична лабораторія інтердисциплінарності в освіті',
        nameEn: 'Scientific and Methodological Laboratory of Interdisciplinarity in Education',
      },
      {
        name: 'Науково-методична лабораторія громадянської та міжкультурної освіти',
        nameEn: 'Scientific and Methodological Laboratory of Civic and Intercultural Education',
      },
    ],
  },
  {
    id: 'assoc-vice-rector-student-affairs',
    name: 'За участю проректора з навчально-виховної роботи',
    nameEn: 'Chaired by the Vice-Rector for Teaching and Student Affairs',
    items: [
      { name: 'Студентський Парламент', nameEn: 'Student Parliament' },
      { name: 'Студентська рада гуртожитків', nameEn: 'Student Dormitory Council' },
      {
        name: 'Асоціація випускників ХНПУ імені Г.С. Сковороди',
        nameEn: 'Alumni Association of H.S. Skovoroda KhNPU',
      },
      { name: 'Гендерний центр', nameEn: 'Gender Centre' },
      { name: 'Школа молодого лідера', nameEn: 'Young Leader School' },
      { name: 'Художня рада', nameEn: 'Arts Council' },
      {
        name: 'Психологічна служба',
        nameEn: 'Psychological Service',
        external: 'http://liderstudent.com.ua/',
      },
      { name: 'Дебатний клуб', nameEn: 'Debate Club' },
      { name: 'Центр ветеранського розвитку', nameEn: 'Veterans Development Centre' },
    ],
  },
]
