# Перенесення. Частина 4 — Навчання, Наука, підрозділи

Другий прохід міграції: сторінки, які перший прохід відклав (`MIGRATION_REPORT.md`, «Follow-ups»).
Джерела — `hnpu.edu.ua`, сайт центру забезпечення якості освіти `smc.hnpu.edu.ua`, Google-сайт
наукових шкіл і PDF «Основні напрямки наукової і мистецької діяльності кафедр» з Google Drive.

Усі файли перенесені у Directus: на сайті немає покликань на файли старих хостів.

## Нові сторінки

- `/university/licenses` ← https://hnpu.edu.ua/uk/diplomi-ta-sertifikati-hnpu — ліцензія,
  сертифікат на систему управління якістю, нагороди виставки «Сучасна освіта в Україні».
- `/university/scientific-secretary` ← https://hnpu.edu.ua/uk/division/sluzhba-vchenogo-sekretarya —
  опис служби + документи Вченої ради.
- `/education/academic-office` ← https://hnpu.edu.ua/uk/division/navchalnyy-viddil — опис, склад
  відділу, положення; графіки винесені на сторінку «Графік освітнього процесу».
- `/education/digital-center` ← https://hnpu.edu.ua/uk/division/centr-cyfrovizaciyi-osvity —
  опис центру, плитки Moodle/пошта, 26 інструкцій і форм.

## Наповнені сторінки

- `/education/accreditation` ← https://hnpu.edu.ua/uk/sertyfikaty-pro-akredytaciyu — **84
  сертифікати**, згруповані за рівнем вищої освіти та галуззю знань (акордеон).
- `/education/monitoring` ← https://hnpu.edu.ua/uk/monitoryng — **46 анкет** за напрямами
  діяльності, **95 записів результатів** за роками + програми досліджень, 2 нормативні документи.
- `/education/students` ← https://hnpu.edu.ua/uk/division/kontyngent — **133 щомісячні звіти**
  про контингент за 2020–2026 рр., згруповані за навчальними роками та формами навчання.
- `/education/schedule` — додано блок «Затверджені графіки» (8 файлів навчального відділу) і
  перехресні покликання на «Контингент студентів» та «Навчальний відділ».
- `/education/quality` ← http://smc.hnpu.edu.ua/ — вкладки наповнено: «Про центр» (опис, склад,
  положення), «Нормативна база», «Здобувачу», «Якість освіти», «Освітні програми» (11 документів),
  «Акредитація» — **76 акредитаційних справ і 207 документів НАЗЯВО** за 2019–2025 рр.
- `/science/directions` ← Google Drive PDF + https://sites.google.com/hnpu.edu.ua/scienceschools —
  **32 наукові школи** з керівниками/фундаторами та **188 напрямів 44 кафедр**.
- `/science/boards` ← https://hnpu.edu.ua/uk/specializovani-vcheni-rady-universytetu — три ради
  (Д 64.053.01, К 64.053.05, Д 64.053.08) з повними профілями і архівом захистів.
- `/admissions/committee` ← https://hnpu.edu.ua/uk/division/pryymalna-komisiya — 6 документів
  замість двох «зашитих» покликань на старий сайт.

## Меню «Навчання» (за наданим скріншотом)

- «Графік навчального процесу» → **«Графік освітнього процесу»**.
- «Моніторинг якості» → **«Моніторинг»**.
- Прибрано «Дистанційне навчання» і «Дуальна освіта», натомість доданий зовнішній пункт
  **Moodle** (https://lms.hnpu.edu.ua/moodle/). Самі сторінки лишилися в застосунку, без пункту меню.
- У колонці «Структура» додані «Навчальний відділ» і «Центр цифровізації освіти».
- У розділі «Університет» додані «Ліцензія та сертифікати» і «Служба вченого секретаря».
- «Контингент студентів» і «Графік освітнього процесу» лишаються в меню і додатково посилаються
  одне на одного всередині сторінок.

## Що з’явилося в Directus

Нові колекції: `monitoring_surveys`, `monitoring_survey_results`, `accreditation_certificates`,
`accreditation_dossiers`, `accreditation_dossier_files`, `contingent_reports`, `science_schools`,
`science_directions`. Нові розділи колекції `documents`: `licenses`, `awards`, `academic-office`,
`education-schedule`, `scientific-secretary`, `specialized-councils`, `quality-centre`,
`quality-centre-programmes`, `digital-center`, `admissions-committee`, `monitoring`,
`science-schools`.

Схема застосована скриптом `knpu-university-be/migration/schema/apply_schema.py`, знімок
`snapshots/schema.yaml` перегенеровано, публічний доступ на читання доданий у
`snapshots/bootstrap-public-access.sh`.

## Файли всередині текстів

Сторінки спеціалізованих учених рад містять архів захистів (дисертації, автореферати, відгуки).
Скрипт `migration/pass2/mirror_page_files.py` переніс **419 таких файлів** у Directus і переписав
покликання на `/assets/<uuid>`: 303 у Д 64.053.01, 88 у Д 64.053.08, 27 у К 64.053.05, 8 на
сторінці навчального відділу, 1 у гуртожитках. Ще **21 файл віддає 404** на старому сайті —
для них покликання зняте, текст лишився.

## Не перенесено

- **http://smc.hnpu.edu.ua/dokumenty** — сторінка закрита авторизацією («Ви не авторизовані для
  перегляду сайту»), тому вкладку «Документи» на сторінці центру прибрано.
- **Новини центру якості** — чекають на дамп бази сайту центру; вкладка «Новини» показує
  повідомлення про наповнення.
- **9 файлів віддають 404 на старому сайті** і не збереглися: «Політика у сфері якості», графік
  освітньо-наукового процесу 2022-2023 (доктори філософії), «Рекомендації щодо застосування
  Критеріїв оцінювання якості ОП», програма анкети №3, чотири файли результатів анкет 2021–2022 рр.
  і один звіт про контингент за 06.2021.
- **Одне покликання «Результати»** на сторінці моніторингу веде на вкладення Gmail
  (`mail-attachment.googleusercontent.com`) — приватна й задовга адреса, пропущена.
- **Чотири покликання на сторінки старого сайту** лишилися в текстах `dormitories` та
  `inclusive-support` — це сторінки першого проходу міграції, вони не входили в цей обсяг.
- **Кваліфікаційні картки наукових шкіл** (Google Docs) — на джерелі вони не мають однозначної
  прив’язки до конкретної школи, тому не переносилися; самі школи, керівники та фундатори перенесені.

---

# Прохід 3 — виправлення за результатами перегляду

## 1. Фізико-математичний факультет

У `units.map.json` застарілий alias `fac-prirodn` був прописаний одразу двом підрозділам, тому на
сторінці фізмату лежав контент природничого факультету, а в блоці «Деканат» стояло його
керівництво. Новий скрипт `migration/structure-pages/8_fix_unit_content.py`:

- прибрав **17 чужих секцій** із 7 вкладок (`home`, `admission`, `education`, `science`,
  `students`, `history`, `cooperation`) і **14 сторонніх `sourceUrls`** — на сторінці
  `/university/structure/special-education` вони лишилися без змін;
- переніс справжній деканат фізмату з вкладки «Структура» у картки на головній:
  **Пономарьова Н. О. (декан), Простакова Ю. С., Глейзер Н. В., Гуліч О. О.** — з фото;
- `units.map.json` і README виправлені, щоб повторний запуск пайплайна не змішав факультети знову.

## 2. Волонтерство

`/university/volunteering` ← https://hnpu.edu.ua/uk/volonterskyy-ruh-… — 30 тис. знаків тексту,
**12 світлин** перенесено в Directus, відео збережено. Вигадані картки «напрямів» прибрані.

## 3. Антикорупція у структурі

Пункт «Уповноважений підрозділ з питань запобігання та виявлення корупції» тепер веде на
https://sites.google.com/view/khnpuanticorupcia (як інші зовнішні підрозділи).

## 4. Накази і демо-дані

- `/university/orders` ← https://hnpu.edu.ua/uk/nakazy-z-osnovnoyi-diyalnosti-universytetu:
  **127 наказів 2015–2026** із номерами й датами (7 файлів на старому сайті вже недоступні).
  Латинські літери, набрані замість кирилиці («замiщення»), виправлені.
- Причина помилки «Failed to load PDF document»: у `university_orders` лежали **демо-рядки з
  файлами по 116 байтів** із `snapshots/seed-content.sh`. Новий скрипт
  `migration/pass2/cleanup_seed_demo.py` знаходить і видаляє їх, а також інші seed-заглушки та
  документи-покликання на сторінки старого сайту. Локально виконано: **19 файлів і 2 документи**.
  **На проді ще треба виконати** — там 8 демо-наказів і ~32 заглушки (див. «Як перевірити»).
- Завантажувач тепер перевіряє вміст: файл коротший за 1 КБ або без сигнатури `%PDF`/JPEG/PNG
  відхиляється, тож HTML-сторінка помилки більше не потрапить у Directus під назвою `.pdf`.

## 5. Матеріально-технічне забезпечення

`/university/facilities` отримала блок **із 6 відео** (загальний фільм + 5 роликів факультету
природничої, спеціальної і здоров’язбережувальної освіти). Два документи-покликання на сторінки
старого сайту видалені.

## 6. Контакти і зворотний зв'язок

`/university/contacts` — реальні дані зі старого сайту: **10 служб** (ректор, прес-служба,
уповноважені особи, телефон довіри, антидискримінація, булінг, доброчесність, дистанційна освіта,
приймальна комісія) з телефонами, поштами й кабінетами; **3 корпуси** з покликанням на мапу
замість декоративної заглушки; блок «Довідники» (4 PDF, розділ `contacts` у Directus).
`/feedback` — категорії звернень зі старої форми як адреси профільних служб.

## 7. Відділ аспірантури і докторантури

Вкладки наповнені сторінками старого сайту: «Аспіранти — громадяни України», «Аспіранти —
іноземні громадяни», «Освітньо-наукова діяльність аспірантів» (вкладка «Аспіранту», разом ~44 тис.
знаків, **121 світлина** в Directus) і «На допомогу здобувачеві наукового ступеня» (вкладка
«Докторанту»). Ще **56 файлів** із текстів перенесено в Directus. Блок керівництва не додавали —
за вашим рішенням лишається тільки картка контактів. Новий скрипт для цього:
`migration/pass2/append_structure_section.py`.

## Як перевірити

1. **Бекенд.** `cd knpu-university-be && docker compose -f docker-compose.dev.yml up -d`,
   відкрити http://localhost:8055 і звірити кількості:
   `accreditation_certificates` — 84, `contingent_reports` — 133, `monitoring_surveys` — 46,
   `monitoring_survey_results` — 95, `accreditation_dossiers` — 76,
   `accreditation_dossier_files` — 207, `science_schools` — 32, `science_directions` — 188.
2. **Фронтенд.** `cd knpu-university-fe && docker compose -f docker-compose.dev.yml up -d`,
   відкрити http://localhost:3000. **Не запускати `pnpm dev` / `pnpm build` на хості** — це псує
   `.nuxt` контейнера.
3. **Пройти сторінки:** `/university/licenses`, `/university/scientific-secretary`,
   `/education/academic-office`, `/education/digital-center`, `/education/accreditation`,
   `/education/monitoring`, `/education/students`, `/education/schedule`, `/education/quality`
   (усі вкладки), `/science/directions`, `/science/boards`, `/admissions/committee`.
   На кожній відкрити будь-який файл — адреса має починатися з `…:8055/assets/`, а не з
   `hnpu.edu.ua`.
4. **Меню.** Навести «Навчання»: мають бути «Графік освітнього процесу», «Моніторинг», «Moodle»,
   «Навчальний відділ», «Центр цифровізації освіти»; «Дистанційного навчання» і «Дуальної освіти»
   бути не повинно.
5. **Перевірки в репозиторії:**
   ```bash
   cd knpu-university-fe
   grep -rn "hnpu.edu.ua/sites/default" app/pages app/content   # тільки поле sourceUrls
   node -e "JSON.parse(require('fs').readFileSync('app/locales/uk.json','utf8'))"
   node scripts/check-structure-content-size.mjs
   docker compose -f docker-compose.dev.yml exec app pnpm run build
   ```
6. **Повторний запуск міграції** (наприклад, на проді) — див.
   `knpu-university-be/migration/pass2/README.md`; скрипти ідемпотентні, на проді потрібен
   статичний токен `DIRECTUS_TOKEN`.

## Як перевірити прохід 3

- `/university/structure/mathematics-informatics` — кафедри фізмату й деканат Пономарьової,
  жодної згадки природничого факультету
  (`grep -rn "pryrodnych" app/content/structure/mathematics-informatics` → порожньо);
  `/university/structure/special-education` — без змін.
- `/university/structure` — «Уповноважений підрозділ з питань запобігання та виявлення корупції»
  відкриває гугл-сайт у новій вкладці.
- `/university/orders` — 127 наказів; відкрити 2–3 PDF (мають починатися з `%PDF`).
- `/university/facilities` — 6 відео; `/university/volunteering` — текст і фото зі старого сайту.
- `/university/contacts` і `/feedback` — реальні служби, пошти, корпуси з покликанням на мапу.
- `/university/structure/postgraduate` — вкладки «Аспіранту» й «Докторанту» наповнені.
- **Прод.** Демо-накази ще на місці — саме через них не відкривалися файли. Спочатку подивитися
  список, і лише потім видаляти:
  ```bash
  cd knpu-university-be/migration/pass2
  export DIRECTUS_URL=https://hnpu-admin.dev42hub.uk DIRECTUS_TOKEN=…
  python3 cleanup_seed_demo.py --seed-orders --seed-files --legacy-links        # лише список
  python3 cleanup_seed_demo.py --seed-orders --seed-files --legacy-links --yes  # після перегляду
  python3 load.py data/orders.json                                             # 127 наказів
  ```
