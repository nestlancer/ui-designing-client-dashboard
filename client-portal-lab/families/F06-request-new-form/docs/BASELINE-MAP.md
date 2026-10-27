# F06 · Request · New Form — Gate S · BASELINE-MAP

**Studied:** `Nestlancer-clients-screenshots/clients/041-new-request-form.webp` (opened, top-to-bottom) · `nestlancer-client-pages-html/10-requests-new-form.html` (DOM parsed, raw markup inspected) · `nestlancer-client-pages-html/audit-metadata.json` (`10-requests-new-form` record + failedRequests/consoleErrors) · `nestlancer-client-pages-html/README.md` map.

## GATE S (F06)
Screenshots opened: 1/1 · HTML opened: 1/1 · audit-metadata read: YES
Routes mapped: `/requests/new` · Content frozen: YES
Gate: PASS

## 1 · Route ↔ capture map

| Route | HTML snapshot | Screenshot | State captured |
|---|---|---|---|
| `/requests/new` | `10-requests-new-form.html` | `041-new-request-form.webp` | New Service Request intake — single populated-default form, no validation/error state captured |
| `/requests` (Cancel / Back to requests) | `07-requests-work-hub-list.html` | `023-requests.webp` | F05 family — real local lab link, not edited here |

## 2 · Content freeze

| Surface | Frozen value |
|---|---|
| H1 | `New request` |
| Intro | `Describe your project and save a draft. You can edit attachments and submit for quotes from the request page when you’re ready.` |
| Header action | `Back to requests` → `/requests` |
| Section 1 | `Brief` — `Title, scope, and category for your intake.` |
| Section 2 | `Budget` — `Approximate range in INR.` |
| Section 3 | `Timeline & requirements` — `Preferred dates and must-have items.` |
| Sticky footer | `Cancel` (→ `/requests`) · `Save draft` (submit) |
| Shell | sidebar 232px (MAIN / EXPLORE / ACCOUNT), header 64px: breadcrumb `Dashboard › Requests`, `Search ⌘K`, theme, messages, bell `6`, avatar `AM Arjun Mehta` (screenshot: `AI Ananya Iyer`) |
| Footer | sticky bar; no `© 2026 Nestlancer` on this route |

### The 10 locked fields (verified in the DOM)

| # | Label | Control | Verified attributes / values |
|---|---|---|---|
| 1 | `Title *` | `input#req-title[name=title]` | required, `minlength=5`, `maxlength=100`, placeholder `e.g. Redesign marketing site`, help button `aria-label="Help for Title"` |
| 2 | `Description *` | `textarea#req-description[name=description]` | required, placeholder `Goals, constraints, and what success looks like…`, help `Help for Description` |
| 3 | `Category` | `select#req-category[name=category]` | `Web Development` (default) · `Mobile App` · `E-commerce` · `Design` · `Branding` · `Marketing` · `SEO` · `Consulting` · `Maintenance` · `Custom`; help `Help for Category` |
| 4 | `Budget min` | `input[type=number]#req-budget-min[name=budgetMin]` | placeholder `50000`; help `Help for Budget min` |
| 5 | `Budget max` | `input[type=number]#req-budget-max[name=budgetMax]` | placeholder `150000`; help `Help for Budget max` |
| 6 | `Currency` | `input#req-currency` (no name) | value `INR`; help `Help for Currency` |
| 7 | `Budget is flexible` | `input[type=checkbox]#req-budget-flex[name=budgetFlexible]` | checked by default; help `Help for Budget is flexible` |
| 8 | `Preferred start` | `input[type=date]#req-preferred-start[name=preferredStartDate]` | value `2026-10-24` (screenshot renders `10/10/2026`); help `Help for Preferred start` |
| 9 | `Deadline` | `input[type=date]#req-deadline[name=deadline]` | value `2026-11-23` (screenshot `11/09/2026`); help `Help for Deadline` |
| 10 | `Requirements (one per line)` | `textarea#req-requirements[name=requirements]` | placeholder `Must-haves, integrations, constraints…`; help `Help for Requirements` |

All 10 help buttons are `aria-expanded="false"` with a Lucide `circle-help` SVG. **Tooltip copy is NOT present in the static DOM** (no `role=tooltip`, no hidden popover text, no tooltip strings in the RSC payload). Verified = the 10 `aria-label="Help for …"` strings only. Per the no-invention rule, the lab's tooltips use the frozen section descriptions + API constraint text (character limits, ISO currency, one-requirement-per-line, min ≤ max) and are flagged as lab-authored helper copy in `DECISIONS.md`. No tooltip copy is claimed to be verbatim from production.

## 3 · Audit-metadata findings (filtered to this route)

- `h1` = 26px/700, `h2` = 14px/600 — C18 target (H1 must become 32–40px; section titles 20–24px).
- 22 buttons = 12 shell controls + 10 help toggles + `Save draft` + menu. 10 inputs/selects/textareas counted.
- Cards: `rounded-lg border border-gray-200/80 bg-white shadow-none dark:border-gray-800 dark:bg-white/[0.02]` — C6 target; dark mode uses hard-coded greys (finding #11).
- Inputs: raw `border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900` — tokenise to `--card` / `--border`.
- Focus: `focus:ring-2 focus:ring-ta-brand-500/20`; help buttons use `focus-visible:ring-primary/40` (violet `--accent-1`) — C5 evidence of two primaries.
- `failedRequests` on this route: `app.nestlancer.com/requests/new?_rsc=…` → `net::ERR_ABORTED` (navigation abort, benign). **No 502/CORS console error is attributed to `/requests/new`** — the 502 errors belong to `/requests?view=all`, `/requests?view=projects`, `/projects`, `/dashboard`. The F06 error state is therefore a designed degraded-submit state, not a copied capture.

## 4 · Not verified (never invented)

- Production tooltip text, inline validation copy, success message text, dropzone copy, budget-guide copy: none captured. These are lab-authored from the frozen section descriptions + Swagger constraints, and are labelled accordingly.
- Any "market rate" / price benchmark for the budget guide: **not verified** — the guide uses only the captured placeholders `50000` / `150000` as an example band and the API's `min ≤ max` constraint. No invented pricing data.
