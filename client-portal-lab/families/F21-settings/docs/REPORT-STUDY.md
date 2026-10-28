# F21 · Settings (Account / Security / Notifications / Activity) — REPORT-STUDY (Gate R)

Studied in full:
- `reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md` (§1–§8 cover-to-cover)
- `reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx` — **all 10 sheets opened and verified** (`1. Executive Findings` → `10. Sources`). `.md` wins on minor `₹` vs `Rs` text formatting.

## 1. Executive Findings & Inventory Rows Touching F21 (Quoted)

- **Finding #8 (High — Settings ▸ Activity):** *"Settings ▸ Activity is a wall of 57 identical 'LOGIN / User signed in successfully' rows with no filters, no grouping, no pagination. Looks broken to a client; needs event grouping + filters."* *(Reconciled at Gate S: Arjun Mehta's HTML capture has 49 `LOGIN` + 1 `LOGOUT` = 50 rows across Oct 8–10, 2026.)*
- **Finding #3 (High — Badge Contrast):** Fix `1.73–3.23:1` badge text contrast using darkened AA tokens + icon + text (C4).
- **Finding #4 (High — Dual Brand Systems):** Single `--ta-brand-*` blue ramp; delete violet & teal (C5).
- **Finding #10, #11, #12 (Mobile, Dark Mode, Raw Card Classes):** Mobile card-fallback for Activity & Category matrix tables (C16); tokenise all cards (`--card`, `--border`, `--shadow-xs`, C6).
- **Page Inventory #44 (`/settings/account`):** *"Privacy (visibility select + 2 toggles), Danger zone (Data export / Delete account with password) — Danger zone is well done."*
- **Page Inventory #45 (`/settings/security`):** *"Change password, 2FA setup (3-step), Active sessions list — Best settings page. Issue: **'Sign out all' and 'Sign out' look identical**."* *(Fixed in all 5 variants: `Sign out all` is clearly destructive-styled with confirmation, while `Sign out other devices` is secondary and per-row `Sign out` is compact ghost/outline.)*
- **Page Inventory #46 (`/settings/notifications`):** *"Channels, Quiet hours (From/To/TZ), Category matrix (6 categories × Email/Push/In-app = 18 switches) — Excellent."*
- **Page Inventory #50 (`/settings/activity`):** *"57 rows of LOGIN events — Unusable as-is (Finding #8)."*

## 2. Token Table Summary (Report §3.2 + §5.2 Lock)

All 5 variants import `shared/tokens.css` + `shared/base.css` verbatim:
- **Brand:** `--brand-500 #465fff` (dark `--primary-ink #a9bcff`).
- **Status:** `--status-success/warning/error/info-*` AA-safe triples, always icon + colour + text.
- **Typography:** `Outfit` display H1 `32–40px` (C18), H2 `20–24px`, body `14–16px`, `--mono` for IPs (`136.69.252.98`, `115.98.214.188`), browser versions, TOTP codes, and timestamps (`≥11px`).

## 3. Benchmark Patterns Applied (Report §5, Sources [1]–[13])

- **AdminLTE SaaS Dashboards [9]:** Work-queue / grouped audit log pattern (C10); polite, honest cancellation/deletion surface ("Schedules permanent deletion. You can cancel while it is still pending.").
- **Tailwind Admin [7] & Tabler [6]:** Search + event-type filter + day grouping + pagination + mobile card fallback (C16) on the Activity audit log.
- **TailGrids [12]:** Production security readiness — 2FA TOTP setup flow (`password → QR → 6-digit code`), session management with clear `This device` vs `Sign out all` hierarchy.
- **AdminLTE Dashboard Rules [2]:** Status never colour alone (`This device`, `Not enabled` / `Enabled`, `Push Notifications · setup required`, `LOGIN` / `LOGOUT`).

## 4. CHANGE / ADD / KEEP Scope for F21

### CHANGE (5/5 variants mandatory)
- **C10 — Rebuild Settings ▸ Activity:** Group the 50 captured events (`49 LOGIN + 1 LOGOUT`) by day (`Oct 10, 2026` · `Oct 9, 2026` · `Oct 8, 2026`), collapse repeated `LOGIN` bursts into `"Signed in 18 times"` / `"Signed in 15 times"` / `"Signed in 16 times"` with expand-to-inspect individual rows, add event-type filter (`All events` / `LOGIN` / `LOGOUT`) + date/search filter + pagination.
- **C16 — Mobile treatments for Activity & Matrix tables:** Automatic responsive card-fallback under `760px` plus explicit `"View as cards"` toggle.
- **C17 — Compress sidebar (232px) + Explore popover**.
- **C4 — AA badge contrast** (icon + colour + text ≥4.5:1).
- **C5 — Single blue brand ramp** (`--brand-*`).
- **C6 — Tokenised cards** (`--card`, `--border`, `--shadow-xs`).
- **C18 — Display type scale** (`H1` 32–40px).

### ADD
- No numbered A-items target F21; all 4 settings surfaces (`Account`, `Security`, `Notifications`, `Activity`) plus cross-link to `Files` (`F22`) are interactive in every variant. Digest frequency / per-category time windows are **not** added as live controls because `notifications.openapi.json` (`QuietHoursDto` + `ChannelPreferencesDto`) has no per-category window schema (non-invention rule).

### KEEP (5/5 variants)
- **2FA first-class 3-step setup flow** (`password → QR → 6-digit code`).
- **Privacy toggles + Data export + Danger-zone honesty** (`"Schedules permanent deletion. You can cancel while it is still pending."`, password-gated `Delete account`, `Cancel pending deletion`).
- **shadcn-style token architecture**.

## 5. Roadmap & Acceptance Checklist (QA Gate)

- **Roadmap phases:** **P1** (Foundations: C4, C5, C6, C18) · **P5** (Communication: C10 Activity rebuild) · **P6** (Responsive tables: C16).
- **Acceptance Checklist (§7.1):** Hierarchy <2s · Complete table controls on Activity (search, event filter, collapse/expand, pagination, mobile card-fallback) · Grouped 232px sidebar + accurate ⌘K · Single blue ramp + AA contrast · Outfit + mono for IPs/TOTP/dates · Dark parity · Full keyboard ARIA (`tablist`, `switch`, `dialog`, focus trap) · Empty + Skeleton + Error w/ retry · 360–1440px zero horizontal scroll.

```
## GATE R (F21)
MD read: YES · XLSX sheets: 10/10 · C-items mapped: 7/7 (C10, C16, C17, C4, C5, C6, C18) · A-items mapped: 0 numbered
KEEP listed: YES · Checklist copied: YES
Gate: PASS
```
