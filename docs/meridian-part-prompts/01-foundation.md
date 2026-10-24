# Part prompt 01 — Foundation (tokens, shell, components)

Read `docs/meridian-part-prompts/README.md` and apply the shared contract. Skim master `PROMPT-2030-CLIENT-PORTAL.md` §1, §4–§7, §14 for full token tables and component anatomy. Do **not** build product screens in this part.

## Prerequisite
Working directory = `ui-designing-client-dashboard`. Create `meridian-lab/` and `meridian-lab/DECISIONS.md` if missing. Attest: “All Meridian pages were hand-authored; no design-generation script was used.”

## Task
Build the **design system + shell proof** only. After this part, a developer can open one HTML file and understand every chrome piece and component state.

## Files to write (in order)

| # | Path | Notes |
|---|---|---|
| 1 | `meridian-lab/assets/css/tokens.css` | `@layer tokens` — Paper / Night / Contrast colours, type, space, radius, lift, motion, grid, row-height density vars. Full values: master §5. |
| 2 | `meridian-lab/assets/css/base.css` | Reset, typography, a11y utilities, skip-link, focus ring, `prefers-reduced-motion` / contrast / transparency |
| 3 | `meridian-lab/assets/css/layout.css` | Shell: top bar, rail 76, Now bar 52, content width, breakpoints, bottom tab bar for compact |
| 4 | `meridian-lab/assets/css/components.css` | Every component in master §6 |
| 5 | `meridian-lab/assets/css/pages.css` | Page-composition hooks only (keep thin) |
| 6 | `meridian-lab/assets/icons.svg` | Hand-authored `<symbol>` sheet (24×24, 1.5 stroke, round caps, `currentColor`) |
| 7 | `meridian-lab/pages/shell-reference.html` | Component + chrome gallery |

Suggested sub-batches: CSS 1–3 → CSS 4–5 + icons → `shell-reference.html` alone.

## Locked design tokens (must match master §5)

**Paper:** `--paper #F6F4EF` · `--surface #FFF` · `--ink #14120E` · `--iris #3A2FE0` · `--moss #1F6B4A` · `--amber #8F5600` · `--clay #A8321F` · `--sky #12587A`  
**Night:** `--paper #0C0B09` · `--ink #F2EFE8` · `--iris #9C93FF` (designed dark, not inverted)  
**Type:** display serif (`Iowan Old Style` stack) · UI grotesque · mono for money/IDs  
**Shell:** `--rail: 76px` · `--now: 52px` · `--top: 60px` · `--w-content: 1180px` · `--drawer: 480px`  
**Primary CTA:** ink-black pill — not blue. Iris = links, focus, Navigator only.

## Components that must appear on `shell-reference.html`

App rail · Now bar (3 states) · State ribbon · Page header · Segmented control · Tabs · Stat · Ledger row · Data table · Timeline rail · Status pill · Money block · Evidence drawer · Navigator · Command palette frame · Composer · Uploader · Empty state · Skeleton · Inline banner · Field · Stepper · Trust block · Footer

Also show: density switch, Paper / Night / Contrast side-by-side (nested `.theme-night` / `.theme-contrast` scopes), live colour + type swatches, focus/hover/disabled/error frames.

## Art direction reminder
Instrument panel drawn by a book designer — Swiss editorial, banking ledger, Japanese stationery. **Banned:** glassmorphism, neon, purple mesh, glow orbs, AI sparkle, dark-as-default.

## CSS-only interaction notes
Comment each non-trivial pattern, e.g. `<!-- density: css-only via :has() on html -->`. Theme via radios + `html:has(#theme-night:checked)`.

## Acceptance checks
- [ ] All 7 paths exist on disk under `meridian-lab/`
- [ ] `shell-reference.html` opens via `file://` and `python3 -m http.server 8130` with no network
- [ ] Zero `<script>`, zero CDN, zero external URLs
- [ ] No raw brand hex outside `tokens.css`
- [ ] Rail + Now bar + footer present and labelled
- [ ] Component gallery covers default / hover / focus / disabled / error where relevant
- [ ] `DECISIONS.md` exists with hand-authorship line
- [ ] Chat reply lists paths only — no full file dumps

## Stop
When Gate 1 passes, **stop for review**. Do not start Overview or other product pages until the user runs part 02.
