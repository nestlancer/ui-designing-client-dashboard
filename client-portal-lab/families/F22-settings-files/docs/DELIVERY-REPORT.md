# F22 · Settings Files & Storage — Gate 3 Delivery Report

- **Family**: `F22-settings-files` (`/settings/files`)
- **Date**: `2026-10-28`
- **Baseline Lock**: Snapshots `39-settings-files.html`, `40-settings-files-list.html` · Screenshots `034`, `035` · `media.openapi.json`
- **Token Scheme**: `shared/tokens.css` + `shared/base.css` (imported as-is, unmodified)

---

## 1 · Variant Matrix & Winner Selection

| Variant | Name | Archetype | Signature Layout & Interaction | Winner? |
|---|---|---|---|---|
| **V1** | **Calm Unified Library & Bundles** | Minimal (`1080px`) | Quota + accessible `<label>` dropzone strip, shared-array Grid/List cards, `035` `⋯` menu, 13 collapsible contractual bundles (`26` locked PDFs), C13 modal | — |
| **V2** | **Dense Asset & Contract Ledger** | Dense (`1240px` dual ledger) | List-first dual table (`3` uploaded + `26` locked PDFs), multi-select bulk download/delete dock, inline visibility toggle | — |
| **V3** | **Split Drive & Live Preview** | Split Workspace (`205px + 1fr + 330px`) | 3-pane cloud drive: Source/Type tree + Grid/List canvas + live inline **C13** Preview & Metadata Inspector | **WINNER** |
| **V4** | **Engagement Dossier Hub** | Action / Queue-led (`Hero + Bento`) | Split drag-and-drop Upload Hero + Quota card above uploaded assets and 2-column Bento Engagement Dossier cards linking to `F05`/`F09`/`F11`/`F18` | — |
| **V5** | **Guided Vault Stepper** | Narrative / Stepper-led | 3-stage workflow (`1. Upload & Scan` → `2. Uploaded Library` → `3. Contractual Vault`) + Quota & Retention Policy rail | — |

**Why V3 wins**: File management is slow when every preview requires opening and closing a modal. **V3**'s 3-pane drive renders the **C13** PDF document sheet, `FileReader` image preview, or `.zip` fallback card (`"No in-app preview for this file type."` + `"Open in new tab"`) immediately in the right-hand inspector as you click through assets.

---

## 2 · Defect & Enhancement Coverage (5 / 5 Variants)

- **C13 (Tri-Mode Sandbox-Safe Preview)**: Fixes broken sandboxed PDF iframes and unhandled `.zip` previews across all 5 variants:
  1. **PDFs (`.pdf`)**: Client-side structured Document Sheet Preview + `Download PDF` + `Open in new tab`.
  2. **Images (`image/*`)**: Live `FileReader` `<img>` preview upon upload.
  3. **Archives/Binary (`.zip`)**: Explicit fallback card with exact copy **`"No in-app preview for this file type."`** + **`"Open in new tab"`** + **`"Download"`**.
- **C16 (Shared-Array Grid/List Toggle)**: `aria-pressed="true|false"` Grid/List toggle updates layout from one shared array — zero duplicated mobile/desktop file markup.
- **Exact Baseline Quota & Assets**: `41.1 KB / 5 GB` (`mehta-catalog-structure.pdf` `18.4 KB` + `gst-invoice-format-sample.pdf` `13.2 KB` + `warehouse-barcode-spec.zip` `9.5 KB`), accessible `<label>` + `.sr-only <input type="file" multiple>` dropzone (`≤500 MB`, `>10 MB` chunked note), `035` row/card actions (`Preview`, `Download`, `Copy signed link`, `Visibility`, `Delete`), and `13` engagement groups × `2` `locked` contractual PDFs = `26` quota-exempt records.

---

## 3 · Gate 3 Verification Results

- **Static checks**: `node --check` on all 5 inline scripts → **0 syntax errors** · Undefined CSS tokens → **0** · Broken local links → **0** · Remote URLs → **0** · Duplicate IDs → **0** · Nested `<button>`/`<a>` → **0** · Font sizes `< 11px` → **0**.
- **Headless JSDOM runtime**: Hydrated all 5 variants, tested Grid/List toggles, C13 PDF & `.zip` preview dialogs, vault group expansions, 4 state pills, theme toggle, and button smoke clicks → **0 runtime errors**, **0 post-hydration duplicate IDs**.
- **Honest limitations**: Signed download/new-tab URLs (`GET /api/v1/media/{id}/url`) and chunked uploads (`POST /api/v1/media/upload/init`) are simulated client-side with honest status toasts.
