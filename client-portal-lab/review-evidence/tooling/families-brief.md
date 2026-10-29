
## F03-dashboard-overview  routes=['/dashboard'] states=['populated', 'empty', 'loading', 'error']
 V1 'Calm Overview' sig: Single north-star verdict, 4 vitals, pipeline bars, Awaiting-you + 4-tab workbench with count-bearing tabs
 V2 'Verdict Hero' sig: Split hero with verdict+action left and Awaiting-you rail right; count-up CTA and count-bearing tabs
 V3 'Awaiting-You Spine' sig: Sticky left rail as the page spine: pending payment primary action, quotes expiring, unread, export; live vitals + pipeline right
 V4 'Health Bento' sig: Bento grid with hero tile, 4 vitals, A9 health cell (delivery on track / payments / quotes expiring / unread), pipeline, activity
 V5 'Dense Ops Workbench' sig: Dense 5-KPI strip + tab-led workbench table (PayNow/Quotes/Projects/Inbox); PayNow rows with milestone + deposit; A11 chips + sort
 FROZEN: - **H1**: "Overview" · **Verdict line (C2)**: built from captured figures (invoiced/pending). | - **Workspace vitals · Live · 30s**: Open requests · Active projects · Pending quotes · Unread messages (each with a why-line). | - **Hero action (C1)**: "One action will unblock your workspace." → Complete checkout · Invoiced ₹81,500.00 · ₹31,875.00 pending · Billing history. | - **Pipeline bars (C3)**: Active / Done / Collected / Pending ₹31,875.00 — each labelled with current value + % + one-line reason. | - **Awaiting you**: Pending payment · 6 new (KEEP — promoted to a first-class action centre). | - **Live workbench · One queue at a time**: 4 count-bearing tabs — Quotes 0 · Pay now 4 · Proje

## F04-global-search-command-palette  routes=['⌘K', '/global-search'] states=['open', 'filtered', 'no-results', 'closed']
 V1 'Classic List' sig: One grouped column, quiet flat list over a dashboard backdrop; ↑↓ navigate, ↵ select, esc close
 V2 'Grouped-by-Entity' sig: Sections per entity (Work/Account/Actions) with type chips; two-pane grouped layout over the backdrop
 V3 'Action + Recent' sig: Two-pane: actions on the left, most-recent destinations on the right; both filter together
 V4 'Keystroke-Minimal' sig: One quiet field, a flat list; move with keys, ↵ to go. Minimal hints, nothing competing
 V5 'Dense Two-Pane' sig: Max density: every place on the left, recents on the right, all visible at once
 FROZEN: 

## F05-requests-work-hub  routes=['/requests', '/requests?view=all', '/requests?view=projects'] states=['populated', 'empty', 'loading-skeleton', '502-error+retry']
 V1 'Calm Ledger' sig: Removable filter chips + URL state + detail drawer
 V2 'Ops Console' sig: ⌘K real actions + sortable sticky-header table + mobile card fallback
 V3 'Attention Queue' sig: Verdict hero + 3 attention cards + Review next opens first expired quote
 V4 'Chapter Tabs' sig: Sticky chapter nav with scroll-spy, crossfade and in-page jump
 V5 'Status Lanes' sig: Counted ordered lanes with full keyboard navigation; read-only (no status endpoint)
 FROZEN: - `h1` = 26px/700 — too small (C18); no display step anywhere in this family. | - Buttons: 16 (07) / 14 (08) / 15 (09); active tab colour `rgb(54,65,245)` (= brand-600), inactive `rgb(107,114,128)` — one blue ramp already in use. | - Inputs: 07/08 = `select[status]` + `input[q]`; 09 = `input[q]` only (status filter disappears on the Projects tab). | - Card classes are raw `border-gray-200/80 bg-white shadow-none` — C6 tokenisation target. Badges are 12px saturated text on 12% tint — C4 target. | - `failedRequests`: many `app.nestlancer.com/requests?_rsc=…` `net::ERR_ABORTED` (navigation aborts, benign) **plus** `GET https://api.nestlancer.com/api/v1/projects → net::ERR_FAILED` (the real 502)

## F06-request-new-form  routes=['/requests/new'] states=['populated', 'empty', 'loading-skeleton', 'submit-error+retry', 'success', 'cancel-without-losing-work']
 V1 'Classic Brief' sig: Three stacked sections, per-field help, live completion count, local autosave/restore
 V2 'Three Steps' sig: Gated wizard: Next validates the step, Back is lossless, restore saved step
 V3 'Compact Desk' sig: All 10 fields on one screen; live validity stats and ₹ band ruler
 V4 'Guided Narrative' sig: Question-led long form, sticky TOC, scroll-spy, resume-draft banner
 V5 'Bento Split' sig: Collapsible bento form with a sticky live preview card of all 10 fields
 FROZEN: - `h1` = 26px/700, `h2` = 14px/600 — C18 target (H1 must become 32–40px; section titles 20–24px). | - 22 buttons = 12 shell controls + 10 help toggles + `Save draft` + menu. 10 inputs/selects/textareas counted. | - Cards: `rounded-lg border border-gray-200/80 bg-white shadow-none dark:border-gray-800 dark:bg-white/[0.02]` — C6 target; dark mode uses hard-coded greys (finding #11). | - Inputs: raw `border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900` — tokenise to `--card` / `--border`. | - Focus: `focus:ring-2 focus:ring-ta-brand-500/20`; help buttons use `focus-visible:ring-primary/40` (violet `--accent-1`) — C5 evidence of two primaries. | - `failedRequests` on this route: `app.

## F07-request-details  routes=['/requests/{id}'] states=['data', 'empty', 'loading', 'error']
 V1 'Timeline-led' sig: Vertical timeline is the spine on the left; status, attachments and actions on the right
 V2 'Dense Ledger' sig: Dense activity ledger table — every change in one row set, numbers-first
 V3 'Stepper Process' sig: Process stepper across New → In review → Waiting on you → Resolved; attachments + request meta beside
 V4 'Minimal Decision' sig: Minimal decision-first: the one question (approve a direction) and two acts; timeline below
 V5 'Action-Led' sig: A hero action band puts the primary CTA (Approve direction) prominent at top; timeline + meta below
 FROZEN: 

## F08-projects-list  routes=['/projects'] states=['populated', 'empty (C14)', 'loading-skeleton', '502-error+retry (A13)']
 V1 'Calm Grid' sig: Cmd-K palette + chips + sort
 V2 'Ops Ledger' sig: aria-sort table w/ mobile card fallback
 V3 'Next-Step Hero' sig: 57 delegated to detail; count-up of frozen engagement count
 V4 'Delivery Story' sig: Kickoff chapter w/ reveal-on-scroll
 V5 'Bento Board' sig: Keyboard tile focus w/ crossfade preview
 FROZEN: 

## F09-project-details  routes=['/projects/{id}', '/projects/{id}?tab=progress', '/projects/{id}?tab=milestones', '/projects/{id}?tab=deliverables', '/projects/{id}?tab=messages', '/projects/{id}?tab=files'] states=['populated (6 tabs)', 'loading-skeleton', '502-error+retry (A13)']
 V1 'Classic Cockpit' sig: Full tablist keyboard + C13 dialog
 V2 'Delivery Journey' sig: Clickable journey steps feed detail line
 V3 'Your Moves' sig: Awaiting-you rail; honest empty queue
 V4 'One Story' sig: A15 digest as the Overview spine
 V5 'Delivery Console' sig: Stat strip + keyboard tab switching
 FROZEN: 

## F10-quotes-list  routes=['/quotes'] states=['populated', 'empty', 'loading', 'error']
 V1 'Unified Quote Triage & Split Inspector' sig: Single unified Search + Status + Sort bar + live right-hand proposal inspector
 V2 'Linear-Grade High-Density Financial Ledger' sig: Single unified filter strip + inline accordion breakdown rows
 V3 'Pending Decision Hero & Proposal Bento Grid' sig: Actionable Sent-quote hero + side-by-side quote comparison modal
 V4 'Status Pipeline Lanes' sig: Lifecycle lane board (Sent -> Accepted -> Declined/Expired) + slide-over detail drawer
 V5 'Executive Proposal Dossier & Financial Analytics Rail' sig: Editorial proposal dossiers + sticky financial commitment rail
 FROZEN: 

## F11-quote-details  routes=['/quotes/{id}'] states=['sent', 'accepted', 'declined', 'expired', 'loading', 'error']
 V1 'Proposal Workbench & Sticky Acceptance Rail' sig: Combined Accept & Pay 50% Deposit (Rs. 20,650.00) flow (A5) + Request changes / counter-propose form (A6)
 V2 'Executive Contract Sheet & Sticky Bottom Decision Bar' sig: Formal contract sheet + sticky bottom decision bar
 V3 '3-Step Guided Acceptance & Deposit Wizard' sig: 3-step guided review, negotiation (A6), and deposit checkout (A5) wizard
 V4 'High-Density Financial Audit & Split Negotiation Console' sig: Line-item selector for targeted revision requests (A6) + instant deposit
 V5 'Bento Proposal Canvas & Embedded Smart Checkout' sig: Side-by-side Smart Checkout (A5) and Counter-Propose (A6) bento tiles
 FROZEN: ---

## F12-messages-home  routes=['/messages', '/messages/inbox', '/messages/new/direct'] states=['merged-3pane', 'overview-18', 'inbox-19', 'new-direct-20', 'empty', 'loading', 'error']
 V1 'Unified Enriched 3-Pane Messaging Workspace' sig: Merges /messages (18), /messages/inbox (19), and /messages/new/direct (20) into one canonical 3-pane workspace (C11)
 V2 'Linear-Grade High-Density Triage Table & KPI Ribbon' sig: Horizontal KPI ribbon + high-density keyboard triage
 V3 'Bento Overview + Split Inbox Stage' sig: Tokenised card surfaces + interactive preview stage
 V4 'Support Command Centre & Channel Hub' sig: Always-visible New message card (20) alongside Conversation queue (19)
 V5 'Adaptive Docked Inbox & Modal New-Direct Flow' sig: Full-height docked 3-pane inbox + modal New message dialog
 FROZEN: ---

## F13-messages-thread  routes=['/messages/thread/01a10a2b-f916-701a-9036-030e679c415c', '/messages/thread/01a10a2b-bc16-7143-86da-6f70b07d91c3'] states=['21-group', '22-members', '23-reply', '24-edit-c10-fixed', '25-direct', 'loading', 'error']
 V1 '3-Pane Collaborative Thread Workbench' sig: C10 high-contrast inline edit fix (15.8:1 AAA) + A7 SLA indicator & read receipts + all 5 captured states (21-25)
 V2 'Linear-Grade High-Density Feed & Split Inspector' sig: Full-width chronological message feed for wide inline editing (C10)
 V3 'Focus Canvas & Context Cards' sig: Spacious conversation canvas + separate Group info and Search context cards
 V4 'Support SLA & Milestone Context Thread' sig: Prominent A7 Response SLA & Read Receipt Hero Bar
 V5 'Docked Split-Screen Messenger' sig: Docked full-height split messenger with floating composer card
 FROZEN: ---

## F14-billing-center  routes=['/payments'] states=['data', 'empty', 'loading', 'error']
 V1 'Settled & Outstanding Ledger' sig: Static 11-row captured ledger with verdict strip, KPI cards, filter chips and deterministic Ask AI
 V2 'Dense Ops Table' sig: Local ARIA tabs with Home/End keys, sortable headers and a live filtered ledger gross
 V3 'Needs-You Work Centre' sig: Work queue leads, ledger supports; explicit what-unlocks-this copy and demo statement dialog
 V4 'Numbers-First Money Wall' sig: Sticky chapter nav with IntersectionObserver scroll-spy over a KPI money wall
 V5 'Bento Billing Desk' sig: Unequal bento tiles for work queue, Ask AI, statement and Razorpay trust above the ledger
 FROZEN: - Eyebrow `BILLING`; H1 **Billing Center**; lead **"Payment history, invoices, and milestone payment tracking."** | - Header links: **Invoices** (`/invoices`), **Payment methods** (`/payments/methods`). | - KPI strip (captured values): **Total paid ₹81,500.00 · Pending ₹31,875.00 · In dispute ₹0.00**. | - Table title **Transaction history**; filter label **Status**; values **All statuses · Pending · Not due yet · Processing · Completed · Failed · Refunded** (screenshot 009 shows `All statuses`; snapshot DOM includes `Pending`). | - Columns **Date · Description · Project · Status · Amount · Actions**; row actions **View** / **Checkout**; `audit-metadata.json` reports `rowCount: 11` with heade

## F15-payment-methods  routes=['/payments/methods'] states=['data', 'empty', 'loading', 'error']
 V1 'Token Wallet Ledger' sig: Tokenised-method ledger with an honest first-use empty state and trust chips
 V2 'Method Rail & Settings' sig: Cards / Mandates tabs with default-first ordering, nicknames and explicit UPI consent copy
 V3 'Card Deck' sig: Selectable payment cards with make-primary, rename and remove surfaced on each card
 V4 'Security-First Split' sig: Security explainer beside the method list; tokens only, no silent recurring debits
 V5 'Empty-State Onboarding' sig: First-use onboarding with a three-step add guide and the captured no-methods empty state
 FROZEN: 

## F16-checkout  routes=['/payments/{id}'] states=['data', 'empty', 'loading', 'error']
 V1 'Split Summary Classic' sig: Persistent order summary, single filled checkout CTA and a quiet bank-transfer path
 V2 'Stepper Rail' sig: Sticky progress rail plus three-step wizard and Idle/Success/Verifying/Failure outcome pills
 V3 'Bento Cash Desk' sig: Amount-first bento with always-visible ₹30,000.00 total and a sticky mobile final CTA
 V4 'Decision-First Dual Path' sig: Two equal decision cards; the chosen path expands into its form
 V5 'Narrative Receipt' sig: 920px reading column telling the payment story before the two ways to pay
 FROZEN: 

## F17-payment-status  routes=['/payments/{id}'] states=['data', 'empty', 'loading', 'error', 'completed', 'not-due']
 V1 'Status Ledger' sig: Exact completed / not-due copy with stepper, document rows and every legal route
 V2 'Milestone Timeline' sig: Vertical milestone timeline from Delivered to Paid showing where checkout unlocks
 V3 'Bento Status Wall' sig: Unequal bento tiles put ₹22,500.00 and terminal status above documents and trust
 V4 'Unlock Workbench' sig: Blocker checklist with F08 deep link and demo-labelled milestone approval endpoint
 V5 'Narrative Receipt' sig: Receipt-style narrative with sticky Download receipt CTA and document accordion
 FROZEN: 

## F18-invoices-archive  routes=['/invoices'] states=['data', 'empty', 'loading', 'error']
 V1 'Dense Invoice Ledger' sig: Search, status filter, sortable columns, three-row pager and live filtered gross
 V2 'Saved-View Rail' sig: Saved views All / Issued / Pending / Overdue with URL state and a demo GST statement
 V3 'Bento Archive' sig: Chapter chips and unequal bento cards grouping five invoices by status
 V4 'Awaiting-You Workbench' sig: Work queue separating studio verification from client payment, overdue rows first
 V5 'Narrative Archive' sig: Three KPIs, three accordions, table powers and a sticky demo Download-all CTA
 FROZEN: 

## F19-notifications-center  routes=['/notifications'] states=['data', 'empty', 'loading', 'error']
 V1 'Calm Entity-Grouped Inbox' sig: Sibling-action entity accordions collapsing 4 Quote + 4 Export alerts with 1-click Undo on Clear
 V2 'Dense Operations Triage Ledger' sig: Multi-select checkbox ledger with sticky bulk mark-read dock and burst-folding toggle
 V3 'Split Triage Reader & Queue' sig: Linear-inspired 2-pane split queue + sticky detail inspector with J/K keyboard stepping
 V4 'Priority Action Lanes & Board' sig: Separates commercial Quote NL-QTE-2026-000018 alerts from system export receipts
 V5 'Guided Catch-Up Digest Stepper' sig: 3-stage Inbox-Zero catch-up walkthrough with chronological timeline and progress sidebar
 FROZEN: - **Shell:** 232px sidebar (`MAIN`: Dashboard, Requests, Projects, Quotes, Messages, Billing, Invoices, **Notifications [active]**; `EXPLORE`: Blog, Portfolio; `ACCOUNT`: Profile, Settings) + 64px header (`Dashboard › Notifications`, `Search ⌘K`, theme toggle, messages icon, bell badge `6`, `AM · Arjun Mehta`). | - **Page header:** | - H1: `Notifications` | - Subtitle: `Stay updated on your projects and account.` | - Top-right actions: `Mark all read` · `Clear read` | - **9 Category Tabs (`role="tablist"`):**

## F20-profile-view-edit  routes=['/profile'] states=['data', 'empty', 'loading', 'error']
 V1 'Calm Editorial Public Card' sig: Editorial collaborator card with View/Edit switch, FileReader avatar preview, and C20 F21 link
 V2 'Live Split Editor & Preview' sig: Form edits on the left update the sticky Public Collaborator Card keystroke-for-keystroke on the right
 V3 'Dense Identity & Schema Ledger' sig: Specification ledger pairing profile attributes with UpdateProfileDto constraints and C20 exposure
 V4 'Modular Bento Inline Workbench' sig: Four modular Bento blocks that flip independently or together into inline edit mode
 V5 'Guided Readiness Stepper' sig: 4-step profile readiness walkthrough with 80%->100% signal checklist and public card review
 FROZEN: 

## F21-settings  routes=['/settings', '/settings/notifications', '/settings/security', '/settings/sessions', '/settings/activity'] states=['data', 'empty', 'loading', 'error']
 V1 'Calm Tabbed Preferences Hub' sig: Horizontal 5-tab hub with 19 single-DOM switches, 3-step SVG QR 2FA, 3-tier sessions, and 50-row C10 log
 V2 'Sticky Left-Rail Control Center' sig: Sticky vertical Settings sub-rail showing live posture pills beside the active settings pane
 V3 'Dense Security & Audit Console' sig: Instant keyword filter across all 5 settings domains, bulk Push enable, and 50-row C10 audit table
 V4 'Posture-First Security Deck' sig: Top 4-card Security & Privacy Posture KPI strip with 1-click jump/remediation triggers
 V5 'Guided Account Hardening' sig: 4-pillar guided account hardening raising score from 60% to 100% as 2FA and device sign-out complete
 FROZEN: - **Shared Settings Header & Nav:** | - H1: `Settings` · Subtitle: `Manage account preferences, security, notifications, files, and activity.` | - 5-item Settings nav: `Account` · `Security` · `Notifications` · `Files` (links to `../../F22-settings-files/V1/index.html`) · `Activity` | - **Section 1 — Account (`36`):** | - Intro: `Privacy, data export, and account deletion. Delivery channels live under Notification settings. Update your public identity from Profile.` | - **Privacy:** `Control who can see your profile and contact details.`

## F22-settings-files  routes=['/settings/files'] states=['data', 'empty', 'loading', 'error']
 V1 'Calm Unified Library & Bundles' sig: Accessible dropzone + shared-array Grid/List cards + 13 collapsible contractual bundles + C13 preview
 V2 'Dense Asset & Contract Ledger' sig: List-first dual tabular ledger with multi-select bulk actions and 26-row contractual PDF audit table
 V3 'Split Drive & Live Preview' sig: 3-pane cloud drive with Source/Type tree, Grid/List canvas, and live inline C13 preview inspector
 V4 'Engagement Dossier Hub' sig: Split Upload + Quota hero deck above uploaded assets and 2-column Bento Engagement Dossier cards
 V5 'Guided Vault Stepper' sig: 3-stage storage workflow separating quota-counted uploads from 26 quota-exempt locked contractual PDFs
 FROZEN: - **Settings Header & 5-Tab Bar:** | - H1: `Settings` · Subtitle: `Manage account preferences, security, notifications, files, and activity.` | - Settings tabs: `Account` · `Security` · `Notifications` (all → `F21`) · **`Files` (active)** · `Activity` (→ `F21`). | - **Files Library Intro & Storage Meter:** | - Intro: `Your files library — uploads, message attachments, project files, and deliveries you can access. Storage quota counts only files you uploaded.` | - Storage indicator: `Storage` · `41.1 KB / 5 GB`