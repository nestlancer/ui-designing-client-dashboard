# F18 · Invoices Archive — TEMPLATE-RESEARCH (Gate T)

**Order:** Gates S (screenshot + HTML + audit), R (MD + 10 sheets; C16/C17/C4/C5/C6/C18; A10), A (11-endpoint map) and the full §4 must-include list (search/filter/pagination/date column/total row, A10 ≥3/5, Awaiting-you queue, C16 card fallback, empty/skeleton/error) were locked **before** any template search.

**Queries (6):** `shadcn data table search filter pagination empty state` · `ShadcnDeck shadcn data table currency column definitions` · `Creative Tim table blocks saved views density row actions` · `shadcn payment admin dashboard KPI cards status badges` · `AdminLTE SaaS admin dashboard templates invoices` · `SaaSFrame zero unknown unavailable empty states dashboard`.

**References opened (12 — all fetched):**

| # | Ref · URL | Page-job match | Adopted | Rejected |
|---|---|---|---|---|
| R5 | [shadcn · Data Table](https://www.shadcn.io/ui/data-table) | **the** invoice table | opt-in sorting/filtering/pagination/visibility; **empty row spans all columns** | TanStack dependency in static HTML |
| R10 | [ShadcnDeck · shadcn Data Table](https://www.shadcndeck.com/blog/shadcn-data-table) | table logic | sort → search → pagination ladder; currency formatting in column defs; stable empty state | React build |
| R9 | [Creative Tim · Table Blocks](https://www.creative-tim.com/ui/blocks/application-admin/table) | row actions | SLA/status filters, saved views, density control, row action menu, empty-state preview | CSV export / bulk select |
| R6 | [Shadcn Payment Dashboard](https://shadcnexamples.com/payment-admin-dashboard) | KPI strip | 3-value KPI strip, status badges dark variants, rows-per-page + pagination | admin "New Invoice" / cash-flow chart |
| R1 | [AdminLTE SaaS dashboards](https://adminlte.io/blog/saas-admin-dashboard-templates/) | invoice KPIs | settled vs outstanding money; failed/past-due items are work queues | MRR/expansion charts |
| R2 | [AdminLTE Fintech dashboards](https://adminlte.io/blog/fintech-dashboard-design-examples/) | hierarchy | verdict row → money in motion → dense filterable table → exceptions; colour reserved for state | cinematic banking styling |
| R11 | [SaaSFrame dashboards](https://www.saasframe.io/categories/dashboard) | honest states | prioritise exceptions with concrete routes; zero ≠ unknown ≠ unavailable | marketing gallery cards |
| R12 | [SaaSUI · Billing UX](https://www.saasui.design/blog/saas-billing-subscription-ux-patterns) | copy | calm exactness; failure states need reason + deadline + one-step fix | pricing-page upsell |
| R3 | [Stripe · Checkout best practices](https://stripe.com/resources/more/checkout-screen-best-practices) | trust | quiet trust strip, inline recovery | guest checkout |
| R4 | [Stripe · Checkout UI strategies](https://stripe.com/resources/more/checkout-ui-strategies-for-faster-and-more-intuitive-transactions) | mobile | sticky mobile CTA, labelled progress | digital wallets |
| R7 | [Stripe CustomerSheet](https://docs.stripe.com/elements/customer-sheet) | settings-level docs | add/remove/default outside checkout | native SDK sheet |
| R8 | [Shadcn UI Blocks · Saved methods](https://www.shadcn-ui-blocks.com/blocks/ecommerce-pro/account-sections/saved-payment-methods-panel) | honesty | token-only rows, "delete means delete" footer | real card-brand artwork |

Report §5's 13 sources are extended (R5/R10≈[5][12], R1=[9], R2≈[2][13], R9≈[7]).

**Adopted → axes:** opt-in table ladder + empty row (R5/R10) → V1 dense ledger; saved-view rail + detail drawer (R9/R7) → V2; KPI strip + bento + card crossfade (R6/R2) → V3; workbench queue + filter rail + drawer (R1/R9/R11) → V4; chapter accordion + teaching empty + sticky CTA (R12/R3/R4) → V5. Mobile card-fallback (C16) in all five; dark badge variants (R6) in all five; A10 honesty (R12) in V1/V2/V4/V5.

**Gate-A cross-check:** templates showing CSV export, "New Invoice", cash-flow charts, real PDF statement generation or TanStack-only behaviours were **rejected** — no portal endpoint and no captured content. Templates informed composition only.

**No features invented from templates; every CTA is Gate-A or demo-labelled.**

```
## GATE T (F18)
Queries run: 6 primary + 4 supplementary · Refs opened: 12/≥8 (R1–R12 fetched in full, shared with the other money families) · TEMPLATE-RESEARCH.md written: YES
Patterns mapped to V1–V5: YES · No invented API features: YES · Order S→R→A→T respected: YES
Gate: PASS
```

**Honesty note (added 2026-10-28).** Gate T for F18 reused the 12 refs fetched for the F14 research pass; no additional page was opened while authoring this family. Four later supplementary `web_search` calls returned snippets only (not opened refs): distinguish first-use from no-filter-results empty states, and combine sortable columns + search + status filter + pagination + a filtered total. Those conclusions were applied in V1/V2/V4/V5; V3 is intentionally static. There is still **no statement or GST endpoint** — A10 is a demo-labelled composition of five real `GET /api/v1/invoices/{id}/download` calls, never an invented API.
