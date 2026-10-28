# F17 · Payment Status — REPORT-STUDY (Gate R)

Read `.md` report cover-to-cover + all 10 `xlsx` sheets. MD wins on conflict.

**Findings touching status pages:** #3 badge contrast 1.73–3.23:1 (C4) · #4 three palettes (C5) · #6 "what unlocks this" missing (C9) · #11 dark mode checkbox (C6) · #12 raw hex borders (C6) · #13 H1 24/32/600 (C18) · #1 billing deserves the best hierarchy · #10 mobile afterthought · #2 `/api/v1/projects` 502 → honest error + retry. §6.3 KEEP: **"Checkout not available yet"** and not-due honesty copy (exemplary), legal/dispute routes first-class, graceful wording.

**Tokens (sheet 2/§3.2):** Outfit; report H1 24/32/600 vs captured 26/32/700 (DOM wins); body 14, meta 12, micro 11; **no mono** → `--mono` for references/amounts. Neutrals `--background #f6f8fb` / `--card #fff` / `--muted #f1f5f9` / `--border #dbe3ec` / `--foreground #0f1c2e` / `--muted-foreground #45556b`; `--ta-brand-*` blue ramp → `--primary`; violet `--accent-1` deleted (focus-ring only); status hues keep hue with AA darkened text + borders; radii 6/10/14/20, shadows xs/sm, sidebar 232, header 64, content 1400; motion 150/280/500 + spring.

**Page inventory (sheet 3):** 30 completed / 31 not-due-yet — "Payment Details" with receipt/invoice, dispute link, stepper, unlock guidance; principal issue: unlock text has no link.

**Benchmark (report 13 sources + Gate T):** [2][13] one dominant metric, colour for state; [9] customer-facing billing deserves care; [11] self-service status; [5][12] shadcn tokens/keyboard; [7] status filters + empty states. Gate T adds SaaSUI calm-exact billing copy, SaaSFrame honest zero/unknown/unavailable states, Stripe checkout best practices/UI strategies (stepper + labelled progress), AdminLTE fintech verdict rows, shadcn data-table empty states.

**CHANGE (6/6, all 5):** **C9** "what unlocks this" as a deep link to the blocking milestone + approve action · **C17** 232/64 shell + Explore popover, ≤9 items · **C4** AA badges icon+text · **C5** one blue ramp · **C6** tokenised cards · **C18** H1 32–40 + money hero 32–40 tabular-nums.

**ADD:** **A3 — Milestone unlock explainer + "unlock me" deep links** — 🔴 **P1 → 5/5**. Real endpoint `POST /api/v1/milestones/{id}/approve`; explainer must say what happens next and whose move it is.

**Family must-includes (all 5):** both captured states; completed receipt/invoice + Billing documents + File a payment dispute + stepper; not-due verbatim copy + "Checkout not available yet" + C9/A3 deep link; hero ₹22,500.00, tabular-nums, mono refs; Razorpay strip; empty/skeleton/error.

**KEEP (every variant):** "Checkout not available yet" + not-due honesty copy; legal/dispute route first-class; graceful wording; shadcn-style tokens.

**Roadmap:** P1 foundations (C4/C5/C6/C18/C9/A3) · P2 money screens · P6 responsive · P7 polish.

**§7.1 acceptance checklist:** hierarchy <2s · KPI value+label+why, one hero · right chart type · table powers where lists appear · nav ≤9 + real ⌘K · text ≥4.5:1 / UI ≥3:1, icon+text status · one family + mono refs · dark parity · keyboard/ARIA/skip · zero/skeleton/error on every list/tab/panel · 360–1440 no scroll · skeleton-first · legal/dispute/cancellation findable.

**MD↔XLSX differences:** H1 24/32/600 vs captured 26/32/700 (DOM wins) · sheet 3 53 states vs README 55 files · sheet 5 C4 warning text hsl vs §5.2 `#8a5a00` (tokens win).

```
## GATE R (F17)
MD read: YES · XLSX sheets: 10/10 · C-items mapped: 6/6 · A-items mapped: 1/1 (A3 P1)
KEEP listed: YES · Checklist copied: YES
Gate: PASS
```
