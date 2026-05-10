# Placeholder routes & old-site links — audit, extraction, implementation

## 1. Placeholder inventory (EN + UK parity)

| Route | Component (before) | Title i18n key | Status (after) |
| --- | --- | --- | --- |
| `/memorial` | `SharedPlaceholderPage` | `nav.memorialPage` | SSR redirect → `/university/memorial` (full page + Directus `memorial_entries`) |
| `/accessibility` | `SharedPlaceholderPage` | `footer.accessibility` | New `accessibility.vue` with `standalonePages.accessibility` |
| `/sitemap` | `SharedPlaceholderPage` | `footer.sitemap` | New `sitemap.vue` (nav-derived + service links) |
| `/privacy` | `SharedPlaceholderPage` | `footer.privacy` | New `privacy.vue` with `standalonePages.privacy` |
| `/feedback` | `SharedPlaceholderPage` | `utility.feedback` | New `feedback.vue` with `standalonePages.feedback` |
| `/admissions/ask` | `SharedPlaceholderPage` | `nav.admissions.ask` | New `admissions/ask.vue` with `standalonePages.admissionsAsk` |
| `/admissions/edebo` | `SharedPlaceholderPage` | `nav.admissions.edebo` | New `admissions/edebo.vue` with `standalonePages.admissionsEdebo` |

**Global “coming soon” copy:** `common.comingSoon` (`en` / `uk`) — still used where applicable; removed from the seven routes above.

**Note:** Primary nav already links “Memorial” to `/university/memorial`. The root `/memorial` slug was an extra placeholder; it now redirects canonically.

---

## 2. Old-site URLs in `app/locales/*.json` (inventory only)

Policy for this task set: **inventory + placeholder replacement**; wholesale removal of `hnpu.edu.ua` / `smc.hnpu.edu.ua` from all locale strings is tracked as follow-up (plan step 4).

**Counts (substring match on full URL host):**

| File | `hnpu.edu.ua` + path / PDF | `smc.hnpu.edu.ua` | Email-only `@hnpu.edu.ua` |
| --- | --- | --- | --- |
| `app/locales/en.json` | Mixed inline links + PDFs in admissions/university/news-related strings | 2 (`specialties` copy) | `utility.email`, contacts, desks |
| `app/locales/uk.json` | Same namespaces (parallel keys) | 2 | Same pattern |

**Representative keyed areas (both locales unless noted):**

- `utility.email`, footer / rector contact lines embedding `hnpu.edu.ua` mail domain (not CMS links).
- `university.press.intro` — PDF on `sites/default/files/...`.
- `university.erasmus.intro` — news URL on hnpu.
- `admissions.master.intro`, `admissions.graduate.intro` — hnpu landing + `https://vstup.edbo.gov.ua` (EDEBO is **national**; retained by policy).
- `admissions.specialties`, `rulesTable.*` — `smc.hnpu.edu.ua/osvitni-prohramy`.
- `admissions.creative`, `benefits`, `budget`, `exams`, `tuition`, `scholarships`, `prepCourses`, etc. — PDFs on `sites/default/files/...`, division pages `/uk/division/pryymalna-komisiya`, news/orders hubs.
- `student.email.intro` (`en`) — corporate mailbox explanation.

Exact line-level hits: run  
`rg "hnpu\\.edu\\.ua|smc\\.hnpu" app/locales/en.json app/locales/uk.json`  
in `knpu-university-fe`.

**No** `hnpu.edu.ua` / `smc.hnpu.edu.ua` **strings were added** in the new `standalonePages.*` or replacement pages.

---

## 3. Old-site extraction (reusable facts per destination)

| Destination | Mapped old sources (fetched or verified) | Reuse in app |
| --- | --- | --- |
| `/admissions/ask` | `https://hnpu.edu.ua/uk/division/pryymalna-komisiya` | Official e-mail `priimalna{'@'}hnpu.edu.ua`, phone +38 (050) 657-80-73, responsible secretary Nesterenko N. P.; deputies Shtonda O. H. (+38 (099) 797-71-88 WhatsApp — general & TOT), Melnykova O. V. (+38 (066) 793-56-40 — vouchers); winter admission coordinator Martsyn S. O. (+38 (099) 956-33-28), hours Mon–Fri 9:00–16:00 (break 12:00–13:00). |
| `/admissions/ask` (consult centre) | `https://hnpu.edu.ua/uk/division/konsultaciynyy-centr-po-pidgotovci-shkolyariv-do-vstupu-u-vyshchyy-navchalnyy-zaklad` | Address Kharkiv, Valentynivska 2, building B, room 402; `consult_centre{'@'}hnpu.edu.ua`; hours 9:00–16:00; head Stasevskiy Yu. S.; Savchenko O. M., +38 (097) 046-13-92; required docs: passport/birth certificate + tax ID copy, two 3×4 photos (for enrolment at consult centre — summarised briefly). |
| `/admissions/edebo` | National **Applicant electronic cabinet**: `https://vstup.edbo.gov.ua` (blocked with 403 to automated fetch; content is standard MoES official flow) | Explain e-application, priorities, confirmations, link to EDEBO; reference MoNES higher-ed admissions hub conceptually (`mon.gov.ua`). |
| Memorial | No stable hnpu memorial HTML path returned 200 for guessed slugs (`/uk/memorial`, `/uk/pamyat-memorial`) | Editorial honour text only; portraits from **Directus** `memorial_entries` on `/university/memorial`; `/memorial` redirects there. |
| Accessibility / privacy / feedback / sitemap | No dedicated hnpu equivalents returned 404 for guessed slugs | **Generic** bilingual policy/accessibility statements, site map from live routes, privacy aligned with UA Law “On personal data protection” wording at high level — **no fabricated legal citations.** |

---

## 4. Implementation summary

- Added `standalonePages.*` + `seo.*` keys (`en.json` / `uk.json`).
- Rewrote `university.memorial.intro` (removed lorem); dropped unused `portrait1`–`portrait12` placeholder keys from both locales (content comes from CMS).
- Replaced seven placeholder shells: six full pages + one redirect (`/memorial` → `/university/memorial`).

Follow-up for a later PR: execute plan step **4** — strip or replace remaining `hnpu.edu.ua` / `smc.hnpu.edu.ua` URLs across `admissions.*` and `university.*` namespaces per editorial policy.
