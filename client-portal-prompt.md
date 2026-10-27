# Nestlancer Client Portal Lab — Master AI Agent Prompt (v1)
### Study screenshots + HTML + reports + Swagger → understand full UI requirements → search similar great design templates → hand-craft 5 upgraded designs per page · one shared colour scheme

> Paste this whole file into an agent (Arena Agent Mode, Cursor, Claude Code) with the **`ui-designing-client-dashboard`** repo open as the working directory.
>
> **What this prompt does:** it turns the current client portal (45 screenshots + 55 HTML snapshots + research report + 17 Swagger specs) into a **redesigned, corrected, upgraded template lab** — **5 different designs for every page family, all sharing ONE colour scheme / design-token system**.
>
> **Style parent:** `example-demo-prompt/example.homepage-prompt.md` (gates + phases) and `example-demo-prompt/example.portfolio-listing-prompt.md` (**hand-crafted only, no generators**). This file follows the same rigor: **gates → concepts → manual build → verify**. Read those two files first to understand the expected discipline — but **this file is the task**.
>
> **Do not push, commit, create or switch a branch.**

---

## 1. YOUR ROLE

You are, at the same time:

1. **A product archaeologist.** You reconstruct the *current* portal exactly as it is from screenshots + HTML + audit metadata before changing a single pixel.
2. **A research analyst.** You study the UI research report (`.md` + `.xlsx`, all 10 sheets) and can quote every Finding, CHANGE (C1–C20), ADD (A1–A15) and KEEP item from memory.
3. **An API analyst.** You read all 17 OpenAPI specs (Swagger) and know which UI element maps to which endpoint, field, enum and error state.
4. **A design-template researcher.** After Swagger + each family's complete UI requirements are locked, you search online for similar great design templates / live products and extract layout/hierarchy/interaction patterns (never invent features from them).
5. **A senior UI designer + art director.** Each of the 5 variants per page is a *different design idea* — not 5 recolours. Same tokens, different thinking.
6. **A front-end craftsperson.** Self-contained HTML + CSS + small purposeful JS. Offline, accessible, responsive, no CDN.
7. **A harsh design critic.** You reject generic admin templates, invented features, broken links, colour-only status, and any page that does not fix the report's findings.

---

## 2. THE MISSION (read twice)

| Stage | Input | Output |
|---|---|---|
| **0 · Baseline lock** | 45 screenshots + 55 HTML + `audit-metadata.json` | Screenshot↔HTML map confirmed, content frozen per page |
| **1 · Reports study** | `.md` report + `.xlsx` (10 sheets) | `docs/REPORT-STUDY.md` — findings, C1–C20, A1–A15, KEEP, roadmap, checklist quoted |
| **2 · API study** | 17 `backend-api-swagger/*.openapi.json` (Swagger) | `docs/API-MAP.md` — every page → endpoints → fields → states |
| **3 · Online template research** | **AFTER** full UI requirements + Gate A Swagger map | `docs/TEMPLATE-RESEARCH.md` — ≥8 similar great design templates per family (or one lab-wide doc with per-family sections) |
| **4 · Concepts** | stages 0–3 | `docs/CONCEPTS.md` — 5 concept cards per page family, printed **before** code |
| **5 · Build (MANUAL)** | concepts | `client-portal-lab/families/F##-*/V#/index.html` — **5 hand-built variants per family** |
| **6 · Verify** | all variants @ 1440 + 390, light + dark | `docs/DELIVERY-REPORT.md` + gallery + manifest |

### The two most important rules in this file

**Rule 1 — SAME colour scheme, DIFFERENT designs.**
All variants across all families share **ONE locked token file** (§5). A variant that introduces a new brand hue, a new status colour, or a second button style **fails**. Difference must come from *layout geometry, hierarchy, density, navigation pattern, proof/data presentation, and interaction* — never from colour. See the Difference Test (§8.2).

**Rule 2 — HAND-CRAFTED ONLY. NO GENERATOR SCRIPTS.**
You write every variant's HTML/CSS/JS **manually, one by one, by eye** — exactly like the approved `example.portfolio-listing-prompt.md` §1.3 rule. Any script that *creates or overwrites* variant HTML/CSS is forbidden. See §1.3 below. This is non-negotiable.

**Build narrow, study wide.** 45 screenshots + 55 HTML + 2 report files + 17 specs → lock UI requirements → search similar great design templates online → one coherent lab out. Never stub "same as V1 with different colour". Never invent portal features that are neither in the current UI nor in the report's ADD list nor in the Swagger specs (templates never add features).

---

## 1.3 Manual craft rule — no generators (non-negotiable)

Design and code each variant **manually**: open the files, write/adjust markup and CSS, tune spacing and states by eye.

| Allowed | Forbidden |
|---|---|
| Hand-writing / hand-editing each `client-portal-lab/families/F##-*/V#/index.html` (and its CSS/JS) | Any script that **creates or overwrites** variant HTML/CSS (`node`, `python`, `*.mjs`, `*.cjs`, shell loops, Make/npm tasks that emit pages) |
| Copying **one** of your own hand-built variants once as a starting skeleton for the next variant, then **manually** redesigning it into a distinct design | "Generate all 5 variants from one template string / JSON / config" |
| Small **in-page** JS per variant for tabs, dialogs, theme, command palette, filters (like the prototype pattern) | A repo `tools/generate-*.mjs`, compositor, or factory that stamps out variants |
| Running **existing** repo auditors after the fact for QA only (link check, contrast) | Writing a new generator under `client-portal-lab/tools/` that builds designs |
| Hand-maintained `manifest.json` / gallery `index.html` | Auto-scaffolding that produces near-identical skins in a loop |

**Why:** mass-generated pages look samey and miss the craft. Distinctness must come from intentional design edits per variant, not from a parameter loop.

State in `client-portal-lab/DECISIONS.md`: "All portal variants were hand-authored; no design-generation script was used."

---

## 3. READ FIRST — in this order, before any design

1. **This prompt end-to-end.** Then `example-demo-prompt/example.homepage-prompt.md` and `example-demo-prompt/example.portfolio-listing-prompt.md` (discipline reference only — not the task).
2. **`Nestlancer-clients-screenshots/clients/*.webp` (45 files).** Open every screenshot. Study each page top-to-bottom: header, sidebar, KPIs, tables, cards, CTAs, empty/error states.
3. **`nestlancer-client-pages-html/README.md`** — the file ↔ URL ↔ screenshot map. Then open the **55 HTML snapshots** in `nestlancer-client-pages-html/` + **`audit-metadata.json`** (headings, buttons, inputs, tokens, failed requests, console errors).
4. **`reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md`** — read in full (§1 executive findings → §7 roadmap + acceptance checklist → §8 sources).
5. **`reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx`** — open **all 10 sheets**: `1. Executive Findings · 2. Design Tokens · 3. Page Inventory · 4. Benchmark Patterns · 5. CHANGE list · 6. ADD list · 7. KEEP list · 8. Roadmap · 9. Acceptance checklist · 10. Sources`. If `.md` and `.xlsx` disagree, the `.md` wins — record the difference in `docs/REPORT-STUDY.md`.
6. **`backend-api-swagger/README.md`** + all **17 `*.openapi.json` specs** + `docs.html` (Swagger shell). Map every UI surface to its real endpoints (§7 / Gate A).
7. **Online design-template research (Gate T) — only after Swagger + complete UI requirements.** Do **not** search templates first. First understand every family's full UI page requirements (§4 + Gates S/R) and finish the Swagger map (Gate A). Then search the open web for **similar great design templates** / live products per page job; open ≥8 refs per family (or a strong shared set with per-family mapping); write `docs/TEMPLATE-RESEARCH.md`. Steal layout/hierarchy/interaction only — never brand colours, never invent features without Gate-A endpoints / Gate-R ADDs.
8. `git status` — never overwrite uncommitted changes. **Touch only:** `client-portal-lab/`, `docs/` (your study docs + template research + concepts + delivery report). Never edit screenshots, HTML snapshots, reports, or Swagger specs.

---

## 4. PAGE FAMILIES — the canonical inventory (23 families → 115 templates)

The 45 screenshots and 55 HTML states collapse into **23 page families**. Each family gets **exactly 5 variants (V1–V5)**. Each variant must cover **all states/tabs of its family** (tabs switch in-page; auth pages are separate families).

> Counts: 23 families × 5 variants = **115 templates**. No more, no fewer. No "bonus" pages.

| Family | Name | HTML states in scope | Screenshots in scope | Must include |
|---|---|---|---|---|
| **F01** | Auth – Login | `00a-login.html` | — (auth surface) | Split layout, form, validation, hero panel, operator link |
| **F02** | Auth – Register + Forgot | `00b-register.html`, `00c-forgot-password.html` | — | 7-field signup + terms, 1-field reset, "what happens next" |
| **F03** | Dashboard Overview | `01,02,03,04` (4 workbench tabs), `06` dark, `45` mobile | `030,031,032,033` | Verdict line, 1 hero + 4 secondary KPIs, labelled pipeline, Awaiting-you action centre, 4 tabs, dark + 375px |
| **F04** | Global Search / ⌘K | `05-global-search-command-dialog.html` | `037` | Palette overlay with ONLY real actions (fix: remove "New project", "New direct message"), keyboard nav |
| **F05** | Requests Work Hub | `07,08,09` + `045` projects-view | `023,045` | KPIs, 3 tabs, status filter, search, list, pagination, populated + empty + 502 error states |
| **F06** | Request – New Form | `10-requests-new-form.html` | `041` | Brief/Budget/Timeline sections, 10 inputs, tooltips, sticky footer + ADD: attachment at creation, budget guide |
| **F07** | Request Details | `11-converted`, `12-quoted` | `024` | Details, chips, attachments, 9-stage status timeline, linked quote, actions |
| **F08** | Projects List | `13` (502 error), `13b` populated | `014` | Error card w/ retry + support, populated grid (icon tile, badge, dates), empty state |
| **F09** | Project Details + 6 tabs | `14,14b–14g` (overview/progress/milestones/deliverables/messages/files) | `015,016,017,018,019,020,043` | Header + %, 6 tabs, status cards, feeds, milestone timeline w/ locks, deliverable approve/**reject-revision (ADD)**, messages, files, preview dialog |
| **F10** | Quotes List | `15-quotes-list.html` | `021` | 4 KPIs, status filter, rows, pagination + ADD: expiry countdown |
| **F11** | Quote Details (awaiting + accepted) | `16-awaiting`, `17-accepted` | `022,044` | Line items, payment schedule, documents, **3-step accept-&-sign (C7)**, T&C readable, service agreement, open-project |
| **F12** | Messages Home (overview + inbox + new) | `18,19,20` | `004,005,006` | Merged entry (C11: overview renders inbox), 3-pane shell, filters, snapshot rail, new-direct honesty note |
| **F13** | Messages Thread (group/direct + states) | `21,22,23,24,25` | `007,038,039,040` | Bubbles, quick replies, mentions, attachments, composer, members rail, reply banner, inline edit + ADD: read receipts, typing, SLA |
| **F14** | Billing Center | `26-billing-payments-center.html` | `009` | Ledger + work queue rebuild (C-§6.1): settled vs outstanding, transaction table w/ search/filter/sort/pagination |
| **F15** | Payment Methods | `27-billing-payment-methods.html` | `011` | Empty state + ADD: saved card / UPI mandate management |
| **F16** | Checkout (online + bank/UPI) | `28-pending-online`, `29-bank-upi` | `010,042` | ONE primary CTA (C8), order summary, hero ₹ amount, stepper, styled dropzone (C15, no native file input) |
| **F17** | Payment Status (completed + not-due) | `30-completed`, `31-not-due-yet.html` | `001,002` | Receipt/invoice, dispute link, "what unlocks this" deep link to milestone (C9) |
| **F18** | Invoices Archive | `32-invoices-archive.html` | `003` | Table + ADD: search, filter, pagination, date, total row, GST statement download (A10) |
| **F19** | Notifications Center | `33-notifications-center.html` | `008` | 9 tabs, grouping by entity + deep links, bulk actions, date groups (fix 57-flat-rows) |
| **F20** | Profile View + Edit | `34-view`, `35-edit` | `012,013` | Avatar, headline, bio, skill chips→autocomplete (C-fix), visibility honesty, sticky save |
| **F21** | Settings (account/security/notifications/activity) | `36,37,38,42` | `025,026,028,029` | Privacy + danger zone, password/2FA/sessions, 18-switch matrix + quiet hours, **rebuilt activity: grouped + filtered + paginated (C10)** |
| **F22** | Settings Files (grid/list/preview) | `39,40,41` | `027,034,035,036` | Dropzone, type chips, source tabs, search, grid/list toggle, grouped generated docs, **real preview content (C13)**, no blank modal |
| **F23** | Explore (Blog + Portfolio) | `43,44` | — (public) | Editorial cards in portal brand voice (no third style) |

**Cross-cutting states (every family):** light + dark theme, 375px mobile card-fallback for tables, empty state, loading skeleton, error state w/ retry. `F03` additionally owns the dark-mode and mobile proof for the shell.

---

## 5. BRAND SYSTEM — locked (ONE scheme for all 115 templates)

### 5.1 The consolidation decision (from report §3.2 + C5)

The live app ships **three palettes** (portal blue `--ta-brand-*`, violet `--accent-1`, auth teal). The lab ships **ONE**:

- **Brand = `--ta-brand-*` blue ramp** becomes *the* `--primary`. Violet `--accent-1` is **deleted** except as focus-ring token if needed (document it).
- **Auth pages (F01–F02) use the same blue** — the teal-login-door discrepancy is fixed, not preserved.
- **Status hues keep their hue** but text uses **darkened AA-safe text variants** (C4). Badges = icon + colour + text (never colour alone).

### 5.2 Tokens (no new hues — all 115 templates `@import` the same file)

```css
:root{
  /* Neutrals (shadcn-style, from live app — AA-passing) */
  --background:#f6f8fb; --card:#ffffff; --muted:#f1f5f9; --border:#dbe3ec;
  --foreground:#0f1c2e; --muted-foreground:#45556b;
  /* Brand — single ramp (live --ta-brand-*) */
  --brand-50:#ecf3ff; --brand-100:#d9e6ff; --brand-500:#465fff;
  --brand-600:#3641f5; --brand-700:#2a31d8; --brand-950:#161950;
  --primary:var(--brand-500); --primary-hover:var(--brand-600);
  --ring:var(--brand-500);
  /* Status — bg tint + darkened AA text + border (FIX C4) */
  --status-success-bg:#e5f6ec; --status-success-text:#166534; --status-success-border:#86c9a3;
  --status-warning-bg:#fdf3e0; --status-warning-text:#8a5a00; --status-warning-border:#e8c477;
  --status-error-bg:#fdecec;   --status-error-text:#b42318;   --status-error-border:#f0a8a0;
  --status-info-bg:#e6f4fd;    --status-info-text:#0c5d8a;    --status-info-border:#8fcbe8;
  --status-purple-bg:#f1e8fd;  --status-purple-text:#5b21b6;  --status-purple-border:#c4a8ef;
  /* Shape + type */
  --radius-sm:6px; --radius-md:10px; --radius-lg:14px; --radius-xl:20px;
  --shadow-xs:0 1px 2px rgba(15,28,46,.06); --shadow-sm:0 4px 14px rgba(15,28,46,.08);
  --font:"Outfit",system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  --mono:ui-monospace,"IBM Plex Mono","SF Mono",Menlo,Consolas,monospace;
  --sidebar:232px; --header:64px; --content:1400px;
}
.dark{
  --background:#0b1220; --card:#111b2e; --muted:#16233a; --border:#24344f;
  --foreground:#e8eef4; --muted-foreground:#9fb0c3;
  --brand-500:#5b7bff; --primary:var(--brand-500);
  --status-success-text:#4ade80; --status-warning-text:#fbbf24;
  --status-error-text:#f87171; --status-info-text:#38bdf8; --status-purple-text:#c084fc;
  /* status BGs in dark: 12–16% tint of the hue over --card — compute per variant, same formula */
  --shadow-xs:0 1px 2px rgba(0,0,0,.4); --shadow-sm:0 8px 28px rgba(0,0,0,.45);
}
```

- Type scale: H1 display **32–40px** (C18 — portal must feel premium, not 24px-internal-tool) · H2 20–24 · card title 16–18 · body 14–16 · meta 12 · micro 11 (never below 11). Money hero: 32–40px `tabular-nums tracking-tight`, cents in lighter weight. Mono for IDs/references/timestamps (report §3.2 gap).
- Icons: one inline SVG set (Lucide-style, 24×24, `stroke-width=2`), `aria-hidden`. No emoji, no icon font, no CDN.
- Motion tokens: `--duration-fast:150ms; --duration-normal:280ms; --duration-slow:500ms` + spring ease. Animate `transform`/`opacity` only (one SVG `stroke-dashoffset` exception for steppers/timelines).
- Hard bans: second brand hue · purple/neon decoration · Bootstrap/Tailwind CDN · external requests · `bg-white` / `gray-200/80` raw card classes (use `--card`/`--border` — C6) · gradient soup · glass over dense text.

### 5.3 Content lock (same story, upgraded hierarchy)

Every variant keeps the **same IA, labels, counts, ₹ figures, microcopy and legal text** found in its screenshots + HTML (verify field-by-field at Gate S). What changes is *hierarchy, restraint, accessibility* per the report — e.g. dashboard gets a verdict sentence + hero action (C1–C2), quote sign becomes 3 steps (C7), checkout has one primary CTA (C8). **Never** rewrite the H1 story, invent clients/numbers, drop Razorpay trust strips, or remove the "not available" honesty notes. KEEP list (§6.3 of report) must survive in every variant.

---

## 6. GATES — do them in order, print each gate block, stop on FAIL

### Gate S — Screenshot + HTML baseline (before anything else)

1. Open all 45 `.webp` + all 55 `.html` + `audit-metadata.json`.
2. Build the map: for each family F01–F23 list: routes, HTML files, screenshots, H1/H2s, buttons, inputs, tables, tokens observed, failed requests / console errors (note the live **`/api/v1/projects` 502 + CORS** — F08/F09 must design the error state honestly).
3. Freeze per-family content truth (labels, figures, copy). Anything unverifiable = **not verified**, never invented.
4. Write `docs/BASELINE-MAP.md` (the 23-row map) — this is part of Gate S output.

```
## GATE S
Screenshots opened: 45/45 · HTML opened: 55/55 · audit-metadata read: YES
Families mapped: 23/23 · Content frozen: YES · 502 noted on F08/F09: YES
Gate: PASS / FAIL
```

### Gate R — Reports study (the redesign brief)

1. Read the `.md` report cover-to-cover; open all 10 `.xlsx` sheets.
2. Write `docs/REPORT-STUDY.md` containing: all 13 Executive Findings quoted · full token table · page inventory notes · benchmark patterns you will apply (cite which of the 13 sources) · **C1–C20 with target family per item** · **A1–A15 with priority + target family** · KEEP list · roadmap P0–P7 · acceptance checklist copied as your QA list.

```
## GATE R
MD read: YES · XLSX sheets: 10/10 · C1-C20 mapped: 20/20 · A1-A15 mapped: 15/15
KEEP listed: YES · Checklist copied: YES
Gate: PASS / FAIL
```

### Gate A — Swagger / API study (features must be REAL)

1. Read all 17 specs: `admin, auth, blog, contact, gateway, health, media, messaging, notifications, payments, portfolio, progress, projects, quotes, requests, users, webhooks` (~560 paths total — see `backend-api-swagger/README.md`).
2. Write `docs/API-MAP.md`: for **each family F01–F23**, table of: UI element → method + path → key request/response fields + enums → loading/empty/error/success states you will design. Call out: auth flows, 2FA, sessions, request lifecycle, quote accept/decline/negotiate + e-sign, project/milestone/deliverable/progress/timeline gates, messaging threads/members/attachments, payments Razorpay + bank/UPI + UTR + disputes, invoices, notifications prefs + quiet hours, media upload/preview, users/profile, portfolio/blog read models, webhooks (Razorpay) where user-visible.
3. Every CTA in every variant must resolve to a real endpoint from this map or be explicitly labelled a **demo affordance** in `DECISIONS.md`. No dead buttons, no `href="#"`.

```
## GATE A
Specs read: 17/17 · Families mapped: 23/23 · Demo-only CTAs listed: <n>
Gate: PASS / FAIL
```

### Gate T — Online design-template research (AFTER Swagger + full UI requirements)

**Order is mandatory — never reverse it:** Gates **S** + **R** + **A** must PASS and you must be able to state each family's complete UI requirements before searching.

1. Search the open web for similar **great design templates** and live products that solve each family's *page job* (client portals, agency work hubs, SaaS request/project/quote/billing/inbox/checkout/settings screens).
2. Open and study **≥8** strong references per family (or a lab-wide pool of ≥8 with an explicit per-family pattern map). Cite URL + pattern stolen (layout/hierarchy/density/interaction — never brand colours).
3. Cross-check every pattern against Gate A: no endpoint and not a Gate-R ADD → inspiration-only or drop — **do not invent features**.
4. Write `docs/TEMPLATE-RESEARCH.md`: queries · refs table · patterns → V1–V5 axes per family · "No features invented from templates."

```
## GATE T
Families researched: 23/23 · Refs opened: ≥8/family (or shared pool mapped) · TEMPLATE-RESEARCH.md written: YES
No invented API features: YES · Order S→R→A→T respected: YES
Gate: PASS / FAIL
```

Do not draw a single concept until S + R + A + T all PASS.

---

## 7. WHAT TO CHANGE / ADD / KEEP (bound to the report — not your invention)

- **CHANGE (C1–C20):** implement every item in its target family/families, in **all 5 variants** of those families. The fix may *look* different per variant but must be *present* in each (e.g. C4 badge contrast, C5 one brand, C6 tokenised cards, C7 quote 3-step, C8 one checkout CTA, C10 grouped activity, C11 merged messages, C12 fixed palette, C13 real file preview).
- **ADD (A1–A15):** P1 items (A1 ask-AI, A2 help hub, A3 unlock explainer, A4 reject/revision) are **mandatory in all 5 variants** of their families. P2–P3 items mandatory in **≥3 of 5 variants** per family — record coverage in `manifest.json`.
- **KEEP:** the status-history timeline, milestone stepper, Awaiting-you pattern (now **reused** on milestones/quotes/invoices, not dashboard-only), 3-pane messaging, Razorpay strips, honesty microcopy, ⌘K, shadcn tokens — present in every variant.
- **P0 note:** the projects 502 is a backend defect; your F08/F09 variants design the *correct* populated UI **plus** an honest degraded/error state with retry + support CTA + system-status banner (A13).

---

## 8. PHASE 2 — CONCEPTS: 5 per family (print ALL before code)

### 8.1 Concept Card template (115 cards in `docs/CONCEPTS.md`)

```
F11 · Quote Details · V3 "Sign in Three Breaths"
Keeps (Gate S content): line items ×<n> · schedule ×<n> · docs · T&C 10 clauses · agreement no. · CTAs
Fixes/Adds: C7 (3-step sign) · A1 (ask-AI on quote) · C4 badges
Differs on axes: A(layout) + C(narrative) + E(motion) — see §8.2
Layout sketch: [ASCII: hero numbers → sticky 3-step rail → sign dock]
Signature interaction: step rail scroll-spy + sign-drawer focus trap
API basis: POST /quotes/{id}/accept · decline · negotiate (docs/API-MAP.md §F11)
Shell: sidebar-232 + header-64 · Dark + 375px notes: …
Risk: T&C length on 375px → collapsible with 3 key clauses pinned
```

### 8.2 Difference Test (multi-axis — colour is NOT an axis)

Each variant must differ from its **4 siblings** on **≥3 of 5 axes**, one of which must be A or C:

| Axis | Options (examples) |
|---|---|
| **A · Layout geometry** | single-column ledger · 2-col with sticky rail · 3-pane · card grid · timeline-led · split hero+workbench |
| **B · Information hierarchy** | verdict-first · numbers-first · action-first · narrative-first · queue-first |
| **C · Page narrative** | static sections · stepper/progress-linked · tab-led · queue-led · chapter-sticky · accordion |
| **D · Density & surface** | airy minimal · dense ops-table · bento · ledger/print · editorial rules (same tokens!) |
| **E · Interaction family (JS)** | scroll-spy · command-palette-first · crossfade preview · count-up · drawer/overlay · filter-chips · timeline-draw · sticky-CTA |

Recolouring, re-radiusing or re-shadowing alone is **not** a difference. Neighbouring variants must not share the same A+C combination. Coverage per family of 5: ≥1 minimal · ≥1 dense · ≥1 action/queue-led · ≥1 narrative/stepper-led · (F03/F09/F11/F14/F16:) ≥1 motion-signature-led.

### 8.3 Roster guidance (adapt freely — keep 5 per family)

| Family | Suggested 5 aspects (same tokens) |
|---|---|
| F03 Dashboard | Ground-truth fix · Verdict-hero · Queue-first action centre · Health-grid (Signal-style) · Dense ops |
| F09 Project details | Tab classic · Stepper journey · Queue + unlock rail · Feed story · Dense delivery console |
| F11 Quote details | 3-step classic · Numbers-first ledger · Negotiation-led · Trust/assurance-led · Compact sign-dock |
| F16 Checkout | Single-CTA classic · Ledger + trust · UPI-first (India) · Assurance-heavy · Minimal express |
| Others | minimal · dense · queue/action-led · narrative/stepper-led · bento/ledger |

Rename freely — still **5 per family**, still locked content + tokens.

---

## 9. PHASE 3 — BUILD (manual, one by one)

### 9.1 Output layout

```
client-portal-lab/
  index.html                  ← gallery: 23 families × 5, filterable, compare mode
  assets/                     ← ONE shared logo/icon set (inline SVG preferred), no per-variant copies
  shared/
    tokens.css                ← §5 tokens ONLY (the single scheme — every variant imports this)
    base.css                  ← reset + primitives ONLY (no family layouts here)
  families/
    F01-auth-login/V1/index.html … V5/index.html
    F02-auth-register-forgot/V1/… V5/
    … F23-explore/V1/… V5/
  manifest.json               ← 115 records: id, family, axes, C/A coverage, API refs, verification
  audit.json                  ← machine-readable QA per variant
  DECISIONS.md                ← hand-authorship attestation + demo-CTA list + A-item coverage
docs/
  BASELINE-MAP.md · REPORT-STUDY.md · API-MAP.md · CONCEPTS.md · DELIVERY-REPORT.md
index.html                    ← redirect → client-portal-lab/ (repo root, optional)
```

- `shared/` holds **only** tokens + reset/primitives. Each variant carries its **own hand-written** layout CSS (inline or `style.css` beside `index.html`). Never one megatemplate scoped 115 times with dead rules.
- Every variant renders standalone over relative paths, links back to the gallery, and has prev/next navigation within its family.
- Preview: `python3 -m http.server 8130` from repo root → `/client-portal-lab/` (use a fresh port; 8124–8128 belong to sibling labs).

### 9.2 Craft rules

- Each variant: `<!DOCTYPE html>`, imports `tokens.css`, only the CSS it uses, full page markup, **small JS for its real interactions** (tabs, dialogs, filters, palette, drawers, theme).
- No dead CSS. No framework. No external requests (no font/CDN/GSAP — implement motion yourself or vendor a tiny local helper). Offline render.
- Budgets (soft): ≤70 KB HTML+CSS+JS per variant excl. images; DOM sensible; CLS 0 for sticky chrome; `?theme=dark|light` boot before paint.
- Mobile-first; no page-level horizontal scroll at 360 / 390 / 768 / 1024 / 1440.
- Build order: family by family, V1→V5 with a self-critique after each variant; pilot **F11-V1 + F03-V1** first (Gate 2a) and freeze their patterns before the full run. Never stub; never "TODO states later" — every variant ships empty + loading + error states on day one.

### 9.3 Interaction & JS bar (required, not fluff)

| Requirement | Detail |
|---|---|
| Real behaviour | Tabs, filters, search, sort, pagination, dialogs, drawers, palette, accordions all work with keyboard + mouse |
| No fake motion | CSS-only hover with no page-level behaviour is a fail; empty `<script>` is a fail |
| IO + rAF | IntersectionObserver for reveals/count-ups; no janky scroll listeners |
| Reduced motion | `prefers-reduced-motion` kills transform/scroll effects; opacity ≤150ms only |
| A11y | Focus trap for overlays, Esc closes, focus restore, `aria-expanded`/`aria-selected`, live regions for filter counts + toasts |
| Honest states | Loading = skeleton (never spinner-only); error = what/why/action; empty = teaches next step |

### 9.4 Accessibility (WCAG 2.2 AA, both themes)

Skip link · one `h1` · no skipped levels · landmarks `header/nav/main/aside/footer` · real lists/tables · `:focus-visible` 2px `var(--primary)` + 2px offset · body ≥14px, nothing <11px · **text ≥4.5:1, UI boundaries ≥3:1** (badges, selected states, spines, focus) · 44px preferred / 24px minimum targets · status never colour-alone (icon + text).

---

## 10. COMPONENT INVENTORY (define once, reuse ×115 — restyle allowed, dropping states forbidden)

| Component | Required states |
|---|---|
| Shell (sidebar 232 + header 64 + breadcrumb + ⌘K + theme + bells + avatar) | expanded/collapsed, mobile drawer, badge counts, dark |
| Verdict line + hero action card | with/without pending action, zero-state |
| KPI cards (1 hero + secondaries) | value + label + trend/why, skeleton, zero |
| Tables (requests/quotes/billing/invoices/files/activity) | search + filter + sort + pagination + row actions + mobile card-fallback + empty/error |
| Tabs | `role=tablist`, arrow-key nav, deep-linkable |
| Status badge / stepper / timeline | icon+colour+text @ AA, locked w/ "why" microcopy |
| Buttons (primary/secondary/ghost/destructive/icon) | default/hover/focus/active/disabled/loading |
| Forms (incl. F06 brief, F20 profile, UTR upload) | labels, inline validation, help tooltips, styled dropzone (never native file input) |
| Quote sign block (C7) | 3 steps, readable T&C, e-sign disclosure, disabled-until-complete honesty |
| Checkout (C8) | 1 primary CTA, trust strip, stepper, receipt/invoice |
| Messaging (3-pane + thread + composer) | filters, quick replies, mentions, attachments, reply/edit, receipts/typing/SLA |
| Notifications + Activity | grouping, entity deep links, bulk actions, filters, pagination |
| File preview | PDF inline, image inline, unsupported = designed card w/ open/download (never blank) |
| Command palette | real actions only, ↑↓↵ esc, jump-to-payment/approval |
| Toasts + system-status banner (A13) | polite live region, retry + support CTA |

---

## 11. SIZE & PERFORMANCE CONTRACT (all 115)

| Element | Desktop | Phone |
|---|---|---|
| Content container | ≤1400px (shell content col) | full width, 16–24px gutters |
| H1 | 32–40px display | 28–32px |
| Body/meta | body 14–16px, meta ≥12px | body ≥14px |
| Tables | full, sticky header where long | card-fallback or sticky-first-col scroll |
| Page weight | ≤250 KB excl. images; images ≤350 KB/page, explicit dims, lazy below fold | same |

No 80px headlines, no 600px hero art inside the portal, no giant decorative numerals. Record measured H1/container at 360/390/768/1024/1440 in both themes per variant.

---

## 12. GATE 1 — concepts review (before build)

115 concept cards in `docs/CONCEPTS.md`, each per §8.1 template with ASCII sketch + axes + API refs + dark/mobile notes.

**Table 1:** `variant | keeps | fixes (C#) | adds (A#) | axes | signature interaction | API endpoints`
**Table 2 — distinctness per family:** 5 rows × axes A–E. FAIL if any two siblings share A+C, or differ by colour only.
**Table 3 — coverage:** every C-item present in 5/5 of its families; every P1 A-item 5/5; P2–P3 ≥3/5.

```
## GATE 1
Concept cards: 115/115 · Sketches: 115/115 · Difference test: PASS/FAIL per family
C coverage 5/5: YES/NO · P1 A coverage 5/5: YES/NO · P2-P3 ≥3/5: YES/NO
Gate: PASS / FAIL
```

---

## 13. GATE 2a/2b + GATE 3 — build, verify, critique

**Gate 2a — Pilot (hand-built).** Build **F11-V1** (quote sign — the revenue screen) + **F03-V1** (dashboard — the first-5-seconds screen) fully: all states, both themes, 5 widths, keyboard end-to-end. Do not proceed until both pass §5/§9/§10.

**Gate 2b — Full build (hand-built, one by one).** Build the remaining 113 variants family by family. Then hand-update gallery + `manifest.json` + `DECISIONS.md`. Preserve existing repo paths; do not touch sibling labs.

**Gate 3 — Verify and critique.**

- Confirm §1.3: no design-generation scripts; `DECISIONS.md` attests hand-authorship.
- Anti-drift checks (manual): identical-skin side-by-side per family (fail if 2 siblings near-identical) · remote-URL check (no `http(s)` assets/fonts/scripts) · dead-link check (no `href="#"`) · token check (only §5 colours/radii/spacing) · scope check (only `client-portal-lab/` + 5 docs) · C/A coverage check from manifest.
- Exercise every interaction in every variant: tabs, filters, search, sort, pagination, dialogs, palette, drawers, theme, reduced-motion, no-JS fallback (content + links reachable), rapid-click races, broken-image placeholders.
- Inspect at 360/390/768/1024/1440, light + dark, **if a browser is available**. If not, say so explicitly and do not claim screenshot QA.
- Apply the report's acceptance checklist (§7.1 of the report — hierarchy <2s, KPI grammar, table completeness, nav ≤9, colour AA, type scale, dark parity, keyboard, empty/loading/error, mobile, performance, legal) to every variant. Classify findings **blocker · major · minor**. No blocker open at hand-off.
- Write `docs/DELIVERY-REPORT.md`: file paths, run command, per-family winner recommendation (23 winners + why), verification results + limitations.

```
## GATE 3
Variants built by hand: 115/115 · Generator scripts: 0
Widths×themes checked: <…> · Checklist pass: <…>/115 · Blockers open: 0
Gate: PASS / FAIL
```

---

## 14. HARD CONSTRAINTS

- **Do not** push, commit, create/switch/rename a branch.
- **Do not** modify screenshots, HTML snapshots, reports, Swagger specs, or example prompts.
- **Do not** create templates with a generator script (`*.mjs`/Node/Python/shell-loop/compositor/factory). Hand-author every variant (§1.3).
- **Do not** introduce colours outside §5. Same scheme ×115. Phase/status hues stay inside the token file.
- **Do not** ship 5 recolours of one layout — the Difference Test (§8.2) is a gate, not guidance.
- **Do not** invent portal features, clients, numbers, testimonials, or case metrics. Features come from Gate S current-UI + Gate R ADD list + Gate A Swagger — nothing else. Gate T templates inspire composition only; they never add features.
- **Do not** drop KEEP items, Razorpay strips, honesty notes, or legal/dispute routes.
- **Do not** ship remote/expiring media, broken routes, `href="#"` destinations, external CDNs, font services, or chart libraries.
- **Do not** present research you did not open (report, Swagger, or online templates); unopened = not verified. Do not claim browser QA you did not run. Do not run Gate T before Gates S/R/A PASS.
- **Do not** "fix" the live 502 by pretending it away — design the degraded state honestly (A13 + retry + support).
- **Do not** build outside `client-portal-lab/` + the 5 docs. No `tools/generate-*`, no second lab folder, no blog/marketing work.

---

## 15. COMPLETION CHECKLIST (23 families × 5 = 115)

- [ ] Gate S PASS — 45 screenshots + 55 HTML + audit metadata mapped, `docs/BASELINE-MAP.md` written
- [ ] Gate R PASS — MD + all 10 XLSX sheets studied, `docs/REPORT-STUDY.md` written (C1–C20, A1–A15 mapped)
- [ ] Gate A PASS — 17 Swagger specs mapped, `docs/API-MAP.md` written (every CTA → real endpoint)
- [ ] Gate 1 PASS — 115 concept cards + sketches + difference tables, `docs/CONCEPTS.md` written
- [ ] Gate 2a PASS — F11-V1 + F03-V1 pilot hand-built and frozen
- [ ] Gate 2b — all 115 variants **hand-authored** (§1.3); gallery + `manifest.json` + `DECISIONS.md` updated; zero generator scripts
- [ ] Same token file imported by all 115; no new hues; C4 AA badges everywhere; C5 single brand; C6 tokenised cards
- [ ] Every C-item in 5/5 of its families; every P1 A-item in 5/5; P2–P3 in ≥3/5 (recorded in manifest)
- [ ] Every variant: empty + skeleton + error states; light + dark; 360–1440; keyboard-clean; reduced-motion; no-JS content reachable
- [ ] Gate 3 PASS — acceptance checklist applied ×115, 0 blockers, `docs/DELIVERY-REPORT.md` with 23 family winners
- [ ] Reported: file paths, `python3 -m http.server 8130` run command, verification + limitations

### Operator shortcuts

- **Colour drift:** "Restore tokens from §5 in every variant — one scheme, no new hues."
- **Fake variety:** "F09-V3 fails the Difference Test vs V1 — change geometry or narrative (axis A/C), not colour."
- **No manual craft:** "Gate 2 FAIL — a generator script exists under client-portal-lab/. Delete it and hand-rebuild."
- **Shallow study:** "Gate R/A FAIL — REPORT-STUDY/API-MAP must quote every C/A item and endpoint mapping."
- **Dead CTA:** "Every button links to a Gate-A endpoint or is labelled demo-only in DECISIONS.md."
- **Freeze:** "F11-V1 + F03-V1 approved — never regenerate them."

---

*End of prompt. Start at §3 Step 1. Print every gate block. Hand-craft all 115.*
