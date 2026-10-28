# F17 · Payment Status — Delivery Report (Gate 3)

**Route:** `/payments/{id}` (settled and not-due states) · **Family dir:** `families/F17-payment-status/` · **Authored:** 2026-10-28, five standalone `index.html` files hand-written one at a time (no design-generation script; no branch/commit/push).

## 1 · What shipped

| Variant | Name | A · Geometry | B · Priority | C · Narrative | D · Density | E · Signature interaction |
|---|---|---|---|---|---|---|
| V1 | Status Ledger | sidebar + full-width ledger | verdict-first | static rows | dense tables | Verdict strip + documents / legal footer |
| V2 | Payment Timeline | sticky left rail + stepper | numbers-first | chronological | airy small | Vertical stepper with “why” on each step |
| V3 | Status Wall | bento status wall | numbers-first | status-led | dense tiles | Explicit Refunded terminal state + verdict card |
| **V4 ★** | **Unlock Workbench** | sticky progress + bento | action-first | queue-led | airy | Work queue + “what unlocks this” explainer |
| V5 | Narrative Receipt | single narrative column | narrative-first | static sections | editorial | Documents + legal / dispute / cancellation section |

All five ship the two captured terminal states: completed (“This payment has been recorded. Download your receipt or invoice below.”) and not-due (“This installment is not due yet. Checkout unlocks after you approve delivery or when the studio requests payment.”), plus “Checkout not available yet”, the `₹22,500.00` hero, Khandesh Spice final payment, mono reference, the created → pending → processing → completed / refunded stepper, Billing documents (Download invoice / Download receipt), File a payment dispute, Cancel payment, and the **A3 unlock explainer** with the F08 deep link and a demo-labelled `POST /api/v1/milestones/{id}/approve`.

## 2 · Gate printouts

```
## GATE S (F17)   Screenshots 001/002 + HTML snapshot 30/31 + audit metadata mapped · Gate: PASS
## GATE R (F17)   MD + 10/10 XLSX sheets studied · C/KEEP/A3 unlock rule mapped · Gate: PASS
## GATE A (F17)   5 specs + README read · 13 distinct spec endpoints referenced · 5 demo-only CTAs · Gate: PASS
## GATE T (F17)   6 primary + 4 supplementary queries · 12/≥8 refs opened (R13 search snippet excluded) · Gate: PASS
## GATE 1 (F17)   Concept cards 5/5 · Sketches 5/5 · Difference test PASS · C 5/5 · A3 5/5 · Gate: PASS
## GATE 2a (F17)  V1 pilot hand-built and frozen: 4 states, 2 themes, 5 widths, keyboard end-to-end · Gate: PASS
## GATE 2b (F17)  V2–V5 hand-authored one by one + self-critique · gallery F17 section + manifest 5 records + DECISIONS §9 appended · generator scripts: 0 · Gate: PASS
## GATE 3 (F17)   Variants built by hand: 5/5 · Generator scripts: 0
                  Widths×themes checked: 5 × 2 = 10 per variant (360/390/768/1024/1440 light+dark)
                  Checklist pass: 5/5 · Blockers open: 0 · Gate: PASS
```

## 3 · Verification matrix (measured)

| Check | Result |
|---|---|
| `node --check` on the 10 inline scripts of this family | **0 errors** |
| Script-stripped `href`/`src` target check | **0 broken** · remote assets **0** · `href="#"` **0** · duplicate IDs **0** |
| Chromium 156 headless: 5 variants × 2 themes × 5 widths = **50 page loads** | **0 console errors · 0 page errors · 0 failed requests · 0 page-level horizontal overflow** |
| Interaction suite (⌘K, theme + `aria-pressed`, 4 state pills + Data, `data-demo-nav` boundary dialog + Tab trap + Esc + focus restore, ARIA tabs) | **5/5 PASS** |
| Exhaustive button smoke test | **73 buttons clicked · 0 JS errors · 0 leaked scroll locks** |
| Computed-colour AA sweep, light + dark | **0 text failures** |
| Computed font-size sweep | **0 visible text below 11px** |
| No-JS context | **5/5** render the captured terminal copy, amount, documents and legal nav with no horizontal scroll |
| `reducedMotion: reduce` | **5/5** all `.reveal` content visible |

## 4 · Findings classification

- **Blockers (0 open).** 20 dead F20/F21/F23 nav links in this family replaced with real gallery hrefs + honest `data-demo-nav` boundary dialogs. All five had a `noscript` fallback added.
- **Major (resolved).** The not-due state could be read as a broken “Pay now” button. All five now show “Checkout not available yet” and explain the two unlock conditions verbatim.
- **Minor (known).** “Download invoice / receipt” opens a demo dialog — **no real PDF is fetched**. Honest alternatives (F18 invoice list, F16 checkout) are offered.
- **Minor (known).** “Approve the milestone delivery” is a labelled demo of `POST /api/v1/milestones/{id}/approve`, with no live milestone mutation. Dispute and cancellation are demo forms with confirmations.
- **Minor (known).** The “12 days overdue” figure is **derived** from snapshot 26, not captured on `/payments/{id}`; it is labelled where it appears.
- **Not measured.** “Hierarchy understood in <2s” was not human-timed; only its structural preconditions were verified.

## 5 · Winner

**F17 · V4 “Unlock Workbench” — `families/F17-payment-status/V4/index.html`.** The hardest question on this screen is not “what happened?” but “why can’t I pay yet?”. V4 puts the unlock conditions and the F08 delivery-approval route in the work queue next to the progress stepper, so the not-due state becomes an actionable explanation instead of a dead end. V2 is the clearest pure timeline; V4 is the better product decision.

## 6 · Limitations (stated, not hidden)

- No live backend. Document downloads, dispute filing, cancellation and milestone approval are demo interactions; verified spec paths are documented in `API-MAP.md`, not called.
- There is **no “pay now” endpoint for a not-due installment** and no client-side “mark paid” endpoint. Variants never promise either.
- `GET /api/v1/payments/{id}/status` is documented from the spec, but the captured status labels — not invented enums — drive the stepper.
- The `₹22,500.00` Khandesh Spice final payment, the mono reference and the billing-document labels come from the captured snapshots; no new financial data was invented.
- Pixel screenshots were not archived; light/dark parity is asserted from computed colours and contrast ratios.

## 7 · Preview

```bash
cd /home/user/ui-designing-client-dashboard
python3 -m http.server 8130
# http://localhost:8130/client-portal-lab/                      (gallery)
# http://localhost:8130/client-portal-lab/families/F17-payment-status/V4/index.html
```

Docs: `BASELINE-MAP.md` · `REPORT-STUDY.md` · `API-MAP.md` · `TEMPLATE-RESEARCH.md` · `CONCEPTS.md` · `DECISIONS.md` · this report. Shared evidence: `DECISIONS.md` §9 (lab root), `manifest.json` (F17 records), gallery `index.html` (`#f17`).
