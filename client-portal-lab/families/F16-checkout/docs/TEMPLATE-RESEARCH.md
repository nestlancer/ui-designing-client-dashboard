# F16 · Checkout — TEMPLATE-RESEARCH (Gate T)

**Order:** Gates S (2 screenshots + 2 HTML), R (MD + 10 sheets, C8/C15/C17/C4/C5/C6/C18), A (14 endpoint map) and the complete §4 must-include list (two states, one primary, order summary + hero ₹ + stepper, styled UTR upload, HDFC block, trust strip + chips, UPI-on-desktop note, Invoice/Cancel links, success/failure/verification-pending) were all locked **before** any template search.

**Queries (6):** `checkout page UI best practices single primary CTA Stripe` · `Stripe checkout UI strategies faster transactions sticky summary` · `SaaS billing checkout template order summary stepper` · `bank transfer UPI payment proof upload form UX` · `shadcn checkout data table empty state` · `fintech dashboard design calm trust AA dark mode`.

**References opened (12 — all fetched, shared money-screen pool):**

| # | Ref · URL | Page-job match | Adopted | Rejected |
|---|---|---|---|---|
| R3 | [Stripe · Checkout screen best practices](https://stripe.com/resources/more/checkout-screen-best-practices) | **the** checkout page | persistent itemised summary, **one dominant amount-bearing CTA**, quiet trust, inline error recovery, no surprise fees | guest checkout, shipping, promo codes, ecommerce cart |
| R4 | [Stripe · Checkout UI strategies](https://stripe.com/resources/more/checkout-ui-strategies-for-faster-and-more-intuitive-transactions) | checkout form | minimal ordered fields, collapsible summary, labelled progress/stepper, sticky mobile CTA, inline validation | digital wallets/Apple Pay & express-checkout SDK |
| R7 | [Stripe CustomerSheet](https://docs.stripe.com/elements/customer-sheet) | saved methods in checkout | reuse saved token; add-new inside settings | native SDK sheet |
| R8 | [Shadcn UI Blocks · Saved methods](https://www.shadcn-ui-blocks.com/blocks/ecommerce-pro/account-sections/saved-payment-methods-panel) | honesty | token-only rows, "never saw full number", no silent save | delete/add flows owned by F15, not here |
| R1 | [AdminLTE SaaS dashboards](https://adminlte.io/blog/saas-admin-dashboard-templates/) | money hierarchy | settled vs outstanding, work-queue framing | MRR charts |
| R2 | [AdminLTE Fintech dashboards](https://adminlte.io/blog/fintech-dashboard-design-examples/) | calm money UI | verdict row → money in motion → exceptions, colour reserved for state | trading panels, neon |
| R5 | [shadcn Data Table](https://www.shadcn.io/ui/data-table) | order-summary rows | empty row spans columns, stable skeleton | TanStack dependency |
| R6 | [Shadcn Payment Dashboard](https://shadcnexamples.com/payment-admin-dashboard) | KPI + badges | 3-value strip, dark badge variants | "New Invoice" admin action |
| R9 | [Creative Tim Table Blocks](https://www.creative-tim.com/ui/blocks/application-admin/table) | bank detail panel | copy-friendly detail rows, saved-view style | CSV export |
| R10 | [ShadcnDeck Data Table](https://www.shadcndeck.com/blog/shadcn-data-table) | line items | currency formatting at column-def level, stable empty | framework build |
| R11 | [SaaSFrame dashboards](https://www.saasframe.io/categories/dashboard) | honest states | zero ≠ unknown ≠ unavailable; empty states that teach | marketing cards |
| R12 | [SaaSUI Billing UX](https://www.saasui.design/blog/saas-billing-subscription-ux-patterns) | failure copy | ambiguity becomes distrust; failure = reason + deadline + one-step fix | subscription proration |

Report §5's 13 sources are extended, not replaced (R3≈[3], R1=[9], R2≈[2][13], R5/R10≈[5][12]).

**Adopted → axes:** persistent summary + single CTA (R3/R4) → V1 classic split; vertical stepper rail (R4) → V2; bento summary + sticky mobile CTA (R2/R4) → V3; decision-first dual path (R3 + R11) → V4; single-column narrative + accordion (R12) → V5. Verification-pending and failure copy follows R12 across all five. Trust strip kept near the CTA (R3). Bank details use copy-friendly rows (R9) not a dense table.

**Gate-A cross-check:** all of promo codes, guest checkout, Apple/Google Pay, shipping, real Razorpay SDK calls, subscription proration and CSV exports were **rejected** — no portal endpoint and no captured content. Templates informed composition only.

**No features invented from templates; every CTA is Gate-A or demo-labelled.**

```
## GATE T (F16)
Queries run: 6 primary + 4 supplementary · Refs opened: 12/≥8 (R1–R12 fetched in full, shared with the other money families) · TEMPLATE-RESEARCH.md written: YES
Patterns mapped to V1–V5: YES · No invented API features: YES · Order S→R→A→T respected: YES
Gate: PASS
```

**Honesty note (added 2026-10-28).** Gate T for F16 used the same cross-family pool of 12 fetched refs (R1–R12) opened during the F14 research pass; no additional page was fetched while authoring F16, which is stated rather than hidden. Four later supplementary `web_search` calls (saved methods, checkout one-CTA / persistent summary / trust, payment status / dispute, invoice tables) returned snippets only and are not counted as opened refs. Their corroborating conclusions — one obvious primary action per step, quiet supporting links, sticky mobile final CTA, early all-in total, restrained processor trust cues — were applied to all five variants. No express-checkout SDK, digital wallet or promo-code pattern was adopted because none has a Gate-A endpoint.
