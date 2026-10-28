# F19 · Notifications Center — CONCEPTS (Gate 1)

Designed before writing any variant HTML. Every variant shares the locked single-blue token system (`shared/tokens.css` + `shared/base.css`), Arjun Mehta's frozen notification dataset (`8` items: `6` unread, `2` read across `Quotes` and `Account`), the 9 captured category tabs (`All · Unread · Quotes · Payments · Messages · Projects · Requests · Account · Settings`), **A7** entity grouping + deep links, bulk selection (`POST /api/v1/notifications/read-selected`), date groups (`Today` / `This week` / `Earlier`), and `Data / Empty / Loading / Error` states.

---

## Concept Cards & ASCII Sketches

### V1 · Calm Entity-Grouped Inbox (`Minimal`)
- **Persona & Moment:** Busy wholesale owner opening the portal on Monday morning who wants calm, bundled clarity (`2` entity groups instead of `8` noisy rows) without visual clutter.
- **Axis A (Layout):** Centered max-width (`880px`) single-column calm inbox stream with sticky top 9-tab strip and floating bottom selection bar when items are checked.
- **Axis B (Hierarchy):** Unread count pill + H1 lead; entity bundle headers (`Quote NL-QTE-2026-000018 · 4 alerts`, `Account Data Exports · 4 alerts`) carry primary scan weight; read rows recede softly.
- **Axis C (Narrative):** *"Catch up by subject, then clear"* — groups bursts by entity (**A7**) under `This week` and `Earlier`, with toggle to view flat chronological rows.
- **Axis D (Density):** Spacious (`20–24px` card padding, generous whitespace, calm 2-line row rhythm).
- **Axis E (JS Interaction):** Multi-open entity bundle accordions (`aria-expanded`) with sibling `"Mark group read"` buttons + contextual floating bulk selection bar (`Mark read`, `Clear selection`) + Undo after `Clear read`.
- **Gate T Refs:** R1 + R7 + R8.

```
+-------------------------------------------------------------------+
| [Sidebar 232px] | Notifications (6 unread)   [Mark all] [Clear]   |
|                 | [All][Unread 6][Quotes][Payments]...[Settings]  |
|                 |                                                 |
|                 | THIS WEEK                                       |
|                 | +---------------------------------------------+ |
|                 | | v Quote NL-QTE-2026-000018 (4) [Review][Rd] | |
|                 | |   [x] ● Unread · Quote expiring soon  3d    | |
|                 | |   [ ] ● Unread · Quote expiring soon  3d    | |
|                 | +---------------------------------------------+ |
|                 | EARLIER · Account Data Exports (4)              |
+-------------------------------------------------------------------+
```

### V2 · Dense Operations Triage Ledger (`Dense`)
- **Persona & Moment:** Operations-minded buyer reconciling quote expiry timestamps and GDPR archive IDs (`export_1791375234538_ce4d2b`) in a high-density tabular view.
- **Axis A (Layout):** Full-width (`100%` fluid container) dense tabular ledger with pinned filter/search/bulk toolbar above a structured multi-column notification table (`Select · Status · Category/Entity · Summary · Window · Deep link · Actions`) + mobile card fallback.
- **Axis B (Hierarchy):** Tabular column alignment leads; monospace entity IDs (`NL-QTE-2026-000018`, `export_…`) and status pills (`● Unread` / `✓ Read`) form vertical scan rails.
- **Axis C (Narrative):** *"Audit every system alert with exact IDs & bulk controls"* — flat or entity-grouped ledger rows with search + header select-all-visible checkbox.
- **Axis D (Density):** Compact (`10–12px` row padding, `13px` table cells, maximum rows above the fold).
- **Axis E (JS Interaction):** Keyboard `j`/`k` row highlight + Space checkbox toggle + `Shift+Click` range multi-select + instant search/entity-group pivot.
- **Gate T Refs:** R3 (GitHub inbox) + R4 + R8.

```
+-------------------------------------------------------------------+
| Notifications · 8 total · 6 unread     [Group: Entity|Date] [Cfg] |
| [All][Unread 6][Quotes][Payments][Messages][Projects][Req][Acct]  |
| [Search IDs/text...] [x Select visible (8)] -> [Mark read (2)]    |
+-------------------------------------------------------------------+
| [x] | STATUS  | ENTITY             | MESSAGE         | WHEN | ACT |
| [x] | ● Unread| NL-QTE-2026-000018 | Expires in 3d   | Wk   | Open|
| [ ] | ✓ Read  | export_...ce4d2b   | Export ready    | Oct4 | Acct|
+-------------------------------------------------------------------+
```

### V3 · Split Triage Reader & Inspector (`Action / Queue-led`)
- **Persona & Moment:** Decisive client triaging notifications like Linear/Superhuman — clicking an alert or entity group on the left to inspect full context and trigger immediate deep-link action on the right.
- **Axis A (Layout):** Asymmetric 2-pane split workbench (`380px` scrollable queue list on left + sticky `1fr` Entity & Action Inspector pane on right; responsive drawer sheet on mobile).
- **Axis B (Hierarchy):** Active selected notification/bundle in the left rail drives a high-contrast Action Card (`Review Quote NL-QTE-2026-000018` / `Open Account Data Exports`) in the right reader pane.
- **Axis C (Narrative):** *"Zero-inbox triage queue: inspect → act → advance to next unread"* — treats notifications as an actionable work queue rather than passive history.
- **Axis D (Density):** Medium-compact queue rail paired with a roomy, structured inspector card.
- **Axis E (JS Interaction):** Master-detail reader selection + `"Mark read & advance to next unread"` workflow button + bulk queue checkboxes + entity bundle collapse.
- **Gate T Refs:** R3 (Linear inbox) + R2 + R6.

```
+-------------------------------------------------------------------+
| Notifications Triage Queue          [Mark all read] [Clear read]  |
| [All][Unread 6][Quotes][Payments][Messages][Projects][Req][Acct]  |
+---------------------------+---------------------------------------+
| QUEUE (Entity / Date)     | INSPECTOR · NL-QTE-2026-000018        |
| > ● Quote NL-QTE... (4u)  | [Action Required · Expires in 3 days] |
|   [x] Quote expiring soon | 4 grouped reminders in This week      |
| > ● Data Exports (2u/2r)  | [Open Quote Detail ->] [Mark read+Nxt]|
+---------------------------+---------------------------------------+
```

### V4 · Priority Lanes + Entity Board (`Action-Priority / Kanban-Board`)
- **Persona & Moment:** Client checking what actually threatens project momentum first (*Expiring Quotes*) before skimming routine background completions (*Data Exports*).
- **Axis A (Layout):** Two-tier asymmetric grid — top **Action Required** spotlight deck (grouped quote expiry cards with urgency callout) above a **System & Account Updates** 2-column entity/date grid, plus sticky bulk selection strip.
- **Axis B (Hierarchy):** Urgency tiering leads (`Action Required · 4 Unread` warning-accented header vs `Informational · 2 Unread, 2 Read` neutral header).
- **Axis C (Narrative):** *"Urgent client decisions first, routine system receipts second"* — separates time-sensitive commercial alerts from informational account notices while honouring all 9 tabs and date groups.
- **Axis D (Density):** Balanced card grid (`16px` padding, 2-up entity cards on desktop, 1-up on mobile).
- **Axis E (JS Interaction):** Urgency-lane filter + card-click multi-select mode + one-click `"Resolve & mark entity read"` + date/entity grouping switcher.
- **Gate T Refs:** R5 + R6 + R1.

```
+-------------------------------------------------------------------+
| Notifications   [All][Unread 6][Quotes]...[Account][Settings]     |
+-------------------------------------------------------------------+
| [!] NEEDS YOUR DECISION · THIS WEEK (4 unread)                    |
| +---------------------------------------------------------------+ |
| | Quote NL-QTE-2026-000018 · Expires in 3d (4 alerts) [Review]  | |
| +---------------------------------------------------------------+ |
| [i] ACCOUNT & SYSTEM RECEIPTS · EARLIER (2 unread · 2 read)       |
| +-------------------------------+-------------------------------+ |
| | export_...ce4d2b (Unread)     | export_...57472a (Read)       | |
+-------------------------------------------------------------------+
```

### V5 · Guided Catch-Up Digest Stepper (`Narrative / Stepper-led`)
- **Persona & Moment:** Returning client who hasn't logged in for a week and wants a structured, step-by-step catch-up brief (`Step 1: Expiring Quotes` → `Step 2: Account Exports` → `Step 3: Tune Delivery Channels`).
- **Axis A (Layout):** Top horizontal 3-stage **Catch-Up Progress Stepper** + asymmetric `2fr / 1fr` layout (chronological/entity digest timeline on left + sticky Catch-Up Summary & Channel Preferences card on right).
- **Axis B (Hierarchy):** Live progress meter (`2 of 8 reviewed · 6 unread remaining`) and numbered digest stages anchor the eye before individual timeline entries.
- **Axis C (Narrative):** *"Your 60-second catch-up brief"* — walks Arjun from commercial quote deadlines (`This week`) through ready GDPR exports (`Earlier`) to channel noise tuning (`Settings ▸ Notifications`).
- **Axis D (Density):** Editorial digest spacing (`18–22px` rhythm, timeline rail connectors).
- **Axis E (JS Interaction):** Interactive 3-step Catch-Up Stepper (`Quotes (4)` → `Account Exports (4)` → `All Clear / Channel Check`) synchronized with the 9 category tabs, bulk `"Mark step read & continue"`, and entity expanders.
- **Gate T Refs:** R1 + R2 + R5.

```
+-------------------------------------------------------------------+
| Notifications Brief   [1. Quotes (4u)] -> [2. Account (2u)] -> [3]|
| [All][Unread 6][Quotes][Payments][Messages][Projects][Req][Acct]  |
+-------------------------------------------+-----------------------+
| TIMELINE · THIS WEEK -> EARLIER           | CATCH-UP PROGRESS     |
| o-- Quote NL-QTE-2026-000018 (4 alerts)   | [====----] 2/8 read   |
| |   [x] Quote expiring soon ... [Mark rd] | Selected: 1 [Mark rd] |
| o-- Account Data Exports (4 alerts)       | -> Tune Quiet Hours   |
+-------------------------------------------+-----------------------+
```

---

## Difference Test Matrix (§8.2 — All 10 Pairs Verified)

| Variant | Archetype | Unique A (Layout) + C (Narrative) Signature |
|---|---|---|
| **V1** | Minimal | Centered `880px` single-column stream + *"Catch up by subject, then clear"* |
| **V2** | Dense | Full-width multi-column operations table + *"Audit every alert with exact IDs & bulk controls"* |
| **V3** | Action / Queue-led | `380px + 1fr` master-detail split reader + *"Zero-inbox triage queue: inspect → act → advance"* |
| **V4** | Priority Board | 2-tier Urgency Deck + 2-col card grid + *"Urgent client decisions first, system receipts second"* |
| **V5** | Narrative / Stepper | 3-stage top stepper + `2fr/1fr` timeline & progress rail + *"Your 60-second catch-up brief"* |

Pairwise axes differing (`≥3` required, `≥1` in `{A, C}`):
- `V1 vs V2`: **A, B, C, D, E** (5/5) · `V1 vs V3`: **A, B, C, D, E** (5/5) · `V1 vs V4`: **A, B, C, D** (4/5) · `V1 vs V5`: **A, B, C, E** (4/5)
- `V2 vs V3`: **A, B, C, D, E** (5/5) · `V2 vs V4`: **A, B, C, D, E** (5/5) · `V2 vs V5`: **A, B, C, D, E** (5/5)
- `V3 vs V4`: **A, B, C, D, E** (5/5) · `V3 vs V5`: **A, B, C, D, E** (5/5) · `V4 vs V5`: **A, B, C, D, E** (5/5)

## Required CHANGE / ADD / KEEP Coverage (5/5 Variants)

| Item | Description | V1 | V2 | V3 | V4 | V5 |
|---|---|---|---|---|---|---|
| **A7** | Group by entity (`NL-QTE-2026-000018`, `Account Data Exports`), deep links (`F10`/`F21`), bulk select + `"Mark read"` | YES | YES | YES | YES | YES |
| **9 Tabs + Dates** | `All · Unread (6) · Quotes · Payments · Messages · Projects · Requests · Account · Settings` + `Today / This week / Earlier` | YES | YES | YES | YES | YES |
| **C17, C4, C5, C6, C18** | 232px sidebar + Explore, AA icon+text unread badges, single blue ramp, tokenised cards, Outfit display H1 | YES | YES | YES | YES | YES |
| **4 States** | Data + instructive per-tab Empty + Loading skeleton + Error w/ retry | YES | YES | YES | YES | YES |

```
## GATE 1 (F19)
Concepts: 5 · Sketches: 5 · Difference Test: PASS (all 10 pairs ≥4 axes, unique A+C)
Archetype spread: minimal (V1) · dense (V2) · action/queue (V3, V4) · narrative/stepper (V5)
Gate: PASS
```
