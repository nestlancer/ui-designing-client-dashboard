# Nestlancer — Client Portal redesign (2030)

This repo holds the **existing** client portal UI (45 screenshots) and the **build specification for its 2030 replacement**.

```
.
├── Nestlancer-clients-screenshots/   ← the current portal, 45 screens (read-only reference)
├── docs/legacy-audit-45-screens.md   ← what exists today, measured, with a 24-item defect log
├── PROMPT-2030-CLIENT-PORTAL.md      ← the master build prompt (start here)
└── meridian-lab/                     ← hand-authored build output (created by the agent)
```

## Start here

**[`PROMPT-2030-CLIENT-PORTAL.md`](PROMPT-2030-CLIENT-PORTAL.md)** is the self-contained brief. Open this repo as the working directory and run the prompt with a Cursor agent (same pattern as the homepage / portfolio-listing labs).

| § | Content |
|---|---|
| 1 | Hard constraints — **hand-authored HTML only, zero page scripts, zero generators, zero CDN** |
| 2 | The current portal, condensed to what must not survive |
| 3–4 | The 2030 thesis and the **Meridian** design language, with five signature patterns |
| 5 | The full token set — colour (Paper / Night / Contrast), type, space, depth, motion, grid |
| 6–7 | 24 components + the signature interaction patterns |
| 8 | One canonical dataset — every amount, date, name and reference, arithmetically reconciled |
| 9 | Page-by-page blueprints for **40 hand-authored files** |
| 10–13 | State matrix, responsive rules, WCAG 2.2 AA requirements, copy and status vocabulary |
| 14–16 | File structure (`meridian-lab/`), definition of done, and 20 banned anti-patterns |
| 17 | **Gates + disk-write protocol** (v1.1 — Cursor-agent safe) |

### Why v1.1

Older drafts told the agent to paste every complete file into chat and hard-stop after each batch. That burned the context window and made the run look like it “created a few files then died.” v1.1 matches the working portfolio-listing prompt: **write files on disk, report paths, continue through gates, hand off cleanly when context is short.**

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

1. **Every HTML file is written by hand onto disk under `meridian-lab/`.** No generator, no script that emits markup, no build step, no framework, no CDN.
2. **No JavaScript in the pages.** Interaction comes from `<details>`, `popover`, `:has()`, `:checked`, `:target`, scroll-snap and `@view-transition`.
3. **Every state is a page** — `payment-pending`, `payment-not-due`, `payment-completed`, `quote-awaiting-signature`, `states-empty`, `states-loading`, `states-error`.
4. **One dataset, one arithmetic** — the four money figures on the Overview must reconcile on Billing and Invoices.
5. **No filler** — no lorem ipsum, no placeholders, no emoji, no stock imagery.
6. **Do not paste full file bodies into chat** — write the file, report the path, continue.

## Suggested next step

Run the prompt. The agent should start at **Gate 0 → Gate 1** (tokens, base, layout, components, icons, `pages/shell-reference.html`) and keep going through Gates 2–7. Preview:

```bash
cd meridian-lab && python3 -m http.server 8130
```
