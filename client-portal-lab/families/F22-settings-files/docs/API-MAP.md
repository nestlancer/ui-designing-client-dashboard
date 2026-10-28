# F22 · Settings · Files (Grid / List / Preview) — API-MAP (Gate A)

Specs read and verified:
- `backend-api-swagger/README.md`
- `backend-api-swagger/media.openapi.json` (50 paths, 12 schemas — upload direct + chunked, list/filter, storage usage, versions, share links; confirms **no server preview endpoint exists**)
- `backend-api-swagger/quotes.openapi.json` (`GET /api/v1/quotes/{id}/pdf`, `GET /api/v1/quotes/{id}/contract`, `GET /api/v1/quotes/{id}/documents/versions`)
- `backend-api-swagger/payments.openapi.json` (`GET /api/v1/invoices/{id}/download`, `GET /api/v1/payments/{id}/invoice`, `GET /api/v1/payments/{id}/receipt`, `GET /api/v1/payments/{id}/documents/versions`)
- `backend-api-swagger/users.openapi.json` (`GET /api/v1/users/export/{id}` for `EXPORT_GDPR · NL-EXP-GDPR-2026-000002`)

## 1. UI Surface → Endpoint Mapping

| UI Element / Affordance | Method & Path | Key Query Params / Request DTO / Enums | States & Behaviour in Variants |
|---|---|---|---|
| Storage quota bar (`41.1 KB / 5 GB`) | `GET /api/v1/media/storage-usage` | Returns used bytes vs 5 GB upload quota | Updates live when demo files are queued in the dropzone |
| Files library Grid & List views + Type chips + Source tabs + Status select + Search | `GET /api/v1/media` (+ `GET /api/v1/media/shared`) | Query: `page`, `limit`, `sort`, `fileType` (`IMAGE \| DOCUMENT \| ARCHIVE \| VIDEO`), `status` (`PENDING \| PROCESSING \| UPLOADING \| READY \| FAILED \| QUARANTINED`), `search`, `contextType` (`project \| thread \| message \| folder \| ungrouped`), `scope` (`library \| owned`) | Filters the 3 captured files + any locally dropped files across all 5 type chips, 6 source tabs, 5 status values, and search; renders instructive Empty state when count = 0 (e.g. `Images 0`, `Video 0`, `My uploads`, `Quarantined`) |
| Styled Upload Dropzone + `+ Upload` button (small/standard files) | `POST /api/v1/media/upload/request` → `POST /api/v1/media/upload/confirm` (or `POST /api/v1/media/upload/direct`) | `RequestUploadDto`: `filename`, `mimeType`, `size` (`1..524288000` = 500 MB max), `fileType` (`IMAGE \| DOCUMENT \| ARCHIVE \| VIDEO`) | Validates size ≤ 500 MB; queues dropped/selected files locally (with real `FileReader` image data URL for images!) and labels as offline demo queue |
| Chunked upload path (> 10 MB large files, per captured dropzone copy) | `POST /api/v1/media/upload/chunked/init` → `…/{uploadId}/part` → `…/{uploadId}/complete` | `InitChunkUploadDto`: `filename`, `mimeType`, `totalSize`, `fileType`, `chunkSize` | Automatically annotates queued files ≥ 10 MB as `"Chunked upload path (InitChunkUploadDto)"` — no fake upload progress spinners |
| File Preview Dialog (C13) | **Client-side only** (uses `GET /api/v1/media/{id}/download` presigned URL in production; **no preview endpoint exists**) | PDF → inline document preview sheet; Image → `FileReader` `<img>`; Archive (`.zip`) → designed card (`"No in-app preview for this file type."` + `"Open in new tab"`) | Focus-trapped modal (`Esc` closes, restores focus); never a blank box |
| File `Download` + `⋯` actions menu (`Preview`, `Download`, `Copy share link`, `Versions`, `Delete`) | `GET /api/v1/media/{id}/download`, `GET /api/v1/media/{id}`, `GET /api/v1/media/{id}/versions`, `POST /api/v1/media/{id}/share`, `DELETE /api/v1/media/{id}` | Preserves `035` menu (`Preview`, `Download`, `Shared with you · Nestlancer`) + spec-backed `media/{id}` inspection | Opens preview or demo download dialog citing exact endpoint |
| Generated documents — `CONTRACT · NL-CTR-*` (`locked`) | `GET /api/v1/quotes/{id}/contract` | Signed service agreement PDF (`locked` badge w/ lock icon + AA text) | Previewable & demo-downloadable; group `Open` links to `../../F05-requests-work-hub/V1/index.html` |
| Generated documents — `QUOTE · NL-QTE-*` | `GET /api/v1/quotes/{id}/pdf` | Quote proposal PDF (`v1`) | Previewable & demo-downloadable |
| Generated documents — `INVOICE · NL-INV-*` | `GET /api/v1/invoices/{id}/download` | Issued/pending GST invoice PDF (`v1`) | Previewable & demo-downloadable |
| Generated documents — `RECEIPT · NL-RCPT-*` | `GET /api/v1/payments/{id}/receipt` | Payment receipt PDF (`v1`) | Previewable & demo-downloadable |
| Generated documents — `EXPORT_GDPR · NL-EXP-GDPR-2026-000002` | `GET /api/v1/users/export/{id}` | Account data export archive (`v42 · 1.3 KB`) | Previewable (unsupported archive card) & demo-downloadable |

## 2. Honesty & Non-Invention Notes (Recorded in `DECISIONS.md`)

1. **Previews are 100% client-side (`C13`):** Confirmed in `media.openapi.json` — there is no `/preview` or server-side document rasteriser endpoint. Because the repo does not bundle binary PDFs for `milestone-1-handoff.pdf` or `milestone-1-wireframes.pdf`, our preview modal renders a structured inline document preview sheet from the captured metadata + honest lab disclosure, while real local image files selected in the dropzone render genuine pixel previews via `FileReader`.
2. **No folder-creation CRUD endpoint exists:** Although `Folders` is one of the 6 captured source tabs (`contextType=folder`), `media.openapi.json` has `POST /api/v1/media/{id}/move` and `contextType=folder` filtering, **not** a `POST /folders` tree-creation API. We therefore keep the captured `Folders` source tab with an honest empty/grouped view and do **not** invent a fake multi-level folder-creation tree.
3. **Demo-labelled affordances:** Dropzone queuing, `Download`, `Open in new tab`, and `Share` are offline lab actions citing their exact OpenAPI endpoints.

```
## GATE A (F22)
Specs read: 4/4 (media + quotes + payments + users) · Endpoints mapped: 16 · Demo-only CTAs listed: 4
Gate: PASS
```
