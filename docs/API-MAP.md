# GATE A — API map (UI → real endpoint)

Specs read: **17/17** (`backend-api-swagger/*.openapi.json`, ~560 paths) + `README.md` + `docs.html`. Client-facing paths only are mapped; `/admin/*`, `/internal/*` are excluded unless they explain a state the client sees. Base: `https://api.nestlancer.com`.

Global conventions observed: JWT bearer auth (`Authorization: Bearer …`), `page`/`limit` query pagination with `{data, meta}` envelopes, ISO-8601 timestamps, **money in paise (integers)** for payments (`amount` minimum 100), string money in read models (`₹` formatting is client-side). Standard error surface: `400` validation, `401` unauthenticated, `403` permission, `404`, `409` state conflict, `429` rate limit, `502` upstream (the live projects defect), `503` maintenance.

## Cross-family endpoints

| Surface | Method + path | Notes |
|---|---|---|
| Session / gating | `GET /api/v1/users/profile` | current user, drives header identity |
| Shell search | `GET /api/v1/messages/search`, `GET /api/v1/posts/search`, `GET /api/v1/portfolio/search` | ⌘K local navigation + these |
| Unread badges | `GET /api/v1/notifications/unread-count`, `GET /api/v1/conversations/unread-count`, `GET /api/v1/messages/unread-count` | header bell + messages badge |
| Degraded banner (A13) | `GET /api/v1/health/detailed`, `GET /api/v1/health/services/{name}`, `GET /api/v1/health/dependencies` | system-status banner source |
| Media (all uploads) | `POST /api/v1/media/upload/request` → `POST /api/v1/media/upload/confirm` (or `/upload/direct`), `GET /api/v1/media/{id}`, `GET /api/v1/media/{id}/download` | attachments, avatars, proofs, previews |

## F01 · Auth – Login
| UI element | Endpoint | Fields / enums | States designed |
|---|---|---|---|
| Email + password → `Sign in` | `POST /api/v1/auth/login` | `email`, `password`, `rememberMe`; returns `accessToken`/`refreshToken`, `user`, `requires2fa` | idle · invalid credentials (`401`) · validation · submitting (button loading) · success redirect |
| `Show` password | — (client) | | pressed/unpressed `aria-pressed` |
| 2FA step | `POST /api/v1/auth/verify-2fa` | `code`, `sessionId` | code entry · wrong code · expiry · resend |
| Operator link | `POST /api/v1/auth/login` (admin role rejected server-side) | | honest note kept |
| Email validation (anti-enumeration) | `POST /api/v1/auth/check-email` | `email` | inline |
| Forgot password link | `POST /api/v1/auth/forgot-password` | see F02 | — |
| Rate limiting | `429` | | lockout message with retry time |

## F02 · Auth – Register + Forgot
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| 7-field signup | `POST /api/v1/auth/register` | `firstName`, `lastName`, `email`, `password`, `confirmPassword?`, `acceptTerms`, `marketingOptIn` | inline validation (mismatch, weak pw, terms unchecked), `409` email exists |
| `Send reset link` | `POST /api/v1/auth/forgot-password` | `email` | sent (always neutral copy), `429` |
| Reset completion | `POST /api/v1/auth/reset-password` | `token`, `password` | documented for the "what happens next" panel |
| Email verification | `POST /api/v1/auth/verify-email`, `POST /api/v1/auth/resend-verification` | `token` | pending-verification banner |

## F03 · Dashboard Overview
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| Open requests KPI | `GET /api/v1/requests/stats` | totals by status (`draft|submitted|under_review|quoted|changes_requested|converted|rejected|cancelled`) | skeleton · zero |
| Active projects KPI | `GET /api/v1/projects/stats` | `total`, `active`, `completed` | **`502`** → degraded card + retry |
| Pending quotes KPI | `GET /api/v1/quotes/stats` | `total`, `pending`, `accepted`, `declined` | skeleton · zero |
| Unread messages KPI | `GET /api/v1/messages/unread-count` | `count` | zero = "All caught up" |
| Notifications KPI | `GET /api/v1/notifications/unread-count` | `count` | zero |
| Collected / Pending money | `GET /api/v1/payments/stats` | `totalPaid`, `pending`, `inDispute` | skeleton |
| Pipeline bars | same stats endpoints | value + % + reason | zero |
| Awaiting you | `GET /api/v1/payments?status=pending`, `GET /api/v1/quotes?status=awaiting_response`, `GET /api/v1/notifications` | | empty "nothing needs you" |
| Workbench tabs | `GET /api/v1/quotes?status=awaiting_response`, `GET /api/v1/payments?status=pending`, `GET /api/v1/projects`, `GET /api/v1/messages/threads` | | per-tab empty + error independent |
| Recent activity | `GET /api/v1/notifications?limit=5`, `GET /api/v1/users/activity` | | empty |

## F04 · Global Search / ⌘K
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| Jump-to-page | local routes (no API) | | always available |
| Search conversations | `GET /api/v1/messages/search?q=` | `q`, `page` | typing · no results |
| Search articles/portfolio | `GET /api/v1/posts/search?q=`, `GET /api/v1/portfolio/search?q=` | `q` | no results |
| Jump to pending action | `GET /api/v1/payments?status=pending`, `GET /api/v1/quotes?status=awaiting_response` | | empty |
| New request / New message / Switch theme | routes + client state | | — |
| **Removed** | "New project", "New direct message" — no client endpoint exists (C12) | | |

## F05 · Requests Work Hub
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| KPI row | `GET /api/v1/requests/stats` + `GET /api/v1/projects/stats` | | skeleton/zero |
| Tabs All / Requests / Projects | `GET /api/v1/requests?page=&limit=&status=`, `GET /api/v1/projects` | `status` enum above | per-tab empty |
| Status filter | `GET /api/v1/requests?status=` | enum | no-results |
| Search | client-side filter over loaded page (server has no `q` on requests) | | |
| Pagination | `page`, `limit` → `meta.totalPages` | `Showing 1–12 of 26`, `1/3` | |
| Row → detail | `GET /api/v1/requests/{id}` | | |
| Projects tab error | `GET /api/v1/projects` → **502** | | error + retry + support (A13) |
| `New request` | route `/requests/new` | | |

## F06 · Request – New
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| Brief/Budget/Timeline | `POST /api/v1/requests` | `title`, `description`, `category` (`web_development|mobile_app|ecommerce|design|branding|marketing|seo|consulting|maintenance|custom`), `budgetMin`, `budgetMax`, `currency`, `budgetFlexible`, `preferredStart`, `deadline`, `requirements[]` | field errors · draft saved · `429` |
| Save draft | `POST /api/v1/requests` (draft) then `PATCH /api/v1/requests/{id}` | | autosave toast |
| Submit for quote | `POST /api/v1/requests/{id}/submit` | | confirming · success |
| Attachments at creation (ADD) | `POST /api/v1/media/upload/*` at creation → `POST /api/v1/requests/{id}/attachments` after create | `file` (binary) | upload progress · failure/retry |
| Delete attachment | `DELETE /api/v1/requests/{id}/attachments/{attachmentId}` | | confirm |
| Service packages (budget guide) | `GET /api/v1/services` | `slug`, price hints | skeleton |

## F07 · Request Details
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| Detail + chips | `GET /api/v1/requests/{id}` | status, category, budget, requirements | loading/error |
| Status history timeline (KEEP) | `GET /api/v1/requests/{id}/status` | stage, actor, description, timestamp (9 stages) | empty |
| Attachments | `GET /api/v1/requests/{id}/attachments`, `…/{attachmentId}/download` | filename, size, type | empty/error |
| Linked quote | `GET /api/v1/requests/{id}/quotes` | quote id, status, total | none yet |
| Edit / submit / delete | `PATCH`/`DELETE /api/v1/requests/{id}`, `POST …/submit` | | draft only |

## F08 · Projects List
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| Grid | `GET /api/v1/projects?page=&limit=` | `id`, `title`, `description`, `status`, `progress`, `startedAt`, `milestoneCount` | **populated · empty · `502` error** |
| Retry | re-issue `GET /api/v1/projects` | | backoff copy |
| Support CTA | `POST /api/v1/messages/threads/direct` (open support thread) | `adminId?` | demo deep-link |
| Status banner | `GET /api/v1/health/services/projects` | | investigating/operational |
| Empty CTA | route `/quotes?status=accepted` | | |

## F09 · Project Details + 6 tabs
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| Header + % | `GET /api/v1/projects/{id}` | `title`, `description`, `status`, `progress`, `nextMilestone` | 502 degraded |
| Overview | `GET /api/v1/projects/{id}/progress/status`, `…/progress` | | empty feed copy (KEEP) |
| Progress tab | `GET /api/v1/projects/{projectId}/progress`, `GET /api/v1/progress/projects/{id}` | entries with type `update|milestone|deliverable`, date groups | filter chips · empty |
| Milestones | `GET /api/v1/projects/{id}/milestones` | `amount`, `dueDate`, `deliveryStatus`, `paymentStatus`, `locked` | locked + "why" (C19) |
| Approve milestone | `POST /api/v1/milestones/{id}/approve` | `ApproveMilestoneDto` | confirm → toast → refetch |
| Request milestone revision | `POST /api/v1/milestones/{id}/request-revision` | reason | form + validation |
| Deliverables | `GET /api/v1/projects/{id}/deliverables` | `status` (`pending|approved|rejected`), file refs | approve/reject |
| Approve deliverable | `POST /api/v1/deliverables/{id}/approve` | `rating?` 1–5, `feedback?` | success toast |
| **Reject deliverable (A4)** | `POST /api/v1/deliverables/{id}/reject` | `reason` (1–2000), `requestedChanges[]` | required-reason validation |
| Project messages | `GET/POST /api/v1/projects/{id}/messages` | | empty/SLA |
| Files | `GET /api/v1/projects/{id}/timeline`, deliverables media via `GET /api/v1/media/{id}/download` | | preview states |
| Request changes on progress | `POST /api/v1/projects/{projectId}/progress/request-changes` | `reason`, `details[]` | form |
| Feedback | `GET/POST /api/v1/projects/{id}/feedback` | `SubmitFeedbackDto` | submitted |
| Approve project / sign contract | `POST /api/v1/projects/{id}/approve`, `POST /api/v1/projects/{id}/sign-contract` | `ApproveProjectDto` | pending |
| Project revision | `POST /api/v1/projects/{id}/request-revision` | `RequestProjectRevisionDto` | form |

## F10 · Quotes List
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| KPIs | `GET /api/v1/quotes/stats` | `total|pending|accepted|declined` | skeleton |
| Filter | `GET /api/v1/quotes?status=` | `awaiting_response|viewed|changes_requested|accepted|declined|expired` | no-results |
| Rows + expiry (ADD) | `GET /api/v1/quotes` | `validUntil`, `total`, `status` | expiry countdown from `validUntil` |
| Pagination | `page`, `limit` | | |
| Row → detail | `GET /api/v1/quotes/{id}` | | |

## F11 · Quote Details
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| Header + status | `GET /api/v1/quotes/{id}` | quote no, status, `validUntil`, request title | expired banner |
| Line items + subtotal/GST | same | `lineItems[]`, `subtotal`, `gst`, `total` | — |
| Payment schedule | same | milestone, share %, amount, trigger | — |
| `Download quote PDF` | `GET /api/v1/quotes/{id}/pdf` | | generating/failed |
| T&C (10 clauses) | same | `terms[]`, `projectTerms` | collapsed/expanded |
| Contract preview | `GET /api/v1/quotes/{id}/contract/preview` | | |
| **Accept & sign (C7)** | `POST /api/v1/quotes/{id}/accept` | **required** `acceptTerms` (bool), `signatureName` (≤100), `signatureDate` (ISO); optional `notes` (≤1000) | step 1/2/3 · disabled-until-complete · submitting · `409` expired · success → agreement no. |
| Accept confirmation | `GET /api/v1/quotes/{id}` → then `GET /api/v1/quotes/{id}/contract` | agreement no. `NL-CTR-2026-000005` | signed state |
| Decline | `POST /api/v1/quotes/{id}/decline` | `reason` enum (`budgetConstraints|timelineIssues|scopeDiscrepancy|other`), `feedback` ≤1000, `requestRevision` bool | confirm dialog |
| Negotiate (A8) | `POST /api/v1/quotes/{id}/request-changes` | `changes[]` (`ChangeItemDto`), `additionalNotes` ≤2000 | thread-like list + composer (mapped to request-changes) |
| Open project | `GET /api/v1/projects/by-quote/{quoteId}` | | not provisioned yet |
| Ask AI (A1) | **demo affordance** — no spec endpoint | | labelled |

## F12 · Messages Home
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| Merged inbox (C11) | `GET /api/v1/messages/threads` | `id`, `type` (`direct|group`), `title`, `members[]`, `lastMessage`, `unreadCount` | empty inbox |
| Filters | `GET /api/v1/conversations`, `GET /api/v1/messages/unread-count` | type filters are client-side | no-results |
| Snapshot counts | `GET /api/v1/messages/threads`, `GET /api/v1/messages/unread-count` | | zero |
| New direct to support | `POST /api/v1/messages/threads/direct` | `adminId` | honesty note kept (no client↔client) |
| Archive / unarchive | `POST /api/v1/messages/threads/{threadId}/user-archive`, `…/user-unarchive` | | optimistic + undo |
| Thread open | `GET /api/v1/messages/threads/{threadId}/messages` | | loading skeleton |

## F13 · Messages Thread
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| Thread + members | `GET /api/v1/messages/threads/{threadId}`, `…/members` | role labels | missing thread `404` |
| Messages | `GET /api/v1/messages/threads/{threadId}/messages` | `body`, `mentions[]`, `attachments[]`, `sentAt`, own vs other | empty |
| Send | `POST /api/v1/messages/threads/{threadId}/messages` | `body`, `attachments[]`, `replyToId?` | sending/failed retry |
| Reply | `POST /api/v1/messages/{messageId}/thread`, `POST …/threads` | `body` | banner + cancel |
| Inline edit | `PATCH /api/v1/messages/{id}` | `body` | save/cancel error |
| Delete | `DELETE /api/v1/messages/{id}` | | confirm |
| Mark read | `POST /api/v1/messages/threads/{threadId}/read`, `POST /api/v1/messages/{id}/read` | | badge clears |
| Flag | `POST /api/v1/messages/{id}/flag` | | toast |
| Attachments | `POST /api/v1/media/upload/*` then message `attachments[]` | | progress/fail |
| Leave group | `POST /api/v1/messages/threads/{threadId}/leave` | | destructive confirm |
| Search in conversation | `GET /api/v1/messages/project/{projectId}/search`, `GET /api/v1/messages/search` | `q` | no results |
| Typing / read receipts / SLA (ADD) | **demo affordance** — no spec endpoint (websocket health only) | | labelled "preview" |

## F14 · Billing Center
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| KPIs | `GET /api/v1/payments/stats` | `totalPaid`, `pending`, `inDispute` | skeleton/zero |
| Work queue (A5) | `GET /api/v1/payments?status=processing` (awaiting verification), `GET /api/v1/invoices?status=pending` | | empty queue |
| Ledger table | `GET /api/v1/payments?page=&limit=&status=` | `createdAt`, `description`, `project.title`, `status` (`pending|not_due|processing|completed|failed|refunded`), `amount` | search/filter/sort/pagination · mobile cards |
| Row actions | `GET /api/v1/payments/{id}`, `POST /api/v1/payments/{id}/cancel` | | confirm |
| Statement (A10) | **demo affordance** — invoice PDFs exist (`GET /api/v1/invoices/{id}/download`), no combined statement endpoint | | labelled |

## F15 · Payment Methods
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| Saved methods | `GET /api/v1/payments/methods` | `id`, `type`, `last4`, `network`, `isDefault` | empty (as captured) |
| Add method | `POST /api/v1/payments/methods` | `AddPaymentMethodDto` | form/dialog · validation |
| Set default / rename / remove | `PATCH /api/v1/payments/methods/{id}/default`, `PATCH …/nickname`, `DELETE …/{id}` | | optimistic + confirm |
| UPI mandate (A6) | **demo affordance** — no mandate endpoint; Razorpay handles it | | labelled |
| Razorpay strip + KPIs | `GET /api/v1/payments/stats` | | kept (KEEP) |

## F16 · Checkout
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| Order summary | `GET /api/v1/payments/{id}` | project, milestone label, amount, currency, reference, createdAt, status | skeleton/error |
| Pay online (one primary CTA, C8) | `POST /api/v1/payments/create-intent` (or `/initiate`) | `projectId`, `milestoneId`, `amount` (paise ≥100), `currency` default INR | creating → gateway handoff → pending |
| Confirm/callback | `POST /api/v1/payments/confirm` | `razorpayPaymentId`, `orderId`, `signature` | success/failed |
| Status poll | `GET /api/v1/payments/{id}/status` | `created|pending|processing|completed|refunded` | stepper state |
| Bank/UPI transfer | `GET /api/v1/payments/platform-accounts` then `POST /api/v1/payments/bank-transfer/submit` | `projectId`, `milestoneId`, `amount` (paise), `platformAccountId`, `transferReference` (UTR ≤80), `transferPaidAt`, **`mediaIds[]` required**, `notes` ≤1000 | validation (UTR format, proof required) · submitted → awaiting verification |
| Proof upload (C15) | `POST /api/v1/media/upload/request` + `/confirm` → `mediaIds` | image/PDF | styled dropzone, never native input |
| Cancel (demoted, C8) | `POST /api/v1/payments/{id}/cancel` | | confirm dialog |

## F17 · Payment Status
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| Completed receipt | `GET /api/v1/payments/{id}` | `status=completed`, paidAt, amount | — |
| Receipt / Invoice download | `GET /api/v1/payments/{id}/receipt`, `GET /api/v1/payments/{id}/invoice` | | generating/failed |
| Dispute | `POST /api/v1/payments/{id}/dispute` | reason, details | form + confirmation |
| Not due yet (**C9**) | `GET /api/v1/payments/{id}` + `GET /api/v1/payments/projects/{projectId}/milestones` | blocking milestone id/name/amount | unlock explainer + deep link |
| Receipt list | `GET /api/v1/payments/{id}/documents/versions` | | |

## F18 · Invoices
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| Table | `GET /api/v1/invoices?page=&limit=` | `number`, `project`, `amount`, `status` (`pending|issued|paid`), `issuedAt` | empty/error |
| Search/filter/sort/total (ADD) | same (`status`, `page`, `limit`; date sort client-side) | | no-results |
| Download | `GET /api/v1/invoices/{id}/download` | | generating |
| Detail | `GET /api/v1/invoices/{id}` | | |
| GST statement (A10) | **demo affordance** — no statement endpoint | | labelled |

## F19 · Notifications
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| List + 9 tabs | `GET /api/v1/notifications?page=&limit=&type=` | `type` (`quote|payment|message|project|request|account|settings`), `read`, `createdAt`, `entityId` | empty/error |
| Unread tab | `GET /api/v1/notifications/unread-count` | `count` | zero |
| Mark read / unread | `PATCH /api/v1/notifications/{id}/read`, `…/unread` | | optimistic |
| Bulk | `POST /api/v1/notifications/read-all`, `POST /api/v1/notifications/read-selected`, `DELETE /api/v1/notifications/clear-read` | `ids[]` | confirm for clear |
| Entity deep links (A7) | `GET /api/v1/notifications/{id}` → `entityId` → route | | broken link fallback |
| History | `GET /api/v1/notifications/history` | | |

## F20 · Profile
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| View | `GET /api/v1/users/profile` | name, email, headline, bio, skills[], `visibility` | error |
| Edit | `PATCH /api/v1/users/profile` | `firstName`, `lastName`, `phone`, `headline`, `bio`, `skills[]` | validation · sticky save · saved toast |
| Avatar | `POST /api/v1/users/avatar` (multipart), `DELETE /api/v1/users/avatar` | | upload progress/remove |
| Public profile framing (C20) | `GET /api/v1/users/preferences` (`visibility`) + `GET /api/v1/portfolio` (public surface) | | honesty note |
| Skills autocomplete | **demo affordance** — no taxonomy endpoint; free-text `skills[]` on PATCH | | labelled |

## F21 · Settings
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| Account privacy | `GET/PATCH /api/v1/users/preferences` | `profileVisibility`, `showEmail`, `showActivity` | optimistic save |
| Data export | `GET /api/v1/users/export`, `GET /api/v1/users/export/{id}` | job id | queued/ready/download |
| Delete account | `POST /api/v1/users/delete-account` (password), `POST /api/v1/users/cancel-deletion` | `password` | typed confirmation |
| Password | `PATCH /api/v1/users/password`, `POST /api/v1/users/change-password` | `currentPassword`, `newPassword` | strength meter · mismatch · `401` |
| 2FA | `POST /api/v1/users/2fa/enable`, `/verify`, `/disable`, `GET /api/v1/users/2fa/status`, `GET …/backup-codes`, `POST …/regenerate-codes` | `code`, `secret` | 3-step: enable → scan → verify |
| Sessions | `GET /api/v1/users/sessions`, `DELETE /api/v1/users/sessions/{sessionId}`, `POST /api/v1/users/sessions/terminate-others` | ip, userAgent, lastActiveAt, current | distinguish "sign out" vs "sign out all" |
| Notification prefs | `GET/PATCH /api/v1/notifications/preferences`, `GET /api/v1/notifications/channels`, `PATCH …/preferences/channel/{channel}` | 6 categories × `email|push|inApp` = 18 switches, quiet hours `from/to/timezone` | save/error |
| Activity (C10) | `GET /api/v1/users/activity?page=&limit=&type=` | event `type`, `createdAt`, description, ip | day groups · collapse repeated · filter · pagination |
| Push | `POST /api/v1/push-subscription`, `DELETE /api/v1/push-subscription` | subscription | permission denied |

## F22 · Settings ▸ Files
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| Library | `GET /api/v1/media?page=&limit=` | `id`, `fileName`, `mimeType`, `size`, `createdAt`, `status` (`uploading|processing|ready|failed`) | grid/list · empty/error |
| Type chips / source tabs | same + `GET /api/v1/media/shared` | mime groups; source is client-side | no-results |
| Upload | `POST /api/v1/media/upload/request` → `/confirm`, `POST /api/v1/media/upload/direct`, chunked `…/chunked/init|part|complete` | | progress · retry |
| Processing status | `GET /api/v1/media/{id}/status`, `GET /api/v1/media/{id}` | | processing pill → ready |
| Preview (**C13**) | `GET /api/v1/media/{id}` + `GET /api/v1/media/{id}/download` | `mimeType` decides renderer | image inline · PDF frame · unsupported designed card |
| Generated documents | `GET /api/v1/documents/mine`, `GET /api/v1/documents/mine/{documentId}/download`, `GET /api/v1/documents/verify/{documentNumber}` | documentType, documentNumber | grouped by request |
| Actions | `PATCH/DELETE /api/v1/media/{id}`, `POST /api/v1/media/{id}/copy`, `/move`, `POST …/share` | | confirm/rename |
| Storage | `GET /api/v1/media/storage-usage` | `used`, `quota` | meter |

## F23 · Explore (Blog + Portfolio)
| UI element | Endpoint | Fields | States |
|---|---|---|---|
| Blog index | `GET /api/v1/posts?page=&limit=` + `GET /api/v1/categories` | slug, title, excerpt, cover, publishedAt, readingTime | empty/error |
| Blog search | `GET /api/v1/posts/search?q=` | `q` | no-results |
| Portfolio index | `GET /api/v1/portfolio`, `GET /api/v1/portfolio/featured`, `GET /api/v1/portfolio/categories` | slug, title, summary, tags, cover | empty/error |
| Item | `GET /api/v1/portfolio/{idOrSlug}`, `GET /api/v1/posts/{slug}` | | 404 |
| Engagement | `POST /api/v1/portfolio/{idOrSlug}/like`, `POST /api/v1/posts/{slug}/like` | | optimistic |

## Demo-only affordances (labelled in `client-portal-lab/DECISIONS.md`)

| # | Affordance | Family | Why demo-only |
|---|---|---|---|
| D1 | "Ask AI about this project / quote / billing" (A1) | F09, F11, F14 | no endpoint in any of the 17 specs |
| D2 | Project Help & FAQ hub (A2) | F09 | content-only, no CMS endpoint for project-scoped help |
| D3 | Saved views / saved filters (A12) | F05, F10, F14 | prefs endpoint covers notification prefs only |
| D4 | Combined statement of account / GST summary PDF (A10) | F14, F18 | only per-invoice PDF download exists |
| D5 | UPI mandate / auto-pay management (A6) | F15 | Razorpay-managed, no API surface |
| D6 | Typing indicator, read receipts, SLA timer | F13 | no endpoint (websocket health only) |
| D7 | PWA install prompt (A11) | F03 shell | platform UI, represented as a setting row |
| D8 | Skills autocomplete taxonomy (C-fix) | F20 | free-text `skills[]` only |
| D9 | "Open support thread" deep link from error card | F08, F09 | composes `POST /messages/threads/direct` + seeded copy |
| D10 | Quote negotiation *chat* thread (A8) | F11 | mapped onto real `POST /quotes/{id}/request-changes`; chat UI is illustrative |

```
## GATE A
Specs read: 17/17 · Families mapped: 23/23 · Demo-only CTAs listed: 10
Gate: PASS
```
