# Nestlancer Client Portal Lab — F02 · Auth · Register + Forgot Password — AI Agent Prompt
### Study this family's screenshots + HTML + report + Swagger → hand-craft 5 Nestlancer-grade designs · one shared colour scheme

> Paste this whole file into an agent (Arena Agent Mode, Cursor, Claude Code) with the **`ui-designing-client-dashboard`** repo open as the working directory.
>
> **Scope: ONE page family — F02 · Auth · Register + Forgot Password.** This is one of **23 independent family prompts** (F01–F23) that together replace the old master prompt: 23 families × 5 variants = **115 templates**, all sharing ONE locked colour/token scheme. This prompt builds **`client-portal-lab/families/F02-auth-register-forgot/V1…V5/`** — 5 hand-built variants of this one page — and nothing else. The other 22 families have their own prompts; never build, edit or delete theirs.
>
> **Style parents (discipline):** `example-demo-prompt/example.homepage-prompt.md` + `example-demo-prompt/example.portfolio-listing-prompt.md` (**hand-crafted only, no generators**).
>
> **Craft parents (visual bar — mandatory):** the Nestlancer homepage Top-5 and portfolio shortlist in the sibling repo (paths in §3). Auth pages must feel like those brand doors — **not** generic SaaS “centered white card + blue button.” F01’s first run failed this bar; do not repeat that failure. Portal **tokens stay §5 blue** (homepage teal is composition inspiration only — never a recolour).
>
> **Do not push, commit, create or switch a branch.**

---

## 1. YOUR ROLE

You are, at the same time:

1. **A product archaeologist.** You reconstruct the *current* register and password-reset pages exactly as it is from its screenshots + HTML + audit metadata before changing a single pixel.
2. **A research analyst.** You study the UI research report (`.md` + `.xlsx`, all 10 sheets) and can quote every Finding, CHANGE (C1–C20), ADD (A1–A15) and KEEP item that touches this family.
3. **An API analyst.** You read this family's OpenAPI specs and know which UI element maps to which endpoint, field, enum and error state.
4. **A senior UI designer + art director.** Each of the 5 variants is a *different design idea* — not 5 recolours. Same tokens, different thinking.
5. **A front-end craftsperson.** Self-contained HTML + CSS + small purposeful JS. Offline, accessible, responsive, no CDN.
6. **A harsh design critic.** You reject generic admin templates, invented features, broken links, colour-only status, and any variant that does not fix this family's report findings.

---

## 2. THE MISSION (read twice)

| Stage | Input | Output |
|---|---|---|
| **0 · Baseline lock** | this family's screenshots + HTML + `audit-metadata.json` | Screenshot↔HTML map confirmed, content frozen |
| **1 · Reports study** | report `.md` + `.xlsx` (10 sheets) | `families/F02-auth-register-forgot/docs/REPORT-STUDY.md` |
| **2 · API study** | this family's `*.openapi.json` specs | `families/F02-auth-register-forgot/docs/API-MAP.md` |
| **3 · Concepts** | stages 0–2 | `families/F02-auth-register-forgot/docs/CONCEPTS.md` — **5 concept cards**, printed **before** code |
| **4 · Build (MANUAL)** | concepts | `families/F02-auth-register-forgot/V1…V5/index.html` — **5 hand-built variants** |
| **5 · Verify** | all 5 variants @ 1440 + 390, light + dark | `families/F02-auth-register-forgot/docs/DELIVERY-REPORT.md` + gallery + manifest |

### The two most important rules in this file

**Rule 1 — SAME colour scheme, DIFFERENT designs.**
All variants across all 23 families share **ONE locked token file** (§5). A variant that introduces a new brand hue, a new status colour, or a second button style **fails**. Difference must come from *layout geometry, hierarchy, density, navigation pattern, proof/data presentation, and interaction* — never from colour. See the Difference Test (§8.2).

**Rule 2 — HAND-CRAFTED ONLY. NO GENERATOR SCRIPTS.**
You write every variant's HTML/CSS/JS **manually, one by one, by eye** — exactly like the approved `example.portfolio-listing-prompt.md` §1.3 rule. Any script that *creates or overwrites* variant HTML/CSS is forbidden. See §1.3 below. This is non-negotiable.

**Build narrow, study wide.** Read the full report + all of this family's inputs → exactly **5 variants** out. Never stub "same as V1 with different colour". Never invent portal features that are neither in the current UI nor in the report's ADD list nor in the Swagger specs.

---

## 1.3 Manual craft rule — no generators (non-negotiable)

Design and code each variant **manually**: open the files, write/adjust markup and CSS, tune spacing and states by eye.

| Allowed | Forbidden |
|---|---|
| Hand-writing / hand-editing each `client-portal-lab/families/F02-auth-register-forgot/V#/index.html` (and its CSS/JS) | Any script that **creates or overwrites** variant HTML/CSS (`node`, `python`, `*.mjs`, `*.cjs`, shell loops, Make/npm tasks that emit pages) |
| Copying **one** of your own hand-built variants once as a starting skeleton for the next variant, then **manually** redesigning it into a distinct design | "Generate all 5 variants from one template string / JSON / config" |
| Small **in-page** JS per variant for tabs, dialogs, theme, command palette, filters | A repo `tools/generate-*.mjs`, compositor, or factory that stamps out variants |
| Running **existing** repo auditors after the fact for QA only (link check, contrast) | Writing a new generator under `client-portal-lab/tools/` that builds designs |
| Hand-maintained `manifest.json` entries + the gallery's `F02` section | Auto-scaffolding that produces near-identical skins in a loop |

**Why:** mass-generated pages look samey and miss the craft. Distinctness must come from intentional design edits per variant, not from a parameter loop.

State in `client-portal-lab/DECISIONS.md` (your `F02` section): "All F02 variants were hand-authored; no design-generation script was used."

---

## 3. READ FIRST — in this order, before any design

1. **This prompt end-to-end.** Then `example-demo-prompt/example.homepage-prompt.md` and `example-demo-prompt/example.portfolio-listing-prompt.md` (discipline reference only — not the task).
2. **Craft parents (mandatory — open before Gate 1 concepts):**
   - Sibling repo `ui-designing-homepage/homepage-compositor/review/rank-list.html` → open the **Top 5** folders under `review/top50/` (user ranks #1–#5; currently dominated by `hdr-P01` + heroes **H07 Money-First** / **H01 Ground Truth**). Study composition, dual logos, Hub window chrome, mesh atmosphere, pill CTAs, IO motion + reduced-motion — **borrow geometry/presence, not homepage teal hues**.
   - Sibling repo `ui-designing-homepage/portfolio-listing-lab/` — `design-01.html` (Serpentine), `design-03.html` (Editorial Meander), `design-04.html` (Chromatic Rapids), `design-10.html` (Atelier Bend) + `assets/designs.css` / `flow-designs.css`. Study arched panels, editorial rules, route markers, restrained surfaces.
   - Optional anti-pattern: skim existing `client-portal-lab/families/F01-auth-login/V1…V5/` — what to **avoid** (mark+text logos, icon-tile, card soup, ops chrome above the form). Prefer `client-portal-prompts/F01-auth-login-FIX.md` §4 craft bar as the written standard.
3. **No repo screenshot exists for this family** (auth surface — report finding #13). The two HTML snapshots are your only *content* truth; craft parents are the *quality* truth.
4. **`nestlancer-client-pages-html/README.md`** — the file ↔ URL ↔ screenshot map. Then open this family's HTML snapshots (§4 table) + **`nestlancer-client-pages-html/audit-metadata.json`** (headings, buttons, inputs, tokens, failed requests, console errors — filter to this family's routes).
5. **`reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md`** — read in full (§1 executive findings → §7 roadmap + acceptance checklist → §8 sources).
6. **`reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx`** — open **all 10 sheets**: `1. Executive Findings · 2. Design Tokens · 3. Page Inventory · 4. Benchmark Patterns · 5. CHANGE list · 6. ADD list · 7. KEEP list · 8. Roadmap · 9. Acceptance checklist · 10. Sources`. If `.md` and `.xlsx` disagree, the `.md` wins — record the difference in your `REPORT-STUDY.md`.
7. **`backend-api-swagger/README.md`** + this family's specs: `auth.openapi.json` (register, forgot/reset) · `users.openapi.json` (profile bootstrap). Map every UI surface to its real endpoints (Gate A).
8. **Brand assets:** `client-portal-lab/assets/` must include real `logo-full-light.svg` · `logo-full-dark.svg` · `logo-mark-light.svg` · `logo-mark-dark.svg` (copy from repo-root `assets/` if missing). Never invent glyphs.
9. `git status` — never overwrite uncommitted changes. **Touch only:** `client-portal-lab/families/F02-auth-register-forgot/` + the shared-infra merge rules (§9.1). Never edit screenshots, HTML snapshots, reports, Swagger specs, example prompts — or **any other family's folder**.

---
## 4. THIS FAMILY — F02 · Auth · Register + Forgot Password

Two light-weight auth flows sharing the login's split-brand treatment: the sign-up (`00b` — exactly 7 fields: First name, Last name, Email, Password, Confirm password, the "I agree to the Terms of Service and Privacy Policy" checkbox and the "Send me product updates and announcements" marketing-consent checkbox) and the password-reset request (`00c` — one Email field + "Send reset link" + the reassurance line "Enter your email and we will send you a secure reset link.").

**Identity:**

| | |
|---|---|
| Routes | `/register` · `/forgot-password` |
| Shell | No app shell — split auth layout (brand/hero panel + form). Same blue brand as the portal (C5 fixes the teal login door). |
| Variants | **V1–V5** — each variant covers **all** states/tabs of this family (tabs switch in-page) |

**States in scope (every variant covers all of them):**

| HTML snapshot (`nestlancer-client-pages-html/`) | Route / state captured | Screenshot |
|---|---|---|
| `00b-register.html` | `/register` — Client Portal Sign-Up page (7 fields + terms) | — (auth surface) |
| `00c-forgot-password.html` | `/forgot-password` — Password Reset Request page | — (auth surface) |

**Must include (every variant):**

- Register: the **7-field signup** (5 inputs + terms checkbox + marketing-consent checkbox — locked field set from `00b`)
- Forgot: the **1-field reset request** (Email + "Send reset link") with the reassurance line **"Enter your email and we will send you a secure reset link."** and the "Remembered it? Sign in" recovery link
- **Both flows in every variant** (tabbed, stacked, or linked — designer's choice; both reachable)
- Validation, loading and success states for both flows
- Links back to login; password rules/help surfaced honestly
- **Real Nestlancer full logos** light + dark (`logo-full-*.svg`, aspect ≈ 3.63∶1, width+height set, theme swap) — mark-only + typed “Nestlancer” is a craft FAIL
- **One first-viewport composition** (brand hero-level + title + short lead/honesty + one primary CTA cluster + ≤1 dominant visual plane) — see §5.4

**Content lock (same story, upgraded hierarchy):** Freeze from `00b` + `00c`: the 7 signup fields (First name / Last name / Email / Password / Confirm password / "I agree to the Terms of Service and Privacy Policy" / "Send me product updates and announcements"), H1 "Sign up", hero "Your delivery OS — from brief to payout"; the reset field + "Send reset link" + "Enter your email and we will send you a secure reset link." + "Remembered it? Sign in" — exemplary microcopy, keep it.

**Cross-cutting states (every variant):** light + dark theme · 375px mobile card-fallback for tables · empty state · loading skeleton · error state w/ retry.

---

## 5. BRAND SYSTEM — locked (the ONE scheme shared by all 23 families)

### 5.1 The consolidation decision (from report §3.2 + C5)

The live app ships **three palettes** (portal blue `--ta-brand-*`, violet `--accent-1`, auth teal). The lab ships **ONE**:

- **Brand = `--ta-brand-*` blue ramp** becomes *the* `--primary`. Violet `--accent-1` is **deleted** except as focus-ring token if needed (document it in `DECISIONS.md`).
- **Auth pages (this family) use the same blue** — the discrepancy is fixed, not preserved.
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

### 5.4 Nestlancer craft bar (auth must match Top-5 / portfolio quality)

**One-liner:** Auth pages must read as Nestlancer Top-5 / portfolio craft (dual full logos, one composition, Hub/mesh/editorial geometry, intentional IO motion + reduced-motion) — **never** as a generic centered SaaS card. Tokens stay §5 blue.

#### Must

1. **Full logos** — `logo-full-light.svg` / `logo-full-dark.svg` with theme swap. Aspect ≈ 3.63∶1. Mark OK only as a tiny companion, never as mark + typed wordmark.
2. **One composition** — first viewport = brand (hero-level) + one title + one short lead + one primary CTA group + ≤1 dominant surface plane (split panel / Hub window / mesh field / arched panel / route rail). Cover the chrome: the page must still read Nestlancer.
3. **Restrained surfaces** — ≤1 elevated card for the active form. No card soup (form card + feature cards + bento + timeline as equal boxes). Cards only when interaction needs a container.
4. **Form craft** — labels above fields; body 14–16px; inputs ≥44px; one primary CTA; secondary links calm (Sign in / Forgot). No floating Material labels; no placeholder-only fields; no decorative icon-tile above the H1.
5. **Signature motion** — each variant ships **2–3 intentional beats** (IO field stagger, Hub progress fill, live-dot ping, path draw, underline-draw, step reveal). Full `prefers-reduced-motion` path. Theme boot before paint (`?theme=`).
6. **Atmosphere without hue drift** — soft mesh / `color-mix` radials / band fields using **only** §5 tokens. Dark = 3-step ramp (`--background` / `--card` / `--muted`), not flat void / pure black / homepage teal band paste.
7. **Both flows reachable** without burying register behind forgot or vice versa; success states are designed (what happens next), not a bare toast.

#### Must-not (instant FAIL)

- Centered white card + purple/indigo gradient blob (AI-SaaS default)
- Logo as 24px nav crumb; brand name only in `<title>`
- Glass over dense form text; neon glow; particle / marquee noise beside fields
- Pill / chip clusters competing with the primary CTA
- OAuth walls that demote Nestlancer
- CDN fonts / frameworks / emoji / invented logos / second brand hue
- Copying F01’s weak patterns (mark+text, icon-tile, ops tabs above the form, triple proof rails)

#### Borrowable patterns → F02 (geometry only)

| Parent | Register / Forgot translation |
|---|---|
| **H07 Money-First split** | Split ~`.98fr/1.02fr`: brand + live pill one side; Hub window (dots + mono title + progress) holds the active form |
| **H01 Ground Truth + quiet meridian** | Soft dual mesh radials; centered max-~420–480px form on a calm field; underline-draw on title accent |
| **Portfolio 03 Editorial Meander** | Serif-or-display H1 optional *within Outfit stack* (no new font CDN); ink hairline; arched panel + hard offset shadow for the form |
| **C03-style orbit reassurance** | 3–4 mono reassurance nodes around submit (encrypted session · reset link · Terms · support) — diagram, not icon-row spam |
| **Portfolio 01 Serpentine** | Quiet vertical route: Account → Verify → Portal (register) or Email → Link → Sign in (forgot) — markers + hairline, not three card systems |
| **Portfolio 10 Atelier Bend** | Warm atmosphere via brand/muted `color-mix`; arched form shell; serif italic only if local |

Print in Gate 1 CONCEPTS: which craft parent each V# borrows + how §5.4 Must items are met.

---

## 6. WHAT TO CHANGE / ADD / KEEP — F02 scope (bound to the report — not your invention)

### CHANGE — implement every item in **all 5 variants** (the fix may *look* different per variant but must be *present* in each)

- **C5+** — **Fix the auth palette.** Auth pages use the same blue ramp as the rest of the lab (no teal, no violet). *(report finding #4, C5)*
- **C4** — **Fix badge contrast.** Live status badges measure **1.73–3.23:1** (AA needs 4.5:1 for 12px text). Use the darkened AA-safe text tokens (`--status-*-text`, §5.2) on the tinted backgrounds. Badges = icon + colour + text — never colour alone. *(report §6.1, finding #3)*
- **C5** — **Consolidate to one brand ramp.** `--ta-brand-*` blue becomes *the* `--primary`; the violet `--accent-1` (250 100% 52%) is deleted (focus-ring use only, documented). If this page currently renders violet or teal accents, it renders blue now. *(report §6.1, finding #4)*
- **C6** — **Tokenise cards.** No raw `bg-white` / `gray-200/80` / hard-coded hex card borders — every surface uses `--card` / `--border` / `--shadow-xs`. *(report §6.1, finding #12)*
- **C18** — **Increase the type scale.** H1 display 32–40px + money hero 32–40px `tabular-nums`; the current 24px H1 makes the portal read like an internal tool. *(report §6.1)*

### ADD — with priority + coverage

*(No numbered A-items target this family. Family must-include ADDs, if any, are listed in §4 — they remain mandatory. Never invent additions beyond the report's ADD list and the master inventory.)*

**Coverage rules:** P1 A-items are mandatory in **all 5 variants**; P2–P3 A-items are mandatory in **≥3 of 5** — record per-variant coverage in `manifest.json`. Family must-include ADDs are mandatory in all 5.

### KEEP — present in every variant

- **Graceful wording** — the reset reassurance line ("Enter your email and we will send you a secure reset link.") is a KEEP exemplar (the old master called this the "what happens next" copy). *(report §6.3)*
- **The shadcn-style token architecture.** *(report §6.3)*

---

## 7. GATES — do them in order, print each gate block, stop on FAIL

### Gate S — Screenshot + HTML baseline (before anything else)

1. Open this family's screenshots + HTML snapshots + `audit-metadata.json` (filter `failedRequests` / `consoleErrors` to this family's routes).
2. Build the map: routes, HTML files, screenshots, H1/H2s, buttons, inputs, tables, tokens observed, failed requests / console errors.
3. Freeze the family's content truth (labels, figures, copy). Anything unverifiable = **not verified**, never invented.
4. Write `client-portal-lab/families/F02-auth-register-forgot/docs/BASELINE-MAP.md` (this family's map — your Gate S output).

```
## GATE S (F02)
Screenshots opened: <n>/<n> · HTML opened: <n>/<n> · audit-metadata read: YES
Routes mapped: <list> · Content frozen: YES
Gate: PASS / FAIL
```

### Gate R — Reports study (the redesign brief)

1. Read the `.md` report cover-to-cover; open all 10 `.xlsx` sheets.
2. Write `docs/REPORT-STUDY.md` (inside your family folder) containing: the executive findings that touch this page (quoted) · the full token table · this family's page-inventory rows · benchmark patterns you will apply (cite which of the 13 sources) · **this family's C-items with full specifics** · **A-items with priority** · the KEEP list · the roadmap phases that touch this family · the acceptance checklist copied as your QA list.

```
## GATE R (F02)
MD read: YES · XLSX sheets: 10/10 · C-items mapped: <n>/<n> · A-items mapped: <n>/<n>
KEEP listed: YES · Checklist copied: YES
Gate: PASS / FAIL
```

### Gate A — Swagger / API study (features must be REAL)

1. Read this family's specs: `auth.openapi.json` (register, forgot/reset) · `users.openapi.json` (profile bootstrap).
2. Write `docs/API-MAP.md` (inside your family folder): a table of UI element → method + path → key request/response fields + enums → loading/empty/error/success states you will design.
3. Every CTA in every variant must resolve to a real endpoint from this map or be explicitly labelled a **demo affordance** in `DECISIONS.md`. No dead buttons, no `href="#"`.

```
## GATE A (F02)
Specs read: <n>/<n> · Endpoints mapped: <n> · Demo-only CTAs listed: <n>
Gate: PASS / FAIL
```

Do not draw a single concept until S + R + A all PASS.

---

## 8. CONCEPTS — 5 cards, printed BEFORE code

### 8.1 Concept Card template (5 cards in your `docs/CONCEPTS.md`)

```
F02 · Auth · Register + Forgot Password · V# "<name your idea>"
Keeps (Gate S content): <locked labels / figures / CTAs>
Fixes/Adds: C# (…) · A# (…)
Differs on axes: A(layout) + C(narrative) + E(motion) — see §8.2
Layout sketch: [ASCII sketch of the geometry]
Signature interaction: <the one memorable behaviour>
API basis: <endpoints from your API-MAP>
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

### 8.3 Roster guidance (craft-named — keep 5 · same §5 tokens)

| Variant | Name (adapt freely) | Geometry + craft parent |
|---|---|---|
| V1 | **Hub Gate** | Split ~`.98/1.02`: brand + live pill left; Hub window right holds **register** (forgot via in-Hub tab or calm secondary) — H07 twin |
| V2 | **Ground Meridian** | Full soft mesh field; centered elevated form card; register/forgot as quiet segmented control — H01 + C01 calm |
| V3 | **Editorial Ledger** | Editorial rules + arched/offset form panel; register primary, forgot as linked quiet state — Portfolio 03 |
| V4 | **Orbit Credential** | Narrow dense nucleus; 3–4 mono reassurance nodes around submit; both flows via compact switcher — C03 orbit (no pill spam) |
| V5 | **Route & Ribbon** | Vertical serpentine markers (Account→Verify→Portal / Email→Link→Sign-in) + arched form on a warm `color-mix` field — Portfolio 01 + 10 |

Every concept card must cite: craft parent · logo treatment (full light/dark) · first-viewport composition · signature motion (≤3 beats) · how both flows are reached.

Rename freely — still **5 variants**, still locked content + tokens + §5.4 craft bar.

---

## 9. BUILD (manual, one by one)

### 9.1 Output layout

```
client-portal-lab/
  index.html                  ← gallery: create if missing; otherwise add/replace ONLY the F02 section
  assets/                     ← REAL Nestlancer logos: logo-full-{light,dark}.svg + logo-mark-{light,dark}.svg (+ favicon) — copy from repo-root assets/ if missing; never invent / recolour / stretch
  shared/
    tokens.css                ← §5 tokens ONLY — create with EXACTLY the §5.2 CSS if missing; if present, import AS-IS (never edit, never fork)
    base.css                  ← reset + primitives ONLY — same create-if-missing rule
  families/
    F02-auth-register-forgot/
      V1/index.html … V5/index.html   ← the 5 variants (each may carry its own style.css beside it)
      docs/
        BASELINE-MAP.md       ← Gate S output (this family only)
        REPORT-STUDY.md       ← Gate R output
        API-MAP.md            ← Gate A output
        CONCEPTS.md           ← 5 concept cards
        DELIVERY-REPORT.md    ← Gate 3 output + 1 family winner
  manifest.json               ← merge: add/replace this family's 5 records; never delete other families' records
  DECISIONS.md                ← append/extend ONLY your F02 section (hand-authorship attestation + demo-CTA list + A-item coverage)
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

**This family's primary components:** forms (7-field + 1-field, validation, terms checkbox), buttons, reassurance panel, links

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

**Gate 1 — concepts review (before build).** 5 concept cards in your `docs/CONCEPTS.md`, each per §8.1 with ASCII sketch + axes + API refs + dark/mobile notes + **craft parent + §5.4 composition plan**.

- **Table 1:** `variant | keeps | fixes (C#) | adds (A#) | axes | craft parent | signature motion | API endpoints`
- **Table 2 — distinctness:** 5 rows × axes A–E. FAIL if any two siblings share A+C, or differ by colour only.
- **Table 3 — coverage:** every C-item present in 5/5; every P1 A-item 5/5; P2–P3 ≥3/5.
- **Table 4 — craft bar:** `variant | full logos Y/N | first-viewport composition (1 line) | surfaces (≤1 form card?) | motion beats (≤3) | both flows reach`

```
## GATE 1 (F02)
Concept cards: 5/5 · Sketches: 5/5 · Difference test: PASS/FAIL
Craft parents cited: 5/5 · §5.4 plan: YES/NO
C coverage 5/5: YES/NO · P1 A coverage 5/5: YES/NO · P2-P3 ≥3/5: YES/NO
Gate: PASS / FAIL
```

**Gate 2a — Pilot (hand-built).** Build **V1** fully: all states/tabs, both themes, 5 widths, keyboard end-to-end. Do not proceed until it passes §5/§9/§10.

**Gate 2b — Full build (hand-built, one by one).** Build V2–V5, each hand-authored and self-critiqued. Then update the gallery's `F02` section + `manifest.json` (5 records) + `DECISIONS.md`.

**Gate 3 — Verify and critique.**

- Confirm §1.3: no design-generation scripts; `DECISIONS.md` attests hand-authorship.
- Anti-drift checks (manual): identical-skin side-by-side (fail if 2 siblings near-identical) · remote-URL check (no `http(s)` assets/fonts/scripts) · dead-link check (no `href="#"`) · token check (only §5 colours/radii/spacing) · scope check (only `families/F02-auth-register-forgot/` + shared-infra merges + family docs) · C/A coverage check from manifest.
- **Craft bar check (§5.4):** full logos light/dark ×5 · one first-viewport composition ×5 · no card soup · no icon-tile · signature motion visible + reduced-motion ×5 · side-by-side vs Top-5/portfolio still feels Nestlancer (not generic SaaS). FAIL the gate if any variant fails §5.4 Must.
- Exercise every interaction in every variant: register ↔ forgot switch, validation, loading, success, theme, reduced-motion, no-JS fallback (content + links reachable), rapid-click races.
- Inspect at 360/390/768/1024/1440, light + dark, **if a browser is available**. If not, say so explicitly and do not claim screenshot QA.
- Apply the report's acceptance checklist (§7.1 of the report — hierarchy <2s, KPI grammar, table completeness, nav ≤9, colour AA, type scale, dark parity, keyboard, empty/loading/error, mobile, performance, legal) to each variant. Classify findings **blocker · major · minor**. No blocker open at hand-off.
- Write `docs/DELIVERY-REPORT.md` (in your family folder): file paths, run command, craft parents studied, per-variant verification + craft notes, and **1 family winner recommendation + why**.

```
## GATE 3 (F02)
Variants built by hand: 5/5 · Generator scripts: 0
Craft bar §5.4: PASS/FAIL · Widths×themes checked: <…> · Checklist pass: <…>/5 · Blockers open: 0
Gate: PASS / FAIL
```

---

## 13. HARD CONSTRAINTS

- **Do not** push, commit, create/switch/rename a branch.
- **Do not** modify screenshots, HTML snapshots, reports, Swagger specs, example prompts — or **any other family's folder** (`families/F##-…` that is not yours).
- **Do not** create templates with a generator script (`*.mjs`/Node/Python/shell-loop/compositor/factory). Hand-author every variant (§1.3).
- **Do not** introduce colours outside §5. Same scheme as the other 22 families. Phase/status hues stay inside the token file. **Do not** paste homepage teal / mint band as a second brand — craft parents teach composition, not a hue swap.
- **Do not** ship 5 recolours of one layout — the Difference Test (§8.2) is a gate, not guidance.
- **Do not** invent portal features, clients, numbers, testimonials, or case metrics. Features come from Gate S current-UI + Gate R ADD list + Gate A Swagger — nothing else.
- **Do not** drop KEEP items, trust strips, honesty notes, or legal/dispute routes.
- **Do not** ship remote/expiring media, broken routes, `href="#"` destinations, external CDNs, font services, or chart libraries.
- **Do not** present research you did not open; unopened = not verified. Do not claim browser QA you did not run. Craft parents unopened = Gate 1 FAIL.
- **Do not** ship generic SaaS auth (mark+text logo, icon-tile, centered white card as the whole idea, card soup, pill spam) — §5.4 Must-not is a gate.
- **Do not** build outside `client-portal-lab/families/F02-auth-register-forgot/` + the shared-infra merge rules (§9.1) + your family docs. No `tools/generate-*`, no second lab folder, no blog/marketing work beyond this family's scope.

---

## 14. COMPLETION CHECKLIST (F02 — 5 variants)

- [ ] Gate S PASS — this family's screenshots + HTML + audit metadata mapped, `docs/BASELINE-MAP.md` written
- [ ] Gate R PASS — MD + all 10 XLSX sheets studied, `docs/REPORT-STUDY.md` written (this family's C/A/KEEP mapped)
- [ ] Gate A PASS — this family's specs mapped, `docs/API-MAP.md` written (every CTA → real endpoint)
- [ ] Craft parents opened — Top-5 homes + portfolio 01/03/04/10 studied before concepts
- [ ] Gate 1 PASS — 5 concept cards + sketches + difference tables + craft-bar table, `docs/CONCEPTS.md` written
- [ ] Gate 2a PASS — V1 pilot hand-built and frozen (full logos + one composition + both flows)
- [ ] Gate 2b — all 5 variants **hand-authored** (§1.3); gallery section + `manifest.json` (5 records) + `DECISIONS.md` updated; zero generator scripts
- [ ] Same token file imported by all 5; no new hues; C4 AA badges; C5 single brand; C6 tokenised cards
- [ ] §5.4 craft bar PASS ×5 — full logos · one composition · restrained surfaces · ≤3 motion beats · no generic SaaS tells
- [ ] Every C-item in 5/5; every P1 A-item in 5/5; P2–P3 in ≥3/5 (recorded in manifest)
- [ ] Every variant: register + forgot reachable; empty + skeleton + error + success; light + dark; 360–1440; keyboard-clean; reduced-motion; no-JS content reachable
- [ ] Gate 3 PASS — acceptance + craft bar applied ×5, 0 blockers, `docs/DELIVERY-REPORT.md` with craft parents + 1 family winner
- [ ] Reported: file paths, `python3 -m http.server 8130` run command, verification + limitations

### Operator shortcuts

- **Colour drift:** "Restore tokens from §5 in every variant — one scheme, no new hues. Homepage teal is not a portal token."
- **Still generic:** "Fails §5.4 — full logos + one composition; kill card soup / icon-tile / centered-card-only."
- **Fake variety:** "F02-V3 fails the Difference Test vs V1 — change geometry or narrative (axis A/C), not colour."
- **No manual craft:** "Gate 2 FAIL — a generator script exists. Delete it and hand-rebuild."
- **Shallow study:** "Gate R/A FAIL — REPORT-STUDY/API-MAP must quote every C/A item and endpoint mapping. Craft parents unopened = Gate 1 FAIL."
- **Dead CTA:** "Every button links to a Gate-A endpoint or is labelled demo-only in DECISIONS.md."
- **Freeze:** "F02-V1 approved — never regenerate it."

---

*End of prompt F02. Start at §3 Step 1. Print every gate block. Hand-craft all 5 to the Nestlancer craft bar.*
