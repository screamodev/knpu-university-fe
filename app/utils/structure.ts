/**
 * University structure — single source of truth for the /university/structure section.
 *
 * Mirrors the organisation published on the legacy site's «Структура» page:
 * institutes and faculties with their departments, centres, museums and
 * laboratories, followed by the flat lists of administrative units, centres,
 * collegiate bodies and public organisations.
 *
 * CONVENTIONS
 * -----------
 *  • `name` / `nameEn` — bilingual labels, resolved through `useLocalizedField()`.
 *  • `slug`            — the static page under /university/structure/<slug>.
 *                        Units that run their own website have no slug: we link
 *                        out to `external` instead of duplicating their content.
 *  • `external`        — an address on a domain we do not own (own faculty site,
 *                        Google Sites, a separate subdomain). Rendered as an
 *                        outbound link. Legacy pages on hnpu.edu.ua are *not*
 *                        linked: that is the site this one replaces, so such
 *                        subdivisions are listed as plain text until they get
 *                        their own page here.
 */

/** A department, centre, museum or laboratory inside an institute or faculty. */
export interface StructureItem {
  name: string
  nameEn: string
  /** Own website on an external domain, if any. */
  external?: string
  /** Museums, herbaria and laboratories attached to the item above. */
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
  items: StructureItem[]
}

/** A flat list of subdivisions (departments, centres, councils, organisations). */
export interface StructureGroup {
  id: string
  name: string
  nameEn: string
  items: StructureItem[]
}

export const STRUCTURE_INSTITUTES: StructureUnit[] = [
  {
    kind: 'institute',
    name: 'Інститут післядипломної освіти',
    nameEn: 'Institute of Postgraduate Education',
    external: 'http://ipohnpu.in.ua/',
    items: [
      {
        name: 'Центр кар’єрного зростання',
        nameEn: 'Career Development Centre',
      },
      {
        name: 'Центр інклюзивної освіти',
        nameEn: 'Centre for Inclusive Education',
      },
      {
        name: 'Центр підготовки вчителів початкових класів до проходження сертифікації педагогічних працівників',
        nameEn: 'Centre for Preparing Primary School Teachers for Teacher Certification',
      },
    ],
  },
  {
    slug: 'ukrainian-philology',
    kind: 'institute',
    name: 'Навчально-науковий інститут української філології імені Г.Ф. Квітки-Основ’яненка',
    nameEn: 'H.F. Kvitka-Osnovianenko Educational and Research Institute of Ukrainian Philology',
    summary:
      'Осередок україністики університету: кафедри української мови, літератури та журналістики, українознавства й лінгводидактики, а також український і польський культурні центри.',
    summaryEn:
      'The university hub of Ukrainian studies: departments of Ukrainian language, literature and journalism, Ukrainian studies and linguodidactics, together with the Ukrainian and Polish cultural centres.',
    items: [
      {
        name: 'Кафедра української мови імені професора Л. А. Лисиченко',
        nameEn: 'Professor L.A. Lysychenko Department of Ukrainian Language',
      },
      {
        name: 'Кафедра українознавства і лінгводидактики імені професора О.Г. Муромцевої',
        nameEn: 'Professor O.H. Muromtseva Department of Ukrainian Studies and Linguodidactics',
      },
      {
        name: 'Кафедра української лiтератури та журналістики імені професора Леоніда Ушкалова',
        nameEn: 'Professor Leonid Ushkalov Department of Ukrainian Literature and Journalism',
      },
      {
        name: 'Кафедра теорії і практики англійської мови та зарубіжної літератури імені професора Михайла Гетманця',
        nameEn:
          'Professor Mykhailo Hetmanets Department of Theory and Practice of the English Language and World Literature',
        external: 'https://sites.google.com/hnpu.edu.ua/kaf-tpel/головна',
      },
      {
        name: 'Український культурний центр',
        nameEn: 'Ukrainian Cultural Centre',
      },
      {
        name: 'Польський культурний центр',
        nameEn: 'Polish Cultural Centre',
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
      'Історичні та правові кафедри, археологічна лабораторія і навчально-методичний центр факультету.',
    summaryEn:
      'Departments of history and law, an archaeological laboratory and the faculty’s educational and methodological centre.',
    items: [
      { name: 'Кафедра всесвітньої історії', nameEn: 'Department of World History' },
      { name: 'Кафедра історії України', nameEn: 'Department of History of Ukraine' },
      {
        name: 'Кафедра суспільно-економічних дисциплін і географії',
        nameEn: 'Department of Social and Economic Disciplines and Geography',
        external: 'https://sites.google.com/hnpu.edu.ua/kafedra-econom-geografiyi/головна',
      },
      {
        name: 'Кафедра теорії і методики викладання суспільно-правових дисциплін',
        nameEn: 'Department of Theory and Methods of Teaching Social and Legal Disciplines',
      },
      {
        name: 'Кафедра державно-правових дисциплін, кримінального права і процесу',
        nameEn: 'Department of State Law Disciplines, Criminal Law and Procedure',
        external: 'http://www.hnpu-laws.in.ua/кафедра-державно-правових-дисциплін/',
      },
      {
        name: 'Кафедра цивільно-правових дисциплін і трудового права імені проф. О.І. Процевського',
        nameEn: 'Professor O.I. Protsevskyi Department of Civil Law Disciplines and Labour Law',
        external: 'http://www.hnpu-laws.in.ua/?p=48',
      },
      {
        name: 'Навчально-наукова археологічна лабораторія',
        nameEn: 'Educational and Research Archaeological Laboratory',
      },
      {
        name: 'Навчально-методичний центр факультету історії і права',
        nameEn: 'Educational and Methodological Centre of the Faculty of History and Law',
      },
    ],
  },
  {
    slug: 'natural-special-health',
    kind: 'faculty',
    name: 'Факультет природничої, спеціальної і здоров’язбережувальної освіти',
    nameEn: 'Faculty of Natural Sciences, Special and Health-Preserving Education',
    summary:
      'Природничі та спеціальні кафедри разом із музеями, гербарієм, ботанічним садом і навчально-спортивним табором «Гайдари».',
    summaryEn:
      'Natural science and special education departments together with museums, a herbarium, the botanical garden and the «Haidary» training and sports camp.',
    items: [
      {
        name: 'Кафедра зоології',
        nameEn: 'Department of Zoology',
        children: [
          {
            name: 'Зоологічний музей імені О.П. Крапивного',
            nameEn: 'O.P. Krapyvnyi Zoological Museum',
          },
        ],
      },
      {
        name: 'Кафедра ботаніки',
        nameEn: 'Department of Botany',
        children: [
          { name: 'Ботанічний музей', nameEn: 'Botanical Museum' },
          { name: 'Гербарій CWP', nameEn: 'CWP Herbarium' },
        ],
      },
      { name: 'Кафедра спеціальної педагогіки', nameEn: 'Department of Special Pedagogy' },
      {
        name: 'Кафедра здоров\'я людини, реабілітології і спеціальної психології',
        nameEn: 'Department of Human Health, Rehabilitation Studies and Special Psychology',
        children: [
          { name: 'Центр інклюзивної освіти', nameEn: 'Centre for Inclusive Education' },
        ],
      },
      {
        name: 'Кафедра анатомії і фізіології людини імені професора Я.Р. Синельникова',
        nameEn: 'Professor Ya.R. Synelnykov Department of Human Anatomy and Physiology',
        children: [{ name: 'Музей анатомії', nameEn: 'Museum of Anatomy' }],
      },
      { name: 'Ботанічний сад', nameEn: 'Botanical Garden' },
      {
        name: 'Навчально-спортивний табір «Гайдари»',
        nameEn: '«Haidary» Training and Sports Camp',
      },
      {
        name: 'Сковородинівська біологічна школа',
        nameEn: 'Skovoroda Biological School',
      },
    ],
  },
  {
    slug: 'preschool',
    kind: 'faculty',
    name: 'Факультет дошкільної освіти',
    nameEn: 'Faculty of Preschool Education',
    summary:
      'Підготовка фахівців дошкільної освіти: методики, педагогічна антропологія та цифрова дидактика.',
    summaryEn:
      'Training of preschool education specialists: teaching methods, pedagogical anthropology and digital didactics.',
    items: [
      {
        name: 'Кафедра теорії, технологій і методик дошкільної освіти',
        nameEn: 'Department of Theory, Technologies and Methods of Preschool Education',
        external: 'https://sites.google.com/hnpu.edu.ua/hnpu-kafedra-teoriyi-tehnologi/главная-страница',
        children: [
          {
            name: 'Музей іграшки',
            nameEn: 'Toy Museum',
            external: 'https://sites.google.com/hnpu.edu.ua/hnpu-kafedra-teoriyi-tehnologi/музей-іграшки',
          },
        ],
      },
      {
        name: 'Кафедра психологічної і педагогічної антропології',
        nameEn: 'Department of Psychological and Pedagogical Anthropology',
      },
      {
        name: 'Кафедра технологій дистанційного навчання та цифрової дидактики в дошкільній освіті',
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
      {
        name: 'Центр методики навчання іноземних мов',
        nameEn: 'Centre for Foreign Language Teaching Methods',
      },
    ],
  },
  {
    slug: 'arts',
    kind: 'faculty',
    name: 'Факультет мистецтв',
    nameEn: 'Faculty of Arts',
    summary:
      'Музичне, образотворче та хореографічне мистецтво, дизайн і технології, музей етнодизайну.',
    summaryEn:
      'Music, fine arts and choreography, design and technologies, and the museum of ethnic design.',
    items: [
      { name: 'Кафедра дизайну і технологій', nameEn: 'Department of Design and Technologies' },
      { name: 'Кафедра хореографії', nameEn: 'Department of Choreography' },
      { name: 'Кафедра музичного мистецтва', nameEn: 'Department of Music Art' },
      { name: 'Кафедра образотворчого мистецтва', nameEn: 'Department of Fine Arts' },
      { name: 'Музей етнодизайну', nameEn: 'Museum of Ethnic Design' },
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
  },
  {
    slug: 'social-humanities',
    kind: 'faculty',
    name: 'Факультет соціально-гуманітарних наук і соціальних технологій',
    nameEn: 'Faculty of Social and Humanitarian Sciences and Social Technologies',
    summary:
      'Психологія, соціологія і політологія, соціальна робота, менеджмент та економіка, філософія.',
    summaryEn:
      'Psychology, sociology and political science, social work, management and economics, philosophy.',
    items: [
      {
        name: 'Кафедра політології, соціології і культурології',
        nameEn: 'Department of Political Science, Sociology and Cultural Studies',
      },
      {
        name: 'Кафедра психології',
        nameEn: 'Department of Psychology',
        external: 'https://sites.google.com/hnpu.edu.ua/department-of-psychology',
      },
      {
        name: 'Кафедра соціальної роботи і соціальної педагогіки',
        nameEn: 'Department of Social Work and Social Pedagogy',
      },
      { name: 'Кафедра менеджменту та економіки', nameEn: 'Department of Management and Economics' },
      {
        name: 'Кафедра філософії імені професора М.Д. Култаєвої',
        nameEn: 'Professor M.D. Kultaieva Department of Philosophy',
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
        name: 'Кафедра олімпійського і професійного спорту, спортивних ігор та туризму',
        nameEn: 'Department of Olympic and Professional Sports, Sports Games and Tourism',
      },
      {
        name: 'Кафедра спортивно-педагогічних дисциплін і фітнесу',
        nameEn: 'Department of Sports Pedagogy Disciplines and Fitness',
        external: 'https://sites.google.com/hnpu.edu.ua/kaf-spdif/main',
      },
      {
        name: 'Кафедра теорії, методики і практики фізичного виховання',
        nameEn: 'Department of Theory, Methods and Practice of Physical Education',
      },
      {
        name: 'Навчально-наукова лабораторія біофізики, біомеханіки та кінезіології',
        nameEn: 'Educational and Research Laboratory of Biophysics, Biomechanics and Kinesiology',
      },
      { name: 'Лижна база', nameEn: 'Ski Base' },
    ],
  },
  {
    slug: 'physics-mathematics',
    kind: 'faculty',
    name: 'Фізико-математичний факультет',
    nameEn: 'Faculty of Physics and Mathematics',
    summary:
      'Фізика і хімія, математика, інформатика, освітологія та інноваційна педагогіка, музей історії науки FMF OPEN SPACE.',
    summaryEn:
      'Physics and chemistry, mathematics, computer science, educology and innovative pedagogy, and the FMF OPEN SPACE museum of the history of science.',
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
      {
        name: 'Музей історії науки FMF OPEN SPACE',
        nameEn: 'FMF OPEN SPACE Museum of the History of Science',
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

export const STRUCTURE_GROUPS: StructureGroup[] = [
  {
    id: 'departments',
    name: 'Відділи та служби',
    nameEn: 'Departments and services',
    items: [
      { name: 'Відділ аспірантури і докторантури', nameEn: 'Postgraduate and Doctoral Studies Department' },
      { name: 'Приймальна комісія', nameEn: 'Admissions Office' },
      { name: 'Загальний відділ', nameEn: 'General Department' },
      { name: 'Архів', nameEn: 'Archive' },
      { name: 'Відділ кадрів', nameEn: 'Human Resources Department' },
      { name: 'Бухгалтерська служба', nameEn: 'Accounting Service' },
      { name: 'Юридичний відділ', nameEn: 'Legal Department' },
      {
        name: 'Відділ моніторингу діяльності університету та досліджень у сфері освіти',
        nameEn: 'Department for University Activity Monitoring and Educational Research',
      },
      { name: 'Навчальний відділ', nameEn: 'Academic Affairs Department' },
      { name: 'Служба вченого секретаря', nameEn: 'Office of the Academic Secretary' },
      { name: 'Наукова бібліотека', nameEn: 'Research Library' },
      {
        name: 'Відділ наукової, інноваційної і міжнародної діяльності',
        nameEn: 'Department of Research, Innovation and International Activity',
      },
      {
        name: 'Відділ зв’язків з громадськістю та засобами масової інформації',
        nameEn: 'Public Relations and Media Department',
      },
      { name: 'Редакційно-видавничий відділ', nameEn: 'Editorial and Publishing Department' },
      {
        name: 'Відділ з питань надзвичайних ситуацій, цивільного захисту населення, режиму і безпеки',
        nameEn: 'Department of Emergencies, Civil Protection, Regime and Security',
      },
      { name: 'Служба військового обліку', nameEn: 'Military Registration Service' },
      { name: 'Відділ практик', nameEn: 'Internships Department' },
      { name: 'Відділ охорони праці', nameEn: 'Occupational Safety Department' },
      { name: 'Редакція газети «Учитель»', nameEn: 'Editorial Office of the «Uchytel» Newspaper' },
      { name: 'Музейний комплекс університету', nameEn: 'University Museum Complex' },
      {
        name: 'Навчально-методична лабораторія вивчення корупційних ризиків в освіті і захисту інтелектуальної власності',
        nameEn:
          'Educational and Methodological Laboratory for Studying Corruption Risks in Education and Intellectual Property Protection',
      },
      {
        name: 'Лабораторія методичного забезпечення безперервної системи освіти «Школа - ЗВО»',
        nameEn: 'Laboratory of Methodological Support of the «School — University» Continuous Education System',
        external:
          'https://sites.google.com/hnpu.edu.ua/pochatkove/факультет/структурні-підрозділи/лабораторія-методичного-забезпечення-безперервної-системи-освіти-школа-зво',
      },
      { name: 'Психологічна служба', nameEn: 'Psychological Service', external: 'http://liderstudent.com.ua/' },
      { name: 'Юридична клініка', nameEn: 'Legal Clinic' },
      { name: 'Спортивний клуб', nameEn: 'Sports Club' },
      { name: 'Олімпійська спілка', nameEn: 'Olympic Union' },
      { name: 'Студмістечко (студентські гуртожитки)', nameEn: 'Campus (student dormitories)' },
      {
        name: 'Науково-методична лабораторія освіти дорослих та педагогічного проєктування',
        nameEn: 'Scientific and Methodological Laboratory of Adult Education and Pedagogical Design',
      },
      { name: 'Уповноважена особа з тендерних торгів', nameEn: 'Authorised Procurement Officer' },
      { name: 'Адміністративно-господарська частина', nameEn: 'Administrative and Maintenance Unit' },
      {
        name: 'Відділ матеріально-технічного постачання. Склад',
        nameEn: 'Logistics Department. Warehouse',
      },
      { name: 'Гараж автомобільного транспорту', nameEn: 'Motor Transport Garage' },
      { name: 'Інженерна група', nameEn: 'Engineering Group' },
      { name: 'Гуртожиток №1', nameEn: 'Dormitory No. 1' },
      {
        name: 'Навчально-адміністративний комплекс (навчальні корпуси)',
        nameEn: 'Educational and Administrative Complex (academic buildings)',
      },
    ],
  },
  {
    id: 'centres',
    name: 'Центри',
    nameEn: 'Centres',
    items: [
      {
        name: 'Центр забезпечення якості освіти',
        nameEn: 'Centre for Educational Quality Assurance',
        external: 'http://smc.hnpu.edu.ua/',
      },
      { name: 'Центр міжнародної освіти', nameEn: 'Centre for International Education' },
      { name: 'Центр цифровізації освіти', nameEn: 'Centre for Digitalisation of Education' },
      { name: 'Культурно-мистецький центр', nameEn: 'Cultural and Arts Centre' },
      { name: 'Центр кар’єрного зростання', nameEn: 'Career Development Centre' },
      { name: 'Центр ветеранського розвитку', nameEn: 'Veterans Development Centre' },
      { name: 'Український культурний центр', nameEn: 'Ukrainian Cultural Centre' },
      { name: 'Ізраїльський культурний центр', nameEn: 'Israeli Cultural Centre' },
      { name: 'Іранський культурний центр', nameEn: 'Iranian Cultural Centre' },
      { name: 'Китайський культурний центр', nameEn: 'Chinese Cultural Centre' },
      {
        name: 'Регіональний центр польської мови, культури і науки',
        nameEn: 'Regional Centre of Polish Language, Culture and Science',
      },
      { name: 'Турецький культурний центр', nameEn: 'Turkish Cultural Centre' },
      {
        name: 'Регіональний центр японської культури і освіти',
        nameEn: 'Regional Centre of Japanese Culture and Education',
      },
      { name: 'Корейський культурно-мистецький центр', nameEn: 'Korean Cultural and Arts Centre' },
      { name: 'Центр інклюзивної освіти', nameEn: 'Centre for Inclusive Education' },
      {
        name: 'Науково-консультаційний центр читання та дитячої книги',
        nameEn: 'Research and Advisory Centre for Reading and Children’s Books',
        external:
          'https://sites.google.com/hnpu.edu.ua/pochatkove/факультет/структурні-підрозділи/науково-консультативний-центр-читання-та-дитячої-книги',
      },
      {
        name: 'Навчально-методичний центр факультету історії і права',
        nameEn: 'Educational and Methodological Centre of the Faculty of History and Law',
      },
      {
        name: 'Центр методики навчання іноземних мов',
        nameEn: 'Centre for Foreign Language Teaching Methods',
      },
      {
        name: 'Центр підготовки вчителів початкових класів до проходження сертифікації педагогічних працівників',
        nameEn: 'Centre for Preparing Primary School Teachers for Teacher Certification',
      },
      { name: 'Еколого-біоетичний центр', nameEn: 'Ecological and Bioethical Centre' },
      { name: 'Центр валеологічних досліджень', nameEn: 'Centre for Valeological Research' },
      { name: 'Консультаційний центр', nameEn: 'Advisory Centre' },
      { name: 'Центр ментального здоров’я', nameEn: 'Mental Health Centre' },
    ],
  },
  {
    id: 'collegiate',
    name: 'Колегіальні, робочі та дорадчі органи',
    nameEn: 'Collegiate, working and advisory bodies',
    items: [
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
      { name: 'Рада старійшин', nameEn: 'Council of Elders' },
      { name: 'Рада деканів', nameEn: 'Council of Deans' },
      { name: 'Вчена рада', nameEn: 'Academic Council' },
      { name: 'Виконавча рада (Рада з якості)', nameEn: 'Executive Board (Quality Board)' },
      {
        name: 'Рада молодих учених',
        nameEn: 'Council of Young Scientists',
        external: 'https://sites.google.com/view/rmu2024hnpu',
      },
      { name: 'Редакційно-видавнича рада', nameEn: 'Editorial and Publishing Council' },
      { name: 'Наукова рада', nameEn: 'Research Council' },
      { name: 'Наглядова рада', nameEn: 'Supervisory Board' },
      { name: 'Художня рада', nameEn: 'Arts Council' },
      { name: 'Студентська рада гуртожитків', nameEn: 'Student Dormitory Council' },
      { name: 'Студентський Парламент', nameEn: 'Student Parliament' },
      {
        name: 'Студентське наукове товариство',
        nameEn: 'Student Research Society',
        external: 'https://sites.google.com/hnpu.edu.ua/studentskenaukovetovarystvo',
      },
      { name: 'Школа молодого лідера', nameEn: 'Young Leader School' },
      { name: 'Дебатний клуб', nameEn: 'Debate Club' },
      { name: 'Студентський АРТ-ХАБ', nameEn: 'Student ART-HUB' },
      { name: '«Legolend-HUB»', nameEn: '«Legolend-HUB»' },
      {
        name: '«Kinder-HUB»',
        nameEn: '«Kinder-HUB»',
        external:
          'https://sites.google.com/hnpu.edu.ua/pochatkove/факультет/структурні-підрозділи/дитяча-кімната',
      },
      {
        name: 'Асоціація випускників ХНПУ імені Г.С. Сковороди',
        nameEn: 'Alumni Association of H.S. Skovoroda KhNPU',
      },
      { name: 'Гендерний центр', nameEn: 'Gender Centre' },
      { name: 'Центр освіти дорослих', nameEn: 'Adult Education Centre' },
      {
        name: 'Науково-методична міждисциплінарна лабораторія з проблем педагогічної та управлінської акмеології',
        nameEn:
          'Interdisciplinary Scientific and Methodological Laboratory on Pedagogical and Managerial Acmeology',
      },
      {
        name: 'Науково-дослідні лабораторії (на громадських засадах)',
        nameEn: 'Research laboratories (on a voluntary basis)',
        children: [
          { name: 'Науково-дослідна лабораторія біотехнології', nameEn: 'Research Laboratory of Biotechnology' },
          {
            name: 'Науково-дослідна лабораторія лінгвістичних експертиз',
            nameEn: 'Research Laboratory of Linguistic Examinations',
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
            name: 'Науково-дослідна лабораторія STEAM-технологій дошкільної освіти',
            nameEn: 'Research Laboratory of STEAM Technologies in Preschool Education',
          },
          { name: 'Науково-дослідна психологічна лабораторія', nameEn: 'Research Psychological Laboratory' },
        ],
      },
      {
        name: 'Науково-методичні лабораторії (на громадських засадах)',
        nameEn: 'Scientific and methodological laboratories (on a voluntary basis)',
        children: [
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
            name: 'Науково-методична лабораторія інтердисциплінарності в освіті',
            nameEn: 'Scientific and Methodological Laboratory of Interdisciplinarity in Education',
          },
          {
            name: 'Науково-методична лабораторія сучасних методик навчання фізики',
            nameEn: 'Scientific and Methodological Laboratory of Modern Physics Teaching Methods',
          },
          {
            name: 'Науково-методична лабораторія інноваційних технологій початкової освіти',
            nameEn: 'Scientific and Methodological Laboratory of Innovative Primary Education Technologies',
            external:
              'https://sites.google.com/hnpu.edu.ua/pochatkove/факультет/структурні-підрозділи/науково-методична-лабораторія-інноваційних-технологій-початкової-освіти',
          },
          {
            name: 'Науково-методична лабораторія громадянської та міжкультурної освіти',
            nameEn: 'Scientific and Methodological Laboratory of Civic and Intercultural Education',
          },
        ],
      },
      {
        name: 'Сковорода-хаб',
        nameEn: 'Skovoroda Hub',
        external: 'https://sites.google.com/hnpu.edu.ua/khnpu-eduhub/',
      },
      { name: 'Рада гарантів ОП', nameEn: 'Council of Study Programme Guarantors' },
    ],
  },
  {
    id: 'public',
    name: 'Громадські організації та інші підрозділи',
    nameEn: 'Public organisations and other subdivisions',
    items: [
      {
        name: 'Первинна профспілкова організація ХНПУ імені Г.С. Сковороди',
        nameEn: 'Primary Trade Union Organisation of H.S. Skovoroda KhNPU',
      },
      {
        name: 'Первинна профспілкова організація студентів ХНПУ імені Г.С. Сковороди',
        nameEn: 'Primary Students’ Trade Union Organisation of H.S. Skovoroda KhNPU',
      },
      {
        name: 'Окремий науково-освітній центр українського козацтва імені Г.С. Сковороди',
        nameEn: 'H.S. Skovoroda Separate Research and Education Centre of Ukrainian Cossacks',
      },
      { name: 'Пункт охорони здоров’я', nameEn: 'Health Care Point' },
    ],
  },
]
