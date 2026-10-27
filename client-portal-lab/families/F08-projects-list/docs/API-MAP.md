# F08 · Projects List — Gate A · API-MAP (Swagger)

## GATE A (F08)
Specs read: 2/2 · Endpoints mapped: 6 · Demo-only CTAs listed: 7 groups
Gate: PASS

Specs: `backend-api-swagger/projects.openapi.json` (38 paths, “Nestlancer Projects Service v1.0”) + `health.openapi.json` (17 paths). All client endpoints use `security: bearer` and return the envelope `{status:"success", data:{…}, metadata}`. The list/detail `data` payloads are `additionalProperties:true` (no typed project schema in the spec) — so card fields come from the **captured DOM** (`13b`), never from invented schema fields.

## UI → endpoint map

| UI surface | Method + path | Key fields / notes | Designed states |
|---|---|---|---|
| Project grid (2 frozen cards) | `GET /api/v1/projects` “List my projects” (no query params in spec) | The **502 endpoint** (audit `ERR_FAILED` + CORS). Search/sort/filter in variants are therefore **client-side over the returned list** — recorded, no fake query params claimed | Populated · Empty (200 + []) · Skeleton (pending) · 502 degraded (banner + frozen error card) |
| Card → detail | `GET /api/v1/projects/{id}` “Get project details” (`id` = Project UUID) | Lab link targets the sibling **F09 variant of the same number** (Khandesh card). B2B card has no captured detail page → opens an honest in-page note (“detail capture exists only for Khandesh…”) linking to F09, never a fabricated B2B cockpit | n/a |
| Header counts (derived strip) | `GET /api/v1/projects/stats` “Get user project statistics” | Variants show only counts derivable from the frozen list (2 · 2 In progress) and label the source; no stat invented beyond the list | Skeleton numerals |
| System-status banner (A13) | `GET /api/v1/health` “aggregated system health” (+ `/health/ready`, `/projects/health` “Service health check”) | Banner copy “Project data is temporarily unavailable — retrying” is the report’s A13 wording; health payload shape is envelope-only in spec, so no fake %/ETA is shown | Banner visible **only** in error state; dismissible; Retry re-runs list state |
| `Work Hub` link | Route `/requests` (F05 family) | Lab target: `../../F05-requests-work-hub/V1/index.html` (real local page) | — |
| `View quotes` link | Route `/quotes` (F10 family, not built) | **Demo affordance** → toast “Quotes is F10’s route…” (DECISIONS). No dead `href="#"` | — |
| Empty CTA “Accept a quote…” | Report C14 copy → `/quotes` | Same demo handling as View quotes, labelled report-specified copy | Empty only |
| Contact support (error card) | `/messages` (F12) via `messaging.openapi.json` (out of family scope) | Demo toast; retry is the real in-page action | Error only |

Project status enum evidence (admin DTO, for badge mapping only — client list shows captured labels): `UpdateProjectStatusAdminDto.status ∈ IN_PROGRESS, ON_HOLD, PAUSED, ACTIVE, REVIEW, COMPLETED, CANCELLED, PAYMENT_OVERDUE, SUSPENDED, DISPUTED, REVISION_REQUESTED`. Captured client label “In progress” ↔ `IN_PROGRESS`. The screenshot-only “Revision requested” ↔ `REVISION_REQUESTED` (alternate session; not a frozen card).

## Demo-only CTAs (Gate-A rule: real endpoint, real in-page action, or listed here + DECISIONS)

Sidebar routes other than Projects/Work Hub · Explore→Blog/Portfolio · bell/avatar · View quotes + empty-state quote CTA · Contact support · B2B detail (honest note, above) · lab state switcher + prev/next/gallery furniture. ⌘K entries perform only real in-page actions (filter, jump to card/state, theme, open F09/F05). **Zero `href="#"`.**
