# F04 · Global Search / ⌘K — API MAP (Gate A)

**Gate A:** PASS — backend spec paths documented (never called).

## Jump-target specs (from `backend-api-swagger/`)

The palette's 12 routes and 4 actions map to verified spec paths; the palette itself does not call them — it is a navigation surface.

| Route / Action | Spec path (documented) |
|---|---|
| Dashboard | `GET /api/v1/system/status` |
| Requests | `GET /api/v1/requests` |
| Projects | `GET /api/v1/projects` |
| Quotes | `GET /api/v1/quotes` |
| Messages | `GET /api/v1/messages` |
| Billing | `GET /api/v1/payments` |
| Invoices | `GET /api/v1/invoices` |
| Notifications | `GET /api/v1/notifications` |
| Profile | `GET /api/v1/users/me` |
| Settings | `PATCH /api/v1/users/preferences` |
| New request | `POST /api/v1/requests` (demo) |
| Jump to pending payment | `GET /api/v1/payments` (demo) |
| Jump to pending approval | `GET /api/v1/quotes` (demo) |

## Honest notes

- No live backend: all paths are documentation of verified spec paths, never calls.
- The "Switch to dark mode" action is a local theme toggle, not an API call.
