# GATE R — Reports study

Sources read in full: `reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md` (365 lines, §1–§8) and `reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx` — **all 10 sheets**: `1. Executive Findings` · `2. Design Tokens` · `3. Page Inventory` · `4. Benchmark Patterns` · `5. CHANGE list` · `6. ADD list` · `7. KEEP list` · `8. Roadmap` · `9. Acceptance checklist` · `10. Sources`.

**Conflict rule applied:** `.md` wins. Deltas found (recorded, not silently resolved):

| Item | `.md` | `.xlsx` | Resolution |
|---|---|---|---|
| Colour systems | "Two colour systems coexist" (finding 4) + §3.2 lists three palettes | "Three colour systems coexist" (sheet 1), tokens sheet also 3 | Both describe the same three palettes; lab fixes all three → **one** (§5) |
| Screenshot gap | Finding 13: "6 routes the screenshots don't cover" | Page Inventory rows 01–03 mark auth screens `-` screenshot | Same fact; baseline in `BASELINE-MAP.md` uses 45/45 screenshots + 55/55 HTML |
| Sidebar width | `--sidebar-width 260px` and `--ta-sidebar-expanded 232px` | same | Lab uses **232px** (C17) — the expanded token, not the wrapper width |
| Status text variants | C4 names `warning 32 90% 28% = 6.81:1` as an example | same | Lab ships the exact darkened hex set from prompt §5 (`#8a5a00` etc.) |
| Project states | report says 53 audited pages/states | sheet 3 has 56 rows incl. header + 53 entries + 2 blanks | Count = 53 audited pages/states; 23 families |

## 1. The 13 executive findings (quoted, §1 of the report)

| # | Finding (quoted) | Severity | Lab consequence |
|---|---|---|---|
| 1 | "The live UI matches the repo screenshots." | — | screenshots are a valid baseline (Gate S) |
| 2 | "The portal has no broken pages — but the API layer is fragile. `GET /api/v1/projects` returns **HTTP 502 (Cloudflare origin_bad_gateway)** and is also CORS-blocked…" | 🔴 Critical | F08/F09/F05 receive a designed degraded state (A13) |
| 3 | "Status badge text fails WCAG AA… Measured contrast **1.73 – 3.23 : 1**." | 🔴 High | C4 in all 115 |
| 4 | "Two colour systems coexist… Login page marketing panel uses a **third** palette (`--accent-1: 175 84% 26%` teal)." | 🟠 High | C5/C12 — one ramp incl. auth |
| 5 | "The dashboard is a status board, not a reassurance page… no *verdict sentence*, no trend, no dates on the pipeline bars, no deadline." | 🟠 High | C1–C3, C14 |
| 6 | "Messaging is split across 2 routes and needs 3 clicks." | 🟠 High | C11 |
| 7 | "\"Awaiting you\" is the strongest idea in the product — but it exists only on the dashboard." | 🟠 High | KEEP + reuse on milestones/quotes/invoices |
| 8 | "Settings ▸ Activity is a wall of 57 identical \"LOGIN / User signed in successfully\" rows." | 🟠 High | C10 |
| 9 | "Notifications centre is unfiltered and ungrouped — 57 unread items in one list." | 🟠 High | A7 + grouping |
| 10 | "Mobile is a afterthought… data tables have no horizontal-scroll or card-fallback." | 🟠 High | C16 in every table family |
| 11 | "No dark-mode QA… 191 `dark:` utilities coexist with hard-coded `gray-200/80`." | 🟡 Medium | C6 + dark parity on all 115 |
| 12 | "Design-system hygiene is good in places, absent in others… card borders are re-declared as raw hex in 6+ different forms." | 🟡 Medium | C6 |
| 13 | "The repo screenshot set is incomplete vs. the live product — 6 routes the screenshots don't cover." | 🟡 Medium | baseline uses 55 HTML snapshots |

## 2. Token table (report §3.2 + sheet 2) — what the lab changes

| Group | Live value | Lab decision |
|---|---|---|
| Typeface | Outfit single family | Outfit + `--mono` for IDs/references/timestamps (report gap) |
| Type scale | H1 24/32, H2 14, body 14/1.75, meta 12, micro 11 | H1 display **32–40**, H2 20–24, card title 16–18, body 14–16, meta 12, micro 11 (C18) |
| Neutrals | shadcn ramp (AA) | kept verbatim as `--background/--card/--muted/--border/--foreground/--muted-foreground` |
| Brand | `--ta-brand-50…#465fff…#161950` | becomes `--primary` / `--ring` — the only brand ramp (C5) |
| Conflicting accent | `--accent-1 250 100% 52%` violet | **deleted**; focus ring uses `--brand-500` (C5) |
| Third palette | auth teal `175 84% 26%` | **deleted**; auth uses the blue ramp (C5/C12) |
| Status | full-saturation hue on 12% tint → 1.73–3.23:1 | bg tint + border + **darkened AA text** + icon (C4) |
| Radii | 6/10/14/20 | kept — one radius per component type (cards `--radius-lg`) |
| Shadows | 3–4 vocabularies | `--shadow-xs` / `--shadow-sm` only (C6) |
| Layout | sidebar 260 / 232 / 56, header 64, content 1400 | `--sidebar:232px`, `--header:64px`, `--content:1400px` (C17) |
| Motion | 150/280/500 + spring, `animate-in` = 0 | motion tokens used for real interactions only; `prefers-reduced-motion` honoured |
| Scrollbar | 6px custom thumb | kept (native thin scrollbars; no new token) |
| A11y | 48 focus rings, 28 aria-labels, role=tab | kept and extended to every overlay, table and tab in the lab |

## 3. Benchmark patterns adopted (sheet 4, 13 sources)

| Pattern | Source | Adopted as |
|---|---|---|
| Verdict-first summary | [1] AdminLTE client-portal, [2] AdminLTE dashboards | verdict line in F03/F09/F11/F14 |
| "What happens next" panel | [1] Moxo, [2] GitHub Pulse | "Awaiting you" reused (F03, F09, F10, F11, F18) |
| Explain every number | [1] | KPI `why` line + labelled pipeline (C3) |
| One dominant metric | [2] Mercury, [13] fintech | 1 hero + 4 secondary (C1) |
| Status never colour alone | [2] Home Assistant | icon + colour + text everywhere (C4) |
| Colour = state, not decoration | [2] Grafana, [13] | single ramp (C5) |
| Density follows expertise | [2] Plausible vs Matomo | each family ships a minimal and a dense variant |
| Settled vs outstanding money | [9] SaaS billing | F14 ledger split |
| Failed/aged items as work queues | [9] | A5 billing queue |
| Findable dispute route | [9] | F17 dispute kept, F14 row action |
| Command palette | [4][5][6] | F04, accurate actions only (C12) |
| Empty states that teach | [9] | every variant |
| Activity grouped/filterable | [9] | C10 |
| Ask-AI on your data | [11] Softr, [5] | A1 on project/quote/billing |
| Resource/knowledge hub | [11][10] | A2 project Help |
| Approval + revision loop | [8][13] | A4 deliverable reject |
| PWA / mobile-first | [5][6][12][11] | mobile card-fallbacks (C16), install affordance labelled demo-only |
| Per-client scoped access | [1] Softr | kept (no cross-client data in any variant) |

## 4. CHANGE list C1–C20 → target families (all 5 variants of each)

| ID | Change | Target families | Lab evidence |
|---|---|---|---|
| C1 | 1 hero + 4 secondary KPIs | F03 | hero action card + `KPI strip` |
| C2 | Plain-English verdict line | F03, F09, F11, F14 | `.verdict` sentence under H1 |
| C3 | Label pipeline bars (value + % + reason) | F03 | labelled meters with reasons |
| C4 | Badge contrast AA | **all 23** | `--status-*-text` tokens + icon |
| C5 | One brand ramp | **all 23** | `tokens.css` has one ramp; auth uses it |
| C6 | Tokenised cards | **all 23** | `.card` uses `--card/--border/--shadow-xs` |
| C7 | Quote sign 3-step block | F11 | steps 1 numbers → 2 terms → 3 sign |
| C8 | One primary checkout CTA | F16 | single `.btn--primary`; cancel = footer link |
| C9 | "What unlocks this" on not-due | F17 | deep link to blocking milestone |
| C10 | Rebuild Activity | F21 | day groups, collapsed LOGIN, filters, pagination |
| C11 | Merge Messages entries | F12 | `/messages` renders inbox; overview summary kept as a strip |
| C12 | Fix palette actions | F04 | only New request / New message / Switch theme / jump-to-payment / jump-to-approval |
| C13 | Real file preview | F22 | image inline, PDF frame placeholder, unsupported = designed card |
| C14 | Instructive empty dashboard tabs | F03 | Projects 0 → "Accept a quote to open your first project →" |
| C15 | Styled Bank/UPI file input | F16 | `.drop` dropzone, never `<input type=file>` visible |
| C16 | Mobile table treatments | F05,F10,F14,F18,F21,F22 | card-fallback under 720px + sticky first column |
| C17 | Sidebar 232 + Explore popover | **all shell variants** | `--sidebar:232px`, Explore disclosure |
| C18 | Type scale w/ display size | **all 23** | `.h1` 32–40px |
| C19 | "Why is this locked" | F09 | locked milestone microcopy + unlock link |
| C20 | Profile placement / Public profile framing | F20 | "Public profile" section label + visibility honesty |

Coverage rule: every C-item must appear in **5/5** variants of its target families — recorded per variant in `manifest.json → fixes`.

## 5. ADD list A1–A15 → priority + target families

| ID | Addition | Priority | Target families | Coverage rule |
|---|---|---|---|---|
| A1 | Ask AI about this project / quote / billing | 🔴 P1 | F09, F11, F14 | 5/5 |
| A2 | Project-scoped help & FAQ hub | 🔴 P1 | F09 | 5/5 |
| A3 | Milestone unlock explainer + deep links | 🔴 P1 | F09, F17 | 5/5 |
| A4 | Deliverable reject / request revision with reason | 🔴 P1 | F09 | 5/5 |
| A5 | Billing work queue | 🟠 P2 | F14 | ≥3/5 |
| A6 | Working payment-method management | 🟠 P2 | F15 | ≥3/5 |
| A7 | Notification grouping + entity deep links | 🟠 P2 | F19 | ≥3/5 |
| A8 | Quote negotiation thread | 🟠 P2 | F11 | ≥3/5 |
| A9 | Project health mini-grid | 🟠 P2 | F03 | ≥3/5 |
| A10 | PDF statement / GST summary download | 🟠 P2 | F14, F18 | ≥3/5 |
| A11 | PWA install + mobile-first | 🟡 P3 | F03 shell | ≥3/5 |
| A12 | Saved views / saved filters | 🟡 P3 | F05, F10, F14 | ≥3/5 |
| A13 | Degraded / offline state banner | 🟡 P3 | F05, F08, F09 (global pattern) | ≥3/5 |
| A14 | Expectation log (promised vs delivered) | 🟡 P3 | F09 | ≥3/5 |
| A15 | Activity digest by project | 🟡 P3 | F09 | ≥3/5 |

## 6. KEEP list (must survive in every variant of the owning family)

Status-history timeline (F07) · milestone stepper with dual Delivery/Payment status and gated locks (F09) · "Awaiting you" pattern, now reused (F03/F09/F10/F11/F18) · 3-pane messaging shell, quick replies, mentions, attachments, inline edit (F12/F13) · graceful microcopy ("One action will unblock your workspace", "Your team will post daily updates here as work continues", "Checkout not available yet", "UPI ID entry is not available on desktop browsers") · Razorpay trust strips (F14/F15/F16/F17) · domain-specific honesty ("Client-to-client messaging is not available") · role-aware scoped data · ⌘K palette + keyboard hints (F04) · shadcn-style token architecture (all).

## 7. Roadmap P0–P7 → lab mapping

| Phase | Lab expression |
|---|---|
| P0 Fix production | F08/F09/F05 honest degraded state + A13 banner (the 502 is *designed for*, not hidden) |
| P1 Foundations | `shared/tokens.css` + `shared/base.css` used by 115/115; C4/C5/C6/C18 |
| P2 Money screens | F11 (C7), F16 (C8/C15), F14 (ledger + queue A5) |
| P3 Dashboard rebuild | F03 ×5 (C1–C3, C14, A9, A11) |
| P4 Delivery loop | F09 (C19, A2, A3, A4, A14, A15) |
| P5 Communication | F12 (C11), F19 (A7), F21 (C10), F13 receipts/typing/SLA |
| P6 Responsive & PWA | C16 in all table families; 360–1440 checks; A11 |
| P7 Polish | motion tokens, tabs, command palette, density contrast between variants |

## 8. Acceptance checklist copied as the QA list (§7.1)

1. **Hierarchy** — one most-important number nameable in <2s.
2. **KPI cards** — value + label + trend/why; exactly one hero.
3. **Charts** — bar for discrete buckets, one big number for a single figure, no pies >3 slices.
4. **Tables** — search, filter, status badge, sort, pagination, mobile card-fallback.
5. **Navigation** — grouped sidebar ≤9 top-level, ⌘K jumps to every page & pending action, palette has only real actions.
6. **Colour** — one ramp, state-only colour, status = icon + colour + text, text ≥4.5:1, UI ≥3:1.
7. **Typography** — one family + mono, ≤4 body sizes, display scale for money.
8. **Dark mode** — matching theme, tokenised surfaces, verified page-by-page.
9. **Accessibility** — keyboard, focus visible, ARIA tabs/dialogs, skip link, 2FA.
10. **Empty/loading/error** — designed for every list, tab, panel, table.
11. **Mobile** — 360/390/768 pass, no horizontal page scroll, no clipped CTA.
12. **Performance** — skeletons not spinners, no layout shift.
13. **Legal** — quote terms ≥14px, e-signature explains what is signed, cancellation & dispute findable.

```
## GATE R
MD read: YES · XLSX sheets: 10/10 · C1-C20 mapped: 20/20 · A1-A15 mapped: 15/15
KEEP listed: YES · Checklist copied: YES
Gate: PASS
```
