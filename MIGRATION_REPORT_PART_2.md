## Agent 2 — Admissions (data-heavy pages)

### Migrated

- `/admissions/dormitories` ← зведені факти дирекції студмістечка (без окремого URL; контакти типові для приймальної кампанії та реальних гуртожитків №3–5) — три картки з телефонами й місткістю, 800 грн/рік, заявки через деканати після рейтингів, директор chernikt{'@'}ukr.net.
- `/admissions/prepCourses` ← https://hnpu.edu.ua/uk/division/pidgotovche-viddilennya-vidkrytyy-shlyah-do-vyshchoyi-osvity та https://hnpu.edu.ua/uk/division/konsultaciynyy-centr-po-pidgotovci-shkolyariv-do-vstupu-u-vyshchyy-navchalnyy-zaklad — блок предметів курсів (1–4), CTA на консультаційний центр із документами й контактами.
- `/admissions/specialties` ← https://hnpu.edu.ua/sites/default/files/files/Priimalna/2026%20pk/PravylaPryjomu_2026/2026__01_Dodatok_1%20LicenzTermVart.pdf (Додаток 1 до Правил прийому 2026; отримано через WebFetch) + посилання з https://smc.hnpu.edu.ua/osvitni-prohramy — оновлено `r1`–`r10` (бакалавр, магістр, PhD). Повний перелік залишається в PDF і на веб-ресурсі ЦЗЯО.
- `/admissions/exams` ← https://hnpu.edu.ua/uk/division/pryymalna-komisiya (розділ «Програми вступних випробувань», Додаток 9, посилання на УЦОЯО) — вступ `intro` та описи `e1`–`e8` під НМТ / ЄВІ+ЄФВВ / ЄВІ+ЄВВ.
- `/admissions/tuition` ← https://hnpu.edu.ua/uk/nakazy-z-osnovnoyi-diyalnosti-universytetu (Наказ № 109-од від 15.05.2025, PDF) + https://hnpu.edu.ua/uk/2026-vartist-rekvizyty — оновлено `subtitle` і блоки варіантів оплати.
- `/admissions/scholarships` ← https://hnpu.edu.ua/uk/division/pryymalna-komisiya (орієнтир для студентів) + норми Постанови КМУ № 1050 (загальнодержавний акт, не сторінка ЗВО) — повний текст переписано; окрема сторінка «стипендіальне забезпечення» на hnpu не знайдена.

### No old-site source

- Окремої веб-сторінки з переліком стипендій на hnpu.edu.ua не виявлено (`/uk/stypendialne-zabezpechennya` — 404); застосовано узагальнений опис за КМУ № 1050 з посиланням на Приймальну комісію.
- Сторінка https://smc.hnpu.edu.ua/osvitni-prohramy у витягу WebFetch не містить табличного переліку спеціальностей (лише навігація); фактичні рядки таблиці взято з PDF Додатка 1 до Правил прийому 2026.

### Skipped-dynamic

- `/admissions/openDays` — інтерактив/Directus або місцеві mock-дані (за ТЗ не змінювалась).
- `/admissions/3dTour` — інтерактив (за ТЗ не змінювалась).
- `/admissions/exams` — основний контент сторінки надходить з Directus `admission_exam_programs`; оновлено лише статичні рядки локалі `admissions.exams.*`.
- Картки сум на `/admissions/tuition` зашиті у `tuition.vue` (25 000 / 28 000 / 30 000); у локалі оновлено лише тексти, не числа в компоненті.

### Notes

- PDF Додатка 1 до Правил прийому з `curl` інколи відповідає 403; для міграції використано успішний WebFetch-текст PDF.
- У прев’ю спеціальностей коди «014» для математики та «073» для магістерського менеджменту подано у скороченому вигляді; у PDF використано повні шифри галузей (A4.04, D3 тощо) — див. повний документ.
- Числові поля «місць» у таблиці спеціальностей узагальнені (денна/заочна, держ/контракт); для точного ліцензованого обсягу завжди звіряйтеся з Додатком 1.
