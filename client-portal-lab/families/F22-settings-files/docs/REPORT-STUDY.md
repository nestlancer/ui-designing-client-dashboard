# F22 · Settings · Files (Grid / List / Preview) — REPORT-STUDY (Gate R)

Studied in full:
- `reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md` (§1–§8 cover-to-cover)
- `reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx` — **all 10 sheets opened and verified** (`1. Executive Findings` → `10. Sources`). `.md` wins on minor formatting differences.

## 1. Executive Findings & Inventory Rows Touching F22 (Quoted)

- **Page Inventory #47 (`/settings/files` — Grid, Sheet 3 Row 50):** *"Drag-drop zone, type chips (All/Images/Documents/Video/Archives), source tabs (6), search, status filter, grid/list toggle, **Generated documents grouped by request** — 'Generated documents grouped by request' is a strong IA idea."*
- **Page Inventory #48 (`/settings/files` — List, Sheet 3 Row 51):** *"Dense table rows (icon, name, type/size/date, Preview/Download/⋯)."*
- **Page Inventory #49 (`/settings/files` — Preview modal, Sheet 3 Row 52):** *"Modal with filename, Open / Close, 'No in-app preview for this file type' — Issue: **Preview modal is blank for non-PDF/unsupported types. Blank white box = broken feel. ZIP preview shows nothing at all.**"* → Fixed via **C13**.
- **Finding #3 (High — Badge Contrast):** `READY`, `locked`, `QUOTE`, `CONTRACT`, `INVOICE`, `RECEIPT` badges use AA-safe `--status-*-text/bg/border` + icon + text (C4).
- **Finding #4 (High — Dual Brand Systems):** Consolidate to `--brand-*` blue ramp (C5).
- **Finding #10, #11, #12 (Mobile, Dark Mode, Raw Card Classes):** Mobile card-fallback for the Files list view (C16); tokenise all cards (`--card`, `--border`, `--shadow-xs`, C6).

## 2. Token Table Summary (Report §3.2 + §5.2 Lock)

All 5 variants import `shared/tokens.css` + `shared/base.css` verbatim:
- **Brand:** `--brand-500 #465fff` (dark `--primary-ink #a9bcff`).
- **Status:** `--status-success/warning/error/info/purple-*` AA triples with icon + text (`READY`, `locked`, `Processing`, `Failed`, `Quarantined`).
- **Typography:** `Outfit` display H1 `32–40px` (C18), H2 `20–24px`, `--mono` for document numbers (`NL-CTR-2026-000018`, `NL-QTE-2026-000030`, `NL-INV-2026-000001`), MIME types, sizes (`474 B`, `20.3 KB`, `41.1 KB / 5 GB`), and request hashes.

## 3. Benchmark Patterns Applied (Report §5, Sources [1]–[13])

- **Tailwind Admin [7]:** *Empty/error states are the states that decide quality* — directly drives **C13** (real PDF preview sheet, inline image preview via `FileReader` for uploaded images, and a rich designed archive card for `.zip` preserving `"No in-app preview for this file type."` + `"Open in new tab"` instead of a dead white void).
- **AdminLTE Client Portals [1] & Assembly [10]:** Keep client deliverables and contractual paperwork grouped by engagement (`B2B Wholesale Ordering Portal`, `Khandesh Spice D2C E-Commerce Store`) so non-expert clients find signed agreements (`locked`) effortlessly.
- **TailGrids [12]:** Responsive table/list card-fallback under `sm:` (C16) and full keyboard modal focus trapping.

## 4. CHANGE / ADD / KEEP Scope for F22

### CHANGE (5/5 variants mandatory)
- **C13 — Give the file-preview modal real content:**
  - **PDFs** (`arjun-mehta-marketplace-web-app-milestone-1-handoff.pdf`, `…wireframes.pdf`, and generated `NL-CTR`/`NL-QTE`/`NL-INV`/`NL-RCPT` PDFs): rich client-side inline document preview sheet (page navigator, zoom toggle, metadata header, honest lab note that raw S3 PDF bytes aren't bundled in the repo).
  - **Images** (any JPG/PNG/WebP/SVG dropped into the upload dropzone): real client-side `FileReader` inline image preview!
  - **Unsupported types** (`arjun-mehta-marketplace-web-app-nestlancer-marketplace-v1.0.zip` + `EXPORT_GDPR`): designed structured card with archive icon, file size (`474 B`), MIME (`application/zip`), checksum/source metadata, exact captured copy `"No in-app preview for this file type."`, and `"Open in new tab"` / `"Download"` — **never a blank modal**.
- **C16 — Mobile treatments for the Files list view:** Responsive card-fallback on narrow viewports + Grid/List toggle in every variant.
- **C17 — Compress sidebar (232px) + Explore popover**.
- **C4 — AA badge contrast** (`READY`, `locked`, document type chips — icon + colour + text ≥4.5:1).
- **C5 — Single blue brand ramp** (`--brand-*`).
- **C6 — Tokenised cards** (`--card`, `--border`, `--shadow-xs`).
- **C18 — Display type scale** (`H1` 32–40px).

### KEEP (5/5 variants)
- **Graceful wording** (`"Your files library — uploads, message attachments, project files, and deliveries you can access. Storage quota counts only files you uploaded."`, `"No in-app preview for this file type."`, `"Quotes, invoices, and related PDFs grouped by the request that produced them."`).
- **Generated documents grouped by request** (all 13 captured groups / 26 documents preserved).
- **shadcn-style token architecture**.

## 5. Roadmap & Acceptance Checklist (QA Gate)

- **Roadmap phases:** **P1** (Foundations: C4, C5, C6, C18) · **P2/P6** (C13 real file preview + C16 mobile list fallback).
- **Acceptance Checklist (§7.1):** Hierarchy <2s · Search, type chips, source tabs, status filter, Grid/List toggle, file actions menu (`035`) · 232px sidebar + accurate ⌘K · Single blue ramp + AA contrast · Outfit + mono for doc IDs & sizes · Dark parity · Full keyboard ARIA (`tablist`, `dialog` w/ focus trap & Esc, menu) · Per-filter Empty + Skeleton + Error w/ retry · 360–1440px zero horizontal scroll.

```
## GATE R (F22)
MD read: YES · XLSX sheets: 10/10 · C-items mapped: 7/7 (C13, C16, C17, C4, C5, C6, C18) · A-items mapped: 0 numbered
KEEP listed: YES · Checklist copied: YES
Gate: PASS
```
