# Nestlancer — Client Portal redesign (2030)

This repo holds the **existing** client portal UI (45 screenshots) and the **build specification for its 2030 replacement**.

```
.
├── Nestlancer-clients-screenshots/   ← the current portal, 45 screens (read-only reference)
├── docs/legacy-audit-45-screens.md   ← what exists today, measured, with a 24-item defect log
└── PROMPT-2030-CLIENT-PORTAL.md      ← the master build prompt (start here)
```

## Start here

**[`PROMPT-2030-CLIENT-PORTAL.md`](PROMPT-2030-CLIENT-PORTAL.md)** is a self-contained brief. Paste it into a fresh AI session, or hand it to a designer/developer unchanged. It contains:

| § | Content |
|---|---|
| 1 | Hard constraints — **hand-authored HTML only, zero scripts, zero generators, zero CDN** |
| 2 | The current portal, condensed to what must not survive |
| 3–4 | The 2030 thesis and the **Meridian** design language, with five signature patterns |
| 5 | The full token set — colour (Paper / Night / Contrast), type, space, depth, motion, grid |
| 6–7 | 24 components + the signature interaction patterns |
| 8 | One canonical dataset — every amount, date, name and reference, arithmetically reconciled |
| 9 | Page-by-page blueprints for **40 hand-authored files** |
| 10–13 | State matrix, responsive rules, WCAG 2.2 AA requirements, copy and status vocabulary |
| 14–16 | File structure, definition of done, and 20 banned anti-patterns |
| 17 | A 7-batch build order with gates |

## What the old portal is

A competent 2020s CRUD dashboard. 228 px sidebar, 64 px top bar, white cards on near-white, indigo accents, soft status pills, 11 px uppercase micro-labels. Its best idea — the **milestone ⟷ payment ledger** — is buried three clicks deep in a project tab.

What breaks, in short: five chrome layers before content; single-record pages that are 70 % empty; contradictory states ("Not due yet" *and* "Pending" for the same payment); raw UUIDs shown to clients; a 40-row notification firehose; toast-only confirmation; a decorative "AI" chip with no assistance behind it; no dark theme, no mobile design. Full detail and per-screen notes: [`docs/legacy-audit-45-screens.md`](docs/legacy-audit-45-screens.md).

## What the 2030 portal is

> 2030 doesn't mean neon. It means the software stopped asking the client to do the system's work.

- **Ambient** — a *Now bar* answers "what is true right now, and what does it cost me if I ignore it?" before anything is searched.
- **Composed** — one screen, one decision; evidence folded away until asked for.
- **Addressable** — the **Navigator** answers in three sentences with provenance chips and an undoable agent log, instead of a chat sidebar.

Five signatures: the Now bar · the Ledger · the Rail · the Evidence drawer · the Navigator.

Visually it is paper and ink — warm off-white, hairline structure, an editorial serif for project and quote titles, monospace for anything a client might reconcile, ink-black CTAs and a single Iris accent reserved for interaction and assistance. No glass, no glow, no gradients.

## Ground rules for the build

1. **Every HTML file is written by hand.** No generator, no script that emits markup, no build step, no framework, no CDN.
2. **No JavaScript at all.** Interaction comes from `<details>`, `popover`, `:has()`, `:checked`, `:target`, scroll-snap and `@view-transition`.
3. **Every state is a page** — `payment-pending`, `payment-not-due`, `payment-completed`, `quote-awaiting-signature`, `states-empty`, `states-loading`, `states-error`.
4. **One dataset, one arithmetic** — the four money figures on the Overview must reconcile on Billing and Invoices.
5. **No filler** — no lorem ipsum, no placeholders, no emoji, no stock imagery.

## Suggested next step

Approve the prompt (or amend §3–§5 if the art direction needs a different accent, density or serif). On approval, build **Batch 1 only** — tokens, base, layout, components, the icon sheet and `pages/shell-reference.html` — so the system is proven on one page before the other 39 are written.
