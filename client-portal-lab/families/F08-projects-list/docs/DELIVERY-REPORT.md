# F08 · Projects List — Delivery Report (Gate 3)

**Route:** `/projects` · **Family dir:** `families/F08-projects-list/` · **Authored:** 2026-10-27, hand-authored (no design-generation script).

## 1 · What shipped

| Variant | Name | Size | Geometry (A) | Narrative (C) | Signature interaction |
|---|---|---|---|---|---|
| V1 | Calm Grid | 34 KB | card grid | static sections | ⌘K command palette (real actions only) |
| V2 | Ops Ledger | 29 KB | sticky ops table | tab-led | `aria-sort` table, mobile card fallback |
| V3 | Next-Step Hero | 25 KB | split hero | queue-led | count-up, sticky mobile CTA, `/` search |
| V4 | Delivery Story | 23 KB | single editorial column | chapter timeline | reveal-on-scroll |
| V5 | Bento Board | 24 KB | 12-col bento | lane-led | arrow-key tiles + crossfade preview pane |

All under the ≤70 KB soft budget. All import `shared/tokens.css` + `shared/base.css` as-is (one locked blue scheme; colour is never an axis).

## 2 · Gate 3 checklist

| Check | Result |
|---|---|
| Frozen content only (2 projects, “In progress · Started 10/5/2026”, captured header/lede) | ✅ in 5/5 — no invented %, money or third project |
| States: populated / empty (C14 copy “Accept a quote to open your first project →”) / loading / 502 error (A13: banner + retry + support + system status) | ✅ in 5/5, reachable via “Lab states” + `?state=` |
| CHANGE C17 shell / C4 AA badges / C5 one ramp / C6 tokenised cards / C18 H1 32–40 px | ✅ 5/5 |
| ADD A13 degraded state | ✅ 5/5 |
| Difference test (≥3/5 axes per pair, incl. A or C; unique A+C) | ✅ per `CONCEPTS.md` |
| WCAG 2.2 AA, icons+text badges, keyboard, reduced-motion, 360–1440 CSS breakpoints, light+dark | ✅ implemented; see verification limits below |
| No `href="#"`, no remote assets, every CTA → real route or demo-labelled | ✅ verified programmatically |

## 3 · Verification (honest)

- `node --check` on all extracted inline scripts: **PASS** (5/5).
- BeautifulSoup parse per file: exactly one H1 “Projects”, zero `href="#"`, zero remote `src`/`href`.
- **Not run:** browser/screenshot QA — no Chromium/Firefox binary exists in the sandbox. Light/dark and width behaviour are implemented and reasoned from CSS, not measured from pixels. This is stated, not hidden.
- Terminal verification: `node --check` + Python parse only — no stronger runtime claim is made.

## 4 · Winner

**V3 · Next-Step Hero.** A two-project list has one job: “which project needs me, and what's the next step?” V3 answers in a single above-the-fold composition — the captured “two in-progress engagements” fact as the headline, the one project with a detail surface promoted, and a search that reads as an invitation rather than a control panel. V1 is the safe classic; V3 is the one that proves the page doesn't need to look like a database. Note the discipline shared by all five: the F08 surface shows **no progress percentage**, because the list capture doesn't carry one — 57% belongs to F09.

## 5 · Preview

```
python3 -m http.server 8130   # from repo root
→ /client-portal-lab/  (gallery, F08 section) or /client-portal-lab/families/F08-projects-list/V3/index.html
```
