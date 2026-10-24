# Nestlancer Client Portal (Meridian) — page-by-page prompts

These prompts split the full Meridian build into **reviewable stages**, the same way `ui-designing-homepage/docs/homepage-section-prompts/` splits the homepage. The master brief stays in:

→ [`../../PROMPT-2030-CLIENT-PORTAL.md`](../../PROMPT-2030-CLIENT-PORTAL.md)

Use the **numbered part prompts** to build. Use the master prompt as the **canon** for tokens, components, dataset, a11y, and definition of done. Do not paste the entire master prompt into every session.

**Output root:** `meridian-lab/` (created in part 00). Screenshots and `docs/legacy-audit-45-screens.md` are read-only reference.

## Included prompts

| # | File | Scope | Pages / files |
|---|---|---|---|
| 00 | [`00-foundation.md`](00-foundation.md) | Tokens, CSS shell, icons, component proof | CSS ×5 · `icons.svg` · `shell-reference.html` · `DECISIONS.md` |
| 01 | [`01-orientation.md`](01-orientation.md) | Overview + launcher + command surface | `index.html` · overview ×3 · `command-palette.html` · `notifications.html` |
| 02 | [`02-work.md`](02-work.md) | Requests + projects + milestone rail | 8 pages under Work |
| 03 | [`03-money.md`](03-money.md) | Billing, payments, quotes, invoices | 10 pages under Money |
| 04 | [`04-conversation.md`](04-conversation.md) | Messages workspace | 3 pages |
| 05 | [`05-files.md`](05-files.md) | File library + preview | 2 pages |
| 06 | [`06-account.md`](06-account.md) | Profile + settings | 6 pages |
| 07 | [`07-states-qa.md`](07-states-qa.md) | Empty / loading / error / mobile + set QA | 4 state pages + QA pass |

**Recommended order:** 00 → 01 → 02 → 03 → 04 → 05 → 06 → 07. Do not start a later part until the previous part’s acceptance checks pass (or the user explicitly says skip).

## Recommended workflow

1. Open this repo (`ui-designing-client-dashboard`) as the working directory.
2. Paste the **shared contract** (below) + **one numbered prompt** into a fresh agent session.
3. Review the files on disk (`python3 -m http.server 8130` from `meridian-lab/`). Approve before the next part.
4. Keep the same tokens, shell, and dataset across parts — never invent a second visual system.
5. After part 07, the launcher must link all 40 files and money must reconcile on Overview / Billing / Invoices.

## Shared contract (applies to every part prompt)

Paste this with every numbered prompt (or point the agent at this README).

### Role
You are a senior product designer and front-end craftsperson building the Nestlancer **client portal** static templates (“Meridian”). Hand-author HTML + CSS only. Write files **on disk** under `meridian-lab/`. Chat reports paths and status — never paste full file bodies into chat.

### Non-negotiables
- **No generators** — no Node/Python/shell loop that stamps out pages. Editor / Write tool is allowed.
- **No JavaScript** in pages — no `<script>`, no `on*` handlers. Interaction = `<details>`, `popover`, `:has()`, `:checked`, `:target`, `@view-transition`, etc. (master §1.5).
- **No CDN / no network assets** — system fonts; relative paths; works on `file://`.
- **No filler** — no lorem, no emoji, no `href="#"` dead ends, no invented money/dates/IDs.
- **One dataset** — every figure from master §8 (Priya Nair / Nair Learning Systems / Tue 12 Feb 2030). Money glance must always reconcile: Paid **₹31,320** · Due **₹36,540** · Later **₹69,822** · Awaiting signature **₹1,80,540**.
- **One shell** — rail + Now bar byte-consistent across product pages after part 00.
- **One primary** — exactly one `.btn--primary` per viewport; it is the page’s next action.
- **Do not push / commit / switch branch** unless the user asks.

### Scope discipline
- Modify **only** the files listed in the active part prompt (plus the minimum CSS needed to support them).
- Do not redesign earlier parts. Do not open later parts early.
- If a file from this part already exists and passes a quick open check, skip or lightly fix — do not regenerate the whole set.

### Design language (short)
Paper and ink · warm `--paper` · hairlines · editorial serif for project/quote titles · mono for money/IDs · ink-black CTAs · Iris only for links/focus/Navigator · no glass, glow, purple mesh, or AI sparkle. Full tokens: master §5. Components: master §6. Anti-patterns: master §16.

### Nav vocabulary (6 items only)
**Overview · Work · Money · Messages · Files · Account**

### Output protocol
1. One line: `Part NN — <name> — writing <k> files`.
2. Write complete files to disk (1–3 files per turn; finish every file you start).
3. Short manifest: `path · purpose · primary action`.
4. Continue until this part’s file list is done, or emit a clean hand-off (`Done` / `Next` / `Blockers`).
5. Do not ask “should I continue?” after every file.

### Preview
```bash
cd meridian-lab && python3 -m http.server 8130
```

### Definition of done (per page)
Master §15. Minimum: opens offline · no script · tokens only · one primary · §8 data · keyboard + focus ring · 320 / 768 / 1440.

## Prompt usage

```
Read docs/meridian-page-prompts/README.md (shared contract).
Then execute only: docs/meridian-page-prompts/0N-….md
Canon if needed: PROMPT-2030-CLIENT-PORTAL.md (§5 tokens, §6 components, §8 dataset).
```

## After all parts

The set is complete when part 07 QA passes and `meridian-lab/index.html` links every file once. The master prompt remains the single source of truth if a part prompt and the master disagree — **master wins**, then fix the part prompt.
