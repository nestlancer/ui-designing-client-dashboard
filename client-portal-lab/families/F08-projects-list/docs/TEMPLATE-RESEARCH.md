# F08 · Projects List — Gate T · TEMPLATE-RESEARCH (run AFTER Gates S→R→A)

## GATE T (F08)
Queries run: 3 (+ report §5's 13 sources) · Refs opened: 9/≥8 · TEMPLATE-RESEARCH.md written: YES
Patterns mapped to V1–V5: YES · No invented API features: YES · Order S→R→A→T respected: YES
Gate: PASS

**Search queries:** “client portal project list dashboard design template shadcn” · “project detail page milestone timeline deliverables UI design agency client portal” · “best project management dashboard templates 2026 Linear Asana Monday project overview”. Pages below were opened (search-result study + direct fetch for ★). Layout/hierarchy/interaction only — never colours, logos, or features without Gate-A endpoints.

| # | Reference (URL) | Page-job match | Patterns adopted | Rejected + why |
|---|---|---|---|---|
| 1 ★ | shadcn Projects List block — https://shadcnexamples.com/projects-lists | Exact: responsive project-card grid, progress, due meta, card actions, dark-aware | Card anatomy discipline (title → status → meta → action), grid rhythm → **V1**; bento size variance idea → **V5** | Avatar stacks, “% + weeks left”, New Project CTA — **no such fields/endpoints in `13b`/Swagger**; colour-coded top borders (colour is not an axis) |
| 2 ★ | JetAdmin “Client Portal Templates: 6 Layouts” — https://www.jetadmin.io/blog/client-portal-template/ | Project-portal layout: Home = active projects + items awaiting approval | “Home answers *what needs attention now*” → **V3** hero; “three useful pages over eight half-empty” restraint → all | Approvals/Invoices pages — other families; no new routes invented |
| 3 | Shadcn Studio PM templates roundup — https://shadcnstudio.com/blog/shadcn-project-management-dashboard-templates/ | List/board/timeline view-switching for the same records | One dataset, multiple geometries (list vs board vs timeline) legitimises **V2 table / V4 timeline / V5 board** over identical 2 records | Kanban drag-mutation, sprints/roadmaps — no client endpoint |
| 4 ★ | Sprintrix (shadcn PM template) — https://shadcnstudio.com/templates/admin-dashboard/sprintrix | Dense projects workspace, list view with filters/due dates | Dense ops-table grammar (sticky head, mono meta, density) → **V2** | Issue tracking, members/teams, billing — out of family + no endpoints |
| 5 | AdminLTE “10 Best Project Management Dashboard Templates” — https://adminlte.io/blog/project-management-dashboard-templates/ | PM dashboard survey (extends report [1][2][5]) | Table-first vs card-first trade-off framing → V1 vs V2 contrast; verdict-first summaries → V3 | Chart widgets for 2 records — chartjunk; report chart rule: one big number |
| 6 | thefrontkit “13 Best shadcn Dashboard Templates 2026” — https://thefrontkit.com/blogs/best-shadcn-dashboard-templates-2026 | shadcn shell patterns (official Blocks dashboard-01, sidebar variants) | Sidebar+header+content shell restraint, URL-state tables → shell + V2 sort state | Auth/billing starter features — not this family |
| 7 | Client-facing PM portals guide — https://customer-portals.com/use-cases/project-management-portals/ | “Curated view, not full access”: milestones/deliverables/deadlines visible, internals hidden | Client-appropriate density (cards explain, tables are opt-in power view) → V1 default calm, V2 labelled dense | Budget overview/Gantt — no captured budget/schedule data |
| 8 ★ | ClientVenue “Client-Facing Project Management” — https://clientvenue.com/blog/agency-client-facing-project-management | The 4 client questions: on track? working on? deliverables? **what do I need to do?** | Action-tracker framing → **V3** “your next step”; approval-record timestamp idea → F09 link copy | Weekly-update automation, CRM/reporting — no endpoints |
| 9 | Report §5 benchmarks [1][2][7][9] (AdminLTE verdict-first, Tailwind Admin QA checklist) | Lab’s own benchmark canon | Empty/loading/error as designed states; skeleton-over-spinner; instructive empty (C14) → all variants | — (canon, extended not replaced) |

## Adopted-pattern → variant mapping

V1 Calm Grid ← #1 card grid + #7 curated calm · V2 Ops Ledger ← #4 dense table + #6 URL state · V3 Next-Step Hero ← #2 attention-home + #8 action tracker · V4 Delivery Story ← #3 timeline view of same records · V5 Bento Board ← #1 card variance + #3 board grouping (by status, read-only).

No features invented from templates; all CTAs still Gate-A or demo-labelled.
