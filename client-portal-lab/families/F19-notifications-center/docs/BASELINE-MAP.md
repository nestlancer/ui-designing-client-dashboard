# F19 · Notifications Center — BASELINE-MAP (Gate S)

Opened and verified:
- **Screenshot (1/1):** `Nestlancer-clients-screenshots/clients/008-notifications.webp` (Samira Patel alternate client session, `Unread (37)`, `THIS WEEK` header, flat row cards with left category icon tile, bold title, muted body, relative timestamp `5 days ago`, and `✓` mark-read icon button; header `Mark all read` + `Clear read`).
- **HTML snapshot (1/1):** `nestlancer-client-pages-html/33-notifications-center.html` (Arjun Mehta client session — canonical DOM truth).
- **Audit metadata:** `nestlancer-client-pages-html/audit-metadata.json` (`slug: "33-notifications-center"`) + `nestlancer-client-pages-html/README.md` (#43).

## 1. Route & DOM Audit Summary

| Route | HTML Snapshot | Repo Screenshot | H1 (`26px/32px/700`) | H2s | Buttons | Inputs | Tables | Console / API Errors |
|---|---|---|---|---|---|---:|---:|---|
| `/notifications` | `33-notifications-center.html` | `008-notifications.webp` | `Notifications` | `This week`, `Earlier` | 27 total (19 in `<main>`) | 0 | 0 | 0 console errors on `/notifications`; only aborted Next.js `?_rsc=` prefetches in `failedRequests` |

### Reconciling the unread counts (Gate S mandate)
- **Research report (§1 Finding #9 / §4.1 #41):** cites "57 unread items in one list" from an earlier multi-session crawl.
- **Screenshot `008-notifications.webp`:** Samira Patel session shows `Unread (37)` and 28 visible `THIS WEEK` rows.
- **Captured DOM (`33-notifications-center.html` — Arjun Mehta):** shows **`Unread (6)`** across **8 total notification rows** (6 unread + 2 read), split into two date headers (`This week` = 4 unread quote-expiry rows; `Earlier` = 2 unread + 2 read account data-export rows). Header bell badge also shows `6`.
- **Decision (frozen):** Per prompt §4 & §7 Gate S, **Arjun Mehta's captured DOM (`Unread (6)`, 8 rows)** is frozen as content truth; the report's 57-row figure and Samira Patel's 37-row screenshot are documented here as alternate-session evidence of why ungrouped flat rows become noisy at scale.

## 2. Frozen Content Truth (`33-notifications-center.html`)

- **Shell:** 232px sidebar (`MAIN`: Dashboard, Requests, Projects, Quotes, Messages, Billing, Invoices, **Notifications [active]**; `EXPLORE`: Blog, Portfolio; `ACCOUNT`: Profile, Settings) + 64px header (`Dashboard › Notifications`, `Search ⌘K`, theme toggle, messages icon, bell badge `6`, `AM · Arjun Mehta`).
- **Page header:**
  - H1: `Notifications`
  - Subtitle: `Stay updated on your projects and account.`
  - Top-right actions: `Mark all read` · `Clear read`
- **9 Category Tabs (`role="tablist"`):**
  `All` (selected) · `Unread (6)` · `Quotes` · `Payments` · `Messages` · `Projects` · `Requests` · `Account` · `Settings`
- **Captured Notification Rows (8 total — 6 unread, 2 read):**

| # | Date Group | State | Category | Title | Body Copy | Timestamp | Deep-Link `href` | Row Action `aria-label` |
|---|---|---|---|---|---|---|---|---|
| 1 | `This week` | **Unread** | Quotes | `Quote expiring soon` | `Your quote "AUDIT-P24-20261005-03ipf-sent Request" expires within 24 hours.` | `6 days ago` | `/quotes/01a10b3a-8553-77d9-8160-38cc6398e154` | `Mark as read` |
| 2 | `This week` | **Unread** | Quotes | `Quote expiring soon` | `Your quote "AUDIT-P23-20261005-zvc6j Request to Quote Builder" expires within 24 hours.` | `6 days ago` | `/quotes/01a10b35-82d4-7727-a030-0d1f1da6a65a` | `Mark as read` |
| 3 | `This week` | **Unread** | Quotes | `Quote expiring soon` | `Your quote "AUDIT-P24-20261005-uc3d4-sent Request" expires within 24 hours.` | `6 days ago` | `/quotes/01a10aa6-ec30-755c-8d4c-83b8694c61dd` | `Mark as read` |
| 4 | `This week` | **Unread** | Quotes | `Quote expiring soon` | `Your quote "AUDIT-P23-20261005-u7d0j Request to Quote Builder" expires within 24 hours.` | `6 days ago` | `/quotes/01a10aa3-bd55-7071-9a18-f568f9d4a929` | `Mark as read` |
| 5 | `Earlier` | **Unread** | Account | `Your data export is ready` | `Your requested data export is ready to download.` | `17 days ago` | `/settings/account?downloadExport=export_1791375234538_ce4d2b` | `Mark as read` |
| 6 | `Earlier` | **Unread** | Account | `Your data export is ready` | `Your requested data export is ready to download.` | `17 days ago` | `/settings/account?downloadExport=export_1791375233899_ce4d2b` | `Mark as read` |
| 7 | `Earlier` | Read | Account | `Your data export is ready` | `Your requested data export is ready to download.` | `18 days ago` | `/settings/account?downloadExport=export_1791333801917_ce4d2b` | `Delete notification` |
| 8 | `Earlier` | Read | Account | `Your data export is ready` | `Your requested data export is ready to download.` | `18 days ago` | `/settings/account?downloadExport=export_1791333801581_ce4d2b` | `Delete notification` |

- **Tokens / classes observed on live cards:** `rounded-lg border border-gray-200/80 bg-white shadow-none dark:border-gray-800 dark:bg-white/[0.02]` (raw non-token classes — fixed via C6), H1 `26px` (upgraded to `32–40px` via C18), competing `--ta-brand-*` + violet `--accent-1` (consolidated via C5).
- **Empty tabs in Arjun Mehta's capture:** `Today` has 0 items (date group supported when items arrive or in filter copy; `This week` and `Earlier` are populated); tabs `Payments`, `Messages`, `Projects`, `Requests`, and `Settings` have 0 items for Arjun Mehta and therefore require honest, instructive per-tab empty states linking to their respective portal surfaces (`F14`, `F12`, `F08`, `F05`, `F21`).

```
## GATE S (F19)
Screenshots opened: 1/1 · HTML opened: 1/1 · audit-metadata read: YES
Routes mapped: /notifications · Content frozen: YES (9 tabs, Unread (6), 8 rows across This week / Earlier)
Gate: PASS
```
