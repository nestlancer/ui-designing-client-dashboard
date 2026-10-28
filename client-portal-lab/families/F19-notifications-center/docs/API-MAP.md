# F19 · Notifications Center — API-MAP (Gate A)

Specs read and verified:
- `backend-api-swagger/README.md`
- `backend-api-swagger/notifications.openapi.json` (29 paths, 20 DTO schemas)
- Cross-referenced deep-link target specs: `quotes.openapi.json` (`GET /api/v1/quotes/{id}`), `users.openapi.json` (`GET /api/v1/users/export/{id}`)

## 1. UI Surface → Endpoint Mapping

| UI Element / Affordance | Method & Path | Key Params / Request Body / Schema | Response / State Handling in Variants |
|---|---|---|---|
| Initial feed + category tabs (`All`, `Unread (6)`, `Quotes`, `Payments`, `Messages`, `Projects`, `Requests`, `Account`, `Settings`) + pagination + sort | `GET /api/v1/notifications` | Query: `page` (number, default 1), `limit` / `pageSize` (1–100, default 20), `sort` (`createdAt:desc`), `type` (string — spec notes UI tabs `all\|unread\|payments\|projects\|system` + severity), `unreadOnly` (`boolean`) | Renders grouped & date-bucketed rows (`Today` / `This week` / `Earlier`); switches cleanly to per-tab instructive Empty state, Skeleton loading state, or Error state w/ Retry |
| Header bell badge + `Unread (6)` tab badge | `GET /api/v1/notifications/unread-count` | No params; bearer auth | Updates live in-page (`6` → decrements/increments as rows are marked read/unread) |
| Inspect single notification detail / entity preview | `GET /api/v1/notifications/{id}` | Path: `id` (UUID) | Populates entity deep-link card / inspector drawer with captured title, message, timestamp, and target route |
| Per-row `"Mark as read"` button | `PATCH /api/v1/notifications/{id}/read` | Path: `id`; Body: `MarkReadDto { read?: boolean, isRead?: boolean }` | Transitions row from Unread to Read, swaps action to `Mark unread` / `Delete notification`, updates `Unread (n)` live region |
| Per-row `"Mark unread"` toggle (restoring unread state) | `PATCH /api/v1/notifications/{id}/unread` | Path: `id` | Restores Unread badge (icon + text) and increments unread count |
| Bulk select + `"Mark read"` toolbar button (A7 + §4 must-include) | `POST /api/v1/notifications/read-selected` | Body: `MarkSelectedReadDto { notificationIds: string[] }` | Marks all checked notification IDs read in one batch; announces count via polite toast/live region |
| Header `"Mark all read"` button | `POST /api/v1/notifications/read-all` | No body | Marks all 6 unread items read; sets `Unread (0)` |
| Header `"Clear read"` button | `DELETE /api/v1/notifications/clear-read` | No body | Removes read items from the feed; if all items cleared, transitions cleanly to Empty state with reset option in lab |
| Per-row `"Delete notification"` button (captured on read rows #7–#8) | `DELETE /api/v1/notifications/{id}` | Path: `id` | Soft-deletes the row and updates visible counts |
| Deep link on Quote rows (#1–#4) | `/quotes/{id}` (`GET /api/v1/quotes/{id}`) | Captured IDs `01a10b3a…`, `01a10b35…`, `01a10aa6…`, `01a10aa3…` | Navigates to local lab `../../F10-quotes-list/V1/index.html` (or `../../F11-quote-details/V1/index.html`) |
| Deep link on Data Export rows (#5–#8) | `/settings/account?downloadExport={exportId}` (`GET /api/v1/users/export/{id}`) | Captured IDs `export_1791375234538_ce4d2b`, `…33899_ce4d2b`, `…33801917_ce4d2b`, `…33801581_ce4d2b` | Navigates to local lab `../../F21-settings/V1/index.html?tab=account` |
| Notification preferences shortcut (`Settings` tab / gear link) | `GET /api/v1/notifications/preferences` | Links to `/settings/notifications` | Navigates directly to local lab `../../F21-settings/V1/index.html?tab=notifications` |
| Service health probe (error state context) | `GET /api/v1/health` | Notifications health check | Referenced honestly in designed Error state retry card |

## 2. Honesty & Non-Invention Notes (Recorded in `DECISIONS.md`)

1. **Entity grouping (A7) is client-side over `GET /api/v1/notifications`:** `notifications.openapi.json` has no server-side `groupBy=entity` parameter. Grouping the 4 quote-expiry rows under Quotes / per-quote entity cards and the 4 export-ready rows under Account Data Exports is performed client-side from the captured `href` + title fields.
2. **No snooze / archive / AI-triage / Slack-webhook endpoints exist:** Rejected outright; zero unbacked notification actions are invented.
3. **Demo-labelled affordances (2):**
   - Mutations (`Mark all read`, `Mark read` selected, `Clear read`, `Delete`, `Mark unread`) execute deterministically in browser state for offline lab preview and cite their exact `notifications.openapi.json` endpoint; no network request is sent.
   - Sidebar links to unbuilt sibling families (`Dashboard` F03, `Blog` / `Portfolio` F23) open an honest lab-boundary dialog pointing to the gallery (`../../../index.html`), while links to built families (`F05`, `F08`, `F10`, `F12`, `F14`, `F18`, `F20`, `F21`, `F22`) navigate directly to real local lab pages.

```
## GATE A (F19)
Specs read: 3/3 (notifications + quotes + users) · Endpoints mapped: 12 · Demo-only CTAs listed: 2
Gate: PASS
```
