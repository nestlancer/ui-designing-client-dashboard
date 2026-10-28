# F21 · Settings — Gate 3 Delivery Report

- **Family**: `F21-settings` (`/settings`, `/settings/notifications`, `/settings/security`, `/settings/sessions`, `/settings/activity`)
- **Date**: `2026-10-28`
- **Baseline Lock**: Snapshots `36`–`38`, `41`–`42` · Screenshots `027`–`029`, `036` · `users.openapi.json`, `auth.openapi.json`, `notifications.openapi.json`
- **Token Scheme**: `shared/tokens.css` + `shared/base.css` (imported as-is, unmodified)

---

## 1 · Variant Matrix & Winner Selection

| Variant | Name | Archetype | Signature Layout & Interaction | Winner? |
|---|---|---|---|---|
| **V1** | **Calm Tabbed Preferences Hub** | Minimal (`920px`) | Horizontal 5-tab bar (`Account`, `Notifications`, `Security`, `Sessions`, `Activity`), 19 single-DOM switches, 3-step SVG QR 2FA, C10 log | — |
| **V2** | **Sticky Left-Rail Control Center** | Split Workspace (`252px + 1fr`) | Persistent vertical Settings sub-rail displaying live posture pills (`Public`, `19`, `2FA Off/On`, `3`, `50`) beside the active pane | **WINNER** |
| **V3** | **Dense Security & Audit Console** | Dense (`1240px` console) | Live Settings keyword search across all 5 domains, bulk Push enable, 3-tier session table, 50-row C10 audit ledger + CSV export | — |
| **V4** | **Posture-First Security Deck** | Action / Queue-led (`4 KPIs + Bento`) | 4-KPI Security & Privacy Posture strip with 1-click remediation triggers above a 2-column Bento layout | — |
| **V5** | **Guided Account Hardening** | Narrative / Stepper-led | 4-pillar account hardening walkthrough raising live score from `60%` → `100%` as 2FA and device hygiene complete | — |

**Why V2 wins**: Settings spans five distinct operational concerns. **V2**'s sticky posture sub-rail keeps security and privacy status visible at all times (`Public`, `19`, `2FA Off`, `3 sessions`, `50 events`) while dedicating clean horizontal width to matrices and tables.

---

## 2 · Defect & Enhancement Coverage (5 / 5 Variants)

- **19 Single-DOM Notification Switches (`C16`)**: Verified via automated JSDOM audit — every variant renders **1** Quiet Hours switch (`22:00–08:00 Asia/Kolkata`) + **18** category×channel switches (`6 × 3`) with CSS responsive layout and **zero** duplicate mobile/desktop DOM nodes.
- **KEEP 3-Step TOTP 2FA Wizard**: `Disabled` → Step 1 password check (`POST /auth/2fa/enable`) → Step 2 inline crisp SVG QR + setup key `JBSWY3DPEHPK3PXP` → Step 3 6-digit OTP (`POST /auth/2fa/verify-enable`) → `Enabled` + backup recovery codes + `Disable 2FA`.
- **KEEP Danger Zone**: `Export my data` (`POST /users/data-export`, deep-linking to `F19`), password-gated `Delete account` (`DELETE /users/account`), and `Cancel pending deletion` (`POST /users/account/cancel-deletion`).
- **Inventory #45 3-Tier Session Revocation**: Distinct copy & behaviour for per-row `Sign out`, secondary bulk `Sign out other devices`, and confirm-gated `Sign out all (including this device)`, with `This device` pill on `Chromium 146 · Linux · 172.19.0.1`.
- **C10 50-Row Day-Grouped Activity Log**: Exact `50` events (`49 LOGIN + 1 LOGOUT`) grouped by IST calendar day (`Apr 14`, `Apr 13`, `Apr 12`) with collapsible repeated bursts so `LOGOUT @ 13:42:09 IST` is immediately visible without scrolling past 49 identical rows.

---

## 3 · Gate 3 Verification Results

- **Static checks**: `node --check` on all 5 inline scripts → **0 syntax errors** · Undefined CSS tokens → **0** · Broken local links → **0** · Remote URLs → **0** · Duplicate IDs → **0** · Nested `<button>`/`<a>` → **0** · Font sizes `< 11px` → **0**.
- **Headless JSDOM runtime**: Verified `19` notification `[role="switch"]` elements in all 5 variants (`21` total switches on `V1`–`V4` including the 2 Account C20 switches; `19` on `V5` Pillar 4), keyboard tab navigation, 2FA wizard steps, session revocation, burst expansion, and 4 states → **0 runtime errors**.
- **Honest limitations**: Secondary iPhone/Windows sessions are seeded alongside the captured `Chromium · Linux · 172.19.0.1` primary session so all three Inventory #45 revocation tiers can be interactively exercised without a live auth server.
