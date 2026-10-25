# Nestlancer Client Portal — Downloaded HTML Pages & Audit Metadata

This directory (`/home/user/nestlancer-client-pages-html/`) contains **55 full-DOM HTML snapshots** (with inlined computed CSS stylesheets via `#inlined-playwright-styles`) and `audit-metadata.json` captured using **Playwright (Chromium 156)** on `https://app.nestlancer.com/` using the client account **Arjun Mehta (`arjun.mehta@nestlancer.com`)**.

## File Index (55 HTML Files + Metadata)

| # | HTML File | Route / URL | Page / UI State Captured | Matching Repo Screenshot(s) |
|---|---|---|---|---|
| 1 | `00a-login.html` | `/login` | Client Portal Sign-In Page | — (Auth surface) |
| 2 | `00b-register.html` | `/register` | Client Portal Sign-Up Page | — (Auth surface) |
| 3 | `00c-forgot-password.html` | `/forgot-password` | Password Reset Request Page | — (Auth surface) |
| 4 | `01-dashboard-overview-quotes-tab.html` | `/dashboard` | Dashboard Overview (`Quotes` workbench tab active) | `033-dashboard-quotes-panel.webp` |
| 5 | `02-dashboard-overview-pay-now-tab.html` | `/dashboard` | Dashboard Overview (`Pay now` workbench tab active) | `031-dashboard-pay-now-panel.webp` |
| 6 | `03-dashboard-overview-projects-tab.html` | `/dashboard` | Dashboard Overview (`Projects` workbench tab active) | `032-dashboard-projects-panel.webp` |
| 7 | `04-dashboard-overview-inbox-tab.html` | `/dashboard` | Dashboard Overview (`Inbox` workbench tab active) | `030-dashboard-inbox-panel.webp` |
| 8 | `05-global-search-command-dialog.html` | `/dashboard` (`⌘K`) | Global Search / Command Palette Modal Dialog | `037-global-search-client-dialog.webp` |
| 9 | `06-dashboard-dark-mode.html` | `/dashboard` (`.dark`) | Dashboard Overview in Dark Mode | — (Live dark theme check) |
| 10 | `07-requests-work-hub-list.html` | `/requests` | Work Hub — `Requests` Tab List View | `023-requests.webp` |
| 11 | `08-requests-work-hub-all-tab.html` | `/requests?view=all` | Work Hub — `All` Items Tab View | `023-requests.webp` |
| 12 | `09-requests-work-hub-projects-tab.html` | `/requests?view=projects` | Work Hub — `Projects` Tab View | `045-requests-projects-view.webp` |
| 13 | `10-requests-new-form.html` | `/requests/new` | New Service Request Intake Form | `041-new-request-form.webp` |
| 14 | `11-request-details-converted.html` | `/requests/01a10a2b-52c4-7483-a920-455246fe10ec` | Request Details (`Converted To Project` / Accepted Quote) | `024-requests-details.webp` |
| 15 | `12-request-details-quoted.html` | `/requests/01a10f84-31f1-75a6-aeb1-cbe61a191581` | Request Details (`Quoted` / Awaiting Decision) | `024-requests-details.webp` |
| 16 | `13-projects-list.html` | `/projects` | Projects List (Live 502 Error State: `Could not load projects`) | `014-projects.webp` |
| 17 | `13b-projects-list-populated.html` | `/projects` | Projects List (Populated DOM via Playwright Route Fulfill) | `014-projects.webp` |
| 18 | `14-project-details.html` | `/projects/01a10a2b-5eaa-769e-a5d9-0d58fcca6924` | Project Details (Live 502 Error Boundary State) | `015-projects-details.webp` |
| 19 | `14b-project-details-overview-tab.html` | `/projects/01a10a2b-5eaa-769e-a5d9-0d58fcca6924` | Project Details — `Overview` Tab (Populated DOM) | `015-projects-details.webp` |
| 20 | `14c-project-details-progress-tab.html` | `/projects/...?tab=progress` | Project Details — `Progress` Tab (Populated DOM) | `020-projects-details-progress.webp` |
| 21 | `14d-project-details-milestones-tab.html` | `/projects/...?tab=milestones` | Project Details — `Milestones` Tab (Populated DOM) | `019-projects-details-milestones.webp` |
| 22 | `14e-project-details-deliverables-tab.html` | `/projects/...?tab=deliverables` | Project Details — `Deliverables` Tab (Populated DOM) | `016-projects-details-deliverables.webp` |
| 23 | `14f-project-details-messages-tab.html` | `/projects/...?tab=messages` | Project Details — `Messages` Tab (Populated DOM) | `018-projects-details-messages.webp` |
| 24 | `14g-project-details-files-tab.html` | `/projects/...?tab=files` | Project Details — `Files` Tab (Populated DOM) | `017-projects-details-files.webp`, `043-project-files-document-preview-dialog.webp` |
| 25 | `15-quotes-list.html` | `/quotes` | Quotes List & Summary KPIs | `021-quotes.webp` |
| 26 | `16-quote-details-awaiting-acceptance.html` | `/quotes/01a10f80-3144-755f-a145-b48ad8a72557` | Quote Details — `Viewed` (Awaiting Acceptance & E-Signature) | `044-quote-awaiting-acceptance-and-signature.webp` |
| 27 | `17-quote-details-accepted.html` | `/quotes/01a10a2b-5c32-72e7-99ac-ba6c1c58b2ad` | Quote Details — `Accepted` (Signed Service Agreement) | `022-quotes-details.webp` |
| 28 | `18-messages-overview.html` | `/messages` | Messages Overview Landing Page | `004-messages.webp` |
| 29 | `19-messages-inbox-panel.html` | `/messages/inbox` | Messaging Panel (Split-Pane Inbox, Empty Selection) | `005-messages-inbox.webp` |
| 30 | `20-messages-new-direct.html` | `/messages/new/direct` | New Direct Message to Support | `006-messages-new-direct.webp` |
| 31 | `21-messages-thread-group.html` | `/messages/thread/01a10a2b-f916-701a-9036-030e679c415c` | Group Conversation Thread Details | `007-messages-thread-details.webp` |
| 32 | `22-messages-thread-group-members-panel.html` | `/messages/thread/...` (Members open) | Group Conversation with Group Info & Members Right Rail | `039-messages-group-members-panel.webp` |
| 33 | `23-messages-thread-reply-composer.html` | `/messages/thread/...` (Reply active) | Group Conversation with `Replying to...` Banner Active | `040-messages-reply-composer.webp` |
| 34 | `24-messages-thread-edit-message-state.html` | `/messages/thread/...` (Edit active) | Group Conversation with Inline Edit Message Form Active | `038-messages-edit-message-form.webp` |
| 35 | `25-messages-thread-direct.html` | `/messages/thread/01a10a2b-bc16-7143-86da-6f70b07d91c3` | Direct Support Conversation Thread Details | `007-messages-thread-details.webp` |
| 36 | `26-billing-payments-center.html` | `/payments` | Billing Center (KPIs + Transaction History Table) | `009-payments.webp` |
| 37 | `27-billing-payment-methods.html` | `/payments/methods` | Saved Payment Methods Page | `011-payments-methods.webp` |
| 38 | `28-payment-details-pending-online.html` | `/payments/01a10a2b-5ed2-73bc-8aee-d1c6262906e9` | Checkout Page (`Pending` — Pay Online via Razorpay) | `010-payments-details.webp` |
| 39 | `29-payment-details-bank-upi-transfer.html` | `/payments/...` (`Bank / UPI transfer` tab) | Checkout Page (`Pending` — Bank / UPI Transfer + UTR Upload) | `042-payment-details-bank-and-upi-transfer.webp` |
| 40 | `30-payment-details-completed.html` | `/payments/01a10a2b-5ed2-73bc-8aee-cf61167d4900` | Payment Details (`Completed` Deposit with Receipt/Invoice) | `001-payment-details-completed-payment.webp` |
| 41 | `31-payment-details-not-due-yet.html` | `/payments/01a10a2b-5ed2-73bc-8aee-d4cdcbb6e6d6` | Payment Details (`Not due yet` Future Milestone Installment) | `002-payment-details-not-due-yet.webp` |
| 42 | `32-invoices-archive.html` | `/invoices` | Invoices Archive Table | `003-invoices.webp` |
| 43 | `33-notifications-center.html` | `/notifications` | Notifications Center (9 Category Tabs) | `008-notifications.webp` |
| 44 | `34-profile-view.html` | `/profile` | Client Profile Page | `012-profile.webp` |
| 45 | `35-profile-edit.html` | `/profile/edit` | Edit Profile Form | `013-profile-edit.webp` |
| 46 | `36-settings-account.html` | `/settings/account` | Settings — Account (Privacy Toggles, Data Export, Delete Account) | `025-settings-account.webp` |
| 47 | `37-settings-security.html` | `/settings/security` | Settings — Security (Password, 2FA, Active Sessions) | `029-settings-security.webp` |
| 48 | `38-settings-notifications.html` | `/settings/notifications` | Settings — Notifications (Channels, Quiet Hours, Matrix) | `028-settings-notifications.webp` |
| 49 | `39-settings-files-grid-view.html` | `/settings/files` | Settings — Files Library (Grid View + Generated Documents) | `027-settings-files.webp`, `035-files-file-actions-menu.webp` |
| 50 | `40-settings-files-list-view.html` | `/settings/files` (List View) | Settings — Files Library (List View) | `036-files-list-view.webp` |
| 51 | `41-settings-files-preview-dialog.html` | `/settings/files` (Preview Modal) | Settings — Files Archive/Document Preview Dialog | `034-files-archive-preview-dialog.webp` |
| 52 | `42-settings-activity.html` | `/settings/activity` | Settings — Account Activity Audit Log | `026-settings-activity.webp` |
| 53 | `43-explore-blog.html` | `/blog` | Sidebar Explore — Public Blog Index | — (Public route linked in sidebar) |
| 54 | `44-explore-portfolio.html` | `/portfolio` | Sidebar Explore — Public Portfolio Index | — (Public route linked in sidebar) |
| 55 | `45-dashboard-mobile-viewport.html` | `/dashboard` (`375×812`) | Dashboard Mobile Responsive Viewport Snapshot | — (Mobile responsiveness check) |
