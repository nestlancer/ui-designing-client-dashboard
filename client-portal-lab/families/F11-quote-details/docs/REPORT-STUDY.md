# F11 · Quote Details (Accept & Sign) — Gate R · REPORT-STUDY

Study of `reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md` (§1–§8) and all 10 sheets of `reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx`.

```
## GATE R (F11)
MD read: YES · XLSX sheets: 10/10 · C-items mapped: 7/7 · A-items mapped: 2/2
KEEP listed: YES · Checklist copied: YES
Gate: PASS
```

---

## 1 · Discrepancies Between `.md` and `.xlsx` (`.md` wins)

- Both `.md` and `.xlsx` (Sheets 1–10) agree on every Finding, Token, C-item (`C2`, `C7`, `C17`, `C4`, `C5`, `C6`, `C18`), A-item (`A1`, `A8`), KEEP item, Roadmap phase, and Acceptance Checklist row touching F11.
- **Illustrative vs captured figures:** Report C2 uses *"Corporate LMS is 40% done and needs your ₹20,880 mid-project payment"* and screenshot `022` shows Priya Nair's `Quote #01a10a2c` (`₹52,200.00`, `NL-CTR-2026-000005`). Per prompt §4 & §6, all F11 variants freeze the **Arjun Mehta DOM figures** (`Quote #01a10f80` `₹1,770.00` w/ `GST (18%) ₹270.00` & `Deposit 50% ₹885.00`; and `Quote #01a10a2b` `Khandesh Spice D2C E-Commerce Store` `₹75,000.00` w/ `NL-CTR-2026-000001`).

---

## 2 · Executive Findings & Weighted Analysis Touching F11 (Quoted from Report §1 & §4.2)

- **§4.2 Weighted Analysis (Flagship Screen):**
  > **Quote accept & sign** · Business weight: 🔴 **Decides revenue** · UI weight: 🟠 **Weakest screen in the app** · Verdict: **Must be redesigned first — it currently converts by luck.**
- **§4.1 Row 24 (`/quotes/[id]` awaiting acceptance):**
  > 🔴 **The single most conversion-critical screen is the weakest.** Legal name field + 10 dense clauses in a wall of `text-xs`; "Complete agreement to accept" button disabled with tiny helper text.
- **Finding #7 (🟠 High):**
  > **"'Awaiting you' is the strongest idea in the product"** — but it exists only on the dashboard and is not reused on the pages that need it (project milestones, quote approval, invoices).
- **Finding #3, #4, #10, #11, #12:** Badge contrast failure (1.73–3.23:1), dual brand ramps, mobile tables, raw card classes.

---

## 3 · Page Inventory Rows (Report §4.1 Rows 24–25 & Sheet 3 Rows 24–25)

| # | Route | Page | Live DOM status | Repo screenshot | Key components | Principal UI issue |
|---|---|---|---|---|---|---|
| 24 | `/quotes/[id]` | Quote — awaiting acceptance | ✅ OK | `044-quote-awaiting-acceptance-and-signature` | Line items table, Payment schedule table, Documents, **ACCEPT & SIGN block (checkbox + legal name + sign)**, T&C (10 clauses), sticky footer Negotiate / Decline / Total | 🔴 **The single most conversion-critical screen is the weakest.** Legal name field + 10 dense clauses in a wall of `text-xs`; "Complete agreement to accept" button disabled with tiny helper text |
| 25 | `/quotes/[id]` | Quote — accepted | ✅ OK | `022-quotes-details` | Same + Service agreement (signed, agreement no. NL-CTR-2026-000005 / NL-CTR-2026-000001) + Open project | ✅ Good (note: live crawl had CORS error on `GET /api/v1/projects/by-quote/{id}`) |

---

## 4 · Design Token Table Applied (`shared/tokens.css`)

All 5 variants import `../../../shared/tokens.css` + `../../../shared/base.css` untouched:
- **Brand:** Single blue ramp `--brand-500: #465fff` (`#5b7bff` dark) as `--primary` and `--ring` (C5).
- **Status badges:** Darkened AA text triples `--status-*-bg/text/border` with icon + text (C4).
- **Surfaces:** `--card`, `--muted`, `--border`, `--shadow-xs`, `--shadow-sm` (C6).
- **Typography:** `Outfit` display H1 + money hero `32–40px` `tabular-nums` (C18); `--mono` for quote IDs (`#01a10f80`, `#01a10a2b`), agreement number (`NL-CTR-2026-000001`), and dates; legal T&C text increased to **13.5–14px** (`line-height: 1.65`) per C7 & Legal acceptance gate.

---

## 5 · CHANGE Items (Mandatory in 5/5 Variants)

| ID | Change | Specific implementation in F11 |
|---|---|---|
| **C2** | **Add a plain-English verdict line under the H1** | Built strictly from frozen figures:<br>• **Awaiting (`#01a10f80`):** *"₹1,770.00 fixed-price quote (₹1,500.00 + 18% GST) — awaiting your e-signature on the service agreement to unlock the 50% deposit (₹885.00)."*<br>• **Accepted (`#01a10a2b`):** *"₹75,000.00 fixed-price quote accepted and signed on Oct 5, 2026 (Agreement NL-CTR-2026-000001) — active delivery in Khandesh Spice D2C E-Commerce Store."*<br>• **Expired (`#01a10f80`):** *"This ₹1,770.00 quote expired on Oct 20, 2026 — signing is locked until you request a validity extension or revised quote from the team."* |
| **C7** | **Give the quote sign block a real hierarchy** | **3-step visual ritual:**<br>1. **Step 1 · Read the numbers** (Line items + 18% GST + Payment schedule installments verified).<br>2. **Step 2 · Read the terms** (Collapsible full 10 clauses at **14px**, with the **key 3 clauses highlighted upfront**: *1. Validity*, *2. Acceptance & first payment*, *5. Revisions & 4. Scope*, plus *Project-specific terms*).<br>3. **Step 3 · Sign** (Checkbox + `Legal name (e-signature)` input + explicit disclosure: *"Your legal name will be used as an e-signature on Agreement NL-CTR-2026-000001"* + honest disabled-until-complete `Accept quote & sign agreement →` button). |
| **C17** | **Compress the sidebar (inherited)** | 232px sidebar + 64px header + breadcrumb + `Search ⌘K` + theme toggle + notifications (`6`) + `AM` avatar; `Blog`/`Portfolio` inside `Explore` popover. |
| **C4** | **Fix badge contrast** | `Viewed`, `Accepted`, `Expired`, `Changes requested`, `Declined` badges use AA-safe `--status-*-text` tokens + SVG icon + text. |
| **C5** | **Consolidate to one brand ramp** | Single blue `--primary` ramp; no violet buttons or borders. |
| **C6** | **Tokenise cards** | All cards, tables, sign-block steps, and modals use `--card`, `--border`, `--shadow-xs`. |
| **C18** | **Increase the type scale** | H1 `Quote #01a10f80` / `Quote #01a10a2b` at `32–40px` and money hero (`₹1,770.00` / `₹75,000.00`) at `32–40px` `tabular-nums`. |

---

## 6 · ADD Items (Priority + Coverage)

| ID | Addition | Priority | Required | F11 Coverage | Implementation specifics |
|---|---|---|---|---|---|
| **A1** | **"Ask AI about this quote"** | 🔴 P1 | **5/5** | **5/5 (V1–V5)** | Interactive Ask-AI assistant panel/drawer scoped strictly to the active quote's frozen facts (*"What is due upon acceptance?"*, *"Is GST included and how much?"*, *"What are the revision & IP terms?"*, *"What happens after I sign?"*). Explicitly **DEMO-labelled** (no AI endpoint in Swagger; never invents facts). |
| **A8** | **Client-visible quote negotiation / request-changes thread** | 🟠 P2 | ≥3/5 | **5/5 (V1–V5)** | Wired to the real Swagger schema `RequestQuoteChangesDto` (`POST /api/v1/quotes/{id}/request-changes`): lets the client add structured change items (`area ∈ {budget, timeline, features, terms}`, `request ≤ 500 chars`) + `additionalNotes ≤ 2000 chars`, and displays the visible negotiation / revision history thread right on the quote page instead of a contextless "Negotiate" button. Also includes the real `DeclineQuoteDto` (`POST /api/v1/quotes/{id}/decline` with `reason ∈ {budgetConstraints, timelineIssues, scopeDiscrepancy, other}`, `feedback`, `requestRevision` boolean). |

---

## 7 · KEEP List (Mandatory in 5/5 Variants)

- **The "Awaiting you" pattern reused on quotes** (Report §6.3, Finding #7).
- **Legal honesty** (Report §7.1): E-signature explicitly states what is being signed (`Agreement NL-CTR-2026-000001`); all 10 numbered Standard Terms + Project-specific terms + `Valid until` remain complete and readable at 14px; Decline / Request-changes / Dispute routes are polite and findable.
- **Graceful wording** (Report §6.3): Preserves `"Installments due over the life of this engagement"`, `"Download the latest quote PDF and service agreement."`, `"Review the draft service agreement before accepting."`

---

## 8 · Benchmarks Applied (Report §5) & Roadmap Phases

- **Assembly / Copilot [1][10]:** Module-card structure (read numbers / read terms / sign / ask) — directly cited in Report C7.
- **Moxo [1]:** Flow-first "what happens next, whose move" stepper.
- **Mercury [2] & AdminLTE Finance [13]:** Big `tabular-nums` ₹ hero, clear subtotal + 18% GST breakdown, milestone installment schedule.
- **Softr [11]:** "Ask AI on any data block" (A1).
- **AdminLTE SaaS Billing [9]:** Honest legal/decline/revision paths, never hiding the exit or change-request route.
- **Roadmap phases touched:** **P1** (Foundations) · **P2** (*"The three money screens: Quote accept-and-sign redesign → Checkout simplification → Billing Center"*).

---

## 9 · Acceptance Checklist (Report §7.1 — Copied as Verification Gate)

- [x] **Hierarchy:** Verdict + total ₹ amount + current status understood in < 2 s.
- [x] **Tables:** Line items + Payment schedule tables complete with mobile card-fallback at 375px.
- [x] **Navigation:** 232px sidebar, ≤ 9 top-level items, `← Back to quotes` (`F10`), `View request` (`F05`), `Open project` (`F09`).
- [x] **Colour:** Single blue ramp; AA status badges (icon + colour + text).
- [x] **Typography:** H1 & money hero 32–40px `tabular-nums`; `--mono` for IDs/agreement numbers; legal terms at 14px.
- [x] **Dark mode:** Full `.dark` parity.
- [x] **Accessibility:** Keyboard-operable 3-step sign block, focus-trapped preview/decline modals, `aria-live` validation and state announcements.
- [x] **Empty / loading / error:** Designed awaiting, accepted, expired, empty, loading-skeleton, and error states.
- [x] **Legal:** All 10 T&C clauses verbatim at 14px; e-sign disclosure names `NL-CTR-2026-000001`; disabled-until-complete honesty on sign button.
