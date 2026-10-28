# F15 · Payment Methods — Family Decisions

**Authored:** 2026-10-28 · Hand-written, one variant at a time. No generator script, no shared megatemplate, no branch/commit/push. Shared evidence: `/client-portal-lab/DECISIONS.md` §9. Winner and full QA: `DELIVERY-REPORT.md`.

## 1 · Hand-authorship attestation

Five standalone `index.html` files were authored individually, each with its own layout CSS and interaction JS. `shared/tokens.css` and `shared/base.css` were imported as-is and never edited. `assets/lab-core.*` supplies theme, ⌘K, focus-trapped dialog, state switcher, ARIA tabs and a local SVG sprite — utilities, not a template. The 40 sibling manifest records were left byte-for-byte unchanged.

## 2 · UPI AutoPay mandate decision (most important)

No spec exposes a UPI-mandate, card-verification or raw-card-token endpoint. **Decision: explain mandates, never enable them.** Variants include an explanatory panel covering explicit customer authorization, pre-debit notification, pause/cancel and the fact that a mandate is a separate consent object — but no variant presents a working “enable AutoPay” switch as if it were backed by the API. The spec's `AddPaymentMethodDto.type` is a free string, so no invented card-brand enum was added.

## 3 · Five demo-only CTAs

1. **UPI AutoPay mandate create / pause / cancel** — no endpoints; explanatory copy only.
2. **Add card** — demonstrates the `POST /api/v1/payments/methods` payload with a **fake `tokenId`**; labelled demo, no Razorpay SDK.
3. **Saved method rows** — labelled sample tokens, never presented as captured production data.
4. **Verify card** — no endpoint; **never shown as an action**.
5. **⌘K actions** — real lab routes only.

## 4 · A-item coverage

| Item | Coverage | Notes |
|---|---|---|
| A6 Methods management (add / rename / remove / make-primary) | **5/5** | All demo-labelled with the empty state intact |

C-items C4, C5, C6, C8 and C17 are present in 5/5. The captured KPI strip (`₹81,500 / ₹31,875 / ₹0`), trust strip, processor chips (UPI · Cards · Netbanking · Wallets), “No saved methods yet” and “Go to payments” are preserved verbatim.

## 5 · Navigation honesty

20 dead F20/F21/F23 nav links in this family were replaced with real `../../../index.html` hrefs plus `data-demo-nav` boundary dialogs. No `href="#"` and no remote asset remains. All five variants gained a `noscript` fallback after QA found none.

## 6 · Known issues

- V2–V5 use native `window.prompt()` for rename. It is functional and keyboard-reachable but is **not** the styled focus-trapped `Lab.openDlg` used elsewhere. Recorded rather than hidden.
- No live backend. No real PDF, mandate or payment method is created.
- No archived pixel screenshots; light/dark parity is asserted from computed colours and contrast ratios.

## 7 · Winner

**V3 · Card Deck** — see `DELIVERY-REPORT.md` §5.
