# Client Portal Lab — DECISIONS

> Merge-only shared file. This run added sections for **F05 · Requests work hub** and **F06 · New request form** only. No other family's section or record was edited or deleted. Structured so later runs can append `### F## …` sections and manifest records without touching these.

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

