# F03 · Dashboard Overview — API-MAP (Gate A)

| UI element | Method + path | Key fields / enums | States designed |
|---|---|---|---|
| Workspace vitals ("Live · 30s") | `GET /api/v1/system/status` | `openRequests`, `activeProjects`, `pendingQuotes`, `unreadMessages` | loading skeleton · error+retry |
| Hero action / billing | `GET /api/v1/payments` | `invoiced`, `pending`, `billingHistoryUrl` | pending action · zero-state |
| Pipeline bars | `GET /api/v1/requests/stats`, `GET /api/v1/projects/stats` | `active`, `done`, `collected`, `pending` | labelled bars |
| Awaiting-you | `GET /api/v1/payments`, `GET /api/v1/notifications` | `pendingPayment`, `unread` | populated · empty |
| Workbench — Quotes | `GET /api/v1/quotes` | `count`, `expiringSoon` | count 0 · list |
| Workbench — Pay now | `GET /api/v1/payments` | `count`, `pending` | count 4 · checkout link |
| Workbench — Projects | `GET /api/v1/projects` | `count` | count 0 · instructive empty (C14) |
| Workbench — Inbox | `GET /api/v1/messages` | `unread` | count 2 · thread link |
| Recent activity | `GET /api/v1/notifications` | entity deep links | rows · "data export ready" |
| Theme / shell | `users.openapi.json` (profile/theme) | `theme` | light/dark |

**Demo-only CTAs** (see DECISIONS.md): sidebar nav items that point to other families' routes toast a demo note; "Explore" popover expands Blog/Portfolio demo items. All real jump CTAs resolve to Gate-A endpoints.

## GATE A (F03)
Specs read: 8/8 · Endpoints mapped: 10 · Demo-only CTAs listed: sidebar nav + Explore
**Gate: PASS**
