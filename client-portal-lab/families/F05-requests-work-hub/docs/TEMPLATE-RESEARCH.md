# F05 · Requests Work Hub — Gate T · TEMPLATE-RESEARCH

**Order respected:** Gate S (`BASELINE-MAP.md`) → Gate R (`REPORT-STUDY.md`) → Gate A (`API-MAP.md`) → complete UI requirements restated below → **only then** web searches. No template was opened before Gates S/R/A were written.

## Complete UI requirements (restated before searching)

One page family, 3 routes (`/requests`, `?view=all`, `?view=projects`), full app shell (232px sidebar + 64px header + breadcrumb + ⌘K + theme + bell + avatar, Explore popover), H1 `Work Hub` + frozen header line, KPI strip `Total requests 26 / Under review 0 / Quoted 0 / Projects 5`, `New request` CTA, three deep-linkable tabs `All · Requests (12) · Projects`, a 9-value status filter, search, sortable/paginated rows (`Showing 1–12 of 26`, `1 / 3`), real request-detail destinations, populated + empty + skeleton + 502-error states, mobile card-fallback (C16), one locked blue token scheme (C4/C5/C6/C18), saved views (A12), light + dark, 360–1440, keyboard-correct. Every CTA → Gate-A endpoint or demo-labelled.

## GATE T (F05)
Queries run: 6 · Refs opened: 11/≥8 · TEMPLATE-RESEARCH.md written: YES
Patterns mapped to V1–V5: YES · No invented API features: YES · Order S→R→A→T respected: YES
Gate: PASS

## 1 · Search queries used

1. `client portal work hub request list dashboard table UI design patterns 2026 saved views filter chips`
2. `shadcn admin dashboard data table template empty loading error states sortable pagination design`
3. `kanban status lanes board UI design pattern keyboard accessible cards dashboard`
4. `SaaS filtering sorting UX saved views segments URL state`
5. `table-first admin dashboard design Stripe dense table 2026`
6. `Nestlancer client portal lab F05 requests work hub design reference` (found the repo's own PR #4)

## 2 · References opened and studied (11)

| # | Name | URL | Page-job match | Patterns to adopt (layout/hierarchy/interaction only) | Patterns rejected + why |
|---|---|---|---|---|---|
| 1 | **Setproduct — Data table UI design reference 2026** | https://www.setproduct.com/blog/data-table-ui-design | Exact job: request list as a scannable table | Toolbar / sticky header / footer anatomy; density is a feature (compact vs comfortable); semantic `table`/`thead`/`th scope`; text left, numbers right; ellipsis + title for long names; KPI cards above, table below | Row selection + bulk-action toolbar — **no client endpoint** for bulk status changes (Gate A: admin-only `PATCH /api/v1/admin/requests/{id}/status`). Rejected as an invented feature. |
| 2 | **SaaSUI — Filtering & Sorting UX patterns** | https://www.saasui.design/blog/saas-filtering-sorting-ux-patterns | Exact job: 9-value status filter + search | Separate “narrow” (filter) vs “order” (sort); applied-filter chips with one-click clear; **saved views/segments as durable objects** (“My open high-priority deals”); URL/persistence so a filtered view is a link → basis of A12 | Faceted side panel with arbitrary dimensions — F05 has only status + text (`GET /requests` has `page`, `limit`, `status`), so facets would invent filters. |
| 3 | **AdminLTE — Admin Dashboard Design (2026)** | https://adminlte.io/blog/admin-dashboard-design/ | Client-facing vs operational dashboard decision | “Table-first — when the data IS the interface” (Stripe): dense impeccably-set table, right-aligned tabular numerals, muted gridlines, status chips → V2; “embedded/client-facing” needs plainer labels + a stated conclusion → V1/V3 verdict line | Five equal KPI walls (“dense analytics wall”) and dark-first decoration — report §1 finding #5; not for a client. |
| 4 | **shadcn/ui — Data Table docs** | https://ui.shadcn.com/docs/components/base/data-table | Table primitives used by the live portal | Sorting, filtering, pagination, `aria-sort`, row actions as separate features; keep column definitions stable so filtering doesn’t rebuild the table | React/TanStack dependency — lab is offline, no CDN/framework allowed; behaviour re-implemented by hand in small in-page JS. |
| 5 | **shadcn.io — Empty Table example** | https://www.shadcn.io/examples/empty-table | Empty state for the All tab / over-filtered list | Empty = icon media + title + teaching description + one primary action (`New request`); `aria-hidden` on decorative icon; place it where rows would be | Its generic “Add Entry” copy — replaced with frozen Nestlancer wording + `Clear filters`. |
| 6 | **SaaSUI — Kanban & Board UX patterns** | https://www.saasui.design/blog/saas-kanban-board-ux-patterns | Status-lane view of the same 12 rows | Columns = ordered workflow states with **counts in headers**; card face = title + high-signal meta (status, date, id) only; restraint with colour; column header as a status line → V5 | Drag-to-move = status change; **no client endpoint** for status transitions → rejected. V5 uses keyboard card focus + detail drawer instead. |
| 7 | **ServiceNow Horizon — Kanban Board** | https://horizon.servicenow.com/workspace/components/now-visual-board | Accessible board mechanics | Arrow-key navigation between lanes/cards, `Esc` to leave, named columns with counts, focus order preserved → V5 keyboard contract | Grid/F2 editor semantics and swimlanes — over-engineered for 3 tabs; no matching API dimension. |
| 8 | **shadcnstore — Data Grid & Datatable blocks** | https://shadcnstore.com/blocks/application/datatables | State design around a server list | “A data grid is mostly the states around the rows”: URL-synced sort/filter/page, **saved views**, record detail panel, designed loading/empty/error; on phone **drop columns** instead of horizontal scroll → deep links + C16 | Bulk-action bar / column-visibility menus — no Gate-A endpoint and no per-user column-setting API. |
| 9 | **artofstyleframe — Modern Dashboard UI 2026** | https://artofstyleframe.com/blog/dashboard-design-patterns-web-apps/ | Dense table craft | Sticky opaque header, 36–40px dense rows vs 48–52px comfortable rows (a real toggle), visible sort indicator on active column, centre-aligned status badges → V2 density toggle | Data-viz widget walls / gradient KPI art — banned by §5 and report §5.2. |
| 10 | **AufaitUX — Dashboard Filter Design Guide** | https://www.aufaitux.com/blog/dashboard-filter-design-guide/ | Saved-view persistence | Filter chips show active constraints; save presets; remember last-used state; **shareable URLs for saved filters** → `?saved=…&status=…&q=…` in all 5 variants | Global date-range/region filters — no such query params in `GET /api/v1/requests`. |
| 11 | **Nestlancer repo PR #4 — “Client portal lab: shared kit v2 … F05 Pipeline Desk”** | https://github.com/nestlancer/ui-designing-client-dashboard/pull/4 | Same repo, same page job | Stage filters + saved views + preview rail as a proven composition; `?state=loading\|error` deep-linkable states; headless verification at 430/1366/1440 light+dark → adopted the **state URL convention** and the preview-rail idea for V4 | Its `shared/kit.css` + `shared/kit.js` shared component layer is **not adopted**: F05 prompt §9.1 restricts `shared/` to `tokens.css` + `base.css`, and §1.3 requires each variant’s layout CSS to be hand-written. Its files were also removed from this checkout (commit `a5ec0bb`), so nothing was copied. |

Additional sources read as search excerpts (recorded, not counted as opened): [Tailwind Admin checklist](https://adminlte.io/blog/shadcn-ui-data-table-templates/), [Innovaccer Table Filters](https://design.innovaccer.com/patterns/tableFilters/usage/), [uiCookies empty/loading/error table set](https://uicookies.com/bootstrap-datatable/), [Reform form guide](https://www.reform.app/blog/mobile-multi-step-forms-responsive-ux-guide) — used only for cross-checking, never cited as opened.

## 3 · Adopted patterns → concept axes (§8.2)

| Pattern | Axis | Variant(s) |
|---|---|---|
| Semantic single-column list + one filter row + teaching empty state (1, 5) | A single-column ledger · D airy | **V1 Calm Ledger** |
| Table-first dense geometry, sticky header, density toggle, `aria-sort` (1, 3, 4, 9) | A full-width ops table · D dense · B numbers-first | **V2 Ops Console** |
| “What needs your attention” queue + verdict line above KPIs (3, 6, report [9]) | B action-first · C queue-led · E count-up | **V3 Attention Queue** |
| Tabs as chapters with counts + sticky preview rail + URL state (8, 11) | C tab-led chapters · E scroll-spy/crossfade | **V4 Chapter Tabs** |
| Status lanes with counted column headers + keyboard card nav (6, 7) | A card board · C lane-led · E arrow-key focus + drawer | **V5 Status Lanes** |
| Filter chips + saved views + shareable URL (2, 8, 10) | E filter-chips (cross-cutting A12) | V1–V5 (5/5) |
| Designed loading/empty/error states (5, 8) | D honest surfaces | V1–V5 |

## 4 · Cross-check against Gate A (no invented features)

- No bulk actions, no status mutation, no drag-to-reorder, no column-settings persistence, no date-range facets, no Ask-AI, no notifications grouping — none has a client endpoint in `API-MAP.md`.
- Every adopted pattern is composition only. The 12 rows, 9 filter values, 3 tabs, KPI labels and pagination copy come from Gate S; the badge/token fixes come from Gate R; all CTAs resolve to Gate-A endpoints or are demo-labelled.
- **No features invented from templates; all CTAs still Gate-A or demo-labelled.**
