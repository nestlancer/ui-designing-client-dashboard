# F19 · Notifications Center — TEMPLATE-RESEARCH (Gate T)

Online template & UX pattern research executed **after** Gates S, R, and A. Every reference R1–R8 below was genuinely fetched and read via `fetch_page` (status 200). **Colour-scheme discipline:** §5 single-blue token system (`shared/tokens.css`) is locked; zero palette ideas were imported from external references.

## 1. Search Queries Run

- `SaaS notification center inbox UI design patterns grouping bulk actions shadcn github linear`

## 2. Reference Table (8/8 Opened & Verified)

| ID | Source & URL | Pattern / Product Archetype | Job Match |
|---|---|---|---|
| **R1** | [SaaSUI — SaaS Notification Center UX Patterns (2026)](https://www.saasui.design/blog/saas-notification-center-ux-patterns) | Object/entity bundling ("ten events, one line") + triage inbox vs raw log | Direct match for **A7** entity grouping & read/unread trust |
| **R2** | [Courier — How to Design an In-App Notification Center (2026)](https://www.courier.com/blog/in-app-notification-center-design) | Row scan anatomy, time grouping (`Today`/`Earlier`), optimistic read, empty/skeleton/error polish | Direct match for row hierarchy, date headers & state parity |
| **R3** | [SuprSend — In-App Notification Center Design Patterns](https://www.suprsend.com/post/in-app-notification-center) | Persistent feed vs toast/banner, GitHub multi-axis filter inbox & Linear action-only inbox | Direct match for category tabs + action-first triage |
| **R4** | [SaaSUI — SaaS Bulk Actions & Multi-Select UX Patterns (2026)](https://www.saasui.design/blog/saas-bulk-actions-ux-patterns) | Contextual selection bar, row checkboxes, page-scope honesty, filter-driven bulk action | Direct match for `POST /api/v1/notifications/read-selected` bulk selection |
| **R5** | [Foundey — Notification UX: Best Practices & Real Examples](https://foundey.com/blog/notification-ux) | Event-to-channel urgency matrix, Linear issue-grouped inbox, 2-second scannable copy | Direct match for urgency separation (Expiring Quotes vs Data Exports) |
| **R6** | [Eleken — Notification UX: 8 Best Practices + Real Examples](https://www.eleken.co/blog-posts/notification-ux) | Action-required vs System-feedback separation, inline triage controls (`Mark read`, `Open`) | Direct match for separating Quote action alerts from GDPR export notices |
| **R7** | [shadcn.io — Grouped Accordion Notification Block](https://www.shadcn.io/blocks/notification-grouped) | Multi-open entity/type accordions, sibling `Mark read` button outside trigger (valid HTML/ARIA), screen-reader `"Unread"` prefix | Direct match for **A7** grouped accordion + WCAG 2.2 AA |
| **R8** | [shadcn.io — Tabbed Inbox Notification Block](https://www.shadcn.io/blocks/notification-center) | Keyboard arrow `role="tablist"` with per-tab unread chips, polite live region, undoable `Clear` preserving height | Direct match for 9-tab filter strip + `Clear read` + live status |

## 3. Per-Reference Notes (Borrow vs Reject)

- **R1 (SaaSUI Notification Center):** *Layout:* Header w/ honest unread count + bundled object cards. *Why it works:* Collapsing bursts by object (`NL-QTE-2026-000018`, `Account Data Exports`) prevents firehose fatigue. *Borrow:* Object-level bundle summary + expand-to-inspect individual notifications. *Reject:* Clearing unread status merely on opening the page (must respect explicit `read`/`read-selected`/`read-all` API calls).
- **R2 (Courier Inbox Guide):** *Layout:* Leading semantic icon tile → bold title → 2-line clamped body → relative/formatted date → non-colour unread cue + hover/focus action. *Borrow:* Calm single unread indicator (icon + `"Unread"` pill + heavier title) + shaped skeleton rows + instructive empty states. *Reject:* Hover-only actions hidden on touch (all mobile actions stay tap-accessible ≥44px).
- **R3 (SuprSend Guide — GitHub & Linear comparison):** *Layout:* Compares GitHub's full-page multi-filter table inbox against Linear's minimal action-focused split triage. *Borrow:* GitHub-style dense filterable ledger for V2 and Linear-style split triage reader for V3. *Reject:* WebSocket live-arrival simulation spinners (violates non-invention rule).
- **R4 (SaaSUI Bulk Actions):** *Layout:* Row checkboxes + contextual bulk action bar appearing when `selectedCount > 0` with live count, `Mark read`, and `Clear selection`. *Borrow:* Explicit selection scope banner (`"N notifications selected"` → `Mark read`) + filter-driven bulk action. *Reject:* Destructive bulk delete (Nestlancer only exposes `DELETE /notifications/clear-read` and per-id `DELETE /notifications/{id}`).
- **R5 (Foundey Notification UX):** *Layout:* Separates *Action-required* (`Quote expiring soon`) from *Informational / System feedback* (`Data export ready`) and links preferences directly. *Borrow:* Triage priority lane in V4 + prominent `Notification settings` deep link to F21. *Reject:* Adding digest-cadence dropdowns inside `/notifications` (not in `notifications.openapi.json`).
- **R6 (Eleken Notification UX):** *Layout:* Inline card actions (`Review quote`, `Account exports`, `Mark read`) right where the hand is. *Borrow:* Direct entity deep links (`F10`/`F11` & `F21`) on every notification card/group. *Reject:* Snooze buttons (no snooze endpoint in `notifications.openapi.json`).
- **R7 (shadcn.io Notification Grouped):** *Component detail:* Places the group `Mark read` button *beside* the accordion `<button>` trigger inside the group header bar rather than nested inside `<button>` (avoiding invalid HTML & broken screen-reader focus). *Borrow:* Sibling `Mark group read` button + multi-open `aria-expanded` entity groups + non-colour `"Unread"` badge. *Reject:* Fixed narrow popover width (F19 is a full client-portal route).
- **R8 (shadcn.io Notification Center):** *Component detail:* Full `role="tablist"` keyboard navigation (`ArrowLeft`/`ArrowRight`), polite `aria-live="polite"` announcement bar, and `Undo` after `Clear read` in local demo state. *Borrow:* Arrow-key 9-tab navigation + live status announcements + `Clear read` feedback. *Reject:* Fixed scroll-box height clipping on desktop.

## 4. Variant Inspiration Map

- **V1 (`Calm Entity-Grouped Inbox` — Minimal):** R1 + R7 + R8
- **V2 (`Dense Operations Ledger` — Dense):** R3 (GitHub full-page inbox) + R4 + R8
- **V3 (`Split Triage Reader` — Action / Queue-led):** R3 (Linear inbox) + R2 + R6
- **V4 (`Priority Action Lanes + Timeline` — Action + Chronological):** R5 + R6 + R1
- **V5 (`Guided Catch-Up Digest Stepper` — Narrative / Stepper-led):** R1 + R2 + R5

```
## GATE T (F19)
Queries run: 1 · References opened: 8 (≥8) · Variant inspiration mapped: 5/5
Gate: PASS
```
