# F17 · Payment Status — CONCEPTS (Gate 1, printed BEFORE code)

Locked: `Payment details` · **Completed** copy "This payment has been recorded. Download your receipt or invoice below." · Download invoice / Download receipt · Billing documents · File a payment dispute · stepper Pending → Processing → **Current: Completed** → Refunded · **Not due yet** copy "This installment is not due yet. Checkout unlocks after you approve delivery or when the studio requests payment." · "Checkout not available yet" · guidance lines · Cancel payment · Khandesh Spice D2C E-Commerce Store · Final payment · ₹22,500.00 · Currency INR · Reference · Created · Razorpay trust strip + chips.

## V1 "Status Ledger" — A: 2-col detail/docs · B: verdict-first · C: tab-led states · D: ledger/print · E: inline validation
```
┌ verdict: ₹22,500.00 + state ────────┬ stepper + order summary ────────────┐
│ tabs: [Completed] [Not due yet]    │ Billing documents / unlock explainer│
└ dispute + cancel footer ───────────┴────────────────────────────────────┘
```
Signature: "what unlocks this" inline explainer with a working deep link. API: `GET /payments/{id}`, `/status`, `/milestones/{id}/approve`. Refs R12/R11.

## V2 "Milestone Timeline" — A: left timeline rail · B: narrative-first · C: stepper/progress · D: dense · E: modal wizard
```
┌ rail: Created → Pending → Processing → Completed/Refunded ─┬ detail ───┐
│ not-due: whose move? [Approve delivery →]                  │ docs/dispute│
└───────────────────────────────────────────────────────────┴───────────┘
```
Signature: stepper rail drives a 2-step approve wizard (Esc/focus trap). API: `POST /milestones/{id}/approve`, `/payments/{id}/status`. Refs R4/R11.

## V3 "Bento Status Wall" — A: bento grid · B: numbers-first · C: chapter-sticky · D: editorial · E: crossfade preview
```
┌ money tile ₹22,500 ┬ state tile ┬ stepper tile ────────────────────────┐
│ crossfade between Completed / Not due yet chapters                    │
└───────────────────────────────────────────────────────────────────────┘
```
Signature: crossfade state switch + scroll-spy chapters. API: `/payments/{id}`, `/documents/versions`. Refs R2/R6.

## V4 "Unlock Workbench" — A: 2-col workbench · B: action-first · C: static sections · D: dense · E: drawer/overlay
```
┌ left: Awaiting-you queue (1 blocker) ─┬ right: state detail ────────────┐
│ [What unlocks this → drawer]         │ docs + legal routes             │
└──────────────────────────────────────┴─────────────────────────────────┘
```
Signature: right-hand drawer with the milestone blocker + approve/cancel actions. API: `/progress/projects/{id}`, `/milestones/{id}/approve`, `/dispute`, `/cancel`. Refs R11/R9.

## V5 "Narrative Receipt" — A: single column · B: action-first · C: accordion · D: airy minimal · E: sticky-CTA
```
┌ hero ₹22,500.00 + verbatim state copy ────────────────────────────────┐
│ accordion: Documents / What unlocks this / Dispute & help             │
│ sticky CTA: Download receipt (completed) or Approve delivery (not-due)│
└───────────────────────────────────────────────────────────────────────┘
```
Signature: teaching accordion + state-aware sticky CTA. API: `/receipt`, `/invoice`, `/milestones/{id}/approve`. Refs R3/R12.

## Table 1 — coverage

| V | Keeps | Fixes | Adds | Axes A+C | Signature | API |
|---|---|---|---|---|---|---|
| 1 | all locked | C9 C17 C4 C5 C6 C18 | A3 | 2col/tab-led | inline unlock deep link | `/payments/{id}`, `/status`, `/milestones/{id}/approve` |
| 2 | all locked | C9 C17 C4 C5 C6 C18 | A3 | rail/stepper | approve wizard | `/milestones/{id}/approve`, `/status` |
| 3 | all locked | C9 C17 C4 C5 C6 C18 | A3 | bento/chapter | crossfade states | `/documents/versions`, `/payments/{id}` |
| 4 | all locked | C9 C17 C4 C5 C6 C18 | A3 | workbench/static | blocker drawer | `/progress/...`, `/dispute`, `/cancel` |
| 5 | all locked | C9 C17 C4 C5 C6 C18 | A3 | narrative/accordion | state-aware sticky CTA | `/receipt`, `/invoice`, `/approve` |

## Table 2 — distinctness

| V | A | B | C | D | E | A+C |
|---|---|---|---|---|---|---|
| 1 | 2-col split | verdict-first | tab-led | ledger | inline validation | 2col/tab |
| 2 | timeline rail | narrative-first | stepper | dense | modal wizard | rail/stepper |
| 3 | bento grid | numbers-first | chapter-sticky | editorial | crossfade | bento/chapter |
| 4 | workbench | action-first | static | dense | drawer | workbench/static |
| 5 | narrative column | action-first | accordion | airy | sticky CTA | narrative/accordion |

## Table 3 — coverage rules

C9/C17/C4/C5/C6/C18 in **5/5**; **A3 (P1) in 5/5**; family must-includes (both states, completed docs/dispute/stepper, verbatim not-due copy + "Checkout not available yet", hero ₹, mono refs, trust strip, empty/skeleton/error) in **5/5**.

```
## GATE 1 (F17)
Concept cards: 5/5 · Sketches: 5/5 · Difference test: PASS
C coverage 5/5: YES · P1 A coverage 5/5: YES · P2-P3 ≥3/5: n/a
Gate: PASS
```
