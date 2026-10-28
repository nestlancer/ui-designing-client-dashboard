# F14 · Billing Center — Delivery Report (Gate 3)

**Route:** `/payments` · **H1:** “Billing Center” · **Lead:** “Payment history, invoices, and milestone payment tracking.” · **Family dir:** `families/F14-billing-center/` · **Authored:** 2026-10-28, five standalone `index.html` files hand-written one at a time (no design-generation script; no branch/commit/push).

## 1 · What shipped

| Variant | Name | A · Geometry | B · Priority | C · Narrative | D · Density | E · Signature interaction |
|---|---|---|---|---|---|---|
| V1 | Settled & Outstanding Ledger | sidebar + full-width table | verdict-first | static captured rows | dense | Static 11-row ledger, verdict strip, chips, pager and deterministic Ask AI. **Does not load `lab-core.*`** — fully standalone with inline sprite. |
| **V2 ★** | **Dense Ops Table** | sticky ops table | numbers-first | local ARIA tabs | dense | Sortable headers, Home/End tab keys, saved views, live filtered gross |
| V3 | Needs-You Work Centre | split queue + evidence table | action-first | queue-led | airy | Work queue leads; explicit “what unlocks this”; demo statement dialog |
| V4 | Numbers-First Money Wall | bento KPI wall + chapters | numbers-first | scroll-spy chapters | dense tiles | IntersectionObserver chapter nav, count-up KPIs |
| V5 | Bento Billing Desk | unequal desk tiles | object-first | tile-led | airy | Ask AI / statement / trust tiles above the ledger |

All five: search, status filter, sort, pagination, mobile card fallback, live filtered total, ⌘K palette, four switchable states, light/dark, reduced motion, `noscript`, skip link, one `<h1>`, mono IDs/money, icon+text status badges.

## 2 · Gate printouts

```
## GATE S (F14)   Screenshots + HTML + audit metadata mapped · docs/BASELINE-MAP.md written · Gate: PASS
## GATE R (F14)   MD + 10/10 XLSX sheets studied · C-items 6/6 · A-items 4/4 · KEEP listed · Gate: PASS
## GATE A (F14)   4 specs + README read · 19 distinct spec endpoints referenced · 5 demo-only CTAs · Gate: PASS
## GATE T (F14)   6 primary + 4 supplementary queries · 12/≥8 refs opened (R1–R12 fetched; snippets not counted) · Gate: PASS
## GATE 1 (F14)   Concept cards 5/5 · Sketches 5/5 · Difference test PASS · C 5/5 · P1 A 5/5 · P2–P3 ≥3/5 · Gate: PASS
## GATE 2a (F14)  V1 pilot hand-built and frozen: 4 states, 2 themes, 5 widths, keyboard end-to-end · Gate: PASS
## GATE 2b (F14)  V2–V5 hand-authored one by one + self-critique · gallery F14 section + manifest 5 records + DECISIONS §9 appended · generator scripts: 0 · Gate: PASS
## GATE 3 (F14)   Variants built by hand: 5/5 · Generator scripts: 0
                  Widths×themes checked: 5 × 2 = 10 per variant (360/390/768/1024/1440 light+dark)
                  Checklist pass: 5/5 · Blockers open: 0 · Gate: PASS
```

## 3 · Verification matrix (measured, not asserted)

| Check | Result |
|---|---|
| `node --check` on the 10 inline scripts of this family | **0 errors** (F14 V1 `IntersectionObserver` bracket defect found and repaired) |
| Script-stripped `href`/`src` target check | **0 broken** · remote assets **0** · `href="#"` **0** · duplicate IDs **0** |
| Chromium 156 headless: 5 variants × 2 themes × 5 widths = **50 page loads** | **0 console errors · 0 page errors · 0 failed requests · 0 page-level horizontal overflow** |
| Interaction suite (⌘K + Arrow/Home keys + Esc, theme + `aria-pressed`, 4 state pills + return to Data, `data-demo-nav` boundary dialog + 8× Tab focus-trap + Esc + focus restore, ARIA tabs) | **5/5 PASS** |
| Exhaustive button smoke test (every non-state button clicked, dialogs closed, no leaked body-scroll lock) | **25 buttons on V1 · 102 across the family · 0 JS errors · 0 leaked scroll locks** |
| Computed-colour AA sweep, light + dark | **0 text failures** (small brand text uses `--primary-ink`; white on filled primary = 4.84:1 light, dark ramp one step darker) |
| Computed font-size sweep | **0 visible text below 11px**; mobile header controls ≥44px |
| No-JS context | **5/5** render the captured content and have no horizontal scroll |
| `reducedMotion: reduce` | **5/5** all `.reveal` content visible |
| KPI/data honesty | Table footer says “Ledger gross · 11 captured rows”; all five carry a visible captured-data note; no static `₹1,38,625.00` remains |

## 4 · Findings classification

- **Blockers (0 open).** Two source defects found and fixed during Gate 3: F14 V1's `IntersectionObserver` syntax error and its state-toggle / stale `onkeydown` handlers; 100 dead F20/F21/F23 nav links across the five money families were replaced with honest gallery links + boundary dialogs.
- **Major (resolved).** Captured KPI totals (`₹81,500.00` paid · `₹31,875.00` pending · `₹0.00` disputed) do not reconcile to the 11-row `₹1,37,750.00` gross. Fixed by **labelling the two datasets as separate captures**, not by changing a number. Seven stale `₹1,38,625.00` values were corrected to `₹1,37,750.00`.
- **Major (resolved).** F14 V4's `grid-column:span 4` created implicit columns at 1-column mobile width (413px document at 360px, even with JS off). Replaced with `1/-1`.
- **Minor (known).** V3 uses both the shared centred dialog and a custom queue drawer; Esc/focus were exercised and no leak was measured, but the two overlays are intentionally not unified. V1's mini-labels are 11px (allowed floor). Hierarchy-under-2-seconds is a perceptual claim that was **not** human-timed; only its structural preconditions (one `<h1>`, one hero, KPI value+label+why) were verified.

## 5 · Winner

**F14 · V2 “Dense Ops Table” — `families/F14-billing-center/V2/index.html`.** The billing centre is a reconciliation job. V2's sortable, filterable, keyboard-complete table with a live filtered gross answers “where is my money?” fastest, while the honest KPI note keeps the captured data intact. V1 is the safest static fallback; V3/V4/V5 are stronger storytellers but make the ledger work harder to read.

## 6 · Limitations (stated, not hidden)

- No live backend. All `GET /api/v1/payments…` references are documentation of verified spec paths; rows are frozen capture data.
- Ask AI is deterministic string matching over those 11 rows and is labelled demo — **there is no AI endpoint**.
- Statement / GST download is **demo-labelled** — no statement-of-account endpoint exists. It composes real per-invoice download calls.
- F14 V1 deliberately uses its own CSS/JS and inline sprite; it does not share `assets/lab-core.*`. Both contracts were QA'd.
- Pixel screenshots were not archived; light/dark parity is asserted from computed colours and contrast ratios in Chromium, not from saved images.
- Dates in the ledger are from the captured rows; no invoice date column was captured on `/payments`.

## 7 · Preview

```bash
cd /home/user/ui-designing-client-dashboard
python3 -m http.server 8130
# http://localhost:8130/client-portal-lab/                      (gallery)
# http://localhost:8130/client-portal-lab/families/F14-billing-center/V2/index.html
```

Docs: `BASELINE-MAP.md` · `REPORT-STUDY.md` · `API-MAP.md` · `TEMPLATE-RESEARCH.md` · `CONCEPTS.md` · `DECISIONS.md` · this report. Shared evidence: `/client-portal-lab/DECISIONS.md` §9, `manifest.json` (F14 records), gallery `index.html` (`#f14`).
