# F18 · Invoices Archive — BASELINE-MAP (Gate S)

Opened: screenshot `003-invoices.webp` · HTML `32-invoices-archive.html` · `audit-metadata.json` slug `32-invoices-archive` · README map · sibling billing snapshots 26–31 (for dates/project names).

| Route | State | HTML | Screenshot | H1 | Rows |
|---|---|---|---|---|---|
| `/invoices` | issued + pending invoices table | `32-invoices-archive.html` | `003-invoices.webp` | `Invoices` | 5 |

Audit: `buttonsCount 13`, `inputsCount 0`, `tables 1` (5 rows), H1 Outfit **26px/32px/700**, 156 CSS vars; global `/api/v1/projects` 502 + CORS errors only — no invoice-specific outage captured.

**Frozen content (DOM text of 32):**
- H1 **Invoices**; lead **"Your issued invoices with downloadable PDF copies for accounting and tax records."**
- Quiet link **"View payments"** → F14.
- Table headers **Invoice / Project / Amount / Status / Actions**.
- Rows (exact):
  | Invoice | Project | Amount | Status | Actions |
  |---|---|---|---|---|
  | `NL-INV-2026-000045` | AUDIT-P25-… Project Fixture | ₹625.00 | Pending | Download invoice / View |
  | `NL-INV-2026-000005` | B2B Wholesale Ordering Portal | ₹29,500.00 | Issued | Download invoice / View |
  | `NL-INV-2026-000004` | B2B Wholesale Ordering Portal | ₹29,500.00 | Issued | Download invoice / View |
  | `NL-INV-2026-000002` | Khandesh Spice D2C E-Commerce Store | ₹22,500.00 | Issued | Download invoice / View |
  | `NL-INV-2026-000001` | Khandesh Spice D2C E-Commerce Store | ₹30,000.00 | Pending | Download invoice / View |
- Gross total of the 5 captured rows = **₹1,12,125.00** (computed, not captured text).
- Trust strip **"Secured by Razorpay / 256-bit encryption · PCI-DSS compliant checkout"**; shell 232/64 + breadcrumb + ⌘K + theme + bells + `Arjun Mehta (AM)`.

**Honesty boundary:** snapshot 32 has **no date column**; the prompt's family must-include demands one, so the lab derives each date from the corresponding payment row in `26-billing-payments-center.html` (Oct 5–6, 2026) and labels it in `DECISIONS.md` as derived, not invented. **No statement/GST-summary endpoint exists** — A10 is demo-labelled or composed from N individual `GET /api/v1/invoices/{id}/download` calls. Screenshot-only amounts/rows were rejected; HTML is truth.

```
## GATE S (F18)
Screenshots opened: 1/1 · HTML opened: 1/1 · audit-metadata read: YES
Routes mapped: /invoices · Content frozen: YES (5 rows, 5 header labels)
Gate: PASS
```
