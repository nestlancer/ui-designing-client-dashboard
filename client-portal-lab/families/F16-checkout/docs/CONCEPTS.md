# F16 · Checkout — CONCEPTS (Gate 1, printed BEFORE code)

Locked: `Checkout` · ₹30,000.00 · `01a10a2b-5ed2-73bc-8aee-d1c6262906e9` · Khandesh Spice D2C E-Commerce Store · tabs **Pay online / Bank / UPI transfer** · **Proceed to secure checkout** · helper "Card, netbanking, wallets, or UPI (QR) in Razorpay's secure window" · UPI-on-desktop note (KEEP verbatim) · "Pay ₹30,000.00 via bank / UPI" · HDFC `Nestlancer Pvt Ltd · HDFC Bank · A/C 50200012345678 · IFSC HDFC0001234 · UPI nestlancer@hdfcbank` · UTR / Notes / Receipt / **Submit for verification** · Invoice + Cancel payment · stepper Created → Pending → Processing → Completed/Refunded · trust strip + chips.

## V1 "Split Summary Classic" — A: 2-col summary/payment · B: verdict-first · C: tab-led · D: airy minimal · E: inline validation
```
┌ LEFT: hero ₹30,000.00 + order summary ──┬ RIGHT: tabs ─────────────┐
│ Created→Pending→Processing→Completed   │ [Proceed to secure checkout] │
│                                        │ ONE primary · trust below   │
└────────────────────────────────────────┴────────────────────────────┘
```
Signature: inline UTR validation + demo success/failure/pending switcher. API: `GET /payments/{id}`, `/create-intent`, `/bank-transfer/submit`. Refs R3/R4. Dark/375: summary first, sticky CTA.

## V2 "Stepper Rail" — A: left progress rail · B: narrative-first · C: stepper/progress · D: dense · E: modal wizard
```
┌ rail: 1 Review → 2 Method → 3 Verify ─┬ main: amount + tab content ─┐
│                                      │ bank = styled dropzone      │
└──────────────────────────────────────┴─────────────────────────────┘
```
Signature: stepper drives a 3-step modal wizard; Esc/focus trap. API: `/create-intent → /initiate → /confirm`, `/media/upload/request`. Refs R4/R11.

## V3 "Bento Cash Desk" — A: bento grid · B: numbers-first · C: chapter-sticky · D: editorial · E: crossfade preview
```
┌ money tile (₹30,000) ┬ trust tile ┬ stepper tile ─────────────────┐
│ tabs panel (crossfade)                     │ sticky mobile CTA    │
└──────────────────────────────────────────┴───────────────────────┘
```
Signature: crossfade between the two captured tabs; sticky bottom CTA. API: `/payments/{id}/status`, `/platform-accounts`. Refs R2/R4/R9.

## V4 "Decision-First Dual Path" — A: two equal decision cards · B: action-first · C: static sections · D: dense · E: drawer/overlay
```
┌ Choose how to pay: [ Online (recommended) ] [ Bank / UPI transfer ] ┐
│ selected path expands below · other collapses to a quiet link       │
└ bottom: Invoice · Cancel payment · File a dispute ──────────────────┘
```
Signature: right-hand detail drawer for the bank form with focus restore; one primary at a time. API: `/bank-transfer/submit`, `/payments/{id}/cancel`, `/dispute`. Refs R3/R7/R11.

## V5 "Narrative Receipt" — A: single column · B: action-first · C: accordion · D: airy minimal · E: sticky-CTA
```
┌ one narrative: what you're paying for / ₹30,000.00 / why Pending ──┐
│ accordion: Pay online · Bank transfer · Trust & honesty · Help     │
│ sticky CTA: Proceed to secure checkout                             │
└────────────────────────────────────────────────────────────────────┘
```
Signature: teaching accordion + sticky mobile CTA; Invoice/Cancel in a single footer. API: `/payments/{id}`, `/invoice`, `/cancel`. Refs R12/R3.

## Table 1 — coverage

| V | Keeps | Fixes | Adds | Axes A+C | Signature | API |
|---|---|---|---|---|---|---|
| 1 | all locked | C8 C15 C17 C4 C5 C6 C18 | family must | 2col/tab-led | inline validation | `/payments/{id}`, `/create-intent`, `/bank-transfer/submit` |
| 2 | all locked | C8 C15 C17 C4 C5 C6 C18 | family must | rail/stepper | 3-step wizard | `/initiate`, `/confirm`, `/media/upload` |
| 3 | all locked | C8 C15 C17 C4 C5 C6 C18 | family must | bento/chapter | crossfade tabs | `/status`, `/platform-accounts` |
| 4 | all locked | C8 C15 C17 C4 C5 C6 C18 | family must | decision/static | bank drawer | `/bank-transfer/submit`, `/cancel`, `/dispute` |
| 5 | all locked | C8 C15 C17 C4 C5 C6 C18 | family must | narrative/accordion | sticky CTA | `/invoice`, `/cancel` |

## Table 2 — distinctness

| V | A | B | C | D | E | A+C |
|---|---|---|---|---|---|---|
| 1 | 2-col split | verdict-first | tab-led | airy | inline validation | 2col/tab |
| 2 | left rail | narrative-first | stepper | dense | modal wizard | rail/stepper |
| 3 | bento grid | numbers-first | chapter-sticky | editorial | crossfade | bento/chapter |
| 4 | decision cards | action-first | static | dense | drawer | decision/static |
| 5 | narrative column | action-first | accordion | airy | sticky CTA | narrative/accordion |

## Table 3 — coverage rules

C8/C15/C17/C4/C5/C6/C18 in **5/5**. No P1/P2 ADD items are assigned to F16; family must-includes (both states, ONE primary, order summary + hero + stepper, styled upload, HDFC block, trust strip/chips, UPI desktop note, Invoice/Cancel links, success/failure/verification-pending) in **5/5**.

```
## GATE 1 (F16)
Concept cards: 5/5 · Sketches: 5/5 · Difference test: PASS
C coverage 5/5: YES · P1 A coverage 5/5: n/a · P2-P3 ≥3/5: n/a (family must-includes 5/5)
Gate: PASS
```
