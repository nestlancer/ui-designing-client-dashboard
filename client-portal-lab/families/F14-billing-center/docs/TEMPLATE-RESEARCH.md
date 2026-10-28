# F14 · Billing Center — TEMPLATE-RESEARCH (Gate T)

**Order respected:** Gates S → R → A completed and `API-MAP.md` written first; complete UI requirements from prompt §4 (routes `/payments`, 1 state, content lock, C16/C17/C4/C5/C6/C18, A1/A5/A10/A12, KEEP) restated before any search. Only then were templates researched.

## Search queries run (6)

1. `SaaS billing dashboard UI design ledger vs work queue failed payments aged invoices pattern 2026`
2. `checkout page UI design single primary CTA trust strip Stripe Razorpay best practices`
3. `invoice list archive UI table design search filter pagination total row shadcn admin template`
4. `saved payment methods screen UI pattern default card nickname UPI mandate empty state design`
5. `fintech dashboard transactions feed exceptions work queue Mercury Stripe Ramp`
6. `shadcn data table saved views density mobile card fallback`

## References actually opened (12 — all fetched, not inferred)

| # | Name · URL | Page-job match | Patterns adopted | Patterns rejected + why |
|---|---|---|---|---|
| R1 | [22 Best SaaS Dashboard Templates 2026 · AdminLTE](https://adminlte.io/blog/saas-admin-dashboard-templates/) | Billing ledger | "**Separate the money you have from the money you are owed**"; failed payments / aged invoices are **work queues, not metrics**; ledger rows with date + counterparty + status + signed amount | MRR/churn/expansion metrics — no Gate-A endpoint, not a client portal |
| R2 | [Fintech Dashboard Design: 9 Real Products · AdminLTE](https://adminlte.io/blog/fintech-dashboard-design-examples/) | Money hierarchy | Mercury editorial restraint, Stripe dense filterable table, Ramp work queues, Brex exception-first; "**verdict row** … largest type" | Trading/P&L panels, charts-as-hero — invent features |
| R3 | [Checkout screen best practices · Stripe](https://stripe.com/resources/more/checkout-screen-best-practices) | Checkout sibling | One visually distinct CTA, quiet trust signals, honest error handling | Guest checkout / promo codes — not in Nestlancer |
| R4 | [Checkout UI strategies · Stripe](https://stripe.com/resources/more/checkout-ui-strategies-for-faster-and-more-intuitive-transactions) | Checkout sibling | Persistent order summary, stepper, sticky mobile CTA, inline errors | Digital wallets / Apple Pay — Razorpay chips are the captured method set |
| R5 | [shadcn Data Table](https://www.shadcn.io/ui/data-table) | Billing + invoice tables | Empty row spanning all columns, pagination footer "Page x of y", sortable header buttons, column visibility | TanStack v9 dependency — lab is offline vanilla JS |
| R6 | [Shadcn Payment Admin Dashboard](https://shadcnexamples.com/payment-admin-dashboard) | Payment dashboard | KPI strip → cash-flow → **All Invoices** table with status badges + row actions + "rows per page" | Recharts cash-flow chart + "New Invoice" — no client endpoint / invented CTA |
| R7 | [Stripe CustomerSheet](https://docs.stripe.com/elements/customer-sheet) | F15 sibling | Settings-level saved-method management, add/remove/default | Native SDK sheet — lab is hand-built offline |
| R8 | [Saved Payment Methods Panel · Shadcn UI Blocks](https://www.shadcn-ui-blocks.com/blocks/ecommerce-pro/account-sections/saved-payment-methods-panel) | F15 sibling | Ruled token rows, **honesty lede** ("Every row is a token…"), delete-means-delete footer | Brand card logos (Visa/Mastercard) — captured UI has none |
| R9 | [Creative Tim Table Blocks](https://www.creative-tim.com/ui/blocks/application-admin/table) | F14/F18 tables | Advanced table with **saved views**, density controls, status filters, empty-state preview, row action menus | CSV export / bulk select — no Gate-A endpoint |
| R10 | [ShadcnDeck Data Table variants](https://www.shadcndeck.com/blog/shadcn-data-table) | F14/F18 tables | Feature ladder: sort → search → pagination → column visibility; formatting belongs in the column def | React/Tailwind build — no framework allowed |
| R11 | [SaaSFrame dashboard examples](https://www.saasframe.io/categories/dashboard) | Empty/honest states | "**Prioritize exceptions that lead to concrete work**"; keep zero / unknown / unavailable **distinct** (skeleton ≠ zero ≠ error) | Product marketing cards |
| R12 | [SaaS Billing UX Patterns · SaaSUI Design](https://www.saasui.design/blog/saas-billing-subscription-ux-patterns) | All money screens | "Billing … has to be **calm and exact**"; failure states tell what went wrong + one-step fix | Plan upgrade/downgrade/proration flows — no endpoint, not in captured IA |

Report §5's 13 sources are extended, not replaced (R1 = [9], R2 ≈ [2][13], R3/R4/R7/R8/R9/R10/R11/R12 are fresh).

## Adopted patterns → V1–V5 axes (§8.2)

| Pattern (ref) | V1 | V2 | V3 | V4 | V5 |
|---|---|---|---|---|---|
| Settled vs outstanding split (R1) | ● primary | ● | ● | ● hero | ● bento |
| Work queue / exceptions (R1, R2, R11) | ● sticky rail | ● top strip | ● queue-led | ● age chips | ● tile |
| Dense sortable table (R2, R5, R9, R10) | ● ledger | ● full-width | ● | ● | ● card grid |
| Verdict row + big number (R2, R12) | ● | ● | ● | ● dominant | ● |
| Saved views / density (R9) | ● A12 | ● A12 | — | ● A12 | — |
| Honest empty / skeleton / error (R11, R12) | ● | ● | ● | ● | ● |
| Persistent summary + stepper (R4) | — | — | ● drawer | ● rail | — |
| Card/bento geometry (R6) | — | — | — | ● | ● |
| Token-row honesty (R8) | ● microcopy | ● | ● | ● | ● |

## Gate-A cross-check

Templates suggested MRR charts, CSV export, bulk refunds, new-invoice creation, mandate dashboards and AI chat backends — **all dropped or marked inspiration-only** because `payments.openapi.json` has no such client endpoint. A1 Ask-AI remains a demo-labelled, deterministic assistant over frozen rows; A10 statement remains demo-labelled.

**No features invented from templates; all CTAs still Gate-A or demo-labelled.**

```
## GATE T (F14)
Queries run: 6 primary + 4 supplementary · Refs opened: 12/≥8 (R1–R12 fetched in full) · TEMPLATE-RESEARCH.md written: YES
Patterns mapped to V1–V5: YES · No invented API features: YES · Order S→R→A→T respected: YES
Gate: PASS
```

**Honesty note (added 2026-10-28).** “Refs opened: 12” counts only R1–R12 — each was fetched and read in full during Gate T. Four later supplementary `web_search` calls (saved-method / empty-state patterns; checkout one-CTA / persistent-summary / trust; payment-status / receipt / dispute / milestone-unlock; invoice-table filter / pagination / empty-state) returned **snippets only**. Those snippets corroborated the already-opened refs (default saved method first, optional nicknames, explicit UPI mandate consent, one obvious primary action, sticky mobile CTA, quiet trust cues, final vs non-final payment states, first-use vs no-results empty states) but were **never fetched**, are **not** cited as opened refs, and are **not** counted in the 12. No template pattern was promoted into a CTA without a Gate-A endpoint.
