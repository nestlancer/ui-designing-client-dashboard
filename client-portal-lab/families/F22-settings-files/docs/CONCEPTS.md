# F22 · Settings · Files (Grid / List / Preview) — CONCEPTS (Gate 1)

Designed before writing any variant HTML. Every variant shares the locked single-blue token system (`shared/tokens.css` + `shared/base.css`), the 5-tab Settings header (`Account · Security · Notifications → F21`, **`Files` active**, `Activity → F21`), storage meter (`41.1 KB / 5 GB`), styled accessible drag-and-drop upload dropzone + `+ Upload` button, 5 type chips (`All 3 · Images 0 · Documents 2 · Video 0 · Archives 1`), 6 source tabs (`All sources · My uploads · Message attachments · Projects · Deliveries · Folders`), status filter (`All statuses · Ready · Processing · Failed · Quarantined`), search, Grid/List toggle + **C16** mobile card fallback, the 3 frozen library files + `035` actions menu (`Preview · Download · Shared with you · Nestlancer`), all 13 grouped `Generated documents` (`26` `CONTRACT`/`QUOTE`/`INVOICE`/`RECEIPT`/`EXPORT_GDPR` records w/ `locked` badges), **C13** real client-side file preview dialog (inline PDF sheet, `FileReader` image preview, designed archive card w/ `"No in-app preview for this file type."` + `"Open in new tab"`), and `Data / Empty / Loading / Error` states.

---

## Concept Cards & ASCII Sketches

### V1 · Calm Unified Library + Collapsible Bundles (`Minimal`)
- **Persona & Moment:** Wholesale client looking cleanly for either a milestone wireframe PDF or a signed contract without facing 26 expanded cards all at once.
- **Axis A (Layout):** Clean single-column (`1040px`) stacked workspace: slim storage + collapsible upload dropzone at top, unified filter bar, clean 3-up File Grid (or List), and calm collapsible `Generated documents` accordions below (real client projects expanded first, 10 `AUDIT-*` fixtures neatly collapsible).
- **Axis B (Hierarchy):** Clear 2-part rhythm (`Your Files Library (3)` above `Generated Documents (13 groups · 26 PDFs)`); clean file type tiles and `READY` / `locked` AA badges.
- **Axis C (Narrative):** *"Your project deliverables on top, engagement paperwork neatly bundled below"* — calm, unhurried browsing with zero visual noise.
- **Axis D (Density):** Spacious (`20–24px` card padding, generous tile thumbnails, collapsible request groups).
- **Axis E (JS Interaction):** Accessible drag-and-drop queue + Grid ↔ List toggle + tri-mode **C13** Preview modal + collapsible request groups (`Expand all 13 / Collapse audit fixtures`).
- **Gate T Refs:** R1 + R2 + R5 + R6.

```
+-------------------------------------------------------------------+
| [Sidebar 232px] | Settings · [Acct][Sec][Notif][*Files*][Activity]|
|                 | Storage: 41.1 KB / 5 GB          [+ Upload]     |
|                 | [ Dropzone: Drag & drop a file here ...       ] |
|                 | [All 3][Images 0][Docs 2][Video 0][Archives 1]  |
|                 | [All sources][My uploads][Msg][Proj][Deliv][Fld]|
|                 | +-------------+ +-------------+ +-------------+ |
|                 | | .ZIP  474 B | | .PDF 20.3KB | | .PDF 20.3KB | |
|                 | +-------------+ +-------------+ +-------------+ |
|                 | Generated documents (13 groups · 26 documents)  |
+-------------------------------------------------------------------+
```

### V2 · Dense Asset & Contract Ledger (`Dense`)
- **Persona & Moment:** Finance/procurement lead reconciling every uploaded deliverable alongside all 26 generated `NL-CTR`, `NL-QTE`, `NL-INV`, `NL-RCPT`, and `NL-EXP-GDPR` documents by number, version, and byte size.
- **Axis A (Layout):** Full-width (`100%`) high-density dual-ledger layout defaulting to **List view** (with instant **Grid** switch + `<760px` **C16** mobile card fallback), compact inline upload strip, and dense tabular/grouped Generated Documents index with document-type filter (`ALL · CONTRACT · QUOTE · INVOICE · RECEIPT · EXPORT_GDPR`).
- **Axis B (Hierarchy):** Monospace document codes (`NL-CTR-2026-000018`, `NL-INV-2026-000005`), versions (`v1`, `v42`), sizes (`474 B`, `20.3 KB`, `176.6 KB`), and `locked` badges align in crisp scan columns.
- **Axis C (Narrative):** *"Every deliverable and commercial record in one searchable ledger"* — treats library files and generated PDFs with accounting-grade precision.
- **Axis D (Density):** Compact (`10–12px` table row padding, compact dropzone bar, maximum records visible per screen).
- **Axis E (JS Interaction):** Unified search across both Library + Generated Documents + column sort (`Name`, `Size`, `Date`) + keyboard `⋯` menu + **C13** Preview modal with page/metadata inspector.
- **Gate T Refs:** R1 + R3 + R7 + R9.

```
+-------------------------------------------------------------------+
| Settings ▸ Files Ledger · 41.1 KB / 5 GB   [Drop/Browse] [+Upload]|
| [All 3][Img 0][Doc 2][Vid 0][Arc 1] | [Search...] [Status v][L|G] |
+-------------------------------------------------------------------+
| NAME                                   | TYPE | SIZE   | ACT      |
| arjun-mehta-...-v1.0.zip               | ZIP  | 474 B  | Prv Dl ⋯ |
| arjun-mehta-...-milestone-1-handoff.pdf| PDF  | 20.3KB | Prv Dl ⋯ |
| GENERATED DOCUMENTS (13 request groups · 26 records) [Search IDs] |
+-------------------------------------------------------------------+
```

### V3 · Split Drive Browser & Live Preview Workbench (`Action / Queue-led`)
- **Persona & Moment:** Client reviewing deliverables (`milestone-1-handoff.pdf`, `milestone-1-wireframes.pdf`, `v1.0.zip`) and contracts side-by-side without opening/closing modals on every single file—while still offering full-screen **C13** modal preview!
- **Axis A (Layout):** 3-zone Cloud Drive Workbench: `200px` Source & Quota Rail (`All sources … Folders` + `41.1 KB / 5 GB` meter) + `1fr` central Grid/List canvas + `340px` sticky **Live File & Preview Inspector** (plus full-screen **C13** `role="dialog"` Preview Modal on `"Expand preview"` / `"Preview"`).
- **Axis B (Hierarchy):** Selected file or contract illuminates immediately in the right-hand preview pane (inline PDF sheet or honest `.zip` card) with primary `Open Full Preview`, `Download`, and `Shared with you · Nestlancer` metadata.
- **Axis C (Narrative):** *"Click once to inspect inline, open full modal when you need to read"* — eliminates blind file clicking (`Page Inventory #49` pain point).
- **Axis D (Density):** Balanced multi-pane studio (`14–16px` tile/row spacing, compact source rail).
- **Axis E (JS Interaction):** Synchronized inline inspector + full focus-trapped **C13** modal preview + drag-over dropzone queue with instant `FileReader` image preview + Grid/List switch.
- **Gate T Refs:** R3 + R4 + R5 + R8.

```
+-------------------------------------------------------------------+
| Settings ▸ Files Drive                         [Grid|List][+Upld] |
+----------------+-------------------------------+------------------+
| SOURCES        | [Dropzone: Drag & drop...]    | LIVE INSPECTOR   |
| * All sources  | [All 3][Img 0][Doc 2][Arc 1]  | handoff.pdf      |
|   My uploads   | [ZIP v1.0] [PDF handoff *]    | [Inline PDF pg1] |
|   Deliveries   | [PDF wireframes]              | 20.3 KB · READY  |
| Quota 41.1KB   | + Generated docs (13 groups)  | [Modal] [Downld] |
+----------------+-------------------------------+------------------+
```

### V4 · Engagement Dossier & Deliverables Hub (`Action / Bundle-led`)
- **Persona & Moment:** Client who thinks by *project/engagement* (`B2B Wholesale Ordering Portal`, `Khandesh Spice D2C E-Commerce Store`, `Marketplace Web App`) rather than MIME types, wanting deliverables and signed `locked` contracts surfaced cleanly.
- **Axis A (Layout):** Top asymmetric **Upload & Storage Split Hero** (`1.3fr` Styled Dropzone + `0.7fr` Quota & Quick Counts card) above a 2-tabbed/stacked **Deliverables Grid/List** and **Request-Grouped Paperwork Cards** (featuring pinned active engagements `B2B Wholesale Ordering Portal` [6 docs] & `Khandesh Spice D2C` [5 docs] alongside the 11 remaining captured groups).
- **Axis B (Hierarchy):** Engagement group cards with `CONTRACT · locked` badges and request `Open` deep links (`F05`) share equal billing with the 3 deliverable files.
- **Axis C (Narrative):** *"Project handoffs and signed commercial paperwork, organized by engagement"* — elevates the report's praised strength (*"Generated documents grouped by request is a strong IA idea"*).
- **Axis D (Density):** Roomy Bento cards (`18px` padding, 2-column document cards inside each request group).
- **Axis E (JS Interaction):** Group filter (`All 13 groups` / `Client stores & portals` / `Audit fixtures` / `Account exports`) + Grid/List file toggle + `035` `⋯` popover menu + **C13** Preview dialog for both library files and all 26 generated documents!
- **Gate T Refs:** R2 + R5 + R7 + R9.

```
+-------------------------------------------------------------------+
| Settings ▸ Files   [Dropzone: Drag & drop...] | [41.1 KB / 5 GB ] |
| [All 3][Images 0][Docs 2][Video 0][Archives 1] · [6 Source Tabs]  |
| DELIVERABLES & PROJECT FILES (Grid / List) -> 3 READY files       |
| GENERATED DOCUMENTS BY REQUEST (13 groups · 26 docs)              |
| +---------------------------------------------------------------+ |
| | B2B Wholesale Ordering Portal (6 docs)               [Open ->]| |
| | [CONTRACT NL-CTR-..02 🔒 locked] [QUOTE NL-QTE-..02] [INV x2] | |
| +---------------------------------------------------------------+ |
+-------------------------------------------------------------------+
```

### V5 · Guided Upload, Library & Contract Vault Stepper (`Narrative / Stepper-led`)
- **Persona & Moment:** Client onboarding or closing out Milestone 1 who wants a clear 3-stage workflow: `1. Upload & Queue Assets` → `2. Browse Shared Deliverables (3)` → `3. Download Signed Contracts & Invoices (26)`.
- **Axis A (Layout):** Top 3-stage **Files Workflow Stepper** (with `"Show all stages"` continuous scroll or focused stage view) + `2fr / 1fr` main workspace and sticky **Vault Summary & Quota** sidebar.
- **Axis B (Hierarchy):** Stage headers + quota breakdown (`Uploaded by you: 41.1 KB / 5 GB` vs `Shared & Generated: doesn't count against quota`) clarify Nestlancer's exact storage rule.
- **Axis C (Narrative):** *"Upload assets, verify milestone handoffs, and archive locked contracts"* — turns the captured quota & generated-docs rules into an intuitive client story.
- **Axis D (Density):** Editorial guided spacing (`20px` padding, clear stage cards).
- **Axis E (JS Interaction):** 3-stage interactive workflow stepper + real drag-and-drop file queue (auto-detecting direct vs `>10 MB` chunked path + `FileReader` image preview) + Grid/List toggle + **C13** Preview modal.
- **Gate T Refs:** R4 + R6 + R8 + R9.

```
+-------------------------------------------------------------------+
| Settings ▸ Files  [1. Upload Assets]->[2. Library (3)]->[3. Vault]|
+-------------------------------------------+-----------------------+
| STAGE 2 · SHARED & UPLOADED LIBRARY       | QUOTA & VAULT SUMMARY |
| [All 3][Img 0][Doc 2][Vid 0][Arc 1] [G|L] | 41.1 KB / 5 GB (<1%)  |
| - v1.0.zip (474 B)       [Preview][Dl][⋯] | 3 Library files       |
| - handoff.pdf (20.3 KB)  [Preview][Dl][⋯] | 26 Generated PDFs     |
| - wireframes.pdf (20.3KB)[Preview][Dl][⋯] | 5 Locked Contracts    |
+-------------------------------------------+-----------------------+
```

---

## Difference Test Matrix (§8.2 — All 10 Pairs Verified)

| Variant | Archetype | Unique A (Layout) + C (Narrative) Signature |
|---|---|---|
| **V1** | Minimal | Centered `1040px` stacked Grid + collapsible bundles + *"Deliverables on top, paperwork neatly bundled below"* |
| **V2** | Dense | Full-width List-first dual ledger + *"Every deliverable and commercial record in one searchable ledger"* |
| **V3** | Action / Drive Split | 3-pane (`200px + 1fr + 340px`) Cloud Drive + *"Click once to inspect inline, open full modal to read"* |
| **V4** | Engagement Hub | Split Upload/Quota hero + Request-first Bento cards + *"Project handoffs & signed paperwork organized by engagement"* |
| **V5** | Narrative / Stepper | 3-stage workflow stepper + `2fr/1fr` Vault rail + *"Upload assets, verify handoffs, and archive locked contracts"* |

All 10 pairwise comparisons differ on **4 to 5 axes**, including both **A** and **C**.

## Required CHANGE / ADD / KEEP Coverage (5/5 Variants)

| Item | Description | V1 | V2 | V3 | V4 | V5 |
|---|---|---|---|---|---|---|
| **C13 Real Preview** | Client-side Preview modal: inline PDF sheet, `FileReader` image preview, designed `.zip` card (`"No in-app preview for this file type."` + `"Open in new tab"`) | YES | YES | YES | YES | YES |
| **Dropzone + Filters** | Styled accessible dropzone + `+ Upload`, 5 type chips, 6 source tabs, status select, search, Grid/List toggle | YES | YES | YES | YES | YES |
| **Frozen Files + 26 Docs** | 3 captured library files + `035` `⋯` menu + all 13 request/account groups (`26` generated docs w/ `locked` badges) | YES | YES | YES | YES | YES |
| **C16, C17, C4, C5, C6, C18 + 4 States** | Mobile list card fallback, 232px sidebar, AA badges, single blue ramp, tokenised cards, display H1, Data/Empty/Loading/Error | YES | YES | YES | YES | YES |

```
## GATE 1 (F22)
Concepts: 5 · Sketches: 5 · Difference Test: PASS (all 10 pairs ≥4 axes, unique A+C)
Archetype spread: minimal (V1) · dense (V2) · action/drive (V3) · engagement/bento (V4) · narrative/stepper (V5)
Gate: PASS
```
