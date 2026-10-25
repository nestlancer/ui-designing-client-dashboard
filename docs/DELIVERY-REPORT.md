# DELIVERY REPORT — Nestlancer client portal template lab

- **Branch**: `arena/6cd802c1-ui-designing-client-dashboard`
- **Base commit**: `8bd198d174a8b41a12724d62cfd1ac3320df2c01`
- **Delivered**: `client-portal-lab/` (115 templates + gallery + shared tokens + manifest + audit + decisions) and five docs: `BASELINE-MAP.md`, `REPORT-STUDY.md`, `API-MAP.md`, `CONCEPTS.md`, this report.
- **Serve with**: `python3 -m http.server 8130` from the repository root, then open `/client-portal-lab/`.

## Gate ledger

```
## GATE S
Sources read: screenshots 45 webp · HTML snapshots 55 · research report (md + 10 xlsx sheets) · Swagger 17/17 openapi
Baseline mapped: 23/23 families · nav, states and copy inventoried
Unopened source treated as unverified: yes
Gate: PASS
```

```
## GATE R
Research report read: sheets + narrative · findings extracted: IA, states, copy, defects, ADD list
Report ADD items mapped: A1–A15 · additions traced to families
Contradictions with live UI logged: yes (quotes endpoint unread → see §Known gaps)
Gate: PASS
```

```
## GATE A
Specs read: 17/17 · Families mapped: 23/23 · Demo-only CTAs listed: 10 (D1–D10)
Every CTA either maps to an endpoint in API-MAP.md or is labelled demo-only in DECISIONS.md
Gate: PASS
```

```
## GATE 1
Concept cards drawn: 115 · one card per variant, 23 families × 5
Axis coverage: every sibling pair differs on ≥3 of 5 axes, at least one of them A (layout) or C (narrative)
Colour used as the only differentiator: never
Gate: PASS
```

```
## GATE 2a
Pilot built: F11-V1 (quote details, Signing Desk) + F03-V1 (dashboard, Verdict Canvas)
Pilot frozen after review: yes — later variants do not diverge from the pilot's shell, tokens or wording rules
Gate: PASS
```

```
## GATE 2b
Templates: 115/115 hand-audited and individually authored/upgraded · six required waves complete
Per-family variant counts: 5/5 for all 23 families (no stubs, no bonus pages, no colour-only siblings)
Gate: PASS
```

```
## GATE 3
Families: 23/23 present · Variants: 115/115 present · Gallery: 1
HTML tag balance (html.parser over 116 files): 0 errors
JavaScript parse (node --check on every inline script): 0 errors
Internal links: 2,200 links plus referenced local assets resolve; 0 dead links
External requests in src/href of styles, scripts and images: 0
Shared scheme/runtime: every variant loads tokens.css + base.css + kit.css + kit.js
jsdom: 116/116 executed; 0 runtime/fatal errors, duplicate IDs, broken references, dead # links or audited nested controls
Chromium render matrix: 464/464 combinations passed (116 pages × 375/1440px × light/dark), 0 flagged
Chromium workflows: keyboard/focus, workbench, CSV, local persistence, honest Retry, local files and live iframes passed
Blocker count: 0
Boundary: Chromium only; no Firefox/WebKit certification or historical pixel-baseline comparison is claimed.
Gate: PASS
```

## What is in the box

| Deliverable | Path | Contents |
|---|---|---|
| Gallery | `client-portal-lab/index.html` | 23 family sections × 5 variants, search, domain/axis filters, and independent desktop/mobile light/dark live comparison |
| Tokens | `client-portal-lab/shared/tokens.css` | The single locked scheme: blue brand ramp, status colours, radii 6/10/14/20, `--sidebar:232px`, `--header:64px`, `--content:1400px`, light + dark |
| Primitives | `client-portal-lab/shared/base.css` + `shared/kit.css` / `kit.js` | Locked legacy primitives plus family-agnostic chrome, overlays, state simulator, compatible workbenches, local drafts/files and responsive helpers |
| Templates | `client-portal-lab/families/F01…F23/V1…V5/index.html` | 115 individually authored/upgraded pages with local styles, sprites, pre-paint theme boot, states and footers |
| Manifest | `client-portal-lab/manifest.json` | Current names, paths and byte sizes; counts, gate results, demo-only and browser-local feature policies |
| Audit | `client-portal-lab/audit.json` | Current static, jsdom and Chromium summaries plus per-file source/runtime records |
| Decisions | `client-portal-lab/DECISIONS.md` | Authorship, one-scheme rule, difference test, data policy, demo/local boundaries, corrections and QA evidence |

## Progressive depth delivered

- **24 compatible workbenches / 148 loaded records:** search, configurable facets, project filters, sort, grouping, local saved views, density, bulk selection/comparison, local CSV export and contextual inspection. Bespoke tables, statements, timelines and split-option collections keep their authored semantics.
- **F06:** explicit local draft save/restore/clear, deterministic required-field readiness, category/quick-fill persistence and actual-local-file selection without File persistence or auto-submit.
- **F16:** exactly one visible primary CTA per checkout state, a styled keyboard-accessible proof dropzone, validated local PNG/JPG/PDF selection and no fabricated upload.
- **Gallery:** 115 authored axis assignments, 230 compare actions, domain/axis/search filters, responsive independent panes, preset and swap.
- **Responsive/A11y correction pass:** bounded wide-table scrolling, shrinkable split/grid tracks, wrapping command/state/bulk bars, compact legacy headers, complete control names, synchronized overlay `aria-hidden`, nested scroll locking and first-focusable skip links.

## Coverage of the fix lists

- **C1–C20**: each fix appears in all five variants of its target family — C1/C2/C3/C14 → F03; C4–C6/C18 → all 23; C7 → F11; C8/C15 → F16; C9 → F17; C10 → F21; C11 → F12; C12 → F04; C13 → F22; C16 → F05, F10, F14, F18, F21, F22; C17 → all shells; C19 → F09; C20 → F20.
- **P1 A1–A4** in 5/5 of F09 (plus A1 in F11 and F14, A3 in F17). **P2/P3** A-items in ≥3/5 of their families: A5 → F14, A6 → F15, A7 → F19, A8 → F11, A9/A11 → F03, A10 → F14 and F18, A12 → F05/F10/F14, A13 → F05/F08/F09, A14/A15 → F09.
- **KEEP list preserved**: status timeline (F07), milestone stepper (F09), Awaiting-you block (F03/F05/F10/F14), 3-pane messaging (F12/F13), Razorpay strips (F15/F16), honesty microcopy throughout, ⌘K (F04).
- **Live 502 handled as a state**: F08 all five variants and F09 render a degraded state with retry, support route and a system-status line; nothing pretends the endpoint works.

## Known gaps and honest limitations

1. **Browser boundary.** Real Chromium rendering and workflows were run, but Firefox/WebKit were not. There is no historical screenshot/pixel-baseline diff and no claim of backend or third-party hosted-checkout certification.
2. **`GET /api/v1/projects` is still failing** in the live environment (502 `origin_bad_gateway`, CORS). The lab designs the failure rather than the fix; the API-side repair is outside this delivery.
3. **Quotes endpoint unread.** F10's list therefore uses illustrative records besides the verified `#01a10f80` (₹1,770). Each F10 page states this in a visible note and no figure from those rows is reused in the billing, checkout or invoice families.
4. **F15 additional method patterns.** V1 uses the verified HDFC ····4242 / 09-2028 card and the F14-derived ₹81,500 split; UPI and bank slots stay explicitly unsaved. Additional arrangements in V2–V5 remain pattern/local examples rather than newly claimed captured account facts.
5. **Local/simulated integrations.** Razorpay hand-off and server upload/sync are simulated. Saved views/drafts use localStorage, CSV uses a local Blob, proof/attachment pickers use actual local files without persistence, and gallery comparison uses local iframes. No page makes a network call.

## Where to look first

1. `client-portal-lab/index.html` — the gallery, and the honest gate ledger at the top.
2. `client-portal-lab/families/F03-dashboard-overview/V1/index.html` — Verdict Canvas pilot: awaiting-you first, evidence and vitals second.
3. `client-portal-lab/families/F11-quote-details/V1/index.html` — Signing Desk pilot: the ₹1,770 quote with three gated acceptance steps.
4. `client-portal-lab/families/F08-projects-list/V5/index.html` — the live 502 designed as a first-class state.
5. `client-portal-lab/DECISIONS.md` — every rule, and the list of things deliberately not claimed.
