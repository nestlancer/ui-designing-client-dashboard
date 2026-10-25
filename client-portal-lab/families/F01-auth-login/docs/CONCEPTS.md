# F01 · Auth · Login — CONCEPTS (Gate 1)

Five hand-drawn concept cards for `families/F01-auth-login/V1…V5/`. Same locked tokens (§5.2 of the prompt), same locked content (BASELINE-MAP §3), five different designs.

## GATE 1 (F01)
Concept cards: 5/5 · Sketches: 5/5 · Difference test: PASS
C coverage 5/5: YES (C4, C5, C5+, C6, C18) · P1 A coverage 5/5: YES (family must-include ×5; no numbered ADD targets F01) · P2-P3 ≥3/5: YES (vacuous — 0 numbered items target F01)
Gate: PASS

---

## F01 · Auth · Login · V1 "Split classic"

```
┌──────────────────────────────┬─────────────────────────┐
│ BRAND PANEL (left, 52%)      │ FORM COLUMN (right)     │
│ ● Client portal · live       │  [logo]          [theme] │
│ FIG · Portal                 │  ⬡ icon-tile             │
│                              │  Sign in        (36px)   │
│ Your delivery OS — from      │  For clients only. …     │
│ brief to payout.             │  ┌───────────────────┐   │
│ Same studio surface …        │  │ Email *           │   │
│ ┌─ product-stage ─────────┐  │  │ Password *   Show │   │
│ │ project-hub · NL-204 68%│  │  │ □ Keep me  Forgot?│   │
│ │ NL-204 · Milestone 3    │  │  │ [    Sign in    ] │   │
│ │ badges · ₹48,000        │  │  └───────────────────┘   │
│ │ NL Staging build pushed │  │  Staff or platform       │
│ │ RH Rahul: Hero CTA…     │  │  operator? → Operator    │
│ └─────────────────────────┘  │  Don't have an account?  │
│ Project Hub│Milestone│RUP    │  Terms · Privacy · live  │
└──────────────────────────────┴─────────────────────────┘
```

- Keeps (Gate S content): all locked copy, preview rows, cookie bar, footer trio
- Fixes/Adds: C4 AA badges · C5/C5+ single blue ramp (teal/violet gone) · C6 token surfaces · C18 36px H1 · family must-include states
- Differs on axes: **A**(split hero+form) + **B**(action-first) + **E**(IO reveal) — + C(static), so A+C unique
- Layout sketch: above — faithful 2-col upgrade of the capture, brand panel LEFT (roster classic)
- Signature interaction: hero preview **reveal** — IntersectionObserver staggers the product-stage rows in, live ping dot breathes (reduced-motion aware); form states choreograph in place
- API basis: `POST /api/v1/auth/login` (+ `verify-2fa`), links per API-MAP
- Shell: none (auth) · Dark: brand panel lifts to `--brand-950` field · 375px: hero stacks above form as one card, feed → card-fallback rows
- Risk: split at 768–1023px getting tight → hero drops below 900px; watch H1 contrast on `--background`

## F01 · Auth · Login · V2 "Quiet centered"

```
┌──────────────────────────────────────────────┐
│  [logo]                                [theme]│
│            ╔══════════════════╗               │
│            ║ ⬡  Sign in       ║               │
│            ║ For clients only.║               │
│            ║ Email* / Pass*   ║               │
│            ║ □ Keep me / Show ║               │
│            ║ [   Sign in   ]  ║               │
│            ║ ┄ Staff or …?  ▸ ║ (accordion)   │
│            ║ Don't have …?    ║               │
│            ╚══════════════════╝               │
│   ● Client portal · live · FIG · Portal       │
│   Your delivery OS — from brief to payout.    │
│   Same studio surface …                       │
│   [ What's inside the portal ▸ ] (accordion)  │
│   ├ project-hub · NL-204 · 68% · ₹48,000 …   │
│   Project Hub · Milestone payments · RUP      │
│   Terms · Privacy · Client portal · live      │
└──────────────────────────────────────────────┘
```

- Keeps: all locked copy; hero moves *below* the card as a quiet brand field; preview behind disclosure
- Fixes/Adds: C4 · C5/C5+ · C6 · C18 (32px H1 — the quiet tier) · states
- Differs on axes: **A**(single-column centered) + **B**(trust-first: honesty line + operator door elevated) + **C**(accordion) — A+C unique
- Signature interaction: **accordion disclosure** — "What's inside the portal" expands the product-stage with height+opacity transition (aria-expanded, Esc collapses); operator door is a second accordion
- API basis: same login stack
- Shell: none · Dark: quiet field dims to `--background` with a faint brand halo (one wash, not soup) · 375px: same column, accordion default-open? closed with preview card-fallback
- Risk: accordion hides hero proof on first paint → H2/honesty always visible; reduced-motion = instant toggle

## F01 · Auth · Login · V3 "Full-bleed studio"

```
┌────────────────────────────────────────────────────────────┐
│ FULL-BLEED BRAND-950 FIELD (editorial rules, hairlines)     │
│  ● Client portal · live          [logo]  [theme]            │
│  FIG · Portal                                            ┌──┴─────────┐
│  Your delivery OS — from brief to payout.                │ FORM DOCK  │
│  Same studio surface …                                   │ ⬡ Sign in  │
│  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄                      │ Email*     │
│  chapter 1 ── Project Hub — Milestones, files, threads…   │ Pass* Show │
│  chapter 2 ── Milestone payments — Pay deposit, mid…      │ □ Keep me  │
│  chapter 3 ── Razorpay / UPI — Tabular money…             │ [ Sign in ]│
│  ┌─ product-stage (floating, crossfades per chapter) ──┐  │ Staff or…? │
│  │ project-hub · NL-204 · 68% · NL-204 · Milestone 3 … │  │ [Expand ⤡] │
│  └─────────────────────────────────────────────────────┘  └────────────┘
│  Terms · Privacy · Client portal · live                       ↑ focus mode
└────────────────────────────────────────────────────────────┘
```

- Keeps: all locked copy; hero owns the page; form dock compact
- Fixes/Adds: C4 · C5/C5+ (brand-950 field is still *the* blue ramp) · C6 · C18 (40px display H2; 32px H1 in dock) · states in dock
- Differs on axes: **A**(full-bleed + floating dock) + **B**(narrative-first) + **C**(chapter-sticky) + **D**(editorial hairline rules) + **E**(overlay focus mode) — A+C unique
- Signature interaction: **form dock → focus-mode overlay** ("Expand"): dock lifts into a centred overlay with focus trap, Esc restores focus; chapters crossfade the product-stage emphasis (300ms opacity)
- API basis: same login stack
- Shell: none · Dark: field keeps brand-950 (tokens) · 375px: field compresses above, dock becomes the page card
- Risk: overlay focus trap must restore to trigger; contrast of muted text on brand-950 → use `--brand-100` tints ≥4.5:1

## F01 · Auth · Login · V4 "Ops ledger"

```
┌──────────────────────────────────────┐
│ [logo] NL · client portal    [theme]  │
│ ⌘ dense status strip (mono)           │
│ ┌ WORK │ MONEY │ THREADS ┐ (tabs)     │
│ │ ▪ NL-204 Milestone 3   │            │
│ │   68%  ₹48,000  In prog│            │
│ │ ▪ Staging build pushed │ chips:     │
│ │ ▪ Rahul: Hero CTA…     │ All·Unread │
│ └────────────────────────┘            │
│ Sign in                        36px   │
│ For clients only. …                   │
│ EMAIL ···························      │
│ PASSWORD ···················  [Show]   │
│ [□ Keep me signed in]  Forgot password?│
│ [ SIGN IN → ]                          │
│ staff or platform operator? → link    │
│ new client? → Sign up                  │
│ Terms · Privacy · Client portal · live│
└──────────────────────────────────────┘
```

- Keeps: all locked copy; hero H2 + FIG + paragraph sit as a ledger header block above the strip
- Fixes/Adds: C4 (badges in strip) · C5/C5+ · C6 · C18 (32px H1) · states as ledger rows
- Differs on axes: **A**(narrow dense single column) + **B**(queue-first) + **C**(tab-led) + **D**(dense ops) + **E**(filter-chips) — A+C unique
- Signature interaction: **filter chips** (All / Unread / Money) + **tabs** (Work/Money/Threads) filter the status strip live (aria-live count, arrow-key tabs)
- API basis: same login stack; strip rows are the locked preview content (demo surface)
- Shell: none · Dark: ledger hairlines use `--border` · 375px: tabs scroll, rows become card-fallback blocks
- Risk: density at 360px → relax tracking, keep 14px body floor

## F01 · Auth · Login · V5 "Flow rail"

```
┌────────────────────────────────┬──────────────────────────┐
│ FORM FLOW (left)               │ REASSURANCE RAIL (right)  │
│ [logo]                  [theme]│ ● Client portal · live    │
│ ① Identity ── done             │ FIG · Portal              │
│ │ Email *                      │ Your delivery OS — …      │
│ ② Password ── active           │ Same studio surface …     │
│ │ Password *            Show   │ ┌──────┬──────┬────────┐  │
│ ③ Session ── pending           │ │₹48,000│ 68%  │NL-204  │  │
│ │ □ Keep me signed in          │ │deposit│ done │Milestone│  │
│ [ Sign in ]                    │ └──────┴──────┴────────┘  │
│ Staff or platform operator?…   │ ●── Staging build pushed  │
│ Don't have an account? Sign up │ ●── Rahul: Hero CTA…      │
│ Terms · Privacy · live         │ ProjectHub│Milestones│RUP │
└────────────────────────────────┴──────────────────────────┘
```

- Keeps: all locked copy; rail carries hero + money-first bento + timeline spine
- Fixes/Adds: C4 (badges on bento) · C5/C5+ · C6 (bento uses `--card`) · C18 (money hero 36px `tabular-nums`) · states as step annotations
- Differs on axes: **A**(2-col flow+rail) + **B**(numbers-first) + **C**(stepper/progress-linked) + **D**(bento) + **E**(count-up + timeline-draw) — A+C unique
- Signature interaction: the **step spine fills** (SVG `stroke-dashoffset`) as fields validate, with a live "n of 3 steps ready" region; money counts up on reveal; feed spine draws
- API basis: same login stack; steps map to `LoginDto` fields (email → password → rememberMe)
- Shell: none · Dark: bento tints from status tokens · 375px: rail under form, bento 3→1 col
- Risk: stepper must not *gate* the fields (all fields visible day one — progressive, not wizard-hidden)

---

## Table 1 — roster

| variant | keeps | fixes (C#) | adds (A#) | axes | signature interaction | API endpoints |
|---|---|---|---|---|---|---|
| V1 Split classic | all locked copy + preview | C4 C5 C5+ C6 C18 | family must-include | A split, B action-first, C static, D airy, E IO reveal | hero reveal stagger + live ping | login, verify-2fa, links |
| V2 Quiet centered | all + hero below card | C4 C5 C5+ C6 C18 | family must-include | A centered, B trust-first, C accordion, D airy, E accordion | "What's inside" + operator accordions | login, verify-2fa, links |
| V3 Full-bleed studio | all + chapter copy verbatim | C4 C5 C5+ C6 C18 | family must-include | A full-bleed+dock, B narrative-first, C chapter-sticky, D editorial, E overlay | dock → focus-mode overlay; chapter crossfade | login, verify-2fa, links |
| V4 Ops ledger | all + strip rows | C4 C5 C5+ C6 C18 | family must-include | A narrow dense, B queue-first, C tab-led, D dense, E filter-chips | filter chips + tabs on the strip | login, verify-2fa, links |
| V5 Flow rail | all + money bento | C4 C5 C5+ C6 C18 | family must-include | A flow+rail, B numbers-first, C stepper, D bento, E count-up/timeline-draw | step spine fill + count-up | login, verify-2fa, links |

## Table 2 — distinctness (5 rows × axes A–E)

| Variant | A | B | C | D | E | A+C key |
|---|---|---|---|---|---|---|
| V1 | split 2-col | action-first | static | airy minimal | IO reveal | split+static |
| V2 | centered single-col | trust-first | accordion | airy minimal | accordion | centered+accordion |
| V3 | full-bleed + dock | narrative-first | chapter-sticky | editorial | overlay | fullbleed+chapter |
| V4 | narrow dense | queue-first | tab-led | dense ops | filter-chips | narrow+tab |
| V5 | flow + rail | numbers-first | stepper | bento | count-up | flow+stepper |

All 10 pairs differ on ≥3 axes including A or C; all five A+C keys unique. V1/V2 share "airy" (D) but differ on A/B/C/E (4 axes). **Difference test: PASS.**

Coverage: ≥1 minimal (V2) · ≥1 dense (V4) · ≥1 action/queue-led (V1, V4) · ≥1 narrative/stepper-led (V3, V5). **PASS.**

## Table 3 — coverage

| Item | V1 | V2 | V3 | V4 | V5 | Rule | Status |
|---|---|---|---|---|---|---|---|
| C4 badge AA + icon/text | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 | PASS |
| C5 one brand ramp | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 | PASS |
| C5+ teal door fixed | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 | PASS |
| C6 tokenised surfaces | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 | PASS |
| C18 display type | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 | PASS |
| Family must-include (validation/loading/error/links/honesty/operator door) | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 | PASS |
| Numbered P1 A-items | — | — | — | — | — | none target F01 | PASS (vacuous) |
| P2–P3 A-items | — | — | — | — | — | none target F01 | PASS (vacuous) |
