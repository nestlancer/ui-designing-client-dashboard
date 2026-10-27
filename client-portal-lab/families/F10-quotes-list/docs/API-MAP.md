# F10 · Quotes List — Gate A · API-MAP (Swagger)

Mapping of every UI surface in **F10 · Quotes List** to the real backend endpoints in `backend-api-swagger/quotes.openapi.json`.

```
## GATE A (F10)
Specs read: 1/1 (quotes.openapi.json) · Endpoints mapped: 8 · Demo-only CTAs listed: 6
Gate: PASS
```

---

## 1 · Spec Studied

- **`backend-api-swagger/quotes.openapi.json`** (27 paths, 14 schemas).
- Standard response envelope: `ApiSuccessEnvelopeDto` (`{ status: "success", data: {...}, metadata: { timestamp, requestId, version, path } }`).

---

## 2 · UI Surface → Endpoint Mapping Table

| UI Element / Surface | Method & Path | Query / Body Parameters & Enums | Response Fields Used in UI | Designed States (Loading / Empty / Error / Success) |
|---|---|---|---|---|
| **4 KPI Cards** (`Total · Pending · Accepted · Declined`) | `GET /api/v1/quotes/stats` | Bearer JWT (client-scoped) | `total` (`12`), `pending` (`0`), `accepted` (`5`), `declined` (`0`) | **Loading:** 4 shimmer skeleton KPI blocks.<br>**Success:** 4 KPI cards with value + label + plain-language explanation.<br>**Error:** Degraded banner + retry button. |
| **Quotes List / Table & Pagination** | `GET /api/v1/quotes` | Query params: `page` (string), `limit` (string), `status` (string: `"" \| "sent" \| "viewed" \| "changesRequested" \| "accepted" \| "declined" \| "expired"`), `sortBy` (string), `sortOrder` (`"asc" \| "desc"`) | Quote items: `id` (UUID), `requestId` (UUID), `title` (string), `totalAmount` (paise → formatted `₹` INR), `currency` (`"INR"`), `status`, `createdAt` / `sentAt` (`Oct 5, 2026` / `Oct 6, 2026`), `validUntil` (`Oct 20, 2026` / `Oct 5, 2027`), `validityDays`, `requiresContract` | **Loading:** 6-row table/card skeleton.<br>**Empty (account):** `"No quotes yet"` teaching state with link to Work Hub (`F05`).<br>**Empty (filter/search):** `"No quotes match these filters"` + `"Reset filters"` button.<br>**Error:** Designed error state with `"Try again"` + `"Contact support"`. |
| **Status Filter Select & Saved Views (A12)** | `GET /api/v1/quotes?status=…&sortBy=…&sortOrder=…` | `status` enum observed in DOM `<select>`: `sent` (Awaiting response), `viewed` (Viewed), `changesRequested` (Changes requested), `accepted` (Accepted), `declined` (Declined), `expired` (Expired) | Filters visible rows; updates `aria-live="polite"` result counter (`Showing X of 12`) and URL query string (`?status=…&saved=…`) | Client-side instant filtering over the 12 frozen rows + URL/`localStorage` persistence for A12 saved views. |
| **Expiry Countdown Chip (Family ADD)** | `GET /api/v1/quotes` + `GET /api/v1/quotes/{id}` | Derived from `validUntil` (ISO timestamp, e.g. `2026-10-20T23:59:59Z` on `#01a10f80` and `2027-10-05T23:59:59Z` on `#01a10a2b`) and `validityDays` (`CreateQuoteAdminDto` / `UpdateQuoteAdminDto`) | Computes remaining hours/minutes when `status ∈ {sent, viewed}` and `validUntil > now`; renders honest `Expired Oct 20, 2026` badge when `validUntil < now` | Live ticking `requestAnimationFrame`/interval countdown in pre-expiry awaiting mode; static honest expired state in Oct 24 captured mode. |
| **Quote Row Click / Primary CTA (`Review quote` / `View agreement`)** | Navigates to `/quotes/{id}` (`GET /api/v1/quotes/{id}`) | `id` (path UUID) | Resolves to local lab family **`../../F11-quote-details/V#/index.html?quote={id}`** | Links to the same-numbered F11 variant (`V1→V1 … V5→V5`) carrying the clicked quote's state (`#01a10a2b` → Accepted; `#01a10f80` → Awaiting/Expired). |
| **Quick PDF Download Action (in row drawer / ops table)** | `GET /api/v1/quotes/{id}/pdf` | `id` (path UUID) | Downloads quote PDF | Demo-labelled offline toast explaining `GET /api/v1/quotes/{id}/pdf` is the real endpoint. |
| **Signed Contract Download (for Accepted rows)** | `GET /api/v1/quotes/{id}/contract` | `id` (path UUID) | Downloads signed agreement `NL-CTR-2026-000001` | Demo-labelled offline toast or opens F11 accepted state. |
| **Service Health Check** | `GET /api/v1/quotes/health` | — | Health status | Used conceptually by the Retry action in the designed error state. |

---

## 3 · Demo-Only CTAs & Affordances (Recorded in `DECISIONS.md`)

Every button and link in F10 V1–V5 either executes a real in-page state change, navigates to a real local lab variant (`F05`, `F06`, `F08`, `F09`, `F11`, `F12`, `F13`), or is explicitly tagged as a demo affordance:

1. **Pre-expiry / Awaiting Window Toggle (`data-window="awaiting|captured"`)**: Lab inspection control that switches between the Oct 24 post-expiry snapshot (`Pending: 0, Expired: 7`) and the grounded Oct 19 pre-expiry snapshot from screenshot `044` + dashboard `01` (`Pending: 5, Viewed/Awaiting response with live 24h countdowns`).
2. **Offline PDF download buttons (`GET /api/v1/quotes/{id}/pdf` / `contract`)**: Show an honest polite toast naming the exact Swagger endpoint since PDF binaries are not stored in the repo.
3. **Pagination `Prev` / `Next` buttons**: Disabled (`1 / 1`, `Showing 1–12 of 12`) matching the captured DOM because all 12 quotes fit on page 1.
4. **Sidebar routes belonging to unbuilt families (`/dashboard`, `/payments`, `/invoices`, `/notifications`, `/profile`, `/settings/account`, `/blog`, `/portfolio`)**: Trigger an honest demo toast (`"… belongs to another family in the lab"`), while `/requests`, `/projects`, `/quotes`, and `/messages` link directly to the live local lab families (`F05`, `F08`, `F10`, `F12`).
5. **Header bell (`6`) and avatar (`AM Arjun Mehta`)**: Trigger honest demo toasts.
6. **Lab state switcher (`Populated / Empty / Loading skeleton / Error`)**: Deep-linkable (`?state=…`) QA control to inspect all required states.
