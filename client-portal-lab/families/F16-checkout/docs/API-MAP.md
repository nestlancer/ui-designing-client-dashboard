# F16 · Checkout — API-MAP (Gate A)

Specs read: `backend-api-swagger/README.md`, `payments.openapi.json` (62 paths), `webhooks.openapi.json`, `media.openapi.json`, `progress.openapi.json` (milestone context). **No "statement", "promo code", "currency converter" or "guest checkout" endpoints exist.**

| UI element | Method + path | Key fields / enums | States |
|---|---|---|---|
| Page load / order summary | `GET /api/v1/payments/{id}` | `id`, `amount`, `currency`, `status`, `projectId`, `milestoneId`, `createdAt`, `receiptUrl`, `invoiceUrl` | loading skeleton, error+retry, zero amount (disabled CTA) |
| Status stepper | `GET /api/v1/payments/{id}/status` | captured sequence Created → Pending → Processing → Completed / Refunded | current-step "why", refunded terminal |
| **"Proceed to secure checkout"** (ONE primary) | `POST /api/v1/payments/create-intent` → `POST /api/v1/payments/initiate` → `POST /api/v1/payments/confirm` | `projectId*`, `milestoneId`, `amount*`, `currency='INR'`, `paymentMethodId`, `tokenId`; **idempotency key** | demo success, processor failure, 3-DS/webhook pending, retry |
| Razorpay hosted window / method chips | external processor (no portal endpoint) | UPI · Cards · Netbanking · Wallets (captured chips — **not** invented enums) | honesty note: UPI ID entry unavailable on desktop |
| Webhook verification | `POST /api/v1/webhooks/razorpay` | signature/verification events | asynchronous "verification pending" |
| Bank / UPI settlement block | `GET /api/v1/payments/platform-accounts` | HDFC account, IFSC, UPI VPA | captured static text + copy button (client-side) |
| UTR form | `POST /api/v1/payments/bank-transfer/submit` | `paymentId`, `utr`, `notes`, `receiptMediaId` | inline validation, success (submitted for verification), failure, retry |
| Receipt / screenshot dropzone (C15) | `POST /api/v1/media/upload/request` → `/confirm` (or `/direct`) → `GET /api/v1/media/{id}/download` | `mediaId`, mime image/PDF | chosen filename, type error, upload failure, retry |
| "Invoice" link | `GET /api/v1/payments/{id}/invoice` + `GET /api/v1/invoices/{id}/download` | `paymentId` → `invoiceId` | quiet link → F18 / F17 lab routes |
| "Cancel payment" (single footer link) | `POST /api/v1/payments/{id}/cancel` | `paymentId` | confirmation dialog, success, failure |
| "File a payment dispute" (legal keep) | `POST /api/v1/payments/{id}/dispute` | `reason` | deep link to F17 V1 |
| Milestone context | `GET /api/v1/progress/projects/{projectId}` / `POST /api/v1/milestones/{id}/approve` | milestone unlock | F17 not-due explainer context |

**Enum honesty:** `payment.status` values are the captured labels; `AddPaymentMethodDto.type` is a free string, so no invented card-brand enum. Platform-account values are the captured HDFC strings.

**Demo-only CTAs (in `DECISIONS.md`):** (1) "Proceed to secure checkout" **does not open Razorpay** — it is a labelled demo of `create-intent → initiate → confirm` with success / failure / pending switches · (2) "Submit for verification" is a labelled demo of `POST /bank-transfer/submit` (no live UTR validation) · (3) receipt dropzone is local-only (`FileReader`, no media upload) · (4) copy-to-clipboard for A/C / IFSC / UPI is a local convenience, not an API action · (5) ⌘K actions are real lab routes.

```
## GATE A (F16)
Specs read: 5/5 · Distinct spec endpoints referenced in the mapping: 16 (verified 2026-10-28) · Demo-only CTAs listed: 5
Gate: PASS
```
