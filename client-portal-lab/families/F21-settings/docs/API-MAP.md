# F21 · Settings (Account / Security / Notifications / Activity) — API-MAP (Gate A)

Specs read and verified:
- `backend-api-swagger/README.md`
- `backend-api-swagger/users.openapi.json` (privacy preferences, data export, delete/cancel-deletion, password, 2FA, sessions, activity)
- `backend-api-swagger/auth.openapi.json` (`logout`, `logout-all`, `verify-2fa`)
- `backend-api-swagger/notifications.openapi.json` (channels, quiet hours, category preferences, web push subscription)

## 1. UI Surface → Endpoint Mapping

| Section | UI Element / Affordance | Method & Path | Key Request / Response Schema & Enums | State & Validation Behaviour |
|---|---|---|---|---|
| **Account** | Load & save Privacy (`Profile visibility` + `Show email on profile` + `Show phone on profile`) | `GET` & `PATCH /api/v1/users/preferences` | `UpdatePreferencesDto.privacy` → `PrivacyPreferencesDto`: `profileVisibility` (`"public" \| "private" \| "connections"`), `showEmail` (`boolean`), `showPhone` (`boolean`) | Saves visibility (`Public`/`Private`/`Connections only`) & email/phone switches; shows dirty state & save confirmation |
| **Account** | `Request data export` | `GET /api/v1/users/export` (alias `/api/v1/users/data-export`) + `GET /api/v1/users/export/{id}` | Triggers async GDPR archive generation | Shows processing state + honest note referencing F19 ready-export notifications (`export_1791375234538_ce4d2b`) |
| **Account** | `Delete account` (password-gated) | `POST /api/v1/users/delete-account` | `DeleteAccountDto`: `password` (`string`, required), `reason` (`maxLength: 50`), `feedback` | Button stays `disabled` until `#acc-delete-password` is non-empty; schedules pending deletion |
| **Account** | `Cancel pending deletion` | `POST /api/v1/users/cancel-deletion` | No body | Cancels scheduled deletion (honours `"You can cancel while it is still pending."`) |
| **Security** | `Update password` form | `PATCH /api/v1/users/password` (alias `POST /api/v1/users/change-password`) | `ChangePasswordDto`: `currentPassword`, `newPassword` (`8–64` chars, upper + lower + digit/symbol regex) + client confirm match | Inline complexity & match validation before submit |
| **Security** | 2FA status & 3-step setup (`Start 2FA setup` → QR → 6-digit code) + disable / backup codes | `GET /api/v1/users/2fa/status`, `POST /api/v1/users/2fa/enable`, `POST /api/v1/users/2fa/verify`, `GET /api/v1/users/2fa/backup-codes`, `POST /api/v1/users/2fa/disable` | `Enable2FADto { password }`, `Verify2FASetupDto { code: 6 digits }`, `Disable2FADto { password, code }` | Password enables Step 1 → Step 2 renders local SVG TOTP QR + manual secret → Step 3 verifies 6-digit code and flips badge `Not enabled` → `Enabled` |
| **Security** | Active sessions list (3 captured rows) + per-row `Sign out` | `GET /api/v1/users/sessions` · `DELETE /api/v1/users/sessions/{sessionId}` | Session fields: browser/OS, device type, IP (`136.69.252.98`, `115.98.214.188`), `lastActive`, `current` (`This device`) | Removes targeted non-current session row |
| **Security** | `Sign out other devices` · `Sign out all` | `POST /api/v1/users/sessions/terminate-others` · `POST /api/v1/auth/logout-all` | Distinct visual weight: secondary (`Sign out other devices`) vs destructive w/ confirmation (`Sign out all`) | Terminates other 2 sessions or confirms full sign-out |
| **Notifications** | Channels + `Push Notifications · setup required` | `GET /api/v1/notifications/channels` · `POST /api/v1/push-subscription` | `RegisterPushSubscriptionDto { endpoint, keys: { p256dh, auth }, deviceInfo }` | Explains browser permission requirement honestly (demo-labelled in offline lab) |
| **Notifications** | Quiet hours (`Enable`, `From 22:00`, `To 08:00`, `Asia/Kolkata`) + 6×3 Category matrix + `Save changes` | `GET` & `PATCH /api/v1/notifications/preferences` · `PATCH /api/v1/notifications/preferences/channel/{channel}` | `UpdatePreferencesDto`: `quietHours: QuietHoursDto { start, end, timezone }`, `preferences` (`Quotes`, `Payments`, `Messages`, `Projects`, `Requests`, `Account` × `ChannelPreferencesDto { email, push, inApp }`) | All 19 logical `role="switch"` controls keyboard-accessible (`Space`/`Enter`), `Save changes` persists state |
| **Activity** | Rebuilt Activity log (50 captured rows: 49 `LOGIN`, 1 `LOGOUT`) | `GET /api/v1/users/activity?page&limit` | Query: `page`, `limit` (`string`) | Client-side day grouping (`Oct 10`, `Oct 9`, `Oct 8`), burst collapsing (`Signed in 18/15/16 times`), event filter (`All`/`LOGIN`/`LOGOUT`), pagination & mobile card fallback (C10, C16) |

## 2. Honesty & Non-Invention Notes (Recorded in `DECISIONS.md`)

1. **`GET /api/v1/users/activity` only accepts `page` and `limit`:** Day-grouping, repeated-LOGIN burst collapsing (`Signed in 18 times`), and event-type filtering (`LOGIN` vs `LOGOUT`) are client-side transformations over the 50 captured rows — never claimed as server query parameters.
2. **All mutations in the offline lab are demo-labelled:** Saving privacy/notifications, password update, 2FA TOTP QR verification (deterministic local SVG QR, zero external QR image API), session sign-out, data export request, and account deletion execute cleanly in browser state and cite their exact OpenAPI endpoint.
3. **`Files` tab in the 5-tab Settings bar links directly to `../../F22-settings-files/V1/index.html`** (built in this run), and `Profile` / `Open inbox` link directly to `F20` / `F19`.

```
## GATE A (F21)
Specs read: 3/3 (users + auth + notifications) · Endpoints mapped: 21 · Demo-only CTAs listed: 6 (offline mutations + boundary nav)
Gate: PASS
```
