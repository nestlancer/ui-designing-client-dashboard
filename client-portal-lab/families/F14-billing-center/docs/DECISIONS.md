# F14 · Billing Center — Family Decisions

**Authored:** 2026-10-28 · Hand-written, one variant at a time. No generator script, no shared megatemplate, no branch/commit/push. Shared evidence: `/client-portal-lab/DECISIONS.md` §9. Winner and full QA: `DELIVERY-REPORT.md`.

## 1 · Hand-authorship attestation

Five standalone `index.html` files were authored individually. Each writes its own layout CSS in its own `<style>` block and its own interaction JS. `shared/tokens.css` and `shared/base.css` were imported as-is and **never edited**. `assets/lab-core.*` is an optional utility layer (theme, ⌘K, dialog, state switcher, ARIA tabs, sprite), not a page template. **F14 V1 deliberately loads neither `lab-core.css` nor `lab-core.js`** — it is a fully standalone page with an inline SVG sprite, proving that the standalone contract holds without the utility layer.

## 2 · The KPI / ledger reconciliation decision (most important)

The captured KPI cards read `Total paid ₹81,500.00 · Pending ₹31,875.00 · In dispute ₹0.00`, but the 11 frozen ledger rows sum to **`₹1,37,750.00`** (6 × ₹625.00, 2 × ₹29,500.00, 2 × ₹22,500.00, 1 × ₹30,000.00). Screenshot-only figures (`₹36,000`, `₹48,000`) were rejected because the captured HTML is truth. **Decision: do not force either dataset to match.** All five variants label the table footer **“Ledger gross · 11 captured rows”** and carry a visible note that the KPIs are separate account totals from the same capture. Seven stale `₹1,38,625.00` values were corrected to `₹1,37,750.00`.

## 3 · Five demo-only CTAs

1. **Ask AI** — deterministic string matching over the 11 rows, labelled demo; **there is no AI endpoint**.
2. **Statement / GST download** — demo-labelled; **no statement-of-account endpoint exists**, so it honestly composes five `GET /api/v1/invoices/{id}/download` calls.
3. **Saved views** — `localStorage` only, no backend persistence.
4. **Dispute / invoice / receipt actions** — demo dialogs or real lab routes; no PDF is fetched.
5. **⌘K actions** — real lab routes only; never invented API calls.

## 4 · A-item coverage

| Item | Coverage | Notes |
|---|---|---|
| A1 Ask AI | **5/5** | Deterministic, labelled, never presented as a live model |
| A5 Work queue | **5/5** | Strongest in V3 / V4 / V5 |
| A10 Statement / GST | **5/5** | Demo-labelled; honest per-invoice composition |
| A12 Saved views | **4/5** | V1 uses chips rather than persistent views |

C-items C4 (badge contrast), C5 (single blue ramp), C6 (tokenised cards), C8 (one primary), C16 (mobile table fallback), C17 (compressed shell) and C18 (larger H1/money) are present in 5/5; C9 (what unlocks this) leads in V3.

## 5 · Navigation honesty

20 dead F20/F21/F23 nav links in this family were replaced with real `../../../index.html` hrefs plus `data-demo-nav` boundary dialogs stating that those families are not part of this lab. No `href="#"` and no remote asset remains. F14 V1 implements its own `[data-demo-nav]` handler.

## 6 · Known issues

- V3 uses both the shared centred dialog and a custom queue drawer; Esc/focus/overflow were measured with no leak, but the two overlays are intentionally not unified.
- V1's 11px micro-labels sit at the allowed floor; dark AA depends on the `--primary-ink` / dark `--brand-500` corrections in `lab-core.css` and V1's own `.dark{--p:#465fff}`.
- No live backend, no human timing study of “hierarchy <2s”, no archived pixel screenshots.

## 7 · Winner

**V2 · Dense Ops Table** — see `DELIVERY-REPORT.md` §5.
