# Nestlancer Client Portal Lab — Family Prompt Pack (23 prompts)

### The old master prompt, split: one AI prompt per page family · each prompt hand-crafts 5 variants of its page · one shared colour scheme

> **What happened to `client-portal-prompt.md`:** it was removed (operator decision, 2026-10-26) and replaced by the 23 prompts in this folder. Every rule, token, gate and coverage requirement of the master prompt lives on here — nothing was relaxed, only re-scoped from "23 families in one run" to "one family per run". The 23 prompts together produce the same **115-template lab** (23 families × 5 variants) the master specified.
>
> **Review provenance:** every family brief was manually verified on 2026-10-26 against the repo's actual captures — the 55 HTML snapshots, the screenshots index, the research report (C1–C20 / A1–A15 / KEEP) and the 17 Swagger specs. Where the report's examples differed from the captured DOM (e.g. the dashboard's "unblock" copy, the pipeline bar labels, the quotes API's `request-changes` endpoint, the expired sign-state capture), the prompts freeze the **captured** content and label the report's figures as illustrations. ADDs without real API endpoints (typing indicators, statements, mandates) are explicitly marked demo-labelled.

## How to use

1. Open the `ui-designing-client-dashboard` repo in your agent (Arena Agent Mode, Cursor, Claude Code).
2. Paste **one** prompt file from this folder (e.g. `F11-quote-details.md`) as the task.
3. The agent studies that family's screenshots + HTML + report + **Swagger**, locks the full UI page requirements, **then** searches online for similar great design templates, prints its gates (**S → R → A → T → 1 → 2a → 2b → 3**), and hand-builds **5 variants** in `client-portal-lab/families/<slug>/V1…V5/`.
4. Repeat with the next prompt — **any order works**; every prompt is standalone. Suggested order: **F03** (establishes the shell + dark + mobile proof) → **F11** (the revenue screen) → **F16** → **F09** → the rest in ID order.

### Auth craft note (F01 / F02)

F01’s first run passed lab gates but missed Nestlancer brand craft (generic SaaS auth). Auth prompts now require studying sibling craft parents before concepts:

- `ui-designing-homepage/homepage-compositor/review/` — Top-5 under `top50/` (via `rank-list.html`)
- `ui-designing-homepage/portfolio-listing-lab/` — `design-01/03/04/10.html`

| Prompt | When to use |
|---|---|
| [`F01-auth-login-FIX.md`](F01-auth-login-FIX.md) | **F01 already built** — surgical craft restyle of `V1…V5` (full logos, one composition, restrained surfaces). Do **not** re-run greenfield F01. |
| [`F01-auth-login.md`](F01-auth-login.md) | Greenfield only if the family folder is missing (historical). Prefer FIX when files exist. |
| [`F02-auth-register-forgot.md`](F02-auth-register-forgot.md) | Greenfield F02 — includes §5.4 craft bar + craft-named roster (Hub Gate → Route & Ribbon). |

Portal tokens stay the locked **blue** §5 scheme; homepage/portfolio teach composition — not a teal recolour.

## The 23 prompts

| Prompt file | Family | Scope | Key fixes / adds |
|---|---|---|---|
| [`F01-auth-login.md`](F01-auth-login.md) · **[`F01-auth-login-FIX.md`](F01-auth-login-FIX.md)** | **F01** · Auth · Login | 1 HTML state · 0 screenshots | Fix C5 · **FIX = Nestlancer craft restyle** |
| [`F02-auth-register-forgot.md`](F02-auth-register-forgot.md) | **F02** · Auth · Register + Forgot Password | 2 HTML states · 0 screenshots | Fix C5 · **§5.4 craft bar (Top-5 / portfolio)** |
| [`F03-dashboard-overview.md`](F03-dashboard-overview.md) | **F03** · Dashboard Overview | 6 HTML states · 4 screenshots | Fix C1, C14, C17, C2, C3 · Add A11, A9 |
| [`F04-global-search-command-palette.md`](F04-global-search-command-palette.md) | **F04** · Global Search / ⌘K Command Palette | 1 HTML state · 1 screenshot | Fix C12 |
| [`F05-requests-work-hub.md`](F05-requests-work-hub.md) | **F05** · Requests Work Hub | 3 HTML states · 2 screenshots | Fix C16 · Add A12 |
| [`F06-request-new-form.md`](F06-request-new-form.md) | **F06** · Request · New Form | 1 HTML state · 1 screenshot | global fixes (C4 C5 C6 C18) |
| [`F07-request-details.md`](F07-request-details.md) | **F07** · Request · Details | 2 HTML states · 1 screenshot | global fixes (C4 C5 C6 C18) |
| [`F08-projects-list.md`](F08-projects-list.md) | **F08** · Projects List | 2 HTML states · 1 screenshot | Add A13 |
| [`F09-project-details.md`](F09-project-details.md) | **F09** · Project Details + 6 Tabs | 7 HTML states · 7 screenshots | Fix C13, C19, C2 · Add A1, A13, A14, A15, A2, A3, A4 |
| [`F10-quotes-list.md`](F10-quotes-list.md) | **F10** · Quotes List | 1 HTML state · 1 screenshot | Fix C16 · Add A12 |
| [`F11-quote-details.md`](F11-quote-details.md) | **F11** · Quote Details (Accept & Sign) | 2 HTML states · 2 screenshots | Fix C2, C7 · Add A1, A8 |
| [`F12-messages-home.md`](F12-messages-home.md) | **F12** · Messages Home (Overview → Inbox) | 3 HTML states · 3 screenshots | Fix C11 |
| [`F13-messages-thread.md`](F13-messages-thread.md) | **F13** · Messages Thread | 5 HTML states · 4 screenshots | global fixes (C4 C5 C6 C18) |
| [`F14-billing-center.md`](F14-billing-center.md) | **F14** · Billing Center | 1 HTML state · 1 screenshot | Fix C16 · Add A1, A10, A12, A5 |
| [`F15-payment-methods.md`](F15-payment-methods.md) | **F15** · Payment Methods | 1 HTML state · 1 screenshot | Add A6 |
| [`F16-checkout.md`](F16-checkout.md) | **F16** · Checkout (Online + Bank/UPI) | 2 HTML states · 2 screenshots | Fix C15, C8 |
| [`F17-payment-status.md`](F17-payment-status.md) | **F17** · Payment Status (Completed + Not-Due) | 2 HTML states · 2 screenshots | Fix C9 · Add A3 |
| [`F18-invoices-archive.md`](F18-invoices-archive.md) | **F18** · Invoices Archive | 1 HTML state · 1 screenshot | Fix C16 · Add A10 |
| [`F19-notifications-center.md`](F19-notifications-center.md) | **F19** · Notifications Center | 1 HTML state · 1 screenshot | Add A7 |
| [`F20-profile-view-edit.md`](F20-profile-view-edit.md) | **F20** · Profile View + Edit | 2 HTML states · 2 screenshots | Fix C20 |
| [`F21-settings.md`](F21-settings.md) | **F21** · Settings (Account / Security / Notifications / Activity) | 4 HTML states · 4 screenshots | Fix C10, C16 |
| [`F22-settings-files.md`](F22-settings-files.md) | **F22** · Settings · Files (Grid / List / Preview) | 3 HTML states · 4 screenshots | Fix C13, C16 |
| [`F23-explore.md`](F23-explore.md) | **F23** · Explore (Blog + Portfolio) | 2 HTML states · 0 screenshots | Fix C5 |

## Shared infrastructure (every prompt maintains it the same way)

- `client-portal-lab/shared/tokens.css` — **ONE locked scheme** (§5 of every prompt, identical CSS). The first family to build creates it; every later run imports it as-is (never edit, never fork).
- `client-portal-lab/shared/base.css` — reset + primitives only, same create-if-missing rule.
- `client-portal-lab/assets/` — one shared logo/icon set; add to it, never fork it.
- `client-portal-lab/index.html` — the gallery; each run adds/replaces only its own family's section.
- `client-portal-lab/manifest.json` — 5 records per family; merge-only, never delete other families' records.
- `client-portal-lab/DECISIONS.md` — one section per family; append/extend only your own.
- Family docs live in `client-portal-lab/families/<slug>/docs/` — `BASELINE-MAP.md` · `REPORT-STUDY.md` · `API-MAP.md` · `TEMPLATE-RESEARCH.md` · `CONCEPTS.md` · `DELIVERY-REPORT.md`.
- **Gate T order (non-negotiable):** understand Swagger + complete UI requirements first → **then** search online for ≥8 similar great design templates. Templates inspire layout/hierarchy/interaction only; they never invent features.
- Preview: `python3 -m http.server 8130` from the repo root → `/client-portal-lab/` (8124–8128 belong to sibling labs).

## The rules that did not change

- **ONE colour scheme across all 115** — the Difference Test runs per family; colour is never the difference.
- **Hand-crafted variants only** — no generator scripts (§1.3 of every prompt).
- **Content lock** — same IA, labels, counts, ₹ figures, microcopy and legal text per family.
- **Coverage:** C-items in 5/5 of each target family; P1 ADDs in 5/5; P2–P3 in ≥3/5 (manifest-recorded).
- **WCAG 2.2 AA**, light + dark, 360–1440 px, keyboard, reduced-motion, honest empty/loading/error states.
- **Do not** push, commit, or branch; **do not** modify the input captures (screenshots, HTML snapshots, reports, Swagger specs, example prompts).
- Features come only from: the current UI (Gate S) + the report's CHANGE/ADD lists (Gate R) + the Swagger specs (Gate A). Nothing invented. Online templates (Gate T) are composition references only.

## Family → input map (quick reference)

- **Screenshots:** `Nestlancer-clients-screenshots/clients/` (45 `.webp`) — each prompt lists its own.
- **HTML snapshots:** `nestlancer-client-pages-html/` (55 files + `audit-metadata.json` + `README.md` map) — each prompt lists its own.
- **Report:** `reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md` + `.xlsx` (10 sheets) — read in full by every prompt.
- **Swagger:** `backend-api-swagger/` (17 specs + `README.md`) — each prompt lists its family's specs.
