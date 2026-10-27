# F09 · Project Details + 6 Tabs — Gate A · API-MAP (Swagger)

## GATE A (F09)
Specs read: 5/5 · Endpoints mapped: 22 · Demo-only CTAs listed: 8 groups
Gate: PASS

Specs: `projects` (38 paths) · `progress` (22) · `media` (50) · `messaging` (47) · `notifications` (29). Envelope `{status:"success",data,metadata}`, bearer auth. Where list `data` is untyped, fields come from `14b–14g`, never invented. Typed enums used: Milestone `PENDING, IN_PROGRESS, REVIEW, COMPLETED, APPROVED, REVISION_REQUESTED, CANCELLED`; Deliverable `PENDING, IN_PROGRESS, READY_FOR_REVIEW, REVISION_REQUESTED, APPROVED, REJECTED`; ProgressEntry type `UPDATE, MILESTONE_COMPLETE, DELIVERABLE_UPLOAD, STATUS_CHANGE, INTERNAL_NOTE`, visibility `CLIENT_VISIBLE|INTERNAL` (client UI shows CLIENT_VISIBLE only).

## UI → endpoint map (project `01a10a2b-5eaa-769e-a5d9-0d58fcca6924`)

| Surface | Method + path | Notes / states designed |
|---|---|---|
| Header, verdict, status cards | `GET /api/v1/projects/{id}` + `GET /api/v1/projects/{projectId}/progress/status` (overall status summary) | 57% / 1-2 / Next frozen. Skeleton header; 502 → A13 banner + “Something went wrong / Network Error / Try again” |
| Overview feeds | `GET /api/v1/projects/{id}/timeline` + `GET /api/v1/projects/{projectId}/progress` | Captured empty (“No progress entries yet”) is the success-empty state |
| Progress tab | `GET /api/v1/projects/{projectId}/progress`, `…/progress/{entryId}` | Date-grouped; filter chips map to entry `type` enum client-side (spec has no filter param — recorded) |
| Request changes (panel) | `POST /api/v1/projects/{id}/request-revision` (body: `area`, `priority∈low/medium/high/critical`, `description≤2000`, `details[]` required) + `POST …/progress/request-changes` | Lab form collects text; maps text→`description`, lines→`details[]`; `area/priority` shown as selects. Offline: validates + success state, sends nothing, says so |
| Milestones tab | `GET /api/v1/projects/{id}/milestones` + `GET …/progress/milestones` | Dual Delivery/Payment badges (KEEP). Payment column has **no client pay endpoint in these specs while Not due yet** → explainer only (A3), no fake Pay button |
| Milestone approve / revision (A3/A4 pattern) | `POST /api/v1/milestones/{id}/approve` · `POST /api/v1/milestones/{id}/request-revision` | M1 already Approved in capture → buttons shown in their truthful disabled/done state for M1; revision-with-reason form is exercisable in the deliverable review pattern and via Request changes |
| Deliverables tab | `GET /api/v1/projects/{id}/deliverables` | Captured 0/0 empty is default |
| Deliverable review (A4) | `POST /api/v1/deliverables/{id}/approve` · `POST /api/v1/deliverables/{id}/reject` (reason body) | Exercised on the captured wireframes file as a **labelled review pattern** (DECISIONS); reason required, inline error if empty |
| Messages tab | `GET/POST /api/v1/messages/projects/{projectId}`, `GET …/project/{projectId}/search`, `POST …/projects/{projectId}/read-all`, `POST /messages/{id}/pin|unpin|flag`, `PATCH/DELETE /messages/{id}` | Search filters thread; Mark read, Reply/Pin/Flag/Edit/Delete labels frozen; composer appends locally + labelled offline |
| Files tab + preview (C13) | `GET /api/v1/media`, `GET /api/v1/media/{id}`, `GET /api/v1/media/{id}/download`, `GET /api/v1/media/storage-usage` | Preview dialog: rendered page + metadata (original binary not in repo — labelled lab rendering); Open/Download are demo-labelled (no file bytes offline); unsupported-type card pattern included |
| Submit feedback | `POST /api/v1/projects/{id}/feedback` (+ `GET` same) | Validate non-empty → success toast/state |
| Bell / unread | `GET /api/v1/notifications/unread-count` | Badge 6 frozen; surface itself is F19 (demo toast) |
| Ask-AI (A1) / Help-FAQ (A2) | **No endpoint in any spec** | **Demo-labelled.** Answers composed only from frozen facts; every answer links to the real tab/endpoint above. Recorded in DECISIONS |
| Message button / View milestones | In-page tab jumps (`?tab=messages|milestones`) | Real in-page actions, deep-linkable |

## Demo-only CTAs

Ask-AI answers · Help-FAQ copy (lab-authored, fact-bound) · file Open/Download bytes · sidebar sibling routes · Explore Blog/Portfolio · bell/avatar · support contact (F12) · lab state switcher/prev-next/gallery. Everything else maps above. **Zero `href="#"`** (SVG `<use href="#i-…">` are sprite refs, not navigation).
