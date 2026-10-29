# Nestlancer Client Portal — **ENTERPRISE UPGRADE PROMPT v2**

### 24 page families × 3 hand-built variants = **72 templates** · "Quiet Authority" design language · Instrument Sans + IBM Plex Mono · jade accent · full enterprise credibility layer · screenshot-proven

> **Paste this whole file into an agent (Arena Agent Mode / Cursor / Claude Code) with the `ui-designing-client-dashboard` repo as the working directory.**
>
> **What this is:** the v2 rebuild of `client-portal-lab/` for a **top-100 global technology company** client. v1 was built believing the client was mid-size; it optimised *hierarchy + accessibility + one token system*, and it succeeded at those. v2 must clear a Fortune-100 procurement bar: **craft finish first, then enterprise credibility, then proof.**
>
> **Non-negotiables:** hand-authored only · zero external network requests · no client impersonation · no fake certifications · every state real or honestly labelled.

---

## 0 · ANSWER LOCK — decisions already made (do not re-litigate)

Derived from `ENTERPRISE-UPGRADE-QUESTIONNAIRE.md` + `ENTERPRISE-UPGRADE-ANSWERS.md`. These are binding.

| Q | Decision | Effect on this build |
|---|---|---|
| Q01 | **D** Nestlancer brand, enterprise-calibrated | Our product, raised to their bar. No client logo/colour/font mimicry anywhere. |
| Q02 | **B** Async self-serve gallery — client clicks alone | Every page must explain itself without a narrator: rationale panel + annotation layer. |
| Q03 | **A** "Looks like a startup's internal tool" | **Gate 1 = craft finish.** Typography, spacing, optical alignment, restraint. |
| Q04 | **A, E** Financial-grade precision + consumer-grade polish | Ledger alignment, tabular figures, exact money states + Stripe/Linear-level finish and motion. |
| Q05 | **Derive from nestlancer.com** (§5, extracted live) | Instrument Sans + IBM Plex Mono + jade `#0D9488`. This *replaces* v1's Outfit + `#465fff` blue. |
| Q06 | **A primary (Stripe/Mercury), B stretch (Linear)** | Precision restraint as the floor; keyboard-first density as the ceiling. |
| Q07 | **B** Two densities, user-toggleable | Comfortable (default) + Compact (ops). Toggle persists; both verified. |
| Q08 | **B** (Inter/Geist + Plex Mono intent) → resolved by Q05 to **Instrument Sans + IBM Plex Mono** | Same intent (neutral enterprise grotesque + mono metadata), real brand face. |
| Q09 | **A** Quiet authority | Hairlines, near-invisible shadows, one accent, confidence via space + type. |
| Q10 | **B** Enterprise neutral core + one restrained accent | Ink/graphite neutrals, jade accent, status hues for state only. No second brand hue. |
| Q11 | **B** Full dark parity, verified per variant | Dark is designed, not inverted. |
| Q12 | **B** Functional + 3–4 signature moments | Count-up money, timeline draw, drawer spring, crossfade preview. |
| Q13 | **A** One custom-drawn icon set, no illustration | 24 px optical grid, 1.5 px stroke, drawn for this lab only. |
| Q14 | **A–H, all eight** enterprise signals | Subject to §7 reality check — see the honest re-interpretation below. |
| Q15 | **A** "Most endpoints exist" | **Verified against the 17 specs — this is partly wrong.** See §7.2 verified map before designing anything. |
| Q16 | **B** No compliance badges; "documents available on request" | Zero SOC2/ISO/FedRAMP/uptime claims. Ever. |
| Q17 | **Client-only portal, one business per account** | ⚠ **No org switcher, no seats, no invited colleagues.** Admin/ops live in a separate app. §7.1 re-defines signal A accordingly. |
| Q18 | **A** Keep frozen audit content; request volume unbounded | Lists assume pagination + indefinite growth; no "26 total"-style fixed assumptions. |
| Q19 | **A** Add Reporting/Insights as **F24** | Built only on the four real `/stats` endpoints; trends are PROPOSED. |
| Q20/21 | **User ruling: 3 variants per family** | 24 families × 3 = **72 templates**. V1 = flagship candidate, V2 + V3 = genuine challengers. |
| Q22 | **B** New parallel tree `client-portal-lab-v2/` | v1 stays untouched for before/after evidence. |
| Q23 | **A** Add F01 Login, F02 Register+Forgot, F23 Explore | Plus F24 Reporting. |
| Q24 | **B** 375 / 768 / 1024 / 1280 / 1440 / 1920 + ultrawide | Six breakpoints, per-variant proof. |
| Q25 | **B** WCAG 2.2 AA + documented AAA body text + full keyboard + landmarks + reduced motion | Measured from rendered pixels, not from CSS values. |
| Q26 | **A** Vanilla HTML + CSS + small JS, fully offline | No framework, no build step, no CDN. |
| Q27 | **B** CDN fonts allowed → resolved to **self-hosted, data-URI-embedded** | Real typefaces, zero network requests. Best of both. |
| Q28 | **A, B, D** tokens.json + CSS map, component inventory with states, per-page dev checklist | Plus the Tailwind mapping table (C) — cheap and decisive for the dev team. |
| Q29 | **A** Hand-authored only, provenance in `DECISIONS.md` | No generator scripts, no shared kit megatemplate. |
| Q30 | **B** Real headless-Chromium screenshots, contrast from pixels, axe-core, before/after pairs | **This is v1's biggest credibility hole — closed.** |
| Q31 | **B** Pages + `RATIONALE.md` per family + annotated screenshots | Why each decision, and what in v1 failed. |
| Q32 | **A** One master prompt file — this one | Self-contained. |
| Q33 | **B** Two gated passes | Pass 1: tokens + F03 + F09 → stop for human approval. Pass 2: the remaining 22. |
| Q34 | **B** Curated gallery + before/after slider + rationale panels | The "we heard you" artefact. |
| Q35 | **B** Quiet re-set — one acknowledging line, then evidence | No apology theatre, no self-flagellation. |
| Q36 | **B** Precise, calm, confident | Short sentences. No exclamation marks. No marketing adjectives. |

---

## 1 · YOUR ROLE

You are simultaneously:

1. **A brand archaeologist** — you extract Nestlancer's real type/colour/elevation system from `nestlancer.com` (§5 has it already, verified) and never invent a second one.
2. **A Fortune-100 design reviewer's simulator** — before you call anything done, you ask: *would a design-system lead at a top-100 tech company file a ticket on this?* If yes, fix it.
3. **A product archaeologist** — reconstruct v1's frozen content and IA for all 24 families before changing a pixel.
4. **An API realist** — you read all 17 OpenAPI specs and you **classify every enterprise signal as REAL / PARTIAL / DEMO / PROPOSED** (§7.2). You never design a control whose data cannot exist.
5. **A senior UI designer + art director** — three genuinely different design ideas per family, one shared token system.
6. **A front-end craftsperson** — self-contained HTML/CSS/JS, offline, accessible, six breakpoints.
7. **A harsh critic with a camera** — you screenshot everything with headless Chromium and judge the pixels, not the source.

---

## 2 · THE MISSION

| Stage | Input | Output |
|---|---|---|
| **0 · Baseline lock** | v1 lab (72→100 variants), 45 screenshots, 55 HTML snapshots, `audit-metadata.json` | Confirmed content truth per family |
| **1 · Reports + API study** | Research report (`.md` + 10 sheets), 17 OpenAPI specs | `docs/REPORT-STUDY.md`, `docs/API-MAP.md` with REAL/PARTIAL/DEMO/PROPOSED ledger |
| **2 · Craft critique of v1** | Screenshots of v1 that **you take yourself** | `docs/V1-CRITIQUE.md` — a numbered defect list |
| **3 · Brand + token system** | §5 + live site extraction | `tokens.json` → `tokens.css`, density system, type scale, motion |
| **4 · Reference research** | After 0–3 | `docs/TEMPLATE-RESEARCH.md` |
| **5 · Concepts** | Stages 0–4 | `docs/CONCEPTS.md` — 72 concept cards printed before code |
| **6 · Build (manual)** | Concepts | `client-portal-lab-v2/families/F##-*/V#/index.html` |
| **7 · Verify (pixels)** | All 72 at 6 widths × 2 themes | `docs/VERIFICATION.md`, screenshots, axe, contrast, before/after pairs |
| **8 · Curate** | Everything | Gallery with before/after slider + rationale panels + handoff pack |

### The three rules that govern everything

**Rule 1 — Craft before features.** Q03-A is why we are here. A page with perfect state coverage that has a 23 px optical misalignment in its KPI row, three duplicate primary CTAs, or a number set in the wrong weight has failed. The v1 screenshot below is the class of defect you must eliminate, not reproduce:

```
v1 F03 V1, as rendered — the tell-tales:
 · "Complete checkout" appears THREE times in one viewport (hero CTA, banner, KPI card)
 · Three KPI cards carry one line of text each and ~180 px of dead white space
 · Only one of four KPI numbers is set in mono/tabular; the other three float
 · Sidebar has no account context, no active-work indicator, no density control
 · Left KPI card has a coloured rail; its three siblings do not — asymmetry by accident
 · The pipeline bars all read 62/48/70/… with no axis, no dates, no baseline
```
Every one of these becomes a numbered defect in `docs/V1-CRITIQUE.md` and a checklist item for v2.

**Rule 2 — Enterprise is honesty, not badges.** Fortune-100 reviewers are professionally trained to find the thing that isn't real. A fake uptime figure, an invented SOC 2 badge, a "role" dropdown with no backend, an org switcher for a product that has no orgs — each one costs more trust than the whole design earns. **REAL > labelled PROPOSED > nothing.** Never the third option disguised as the first.

**Rule 3 — Hand-crafted only, one variant at a time.** No generator scripts, no shared component megatemplate, no loop emitting pages. (v1 §1.3 rule, carried forward — Q29-A.) You may copy one of your own hand-built variants once as a skeleton, then redesign it manually.

---

## 3 · READ FIRST — in this order

1. **This file, end to end.** Then `client-portal-prompt.md` (v1) — as *context*, not as a spec. Its §5 token table is now superseded by §5 here.
2. **`ENTERPRISE-UPGRADE-QUESTIONNAIRE.md`** and **`ENTERPRISE-UPGRADE-ANSWERS.md`** — the decision record behind §0.
3. **`client-portal-lab/`** — all 100 v1 variants' `index.html`, `shared/tokens.css`, `shared/base.css`, `DECISIONS.md`, `manifest.json`. You are upgrading this, so know it precisely.
4. **`Nestlancer-clients-screenshots/clients/*.webp` (45)** — the production baseline.
5. **`nestlancer-client-pages-html/`** — 55 snapshots + `audit-metadata.json` + `README.md` (file↔URL↔screenshot map).
6. **`reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md`** + the 10-sheet `.xlsx`.
7. **`backend-api-swagger/README.md` + all 17 `*.openapi.json`.** Build §7.2's ledger from the specs — not from this prompt's summary, which is a starting point you must verify line by line.
8. **`nestlancer.com`** — the brand source. §5 below is already extracted and verified (fonts: Instrument Sans variable, IBM Plex Mono; accent: jade `hsl(175 84% 26%)` ≈ `#0D9488`; neutrals: slate ramp; elevation: `0 0 0 1px #e7eaef`, `0 20px 50px rgba(10,38,66,.08)`).
9. `git status` — never overwrite uncommitted work.

**Write only inside:** `client-portal-lab-v2/` and `docs/`. Never touch `client-portal-lab/`, screenshots, HTML snapshots, reports, or Swagger specs. Never commit, push, or switch branches.

---

## 4 · GATES — in order. Print each block. Stop on FAIL.

### Gate 0 — Evidence environment (do this before anything else)

Real screenshots are mandatory (Q30-B). In a fresh sandbox, Chromium needs system libraries that are **not** persisted between sessions:

```bash
# one-time per session; ~4 s. Verify before proceeding.
sudo -n apt-get install -y -q libnspr4 libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 \
  libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 \
  libpango-1.0-0 libcairo2 libasound2
pip install -q playwright brotli && python3 -m playwright install chromium-headless-shell
python3 -c "from playwright.sync_api import sync_playwright as s; b=s().start().chromium.launch(); print('chromium OK'); b.close()"
```

If Chromium cannot run, **STOP and report** — do not silently fall back to jsdom-only verification like v1 did.

```
## GATE 0
Chromium launch: OK/FAIL · Screenshot written: YES/NO · axe-core available: YES/NO
Gate: PASS / FAIL
```

### Gate 1 — v1 craft critique (take your own screenshots)

1. Screenshot **every v1 variant** you can reach at 1440 light + 390 dark.
2. Write `docs/V1-CRITIQUE.md`: numbered defects **D-01…D-nn**, each with family, variant, screenshot crop reference, and the *design principle* violated (optical alignment · duplication · hierarchy · rhythm · typographic scale · density · state honesty · accessibility · motion restraint).
3. Rank by what a Fortune-100 reviewer notices **in the first 10 seconds**.
4. This file is the v2 acceptance baseline: **every v2 variant must be free of the defect classes that apply to its family.**

```
## GATE 1
v1 variants screenshotted: n/n · Defects logged: n · Top-10 ranked: YES · V1-CRITIQUE.md: YES
Gate: PASS / FAIL
```

### Gate 2 — Reports + API reality study

1. Read the `.md` report and all 10 `.xlsx` sheets → `docs/REPORT-STUDY.md` (13 findings, C1–C20, A1–A15, KEEP, roadmap, acceptance checklist).
2. Read all 17 specs → `docs/API-MAP.md`, and for **every one of the eight enterprise signals A–H** record: signal → real endpoint(s) → fields/enums → classification (**REAL / PARTIAL / DEMO / PROPOSED**) → exact UI treatment permitted.
3. The classification decides the design. PARTIAL and DEMO get a visible, calm label (see §7.4). PROPOSED appears only in a clearly-marked roadmap context or not at all.

```
## GATE 2
Report read: MD + XLSX 10/10 · Specs read: 17/17 · Enterprise signals classified: 8/8
REAL: n · PARTIAL: n · DEMO: n · PROPOSED: n · API-MAP.md: YES
Gate: PASS / FAIL
```

### Gate 3 — Brand + token system (produces the design language)

1. Verify §5's extraction against the live site and the vendored fonts.
2. Write `client-portal-lab-v2/shared/tokens.json` (single source of truth) and generate `tokens.css` **by hand** from it — the CSS file is hand-maintained, `tokens.json` is the documentation artefact.
3. Define: neutral ramp, jade accent ramp, status triples with AAA body text, six-step type scale, spacing scale (4 px base), radii (2/6/10/16), elevation (hairline-first), motion tokens, density tokens (comfortable/compact), shell metrics for all six breakpoints.
4. Embed fonts as base64 data URIs in `shared/fonts.css` — Instrument Sans variable + IBM Plex Mono 400/500/600, subset if possible, total budget ≤ 200 KB.
5. Contrast-test every pair from **rendered pixels** (screenshot a swatch page, sample colours).

```
## GATE 3
tokens.json: YES · tokens.css hand-maintained: YES · Fonts embedded: YES (size: KB)
Contrast pairs AA: n/n · AAA body: YES · Density tokens: 2 · Breakpoints: 6
Gate: PASS / FAIL
```

### Gate 4 — Reference research (after 0–3 only)

Order is mandatory. You must be able to state each family's complete UI requirements before searching.

1. Study **≥8 references per family** (or a shared pool ≥8 with an explicit per-family pattern map) across: Stripe Dashboard, Mercury, Linear, Ramp, Vercel, GitHub Enterprise, Notion, Rippling, Framer, Attio, Basis, Retool customer portals, IBM Carbon, Polaris.
2. For each: cite URL + the **layout / hierarchy / density / interaction** pattern taken. **Never** take brand colour, logo, typeface, or a feature.
3. Cross-check every pattern against Gate 2. Not real and not a report ADD → inspiration only or drop.
4. Write `docs/TEMPLATE-RESEARCH.md`.

```
## GATE 4
Families researched: 24/24 · Refs: ≥8 each (or mapped pool) · Order 0→1→2→3→4 respected: YES
Invented features: 0 · TEMPLATE-RESEARCH.md: YES
Gate: PASS / FAIL
```

### Gate 5 — Concepts (72 cards, printed before any code)

#### 5.1 Concept card format

```
F09 · Project Details · V2 "Delivery Ledger"
Content lock: header + %, 6 tabs, 9-stage timeline, milestones ×n, deliverables ×n, files ×n (v1 frozen + Gate 2 API states)
Enterprise signals: C (audit rail — REAL, /users/activity + status-history) · E (health line — REAL, /health) · G (export — PARTIAL)
Craft risks from V1-CRITIQUE: D-04 duplicate CTA, D-11 uneven card heights
Differs on axes: A (layout) + C (narrative) + E (interaction)  → §5.2
Layout sketch: [ASCII]
Signature interaction: timeline draw on scroll + audit rail cross-highlight
API basis: GET /api/v1/projects/{id}, /timeline, /milestones, /deliverables, /progress
Density: compact default (ops page) · Themes: light+dark · Breakpoints: 6
Rejected alternative: gauge-led hero (too dashboard-y for a delivery page)
```

#### 5.2 Difference test — colour is not an axis

Each variant must differ from its two siblings on **≥3 of 5 axes**, one of which must be **A** or **C**:

| Axis | Options |
|---|---|
| **A · Layout geometry** | single ledger · sticky rail + content · 3-pane · card grid · timeline-led · split hero + workbench |
| **B · Hierarchy** | verdict-first · numbers-first · action-first · narrative-first · queue-first |
| **C · Narrative** | static sections · stepper-linked · tab-led · queue-led · chapter-sticky |
| **D · Density & surface** | airy minimal · dense ops-table · bento · ledger/print · editorial rules |
| **E · Interaction** | scroll-spy · ⌘K-first · crossfade · count-up · drawer · filter-chips · timeline-draw · sticky-CTA |

**Roster per family:** V1 = the flagship candidate (quiet authority, comfortable density) · V2 = a genuinely different information strategy (dense / queue-led) · V3 = a third idea (narrative / editorial / interaction-led). Never "V1 with a different colour."

```
## GATE 5
Concept cards: 72 · Families: 24 · Each family ≥3 axes + A/C present: YES
Signature moments: 4 (named) · CONCEPTS.md: YES
Gate: PASS / FAIL
```

### Gate 6 — Build

* Pass 1 (**stop here for human approval**): Gate 3 token system + **F03 Dashboard + F09 Project Details**, all 3 variants each, fully verified. Print the gate, then **wait**.
* Pass 2 (after approval): the remaining 22 families.

### Gate 7 — Pixel verification (this is what v1 never had)

For **every** variant:

| Check | Method | Pass criterion |
|---|---|---|
| Screenshots | Chromium, 375/768/1024/1280/1440/1920 × light/dark | 12 per variant, no horizontal overflow, no clipped text |
| Contrast | Sample rendered pixels of text+bg | AA on all text; AAA on body; status badges AA |
| a11y tree | axe-core run per page | 0 critical, 0 serious |
| Keyboard | Tab order walk + visible focus | Every control reachable, focus ring never clipped |
| States | Loaded / empty / skeleton / error / success | All five designed, all five screenshot-proven |
| Content lock | Field-by-field vs v1 + API map | No invented figures, labels, or features |
| Defect regression | Re-check Gate 1 defect classes | 0 repeats in that family |
| Offline | `grep` for `http(s)://` in assets | 0 external requests |
| Terminology | Label audit | `eslint`-level consistency of money, dates, status verbs |

```
## GATE 7 (per family)
Family: F__ · Variants: 3/3 · Screenshots: 36 · axe critical/serious: 0/0
Contrast AA/AAA: PASS · States 5/5 · v1 defect repeats: 0 · External requests: 0
Gate: PASS / FAIL
```

---

## 5 · BRAND SYSTEM v2 — "Quiet Authority" (extracted from nestlancer.com, not invented)

### 5.1 Typefaces — the real ones

nestlancer.com ships **Instrument Sans** (variable, 400–700) + **IBM Plex Mono** (400/500/600). Not Outfit, not Inter. Use these; they are already the brand's voice and they are why the marketing site reads expensive:

```css
/* shared/fonts.css — base64 data URIs, zero network */
@font-face{font-family:"Instrument Sans";src:url(data:font/woff2;base64,…) format("woff2");
  font-weight:400 700;font-style:normal;font-display:swap}
@font-face{font-family:"IBM Plex Mono";src:url(data:font/woff2;base64,…) format("woff2");font-weight:400}
/* + 500, 600 */
:root{
  --font-sans:"Instrument Sans",ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
  --font-mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
  /* numerals: money, IDs, references, timestamps, deltas → mono + tabular */
  --font-num:"IBM Plex Mono",ui-monospace,monospace;
  font-variant-numeric:tabular-nums;
}
```

**Type scale** (dominant, restrained — 6 steps, nothing else):

| Token | Size / line-height / tracking | Use |
|---|---|---|
| `--t-display` | 40 / 44 / −0.03em · 600 | Page verdict or hero figure only — one per page |
| `--t-h1` | 30 / 36 / −0.02em · 600 | Page title |
| `--t-h2` | 20 / 28 / −0.01em · 600 | Section |
| `--t-h3` | 16 / 24 / 0 · 600 | Card title |
| `--t-body` | 14 / 22 / 0 · 400 | Body — AAA target |
| `--t-meta` | 12.5 / 18 / 0.01em · 500 | Meta, captions, table headers (uppercase, `letter-spacing .06em`) |
| `--t-micro` | 11.5 / 16 / 0.02em · 500 | Minimum. Nothing below 11.5 px. |

Money: mono, tabular, `font-feature-settings:"tnum"`, integers at 1 weight heavier than decimals, `₹` at 80 % opacity and `--muted-foreground`. IDs/references/timestamps: mono, `--muted-foreground`, never bold.

### 5.2 Colour — neutral core + one jade accent

```css
:root{
  /* Neutral ramp — slate family, from the live site */
  --n-0:#ffffff;  --n-25:#fafbfc; --n-50:#f6f9fc; --n-100:#eef2f6;
  --n-200:#e6ebf1; --n-300:#c9d4e0; --n-400:#94a3b8; --n-500:#64748b;
  --n-600:#425466; --n-700:#2b3a4d; --n-800:#1a2b3f; --n-900:#0a2540; --n-1000:#050b14;

  --background:var(--n-50);      --card:var(--n-0);
  --surface-sunken:var(--n-100); --surface-raised:var(--n-0);
  --border:var(--n-200);         --border-strong:var(--n-300);
  --foreground:var(--n-900);     --muted-foreground:var(--n-600);  /* AA on --n-50 */

  /* Accent — the one brand hue (live: hsl(175 84% 26%)) */
  --accent-50:#effcf9; --accent-100:#d6f5ee; --accent-300:#5eead4;
  --accent-500:#0d9488; --accent-600:#0f766e; --accent-700:#115e59; --accent-900:#0a2e28;
  --primary:var(--accent-600); --primary-hover:var(--accent-700);
  --primary-foreground:#ffffff; --ring:var(--accent-600);

  /* Status — hue kept, text AAA, never colour-only */
  --ok:#0f766e; --ok-bg:#effcf9; --ok-border:#9fe0d3;
  --warn:#b45309; --warn-bg:#fef6e7; --warn-border:#e7c27a;
  --err:#b42318; --err-bg:#fdeceb; --err-border:#f2a9a3;
  --info:#1d4ed8; --info-bg:#eff3fe; --info-border:#a9bdf6;
  --neutral:#425466; --neutral-bg:#f1f5f9; --neutral-border:#cbd5e1;

  /* Elevation — hairline first, shadow almost none (Stripe/Mercury discipline) */
  --e1:0 0 0 1px var(--border);                    /* the default card */
  --e2:0 1px 2px rgba(10,38,66,.06);
  --e3:0 8px 24px rgba(10,38,66,.08);
  --e4:0 20px 50px rgba(10,38,66,.12);             /* overlays only */

  /* Shape */
  --r-sm:2px; --r-md:6px; --r-lg:10px; --r-xl:16px; --r-full:999px;

  /* Motion */
  --dur-fast:150ms; --dur-normal:280ms; --dur-slow:500ms;
  --ease-out:cubic-bezier(.4,0,.2,1); --ease-spring:cubic-bezier(.34,1.56,.64,1);

  /* Density (Q07) — flip via [data-density="compact"] */
  --row:44px; --pad-card:20px; --gap:16px; --pad-page:32px; --t-body:14px; --t-body-lh:22px;
}
[data-density="compact"]{ --row:34px; --pad-card:14px; --gap:12px; --pad-page:24px; --t-body:13px; --t-body-lh:18px; }
.dark{
  --background:#0b1220; --card:#111a29; --surface-sunken:#0e1624; --surface-raised:#16223a;
  --border:#1e2b40; --border-strong:#2b3a52;
  --foreground:#e8eef6; --muted-foreground:#9aabc0;
  --accent-500:#2dd4bf; --primary:var(--accent-500); --primary-hover:#5eead4; --primary-foreground:#06211d;
  --ok-bg:#0d2a26; --warn-bg:#2b1f0b; --err-bg:#2c1412; --info-bg:#111a33; --neutral-bg:#16223a;
  --e1:0 0 0 1px var(--border); --e3:0 8px 28px rgba(0,0,0,.5); --e4:0 24px 60px rgba(0,0,0,.6);
}
```

**Hard colour bans:** a second brand hue · purple/neon decoration · gradients as surface fills · coloured left rails on single cards (v1 defect) · `#465fff` blue · status colour as the only state carrier · colour-coded tables without icons/labels.

### 5.3 Shell + layout system

```
Desktop ≥1280: [ sidebar 248 (comfortable) / 220 (compact) ] [ header 56 ] [ content max 1400, gutter 32 ]
1024–1279:    sidebar collapses to 64 px icon rail (labels on hover/focus)
768–1023:     off-canvas sidebar + sticky 56 header + page-title row
<768:         bottom tab bar (5 primary) + "More" sheet; tables → card fallback at 768, not 640
Ultrawide ≥1800: content centred, tables gain a sticky first column + row hover rail
```

**Sidebar must carry account context** (this is signal A, honestly re-scoped for Q17): account/business name + account number, environment chip (`Production`), currency + timezone line, and a "Signed in as" block with role verb (`Client · Requester`) — no org switcher, no seats, no invite. Plus: active-work count per nav item, ⌘K hint, density toggle, theme toggle.

### 5.4 Iconography

One hand-drawn set in `client-portal-lab-v2/assets/icons.svg` — 24 px box, 1.5 px stroke, round caps, geometric. ~60 glyphs, drawn once, used by every variant via `<use href="#i-…">`. No emoji, no icon font, no Lucide import, no mixed stroke weights.

### 5.5 Signature motion (exactly four — Q12-B)

1. **Money count-up** — 480 ms on first paint for hero figures only, `--ease-out`, respects `prefers-reduced-motion`.
2. **Timeline draw** — `stroke-dashoffset` reveal 500 ms, once, on scroll into view.
3. **Drawer/sheet spring** — 280 ms `--ease-spring`, 8 px travel, backdrop fade.
4. **Row-preview crossfade** — 150 ms opacity on table row → detail peek.

Everything else: `transform`/`opacity` only, ≤ 280 ms, and nothing animates that a keyboard user cannot skip.

---

## 6 · ENTERPRISE CREDIBILITY LAYER (§7 of v1 had no equivalent — this is the upgrade's spine)

### 6.1 Signals A–H, honestly re-scoped

Q14 asked for all eight. Q17 removes the organisational ones, and the specs remove a few more. This is the permitted shape of each — **deviating from this table is a Gate 2 failure**:

| # | Signal | Permitted v2 shape (given Q17: client-only portal) |
|---|---|---|
| **A** | Account context | Account/business identity in the shell, account no., environment chip, currency + timezone, role verb. **No org switcher, no seats, no member list, no invite.** If the client asks for multi-user later, that's a product conversation, not a mockup. |
| **B** | Identity & access | **REAL:** 2FA status/enable/backup codes (`/users/2fa/*`), password change, active sessions/devices with terminate (`/users/sessions*`), data export. **PROPOSED, labelled:** SSO/SCIM (no endpoint exists — show as a roadmap row with an "on request" affordance, never a switch). |
| **C** | Audit trail | **PARTIAL/REAL:** per-user activity (`/users/activity`), project status history (`/projects/{id}/timeline`, `/admin/projects/{id}/status-history`), quote/payment document versions. Render as a ledger with actor · action · object · timestamp · mono IDs. No fabricated actor names. |
| **D** | Approval workflows | **REAL (single-step):** approve quote, approve milestone, approve/reject deliverable, request revision, sign contract. Show approval *state and who owes the action*, never a multi-step matrix or delegations. |
| **E** | Trust & availability | **REAL:** `/health*` service states, payment status, last-synced timestamps, "invoice PDF available". **No SLA % claims, no uptime figures, no incident history** — marketing claims are not data. |
| **F** | Procurement readiness | A **"Security & compliance" panel** that says exactly: documents available on request, contact route, no logos, no certifications. One calm sentence, no badge wall. |
| **G** | Operational scale | **REAL:** pagination, bulk mark-read (`/notifications/read-selected`), notification channel matrix, CSV/PDF export where endpoints exist (`/invoices/{id}/download`, `/payments/{id}/receipt`, `/users/export`). **PARTIAL:** saved views, column config, generic CSV export → label as "not saved server-side" or omit. |
| **H** | Assistive layer | **REAL:** ⌘K built from real search endpoints (`/messages/search`, `/posts/search`, plus client-side page index), notification preferences (18-switch matrix), keyboard map, "what happens next" explainers tied to real state machines (request lifecycle, quote accept, milestone gates). |

### 6.2 The four-way classification (used on every control)

| Class | Meaning | UI treatment |
|---|---|---|
| **REAL** | Endpoint exists in the 17 specs and is reachable by a client role | Normal UI. No label needed. |
| **PARTIAL** | Endpoint exists but returns less than the UI implies | Show the real data; add a quiet `meta` line stating the scope (e.g. "Activity shown for this account only"). |
| **DEMO** | No endpoint; interaction is local only | `data-demo` attribute + one-line honest label in-context ("Local demo — no server call") + entry in `DECISIONS.md`. |
| **PROPOSED** | Would need a backend feature that doesn't exist | Only inside a clearly-marked "Proposed" surface (roadmap card / labelled tab). Never a live-looking control. |

### 6.3 What this means for the eight signals in a screenshot a client will inspect

A Fortune-100 reviewer will specifically look for: *can this be audited, can it be exported, who can access it, is the state honest.* So every family's V1 must answer at least one of these **visibly and truthfully** — a status-history table, an export affordance, a session list, an "available on request" line. That is the difference between enterprise-looking and enterprise-grade.

---

## 7 · PAGE FAMILIES — 24 families × 3 variants = 72

Carried from v1 (F03–F22, frozen content), plus the three gaps and the reporting layer:

| Family | Name | v2 emphasis (beyond v1) |
|---|---|---|
| **F01** | Auth — Login | **NEW.** Trust-first: no stock photo, no marketing panel; small print of real recovery paths, 2FA-aware, session note, SSO "request access" as PROPOSED row |
| **F02** | Auth — Register + Forgot | **NEW.** 7-field signup with inline validation, what-happens-next strip, honest "no org invite" copy |
| **F03** | Dashboard Overview | **Pass 1.** One verdict, one hero action (kill the triple CTA — D-01), balanced KPI row, pipeline with dates + baseline, account context in shell |
| **F04** | Global Search / ⌘K | Real-search-backed results grouped by object type, keyboard map, empty/loading/no-result honesty |
| **F05** | Requests Work Hub | Infinite-volume list (Q18), saved-view honesty, status filter, dense/comfortable parity |
| **F06** | Request — New Form | Brief/budget/timeline, real constraints from `requests` + `media` specs, autosave honesty, budget guide with no invented rates |
| **F07** | Request Details | Lifecycle timeline from `requests/{id}/status`, linked quote, attachments |
| **F08** | Projects List | Designed 502/error state + populated grid + empty; retry + support |
| **F09** | Project Details + 6 tabs | **Pass 1.** Timeline draw signature, approval states, deliverable approve/reject, files + preview, audit rail |
| **F10** | Quotes List | Money precision, expiry countdown, status filter |
| **F11** | Quote Details | 3-step accept & sign, contract preview, document versions, T&C readability |
| **F12** | Messages Home | Single entry (v1 C11), 3-pane shell, real unread counts |
| **F13** | Messages Thread | Bubbles, composer, members rail, read state from `messages/{id}/read` |
| **F14** | Billing Center | Settled vs outstanding ledger, transaction table, export affordances |
| **F15** | Payment Methods | Empty state + saved-method management (real endpoints) |
| **F16** | Checkout | ONE primary CTA, hero ₹, order summary, bank/UPI rails, styled dropzone for UTR |
| **F17** | Payment Status | Receipt/invoice download (real), dispute link, what-unlocks-this |
| **F18** | Invoices Archive | Table + search/filter/pagination + PDF download per row |
| **F19** | Notifications Center | Grouping by entity, date groups, bulk read-selected, deep links, 9 tabs |
| **F20** | Profile View + Edit | Avatar upload, preferences, visibility honesty, sticky save |
| **F21** | Settings | Account, privacy + danger zone, 2FA, **sessions/devices (real)**, notification matrix, grouped activity |
| **F22** | Settings Files | Grid/list, type chips, preview dialog with real content, versions |
| **F23** | Explore (Blog + Portfolio) | **NEW.** Editorial cards in portal voice; real `posts`/`portfolio` read models |
| **F24** | Reporting & Insights | **NEW.** Built only on `/requests/stats`, `/projects/stats`, `/quotes/stats`, `/payments/stats`. Time-series/trends/forecasts = PROPOSED and visibly labelled. Spend, delivery health, approval ageing — no invented SLA |

**Cross-cutting states (every family, every variant):** light + dark · six breakpoints with table card-fallback at 768 · loaded · empty · skeleton · error-with-retry · success · keyboard map · ≥1 REAL enterprise signal visible.

---

## 8 · BUILD RULES

1. **Stack (Q26-A):** vanilla HTML + CSS + small purposeful JS, one `<style>` and one `<script>` per page, `shared/tokens.css` + `shared/base.css` + `shared/fonts.css` + `assets/icons.svg` imported by relative path. No framework, no build step, no CDN, **zero `http(s)://` in any asset**.
2. **Offline-safe fonts (Q27→B):** base64 in `shared/fonts.css`. Preview sandbox has no network; this is the only way the real typeface survives.
3. **Density toggle:** `data-density="compact"` on `<html>`, persisted in `localStorage`, visible in the shell, both states screenshot-verified per variant.
4. **One design system, three designs:** tokens are shared and locked. Difference comes from layout geometry, hierarchy, narrative, density surface and interaction (§5.2 axes).
5. **Content lock:** v1's frozen content stays (labels, ₹ figures, names, legal text, honesty notes). Gate 2 API enums/limits govern what may be shown. Nothing invented, nothing dropped.
6. **Copy voice (Q36-B):** short declarative sentences. No exclamation marks, no "seamless/powerful/unlock the magic". Money always `₹` + tabular mono + exact paise where v1 had them. Status verbs consistent across all 72 pages (build a `docs/TERMINOLOGY.md` glossary and enforce it).
7. **Rationale per family (Q31-B):** `families/F##-*/RATIONALE.md` — concept, hierarchy decisions, what in v1 failed (cite `V1-CRITIQUE.md` defect IDs), what's REAL/PARTIAL/DEMO/PROPOSED, rejected alternative.
8. **No generators.** Hand-author. `DECISIONS.md` carries the attestation.
9. **Gallery (Q34-B):** `client-portal-lab-v2/index.html` — filter by family/signal/density, before/after slider against v1 at the same viewport, rationale panel, "quiet re-set" opening line (Q35-B), and a "what changed and why" delta table.

---

## 9 · OUTPUT TREE

```
client-portal-lab-v2/
  index.html                     gallery: filters · before/after slider · rationale · delta table
  assets/icons.svg               one hand-drawn 24px set
  assets/brand/                  logo lockups (dark/light), favicon
  shared/
    tokens.json                  documentary source of truth (+ light/dark tables)
    tokens.css                   hand-maintained, imports fonts
    fonts.css                    base64 Instrument Sans + IBM Plex Mono
    base.css                     reset + focus-visible + reduced-motion + primitives only
  families/
    F01-auth-login/{V1,V2,V3}/index.html + RATIONALE.md
    … 24 families
  handoff/
    COMPONENT-INVENTORY.md       anatomy, states, do/don't, motion, tokens per component
    TAILWIND-MAP.md              lab component → existing Tailwind class/file in app.nestlancer.com
    DEV-CHECKLIST.md             per-page implementation checklist
  DECISIONS.md                   merge-only, append-only, authorship attestation
  manifest.json                  hand-maintained: family, variant, axes, signals, classification, verification
docs/
  V1-CRITIQUE.md REPORT-STUDY.md API-MAP.md TEMPLATE-RESEARCH.md CONCEPTS.md
  VERIFICATION.md TERMINOLOGY.md DELTA-v1-v2.md
```

---

## 10 · DELIVERABLE DEFINITION OF DONE

A variant is done only when all of these are true:

- [ ] 12 screenshots exist (6 widths × 2 themes) and **you have looked at every one**
- [ ] axe-core: 0 critical, 0 serious; contrast AA everywhere, AAA body text, sampled from pixels
- [ ] Five states designed and screenshotted: loaded, empty, skeleton, error+retry, success
- [ ] Every control is REAL, PARTIAL-labelled, DEMO-labelled, or PROPOSED-marked — zero unlabelled fictions
- [ ] Zero external requests; fonts embedded; icons from the shared set; no mixed stroke weights
- [ ] Keyboard reachable end-to-end; focus visible; reduced-motion honoured; landmarks present
- [ ] No Gate-1 defect class repeats for that family
- [ ] Density toggle works and both states verified
- [ ] `RATIONALE.md` written; v1 defect IDs cited; rejected alternative named
- [ ] Content lock respected: no invented figures, labels, features, or compliance claims
- [ ] Terminology matches `TERMINOLOGY.md`; money in tabular mono; IDs in mono
- [ ] Offline `file://` load produces no console error

**If any box is unchecked, the variant is not done — say so in the gate block rather than claiming a pass.** v1's DECISIONS.md admitted "no screenshot QA was run"; v2 cannot have that sentence in it.

---

## 11 · HARD BANS

Second brand hue · purple/neon · `#465fff` · gradient surfaces · glass over dense text · duplicate primary CTAs in one viewport · decorative left rails on one card in a set · cards with dead space > 40 % of their height · fixed pixel heights on text containers · sub-11.5 px type · emoji as icons · icon fonts · Lucide/Tailwind/Bootstrap CDN · external font requests · org switcher / seat / invite / SSO toggle for things with no endpoint · any SOC 2, ISO 27001, FedRAMP, PCI-DSS, HIPAA badge or uptime/SLA percentage · fabricated actor names in audit trails · invented sample customers · the words "seamless / powerful / revolutionary / unlock the magic" · exclamation marks · `href="#"` · autoplaying motion · claiming a verification you did not run.

---

## 12 · FIRST ACTIONS

1. Run **Gate 0** and confirm Chromium.
2. Read §0 and §6 to the point where you can state the four classifications without looking.
3. Screenshot **v1 F03/V1** at 1440, and replicate the defect analysis in §2 Rule 1 with your own numbered list — that's the tone for `V1-CRITIQUE.md`.
4. Run Gates 1 → 3, print the blocks, and **stop** if any FAILs.
5. Build Pass 1: token system + **F03 × 3** + **F09 × 3**, verify with Gate 7, print the block, and **stop for human approval** before touching the other 22 families.

Do not commit, push, or create branches. Do not modify `client-portal-lab/`, the screenshots, snapshots, reports, or specs.

---

### Provenance of this prompt

Built from `ENTERPRISE-UPGRADE-QUESTIONNAIRE.md` (36 questions) + your answers, and grounded in: the 17 OpenAPI specs (client-role endpoint inventory verified, admin-only endpoints excluded), the 2026-10-24 UI research report's 13 findings, v1's 100 hand-built variants and `DECISIONS.md`, and a live extraction of `nestlancer.com` (typefaces, jade accent `hsl(175 84% 26%)`, slate neutrals, hairline elevation). Chromium screenshotting was tested in this workspace before claiming Gate 0 is achievable.
