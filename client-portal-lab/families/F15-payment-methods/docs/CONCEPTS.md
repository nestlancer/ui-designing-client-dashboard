# F15 · Payment Methods — CONCEPTS (Gate 1, printed BEFORE code)

Locked: `Payment methods` · "Manage saved options for faster Razorpay checkout on milestones and invoices." · "Back to payments" · KPIs ₹81,500.00 / ₹31,875.00 / ₹0.00 · **"No saved methods yet"** · "Complete a Razorpay checkout and choose to save your card to add a payment method here." · "Add a payment method" · "Payment methods are saved automatically … Manual token entry is not supported." · "Go to payments" · trust strip + `UPI · Cards · Netbanking · Wallets`.

## V1 "Token Wallet Ledger" — A: single-column ruled rows · B: verdict-first · C: static sections · D: ledger/print · E: inline validation
```
H1 + KPI strip (3 values, one hero)
┌ captured EMPTY explainer (kept verbatim) ──────────────────────────┐
┌ Added: Saved methods (sample tokens, labelled) ── ruled rows ──────┐
│ [card icon] Visa •••• 4242  [Default] [Rename] [Remove]            │
└───────────────────────────────────────────────────────────────────┘
┌ Add method (dialog): type | nickname | validation | success/failure ┐
└ trust strip + chips ────────────────────────────────────────────────┘
```
Signature: inline nickname validation with explicit error + success/failure toasts. API: `GET/POST /payments/methods`, `PATCH default`, `PATCH nickname`, `DELETE`. Refs: R8, R7, R11. Dark/375: rows stack, 44px targets. Risk: don't show raw PAN.

## V2 "Method Rail & Settings" — A: 2-col sticky rail · B: action-first · C: tab-led · D: airy minimal · E: drawer/overlay
```
┌ left rail: Cards | UPI | Mandates(demo) ─┬ right: method list + states ┐
│ trust strip pinned                     │ [Add] opens right DRAWER    │
└────────────────────────────────────────┴─────────────────────────────┘
```
Signature: add-method **drawer** with focus trap, Esc, restore; tabs deep-linkable `?tab=`. API: as V1 + demo mandate tab. Refs: R7, R9. Risk: drawer at 360px must be full-width.

## V3 "Card Deck Carousel" — A: card grid · B: narrative-first · C: chapter-sticky · D: editorial · E: crossfade preview
```
┌ 3 money tiles ──────────────────────────────────────────────────────┐
│ [ display card tiles: •••• 4242 | UPI arjun@… | + Add ]  ← crossfade │
│ chapters: Cards / UPI / Security (scroll-spy)                       │
└─────────────────────────────────────────────────────────────────────┘
```
Signature: clicking a card crossfades its detail chapter. API: `/methods`, `/stats`. Refs: R2, R8, R12. Risk: no gradient soup — flat tokens only.

## V4 "Security-First Split" — A: split hero + workbench · B: numbers-first · C: stepper/progress · D: dense · E: modal wizard
```
┌ hero: ₹81,500.00 paid | trust shield ──┬ 3-step wizard card ────────┐
│ 1 Choose type → 2 Razorpay hand-off → 3 Confirm (validation/success) │
└───────────────────────────────────────┴─────────────────────────────┘
```
Signature: 3-step **modal wizard** with real validation + failure state (no fake success). API: `POST /payments/methods` (`tokenId`, `type`, `setAsDefault`). Refs: R3, R4, R7. Risk: keyboard trap across steps.

## V5 "Empty-State Onboarding" — A: single narrative column · B: action-first · C: accordion · D: airy minimal · E: sticky-CTA
```
┌ big empty illustration (inline SVG) + captured copy verbatim ───────┐
│ accordion: How saving works / UPI mandates (demo) / Security        │
│ sticky bottom CTA: "Go to payments"                                 │
└────────────────────────────────────────────────────────────────────┘
```
Signature: sticky mobile CTA + teaching accordion; add flow still reachable with success/failure. API: `/payments`, `/methods`. Refs: R11, R12, R3. Risk: sticky CTA must not cover footer at 360px.

## Table 1 — coverage

| V | Keeps | Fixes | Adds | Axes A+C | Signature | API |
|---|---|---|---|---|---|---|
| 1 | all locked | C4 C5 C6 C17 C18 | A6 | single/static | inline nickname validation | `/methods` GET/POST/PATCH/DELETE |
| 2 | all locked | C4 C5 C6 C17 C18 | A6 | 2col/tab-led | add drawer | `/methods`, demo mandate |
| 3 | all locked | C4 C5 C6 C17 C18 | — | cardgrid/chapter | crossfade cards | `/methods`, `/stats` |
| 4 | all locked | C4 C5 C6 C17 C18 | A6 | split/stepper | 3-step wizard | `POST /methods` |
| 5 | all locked | C4 C5 C6 C17 C18 | A6 | single/accordion | sticky CTA | `/payments`, `/methods` |

## Table 2 — distinctness

| V | A | B | C | D | E | A+C |
|---|---|---|---|---|---|---|
| 1 | single column | verdict-first | static | ledger | inline validation | single/static |
| 2 | 2-col rail | action-first | tab-led | airy | drawer | 2col/tab |
| 3 | card grid | narrative-first | chapter-sticky | editorial | crossfade | grid/chapter |
| 4 | split hero | numbers-first | stepper | dense | modal wizard | split/stepper |
| 5 | narrative column | action-first | accordion | airy | sticky CTA | narrative/accordion |

## Table 3 — coverage rules

C4/C5/C6/C17/C18 in **5/5**. A6 (P2) in **V1, V2, V4, V5 = 4/5 ≥3 PASS**. UPI-mandate demo in V1/V2/V5 = 3/5. Family must-includes (empty state, explainer, Go to payments, trust strip + chips, add flows w/ validation + success + failure, primary, remove+confirm) in **5/5**.

```
## GATE 1 (F15)
Concept cards: 5/5 · Sketches: 5/5 · Difference test: PASS
C coverage 5/5: YES · P1 A coverage 5/5: n/a (no P1) · P2-P3 ≥3/5: YES
Gate: PASS
```
