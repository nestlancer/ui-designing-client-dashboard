# F16 · Checkout — Family Decisions

**Authored:** 2026-10-28 · Hand-written, one variant at a time. No generator script, no shared megatemplate, no branch/commit/push. Shared evidence lives in `/client-portal-lab/DECISIONS.md` §9; this file records the family-specific calls that a reviewer would otherwise have to reverse-engineer.

## 1 · C8 “exactly one primary” interpretation

The prompt requires **one primary CTA** on checkout. Interpreted as: **one primary per visible decision context**, namely “Proceed to secure checkout” inside Pay online. The manual-transfer “Submit for verification” is deliberately a secondary button — it is an alternative path, not a competing hero. No variant renders two filled primary buttons side by side. This is recorded rather than silently resolved because the spec forbids a second primary but also requires the UTR form to be usable.

## 2 · Honesty locks (never crossed)

- “Pay online”, the helper “Card, netbanking, wallets, or UPI (QR) in Razorpay’s secure window”, and the full UPI-on-desktop caveat are **captured / required strings**. The longer caveat says UPI ID entry may be unavailable on desktop and that the QR must be scanned with a phone.
- “Proceed to secure checkout” **never opens Razorpay**. It is a labelled demo of verified `POST /api/v1/payments/create-intent` → `/initiate` → `/confirm` with success / pending / failure switches. No payment is created and no processor SDK is loaded.
- “Submit for verification” is a labelled demo of `POST /api/v1/payments/bank-transfer/submit` with **no live UTR validation**. The receipt dropzone is `FileReader`-only; no media upload is attempted.
- Copy-to-clipboard for A/C / IFSC / UPI is a local convenience, not an API action. It handles `navigator.clipboard` rejection explicitly (found as three unhandled promise rejections during the exhaustive button test).
- Bank details are captured verbatim: `Nestlancer Pvt Ltd · HDFC Bank · A/C 50200012345678 · IFSC HDFC0001234 · UPI nestlancer@hdfcbank`. They are lab fixtures, not live banking credentials.

## 3 · Five demo-only CTAs (mirrors `API-MAP.md`)

1. Proceed to secure checkout — processor hand-off demo.
2. Submit for verification — UTR submission demo.
3. Receipt / screenshot dropzone — local file preview only.
4. Copy account details — clipboard convenience only.
5. ⌘K actions — real lab routes only, never invented API calls.

## 4 · Shared primitives vs. per-variant CSS

All five import `shared/tokens.css`, `shared/base.css`, `assets/lab-core.css`, `assets/lab-core.js` and `assets/lab-icons.svg`. `shared/` was **never edited** — it is imported as-is. Each variant carries its own hand-written layout CSS in a `<style>` block. F16 V4 scopes `Lab.$$` to its variant root so the shared helper cannot leak into sibling panels. F16 V2–V5 gained an explicit **Data** state pill after QA found no way back from Empty/Loading/Error.

## 5 · Navigation honesty

24 dead F20/F21/F23 nav links plus V2's four dead links were replaced with real `../../../index.html` hrefs plus `data-demo-nav` boundary dialogs stating that those families are not built in this lab. No `href="#"` and no remote asset remains. Any cross-family link that is not a real route opens the gallery.

## 6 · Coverage record

| Requirement | Variants |
|---|---|
| C4 badge contrast · C5 single blue ramp · C6 tokenised cards · C8 one primary · C15 styled upload · C16 mobile table fallback · C17 compressed shell · C18 larger H1/money | 5/5 |
| Captured stepper Created → Pending → Processing → Completed / Refunded | 5/5 |
| Captured order summary (Amount due / Currency / Reference / Created) | 5/5 |
| Trust strip + processor chips + legal / dispute / cancellation routes findable | 5/5 |
| A3 unlock explainer context (F17) + F08 project hub context | 5/5 |

## 7 · Winner

**V1 · Split Summary Classic.** See `DELIVERY-REPORT.md` §5 for the rationale.
