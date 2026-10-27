# F05 · Requests Work Hub — Gate S · BASELINE-MAP

**Studied:** `Nestlancer-clients-screenshots/clients/023-requests.webp`, `045-requests-projects-view.webp` (opened, top-to-bottom) · `nestlancer-client-pages-html/07-*, 08-*, 09-*` (DOM parsed) · `nestlancer-client-pages-html/audit-metadata.json` (`auditLog`, `failedRequests`, `consoleErrors`) · `nestlancer-client-pages-html/README.md` map.

## GATE S (F05)
Screenshots opened: 2/2 · HTML opened: 3/3 · audit-metadata read: YES
Routes mapped: `/requests` · `/requests?view=all` · `/requests?view=projects` · Content frozen: YES
Gate: PASS

## 1 · Route ↔ capture map

| Route | HTML snapshot | Screenshot | State captured |
|---|---|---|---|
| `/requests` | `07-requests-work-hub-list.html` | `023-requests.webp` | Requests tab, populated list |
| `/requests?view=all` | `08-requests-work-hub-all-tab.html` | `023-requests.webp` | All tab, filters present, zero rows in static DOM (honest empty state to design) |
| `/requests?view=projects` | `09-requests-work-hub-projects-tab.html` | `045-requests-projects-view.webp` | Projects tab: DOM = 502 error card; screenshot = populated project row from a healthy session |
| `/requests/new` (CTA target) | `10-requests-new-form.html` | `041-new-request-form.webp` | Out of F05 scope — built by F06, linked as a real local page |

## 2 · Content freeze (captured DOM wins; screenshots are alternate accounts)

| Surface | Frozen value | Source |
|---|---|---|
| H1 | `Work Hub` | 07/08/09 + both screenshots |
| Header line | `All your service requests and active projects in one place.` | 07/08/09 |
| CTA | `New request` → `/requests/new` | 07/08/09 |
| KPI strip | `Total requests 26 · Under review 0 · Quoted 0 · Projects 5` | 07 DOM (audit account Arjun Mehta). Screenshot 023 shows `3 / 0 / 0 / 1` (Priya Nair session); screenshot 045 shows `2 / 1 / 0 / 1` (Ananya Iyer session). **DOM frozen**, screenshot variances recorded, no numbers invented. |
| Tabs | `All · Requests (12) · Projects` (`role=tablist`, `aria-selected`) | 07/08/09; prompt §4 also freezes `Requests (12)`. Screenshot 023 shows `Requests (3)`, 045 shows `Projects (1)` — same session variance. |
| Status filter | `All statuses · Draft · Submitted · Under review · Quoted · Changes requested · Converted to project · Rejected · Cancelled` | `select#work-hub-status` in 07/08. Prompt §4 omits `Under review` + `Quoted`; captured DOM wins (README provenance rule). |
| Search | `Search work items…` (`aria-label="Search work items"`, `name="q"`) | 07/08/09 |
| Row grammar | title · type (`Request`/`Draft`/`Project`) · category (`Web Development`/`Custom`) · date (`Oct 5/6, 2026`) · status badge | 07 DOM |
| Pagination | `Showing 1–12 of 26` · `Prev` (disabled on page 1) · `1 / 3` · `Next` | 07 DOM; screenshot variant `Showing 1–3 of 3` · `1 / 1` |
| Row destinations | `/requests/01a10f84-...`, `01a10f82-...`, `01a10f7f-...`, `01a10b3a-...`, `01a10b34-...`, `01a10aa6-...`, `01a10aa2-...`, `01a10fa4-...`, `01a10fa3-...`, `01a10f87-...`, `01a10f86-...`, `01a10f84-ddf5-...` | 07 DOM (12 real UUID links) |
| Error state | `Something went wrong` / `Could not load work items.` / `Try again` (`role=alert`) | 09 DOM (502 on `GET /api/v1/projects`) |
| Populated Projects row | `Razorpay Settlement Reconciliation Engine` · `Project` · `Revision Requested` · `Oct 5, 2026` | `045-requests-projects-view.webp` (only healthy projects-tab capture) |
| Footer | `© 2026 Nestlancer` | screenshots |
| Shell | sidebar 232px (MAIN / EXPLORE / ACCOUNT), header 64px: breadcrumb `Dashboard › Requests`, `Search ⌘K`, theme, messages, bell `6`, avatar (AM Arjun Mehta / PN Priya Nair / AI Ananya Iyer) | 07/08/09 + screenshots |

### Frozen request rows (page 1, from `07` DOM)
`AUDIT-P24-20261005-6y6fa-sent Request` (Request · Web Development · Oct 6, 2026 · Expired Quote) · `AUDIT-P24-20261005-6v89t-sent Request` (same) · `AUDIT-P23-20261005-6rdsf Request to Quote Builder` (same) · `AUDIT-P24-20261005-03ipf-sent Request` (Oct 5 · Expired Quote) · `AUDIT-P23-20261005-zvc6j Request to Quote Builder` (Oct 5 · Expired Quote) · `AUDIT-P24-20261005-uc3d4-sent Request` (Oct 5 · Expired Quote) · `AUDIT-P23-20261005-u7d0j Request to Quote Builder` (Oct 5 · Expired Quote) · `AUDIT-P23-LINE-20261005-7r0l Request` (Oct 6 · Submitted) · `AUDIT-P23-SUPP-20261005-6grw Request` (Oct 6 · Submitted) · `AUDIT-P25-20261005-73dhk Project Fixture` (Oct 6 · Converted To Project) · `Copy of AUDIT-P24-20261005-6y6fa-sent Request` (Draft · Oct 6 · Draft) · `AUDIT-P24-20261005-6y6fa-draft Request` (Oct 6 · Submitted).

## 3 · Audit-metadata findings (filtered to these routes)

- `h1` = 26px/700 — too small (C18); no display step anywhere in this family.
- Buttons: 16 (07) / 14 (08) / 15 (09); active tab colour `rgb(54,65,245)` (= brand-600), inactive `rgb(107,114,128)` — one blue ramp already in use.
- Inputs: 07/08 = `select[status]` + `input[q]`; 09 = `input[q]` only (status filter disappears on the Projects tab).
- Card classes are raw `border-gray-200/80 bg-white shadow-none` — C6 tokenisation target. Badges are 12px saturated text on 12% tint — C4 target.
- `failedRequests`: many `app.nestlancer.com/requests?_rsc=…` `net::ERR_ABORTED` (navigation aborts, benign) **plus** `GET https://api.nestlancer.com/api/v1/projects → net::ERR_FAILED` (the real 502).
- `consoleErrors`: `Access to XMLHttpRequest at 'https://api.nestlancer.com/api/v1/projects' … blocked by CORS policy` appears on `/requests?view=all` **and** `/requests?view=projects`; followed by `Failed to load resource: net::ERR_FAILED`. This is the network/502 pattern F05 must render honestly with retry.

## 4 · Not verified (never invented)

- Tooltip/popover copy on this family: none captured (no help buttons on 07–09).
- The API's exact `data` payload shape for lists/stats: specs return `ApiSuccessEnvelopeDto` with `data: object, additionalProperties: true`; field names beyond the frozen row grammar are **not verified**.
- `Cancelled` and `Expired Quote` are **UI display values only** — the Swagger status enum has no `cancelled` (see `API-MAP.md`).
