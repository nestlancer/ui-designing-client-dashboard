# F06 · Request · New Form — Gate A · API-MAP

**Specs opened:** `backend-api-swagger/README.md` · `backend-api-swagger/requests.openapi.json` (25 paths, 16 schemas) · `backend-api-swagger/media.openapi.json` (50 paths, 15 schemas) — paths, parameters, bodies, responses, enums parsed. **3/3** files read.

## GATE A (F06)
Specs read: 3/3 · Endpoints mapped: 13 (create/list/update/submit/attachments + direct & chunked media) · Demo-only CTAs listed: 6
Gate: PASS

## 1 · `POST /api/v1/requests` — “Create a new request” (the Save draft CTA)

Description verbatim: “Register a new project proposal in the system as a draft.” Responses: `200` “Request created successfully in draft status”, `201`. Body = `CreateRequestDto` (required: `title`, `description`, `category`, `budget`, `timeline`, `requirements`).

| # | Locked UI field | JSON path | Constraint (verbatim where quoted) |
|---|---|---|---|
| 1 | `Title *` | `title` | `minLength: 5`, `maxLength: 100`, “Succinct and descriptive title for the request” |
| 2 | `Description *` | `description` | `minLength: 20`, `maxLength: 5000`, “Detailed explanation of the project scope and requirements” |
| 3 | `Category` | `category` | enum below; default `Web Development` → `webDevelopment` |
| 4 | `Budget min` | `budget.min` | number, `minimum: 0`, “Minimum estimated budget in rupees (major units). Stored as paise server-side.” |
| 5 | `Budget max` | `budget.max` | number, `minimum: 0` |
| 6 | `Currency` | `budget.currency` | string `maxLength: 3`, “ISO currency code for the budget”, example `INR` |
| 7 | `Budget is flexible` | `budget.flexible` | boolean, “Whether the budget is open to negotiation”, default captured = checked |
| 8 | `Preferred start` | `timeline.preferredStartDate` | string date-time, example `2024-12-01T00:00:00Z` |
| 9 | `Deadline` | `timeline.deadline` | string date-time, example `2025-05-01T23:59:59Z` |
| 10 | `Requirements (one per line)` | `requirements[]` | `maxItems: 20`, array of strings (one line → one item) |

`TimelineDto.flexible` and `budget` / `timeline` / `requirements` are **required** even though the captured UI has no separate “timeline flexible” control. F06 does **not** invent an 11th field: the lab serialises `timeline.flexible = budget.flexible`? — **No.** Recorded decision: `timeline.flexible` is sent as `false` (matching the spec’s example) with an inline note in `DECISIONS.md` that no captured control exists; the value is a spec-required constant, not a user claim. `technicalRequirements`, `additionalInfo`, `referencePortfolioItemId`, `servicePackageId` are optional and **not** rendered.

**Category enum (verbatim):** `webDevelopment · mobileApp · ecommerce · design · branding · marketing · seo · consulting · maintenance · custom` — mapped 1:1 to the 10 captured `<option>` labels.

**Attachments:** `attachments[]` = “Array of media/file UUIDs for any supporting documentation provided by the client”, `maxItems: 10`, example `550e8400-e29b-41d4-a716-446655440003`. This is the Gate-A basis for the **family ADD: attachment at creation**.

## 2 · Endpoint → UI surface map

| # | UI element | Method + path | Key fields / enums | States |
|---|---|---|---|---|
| 1 | `Save draft` (sticky footer) | `POST /api/v1/requests` | `CreateRequestDto` above; bearer | validation errors inline → loading skeleton in footer → success card (draft id, “edit attachments and submit for quotes from the request page”) → 502/network error with `Try again` |
| 2 | `Cancel` / `Back to requests` | `GET /api/v1/requests?page&limit&status` (destination F05) | query params | draft preserved in `localStorage` before leaving; confirm dialog “Keep editing / Leave with draft saved” — never loses work |
| 3 | Attachment dropzone (small files) | `POST /api/v1/media/upload/direct` | multipart `file` (**required**), optional `fileType` `IMAGE\|DOCUMENT\|ARCHIVE\|VIDEO` or legacy `context=USER_FILE`; `DirectUploadDto` | empty (no files) · uploading progress · uploaded (media UUID → `attachments[]`) · rejected type/size error |
| 4 | Attachment (request/confirm path) | `POST /api/v1/media/upload/request` → `POST /api/v1/media/upload/confirm` | `RequestUploadDto`: `filename`, `mimeType`, `size` (1…524288000), `fileType` (required), `projectId?`, `threadId?`, `messageId?`; `ConfirmUploadDto.uploadId` | loading → confirm → success |
| 5 | Large-file chunked path | `POST /api/v1/media/upload/chunked/init` → `POST /api/v1/media/upload/chunked/{uploadId}/part` → `POST /api/v1/media/upload/chunked/{uploadId}/complete`; `GET …/status`; `POST …/abort` | `InitChunkUploadDto {filename, mimeType, totalSize, fileType?, chunkSize?}`; `UploadChunkDto {uploadId, partNumber, etag}` | progress states documented; lab UI uses the direct path for files < 10 MB and shows chunked as the documented path for larger files (no fake upload) |
| 6 | Upload processing status | `GET /api/v1/media/{id}/status` | path `id` = media UUID | skeleton → ready → error with retry |
| 7 | Attachments after creation (current production behaviour, kept honest) | `POST /api/v1/requests/{id}/attachments` (multipart `file`) · `GET /api/v1/requests/{id}/attachments` · `DELETE /api/v1/requests/{id}/attachments/{attachmentId}` | path ids | success state links to the request page (F07 scope) |
| 8 | “Submit for quotes” (documented next step) | `POST /api/v1/requests/{id}/submit` | path `id`; 200 desc “Request submitted successfully. You will receive a quote within 24-48 hours.” | shown as the next step in success copy, **not** fired from F06 (F07 owns it) |
| 9 | Later edits | `PATCH /api/v1/requests/{id}` | `UpdateRequestDto` (same 10 fields, all optional) | lab’s “resume draft” restores local values; no PATCH call invented |
| 10 | Category source (informational) | `GET /api/v1/services` · `GET /api/v1/services/{slug}` | public service packages | **not** used to replace the frozen 10 category options — recorded, not invented |
| 11 | Draft state | `GET /api/v1/requests/{id}` | path `id` | success state shows the endpoint the request page will call |
| 12 | Delete an attachment chip (before submit) | `DELETE /api/v1/media/{id}` | path `id` | chip removal; no server call in the offline lab — demo-labelled |
| 13 | Save-state honesty | `PATCH /api/v1/admin/requests/{id}/status` (admin only) | status enum | **never** exposed to clients; no status editing in F06 |

## 3 · Validation contract (from spec + captured attributes)

| Rule | Message (lab-authored, graceful) |
|---|---|
| `title` 5–100 | “Give your request a title of 5–100 characters.” |
| `description` 20–5000 | “A little more detail helps — at least 20 characters.” |
| `budget.min >= 0`, `budget.max >= 0`, `min <= max` | “Budget min should not be higher than budget max.” |
| `budget.currency` ≤ 3 chars | “Use a 3-letter ISO code, e.g. INR.” |
| `requirements[]` ≤ 20 lines | “Keep it to 20 requirements — one per line.” |
| `timeline.deadline` after `preferredStartDate` | “Deadline should be after the preferred start.” |
| `attachments[]` ≤ 10 | “Up to 10 files per request.” |
| `size` 1…524288000 bytes | “That file is too large. Try a smaller one.” |

All errors are inline, `aria-describedby`, icon + text (C4), and never colour-alone. Required fields are marked `*` + `aria-required`.

## 4 · State → action contract (all 5 variants)

Loading = footer skeleton + “Saving draft…” (never spinner-only) · Empty = dropzone with a teaching line (“Add a brief, a screenshot or a spec — up to 10 files”) and the section descriptions · Error = “Could not save your draft” + why (“The service did not respond — 502 / network.”) + `Try again` (re-POST) + “Keep my draft” (local storage) · Success = “Draft saved” with the created request id, endpoint `GET /api/v1/requests/{id}`, and the frozen next-step sentence.

## 5 · Demo affordances (labelled in `DECISIONS.md`; no dead buttons, no `href="#"`)

1. Sidebar links outside F05/F06 → demo buttons with a toast + gallery link.
2. ⌘K palette contains only real lab actions (switch theme, jump to F05 list, focus a section, open help, preview saved draft) — no phantom client actions (C12).
3. “Submit for quotes” in success copy → documented `POST /api/v1/requests/{id}/submit`, demo-labelled (F07 scope).
4. Attachment chip `Remove` → local-only removal (no `DELETE /api/v1/media/{id}` in offline lab), demo-labelled.
5. Chunked-upload path → documented as the spec’s large-file route; the offline lab simulates progress only, demo-labelled.
6. `Cancel` → F05 variant page (real local file) with draft preserved client-side; no API call.
