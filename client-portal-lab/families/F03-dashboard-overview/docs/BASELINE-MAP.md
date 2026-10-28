# F03 · Dashboard Overview — BASELINE-MAP (Gate S)

## Screenshot ↔ HTML ↔ route map
| HTML snapshot | Route / state | Screenshot |
|---|---|---|
| `01-dashboard-overview-quotes-tab.html` | `/dashboard` — Quotes workbench tab | `033-dashboard-quotes-panel.webp` |
| `02-dashboard-overview-pay-now-tab.html` | `/dashboard` — Pay now tab | `031-dashboard-pay-now-panel.webp` |
| `03-dashboard-overview-projects-tab.html` | `/dashboard` — Projects tab | `032-dashboard-projects-panel.webp` |
| `04-dashboard-overview-inbox-tab.html` | `/dashboard` — Inbox tab | `030-dashboard-inbox-panel.webp` |
| `06-dashboard-dark-mode.html` | `/dashboard` — dark | — |
| `45-dashboard-mobile-viewport.html` | `/dashboard` — 375×812 | — |

## Frozen content truth (from live crawl 2026-10-28 + captures)
- **H1**: "Overview" · **Verdict line (C2)**: built from captured figures (invoiced/pending).
- **Workspace vitals · Live · 30s**: Open requests · Active projects · Pending quotes · Unread messages (each with a why-line).
- **Hero action (C1)**: "One action will unblock your workspace." → Complete checkout · Invoiced ₹81,500.00 · ₹31,875.00 pending · Billing history.
- **Pipeline bars (C3)**: Active / Done / Collected / Pending ₹31,875.00 — each labelled with current value + % + one-line reason.
- **Awaiting you**: Pending payment · 6 new (KEEP — promoted to a first-class action centre).
- **Live workbench · One queue at a time**: 4 count-bearing tabs — Quotes 0 · Pay now 4 · Projects 0 · Inbox 2 (all four captured states switchable in-page).
- **Instructive empty tabs (C14)**: "Projects 0" → "Accept a quote to open your first project →".
- **Recent activity**: quote-expiring-soon items + "Your data export is ready".

## Shell (F03 owns it)
Sidebar 260px→232px (`--sidebar-width`), 64px header, breadcrumb, ⌘K trigger, theme toggle, bell (6 unread), avatar (AM), Explore popover (Blog/Portfolio). Dark + 375px proof for the whole lab.

## Cross-cutting states (every variant)
light + dark · 375px card-fallback · empty · loading skeleton · error w/ retry.

## GATE S (F03)
Screenshots opened: 4/4 · HTML opened: 6/6 · audit-metadata read: YES
Routes mapped: `/dashboard` · Content frozen: YES
**Gate: PASS**
