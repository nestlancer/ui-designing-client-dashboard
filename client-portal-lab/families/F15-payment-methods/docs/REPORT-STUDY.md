# F15 · Payment Methods — REPORT-STUDY (Gate R)

Read `.md` report cover-to-cover + all 10 `xlsx` sheets (same 10 titles as F14). MD wins on conflict.

**Findings that touch this page (quoted):** #3 "Status badge text fails WCAG AA … 1.73–3.23:1" (C4); #4 "Three colour systems coexist" (C5); #10 "Mobile is an afterthought" (rows need card fallback); #11 "Dark mode is a checkbox" (C6); #12 "card borders are re-declared as raw hex" (C6); #13 "Type scale H1 24/32 600 … portal never feels premium" (C18); #2 the `/api/v1/projects` 502 → honest degraded state + retry. Report §6.3 KEEP: **Razorpay trust strips**, **domain-specific honesty**, **graceful wording**, **shadcn-style token architecture**.

**Token table (sheet 2 / §3.2):** Outfit; H1 24/32/600 (captured 26px); body 14, meta 12, micro 11; **no mono** → lab adds `--mono` for refs/last4. Neutrals bg/card/muted/border/fg/muted-fg → `--background #f6f8fb`, `--card #fff`, `--muted #f1f5f9`, `--border #dbe3ec`, `--foreground #0f1c2e`, `--muted-foreground #45556b`. Brand `--ta-brand-50 #ecf3ff → -500 #465fff → -600 #3641f5 → -700 #2a31d8 → -950 #161950` becomes `--primary`; violet `--accent-1` deleted (focus-ring only). Status hues keep hue + darkened AA text + borders. Radii 6/10/14/20; shadows xs/sm; sidebar 232, header 64, content 1400; motion 150/280/500 + spring.

**Page-inventory row (sheet 3):** `/payments/methods` — "Saved Payment Methods Page", screenshot `011-payments-methods`, key components KPI strip + empty explainer + trust strip; principal issue: **dead-end explainer, no management**.

**Benchmark patterns (13 sources + Gate T):** [9] "design the customer-facing billing page as carefully as the admin one"; [2][13] one dominant metric, colour reserved for state; [7] grouped sidebar + table/list states; [11] self-service; [5][12] shadcn tokens + keyboard/ARIA. Gate T adds Stripe CustomerSheet, Shadcn UI Blocks saved-methods panel (token-honesty lede, delete-means-delete footer), ecommerceguide radio list, RBI/UPI-AutoPay mandate guidance.

**CHANGE (5/5):** C17 (232px sidebar, 64px header, Explore popover, ≤9 items) · C4 (AA badges, icon+text) · C5 (one blue ramp) · C6 (`--card`/`--border`/`--shadow-xs`) · C18 (H1 32–40, money hero 32–40 `tabular-nums`, mono refs).

**ADD:** **A6 — Payment-method management that actually works** — 🟠 P2, **≥3/5** (V1, V2, V4, V5). Real: `GET/POST /api/v1/payments/methods`, `PATCH /methods/{id}/default`, `/nickname`, `DELETE /methods/{id}`. **UPI mandates have no endpoints** → demo-labelled. Family must-includes (all 5): captured empty/dead-end state + explainer + "Go to payments", trust strip + chips, add-card/add-UPI flows with validation + success + failure, primary selection, removal with confirmation, brand/route honesty.

**KEEP (every variant):** the Razorpay trust strip; honesty microcopy (manual token entry not supported, no silent save); shadcn-style token architecture.

**Roadmap:** P1 foundations (C4/C5/C6/C18) · P2 money screens (adjacent) · P6 responsive/PWA · P7 polish.

**Acceptance checklist (§7.1, QA list):** hierarchy <2s · KPI value+label+trend/why with one hero · right chart type · table/list search+filter+sort+pagination+mobile fallback · nav ≤9 + real ⌘K · one brand ramp, text ≥4.5:1 / UI ≥3:1, status icon+colour+text · one family + mono, display money scale · dark parity · keyboard/ARIA/skip · empty + skeleton + error on every list/tab/panel · 360–1440 no scroll/clipping · skeletons not spinners · legal/dispute routes findable.

**MD↔XLSX differences:** sheet 2 H1 `24/32 600` vs captured `26/32 700` (captured DOM wins); sheet 3 lists 53 states vs README's 55 files; sheet 5 C4's `--status-warning-text 32 90% 28%` vs §5.2 `#8a5a00` (token file wins).

```
## GATE R (F15)
MD read: YES · XLSX sheets: 10/10 · C-items mapped: 5/5 · A-items mapped: 1/1
KEEP listed: YES · Checklist copied: YES
Gate: PASS
```
