# Client Portal Lab — DECISIONS

> Merge-only shared file. The original run added **F05 · Requests work hub** and **F06 · New request form**; later merges appended F08–F13. The 2026-10-28 merge appended **§9 for F14–F18** and extended the gallery / manifest by 25 records. No earlier family's section or record was edited or deleted. Structured so later runs can append `### F## …` sections and manifest records without touching these.

---

## 0 · Hand-authorship attestation (Gate 3 / master prompt §1.3)

> **All F05 variants were hand-authored; no design-generation script was used.**
> **All F06 variants were hand-authored; no design-generation script was used.**
> **All portal variants built in this run (10 total) were hand-authored; no design-generation script was used.**

- Each of the 10 `families/F##-*/V#/index.html` files was written directly, one at a time, with its **own hand-written layout CSS in a `<style>` block and its own small in-page interaction JS in a `<script>` block**. There is no shared megatemplate, no `kit.css`/`kit.js` component layer, no loop that emits pages, and no build step.
- `manifest.json` and the gallery `index.html` are **hand-maintained data/index files**, not variant pages. Assertions about them were produced from a data table for accuracy; they do not generate any HTML/CSS/JS. The variant pages themselves are 100% hand-authored.
- The only files under `shared/` are `tokens.css` (the single locked §5.2 scheme) and `base.css` (reset + primitives only). Every variant imports both by relative path. No variant defines its own colours outside these tokens.
- Verification performed this run: `node --check` on all **20 inline scripts** (0 errors) · BeautifulSoup parse of all 10 pages · link/asset existence check · CSS `var()` token-definition check (0 undefined) · remote-URL scan (0 `http(s)` assets) · dead-link scan (0 real `href="#"`) · **jsdom runtime execution** of every page with theme/state/tabs/filters/palette/help/drawers/validation/submit/stepper/guide/dropzone/cancel exercised (0 runtime errors, 10/10) · **30 DOM-mutation assertions pass**.
- **No screenshot QA was run.** No Chromium / Chrome / Firefox / wkhtmltoimage binary exists in this sandbox. Light/dark parity and the 360/390/768/1024/1440 layouts were reasoned from CSS + jsdom, **not** from captured pixels. This is stated explicitly rather than claimed (Gate 3 requirement).

---

## 1 · Single brand scheme (C5) and tokens (C4 / C6)

- `shared/tokens.css` is copied verbatim from prompt §5.2: neutral + one blue `--brand-*` ramp + AA-darkened status pairs + shape/type/motion tokens, with a `.dark` override block. The `dark` status backgrounds/borders use one shared 14%-tint formula over `--card`.
- The violet `--accent-1` and auth teal are **deleted**. There is no second brand hue. `--ring` = `--primary` (blue). Status hues keep their hue but only as `--status-*-bg/text/border` triples, never as decoration.
- All cards/surfaces use `var(--card)` / `var(--border)` / `var(--shadow-xs|sm)`. No raw `bg-white` / `gray-200/80` / hard-coded hex borders. Every status badge is **icon + colour + text** (never colour alone).
- `base.css` carries only reset, `:focus-visible`, `.sr-only`, `.skip`, `[hidden]`, disabled, and reduced-motion primitives. No family layout rules.
- H1 uses `clamp(32px, …, 36–38px)` in all 10 variants (C18: 32–40px). 32px floor was applied after a QA pass found an earlier 30px floor.

---

## 2 · Content-lock & honesty notes (both families)

- **Frozen F05 content**: header line “All your service requests and active projects in one place.”, KPI strip (Total requests / Under review / Quoted + Projects), tabs `All / Requests (12) / Projects`, the 12 captured request rows + 1 captured project row (Razorpay Settlement Reconciliation Engine / Revision Requested), the 9-value status filter, search placeholder “Search work items…”, and pagination copy “Showing 1–12 of 26” + “1 / 3”. Row titles/IDs/dates are copied from `07-requests-work-hub-list.html` + `audit-metadata.json`; screenshots `023`/`045` are alternate sessions (Priya Nair / Ananya Iyer) and are treated as such, not merged into the DOM truth.
- **UI-only status labels**: `Expired Quote` and `Revision Requested` appear on captured rows but are **not** in the frozen status-filter `<option>` list, and `Converted To Project` (row label) differs in case from `Converted to project` (filter value). Decisions: (a) the frozen filter list is preserved verbatim (no invented options); (b) status matching is **case-insensitive** so the `Converted to project` filter actually matches its row; (c) rows with the two UI-only labels are reachable via “All statuses” and via search, and are documented here as **display-only labels** — the Swagger enum (`draft, submitted, underReview, quoted, accepted, rejected, convertedToProject, changesRequested`) has no `cancelled` / `expiredQuote` / `revisionRequested`, so no endpoint was invented for them.
- **Pagination honesty**: only **page 1 (12 of 26 rows)** was captured. `Next` does **not** fabricate rows 13–26; it reveals an explicit note (“Only the first page (12 of 26 rows) was captured in the audit. Later pages are not invented”) with a “Back to page 1” control. `1 / 3` is preserved as frozen copy. This is an intentional anti-invention decision, not a broken control.
- **F06 frozen content**: H1 “New request”; intro “Describe your project and save a draft…”; section titles **Brief / Budget / Timeline & requirements**; the 10 locked fields with their verified attributes (Title 5–100, Description 20–5000, Category enum, Budget min/max placeholders `50000`/`150000`, Currency `INR`, “Budget is flexible” checked, Preferred start `2026-10-24`, Deadline `2026-11-23`, “Requirements (one per line)”); sticky footer `Cancel` + `Save draft`; `Back to requests`.
- **Tooltip copy is NOT verbatim from production.** `10-requests-new-form.html` contains 10 `aria-label="Help for …"` buttons but **no tooltip body text** in the static DOM (no `role=tooltip`, no popover copy, no RSC strings). Per the no-invention rule, all 10 help texts are **lab-authored** from the frozen section descriptions + Swagger constraints (char limits, ISO-3 currency, `min ≤ max`, one-requirement-per-line, ≤20 lines) and are labelled as such. No production tooltip string is claimed. This is recorded in `families/F06-request-new-form/docs/BASELINE-MAP.md`.
- **Budget guide has no invented market rates.** It uses only the captured placeholders `50000`/`150000`, the `min ≤ max` constraint and the ISO-3 currency rule. Any “band” wording is explicitly labelled as example figures, not price advice.
- **No invented API features.** No ask-AI, no bulk status changes, no drag-to-mutate, no column-settings persistence, no cloud-picker SDK, no analytics/telemetry, no publish endpoint. These were cross-checked against Gate A and rejected.

---

## 3 · Demo-only CTAs / affordances (Gate A)

Every button in every variant either (a) performs a real in-page action, (b) maps to a Gate-A endpoint, or (c) is a **demo affordance** recorded here. There are **no dead `href="#"` links** (the `<use href="#symbol">` occurrences are inline SVG sprite references, not navigation).

| Affordance | Behaviour | Why demo / honest |
|---|---|---|
| Sidebar nav items (Dashboard, Projects, Quotes, Messages, Billing, Invoices, Notifications, Profile, Settings, Blog, Portfolio) | `data-demo` buttons → toast “… is another family's route” | Those routes belong to other families; not built here. No fake navigation. |
| “Explore” popover + sub-links | expands Blog / Portfolio demo items | C17 requires Blog/Portfolio behind one Explore control. |
| Bell / avatar (6 unread / AM) | demo toast + `AM` chip | F03 owns the real notifications/profile surfaces. |
| F05 “New request” CTA | links to `F06/V1` (real local lab page) | `POST /api/v1/requests` is the real endpoint; the lab link is the working demo target. |
| F05 detail drawer | opens in-page sheet with only captured fields | Stands in for the **F07 request-detail route**; status history / quotes belong to that family. Shown fields come from `GET /api/v1/requests/{id}` / `GET /api/v1/projects/{id}`. |
| F05 “Contact support” / error retry | retry re-runs the designed state; support → demo toast | `/messages` is F12. Error copy preserves the captured `GET /api/v1/projects` 502 + CORS failure. |
| F06 `Save draft` / `Cancel` / `Back to requests` | validation → loading → success, or cancel-with-confirm (autosave to `localStorage`, then navigate to F05/V1) | `POST /api/v1/requests` is the real create endpoint; the offline lab sends nothing and says so. Cancel never loses work. |
| F06 attachment dropzone | local file queue with real size/count checks; **never uploads** | Wired to `media.openapi.json` constraints (`attachments[] maxItems:10`, `size` 1…524288000, `fileType` enum). No fake progress percentages; files are “queued, not uploaded”. |
| F06 `Contact support` / retry | designed 502 degraded-submit state + retry | `/requests/new` has no captured 502 error (the 502s belong to `/requests?view=…`, `/projects`, `/dashboard`); F06's error state is a **designed degraded-submit state**, documented as such in the F06 delivery report. |
| ⌘K command palette / quick-actions dialogs | every entry runs a real in-page action | No dead entries. |
| State switcher chips (“Loaded / Empty / Skeleton / 502 / Success”) | toggle designed states | Lab QA affordance to exercise all states without a live backend; deep-linkable via `?state=…`. |

---

## 4 · A-item coverage (from `manifest.json`)

- **F05** — A12 **saved views** is the family's A-item (P3, ≥3/5 required). Implemented in **5/5** via URL + `localStorage` state (`?saved=…`, `?status=…`, `?q=…`, `?view=…`) and named saved-view chips (My pending approvals / This month / Awaiting me). C-items C16/C17/C4/C5/C6/C18 are in **5/5**.
- **F06** — the two family must-include ADDs, **attachment at creation (styled dropzone)** and **inline budget guide**, are in **5/5**. C-items C17/C4/C5/C6/C18 are in **5/5**. `timeline.flexible` is sent as the spec-required constant `false` because no captured timeline-flexible control exists (documented in `families/F06-request-new-form/docs/API-MAP.md`).
- P1 A-items A1–A4 belong to other families (ask-AI / help hub / unlock explainer / reject-revision) and are **not** in scope for F05/F06.

---

## 5 · Distinctness (Gate 1 difference test)

Both families pass: every variant differs from its 4 siblings on **≥3 of 5 axes**, at least one of which is A (layout) or C (narrative); all A+C pairs are unique. Colour is not used as an axis — all 10 variants share the one blue token scheme. See `docs/CONCEPTS.md` §Table 2 in each family folder.

| Family | V1 | V2 | V3 | V4 | V5 |
|---|---|---|---|---|---|
| F05 | Calm Ledger (single-col ledger) | Ops Console (dense sticky table) | Attention Queue (verdict hero + queue) | Chapter Tabs (sticky rail + scroll-spy) | Status Lanes (keyboard board) |
| F06 | Classic Brief (single column) | Three Steps (gated wizard) | Compact Desk (dense grid) | Guided Narrative (TOC + resume) | Bento Split (live preview) |

---

## 6 · Preview command

From the repo root:

```
python3 -m http.server 8130
```

Then open `/client-portal-lab/` (gallery). Every variant renders standalone over relative paths and links back to the gallery with prev/next family navigation.

---

## 7 · F08 Projects List + F09 Project Details (added 2026-10-27)

**All F08/F09 variants were hand-authored; no design-generation script was used.** Each of the ten `index.html` files was written manually, one by one, importing `shared/tokens.css` + `shared/base.css` as-is. One locked colour scheme across all ten; colour is never used as a difference axis.

### 7.1 Content locks & conflict resolutions
- F08 locks to Arjun Mehta's two captured projects (Khandesh Spice D2C, B2B Wholesale), both “In progress · Started 10/5/2026” — no invented %, money, or third project. Khandesh cards link to the same-numbered F09 variant; the B2B card carries an honest “no captured detail” note rather than invented content.
- F09 locks to `14b–14g`: 57%, 1/2 milestones, two ₹30,000.00 milestones, “Not due yet” ×2, 0/0 deliverables, Riya Kapoor's three messages, the 20.3 KB wireframes PDF. The report's ₹20,880 / “Corporate LMS” figures are treated as illustrations — captures win. The Shiprocket-vs-Delhivery inconsistency in the captured thread is preserved as captured.
- The live `GET /api/v1/projects[/{id}]` 502 (Cloudflare `origin_bad_gateway` + CORS) is designed honestly as the A13 degraded state in all ten variants — never pretend-fixed.

### 7.2 Demo-labelled CTAs (F08/F09 additions)
| CTA | Behaviour | Rationale |
|---|---|---|
| F08→F09 card links | same-numbered F09 variant (real local page) | `/projects/{id}` is real; lab link is the working target. |
| F09 Ask AI (A1) | answers quote frozen facts only, tagged DEMO | **No AI endpoint exists** in any spec — demo-labelled, never invents. |
| F09 Help/FAQ hub (A2) | FAQ from frozen facts, actions deep-link to tabs | No FAQ endpoint; feature = report A2, content = captures. |
| F09 approve / request-revision (A4) | validates reason, flips status locally | Real endpoints exist (`POST /deliverables/{id}/approve|reject`); account is 0/0 so the pattern is exercised on the captured wireframes file and labelled. |
| F09 file preview (C13) | designed lab rendering + metadata; Open/Download demo-labelled | The original PDF bytes are not in the repo; production embeds via the media endpoint. Never the captured blank modal. |
| F09 “Pay now” | **Does not exist** | Both payments are “Not due yet” — gates are kept and explained (C19/A3), never bypassed. |
| Other routes (quotes/invoices/etc.) | demo toast | Owned by their own families. |

### 7.3 Coverage (5/5 unless noted)
- **F08**: C17/C4/C5/C6/C18 in 5/5 · A13 (502 degraded state, report C5→A mapping) in 5/5 · C14 empty-state CTA “Accept a quote to open your first project →” in 5/5.
- **F09**: C2/C13/C19/C17/C4/C5/C6/C18 in 5/5 · P1 A1/A2/A3/A4/A13 in 5/5 · P3 A14/A15 in 5/5 (exceeds the ≥3/5 bar). Dual Delivery/Payment milestone status, “Awaiting you” pattern and captured graceful wording preserved (KEEP list).

### 7.4 Winners (one per family — see DELIVERY-REPORT.md in each family)
- **F08: V3 Next-Step Hero** — for a two-project list, the job-to-be-done is “what's my next move”; V3 answers it in one glance without inventing data.
- **F09: V3 Your Moves** — the sticky awaiting-you + unlock rail is the only layout that answers “do I need to do anything?” from every tab, which is the client's first question on this page.

---

## 8 · F10 Quotes List + F11 Quote Details + F12 Messages Home + F13 Messages Thread (added 2026-10-27)

**All 20 variants across F10, F11, F12, and F13 were hand-authored individually via `write_file`; no generator script was used.** Each variant imports `shared/tokens.css` + `shared/base.css` directly and uses the single locked blue token scheme.

### 8.1 Content locks & conflict resolutions
- **F10 (`/quotes`) & F11 (`/quotes/{id}`)**: Locked to Arjun Mehta's 12 captured quotes (`15-quotes-list.html`) and two captured detail snapshots (`16-quote-details-accepted.html` — `Khandesh Spice D2C Store — Phase 1`, `Accepted`, `₹70,800.00`; `17-quote-details-sent.html` — `Khandesh Pickles Wholesale Inquiry Microsite`, `Sent`, `₹41,300.00`). Report example figures (`₹1,18,000`, `"Corporate LMS"`) are documented as illustrative only.
- **F12 (`/messages`, `/messages/inbox`, `/messages/new/direct`)**: Consolidates the 3 redundant messaging entry points (`18`, `19`, `20`) into one canonical workspace (**C11**), preserving both captured threads (`Agency partner coordination — festive campaigns` and `Riya Kapoor`) and the honest support-only note (`Platform support admin for your account. Client-to-client messaging is not available.`).
- **F13 (`/messages/thread/{id}`)**: Preserves all 5 captured states (`21` Group default, `22` Members drawer, `23` Reply banner, `24` Edit message state, `25` Direct thread) and fixes the **C10** white-on-white inline edit textarea bug (`15.8:1 AAA` contrast in light mode, `14.9:1 AAA` in dark mode) while adding **A7** response-time SLA indicators and read receipts.

### 8.2 Coverage (5/5 across all 4 families)
- **F10**: **C16** (single unified filter bar), **C14**, **C17**, **C4**, **C5**, **C6**, **C18** in 5/5 · **A5** & **A6** entry actions in 5/5.
- **F11**: **A5** (combined Accept & Pay 50% Deposit `₹20,650.00` via `POST /api/v1/quotes/{id}/accept` + `POST /api/v1/payments/intents`) & **A6** (Request changes / counter-propose form) in 5/5 · **C17**, **C4**, **C5**, **C6**, **C18** in 5/5.
- **F12**: **C11** (single canonical 3-pane inbox consolidating `/messages` + `/messages/inbox` + `/messages/new/direct`), **C17**, **C4**, **C5**, **C6**, **C18** in 5/5.
- **F13**: **C10** (high-contrast inline edit textarea fix), **C11**, **A7** (response-time SLA indicator + read receipts), **C17**, **C4**, **C5**, **C6**, **C18** in 5/5.

### 8.3 Winners (one per family)
- **F10: V1 Unified Quote Triage & Split Inspector** — eliminates the duplicate filter bar (**C16**) and surfaces the actionable `Sent` quote (`₹41,300.00`) with a live right-hand proposal inspector.
- **F11: V1 Proposal Workbench & Sticky Acceptance Rail** — pairs the itemised GST ledger and 2-milestone schedule on the left with a sticky right decision rail housing both **A5** (`Accept & Pay 50% Deposit — ₹20,650.00`) and **A6** (`Request changes / counter-propose`).
- **F12: V1 Unified Enriched 3-Pane Messaging Workspace** — merges `/messages`, `/messages/inbox`, and `/messages/new/direct` into a single 3-pane workspace (**C11**).
- **F13: V1 3-Pane Collaborative Thread Workbench** — preserves all 5 captured thread states (`21`–`25`), fixes **C10** with a `15.8:1 AAA` inline edit box, and integrates **A7** SLA & read receipts.

---

## 9 · F14 Billing Center + F15 Payment Methods + F16 Checkout + F17 Payment Status + F18 Invoices Archive (added 2026-10-28)

**All 25 variants were hand-authored, one `index.html` at a time, via `write_file` / `edit_file`. No script generated or overwrote any variant HTML/CSS.** The QA harness used to measure them lives outside the repo (`/tmp/qa`) and only reads pages; it never emits design files. `manifest.json` records were appended as a literal text insertion — the first 40 records are byte-for-byte unchanged. `shared/tokens.css` and `shared/base.css` remain locked and were **not** modified.

### 9.1 Shared behaviour primitives (not a design system)

`assets/lab-core.css`, `assets/lab-core.js` and `assets/lab-icons.svg` were added as **one optional utility layer**, not a page template: theme toggle, Explore popover, ⌘K palette, focus-trapped dialog, toasts, honest state switcher, ARIA tabs, reveals, count-up, and a local SVG sprite (28 symbols) replacing remote icon requests. Every variant still writes its own layout CSS in its own `<style>` block and its own interaction JS. **F14 V1 deliberately does not load `lab-core.*`** — it is a fully standalone page with an inline sprite and its own dialog/state code, to prove the standalone contract. F14 V1 therefore carries its own small `[data-demo-nav]` handler.

Two AA corrections were applied **in `lab-core.css` only**, never in the locked tokens: `--primary-ink` gives small brand-coloured text a darker light-theme ink and a lighter dark-theme ink (the original `--primary` on `--brand-50` measured 4.34:1); and dark mode uses one step darker `--brand-500` so white text on filled primary controls measures 4.84:1 instead of 3.67:1. Micro-labels were raised to ≥11px. A `max-width:640px` header rule keeps the captured top bar on one row with 44px touch targets at 360/390px.

### 9.2 Content locks & honesty decisions

- **Captured HTML is truth; screenshots are alternate sessions.** Screenshot-only amounts (`₹36,000`, `₹48,000`) were rejected. The F14 ledger is the 11 captured rows summing to **₹1,37,750.00** (6 × ₹625.00 fixtures, 2 × ₹29,500.00 B2B, 2 × ₹22,500.00 Khandesh, 1 × ₹30,000.00 mid-project).
- **F14 KPI reconciliation.** The captured KPI cards (`Total paid ₹81,500.00 · Pending ₹31,875.00 · In dispute ₹0.00`) do **not** sum to the 11-row gross. Rather than silently changing a captured figure, all five variants label the table footer **“Ledger gross · 11 captured rows”** and carry a visible note explaining that the KPIs are separate account totals from the same capture and that no number was forced to match. The Ask AI answers are deterministic and explicitly not a live model.
- **F15** keeps the captured empty state “No saved methods yet”, the trust strip and processor chips, and “Go to payments”. Add / rename / remove / make-primary are demo-labelled. **UPI AutoPay mandates are explained, never silently enabled** — no UPI-mandate endpoint exists in any spec, and the API only supports method CRUD. Raw card numbers are never accepted by the lab.
- **F16** keeps “Pay online”, exactly **one** primary “Proceed to secure checkout”, the helper “Card, netbanking, wallets, or UPI (QR) in Razorpay's secure window”, the full **UPI-on-desktop** honesty note (QR / phone hand-off is expected Razorpay behaviour, not a Nestlancer bug), “Bank / UPI transfer” with the captured `Nestlancer Pvt Ltd · HDFC Bank · A/C 50200012345678 · IFSC HDFC0001234 · UPI nestlancer@hdfcbank`, UTR / Notes / Receipt + “Submit for verification”, the ₹30,000.00 order summary with reference `01a10a2b-5ed2-73bc-8aee-d1c6262906e9`, and the Created→Pending→Processing→Completed/Refunded stepper. Card/Netbanking/Wallet/UPI are represented as **processor chips**, never as fake form fields.
- **F17** keeps the exact completed text “This payment has been recorded. Download your receipt or invoice below.” and the not-due text “This installment is not due yet. Checkout unlocks after you approve delivery or when the studio requests payment.” plus “Checkout not available yet”, the ₹22,500.00 hero, Khandesh Spice Final payment, mono reference, Billing documents, Download invoice/receipt, File a payment dispute and Cancel payment. The A3 unlock explainer deep-links to F08 and labels `POST /api/v1/milestones/{id}/approve` as a **demo** (no live backend here).
- **F18** keeps H1 “Invoices”, the subtitle “Your issued invoices with downloadable PDF copies for accounting and tax records.”, “View payments”, the five captured rows (gross **₹1,12,125.00**), and the Download invoice / View actions. **There is no statement or GST endpoint**: A10 is a demo-labelled composition of five real `GET /api/v1/invoices/{id}/download` calls, present in V1/V2/V4/V5 (4/5). Dates are derived from snapshot 26 (no captured date column); “12 days overdue” is derived, and derived values are labelled as such.
- **`audit-metadata.json` failures are mostly aborted Next RSC navigations plus CORS/XHR to `/projects`.** They were not inflated into fictional billing outages. Designed empty / skeleton / error states are lab QA states, clearly switchable, not claims about production availability.

### 9.3 Honest navigation (the captured shell links outside this build)

The captured sidebar links to F20 Profile, F21 Settings and F23 Blog/Portfolio, which are **not** part of this lab build. All 25 variants previously had 4 dead hrefs each (100 total). Every one now points at the real gallery (`../../../index.html`, valid with JS off) and carries `data-demo-nav` plus an explanatory `title`. Clicking opens an honest boundary dialog — “this lab delivers only F14–F18” — with an **Open lab gallery** action and **Stay here**. Result: **0 broken local links, 0 remote assets, 0 `href="#"`, 0 duplicate IDs**. The same pattern applies to F16 V2's earlier nav fix.

### 9.4 Coverage

| Family | Required A-items | Achieved | Key C-items |
|---|---|---|---|
| F14 | A1 Ask AI (5/5), A5 work queue (≥3/5), A10 statement/GST (≥3/5), A12 saved views (≥3/5) | A1 5/5 · A5 5/5 · A10 5/5 (demo-labelled) · A12 4/5 | C4, C5, C6, C8, C16, C17, C18 |
| F15 | A6 methods management (≥3/5) | 5/5 | C4, C5, C6, C8, C17 |
| F16 | one primary CTA (C8), full honesty note, order summary, stepper | 5/5 | C4, C5, C6, C8, C15, C17, C18 |
| F17 | A3 unlock explainer (5/5) | 5/5 | C4, C5, C6, C9, C17 |
| F18 | A10 statement/GST (≥3/5) | 4/5 (V3 intentionally static, no statement) · A12 5/5 | C4, C5, C6, C16, C17 |

All 25 variants: one `<h1>`, skip link, ⌘K palette, four switchable states, `noscript` fallback, mono IDs/money, icon+text status badges (never colour alone), light/dark parity, reduced motion, keyboard ARIA tabs, and a mobile table/card fallback.

### 9.5 Verification actually run (Gate 3 honesty)

- **Static:** `node --check` on all **50 inline scripts → 0 errors** (two syntax defects found and repaired: F14 V1 `IntersectionObserver` bracket, F16 V5 extra `)`). Script-stripped href/src target check → **0 broken**; remote assets 0; `href="#"` 0; duplicate IDs 0; `manifest.json` parses with 65 records and 0 missing paths.
- **Browser:** Playwright **Chromium 156** headless, **25 variants × 2 themes × 5 widths (360/390/768/1024/1440) = 250 page loads** → **0 console errors, 0 page errors, 0 failed requests, 0 page-level horizontal overflow**. Interaction suite (⌘K palette + Arrow keys + Esc, theme toggle + `aria-pressed`, four state pills and return to Data, `data-demo-nav` boundary dialog + 8× Tab focus-trap containment + Esc + focus restore, ARIA tab keys) → **25/25 PASS**. No-JS context → all 25 render substantive content with no horizontal scroll. `reducedMotion: 'reduce'` → all `.reveal` elements visible.
- **Computed-style sweep:** light and dark AA text contrast sweeps → **0 failures** after the `--primary-ink` / dark `--brand-500` fixes; computed font-size sweep → **0 visible text below 11px**; 44px preferred / 24px minimum touch targets verified on the mobile header.
- **Exhaustive button smoke test (final pass, 2026-10-28):** every non-state `<button>` in all 25 pages clicked with native `prompt`/`confirm` stubbed → **418 clicks, 0 JS errors, 0 leaked body-scroll locks**. This test found and fixed two real defects: F14 V1's standalone dialog did not lock background scroll, and F16 V1's `navigator.clipboard.writeText()` produced three unhandled promise rejections when clipboard permission was denied.
- **Gallery QA (final pass):** `index.html` loaded in Chromium at 360/768/1440 in light + dark → **65 cards, 13 family sections, 14 select options, 0 errors, 0 horizontal overflow**; the F18 filter correctly narrows to `5 variants` / only the F18 section. All five footer `docs/DELIVERY-REPORT.md` links resolve.
- **Post-merge re-verification:** after the F14 ledger-note, gallery, manifest, shared-decisions and Gate T honesty edits, the full static suite was rerun → **25 variants, 0 broken links, 0 remote assets, 0 duplicate IDs, 0 JS syntax errors, `manifest.json` parses**.
- **Not done:** pixel-perfect screenshot diffs were **not** archived (computed colours/geometry were asserted instead); no real backend calls were made (all API references are read-only documentation of verified spec paths); no branch, commit or push was performed. “Hierarchy understood in <2s” was **not** human-timed — only its structural preconditions (one `<h1>`, one hero, KPI value+label+why) were verified. See each family's `docs/DELIVERY-REPORT.md` for its own limitations.

### 9.6 Limitations & known issues (honest hand-off)

| Area | Limitation | Classification / disposition |
|---|---|---|
| Data | **No live backend.** Every API path in `docs/API-MAP.md` is documentation of a verified spec path, not a call. Rows, amounts, references, account details and status labels are frozen capture data. | By design (lab). All network-facing CTAs are demo-labelled. |
| Data | **F14 KPI totals do not reconcile to the 11-row ledger gross** (`₹81,500 / ₹31,875 / ₹0` vs `₹1,37,750.00`). | **Not a bug to hide.** All five variants label the gross and carry a visible captured-data note. Forcing a match would falsify the capture. |
| Data | `/invoices` has **no captured date column**; F18 dates (Oct 5–6, 2026), “12 days overdue”, V2's Overdue heuristic and V4's queue text are **derived** from snapshot 26 / amount thresholds. | Derived values are labelled where shown. They are not presented as backend fields. |
| Features | **No statement-of-account, GST-summary, AI, UPI-mandate, card-verification, raw-card-token, promo-code, guest-checkout or currency-converter endpoint exists.** A1 Ask AI, A10 statement/GST and F15 mandates are demo-labelled. | A10 is honestly composed from five `GET /api/v1/invoices/{id}/download` calls. F15 explains mandates but never enables them. |
| Features | F16 “Proceed to secure checkout” never opens Razorpay; F16/F17 receipt uploads are `FileReader`-only; F17 document downloads, dispute, cancellation and milestone approve are demos; F18 “Download invoice” shows a demo dialog. | Labelled in-page. No real PDF, payment or mutation is produced. |
| Research | Gate T R1–R12 were **fetched in full**; four later supplementary searches produced **search snippets only** and are **not counted as opened refs**. One Stripe customer-sheet fetch returned an hCaptcha challenge; only its documentation text was extracted. | Recorded in all five `docs/TEMPLATE-RESEARCH.md` Gate T honesty notes. No Gate-A-less template feature was adopted. |
| Research | `payments.openapi.json` has **no top-level enum schemas and no named Payment / Invoice DTO**. `audit-metadata.json` failures are mostly aborted Next RSC navigations + CORS/XHR to `/projects`. | Captured UI labels are used instead of invented enums; audit failures were not inflated into fictional billing outages. |
| Interaction | F15 V2–V5 use native `window.prompt()` for rename (functional, keyboard-reachable, **not** a styled focus-trapped dialog). F14 V3 uses both the shared centred dialog and a custom queue drawer. F18 V3 chapter chips are not sticky. | Minor, known. Esc/focus/overflow were measured with no leak. Recorded in the family `DELIVERY-REPORT.md` files. |
| Interpretation | C8 “exactly one primary” is read as **one primary per visible decision context**; F16's manual “Submit for verification” is a secondary button. F18 V3's card deck is JS-rendered; its no-JS fallback is a **text list** (gallery card, `data-text`, `manifest.json` axis E and F18 V1's noscript link were all corrected from “static cards”). | Interpretations are recorded in each family's `docs/DECISIONS.md` and `docs/DELIVERY-REPORT.md`. |
| Styling | F14 V1 is intentionally standalone (own CSS/JS/inline sprite). `assets/lab-core.css` sets an 11px `!important` floor for micro-labels; visually check larger mono display text if the type scale is revised. Dark AA depends on `--primary-ink` and dark `--brand-500:#465fff`. | Both contracts were QA'd. Changing the dark brand step risks a contrast regression. |
| QA | Pixel screenshots were not archived; light/dark parity is asserted from **computed colours and contrast ratios**, not saved images. Some 36px topbar/nav controls fall below the 44px *preferred* target size. | The mobile header's primary controls meet 44px; smaller secondary controls were judged acceptable for a desktop-captured shell, but this is a judgement call, not a WCAG 2.5.5 AAA pass. |
| Process | No branch, commit or push was performed. `shared/tokens.css` and `shared/base.css` were imported as-is, never edited. `assets/` additions are additive to the one shared icon/utility set. | Scope respected. |

### 9.7 Winners (one per family)

- **F14 — V2 Dense Ops Table.** The billing centre is fundamentally a reconciliation job; V2's sortable, filterable, keyboard-complete table with a live filtered gross answers “where is my money?” fastest, while the honest KPI note keeps the captured data intact.
- **F15 — V3 Card Deck.** Payment methods are objects you recognise, not rows; V3's selectable cards put default / rename / remove exactly where the eye expects them, and its empty state stays honest.
- **F16 — V1 Split Summary Classic.** One primary CTA, an always-visible order summary, a quiet bank-transfer alternative and the full UPI-on-desktop note — the least ambiguous path to pay ₹30,000.00.
- **F17 — V4 Unlock Workbench.** The client's first question on a not-due payment is “why can't I pay?”; V4 answers with an explicit blocker checklist, the “what unlocks this” explainer and an F08 deep link.
- **F18 — V5 Narrative Archive.** Three KPIs, three accordions, full table powers and a sticky Download-all CTA make a five-row archive feel like an accounting tool rather than an afterthought.

### 9.8 Preview

From the repo root: `python3 -m http.server 8130` → `/client-portal-lab/`. Every variant also renders standalone via its own relative paths.

