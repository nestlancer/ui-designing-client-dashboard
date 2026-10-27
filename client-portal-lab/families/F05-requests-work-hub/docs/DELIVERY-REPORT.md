# F05 · Requests Work Hub — DELIVERY-REPORT (Gate 3)

**Family:** F05 · Requests work hub · `/requests`, `/requests?view=all`, `/requests?view=projects`
**Built by hand:** 5/5 variants · **Generator scripts:** 0 · **Blockers open:** 0
**Run command (from repo root):** `python3 -m http.server 8130` → open `/client-portal-lab/` → F05 section (or a variant directly at `/client-portal-lab/families/F05-requests-work-hub/V#/`).

---

## 1 · Delivered files

| Path | Variant | Size | Hand-authored |
|---|---|---|---|
| `families/F05-requests-work-hub/V1/index.html` | Calm Ledger | ~57 KB | ✓ |
| `families/F05-requests-work-hub/V2/index.html` | Ops Console | ~46 KB | ✓ |
| `families/F05-requests-work-hub/V3/index.html` | Attention Queue | ~43 KB | ✓ |
| `families/F05-requests-work-hub/V4/index.html` | Chapter Tabs | ~43 KB | ✓ |
| `families/F05-requests-work-hub/V5/index.html` | Status Lanes | ~42 KB | ✓ |

Each file is a standalone `<!DOCTYPE html>` document importing `../../../shared/tokens.css` + `../../../shared/base.css`, with its own inline `<style>` (hand-written layout) and inline `<script>` (its real interactions). All 5 are under the 70 KB soft page budget (excluding the shared SVG `assets/`).

**Docs (Gates S/R/A/T/1):** `docs/BASELINE-MAP.md` · `REPORT-STUDY.md` · `API-MAP.md` · `TEMPLATE-RESEARCH.md` · `CONCEPTS.md` · this file.
**Shared infra (merge-only):** `client-portal-lab/index.html` gallery + `manifest.json` (5 F05 records) + `DECISIONS.md` F05 sections.

---

## 2 · Measured / computed H1 + container (light + dark)

H1 is `clamp(32px, 3.xvw, 36–38px)`. Computed from the clamp at each viewport (identical in light and dark — colour does not change metrics). Container is `max-width: var(--content)=1400px` with page padding (28px desktop / 18px mobile); on ≥1000px the 232px sidebar is subtracted from the viewport before the content cap applies.

| Width | H1 (V1/V4/V5, 3.4vw→38) | H1 (V2, 3.2vw→36) | H1 (V3, 3.3vw→37) | Main content column (light + dark) |
|---|---|---|---|---|
| 360 | 32px | 32px | 32px | full width − 36px padding (single col; table→cards) |
| 390 | 32px | 32px | 32px | full width − 36px padding (single col) |
| 768 | 32px | 32px | 32px | full width − 36px padding (sidebar collapse breakpoint at 1000px) |
| 1024 | 34.8px | 32.8px | 33.8px | 1024 − 232 sidebar − 56 padding ≈ 736px |
| 1440 | 38px | 36px | 37px | min(1400, 1440−232−56) ≈ 1152px (capped by content column) |

All H1 values are within the C18 band **32–40px** in both themes and all 5 widths. No 80px hero, no giant numerals, no 600px hero art.

> **Measurement method:** values are computed from the CSS clamp and layout rules (no browser binary is available to take pixel screenshots — see §5 Limitations). Not pixel-measured.

---

## 3 · Per-variant verification

QA harness: `node --check` on all inline scripts (0 errors) · BeautifulSoup parse · link/asset existence (0 missing) · CSS `var()` definition check (0 undefined) · remote-URL scan (0 `http(s)` assets) · dead-link scan (0 real `href="#"`) · **jsdom runtime execution** of every page with clicks on theme, all state buttons, tabs, chips, command-palette entries, help toggles, detail openers; plus typing into search + status filter. **0 runtime errors.** **30/30 DOM-mutation assertions pass** (see family-level checks below).

| Variant | Signature interaction | States (pop/empty/skeleton/502+retry) | a11y | Real actions verified |
|---|---|---|---|---|
| V1 Calm Ledger | removable filter chips + URL state + focus-trapped drawer | ✓ | skip link, `role=tab`/`tabpanel`, roving tabindex, `aria-selected`, focus trap, reduced motion | theme→`.dark`; status=Draft filters to 1 row; search `6y6fa`→3 rows; All+Razorpay→1 project row; 502 panel; Projects tab; drawer opens |
| V2 Ops Console | ⌘K palette + `aria-sort` + density toggle | ✓ | sortable `th[aria-sort]`, sticky header, mobile `data-label` card fallback, `caption.sr-only` | sort sets `aria-sort`; `#grid.compact` toggles; palette actions run |
| V3 Attention Queue | count-up KPIs + verdict hero + Review next + priority switch | ✓ | `aria-pressed` segmented/priority controls, quick-actions `<dialog>` | priority switch `aria-pressed`; verdict copy present; count-up guarded by IO + reduced motion |
| V4 Chapter Tabs | sticky rail scroll-spy + crossfade chapters | ✓ | in-page chapter links with `scroll-margin-top`, `aria-current`, focusable sections | 3 chapters present; chapter jump handled (real in-page nav); scroll-spy with IO fallback |
| V5 Status Lanes | 4 counted lanes + roving arrow-key focus (read-only) | ✓ | arrow/Home/End/Enter/Esc keyboard contract, `aria-live` counts, no drag | 4 lanes; All-tab counts sum to 13 (12 requests + 1 project); Requests-view counts sum to 12; arrow-key handler no-crash |

**Shared checks (5/5):** light + dark via `?theme=` + `localStorage` boot-before-paint · keyboard end-to-end · reduced-motion fallback · populated/empty/loading/502-error states · 3 tabs with URL state · status filter (case-insensitive) + search + sort/pagination (honest) + saved views (A12) · AA badge contrast (C4) · one brand ramp (C5) · tokenised cards (C6) · 32–40px H1 (C18) · 232/64 compressed shell (C17) · mobile card/table fallback (C16) · prev/next + gallery links · no external requests · no dead `href="#"`.

---

## 4 · Anti-drift / acceptance checklist (report §7.1)

| Check | Result |
|---|---|
| Identical-skin side-by-side (fail if 2 siblings near-identical) | **PASS** — 5 distinct geometries (ledger / table / hero+queue / rail+chapters / board); unique A+C pairs (CONCEPTS §Table 2) |
| Remote-URL check (no `http(s)` assets/fonts/scripts) | **PASS** — 0 |
| Dead-link check (no `href="#"`) | **PASS** — 0 (SVG `<use>` fragments are not links) |
| Token check (only §5 colours/radii/spacing) | **PASS** — 45 tokens defined, 38 used, 0 undefined; no raw hex card borders |
| Scope check (only F05 folder + shared-infra merges + docs) | **PASS** — no other family edited |
| C/A coverage from manifest | **PASS** — C16/C17/C4/C5/C6/C18 in 5/5; A12 saved views in 5/5 (≥3/5 required) |
| Hierarchy < 2s, KPI grammar, table completeness, nav ≤ 9, colour AA, type scale, dark parity, keyboard, empty/loading/error, mobile, performance, legal | applied per variant; every finding classified |

**Findings classification:**
- **Blocker:** 0 open.
- **Major:** 0 open.
- **Minor (documented, intentional):**
  - Pagination `Next` does not invent rows 13–26 (only page 1 captured) — reveals an honesty note instead. Frozen `1 / 3` retained. Anti-invention by design (see DECISIONS §2).
  - `Expired Quote` / `Revision Requested` are UI-only display labels absent from the frozen filter `<option>` list; these rows are reachable via “All statuses” and search. Swagger has no matching enum → no endpoint invented; filter matching made case-insensitive so `Converted to project` matches its row.
  - Detail drawer is a demo affordance for the F07 detail route (only captured fields shown).

---

## 5 · Limitations (stated, not hidden)

- **No screenshot / pixel QA was run.** No Chromium / Chrome / Firefox / Playwright / wkhtmltoimage binary exists in this sandbox. Light/dark parity and the 360/390/768/1024/1440 layouts were verified by reasoning over the CSS + jsdom DOM execution, **not** by captured screenshots. The H1/container table in §2 is computed from CSS, not measured in a renderer. Do not read this report as claiming a visual screenshot pass.
- jsdom does not do layout/canvas/CSS painting; layout correctness (sticky headers, grid reflow, focus rings, contrast) is argued from CSS, not visually confirmed.
- The 502 error state copy preserves the captured `GET /api/v1/projects` failure (502 + CORS) from audit-metadata; the retry re-runs the designed state, not a live backend call.
- All work is offline; no live API is contacted. `POST`-style CTAs resolve to real Gate-A endpoints conceptually but are demo-labelled in DECISIONS.

---

## 6 · Family winner recommendation

**Winner: V2 “Ops Console”.**

Why: it fixes the most findings at once with the least invention. The dense sticky-header table with real `aria-sort`, a command-palette-first toolbar and a compact/comfortable density toggle directly answers the report's “rows are text-only / table completeness / hierarchy” findings; its mobile `data-label` card fallback is the strongest C16 implementation; and it keeps the frozen 12-row fixture, KPI strip, saved views and all four states intact without adding a single unverifiable feature. It is also the most keyboard- and screen-reader-complete (sortable headers, `caption`, `aria-sort`, focus-trapped drawer).

- **Runner-up:** V3 “Attention Queue” — best narrative (verdict hero + Review next) for a client who wants to know “what needs me?”, but its count-up motion is a slightly weaker fit for reduced-motion purists.
- **Best for power users:** V5 “Status Lanes” — the arrow-key board is the most novel interaction, but read-only lanes (no status endpoint) limit its real-world utility.
- **Best for storytelling:** V4 “Chapter Tabs” — strongest scroll-spy narrative, more scrolling than a work hub usually wants.
- **Safest baseline:** V1 “Calm Ledger” — the frozen pilot, minimal and accessible, but conservative.
