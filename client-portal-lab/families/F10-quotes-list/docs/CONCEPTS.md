# F10 · Quotes List — Gate 1 · CONCEPTS

5 distinct layout, density, and interaction concepts for **F10 · Quotes List (`/quotes`)**, all sharing the single locked token system (`client-portal-lab/shared/tokens.css`), the compressed 232px sidebar shell (`C17`), the frozen 12-quote Arjun Mehta dataset (`15-quotes-list.html`), **C23** safe literal rendering of `<img src=x onerror=alert(1)>`, and **A5** quote expiry countdowns.

```
## GATE 1 (F10)
Concepts written: 5 (V1..V5) · All C-items placed: YES · All A-items placed: YES
Sketches included: YES · Difference table: YES
Gate: PASS
```

---

## Concept V1 — Action-First Commercial Hub (Recommended Default)

- **1-sentence thesis:** Pairs an **A5** top urgency callout (`Quote #01a10f80 expires within 24 hours`) and interactive 4-KPI strip with refined, scannable quote cards that clearly distinguish the 5 accepted high-value engagements (`₹75,000`–`₹2,40,000`) from the 7 `₹1,770.00` draft/test rows (`C23`).
- **References used:** R1 (Moxo Client Portal), R2 (Stripe Dashboard), R5 (Assembly/Copilot).
- **Density & spacing posture:** Balanced operational density (`20px` section rhythm, `16px` card padding, `12px` card stack gap).
- **ASCII Layout Skeleton:**
```
+-----------------------------------------------------------------------------------+
| [Sidebar 232px] | Breadcrumb: Dashboard > Quotes     [Search ⌘K] [Theme] [Bell] AM |
|                 +-----------------------------------------------------------------+
|  Overview       | COMMERCIAL · H1: Quotes (34px)                                  |
|  Requests (F05) | Review proposals, compare breakdowns, and accept or decline...  |
|  Projects (F08) +-----------------------------------------------------------------+
| *Quotes (F10)   | [⚡ A5 URGENCY BANNER: Quote #01a10f80 expires within 24 hours]  |
|  Payments       +-----------------+-----------------+--------------+--------------+
|  Invoices       | Total: 12       | Pending: 0      | Accepted: 5  | Declined: 0  |
|  Messages (F12) | All quotes      | Awaiting action | Approved     | Rejected     |
|  Notifications  +-----------------+-----------------+--------------+--------------+
|  Explore ▾      | [Search quotes…] [Status: All statuses (7) ▾] [QA Group toggle] |
|                 +-----------------------------------------------------------------+
|                 | [Card 1: Quote #01a10f80 · Draft · Valid Oct 20 · ₹1,770.00]     |
|                 |  Request: `<img src=x onerror=alert(1)>` (C23 safe code pill)   |
|                 | ... (5 Accepted ₹75k–₹2.4L cards + 7 Draft ₹1,770 cards) ...    |
+-----------------------------------------------------------------------------------+
```
- **Component treatment:**
  - **Shell (`C17`):** 232px sidebar + 64px header with breadcrumb, `Search ⌘K`, theme toggle, notification drawer, `AM` menu.
  - **A5 Expiry Banner & Badges:** Top banner echoing dashboard `01` (`Quote #01a10f80 for request '<img src=x onerror=alert(1)>' expires within 24 hours`) with live countdown badge (`23h 14m remaining`) + per-row validity countdowns (`Valid until Oct 20, 2026`).
  - **KPI Strip:** 4 clickable cards (`Total 12 · All quotes`, `Pending 0 · Awaiting action`, `Accepted 5 · Approved`, `Declined 0 · Rejected`).
  - **Filter Toolbar:** Instant search + native `<select aria-label="Status">` with all 7 captured options (`All statuses`, `Sent / pending`, `Viewed`, `Accepted`, `Declined`, `Expired`, `Draft`) + quick pill buttons + optional `"Highlight 5 Accepted Agreements (₹6,55,000)"` filter chip.
  - **Quote Cards (`C23`, `C4`, `C6`):** 12 cards linking directly to `../../F11-quote-details/V1/index.html?quote=01a10f80` or `?quote=01a10a2b`; literal escaped code pill for `<img src=x onerror=alert(1)>`.
- **State coverage plan:** State switcher bar (`Populated (12)` · `Pending / Expiring Simulation` · `Empty Filter` · `Empty Account` · `Loading Skeleton` · `Error State`).

---

## Concept V2 — Precision Financial Ledger Table

- **1-sentence thesis:** Reimagines the 12 quotes as a high-density, sortable financial ledger table with dedicated columns for Quote ID, Request Title (`C23`), Status (`C4`), Validity & Expiry Countdown (`A5`), GST/Deposit Rules, Total Amount (`tabular-nums`), and direct action links to `F11`.
- **References used:** R2 (Stripe Quotes Index), R4 (Eleken SaaS Table), R9 (Hello Bonsai).
- **Density & spacing posture:** Compact ledger density (`48px` row height, `12px 16px` cell padding, sticky table header, summary footer row).
- **ASCII Layout Skeleton:**
```
+-----------------------------------------------------------------------------------+
| [Sidebar 232px] | Header: Dashboard > Quotes                [⌘K] [Theme] [Bell] AM |
|                 +-----------------------------------------------------------------+
|                 | COMMERCIAL · H1: Quotes          [Export CSV] [A5: 1 Expiring]  |
|                 | [KPI Ribbon: Total 12 | Pending 0 | Accepted 5 (₹6.55L) | 0]    |
|                 +-----------------------------------------------------------------+
|                 | [Search…] [Status Select (7 options) ▾] [Sort: Date / Amount ▾] |
|                 +-----------------------------------------------------------------+
|                 | QUOTE ID  | REQUEST / DELIVERABLE | STATUS   | VALID UNTIL | ₹  |
|                 |-----------+-----------------------+----------+-------------+----|
|                 | #01a10f80 | `<img src=x...>` [QA] | [Draft]  | Oct 20 ⏳24h|1,770|
|                 | #01a10a2b | Khandesh Spice D2C... | [Accept] | Oct 20 ✓    |75k |
|                 | ... (all 12 rows + expandable inline breakdown drawer) ...      |
|                 +-----------------------------------------------------------------+
|                 | Ledger Footer: 12 Quotes · Accepted: ₹6,55,000 · Draft: ₹12,390 |
+-----------------------------------------------------------------------------------+
```
- **Component treatment:**
  - Compact horizontal KPI ribbon with aggregate INR volume (`₹6,55,000.00` accepted across 5 quotes).
  - Full data table with sortable columns (`Quote #`, `Request`, `Status`, `Valid Until / A5 Countdown`, `Total INR`, `Actions`) and inline row expansion showing the line-item preview before jumping to `F11 V2`.
  - Mobile `<768px` automatically transforms table rows into stacked ledger cards with zero horizontal overflow.
- **State coverage plan:** All 6 states (`Populated`, `Expiring Simulation`, `Empty Filter`, `Empty`, `Loading`, `Error`).

---

## Concept V3 — Agreement Portfolio & Commercial Cards Grid

- **1-sentence thesis:** Organises quotes into a visual 2-column commercial portfolio grid where each card showcases its payment structure (`30/40/30 milestones` vs `50% deposit · 18% GST`), agreement status, **A5** validity countdown meter, and one-click deep links to both `F11 Quote Details` and `F09 Project Details`.
- **References used:** R5 (Assembly/Copilot), R6 (Qwilr), R7 (HoneyBook).
- **Density & spacing posture:** Generous editorial card grid (`2-column` at desktop, `20px` gap, `20px` internal padding).
- **ASCII Layout Skeleton:**
```
+-----------------------------------------------------------------------------------+
| [Sidebar 232px] | Header: Dashboard > Quotes                [⌘K] [Theme] [Bell] AM |
|                 +-----------------------------------------------------------------+
|                 | H1: Quotes · Commercial Proposals & Signed Agreements           |
|                 | [4 KPI Cards] + [A5 Expiry Watch Callout Card]                  |
|                 +-----------------------------------+-----------------------------+
|                 | [Filter Bar: All 12 | Accepted 5 | Draft 7 | Status Select ▾]   |
|                 +-----------------------------------+-----------------------------+
|                 | +-------------------------------+ | +-------------------------+ |
|                 | | Quote #01a10a2b   [Accepted]  | | | Quote #01a10f80 [Draft] | |
|                 | | Khandesh Spice D2C Store      | | | `<img src=x...>` (C23)  | |
|                 | | ₹75,000.00 · Signed Oct 5     | | | ₹1,770.00 · ⏳ <24h (A5)| |
|                 | | [View Agreement] [Project →]  | | | [Review & Sign in F11 →]| |
|                 | +-------------------------------+ | +-------------------------+ |
+-----------------------------------------------------------------------------------+
```
- **Component treatment:**
  - 2-column bento portfolio cards with visual validity progress bars (`A5`), deposit/milestone tags, and safe `<code class="escaped-literal">` pills for the `₹1,770.00` QA rows (`C23`).
  - Links directly to `../../F11-quote-details/V3/index.html` and `../../F09-project-details/V3/index.html`.
- **State coverage plan:** All 6 states supported via toolbar and URL query params.

---

## Concept V4 — Lifecycle Stage Lanes (Action Watch → Signed Agreements → Drafts)

- **1-sentence thesis:** Structures the 12 quotes into collapsible horizontal lifecycle lanes (**1. Expiring & Action Watch [A5]**, **2. Signed & Active Agreements [5 quotes · ₹6,55,000]**, **3. Draft & QA Quotes [7 quotes · ₹12,390, C23]**) with a 1-click toggle back to flat chronological order.
- **References used:** R3 (AdminLTE), R7 (HoneyBook Smart Files), R8 (PandaDoc).
- **Density & spacing posture:** Structured stage lanes (`24px` between lanes, `12px` within lanes) with collapsible lane headers and stage subtotals.
- **ASCII Layout Skeleton:**
```
+-----------------------------------------------------------------------------------+
| [Sidebar 232px] | Header: Dashboard > Quotes                [⌘K] [Theme] [Bell] AM |
|                 +-----------------------------------------------------------------+
|                 | H1: Quotes   [View: Stage Lanes | Chronological] [Status (7) ▾] |
|                 | [KPI Strip: Total 12 | Pending 0 | Accepted 5 | Declined 0]     |
|                 +-----------------------------------------------------------------+
|                 | ▼ LANE 1 · EXPIRING & ACTION WATCH (A5 — Quote #01a10f80 <24h)  |
|                 |   [Quote #01a10f80 · `<img src=x...>` · ₹1,770.00 · Review →]   |
|                 +-----------------------------------------------------------------+
|                 | ▼ LANE 2 · ACCEPTED AGREEMENTS (5 · Total ₹6,55,000.00)         |
|                 |   [#01a10a2b ₹75k] [#01a10a29 ₹1.2L] [#01a10a26 ₹1.8L] ...      |
|                 +-----------------------------------------------------------------+
|                 | ▼ LANE 3 · DRAFTS & QA PAYLOADS (7 · Total ₹12,390.00 · C23)    |
|                 |   [#01a10f80..#01a10f6e — safe literal rendering]               |
+-----------------------------------------------------------------------------------+
```
- **Component treatment:**
  - Gives immediate executive clarity on why the account has 5 high-value accepted projects and 7 `₹1,770.00` draft rows, while keeping the captured 7-option `<select aria-label="Status">` and search input front and centre.
- **State coverage plan:** All 6 states supported.

---

## Concept V5 — Split Master-Detail Quotes Workbench

- **1-sentence thesis:** Combines a compact left-hand quote queue (all 12 quotes + status select + **A5** badges) with a live right-hand **Quote Preview & Commercial Inspector** so the client can compare deliverables, GST (`18%`), deposit (`50%`), and contract clauses across quotes before opening `F11 V5`.
- **References used:** R1 (Moxo), R4 (Eleken Master-Detail), R8 (PandaDoc), R9 (Bonsai).
- **Density & spacing posture:** High-efficiency 2-pane workbench (`420px` left queue + `1fr` sticky right preview pane; stacks cleanly below `1024px`).
- **ASCII Layout Skeleton:**
```
+-----------------------------------------------------------------------------------+
| [Sidebar 232px] | Header: Dashboard > Quotes                [⌘K] [Theme] [Bell] AM |
|                 +-----------------------------------------------------------------+
|                 | H1: Quotes + Compact 4-KPI Bar + [A5 Expiry Alert Strip]        |
|                 +-------------------------------+---------------------------------+
|                 | LEFT: 12-Quote Queue          | RIGHT: Live Quote Inspector     |
|                 | [Search…] [Status (7) ▾]      | Quote #01a10f80 [Draft] ⏳ <24h |
|                 | * #01a10f80 ₹1,770 [Draft] ⏳ | Request: `<img src=x...>` (C23) |
|                 |   #01a10f7d ₹1,770 [Draft]    | Subtotal ₹1,500 + GST ₹270      |
|                 |   #01a10a2b ₹75,000 [Accepted]| Deposit 50% (₹885.00)           |
|                 |   #01a10a29 ₹1,20,000 [Accept]| [Open Full Quote in F11 V5 →]   |
|                 |   ... (all 12 rows)           | [Download PDF]                  |
+-----------------------------------------------------------------------------------+
```
- **Component treatment:**
  - Selecting any of the 12 rows in the left queue updates the right inspector immediately with its exact line items, tax/deposit rules, **A5** validity countdown, and a primary CTA linking to `../../F11-quote-details/V5/index.html?quote=…`.
- **State coverage plan:** All 6 states supported.

---

## Variant Difference Table

| Dimension | V1 · Commercial Hub | V2 · Financial Ledger | V3 · Portfolio Grid | V4 · Lifecycle Lanes | V5 · Split Workbench |
|---|---|---|---|---|---|
| **Primary layout** | Urgency banner + 4 KPI cards + 1-col rich row stack | Compact KPI ribbon + sortable 6-column financial table | 4 KPI cards + 2-column bento portfolio card grid | KPI strip + 3 collapsible stage lanes w/ subtotals | 2-pane split (420px queue + sticky right inspector) |
| **Section order** | Header → A5 Banner → 4 KPIs → Filter Bar → 12 Cards | Header → KPI Ribbon → Table Toolbar → Table → Footer | Header → KPI + A5 Split → Filter Chips → 2-Col Grid | Header → KPIs → Lane 1 (A5) → Lane 2 (Accepted) → Lane 3 (Drafts) | Header → Compact KPIs → Split Queue + Live Inspector |
| **C23 (`<img src=x>` fix)** | Muted monospace code chip + `QA / Escaped` badge on card | Dedicated `Deliverable` cell with escaped `<code>` + QA filter | Code block pill inside card body with tooltip | Grouped in Lane 3 (`Drafts & QA Payloads`) with literal code pill | Safe code preview in both queue row and right inspector |
| **A5 (Expiry countdown)** | Full-width top alert banner + per-card countdown badge | Dedicated `Validity & Countdown` column (`⏳ 23h left`) | Visual validity progress bar + countdown pill on card | Dedicated `Lane 1 · Expiring & Action Watch` at top | Inspector countdown header + queue row urgency badge |
| **Cross-link to F11** | `Open quote details →` (`F11 V1`) | Row click or `View` action (`F11 V2`) | Card CTA `Review / View Agreement` (`F11 V3`) | Lane row CTA (`F11 V4`) | Inspector primary button `Open Full Quote` (`F11 V5`) |
