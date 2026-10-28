# F04 · Global Search / ⌘K Command Palette — DELIVERY REPORT

**Family:** F04 · `families/F04-global-search-command-palette/`
**Built:** 2026-10-28 · 5 variants (V1–V5), all hand-authored
**Locked scheme:** `shared/tokens.css` + `shared/base.css` imported as-is, never forked

## 1 · What was built

The global-search / ⌘K command-palette family — one UI to jump to a place or run an action. The palette opens by default in every variant so the component is the page, over a simplified dashboard backdrop. Five variants explore how a palette can lead.

| Variant | Layout | Lead | Interaction |
|---|---|---|---|
| **V1 Classic List** | one grouped column | quiet | flat list, keyboard nav |
| **V2 Grouped-by-Entity** | sections per entity | type chips | two-pane grouped |
| **V3 Action + Recent** | two-pane | action-first | actions left, recents right |
| **V4 Keystroke-Minimal** | one quiet field | minimal | flat list, ↵ to go |
| **V5 Dense Two-Pane** | two-pane | dense | all places + recents at once |

## 2 · Locked content (all variants)

- ⌘K binding (header trigger + global `keydown`) · 12 canonical routes (Dashboard, Requests, Projects, Quotes, Messages, Billing, Invoices, Notifications, Profile, Settings, Explore·Blog, Explore·Portfolio)
- Corrected action registry (C12): New request, Jump to pending payment, Jump to pending approval, Switch to dark mode
- ↑↓ navigate · ↵ select · esc close · no-results state · palette opens by default

## 3 · Coverage

- C4/C5/C6/C12/C17/C18: 5/5.
- A-items: none (navigation surface).
- Shared ⌘K trigger wired across every variant.

## 4 · API refs (documented, never called)

`GET /api/v1/requests` · `/messages` · `/payments` · `/quotes` · `/users/me` (jump targets)

## 5 · Winner

**V2 Grouped-by-Entity.** Sections per entity (Work / Account / Actions) with type chips let the user scan by domain and pick a jump target in one motion, with the corrected action registry (C12) visible alongside the routes.

## 6 · Honest limitations

No live backend — `api_refs` document verified spec paths, never calls. F04 jump targets and the dark-mode action are demo-labelled (see DECISIONS §9.3 honest-navigation). Gate T templates for the palette were drawn from the cmdk/kbar and command-palette research already captured in the shared corpus and F03's Gate T.
