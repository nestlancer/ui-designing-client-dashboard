# F15 · Payment Methods — BASELINE-MAP (Gate S)

Opened: screenshot `011-payments-methods.webp` · HTML `27-billing-payment-methods.html` · `audit-metadata.json` slug `27-billing-payment-methods` · `nestlancer-client-pages-html/README.md` · sibling billing snapshots 26/28–32.

| Route | State | HTML | Screenshot | H1 | Sections |
|---|---|---|---|---|---|
| `/payments/methods` | saved payment methods (empty dead-end) | `27-billing-payment-methods.html` | `011-payments-methods.webp` | `Payment methods` | KPI strip · No saved methods yet · Add a payment method · trust strip |

Audit: `buttonsCount 8`, `inputsCount 0`, `tables []`, `h1Style` Outfit **26px/32px/700**, `cssVarsCount 156`, `© 2026 Nestlancer`; `failedRequests`/`consoleErrors` contain the global `/api/v1/projects` 502 + CORS entries, no methods-specific failure captured.

**Frozen content (DOM text of 27):**
- Back link **"Back to payments"** (`/payments`).
- H1 **Payment methods**; lead **"Manage saved options for faster Razorpay checkout on milestones and invoices."**
- KPI strip (same three): **Total paid ₹81,500.00 · Pending ₹31,875.00 · In dispute ₹0.00**.
- Empty state: **"No saved methods yet"** / **"Complete a Razorpay checkout and choose to save your card to add a payment method here."**
- Card: **"Add a payment method"**; explainer **"Payment methods are saved automatically when you complete a Razorpay checkout and choose to save your card. Manual token entry is not supported."**; CTA **"Go to payments"**.
- Trust strip (KEEP): **"Secured by Razorpay / 256-bit encryption · PCI-DSS compliant checkout"**; chips **UPI · Cards · Netbanking · Wallets**.
- Shell: 232px sidebar (MAIN / EXPLORE / ACCOUNT), 64px header, breadcrumb `Dashboard › Billing`, Search ⌘K, theme, message bell (6), avatar `Arjun Mehta (AM)`.

**Honesty boundary:** the captured page has **zero** saved rows; saved-card management (A6) comes from real endpoints `GET/POST /api/v1/payments/methods`, `PATCH …/{id}/default`, `PATCH …/{id}/nickname`, `DELETE …/{id}` — so demo *rows* are labelled "sample tokens" when shown, never passed off as captured. **UPI mandates have no endpoints** → demo-labelled. Manual token entry is explicitly **not supported** in the captured copy: add-card UI therefore simulates a Razorpay token hand-off, never a raw card-number field.

```
## GATE S (F15)
Screenshots opened: 1/1 · HTML opened: 1/1 · audit-metadata read: YES
Routes mapped: /payments/methods · Content frozen: YES
Gate: PASS
```
