# F21 · Settings (Account / Security / Notifications / Activity) — BASELINE-MAP (Gate S)

Opened and verified:
- **Screenshots (4/4):** `025-settings-account.webp` (Samira Patel) · `029-settings-security.webp` (Rahul Desai) · `028-settings-notifications.webp` (Samira Patel) · `026-settings-activity.webp` (Rahul Desai).
- **HTML snapshots (4/4):** `36-settings-account.html` · `37-settings-security.html` · `38-settings-notifications.html` · `42-settings-activity.html` (Arjun Mehta — canonical DOM truth).
- **Audit metadata:** `audit-metadata.json` (`36-settings-account`, `37-settings-security`, `38-settings-notifications`, `42-settings-activity`) + `README.md` (#46, #47, #48, #52).

## 1. Route & DOM Audit Summary

| Route | HTML Snapshot | Screenshot | H1 (`26px/32px/700`) | H2 / H3s | Buttons (main) | Inputs | Console / API Errors |
|---|---|---|---|---|---:|---:|---|
| `/settings/account` | `36-settings-account.html` | `025-settings-account.webp` | `Settings` | H2 `Privacy`, `Danger zone` · H3 `Data export`, `Delete account` | 8 | 2 | 0 console errors |
| `/settings/security` | `37-settings-security.html` | `029-settings-security.webp` | `Settings` | H2 `Change password`, `Two-factor authentication`, `Active sessions` | 10 | 4 | 0 console errors |
| `/settings/notifications` | `38-settings-notifications.html` | `028-settings-notifications.webp` | `Settings` | H2 `Available channels`, `Quiet hours`, `Category preferences` | 42 (37 `role="switch"`) | 3 | 0 console errors |
| `/settings/activity` | `42-settings-activity.html` | `026-settings-activity.webp` | `Settings` | — | 0 | 0 | 0 console errors |

### Reconciling the exact switch & activity counts (Gate S mandate)
1. **37 `role="switch"` toggles vs 18-switch matrix (`38-settings-notifications.html`):**
   - `1` switch = `Enable quiet hours` (`aria-checked="false"`).
   - `18` switches = Desktop table (`Quotes`, `Payments`, `Messages`, `Projects`, `Requests`, `Account` × `email`, `push`, `in-app`).
   - `18` switches = Duplicate mobile card fallback in the same DOM (`Quotes Email/Push/In-app` … `Account Email/Push/In-app`).
   - `1 + 18 + 18 = 37` total DOM switches! Our variants render **one responsive 18-switch matrix + 1 Quiet Hours switch (= 19 unique logical switches)** with zero duplicate-DOM ARIA drift.
2. **Activity log row count (`42-settings-activity.html`):**
   - Report counted 57 in an earlier crawl; Arjun Mehta's captured DOM contains **50 total rows**: **49 `LOGIN / User signed in successfully`** + **1 `LOGOUT / User signed out`**, distributed across 3 dates:
     - `10/10/2026`: **18×** `LOGIN` (`User signed in successfully`)
     - `10/9/2026`: **15×** `LOGIN` (`User signed in successfully`) + **1×** `LOGOUT` (`User signed out`)
     - `10/8/2026`: **16×** `LOGIN` (`User signed in successfully`)
   - Frozen at **50 total events (49 LOGIN, 1 LOGOUT)** across Oct 8–10, 2026, collapsed by day per **C10** (`Signed in 18 times`, `Signed in 15 times` + `Signed out once`, `Signed in 16 times`) with expand-to-view individual rows, event-type filter, pagination, and mobile card fallback (**C16**).

## 2. Frozen Content Truth (`36` + `37` + `38` + `42`)

- **Shared Settings Header & Nav:**
  - H1: `Settings` · Subtitle: `Manage account preferences, security, notifications, files, and activity.`
  - 5-item Settings nav: `Account` · `Security` · `Notifications` · `Files` (links to `../../F22-settings-files/V1/index.html`) · `Activity`
- **Section 1 — Account (`36`):**
  - Intro: `Privacy, data export, and account deletion. Delivery channels live under Notification settings. Update your public identity from Profile.`
  - **Privacy:** `Control who can see your profile and contact details.`
    - `Profile visibility`: `Public` (selected) / `Private` / `Connections only`
    - `Show email on profile`: `false` (off) · `Show phone on profile`: `false` (off) · `Save changes`
  - **Danger zone:** `Export your data or permanently delete your account.`
    - **Data export:** `Request a copy of your account data. Processing may take a few minutes.` → `Request data export`
    - **Delete account:** `Schedules permanent deletion. You can cancel while it is still pending.` → `Password to confirm deletion` (`Enter your password`) → `Delete account` (disabled until password entered) + `Cancel pending deletion` + helper `Enter your password above to enable account deletion.`
- **Section 2 — Security (`37`):**
  - Intro: `Protect your account with a strong password, two-factor authentication, and session control.`
  - **Change password:** `Use a unique password you do not reuse on other sites.` → `Current password` (`Enter your current password`), `New password` (`Create a new password`), `Confirm new password` (`Re-enter your password`) → `Update password`.
  - **Two-factor authentication:** Badge `Not enabled` · `Add an authenticator app as a second step when signing in.` → `Confirm with password` (`Enter your password`) · Steps: `1. Enter your password and start setup` · `2. Scan the QR code in your authenticator app` · `3. Enter the 6-digit code to confirm` → `Start 2FA setup` (enabled when password entered; full interactive 3-step QR + 6-digit verification flow built in every variant).
  - **Active sessions (3 captured in Arjun Mehta's DOM):** `Devices currently signed in to your account.` · Actions: `Sign out other devices` · `Sign out all`
    1. `Chrome 156.0.8078.4 · Linux` · `desktop` · `136.69.252.98` · `Last active · Oct 24, 2026, 6:32 PM` · Badge `This device`
    2. `Chrome 156.0.8078.4 · Linux` · `desktop` · `136.69.252.98` · `Last active · Oct 24, 2026, 6:28 PM` · Action `Sign out`
    3. `Chrome 155.0.0.0 · Linux` · `desktop` · `115.98.214.188` · `Last active · Oct 24, 2026, 6:25 PM` · Action `Sign out`
- **Section 3 — Notifications (`38`):**
  - Intro: `Choose how we reach you for each type of update.` + `Open inbox` (`/notifications` → F19).
  - **Available channels:** `Delivery options you can toggle per category below.` → Chips: `In-App Notifications` · `Email Notifications` · `Push Notifications · setup required`.
  - **Quiet hours:** `Pause non-urgent alerts during this window (times use your chosen timezone).` → `Enable quiet hours` (`false` — `When off, alerts can arrive at any time.`) · `From`: `22:00` (`10:00 PM`) · `To`: `08:00` (`08:00 AM`) · `Timezone`: `Asia/Kolkata` (`Quiet hours are evaluated in this timezone (defaults to your account timezone).`).
  - **Category preferences (6 × 3 = 18 switches + `Save changes`):** `Toggle email, push, and in-app delivery for each category. Push requires browser notification permission.`
    - `Quotes`: Email **ON**, Push **ON**, In-app **ON**
    - `Payments`: Email **ON**, Push **OFF**, In-app **ON**
    - `Messages`: Email **OFF**, Push **ON**, In-app **ON**
    - `Projects`: Email **ON**, Push **ON**, In-app **ON**
    - `Requests`: Email **ON**, Push **ON**, In-app **ON**
    - `Account`: Email **ON**, Push **OFF**, In-app **ON**
- **Section 4 — Activity (`42`):**
  - Intro: `Recent actions on your account — logins, updates, and project events.`
  - 50 captured events (`10/10/2026`: 18 `LOGIN`; `10/9/2026`: 15 `LOGIN` + 1 `LOGOUT`; `10/8/2026`: 16 `LOGIN`).

```
## GATE S (F21)
Screenshots opened: 4/4 · HTML opened: 4/4 · audit-metadata read: YES
Routes mapped: /settings/account, /settings/security, /settings/notifications, /settings/activity · Content frozen: YES
Gate: PASS
```
