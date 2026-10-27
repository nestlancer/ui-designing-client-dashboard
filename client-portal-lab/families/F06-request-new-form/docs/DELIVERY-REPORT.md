# F06 · Request · New Form — DELIVERY-REPORT (Gate 3)

**Family:** F06 · New request form · `/requests/new`
**Built by hand:** 5/5 variants · **Generator scripts:** 0 · **Blockers open:** 0
**Run command (from repo root):** `python3 -m http.server 8130` → open `/client-portal-lab/` → F06 section (or a variant directly at `/client-portal-lab/families/F06-request-new-form/V#/`).

---

## 1 · Delivered files

| Path | Variant | Size | Hand-authored |
|---|---|---|---|
| `families/F06-request-new-form/V1/index.html` | Classic Brief | ~52 KB | ✓ |
| `families/F06-request-new-form/V2/index.html` | Three Steps | ~51 KB | ✓ |
| `families/F06-request-new-form/V3/index.html` | Compact Desk | ~47 KB | ✓ |
| `families/F06-request-new-form/V4/index.html` | Guided Narrative | ~52 KB | ✓ |
| `families/F06-request-new-form/V5/index.html` | Bento Split | ~53 KB | ✓ |

Each file is a standalone `<!DOCTYPE html>` document importing `../../../shared/tokens.css` + `../../../shared/base.css`, with its own hand-written inline `<style>` and inline `<script>`. All 5 are under the 70 KB soft page budget (excluding shared `assets/`).

**Docs (Gates S/R/A/T/1):** `docs/BASELINE-MAP.md` · `REPORT-STUDY.md` · `API-MAP.md` · `TEMPLATE-RESEARCH.md` · `CONCEPTS.md` · this file.
**Shared infra (merge-only):** gallery `index.html` + `manifest.json` (5 F06 records) + `DECISIONS.md` F06 sections.

---

## 2 · Measured / computed H1 + container (light + dark)

H1 is `clamp(32px, 3.4vw, 38px)` in all 5 F06 variants. Computed from the clamp (identical in light + dark). Container max-widths: V1 `1100px`, V2 `940px`, V3/V4/V5 `var(--content)=1400px` (V4/V5 use a narrower inner grid). Page padding 28px desktop / 18px mobile; on ≥1000px the 232px sidebar is subtracted first.

| Width | H1 (all 5) | Main content (V1 1100) | (V2 940) | (V3/V4/V5 1400) |
|---|---|---|---|---|
| 360 | 32px | full − 36px padding, single col | full − 36px | full − 36px, single col |
| 390 | 32px | full − 36px | full − 36px | full − 36px |
| 768 | 32px | full − 36px | full − 36px | full − 36px (sidebar collapses at 1000px) |
| 1024 | 34.8px | min(1100, 1024−232−56)≈736px | ≈736px | ≈736px |
| 1440 | 38px | min(1100, 1440−232−56)=1100px (capped) | 940px | min(1400,1152)=1152px |

All H1 values are within the C18 band **32–40px** in both themes, all 5 widths.

> **Measurement method:** computed from CSS clamps + layout rules. No browser binary → no pixel screenshots (see §5).

---

## 3 · Per-variant verification

Same harness as F05: `node --check` (0 errors) · parse · link/asset existence (0 missing) · token defs (0 undefined) · remote-URL scan (0) · dead-link scan (0) · **jsdom runtime** with theme, all state chips, command-palette entries, help toggles, stepper Next/Back, example-band, dropzone clear, cancel dialogs, and form submit (invalid + valid). **0 runtime errors.** **30/30 DOM-mutation assertions pass.**

Every F06 variant ships: 3 sections (**Brief / Budget / Timeline & requirements**), the **10 locked fields** with help affordances, a **styled dropzone** (never a visible native file input — visually hidden but keyboard-reachable via a real browse button; ≤10 files, ≤500 MB, dedup, no fake progress), an **inline budget guide** (only captured placeholders `50000`/`150000` + `min ≤ max` + ISO-3 currency), a **sticky footer** (Cancel + Save draft), **validation** (Title 5–100, Description 20–5000, 3-letter currency, min ≤ max, start ≤ deadline, ≤20 requirement lines — first invalid field focused), **loading** skeleton, **submit-error + retry** (designed 502 degraded state), **success** (payload preview, notes it is offline), **cancel without losing work** (local autosave + confirm dialog: keep / discard / save & leave), light + dark, reduced motion, keyboard, and prev/next + gallery links.

| Variant | Signature interaction | Help affordance | Verified behaviours |
|---|---|---|---|
| V1 Classic Brief | per-field help popovers + live completion count + autosave/restore | 10 `aria-expanded` help toggles | invalid submit shows `#e-title`; budget guide verdict updates; cancel opens dialog |
| V2 Three Steps | gated wizard (`aria-current="step"`) + lossless Back | 10 help toggles | Next blocked while step 1 invalid; advances after valid; Back keeps typed values; restore saved step |
| V3 Compact Desk | dense 12-col grid + live ₹ band ruler + stat chips + native `<details>` help | 10 `<details>` (no-JS friendly) | stat updates on title input; example band sets 50000/150000; expandable help |
| V4 Guided Narrative | sticky TOC + scroll-spy + word count + resume-draft banner | 10 help toggles | 3 TOC links; word count > 0 after typing; IO scroll-spy with fallback |
| V5 Bento Split | accordion bento + sticky live request-card preview | 10 help toggles | preview shows “Untitled request” → updates live on title/budget; “collapse all” closes all tiles |

**Shared checks (5/5):** light + dark (boot-before-paint) · keyboard end-to-end · reduced motion · validation/empty/loading/error/success · C17/C4/C5/C6/C18 in 5/5 · family ADDs (attachment-at-creation + budget guide) in 5/5 · 232/64 shell · mobile (single-column reflow, ≥44px targets, sticky footer) · no external requests · no dead `href="#"`.

---

## 4 · Anti-drift / acceptance checklist (report §7.1)

| Check | Result |
|---|---|
| Identical-skin side-by-side | **PASS** — single-col / stepper / dense grid / narrative rail / bento+preview; unique A+C pairs (CONCEPTS §Table 2) |
| Remote-URL check | **PASS** — 0 |
| Dead-link check | **PASS** — 0 |
| Token check | **PASS** — 0 undefined; single blue ramp |
| Scope check | **PASS** — only F06 folder + shared merges + docs |
| C/A coverage | **PASS** — C17/C4/C5/C6/C18 5/5; both family ADDs 5/5 |
| Hierarchy < 2s, KPI grammar, nav ≤ 9, AA colour, type scale, dark parity, keyboard, empty/loading/error/success, mobile, performance, legal | applied; findings classified |

**Findings classification:**
- **Blocker:** 0 open.
- **Major:** 0 open.
- **Minor (documented, intentional):**
  - **Tooltip copy is lab-authored, not verbatim.** Production HTML has 10 `aria-label="Help for …"` buttons but no tooltip body text. Help copy is derived from frozen section descriptions + Swagger constraints and flagged as lab-authored (BASELINE-MAP §2). No production tooltip is claimed verbatim.
  - **Budget guide has no invented market rates** — example band only + API constraints, explicitly labelled “not price advice”.
  - **F06 error state is a designed degraded-submit state, not a captured 502.** The captured 502s belong to `/requests?view=…`, `/projects`, `/dashboard`; `/requests/new` only had a benign `net::ERR_ABORTED` RSC navigation. Retry re-runs the designed state.
  - **Dropzone never uploads** (offline lab). Files are queued locally with honest “queued, not uploaded” labels; `timeline.flexible` is sent as spec-required `false` (no captured control).
  - V3 uses native `<details>` for help (works with JS off); the other four use `aria-expanded` buttons. Both are valid help affordances.

---

## 5 · Limitations (stated, not hidden)

- **No screenshot / pixel QA was run.** No browser binary in the sandbox. Light/dark parity and 360/390/768/1024/1440 layouts verified via CSS reasoning + jsdom DOM execution, **not** captured screenshots. §2 values are computed, not pixel-measured.
- jsdom does not paint; sticky footers, focus rings, dropzone visuals and contrast are argued from CSS, not visually confirmed.
- All forms are offline demos: `Save draft` validates and shows a payload preview but sends nothing to `POST /api/v1/requests`; the dropzone never contacts `media.openapi.json` upload endpoints. This is stated in the success state and success-copy of every variant.
- Cancel-without-losing-work persists to `localStorage` (same-browser resume), which is the honest offline analogue of a server draft; it is not a cross-device saved draft.

---

## 6 · Family winner recommendation

**Winner: V5 “Bento Split”.**

Why: it delivers the most family-specific value with the strongest immediate feedback loop. The sticky **live request-card preview** makes the abstract 10-field form concrete — clients see their title, description, budget band, dates and requirements assemble in real time, which directly addresses the report's “hierarchy / confidence / feedback” findings. It packs both mandatory ADDs (dropzone + budget guide), the bento accordion keeps all three sections reachable without a long scroll, and it preserves every state (validation, skeleton, error+retry, success, cancel-safe) plus the 32–40px type scale and one-brand tokens. Its A+C pair (split/accordion) is distinct from all four siblings.

- **Runner-up:** V2 “Three Steps” — best progressive disclosure (`aria-current="step"`, per-step gates, lossless Back) for lower-confidence users; slightly more navigation than a single-page form.
- **Best for speed / power users:** V3 “Compact Desk” — all 10 fields on one dense screen with live validity stats and native `<details>` help (also the strongest no-JS fallback).
- **Best for guided/storytelling:** V4 “Guided Narrative” — question-led with resume-draft; longest scroll.
- **Safest baseline:** V1 “Classic Brief” — frozen pilot, tooltips + autosave; conservative.
