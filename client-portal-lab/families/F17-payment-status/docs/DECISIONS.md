# F17 · Payment Status — Family Decisions

**Authored:** 2026-10-28 · Hand-written, one variant at a time. No generator script, no shared megatemplate, no branch/commit/push. Shared evidence: `/client-portal-lab/DECISIONS.md` §9. Winner and full QA: `DELIVERY-REPORT.md`.

## 1 · Hand-authorship attestation

Five standalone `index.html` files were authored individually, each with its own layout CSS and interaction JS. `shared/tokens.css` and `shared/base.css` were imported as-is and never edited. `assets/lab-core.*` supplies only optional utilities (theme, ⌘K, dialog, state switcher, tabs, sprite); it is not a page template. The five variant layouts differ on axes A and C, not by colour.

## 2 · Not-due unlock decision (most important)

The captured not-due copy — “This installment is not due yet. Checkout unlocks after you approve delivery or when the studio requests payment.” — must not be read as a broken Pay now button. **Decision: every variant shows “Checkout not available yet” and names both unlock conditions verbatim**, then offers the A3 “what unlocks this” explainer with a real F08 deep link. No variant renders a live “Pay now” endpoint, because **none exists for a not-due installment** and there is no client-side “mark paid” endpoint.

## 3 · Five demo-only CTAs

1. **Download receipt / invoice** — demo dialog; **no real PDF is fetched**, with honest alternatives (F18 invoice list, F16 checkout).
2. **Approve the milestone delivery** — labelled demo of `POST /api/v1/milestones/{id}/approve`; no live milestone mutation.
3. **File a payment dispute** — demo form for `POST /api/v1/payments/{id}/dispute`.
4. **Cancel payment** — labelled demo with a confirmation step.
5. **⌘K actions** — real lab routes only.

## 4 · A-item coverage

| Item | Coverage | Notes |
|---|---|---|
| A3 Unlock explainer | **5/5** | Includes “Checkout not available yet”, the two unlock conditions and the F08 deep link |

C-items C4, C5, C6, C9 and C17 are present in 5/5. The completed copy “This payment has been recorded. Download your receipt or invoice below.”, the `₹22,500.00` hero, Khandesh Spice Final payment, mono reference, Created → Pending → Processing → Completed / Refunded stepper, Billing documents, Download invoice/receipt, dispute and cancellation routes are preserved.

## 5 · Navigation honesty

20 dead F20/F21/F23 nav links in this family were replaced with real `../../../index.html` hrefs plus `data-demo-nav` boundary dialogs. No `href="#"` and no remote asset remains. All five variants have a `noscript` fallback that keeps the terminal copy, amount, documents and legal routes reachable.

## 6 · Known issues

- The “12 days overdue” figure is **derived** from snapshot 26, not captured on `/payments/{id}`; it is labelled where it appears.
- `GET /api/v1/payments/{id}/status` is documented from the spec, but the captured status labels — not invented enums — drive the stepper.
- No live backend, no archived pixel screenshots, no human timing study of “hierarchy <2s”.

## 7 · Winner

**V4 · Unlock Workbench** — see `DELIVERY-REPORT.md` §5.
