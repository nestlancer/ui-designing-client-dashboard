# F08 · Projects List — Gate R · REPORT-STUDY

## GATE R (F08)
MD read: YES · XLSX sheets: 10/10 · C-items mapped: 5/5 · A-items mapped: 1/1
KEEP listed: YES · Checklist copied: YES
Gate: PASS

Report read in full: `reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md` (§1 findings → §8 sources) and `Nestlancer_Client_Portal_UI_Research_Report.xlsx` sheets 1–10 (Executive Findings · Design Tokens · Page Inventory · Benchmark Patterns · CHANGE · ADD · KEEP · Roadmap · Acceptance checklist · Sources). **No .md/.xlsx disagreement touches F08** (C/A wording matches between §6 tables and sheets 5–6; inventory row counts differ only in sheet header phrasing “53 audited” vs 55 snapshots — .md wins, irrelevant to this family).

## Executive findings that touch this page (quoted)

- **#2 (🔴 Critical):** “`GET /api/v1/projects` returns **HTTP 502 (Cloudflare origin_bad_gateway)** and is also CORS-blocked, so `/projects` and `/projects/[id]` render a bare *‘Could not load projects / Network Error / Try again’* card.” Verdict: “UI is fine, **backend is broken**”.
- **#3:** badge text “measured contrast **1.73 – 3.23 : 1** (AA needs 4.5:1 for 12px text)” → C4.
- **#4:** two/three colour systems (`--ta-brand-*` blue vs violet `--accent-1` vs auth teal) → C5.
- **#12:** card borders “re-declared as raw hex in 6+ different forms” → C6. **§3.2:** “No 32–48px display size inside the portal” → C18.
- §2.2: `/projects` captured as real error **plus** route-fulfilled populated DOM (`13b`) “so the *intended* UI could be reviewed”.

## Page-inventory rows for this family (§4.1 / sheet 3)

| # | Route | Status | Screenshot | Principal issue (report) |
|---|---|---|---|---|
| 16 | `/projects` Projects list | 🔴 502 | `014-projects` | “API 502. Intended design (from `13b`) = 3-col card grid, icon tile, status badge, ‘Started <date>’” |
| 12 | `/requests?view=projects` Work Hub Projects | 🔴 502 | `045` | Same endpoint breaks the Work Hub tab too (F05 family — context only) |
| 6 | `/dashboard` Projects tab | ✅ OK (empty) | `032` | “Projects count = 0 → tab empty; no nudge to ‘View my requests’” — origin of the C14 empty-copy requirement |

## Token table applied (report §3.2 → prompt §5.2, already locked in `shared/tokens.css`)

Neutrals `--background #f6f8fb / --card #fff / --muted / --border #dbe3ec / --foreground #0f1c2e / --muted-foreground #45556b` · one blue ramp `--brand-500 #465fff → --primary` (violet + teal deleted) · AA status triples (`--status-*-bg/text/border`, darkened text, badges = icon+colour+text) · radii 6/10/14/20 · shadows xs/sm · Outfit + mono for IDs/dates · sidebar 232 / header 64 / content 1400 · H1 32–40px. Dark: same-hue 14%-tint status formula already in the shared file. **Imported as-is; never edited.**

## CHANGE items — all in 5/5 variants

- **C17 Compress the sidebar (inherited):** 232px sidebar + 64px header, Blog/Portfolio behind one “Explore” popover. Match the F05/F06 shell; F03 owns the definitive shell.
- **C4 Badge contrast:** darkened `--status-*-text` on tints; “In progress” = icon + text, never colour alone.
- **C5 One brand ramp:** blue `--primary` everywhere; no violet/teal.
- **C6 Tokenise cards:** only `--card/--border/--shadow-xs`; no raw hex/`bg-white`.
- **C18 Type scale:** H1 `clamp(32px…38px)`; body 14–16; meta ≥12; nothing <11px.

## ADD items

- **A13 Offline/degraded banner (family-mandatory, 5/5):** report §6.2 (P3 globally, P0 here): “The 502 shows a bare error card; a system-status banner (‘Project data is temporarily unavailable — retrying’) is far more reassuring.” Implemented as banner + honest error card (frozen copy) + Retry + Contact support. Plus the C14 empty copy “Accept a quote to open your first project →” as the designed empty state (prompt §4 must-include; report-specified, not in captures).

## KEEP (5/5)

Honesty of the error/empty wording as a trust asset · shadcn-style token architecture · ⌘K + keyboard hints · graceful microcopy register.

## Benchmark patterns applied (report §5, 13 sources)

Verdict/next-action first [1] · status never colour-alone [2] · empty/loading/error are first-class states [7] · onboarding empty states as a feature [9] · shadcn token discipline [5][7]. Full Gate-T extensions in `TEMPLATE-RESEARCH.md`.

## Roadmap phases touching F08

**P0 Fix production** (502 + degraded banner + retry/support — this family *is* the P0 showcase) · **P1 Foundations** (C4/C5/C6/C18) · **P6 Responsive** (card grid reflows; no table on the captured page, but the dense V2 table still ships a mobile card fallback per C16 spirit).

## Acceptance checklist (report §7.1) — copied as this family’s QA list

Hierarchy <2s · KPI = value+label+why, one hero · right chart (none needed: one big number) · tables search/filter/badge/sort/pagination + mobile fallback (V2) · nav ≤9 + real ⌘K actions · one brand ramp, text ≥4.5:1, UI ≥3:1 · one family + mono, display H1 · dark parity, tokenised · full keyboard, visible focus, ARIA, skip link · designed empty/skeleton/error everywhere · 375/414/768 pass, no h-scroll · skeleton not spinner, no shift · legal n/a here.
