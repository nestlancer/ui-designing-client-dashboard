# F01 · Auth · Login — DELIVERY-REPORT (Gate 3)

Hand-off verification for `families/F01-auth-login/V1…V5/` — five hand-built variants of the sign-in page, one locked token scheme.

## GATE 3 (F01)
Variants built by hand: 5/5 · Generator scripts: 0
Widths×themes checked: 360/390/768/1024/1440 × light+dark (static + computed verification; **no browser available in this environment — no screenshot QA claimed**) · Checklist pass: 5/5 · Blockers open: 0
Gate: PASS

---

## 1. File paths & run command

```
client-portal-lab/
  index.html                       ← gallery (F01 section + merge-only placeholder for F02–F23)
  manifest.json                    ← 5 hand-typed F01 records
  DECISIONS.md                     ← F01 section: attestations + rulings
  shared/tokens.css                ← §5.2 locked scheme + §5.2 motion tokens (create-once, imported as-is)
  shared/base.css                  ← reset + primitives only
  assets/logo.svg · favicon.svg    ← one shared mark
  families/F01-auth-login/
    V1/index.html  V2/…  V3/…  V4/…  V5/…
    docs/BASELINE-MAP.md · REPORT-STUDY.md · API-MAP.md · CONCEPTS.md · DELIVERY-REPORT.md
```

Preview: `python3 -m http.server 8130` from the repo root → `http://localhost:8130/client-portal-lab/` (port 8130 per the family prompt; 8124–8128 belong to sibling labs). All 10 URLs (gallery, 5 variants, 2 CSS, 2 assets) smoke-tested → HTTP 200.

## 2. Per-variant verification

Measured H1 (the H1 `clamp()` values; phone ≤560px uses the phone clamp) and content containers:

| | V1 Split classic | V2 Quiet centered | V3 Full-bleed studio | V4 Ops ledger | V5 Flow rail |
|---|---|---|---|---|---|
| H1 @360 / @390 | 28 / 28 px | 30 / 30 px | 28 / 28 px | 28 / 28 px | 28 / 28 px |
| H1 @768 | 30.8 px | 34 px | 29.7 px | 32 px | 30.8 px |
| H1 @1024 | 35.4 px | 34 px | 32.2 px | 32 px | 35.4 px |
| H1 @1440 | 38 px | 34 px | 33 px | 32 px | 38 px |
| Content containers | grid 52/48; form 420; stage 460 | shell 960; card 440 | field 1200; dock 400 | ledger 520 | grid 46/54; flow 440; bento 520 |
| §11 H1 contract (desktop 32–40 / phone 28–32) | PASS | PASS | PASS | PASS | PASS |
| §11 containers ≤1400 | PASS | PASS | PASS | PASS | PASS |
| Hero display line (locked H2) | 28–44 px | 24–32 px | 28–40 px | 22–28 px | 26–38 px (all ≤ capture's 44px, ≫ the 80px ban) |

Per-variant behaviour verified (static analysis + JS syntax check with `node --check` + served-path smoke test):

| Check | V1 | V2 | V3 | V4 | V5 |
|---|---|---|---|---|---|
| All locked copy strings present (field-by-field list of BASELINE-MAP §3) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Exactly one `h1`; no heading level skips | ✓ | ✓ | ✓ (hero promise = `h2`, `Sign in` = `h1`) | ✓ | ✓ |
| Inline validation (empty / invalid email / empty password, `aria-invalid`, live re-validate) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Submit loading (`aria-busy`, spinner + label swap, disabled) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Honest failed-sign-in error (what/why/action + Try again + Reset route, `role="alert"`) | ✓ | ✓ | ✓ | ✓ | ✓ |
| 2FA challenge state (real `POST /api/v1/auth/verify-2fa` 202 branch) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Preview: live / skeleton / empty (teaches next step) / error+retry | ✓ | ✓ | ✓ | ✓ | ✓ |
| Show/Hide password toggle (`aria-pressed`, label swap) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Cookie bar (Dismiss/Accept, persists) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Theme light→dark→system + `?theme=` boot before paint | ✓ | ✓ | ✓ | ✓ | ✓ |
| `prefers-reduced-motion` kills transforms/scroll; opacity ≤150ms | ✓ | ✓ | ✓ | ✓ | ✓ |
| No-JS: content + links reachable (accordions/tabs ship open; form posts to the real endpoint) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Signature interaction | IO reveal + live ping | dual accordions (`aria-expanded`) | focus-mode overlay (focus trap, Esc, focus restore) + chapter emphasis | arrow-key tablist + filter chips + `aria-live` count | step-spine fill + `n of 3` live region + count-up + spine draw |
| Prev/next family nav + gallery link | ✓ | ✓ | ✓ | ✓ | ✓ |

## 3. Anti-drift checks (manual, per Gate 3)

| Check | Result |
|---|---|
| Identical-skin side-by-side | **PASS** — 5 distinct geometries (split / centered / full-bleed+dock / narrow ledger / flow+rail), unique A+C keys per CONCEPTS Table 2 |
| Remote-URL check | **PASS** — zero `http(s)` assets/fonts/scripts; only real navigation destinations (`app.nestlancer.com`, `admin.nestlancer.com`, `nestlancer.com`) |
| Dead-link check | **PASS** — zero `href="#"` / empty hrefs (skip-link `#main-content` is the intended in-page target) |
| Token check | **PASS** — remaining hexes are only: the §5.2-sanctioned dark status BGs (14% hue over `--card`, identical in 5/5), the captured window-chrome dots (`#ff5f57 #febc2e #28c840`, locked preview pixels), and white on-primary labels. All surfaces/rules/text use `--card/--muted/--border/--brand-*/--status-*/color-mix(token…)` |
| Scope check | **PASS** — `git status` shows only `client-portal-lab/`; captures, reports, Swagger, example prompts and other families untouched |
| Generator check | **PASS** — zero `tools/`, zero `*.mjs/*.cjs/*.py/*.sh` emitters in the lab; `DECISIONS.md` attests hand-authorship |
| C/A coverage from manifest | C4/C5/C5+/C6/C18 **5/5**; family must-include **5/5**; numbered A-items: 0 target this family |

## 4. Acceptance checklist (report §7.1) applied ×5

| Gate | Verdict | Notes |
|---|---|---|
| Hierarchy | PASS ×5 | Single most important *action* (Sign in, one primary CTA) + single promise readable <2s in every variant |
| KPI cards | PASS (preview card) | Value + label + why (`₹48,000 · Deposit paid · NL-204 · Milestone 3`) with C4 AA badges |
| Charts | n/a | No charts on this family |
| Tables | PASS ×5 | The preview feed is the family's tabular surface → row reflow/card-style stacking at ≤560px; mono meta preserved |
| Navigation | PASS ×5 | Logo + Forgot/Sign-up/Operator/Terms/Privacy — all real destinations; ≤9 items |
| Colour | PASS ×5 | One ramp; status = icon+colour+text; computed AA: primary button light 4.86:1, dark 6.4:1 (`--brand-600`); status text 5.4–6.5:1 light, ≥6:1 dark; links ≥4.5:1 both themes |
| Typography | PASS ×5 | One family stack + `--mono` for IDs/timestamps/refs; display tier for H1 (table §2) and money (V5 hero 28–36px `tabular-nums`) |
| Dark mode | PASS ×5 | Token-only surfaces; brand-field layers via `color-mix()` over tokens; verified by token audit |
| Accessibility | PASS ×5 | Skip link, one h1, landmarks (`header/main/aside/footer/nav`), `:focus-visible` 2px ring + 2px offset, 44px targets (24px min for Show chip), `role=alert`/`status`/`tablist`/`dialog`, focus trap + restore (V3, lab panel) |
| Empty/loading/error | PASS ×5 | Form trio + preview trio (skeleton ≠ spinner-only; empty teaches; error = what/why/action + retry) |
| Mobile | PASS ×5 | Single-column stacks at ≤900/1024/560 per variant; 16–24px gutters; no horizontal scroll architecture (no fixed-width rails) |
| Performance | PASS ×5 | Inline CSS/JS only (34–39 KB per variant ≪ 70 KB budget); theme boot pre-paint; skeletons; zero layout-shifting chrome |
| Legal | PASS ×5 | Terms/Privacy real routes at 12–14px; honesty + operator microcopy verbatim; no e-sign block on this family |

**Findings classified:**
- **Blocker: 0.**
- **Major: 0.** (Self-critique caught and fixed pre-hand-off: V3's double `h1` → hero promise demoted to `h2`; V4/V5 had split the locked feed meta strings → restored verbatim; V4 had dropped the 3 feature panels → re-added as ledger-dense key facts; H1 clamps under 32px at 1024 → retuned.)
- **Minor (3, documented — #1 resolved post-hand-off, see §7):**
  1. **No browser in this build environment** *(resolved in §7 post-hand-off QA: real Chromium via Playwright ran after hand-off)* — widths/themes verified by computed CSS and structural analysis at hand-off time.
  2. **Outfit webfont is not vendored** (offline lab, no font files in-repo) — the §5.2 stack `"Outfit", system-ui…` degrades to `system-ui` locally; when the portal's self-hosted Outfit is present it renders as captured.
  3. **Cloudflare Turnstile widget not embedded** (no external embeds) — `turnstileToken` is an API field mapped in API-MAP; the demo label in DECISIONS.md covers it.

## 5. Self-critique highlights (per variant)

- **V1** — the roster classic. Strongest restraint; hero reveal is subtle; nothing to cut. Risk: "expected" — acceptable for the ship pick.
- **V2** — best trust-first reading of the honesty line; accordions add narrative depth without hiding locked content on load for no-JS. Risk: hero proof is one click away — mitigated by always-visible H2 + lede + meta row.
- **V3** — boldest art direction (brand field = the C5 story); focus-mode overlay is the family's most complete interaction. Risk: light-mode brand field is assertive — intentional, documented.
- **V4** — densest and fastest to scan; tabs + filter chips carry real behaviour with `aria-live` counts. Risk: 11px mono meta at 360px — kept ≥10.5px only for uppercase mono labels (body text ≥12px).
- **V5** — best progressive-flow craft (step spine + count-up + spine draw) with all fields visible day one. Risk: two-column split at 1024 — collapses at 1024 to stacked.

## 6. Family winner recommendation

**Winner: V1 "Split classic."**

Why: the report's bottom line asks for *hierarchy, restraint, accessibility and one coherent design system*. V1 delivers all four at zero risk: the locked story reads exactly as captured (form-first DOM, honest states in place), the single blue ramp replaces the teal door without theatrics, every state is reachable in-line, and the geometry survives 360→1440 in both themes without compromise. It is the variant a client would least notice as "a redesign" and most quickly use to sign in — which is this page's only job.

**Runner-up (brand moment): V3 "Full-bleed studio"** — the strongest C5 statement (the brand field *is* the ramp) and the family's best interaction craft; recommended if the marketing team wants the sign-in door to feel premium over quiet.

---

## 7. Post-hand-off browser QA (Playwright + Chromium)

Real-browser pass after hand-off: headless Chromium (Playwright 1.64) against `python3 -m http.server`, all 5 variants × widths 360/390/768/1024/1440 × light/dark, full-page screenshots + scripted interaction probes.

**Baseline (pre-fix):** 0 horizontal overflow at every width; 0 console/page errors; H1 computed px in C18 spec at all widths (V1/V5 28→38, V2 30→34, V3 28→33, V4 28→32).

**UI disturbances found & fixed (5):**
1. **`[hidden]` panels visible at rest (all 5 variants)** — `.preview-empty/.preview-error{display:flex}` (and V4's inline `display:flex`) overrode the `hidden` attribute, so the empty/error preview panels rendered below the live stage at load. Fix: `[hidden]{display:none !important}` in `shared/base.css` (author `!important` wins over inline).
2. **V2 — operator accordion glued to the Sign in button** (no gap between form and first accordion). Fix: `form+.acc{margin-top:16px}`.
3. **V3 — stage card sequence drifted from the capture** (progress bar sat directly under the title; capture order is chips → bar). Fix: bar moved after the money chips; chapter "work" emphasis now highlights the bar together with the title block; chapter numerals also gained left padding (were clipping at the container edge).
4. **V4/V5 — money hero in monospace** floated the grouping comma ("₹48 , 000") and misread the §5.2 role split (mono is for IDs/references/timestamps; money heroes are sans `tabular-nums`). Fix: `.money-hero .amt` (V4) and `.tile .big` (V5) now use `var(--font)`.
5. **V1 — mobile stacked the brand hero above the form** (capture is form-first on mobile) and reveal-on-scroll heroes were invisible without JS (`.js` guard added: `[data-reveal]` styles now scope to `.js [data-reveal]`, content stays visible in no-JS). Fix: ≤900px grid flips to `"form" "hero"`.

**Post-fix verification (scripted):** `hidden` panels `display:none` at rest 5/5 · lab preview Empty→Live round-trip 5/5 · submit → aria-busy "Signing in…" → honest error panel 5/5 · V2 accordion `aria-expanded` toggle · V3 chapter emphasis (work→title+bar, money→chips, threads→feed) · V4 roving tab switch · V5 count-up lands on `48,000`, steps live region updates · theme cycle button (system→light→dark, persisted) · cookie Accept hides bar · Show/Hide password · 0 console errors 5/5 · 0 overflow 25/25 width×variant combos. Full-page screenshots for all 5 × {1440 light/dark, 390 light/dark, 768 light} visually reviewed (kept out of Git: `.qa-shots/`).

---

*F01 hand-off complete. 5/5 hand-authored · 0 generators · 0 blockers. Committed and pushed to `arena/654c2edd-ui-designing-client-dashboard` at the client's request (§7 browser-QA fixes included).*
