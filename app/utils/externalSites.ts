/**
 * University subsites that live outside this site.
 *
 * Each one is maintained by its own unit and the client asked the menu to lead straight there
 * instead of duplicating the content here — the local pages were removed with the links.
 */

/** Фахові наукові журнали — OJS instance of the university. */
export const JOURNALS_EXTERNAL_URL = 'https://journals.hnpu.edu.ua/'

/** Академічна мобільність — Google Site of the international office. */
export const ACADEMIC_MOBILITY_EXTERNAL_URL = 'https://sites.google.com/hnpu.edu.ua/academic-mobility-hnpu'

/** Сковорода-хаб — Google Site of the blended-learning hub; the calendar is its landing page. */
export const EDUHUB_EXTERNAL_URL
  = 'https://sites.google.com/hnpu.edu.ua/khnpu-eduhub/%D0%BA%D0%B0%D0%BB%D0%B5%D0%BD%D0%B4%D0%B0%D1%80'

/** Наукові школи — Google Site the research office keeps in full detail. */
export const SCIENCE_SCHOOLS_EXTERNAL_URL = 'https://sites.google.com/hnpu.edu.ua/scienceschools'

/**
 * Старий сайт університету (Drupal 7).
 *
 * Він лишається онлайн після запуску нового: приймальна комісія працює тільки там, і частина
 * матеріалів на нього ще посилається. Університет планує перенести його на `old.hnpu.edu.ua`;
 * коли DNS запрацює, адресу міняємо тут, в одному місці.
 */
export const LEGACY_SITE_URL = 'https://hnpu.edu.ua/uk'

/** Приймальна комісія на старому сайті — новий сайт веде на неї всі кнопки «Вступ». */
export const ADMISSIONS_LEGACY_URL = 'https://hnpu.edu.ua/uk/division/pryymalna-komisiya'

/** Підготовче відділення — «Зимовий вступ» у мегаменю. */
export const WINTER_ADMISSIONS_LEGACY_URL
  = 'https://hnpu.edu.ua/uk/division/pidgotovche-viddilennya-vidkrytyy-shlyah-do-vyshchoyi-osvity'

/** Правила прийому 2026 — файл, який приймальна комісія тримає на Google Drive. */
export const ADMISSION_RULES_2026_URL = 'https://drive.google.com/file/d/1FZU0NiUVOPlTw65FS5D1_Wi-rIAZOztz/view'
