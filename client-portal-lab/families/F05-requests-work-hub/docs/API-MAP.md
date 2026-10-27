# F05 · Requests Work Hub — Gate A · API-MAP

**Specs opened:** `backend-api-swagger/README.md` · `backend-api-swagger/requests.openapi.json` (25 paths, 16 schemas) · `backend-api-swagger/projects.openapi.json` (38 paths) — both parsed in full for paths, parameters, request bodies, responses, enums. **3/3** files read.

## GATE A (F05)
Specs read: 3/3 · Endpoints mapped: 12 client-relevant (7 primary + 5 secondary) · Demo-only CTAs listed: 6
Gate: PASS

## 1 · Endpoint → UI surface map

| # | UI element | Method + path | Key request / response fields | States designed |
|---|---|---|---|---|
| 1 | KPI “Total requests / Under review / Quoted” | `GET /api/v1/requests/stats` | auth bearer; `ApiSuccessEnvelopeDto {status:"success", data:object, metadata:{timestamp,requestId,version}}`. Spec does **not** type `data` keys (not verified) — KPI values are the frozen captured numbers | skeleton (3 shimmer values), zero (`0`), loaded (`26 / 0 / 0`) |
| 2 | KPI “Projects” | `GET /api/v1/projects/stats` | bearer; same envelope | skeleton, zero, loaded (`5`), **502** |
| 3 | `Requests (12)` tab / list rows | `GET /api/v1/requests?page&limit&status` | all three query params declared **required** (`string`); `status` enum from `UpdateRequestStatusDto.status` (below); response envelope, `data` untyped → row grammar frozen from Gate S | skeleton rows, populated (12), empty (0 results), 502/network error with `Try again` |
| 4 | `All` tab | `GET /api/v1/requests?page&limit&status` **+** `GET /api/v1/projects` | union of requests + projects; `GET /api/v1/projects` has **no query params** (filtering/sorting is client-side in the lab) | populated union, empty (captured 0 rows), degraded 502 |
| 5 | `Projects` tab | `GET /api/v1/projects` | bearer; `data` untyped; this is the endpoint that returns **HTTP 502 / CORS-blocked** in production | populated (screenshot 045 row), **captured error** `Something went wrong / Could not load work items. / Try again` |
| 6 | Row title / “View details” | `GET /api/v1/requests/{id}` | path `id` = Request UUID (the 12 real UUIDs from Gate S) | opening detail drawer: skeleton → loaded summary (frozen row fields + endpoint shown) |
| 7 | Detail drawer “status history” | `GET /api/v1/requests/{id}/status` | path `id`; returns status transition history | skeleton, empty, loaded |
| 8 | `New request` CTA | `POST /api/v1/requests` (F06 owns the form) | `CreateRequestDto` — see F06 `API-MAP.md` | lab link to `F06-request-new-form/V1` |
| 9 | “Submit for review” (shown in detail drawer as a documented next action) | `POST /api/v1/requests/{id}/submit` | path `id`; 200 description: “Request submitted successfully. You will receive a quote within 24-48 hours.” | disabled/demo in F05 (belongs to F07); no click handler invented |
| 10 | Detail drawer “quotes” | `GET /api/v1/requests/{id}/quotes` | path `id` | link-only (F10/F11 scope) |
| 11 | Attachments in detail drawer | `GET /api/v1/requests/{id}/attachments` · `GET /api/v1/requests/{id}/attachments/{attachmentId}/download` | path ids | informational; no upload CTA on F05 |
| 12 | Project detail (Projects tab row) | `GET /api/v1/projects/{id}` · `GET /api/v1/projects/{id}/request-revision` (POST, admin-oriented) · `GET /api/v1/projects/{id}/progress` | path `id`; `Revision Requested` row state from screenshot 045 | row opens project summary drawer; no admin POST exposed |

Admin-only operations (`/api/v1/admin/requests*`, `PATCH /api/v1/admin/requests/{id}/status`, `/api/v1/admin/projects*`) are **not** client CTAs. No “bulk approve”, no “change status”, no “assign staff” anywhere in F05.

## 2 · The 8-status lifecycle (verbatim enum, `UpdateRequestStatusDto.status`)

`draft · submitted · underReview · quoted · accepted · rejected · convertedToProject · changesRequested`

Description quote: “draft (editable), submitted (awaiting review), underReview, quoted, accepted, rejected, convertedToProject, changesRequested”.

### UI filter → API value map

| Captured `<select>` value | API `status` query | Note |
|---|---|---|
| `All statuses` | *(omit/empty)* | spec marks `status` required; in the lab it is sent as empty string — recorded as a spec quirk |
| `Draft` | `draft` | |
| `Submitted` | `submitted` | |
| `Under review` | `underReview` | prompt §4 omits it; captured DOM has it |
| `Quoted` | `quoted` | prompt §4 omits it; captured DOM has it |
| `Changes requested` | `changesRequested` | |
| `Converted to project` | `convertedToProject` | row label is `Converted To Project` |
| `Rejected` | `rejected` | |
| `Cancelled` | **no enum value** | UI-only filter → designed empty state, never a fabricated API call |
| `Expired Quote` (row badge) | **no enum value** | display-only quote-derived label from Gate S; badge = icon + text |
| `Revision Requested` (project row) | **no request enum** | project-side display label from screenshot 045 |

## 3 · Envelope + metadata (shared by both specs)

`{ status:"success", data:{…}, metadata:{ timestamp, requestId, version, path? } }`. `data` is `additionalProperties:true` → **no invented field names**; the UI presents only the frozen Gate-S row grammar. Failures: `502` + CORS (captured), `net::ERR_FAILED`, `net::ERR_ABORTED` for RSC navigations.

## 4 · State → action contract (used by all 5 variants)

| State | What the user sees | Action → endpoint |
|---|---|---|
| Loading | 3 KPI skeletons + 6 row skeletons (no spinner-only) | `getStats` / `listRequests` / `listProjects` in flight |
| Empty | `No work items match these filters.` + “Clear filters” + `New request` | clears `?status=`/`?q=`; `POST /api/v1/requests` entry |
| Error (502) | `Something went wrong` · `Could not load work items.` + why-line (“The projects service returned 502 / was CORS-blocked.”) + `Try again` + `Contact support` | Retry → `GET /api/v1/projects` (+ `/requests`); support → `/messages` demo-labelled |
| Success | KPI + rows + `Showing 1–12 of 26` / `1 / 3` | `GET /api/v1/requests?page=1&limit=12` |

## 5 · Demo affordances (labelled in `DECISIONS.md`; no dead buttons, no `href="#"`)

1. Sidebar links to routes outside F05/F06 (Dashboard, Projects, Quotes, Messages, Billing, Invoices, Notifications, Profile, Settings) → labelled demo buttons that open a toast pointing to the gallery; the real routes exist in production but are other families’ scope.
2. `Contact support` → `/messages` (F12 scope) — demo-labelled, opens toast.
3. Command-palette items “Go to F06 form”, “Open F05 V1–V5”, “Switch theme”, “Set status filter” → real lab actions; no phantom “New project” / “New direct message” (C12).
4. `Submit for review` in the detail drawer → documented `POST /api/v1/requests/{id}/submit`, disabled/demo (F07 owns it).
5. Project row action → `GET /api/v1/projects/{id}` summary drawer with the frozen screenshot row; no admin POST.
6. `New request` → local F06 variant page, which itself maps to `POST /api/v1/requests`.
