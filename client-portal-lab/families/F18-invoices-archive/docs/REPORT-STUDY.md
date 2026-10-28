# F18 · Invoices Archive — REPORT-STUDY (Gate R)

Read `.md` report cover-to-cover + all 10 `xlsx` sheets. MD wins on conflict.

**Findings touching this table:** #3 badge contrast 1.73–3.23:1 (C4) · #4 three palettes (C5) · #7 "awaiting-you" pattern missing on invoices (KEEP/reuse) · #10 mobile is an afterthought → **C16** card-fallback under `sm:` · #11 dark mode checkbox (C6) · #12 raw hex borders (C6) · #13 H1 24/32/600 (C18) · #1 money screens deserve the best hierarchy · #2 `/api/v1/projects` 502 → error+retry. §6.3 KEEP: **"Awaiting you" pattern reused on invoices**, **tabular money + mono `NL-INV-2026-…` references**, Razorpay trust strip, graceful wording.

**Tokens (sheet 2/§3.2):** Outfit; report H1 24/32/600 vs captured 26/32/700 (DOM wins); body 14, meta 12, micro 11; **no mono** → `--mono` for invoice IDs/amounts. Neutrals `#f6f8fb / #fff / #f1f5f9 / #dbe3ec / #0f1c2e / #45556b`; brand `--ta-brand-*` blue → `--primary`; violet deleted (focus-ring only); status hues keep hue with AA darkened text + borders; radii 6/10/14/20; shadows xs/sm; 232/64/1400; motion 150/280/500 + spring.

**Page inventory (sheet 3):** `/invoices` — "Invoices Archive", screenshot `003-invoices`, one bare 5-row table, principal issue: no search/filter/pagination/dates/total, no mobile story.

**Benchmark (13 report sources + Gate T):** [9] customer-facing billing deserves admin-level care; [2][13] one dominant metric, colour reserved for state; [7] Awaiting-you queue + status filters; [5][12] shadcn token architecture/keyboard; [11] self-service downloads. Gate T: shadcn Data Table, ShadcnDeck data table, Creative Tim table blocks (saved views, density, row actions), Shadcn Payment Dashboard (KPI strip + dark badges), AdminLTE SaaS/fintech dashboards, SaaSFrame honest zero/unknown/unavailable, SaaSUI calm exactness, Stripe checkout trust, shadcn saved-methods honesty.

**CHANGE (6/6, all 5):** **C16** mobile card-fallback OR view-as-cards toggle for the table · **C17** 232/64 shell + Explore popover · **C4** AA badges icon+text · **C5** one blue ramp · **C6** tokenised cards · **C18** H1 32–40 + money hero 32–40 `tabular-nums`.

**ADD:** **Family ADD — Table powers** (all 5): search, filter, pagination, **date column**, **total row**. **A10 — PDF statement of account / GST invoice summary download** — 🟠 P2 ≥3/5; ⚠ **no statement endpoint**: demo-labelled or honestly composed from `GET /invoices/{id}/download` (V1, V2, V4, V5 = 4/5).

**KEEP (every variant):** Awaiting-you pattern (overdue/pending invoice queue), tabular money + mono refs, Razorpay trust strip where present, graceful wording, shadcn tokens.

**Roadmap:** P1 foundations (C4/C5/C6/C18) · P2 money screens (A10) · P6 responsive (C16) · P7 polish.

**§7.1 acceptance checklist:** hierarchy <2s · KPI value+label+trend/why, one hero · right chart type · **table search+filter+sort+pagination+status+mobile fallback** · nav ≤9 + real ⌘K · AA text 4.5 / UI 3.0, icon+text status · one family + mono refs · dark parity · keyboard/ARIA/skip · zero/skeleton/error on every list/tab/panel · 360–1440 no scroll · skeleton-first · legal/dispute routes findable.

**MD↔XLSX differences:** H1 24/32/600 vs captured 26/32/700 (DOM wins) · sheet 3 53 states vs README 55 files · sheet 5 C4 warning text hsl vs §5.2 `#8a5a00` (tokens win).

```
## GATE R (F18)
MD read: YES · XLSX sheets: 10/10 · C-items mapped: 6/6 · A-items mapped: 2/2 (family + A10)
KEEP listed: YES · Checklist copied: YES
Gate: PASS
```
