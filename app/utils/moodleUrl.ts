/**
 * The university's Moodle instance, run by the Центр цифровізації освіти.
 *
 * It replaced «Дистанційне навчання» in the Навчання menu: distance learning is delivered
 * through Moodle, so the menu entry now leads straight there.
 */
// Адреса без /moodle/: старий шлях віддає 301 на корінь, і зайвий перехід часом губився —
// клієнт скаржився, що кнопка з головної «не працює» (правка 10.09).
export const MOODLE_EXTERNAL_URL = 'https://lms.hnpu.edu.ua/'
