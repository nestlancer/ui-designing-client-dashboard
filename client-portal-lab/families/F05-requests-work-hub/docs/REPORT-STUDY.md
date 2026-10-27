# F05 · Requests Work Hub — Gate R · REPORT-STUDY

**Read cover-to-cover:** `reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md` (§1 → §8) · `reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx` — all 10 sheets opened (`1. Executive Findings` … `10. Sources`).

## GATE R (F05)
MD read: YES · XLSX sheets: 10/10 · C-items mapped: 6/6 · A-items mapped: 1/1 (A12, P3)
KEEP listed: YES · Checklist copied: YES
Gate: PASS

## 1 · Executive findings that touch this page (quoted)

- **#2 (CRITICAL)** — “`GET /api/v1/projects` returns **HTTP 502 (Cloudflare origin_bad_gateway)** and is also CORS-blocked” → `/requests?view=projects` and `/requests?view=all` inherit the 502. **This family's error state is real, not hypothetical** (`audit-metadata.json` consoleErrors on `/requests?view=all` + `/requests?view=projects`).
- **#3 (HIGH)** — “Status badge text fails WCAG AA … measured contrast **1.73 – 3.23 : 1** (AA needs 4.5:1 for 12px text)” → every F05 badge uses `--status-*-text` + icon + text.
- **#4 (HIGH)** — “Two colour systems coexist … `--ta-brand-*` `#465fff` blue while generic components use `--primary → --accent-1` (violet-blue)” → one blue ramp in all 5 variants.
- **#10 (HIGH)** — “Mobile is a afterthought … the data tables have no horizontal-scroll or card-fallback” → C16, the F05-specific fix.
- **#11 (MEDIUM)** — “Dark tokens exist … but 191 `dark:` utilities coexist with hard-coded `gray-200/80` / `gray-800` / `white` card borders” → tokenised dark parity.
- **#12 (MEDIUM)** — “card borders are re-declared as raw hex in 6+ different forms” → C6.
- **#1, #5, #7, #8, #9, #13** — context only (screenshots valid baseline; verdict-first grammar borrowed for the queue variant; “Awaiting you” replicated as `Needs your attention`; activity/notification problems belong to other families; capture gaps recorded in `BASELINE-MAP.md`).

## 2 · Full token table (§5.2 of the prompt = the one locked scheme)

| Group | Light | Dark |
|---|---|---|
| Neutrals | `--background:#f6f8fb` · `--card:#ffffff` · `--muted:#f1f5f9` · `--border:#dbe3ec` · `--foreground:#0f1c2e` · `--muted-foreground:#45556b` | `--background:#0b1220` · `--card:#111b2e` · `--muted:#16233a` · `--border:#24344f` · `--foreground:#e8eef4` · `--muted-foreground:#9fb0c3` |
| Brand | `--brand-50:#ecf3ff` · `-100:#d9e6ff` · `-500:#465fff` · `-600:#3641f5` · `-700:#2a31d8` · `-950:#161950` · `--primary:var(--brand-500)` · `--primary-hover:var(--brand-600)` · `--ring:var(--brand-500)` | `--brand-500:#5b7bff` · `--primary:var(--brand-500)` |
| Status (bg / AA text / border) | success `#e5f6ec / #166534 / #86c9a3` · warning `#fdf3e0 / #8a5a00 / #e8c477` · error `#fdecec / #b42318 / #f0a8a0` · info `#e6f4fd / #0c5d8a / #8fcbe8` · purple `#f1e8fd / #5b21b6 / #c4a8ef` | text: `#4ade80 / #fbbf24 / #f87171 / #38bdf8 / #c084fc`; bg = 12–16% tint of the same hue over `--card` (one shared formula in `shared/tokens.css`) |
| Shape | `--radius-sm:6px` · `-md:10px` · `-lg:14px` · `-xl:20px` · `--shadow-xs:0 1px 2px rgba(15,28,46,.06)` · `--shadow-sm:0 4px 14px rgba(15,28,46,.08)` | `--shadow-xs:0 1px 2px rgba(0,0,0,.4)` · `--shadow-sm:0 8px 28px rgba(0,0,0,.45)` |
| Type | `--font:"Outfit",system-ui,…` · `--mono:ui-monospace,…` | same |
| Layout | `--sidebar:232px` · `--header:64px` · `--content:1400px` | same |
| Type scale | H1 32–40 · H2 20–24 · card title 16–18 · body 14–16 · meta 12 · micro 11 (floor) · money/ID mono `tabular-nums` | same |
| Motion | `--duration-fast:150ms` · `-normal:280ms` · `-slow:500ms`; transform/opacity only | same |

**Bans:** second brand hue · violet `--accent-1` (deleted; `--ring` is brand blue) · raw `bg-white` / `gray-200/80` cards · CDN/font/chart libraries · emoji icons · gradient soup.

## 3 · Page-inventory rows (sheet 3 / report §4)

| # | Route | Status | Components | Principal issue |
|---|---|---|---|---|
| 10 | `/requests` | OK | 4 KPIs, tabs, status select, search, list, pagination | “Best list page in the app; rows are text-only (no date emphasis, money, thumbnail)” |
| 11 | `/requests?view=all` | OK | same shell | “Good” — captured DOM has zero rows → design an instructive empty state |
| 12 | `/requests?view=projects` | 502 | error card | “Same API 502 breaks the Work Hub projects tab” |
| 13 | `/requests/new` | OK | F06 form | “missing attachments at creation, budget guide, progress indicator” (F06 scope) |
| 14–15 | `/requests/[id]` | OK | details / status history | F07 scope — F05 row links point at these real routes |

## 4 · Benchmark patterns applied (from the 13 report sources)

- **[1] AdminLTE client-portal examples** — “explain every number”, “show the next step” → each KPI gets a why-line; empty states teach `New request`.
- **[2] AdminLTE dashboard examples** — status never colour alone, colour = state, one dominant metric → hero KPI + icon+text badges.
- **[6] Tabler** (best free table/filter/pagination system) → dense-ops variant V2.
- **[7] Tailwind Admin QA checklist** — tables need search + filter + status + sort + pagination + mobile card-fallback → all 5 variants; saved views (A12) come from this source.
- **[9] AdminLTE SaaS dashboards** — failed/aged items as **work queues not metrics** → V3 “needs your attention”.
- **[10] Assembly client-portal templates** — portal-as-home-base, module-card structure → V5 status lanes.
- **[11] Softr** — resource-hub / guided flow framing (composition only; **no** Ask-AI feature — no Gate-A endpoint).
- **[12] TailGrids** — keyboard/ARIA/responsive production readiness → tablist arrow keys, focus trap.
- **[13] AdminLTE finance** — typographic hierarchy, big number with `tabular-nums` → KPI hero.
- **[3] Dribbble / [4] Webflow / [5] AdminLTE templates / [8] WrapPixel** — visual-language + density references only; no feature borrowed.

## 5 · CHANGE items — all 6 mandatory in 5/5 variants

| ID | Specifics (verbatim intent) | F05 implementation |
|---|---|---|
| **C16** | “Add mobile treatments for the requests table … Card-fallback under `sm:`, horizontal scroll with sticky first column, or a ‘view as cards’ toggle” | Under 640px every list/table becomes stacked cards (status + title + meta + real detail action); V2 also offers a “view as cards” toggle; V5 is a card board by default. |
| **C17** | “Compress the sidebar … 260px → 232px; move Blog/Portfolio behind a single ‘Explore’ popover” | `--sidebar:232px`; MAIN (8 items) + ACCOUNT (2) + one `Explore` popover containing Blog + Portfolio; mobile drawer. F03 owns the definitive shell — F05 matches it, no reinvention. |
| **C4** | “Use the darkened AA-safe text tokens … Badges = icon + colour + text — never colour alone” | Every badge = inline SVG icon + `var(--status-*-text)` + label on `var(--status-*-bg)` with `--status-*-border`. |
| **C5** | “`--ta-brand-*` blue becomes *the* `--primary`; the violet `--accent-1` … is deleted” | `shared/tokens.css` imported verbatim by all 5; no violet, no teal. |
| **C6** | “No raw `bg-white` / `gray-200/80` / hard-coded hex card borders — every surface uses `--card` / `--border` / `--shadow-xs`” | All 5 variants use tokenised surfaces in both themes. |
| **C18** | “H1 display 32–40px … the current 24px H1 makes the portal read like an internal tool” | H1 34–38px desktop / 28–32px phone; KPI value 32–40px `tabular-nums`; meta mono for IDs. |

## 6 · ADD items with priority + coverage

| ID | Priority | Where | Requirement | Coverage |
|---|---|---|---|---|
| **A12** | 🟡 P3 | Requests, Quotes, Billing | “Saved views / saved filters — ‘My pending approvals’, ‘This month’, ‘Awaiting me’” | ≥3/5 → implemented in **V1, V2, V3, V4, V5 (5/5)** as deep-linkable chips (`?saved=…`); recorded in `manifest.json`. |

All other A1–A11, A13–A15 belong to other families; A13’s degraded-state banner is **not** claimed as an F05 ADD (the 502 error card + retry is the captured current-UI requirement), though the error state uses a banner-shaped honest layout.

## 7 · KEEP (must survive in every variant)

- **Graceful wording** in empty/error states — captured `Something went wrong`, `Could not load work items.`, `Try again` preserved verbatim; empty-state copy stays encouraging, never blaming.
- **The shadcn-style token architecture** — one `tokens.css`, one `base.css`, per-variant layout CSS.
- Wider lab KEEP context: status-history timeline, milestone stepper, “Awaiting you” pattern, 3-pane messaging, Razorpay trust strips, domain-specific honesty, role-scoped data, ⌘K + keyboard hints (implemented where this family renders them — the palette contains only real actions, C12).

## 8 · Roadmap phases touching F05

- **P0** — resolve `/api/v1/projects` 502 + CORS; retry + support CTA in the error card → F05 ships the designed retry state.
- **P1** — one brand ramp, AA badges, tokenise cards, display type scale → C4/C5/C6/C18.
- **P6** — mobile card-fallbacks for all 6 tables, drawer nav, offline/degraded banner → C16.
- **P7** — restrained motion/density → V2 density toggle, reduced-motion support everywhere.

## 9 · Acceptance checklist (copied verbatim as F05 QA list; sheet 9 / report §7.1)

| Gate | Pass criteria |
|---|---|
| Hierarchy | Most important number nameable in < 2 s |
| KPI cards | value + label + trend/why; exactly one hero |
| Charts | right chart type; no pies > 3 slices (F05 uses no charts) |
| Tables | search, filter, status badge, sort, pagination; mobile card-fallback |
| Navigation | grouped sidebar ≤ 9 top-level; ⌘K real actions only |
| Colour | one brand ramp; status = icon + colour + text; text ≥ 4.5:1, UI ≥ 3:1 |
| Typography | one family + mono for IDs; ≤ 4 body sizes |
| Dark mode | matching dark theme; all surfaces tokenised |
| Accessibility | full keyboard nav, visible focus, ARIA tabs/dialogs, skip link |
| Empty/loading/error | designed state for every list, tab, panel |
| Mobile | 375 / 414 / 768 px; no horizontal page scroll; no clipped CTAs |
| Performance | skeletons instead of spinners; no async layout shift |
| Legal | quote terms 14px, cancellation/dispute routes findable (F07/F11 scope — F05 keeps honest links) |

## 10 · MD ↔ XLSX differences (MD wins; recorded)

1. **Prompt §4 says “KPI strip (Total requests · Under review · Quoted)” (3 KPIs); MD §4 + XLSX sheet 3 row 10 say “4 KPIs”.** The captured DOM shows 4 cells (Total requests / Under review / Quoted / Projects). F05 keeps all 4 cells (content lock) — the prompt’s 3 labels are the required minimum, never a reason to delete `Projects`.
2. **Prompt §4 status-filter list omits `Under review` and `Quoted`; the captured `<select>` has 9 options.** Captured DOM wins (prompt README provenance rule).
3. **MD §6.1 C5** allows “one portal brand (blue), one marketing brand (teal)”; **F05 prompt §5.1 + README** require **one blue for all 23 families**. The family prompt is the task → blue everywhere, teal not used.
4. **Sheet 3 row 11 marks `/requests?view=all` “OK / Good”; the static DOM has zero rows.** F05 treats it as an empty state to design, not as populated data.
5. **Report §1 finding #10 says “375 px”; F05 prompt §4 says “375px mobile card-fallback”, §9.2/§12 say 360/390/768/1024/1440.** F05 checks 360 + 390 + 768 + 1024 + 1440 (superset).
