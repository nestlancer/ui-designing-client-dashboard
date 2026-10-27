# F12 · Messages Home (Overview → Inbox) — Gate R · REPORT-STUDY

Study of `reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md` (§1–§8) and all 10 sheets of `reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx`.

```
## GATE R (F12)
MD read: YES · XLSX sheets: 10/10 · C-items mapped: 6/6 · A-items mapped: 0/0 (none assigned; C11 + 3-pane merge in 5/5)
KEEP listed: YES · Checklist copied: YES
Gate: PASS
```

---

## 1 · Discrepancies Between `.md` and `.xlsx` (`.md` wins)

- Both `.md` and `.xlsx` (Sheets 1–10) are 100% aligned on Finding #6, C11, C12, C17, C4, C5, C6, C18, and the KEEP items for F12.
- **Session difference noted:** Screenshots `004` (Ananya Iyer: `Unread messages 6 / Unread threads 1`) and `005` (Samira Patel: `Unread 7 / Waiting 2`) show unread badges, whereas Arjun Mehta's HTML snapshots `18` and `19` show `Unread messages 0 · All caught up` / `Unread threads 0 · None waiting` / `Waiting 0`. Per prompt §4, all F12 variants lock to the **Arjun Mehta DOM (`18–20`)** as default and offer an interactive unread filter/simulation so both "All caught up (0 unread)" and unread queue sorting (`Unread first`) can be tested.

---

## 2 · Executive Findings Touching F12 (Quoted from Report §1)

- **Finding #6 (🟠 High):**
  > **"Messaging is split across 2 routes and needs 3 clicks."** `/messages` is a landing page with an *"Open messaging panel"* button that routes to `/messages/inbox`; then the client must pick a thread. Verdict: **Highest-friction path in the product (support, payments, deliverables all funnel here).**
- **Finding #8 (Row 8 — ⌘K Command Palette):**
  > 🔴 **Actions include "New project" and "New direct message" that don't exist client-side** (client-to-client messaging is explicitly disabled). Broken promises in the palette.
- **Finding #3, #4, #10, #11, #12:** Status badge contrast failure (1.73–3.23:1), dual brand palettes, mobile layout, raw card classes.

---

## 3 · Page Inventory Rows (Report §4.1 Rows 26–28 & Sheet 3 Rows 26–28)

| # | Route | Page | Live DOM status | Repo screenshot | Key components | Principal UI issue |
|---|---|---|---|---|---|---|
| 26 | `/messages` | Messages overview | ✅ OK | `004-messages` | 3 KPIs, Recent conversations list, "Open messaging panel" | 🟠 **An extra hop for no reason; duplicates dashboard Workbench** |
| 27 | `/messages/inbox` | Messaging panel | ✅ OK | `005-messages-inbox` | 3-pane: queue (filters All/Unread/Direct/Project/Group, sort) · centre (empty state) · right "Inbox snapshot" | ✅ **Real Intercom-grade split-pane. Right rail shows counts only — wasted 260px** |
| 28 | `/messages/new/direct` | New message | ✅ OK | `006-messages-new-direct` | Single card, Nestlancer Support only | ✅ **Explicitly says client-to-client is unavailable — good honesty**, but conflicts with ⌘K "New direct message" |

---

## 4 · Design Token Table Applied (`shared/tokens.css`)

All 5 variants import `../../../shared/tokens.css` and `../../../shared/base.css` as-is:
- **Brand:** Single blue ramp `--brand-500: #465fff` (`#5b7bff` dark) as `--primary` (C5).
- **Status & type badges:** `Live` (`--status-success-*`), `Group` (`--status-warning-*` / `--status-purple-*`), `Direct` (`--status-info-*`) all use darkened AA text + icon + text (C4).
- **Surfaces:** `--card`, `--muted`, `--border`, `--shadow-xs` (C6).
- **Typography:** H1 `Messages` at `clamp(32px, 3.2vw, 38px)` (C18); `--mono` for thread IDs, counts, and timestamps.

---

## 5 · CHANGE Items (Mandatory in 5/5 Variants)

| ID | Change | Specific implementation in F12 |
|---|---|---|
| **C11** | **Merge the two Messages entry points** | `/messages` renders the 3-pane inbox directly — eliminating the extra "Open messaging panel" landing hop. The overview's 3 KPIs (`Open conversations 2 · Active threads`, `Unread messages 0 · All caught up`, `Unread threads 0 · None waiting`), the `Live` badge, `Recent conversations`, and the `New message` (`Message support`) flow are integrated into one unified workspace with deep-linkable route tabs (`/messages` Unified Inbox · `/messages/inbox` Deep-link Redirect · `/messages/new/direct` New Support Message). |
| **C17** | **Compress the sidebar (inherited)** | 232px sidebar + 64px header + breadcrumb (`Dashboard › Messages`) + `Search ⌘K` + theme toggle + notifications (`6`) + `AM` avatar; `Blog`/`Portfolio` inside `Explore` popover. |
| **C4** | **Fix badge contrast** | `Live`, `Group`, `Direct`, and unread/waiting chips use darkened AA tokens (`--status-*-text`) + icon + text. |
| **C5** | **Consolidate to one brand ramp** | Single blue `--primary` ramp across all buttons, active tabs, and focus rings. |
| **C6** | **Tokenise cards** | All panes, KPI strips, conversation cards, and the new-direct dialog/card use `--card`, `--border`, `--shadow-xs`. |
| **C18** | **Increase the type scale** | H1 `Messages` uses `32–40px` display sizing, and KPI numerals use `tabular-nums` display hierarchy. |

*(Additionally, per C12, the ⌘K Command Palette in F12 offers `"Message support (/messages/new/direct)"` and never `"New direct message to another client"`.)*

---

## 6 · ADD Items

- Per prompt §6: *"(No numbered A-items target this family. Family must-include ADDs, if any, are listed in §4 — they remain mandatory. Never invent additions beyond the report's ADD list and the master inventory.)"*
- All 5 variants include the designed degraded/error state (A13 pattern) + loading skeleton + empty states (`Select a conversation`, empty filter, empty inbox).

---

## 7 · KEEP List (Mandatory in 5/5 Variants)

- **The 3-pane messaging shell** (Report §6.3): Queue pane (search + `All/Unread/Direct/Project/Group` chips + `Inbox/Active/Archived` + `Sort: Unread first / Longest wait / Latest`) + centre reading pane (`Select a conversation / Choose a thread from the list to read messages and send a reply.` or selected thread preview) + right `Inbox snapshot` rail (`Open 2 / Unread 0 / Waiting 0` + `By type: Project 0 / Direct 1 / Group 1`).
- **Domain-specific honesty** (Report §6.3): `"Platform support admin for your account. Client-to-client messaging is not available."` preserved verbatim in the `Message support` (`/messages/new/direct`) surface.
- **Graceful wording** (Report §6.3): `"All caught up"`, `"None waiting"`, `"Existing support threads reopen automatically."`

---

## 8 · Benchmarks Applied (Report §5) & Roadmap Phases

- **Moxo + Intercom-style 3-pane shell [1][10]:** Keep the 3-pane shell; fold the overview metrics into the inbox so the client reaches their conversation in 1 click instead of 3.
- **AdminLTE — 12 Dashboard Design Examples [2]:** *"One question per screen"* — cited directly in C11 for merging `/messages` and `/messages/inbox`.
- **Webflow / Apex Command Palette [4][5]:** Accurate ⌘K actions (C12).
- **Roadmap phases touched:** **P1** (Foundations) · **P5 — Communication** (*"Merge Messages routes; notification grouping + deep links; activity rebuild; SLA & read receipts"*).

---

## 9 · Acceptance Checklist (Report §7.1 — Copied as Verification Gate)

- [x] **Hierarchy:** Merged inbox + `All caught up (2 open conversations)` verdict understood in < 2 s.
- [x] **KPI cards:** `Open conversations (2)`, `Unread messages (0 — All caught up)`, `Unread threads (0 — None waiting)` with clear explanations.
- [x] **Navigation:** 1-click entry to threads (C11); links resolve to **F13 · Messages Thread** (`V1–V5`).
- [x] **Colour:** Single blue ramp; AA status/type badges.
- [x] **Typography:** Display H1 32–40px; `--mono` for thread IDs and counts.
- [x] **Dark mode:** Tokenised `.dark` theme across all 3 panes.
- [x] **Accessibility:** Full keyboard navigation across queue items, tabs, filters, and New Message flow.
- [x] **Empty / loading / error:** Captured `"Select a conversation"` empty state, empty filter state, empty inbox state, loading skeleton, and error state with retry.
- [x] **Mobile:** Responsive pane stacking at 360px/390px/768px with zero horizontal scroll.
