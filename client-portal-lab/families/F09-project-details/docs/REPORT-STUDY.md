# F09 · Project Details + 6 Tabs — Gate R · REPORT-STUDY

## GATE R (F09)
MD read: YES · XLSX sheets: 10/10 · C-items mapped: 8/8 · A-items mapped: 7/7
KEEP listed: YES · Checklist copied: YES
Gate: PASS

`.md` read cover-to-cover; `.xlsx` 10/10 sheets opened. **Discrepancies recorded (.md wins):** the report’s project examples (“Corporate LMS is 40% done and needs your ₹20,880 mid-project payment”, C19’s “third milestone”) describe the Priya Nair screenshot session, **not** the Arjun Mehta DOM `14b–14g` (57%, 2 × ₹30,000.00, Payment Not due yet). Per prompt §4/§6 the **captured figures are frozen** and report figures treated as illustrations. No C/A wording conflict between §6 and sheets 5–6 for this family.

## Executive findings that touch this page (quoted)

- **#2 🔴:** the projects 502 + CORS — detail route renders the bare error card; A13 degraded design required.
- **#7 🟠:** “**‘Awaiting you’ is the strongest idea in the product** — but it exists only on the dashboard and is not reused on the pages that need it (project milestones…)” → replicate on milestones (KEEP + V3).
- **#3/#4/#12:** badge AA failure (1.73–3.23:1), dual brand ramps, raw card classes → C4/C5/C6. §3.2 compressed type → C18.
- **§4.2 business weight:** Project milestones “🔴 Decides retention · 🟢 Best screen — Scale the pattern; add the ‘why locked’ microcopy”. Bottom line: “What is missing is not *features*, it is **hierarchy, restraint, accessibility and one coherent design system**.”

## Page-inventory rows (§4.1 rows 17–22 + files/dialog)

| Tab | Report verdict (quoted/paraphrased faithfully) |
|---|---|
| Overview | Title/desc/status/%, milestones count, progress bar, action bar, 6 tabs, status 3-card row, feeds, feedback. Issue: “‘Latest progress’ and ‘Recent updates’ show the same feed twice” |
| Progress | “Filter chips (All/Updates/Milestones/Deliverables), date-grouped feed, Request changes form — ✅ Date grouping is right. Feed rows are text-dense” |
| Milestones | “✅ Best screen in the portal. Missing: **‘why is this locked?’** microcopy, no preview of next milestone’s deliverables” |
| Deliverables | “Grouped by milestone, file cards, Approved badge, Preview link — ✅ Approval flow exists but no **reject / request revision** affordance visible” |
| Messages / Files | Project thread + file cards; preview modal blank (C13, screenshot `043`) |

## Token table applied

Identical locked §5.2 file as F08/F05/F06 (`shared/tokens.css`, imported as-is): one blue `--primary`, AA status triples, tokenised cards, H1/money 32–40px `tabular-nums`, mono for UUID/dates, sidebar 232/header 64. Violet `--accent-1` deleted (ring = primary).

## CHANGE — every item in all 5 variants

- **C2 Verdict line:** plain-English sentence under H1 built **from frozen figures**: 57% complete · Milestone 1 ₹30,000.00 approved · Milestone 2 in progress · no payment due yet. (Report’s ₹20,880 sentence is its LMS illustration.)
- **C13 Real file preview:** designed dialog — rendered page-1 preview (lab rendering, labelled; original PDF not in repo) + metadata + Open/Download + unsupported-type card pattern. Never a blank modal.
- **C19 “Why is this locked”:** Gate-S verdict — the gated surface in the Arjun Mehta DOM is *Payment: Not due yet*; every gated badge gets why + what-unlocks-it microcopy, reusing the captured LMS lock sentence pattern.
- **C17 / C4 / C5 / C6 / C18:** compressed shell with Explore popover · AA icon+text badges · single blue ramp · tokenised surfaces · 32–40px H1 + ₹30,000.00 money figures.

## ADD — priority + coverage (recorded per-variant in manifest)

- **A1 🔴P1 “Ask AI about this project” → 5/5.** No Swagger AI endpoint exists → explicitly **demo-labelled**; answers restricted to frozen facts (next step, payment-due?, what’s approved).
- **A2 🔴P1 Project-scoped Help & FAQ hub → 5/5.** Lab-authored Q&As from frozen facts + real endpoints only.
- **A3 🔴P1 Milestone unlock explainer + “unlock me” deep links → 5/5.** “What happens next, whose move” per milestone; links jump to the exact tab/panel.
- **A4 🔴P1 Deliverable reject / request-revision with reason → 5/5.** Real endpoints `POST /deliverables/{id}/reject`, `/milestones/{id}/request-revision`. Capture is 0/0 → review pattern exercised on the captured wireframes file, labelled (DECISIONS).
- **A13 Degraded banner → 5/5 (P0 note):** 502 state = banner + frozen error copy + retry + support.
- **A14 🟡P3 Expectation log (promised vs delivered) → 5/5** (≥3 required): built only from the 2 frozen milestones + due dates.
- **A15 🟡P3 Activity digest → 5/5** (≥3 required): one timeline merging only captured events (started 10/5, messages Oct 5, wireframes file, M1 approved, M2 in progress).

## KEEP (5/5)

Milestone stepper with Delivery/Payment dual status + gated locks (“genuinely great; the model competitors don’t have”) · “Awaiting you” pattern reused on milestones · graceful wording (“Your team will post daily updates here as work continues”) · shadcn token architecture · ⌘K hints · domain honesty.

## Benchmarks applied (report §5) + roadmap

Verdict-first [1] · Moxo “what happens next, whose move” [1] → A3 · Softr Ask-AI/resource hub [11] → A1/A2 · approval loops [8][13] → A4 · Pulse scope discipline [2] → A14 · empty/error craft [7] → C13/A13. Roadmap: **P0** (502 banner) · **P1** foundations · **P4 Delivery loop** (unlock explainer, reject/revision, help hub, Ask-AI, expectation log — this family is P4’s core).

## Acceptance checklist (§7.1) — copied as QA list

Hierarchy <2s · KPI value+label+why, one hero · tables complete + mobile fallback · nav ≤9, real ⌘K · one ramp, AA text/UI · display type + mono · dark parity · keyboard/ARIA/skip · empty+skeleton+error on every tab/panel · 375–1440 no h-scroll · skeletons, no shift · honest legal/next-step routes.
