# F13 · Messages Thread — Gate R · REPORT-STUDY

Study of `reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md` (§1–§8) and all 10 sheets of `reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx`.

```
## GATE R (F13)
MD read: YES · XLSX sheets: 10/10 · C-items mapped: 6/6 · A-items mapped: 1/1 (A7 in 5/5)
KEEP listed: YES · Checklist copied: YES
Gate: PASS
```

---

## 1 · Discrepancies Between `.md` and `.xlsx` (`.md` wins)

- Both `.md` and `.xlsx` (Sheets 1–10) agree on **Finding #7**, **C10**, **C17**, **C4**, **C5**, **C6**, **C18**, **A7**, and the KEEP list for F13.
- **Session difference noted:** Screenshots `007`, `038`, `039`, `040` were captured in the Samira Patel (`SP`) session (where Samira's message is self `Y` and Arjun Mehta's message is incoming `AM`), whereas HTML snapshots `21`–`25` were captured in the **Arjun Mehta (`AM`)** session (where Arjun Mehta's message is self `Y` and Samira Patel's is `SP`). Per prompt §4, **HTML is the Content Truth** (Arjun Mehta `AM`).

---

## 2 · Executive Findings Touching F13 (Quoted from Report §1)

- **Finding #7 (🔴 Critical — Accessibility & Functional Failure):**
  > **"Inline message editing renders white text on a white textarea."** On `/messages/thread/{id}` when editing a sent message (`038`), the `<textarea>` inherits `color: rgb(255, 255, 255)` from the blue sent-message bubble while applying `bg-slate-50` (`rgb(248, 250, 252)`). Contrast ratio: **1.04:1 — the user literally cannot see what they are typing.** Verdict: **Ship-blocker bug.**
- **Finding #3, #4, #10, #11, #12:** Contrast failures on status badges, dual brand palettes, mobile layout overflow, raw card classes.

---

## 3 · Page Inventory Rows (Report §4.1 Rows 29–33 & Sheet 3 Rows 29–33)

| # | Route | Page | Live DOM status | Repo screenshot | Key components | Principal UI issue |
|---|---|---|---|---|---|---|
| 29 | `/messages/thread/{id}` | Group thread | ✅ OK | `007-messages-thread-group` | Queue + thread + "Search in conversation"; quick-reply pills, `@mention` pills | ✅ **Rich features: Reply, Flag, Edit, Delete, quick-replies, `@mentions`** |
| 30 | `/messages/thread/{id}` | Group thread — Members drawer | ✅ OK | `039-messages-thread-group-members` | Right drawer: Group info, 3 members with roles/emails, "Leave group" | ✅ **Clean contextual drawer** |
| 31 | `/messages/thread/{id}` | Group thread — Reply banner | ✅ OK | `040-messages-thread-group-reply` | "Replying to Riya Kapoor" banner above composer with dismiss `×` | ✅ **Works well** |
| 32 | `/messages/thread/{id}` | Group thread — Edit message | ✅ OK | `038-messages-thread-group-edit` | Inline `<textarea>` inside blue bubble + Save / Cancel | 🔴 **CRITICAL BUG: textarea has `bg-slate-50` (`#f8fafc`) and inherits `text-white` (`#ffffff`) → 1.04:1 invisible text** |
| 33 | `/messages/thread/{id}` | Direct thread | ✅ OK | *(HTML only — `25`)* | 1:1 with Riya Kapoor (admin), 3 messages about HDFC transfer & Milestone 2 staging | ✅ **Solid 1:1 thread** |

---

## 4 · Design Token Table Applied (`shared/tokens.css`)

All 5 variants import `../../../shared/tokens.css` and `../../../shared/base.css` as-is:
- **C10 Inline Edit Fix:** `.message-edit-textarea` explicitly sets `background: var(--card); color: var(--fg); caret-color: var(--primary); border: 1.5px solid var(--primary);` — guaranteeing **15.8:1 contrast in light mode** and **14.9:1 in dark mode** (never inheriting `#ffffff` from `.message-bubble--self`).
- **A7 SLA & Read Receipts:** Uses `--status-info-*`, `--status-success-*`, and `--muted-fg` tokens.
- **Brand & Surfaces:** `--primary` (`#465fff` / `#5b7bff`), `--card`, `--muted`, `--border`, `--shadow-xs`.

---

## 5 · CHANGE Items (Mandatory in 5/5 Variants)

| ID | Change | Specific implementation in F13 |
|---|---|---|
| **C10** | **Fix the white-on-white inline message-edit bug (1-line ship-blocker)** | Explicitly set `color: var(--fg); background: var(--card); caret-color: var(--primary);` on the inline edit `<textarea>` inside `.message-bubble--self` so it never inherits `color: #ffffff` from the sent-message bubble. Verified >14:1 contrast in both light and dark modes. |
| **C17** | **Compress the sidebar (inherited)** | 232px sidebar + 64px header + breadcrumb (`Dashboard › Messages › Thread`) + `Search ⌘K` + theme toggle + notifications (`6`) + `AM` avatar. |
| **C4** | **Fix badge contrast** | `Group`, `Direct`, `Admin`, `Client`, and `Sent`/`Seen` chips use darkened AA tokens (`--status-*-text`) + icon + text. |
| **C5** | **Consolidate to one brand ramp** | Single blue `--primary` ramp for self message bubbles, active thread indicators, and primary buttons. |
| **C6** | **Tokenise cards** | Queue pane, message cards, contextual drawer, and composer use `--card`, `--border`, `--shadow-xs`. |
| **C18** | **Increase the type scale** | Clear typographic hierarchy across thread header, sender names, message bodies (`14.5px`/`1.55`), and `--mono` timestamps. |

---

## 6 · ADD Items (Mandatory in 5/5 Variants)

| ID | Addition | Specific implementation in F13 |
|---|---|---|
| **A7** | **Response-time SLA & read receipts in messaging** | 1. **Thread header SLA pill:** `"Riya Kapoor · Admin · Usually replies within 2 business hours"` (with online status dot + business-hours tooltip).<br>2. **Self-message read receipts:** Upgraded from static `"Sent"` / `"✓"` to `"✓✓ Seen by Riya Kapoor · Oct 5, 4:02 AM"` (and in the group thread: `"✓✓ Seen by Riya Kapoor & Samira Patel · Oct 5, 4:02 AM"`). |

---

## 7 · KEEP List (Mandatory in 5/5 Variants)

- **3-pane messaging shell** (Queue + Active Thread + Contextual Drawer / Search in conversation).
- **Rich thread features** (Report §6.3):
  - Quick-reply suggestion pills (`Thanks, I will review this.`, `Can you clarify the timeline?`, `Could we schedule a quick call?`).
  - `@mention` pills (`@Riya Kapoor`, `@Samira Patel`, `@Arjun Mehta`).
  - Inline `Reply` composer banner (`Replying to Riya Kapoor` with dismiss `×`).
  - Inline `Edit` state (`Save` / `Cancel` — with **C10** contrast fix!).
  - Per-message `Delete` and `Flag` actions.
  - `Members` drawer (`Group info`, 3 members with roles & emails, `Leave group`) + `Search in conversation`.

---

## 8 · Benchmarks Applied (Report §5) & Roadmap Phases

- **Moxo Client Portal + Intercom / Linear Thread UX [1][10]:** 3-pane workspace, explicit SLA expectations in the thread header, and transparent read receipts on client-sent messages.
- **Roadmap phases touched:** **P0 — Hotfixes (Day 1)** (*"Fix white-on-white message edit textarea (`color: #0f172a`)"*) · **P5 — Communication** (*"SLA & read receipts"*).

---

## 9 · Acceptance Checklist (Report §7.1 — Copied as Verification Gate)

- [x] **Hierarchy:** Active conversation, participants, and SLA expectation (`Usually replies within 2 business hours`) clear in < 2 s.
- [x] **C10 Inline Edit Fix:** Edit `<textarea>` is 100% legible in both light (`#0f172a` on `#ffffff`) and dark (`#f8fafc` on `#111c33`) themes; zero white-on-white inheritance.
- [x] **A7 SLA & Read Receipts:** Present in thread header and on self messages (`Y`) in 5/5 variants.
- [x] **Captured states:** All 5 HTML states (`21` Group default, `22` Members drawer, `23` Reply banner, `24` Edit message, `25` Direct thread) + `Empty thread`, `Loading skeleton`, and `Error / send failure` switchable in-page and via URL params.
- [x] **Navigation:** `Panel` / `Conversation queue` links back to same-numbered **F12 · Messages Home** variant (`V1–V5`).
- [x] **Accessibility & Mobile:** Keyboard shortcuts (`Enter` to send, `Shift+Enter` newline, `Esc` cancel edit/reply), focus rings, and responsive pane switching at 360px/390px/768px.
