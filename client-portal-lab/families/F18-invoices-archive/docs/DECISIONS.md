# F18 · Invoices Archive — Family Decisions

**Authored:** 2026-10-28 · Hand-written, one variant at a time. No generator script, no shared megatemplate, no branch/commit/push. Shared evidence: `/client-portal-lab/DECISIONS.md` §9. Winner and full QA: `DELIVERY-REPORT.md`.

## 1 · Hand-authorship attestation

Five standalone `index.html` files were authored individually, each with its own layout CSS and interaction JS. `shared/tokens.css` and `shared/base.css` were imported as-is and never edited. `assets/lab-core.*` supplies optional utilities only (theme, ⌘K, dialog, state switcher, tabs, sprite); it is not a page template. Variants differ on axes A and C, not by colour.

## 2 · A10 statement / GST decision (most important)

**There is no statement-of-account or GST-summary endpoint.** Decision: A10 is either **demo-labelled** (V1, V2, V4, V5 = 4/5) or honestly composed from five `GET /api/v1/invoices/{id}/download` calls — never presented as a single real export. V3 intentionally omits the statement CTA to remain a quiet static archive, which is why A10 is 4/5 rather than 5/5. The prompt allows P2–P3 A-items at ≥3/5.

## 3 · Five demo-only CTAs

1. **GST statement / statement of account download** — no endpoint; honest composition of individual invoice downloads.
2. **Download invoice** — demo dialog, **no real PDF fetched**.
3. **View (invoice detail)** — captured row data only, no invented line items.
4. **Saved views** — `localStorage` only, no backend persistence.
5. **⌘K actions** — real lab routes only.

## 4 · A-item coverage

| Item | Coverage | Notes |
|---|---|---|
| A10 Statement / GST | **4/5** | Demo-labelled; V3 intentionally static |
| A12 Saved views | **5/5** | V2's rail, V1/V3/V4 chips, V5 URL state |

C-items C4, C5, C6, C16 and C17 are present in 5/5; C9 (what unlocks this) leads in V4. The H1 “Invoices”, subtitle, “View payments”, the five captured rows, gross `₹1,12,125.00`, Download invoice / View actions and the captured `Issued` / `Pending` labels are preserved.

## 5 · Navigation honesty

20 dead F20/F21/F23 nav links in this family were replaced with real `../../../index.html` hrefs plus `data-demo-nav` boundary dialogs. No `href="#"` and no remote asset remains. V1, V2, V4 and V5 gained `noscript` fallbacks after QA found none; V3's fallback is a **text list** of all five rows and the gross (its card deck is JS-rendered), and the gallery card copy was corrected from “truly static” to describe that accurately.

## 6 · Known issues

- No date column was captured on `/invoices`; Oct 5–6, 2026 dates are **derived** from payment rows in snapshot 26 and are labelled. “12 days overdue” is derived; V2's Overdue saved view uses an amount heuristic, not a backend filter.
- V3's chapter chips are **not sticky**. V4's awaiting-you queue is a client-side filter over the captured rows.
- `payments.openapi.json` has no named `Invoice` DTO or enum schema; invoice numbers are the captured `NL-INV-2026-00000N` strings.
- No live backend, no archived pixel screenshots, no human timing study of “hierarchy <2s”.

## 7 · Winner

**V5 · Narrative Archive** — see `DELIVERY-REPORT.md` §5.
