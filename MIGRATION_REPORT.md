# KNPU Drupal → Nuxt content migration — report

## Scope of this pass

- University and Admissions sections; Ukrainian (`app/locales/uk.json`) only.
- Education / Science / Student sections deferred to a follow-up pass.
- Dynamic content (news, events, gallery, schedules, faculty leaf pages) flagged as Directus follow-up.

## Migrated pages

Bullet list: new route ← old URL — one-line note. Includes Agent 1 ([`MIGRATION_REPORT_PART_1.md`](MIGRATION_REPORT_PART_1.md)), Agent 3 ([`MIGRATION_REPORT_PART_3.md`](MIGRATION_REPORT_PART_3.md)), and pages migrated earlier in цій сесії (перелік від замовника).

**University**

- `/university/press` ← https://hnpu.edu.ua/uk/contacts та сторінка відділу зв’язків із громадськістю — пресслужба, email, положення (PDF).
- `/university/erasmus` ← новина про візит Erasmus+ та загальний опис KA1/KA2 — проєкт LECTURE-101179602, посилання на новину.
- `/university/mobility` ← окремої сторінки підрозділу не знайдено (404 на варіанти URL) — узагальнений текст координації через Центр міжнародної діяльності; stats без підтвердження з hnpu.edu.ua.
- `/university/contacts` ← контакти (мигровано раніше в сесії).
- `/university/structure` ← структура.
- `/university/public-info` ← публічна інформація.
- `/university/prozorro` ← Прозорро.
- `/university/volunteering` ← волонтерство.
- `/university/orders` ← накази / нормативка.
- `/university/statute` ← статут.
- `/university/financial-reports` ← фінансова звітність.
- `/university/newspaper` ← газета.
- `/university/integrity` ← академічна доброчесність.
- `/university/anticorruption` ← антикорупція.
- `/university/inclusive` ← інклюзія.
- `/university/council` ← вчена рада.
- `/university/rectorate` ← ректорат (картка ректора).

**Admissions**

- `/admissions/bachelor` (intro) ← Правила прийому, НМТ, ЄДЕБО (мігровано раніше в сесії).
- `/admissions/master` (intro) ← ЄВІ/ЄФВВ, посилання на сторінки 2026 (мігровано раніше).
- `/admissions/graduate` ← аспірантура/PhD, ЄВІ/ЄВВ (мігровано раніше).
- `/admissions/rules` ← Правила прийому 2026 (мігровано раніше).
- `/admissions/veterans` ← ТОТ, квота-2, освітній центр (мігровано раніше).
- `/admissions/creative` ← https://hnpu.edu.ua/uk/division/pryymalna-komisiya — Додаток 6, програми та розклад творчих конкурсів.
- `/admissions/budget` ← та сама — держзамовлення МОН; Додатки 1 та 11 до Правил; таблиця місць без фальшивих цифр (у JSON — «—»).
- `/admissions/benefits` ← та сама — Закон «Про вищу освіту», квота-1 / квота-2, категорії пільг.
- `/admissions/inclusive-edu` ← Положення Центру інклюзивної освіти (PDF), Указ № 401/2017, контакт координатора.
- `/admissions/second-degree` — **no-source generic** (URL `/uk/druga-vyshcha-osvita` — 404): узагальнений текст другої вищої освіти.

**Примітка:** файл [`MIGRATION_REPORT_PART_2.md`](MIGRATION_REPORT_PART_2.md) у репозиторії на момент збірки звіту **відсутній**; після його з’явлення варто доповнити цей розділ пунктами з Part 2.

## No old-site counterpart (new-site stubs / placeholder kept)

- `university.history`, `university.mission`, `university.symbolism`, `university.supervisoryBoard` (з [`MIGRATION_REPORT_PART_1.md`](MIGRATION_REPORT_PART_1.md)).
- `sections.partners` / партнери — окремої сторінки партнерів на hnpu.edu.ua не знайдено; імена партнерів з Directus на новому сайті.

## Old-site pages with no new-site home (recommend follow-up)

- https://hnpu.edu.ua/uk/zvit-rektora — link from `/university/financial-reports`
- https://hnpu.edu.ua/uk/dokumenty-samoanalizu-... — link from `/university/public-info`
- https://hnpu.edu.ua/uk/proyekty-polozhen — could link from `/university/orders`
- https://hnpu.edu.ua/uk/perevirka-na-plagiat — link from `/university/integrity`
- https://hnpu.edu.ua/uk/2026-yevi-yefvv та `/2026-asp-yevi-yevv` — already linked from admissions intros

## Skipped (dynamic / Directus / external)

- News archive, event archives (~thousands of entries) → Directus collections
- `university.gallery`, `university.memorial`, `university.faculties` → Directus
- `admissions.openDays` → Directus, `admissions.3dTour` / `ask` / `edebo` → interactive/external
- LMS (lms.hnpu.edu.ua), DSpace, library catalog, smc.hnpu.edu.ua sub-portal — outbound links only

## Deferred sections (next pass)

Education, Science, Student services — full mapping to be built in a second pass.

## Old CMS HTTP(S) links removed from app locales (2026)

**Scope:** `app/locales/en.json`, `app/locales/uk.json`, and `app/pages/admissions/veterans.vue` (contact row: no hardcoded `mailto`/duplicate address).

**Policy:** Removed `https://hnpu.edu.ua/…` and `smc.hnpu.edu.ua/…` web links from user-facing narrative strings and replaced them with short on-site summaries (references to Admissions, Education → Programmes, University → Orders / Contacts, and campaign notices). **Institutional `@hnpu.edu.ua` e-mail literals remain** in contacts and transactional copy (Vue i18n `{'@'}` escaping unchanged).

**Keys updated (EN/UK kept in parity, except noted):**

| Namespace / key | Former dependency | Replacement summary |
|---|---|---|
| `university.press.intro` | Press division PDF on old host | Regulation available on request from press office |
| `university.erasmus.intro` | News URL on old host | Agreement described; details via Centre for International Activity |
| `admissions.master.intro`, `admissions.graduate.intro` | Year-specific registrar pages | National schedule via testportal.gov.ua / MES + EDEBO |
| `admissions.rules.steps.step1.text`, `admissions.specialties.subtitle` | SMC programme portal | Programme browser + Rules annexes on this site |
| `admissions.creative.*` | PDF + admissions division URLs | Annex 6 + Admissions/faculty notices |
| `admissions.budget.intro` | Annex 1/11 PDFs + admissions URL | Summarised Annex 1/11 references on-site |
| `admissions.exams.intro` | Admissions division URL | Programmes annexed to Rules |
| `admissions.tuition.subtitle` | Orders registry + tariff page URLs | University → Orders + Rules annex |
| `admissions.benefits.intro` | Admissions division URL | Rules + Admissions via Contacts |
| `admissions.inclusiveEdu.intro` | Inclusive-centre PDF URL | Request text from Admissions / centre |
| `admissions.scholarships.intro` | Legacy domain mention + admissions URL | CMU № 1050 + on-site announcements |
| `admissions.prepCourses.intro` | Division landing URLs | Campus-based summary (Kharkiv / Valentynivska) |
| `student.email.intro` *(EN)* | Literal `@hnpu` domain in prose | Domain-agnostic mailbox wording |

**JSON repair:** `uk.json` — removed stray comma-only lines inside `admissions.veterans` benefit cards (file now parses cleanly).

**Validation:** `node` JSON.parse on both locale files; `pnpm run build` succeeded.

### Follow-up content tasks

- Mirror authoritative Annex PDFs (Rules of Admission, press regulation, inclusive-centre statute) under `/public` or Directus so downloadable sources match on-site summaries.
- Optionally align older migration markdown appendices (`MIGRATION_REPORT_PART_*.md`, `PLACEHOLDER_AND_LINK_MIGRATION.md`) with this strip — those files still mention historical Drupal URLs for traceability.

## Follow-ups

- Residual UA→EN polishing: several `student.*` / `education.*` UK strings remain lorem; schedule a translation pass independently of CMS URL removal.
- `locales/uk.json` (root, 322 lines) is stale; `nuxt.config.ts` only loads `app/locales`. Recommend deleting the root `locales/` folder.
- Several PDFs are linked to `https://hnpu.edu.ua/sites/default/files/...` — broken if old site is decommissioned. Plan to mirror in `/public` or Directus assets.
- Faculty/department detail pages will need a Directus collection.
- Verify with `pnpm dev` that all migrated pages render correctly.
- **`admissions/budget`:** у `app/pages/admissions/budget.vue` залишилися захардкожені числа 650 / 24 / 12; узгодити з реальними даними або прибрати після узгодження з Додатком 1.
- **PART_2:** додати записи з Agent 2 до розділу «Migrated pages», коли з’явиться `MIGRATION_REPORT_PART_2.md`.
