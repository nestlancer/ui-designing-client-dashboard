# F10 · Quotes List — Gate T · TEMPLATE-RESEARCH

Study of 9 real-world SaaS, agency portal, and financial proposal index references informing the 5 variants of **F10 · Quotes List (`/quotes`)**.

```
## GATE T (F10)
References studied: 9 (report §5: 4 · fresh search: 5) · Borrow/reject logged: YES
Gate: PASS
```

---

## 1 · Reference Inventory Summary

| # | Name | Source | Live URL | Assigned Variants |
|---|---|---|---|---|
| R1 | **Moxo Client Portal (Proposals & Action Hub)** | Report §5 `[1]` | `https://www.moxo.com/blog/client-portal-design` | V1, V5 |
| R2 | **Stripe Dashboard (Quotes & Billing Index)** | Report §5 `[8]` | `https://dribbble.com/shots/25224810-Financial-Dashboard-Design-Stripe` | V1, V2 |
| R3 | **AdminLTE / Modern SaaS Dashboard Patterns** | Report §5 `[2]` | `https://adminlte.io/blog/dashboard-design-examples/` | V2, V4 |
| R4 | **Eleken — High-Density SaaS Table & Ledger UI** | Report §5 `[7]` | `https://www.eleken.co/blog-posts/dashboard-design-examples-that-catch-the-eye` | V2, V5 |
| R5 | **Assembly (formerly Copilot) — Agency Client Portal** | Fresh Search | `https://resources.rework.com/tools/client-portal/best-moxo-alternatives` | V1, V3 |
| R6 | **Qwilr — Interactive Proposal & Deposit Index** | Fresh Search | `https://qwilr.com/blog/send-quote-collect-payment-one-document/` | V3, V4 |
| R7 | **HoneyBook — Smart Files & Booking-to-Payment Pipeline** | Fresh Search | `https://thedigitalprojectmanager.com/tools/best-quote-and-proposal-software/` | V3, V4 |
| R8 | **PandaDoc — Proposal Lifecycle & Expiration Urgency Tracking** | Fresh Search | `https://pipeline.zoominfo.com/sales/qwilr-vs-pandadoc` | V4, V5 |
| R9 | **Hello Bonsai — Client Portal Proposals & Deposit Status** | Fresh Search | `https://assembly.com/blog/hello-bonsai-review` | V2, V5 |

---

## 2 · Detailed Reference Breakdown

### R1 · Moxo Client Portal — External Interaction & Action Workspace (Report §5 `[1]`)
- **Live URL:** `https://www.moxo.com/blog/client-portal-design`
- **Category:** Client portal / agency service delivery workspace
- **Layout & hierarchy:** Action-first top banner for time-sensitive items ("Action Required / Expiring Soon"), followed by a 4-stat summary strip and structured proposal rows with direct deep links to the related request and active project.
- **Component patterns:** Urgency callout bar (`A5`), dual-context breadcrumbs (`Request → Quote → Project`), and explicit decision CTAs (`Review & Accept` vs `View Signed Agreement`).
- **Typography & density:** Medium-high density (`16px` grid gap, `14px` body, tabular numerals for totals).
- **Interaction & state design:** Instant status filtering + inline expansion for quick scope inspection before opening the full quote detail route.
- **What we borrow (`→ V1, V5`):** Top-of-page **A5 Expiry Countdown Banner** (`Quote #01a10f80 expires within 24 hours`) paired with direct links to `F11 Quote Details` and `F09 Project Details`.
- **What we reject:** Moxo's enterprise workflow builder chrome that adds unnecessary configuration menus for client users.

### R2 · Stripe Financial Dashboard — Quotes & Commercial Ledger (Report §5 `[8]`)
- **Live URL:** `https://dribbble.com/shots/25224810-Financial-Dashboard-Design-Stripe`
- **Category:** FinTech / commercial billing & quote management
- **Layout & hierarchy:** Crisp metric strip with semantic status pills, high-contrast filter toolbar, and right-aligned tabular currency columns (`₹75,000.00`, `₹1,770.00`) with tax/deposit breakdown subtitles.
- **Component patterns:** Segmented status pills with counts (`All 12`, `Accepted 5`, `Pending 0`, `Draft 7`), monospace quote IDs (`#01a10a2b`), and keyboard-navigable rows.
- **Typography & density:** `tabular-nums` everywhere, `JetBrains Mono` for short IDs and dates, tight 44px–52px table rows.
- **Interaction & state design:** Instant search by ID or project title, hover action bars (`Open Quote`, `Download PDF`).
- **What we borrow (`→ V1, V2`):** Tabular INR ledger precision, monospace short-ID badges, and sub-row tax/deposit micro-summaries (`50% deposit · 18% GST`).
- **What we reject:** Multi-currency switcher clutter (all Arjun Mehta quotes are in INR `₹`).

### R3 · AdminLTE — "One Question Per Screen" KPI Hierarchy (Report §5 `[2]`)
- **Live URL:** `https://adminlte.io/blog/dashboard-design-examples/`
- **Category:** SaaS operational dashboard patterns
- **Layout & hierarchy:** Answers the user's primary question ("Do any quotes need my signature right now, and what have I already committed to?") in the top 180px via 4 KPI cards (`Total 12`, `Pending 0`, `Accepted 5`, `Declined 0`) plus an urgency alert.
- **Component patterns:** KPI cards with semantic sub-captions (`Awaiting action`, `Approved`, `Rejected`) and clickable KPI filtering.
- **Typography & density:** `28px–32px` KPI numerals, `12px` uppercase labels.
- **Interaction & state design:** Clicking any KPI card (`Accepted 5`) filters the quote list immediately.
- **What we borrow (`→ V2, V4`):** Interactive KPI cards that double as one-click status filters.
- **What we reject:** Decorative sparklines on static counts where no historical series endpoint exists.

### R4 · Eleken — High-Density SaaS Ledger & Split Preview (Report §5 `[7]`)
- **Live URL:** `https://www.eleken.co/blog-posts/dashboard-design-examples-that-catch-the-eye`
- **Category:** B2B SaaS data-dense index & master-detail patterns
- **Layout & hierarchy:** Master-detail split view where clicking a quote row updates a sticky right-hand commercial inspector (`Deliverables`, `Tax`, `Deposit`, `Valid until`, `Open in F11`) without losing scroll position in the 12-item list.
- **Component patterns:** Sticky right inspector drawer, compact row density toggle, and escaped-string code pill for technical deliverables.
- **Typography & density:** Compact 12px/13px metadata with high-contrast AA badges (`C4`).
- **Interaction & state design:** Keyboard ↑/↓ row selection updates the inspector pane live.
- **What we borrow (`→ V2, V5`):** Split master-detail inspector in `V5` and compact financial ledger table in `V2`.
- **What we reject:** Hiding the `Open quote details` link behind a double-click gesture.

### R5 · Assembly (formerly Copilot) — Modern Client Portal Proposals (Fresh Search)
- **Live URL:** `https://resources.rework.com/tools/client-portal/best-moxo-alternatives`
- **Category:** Modern agency client portal
- **Layout & hierarchy:** Clean editorial card stack where each proposal card shows the linked request title, status badge, validity date, and total amount in a scannable 3-column row.
- **Component patterns:** Request-to-Quote lineage chip (`Request: Khandesh Spice D2C E-Commerce Store`), status pill with icon + text (`C4`).
- **Typography & density:** Generous card padding (`20px`), `16px` card titles, `18px` bold INR totals.
- **Interaction & state design:** Smooth transition from quote list card to full contract/quote reader (`F11`).
- **What we borrow (`→ V1, V3`):** Polished client-first card hierarchy that feels like a dedicated product rather than a raw database dump.
- **What we reject:** Hiding draft quotes completely (the captured DOM explicitly lists 7 `Draft` quotes alongside 5 `Accepted` quotes).

### R6 · Qwilr — Interactive Proposal & Upfront Deposit Visibility (Fresh Search)
- **Live URL:** `https://qwilr.com/blog/send-quote-collect-payment-one-document/`
- **Category:** Web-native proposal & checkout software
- **Layout & hierarchy:** Highlights the upfront deposit obligation (`50% deposit: ₹885.00` or `30% Kickoff & Architecture`) directly on the proposal summary so clients know both the contract value and immediate cash required.
- **Component patterns:** Dual-number price block (`Total ₹75,000.00` + `Signed · 3 milestones`) and direct checkout/review entry.
- **Typography & density:** Clear financial contrast between total contract value and deposit due.
- **Interaction & state design:** Hovering or expanding a quote reveals its milestone/deposit structure before navigating to `/quotes/{id}`.
- **What we borrow (`→ V3, V4`):** Surfacing deposit & milestone readiness on quote cards so F10 sets up F11's one-step acceptance flow (`C8`).
- **What we reject:** Marketing brochure hero banners inside an authenticated client portal.

### R7 · HoneyBook — Smart Files Pipeline & Lifecycle Lanes (Fresh Search)
- **Live URL:** `https://thedigitalprojectmanager.com/tools/best-quote-and-proposal-software/`
- **Category:** Client workflow & proposal-to-contract pipeline
- **Layout & hierarchy:** Groups proposals by client lifecycle stage (`Action / Expiring Watch`, `Accepted & Active Agreements (5)`, `In Preparation / Drafts (7)`) so the 5 real accepted engagements (`₹75,000`–`₹2,40,000`) are never buried under `₹1,770` QA test rows.
- **Component patterns:** Collapsible stage lanes with stage subtotals (`₹6,55,000.00 Accepted Volume`) and view-mode toggle (`Stage Lanes` vs `All 12 Chronological`).
- **Typography & density:** Stage headers with count pills and aggregate INR totals.
- **Interaction & state design:** Filter chips and stage accordions work together seamlessly.
- **What we borrow (`→ V3, V4`):** Lifecycle grouping in `V3` (Agreement Portfolio Cards) and `V4` (Pipeline Lanes) that separates the 5 high-value accepted agreements (`₹6,55,000.00`) from the 7 `₹1,770.00` test/draft quotes while keeping all 12 rows accessible.
- **What we reject:** Drag-and-drop kanban cards (clients cannot drag a quote from `Draft` to `Accepted` — status changes only happen via `POST /accept` or `/decline` on `/quotes/{id}`).

### R8 · PandaDoc — Proposal Expiration Urgency & Audit Trail (Fresh Search)
- **Live URL:** `https://pipeline.zoominfo.com/sales/qwilr-vs-pandadoc`
- **Category:** Proposal & e-signature lifecycle platform
- **Layout & hierarchy:** Prominent expiration countdown badges (`A5`) showing days/hours remaining (`Expires within 24h · Oct 20, 2026`) and signed audit timestamps (`Signed Oct 5, 2026`).
- **Component patterns:** Amber urgency pill with live countdown clock icon (`A5`) and quick filter for `"Expiring soon"`.
- **Typography & density:** Monospace countdown badges (`23h 14m left`) paired with human-readable validity dates (`Valid until Oct 20, 2026`).
- **Interaction & state design:** One-click `"Filter: Expiring / Actionable"` toggle in the urgency banner.
- **What we borrow (`→ V4, V5`):** **A5 Quote Expiry Countdown** treatment at both the page-banner level (echoing dashboard `01`'s `"expires within 24 hours"` feed item) and the individual quote row level (`Valid until Oct 20, 2026`).
- **What we reject:** Multi-approver routing matrices not present in `quotes.openapi.json`.

### R9 · Hello Bonsai — Client Portal Proposals & Safe Escaped Content (Fresh Search)
- **Live URL:** `https://assembly.com/blog/hello-bonsai-review`
- **Category:** Freelancer & agency client portal
- **Layout & hierarchy:** Clean tabular list pairing each quote with its parent request, status pill, validity date, and a muted code/tag chip for technical test items (`C23`).
- **Component patterns:** Safe plain-text code badge (`QA / Escaped String`) for rows like `<img src=x onerror=alert(1)>` so raw HTML test strings look deliberately contained rather than broken (`C23`).
- **Typography & density:** Monospace muted chip (`font-size: 12px`, `background: var(--muted)`) for escaped technical strings.
- **Interaction & state design:** Toggleable `"Group QA / ₹1,770 test quotes"` helper while preserving all 12 captured rows by default.
- **What we borrow (`→ V2, V5`):** The **C23 Escaped-HTML Containment Chip** that renders `<img src=x onerror=alert(1)>` safely as literal text inside a muted monospace pill with a `QA payload (escaped)` badge.
- **What we reject:** Hiding the `₹1,770.00` rows completely (all 12 rows from `15-quotes-list.html` must remain inspectable).
