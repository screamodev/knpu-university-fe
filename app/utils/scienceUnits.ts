/**
 * «НДІ, центри, лабораторії» — перелік, який клієнт дав для меню «Наука» (правка 16.09, п. 2).
 *
 * Порядок і назви — як у правках. Посилання: сторінка на цьому сайті, де вона вже є; власний
 * сайт підрозділу; інакше сторінка старого сайту, як її дав клієнт. Підрозділи без жодної
 * сторінки лишаються в переліку текстом.
 */
export interface ScienceUnit {
  name: string
  nameEn: string
  /** Сторінка на цьому сайті. */
  path?: string
  /** Зовнішня адреса: власний сайт або сторінка старого сайту. */
  url?: string
}

const OLD = 'https://old.hnpu.edu.ua/uk/division/'
const POCHATKOVE =
  'https://sites.google.com/hnpu.edu.ua/pochatkove/%D1%84%D0%B0%D0%BA%D1%83%D0%BB%D1%8C%D1%82%D0%B5%D1%82/%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%BD%D1%96-%D0%BF%D1%96%D0%B4%D1%80%D0%BE%D0%B7%D0%B4%D1%96%D0%BB%D0%B8/'

export const SCIENCE_UNITS: ScienceUnit[] = [
  { name: 'Центр забезпечення якості освіти', nameEn: 'Centre for Educational Quality Assurance', path: '/education/quality' },
  { name: 'Центр міжнародної освіти', nameEn: 'International Education Centre', path: '/university/structure/international-education' },
  { name: 'Центр цифровізації освіти', nameEn: 'Centre for Digital Education', path: '/education/digital-center' },
  { name: 'Культурно-мистецький центр', nameEn: 'Cultural and Arts Centre', url: 'https://old.hnpu.edu.ua/division/molodizhnyy-centr' },
  { name: 'Центр кар’єрного зростання', nameEn: 'Career Development Centre', path: '/student/career' },
  { name: 'Центр ветеранського розвитку', nameEn: 'Veterans Development Centre', path: '/student/veterans-center' },
  { name: 'Український культурний центр', nameEn: 'Ukrainian Cultural Centre', url: `${OLD}ukrayinskyy-kulturnyy-centr` },
  { name: 'Ізраїльський культурний центр', nameEn: 'Israeli Cultural Centre', url: `${OLD}izrayilskyy-kulturnyy-centr` },
  { name: 'Іранський культурний центр', nameEn: 'Iranian Cultural Centre', url: `${OLD}iranskyy-kulturnyy-centr` },
  { name: 'Китайський культурний центр', nameEn: 'Chinese Cultural Centre', url: `${OLD}kytayskyy-kulturnyy-centr` },
  { name: 'Регіональний центр польської мови, культури і науки', nameEn: 'Regional Centre of Polish Language, Culture and Science', url: `${OLD}regionalnyy-centr-polskoyi-movy-kultury-i-nauky` },
  { name: 'Турецький культурний центр', nameEn: 'Turkish Cultural Centre', url: `${OLD}tureckyy-kulturnyy-centr` },
  { name: 'Регіональний центр японської культури і освіти', nameEn: 'Regional Centre of Japanese Culture and Education', url: `${OLD}regionalnyy-centr-yaponskoyi-kultury-i-osvity` },
  { name: 'Корейський культурно-мистецький центр', nameEn: 'Korean Cultural and Arts Centre', url: `${OLD}koreyskyy-kulturno-mysteckyy-centr` },
  { name: 'Центр інклюзивної освіти', nameEn: 'Centre for Inclusive Education', url: `${OLD}navchalno-metodychnyy-inklyuzyvnyy-centr` },
  { name: 'Науково-консультаційний центр читання та дитячої книги', nameEn: 'Research and Advisory Centre for Reading and Children’s Books', url: `${POCHATKOVE}%D0%BD%D0%B0%D1%83%D0%BA%D0%BE%D0%B2%D0%BE-%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D1%96%D0%B9%D0%BD%D0%B8%D0%B9-%D1%86%D0%B5%D0%BD%D1%82%D1%80-%D1%87%D0%B8%D1%82%D0%B0%D0%BD%D0%BD%D1%8F-%D1%82%D0%B0-%D0%B4%D0%B8%D1%82%D1%8F%D1%87%D0%BE%D1%97-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8` },
  { name: 'Навчально-методичний центр факультету історії і права', nameEn: 'Educational and Methodological Centre of the Faculty of History and Law', url: `${OLD}navchalno-metodychnyy-centr-fakultetu-istoriyi-i-prava-skovoroda-associations` },
  { name: 'Центр методики навчання іноземних мов', nameEn: 'Centre for Foreign Language Teaching Methods', url: `${OLD}centr-metodyky-navchannya-inozemnyh-mov` },
  { name: 'Центр підготовки вчителів початкових класів до проходження сертифікації педагогічних працівників', nameEn: 'Centre for Preparing Primary School Teachers for Certification' },
  { name: 'Еколого-біоетичний центр', nameEn: 'Ecological and Bioethical Centre' },
  { name: 'Центр валеологічних досліджень', nameEn: 'Centre for Valeological Research', path: '/university/structure/mental-health-centre/students' },
  { name: 'Консультаційний центр', nameEn: 'Consulting Centre', url: 'https://old.hnpu.edu.ua/division/konsultaciynyy-centr-dlya-shkolyariv-sho-gotuye-do-vstupu-v-vnz' },
  { name: 'Центр ментального здоров’я', nameEn: 'Mental Health Centre', path: '/university/structure/mental-health-centre' },
  { name: 'Центр розвитку компетентностей учителя', nameEn: 'Centre for Teacher Competence Development', path: '/university/structure/teacher-competence-centre' },
  { name: 'Лабораторія з дослідження філософської спадщини Г.С. Сковороди', nameEn: 'Laboratory for the Study of H.S. Skovoroda’s Philosophical Heritage' },
  { name: 'Лабораторія з дослідження літературної спадщини Г.С. Сковороди', nameEn: 'Laboratory for the Study of H.S. Skovoroda’s Literary Heritage' },
  { name: 'Лабораторія з дослідження педагогічної спадщини Г.С. Сковороди', nameEn: 'Laboratory for the Study of H.S. Skovoroda’s Pedagogical Heritage' },
  { name: 'Науково-дослідна лабораторія «Дидактика сучасної освіти. Нова українська школа»', nameEn: 'Research Laboratory “Didactics of Modern Education. New Ukrainian School”' },
  { name: 'Науково-дослідна лабораторія «Promotion здоров’я. Психодидактика»', nameEn: 'Research Laboratory “Health Promotion. Psychodidactics”' },
  { name: 'Науково-дослідна лабораторія «Шкільна медицина та психологія»', nameEn: 'Research Laboratory “School Medicine and Psychology”' },
  { name: 'Науково-дослідна лабораторія біотехнології', nameEn: 'Biotechnology Research Laboratory', url: `${OLD}naukovo-doslidna-laboratoriya-biotehnologiyi` },
  { name: 'Науково-дослідна лабораторія лінгвістичних експертиз', nameEn: 'Linguistic Expertise Research Laboratory' },
  { name: 'Науково-дослідна лабораторія моніторингу та охорони довкілля', nameEn: 'Environmental Monitoring and Protection Research Laboratory', url: `${OLD}naukovo-doslidna-laboratoriya-monitoryngu-ta-ohorony-dovkillya` },
  { name: 'Науково-дослідна лабораторія проблем технологій науково-педагогічних досліджень, прикладної педагогічної діагностики та корекції освітнього процесу', nameEn: 'Research Laboratory of Pedagogical Research Technologies, Applied Pedagogical Diagnostics and Correction of the Educational Process', url: `${OLD}naukovo-doslidna-laboratoriya-problem-tehnologiy-naukovo-pedagogichnyh-doslidzhen` },
  { name: 'Науково-дослідна лабораторія STEAM-технологій дошкільної освіти', nameEn: 'Research Laboratory of STEAM Technologies in Preschool Education' },
  { name: 'Науково-дослідна психологічна лабораторія', nameEn: 'Psychology Research Laboratory' },
  { name: 'Науково-методична лабораторія з охорони, розвитку та вдосконалення голосу представників голосомовних професій', nameEn: 'Research and Methodological Laboratory for Voice Care in Voice Professions', url: `${OLD}naukovo-metodychna-laboratoriya-z-ohorony-rozvytku-ta-vdoskonalennya-golosu-predstavnykiv` },
  { name: 'Науково-методична лабораторія інноваційної математичної освіти', nameEn: 'Research and Methodological Laboratory of Innovative Mathematics Education' },
  { name: 'Науково-методична лабораторія інтердисциплінарності в освіті', nameEn: 'Research and Methodological Laboratory of Interdisciplinarity in Education' },
  { name: 'Науково-методична лабораторія сучасних методик навчання фізики', nameEn: 'Research and Methodological Laboratory of Modern Physics Teaching Methods' },
  { name: 'Науково-методична лабораторія інноваційних технологій початкової освіти', nameEn: 'Research and Methodological Laboratory of Innovative Technologies in Primary Education', url: `${POCHATKOVE}%D0%BD%D0%B0%D1%83%D0%BA%D0%BE%D0%B2%D0%BE-%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%B8%D1%87%D0%BD%D0%B0-%D0%BB%D0%B0%D0%B1%D0%BE%D1%80%D0%B0%D1%82%D0%BE%D1%80%D1%96%D1%8F-%D1%96%D0%BD%D0%BD%D0%BE%D0%B2%D0%B0%D1%86%D1%96%D0%B9%D0%BD%D0%B8%D1%85-%D1%82%D0%B5%D1%85%D0%BD%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D0%B9-%D0%BF%D0%BE%D1%87%D0%B0%D1%82%D0%BA%D0%BE%D0%B2%D0%BE%D1%97-%D0%BE%D1%81%D0%B2%D1%96%D1%82%D0%B8` },
  { name: 'Науково-методична лабораторія громадянської та міжкультурної освіти', nameEn: 'Research and Methodological Laboratory of Civic and Intercultural Education', url: `${OLD}naukovo-metodychna-laboratoriya-gromadyanskoyi-ta-mizhkulturnoyi-osvity` },
]
