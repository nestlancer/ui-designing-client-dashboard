# F12 · Messages Home (Overview → Inbox) — Gate A · API-MAP (Swagger)

Mapping of every UI surface in **F12 · Messages Home (Overview → Inbox)** to real backend endpoints in `messaging.openapi.json` and `users.openapi.json`.

```
## GATE A (F12)
Specs read: 2/2 (messaging.openapi.json, users.openapi.json) · Endpoints mapped: 11 · Demo-only CTAs listed: 5
Gate: PASS
```

---

## 1 · Specs Studied

1. **`backend-api-swagger/messaging.openapi.json`** (47 paths, 8 schemas — threads list, direct thread open/resume, group thread details, archive/unarchive, unread counts, global message search, health check).
2. **`backend-api-swagger/users.openapi.json`** (40 paths — current user profile `GET /api/v1/users/profile` and support recipient context; confirms clients have no client-directory listing endpoint, grounding the `"Client-to-client messaging is not available"` honesty note).

---

## 2 · UI Surface → Endpoint Mapping Table

| UI Element / Surface | Method & Path | Query / Request Parameters | Response / Data Fields | Designed States in UI |
|---|---|---|---|---|
| **Merged Inbox Thread Queue (`Conversation queue` + `Recent conversations`)** | `GET /api/v1/messages/threads` & `GET /api/v1/conversations` | Query params: `page` (number/string), `limit` (number/string) | Array of threads: `id` (`01a10a2b-f916-701a-9036-030e679c415c` Group, `01a10a2b-bc16-7143-86da-6f70b07d91c3` Direct), `title`, `type` (`GROUP` / `DIRECT`), `lastMessagePreview`, `updatedAt` (`20 days ago`), `unreadCount` (`0`), `archived` (`false`) | **Populated:** 2 captured threads.<br>**Loading:** 3-pane shimmer skeleton.<br>**Empty inbox:** `"No conversations yet"` + `"Message support"` CTA.<br>**Empty filter:** `"No conversations match this filter"` + `"Reset filters"`.<br>**Error:** Network error card + `"Try again"`. |
| **Overview KPIs & `Inbox snapshot` Counts (`Open 2 · Unread 0 · Waiting 0`)** | `GET /api/v1/messages/unread-count` & `GET /api/v1/conversations/unread-count` (+ thread list aggregation) | Bearer JWT | `unreadMessages` (`0` — `"All caught up"`), `unreadThreads` (`0` — `"None waiting"`), `openThreads` (`2` — `"Active threads"`), by-type counts (`Project: 0`, `Direct: 1`, `Group: 1`) | Rendered in both the merged overview KPI strip and the `Inbox snapshot` right rail. |
| **Queue Search (`Search by name, preview, or ID…`)** | `GET /api/v1/messages/search` (+ client-side queue filter) | Query params: `q` (string), `page` (string) | Matches thread title, last message preview, or UUID (`01a10a2b-...`) | Live instant filtering with `aria-live="polite"` count announcement and empty-search reset button. |
| **Type Filter Chips (`All · Unread · Direct · Project · Group`) & Sort (`Unread first · Longest wait · Latest`)** | Client-side filter/sort over `GET /api/v1/messages/threads` + `GET /api/v1/messages/projects/{projectId}` | Filter values: `all \| unread \| direct \| project \| group`; Sort values: `unread \| waiting \| recent` | Reorders/filters the queue; updates URL params (`?filter=…&sort=…`). Selecting `Project` shows 0 project threads in inbox with a helpful link to **F09 Project Messages** (`Khandesh Spice D2C E-Commerce Store`). | Instant client-side filtering + honest `Project (0)` empty state that links to F09's project-scoped messages tab. |
| **Inbox / Active / Archived View Switcher** | `POST /api/v1/messages/threads/{threadId}/user-archive` & `POST /api/v1/messages/threads/{threadId}/user-unarchive` (plus `/archive` and `/unarchive`) | `threadId` (path UUID) | Moves a thread between `Active` (`2`) and `Archived` (`0` by default) | Users can archive/restore a thread in-page and switch between `Inbox`, `Active`, and `Archived` views. |
| **Hide / Remove Thread from Inbox** | `POST /api/v1/messages/threads/{threadId}/user-hide` | `threadId` (path UUID) | Hides conversation from client inbox while preserving admin record | Available in thread quick actions with undo toast. |
| **Select / Open Thread (`Agency partner coordination…` or `Riya Kapoor`)** | `GET /api/v1/messages/threads/{threadId}` & `GET /api/v1/messages/threads/{threadId}/messages` | `threadId` (path UUID) | Previews conversation in the reading pane and links `"Open full conversation →"` to **`../../F13-messages-thread/V#/index.html?thread=group|direct`** | Reading pane transitions from the captured `"Select a conversation"` empty state to a live preview + direct link into F13. |
| **New Direct Message to Support (`/messages/new/direct` — `Start conversation`)** | `POST /api/v1/messages/threads/direct` | `DirectThreadDto`: `{}` (`peerUserId` omitted for clients: *"Omit for clients to open chat with the platform support admin"*) | Opens or resumes the direct support thread (`01a10a2b-bc16-7143-86da-6f70b07d91c3` with `Riya Kapoor`) | Clicking `"Start conversation"` validates and navigates to (or opens) the direct support thread in F13 (`?thread=direct`). |
| **Client Profile & Recipient Honesty Context** | `GET /api/v1/users/profile` | Bearer JWT | Current client `Arjun Mehta` (`arjun.mehta@nestlancer.com`); no client-to-client directory endpoint exists | Grounds the frozen honesty note: `"Platform support admin for your account. Client-to-client messaging is not available."` |
| **Messages Service Health** | `GET /api/v1/messages/health` | — | Service health status (`Live` indicator) | Grounds the `Live` status pill in the header. |

---

## 3 · Demo-Only CTAs & Affordances (Recorded in `DECISIONS.md`)

1. **In-page Archive / Unarchive (`POST /user-archive`, `/user-unarchive`)**: Mutates the local queue state so `Active` ↔ `Archived` tabs can be exercised offline, accompanied by an honest toast naming the Swagger endpoint.
2. **`Start conversation` on `/messages/new/direct`**: Calls `POST /api/v1/messages/threads/direct` conceptually (with empty `{}` body per `DirectThreadDto` spec) and routes directly to the same-numbered **F13 · Messages Thread** variant (`?thread=direct`).
3. **Unread Simulation Toggle (`All caught up (0)` ↔ `Simulated unread (1)`)**: Optional lab QA toggle so reviewers can test the `Unread` chip and `Unread first` sort against the default `0 unread` Arjun Mehta capture.
4. **Sidebar sibling routes (`/dashboard`, `/payments`, `/invoices`, `/notifications`, `/profile`, `/settings/account`, `/blog`, `/portfolio`)**: Trigger an honest demo toast, while `/requests` (`F05`), `/projects` (`F08`), `/quotes` (`F10`), and `/messages` (`F12`/`F13`) navigate to real local lab pages.
5. **Lab state switcher (`Populated — Empty selection` · `Populated — Thread previewed` · `New message (/messages/new/direct)` · `Empty inbox` · `Loading skeleton` · `Error`)**: Deep-linkable via `?state=…`.
