# F15 · Payment Methods — TEMPLATE-RESEARCH (Gate T)

**Order:** S → R → A complete (incl. `API-MAP.md`) and §4 UI requirements restated (route `/payments/methods`, one captured empty state, explainer, trust strip, chips, A6, C4/C5/C6/C17/C18, add flows with validation/success/failure, primary/remove/confirm) **before** searching.

**Queries (5):** `saved payment methods screen UI pattern default card nickname UPI mandate empty state design` · `Stripe customer sheet manage payment methods settings UI` · `checkout page UI design single primary CTA trust strip` · `invoice list archive UI table search filter pagination` · `UPI AutoPay mandate dashboard UX RBI dark patterns 2026`.

**References opened (12, shared money-screen pool — all fetched):**

| # | Ref · URL | Page-job match | Adopted | Rejected |
|---|---|---|---|---|
| R7 | [Stripe CustomerSheet](https://docs.stripe.com/elements/customer-sheet) | settings-level method management | add / remove / set-default inside settings, local default | native SDK sheet, Apple/Google Pay |
| R8 | [Shadcn UI Blocks · Saved Payment Methods](https://www.shadcn-ui-blocks.com/blocks/ecommerce-pro/account-sections/saved-payment-methods-panel) | ruled token rows | honesty lede + "delete means delete" + "no silent save" footer | real card-brand logos (not captured) |
| R1 | [AdminLTE SaaS dashboards](https://adminlte.io/blog/saas-admin-dashboard-templates/) | customer-facing billing care | design this page as carefully as admin billing | MRR/expansion metrics |
| R2 | [AdminLTE Fintech dashboards](https://adminlte.io/blog/fintech-dashboard-design-examples/) | money hierarchy | Mercury restraint, Stripe tables, "verdict row" | trading panels |
| R3 | [Stripe Checkout best practices](https://stripe.com/resources/more/checkout-screen-best-practices) | CTA + trust | one distinct CTA, quiet security signals, inline errors | guest checkout |
| R4 | [Stripe Checkout UI strategies](https://stripe.com/resources/more/checkout-ui-strategies-for-faster-and-more-intuitive-transactions) | forms | persistent summary, stepper, sticky mobile CTA | digital wallets |
| R5 | [shadcn Data Table](https://www.shadcn.io/ui/data-table) | list states | empty row spans all columns, skeleton rows | TanStack dependency |
| R6 | [Shadcn Payment Dashboard](https://shadcnexamples.com/payment-admin-dashboard) | KPI strip | 3-value strip + status badges dark variants | "New Invoice"/charts |
| R9 | [Creative Tim Table Blocks](https://www.creative-tim.com/ui/blocks/application-admin/table) | row actions | saved views, density, row action menu, empty preview | CSV export / bulk select |
| R10 | [ShadcnDeck Data Table](https://www.shadcndeck.com/blog/shadcn-data-table) | list logic | sort → search → pagination feature ladder | React build |
| R11 | [SaaSFrame dashboards](https://www.saasframe.io/categories/dashboard) | honest states | zero ≠ loading ≠ error; "empty states that teach" | marketing cards |
| R12 | [SaaSUI Billing UX](https://www.saasui.design/blog/saas-billing-subscription-ux-patterns) | calm/exact | calm billing voice, one-step failure recovery | plan proration flows |
| R13 | [UPI AutoPay mandate UX flaw](https://medium.com/@designstudiouiux/upi-autopay-mandate-the-ux-flaw-rbi-caught-b44cdb6b4b2a) (search result studied) | mandate panel | list mandates with amount/next debit/one-tap cancel + explicit consent | real mandate creation — **no endpoint**, demo only |

Report §5's 13 sources are extended, not replaced (R1=[9], R2≈[2][13], others fresh).

**Adopted → axes:** token-row honesty (R8) → V1 ledger; settings rail + add drawer (R7) → V2; card deck / display layout (R8 + R2) → V3; stepper + inline errors (R3/R4) → V4; empty-state teaching + sticky CTA (R11) → V5; dark-mode badge variants (R6) → all; distinct zero/skeleton/error (R5/R11) → all.

**Gate-A cross-check:** templates showing mandate creation, card verification, brand logos or CSV export were **dropped or marked inspiration-only** — no client endpoint exists. UPI-mandate UI is demo-labelled.

**No features invented from templates; all CTAs still Gate-A or demo-labelled.**

```
## GATE T (F15)
Queries run: 5 primary + 4 supplementary · Refs opened: 12/≥8 (R1–R12 fetched in full; R13 is a search snippet only) · TEMPLATE-RESEARCH.md written: YES
Patterns mapped to V1–V5: YES · No invented API features: YES · Order S→R→A→T respected: YES
Gate: PASS
```

**Honesty note (added 2026-10-28).** R13 (“UPI AutoPay mandate UX flaw”) was studied from a **search-result snippet**, never opened — it is correctly labelled “search result studied” in the table and is **excluded** from the opened-ref count. Four later supplementary `web_search` calls (saved-method / empty-state, checkout one-CTA / trust, payment-status / dispute, invoice-table patterns) likewise returned snippets only; they corroborated default-first ordering, nicknames and explicit mandate authorization but were not fetched and are not counted. Stripe's own guidance that future UPI charges require explicit customer authorization is why every mandate in F15 is demo-labelled and no `POST …/mandates` endpoint is claimed.
