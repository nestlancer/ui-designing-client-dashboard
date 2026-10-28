# F03 · Dashboard Overview — DELIVERY REPORT

**Family:** F03 · Dashboard overview · `families/F03-dashboard-overview/`
**Built:** 2026-10-28 · 5 variants (V1–V5), all hand-authored
**Locked scheme:** `shared/tokens.css` + `shared/base.css` imported as-is, never forked

## 1 · What was built

The dashboard-overview family — the client shell, the dark theme, and the mobile proof. It owns the "Overview" surface: one north-star verdict, four vitals, the pipeline, the Awaiting-you spine, and the 4-tab workbench. Five variants explore how a dashboard can lead.

| Variant | Layout | Lead | Interaction |
|---|---|---|---|
| **V1 Calm Overview** | single column | verdict-first | palette + scroll reveals |
| **V2 Verdict Hero** | split hero | action-first | count-up CTA + sticky rail |
| **V3 Awaiting-You Spine** | 2-col sticky rail | queue-led | drawer-overlay + A9 health mini-grid |
| **V4 Health Bento** | bento grid | numbers-first | crossfade + A9 health cell |
| **V5 Dense Ops Workbench** | dense KPI strip + table | tab-led | chips + aria-sort + A11 |

## 2 · Locked content (all variants)

- H1 "Overview" · verdict line (invoiced ₹81,500.00 / pending ₹31,875.00) · four vitals (Open requests 12 / Active projects 2 / Pending quotes 4 / Unread messages 2)
- Hero "One action will unblock your workspace." → **Complete checkout**
- Pipeline bars (Active / Done / Collected / Pending ₹31,875.00) · Awaiting-you strip · 4 count-bearing tabs (Quotes 0 / Pay Now 4 / Projects 0 / Inbox 2)
- C14 empty "Accept a quote to open your first project →" · 260→232px sidebar · Explore popover

## 3 · Coverage

- C1–C18: 5/5 (every variant carries the verdict, vitals, pipeline, Awaiting-you, workbench, activity, shell, palette, dark + mobile).
- A9 (Health Bento): V1 / V3 / V4 (3/5).
- A11 (action-led): V2 / V5 (+ V3).

## 4 · API refs (documented, never called)

`GET /api/v1/system/status` · `/payments` · `/requests/stats` · `/projects/stats` · `/quotes` · `/projects` · `/messages` · `/notifications`

## 5 · Winner

**V3 Awaiting-You Spine.** The sticky left rail is the page spine: the pending payment ₹31,875.00 is the primary action, with quotes expiring, unread and data-export below it; the right column carries live vitals, pipeline bars and the workbench. It answers "what needs me" in one glance while keeping the single north-star verdict.

## 6 · Honest limitations

No live backend — `api_refs` document verified spec paths, never calls. The dashboard KPIs (invoiced ₹81,500.00 / pending ₹31,875.00) are the locked fixture figures; they do not reconcile to any single captured row set and are labelled as the dashboard's own captures. Gate T templates were fetched online (≥8 refs, see `docs/TEMPLATE-RESEARCH.md`); the gallery, manifest and DECISIONS merges are pure text.
