# F05 · Requests Work Hub — Gate 1 · CONCEPTS (printed BEFORE code)

Five different design ideas, one locked token file (`../../../shared/tokens.css`), one frozen story (Gate S), all C-items in 5/5, A12 in 5/5. Colour is never an axis.

## GATE 1 (F05)
Concept cards: 5/5 · Sketches: 5/5 · Difference test: PASS
C coverage 5/5: YES · P1 A coverage 5/5: YES · P2-P3 ≥3/5: YES (A12 in 5/5)
Gate: PASS

---

### F05 · Requests Work Hub · V1 “Calm Ledger”

- **Keeps:** H1 `Work Hub` + header line; KPI `26 / 0 / 0 / 5`; `New request`; tabs `All · Requests (12) · Projects`; 9 status options; `Search work items…`; 12 frozen rows; `Showing 1–12 of 26` · `1 / 3`.
- **Fixes/Adds:** C16 (card-fallback), C17, C4, C5, C6, C18 · A12 (saved views as quiet chips).
- **Axes:** **A** single-column ledger · **B** verdict-first · **C** static sections · **D** airy minimal · **E** filter-chips + detail drawer.
- **Signature interaction:** filter chips appear/remove with one click; each chip rewrites `?status=`/`?saved=` and the live region announces the new count.
- **API basis:** `GET /requests?page&limit&status`, `GET /requests/stats`, `GET /projects/stats`, `GET /requests/{id}`, `POST /requests`.
- **Template refs:** Setproduct data-table anatomy · shadcn.io Empty Table · SaaSUI filtering (chips).
- **Layout sketch:**
```
┌ sidebar 232 ┬ header 64: breadcrumb · ⌘K · theme · bell · avatar ┐
│ MAIN        │ Work Hub                              [+ New request]│
│ Explore▾    │ All your service requests…                            │
│ ACCOUNT     │ ┌ 26 hero ┬ 0 ┬ 0 ┬ 5 ┐  ← one hero + 3 secondaries  │
│             │ [All][Requests (12)][Projects]                       │
│             │ [saved: My pending approvals ×][This month ×]        │
│             │ [All statuses ▾] [Search work items…]   [Sort ▾]     │
│             │ ┌────────────────────────────────────────────────┐  │
│             │ │ row · title · type · category · date · ● status │  │
│             │ │ row … (12 comfortable rows)                     │  │
│             │ └────────────────────────────────────────────────┘  │
│             │ Showing 1–12 of 26            Prev  1 / 3  Next      │
└─────────────┴──────────────────────────────────────────────────────┘
  phone: KPIs 2×2 → rows become stacked cards → footer stacks
```
- **Shell / dark / 375 notes:** standard shell, Explore popover; dark = token swap only; at 375 KPIs 2×2, table → cards, chips scroll horizontally without page overflow.
- **Risk:** 12 long AUDIT titles could overflow cards → ellipsis + `title` + full text in detail drawer.

---

### F05 · Requests Work Hub · V2 “Ops Console”

- **Keeps:** all frozen content + 12 rows + pagination copy.
- **Fixes/Adds:** C16 (card toggle at mobile), C17, C4, C5, C6, C18 · A12 (saved-view dropdown in toolbar).
- **Axes:** **A** full-width ops table w/ sticky header · **B** numbers-first · **C** tab-led · **D** dense ops-table · **E** command-palette-first + density toggle + `aria-sort`.
- **Signature interaction:** ⌘K opens a real-action palette (jump to tab / set status / go to F06 / switch variant / theme); `D` toggles compact(36px) vs comfortable(48px) rows; header buttons sort with `aria-sort` and URL state.
- **API basis:** `GET /requests?page&limit&status` (sort is client-side — spec has no sort param, recorded), `GET /requests/stats`, `GET /projects/stats`, `GET /requests/{id}`.
- **Template refs:** AdminLTE table-first Stripe pattern · artofstyleframe density guide · shadcn/ui `aria-sort` · shadcnstore Datatable 5 URL state.
- **Layout sketch:**
```
┌──────── header 64 + compact breadcrumb ──────────────────────────┐
│ Work Hub  26 │ 0 │ 0 │ 5        [+ New request]   [⌘K] [D density]│
│ [All][Requests (12)][Projects]   status▾ q▾  sort▾  saved views▾ │
│ ┌──────────────── sticky thead (opaque) ────────────────────────┐ │
│ │ ID ▲ │ TITLE │ TYPE │ CATEGORY │ DATE │ STATUS ● │ ↗        │ │
│ ├──────────────────────────────────────────────────────────────┤ │
│ │ 12 compact rows, right-aligned mono ids, muted gridlines      │ │
│ └──────────────────────────────────────────────────────────────┘ │
│ Showing 1–12 of 26 · 1 / 3 · [Prev][Next]   [view as cards]       │
└──────────────────────────────────────────────────────────────────┘
```
- **Shell / dark / 375 notes:** same shell but tighter header rhythm; dark uses `--card` opaque sticky header (never translucent); at 375 the table is replaced by a card list or explicit “view as cards”.
- **Risk:** dense columns at 768px → progressively hide category/type columns (never the title/status).

---

### F05 · Requests Work Hub · V3 “Attention Queue”

- **Keeps:** all frozen labels/counts; no new numbers invented (the queue is a **subset** of the 12 rows: `Quoted`/`Submitted`/`Changes requested` items).
- **Fixes/Adds:** C16, C17, C4, C5, C6, C18 · A12 (`Awaiting me` / `My pending approvals` presets).
- **Axes:** **A** split hero + workbench · **B** action-first · **C** queue-led · **D** airy cards · **E** count-up + priority switch.
- **Signature interaction:** “Needs your attention” hero leads with a plain-English verdict (“3 items are waiting on a decision.”) and a `Review next` button that opens the first queued row’s detail drawer; KPI values count up via IntersectionObserver (disabled under reduced motion).
- **API basis:** `GET /requests?status=quoted|submitted|changesRequested`, `GET /requests/stats`, `GET /requests/{id}/status`, `POST /requests/{id}/submit` (shown as next step, demo-labelled).
- **Template refs:** report [9] work queues not metrics · SaaSUI kanban “card face for scanning” · AdminLTE embedded-dashboard verdict.
- **Layout sketch:**
```
┌ header 64 ────────────────────────────────────────────────────────┐
│ NEEDS YOUR ATTENTION                                               │
│ 3 items are waiting on a decision.      [Review next →]             │
│ ┌ verdict card ────────────┐ ┌ status timeline strip ────────────┐ │
│ │ Expired Quote · Submitted │ │ draft→submitted→quoted→converted  │ │
│ └──────────────────────────┘ └───────────────────────────────────┘ │
│ KPI strip (26 / 0 / 0 / 5)  ·  tabs All / Requests (12) / Projects │
│ queue cards (3) │ full list (12, quieter, below)  · pagination      │
└───────────────────────────────────────────────────────────────────┘
```
- **Shell / dark / 375 notes:** sidebar collapses to drawer at <900; verdict card first in both themes; at 375 the queue cards stack and the timeline strip becomes a horizontal 4-step scroller with text labels.
- **Risk:** count-up must never animate a fabricated total — only the frozen 26/0/0/5.

---

### F05 · Requests Work Hub · V4 “Chapter Tabs”

- **Keeps:** same content; tabs become the primary narrative, not a small strip.
- **Fixes/Adds:** C16, C17, C4, C5, C6, C18 · A12 (saved views shown as chapter footnotes).
- **Axes:** **A** 2-col with sticky chapter rail · **B** narrative-first · **C** tab-led chapters · **D** editorial rules · **E** scroll-spy + crossfade preview.
- **Signature interaction:** left rail lists All / Requests (12) / Projects as numbered chapters with counts; scrolling the right column updates `aria-current` via IntersectionObserver; clicking a chapter deep-links `?view=` and crossfades the panel (opacity ≤150ms under reduced motion).
- **API basis:** `GET /requests?page&limit&status`, `GET /projects`, `GET /projects/stats`, `GET /requests/{id}`, `GET /projects/{id}`.
- **Template refs:** Nestlancer PR #4 preview rail · shadcnstore record-detail panel · SaaSUI filtering URL state.
- **Layout sketch:**
```
┌ header 64 ────────────────────────────────────────────────────────┐
│ ┌ chapter rail (sticky) ─┐ ┌ workbench ──────────────────────────┐ │
│ │ 01 All          26     │ │ Work Hub (34px) + why-lines          │ │
│ │ 02 Requests     12  ●  │ │ ───────────────────────────────────  │ │
│ │ 03 Projects      5     │ │ [status▾] [search] [sort] [saved▾]   │ │
│ │ saved views…          │ │ 12 rows / empty / skeleton / 502 card │ │
│ │ prev/next + gallery    │ │ detail preview on hover/focus         │ │
│ └───────────────────────┘ └──────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────┘
```
- **Shell / dark / 375 notes:** rail sits inside `main` (aside landmark); dark = tokenised rules; at 375 rail becomes a horizontal sticky chapter bar, preview collapses into the drawer.
- **Risk:** scroll-spy + tab state can race → single source of truth in `?view=`, observer only updates the active indicator.

---

### F05 · Requests Work Hub · V5 “Status Lanes”

- **Keeps:** same 12 rows + frozen labels; lanes are **groupings of the existing rows**, not new records.
- **Fixes/Adds:** C16 (cards by default), C17, C4, C5, C6, C18 · A12 (lane-focus saved views).
- **Axes:** **A** card board/lanes · **B** queue-first · **C** lane-led · **D** bento · **E** arrow-key card focus + detail drawer.
- **Signature interaction:** arrow keys move focus across lanes/cards (named regions, `Esc` returns), `Enter` opens the detail drawer with `GET /requests/{id}`; no drag (no client status endpoint).
- **API basis:** `GET /requests?page&limit&status` (one call per status value = the 8-status enum), `GET /projects`, `GET /requests/{id}`.
- **Template refs:** SaaSUI kanban counted column headers · ServiceNow Horizon keyboard nav · Setproduct card-vs-table trade-off.
- **Layout sketch:**
```
┌ header 64 ────────────────────────────────────────────────────────┐
│ Work Hub · KPI strip · tabs · [status▾][search][saved views]        │
│ ┌ Draft (1) ┐ ┌ Submitted (3) ┐ ┌ Expired Quote (7) ┐ ┌ Converted (1)┐
│ │ ┌card┐    │ │ ┌card┐ ┌card┐ │ │ ┌card┐ ┌card┐ … │ │ ┌card┐      │
│ │ │title│   │ │ │meta│ │meta│ │ │ │ ● status  │   │ │ │ ● status │ │
│ │ └────┘    │ │ └────┘ └────┘ │ │ └────┘ └────┘   │ │ └────┘      │
│ └───────────┘ └───────────────┘ └─────────────────┘ └──────────────┘
│ Showing 1–12 of 26 · 1 / 3   ·   hint: ← → move · Enter open · Esc close
└───────────────────────────────────────────────────────────────────┘
```
- **Shell / dark / 375 notes:** lanes scroll horizontally **inside** their own container (no page-level overflow); dark card surfaces tokenised; at 375 lanes stack vertically with counted headers.
- **Risk:** four lanes at 1024px → 2×2 grid; `Cancelled`/`Under review`/`Quoted` are empty lanes → designed “Nothing here” card, never a blank column.

---

## Table 1 — variant × keeps / fixes / adds / axes / signature / API

| Variant | Keeps | Fixes (C#) | Adds (A#) | Axes (A/B/C/D/E) | Signature interaction | API endpoints |
|---|---|---|---|---|---|---|
| V1 Calm Ledger | full Gate-S story | C16 C17 C4 C5 C6 C18 | A12 | single-col / verdict / static / airy / chips+drawer | removable filter chips + URL state | GET requests, stats, request/{id}, projects/stats; POST requests |
| V2 Ops Console | full + mono ids | C16 C17 C4 C5 C6 C18 | A12 | ops-table / numbers / tab-led / dense / ⌘K+sort | ⌘K real actions + density toggle + `aria-sort` | GET requests, stats, request/{id} |
| V3 Attention Queue | full + queue subset | C16 C17 C4 C5 C6 C18 | A12 | split hero / action / queue / airy cards / count-up | Review next → first queued detail | GET requests?status, stats, request/{id}/status |
| V4 Chapter Tabs | full + chapter counts | C16 C17 C4 C5 C6 C18 | A12 | sticky rail / narrative / chapters / editorial / scroll-spy | scroll-spy + crossfade panel | GET requests, projects, project/{id}, stats |
| V5 Status Lanes | full + lane groups | C16 C17 C4 C5 C6 C18 | A12 | board / queue / lanes / bento / arrow-key focus | keyboard card nav + detail drawer | GET requests?status, projects, request/{id} |

## Table 2 — distinctness (axes A–E; colour never counted)

| Variant | A · Layout | B · Hierarchy | C · Narrative | D · Density | E · Interaction | A+C pair |
|---|---|---|---|---|---|---|
| V1 | single-column ledger | verdict-first | static sections | airy minimal | filter-chips + drawer | single-col/static |
| V2 | sticky ops table | numbers-first | tab-led | dense | ⌘K + sort + density | table/tab-led |
| V3 | split hero + workbench | action-first | queue-led | airy cards | count-up + review-next | split/queue-led |
| V4 | 2-col sticky rail | narrative-first | chapter tabs | editorial rules | scroll-spy + crossfade | rail/chapters |
| V5 | card board lanes | queue-first | lane-led | bento | arrow-key focus + drawer | board/lane-led |

All five A+C pairs are unique; every pair of siblings differs on ≥3 of 5 axes and at least one of A or C. Coverage: ≥1 minimal (V1, V3), ≥1 dense (V2), ≥1 action/queue-led (V3, V5), ≥1 narrative/stepper-led (V4, V2). **Difference test: PASS.**

## Table 3 — coverage

| Requirement | V1 | V2 | V3 | V4 | V5 | Coverage |
|---|---|---|---|---|---|---|
| C16 mobile table treatment | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 |
| C17 compressed shell | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 |
| C4 AA badges (icon+text) | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 |
| C5 one brand ramp | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 |
| C6 tokenised cards | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 |
| C18 display type scale | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 |
| A12 saved views (P3) | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 (≥3/5) |
| Populated / empty / skeleton / 502 error | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 |
| Light + dark · 360–1440 · keyboard | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 |
