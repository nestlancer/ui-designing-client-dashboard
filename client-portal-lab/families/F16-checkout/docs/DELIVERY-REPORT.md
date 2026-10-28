# F16 · Checkout — Delivery Report (Gate 3)

**Route:** `/payments/{id}` (amount-due state) · **Family dir:** `families/F16-checkout/` · **Authored:** 2026-10-28, five standalone `index.html` files hand-written one at a time (no design-generation script; no branch/commit/push).

## 1 · What shipped

| Variant | Name | A · Geometry | B · Priority | C · Narrative | D · Density | E · Signature interaction |
|---|---|---|---|---|---|---|
| **V1 ★** | **Split Summary Classic** | sticky summary + tabs | verdict-first | tab-led | balanced | Tabbed Online / Manual methods with verified captions |
| V2 | Guided Stepper | full-width stepper | numbers-first | step-led | dense | 5 explicit states; one primary CTA on every step |
| V3 | Bento Cash Desk | unequal bento | numbers-first | object-led | dense tiles | Copy-to-clipboard account details + honest UTR form |
| V4 | Dual-Path Choice | equal halves | action-first | choice-led | airy | `Lab.$$` scoped to the variant root; explicit Data/Empty/Loading/Error |
| V5 | Narrative Receipt | single narrative column | narrative-first | static sections | editorial | Long-form “how this payment works” + receipt dropzone |

All five ship: “Pay online”, **exactly one primary** “Proceed to secure checkout”, the helper “Card, netbanking, wallets, or UPI (QR) in Razorpay’s secure window”, the full **UPI-on-desktop** honesty note, “Bank / UPI transfer” with the captured `₹30,000.00` and HDFC details, UTR / Notes / Receipt + “Submit for verification”, the created → pending → processing → completed / refunded stepper, order summary with the captured reference, trust strip and processor chips.

## 2 · Gate printouts

```
## GATE S (F16)   Screenshots 010/042 + HTML snapshot 28/29 + audit metadata mapped · Gate: PASS
## GATE R (F16)   MD + 10/10 XLSX sheets studied · C/KEEP/C8 one-primary rule mapped · Gate: PASS
## GATE A (F16)   5 specs + README read · 16 distinct spec endpoints referenced · 5 demo-only CTAs · Gate: PASS
## GATE T (F16)   6 primary + 4 supplementary queries · 12/≥8 refs opened (R13 search snippet excluded) · Gate: PASS
## GATE 1 (F16)   Concept cards 5/5 · Sketches 5/5 · Difference test PASS · C 5/5 · P1 A 5/5 · Gate: PASS
## GATE 2a (F16)  V1 pilot hand-built and frozen: 4 states, 2 themes, 5 widths, keyboard end-to-end · Gate: PASS
## GATE 2b (F16)  V2–V5 hand-authored one by one + self-critique · gallery F16 section + manifest 5 records + DECISIONS §9 appended · generator scripts: 0 · Gate: PASS
## GATE 3 (F16)   Variants built by hand: 5/5 · Generator scripts: 0
                  Widths×themes checked: 5 × 2 = 10 per variant (360/390/768/1024/1440 light+dark)
                  Checklist pass: 5/5 · Blockers open: 0 · Gate: PASS
```

## 3 · Verification matrix (measured)

| Check | Result |
|---|---|
| `node --check` on the 10 inline scripts of this family | **0 errors** (F16 V5 stray `)` and V4 root-scoped `Lab.$$` both repaired) |
| Script-stripped `href`/`src` target check | **0 broken** · remote assets **0** · `href="#"` **0** · duplicate IDs **0** |
| Chromium 156 headless: 5 variants × 2 themes × 5 widths = **50 page loads** | **0 console errors · 0 page errors · 0 failed requests · 0 page-level horizontal overflow** |
| Interaction suite (⌘K, theme + `aria-pressed`, 4 state pills + Data, `data-demo-nav` boundary dialog + Tab trap + Esc + focus restore, ARIA tabs) | **5/5 PASS** |
| Exhaustive button smoke test | **76 buttons clicked · 0 JS errors · 0 leaked scroll locks** |
| Computed-colour AA sweep, light + dark | **0 text failures** |
| Computed font-size sweep | **0 visible text below 11px** |
| No-JS context | **5/5** render the captured account details, amount, reference and nav with no horizontal scroll |
| `reducedMotion: reduce` | **5/5** all `.reveal` content visible |

## 4 · Findings classification

- **Blockers (0 open).** 24 dead F20/F21/F23 nav links plus F16 V2's four dead links replaced with gallery hrefs + `data-demo-nav` boundary dialogs. F16 V5's extra `)` syntax error fixed.
- **Major (resolved).** F16 V2–V5 had only 3 state pills (`Empty/Loading/Error`) with no way back to the real data view. Each now has an explicit **Data** pill returning to the captured state.
- **Major (resolved).** F16 V1's copy-to-clipboard used `navigator.clipboard.writeText()` without handling rejection, producing three unhandled promise rejections in the exhaustive button test. It now catches both sync and async failures and tells the user to select-and-copy.
- **Minor (known).** C8 “exactly one primary” is interpreted as one primary per visible decision context; the manual-transfer submit is a secondary button in the same page, not a competing hero. This interpretation is recorded in `DECISIONS.md` §9.
- **Minor (known).** “UPI (QR) in Razorpay’s secure window” is a captured string, **not** a promise of a proven desktop UPI-ID flow. Variants keep the longer honesty note that UPI ID entry may be unavailable on desktop and that the QR must be scanned with a phone.
- **Not measured.** “Hierarchy understood in <2s” was not human-timed; only its structural preconditions (one `<h1>`, one hero, KPI value+label+why where present) were verified.

## 5 · Winner

**F16 · V1 “Split Summary Classic” — `families/F16-checkout/V1/index.html`.** Checkout is a trust decision. V1 keeps one unambiguous primary CTA next to a sticky order summary, puts the UPI-on-desktop caveat where it belongs, and never hides the manual transfer path behind a tab you cannot find. V2's stepper is clearer for first-time payers but adds clicks to a high-stakes action.

## 6 · Limitations (stated, not hidden)

- **“Proceed to secure checkout” does not open Razorpay.** It is a labelled demo of `create-intent → initiate → confirm` with success / pending / failure switches. No payment is created.
- “Submit for verification” is a labelled demo of `POST /api/v1/payments/bank-transfer/submit` with **no live UTR validation**. Receipt dropzone is `FileReader`-only; no media upload occurs.
- Copy-to-clipboard for A/C / IFSC / UPI is a local convenience, not an API action. No guest checkout, promo-code, currency-converter or statement endpoint exists.
- `payments.openapi.json` has no named Payment DTO / enum schemas and no top-level enum schemas; status labels and currency are the captured UI strings.
- Pixel screenshots were not archived; light/dark parity is asserted from computed colours and contrast ratios.
- The HDFC account, IFSC and UPI VPA strings are captured from the portal snapshot and are reproduced verbatim — they are lab fixtures, not live banking details.

## 7 · Preview

```bash
cd /home/user/ui-designing-client-dashboard
python3 -m http.server 8130
# http://localhost:8130/client-portal-lab/                      (gallery)
# http://localhost:8130/client-portal-lab/families/F16-checkout/V1/index.html
```

Docs: `BASELINE-MAP.md` · `REPORT-STUDY.md` · `API-MAP.md` · `TEMPLATE-RESEARCH.md` · `CONCEPTS.md` · `DECISIONS.md` · this report. Shared evidence: `DECISIONS.md` §9 (lab root), `manifest.json` (F16 records), gallery `index.html` (`#f16`).
