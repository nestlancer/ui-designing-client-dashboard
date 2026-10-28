# F19 · Notifications Center — Gate 3 Delivery Report

- **Family**: `F19-notifications-center` (`/notifications`)
- **Date**: `2026-10-28`
- **Baseline Lock**: Snapshot `33-notifications-center.html` · Screenshot `025-notifications-center.webp` · `notifications.openapi.json`
- **Token Scheme**: `shared/tokens.css` + `shared/base.css` (imported as-is, unmodified)

---

## 1 · Variant Matrix & Winner Selection

| Variant | Name | Archetype | Signature Layout & Interaction | Winner? |
|---|---|---|---|---|
| **V1** | **Calm Entity-Grouped Inbox** | Minimal (`880px`) | Multi-open entity accordions collapsing 4 Quote `NL-QTE-2026-000018` + 4 Data Export alerts (`A7`), sibling `Mark read` buttons, floating bulk dock, Undo on Clear | **WINNER** |
| **V2** | **Dense Operations Triage Ledger** | Dense (`1180px` table) | Sticky-header triage table with row checkboxes, `POST /notifications/read-selected` bulk dock, burst-folding toggle, mobile card fallback (`C16`) | — |
| **V3** | **Split Triage Reader & Queue** | Split Workspace (`390px + 1fr`) | Linear-inspired queue list + sticky entity inspector pane with `J`/`K` keyboard stepping and sibling-event timeline | — |
| **V4** | **Priority Action Lanes & Board** | Action / Queue-led | Commercial Action-Required lane (`Quotes`) separated from System Receipts (`Exports`) in a 2-column Bento board | — |
| **V5** | **Guided Catch-Up Digest Stepper** | Narrative / Stepper-led | 3-stage Inbox-Zero catch-up walkthrough (`1. Commercial` → `2. System Exports` → `3. All Caught Up`) + chronological timeline | — |

**Why V1 wins**: Notification centers fail when burst events push actionable items off-screen. **V1** groups bursts by entity (`NL-QTE-2026-000018` and `Account Data Export`) while keeping `Mark read` as a valid ARIA sibling control and offering 1-click Undo on destructive Clear.

---

## 2 · Defect & Enhancement Coverage (5 / 5 Variants)

- **A7 (Entity Grouping + Deep Links)**: All 5 variants collapse repeated bursts by entity (`Quote NL-QTE-2026-000018` → `F10`/`F11`; `Account Data Export` → `F21`) while allowing toggling back to flat chronological events.
- **API Parity (`notifications.openapi.json`)**: `GET /notifications`, `GET /notifications/unread-count`, `PATCH /notifications/{id}/read`, `PATCH /notifications/{id}/unread`, `POST /notifications/read-all`, `POST /notifications/read-selected`, `DELETE /notifications/{id}`, `DELETE /notifications` (with confirmation + Undo).
- **Accessibility & Foundations (`C4, C5, C6, C16, C17, C18`)**: Single `<h1>`, skip link, keyboard `tablist` (`ArrowLeft`/`ArrowRight`/`Home`/`End`), non-colour unread cue (pill + bold weight + tint), 4 switchable states (`Data`, `Empty`, `Loading`, `Error`), `<noscript>` fallback, and responsive layout across `360 / 390 / 768 / 1024 / 1440px`.

---

## 3 · Gate 3 Verification Results

- **Static checks**: `node --check` on all 5 inline scripts → **0 syntax errors** · Undefined CSS tokens → **0** · Broken local links → **0** · Remote URLs → **0** · Duplicate IDs → **0** · Nested `<button>`/`<a>` → **0** · Font sizes `< 11px` → **0**.
- **Headless JSDOM runtime**: Hydrated all 5 variants with `lab-core.js`, exercised theme toggle, 4 state pills, `⌘K` palette + `Esc`, unbuilt route boundary dialog, and clicked every interactive button → **0 runtime errors**, **0 post-hydration duplicate IDs**.
- **Honest limitations**: No live backend is connected; actions mutate client-side state and cite verified OpenAPI paths. Headless verification used JSDOM + static CSS/WCAG contrast token checks rather than pixel-archived Chromium screenshots (no browser binary cached in sandbox).
