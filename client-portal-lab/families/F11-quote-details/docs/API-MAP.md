# F11 · Quote Details (Accept & Sign) — Gate A · API-MAP (Swagger)

Mapping of every UI surface in **F11 · Quote Details (Accept & Sign)** to real backend endpoints in `quotes.openapi.json` and `payments.openapi.json` (plus cross-family project/request links).

```
## GATE A (F11)
Specs read: 2/2 (quotes.openapi.json, payments.openapi.json) · Endpoints mapped: 12 · Demo-only CTAs listed: 6
Gate: PASS
```

---

## 1 · Specs Studied

1. **`backend-api-swagger/quotes.openapi.json`** (27 paths, 14 schemas — client quote detail, accept/e-sign, decline, request-changes, PDF download, draft contract preview, signed contract download, document versions).
2. **`backend-api-swagger/payments.openapi.json`** (62 paths — milestone installment context and payment intent creation upon quote acceptance).

---

## 2 · UI Surface → Endpoint Mapping Table

| UI Element / Surface | Method & Path | Request Schema / Parameters | Response / Data Fields | Designed States in UI |
|---|---|---|---|---|
| **Quote Header, Line Items, Payment Schedule & T&C** | `GET /api/v1/quotes/{id}` | `id` (path UUID: `01a10f80-3144-755f-a145-b48ad8a72557` or `01a10a2b-5c32-72e7-99ac-ba6c1c58b2ad`) | `id`, `requestId`, `title`, `status` (`viewed`, `accepted`, `expired`, `changesRequested`, `declined`), `items[]` (`description`, `qty`, `unitPrice`, `total`), `subtotal`, `taxPercentage` (`18`), `totalAmount`, `paymentSchedule[]` / `paymentBreakdown[]` (`type`, `description`, `percentage`, `amount`, `dueDate`), `terms` (10 standard clauses), `termsAndConditions` (project-specific terms), `validUntil`, `requiresContract`, `contractNumber` (`NL-CTR-2026-000001`), `signedAt` (`Oct 5, 2026`) | **Awaiting (`#01a10f80`):** Active 3-step sign ritual.<br>**Accepted (`#01a10a2b`):** Signed agreement banner + Open project.<br>**Expired (`#01a10f80`):** Honest expired banner + request-changes CTA.<br>**Loading:** Full page skeleton.<br>**Error:** 502/network error card + retry. |
| **Step 3 · Accept Quote & Sign Agreement CTA (C7)** | `POST /api/v1/quotes/{id}/accept` | `AcceptQuoteDto`:<br>• `acceptTerms`: `boolean` (required, must be `true`)<br>• `signatureName`: `string` (required, `maxLength: 100`, full legal name)<br>• `signatureDate`: `string` (required, ISO timestamp)<br>• `notes`: `string` (optional, `maxLength: 1000`) | Transitions quote status to `accepted`, generates signed contract `NL-CTR-2026-000001`, and unlocks the Deposit installment (`Upon acceptance`). | **Disabled-until-complete:** Button is `disabled` until checkbox is checked AND `signatureName` has ≥ 2 characters (with live helper copy explaining what's remaining).<br>**Submitting:** Loading state.<br>**Success:** Transitions in-page to signed state with timestamp + `signatureName` recorded. |
| **Negotiate / Request Changes Thread (A8)** | `POST /api/v1/quotes/{id}/request-changes` | `RequestQuoteChangesDto`:<br>• `changes[]` (required array of `ChangeItemDto`: `area ∈ ["budget", "timeline", "features", "terms"]`, `request: string ≤ 500`)<br>• `additionalNotes`: `string ≤ 2000` | Submits structured change requests and transitions quote status to `changesRequested`. | Interactive form + visible client negotiation thread showing each `ChangeItemDto` (`area` badge + `request` text + `additionalNotes`). Validates non-empty `request` before submit. |
| **Decline Quote Modal / Flow** | `POST /api/v1/quotes/{id}/decline` | `DeclineQuoteDto`:<br>• `reason` (required enum: `"budgetConstraints" \| "timelineIssues" \| "scopeDiscrepancy" \| "other"`)<br>• `feedback`: `string ≤ 1000`<br>• `requestRevision`: `boolean` (required — keep negotiation open?) | Transitions quote to `declined` (or flags revision requested). | Focus-trapped modal/drawer with the exact 4 `reason` enum options, optional `feedback` textarea, and the `requestRevision` checkbox (`"Keep negotiation open by requesting a revised quote"`). |
| **Download Quote PDF** | `GET /api/v1/quotes/{id}/pdf` | `id` (path UUID) | Binary PDF stream / metadata | Opens designed document preview modal or shows honest offline download toast naming `GET /api/v1/quotes/{id}/pdf`. |
| **Preview Service Agreement (Draft)** | `GET /api/v1/quotes/{id}/contract/preview` | `id` (path UUID) | Draft service agreement PDF preview before acceptance | Opens focus-trapped in-page Service Agreement Preview modal showing `NL-CTR-2026-000001 (Draft)`, parties (`Nestlancer Pvt Ltd` ↔ `Arjun Mehta`), line items, and the 10 clauses. |
| **Download Signed Service Agreement** | `GET /api/v1/quotes/{id}/contract` | `id` (path UUID) | Signed contract PDF (`NL-CTR-2026-000001`) | Opens signed contract preview modal / triggers honest offline download toast naming `GET /api/v1/quotes/{id}/contract`. |
| **Document Versions List** | `GET /api/v1/quotes/{id}/documents/versions` | `id` (path UUID) | Version history of quote PDF and contract documents | Displayed inside the Documents block / preview modal (`v1.0 Quote PDF`, `NL-CTR-2026-000001`). |
| **Open Project Button (Accepted state)** | `GET /api/v1/projects/by-quote/{quoteId}` → `/projects/{projectId}` | `quoteId` = `01a10a2b-5c32-72e7-99ac-ba6c1c58b2ad` → resolves to project `01a10a2b-5eaa-769e-a5d9-0d58fcca6924` | Links to **`../../F09-project-details/V#/index.html`** | Real working link to the same-numbered F09 Project Details variant (fixing the live CORS error that hid the button in `17`). |
| **Payment Schedule Context** | `GET /api/v1/payments` / `POST /api/v1/payments/intents` | `CreatePaymentIntentDto` (`projectId`, `milestoneId`, `amount` in paise, `currency: "INR"`) | Explains how `Deposit (Upon acceptance)` and `Upon prior milestone approval` map to milestone payments | Read-only schedule table + tooltip/explainer; no premature Pay CTA on the quote screen. |
| **Back to Quotes Link** | `/quotes` (`GET /api/v1/quotes`) | — | Links to **`../../F10-quotes-list/V#/index.html`** | Real working link to the same-numbered F10 variant. |
| **View Request Link** | `/requests/{requestId}` (`GET /api/v1/requests/{id}`) | `01a10f7f-7698-71f1-8c99-709e45f72b67` or `01a10a2b-52c4-7483-a920-455246fe10ec` | Links to **`../../F05-requests-work-hub/V#/index.html`** | Real working link to the F05 Work Hub family. |

---

## 3 · Demo-Only CTAs & Affordances (Recorded in `DECISIONS.md`)

1. **Ask AI about this quote (A1)**: **No AI endpoint exists in `quotes.openapi.json` or any other Swagger spec.** Implemented as a clearly-badged `DEMO` assistant that answers strictly from the active quote's frozen DOM figures (`₹1,770.00` w/ `₹270.00` GST & `₹885.00` deposit; or `₹75,000.00` w/ `₹22,500.00 / ₹30,000.00 / ₹22,500.00` installments and `NL-CTR-2026-000001`).
2. **Offline mutations (`POST /accept`, `POST /request-changes`, `POST /decline`)**: Validate against the exact Swagger DTO rules (`AcceptQuoteDto`, `RequestQuoteChangesDto`, `DeclineQuoteDto`) and update the in-page UI state locally while stating that no network request was sent in the offline lab.
3. **PDF / Contract binary downloads (`GET /pdf`, `GET /contract`, `GET /contract/preview`)**: Open a rich, accessible in-page agreement preview dialog and display an honest toast noting that binary PDF streams come from the Swagger endpoint in production.
4. **Quote & State Switcher (`Awaiting #01a10f80` · `Accepted #01a10a2b` · `Expired #01a10f80` · `Empty` · `Loading` · `Error`)**: Deep-linkable (`?state=…`) lab toolbar so reviewers can inspect all three quote lifecycle states plus cross-cutting states in every variant.
5. **Unbuilt sibling routes in sidebar/header**: Trigger an honest demo toast (`DECISIONS.md`), while `/requests` (`F05`), `/projects` (`F08`/`F09`), `/quotes` (`F10`), and `/messages` (`F12`/`F13`) navigate to real local lab pages.
