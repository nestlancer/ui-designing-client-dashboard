# F16 · Checkout — BASELINE-MAP (Gate S)

Opened: screenshots `010-payments-details.webp`, `042-payment-details-bank-and-upi-transfer.webp` · HTML `28-payment-details-pending-online.html`, `29-payment-details-bank-upi-transfer.html` · `audit-metadata.json` (both slugs) · README map · sibling 26/27/30/31/32.

| Route | State | HTML | Screenshot | H1 | Buttons / inputs |
|---|---|---|---|---|---|
| `/payments/{id}` | pending · **Pay online** | `28-…pending-online.html` | `010-…webp` | `Checkout` | 15 buttons, 0 inputs |
| `/payments/{id}` | pending · **Bank / UPI transfer** | `29-…bank-upi-transfer.html` | `042-…webp` | `Checkout` | 15 buttons, 4 inputs (UTR, notes, receipt, submit) |

Audit: H1 Outfit **26px/32px/700**, 156 CSS vars, no tables; the same global `/api/v1/projects` 502 + CORS entries appear in `failedRequests`/`consoleErrors` — **no checkout-specific outage was captured**.

**Frozen content (DOM text of 28 + 29):**
- H1 **Checkout**; back link to Billing Center; status badge **Pending**.
- Hero amount **₹30,000.00** (29); order-summary fields **Amount due**, **Currency INR**, **Reference `01a10a2b-5ed2-73bc-8aee-d1c6262906e9`**, **Created**. Project **Khandesh Spice D2C E-Commerce Store**.
- Tabs **"Pay online"** / **"Bank / UPI transfer"**.
- Pay-online: CTA **"Proceed to secure checkout"**; helper **"Card, netbanking, wallets, or UPI (QR) in Razorpay's secure window"**; long honesty note **"UPI ID entry is not available on desktop browsers … that is expected, not a bug in Nestlancer."** (KEEP verbatim incl. the QR/phone-app workaround).
- Bank tab: **"Pay ₹30,000.00 via bank / UPI"**; settlement block **"Nestlancer Pvt Ltd · HDFC Bank · A/C 50200012345678 · IFSC HDFC0001234 · UPI nestlancer@hdfcbank"**; transfer-note tips; form **"UTR / UPI reference"**, **"Notes (optional)"**, **"Receipt / screenshot (image or PDF)"**, CTA **"Submit for verification"**.
- Quiet links **"Invoice"** and **"Cancel payment"**; status stepper **Created → Pending → Processing → Completed / Refunded**.
- Trust strip **"Secured by Razorpay / 256-bit encryption · PCI-DSS compliant checkout"** + chips **UPI · Cards · Netbanking · Wallets**.
- Shell: 232px sidebar, 64px header, breadcrumb `Dashboard › Billing › Checkout`, ⌘K, theme, bells, `Arjun Mehta (AM)`.

**Honesty boundary:** Razorpay's hosted window, real card entry and live order creation are **not** simulated as if real. The lab's "Proceed"/"Submit" actions are **demo-labelled** and show success / failure / verification-pending states derived from real endpoints (`POST /payments/create-intent`, `/initiate`, `/confirm`, `/bank-transfer/submit`, `/webhooks/razorpay`). Figures/names come from HTML only; screenshot-only ₹19,200.00 was rejected.

```
## GATE S (F16)
Screenshots opened: 2/2 · HTML opened: 2/2 · audit-metadata read: YES
Routes mapped: /payments/{id} ×2 states · Content frozen: YES
Gate: PASS
```
