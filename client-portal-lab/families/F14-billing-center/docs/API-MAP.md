# F14 · Billing Center — API-MAP (Gate A)

Specs read: `backend-api-swagger/README.md`, `payments.openapi.json` (62 paths), `webhooks.openapi.json` (6 paths), plus `progress.openapi.json` / `projects.openapi.json` / `media.openapi.json` / `quotes.openapi.json` checked for cross-links. **Key finding: there is no statement-of-account endpoint and no AI endpoint.** Those two CTAs are demo-labelled.

## UI → endpoint map

| UI element | Method + path | Key request/response fields / enums | States to design |
|---|---|---|---|
| KPI strip (Total paid / Pending / In dispute) | `GET /api/v1/payments/stats` | `status`, `data`, `message`; derived totals for completed / pending / disputed | loading skeleton, zero (₹0.00), error+retry |
| Transaction history table | `GET /api/v1/payments` | query: `status`, `projectId`, `clientId`, `page`, `limit`/`pageSize`; rows: id, date, description, project, `status`, amount, currency | search (client-side over frozen rows), status filter, sort, pagination, empty, error, mobile cards |
| Status filter values | `GET /api/v1/payments` (`status` query) | captured enums: `All statuses · Pending · Not due yet · Processing · Completed · Failed · Refunded` | selected / cleared / no matches |
| Row action **View** | `GET /api/v1/payments/{id}` | `id` path; returns payment detail (status, amount, project, currency, createdAt) | dialog preview, 404, retry |
| Row action **Checkout** | `GET /api/v1/payments/{id}` → `POST /api/v1/payments/create-intent` | intent body: `projectId*`, `milestoneId`, `amount*`, `currency`, `paymentMethodId`; headers `idempotency-key` + `x-idempotency-key` | deep-link to F16 V1 (same family cluster), not a dead button |
| **Invoices** header link | `GET /api/v1/invoices` (`page*`, `limit*`) → `GET /api/v1/invoices/{id}/download` | `NL-INV-2026-00000N` refs | links to F18 V1 |
| **Payment methods** header link | `GET /api/v1/payments/methods` | list saved methods | links to F15 V1 |
| Ask AI about your billing (A1) | **no endpoint** | — | demo-labelled; answers composed only from frozen KPIs/rows |
| Statement of account / GST summary (A10) | **no statement endpoint**; composed from `GET /api/v1/invoices` + `GET /api/v1/invoices/{id}/download` | invoice ids, amounts, dates | demo-labelled "Statement (demo)" or "Download N invoices" |
| Saved views (A12) | **no endpoint** | `localStorage` key `f14-views` | client-side; labelled "Saved on this device" |
| Work queue: "2 payments awaiting verification" | `POST /api/v1/webhooks/razorpay` (event intake) → admin `POST /api/v1/admin/payments/{id}/verify`, `POST /api/v1/admin/payments/{id}/approve-transfer` | `verificationNotes`; webhook signature verification | client sees "Awaiting studio verification" — client never calls admin endpoints |
| Work queue: "1 invoice 12 days overdue" | `GET /api/v1/invoices` + `POST /api/v1/payments/{id}/dispute` (legal route) | invoice id, due/age | overdue card links to invoice + dispute route |
| "Cancel / dispute" legal route | `POST /api/v1/payments/{id}/cancel`, `POST /api/v1/payments/{id}/dispute` | `id` path | confirm dialog, success toast, error+retry |
| Billing documents | `GET /api/v1/payments/{id}/receipt`, `GET /api/v1/payments/{id}/invoice`, `GET /api/v1/payments/{id}/documents/versions` | PDF / signed URL | download states, empty "not issued yet" |
| Receipt proof behind bank transfers | `POST /api/v1/payments/bank-transfer/submit` (`mediaIds*`) → `POST /api/v1/media/upload/direct` | `projectId*`, `milestoneId*`, `amount*`, `platformAccountId*`, `transferReference*`, `mediaIds*`, `notes` | inherited by F16 |
| Platform bank/UPI accounts | `GET /api/v1/payments/platform-accounts` | HDFC settlement details | inherited by F16 |
| Saved methods (cross-link) | `GET/POST /api/v1/payments/methods`, `PATCH …/{id}/default`, `PATCH …/{id}/nickname`, `DELETE …/{id}` | `AddPaymentMethodDto`: `type*`, `tokenId`, `last4`, `cardBrand`, `upiVpa`, `nickname`, `setAsDefault` | inherited by F15 |

## Enum / field honesty

- `status` values rendered here come from the **captured DOM filter**, not an invented enum list.
- All 11 rows and 3 KPI figures are frozen from snapshot 26; no new clients, amounts or projects.
- `GET /api/v1/payments/stats` response is an `ApiSuccessEnvelopeDto` + `data`; no per-field schema is published in the spec, so the UI labels the KPI "why" from captured data only.
- The 502 on `/api/v1/projects` (audit metadata) is a **real degraded state**: variants ship an error panel with "what happened / why / retry / contact support".

## Demo-only CTAs (recorded in `DECISIONS.md`)

1. **Ask AI about your billing** — no inference endpoint; deterministic answers from frozen rows.
2. **Download statement (PDF)** — no statement endpoint; labelled demo; honest alternative = download invoices individually.
3. **Save view** — no backend; localStorage only.
4. **Work-queue "Verify now"** — admin-only; client variant shows "Studio is verifying" instead.
5. **⌘K demo actions** — only real routes (F14/F15/F16/F17/F18 variants + gallery).

```
## GATE A (F14)
Specs read: 4/4 (payments, webhooks, progress, media; +README) · Distinct spec endpoints referenced in the mapping: 19 (verified 2026-10-28 by counting unique method+path pairs) · Demo-only CTAs listed: 5
Gate: PASS
```
