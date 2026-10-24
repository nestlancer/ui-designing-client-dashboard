# Part 01 — Orientation (Overview + launcher + notifications)

Read `docs/meridian-page-prompts/README.md`. Canon: master §8 (dataset), §9.B, §9.A (`index`, `command-palette`). **Requires part 00 complete** (`shell-reference.html` openable; shared CSS + icons present).

## Task
Build the client’s daily command surface and the set launcher. Reuse the shell from part 00 — do not invent a second chrome.

### Files to write

| Path | Job |
|---|---|
| `meridian-lab/index.html` | Launcher / TOC — every file in the eventual 40 linked once (link stubs OK for pages not built yet; mark missing as `planned`) |
| `meridian-lab/pages/overview.html` | Ambient command surface — money + spine + needs-you |
| `meridian-lab/pages/overview-focus.html` | Focus mode — one task, rail/Now collapsed |
| `meridian-lab/pages/overview-night.html` | Overview in Night + 3-up theme strip |
| `meridian-lab/pages/command-palette.html` | Overlay demo: default / query / no-results |
| `meridian-lab/pages/notifications.html` | 12 grouped rows, triage not firehose |

## Locked data (verbatim from master §8)
- User: **Priya Nair** · session **Tue 12 Feb 2030, 09:41 IST**
- Money strip: Paid **₹31,320.00** · Due **₹36,540.00** · Later **₹69,822.00** · Awaiting signature **₹1,80,540.00**
- Primary action on Overview: **Pay ₹20,880** (LMS mid-project, due 20 Feb 2030)
- Needs you (exactly 3): pay ₹20,880 · sign `NL-QTE-2030-0051` · review deliverable
- Notifications: 12 rows grouped Today / This week / Earlier (master §8.8)

## `overview.html` composition (required)
Now bar → State ribbon (due copy + Pay + dismiss) → Header (serif H1 Overview, lead, primary Pay, secondary Focus) → Ledger strip (4 blocks) → Milestone spine (5 nodes; mid-project node carries the only primary) → Needs you (3) → Navigator pane (answer + 3 provenance chips + agent log) → Recent (6).

ASCII layout and full section list: master §9.B `overview.html`.

## Other page notes
- **`overview-focus.html`:** exactly one button and one link; everything else absent from DOM.
- **`command-palette.html`:** three headed sections (default / query / no-results); Find results must be real objects from §8.
- **`notifications.html`:** sticky day headers; filter chips CSS-only; Delivery card → settings (link may point to future `settings-notifications.html`).
- **`index.html`:** grouped list (Orientation, Work, Money, …); wordmark + Meridian v1 + density/theme switches.

## Out of scope
Work / Money / Messages / Files / Account / States product pages (later parts). Do not rewrite foundation CSS unless a bug blocks this part.

## Output protocol
1–3 HTML files per turn. Copy shell from `shell-reference` / overview deliberately. Report paths.

## Acceptance checks
- [ ] Overview money strip reconciles with §8.2
- [ ] Exactly one primary on Overview; mid-project node is the due node
- [ ] Focus page has one button + one link
- [ ] Notifications = 12 rows, no ambiguous timestamps
- [ ] Shell matches part 00 (rail + Now bar)
- [ ] No script / no filler / no invented amounts

## Hand-off line
```
Part 01 done. Next: docs/meridian-page-prompts/02-work.md
```
