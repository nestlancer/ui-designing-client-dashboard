# F17 · Payment Status — API-MAP (Gate A)

Specs read: `backend-api-swagger/README.md`, `payments.openapi.json` (62 paths), `progress.openapi.json` (milestone unlock), `media.openapi.json` (receipt proof), `projects.openapi.json` (project hub context). **Key finding: there is no "pay now" endpoint for a not-due installment**, and no client-side "mark paid" endpoint.

| UI element | Method + path | Key fields / enums | States |
|---|---|---|---|
| Payment detail (both states) | `GET /api/v1/payments/{id}` | `id`, `amount`, `currency`, `status`, `projectId`, `milestoneId`, `createdAt`, `receiptUrl`, `invoiceUrl` | skeleton, zero, error+retry |
| Status stepper | `GET /api/v1/payments/{id}/status` | captured labels Pending / Processing / Completed / Refunded | current-step "why", refunded terminal |
| Completed: **Download receipt** | `GET /api/v1/payments/{id}/receipt` | `paymentId` | ready, generating, unavailable+retry |
| Completed: **Download invoice** | `GET /api/v1/payments/{id}/invoice` → `GET /api/v1/invoices/{id}/download` | `paymentId` → `invoiceId` | ready, error+retry, link to F18 |
| Billing documents | `GET /api/v1/payments/{id}/documents/versions` | versioned doc list | empty (no docs), skeleton, error |
| **File a payment dispute** (KEEP legal) | `POST /api/v1/payments/{id}/dispute` | `reason`, `description` | confirmation dialog, success, failure |
| Not-due: **"Checkout not available yet"** | no payment endpoint until unlock | `milestoneId`, `status` | honest disabled CTA, not a dead link |
| **C9/A3 "what unlocks this" deep link** | `POST /api/v1/milestones/{id}/approve` (+ `GET /api/v1/progress/projects/{projectId}` for context; `POST /api/v1/milestones/{id}/request-revision`, deliverable approve/reject also exist) | `milestoneId` | "approve delivery" action is a real endpoint; the lab presents it as a demo-labelled action with an explainer |
| **Cancel payment** | `POST /api/v1/payments/{id}/cancel` | `paymentId` | confirm dialog, success, failure |
| Receipt proof (bank path context) | `POST /api/v1/media/upload/request` `/confirm` `/direct`, `GET /api/v1/media/{id}/download` | `mediaId` | F16 form; here a "proof on file" line |
| Trust strip | no endpoint | captured Razorpay text | static KEEP |

**Enum honesty:** statuses are captured labels, not invented enums (no named `Payment` DTO exists). `POST /payments/{id}/dispute` has no named request DTO — reason text is a demo field.

**Demo-only CTAs (in `DECISIONS.md`):** (1) "Download receipt/invoice" does not fetch real PDFs in the lab — labelled demo with honest alternatives (F18 invoice list) · (2) "Approve the milestone delivery" is a labelled demo of `POST /milestones/{id}/approve` (no live milestone mutation) · (3) "File a payment dispute" opens a demo form for `POST /payments/{id}/dispute` · (4) "Cancel payment" is a labelled demo with confirmation · (5) ⌘K actions are real lab routes.

```
## GATE A (F17)
Specs read: 5/5 · Distinct spec endpoints referenced in the mapping: 13 (verified 2026-10-28) · Demo-only CTAs listed: 5
Gate: PASS
```
