# Part 00 — Foundation (tokens, shell, component proof)

Read `docs/meridian-page-prompts/README.md` (shared contract). Canon: `PROMPT-2030-CLIENT-PORTAL.md` §1, §4–§7, §14. Screenshots (read-only): `Nestlancer-clients-screenshots/`. Audit: `docs/legacy-audit-45-screens.md` (skim §2 of the master).

**Do not build product screens yet.** This part proves the visual system so every later part can reuse it.

## Prerequisite
Working directory = `ui-designing-client-dashboard`. Create `meridian-lab/` if missing.

## Task
Hand-author the Meridian foundation **on disk**:

| Path | Purpose |
|---|---|
| `meridian-lab/DECISIONS.md` | Attest hand-authorship; note any token/CSS calls |
| `meridian-lab/assets/css/tokens.css` | `@layer tokens` — full palette Paper/Night/Contrast, type, space, motion (master §5) |
| `meridian-lab/assets/css/base.css` | Reset, typography, a11y utilities, focus ring |
| `meridian-lab/assets/css/layout.css` | Shell: rail, top bar, Now bar, grid, breakpoints |
| `meridian-lab/assets/css/components.css` | All components in master §6 |
| `meridian-lab/assets/css/pages.css` | Page-specific hooks only (can be sparse) |
| `meridian-lab/assets/icons.svg` | Hand-authored `<symbol>` sheet (24×24, 1.5 stroke, `currentColor`) |
| `meridian-lab/pages/shell-reference.html` | Living styleguide — not a product screen |

## `shell-reference.html` requirements
**Job:** prove chrome + every component so a later agent can build any page without inventing UI.

Must include:
1. Rail + Now bar (show Now bar in 3 states if possible).
2. Density switch (Comfortable / Compact) via CSS-only `:has()`.
3. Three themes visible at once via scoped `.theme-night` / `.theme-contrast` (plus Paper default).
4. Component gallery in **exact §6 order**, each in a labelled frame: default / hover / focus / disabled / error where relevant.
5. Live token swatches for colour + type.
6. Numbered shell anatomy callouts 1–8 in `--t-id`.

**Done when:** opening this one file is enough to implement any later page without asking “what does a ledger row look like?”

## Out of scope
- Any product page (`overview.html`, billing, etc.)
- `index.html` launcher (part 01)
- Generators, JS, CDN fonts

## Output protocol
Write files to disk. Prefer: CSS + icons first (1–2 turns), then `shell-reference.html` alone. Report paths only.

## Acceptance checks
- [ ] All 8 paths exist under `meridian-lab/`
- [ ] `shell-reference.html` opens via `file://` or `python3 -m http.server 8130`
- [ ] No `<script>`, no external URLs
- [ ] Hex colours live only in `tokens.css`
- [ ] `DECISIONS.md` states hand-authorship
- [ ] Components from §6 are present and named consistently (BEM-ish)

## Hand-off line
```
Part 00 done. Next: docs/meridian-page-prompts/01-orientation.md
```
