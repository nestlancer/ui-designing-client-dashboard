# F14 · Billing Center — REPORT-STUDY (Gate R)

Sources read: `reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md` (365 lines, cover-to-cover) + all 10 sheets of `reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx` (`1. Executive Findings · 2. Design Tokens · 3. Page Inventory · 4. Benchmark Patterns · 5. CHANGE list · 6. ADD list · 7. KEEP list · 8. Roadmap · 9. Acceptance checklist · 10. Sources`). MD wins on conflict; differences noted below.

## Executive findings that touch billing (quoted)

- #2 "**Projects API returns HTTP 502 / CORS-blocked**" — design the honest degraded state with retry + support CTA, never pretend the 502 away.
- #3 "**Status badge text fails WCAG AA** … measured contrast **1.73–3.23:1** (AA needs 4.5:1 for 12px)" → C4.
- #4 "**Three colour systems coexist**" → C5, one blue ramp.
- #7 "**'Awaiting you' is the strongest idea in the product** — but it exists only on the dashboard and is not reused on the pages that need it (project milestones, quote approval, invoices)" → reuse on the billing ledger.
- #10 "**Mobile is an afterthought** … the 3-column billing table ha[s] no mobile treatment" → C16.
- #11 "**Dark mode is a checkbox, not a theme**" → C6 + tokenised surfaces.
- #12 "**Design-system hygiene is good in places, absent in others** … card borders re-declared as raw hex" → C6.
- #13 type scale "H1 `24/32 600`" → C18 (32–40px H1 + money hero).
- Report §4.2: "**Payment checkout** … 🔴 Decides cash-in — rich but noisy"; Billing is its upstream ledger.

## Token table (report §3.2 / sheet 2 — the full audit, condensed)

| Group | Live | Lab (§5.2 locked) |
|---|---|---|
| Type | Outfit self-hosted; H1 24/32/600; body 14; meta 12; micro 11; **no mono** | Outfit + `--mono` for refs/IDs; H1 32–40; money hero 32–40 `tabular-nums` |
| Neutrals | bg 210 40% 98%; card white; muted 210 40% 96%; border 214 32% 91%; fg 222 47% 11%; muted-fg 215 16% 38% | `--background #f6f8fb · --card #fff · --muted #f1f5f9 · --border #dbe3ec · --foreground #0f1c2e · --muted-foreground #45556b` |
| Brand | `--ta-brand-50 #ecf3ff → -500 #465fff → -600 #3641f5 → -700 #2a31d8 → -950 #161950` | that ramp = `--primary`; violet `--accent-1` deleted (focus-ring only) |
| Status | success 160 84% 39%, warning 38 92% 50%, error 0 84% 60%, info 200 98% 48%, purple 270 76% 53% @ 12% tint | same hues + **darkened AA text** + borders (`--status-*-bg/-text/-border`) |
| Radii / shadow / layout | .875rem; sm6/md10/lg14/xl20; mixed shadows; sidebar 260 vs expanded 232; header 64; content 1400 | `--radius-*` 6/10/14/20; `--shadow-xs/sm`; `--sidebar 232px`, `--header 64px`, `--content 1400px` |
| Motion | fast 150 / normal 280 / slow 500 + spring | same (`--duration-*`, `--ease-spring`) |

## Page-inventory rows (sheet 3 / report §4.1)

- Row 36 `/payments` — "Billing Center (KPIs + Transaction History Table)" — `009-payments`; key components: 3 money KPIs, status filter, 11-row table, Razorpay strip; principal issue: **no settled/outstanding split, no work queue, no mobile treatment, no search/sort/pagination**.
- Rows 37–42 `/payments/methods`, `/payments/{id}`, `/invoices` are the linked siblings our CTAs must resolve to.
- Report §6.1 rebuild: "**Billing Center as ledger + work queue**" (P2 — the three money screens).

## Benchmark patterns applied (report §5, 13 sources)

[9] SaaS dashboard patterns — **"Separate the money you have from the money you are owed"**, "failed payments and expiring cards … are **work queues rather than metrics**", "invoices past due, aged", "design the **customer-facing** billing page as carefully as the admin one" → V1–V5 settled/outstanding split + A5 queue.
[2] + [13] — one dominant metric, colour reserved for state, typographic hierarchy (big number, cents lighter) → money hero + C4 badges.
[1] AdminLTE client-dashboard rules — verdict line, explain every number, show the next step → "why" line under every KPI.
[7] Tailwind Admin — tables with search + filter + status + pagination + grouped sidebar → F14 table powers.
[11] Softr — **"Ask AI on any data block"** → A1.
[5][12] — shadcn tokens, production readiness, keyboard/ARIA → all variants.
[4] Webflow — ⌘K is table stakes → real-action palette.

## CHANGE items — F14 scope (all 5/5 variants)

| ID | Specifics |
|---|---|
| C16 | Mobile treatment for the billing table: card fallback under 760px, sticky-first-column scroll option, "view as cards" toggle. |
| C17 | 232px sidebar + 64px header + breadcrumb + ⌘K + theme + bell + avatar; Blog/Portfolio behind one **Explore** popover; ≤9 top-level items. |
| C4 | Badges use `--status-*-text` on tinted bg + icon + text; never colour alone; text ≥4.5:1. |
| C5 | One brand ramp (`--primary` = `--brand-500`); no violet/teal accents; `--accent-1` focus-ring only (documented). |
| C6 | All surfaces `var(--card)` / `var(--border)` / `var(--shadow-xs)`; no `bg-white` / raw hex borders. |
| C18 | H1 32–40px display; money hero 32–40px `tabular-nums`; mono for refs. |

## ADD items — F14 scope

| ID | Priority | Coverage | Gate-A honesty |
|---|---|---|---|
| A1 "Ask AI about your billing" | 🔴 P1 | **5/5** | No inference endpoint → demo-labelled assistant over the frozen ledger; answers only from captured rows/KPIs. |
| A5 Billing work queue ("2 payments awaiting verification", "1 invoice 12 days overdue") | 🟠 P2 | **≥3/5** (V1,V3,V4,V5) | Grounded by `POST /api/v1/webhooks/razorpay` events + admin `/verify` / `/approve-transfer` / `/disputes`; client never performs admin verify. |
| A10 PDF statement of account / GST summary | 🟠 P2 | **≥3/5** (V1,V3,V5) | **No statement endpoint.** Demo-labelled or an honest composition of `GET /api/v1/invoices/{id}/download`. |
| A12 Saved views / saved filters | 🟡 P3 | **≥3/5** (V1,V2,V4) | Client-side only (localStorage); labels from report: "My pending approvals", "This month", "Awaiting me". |

Family must-includes (all 5): ledger + work queue rebuild, 3 KPIs with captured values, transaction table (search/filter/sort/pagination + mobile fallback), Invoices/Payment-methods links, money grammar.

## KEEP (every variant)

- **Tabular money + mono references** (report §3.2 gap) — `₹81,500.00`, `NL-INV-…`, `01a10a2b-…` in `--mono` + `tabular-nums`.
- **"Awaiting you" pattern reused** on overdue/verifying items.
- **Graceful wording** (report §6.3) — never over-promise, keep the "not available" honesty notes.
- Razorpay trust strip + method chips (captured on this page).

## Roadmap phases touching F14

P1 Foundations (C4/C5/C6/C18) · **P2 The three money screens — "Billing Center as ledger + work queue"** · P6 Responsive & PWA (C16 mobile card-fallback) · P7 Polish (motion).

## Acceptance checklist (§7.1 — copied as QA list)

Hierarchy <2s · KPI value+label+trend/why, exactly one hero · right chart/no pies · tables with search/filter/sort/pagination + mobile card-fallback · grouped sidebar ≤9, ⌘K real actions, jump-to-payment · one brand ramp, text ≥4.5:1 & UI ≥3:1, status = icon+colour+text · one family + mono, display scale for money · dark parity · keyboard/ARIA/skip · designed empty + skeleton + error on every list/tab/panel · 360/390/768/1024/1440 no horizontal scroll, no clipped CTAs · skeletons not spinners, no CLS · legal/dispute routes findable.

## MD ↔ XLSX differences

- Sheet 2 states H1 `24/32 600`; the captured DOM (audit `h1Style`) is **26px/32px/700**. MD §3.2 says 24/32 600. Frozen baseline uses the **captured DOM** (prompts' review provenance rule); recorded here as an illustration difference.
- Sheet 5 CHANGE C4 quotes `--status-warning-text 32 90% 28% = 6.81:1`; §5.2 token file uses `#8a5a00`. Same intent; CSS token file wins for the lab.
- Sheet 3 calls 53 audited pages/states; README lists **55 HTML files**. Neither changes F14's scope (1 state).

```
## GATE R (F14)
MD read: YES · XLSX sheets: 10/10 · C-items mapped: 6/6 · A-items mapped: 4/4
KEEP listed: YES · Checklist copied: YES
Gate: PASS
```
