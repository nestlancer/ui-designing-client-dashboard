# F13 · Messages Thread — Gate A · API-MAP (Swagger)

Mapping of every UI surface in **F13 · Messages Thread (`/messages/thread/{id}`)** to real backend endpoints in `messaging.openapi.json` and `media.openapi.json`.

```
## GATE A (F13)
Specs read: 2/2 (messaging.openapi.json, media.openapi.json) · Endpoints mapped: 15 · Demo-only CTAs listed: 4
Gate: PASS
```

---

## 1 · Specs Studied

1. **`backend-api-swagger/messaging.openapi.json`** (47 paths, 8 schemas: `CreateMessageDto`, `UpdateMessageDto`, `ReactionDto`, `ReportMessageDto`, `DirectThreadDto`, `GroupThreadDto`, `AddGroupMembersDto`, `PatchGroupThreadDto`).
2. **`backend-api-swagger/media.openapi.json`** (17 paths: `POST /api/v1/media/upload-url`, `POST /api/v1/media/{id}/confirm`, `GET /api/v1/media/{id}/download` for message file attachments `mediaId`).

---

## 2 · UI Surface → Endpoint Mapping Table

| UI Element / Surface | Method & Path | Request Schema / Params | Response / Data Fields | Designed States in UI |
|---|---|---|---|---|
| **Left Queue (`Conversation queue`)** | `GET /api/v1/messages/threads` | `page`, `limit` | Group thread (`01a10a2b-f916-701a-9036-030e679c415c`) & Direct thread (`01a10a2b-bc16-7143-86da-6f70b07d91c3`) | Instant switching between Group (`21–24`) and Direct (`25`) threads in-page or via `?thread=group\|direct`. |
| **Thread Metadata Header (`Agency partner coordination…` / `Riya Kapoor`)** | `GET /api/v1/messages/threads/{threadId}` | `threadId` (path UUID) | `id`, `title`, `type` (`GROUP` / `DIRECT`), `memberCount` (`3`), `slaNote` (`Usually replies within 2 business hours` — A7) | Populated header + loading skeleton + error banner. |
| **Message History Stream** | `GET /api/v1/messages/threads/{threadId}/messages` (alias `/api/v1/conversations/{id}/messages`) | `threadId` (path UUID), `page`, `limit` | Chronological messages with `id`, `sender` (`RK`, `SP`, `Y`), `content`, `type` (`TEXT` / `SYSTEM`), `createdAt` (`Oct 5 3:46 AM`), `replyToId`, `readBy` (A7 read receipts) | **Group (`21`):** 1 system notice + 4 messages.<br>**Direct (`25`):** 3 messages.<br>**Empty thread:** `"No messages in this conversation yet"`.<br>**Loading:** Message bubble skeletons. |
| **Send Message / Quick-Reply Pill / `@mention` / Reply Banner (`23`)** | `POST /api/v1/messages/threads/{threadId}/messages` | `CreateMessageDto`: `{ threadId, content (maxLength 5000), replyToId?, mediaId?, type?: "TEXT" \| "FILE" \| "SYSTEM" \| "NOTIFICATION" }` | Appends new message bubble (`Y`) with timestamp and delivery state; clears composer and dismisses `Replying to Riya Kapoor` banner (`23`) | Interactive composer (`Enter` to send, `Shift+Enter` newline), quick-reply pill click-to-fill/send, `@mention` insertion, and simulated send-failure retry state (`?state=error`). |
| **Inline Edit Sent Message (`24` — C10 Fix)** | `PATCH /api/v1/messages/{id}` | `UpdateMessageDto`: `{ content (maxLength 5000) }` | Updates message content in place and appends `(edited)` indicator | Pre-rendered in `?state=edit` (`24`) or triggered by clicking `Edit` on any self (`Y`) message; uses high-contrast `color: var(--fg); background: var(--card)` (C10). |
| **Delete Sent Message** | `DELETE /api/v1/messages/{id}` | `id` (path UUID) | Soft-deletes message or removes bubble from thread | Triggered by clicking `Delete` on self (`Y`) message with confirmation / undo toast. |
| **Flag / Report Message (`Flag` button on incoming messages)** | `POST /api/v1/messages/{id}/report` | `ReportMessageDto`: `{ reason: "SPAM" \| "HARASSMENT" \| "INAPPROPRIATE" \| "OTHER", details?: string (maxLength 500) }` | Submits moderation report on incoming message | Clicking `Flag` opens an accessible popover/dialog with the 4 Swagger enum reasons (`SPAM`, `HARASSMENT`, `INAPPROPRIATE`, `OTHER`) + optional details. |
| **Mark Thread Read (`Mark read` button)** | `POST /api/v1/messages/threads/{threadId}/read` & `PATCH /api/v1/messages/{id}/read` | `threadId` / `id` | Marks all messages in thread as read; updates A7 read receipts | Clicking `Mark read` confirms read status with visual badge + toast. |
| **Group Members Drawer (`22` — `Members` / `Hide members`)** | `GET /api/v1/messages/threads/{threadId}/members` | `threadId` (path UUID) | 3 members: `Riya Kapoor (Admin · admin@nestlancer.com)`, `Samira Patel (Client · samira.patel@nestlancer.com)`, `Arjun Mehta (Client · arjun.mehta@nestlancer.com)` | Toggled via `Members` / `Hide members` button or `?state=members` (`22`). |
| **Leave Group (`Leave group` button in `22`)** | `POST /api/v1/messages/threads/{threadId}/leave` | `threadId` (path UUID) | Removes current user from group thread | Shows confirmation dialog before leaving group. |
| **Search in Conversation (`Search messages…`)** | `GET /api/v1/messages/search` (+ client-side thread filter) | `q` (string), `page` (string) | Highlights matching messages in the active thread and shows match count | Live highlight + filter in the right drawer / search bar. |
| **Pin / Unpin Message & Message Reactions** | `POST /api/v1/messages/{id}/pin`, `/unpin`, `POST /api/v1/messages/{id}/reactions` (`ReactionDto`: `{ emoji }`) | `id` (path UUID) | Pins message or toggles emoji reaction | Supported in message action bar. |
| **File Attachment in Composer (optional `mediaId`)** | `POST /api/v1/media/upload-url` → `POST /api/v1/media/{id}/confirm` | `RequestUploadUrlDto` | Returns `mediaId` passed to `CreateMessageDto` | Attachment button in composer with honest upload preview. |

---

## 3 · Demo-Only CTAs & Affordances (Recorded in `DECISIONS.md`)

1. **A7 SLA Expectation Pill (`"Usually replies within 2 business hours"`)**: Derived from support/admin SLA metadata and displayed in the thread header per Report A7 (`messaging.openapi.json` does not yet expose a dedicated `slaHours` field on thread DTOs).
2. **A7 Detailed Read Receipt (`"✓✓ Seen by Riya Kapoor · Oct 5, 4:02 AM"`)**: Enhances the captured `"Sent"` / `"✓"` status using the `/read` endpoint semantics so clients know who has seen their message.
3. **Interactive State Bar (`Group (21)` · `Members Drawer (22)` · `Reply Banner (23)` · `Inline Edit — C10 Fixed (24)` · `Direct Thread (25)` · `Empty` · `Loading` · `Send Error`)**: Lets reviewers inspect all 5 captured HTML states and all edge states in 1 click or via URL parameters (`?state=group|members|reply|edit|direct|empty|loading|error`).
4. **Cross-family link to F12 (`Panel` / `← Inbox`)**: Navigates directly to the same-numbered **F12 · Messages Home** variant (`../../F12-messages-home/V#/index.html`).
