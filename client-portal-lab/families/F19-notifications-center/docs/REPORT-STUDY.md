# F19 · Notifications Center — REPORT-STUDY (Gate R)

Studied in full:
- `reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md` (§1–§8 cover-to-cover)
- `reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx` — **all 10 sheets opened and verified**:
  `1. Executive Findings` · `2. Design Tokens` · `3. Page Inventory` · `4. Benchmark Patterns` · `5. CHANGE list` · `6. ADD list` · `7. KEEP list` · `8. Roadmap` · `9. Acceptance checklist` · `10. Sources`.
- **MD vs XLSX comparison:** Content aligns across all 10 sheets (XLSX abbreviates `₹` as `Rs` in two example strings on Sheet 5 and adds explicit Priority column `P1/P2/P3` on Sheet 4; `.md` wins per §3 Step 5).

## 1. Executive Findings Touching F19 (Quoted)

- **Finding #3 (High — Badge Contrast):** *"Status badge text fails WCAG AA. Badges use a saturated hue at 12% tint background (`--status-success`, `--status-warning`, `--status-error`, `--status-info`). Measured contrast 1.73 – 3.23 : 1 (AA needs 4.5:1 for 12px text)."*
- **Finding #4 (High — Dual Brand Systems):** *"Two colour systems coexist. Portal chrome uses `--ta-brand-*` (`#465fff` blue) while generic components use `--primary → --accent-1` (`250 100% 52%` = violet-blue)."*
- **Finding #7 (High — Awaiting You Pattern):** *"'Awaiting you' is the strongest idea in the product — replicate the pattern, don't rebuild it."*
- **Finding #9 (High — Notifications Noise):** *"Notifications centre is unfiltered and ungrouped — 57 unread items in one list with 9 tabs but no date grouping, no bulk-select, no per-item action beyond 'mark read'. Client-facing noise; the most-scrolled page after dashboard."* *(Reconciled at Gate S: Arjun Mehta's HTML capture has `Unread (6)` / 8 rows under `This week` + `Earlier`, while still lacking entity grouping, bulk selection, search, and pagination.)*
- **Finding #10 & #11 (Mobile & Dark Mode):** *"Mobile is an afterthought... Dark mode is a checkbox, not a theme — `bg-white` + `gray-200/80` card borders drift."*
- **Finding #12 (Card Hygiene):** *"Card borders are re-declared as raw hex in 6+ different forms across pages. Normalise to tokens."*

## 2. Full Token Audit Summary (Report §3.2 + Sheet 2)

| Group | Live App Observation | Lab Consolidation (§5.2) |
|---|---|---|
| Typeface | `Outfit` sans only; no mono for IDs/timestamps | `--font` (`Outfit` stack) + `--mono` (`IBM Plex Mono` stack) for IDs, export refs, timestamps |
| Type scale | H1 `24–26px`, H2 `14px`, body `14px`, meta `12px` | H1 display `32–40px` (C18), H2 `20–24px`, card title `16–18px`, body `14–16px`, meta `12px`, micro `≥11px` |
| Neutrals | shadcn-style ramp (17.87:1 fg, 6.59:1 muted) | Locked `--background`, `--card`, `--muted`, `--border`, `--foreground`, `--muted-foreground` |
| Brand | `--ta-brand-*` blue + violet `--accent-1` + auth teal | Single `--brand-*` blue ramp (`#465fff` / dark `#465fff` + `--primary-ink`); violet & teal deleted (C5) |
| Status | Full-sat text on 12% tint (1.73–3.23:1 FAIL) | AA-safe `--status-*-bg/text/border` triples + icon + text (never colour alone, C4) |
| Layout & Motion | 260px sidebar, 0 dashboard animations | `--sidebar:232px` (C17), `--header:64px`, `--content:1400px`, `150/280/500ms` spring ease |

## 3. Page Inventory Row (Report §4.1 #41 / Sheet 3 Row 44)

| # | Route | Page | Status | Screenshot | Key Components | Principal UI Issue |
|---|---|---|---|---|---|---|
| 41 | `/notifications` | Notifications centre | OK | `008-notifications` | 9 category tabs, THIS WEEK / EARLIER groups, rows with per-type icon | Unread rows lack bulk actions, entity grouping, and deep-link entity context |

## 4. Benchmark Patterns Applied (Report §5, Sources [1]–[13])

- **AdminLTE Client Portals [1] & Dashboard Examples [2]:** Lead with a clear summary/verdict ("6 unread across 4 expiring quotes and 2 ready data exports"); status is never colour alone (unread badge uses icon + AA text + pill, never just a blue dot).
- **Tailwind Admin [7]:** Search + filter + status + pagination completeness; grouped sidebar with ≤9 top-level items; dark-mode parity.
- **AdminLTE SaaS Dashboards [9]:** Work-queue mental model — expiring quotes are actionable items with direct entity deep links, separated from passive informational exports.
- **Assembly [10] & Moxo [1]:** "Whose move / next step" framing on expiring quote notifications, plus direct link to notification delivery preferences (`Settings ▸ Notifications`).

## 5. CHANGE / ADD / KEEP Scope for F19

### CHANGE (5/5 variants mandatory)
- **C17 — Compress sidebar (232px) + Explore popover** housing Blog & Portfolio.
- **C4 — Fix badge contrast (WCAG AA ≥4.5:1)** using `--status-*-text/bg/border`; unread & category states always pair icon + text (never colour alone).
- **C5 — Single brand ramp** (`--brand-*` blue only; zero violet/teal).
- **C6 — Tokenise cards** (`--card`, `--border`, `--shadow-xs`; zero `bg-white` / `gray-200/80`).
- **C18 — Display type scale** (`H1` 32–40px desktop, 28–32px mobile; mono for entity IDs & timestamps).

### ADD (5/5 variants — core family rebuild)
- **A7 (P2, elevated to 5/5 per §4/§6) — Notification grouping + entity deep links:** Group flat rows into entity cards (`Quote · 01a10b3a…`, `Quote · 01a10b35…`, `Quote · 01a10aa6…`, `Quote · 01a10aa3…`, and `Account · Data exports (4)`), preserve date groups (`Today` / `This week` / `Earlier`), add multi-select checkboxes + bulk `"Mark read"` (`POST /api/v1/notifications/read-selected`), search/filter, and pagination.

### KEEP (5/5 variants)
- **Graceful wording** (`"Stay updated on your projects and account."`, exact row copy, instructive per-tab empty copy).
- **shadcn-style token architecture** (`shared/tokens.css`).

## 6. Roadmap Phases & Acceptance Checklist (QA Gate)

- **Roadmap phases touching F19:** **P1** (Foundations: C4, C5, C6, C18) · **P5** (Communication: A7 notification grouping + deep links) · **P6** (Responsive mobile fallback) · **P7** (Polish: motion + density).
- **Acceptance Checklist (§7.1 / Sheet 9 — copied verbatim as QA contract):**
  1. **Hierarchy:** Single most important count/action understood in < 2 s.
  2. **KPI / summary cards:** Value + label + why; one primary focus.
  3. **Lists / Tables:** Search, filter, status badge, sort/grouping, pagination, mobile card-fallback.
  4. **Navigation:** 232px grouped sidebar, Explore popover, accurate ⌘K palette.
  5. **Colour:** One blue ramp; status = icon + colour + text; text ≥ 4.5:1, UI ≥ 3:1.
  6. **Typography:** Outfit + mono for IDs/timestamps; H1 32–40px; nothing < 11px.
  7. **Dark mode:** Tokenised surfaces verified in `.dark`.
  8. **Accessibility:** Full keyboard nav, `:focus-visible`, ARIA `tablist`/`tab`/`tabpanel`, live region announcements.
  9. **Empty / loading / error:** Designed per-tab empty state, skeleton loader, and error state with retry.
  10. **Mobile:** 360 / 390 / 768 px clean, zero horizontal overflow.
  11. **Performance:** Instant skeletons, zero CLS, offline-clean.

```
## GATE R (F19)
MD read: YES · XLSX sheets: 10/10 · C-items mapped: 5/5 (C17, C4, C5, C6, C18) · A-items mapped: 1/1 (A7 in 5/5)
KEEP listed: YES · Checklist copied: YES
Gate: PASS
```
