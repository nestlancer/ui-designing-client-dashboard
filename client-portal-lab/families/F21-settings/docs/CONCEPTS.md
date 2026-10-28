# F21 · Settings (Account / Security / Notifications / Activity) — CONCEPTS (Gate 1)

Designed before writing any variant HTML. Every variant shares the locked single-blue token system (`shared/tokens.css` + `shared/base.css`), Arjun Mehta's frozen settings truth across all 4 sections (`Account`, `Security`, `Notifications`, `Activity`) + cross-link to `Files` (`F22`), the KEEP 3-step 2FA flow (`password → SVG QR → 6-digit code`), KEEP Danger zone honesty (`Request data export`, password-gated `Delete account`, `Cancel pending deletion`), the `6 × 3 = 18` switch notification matrix + Quiet hours (`22:00–08:00 Asia/Kolkata`), **C10** Activity log rebuild (`49 LOGIN + 1 LOGOUT` = 50 events grouped by day & collapsed with expand/filter/pagination), **C16** mobile card fallback, and `Data / Empty / Loading / Error` states.

---

## Concept Cards & ASCII Sketches

### V1 · Calm Tabbed Preferences Hub (`Minimal`)
- **Persona & Moment:** Client visiting Settings to calmly adjust privacy or quiet hours without wading through a cluttered admin dashboard.
- **Axis A (Layout):** Centered (`880px`) single-column calm layout under a clean horizontal 5-item Settings tab bar (`Account · Security · Notifications · Files ↗ · Activity`).
- **Axis B (Hierarchy):** Section title + 1-line calm explanation lead; destructive controls (`Danger zone`, `Sign out all`) are isolated at the bottom with explicit red-bordered framing.
- **Axis C (Narrative):** *"One quiet section at a time"* — clean vertical card stack per tab with collapsed day-summaries in Activity (`Signed in 18 times on Oct 10`).
- **Axis D (Density):** Spacious (`24px` card padding, wide label-to-control breathing room).
- **Axis E (JS Interaction):** Keyboard `role="tablist"` section switching + inline 3-step 2FA reveal + day-grouped collapsible Activity bursts + responsive mobile card views.
- **Gate T Refs:** R1 + R2 + R3 + R7.

```
+-------------------------------------------------------------------+
| [Sidebar 232px] | Settings                                        |
|                 | [Account][Security][Notifications][Files↗][Act] |
|                 | +---------------------------------------------+ |
|                 | | Privacy · Profile visibility: [Public v]    | |
|                 | | [ ] Show email on profile   [ ] Show phone  | |
|                 | +---------------------------------------------+ |
|                 | | Danger zone · Export data / Delete account  | |
+-------------------------------------------------------------------+
```

### V2 · Sticky Left-Rail Control Center (`Action / Queue-led`)
- **Persona & Moment:** Security-conscious client auditing his 2FA status, 3 active Linux sessions, and notification channels side-by-side with a persistent section status rail (`shadcn-admin` pattern).
- **Axis A (Layout):** Asymmetric 2-column Settings Shell (`240px` sticky Settings sub-navigation rail with live status chips on left + `1fr` primary action canvas on right; horizontal pill strip on mobile).
- **Axis B (Hierarchy):** Left rail surfaces live posture badges (`Account: Public`, `Security: 2FA Off`, `Alerts: 15/18 On`, `Activity: 3 days`); right canvas foregrounds immediate next actions.
- **Axis C (Narrative):** *"At-a-glance status rail + focused control panel"* — shows section posture before you even click into a tab.
- **Axis D (Density):** Medium-structured (`18px` card padding, 2-column label/control rows on desktop).
- **Axis E (JS Interaction):** Sticky sub-rail navigation + interactive 3-step 2FA modal/stepper + session termination queue (`Sign out` vs `Sign out other devices` vs confirm-gated `Sign out all`) + Activity filter/expand.
- **Gate T Refs:** R2 + R4 + R6 + R8.

```
+-------------------------------------------------------------------+
| Settings · Account, Security, Notifications & Activity            |
+-----------------------+-------------------------------------------+
| > Account    [Public] | TWO-FACTOR AUTHENTICATION   [Not enabled] |
| * Security  [2FA Off] | [1. Password] -> [2. Scan QR] -> [3. OTP] |
| > Alerts    [15/18]   | ACTIVE SESSIONS (3) [Out others][Out all!]|
| > Files ↗   [3 files] | - Chrome 156 · 136.69.252.98 [This device]|
| > Activity  [50 evts] | - Chrome 155 · 115.98.214.188 [Sign out]  |
+-----------------------+-------------------------------------------+
```

### V3 · Dense Security & Audit Console (`Dense`)
- **Persona & Moment:** Technical operator searching across all settings controls at once, comparing the 18-switch matrix, inspecting session IPs, and auditing all 50 `LOGIN`/`LOGOUT` timestamps.
- **Axis A (Layout):** Full-width (`100%`) dense console with a top **Quick-Filter Settings Search** (`"Filter controls: 2FA, quiet hours, export, IP…"`) + compact section switcher + multi-column tables (with `<760px` card fallback).
- **Axis B (Hierarchy):** Monospace technical telemetry (`136.69.252.98`, `115.98.214.188`, `Asia/Kolkata`, `22:00–08:00`, `49 LOGIN / 1 LOGOUT`) and compact matrix rows lead.
- **Axis C (Narrative):** *"Searchable operations & audit console"* — treats settings and activity as an inspectable control ledger with zero fluff.
- **Axis D (Density):** Compact (`10–14px` padding, dense 6×3 switch table, compact day-grouped audit rows with pagination `Page 1 of 3` or burst view).
- **Axis E (JS Interaction):** Cross-section control search filter + bulk row/column toggle helpers on the 18-switch matrix + Activity pivot (`Grouped by Day (3)` ↔ `Paginated Event Rows (50)`) + card fallback toggle.
- **Gate T Refs:** R3 + R5 + R8 + R9.

```
+-------------------------------------------------------------------+
| Settings Console   [Search any setting: 2FA, quiet, delete, IP..] |
| [Account] [Security] [Notifications] [Files ↗] [Activity (50)]    |
+-------------------------------------------------------------------+
| ACTIVITY AUDIT · [View: Day-Collapsed | Paginated] [Type: All v]  |
| v Oct 10, 2026 · Signed in 18 times             [Expand 18 rows]  |
| v Oct 9, 2026  · Signed in 15 times · Signed out 1 time [Expand]  |
| v Oct 8, 2026  · Signed in 16 times             [Expand 16 rows]  |
+-------------------------------------------------------------------+
```

### V4 · Posture-First Security & Preferences Deck (`Action / Bento-Posture`)
- **Persona & Moment:** Client opening Settings after seeing a login or quote alert who wants immediate posture KPIs (`2FA: Not enabled`, `3 Active Devices`, `Quiet Hours: Off`, `Profile: Public`) with 1-click jump to fix weak spots.
- **Axis A (Layout):** Top 4-card **Account Posture Summary Strip** (clickable KPI cards for Privacy, 2FA/Sessions, Delivery Channels, Recent Sign-ins) above a 2-column Bento card workspace per active section.
- **Axis B (Hierarchy):** Posture health indicators (`Attention: 2FA Not Enabled`, `Push: Setup Required`, `Active Sessions: 3`) command the top band before granular form controls.
- **Axis C (Narrative):** *"Spot posture gaps in 2 seconds, then configure"* — turns passive settings tabs into a proactive account-health dashboard.
- **Axis D (Density):** Balanced 2-up Bento cards (`18px` padding, side-by-side Password + 2FA cards, side-by-side Channels + Quiet Hours above Category Matrix).
- **Axis E (JS Interaction):** Clickable top Posture KPI cards jumping straight to the target control + interactive 3-step 2FA card wizard + confirmation modal for `Sign out all` / `Delete account` + Activity day-burst cards.
- **Gate T Refs:** R1 + R2 + R4.

```
+-------------------------------------------------------------------+
| Settings   [Privacy: Public] [2FA: Off !] [Quiet: Off] [50 Evts]  |
| [Account] [Security] [Notifications] [Files ↗] [Activity]         |
+---------------------------------+---------------------------------+
| AVAILABLE CHANNELS              | QUIET HOURS (Asia/Kolkata)      |
| [In-App] [Email] [Push · Setup] | [o] Enable · 22:00 to 08:00     |
+---------------------------------+---------------------------------+
| CATEGORY PREFERENCES (6 categories × 3 channels = 18 switches)    |
+-------------------------------------------------------------------+
```

### V5 · Guided Account Hardening & Privacy Walkthrough (`Narrative / Stepper-led`)
- **Persona & Moment:** First-week Nestlancer client walking systematically through all four governance pillars (`1. Privacy & Data` → `2. Password & 2FA` → `3. Alert Channels` → `4. Sign-In Audit`) to lock down his wholesale business account.
- **Axis A (Layout):** Top 4-pillar **Governance Walkthrough Stepper** (+ direct `Files ↗` link) paired with a `2fr / 1fr` main stage and sticky **Account Safety Checklist** sidebar.
- **Axis B (Hierarchy):** Step progress (`Pillar 2 of 4 · Security & 2FA`) and live checklist milestones (`✓ Visibility reviewed`, `○ Enable 2FA`, `✓ Quiet hours checked`, `✓ Activity audited`) lead.
- **Axis C (Narrative):** *"Lock down your privacy, security, alerts, and audit trail in 4 guided steps"* — gives narrative order to 4 otherwise separate settings pages while keeping random-access tab switching.
- **Axis D (Density):** Editorial guided layout (`20–22px` card padding, timeline connectors on Activity & 2FA steps).
- **Axis E (JS Interaction):** 4-pillar interactive stepper with `"Save & continue to next section"` + embedded 3-step 2FA TOTP walkthrough + timeline-styled day-grouped Activity audit.
- **Gate T Refs:** R2 + R3 + R4 + R7.

```
+-------------------------------------------------------------------+
| Settings Guide [1. Account]->[2. Security]->[3. Alerts]->[4. Act] |
+-------------------------------------------+-----------------------+
| PILLAR 2 · PROTECT YOUR ACCOUNT           | SAFETY CHECKLIST      |
| Step-by-step 2FA: [1. Pass]->[2. QR]->[3] | [v] Public visibility |
| Active sessions (3) · Change password     | [ ] 2FA authenticator |
| [<- Prev: Account]   [Next: Alerts ->]    | [v] 50 logins audited |
+-------------------------------------------+-----------------------+
```

---

## Difference Test Matrix (§8.2 — All 10 Pairs Verified)

| Variant | Archetype | Unique A (Layout) + C (Narrative) Signature |
|---|---|---|
| **V1** | Minimal | Centered `880px` horizontal-tab stack + *"One quiet section at a time"* |
| **V2** | Action / Left-Rail | `240px + 1fr` sticky posture rail + *"At-a-glance status rail + focused control panel"* |
| **V3** | Dense | Full-width searchable console & tables + *"Searchable operations & audit console"* |
| **V4** | Posture Bento | 4-KPI posture banner + 2-col Bento grid + *"Spot posture gaps in 2 seconds, then configure"* |
| **V5** | Narrative / Stepper | 4-pillar stepper + `2fr/1fr` checklist rail + *"Lock down your account in 4 guided steps"* |

All 10 pairwise comparisons differ on **4 to 5 axes**, including both **A** and **C**.

## Required CHANGE / ADD / KEEP Coverage (5/5 Variants)

| Item | Description | V1 | V2 | V3 | V4 | V5 |
|---|---|---|---|---|---|---|
| **4 Sections + F22 Link** | `Account`, `Security`, `Notifications`, `Activity` all interactive + `Files` links to `F22` | YES | YES | YES | YES | YES |
| **KEEP 2FA & Danger Zone** | Full 3-step 2FA (`password → QR → 6-digit code`), `Request data export`, password-gated `Delete account`, `Cancel pending deletion` | YES | YES | YES | YES | YES |
| **Inventory #45 Fix** | Distinct hierarchy between `Sign out` (row), `Sign out other devices` (secondary), and `Sign out all` (destructive w/ confirm) | YES | YES | YES | YES | YES |
| **18-Switch Matrix + Quiet** | `6 × 3` single-DOM accessible `role="switch"` matrix + `Quiet hours` (`22:00–08:00 Asia/Kolkata`) + `Push · setup required` | YES | YES | YES | YES | YES |
| **C10 + C16 Activity** | 50 captured rows (`49 LOGIN + 1 LOGOUT`) grouped by day, collapsed bursts w/ expand, event filter, pagination, mobile card fallback | YES | YES | YES | YES | YES |
| **C17, C4, C5, C6, C18 + 4 States** | 232px sidebar, AA badges, single blue ramp, tokenised cards, display H1, Data/Empty/Loading/Error | YES | YES | YES | YES | YES |

```
## GATE 1 (F21)
Concepts: 5 · Sketches: 5 · Difference Test: PASS (all 10 pairs ≥4 axes, unique A+C)
Archetype spread: minimal (V1) · action/rail (V2) · dense (V3) · posture/bento (V4) · narrative/stepper (V5)
Gate: PASS
```
