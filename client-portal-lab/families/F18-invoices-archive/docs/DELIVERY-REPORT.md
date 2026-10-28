# F18 · Invoices Archive — Delivery Report (Gate 3)

**Route:** `/invoices` · **H1:** “Invoices” · **Subtitle:** “Your issued invoices with downloadable PDF copies for accounting and tax records.” · **Family dir:** `families/F18-invoices-archive/` · **Authored:** 2026-10-28, five standalone `index.html` files hand-written one at a time (no design-generation script; no branch/commit/push).

## 1 · What shipped

| Variant | Name | A · Geometry | B · Priority | C · Narrative | D · Density | E · Signature interaction |
|---|---|---|---|---|---|---|
| V1 | Dense Invoice Ledger | sidebar + full-width table | verdict-first | static rows | dense | Search / filter / sort / pagination + live total |
| V2 | Saved-View Rail | narrow saved-view rail + table | action-first | saved-view-led | airy compact | `localStorage` saved views with “what this shows” explanations |
| V3 | Bento Archive | unequal bento + chapters | numbers-first | chapter-led | dense tiles | Status chapter chips + card deck + table detail |
| V4 | Awaiting-You Workbench | sticky left rail + bento | action-first | queue-led | airy | Awaiting-you queue + explicit “what unlocks this” |
| **V5 ★** | **Narrative Archive** | single narrative column | narrative-first | static sections | editorial | Long-form archive with full table, documents and legal footer |

All five ship: “View payments”, the captured headers Invoice / Project / Amount / Status / Actions, Download invoice / View, the five captured rows, gross **`₹1,12,125.00`**, mobile card fallback, four switchable states, saved views, ⌘K, light/dark, reduced motion and `noscript`. A10 (statement / GST) is **demo-labelled** in four of five variants and honestly composed from per-invoice downloads — never presented as a real endpoint.

## 2 · Gate printouts

```
## GATE S (F18)   Screenshot 003 + HTML snapshot 32 + audit metadata mapped · Gate: PASS
## GATE R (F18)   MD + 10/10 XLSX sheets studied · C/KEEP/A10/A12 mapped · Gate: PASS
## GATE A (F18)   4 specs + README read · 6 distinct spec endpoints referenced (rest are client-side compositions) · 5 demo-only CTAs · Gate: PASS
## GATE T (F18)   6 primary + 4 supplementary queries · 12/≥8 refs opened (R13 search snippet excluded) · Gate: PASS
## GATE 1 (F18)   Concept cards 5/5 · Sketches 5/5 · Difference test PASS · C 5/5 · A12 5/5 · Gate: PASS
## GATE 2a (F18)  V1 pilot hand-built and frozen: 4 states, 2 themes, 5 widths, keyboard end-to-end · Gate: PASS
## GATE 2b (F18)  V2–V5 hand-authored one by one + self-critique · gallery F18 section + manifest 5 records + DECISIONS §9 appended · generator scripts: 0 · Gate: PASS
## GATE 3 (F18)   Variants built by hand: 5/5 · Generator scripts: 0
                  Widths×themes checked: 5 × 2 = 10 per variant (360/390/768/1024/1440 light+dark)
                  Checklist pass: 5/5 · Blockers open: 0 · Gate: PASS
```

## 3 · Verification matrix (measured)

| Check | Result |
|---|---|
| `node --check` on the 10 inline scripts of this family | **0 errors** |
| Script-stripped `href`/`src` target check | **0 broken** · remote assets **0** · `href="#"` **0** · duplicate IDs **0** |
| Chromium 156 headless: 5 variants × 2 themes × 5 widths = **50 page loads** | **0 console errors · 0 page errors · 0 failed requests · 0 page-level horizontal overflow** |
| Interaction suite (⌘K, theme + `aria-pressed`, 4 state pills + Data, `data-demo-nav` boundary dialog + Tab trap + Esc + focus restore, ARIA tabs) | **5/5 PASS** |
| Exhaustive button smoke test | **95 buttons clicked · 0 JS errors · 0 leaked scroll locks** |
| Computed-colour AA sweep, light + dark | **0 text failures** |
| Computed font-size sweep | **0 visible text below 11px** |
| No-JS context | **5/5** render the captured rows, gross and nav as a text fallback with no horizontal scroll |
| `reducedMotion: reduce` | **5/5** all `.reveal` content visible |

## 4 · Findings classification

- **Blockers (0 open).** 20 dead F20/F21/F23 nav links in this family replaced with real gallery hrefs + honest `data-demo-nav` boundary dialogs.
- **Major (resolved).** F18 V1, V2, V4 and V5 had no `noscript` fallback. All five now list the five captured invoices and the `₹1,12,125.00` gross as static text.
- **Minor (resolved, honesty).** V3's gallery card previously claimed “a truly static, no-JS-friendly archive”. V3's card deck is JS-rendered; the gallery copy now correctly says “a text no-JS fallback still lists all five rows”.
- **Minor (known).** V3's chapter chips are **not sticky**. V2's “Overdue” saved view uses an amount heuristic, not a captured backend filter. V4's “12 days overdue” is derived from snapshot 26. All three are labelled.
- **Minor (known).** Saved views are `localStorage` only, with no backend persistence. No statement / GST endpoint exists.
- **Not measured.** “Hierarchy understood in <2s” was not human-timed; only its structural preconditions were verified.

## 5 · Winner

**F18 · V5 “Narrative Archive” — `families/F18-invoices-archive/V5/index.html`.** An invoice archive is mostly read by an accountant who needs context, not speed-clicks. V5 keeps the full captured table but wraps it in a scannable narrative — gross, what “Issued” vs “Pending” means, what awaiting-you means, where the legal and dispute routes live — while still shipping search, filter, sort, pagination and saved views. V1 is the denser operator alternative.

## 6 · Limitations (stated, not hidden)

- No live backend. “Download invoice” shows a demo dialog; **no real PDF is fetched**. “View” uses captured row data only.
- **No statement-of-account or GST-summary endpoint exists.** A10 is demo-labelled or honestly composed from five `GET /api/v1/invoices/{id}/download` calls.
- No date column was captured on `/invoices`; Oct 5–6, 2026 dates are **derived** from payment rows in snapshot 26 and are labelled as derived.
- Captured status labels are only `Issued` / `Pending`. `payments.openapi.json` has no named `Invoice` DTO or enum schema; invoice numbers are the captured `NL-INV-2026-00000N` strings.
- Rows shipped: `000045` Fixture `₹625.00` Pending; `000005` / `000004` B2B `₹29,500.00` Issued; `000002` Khandesh `₹22,500.00` Issued; `000001` Khandesh `₹30,000.00` Pending.
- Pixel screenshots were not archived; light/dark parity is asserted from computed colours and contrast ratios.

## 7 · Preview

```bash
cd /home/user/ui-designing-client-dashboard
python3 -m http.server 8130
# http://localhost:8130/client-portal-lab/                      (gallery)
# http://localhost:8130/client-portal-lab/families/F18-invoices-archive/V5/index.html
```

Docs: `BASELINE-MAP.md` · `REPORT-STUDY.md` · `API-MAP.md` · `TEMPLATE-RESEARCH.md` · `CONCEPTS.md` · `DECISIONS.md` · this report. Shared evidence: `DECISIONS.md` §9 (lab root), `manifest.json` (F18 records), gallery `index.html` (`#f18`).
