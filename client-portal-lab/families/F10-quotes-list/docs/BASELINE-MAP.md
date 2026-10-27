# F10 · Quotes List — Gate S · BASELINE-MAP

The quotes list (`/quotes`), reconstructed from its screenshot, HTML snapshot, and `audit-metadata.json` before changing a single pixel. Content is **frozen** to the Arjun Mehta DOM capture (`15-quotes-list.html`). Screenshot `021-quotes.webp` (Rahul Desai session) is cross-referenced for layout and component anatomy only and never merged into the Arjun Mehta data.

```
## GATE S (F10)
Screenshots opened: 1/1 · HTML opened: 1/1 · audit-metadata read: YES
Routes mapped: /quotes · Content frozen: YES
Gate: PASS
```

---

## 1 · Sources Opened (in order)

1. `client-portal-prompts/F10-quotes-list.md` + discipline references (`example.homepage-prompt.md`, `example.portfolio-listing-prompt.md`).
2. Screenshot **1/1**: `Nestlancer-clients-screenshots/clients/021-quotes.webp`.
3. `nestlancer-client-pages-html/README.md` (row 25) + HTML snapshot **1/1**: `nestlancer-client-pages-html/15-quotes-list.html` + cross-references `01-dashboard-overview-quotes-tab.html`, `16-quote-details-awaiting-acceptance.html`, `17-quote-details-accepted.html` + `nestlancer-client-pages-html/audit-metadata.json`.
4. `reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md` + `reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx` (all 10 sheets).
5. `backend-api-swagger/README.md` + `quotes.openapi.json`.

---

## 2 · Screenshot ↔ HTML ↔ Route Map

| HTML file | Route | Captured state | Matching screenshot | Session / account |
|---|---|---|---|---|
| `15-quotes-list.html` | `/quotes` | Quotes list + 4 summary KPIs + status filter + 12 quote rows + pagination | `021-quotes.webp` | **Arjun Mehta (`AM`)**, 6 unread notifications (**Content Truth**) |

### Cross-session note (`021-quotes.webp` vs `15-quotes-list.html`)
- **Screenshot `021-quotes.webp`** captures the **Rahul Desai (`RD`)** session (7 unread messages, 14 notifications): KPIs `Total 1 · Pending 0 · Accepted 0 · Declined 1`, one row `Warehouse & Fleet Operations Portal · Oct 5, 2026 · Declined · ₹19,800.00`, `Showing 1–1 of 1`.
- **HTML `15-quotes-list.html`** captures the **Arjun Mehta (`AM`)** session (6 unread notifications): KPIs `Total 12 · Pending 0 · Accepted 5 · Declined 0`, 12 rows (5 Accepted, 7 Expired), `Showing 1–12 of 12`.
- Per prompt §4 ("Content lock"), all F10 variants lock to the **Arjun Mehta DOM (`15-quotes-list.html`)**. Rahul Desai's single declined row is documented here as screenshot evidence of the `Declined` badge anatomy, never mixed into Arjun Mehta's 12 rows.

---

## 3 · Audit Metadata Census (`audit-metadata.json` → `15-quotes-list.html`)

- **URL:** `https://app.nestlancer.com/quotes`
- **Title:** `Quotes · Nestlancer`
- **H1:** `Quotes` (`Outfit`, `26px`, `font-weight: 700`, `line-height: 32px`, `rgb(15, 23, 41)`) — only 1 heading on the page (no H2s in live DOM).
- **Inputs (1):** `<select name="quote-status" aria-label="Filter quotes by status">` with 7 options:
  1. `All statuses` (`value=""`)
  2. `Awaiting response` (`value="sent"`)
  3. `Viewed` (`value="viewed"`)
  4. `Changes requested` (`value="changesRequested"`)
  5. `Accepted` (`value="accepted"`)
  6. `Declined` (`value="declined"`)
  7. `Expired` (`value="expired"`)
- **Buttons (13):** Sidebar groups (`MAIN`, `EXPLORE`, `ACCOUNT`), `Collapse sidebar`, `Open navigation menu`, `Open command menu` (`Search ⌘K`), `Switch to dark mode`, `Messages`, `6 unread notifications` (`6`), `Account menu for Arjun Mehta` (`AM Arjun Mehta`), `Previous page` (`Prev`, disabled), `Next page` (`Next`, disabled), mobile `Open full menu` (`Menu`).
- **Tables:** `0` (`<table>` not used in live DOM; rows are rendered as `<a href="/quotes/{id}">` flex cards inside a container card).
- **Failed requests / console errors on `/quotes`:** `0` API errors on `/quotes` itself (only Next.js `_rsc` prefetch aborts during crawl navigation).

---

## 4 · Frozen Content Truth (Verbatim from `15-quotes-list.html`)

### 4.1 Header & Intro
- **Breadcrumb:** `Dashboard` › `Quotes`
- **H1:** `Quotes`
- **Lead copy:** `Review platform quotes from the Nestlancer team, accept when ready, or request changes.`

### 4.2 Summary KPIs (4 cards)
| Label | Value | Audit note |
|---|---:|---|
| `Total` | `12` | 5 Accepted + 7 Expired in the captured list |
| `Pending` | `0` | 0 awaiting response at capture time (Oct 24, 2026); see §4.4 for the grounded pre-expiry awaiting state |
| `Accepted` | `5` | ₹1,37,750.00 combined across the 5 accepted quotes |
| `Declined` | `0` | 0 declined in Arjun Mehta's account |

### 4.3 Captured Quote Rows (12 rows, exact DOM order)
| # | Quote ID (route `/quotes/{id}`) | Title | Date | Status badge | Amount | Detail capture in repo? |
|---:|---|---|---|---|---:|---|
| 1 | `01a10f88-5d7e-73fe-8e56-922499638ca6` | `AUDIT-P25-20261005-73dhk Project Fixture` | `Oct 6, 2026` | `Accepted` | `₹1,250.00` | No detail snapshot; links to F11 accepted state with honest note |
| 2 | `01a10f84-85e8-772e-a384-1ce152381d9e` | `AUDIT-P24-20261005-6y6fa-sent Request` | `Oct 6, 2026` | `Expired` | `₹2,832.00` | Linked from `12-request-details-quoted.html` |
| 3 | `01a10f82-6e95-70de-8501-aaf5d9a03466` | `AUDIT-P24-20261005-6v89t-sent Request` | `Oct 6, 2026` | `Expired` | `₹2,832.00` | No detail snapshot |
| 4 | `01a10f80-3144-755f-a145-b48ad8a72557` | `AUDIT-P23-20261005-6rdsf Request to Quote Builder` | `Oct 6, 2026` | `Expired` (was `Viewed` in `044`) | `₹1,770.00` | **Yes — `16-quote-details-awaiting-acceptance.html` & screenshot `044` (`Valid until: Oct 20, 2026`)** |
| 5 | `01a10cbc-9297-70e9-ad5f-0f3272cd75c6` | `AUDIT-P25-20261005-f611o Project Fixture` | `Oct 5, 2026` | `Accepted` | `₹1,250.00` | No detail snapshot |
| 6 | `01a10b3a-8553-77d9-8160-38cc6398e154` | `AUDIT-P24-20261005-03ipf-sent Request` | `Oct 5, 2026` | `Expired` | `₹2,832.00` | Dashboard `01` activity: *"expires within 24 hours · 5d ago"* |
| 7 | `01a10b35-82d4-7727-a030-0d1f1da6a65a` | `AUDIT-P23-20261005-zvc6j Request to Quote Builder` | `Oct 5, 2026` | `Expired` | `₹1,770.00` | Dashboard `01` activity: *"expires within 24 hours · 5d ago"* |
| 8 | `01a10aac-6e57-777f-98c2-92f95c99e6e9` | `AUDIT-P25-20261005-uk6ic Project Fixture` | `Oct 5, 2026` | `Accepted` | `₹1,250.00` | No detail snapshot |
| 9 | `01a10aa6-ec30-755c-8d4c-83b8694c61dd` | `AUDIT-P24-20261005-uc3d4-sent Request` | `Oct 5, 2026` | `Expired` | `₹2,832.00` | Dashboard `01` activity: *"expires within 24 hours · 5d ago"* |
| 10 | `01a10aa3-bd55-7071-9a18-f568f9d4a929` | `AUDIT-P23-20261005-u7d0j Request to Quote Builder` | `Oct 5, 2026` | `Expired` | `₹1,770.00` | Dashboard `01` activity: *"expires within 24 hours · 5d ago"* |
| 11 | `01a10a2b-63c2-71b8-a2a5-43a089010cc9` | `B2B Wholesale Ordering Portal` | `Oct 5, 2026` | `Accepted` | `₹59,000.00` | Project listed in `13b-projects-list-populated.html` |
| 12 | `01a10a2b-5c32-72e7-99ac-ba6c1c58b2ad` | `Khandesh Spice D2C E-Commerce Store` | `Oct 5, 2026` | `Accepted` | `₹75,000.00` | **Yes — `17-quote-details-accepted.html` (`Valid until: Oct 5, 2027`, Agreement `NL-CTR-2026-000001`)** |

### 4.4 Grounding the Family ADD (Expiry Countdown) Without Inventing Data
- By the time `15-quotes-list.html` was crawled on Oct 24, 2026, the 7 audit quotes (`#01a10f84`, `#01a10f82`, `#01a10f80`, `#01a10b3a`, `#01a10b35`, `#01a10aa6`, `#01a10aa3`) had passed their `Oct 20, 2026` validity date (`16-quote-details-awaiting-acceptance.html` shows `Valid until: Oct 20, 2026`, while screenshot `044` shows the same quote `#01a10f80` in its pre-expiry `Viewed` state, and `01-dashboard-overview-quotes-tab.html` logs *"Quote expiring soon — Your quote … expires within 24 hours · 5d ago"* for 4 of those rows).
- Therefore, every variant:
  1. Defaults to the **exact captured Oct 24 truth** (`Total 12 · Pending 0 · Accepted 5 · Declined 0`, 5 Accepted rows showing `Valid until Oct 5, 2027 · Signed`, 7 Expired rows showing an honest expired chip `Expired Oct 20, 2026 · Validity ended`).
  2. Includes a clearly-labelled **Pre-expiry / Awaiting window toggle** (grounded in screenshot `044` + dashboard `01` activity) that switches quote `#01a10f80` (`Viewed · expires in 18h 42m · Valid until Oct 20, 2026`) and the 4 dashboard-flagged quotes (`Awaiting response · expires within 24h`) into their live ticking countdown state so the **"Awaiting you" queue + live expiry countdown** can be exercised and inspected directly.

### 4.5 Pagination Copy
- `Showing 1–12 of 12` · `Prev` · `1 / 1` · `Next`
