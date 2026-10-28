# F18 · Invoices Archive — API-MAP (Gate A)

Specs read: `backend-api-swagger/README.md`, `payments.openapi.json` (62 paths), `projects.openapi.json` (project names), `media.openapi.json` (PDF delivery). **Key finding: there is NO statement-of-account or GST-summary endpoint. A10 can only be demo-labelled or honestly composed from N per-invoice downloads.**

| UI element | Method + path | Key fields / enums | States |
|---|---|---|---|
| Invoice table (5 captured rows) | `GET /api/v1/invoices` | `page`, `limit`, `status`, `projectId`, `search` (as supported by list routes); rows: `id`, `invoiceNumber`, `projectId`, `amount`, `currency`, `status`, `issuedAt` | empty (no matches), skeleton, error+retry, populated |
| Search / status filter / pagination | client-side over `GET /api/v1/invoices` result | captured status labels **Issued / Pending** — no invented enum | zero-result empty row spanning all columns; `aria-live` count |
| Date column | `issuedAt` from invoice detail; lab values derived from payment rows in snapshot 26 (Oct 5–6, 2026) | date | — |
| Total row | computed from visible filtered rows (`tabular-nums`) | amount | zero → ₹0.00 |
| "Download invoice" | `GET /api/v1/invoices/{id}` → `GET /api/v1/invoices/{id}/download` | `invoiceId` | ready, generating, error+retry |
| "View" (invoice detail) | `GET /api/v1/invoices/{id}` | metadata | drawer/dialog with detail, no invented line items |
| Awaiting-you queue (pending/overdue) | `GET /api/v1/invoices` filtered client-side by status | `status`, `amount` | zero state "nothing awaiting you" |
| **A10 GST statement / statement of account** | **no endpoint** — composed from N × `GET /api/v1/invoices/{id}/download` | list of invoiceIds | demo-labelled; explains the honest composition |
| "View payments" | `GET /api/v1/payments` | `status/page/limit` | link to F14 V1 |
| Payment context (badges) | `GET /api/v1/payments/{id}/status` | captured labels | — |
| Legal / dispute route | `POST /api/v1/payments/{id}/dispute` | `reason` | link to F17 V1 |
| Trust strip | no endpoint | captured Razorpay text | static KEEP |

**Enum honesty:** status values are the captured `Issued` / `Pending`. No named `Invoice` DTO or enum schema exists in `payments.openapi.json`; invoice numbers are the captured `NL-INV-2026-00000N` strings.

**Demo-only CTAs (in `DECISIONS.md`):** (1) GST statement / statement of account download — no endpoint, honest composition of individual invoice downloads · (2) "Download invoice" shows a demo dialog, no real PDF fetched · (3) "View" detail uses captured row data only · (4) saved views are `localStorage` only, no backend · (5) ⌘K actions are real lab routes.

```
## GATE A (F18)
Specs read: 4/4 · Distinct spec endpoints referenced in the mapping: 6 (verified 2026-10-28; the remaining mapping rows are client-side compositions over those same endpoints) · Demo-only CTAs listed: 5
Gate: PASS
```
