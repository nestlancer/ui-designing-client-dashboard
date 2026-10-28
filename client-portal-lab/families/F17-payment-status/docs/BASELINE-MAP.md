# F17 · Payment Status — BASELINE-MAP (Gate S)

Opened: screenshots `001-payment-details-completed-payment.webp`, `002-payment-details-not-due-yet.webp` · HTML `30-payment-details-completed.html`, `31-payment-details-not-due-yet.html` · `audit-metadata.json` (both) · README map · sibling 26–29/32.

| Route | State | HTML | Screenshot | H1 | Buttons |
|---|---|---|---|---|---|
| `/payments/{id}` | **Completed** deposit | `30-…completed.html` | `001-…webp` | `Payment details` | 13 |
| `/payments/{id}` | **Not due yet** installment | `31-…not-due-yet.html` | `002-…webp` | `Payment details` | 10 |

Audit: H1 Outfit **26px/32px/700**, 156 CSS vars, 0 inputs/tables; global `/api/v1/projects` 502 + CORS errors only — no payment-detail-specific outage.

**Frozen content (DOM text of 30 + 31):**
- H1 **Payment details**; back to Billing Center; status badges **Completed** / **Not due yet**.
- **Completed** copy: **"This payment has been recorded. Download your receipt or invoice below."**; CTAs **Download invoice** / **Download receipt**; **Billing documents** block; **"File a payment dispute"**; stepper **Pending → Processing → Current: Completed → Refunded**.
- **Not-due-yet** copy: **"This installment is not due yet. Checkout unlocks after you approve delivery or when the studio requests payment."**; **"Checkout not available yet"**; guidance **"Approve the milestone delivery from your project hub, or wait until Nestlancer requests this installment."** and **"Complete the current milestone (payment or delivery review) before moving to later milestones."**; **"Cancel payment"**.
- Order summary: **Khandesh Spice D2C E-Commerce Store · Final payment · ₹22,500.00**; **Currency INR**, **Reference**, **Created**; mono-style UUID reference as captured.
- Razorpay trust strip **"Secured by Razorpay / 256-bit encryption · PCI-DSS compliant checkout"** + chips **UPI · Cards · Netbanking · Wallets**; shell 232/64 + breadcrumb + ⌘K + theme + bells + `Arjun Mehta (AM)`.

**Honesty boundary:** the not-due "approve delivery" line is plain text in the capture; C9/A3 turn it into a **deep link** to `POST /api/v1/milestones/{id}/approve` (verified in `progress.openapi.json`). Screenshot-only figures (e.g. ₹15,660.00) rejected — HTML wins. There is no "pay now" endpoint for a not-due installment; **"Checkout not available yet" is kept verbatim**.

```
## GATE S (F17)
Screenshots opened: 2/2 · HTML opened: 2/2 · audit-metadata read: YES
Routes mapped: /payments/{id} ×2 states · Content frozen: YES
Gate: PASS
```
