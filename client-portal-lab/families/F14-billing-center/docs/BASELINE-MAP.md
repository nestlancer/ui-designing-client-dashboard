# F14 · Billing Center — BASELINE-MAP (Gate S)

Inputs actually opened this run:
- Screenshot: `Nestlancer-clients-screenshots/clients/009-payments.webp` (1/1).
- HTML snapshot: `nestlancer-client-pages-html/26-billing-payments-center.html` (1/1), plus `nestlancer-client-pages-html/README.md` map.
- `nestlancer-client-pages-html/audit-metadata.json` → slug `26-billing-payments-center` (48 audit records; `failedRequests` / `consoleErrors` inspected).
- Cross-checked the sibling billing snapshots 27–32 for shared shell, KPI grammar and Razorpay strip.

## Route ↔ artifact map

| Route | State | HTML | Screenshot | H1 | H2 / section titles |
|---|---|---|---|---|---|
| `/payments` | Billing Center (KPIs + transaction history) | `26-billing-payments-center.html` | `009-payments.webp` | `Billing Center` | `Transaction history` |

Sibling context (not in scope, but links are real and must not be dead):
`/payments/methods` (27) · `/payments/{id}` checkout (28, 29) · `/payments/{id}` status (30, 31) · `/invoices` (32).

## Frozen content truth (from snapshot 26 DOM text)

- Eyebrow `BILLING`; H1 **Billing Center**; lead **"Payment history, invoices, and milestone payment tracking."**
- Header links: **Invoices** (`/invoices`), **Payment methods** (`/payments/methods`).
- KPI strip (captured values): **Total paid ₹81,500.00 · Pending ₹31,875.00 · In dispute ₹0.00**.
- Table title **Transaction history**; filter label **Status**; values **All statuses · Pending · Not due yet · Processing · Completed · Failed · Refunded** (screenshot 009 shows `All statuses`; snapshot DOM includes `Pending`).
- Columns **Date · Description · Project · Status · Amount · Actions**; row actions **View** / **Checkout**; `audit-metadata.json` reports `rowCount: 11` with header casing `DATE, DESCRIPTION, PROJECT, STATUS, AMOUNT, ACTIONS`.
- Captured rows (all frozen):
  `Oct 6, 2026 · Final payment · AUDIT-P25-20261005-73dhk Project Fixture · Not due yet · ₹625.00 · View` ·
  `Oct 6, 2026 · Deposit · AUDIT-P25-20261005-73dhk Project Fixture · Pending · ₹625.00 · Checkout` ·
  `Oct 5, 2026 · Final payment · AUDIT-P25-20261005-f611o Project Fixture · Not due yet · ₹625.00 · View` ·
  `Oct 5, 2026 · Deposit · AUDIT-P25-20261005-f611o Project Fixture · Pending · ₹625.00 · Checkout` ·
  `Oct 5, 2026 · Deposit · AUDIT-P25-20261005-uk6ic Project Fixture · Pending · ₹625.00 · Checkout` ·
  `Oct 5, 2026 · Final payment · AUDIT-P25-20261005-uk6ic Project Fixture · Not due yet · ₹625.00 · View` ·
  `Oct 5, 2026 · Deposit · B2B Wholesale Ordering Portal · Completed · ₹29,500.00 · View` ·
  `Oct 5, 2026 · Final payment · B2B Wholesale Ordering Portal · Completed · ₹29,500.00 · View` ·
  `Oct 5, 2026 · Final payment · Khandesh Spice D2C E-Commerce Store · Not due yet · ₹22,500.00 · View` ·
  `Oct 5, 2026 · Deposit · Khandesh Spice D2C E-Commerce Store · Completed · ₹22,500.00 · View` ·
  `Oct 5, 2026 · Mid-project payment · Khandesh Spice D2C E-Commerce Store · Pending · ₹30,000.00 · Checkout`.
- Trust strip (KEEP): **Secured by Razorpay · 256-bit encryption · PCI-DSS compliant checkout** + chips **UPI · Cards · Netbanking · Wallets**.
- Shell: 232px sidebar (MAIN / EXPLORE / ACCOUNT groups), 64px header, breadcrumb `Dashboard › Billing`, `Search ⌘K`, theme, messages badge 6, bell, avatar `Arjun Mehta (AM)`; footer `© 2026 Nestlancer`.

## Computed / audit observations

- `h1Style`: Outfit, **26px/32px, weight 700** → C18 wants 32–40px display.
- `buttonsCount: 8`, `inputsCount: 1` (the status `<select>`), `tables: [1 × 11 rows]`, `cssVarsCount: 156`.
- CSS var dump shows the three-palette problem: `--ta-brand-500:#465fff` (chrome), `--accent-1`/`--primary` violet, plus teal auth tokens → C5.
- Status badges are saturated hue on 12% tint; report measures 1.73–3.23:1 → C4.
- Card borders are raw hex / `gray-200/80` → C6. No mobile card-fallback for the 6-column table → C16.
- `failedRequests` / `consoleErrors`: the critical entries are the `/api/v1/projects` 502 + CORS on dashboard/routes; **no billing-specific failed request is recorded for `/payments`** — the captured billing DOM is populated. The 502 is honoured as the honest degraded/error state we design (A13-style retry + support), not invented as a billing outage.

## Honesty boundary

Anything unverifiable is *not verified*, never invented: statement-of-account (A10) has no endpoint; Ask-AI (A1) has no inference endpoint; saved views (A12) are client-side; the work queue (A5) is grounded by `/webhooks/razorpay` + admin verify endpoints. All four are labelled accordingly in `DECISIONS.md`.

```
## GATE S (F14)
Screenshots opened: 1/1 · HTML opened: 1/1 (+6 siblings) · audit-metadata read: YES
Routes mapped: /payments · Content frozen: YES
Gate: PASS
```
