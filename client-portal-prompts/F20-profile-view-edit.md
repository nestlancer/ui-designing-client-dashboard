# Nestlancer Client Portal Lab — F20 · Profile View + Edit — AI Agent Prompt
### Study screenshots + HTML + report + Swagger → understand full UI requirements → search similar great design templates → hand-craft 5 upgraded designs · one shared colour scheme

> Paste this whole file into an agent (Arena Agent Mode, Cursor, Claude Code) with the **`ui-designing-client-dashboard`** repo open as the working directory.
>
> **Scope: ONE page family — F20 · Profile View + Edit.** This is one of **23 independent family prompts** (F01–F23) that together replace the old master prompt: 23 families × 5 variants = **115 templates**, all sharing ONE locked colour/token scheme. This prompt builds **`client-portal-lab/families/F20-profile-view-edit/V1…V5/`** — 5 hand-built variants of this one page — and nothing else. The other 22 families have their own prompts; never build, edit or delete theirs.
>
> **Style parent:** `example-demo-prompt/example.homepage-prompt.md` (gates + phases) and `example-demo-prompt/example.portfolio-listing-prompt.md` (**hand-crafted only, no generators**). Read those two files first to understand the expected discipline — but **this file is the task**.
>
> **Do not push, commit, create or switch a branch.**

---

## 1. YOUR ROLE

You are, at the same time:

1. **A product archaeologist.** You reconstruct the *current* profile view and edit pages exactly as it is from its screenshots + HTML + audit metadata before changing a single pixel.
2. **A research analyst.** You study the UI research report (`.md` + `.xlsx`, all 10 sheets) and can quote every Finding, CHANGE (C1–C20), ADD (A1–A15) and KEEP item that touches this family.
3. **An API analyst.** You read this family's OpenAPI specs (Swagger) and know which UI element maps to which endpoint, field, enum and error state.
4. **A design-template researcher.** After Swagger + this family's complete UI requirements are locked, you search online for similar great design templates / live products and extract layout/hierarchy/interaction patterns (never invent features from them).
5. **A senior UI designer + art director.** Each of the 5 variants is a *different design idea* — not 5 recolours. Same tokens, different thinking.
6. **A front-end craftsperson.** Self-contained HTML + CSS + small purposeful JS. Offline, accessible, responsive, no CDN.
7. **A harsh design critic.** You reject generic admin templates, invented features, broken links, colour-only status, and any variant that does not fix this family's report findings.

---

## 2. THE MISSION (read twice)

| Stage | Input | Output |
|---|---|---|
| **0 · Baseline lock** | this family's screenshots + HTML + `audit-metadata.json` | Screenshot↔HTML map confirmed, content frozen |
| **1 · Reports study** | report `.md` + `.xlsx` (10 sheets) | `families/F20-profile-view-edit/docs/REPORT-STUDY.md` |
| **2 · API study** | this family's `*.openapi.json` specs (Swagger) | `families/F20-profile-view-edit/docs/API-MAP.md` |
| **3 · Online template research** | **AFTER** full UI requirements (§4) + Gate A Swagger map | `families/F20-profile-view-edit/docs/TEMPLATE-RESEARCH.md` — ≥8 similar great design templates |
| **4 · Concepts** | stages 0–3 | `families/F20-profile-view-edit/docs/CONCEPTS.md` — **5 concept cards**, printed **before** code |
| **5 · Build (MANUAL)** | concepts | `families/F20-profile-view-edit/V1…V5/index.html` — **5 hand-built variants** |
| **6 · Verify** | all 5 variants @ 1440 + 390, light + dark | `families/F20-profile-view-edit/docs/DELIVERY-REPORT.md` + gallery + manifest |

### The two most important rules in this file

**Rule 1 — SAME colour scheme, DIFFERENT designs.**
All variants across all 23 families share **ONE locked token file** (§5). A variant that introduces a new brand hue, a new status colour, or a second button style **fails**. Difference must come from *layout geometry, hierarchy, density, navigation pattern, proof/data presentation, and interaction* — never from colour. See the Difference Test (§8.2).

**Rule 2 — HAND-CRAFTED ONLY. NO GENERATOR SCRIPTS.**
You write every variant's HTML/CSS/JS **manually, one by one, by eye** — exactly like the approved `example.portfolio-listing-prompt.md` §1.3 rule. Any script that *creates or overwrites* variant HTML/CSS is forbidden. See §1.3 below. This is non-negotiable.

**Build narrow, study wide.** Read the full report + Swagger + this family's UI requirements, **then** search similar great design templates online → exactly **5 variants** out. Never stub "same as V1 with different colour". Never invent portal features that are neither in the current UI nor in the report's ADD list nor in the Swagger specs (templates never add features).

---

## 1.3 Manual craft rule — no generators (non-negotiable)

Design and code each variant **manually**: open the files, write/adjust markup and CSS, tune spacing and states by eye.

| Allowed | Forbidden |
|---|---|
| Hand-writing / hand-editing each `client-portal-lab/families/F20-profile-view-edit/V#/index.html` (and its CSS/JS) | Any script that **creates or overwrites** variant HTML/CSS (`node`, `python`, `*.mjs`, `*.cjs`, shell loops, Make/npm tasks that emit pages) |
| Copying **one** of your own hand-built variants once as a starting skeleton for the next variant, then **manually** redesigning it into a distinct design | "Generate all 5 variants from one template string / JSON / config" |
| Small **in-page** JS per variant for tabs, dialogs, theme, command palette, filters | A repo `tools/generate-*.mjs`, compositor, or factory that stamps out variants |
| Running **existing** repo auditors after the fact for QA only (link check, contrast) | Writing a new generator under `client-portal-lab/tools/` that builds designs |
| Hand-maintained `manifest.json` entries + the gallery's `F20` section | Auto-scaffolding that produces near-identical skins in a loop |

**Why:** mass-generated pages look samey and miss the craft. Distinctness must come from intentional design edits per variant, not from a parameter loop.

State in `client-portal-lab/DECISIONS.md` (your `F20` section): "All F20 variants were hand-authored; no design-generation script was used."

---

## 3. READ FIRST — in this order, before any design

1. **This prompt end-to-end.** Then `example-demo-prompt/example.homepage-prompt.md` and `example-demo-prompt/example.portfolio-listing-prompt.md` (discipline reference only — not the task).
2. **This family's screenshots (2):** `012-profile.webp` · `013-profile-edit.webp` in `Nestlancer-clients-screenshots/clients/` — open every one. Study each page top-to-bottom: header, sidebar, KPIs, tables, cards, CTAs, empty/error states.
3. **`nestlancer-client-pages-html/README.md`** — the file ↔ URL ↔ screenshot map. Then open this family's HTML snapshots (§4 table) + **`nestlancer-client-pages-html/audit-metadata.json`** (headings, buttons, inputs, tokens, failed requests, console errors — filter to this family's routes).
4. **`reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md`** — read in full (§1 executive findings → §7 roadmap + acceptance checklist → §8 sources).
5. **`reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx`** — open **all 10 sheets**: `1. Executive Findings · 2. Design Tokens · 3. Page Inventory · 4. Benchmark Patterns · 5. CHANGE list · 6. ADD list · 7. KEEP list · 8. Roadmap · 9. Acceptance checklist · 10. Sources`. If `.md` and `.xlsx` disagree, the `.md` wins — record the difference in your `REPORT-STUDY.md`.
6. **`backend-api-swagger/README.md`** + this family's specs: `users.openapi.json` (`/users/profile` (incl. skills fields), `/users/avatar`) · `media.openapi.json` (avatar upload). Map every UI surface to its real endpoints (Gate A).
7. **Online design-template research (Gate T) — only after Swagger + complete UI requirements.** Do **not** search templates first. First understand this family's full UI page requirements (§4 + Gates S/R) and finish the Swagger map above (Gate A). Then search the open web for **similar great design templates** / live products that solve this family's page job; open ≥8 refs; write `docs/TEMPLATE-RESEARCH.md`. Steal layout/hierarchy/interaction only — never brand colours, never invent features without Gate-A endpoints / Gate-R ADDs.
8. `git status` — never overwrite uncommitted changes. **Touch only:** `client-portal-lab/families/F20-profile-view-edit/` + the shared-infra merge rules (§9.1). Never edit screenshots, HTML snapshots, reports, Swagger specs, example prompts — or **any other family's folder**.

---
## 4. THIS FAMILY — F20 · Profile View + Edit

The client profile: avatar, headline, bio and skills — view (`34`) and edit (`35`; captured fields: Upload avatar, First name, Last name, Mobile number, Headline, Bio, "Skills (comma-separated)"). **Note:** the profile-visibility controls do NOT live here — they sit in Settings ▸ Account (`36`: "Profile visibility: Public / Private / Connections only" + "Show email on profile" / "Show phone on profile"). C20 resolves that IA oddity; the skills input becomes an autocomplete.

**Identity:**

| | |
|---|---|
| Routes | `/profile` · `/profile/edit` |
| Shell | Full app shell — sidebar 232px + header 64px + breadcrumb + ⌘K + theme + bell + avatar (C17). `F03` owns the definitive shell — match it, don't reinvent it. |
| Variants | **V1–V5** — each variant covers **all** states/tabs of this family (tabs switch in-page) |

**States in scope (every variant covers all of them):**

| HTML snapshot (`nestlancer-client-pages-html/`) | Route / state captured | Screenshot |
|---|---|---|
| `34-profile-view.html` | `/profile` — client profile page | `012-profile.webp` |
| `35-profile-edit.html` | `/profile/edit` — edit profile form | `013-profile-edit.webp` |

**Must include (every variant):**

- Avatar, headline, bio, skills — locked content
- **Skills (comma-separated) → autocomplete input** (the current chips-only input becomes a real autocomplete)
- **C20 placement resolution** — the profile is public but its visibility controls live in Settings ▸ Account (`36`); every variant resolves the IA honestly (e.g. a "Public profile" framing on `/profile` + a visibility affordance/summary that deep-links to the settings control — never a dead toggle)
- **Sticky save** on edit; view + edit states in every variant
- Validation, dirty-state warning, save success/failure

**Content lock (same story, upgraded hierarchy):** Freeze from `34` + `35`: avatar, the edit fields (Upload · First name · Last name · Mobile number · Headline · Bio · "Skills (comma-separated)"), the "Open settings" link on the view page, the sticky save. Reference (not on this page): the visibility controls in `36` — "Profile visibility: Public / Private / Connections only", "Show email on profile", "Show phone on profile".

**Cross-cutting states (every variant):** light + dark theme · 375px mobile card-fallback for tables · empty state · loading skeleton · error state w/ retry.

---

## 5. BRAND SYSTEM — locked (the ONE scheme shared by all 23 families)

### 5.1 The consolidation decision (from report §3.2 + C5)

The live app ships **three palettes** (portal blue `--ta-brand-*`, violet `--accent-1`, auth teal). The lab ships **ONE**:

- **Brand = `--ta-brand-*` blue ramp** becomes *the* `--primary`. Violet `--accent-1` is **deleted** except as focus-ring token if needed (document it in `DECISIONS.md`).
- Every family — including auth and public pages — uses the same blue.
- **Status hues keep their hue** but text uses **darkened AA-safe text variants** (C4). Badges = icon + colour + text (never colour alone).

### 5.2 Tokens (no new hues — all 5 variants `@import` the same file)

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

- Type scale: H1 display **32–40px** (C18 — the portal must feel premium, not 24px-internal-tool) · H2 20–24 · card title 16–18 · body 14–16 · meta 12 · micro 11 (never below 11). Money hero: 32–40px `tabular-nums tracking-tight`, cents in lighter weight. Mono for IDs/references/timestamps (report §3.2 gap).
- Icons: one inline SVG set (Lucide-style, 24×24, `stroke-width=2`), `aria-hidden`. No emoji, no icon font, no CDN.
- Motion tokens: `--duration-fast:150ms; --duration-normal:280ms; --duration-slow:500ms` + spring ease. Animate `transform`/`opacity` only (one SVG `stroke-dashoffset` exception for steppers/timelines).
- Hard bans: second brand hue · purple/neon decoration · Bootstrap/Tailwind CDN · external requests · `bg-white` / `gray-200/80` raw card classes (use `--card`/`--border` — C6) · gradient soup · glass over dense text.

### 5.3 Content lock (same story, upgraded hierarchy)

Every variant keeps the **same IA, labels, counts, ₹ figures, microcopy and legal text** found in this family's screenshots + HTML (verify field-by-field at Gate S). What changes is *hierarchy, restraint, accessibility* per the report — **never** the story itself. **Never** rewrite the H1 story, invent clients/numbers, drop trust strips, or remove the "not available" honesty notes. The KEEP list (§6) must survive in every variant.

---

## 6. WHAT TO CHANGE / ADD / KEEP — F20 scope (bound to the report — not your invention)

### CHANGE — implement every item in **all 5 variants** (the fix may *look* different per variant but must be *present* in each)

- **C20** — **Move Profile out of the private portal, or into "Public profile".** The profile is public but its visibility controls sit under ACCOUNT in Settings (`36`) while the profile lives at `/profile` — resolve the IA in every variant: label the section honestly ("Public profile") and connect the profile to its visibility state, even if the route stays. *(report §6.1)*
- **C17** — **Compress the sidebar (inherited).** The shell you render is the 232px sidebar + 64px header + Blog/Portfolio behind a single "Explore" popover (C17). `F03` owns the definitive shell — match it, don't reinvent it. *(report §6.1)*
- **C4** — **Fix badge contrast.** Live status badges measure **1.73–3.23:1** (AA needs 4.5:1 for 12px text). Use the darkened AA-safe text tokens (`--status-*-text`, §5.2) on the tinted backgrounds. Badges = icon + colour + text — never colour alone. *(report §6.1, finding #3)*
- **C5** — **Consolidate to one brand ramp.** `--ta-brand-*` blue becomes *the* `--primary`; the violet `--accent-1` (250 100% 52%) is deleted (focus-ring use only, documented). If this page currently renders violet or teal accents, it renders blue now. *(report §6.1, finding #4)*
- **C6** — **Tokenise cards.** No raw `bg-white` / `gray-200/80` / hard-coded hex card borders — every surface uses `--card` / `--border` / `--shadow-xs`. *(report §6.1, finding #12)*
- **C18** — **Increase the type scale.** H1 display 32–40px + money hero 32–40px `tabular-nums`; the current 24px H1 makes the portal read like an internal tool. *(report §6.1)*

### ADD — with priority + coverage

*(No numbered A-items target this family. Family must-include ADDs, if any, are listed in §4 — they remain mandatory. Never invent additions beyond the report's ADD list and the master inventory.)*

**Coverage rules:** P1 A-items are mandatory in **all 5 variants**; P2–P3 A-items are mandatory in **≥3 of 5** — record per-variant coverage in `manifest.json`. Family must-include ADDs are mandatory in all 5.

### KEEP — present in every variant

- **Visibility honesty** — the Public/Private/"Connections only" semantics and their microcopy (from Settings ▸ Account) stay honest wherever surfaced. *(report §6.3)*
- **Graceful wording.** *(report §6.3)*

---

## 7. GATES — do them in order, print each gate block, stop on FAIL

### Gate S — Screenshot + HTML baseline (before anything else)

1. Open this family's screenshots + HTML snapshots + `audit-metadata.json` (filter `failedRequests` / `consoleErrors` to this family's routes).
2. Build the map: routes, HTML files, screenshots, H1/H2s, buttons, inputs, tables, tokens observed, failed requests / console errors.
3. Freeze the family's content truth (labels, figures, copy). Anything unverifiable = **not verified**, never invented.
4. Write `client-portal-lab/families/F20-profile-view-edit/docs/BASELINE-MAP.md` (this family's map — your Gate S output).

```
## GATE S (F20)
Screenshots opened: <n>/<n> · HTML opened: <n>/<n> · audit-metadata read: YES
Routes mapped: <list> · Content frozen: YES
Gate: PASS / FAIL
```

### Gate R — Reports study (the redesign brief)

1. Read the `.md` report cover-to-cover; open all 10 `.xlsx` sheets.
2. Write `docs/REPORT-STUDY.md` (inside your family folder) containing: the executive findings that touch this page (quoted) · the full token table · this family's page-inventory rows · benchmark patterns you will apply (cite which of the 13 sources) · **this family's C-items with full specifics** · **A-items with priority** · the KEEP list · the roadmap phases that touch this family · the acceptance checklist copied as your QA list.

```
## GATE R (F20)
MD read: YES · XLSX sheets: 10/10 · C-items mapped: <n>/<n> · A-items mapped: <n>/<n>
KEEP listed: YES · Checklist copied: YES
Gate: PASS / FAIL
```

### Gate A — Swagger / API study (features must be REAL)

1. Read this family's specs: `users.openapi.json` (`/users/profile` (incl. skills fields), `/users/avatar`) · `media.openapi.json` (avatar upload).
2. Write `docs/API-MAP.md` (inside your family folder): a table of UI element → method + path → key request/response fields + enums → loading/empty/error/success states you will design.
3. Every CTA in every variant must resolve to a real endpoint from this map or be explicitly labelled a **demo affordance** in `DECISIONS.md`. No dead buttons, no `href="#"`.

```
## GATE A (F20)
Specs read: <n>/<n> · Endpoints mapped: <n> · Demo-only CTAs listed: <n>
Gate: PASS / FAIL
```

### Gate T — Online design-template research (AFTER Swagger + full UI requirements)

**Order is mandatory — never reverse it:**
1. Finish Gates **S** + **R** (current UI + report requirements locked).
2. Finish Gate **A** (this family's Swagger / OpenAPI map written — every surface → real endpoint).
3. Be able to state this family's **complete UI page requirements** from §4 (routes, states, must-include, content lock, C/A/KEEP) in your own words.
4. **Only then** search the open web for similar **great design templates** and live products that solve the *same page job* as this family.

**What to search (adapt queries to this family):**
- Client-portal / agency / SaaS screens matching this page job (e.g. work hub, request list, quote accept, billing ledger, inbox, checkout, settings).
- Strong references from: live products, open-source shadcn/admin dashboards, Figma UI kits, Mobbin/Dribbble pattern boards, Envato/portal template galleries.
- Prefer references that show hierarchy, density, empty/loading/error, and keyboard/interaction craft — not colour skins.

**Rules:**
- Open and study **≥8** references. Cite each with URL + the *pattern* you will steal (layout geometry, hierarchy, density, narrative, interaction — **never** brand colours, logos, or identity).
- Cross-check every pattern against Gate A: if a template shows a feature Nestlancer has **no** endpoint for (and it is not a Gate-R ADD), mark it inspiration-only or drop it — **do not invent features**.
- Extend report §5 benchmarks; do not replace the report's 13 sources — add fresh finds.
- Locked Nestlancer content + §5 tokens stay unchanged. Templates change *how* you compose the page, not *what* the portal is.

**Output:** write `docs/TEMPLATE-RESEARCH.md` (inside your family folder) containing:
- Search queries used
- Table of ≥8 refs: name · URL · page-job match · patterns to adopt · patterns rejected + why
- Mapping of adopted patterns → V1–V5 concept axes (§8.2)
- Explicit line: "No features invented from templates; all CTAs still Gate-A or demo-labelled."

```
## GATE T (F20)
Queries run: <n> · Refs opened: <n>/≥8 · TEMPLATE-RESEARCH.md written: YES
Patterns mapped to V1–V5: YES · No invented API features: YES · Order S→R→A→T respected: YES
Gate: PASS / FAIL
```

Do not draw a single concept until S + R + A + T all PASS.


---

## 8. CONCEPTS — 5 cards, printed BEFORE code

### 8.1 Concept Card template (5 cards in your `docs/CONCEPTS.md`)

```
F20 · Profile View + Edit · V# "<name your idea>"
Keeps (Gate S content): <locked labels / figures / CTAs>
Fixes/Adds: C# (…) · A# (…)
Differs on axes: A(layout) + C(narrative) + E(motion) — see §8.2
Layout sketch: [ASCII sketch of the geometry]
Signature interaction: <the one memorable behaviour>
API basis: <endpoints from your API-MAP>
Template refs (Gate T): <2–3 URLs / pattern names informing this variant — layout/hierarchy only>
Shell: <shell notes> · Dark + 375px notes: …
Risk: <what could break at 375px / in dark / keyboard>
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

Recolouring, re-radiusing or re-shadowing alone is **not** a difference. Neighbouring variants must not share the same A+C combination. Coverage in your 5: ≥1 minimal · ≥1 dense · ≥1 action/queue-led · ≥1 narrative/stepper-led.

### 8.3 Roster guidance (adapt freely — keep 5)

| Variant | Suggested aspect (same tokens) |
|---|---|
| V1 | Editorial profile: headline-forward, calm |
| V2 | Dense record: compact fields + meta |
| V3 | Edit-led workbench: the form as the page |
| V4 | Minimal: identity card + one edit path |
| V5 | Bento: identity / skills / visibility tiles |

Rename freely — still **5 variants**, still locked content + tokens.

---

## 9. BUILD (manual, one by one)

### 9.1 Output layout

```
client-portal-lab/
  index.html                  ← gallery: create if missing; otherwise add/replace ONLY the F20 section
  assets/                     ← ONE shared logo/icon set (inline SVG preferred) — add to it, never fork it
  shared/
    tokens.css                ← §5 tokens ONLY — create with EXACTLY the §5.2 CSS if missing; if present, import AS-IS (never edit, never fork)
    base.css                  ← reset + primitives ONLY — same create-if-missing rule
  families/
    F20-profile-view-edit/
      V1/index.html … V5/index.html   ← the 5 variants (each may carry its own style.css beside it)
      docs/
        BASELINE-MAP.md       ← Gate S output (this family only)
        REPORT-STUDY.md       ← Gate R output
        API-MAP.md            ← Gate A output
        TEMPLATE-RESEARCH.md  ← Gate T output (≥8 similar design templates, after Swagger + UI requirements)
        CONCEPTS.md           ← 5 concept cards
        DELIVERY-REPORT.md    ← Gate 3 output + 1 family winner
  manifest.json               ← merge: add/replace this family's 5 records; never delete other families' records
  DECISIONS.md                ← append/extend ONLY your F20 section (hand-authorship attestation + demo-CTA list + A-item coverage)
```

- `shared/` holds **only** tokens + reset/primitives. Each variant carries its **own hand-written** layout CSS (inline or `style.css` beside `index.html`). Never one megatemplate scoped 5 times with dead rules.
- Every variant renders standalone over relative paths, links back to the gallery, and has prev/next navigation within this family (V1 ↔ V5).
- Preview: `python3 -m http.server 8130` from repo root → `/client-portal-lab/` (use a fresh port; 8124–8128 belong to sibling labs).

### 9.2 Craft rules

- Each variant: `<!DOCTYPE html>`, imports `tokens.css` (+ `base.css`), only the CSS it uses, full page markup, **small JS for its real interactions** (tabs, dialogs, filters, palette, drawers, theme).
- No dead CSS. No framework. No external requests (no font/CDN/GSAP — implement motion yourself or vendor a tiny local helper). Offline render.
- Budgets (soft): ≤70 KB HTML+CSS+JS per variant excl. images; DOM sensible; CLS 0 for sticky chrome; `?theme=dark|light` boot before paint.
- Mobile-first; no page-level horizontal scroll at 360 / 390 / 768 / 1024 / 1440.
- Build order: **V1 first (Gate 2a pilot)** — all states, both themes, 5 widths, keyboard end-to-end — then V2→V5 one by one, with a self-critique after each variant. Freeze V1's patterns before the full run. Never stub; never "TODO states later" — every variant ships empty + loading + error states on day one.

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

## 10. COMPONENT INVENTORY (restyle allowed, dropping states forbidden)

**This family's primary components:** shell, profile header (avatar), forms (headline/bio/skills autocomplete), visibility affordance (deep-linked to settings), sticky save, dirty-state handling

**The lab-wide component contract (for context — every family restyles from the same set):**

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

## 11. SIZE & PERFORMANCE CONTRACT (all 5 variants)

| Element | Desktop | Phone |
|---|---|---|
| Content container | ≤1400px (shell content col) | full width, 16–24px gutters |
| H1 | 32–40px display | 28–32px |
| Body/meta | body 14–16px, meta ≥12px | body ≥14px |
| Tables | full, sticky header where long | card-fallback or sticky-first-col scroll |
| Page weight | ≤250 KB excl. images; images ≤350 KB/page, explicit dims, lazy below fold | same |

No 80px headlines, no 600px hero art inside the portal, no giant decorative numerals. Record measured H1/container at 360/390/768/1024/1440 in both themes per variant.

---

## 12. GATE 1 / GATE 2a + 2b / GATE 3

**Gate 1 — concepts review (before build).** 5 concept cards in your `docs/CONCEPTS.md`, each per §8.1 with ASCII sketch + axes + API refs + Gate T template refs + dark/mobile notes.

- **Table 1:** `variant | keeps | fixes (C#) | adds (A#) | axes | signature interaction | API endpoints`
- **Table 2 — distinctness:** 5 rows × axes A–E. FAIL if any two siblings share A+C, or differ by colour only.
- **Table 3 — coverage:** every C-item present in 5/5; every P1 A-item 5/5; P2–P3 ≥3/5.

```
## GATE 1 (F20)
Concept cards: 5/5 · Sketches: 5/5 · Difference test: PASS/FAIL
C coverage 5/5: YES/NO · P1 A coverage 5/5: YES/NO · P2-P3 ≥3/5: YES/NO
Gate: PASS / FAIL
```

**Gate 2a — Pilot (hand-built).** Build **V1** fully: all states/tabs, both themes, 5 widths, keyboard end-to-end. Do not proceed until it passes §5/§9/§10.

**Gate 2b — Full build (hand-built, one by one).** Build V2–V5, each hand-authored and self-critiqued. Then update the gallery's `F20` section + `manifest.json` (5 records) + `DECISIONS.md`.

**Gate 3 — Verify and critique.**

- Confirm §1.3: no design-generation scripts; `DECISIONS.md` attests hand-authorship.
- Anti-drift checks (manual): identical-skin side-by-side (fail if 2 siblings near-identical) · remote-URL check (no `http(s)` assets/fonts/scripts) · dead-link check (no `href="#"`) · token check (only §5 colours/radii/spacing) · scope check (only `families/F20-profile-view-edit/` + shared-infra merges + family docs) · C/A coverage check from manifest.
- Exercise every interaction in every variant: tabs, filters, search, sort, pagination, dialogs, drawers, theme, reduced-motion, no-JS fallback (content + links reachable), rapid-click races, broken-image placeholders.
- Inspect at 360/390/768/1024/1440, light + dark, **if a browser is available**. If not, say so explicitly and do not claim screenshot QA.
- Apply the report's acceptance checklist (§7.1 of the report — hierarchy <2s, KPI grammar, table completeness, nav ≤9, colour AA, type scale, dark parity, keyboard, empty/loading/error, mobile, performance, legal) to each variant. Classify findings **blocker · major · minor**. No blocker open at hand-off.
- Write `docs/DELIVERY-REPORT.md` (in your family folder): file paths, run command, per-variant verification, and **1 family winner recommendation + why**.

```
## GATE 3 (F20)
Variants built by hand: 5/5 · Generator scripts: 0
Widths×themes checked: <…> · Checklist pass: <…>/5 · Blockers open: 0
Gate: PASS / FAIL
```

---

## 13. HARD CONSTRAINTS

- **Do not** push, commit, create/switch/rename a branch.
- **Do not** modify screenshots, HTML snapshots, reports, Swagger specs, example prompts — or **any other family's folder** (`families/F##-…` that is not yours).
- **Do not** create templates with a generator script (`*.mjs`/Node/Python/shell-loop/compositor/factory). Hand-author every variant (§1.3).
- **Do not** introduce colours outside §5. Same scheme as the other 22 families. Phase/status hues stay inside the token file.
- **Do not** ship 5 recolours of one layout — the Difference Test (§8.2) is a gate, not guidance.
- **Do not** invent portal features, clients, numbers, testimonials, or case metrics. Features come from Gate S current-UI + Gate R ADD list + Gate A Swagger — nothing else. Gate T templates inspire composition only; they never add features.
- **Do not** drop KEEP items, trust strips, honesty notes, or legal/dispute routes.
- **Do not** ship remote/expiring media, broken routes, `href="#"` destinations, external CDNs, font services, or chart libraries.
- **Do not** present research you did not open (report, Swagger, or online templates); unopened = not verified. Do not claim browser QA you did not run. Do not run Gate T before Gates S/R/A PASS.
- **Do not** build outside `client-portal-lab/families/F20-profile-view-edit/` + the shared-infra merge rules (§9.1) + your family docs. No `tools/generate-*`, no second lab folder, no blog/marketing work beyond this family's scope.

---

## 14. COMPLETION CHECKLIST (F20 — 5 variants)

- [ ] Gate S PASS — this family's screenshots + HTML + audit metadata mapped, `docs/BASELINE-MAP.md` written
- [ ] Gate R PASS — MD + all 10 XLSX sheets studied, `docs/REPORT-STUDY.md` written (this family's C/A/KEEP mapped)
- [ ] Gate A PASS — this family's specs mapped, `docs/API-MAP.md` written (every CTA → real endpoint)
- [ ] Gate T PASS — after Swagger + full UI requirements: ≥8 similar great design templates studied, `docs/TEMPLATE-RESEARCH.md` written
- [ ] Gate 1 PASS — 5 concept cards + sketches + difference tables, `docs/CONCEPTS.md` written
- [ ] Gate 2a PASS — V1 pilot hand-built and frozen
- [ ] Gate 2b — all 5 variants **hand-authored** (§1.3); gallery section + `manifest.json` (5 records) + `DECISIONS.md` updated; zero generator scripts
- [ ] Same token file imported by all 5; no new hues; C4 AA badges; C5 single brand; C6 tokenised cards
- [ ] Every C-item in 5/5; every P1 A-item in 5/5; P2–P3 in ≥3/5 (recorded in manifest)
- [ ] Every variant: empty + skeleton + error states; light + dark; 360–1440; keyboard-clean; reduced-motion; no-JS content reachable
- [ ] Gate 3 PASS — acceptance checklist applied ×5, 0 blockers, `docs/DELIVERY-REPORT.md` with 1 family winner
- [ ] Reported: file paths, `python3 -m http.server 8130` run command, verification + limitations

### Operator shortcuts

- **Colour drift:** "Restore tokens from §5 in every variant — one scheme, no new hues."
- **Fake variety:** "F20-V3 fails the Difference Test vs V1 — change geometry or narrative (axis A/C), not colour."
- **No manual craft:** "Gate 2 FAIL — a generator script exists. Delete it and hand-rebuild."
- **Shallow study:** "Gate R/A/T FAIL — REPORT-STUDY/API-MAP/TEMPLATE-RESEARCH must quote every C/A item, endpoint mapping, and ≥8 template refs (Gate T only after Swagger + UI requirements)."
- **Dead CTA:** "Every button links to a Gate-A endpoint or is labelled demo-only in DECISIONS.md."
- **Freeze:** "F20-V1 approved — never regenerate it."

---

*End of prompt F20. Start at §3 Step 1. Print every gate block. Hand-craft all 5.*
