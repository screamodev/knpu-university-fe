# Сторінки, які варто зробити редагованими в адмінці

Внутрішній список, клієнту не показуємо.

Правило роботи з правками. Якщо редактори можуть зробити правку в адмінці самі, ми її не вносимо, а пишемо в апдейті, як це зробити. Якщо правка живе в статиці фронту або в коді, вносимо її самі й додаємо сторінку сюди. Список — це черга на перенесення в Directus: що частіше сторінку правлять, то вище вона в черзі.

## Як сторінка стає редагованою

| Що це | Механізм | Приклад |
| --- | --- | --- |
| Вкладка підрозділу (`app/content/structure/<unit>/<tab>.uk.json`) | Засіяти рядок `structure_pages` (`unit_slug` + `tab`) поточним HTML зі статики. Сайт бере рядок із Directus, а статика лишається запасним варіантом | `postgraduate`, `kafedra-horeografiyi` |
| Окрема сторінка (`app/content/pages/<slug>.uk.json`) | Додати slug у `STATIC_PAGE_SLUGS` (`apply_schema.py`), засіяти рядок `static_pages` через `static-pages/export_councils.py` | `council-*`, `postgraduate-*-students` |
| Перелік документів | Розділ колекції `documents`: slug у `DOCUMENT_SECTIONS` фронту й у варіантах `documents.section` | `candidate-support`, `doctor-of-science-support` |
| Дані в коді: контакти й зовнішні вкладки (`manifest.json`), назви, hero-опис і асоціації (`app/utils/structure.ts`) | Зараз лише в коді. Потрібні поля в CMS, наприклад колекція підрозділів або JSON-поле на `structure_pages` | — |

Поле `links` вкладки (плитки «Корисні посилання») `structure_pages` не покриває. Якщо переносимо вкладку з `links`, треба додати поле.

## Черга

| Сторінка | Що правили (правка) | Де зараз | Як зробити редагованою |
| --- | --- | --- | --- |
| `special-education`: Головна, Вступнику, Історія, Освіта | тексти, кафедри, деканат (19.09 п. 3) | статика вкладок | `structure_pages` ×4 |
| `special-education`: hero-опис, картка на /university/faculties, назва кафедри анатомії, асоціації, телефон і пошта | 19.09 п. 3 | `structure.ts`, `manifest.json` | поля CMS для підрозділу |
| `kafedra-ukrayinoznavstva-i-lingvodydaktyky`: Головна | посилання на сторінку співробітника (19.09 п. 2) | статика | `structure_pages` |
| `mathematics-informatics`: Історія | фото в сітку, галерея деканів (19.09 п. 8) | статика | `structure_pages` |
| `mathematics-informatics`: Студентство | посилання «Календар заходів» (19.09 п. 7) | `links` у статиці | `structure_pages` + поле для `links` |
| `kafedra-ukrayinskoyi-movy`: вкладки на Google-сайти | «Новини», «Практика» (19.09 п. 6, 13); раніше вся навігація (16.09, 17.09) | `tabNav` у `manifest.json` | поле CMS для зовнішніх вкладок |
| `teacher-competence-centre`: «Новини» (вкладка `announcements`) | текст і фото відкриття (19.09 п. 9) | статика | стрічка категорії `teacher-competence-centre` замість статики: `news` у `tabNav` з підписом «Новини» |
| `kafedra-obrazotvorchogo-mystectva`: Головна | блок «Випускники кафедри» (19.09 п. 10); раніше тексти й галереї (16.09) | статика | `structure_pages` |
| `history-law`: Студентство («Виховна діяльність») | матеріал про посвяту в першокурсники (19.09 п. 12) | статика | `structure_pages` |
| `arts`: Освіта | посилання на розклад і графік (19.09 п. 15) | статика | `structure_pages` |
| `kafedra-angliyskoyi-filologiyi`: Головна, Історія, Освіта, Наука | тексти, склад кафедри (19.09 п. 16) | статика | `structure_pages` ×4 |
| `/education/quality` (`quality-centre`) | склад центру (19.09 п. 17) | `app/content/pages/quality-centre.uk.json` | `static_pages` slug `quality-centre` |
| `/science/candidate-support` | новий блок «доктора наук» (19.09 п. 4) | акордеони в `candidate-support.vue` | документи вже в `documents`; самі блоки — в коді |

### З попередніх раундів (16.09, 17.09)

Вкладки, які ми правили в статиці:

* `kafedra-specialnoyi-pedagogiky`: Освіта, Співпраця, Центр, Лабораторія
* `kafedra-socialnoyi-roboty`: усі вкладки
* `kafedra-obrazotvorchogo-mystectva`: Головна, Історія, Освіта, Наука
* `physical-education` (ФФВіС): Головна, Вступнику, Освіта, Студентство
* `kafedra-praktyky-angliyskogo-movlennya` (ПАУПМ): Головна (uk і en)
* `kafedra-ukrayinskoyi-movy`: Головна (фото співробітників)
* `mathematics-informatics`: Головна, Студентство
* `teacher-competence-centre`, `mental-health-centre`: усі вкладки (нові центри)
* `history-law`, `social-humanities`, `kafedra-olimpiyskogo-i-profesiynogo-sportu`: Головна
