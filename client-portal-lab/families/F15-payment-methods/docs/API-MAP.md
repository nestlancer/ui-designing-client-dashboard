# F15 · Payment Methods — API-MAP (Gate A)

Specs read: `backend-api-swagger/README.md`, `payments.openapi.json` (62 paths), plus `webhooks.openapi.json` checked for Razorpay token hand-off. **Key finding: no UPI-mandate endpoints and no "verify saved card" endpoint exist.**

| UI element | Method + path | Key fields / enums | States |
|---|---|---|---|
| KPI strip (Total paid / Pending / In dispute) | `GET /api/v1/payments/stats` | envelope `status/data/message`; captured ₹81,500.00 / ₹31,875.00 / ₹0.00 | skeleton, zero, error+retry |
| Saved-method list | `GET /api/v1/payments/methods` | rows: `id`, `type*`, `cardBrand`, `last4`, `cardExpMonth`, `cardExpYear`, `upiVpa`, `bankName`, `walletProvider`, `nickname`, `isDefault` | **empty (captured)**, loading skeleton, error+retry, populated (labelled sample tokens) |
| "Add a payment method" (card) | `POST /api/v1/payments/methods` | `AddPaymentMethodDto`: `type*`, `tokenId`, `last4`, `cardBrand`, `cardExpMonth`, `cardExpYear`, `nickname`, `setAsDefault` | Razorpay token hand-off (no raw PAN in the portal), inline validation, success, failure, retry |
| "Add UPI" (demo) | `POST /api/v1/payments/methods` (`type:'upi'`, `upiVpa`) but **mandate flows have no endpoints** | `upiVpa`, `nickname` | success/failure simulated and labelled demo; mandate panel is demo-only |
| "Make primary" | `PATCH /api/v1/payments/methods/{id}/default` | `id` path | optimistic select, error rollback |
| "Rename" | `PATCH /api/v1/payments/methods/{id}/nickname` | `id` path, `nickname` | inline edit, validation, error |
| "Remove" | `DELETE /api/v1/payments/methods/{id}` | `id` path | **confirmation dialog**, success toast, error+retry |
| "Go to payments" / "Back to payments" | `GET /api/v1/payments` | `status/page/limit` | link to F14 V1 |
| Checkout intent (context) | `POST /api/v1/payments/create-intent` | `projectId*`, `amount*`, `currency`, `paymentMethodId` | link to F16 V1 |
| Platform accounts (bank/UPI) | `GET /api/v1/payments/platform-accounts` | HDFC details | used by F16, not this page |
| Razorpay webhook (token events) | `POST /api/v1/webhooks/razorpay` | verification events | asynchronous "studio verifying" copy |
| Trust strip | no endpoint | captured text | static KEEP |

**Enum honesty:** captured method chips are `UPI · Cards · Netbanking · Wallets`; `AddPaymentMethodDto.type` is a free string — no invented enum. No brand logos are captured, so variants use text/initialism, not Visa/Mastercard artwork.

**Demo-only CTAs (in `DECISIONS.md`):** (1) UPI AutoPay mandate create/pause/cancel (no endpoints) · (2) "Add card" in the lab does not call Razorpay; it demonstrates the `POST /payments/methods` payload with a fake `tokenId` and is labelled demo · (3) sample saved rows are labelled sample tokens, not captured production data · (4) "Verify card" — no endpoint; never shown as an action · (5) ⌘K actions are real lab routes only.

```
## GATE A (F15)
Specs read: 2/2 (+ README) · Distinct spec endpoints referenced in the mapping: 10 (verified 2026-10-28) · Demo-only CTAs listed: 5
Gate: PASS
```
