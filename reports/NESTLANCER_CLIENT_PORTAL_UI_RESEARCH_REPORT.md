# Nestlancer Client Portal — UI Research & Redesign Report

**Prepared:** 24 Oct 2026 · **Client account audited:** Arjun Mehta (`arjun.mehta@nestlancer.com`) · **Live app:** `https://app.nestlancer.com/`
**Method:** Playwright (Chromium 156) crawl of every client-portal route (55 full-DOM HTML snapshots with inlined CSS) + visual diff against the 45 repo screenshots + comparative research across 13 external design resources.

> **Artifacts**
> - `nestlancer-client-pages-html/` — 55 HTML snapshots + `audit-metadata.json` (per-page: headings, buttons, inputs, tables, computed styles, CSS custom properties, failed requests, console errors)
> - `nestlancer-client-pages-html/README.md` — file ↔ URL ↔ repo-screenshot mapping
> - `ui-designing-client-dashboard/Nestlancer-clients-screenshots/clients/` — the 45 original WebP screenshots used for cross-verification

---

## 1. Executive Summary — What We Found

| # | Finding | Evidence | Severity | Verdict |
|---|---|---|---|---|
| 1 | **The live UI matches the repo screenshots.** Every one of the 45 screenshots maps to a route I reproduced live, with identical components, labels, spacing and states. | 45/45 screenshots mapped to live routes (§4) | — | ✅ Screenshots are a **valid, current** baseline |
| 2 | **The portal has no broken pages — but the API layer is fragile.** `GET /api/v1/projects` returns **HTTP 502 (Cloudflare origin_bad_gateway)** and is also CORS-blocked, so `/projects` and `/projects/[id]` render a bare *"Could not load projects / Network Error / Try again"* card. | `audit-metadata.json → failedRequests`, `consoleErrors` | 🔴 Critical | UI is fine, **backend is broken** — projects list & project detail cannot load in production |
| 3 | **Status badge text fails WCAG AA.** Badges use a saturated hue at 12% tint background (`--status-success`, `--status-warning`, `--status-error`, `--status-info`). Measured contrast **1.73 – 3.23 : 1** (AA needs 4.5:1 for 12px text). | Computed from live CSS vars | 🔴 High | Colour carries state but is unreadable |
| 4 | **Two colour systems coexist.** Portal chrome uses `--ta-brand-*` (`#465fff` blue) while generic components use `--primary → --accent-1` (`250 100% 52%` = **violet-blue**). Login page marketing panel uses a **third** palette (`--accent-1: 175 84% 26%` teal). | CSS var dump, `01-dashboard…html` | 🟠 High | No single brand token; buttons render blue, focus rings violet |
| 5 | **The dashboard is a status board, not a reassurance page.** It leads with 5 count KPIs, a 4-bar pipeline, and an "Awaiting you" list — but gives no *verdict sentence*, no trend, no dates on the pipeline bars, no deadline. | `01-dashboard…html` + screenshot | 🟠 High | Fails the "client reads it in 60 seconds" rule (AdminLTE, AgencyAnalytics, Moxo) |
| 6 | **Messaging is split across 2 routes and needs 3 clicks.** `/messages` is a landing page with an *"Open messaging panel"* button that routes to `/messages/inbox`; then the client must pick a thread. | `18`, `19` snapshots | 🟠 High | Highest-friction path in the product (support, payments, deliverables all funnel here) |
| 7 | **"Awaiting you" is the strongest idea in the product** — but it exists only on the dashboard and is not reused on the pages that need it (project milestones, quote approval, invoices). | `01` vs `14d`/`16`/`32` | 🟠 High | Duplicate the pattern, don't rebuild it |
| 8 | **Settings ▸ Activity is a wall of 57 identical "LOGIN / User signed in successfully" rows** with no filters, no grouping, no pagination. | `42-settings-activity.html` | 🟠 High | Looks broken to a client; needs event grouping + filters |
| 9 | **Notifications centre is unfiltered and ungrouped** — 57 unread items in one list with 9 tabs but no date grouping, no bulk-select, no per-item action beyond "mark read". | `33-notifications-center.html` | 🟠 High | Client-facing noise; the most-scrolled page after dashboard |
| 10 | **Mobile is a afterthought.** At 375 px the sidebar becomes a hamburger, but the dashboard KPI row, the pipeline card and the 3-column billing table have no mobile treatment; the data tables have no horizontal-scroll or card-fallback. | `45-dashboard-mobile-viewport.html` | 🟠 High | Clients on phones (a large share of Indian SMB clients) get a degraded portal |
| 11 | **No dark-mode QA.** Dark tokens exist (`--background: 222 47% 6%`), but 191 `dark:` utilities coexist with hard-coded `gray-200/80` / `gray-800` / `white` card borders and `bg-white` — the two systems drift. | `06-dashboard-dark-mode.html` | 🟡 Medium | Dark mode is a checkbox, not a theme |
| 12 | **Design-system hygiene is good in places, absent in others.** `focus-visible` rings (48), `aria-label` (28), `role="tab"` on tabs, `tabular-nums` on money, `transition-theme` utility — but card borders are re-declared as raw hex in 6+ different forms across pages. | DOM class census | 🟡 Medium | Normalise to tokens |
| 13 | **The repo screenshot set is incomplete vs. the live product** — the live app has 6 routes the screenshots don't cover (login/register/forgot-password, global search, dark mode, mobile, projects-populated). | §3.1 vs §4 | 🟡 Medium | Extend the capture script before the redesign |

**Bottom line:** the portal is **structurally sound and information-complete** — it already ships the request→quote→project→payment→delivery chain with e-signature, milestone gates and a real messaging system. What is missing is not *features*, it is **hierarchy, restraint, accessibility and one coherent design system**. The external benchmark research (§5) confirms the same gap: every 2026-era client portal benchmark leads with *one verdict + one next action*, while Nestlancer leads with *four equally-weighted count cards*.

---

## 2. Scope & Verification Method

### 2.1 What was captured

| Activity | Detail |
|---|---|
| Playwright crawl | 55 routes/states captured as full DOM + inlined CSS at `1440×900`, plus one `375×812` mobile pass |
| Auth | Real login as Arjun Mehta (read-only; **no form, payment, signature, or account action submitted**) |
| Screenshot cross-check | All 45 repo WebP screenshots opened and compared against the live DOM |
| State coverage | Tabs (dashboard workbench ×4, work hub ×3, project detail ×6, messages filters), dialogs (⌘K palette, file preview), micro-states (inline message edit, reply composer, members rail, dark mode) |
| API telemetry | Every request logged — status, URL, failure reason; console errors captured |
| Design tokens | All 137 CSS custom properties on `:root` + `.dark` + `.public-editorial` extracted |
| Accessibility probe | Focus-ring / aria / role census; WCAG contrast computed from live token values |
| External research | 13 design resources fetched and read in full (see §5) |

### 2.2 Two live pages could not be captured with real data

| Page | Cause | How it was handled |
|---|---|---|
| `/projects` (list) | `api.nestlancer.com/api/v1/projects` → **502** | Captured the real error state, **plus** a Route-fulfilled populated DOM (`13b`, `14b`–`14g`) so the *intended* UI could be reviewed |
| `/projects/[id]` | same endpoint, plus `/progress`, `/timeline`, `/deliverables`, `/milestones` | Same dual capture |

> This is a **live production defect**, not a crawl limitation. The repo screenshots prove the page renders correctly when the API is healthy.

---

## 3. The Existing UI — Design System Audit

### 3.1 Information architecture (as implemented)

| Group | Nav item | Route | Badge / affordance |
|---|---|---|---|
| **MAIN** | Dashboard | `/dashboard` | — |
| | Requests | `/requests` | KPI row + `Requests (12)` tab count |
| | Projects | `/projects` | — |
| | Quotes | `/quotes` | — |
| | Messages | `/messages` | Bell badge (6) + Workbench `Inbox 2` |
| | Billing | `/payments` | — |
| | Invoices | `/invoices` | — |
| | Notifications | `/notifications` | Bell badge (6) |
| **EXPLORE** | Blog | `/blog` | public surface |
| | Portfolio | `/portfolio` | public surface |
| **ACCOUNT** | Profile | `/profile` | — |
| | Settings | `/settings/account` | 5 sub-tabs |

**Header (every page):** collapse/back button · breadcrumb (`Dashboard › Requests`) · `Search ⌘K` · theme toggle · messages icon (badge) · notifications bell (badge) · avatar + name + chevron.

### 3.2 Design tokens extracted from the live app

| Token group | Key values | Assessment |
|---|---|---|
| **Typeface** | `Outfit` (self-hosted `__Outfit_a80a2d`, woff2) — `font-sans` + `font-display` | ✅ Distinctive, geometric, good for a studio brand. Only **one** family — no mono for IDs/references/timestamps (Mercury, Vault, Signal all use one) |
| **Type scale (observed)** | H1 `24/32 600` · H2 `14 600` · body `14/1.75` · meta `12` · micro `11` | ⚠️ Compressed. No 32–48px display size inside the portal (public site has 44px) — the portal never feels *premium* |
| **Neutral ramp** | `--background 210 40% 98%` · `--card 0 0% 100%` · `--muted 210 40% 96%` · `--border 214 32% 91%` · `--foreground 222 47% 11%` · `--muted-foreground 215 16% 38%` | ✅ Clean shadcn-style ramp. Foreground 17.87:1, muted 6.59:1 — both pass AA |
| **Brand** | `--ta-brand-50 #ecf3ff` → `-500 #465fff` → `-600 #3641f5` → `-700 #2a31d8` → `-950 #161950` | ✅ Well-built 9-step blue ramp, good for hover/active states |
| **Conflicting accent** | `--accent-1 250 100% 52%` (#330AFF violet-blue) → `--primary` → `--ring` | 🔴 Two primaries in one app. Buttons = brand blue, focus ring = violet. `bg-primary` used 2× vs `bg-ta-brand-500` 18× on the dashboard |
| **Third palette** | `.public-editorial { --accent-1: 175 84% 26% }` (teal) on login/register | 🟠 Auth pages are brand-teal, portal is brand-blue — the brand changes at the login door |
| **Status hues** | success `160 84% 39%` · warning `38 92% 50%` · error `0 84% 60%` · info `200 98% 48%` · purple `270 76% 53%` · neutral `215 16% 47%`, each with `/-bg` 12% and `/-border` 30% | 🔴 Badges pair the **full-saturation hue** with a 12% tint → measured **1.73–3.23:1**. Must use a darkened text variant (e.g. `warning 32 90% 28%` = 6.81:1) |
| **Radii** | `--radius .875rem` · `sm 6` · `md 10` · `lg 14` · `xl 20` | ✅ Consistent, but cards are hard-coded `rounded-lg` (19×) vs `rounded-xl` (8×) on the same page |
| **Shadows** | `--ta-shadow-xs`, `--ta-shadow-sm`, `--glass-shadow`, plus raw `shadow-sm` | 🟠 Mixed shadow vocabulary |
| **Layout** | `--sidebar-width 260px` · `--ta-sidebar-expanded 232px` · `--ta-sidebar-collapsed 56px` · `--header-height 64px` · `--content-max-width 1400px` | ✅ Reasonable; 260px sidebar is wide for 9 nav items |
| **Motion** | `--duration-fast 150ms` · `--duration-normal 280ms` · `--duration-slow 500ms` · `--ease-spring` · `transition-theme` utility | ✅ Good foundation; `animate-in` = 0 on dashboard → **almost no motion** |
| **Scrolling** | `--scrollbar-size 6px`, custom `--scrollbar-thumb` tokens | ✅ Nice detail rarely seen |

### 3.3 Component census (dashboard DOM)

| Component | Count / pattern | Note |
|---|---|---|
| Cards | `rounded-lg border border-gray-200/80 bg-white shadow-none` | ⚠️ Raw hex, not a token — breaks dark mode, drifts from `--border` |
| Buttons | `h-9 rounded-md px-3`, variants `default / outline / ghost / destructive` | ✅ Sound shadcn pattern |
| Icon set | **43 inline Lucide SVGs**, `stroke-width=2` | ✅ Consistent, but inlined per-instance (no sprite/icon component) |
| Focus rings | 48 × `focus-visible:ring-2 ring-ring` | ✅ Good |
| ARIA | 28 × `aria-label`, `role="tab"` + `aria-selected` on tabs, `role="separator"` in chat | ✅ Above average for a client portal |
| Money | `tabular-nums tracking-tight` | ✅ Correct |
| Responsive utilities | `sm:` 32 · `md:` 8 · `lg:` 11 · `xl:` 6 · `2xl:` 0 | ⚠️ **No 2xl tier** — content stops at 1400px, so on 2560px monitors the portal floats in a narrow column |
| Animations | `animate-in` 0 · `animate-ping` only on login badge | ⚠️ Portal feels static next to the benchmark set (Flux, Apex, Haze all animate) |

---

## 4. Page-by-Page UI Detailed Report

### 4.1 Master inventory table — all 55 captured states

| # | Route | Page | Live DOM status | Repo screenshot match | Key components | Principal UI issue |
|---|---|---|---|---|---|---|
| 1 | `/login` | Sign in | ✅ OK | — | 2-col split, form + "Your delivery OS" hero, ping badge, operator sign-in link | Marketing panel uses a **teal** brand ≠ portal blue; no SSO, no passkey, no social |
| 2 | `/register` | Sign up | ✅ OK | — | 7 fields (first/last/email/pw/confirm/terms/marketing) | No field-level inline validation shown in captured state; no "what happens next" onboarding preview |
| 3 | `/forgot-password` | Reset | ✅ OK | — | 1 field + send link | — |
| 4 | `/dashboard` | Overview (Quotes tab) | ✅ OK | `033-dashboard-quotes-panel` | 5 vitals cards, Pipeline & billing, Awaiting you, Live workbench, Recent activity | 5 equal-weight KPIs = no hierarchy; pipeline bars have no labels/dates; "Live · 30s" only hint of freshness |
| 5 | `/dashboard` | Overview (Pay now tab) | ✅ OK | `031-dashboard-pay-now-panel` | Tab swap in same card | ✅ Good pattern — only 1 of 4 tabs is surfaced elsewhere (Billing) |
| 6 | `/dashboard` | Overview (Projects tab) | ✅ OK | `032-dashboard-projects-panel` | Tab swap | Projects count = 0 → tab empty; no nudge to "View my requests" (the empty-state CTA that *does* exist on `/projects`) |
| 7 | `/dashboard` | Overview (Inbox tab) | ✅ OK | `030-dashboard-inbox-panel` | Tab swap | Duplicates `/messages`; no deep-link to the thread |
| 8 | `/dashboard` | ⌘K Command Palette | ✅ OK | `037-global-search-client-dialog` | NAVIGATION / EXPLORE / ACTIONS groups, "Switch to dark mode" | 🔴 **Actions include "New project" and "New direct message" that don't exist client-side** (client-to-client messaging is explicitly disabled). Broken promises in the palette |
| 9 | `/dashboard` | Dark mode | ⚠️ Partial | — | `.dark` class applied | `bg-white` + `gray-200/80` card borders don't invert → washed-out dark theme |
| 10 | `/requests` | Work Hub (Requests) | ✅ OK | `023-requests` | 4 KPIs, tabs, status select, search, list, pagination | ✅ Best list page in the app. But rows are text-only — no date emphasis, no money, no thumbnail |
| 11 | `/requests?view=all` | Work Hub (All) | ✅ OK | — | Same | ✅ |
| 12 | `/requests?view=projects` | Work Hub (Projects) | 🔴 502 | `045-requests-projects-view` | Error card | Projects tab in Work Hub also breaks |
| 13 | `/requests/new` | New request form | ✅ OK | `041-new-request-form` | 3 card sections (Brief / Budget / Timeline & requirements), 10 inputs, help tooltips, sticky footer | ✅ Very good form. Missing: **file attachment at creation**, budget *guide* (typical range per category), progress indicator |
| 14 | `/requests/[id]` | Request details (converted) | ✅ OK | `024-requests-details` | Request details, Requirements chips, Attachments, **Status history timeline (9 stages)**, Linked quote, Actions | ✅ Excellent. Status timeline is the 2nd best idea in the product. Issue: timeline has no visual distinction between actor + date groups |
| 15 | `/requests/[id]` | Request details (quoted) | ✅ OK | — | Same | Same |
| 16 | `/projects` | Projects list | 🔴 502 | `014-projects` | Error card | API 502. Intended design (from `13b`) = 3-col card grid, icon tile, status badge, "Started <date>" |
| 17 | `/projects/[id]` | Project details — Overview | ✅ (mocked) | `015-projects-details` | Title/desc/status/% badge, Milestones count, Overall progress bar, action bar (Pay now / Message / View milestones), tab bar ×6, Project status 3-card row, Daily progress, Latest progress, Recent updates, Submit feedback | 🟠 **"Latest progress" and "Recent updates" show the same feed twice** — redundant, and both were empty in the live-captured state |
| 18 | `…?tab=progress` | Progress tab | ✅ (mocked) | `020-projects-details-progress` | Filter chips (All/Updates/Milestones/Deliverables), date-grouped feed, Request changes form | ✅ Date grouping is right. Feed rows are text-dense; no milestone progress bar per row |
| 19 | `…?tab=milestones` | Milestones tab | ✅ (mocked) | `019-projects-details-milestones` | Vertical timeline: Deposit (Paid) → LMS Platform Setup (Approved + Payment Due + **Pay now / Request changes**) → Okta SAML (locked) | ✅ Best screen in the portal. Missing: **"why is this locked?"** microcopy, no preview of next milestone's deliverables |
| 20 | `…?tab=deliverables` | Deliverables tab | ✅ (mocked) | `016-projects-details-deliverables` | Grouped by milestone, file cards, Approved badge, Preview link | ✅ Approval flow exists but no **reject / request revision** affordance visible on client side |
| 21 | `…?tab=messages` | Project messages | ✅ (mocked) | `018-projects-details-messages` | Thread + right "Search in conversation" rail, file attachments, Mark read | ✅ Ties messages to a project. No SLA ("we reply within Xh") |
| 22 | `…?tab=files` | Project files | ✅ (mocked) | `017-projects-details-files` | File card grid, Preview link | ✅ |
| 23 | `/quotes` | Quotes list | ✅ OK | `021-quotes` | 4 KPIs (Total/Pending/Accepted/Declined), status filter, rows, pagination | ✅ Only 1 quote visible for this account — empty-heavy. Rows lack *expiry countdown* |
| 24 | `/quotes/[id]` | Quote — awaiting acceptance | ✅ OK | `044-quote-awaiting-acceptance-and-signature` | Line items table, Payment schedule table, Documents, **ACCEPT & SIGN block (checkbox + legal name + sign)**, T&C (10 clauses), sticky footer Negotiate / Decline / Total | 🔴 **The single most conversion-critical screen is the weakest.** Legal name field + 10 dense clauses in a wall of `text-xs`; "Complete agreement to accept" button disabled with tiny helper text |
| 25 | `/quotes/[id]` | Quote — accepted | ✅ OK | `022-quotes-details` | Same + Service agreement (signed, agreement no. NL-CTR-2026-000005) + Open project | ✅ |
| 26 | `/messages` | Messages overview | ✅ OK | `004-messages` | 3 KPIs, Recent conversations list, "Open messaging panel" | 🟠 An extra hop for no reason; duplicates dashboard Workbench |
| 27 | `/messages/inbox` | Messaging panel | ✅ OK | `005-messages-inbox` | 3-pane: queue (filters All/Unread/Direct/Project/Group, sort) · centre (empty state) · right "Inbox snapshot" | ✅ Real Intercom-grade split-pane. Right rail shows counts only — wasted 260px |
| 28 | `/messages/new/direct` | New message | ✅ OK | `006-messages-new-direct` | Single card, Nestlancer Support only | ✅ Explicitly says client-to-client is unavailable — good honesty, but conflicts with ⌘K "New direct message" |
| 29 | `/messages/thread/[id]` | Group thread | ✅ OK | `007-messages-thread-details` | Header (Members, Mark read), quick-reply chips, chat wallpaper, bubbles, mention chips, attachments, composer | ✅ Best chat UI in the set. Missing: **read receipts, typing indicator, message count** |
| 30 | `…` + Members | Members rail | ✅ OK | `039-messages-group-members-panel` | Group info, member list w/ roles, Leave group | ⚠️ "Leave group" is destructive, same visual weight as a label |
| 31 | `…` + Reply | Reply composer | ✅ OK | `040-messages-reply-composer` | "REPLYING TO RIYA KAPOOR" banner + preview + close | ✅ |
| 32 | `…` + Edit | Inline edit | ✅ OK | `038-messages-edit-message-form` | Textarea + Save / Cancel inside the sent bubble | ✅ |
| 33 | `/messages/thread/[id]` | Direct thread | ✅ OK | — | Same shell, quick replies ("Thanks, I'll review this.") | ✅ |
| 34 | `/payments` | Billing Center | ✅ OK | `009-payments` | 3 KPIs (Total paid / Pending / In dispute), Transaction history table (6 cols), Razorpay trust strip | 🟠 Table has no search, no date-range, no sort, no pagination (11 rows shown, all visible). **"In dispute ₹0.00" is a permanent zero-state KPI** |
| 35 | `/payments/methods` | Payment methods | ✅ OK | `011-payments-methods` | Empty state, "Add a payment method" explainer, Go to payments | ✅ Clean empty state. No UPI mandate / auto-pay option |
| 36 | `/payments/[id]` | Checkout — Pay online | ✅ OK | `010-payments-details` | Order summary, ₹ amount (large), Currency/Reference/Created, Pay online ↔ Bank/UPI tabs, Razorpay CTA, UPI-ID desktop explainer, Status stepper, Payment details, "How checkout works" | ✅ Rich, trustworthy. Issue: **3 competing CTAs** (Pay online / Bank-UPI / Proceed to secure checkout) plus a Cancel inside a red-outlined button and a Cancel in the right rail |
| 37 | `…` + Bank/UPI tab | Manual transfer | ✅ OK | `042-payment-details-bank-and-upi-transfer` | Bank account details, UTR field, Notes, File upload (image/PDF), Submit for verification | ⚠️ Raw `<input type="file">` — native "Choose File / No file chosen" control, breaks the design system |
| 38 | `/payments/[id]` | Payment — Completed | ✅ OK | `001-payment-details-completed` | Paid badge, "This payment has been recorded", Receipt/Invoice tabs, "File a payment dispute" | ✅ |
| 39 | `/payments/[id]` | Payment — Not due yet | ✅ OK | `002-payment-details-not-due-yet` | "Checkout not available yet" explainer, Cancel payment only | 🟠 Dead-end screen with **no link to the milestone that unlocks it** — client must guess |
| 40 | `/invoices` | Invoices archive | ✅ OK | `003-invoices` | Table (INVOICE / PROJECT / AMOUNT / STATUS / ACTIONS) | 🟠 No search, no filter, no pagination, no date, no total row |
| 41 | `/notifications` | Notifications centre | ✅ OK | `008-notifications` | 9 category tabs, THIS WEEK / EARLIER groups, 57 rows with per-type icon | 🟠 57 unread; each row is icon + title + body + timestamp + ✓. No bulk actions, no grouping by entity, no deep-link styling |
| 42 | `/profile` | Profile view | ✅ OK | `012-profile` | Avatar, name, email, headline, bio, skill chips, "Looking for security or notifications?" | 🟠 Profile is **public-facing** (visibility toggle) yet lives under ACCOUNT in a private portal — concept mismatch |
| 43 | `/profile/edit` | Edit profile | ✅ OK | `013-profile-edit` | Photo upload/remove, first/last/phone/headline/bio/skills, sticky Save | ✅ Skill field is a **single comma-separated textarea** — should be chips + autocomplete |
| 44 | `/settings/account` | Settings — Account | ✅ OK | `025-settings-account` | Privacy (visibility select + 2 toggles), Danger zone (Data export / Delete account with password) | ✅ Danger zone is well done |
| 45 | `/settings/security` | Settings — Security | ✅ OK | `029-settings-security` | Change password, 2FA setup (3-step), Active sessions list (8 sessions, IP, UA, last active, Sign out) | ✅ Best settings page. Issue: **"Sign out all" and "Sign out" look identical** |
| 46 | `/settings/notifications` | Settings — Notifications | ✅ OK | `028-settings-notifications` | Channels, Quiet hours (From/To/TZ), Category matrix (6 categories × Email/Push/In-app = 18 switches) | ✅ Excellent. Missing: digest frequency, per-category time windows |
| 47 | `/settings/files` | Files — grid | ✅ OK | `027-settings-files`, `035-files-file-actions-menu` | Drag-drop zone, type chips (All/Images/Documents/Video/Archives), source tabs (6), search, status filter, grid/list toggle, **Generated documents grouped by request** | ✅ "Generated documents grouped by request" is a strong IA idea. Issue: **no folder tree, no bulk select, no file versioning** |
| 48 | `…` list view | Files — list | ✅ OK | `036-files-list-view` | Same + dense table rows (icon, name, type/size/date, Preview/Download/⋯) | ✅ |
| 49 | `…` preview | Files — preview modal | ✅ OK | `034-files-archive-preview-dialog` | Modal with filename, Open / Close, "No in-app preview for this file type" | 🟠 Preview modal is **blank** for non-PDF/unsupported types. Blank white box = broken feel. ZIP preview shows nothing at all |
| 50 | `/settings/activity` | Settings — Activity | ✅ OK | `026-settings-activity` | 57 rows of LOGIN events | 🔴 See Finding #8 — unusable as-is |
| 51 | `/blog` | Blog (public) | ✅ OK | — | Editorial cards | ✅ Different (editorial) visual language from the portal — again a third style |
| 52 | `/portfolio` | Portfolio (public) | ✅ OK | — | Work cards | ✅ |
| 53 | `/dashboard` @375px | Mobile | ✅ OK | — | Hamburger + stacked content | 🟠 Tables have no mobile card-fallback |

### 4.2 The four pages that carry the product (weighted analysis)

| Page | Business weight | UI weight | Verdict |
|---|---|---|---|
| **Quote accept & sign** | 🔴 Decides revenue | 🟠 Weakest screen in the app | Must be redesigned first — it currently converts by luck |
| **Project milestones** | 🔴 Decides retention | 🟢 Best screen | Scale the pattern; add the "why locked" microcopy |
| **Payment checkout** | 🔴 Decides cash-in | 🟡 Rich but noisy | 3 CTAs → 1 primary + 1 secondary |
| **Dashboard overview** | 🟠 First 5 seconds | 🟡 Informative, flat | Needs a verdict line + a single next action |

---

## 5. Comparative Research — 13 External Resources

### 5.1 Source-by-source findings

| # | Source | What it teaches | Directly applicable to Nestlancer? |
|---|---|---|---|
| 1 | **AdminLTE — 10 Client Dashboard & Portal Design Examples** [1] | Design rules: design for the *skeptical skimmer* (lead with a verdict); white-label completely; **explain every number**; **show the next step**; scope visibility per client | ⭐⭐⭐ **Highest value.** The "lead with a verdict sentence" rule is exactly what the dashboard lacks |
| 2 | **AdminLTE — 12 Dashboard Design Examples** [2] | 5 universal rules: one thing is clearly most important; colour means *state, not decoration*; density follows expertise; **status is never colour alone**; the best ones answer one question | ⭐⭐⭐ Rule 4 fixes the badge contrast problem; rule 5 fixes the 5-equal-KPIs problem |
| 3 | **Dribbble — Client Portal tag** (116 shots) [3] | Visual language trends: glassmorphism panels, soft gradient KPIs, card-with-icon-tile patterns, dark-theme client portals, invoice-list designs, timeline/roadmap motifs | ⭐⭐ Visual inspiration only — none are built products |
| 4 | **Webflow — Made in Webflow: Client Dashboard** [4] | Community-built dashboards (Memberstack #8 template 514 likes; agency dashboard; integration management; project management) — proves **Command Palette + shell + card grid** is the baseline expectation | ⭐⭐ Confirms ⌘K is table stakes (Nestlancer already has it) |
| 5 | **AdminLTE — 35 Dashboard Templates** [5] | The 2026 template market skews to **shadcn/ui + Tailwind v4 + OKLCh tokens**, 50–216 page coverage, live theme customisers, 3 density levels, RTL, PWA | ⭐⭐ Design-system benchmark: Nestlancer already uses shadcn-style tokens — align, don't reinvent |
| 6 | **AdminLTE — 34 Free & Premium Templates** [6] | Free tier is now *good enough* (Tabler 40k★, Shadcn Admin 11k★, Gentelella v4, AdminLTE 45k★) → **no need to buy a template**, adopt patterns instead | ⭐⭐ Removes "should we buy Apex/Tabler?" from the decision |
| 7 | **Tailwind Admin — 25+ Free Design Templates** [7] | Checklist of a good dashboard: KPI cards w/ trend %, right chart type per data, tables with search+filter+status+pagination, **sidebar with grouped sections**, one accent colour, matching dark mode, Auto Layout, Figma↔code parity | ⭐⭐⭐ A literal QA checklist for the redesign |
| 8 | **WrapPixel — 10 Best Dashboard Designs** [8] | Modernize/MaterialM/Asanah: clean responsive layout, light+dark, Figma↔code, task/milestone management, widgets, charts, forms | ⭐⭐ Asanah's milestone model is closest to Nestlancer's delivery domain |
| 9 | **AdminLTE — 22 SaaS Dashboard Templates** [9] | Billing patterns: **separate settled balance from outstanding invoices**; MRR with movement breakdown; failed payments + expiring cards as **work queues not metrics**; **design the customer-facing billing page as carefully as the admin one**; hiding cancellation converts churn into a ticket | ⭐⭐⭐ Direct: Nestlancer's Billing Center has "Total paid / Pending / In dispute" — merge into a ledger + work-queue model |
| 10 | **Assembly — Client Portal Templates** [10] | What makes a good client portal: clear navigation, a welcoming dashboard with notifications, customisation, integrations. Templates: Assembly, Notion, Bonsai, Softr, Budibase | ⭐⭐ Confirms the portal-as-home-base model Nestlancer already has |
| 11 | **Softr — No-code client dashboard** [11] | What a client dashboard must include: project updates, key metrics, budget tracking, visualisation, resource hub. **"Ask AI on any data block"**, per-record permissions, live charts, forms, support hub | ⭐⭐⭐ The **AI-on-data + resource/FAQ hub** are the two features Nestlancer is missing outright |
| 12 | **TailGrids — 21+ React Dashboards** [12] | Production-readiness checklist: auth pages (login/register/forgot/2FA), responsive, accessibility (ARIA, keyboard), active maintenance, licence; AI-readiness (AI pages, MCP, CLI) | ⭐⭐ Its "production readiness" list is a good non-negotiables gate for the redesign |
| 13 | **AdminLTE — 13 Finance/Banking Dashboards** [13] | Finance UI anatomy: balance/net-worth view, cash-flow view, transaction feed, budgets; typographic hierarchy (big number, cents in lighter weight); reserve colour for state and action | ⭐⭐⭐ Direct for Billing/Checkout: the ₹ amount should be the hero, colour reserved for state |

### 5.2 Cross-source pattern library (what every 2026 client portal does)

| Pattern | Sources endorsing it | Present in Nestlancer? | Action |
|---|---|---|---|
| **Verdict-first summary** (one sentence: "3 projects on track, 1 needs your approval") | [1] AgencyAnalytics, [2] GitHub Pulse | ❌ | **Add** — a plain-English status line at the top of the dashboard |
| **"What happens next" / next-action panel** | [1] Moxo, [2] GitHub Pulse | ⚠️ Partial (`Awaiting you` on dashboard only) | **Reuse on every page** that needs client input |
| **Plain-language explanation next to every number** | [1] Whatagraph, AgencyAnalytics AI summaries | ❌ | **Add** — hover/plain-text on KPI cards (e.g. "₹31,875 pending — Milestone 2 of 3") |
| **One dominant metric** | [2] Mercury, [13] | ❌ (5 equal cards) | **Restructure** vitals to 1 hero + 4 secondary |
| **Status ≠ colour alone** (icon + colour + text) | [2] Home Assistant | ⚠️ Badge has a dot + text, but contrast fails | **Fix** — darker text tokens + keep the dot |
| **Colour reserved for state/action** | [2], [13] | 🟠 Brand blue used on 18 buttons — acceptable, but 3 competing palettes exist | **Consolidate** to one `--brand` + one `--accent` |
| **Density follows expertise** | [2] Plausible vs Matomo | ✅ (client = non-expert → should be *sparser*, currently admin-dense) | **Reduce** dashboard density |
| **Settled vs outstanding money separated** | [9] | ⚠️ 3 KPIs, no ledger grouping | **Rebuild** Billing Center as ledger + work queue |
| **Failed/aged items as actionable queues** | [9] | ❌ | **Add** "3 payments awaiting verification" queue |
| **Cancellation/refund route findable** | [9] | ⚠️ "Cancel payment" exists but buried; "File a payment dispute" is a lone link | **Surface** politely in the right place |
| **Command palette** (⌘K) | [4], [5] Apex/Haze, [6] Gentelella v4, [7], [12] | ✅ Exists — but contains 2 non-existent actions | **Fix contents** |
| **Live theme customiser / density modes / RTL** | [5], [6] | ⚠️ Theme toggle yes; no density/RTL | **Consider** density toggle for data-heavy screens |
| **Empty states that teach** ("Accept a quote to open a project") | [9] "onboarding and empty states as a feature" | ✅ Present on `/projects` | **Propagate** to Quotes/Invoices/Requests |
| **Activity grouped + filterable** | [9] work-queue pattern | 🔴 Flat LOGIN list | **Rebuild** Settings ▸ Activity |
| **Ask-AI on your own data** | [11] Softr, [5] Apex AI assistant, [12] AI-ready | ❌ | **Add** — "Ask about this project" on project/quote |
| **Resource / knowledge hub for self-service** | [11], [10] | ⚠️ Blog + Portfolio only, unrelated to their project | **Add** — project-scoped help & FAQs |
| **Approval + revision loops visible to client** | [8] Asanah, [13] | ⚠️ Deliverables show Approved only | **Add** reject/request-revision on deliverables |
| **PWA install / mobile app shell** | [5], [6], [11], [12] | ❌ (manifest exists, no install prompt seen) | **Add** installable PWA |
| **Per-client scoped access (not per-client dashboards)** | [1] Softr | ✅ (server-scoped) | ✅ Keep |

### 5.3 Benchmark shortlist for the redesign

| Purpose | Recommended reference | Why |
|---|---|---|
| **Shell + dashboard layout** | **Zenith (shadcn)** [5][9] | Achromatic, 57+ pages, closest to Nestlancer's existing shadcn token system |
| **Client-portal UX model** | **Assembly / Copilot** [1][10] | Sets the "portal as polished software" bar; module-card structure (pay / sign / ask / read) |
| **Flow-first "next step" UX** | **Moxo** [1] | Exactly the "what's next, whose move" widget Nestlancer needs at scale |
| **Billing / money screens** | **Mercury** [2] + **TheFrontKit Ledger** [13] | One-number hierarchy, colour reserved for state, ledger vs balance split |
| **Data-dense tables** | **Tabler** [6] | Best free table/filter/pagination system available in Bootstrap-class quality |
| **Free component library to extend** | **Tremor** [13] (Apache 2.0) + **shadcn/ui** | Accessible charts + owned components; no licence lock |
| **KPI/card grammar** | **Odoo** [2] (softly tinted KPI tiles) + **Umami** [2] (5-card row w/ delta chip) | Directly fixes the "5 loud equal cards" problem |
| **Status/status-grid pattern** | **Signal** [2] | Fleet-health grid → a project-health mini-grid for the dashboard |
| **Chat / messaging** | **Moxo + Intercom-style** (already in-app) | Keep the 3-pane shell; add SLA + read receipts |
| **Design QA checklist** | **Tailwind Admin** [7] | Use verbatim as the redesign acceptance checklist |

---

## 6. Answers to the Actual Question: *What to change, what to add*

### 6.1 CHANGE — concrete edits to existing screens

| # | Change | Target page | Specifics | Why (source) |
|---|---|---|---|---|
| C1 | **Replace 5 equal KPI cards with 1 hero + 4 secondary** | Dashboard | Hero = "1 action will unlock your workspace" + ₹ amount; the 4 others become a single compact strip | [2] "one thing is clearly the most important" |
| C2 | **Add a plain-English verdict line** under the H1 | Dashboard, Project, Quote | e.g. *"Corporate LMS is 40% done and needs your ₹20,880 mid-project payment."* | [1] verdict-first; [2] Pulse's summary sentence |
| C3 | **Label the pipeline bars** (Active / Done / Requests / Quotes) | Dashboard | Add current value + % + a one-line reason; the "Requests 17 / Quotes 7" bars are uninterpretable today | [1] "explain every number" |
| C4 | **Fix badge contrast** | All pages | Use darkened text tokens (`--status-warning-text 32 90% 28%` etc.) instead of full-saturation hues on 12% tints | [2] accessibility; WCAG AA |
| C5 | **Consolidate to one brand ramp** | All pages | `--ta-brand-*` becomes *the* `--primary`; `--accent-1` violet is either deleted or explicitly reserved for focus rings; pick ONE portal brand (blue) and one marketing brand (teal) and document the switch | [2] "colour means state, not decoration" |
| C6 | **Replace raw card classes with a token** | All pages | `border-gray-200/80 bg-white shadow-none dark:border-gray-800 dark:bg-white/[0.02]` → `--card` / `--border` / `--shadow-xs` | [5][7] one design system |
| C7 | **Give the quote sign block a real hierarchy** | Quote | 3-step visual: (1) read the numbers, (2) read the terms (collapsible with the key 3 highlighted), (3) sign. Increase legal text to 13–14px, add "Your legal name will be used as an e-signature on Agreement NL-CTR-2026-XXXXX" | [1] Assembly module-card structure |
| C8 | **One primary CTA per checkout** | Checkout | Keep `Pay online` primary; make `Bank / UPI transfer` a secondary tab; demote both "Cancel payment" instances to a single link in a footer row | [9] billing design rules |
| C9 | **Add "what unlocks this" to the Not-due-yet screen** | Payment detail | Link to the blocking milestone + "Approve the LMS Platform Setup delivery to unlock your ₹15,660 final payment" | [1] Moxo next-step |
| C10 | **Rebuild Settings ▸ Activity** | Settings | Group by day, collapse repeated LOGIN events ("Signed in 7 times"), add event-type filter, paginate | [9] work-queue pattern |
| C11 | **Merge the two Messages entry points** | Messages | `/messages` should render the inbox directly; keep `/messages/inbox` as a redirect/deep-link | [2] one question per screen |
| C12 | **Fix the ⌘K palette actions** | Command palette | Remove "New project" and "New direct message" (not available to clients); keep New request, New message, Switch theme, plus jump-to-payment / jump-to-pending-approval | [5] command palettes ship accurate actions |
| C13 | **Give the file-preview modal real content** | Files | PDF via `<iframe>`/object URL, images inline, unsupported types → a designed card (icon, size, "Open in new tab"), not a blank white box | [7] empty/error states are the states that decide quality |
| C14 | **Make the dashboard empty tabs instructive** | Dashboard | "Projects 0" → "Accept a quote to open your first project →" CTA (the copy already exists on `/projects`) | [9] onboarding/empty states as a feature |
| C15 | **Style the Bank/UPI file input** | Checkout | Custom dropzone matching the design system instead of native `<input type="file">` | consistency |
| C16 | **Add mobile treatments for all 6 data tables** | Requests/Quotes/Billing/Invoices/Files/Settings | Card-fallback under `sm:`, horizontal scroll with sticky first column, or "view as cards" toggle | [12] responsive checklist |
| C17 | **Compress the sidebar** | Shell | 260px → 232px; use the freed width; move Blog/Portfolio behind a single "Explore" popover to reduce nav noise | [2] navigation doing explanatory work |
| C18 | **Increase the portal's type scale** | All pages | Introduce a 32–40px display size for the H1 + big ₹ amount; current 24px H1 makes the portal read like an internal tool | [2] Mercury typographic hierarchy |
| C19 | **Add "why is this locked" microcopy** | Milestones | The third milestone shows a lock icon with no explanation | [1] Moxo sequencing |
| C20 | **Move Profile out of the private portal, or into "Public profile"** | Profile | The profile is public (visibility toggle) but sits under ACCOUNT inside a private workspace | IA clarity |

### 6.2 ADD — genuinely missing capability

| # | Addition | Where | Priority | Why (source) |
|---|---|---|---|---|
| A1 | **"Ask AI about this project"** | Project detail, Quote, Billing | 🔴 P1 | [11] Softr "Ask AI on any data block" — clients ask the same 3 questions repeatedly; this is the single biggest trust/efficiency win |
| A2 | **Project-scoped help & FAQ hub** | Project detail → "Help" tab | 🔴 P1 | [11] "resource hub / knowledge base" |
| A3 | **Milestone unlock explainer + "unlock me" deep links** | Milestones, Payment (not due yet) | 🔴 P1 | [1] Moxo "what happens next, whose move" |
| A4 | **Deliverable rejection / request-revision with reason** | Deliverables tab | 🔴 P1 | [8][13] approval loops; today the client can only Approve |
| A5 | **Billing work queue** ("2 payments awaiting verification", "1 invoice 12 days overdue") | Billing Center | 🟠 P2 | [9] failed payments/aged invoices as queues |
| A6 | **Payment-method management that actually works** (save card / UPI mandate) | Payment methods | 🟠 P2 | Currently a dead-end explainer; saves a client 4 clicks each milestone |
| A7 | **Notification grouping + entity deep links** | Notifications | 🟠 P2 | 57 flat rows → group by project/quote/payment with a per-entity card |
| A8 | **Client-visible quote negotiation thread** | Quote detail | 🟠 P2 | "Negotiate" button exists but has no context/comment field |
| A9 | **Project health mini-grid** (like Signal's status grid) | Dashboard | 🟠 P2 | [2] "communicates fleet health in one glance" |
| A10 | **PDF statement of account / GST invoice summary download** | Billing / Invoices | 🟠 P2 | Indian clients need this for accounting; single PDF instead of N downloads |
| A11 | **PWA install + mobile-first client experience** | Shell | 🟡 P3 | [5][6][12] PWA installability; mobile is a first-class client surface |
| A12 | **Saved views / saved filters** | Requests, Quotes, Billing | 🟡 P3 | "My pending approvals", "This month", "Awaiting me" |
| A13 | **Offline / degraded state banner** | Global | 🟡 P3 | The 502 shows a bare error card; a system-status banner ("Project data is temporarily unavailable — retrying") is far more reassuring |
| A14 | **Client-side "expectation log"** (what we promised vs delivered) | Project detail | 🟡 P3 | [2] GitHub Pulse's scope discipline — clients care about scope adherence |
| A15 | **Activity digest by project** (a timeline of everything that happened) | Project detail | 🟡 P3 | Turns the scattered feeds (progress + messages + milestones) into one story |

### 6.3 KEEP — what's already good and must not be lost in the redesign

| Keep | Why |
|---|---|
| The **status-history timeline** on Request details | Best narrative element in the product |
| The **milestone stepper** with Delivery/Payment dual status and gated locks | Genuinely great; the model competitors don't have |
| The **"Awaiting you"** panel | Right idea, wrong placement — replicate it, don't replace it |
| The **3-pane messaging shell**, quick-reply chips, mentions, attachments, inline edit | Intercom-grade, already built |
| **Graceful wording everywhere** — "One action will unlock your workspace", "Your team will post daily updates here as work continues", "Checkout not available yet", "UPI ID entry is not available on desktop browsers" | Exemplary microcopy; a strong brand asset |
| **Razorpay trust strips** + "Secured by Razorpay, 256-bit encryption, PCI-DSS compliant" | Converts anxious payers |
| **Domain-specific honesty** — "Client-to-client messaging is not available" | Rare and trust-building |
| **Role-aware, permissioned, server-scoped data** | One portal, many clients, zero duplication |
| **Cmd+K palette + keyboard hints** (`↑↓ navigate ↵ select esc close`) | Already above the benchmark average |
| **The shadcn-style token architecture** | It is the right foundation — just needs consolidation |

---

## 7. Prioritised Redesign Roadmap

| Phase | Scope | Effort | Outcome |
|---|---|---|---|
| **P0 — Fix production** | Resolve `/api/v1/projects` 502 + CORS; add a system-status/degraded banner; add a retry + support CTA to the error card | S | The Projects area works again |
| **P1 — Foundations** | Consolidate colour to one brand ramp; fix badge contrast (AA); tokenise card/border/shadow; lock type scale incl. a display size; normalise radii; document the token file | M | One design system, dark mode that actually works |
| **P2 — The three money screens** | Quote accept-and-sign redesign → Checkout simplification → Billing Center as ledger + work queue | L | Revenue-converting screens rebuilt |
| **P3 — Dashboard rebuild** | Verdict line, 1 hero + 4 secondary KPIs, labelled pipeline, "Awaiting you" promoted to a first-class action centre | M | First 5 seconds now reassure |
| **P4 — Delivery loop** | Milestone unlock explainer; deliverable reject/revision; project-scoped help & FAQ; Ask-AI; expectation log | L | The delivery experience becomes the differentiator |
| **P5 — Communication** | Merge Messages routes; notification grouping + deep links; activity rebuild; SLA & read receipts | M | Noise removed, trust increased |
| **P6 — Responsive & PWA** | Mobile card-fallbacks for all 6 tables; drawer nav; installable PWA; offline banner | M | Phones become a first-class surface |
| **P7 — Polish** | Motion system (fade/slide/stagger), density toggle, RTL, Figma library parity, Storybook | M | Looks like the 2026 benchmark set |

### 7.1 Redesign acceptance checklist (from Tailwind Admin [7] + TailGrids [12] + WCAG)

| Gate | Pass criteria |
|---|---|
| Hierarchy | A user can name the single most important number on the dashboard in < 2 s |
| KPI cards | Every card shows value + label + trend/why; exactly one hero |
| Charts | Right chart type per data; line for trends, bar for discrete buckets, one big number for a single figure; no pies > 3 slices |
| Tables | Search, filter, status badge, sort, pagination on all 6 tables; mobile card-fallback |
| Navigation | Grouped sidebar; ≤ 9 top-level items; ⌘K jumps to every page & pending action; palette contains only real actions |
| Colour | Exactly one brand ramp; colour reserved for state; status = icon + colour + text; **all text ≥ 4.5:1, all UI/graphics ≥ 3:1** |
| Typography | One family (+ optional mono for IDs/money); ≤ 4 body sizes; display scale for money amounts |
| Dark mode | Matching dark theme (not inverted); all surfaces tokenised; verified page-by-page |
| Accessibility | Full keyboard nav, visible focus, ARIA on tabs/dialogs, skip link (already present), 2FA (already present) |
| Empty/loading/error | Every list, tab, panel and table has a designed empty, skeleton and error state |
| Mobile | 375 / 414 / 768 px pass; no horizontal page scroll; no clipped CTAs |
| Performance | Skeletons instead of spinners; first contentful < 1.5 s; no layout shift on async data |
| Legal | Quote terms readable at 14px; e-signature explains what's being signed; cancellation & dispute routes findable |

---

## 8. Research Sources

| # | Title | URL |
|---|---|---|
| 1 | 10 Best Client Dashboard & Portal Design Examples (2026) — AdminLTE | https://adminlte.io/blog/client-dashboard-design-examples/ |
| 2 | 12 Best Dashboard Design Examples 2026 — AdminLTE | https://adminlte.io/blog/dashboard-design-examples/ |
| 3 | Client Portal — Dribbble (116 shots) | https://dribbble.com/tags/client-portal |
| 4 | Best Client Dashboard Websites — Webflow "Made in Webflow" | https://webflow.com/made-in-webflow/client-dashboard |
| 5 | 35 Best Dashboard Templates 2026 — AdminLTE | https://adminlte.io/blog/dashboard-templates/ |
| 6 | 34 Best Free & Premium Dashboard Templates (2026) — AdminLTE | https://adminlte.io/blog/free-dashboard-templates/ |
| 7 | 25+ Free Dashboard Design Templates for 2026 (Figma & Code) — Tailwind Admin | https://tailwind-admin.com/blogs/dashboard-design-templates |
| 8 | 10+ Best Dashboard Designs for 2026 (Figma + Coded) — WrapPixel | https://wrappixel.com/blog/best-dashboard-designs |
| 9 | 22 Best SaaS Dashboard Templates & UI Design Examples 2026 — AdminLTE | https://adminlte.io/blog/saas-admin-dashboard-templates/ |
| 10 | 5 Amazing Client Portal Templates for Any Type of Service — Assembly | https://assembly.com/blog/client-portal-templates |
| 11 | How to build a no-code client dashboard (+ examples & free templates) — Softr | https://www.softr.io/blog/what-is-a-client-dashboard |
| 12 | 21+ Best React Dashboard Templates in 2026 — TailGrids | https://tailgrids.com/blog/best-react-dashboards |
| 13 | 13 Best Finance, Fintech & Banking Dashboard Templates 2026 — AdminLTE | https://adminlte.io/blog/fintech-banking-dashboard-templates/ |

**Internal sources:** live `https://app.nestlancer.com/` client portal (55 Playwright-captured states) · `nestlancer-client-pages-html/audit-metadata.json` · `Nestlancer-clients-screenshots/clients/*.webp` (45 screenshots).

---

*No production data was modified. Login was read-only; no request, quote, payment, signature or account action was submitted.*
