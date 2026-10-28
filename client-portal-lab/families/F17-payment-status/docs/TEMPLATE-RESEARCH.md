# F17 · Payment Status — TEMPLATE-RESEARCH (Gate T)

**Order:** Gates S (2 screenshots + 2 HTML), R (MD + 10 sheets; C9/C17/C4/C5/C6/C18; A3 P1), A (12-endpoint map) and the full §4 must-include list (both states, receipt/invoice + Billing documents + dispute + stepper, verbatim not-due copy, "Checkout not available yet", C9/A3 deep link, money grammar) were locked **before** any template search.

**Queries (6):** `payment status page UI completed receipt invoice dispute link` · `SaaSUI billing subscription UX ambiguity distrust failure states` · `SaaSFrame dashboard empty states zero unknown unavailable` · `Stripe checkout UI strategies labelled progress stepper` · `Stripe checkout best practices trust quiet security` · `shadcn data table status badge dark mode AA`.

**References opened (12 — all fetched):**

| # | Ref · URL | Page-job match | Adopted | Rejected |
|---|---|---|---|---|
| R12 | [SaaSUI · Billing & Subscription UX](https://www.saasui.design/blog/saas-billing-subscription-ux-patterns) | status copy | calm exactness; ambiguity becomes distrust; failure = reason + deadline + one-step fix | pricing-page upsell tone |
| R11 | [SaaSFrame dashboards](https://www.saasframe.io/categories/dashboard) | honest states | prioritise exceptions with concrete routes; zero ≠ unknown ≠ unavailable | gallery aesthetics |
| R4 | [Stripe · Checkout UI strategies](https://stripe.com/resources/more/checkout-ui-strategies-for-faster-and-more-intuitive-transactions) | stepper | labelled progress, subdued secondary actions, sticky mobile CTA | express checkout |
| R3 | [Stripe · Checkout best practices](https://stripe.com/resources/more/checkout-screen-best-practices) | trust | quiet security signals, inline recovery, no surprise fees | guest checkout |
| R2 | [AdminLTE Fintech dashboards](https://adminlte.io/blog/fintech-dashboard-design-examples/) | money hierarchy | verdict row → money in motion → exceptions; colour reserved for state | trading panels |
| R1 | [AdminLTE SaaS dashboards](https://adminlte.io/blog/saas-admin-dashboard-templates/) | work queues | failed/past-due items are actionable work | MRR charts |
| R5 | [shadcn Data Table](https://www.shadcn.io/ui/data-table) | doc lists | empty row spans columns; skeleton rows | TanStack dependency |
| R6 | [Shadcn Payment Dashboard](https://shadcnexamples.com/payment-admin-dashboard) | badges | 3-value KPI strip + dark badge variants | "New Invoice" admin action |
| R7 | [Stripe CustomerSheet](https://docs.stripe.com/elements/customer-sheet) | method context | saved token reuse language | native SDK sheet |
| R8 | [Shadcn UI Blocks · Saved methods](https://www.shadcn-ui-blocks.com/blocks/ecommerce-pro/account-sections/saved-payment-methods-panel) | honesty | "never saw full number", no silent save | delete flows (F15) |
| R9 | [Creative Tim Table Blocks](https://www.creative-tim.com/ui/blocks/application-admin/table) | doc versions | status filters, saved views, row actions | CSV export |
| R10 | [ShadcnDeck Data Table](https://www.shadcndeck.com/blog/shadcn-data-table) | doc rows | currency formatting + stable empty state | framework build |

Report §5's 13 sources are extended (R12≈[6], R2≈[2][13], R1=[9], R5/R10≈[5][12]).

**Adopted → axes:** verdict + "what unlocks this" (R12/R11) → V1 classic split; milestone timeline rail (R4) → V2; bento status + crossfade state switch (R2/R6) → V3; decision/unlock workbench with drawer (R11/R9) → V4; narrative receipt + accordion + sticky CTA (R3/R12) → V5. All five keep the dispute link first-class (R12 legal) and use labelled steppers (R4).

**Gate-A cross-check:** templates suggesting "pay now" on a not-due installment, subscription proration, real PDF generation, admin reconciliation or native SDK sheets were **rejected** — no client endpoint or captured content. Templates informed composition only.

**No features invented from templates; every CTA is Gate-A or demo-labelled.**

```
## GATE T (F17)
Queries run: 6 primary + 4 supplementary · Refs opened: 12/≥8 (R1–R12 fetched in full, shared with the other money families) · TEMPLATE-RESEARCH.md written: YES
Patterns mapped to V1–V5: YES · No invented API features: YES · Order S→R→A→T respected: YES
Gate: PASS
```

**Honesty note (added 2026-10-28).** Gate T for F17 reused the 12 refs already fetched for the F14–F18 research pool; no additional page was opened while authoring this family. Four later supplementary `web_search` calls returned snippets only (not opened refs): milestone evidence progressing Delivered→Under review→Accepted→Invoiced→Approved→Paid, disputed status as a temporary state needing resolution, and the need to distinguish final from non-final payment states. Those snippets corroborate the A3 unlock explainer and the Completed / Not-due-yet / Refunded distinction; they are not cited as fetched sources. The `POST /api/v1/milestones/{id}/approve` action remains demo-labelled.
