# F22 · Settings · Files (Grid / List / Preview) — TEMPLATE-RESEARCH (Gate T)

Online template & UX pattern research executed **after** Gates S, R, and A. Every reference R1–R9 below was genuinely fetched and read via `fetch_page` (status 200). **Colour-scheme discipline:** §5 single-blue token system (`shared/tokens.css`) is locked; zero palette ideas were imported.

## 1. Search Queries Run

- `SaaS file manager document library UI design grid list toggle file preview modal dropzone shadcn`

## 2. Reference Table (9/9 Opened & Verified)

| ID | Source & URL | Pattern / Product Archetype | Job Match |
|---|---|---|---|
| **R1** | [Shadcn Examples — File Manager Admin Dashboard](https://shadcnexamples.com/file-manager-admin-dashboard) | Single-source Grid ↔ List toggle (`ButtonGroup`), storage meter panel, per-row `DropdownMenu` | Direct match for Grid/List toggle + `41.1 KB / 5 GB` storage indicator |
| **R2** | [Shadcn UI Blocks — Media Library Grid](https://www.shadcn-ui-blocks.com/blocks/application-pro/media-gallery/media-library-grid) | Asset tiles w/ format badge + size, visible asset count (`3 files`) so filters never look broken, `aria-pressed` view switch | Direct match for 5 type chips + count clarity + Grid/List `aria-pressed` |
| **R3** | [shadcn.io — File Upload Grid View Block](https://www.shadcn.io/blocks/file-upload-grid-view) | Source/folder rail (collapsing cleanly on mobile), tile `⋯` menu, keyboard `Escape` focus return, ≥44px phone targets | Direct match for 6 source tabs + `035` file actions menu + mobile ergonomics |
| **R4** | [ReUI — Shadcn File Upload Components](https://reui.io/components/file-upload) | Styled drag-and-drop card replacing native file input, instant local `FileReader`/object-URL image preview, inline validation | Direct match for styled dropzone + real image preview in **C13** |
| **R5** | [Files SDK — Build a shadcn File Manager](https://files-sdk.dev/guides/shadcn-file-manager) | Composed `Dropzone` + `FileBrowser` + `FilePreview` + `FileActions`, inline error states, keyboard & screen-reader notes | Direct match for client-side `FilePreview` (**C13**) & upload queue |
| **R6** | [Filestack — Scalable Shadcn UI Upload Composition](https://blog.filestack.com/shadcn-ui-image-upload-component/) | Accessible `<label for>` + `sr-only` `<input type="file">` (Enter/Space operable), inline per-file status row instead of ephemeral toast | Direct match for WCAG 2.2 AA dropzone + chunked/direct upload queue rows |
| **R7** | [shadcn.io — File Actions Dropdown Menu](https://www.shadcn.io/examples/dropdown-menu-file-actions-dropdown) | `aria-label="File actions"` `⋯` button, `Preview` / `Download` / `Shared` items, `ArrowUp`/`ArrowDown`/`Escape` focus return | Direct match for screenshot `035` `⋯` popover keyboard accessibility |
| **R8** | [Dice UI — Radix/Base File Upload Primitive](https://diceui.com/docs/components/radix/file-upload) | `[data-dragging]` highlight state, `FileUploadItemPreview` + `FileUploadItemMetadata`, `Enter`/`Space` keyboard trigger | Direct match for dropzone dragover highlight & queued file cards |
| **R9** | [Files SDK — UI Components Overview](https://files-sdk.dev/docs/ui) | Separation of presigned/multipart uploads, version history metadata (`v1`, `v42`), and signed document downloads | Direct match for `Generated documents` (`v1`, `v42`, `locked`) & chunked upload note |

## 3. Per-Reference Notes (Borrow vs Reject)

- **R1 (Shadcn Examples File Manager):** *Layout:* Storage bar in header + toolbar + single-array Grid/List switcher so state never drifts between views. *Borrow:* Unified data model powering Grid tiles, List table, and `<760px` mobile cards (**C16**). *Reject:* Recharts third-party chart bundle (zero external CDN scripts).
- **R2 (Shadcn UI Blocks Media Library Grid):** *Component detail:* Keeps visible result count (`Showing 3 of 3 library files`) next to filters so selecting `Images 0` or `Video 0` clearly communicates a filter match of zero rather than a broken page. *Borrow:* Live result counter + instructive per-filter Empty state with `"Reset filters"` CTA. *Reject:* Truncating long filenames without full readable title/tooltip (`arjun-mehta-marketplace-web-app-milestone-1-handoff.pdf` stays distinguishable from `…wireframes.pdf`).
- **R3 (shadcn.io File Upload Grid View):** *Component detail:* `⋯` button + keyboard menu navigation + ≥44px touch targets on 360px/390px viewports. *Borrow:* Accessible `⋯` menu preserving `035` (`Preview`, `Download`, `Shared with you · Nestlancer`) + spec-backed `View details`. *Reject:* In-place filename rename input (no rename endpoint in `media.openapi.json`).
- **R4 & R6 (ReUI & Filestack Accessible Dropzone):** *Component detail:* Wraps `<input type="file" class="sr-only">` with an interactive `<label>` / keyboard-operable dropzone (`Enter`/`Space` + `dragover`/`drop`), validates `size ≤ 500 MB` (`RequestUploadDto`), renders real `FileReader` thumbnails for dropped images, and flags files `> 10 MB` for chunked upload (`InitChunkUploadDto`). *Borrow:* Accessible styled dropzone + real image preview + honest offline queue rows (no fake progress bars!). *Reject:* Unstyled raw `<input type="file">` (explicitly forbidden by prompt §0).
- **R5 & R9 (Files SDK File Manager & Preview):** *Component detail:* Drives **C13** preview modal architecture — PDFs open an inline structured document sheet (showing document metadata, scope/version context, page zoom toggle, and honest offline S3 note), uploaded images render real `<img>` previews, and `.zip` / `EXPORT_GDPR` archives render a designed unsupported card with `"No in-app preview for this file type."` + `"Open in new tab"` + `"Download"`. *Borrow:* Tri-mode client-side preview dialog with focus trap & `Escape` restore. *Reject:* Blank white box modal (`41-settings-files-preview-dialog.html` anti-pattern).
- **R7 & R8 (shadcn.io File Actions & Dice UI):** *Component detail:* `[data-dragging="true"]` visual ring on `--brand-500`, `ArrowUp`/`ArrowDown` menu roving focus, and clear `locked` icon + text badge on `CONTRACT · NL-CTR-*` cards. *Borrow:* Keyboard menu roving + `locked` contractual badge contrast (**C4**). *Reject:* Inventing nested folder-creation modals (no `POST /folders` endpoint in `media.openapi.json`).

## 4. Variant Inspiration Map

- **V1 (`Calm Unified Library + Collapsible Bundles` — Minimal):** R1 + R2 + R5 + R6
- **V2 (`Dense Operations Asset & Contract Table` — Dense):** R1 + R3 + R7 + R9
- **V3 (`Split Inspector & Live Preview Workbench` — Action / Queue-led):** R3 + R4 + R5 + R8
- **V4 (`Deliverables & Engagement Paperwork Hub` — Action / Bundle-led):** R2 + R5 + R7 + R9
- **V5 (`Guided Upload, Triage & Contract Vault Walkthrough` — Narrative / Stepper-led):** R4 + R6 + R8 + R9

```
## GATE T (F22)
Queries run: 1 · References opened: 9 (≥8) · Variant inspiration mapped: 5/5
Gate: PASS
```
