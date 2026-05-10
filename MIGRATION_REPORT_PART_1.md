## Agent 1 — University section

### Migrated

- `/university/press` ← https://hnpu.edu.ua/uk/contacts та https://hnpu.edu.ua/uk/division/viddil-zvyazkiv-z-gromadskistyu-ta-zasobamy-masovoyi-informaciyi — оновлено вступ, блоки послуг, контакт (назва відділу, позиція «Пресслужба ХНПУ», email `press{'@'}hnpu.edu.ua`), додано посилання на положення відділу (PDF на hnpu.edu.ua).
- `/university/erasmus` ← https://hnpu.edu.ua/uk/news/22-24-kvitnya-2026-r-navchalnyy-vizyt-uchasnykiv-proyektu-erazmus-vprovadzhennya-providnyh (і загальний опис Erasmus+ KA1/KA2) — замінено lorem: реальний проєкт LECTURE-101179602, візит до Університету Балеарських островів, посилання на новину; оновлено описи типів програм, кроків подачі заявки та примітку про партнерів.
- `/university/mobility` — без окремої сторінки підрозділу на старому сайті (анкорні URL дали 404); замінено lorem у вступі узагальненим описом координації через Центр міжнародної діяльності та оновлено тексти видів мобільності, підписи до показників і відгуки (узгоджені з контекстом Erasmus+, без цитування реальних інтерв’ю).

### No old-site source

- `/university/mobility` — детальна сторінка Центру міжнародної діяльності: `https://hnpu.edu.ua/uk/division/centr-mizhnarodnoyi-diyalnosti` та `https://hnpu.edu.ua/uk/division/viddil-mizhnarodnoyi-diyalnosti` повертають 404; для вступу використано загальний опис і дані з розділу контактів нового фронту (Центр міжнародної діяльності). Числові показники в блоці stats залишено без підтвердження з hnpu.edu.ua.
- `/university/partners` (локаль: `sections.partners`, `partners.*`, не `university.partners`) — `https://hnpu.edu.ua/uk/partners` 404; `https://hnpu.edu.ua/uk/diplomi-ta-sertifikati-hnpu` містить ліцензії та нагороди, а не перелік партнерів. Реальні назви партнерів на сторінці нового сайту з Directus; у `app/locales/uk.json` окремих ключів для імен партнерів немає — значення секції не змінювалися.

### Dynamic / Directus (skipped)

- `/university/faculties` — контент з Directus / структурні дані.
- `/university/gallery` — медіа з Directus.
- `/university/memorial` — інтерактив / Directus.

### External-only / left as-is (no old-site counterpart)

- `/university/history`
- `/university/mission`
- `/university/symbolism`
- `/university/supervisory-board`

### Other notes

- `https://hnpu.edu.ua/uk/partnerstvo` — 404.
- `https://hnpu.edu.ua/uk/mizhnarodna-diialnist` — таймаут при WebFetch; зміст не отримано.
- Додаткові перевірки шляхів через `curl -sI` до hnpu.edu.ua деяких варіантів URL повернули 403 (обмеження сервера для HEAD-запитів), не вплинуло на міграцію через WebFetch для основних сторінок.
- У блоці `university.press.contact.name` використано формулювання з ТЗ («…та ЗМІ»); на старому сайті повна назва — «…та засобами масової інформації» (еквівалент).
