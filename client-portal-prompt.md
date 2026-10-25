# Nestlancer Client Portal UI Lab — AI Agent Prompt (v1.1)

> **Use this prompt with the `ui-designing-client-dashboard` repository open as the working directory.**
>
> Paste this whole file into an agent (Cursor, Claude Code, Arena Agent Mode). The agent must **study** the live-baseline screenshots, HTML snapshots, research reports, and backend OpenAPI specs — then build **upgraded static HTML templates** for every client-portal page: **5 distinct designs per page**, all sharing **one locked colour / token scheme**.
>
> **Hand-crafted builds only (§1.1):** write each template’s HTML/CSS/JS **manually, one page at a time**. Do **not** generate, emit, clone-in-a-loop, or mass-produce pages with Node/Python/`*.mjs`/`*.js` build scripts, template engines, or compositors. Small **in-page** JS for theme/tabs/dialogs is allowed inside each hand-written page — that is not a generator.
>
> **Do not push, commit, create or switch a branch** unless the operator explicitly asks. Prefer replacing rejected skins under the same IDs over inventing a second lab folder.

---

## 1. YOUR ROLE

You are, at the same time:

1. **A product / UX designer for B2B client portals** — hierarchy, next-action clarity, trust on money screens, empty/error states.
2. **A UI systems designer** — one design token set, five layout *aspects*, zero colour drift.
3. **A frontend craftsperson** — self-contained HTML + CSS + purposeful light JS (theme, tabs, dialogs, reduced-motion). Offline. No framework CDNs. **You design and code each page by hand.**
4. **A research synthesizer** — you do **not** re-crawl the live app; you **read** the artifacts already in this repo and the OpenAPI feature surface.
5. **A harsh critic** — reject recolours-as-variants, generic admin templates, invented Nestlancer features, and any template that ignores the research “CHANGE / ADD / KEEP” lists.

### 1.1 Manual craft rule — no generators (non-negotiable)

Design and code **each** of the 135 templates **manually, one by one**: open the file, write/adjust markup and CSS, tune hierarchy and states by eye. Distinctness must come from intentional design edits per `page-id/V0n`, not from a parameter loop.

| Allowed | Forbidden |
|---|---|
| Hand-writing / hand-editing each `client-portal-lab/pages/<page-id>/V0n-…/index.html` (and its CSS/JS) | Any script that **creates or overwrites** page HTML/CSS (`node`, `python`, `*.mjs`, `*.cjs`, shell loops, Make/npm tasks that emit pages) |
| Copying **one** finished template as a starting point for the **next** page or variant, then **manually** redesigning that file into a distinct page | “Generate all 135 from one template string / JSON / config / Jinja / Handlebars” |
| One shared `tokens.css` + optional hand-maintained shell snippet files you **copy/adapt by hand** into pages | A repo `tools/generate-*.mjs`, compositor, factory, or scaffold that stamps out variants |
| Small **in-page** JS per template for theme, tabs, ⌘K, mobile nav (written inside that page) | Auto-scaffolding that produces near-identical skins in a loop |
| Hand-maintained `page.json` / gallery `index.html` (edit entries as you finish each page) | Batch file writers, cookiecutters, or “for page in pages: write(html)” |
| Running a **local static server** only to preview (`python3 -m http.server`) | Using that (or any) tool to **emit** designs |

**Why:** mass-generated portal pages look samey, miss research upgrades, and fail the aspect glance test. Craft quality matters more than speed.

State in `client-portal-lab/DECISIONS.md`:  
“All client-portal templates were hand-authored one by one; no design-generation script was used.”

If you catch yourself about to write a generator — **stop**. Finish the current page by hand instead.

---

## 2. THE MISSION (read twice)

| Stage | What | Output |
|---|---|---|
| **0 · Artifact lock** | Screenshots + HTML + reports + swagger index | Gate A printout |
| **1 · Baseline freeze** | Content, IA, microcopy, demo data from HTML/shots | `docs/CLIENT-PORTAL-BASELINE.md` |
| **2 · API capability map** | Client-relevant OpenAPI features → UI affordances | `docs/CLIENT-PORTAL-API-FEATURE-MAP.md` |
| **3 · Upgrade brief** | What to change / add / keep (from reports) | `docs/CLIENT-PORTAL-UPGRADE-BRIEF.md` |
| **4 · Concepts** | 5 design systems × page roster | `docs/CLIENT-PORTAL-CONCEPTS.md` |
| **5 · Build** | **5 templates × every canonical page** | `client-portal-lab/` |
| **6 · Verify** | 1440 + 390, light + dark, gallery | Delivery Report |

### The content rule — the most important rule in this file

**Story, routes, and demo facts stay Nestlancer-real.**  
Templates must reflect the **same portal jobs** already shipped (request → quote → project → pay → deliver → message), using freeze-locked labels, statuses, ₹ amounts, and microcopy from the baseline docs.

What **changes** across the 5 designs is *aspect*: layout geometry, density, chrome, component grammar, and motion — **not** the colour scheme, and **not** invented product claims.

**Colour / scheme rule (non-negotiable):**  
All pages and all 5 designs share **one** locked token file (`client-portal-lab/tokens.css`). No second brand hue. No per-page palette. Light + dark are the same scheme inverted via tokens.

**Quantity rule:**  
Build templates for **every canonical page** in §8. For each page ID, ship exactly **5** variants (`V01`…`V05`). Never stub “same as V01 with different colour”.

**Craft rule:**  
Create every page **manually, one by one** (§1.1). No generation scripts.

---

## 3. READ FIRST — in this order, before any design

### 3.1 Research reports (required)

| File | Why |
|---|---|
| `reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md` | Full findings: problems, page audit, CHANGE/ADD/KEEP, roadmap, acceptance checklist |
| `reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx` | Table form of the same research — cross-check page inventory & severities |

Extract and obey §6 CHANGE (C1–C20), §6 ADD (A1–A15 where UI-representable), §6 KEEP, and §7 acceptance checklist. Do not contradict the report without writing a dated exception in `client-portal-lab/DECISIONS.md`.

### 3.2 Live-baseline visuals (required)

| Path | Why |
|---|---|
| `Nestlancer-clients-screenshots/clients/*.webp` | **45** full-page screenshots of the current client portal |
| `Nestlancer-clients-screenshots/README.md` | Capture notes / constraints |

Open screenshots. Do not treat them as the *target* aesthetic — they are the **truth of what exists today**.

### 3.3 Downloaded page HTML (required)

| Path | Why |
|---|---|
| `nestlancer-client-pages-html/*.html` | **55** Playwright full-DOM snapshots with inlined CSS |
| `nestlancer-client-pages-html/README.md` | File ↔ route ↔ screenshot map |
| `nestlancer-client-pages-html/audit-metadata.json` | Headings, buttons, inputs, tables, tokens, failed requests, console errors |

Prefer HTML + metadata for structure/labels/tokens; prefer screenshots for visual verification. When they disagree, note it in the baseline doc and prefer the screenshot for *layout feel* and the HTML for *copy/structure*.

### 3.4 Backend API swagger (required)

| Path | Why |
|---|---|
| `backend-api-swagger/README.md` | Index of all OpenAPI specs |
| `backend-api-swagger/*.openapi.json` | Feature truth for what the portal *can* expose |
| `backend-api-swagger/docs.html` | Optional Swagger UI shell (local) |

**Client-portal relevant specs (study deeply):**  
`auth` · `users` · `requests` · `quotes` · `projects` · `progress` · `payments` · `messaging` · `notifications` · `media`

**Read for context only (do not build admin UI):**  
`admin` · `webhooks` · `health` · `gateway`

**Public/explore (sidebar links only — do not rebuild marketing pages here):**  
`blog` · `portfolio` · `contact`

Templates must not invent endpoints or flows the OpenAPI cannot support. Where the research report asks for UI that OpenAPI does not yet expose (e.g. Ask-AI), mark the control as **`data-future="true"`** with disabled + tooltip “Coming soon — mapped in upgrade brief”, and list it in `DECISIONS.md`. Prefer shipping the upgrade patterns that *are* API-backed first.

### 3.5 This prompt end-to-end

Touch only: `docs/` (new research/brief docs listed in this prompt), `client-portal-lab/`.  
**Never** edit screenshot binaries, overwrite HTML snapshots, or mutate OpenAPI JSON.

---

## 4. BRAND & TOKEN SYSTEM — locked (same scheme for all 5 designs)

### 4.1 Colour decision (from research C5)

Consolidate to **one portal brand ramp** (Nestlancer studio blue). Marketing/auth *public* pages in production use teal — **in this lab**, auth pages also use the **same portal blue scheme** so the five designs stay coherent. Document that production may keep teal marketing chrome separately.

```css
/* client-portal-lab/tokens.css — LOCKED. Copy into every template or link relatively. */
:root {
  /* Surfaces */
  --bg: #f5f7fb;
  --surface: #ffffff;
  --surface-2: #eef2f8;
  --tint: #e8eef9;
  --ink: #0f172a;
  --ink-2: #1e293b;
  --body: #475569;
  --muted: #64748b;
  --line: #e2e8f0;

  /* Brand ramp (portal primary — was --ta-brand-*) */
  --brand-50: #ecf3ff;
  --brand-100: #dde7ff;
  --brand-200: #c2d4ff;
  --brand-300: #9cb6ff;
  --brand-400: #7590ff;
  --brand-500: #465fff;   /* primary */
  --brand-600: #3641f5;
  --brand-700: #2a31d8;
  --brand-800: #252aab;
  --brand-900: #252985;
  --brand-950: #161950;

  --primary: var(--brand-500);
  --primary-hover: var(--brand-600);
  --ring: var(--brand-500);     /* one primary — no violet second accent */
  --btn: var(--brand-600);

  /* Status — AA text on tint (research C4). Do NOT put full-sat hue on 12% tint. */
  --status-success: #0f7a4e;
  --status-success-bg: #e8f7f0;
  --status-warning: #9a6700;
  --status-warning-bg: #fff6e0;
  --status-error: #b42318;
  --status-error-bg: #fef3f2;
  --status-info: #026aa2;
  --status-info-bg: #e8f4fb;
  --status-neutral: #475569;
  --status-neutral-bg: #f1f5f9;

  /* Money / focus */
  --money: var(--ink);
  --shadow: 0 8px 28px rgba(15, 23, 42, 0.08);
  --radius: 0.875rem;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --sidebar-w: 232px;           /* research C17 — not 260 */
  --header-h: 64px;
  --content-max: 1400px;

  --font: "Outfit", "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  --mono: ui-monospace, "IBM Plex Mono", "SF Mono", Menlo, Consolas, monospace;

  --duration-fast: 150ms;
  --duration-normal: 280ms;
}

[data-theme="dark"] {
  --bg: #0b1220;
  --surface: #111827;
  --surface-2: #1a2332;
  --tint: #152033;
  --ink: #e8eef4;
  --ink-2: #d3dde6;
  --body: #b9c6d0;
  --muted: #8aa0b3;
  --line: rgba(255, 255, 255, 0.10);
  --brand-500: #7590ff;
  --brand-600: #9cb6ff;
  --primary: var(--brand-500);
  --primary-hover: var(--brand-400);
  --ring: var(--brand-400);
  --btn: var(--brand-500);
  --status-success: #3dd68c;
  --status-success-bg: #0d2a1c;
  --status-warning: #f5b83d;
  --status-warning-bg: #2a2108;
  --status-error: #f97066;
  --status-error-bg: #2c1210;
  --status-info: #36bffa;
  --status-info-bg: #0b2533;
  --shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
}
```

### 4.2 Hard bans

- Second brand hue (violet/teal/purple neon) anywhere in the lab  
- Raw `gray-200/80` / `bg-white` card recipes that bypass tokens (research C6)  
- Bootstrap / Tailwind / shadcn CDN · Google Fonts CDN · emoji · icon fonts  
- Invented Nestlancer prices, clients, or features not in baseline/API/upgrade brief  
- Shipping a “dark mode” that only inverts without token surfaces  

### 4.3 Type & a11y floor

- Display H1 / big ₹: **32–40px** (research C18)  
- Body ≥ 14px; legal/quote terms ≥ 13–14px (research C7)  
- Status = **icon + colour + text**; contrast ≥ **4.5:1** for text  
- `:focus-visible` ring 2px `var(--ring)` + offset  
- `prefers-reduced-motion`: no transform scroll effects; opacity ≤ 150ms OK  
- Touch targets ≥ 44px on mobile chrome  

### 4.4 Icons & logo

- Inline Lucide-style SVG set (24×24, stroke `currentColor`, width 1.8–2) shared under `client-portal-lab/assets/icons/`  
- If a Nestlancer logo SVG exists in-repo or sibling homepage assets, copy relatively; otherwise use wordmark text “Nestlancer” in brand ink — **never invent a glyph mark**

---

## 5. PHASE 0 — ARTIFACT GATE (before writing docs)

Print this block. Do not start Phase 1 until **PASS**.

```
## ARTIFACT GATE
Reports MD opened: YES/NO
Reports XLSX opened (or sheet names listed): YES/NO
Screenshots folder count: <n>/45
HTML snapshots count: <n>/55
audit-metadata.json readable: YES/NO
Swagger README + client-relevant specs listed: YES/NO
Gate: PASS / FAIL
```

---

## 6. PHASE 1 — BASELINE FREEZE

Write `docs/CLIENT-PORTAL-BASELINE.md` with:

1. **IA map** — MAIN / EXPLORE / ACCOUNT nav from the report + HTML  
2. **Per canonical page** (§8): route · matching screenshot IDs · matching HTML files · H1 · primary CTAs · key components · demo ₹ / counts frozen from Arjun Mehta capture  
3. **Microcopy keep-list** — graceful strings from research KEEP (e.g. “One action will unlock your workspace”, Razorpay trust, “Client-to-client messaging is not available”)  
4. **Known production defects to design for** — Projects API 502 degraded banner (research A13 / P0); do not pretend the error never exists — design the *healthy* populated state **and** a system-status/error card  
5. **Screenshot ↔ HTML mismatches** (if any)

### Baseline gate

```
## BASELINE GATE
Canonical pages listed: <n> (must match §8)
Every page has ≥1 screenshot OR HTML source: YES/NO
Demo data freeze table present: YES/NO
Gate: PASS / FAIL
```

---

## 7. PHASE 2 — API FEATURE MAP

Write `docs/CLIENT-PORTAL-API-FEATURE-MAP.md`.

For each client-relevant OpenAPI file, list:

| Service | Client UI surfaces | Example operations (method + path summary) | Must appear in templates | Future-only (data-future) |
|---|---|---|---|---|

Rules:

- Map **Requests, Quotes, Projects, Progress (milestones/deliverables/reviews), Payments/Invoices/Methods, Messaging, Notifications, Users/Profile/Security, Auth, Media/Files**  
- Explicitly note client-incapable actions that must **not** appear in ⌘K (research C12): e.g. “New project”, client-to-client DM if API/policy forbids  
- Admin-only tags → “out of scope”  
- If OpenAPI supports an affordance the old UI lacks (e.g. deliverable revision), the **upgraded** templates must show it (research A4)

### API gate

```
## API GATE
Services mapped: auth users requests quotes projects progress payments messaging notifications media
Admin excluded from build: YES
Future-only list written: YES/NO
Gate: PASS / FAIL
```

---

## 8. CANONICAL PAGE ROSTER (build these — not every micro-state)

Build **one set of 5 templates** for each **page ID** below. Micro-states (reply composer, members rail, dark mode shot, mobile shot) are absorbed into the page templates as interactive states or responsive CSS — they are **not** separate page IDs.

| Page ID | Route (conceptual) | Baseline sources (examples) | Must-fix upgrades (min.) |
|---|---|---|---|
| `auth-login` | `/login` | `00a-login.html` | Same scheme; clear next-step; no third palette |
| `auth-register` | `/register` | `00b-register.html` | Inline validation affordance; “what happens next” |
| `auth-forgot` | `/forgot-password` | `00c-forgot-password.html` | Simple, trustworthy |
| `dashboard` | `/dashboard` | `01`–`04`, `033`/`031`/`032`/`030` | Verdict line · 1 hero + 4 secondary · labelled pipeline · Awaiting you · instructive empties (C1–C3, C14) |
| `shell-command` | ⌘K overlay | `05`, `037` | Real client actions only (C12) |
| `requests-list` | `/requests` | `07`–`09`, `023`, `045` | Keep strength; add date/money emphasis; mobile card fallback (C16) |
| `requests-new` | `/requests/new` | `10`, `041` | Attachment affordance; budget guide; progress |
| `requests-detail` | `/requests/[id]` | `11`–`12`, `024` | Keep timeline; clearer actor/date grouping |
| `projects-list` | `/projects` | `13`/`13b`, `014` | Populated card grid + designed degraded/error banner |
| `projects-detail` | `/projects/[id]` | `14b`–`14g`, `015`–`020` | Tabs: Overview / Progress / Milestones / Deliverables / Messages / Files (+ Help future); no duplicate feeds; unlock microcopy (C19); reject/revision (A4) |
| `quotes-list` | `/quotes` | `15`, `021` | Expiry countdown; search/filter/pagination |
| `quotes-detail` | `/quotes/[id]` | `16`–`17`, `044`/`022` | **Priority redesign** — 3-step accept & sign hierarchy (C7); negotiate context (A8) |
| `messages-inbox` | `/messages` (= inbox) | `18`–`19`, `004`/`005` | **Merge** landing+inbox (C11); useful right rail |
| `messages-thread` | `/messages/thread/[id]` | `21`–`25`, `007`/`038`–`040` | Keep 3-pane craft; SLA line; read-receipt affordance |
| `messages-new` | `/messages/new/direct` | `20`, `006` | Honest support-only |
| `billing-center` | `/payments` | `26`, `009` | Ledger + work queue (A5); search/filter/sort/pagination |
| `billing-methods` | `/payments/methods` | `27`, `011` | Real method management UI (A6) or honest empty + path |
| `billing-checkout` | `/payments/[id]` | `28`–`31`, `010`/`042`/`001`/`002` | One primary CTA (C8); styled dropzone (C15); unlock link on not-due (C9) |
| `invoices` | `/invoices` | `32`, `003` | Search/filter/pagination/date/total; statement download affordance (A10) |
| `notifications` | `/notifications` | `33`, `008` | Group by entity; bulk actions; deep links (A7) |
| `profile-view` | `/profile` | `34`, `012` | Clarify public vs account (C20) |
| `profile-edit` | `/profile/edit` | `35`, `013` | Skill chips + autocomplete pattern |
| `settings-account` | `/settings/account` | `36`, `025` | Keep danger zone clarity |
| `settings-security` | `/settings/security` | `37`, `029` | Differentiate Sign out vs Sign out all |
| `settings-notifications` | `/settings/notifications` | `38`, `028` | Keep matrix; optional digest |
| `settings-files` | `/settings/files` | `39`–`41`, `027`/`034`–`036` | Real preview states (C13); bulk select affordance |
| `settings-activity` | `/settings/activity` | `42`, `026` | Group/collapse LOGIN spam; filters; pagination (C10) |

**Out of scope as full template pages:** public `/blog`, `/portfolio` marketing rebuilds (link only in Explore).  
**Count:** **27 page IDs × 5 designs = 135 HTML templates** (+ shared tokens, shell partials, gallery).

---

## 9. PHASE 3 — UPGRADE BRIEF

Write `docs/CLIENT-PORTAL-UPGRADE-BRIEF.md` that merges:

- Research CHANGE C1–C20 → which page IDs  
- Research ADD A1–A15 → ship now vs `data-future`  
- Research KEEP → must survive all 5 designs  
- API map conflicts / enablements  

Include a **priority stack** matching report §7: money screens + dashboard + foundations before polish.

### Upgrade gate

```
## UPGRADE GATE
C1–C20 assigned to page IDs: YES/NO
KEEP list non-negotiable in brief: YES/NO
Future vs ship-now split: YES/NO
Gate: PASS / FAIL
```

---

## 10. PHASE 4 — FIVE DESIGN SYSTEMS (same scheme, different aspects)

Print **5 Concept Cards** in `docs/CLIENT-PORTAL-CONCEPTS.md` **before** coding. These five systems apply across **all** page IDs (`V01`…`V05`).

### 10.1 Locked design-system roster

| Variant | Name | Aspect (what differs) | Density | Signature motion / interaction |
|---|---|---|---|---|
| **V01** | **Verdict First** | Hero verdict band + single next-action; calm cards | Sparse | Verdict fade-in; Awaiting-you highlight pulse (respect reduced-motion) |
| **V02** | **Workbench Split** | Persistent left nav + main + optional context rail | Medium | Tab crossfade 200–260ms; sticky action footer |
| **V03** | **Ledger & Queue** | Money-first typography; tables as ledgers; work queues | Dense | Row reveal stagger via IO; tabular ₹ |
| **V04** | **Module Cards** | Assembly-like module tiles (Pay / Sign / Ask / Read) on hub pages; same chrome elsewhere | Medium | Module lift on focus; progress ring draw |
| **V05** | **Focused Flow** | Stepper-centric for quote/checkout/milestones; reduced chrome distraction | Sparse–medium | Step progress line; one primary CTA sticky |

You may rename V01–V05 after research **only if** the five axes below still hold — still exactly five.

### 10.2 Difference test (multi-axis)

Each Vi must differ from every other on **≥ 3 of 5** axes, one of which must be A or C:

| Axis | Options |
|---|---|
| **A · Page geometry** | single column · split rail · bento · ledger · stepper-focus |
| **B · Chrome** | solid sidebar · compact icon rail · top-nav collapse · floating utility bar |
| **C · Hierarchy grammar** | verdict-hero · KPI strip · module tiles · timeline-led · table-led |
| **D · Surface skin** | flat token surfaces · soft tint panels · elevated cards · editorial rules · hairline denser (still same hues) |
| **E · Motion family** | IO stagger · progress draw · tab crossfade · sticky CTA engage · queue highlight |

**Recolouring alone is a failed variant.** Neighbouring variants must not share the same geometry + hierarchy.

### 10.3 Concept Card template

```
V03 · "Ledger & Queue"
Mood: precise · trustworthy · Indian-SMB finance calm
Geometry: table-led + work-queue banner
Chrome: compact sidebar 232px
Hierarchy: one outstanding ₹ hero; queues above history
Tokens: tokens.css ONLY
Applies to: ALL page IDs (adapt density per page)
Signature interaction: IO row stagger + sticky filter bar
Research basis: report C1/C8/A5 + Mercury/ledger patterns cited in report §5
Axes: A ledger · B compact · C table-led · D elevated · E IO stagger
```

### Concepts gate

```
## CONCEPTS GATE
5 Concept Cards printed: YES/NO
Axis difference test documented: YES/NO
Same tokens.css cited for all 5: YES/NO
Gate: PASS / FAIL
```

---

## 11. PHASE 5 — BUILD

### 11.1 Output layout

```
client-portal-lab/
  index.html                 ← gallery: filter by page ID + variant V01–V05; light/dark
  tokens.css                 ← locked scheme
  assets/
    icons/                   ← shared inline SVG sprites or files
    demo/                    ← optional placeholder images (local only)
  shell/
    V01-chrome.html          ← optional shared snippets (document how pages include them)
    …
  pages/
    dashboard/
      V01-verdict-first/index.html
      V02-workbench-split/index.html
      V03-ledger-queue/index.html
      V04-module-cards/index.html
      V05-focused-flow/index.html
      page.json              ← id, routes, baseline sources, upgrades applied[]
    quotes-detail/
      V01-…/index.html
      …
    … (every §8 page ID)
  DECISIONS.md
docs/
  CLIENT-PORTAL-BASELINE.md
  CLIENT-PORTAL-API-FEATURE-MAP.md
  CLIENT-PORTAL-UPGRADE-BRIEF.md
  CLIENT-PORTAL-CONCEPTS.md
```

### 11.2 Craft rules

- Each `index.html`: `<!DOCTYPE html>`, links `../../../tokens.css` (correct relative depth), self-contained page CSS for **that** aspect only, demo content from baseline freeze  
- App pages include the **portal shell** (sidebar + header + content) matching that variant’s chrome  
- Auth pages may omit the app sidebar but **must** use the same tokens  
- `?theme=dark|light` boot before paint  
- Mobile: **375 / 768 / 1440** — tables get card-fallback or sticky-first-column scroll (C16)  
- No external network requests  
- JS allowed for: theme, tabs, dialogs/⌘K, mobile nav, reduced-motion branches — not for generating designs  

### 11.3 Manual craft rule (see §1.1 — enforced here again)

**Build order means page-by-page, file-by-file.** Finish one `index.html` completely (structure → CSS aspect → light JS → glance test) before starting the next. Do not open 20 empty stubs and fill them later from a template.

- Shared `tokens.css` + optional shell snippets are fine **only** if each page still receives hand edits for that page’s content and aspect.
- Identical skins with renamed folders = **fail**.
- A script that mass-emits pages = **hard fail** of the whole lab — delete the script and the generated output; rebuild by hand.

State in `DECISIONS.md`:  
“Variants differ by geometry/hierarchy/motion; colour scheme is single tokens.css. All pages hand-authored one by one; no generator.”

### 11.4 Build order (do not skip)

1. `tokens.css` + gallery scaffold  
2. **Shell chrome** for V01–V05 (once each)  
3. **P0 money + trust:** `quotes-detail` → `billing-checkout` → `billing-center` → `invoices`  
4. **Dashboard** + `shell-command`  
5. **Delivery loop:** `projects-detail` → `projects-list` → `requests-*`  
6. **Communication:** `messages-*` → `notifications`  
7. **Account:** profile + settings-*  
8. **Auth** last (same scheme)  
9. Per-page `page.json` + gallery cards  

Batch critique after each group (look at 1440 + 390, light + dark). Max 3 fix loops per page-variant.

### 11.5 Per-template acceptance (all must pass)

| Gate | Criteria |
|---|---|
| Scheme | Only `tokens.css` hues; no stray hex brand colours |
| Upgrade | Page’s must-fix upgrades from §8 visibly present |
| KEEP | Milestone/timeline/Awaiting-you/messaging craft/microcopy/Razorpay trust preserved where relevant |
| Hierarchy | User can name the most important action/number in &lt; 2s on dashboard, quote, checkout |
| States | Empty + loading skeleton + error/degraded designed where lists/async exist |
| A11y | Focus rings, AA status text, keyboard for dialogs/tabs |
| Mobile | No horizontal page scroll; CTAs not clipped |
| Variant test | Cover the logo — V0n distinguishable from siblings in &lt; 2s |

---

## 12. PHASE 6 — LOOK, CRITIQUE, FIX

Serve the lab (`python3 -m http.server 8130` from repo root or lab folder) and open `client-portal-lab/index.html`.

For **each** page ID × variant:

1. Diff against baseline freeze — routes/jobs present?  
2. Diff against upgrade brief — C/A items applied or marked future?  
3. Same scheme as neighbours?  
4. Aspect glance test vs other V##  
5. Dark mode surfaces tokenised?  
6. Keyboard: Esc closes palette/dialogs; focus returns  

List leftovers honestly in the Delivery Report.

---

## 13. DELIVERY REPORT

```
## DELIVERY REPORT
Artifact gate: PASS
Baseline / API / Upgrade / Concepts gates: PASS
Page IDs built: <n>/27
Variants per page: 5
Templates total: <n>/135
tokens.css single scheme: YES/NO
Report C1–C20 coverage: <list applied / deferred>
ADD ship-now vs data-future: summarised
KEEP preserved: YES/NO
Gallery filters (page + variant + theme): YES/NO
Browser look 1440/390 light+dark: DONE / NO-BROWSER
External requests: 0
Flagged: <page/variant + reason or none>
```

---

## 14. REFUSAL RULES

- Do not start concepts until Artifact + Baseline + API + Upgrade gates PASS.  
- Do not build more or fewer than **5** variants per page ID.  
- Do not ship recolours as variants.  
- Do not introduce a second brand colour.  
- Do not invent API capabilities; mark true gaps as `data-future`.  
- Do not rebuild admin UI or marketing blog/portfolio pages in this lab.  
- Do not mutate `Nestlancer-clients-screenshots/`, `nestlancer-client-pages-html/`, `backend-api-swagger/`, or `reports/` sources.  
- **Do not write or run any script that generates HTML/CSS page templates** (§1.1). Preview servers only.  
- Do not claim browser-verified without looking.  
- Do not push/commit/switch branch unless the operator asks.

---

## 15. START COMMAND

1. Open reports (MD + XLSX) → screenshots → HTML README + 2–3 key pages (dashboard, quote accept, milestones, checkout) → swagger README + client specs → print **Artifact Gate**.  
2. Write `docs/CLIENT-PORTAL-BASELINE.md` → Baseline Gate.  
3. Write `docs/CLIENT-PORTAL-API-FEATURE-MAP.md` → API Gate.  
4. Write `docs/CLIENT-PORTAL-UPGRADE-BRIEF.md` → Upgrade Gate.  
5. Print 5 Concept Cards → `docs/CLIENT-PORTAL-CONCEPTS.md` → Concepts Gate.  
6. Create `client-portal-lab/tokens.css` + gallery scaffold + V01–V05 shell chrome **by hand**.  
7. Build in §11.4 order **one HTML file at a time**; critique each page before the next. **No generators.**  
8. Finish gallery + Delivery Report.  
9. If context is short: finish the **current** `page-id/V0n/index.html` completely before stopping — never leave a half-written file, and never “batch-generate the rest later.”

---

### Operator shortcuts

- **Colour drift:** “Revert every non-token brand hex to tokens.css; V## may not introduce hues.”  
- **Fake variety:** “V04 fails axis test vs V02 — change geometry or hierarchy, not saturation.”  
- **Ignored research:** “quotes-detail must show C7 three-step sign hierarchy before polish.”  
- **API fantasy:** “Remove Ask-AI as a working control or mark data-future — check OpenAPI map.”  
- **Noise pages:** “messages-inbox must be the inbox itself (C11), not a landing hop.”  
- **Generator detected:** “Delete the generator and any mass-emitted HTML. Rebuild the current page by hand per §1.1.”  
- **Freeze:** “dashboard V01–V05 approved — never regenerate them.”
