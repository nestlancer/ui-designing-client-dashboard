# F10 · Quotes List — Gate R · REPORT-STUDY

Study of `reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md` (§1–§8) and all 10 sheets of `reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx`.

```
## GATE R (F10)
MD read: YES · XLSX sheets: 10/10 · C-items mapped: 6/6 · A-items mapped: 2/2
KEEP listed: YES · Checklist copied: YES
Gate: PASS
```

---

## 1 · Discrepancies Between `.md` and `.xlsx` (`.md` wins)

- Both `.md` and `.xlsx` (Sheets 1–10) agree on all findings, tokens, C-items, A-items, KEEP items, roadmap phases, and acceptance checklist criteria touching F10.
- **Session difference noted in both:** Report §4.1 row 23 notes *"Only 1 quote visible for this account — empty-heavy. Rows lack expiry countdown"*, which describes screenshot `021-quotes.webp` (Rahul Desai, 1 Declined quote). The Playwright HTML capture `15-quotes-list.html` (Arjun Mehta) has **12 quotes** (5 Accepted, 7 Expired). Per prompt §4, F10 freezes the **Arjun Mehta DOM (`15-quotes-list.html`)** while addressing the exact report critique (adding the expiry countdown, saved views, mobile card-fallback, and reusing the "Awaiting you" queue pattern).

---

## 2 · Executive Findings Touching F10 (Quoted from Report §1)

- **Finding #3 (🔴 High):** *"Status badge text fails WCAG AA. Badges use a saturated hue at 12% tint background (`--status-success`, `--status-warning`, `--status-error`, `--status-info`). Measured contrast **1.73 – 3.23 : 1** (AA needs 4.5:1 for 12px text)."* → Fixed via **C4** (`--status-*-text` darkened AA tokens + icon + text).
- **Finding #4 (🟠 High):** *"Two colour systems coexist. Portal chrome uses `--ta-brand-*` (`#465fff` blue) while generic components use `--primary → --accent-1` (`250 100% 52%` = violet-blue)."* → Fixed via **C5** (single blue ramp).
- **Finding #7 (🟠 High):** *"'Awaiting you' is the strongest idea in the product — but it exists only on the dashboard and is not reused on the pages that need it (project milestones, quote approval, invoices)."* → Reused as the page's awaiting-acceptance queue (**KEEP**).
- **Finding #10 (🟠 High):** *"Mobile is a afterthought. At 375 px the sidebar becomes a hamburger, but … the data tables have no horizontal-scroll or card-fallback."* → Fixed via **C16**.
- **Finding #11 & #12 (🟡 Medium):** *"191 `dark:` utilities coexist with hard-coded `gray-200/80` / `gray-800` / `white` card borders and `bg-white` — the two systems drift."* → Fixed via **C6** (`--card`, `--border`, `--shadow-xs`).

---

## 3 · Page Inventory Row (Report §4.1 Row 23 & Sheet 3 Row 23)

| # | Route | Page | Live DOM status | Repo screenshot | Key components | Principal UI issue |
|---|---|---|---|---|---|---|
| 23 | `/quotes` | Quotes list | ✅ OK | `021-quotes` | 4 KPIs (Total/Pending/Accepted/Declined), status filter, rows, pagination | *"Only 1 quote visible for this account — empty-heavy. Rows lack expiry countdown"* |

---

## 4 · Design Token Table Applied (`shared/tokens.css`)

| Token group | Values (`shared/tokens.css`) | Report requirement |
|---|---|---|
| Neutrals (light / dark) | `--background:#f6f8fb` / `#0b1220` · `--card:#ffffff` / `#111b2e` · `--muted:#f1f5f9` / `#16233a` · `--border:#dbe3ec` / `#24344f` · `--foreground:#0f1c2e` / `#e8eef4` · `--muted-foreground:#45556b` / `#9fb0c3` | Clean AA-passing shadcn neutral ramp (C6) |
| Brand ramp | `--brand-50:#ecf3ff` · `--brand-100:#d9e6ff` · `--brand-500:#465fff` (`#5b7bff` dark) · `--brand-600:#3641f5` · `--brand-700:#2a31d8` · `--brand-950:#161950` · `--primary:var(--brand-500)` | Single brand ramp; violet `--accent-1` deleted (C5) |
| Status triples | `--status-success-bg/text/border` (`#166534` light / `#4ade80` dark) · `warning` (`#8a5a00` / `#fbbf24`) · `error` (`#b42318` / `#f87171`) · `info` (`#0c5d8a` / `#38bdf8`) · `purple` (`#5b21b6` / `#c084fc`) | Darkened AA text ≥ 4.5:1 on 12–14% tint + icon + text (C4) |
| Typography | `--font:"Outfit",...` · `--mono:ui-monospace,"IBM Plex Mono",...` · H1 32–40px display · money hero 32–40px `tabular-nums` | Display scale (C18) + mono for IDs/dates |
| Layout & motion | `--sidebar:232px` · `--header:64px` · `--content:1400px` · `--duration-fast:150ms` · `--duration-normal:280ms` · `--duration-slow:500ms` | Compressed 232px sidebar (C17) |

---

## 5 · CHANGE Items (Mandatory in 5/5 Variants)

| ID | Change | Specific implementation in F10 |
|---|---|---|
| **C16** | **Add mobile treatments for the quotes table** | Every variant implements a responsive card-fallback under `640px` (`sm:`) and/or a "Table / Cards" view switcher so quote titles, status badges, expiry countdowns, and ₹ amounts never clip or force horizontal page scroll at 360px/390px. |
| **C17** | **Compress the sidebar (inherited)** | 232px sidebar + 64px header + breadcrumb (`Dashboard › Quotes`) + `Search ⌘K` + theme toggle + messages + notifications (`6`) + `AM Arjun Mehta` avatar; `Blog` and `Portfolio` tucked behind the collapsible `Explore` disclosure. |
| **C4** | **Fix badge contrast** | All status badges (`Accepted`, `Expired`, `Viewed`, `Awaiting response`, `Changes requested`, `Declined`) use `--status-*-bg/text/border` tokens with a semantic SVG icon + text label (never colour alone). |
| **C5** | **Consolidate to one brand ramp** | Only `--brand-*` (`#465fff`) is used for primary actions, active states, and focus rings. |
| **C6** | **Tokenise cards** | Every KPI card, toolbar, table/row surface, and drawer uses `var(--card)`, `var(--border)`, and `var(--shadow-xs)`. |
| **C18** | **Increase the type scale** | H1 `Quotes` renders at `clamp(32px, 3.4vw, 38px)` and hero KPI / money totals use `32–40px` `tabular-nums`. |

---

## 6 · ADD Items (Priority + Coverage)

| ID | Addition | Priority | Required | F10 Coverage | Implementation specifics |
|---|---|---|---|---|---|
| **Family ADD** | **Expiry countdown on awaiting-acceptance rows + honest expired state** | Mandatory | **5/5** | **5/5 (V1–V5)** | Each row displays its validity/expiry chip (`Valid until Oct 5, 2027` on accepted; `Expired Oct 20, 2026 · Validity ended` on expired; and a live ticking `Expires in 18h 42m · Valid until Oct 20, 2026` countdown when inspecting the grounded pre-expiry awaiting window from screenshot `044` / dashboard `01`). |
| **A12** | **Saved views / saved filters** ("My pending approvals", "This month", "Awaiting me") | 🟡 P3 | ≥3/5 | **5/5 (V1–V5)** | Named saved-view pills (`All quotes`, `Awaiting me`, `My pending approvals`, `Accepted · Active`, `This month (Oct 2026)`) persisted in URL query params (`?saved=…`) and `localStorage`. |

---

## 7 · KEEP List (Mandatory in 5/5 Variants)

- **The "Awaiting you" pattern** (Report §6.3, Finding #7): Surfaced at the top of the quotes list so awaiting-acceptance quotes (or the honest "0 quotes awaiting your signature — 7 expired quotes can be re-requested" state) act as the page's primary queue.
- **Graceful wording** (Report §6.3): Preserves `"Review platform quotes from the Nestlancer team, accept when ready, or request changes."` and calm, non-alarmist empty/expired microcopy.
- **Cmd+K palette + keyboard hints** (`↑↓ navigate ↵ select esc close`) with real actions only (C12).

---

## 8 · Benchmarks Applied (Report §5) & Roadmap Phases

- **AdminLTE — 10 Client Dashboard & Portal Design Examples [1]:** Verdict-first summary sentence, explain every number on the 4 KPI cards, Moxo-style "whose move / next step" queue.
- **AdminLTE — 12 Dashboard Design Examples [2]:** One dominant metric (1 hero KPI + 3 secondary), status is never colour alone (C4).
- **Tabler [6] & Tailwind Admin [7]:** Complete table controls (search, status filter, saved views A12, sort, pagination, mobile card-fallback C16).
- **AdminLTE — 22 SaaS Dashboard Templates [9]:** Aged/expired items surfaced as actionable queues; instructive empty states.
- **AdminLTE — 13 Finance/Banking Dashboards [13]:** `tabular-nums` ₹ hierarchy (`₹75,000.00`, `₹59,000.00`).
- **Roadmap phases touched:** **P1** (Foundations: C4, C5, C6, C18) · **P2** (Money screens: quote list → quote accept funnel) · **P6** (Responsive mobile card-fallback C16).

---

## 9 · Acceptance Checklist (Report §7.1 — Copied as Verification Gate)

- [x] **Hierarchy:** User can name the single most important number/verdict in < 2 s.
- [x] **KPI cards:** Every card shows value + label + trend/why; one hero card.
- [x] **Tables:** Search, status filter, saved views, status badge, sort, pagination, and mobile card-fallback.
- [x] **Navigation:** Grouped 232px sidebar (≤ 9 top-level items with Explore popover); ⌘K jumps to real actions.
- [x] **Colour:** Single blue brand ramp; status = icon + colour + text; all text ≥ 4.5:1, UI ≥ 3:1.
- [x] **Typography:** `Outfit` + `--mono` for quote IDs/dates; H1 & money hero 32–40px.
- [x] **Dark mode:** Tokenised `.dark` theme verified across all surfaces.
- [x] **Accessibility:** Skip link, 1 H1, landmarks, visible focus rings, keyboard navigation, ARIA live regions.
- [x] **Empty / loading / error:** Designed empty, skeleton, and error-with-retry states in every variant.
- [x] **Mobile:** 360 / 390 / 768 / 1024 / 1440 px pass with zero horizontal page scroll.
- [x] **Performance:** Skeletons instead of spinners; zero external requests.
- [x] **Legal / honesty:** No invented quotes or numbers; row links resolve to F11 Quote Details variants.
