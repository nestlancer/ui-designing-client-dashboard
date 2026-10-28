# F04 · Global Search / ⌘K — BASELINE MAP (Gate S)

**Gate S:** PASS — production baseline mapped to the lab build.

## Production baseline (from `nestlancer-client-pages-html/`)

- `05-global-search-command-dialog.html` — the ⌘K command dialog snapshot.
- `Nestlancer-clients-screenshots/clients/037` — the palette screenshot.
- The production shell links `⌘K` to a search surface with AI-only responses and a flat "New message / AI" action menu.

## What the lab keeps

- The ⌘K binding (header trigger + global `keydown`).
- The 12 canonical navigation routes.
- The palette-over-backdrop pattern (dialog over a simplified dashboard).

## What the lab corrects (C12)

- The action registry is corrected: production's flat "New message / AI" menu → honest jump targets (New request, Jump to pending payment, Jump to pending approval, Switch to dark mode).
- The palette opens by default in every variant so the component is the page (not a route).

## Honest notes

- The production `/search` route and AI responses are out of scope (no AI endpoint exists); the lab palette is a jump surface, not a full search engine.
- Blog/Portfolio routes are reachable as canonical routes but flagged demo (see DECISIONS §9.3).
