# F18 · Invoices Archive — CONCEPTS (Gate 1, printed BEFORE code)

Locked: `Invoices` · "Your issued invoices with downloadable PDF copies for accounting and tax records." · "View payments" · headers **Invoice / Project / Amount / Status / Actions** · 5 rows `NL-INV-2026-000045` AUDIT ₹625 Pending, `000005`/`000004` B2B ₹29,500 Issued, `000002` Khandesh ₹22,500 Issued, `000001` Khandesh ₹30,000 Pending · actions **Download invoice / View** · gross ₹1,12,125.00 computed · trust strip.

## V1 "Dense Invoice Ledger" — A: single full-width table · B: verdict-first · C: static sections · D: dense · E: inline validation
```
┌ 3 KPI tiles (issued / pending / gross) ───────────────────────────────┐
│ [search] [status] [sort] [date] [total row] [pagination]              │
│ 5 rows · mobile card fallback · A10 GST statement (demo)               │
└ Awaiting-you queue: 2 pending invoices ───────────────────────────────┘
```
Signature: inline sort + live result count; total row recomputes. API: `GET /invoices`, `/invoices/{id}/download`. Refs R5/R10/R6.

## V2 "Saved-View Rail" — A: 2-col sticky rail · B: action-first · C: tab-led · D: airy · E: drawer/overlay
```
┌ rail: All / Issued / Pending / Overdue (saved views) ─┬ table + pager ┐
│ A10 composition explainer                           │ [View] → drawer│
└──────────────────────────────────────────────────────┴───────────────┘
```
Signature: right-hand detail drawer with focus trap; saved views in `localStorage`. API: `/invoices`, `/invoices/{id}`. Refs R9/R7.

## V3 "Bento Archive" — A: bento overview + cards · B: numbers-first · C: chapter-sticky · D: editorial · E: crossfade preview
```
┌ 3 money tiles ───────────────────────────────────────────────────────┐
│ chapters: All / Issued / Pending (scroll-spy) · card grid crossfade   │
└──────────────────────────────────────────────────────────────────────┘
```
Signature: invoice card deck with crossfade detail; still has search/filter/pager/total. API: `/invoices`, `/stats`. Refs R6/R2.

## V4 "Awaiting-You Workbench" — A: queue + table split · B: action-first · C: static sections · D: dense · E: modal wizard
```
┌ left: overdue/pending queue ──────────┬ right: filterable table ─────┐
│ [GST statement wizard] 3 steps        │ date + total + pager          │
└──────────────────────────────────────┴───────────────────────────────┘
```
Signature: 3-step A10 composition wizard (demo) + blocker drawer. API: N × `/invoices/{id}/download`. Refs R1/R9/R11.

## V5 "Narrative Archive" — A: single column · B: narrative-first · C: accordion · D: airy · E: sticky-CTA
```
┌ lead + teaching empty state ─────────────────────────────────────────┐
│ accordion: Table / GST statement / Trust & help                      │
│ sticky CTA: Download all invoices (demo composition)                  │
└──────────────────────────────────────────────────────────────────────┘
```
Signature: teaching accordion + sticky mobile CTA; table powers inside chapter 1. API: `/invoices`, `/download`. Refs R12/R3/R4.

## Table 1 — coverage

| V | Keeps | Fixes | Adds | Axes A+C | Signature | API |
|---|---|---|---|---|---|---|
| 1 | all locked | C16 C17 C4 C5 C6 C18 | table powers, A10, queue | table/static | inline sort + live total | `/invoices`, `/download` |
| 2 | all locked | C16 C17 C4 C5 C6 C18 | table powers, A10, queue | 2col/tab-led | detail drawer + saved views | `/invoices`, `/invoices/{id}` |
| 3 | all locked | C16 C17 C4 C5 C6 C18 | table powers, queue | bento/chapter | crossfade card deck | `/invoices`, `/stats` |
| 4 | all locked | C16 C17 C4 C5 C6 C18 | table powers, A10, queue | workbench/static | 3-step GST wizard | N × `/invoices/{id}/download` |
| 5 | all locked | C16 C17 C4 C5 C6 C18 | table powers, A10, queue | narrative/accordion | sticky CTA | `/invoices`, `/download` |

## Table 2 — distinctness

| V | A | B | C | D | E | A+C |
|---|---|---|---|---|---|---|
| 1 | full-width table | verdict-first | static | dense | inline validation | table/static |
| 2 | 2-col rail | action-first | tab-led | airy | drawer | 2col/tab |
| 3 | bento + cards | numbers-first | chapter-sticky | editorial | crossfade | bento/chapter |
| 4 | queue/table split | action-first | static | dense | modal wizard | workbench/static |
| 5 | narrative column | narrative-first | accordion | airy | sticky CTA | narrative/accordion |

## Table 3 — coverage rules

C16/C17/C4/C5/C6/C18 in **5/5**; **family table powers + Awaiting-you queue in 5/5**; **A10 (P2) in V1, V2, V4, V5 = 4/5 ≥3 PASS** (all demo-labelled / honestly composed).

```
## GATE 1 (F18)
Concept cards: 5/5 · Sketches: 5/5 · Difference test: PASS
C coverage 5/5: YES · P1 A coverage 5/5: family must-includes 5/5 · P2-P3 ≥3/5: YES
Gate: PASS
```
