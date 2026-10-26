# Nestlancer Client Portal Lab — F01 · Auth · Login — **CRAFT FIX** Prompt
### Restyle the already-built F01 V1–V5 to Nestlancer homepage / portfolio craft · keep content, tokens, API honesty, and states

> Paste this whole file into an agent (Arena Agent Mode, Cursor, Claude Code) with the **`ui-designing-client-dashboard`** repo open as the working directory.
>
> **This is NOT a greenfield build.** F01 already exists at `client-portal-lab/families/F01-auth-login/V1…V5/`. The first run passed lab gates (content lock, tokens, states, API honesty) but **failed Nestlancer brand craft** — the pages read as generic SaaS auth templates, not as Nestlancer-grade brand doors.
>
> **Sibling craft parents (mandatory study — open them):**
> 1. `../ui-designing-homepage/homepage-compositor/review/rank-list.html` → **Top 5** under `review/top50/` (user ranks #1–#5).
> 2. `../ui-designing-homepage/portfolio-listing-lab/` — `design-01.html` (Serpentine), `design-03.html` (Editorial Meander), `design-04.html` (Chromatic Rapids), `design-10.html` (Atelier Bend) + `assets/designs.css` / `flow-designs.css`.
> 3. Existing F01 docs: `BASELINE-MAP.md` · `CONCEPTS.md` · `API-MAP.md` · `DELIVERY-REPORT.md`.
>
> **Do not push, commit, create or switch a branch.** Do **not** run the original `F01-auth-login.md` greenfield prompt again.

---

## 0. WHY THIS FIX EXISTS (read once)

Operator review vs Nestlancer Top-5 homes + portfolio shortlist found F01 to be **functionally correct, visually generic**:

| Failure | Where |
|---|---|
| Mark + fake wordmark text instead of **real full logos** | V1–V5 (`logo-mark-*` + `"Nestlancer"` / V4 `"NL · client portal"`) — `logo-full-*` unused |
| Decorative **icon-tile** competing with brand | V1–V3 |
| **Surface / card soup** (stage ∪ features ∪ bento ∪ timeline ∪ chips as equal cards) | V1–V5 |
| No **single strong first-viewport composition** | Especially V2 (proof buried), V4 (ops tabs/chips above form), V5 (triple proof rail) |
| Motion = stagger soup / ops chrome, not **2–3 intentional presence beats** | V1–V5 |
| Pill / chip / rounded-full clusters | V1, V4 |
| Dark = flat `--brand-950` wash, weak atmosphere | V1, V3, V5 |
| Type drift (V4 mono-terminal cosplay) | V4 |

**Keep** what already works: content lock, shared tokens, API honesty, validation / loading / error / 2FA / preview trio / cookie / theme, A+C layout axes from CONCEPTS, a11y + reduced-motion contracts.

---

## 1. YOUR ROLE

1. **Craft director** — raise auth pages to the Nestlancer Top-5 / portfolio craft bar without inventing features.
2. **Surgical editor** — hand-restyle each `V#/index.html` in place; preserve state machines and locked strings.
3. **Harsh critic** — reject any variant that still reads as “centered white card + blue button on gray.”

---

## 2. THE MISSION

| Stage | Do | Do not |
|---|---|---|
| **0 · Study craft parents** | Open Top-5 homes + 4 portfolio designs; note composition, logo, motion, surface rules | Copy homepage teal tokens into the portal |
| **1 · Audit current F01** | Side-by-side V1–V5 vs craft bar; list per-variant craft defects | Rewrite Gate S/R/A docs |
| **2 · Restyle (MANUAL)** | Overwrite V1…V5 skins + logo + composition + motion polish | Change locked copy, endpoints, or layout axes |
| **3 · Verify** | Craft acceptance + regression of states/themes/widths | Claim browser QA you did not run |

### Non-negotiable rules

**Rule A — Portal tokens stay locked.** Import `client-portal-lab/shared/tokens.css` as-is (§5 of the original F01 prompt: **blue** `--ta-brand-*` ramp). Homepage/portfolio teach *composition, logo, motion, restraint* — **not** a teal recolour. No new hues.

**Rule B — Hand craft only.** Edit each `V#/index.html` by eye. No generators.

**Rule C — Content + API lock.** Every string in BASELINE-MAP §3 stays. Every real href / `POST …/auth/login` / 2FA path stays. No invented features, clients, or metrics.

**Rule D — Keep the five geometries.** CONCEPTS A+C axes stay distinct (split / centered / full-bleed dock / narrow ledger / flow+rail). Restyle — do not collapse into five clones.

---

## 3. READ FIRST — in this order

1. **This FIX prompt** end-to-end.
2. **Craft parents (mandatory):**
   - Top 5 folders under `ui-designing-homepage/homepage-compositor/review/top50/` (ranks from `rank-list.html` #1–#5 — currently dominated by `hdr-P01` + heroes **H07 Money-First** / **H01 Ground Truth**).
   - Portfolio shortlist: `portfolio-listing-lab/design-{01,03,04,10}.html`.
3. **Current F01:** all five `V#/index.html` + `docs/BASELINE-MAP.md` + `docs/CONCEPTS.md` + `docs/API-MAP.md`.
4. **Assets:** `client-portal-lab/assets/logo-full-light.svg`, `logo-full-dark.svg` (and marks only if a tiny companion is needed). Repo-root `assets/` is the source of truth if lab copies are missing — copy into `client-portal-lab/assets/`, never invent glyphs.
5. `git status` — touch only the paths in §5.

---

## 4. CRAFT BAR — what “Nestlancer-good” means for auth

Study the Top-5 / portfolio work, then apply these mandates **inside portal tokens**:

### 4.1 Must

1. **Real full logos.** Light + dark: `logo-full-light.svg` / `logo-full-dark.svg`, aspect ≈ 3.63∶1, explicit `width` + `height`, theme swap (`.logo-light` / `.logo-dark` or equivalent). **Ban:** mark + typed “Nestlancer”; ban V4 “NL · client portal” as the brand.
2. **One first-viewport composition.** Brand (hero-level) + one H1 + one short honesty line + one primary CTA group + **≤1** dominant product visual plane. Cover the chrome — the page must still read Nestlancer.
3. **Restrained surfaces.** ≤1 elevated card for the form (if any). Product stage / Hub window is *the* proof plane — not stage + feature cards + bento + timeline as equal carded systems. Cards only when interaction needs a container.
4. **Signature motion (2–3 beats max).** Keep each CONCEPTS signature; cut redundant IO staggers / endless pings. Full `prefers-reduced-motion` path (opacity ≤150ms; no transform/scroll-linked).
5. **Atmosphere without hue drift.** Mesh / soft `color-mix` radials / band fields using **existing** `--brand-*` / `--muted` / `--card` only. Dark is a 3-step ramp, not flat navy void and not pure black.
6. **Form craft.** Labels above fields; 14–15px body; inputs ≥44px tall; one primary CTA; secondary links as calm text/ghost. No floating Material labels; no placeholder-only fields.
7. **Remove decorative icon-tile** above “Sign in” (V1–V3). Brand + H1 carry the action.

### 4.2 Must-not (generic auth failure modes)

- Centered white card + Inter/Outfit + purple/indigo blob (AI-SaaS default).
- Logo as 24px nav crumb; product name only in the tab title.
- Glass over dense form text; neon glow; particle backgrounds; gradient soup.
- Pill clusters / filter chips above the form (V4 pattern).
- OAuth button walls that demote the Nestlancer mark.
- Mixing rectangular 3px buttons with pill chrome randomly.
- CDN fonts/frameworks/emoji/icon fonts.
- Invented logos or a second brand hue.

### 4.3 Patterns to borrow (geometry / presence — not homepage teal)

| Parent | Auth translation (portal blue tokens) |
|---|---|
| H07 Money-First split | Split ~`.98fr/1.02fr`: copy + live pill one side; **Hub window** (traffic-light chrome + mono title + progress) holds form or proof |
| H01 Ground Truth | Balanced split + soft mesh radials; elevated form surface with hairline + soft shadow |
| Portfolio 03 Editorial Meander | Editorial rules / arched panel / hard offset shadow — still §5 tokens |
| Portfolio 10 Atelier Bend | Warm-field atmosphere via `color-mix` of brand/muted; arched form shell |
| Portfolio 01 Serpentine | V5 flow: quiet vertical route markers — not three competing card systems |

---

## 5. SCOPE — overwrite vs leave alone

### 5.1 Overwrite (in place)

```
client-portal-lab/families/F01-auth-login/V1/index.html
client-portal-lab/families/F01-auth-login/V2/index.html
client-portal-lab/families/F01-auth-login/V3/index.html
client-portal-lab/families/F01-auth-login/V4/index.html
client-portal-lab/families/F01-auth-login/V5/index.html
client-portal-lab/families/F01-auth-login/docs/DELIVERY-REPORT.md   ← craft QA + FIX attestation
client-portal-lab/DECISIONS.md                                      ← append short F01-FIX note only
```

If `logo-full-*.svg` are missing under `client-portal-lab/assets/`, copy them from repo-root `assets/` (or sibling homepage assets). Do not redraw.

Optional: light gallery blurb in `client-portal-lab/index.html` F01 section if titles need a “craft-fixed” note — do not rewrite other families.

### 5.2 Leave alone

| Path | Why |
|---|---|
| `docs/BASELINE-MAP.md`, `REPORT-STUDY.md`, `API-MAP.md`, `CONCEPTS.md` | Locks + axes stay |
| `shared/tokens.css`, `shared/base.css` | One scheme for all 23 families |
| Other `families/F##-…` | Out of scope |
| Form field `id`/`name`/`action`, validation JS contracts, state panel copy | Regression risk |
| Cookie bar copy + Accept/Dismiss behaviour | Content lock |
| Locked preview strings (NL-204, ₹48,000, 68%, feed rows, chrome dots) | Content lock |

### 5.3 Inside each `V#/index.html`

| Rewrite | Preserve |
|---|---|
| Logo markup → full light/dark | State machine `<script>` (unless a tiny craft hook) |
| CSS skin, surfaces, type hierarchy, atmosphere | Field IDs, validation, loading/`aria-busy`, 2FA, Show/Hide |
| Composition tightening (flatten card soup) | Lab demo panel + lab nav (lab OK — do not let them dominate) |
| Motion polish (≤2–3 beats) | Reduced-motion + no-JS reachability |
| Remove icon-tile; demote V4 terminal cosplay | Signature *existence* (accordion / overlay / tabs / stepper) — restyle, don’t delete |

---

## 6. PER-VARIANT FIX TARGETS

| Variant | Keep geometry (CONCEPTS) | Craft surgery |
|---|---|---|
| **V1 Split classic** | Brand left · form right | Full logos; drop icon-tile; one stage as proof (feature cards → quiet list or into stage); 2–3 IO beats max |
| **V2 Quiet centered** | Centered card | Full logos; elevate brand on first paint (not buried); accordion stays but first viewport = brand+form+honesty; one soft mesh field |
| **V3 Full-bleed studio** | Brand field + form dock | Full logos; editorial hairlines OK; flatten dock∪stage∪chapters into one composition + one dock; keep overlay if signature |
| **V4 Ops ledger** | Narrow dense column | Full logos (not “NL · …”); **move Work/Money/Threads tabs + filter chips below or into lab panel** — form is first job; drop mono-terminal CTA cosplay |
| **V5 Flow-led** | Form + reassurance rail | Full logos; pick **one** rail system (step spine *or* bento *or* timeline) — not all three carded; keep count-up as signature |

---

## 7. GATES

### Gate C0 — Craft parents opened

```
## GATE C0 (F01-FIX)
Top-5 homes opened: YES/NO · Portfolio 01/03/04/10 opened: YES/NO
Current V1–V5 audited vs craft bar: YES/NO
Gate: PASS / FAIL
```

### Gate C1 — Per-variant craft plan (print before editing)

For each V#: `keep axes | logo plan | surfaces to flatten | motion beats kept | risks`.

```
## GATE C1 (F01-FIX)
Plans: 5/5 · Axes preserved: YES · Content lock cited: YES
Gate: PASS / FAIL
```

### Gate C2 — Hand restyle

Edit V1→V5 one by one. After each: theme toggle, form submit error path, 2FA branch if present, reduced-motion smoke.

### Gate C3 — Acceptance (all must PASS)

1. **Brand:** full logos light/dark; first viewport still Nestlancer with chrome covered.
2. **Composition:** one job per first viewport; no ops chrome above the form (V4); no triple proof soup (V5).
3. **Surfaces:** ≤1 elevated form card; no decorative icon-tile.
4. **Motion:** CONCEPTS signature retained; ≤2–3 intentional beats; reduced-motion OK.
5. **Tokens only:** no new hues; AA intact.
6. **Content lock:** BASELINE-MAP §3 field-by-field match (incl. honesty + operator + cookie + preview figures).
7. **States:** validation / loading / error / 2FA / preview trio / cookie / theme still work ×5.
8. **API honesty:** same real endpoints + outbound links; no `#`.
9. **Distinctness:** Difference Test still passes (5 geometries).
10. **Responsive:** 360 / 390 / 768 / 1024 / 1440 × light+dark — no page-level horizontal scroll.
11. **No feature invention.**

```
## GATE C3 (F01-FIX)
Craft bar: PASS/FAIL · Regression: PASS/FAIL · Blockers: 0
DELIVERY-REPORT updated: YES · DECISIONS FIX note: YES
Gate: PASS / FAIL
```

Update `docs/DELIVERY-REPORT.md` with: craft parents studied, per-variant before→after craft notes, acceptance table, limitations. Append to `DECISIONS.md`: “F01-FIX hand-restyled V1–V5 for Nestlancer craft; no generator; content/API/token locks held.”

---

## 8. HARD CONSTRAINTS

- **Do not** push, commit, create/switch a branch.
- **Do not** re-run greenfield F01 or rebuild from scratch unless a file is corrupt — prefer surgical restyle.
- **Do not** edit other families, screenshots, HTML snapshots, reports, Swagger, or example prompts.
- **Do not** change `shared/tokens.css` hues or invent portal features.
- **Do not** copy homepage teal (`#1f7a72` / mint band) into auth — portal blue only.
- **Do not** use CDNs, frameworks, emoji, invented logos, or generator scripts.
- **Do not** collapse V1–V5 into near-identical skins.

---

## 9. COMPLETION CHECKLIST

- [ ] Gate C0 PASS — Top-5 + portfolio shortlist + current F01 studied
- [ ] Gate C1 PASS — 5 craft plans printed
- [ ] Gate C2 — V1…V5 hand-restyled; full logos; composition + surfaces + motion fixed
- [ ] Gate C3 PASS — craft + regression acceptance; DELIVERY-REPORT + DECISIONS updated
- [ ] Reported: paths touched, `python3 -m http.server 8130` preview command, limitations

### Operator shortcuts

- **Still generic:** “Fails craft bar — full logos + one composition; kill card soup.”
- **Teal drift:** “Restore portal §5 blue tokens — homepage craft is composition, not hue.”
- **Axes collapsed:** “V3 must stay full-bleed dock vs V1 split — restyle, don’t clone.”
- **Broken states:** “Regression FAIL — restore validation/2FA/preview before more skin work.”

---

*End of F01-FIX. Start at §3. Print every gate block. Hand-restyle all 5.*
