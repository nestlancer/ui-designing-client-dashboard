# F14 · Billing Center — CONCEPTS (Gate 1, printed BEFORE code)

Locked content: `Billing Center` / "Payment history, invoices, and milestone payment tracking." · KPIs **Total paid ₹81,500.00 · Pending ₹31,875.00 · In dispute ₹0.00** · links `Invoices`, `Payment methods` · table `Date · Description · Project · Status · Amount · Actions` · filter `All statuses · Not due yet · Processing · Completed · Failed · Refunded` · 11 frozen rows · `View` / `Checkout` · Razorpay strip + `UPI · Cards · Netbanking · Wallets`.

## F14 · V1 "Settled & Outstanding Ledger"
Keeps: all frozen content above.
Fixes/Adds: C16, C17, C4, C5, C6, C18 · A1, A5, A10, A12.
Axes: **A** = 2-col (sticky queue rail + ledger) · **B** = verdict-first · **C** = static sections · **D** = ledger/print · **E** = filter-chips + count-up.
```
┌─────────────────────────── shell (232 + 64) ───────────────────────────┐
│ Verdict line: "₹31,875.00 outstanding across 4 payments"               │
│ ┌──── hero ₹81,500.00 ────┬─ Pending ─────┬─ In dispute ─────────────┐  │
│ └─────────────────────────┴──────────────┴───────────────────────────┘  │
│ ┌─────── ledger (2/3) ───────────────┐ ┌── sticky rail (1/3) ───────┐  │
│ │ chips: All | Settled | Outstanding │ │ A5 work queue (2 verifying) │  │
│ │ search · sort · table · pager      │ │ A1 Ask AI                   │  │
│ │ TOTAL row                          │ │ A10 Statement (demo)        │  │
│ └────────────────────────────────────┘ └─────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```
Signature: chips re-cut the ledger into **settled vs outstanding** with a live total row.
API: `GET /payments`, `/payments/stats`, `/payments/{id}`, `/invoices`, `create-intent`, `/webhooks/razorpay` (+ admin `/verify`).
Refs: R1, R2, R5. Shell: 232/64, Explore popover. Dark/375: tinted status tokens; table → cards. Risk: rail must not pin over the pager at 768px.

## F14 · V2 "Dense Ops Table"
Keeps: same. Fixes/Adds: C16, C17, C4, C5, C6, C18 · A1, A12, A10.
Axes: **A** = single full-width column · **B** = numbers-first · **C** = tab-led (`All / Settled / Outstanding`) · **D** = dense ops-table · **E** = command-palette-first.
```
┌ H1 + 3 compact KPI cells in ONE line ─────────────────────────────────┐
┌ tabs ─────────────────────────────────────────────────────────────────┐
│ search | status | sort | saved views | A1 | A10(demo)                  │
├ TABLE: 11 rows, sticky thead, zebra rules, mono amounts, 6 cols ──────┤
│ footer: showing 1–8 of 11 · prev/next                                  │
└───────────────────────────────────────────────────────────────────────┘
```
Signature: ⌘K-first — search box focuses a real-action palette that also filters rows.
API: as V1 + `/invoices/{id}/download` (A10 composition). Refs: R2, R5, R9, R10. Dark/375: sticky-first-col scroll then card fallback. Risk: dense rows must keep 44px targets.

## F14 · V3 "Needs You Work Centre"
Keeps: same. Fixes/Adds: C16, C17, C4, C5, C6, C18 · A1, A5, A10.
Axes: **A** = queue-led top + timeline beneath · **B** = action-first · **C** = queue-led · **D** = airy minimal · **E** = drawer/overlay.
```
┌ H1 ── verdict: "3 things need you today" ─────────────────────────────┐
│ ┌── QUEUE: 2 awaiting verification | 1 overdue 12 days | 1 to pay ──┐ │
│ │  [Open]  [Open]  [Checkout]  → each opens a details DRAWER         │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ Settled timeline (grouped by date, 11 frozen rows)                     │
└───────────────────────────────────────────────────────────────────────┘
```
Signature: clicking any queue item opens a **drawer** with the real payment detail + dispute/cancel route.
API: `/payments/{id}`, `/payments/{id}/status`, `/dispute`, `/cancel`, `/webhooks/razorpay`. Refs: R1, R11, R12. Dark/375: drawer becomes full-screen sheet; queue stacks. Risk: focus trap + Esc + restore.

## F14 · V4 "Numbers-First Money Wall"
Keeps: same. Fixes/Adds: C16, C17, C4, C5, C6, C18 · A1, A5, A10, A12.
Axes: **A** = split hero + workbench (sticky KPI rail) · **B** = numbers-first · **C** = chapter-sticky · **D** = bento · **E** = scroll-spy + count-up.
```
┌──── sticky ₹81,500.00 hero (count-up) + 2 secondary chips ────────────┐
│ chapters: [Overview][Outstanding][Settled][Documents]  ← scroll-spy    │
│ ┌ bento: age chip 12d │ verification 2 │ A1 tile │ A10 tile ────────┐  │
│ │ compact table with sort + pager + saved views                     │  │
│ └───────────────────────────────────────────────────────────────────┘  │
```
Signature: IntersectionObserver-driven chapter rail + count-up hero (killed by reduced-motion).
API: `/payments/stats`, `/payments`, `/invoices`. Refs: R2, R6, R9. Dark/375: sticky hero shrinks to 32px; chapters scroll horizontally. Risk: count-up must not cause CLS.

## F14 · V5 "Bento Billing Desk"
Keeps: same. Fixes/Adds: C16, C17, C4, C5, C6, C18 · A1, A5, A10.
Axes: **A** = card grid / bento · **B** = narrative-first · **C** = accordion · **D** = bento · **E** = crossfade preview.
```
┌ H1 + 3 money tiles (hero + 2) ────────────────────────────────────────┐
│ ┌ Outstanding accordion ─┬── Settled accordion ─┬── A5 queue tile ──┐  │
│ │ rows w/ crossfade      │ rows w/ crossfade    │ A1 / A10 tiles    │  │
│ └────────────────────────┴─────────────────────┴────────────────────┘  │
```
Signature: accordion groups crossfade their row previews; one tile is always the "Awaiting you" queue.
API: as V1. Refs: R6, R11. Dark/375: bento → single column, accordions keep ≥44px headers. Risk: no dead CSS from unused grid tracks.

## Table 1 — coverage

| Variant | Keeps | Fixes (C) | Adds (A) | Axes (A+C) | Signature | API |
|---|---|---|---|---|---|---|
| V1 | all frozen | C16 C17 C4 C5 C6 C18 | A1 A5 A10 A12 | 2col / static | settled-vs-outstanding chips + total row | `/payments`, `/stats`, `/invoices`, `create-intent` |
| V2 | all frozen | C16 C17 C4 C5 C6 C18 | A1 A10 A12 | single / tab-led | ⌘K-first dense table | `/payments`, `/payments/{id}`, `/invoices/{id}/download` |
| V3 | all frozen | C16 C17 C4 C5 C6 C18 | A1 A5 A10 | queue-top / queue-led | detail drawer | `/payments/{id}`, `/status`, `/dispute`, `/cancel` |
| V4 | all frozen | C16 C17 C4 C5 C6 C18 | A1 A5 A10 A12 | split / chapter-sticky | scroll-spy + count-up | `/stats`, `/payments`, `/invoices` |
| V5 | all frozen | C16 C17 C4 C5 C6 C18 | A1 A5 A10 | bento / accordion | crossfade accordions | `/payments`, `/stats`, `/receipt`, `/invoice` |

## Table 2 — distinctness (5 rows × A–E)

| V | A layout | B hierarchy | C narrative | D density | E interaction | A+C |
|---|---|---|---|---|---|---|
| 1 | 2-col sticky rail | verdict-first | static sections | ledger/print | filter-chips + count-up | 2col/static |
| 2 | single full-width | numbers-first | tab-led | dense ops-table | palette-first | single/tab-led |
| 3 | queue top + timeline | action-first | queue-led | airy minimal | drawer/overlay | queue/queue-led |
| 4 | split hero + workbench | numbers-first | chapter-sticky | bento | scroll-spy + count-up | split/chapter |
| 5 | card grid bento | narrative-first | accordion | bento | crossfade preview | bento/accordion |

No two siblings share A+C. Coverage: ≥1 minimal (V3), ≥1 dense (V2), ≥1 action/queue-led (V3), ≥1 narrative/stepper-led (V4 chapter), ≥1 motion-signature-led (V4). Colour is never a differentiator.

## Table 3 — coverage rules

| Item | Priority | V1 | V2 | V3 | V4 | V5 | Rule |
|---|---|---|---|---|---|---|---|
| C4 C5 C6 C16 C17 C18 | CHANGE | ● | ● | ● | ● | ● | 5/5 PASS |
| A1 Ask AI | P1 | ● | ● | ● | ● | ● | 5/5 PASS |
| A5 work queue | P2 | ● | — | ● | ● | ● | 4/5 ≥3 PASS |
| A10 statement (demo) | P2 | ● | ● | ● | ● | ● | 5/5 ≥3 PASS |
| A12 saved views | P3 | ● | ● | — | ● | — | 3/5 ≥3 PASS |

```
## GATE 1 (F14)
Concept cards: 5/5 · Sketches: 5/5 · Difference test: PASS
C coverage 5/5: YES · P1 A coverage 5/5: YES · P2-P3 ≥3/5: YES
Gate: PASS
```
