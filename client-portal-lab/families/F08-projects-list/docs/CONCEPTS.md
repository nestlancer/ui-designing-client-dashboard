# F08 · Projects List — Gate 1 · CONCEPTS (printed BEFORE code)

Five design ideas, one locked token file, two frozen projects. Colour is never an axis. Every variant: populated + empty (C14) + skeleton + 502/A13, light+dark, search/filter/sort over the frozen list (client-side — spec has no query params), Khandesh card → same-number F09 variant.

## GATE 1 (F08)
Concept cards: 5/5 · Sketches: 5/5 · Difference test: PASS
C coverage 5/5: YES · P1 A coverage 5/5: YES (A13 family-mandatory 5/5) · P2-P3 ≥3/5: YES (n/a beyond A13)
Gate: PASS

### Table 1 — summary
| Variant | Keeps | Fixes | Adds | Axes (A·B·C·D·E) | Signature | API |
|---|---|---|---|---|---|---|
| V1 Calm Grid | H1+lede, Work Hub/View quotes, 2 cards, error copy | C17 C4 C5 C6 C18 | A13 | card grid · verdict · static · airy · filter-chips | Chips + live count; card hover-lift | GET /projects, /projects/stats, /health |
| V2 Ops Ledger | same | C17 C4 C5 C6 C18 | A13 | sticky table · numbers · filter-led · dense · ⌘K+sort | aria-sort table, density feel, ⌘K jumps | same |
| V3 Next-Step Hero | same | C17 C4 C5 C6 C18 | A13 | split hero+grid · action · queue · airy cards · count-up+sticky CTA | “Continue Khandesh” hero from frozen Next-step (F09 link) | same + GET /projects/{id} link |
| V4 Delivery Story | same | C17 C4 C5 C6 C18 | A13 | timeline column · narrative · stepper-linked · editorial · scroll reveal | Started-date timeline spine, IO reveals | same |
| V5 Bento Board | same | C17 C4 C5 C6 C18 | A13 | bento · queue · accordion/board · bento · crossfade preview | Focus one card → preview pane crossfades | same |

### Table 2 — distinctness (A+C unique per sibling)
| | A Layout | B Hierarchy | C Narrative | D Density | E Interaction | A+C |
|---|---|---|---|---|---|---|
| V1 | card grid | verdict-first | static sections | airy minimal | filter-chips | grid/static |
| V2 | ops table | numbers-first | filter/tab-led | dense | ⌘K + aria-sort | table/filter |
| V3 | split hero+workbench | action-first | queue-led | airy cards | count-up + sticky CTA | split/queue |
| V4 | timeline-led column | narrative-first | stepper-linked | editorial rules | IO reveal + progress spine draw | timeline/stepper |
| V5 | bento board | queue-first | accordion preview | bento | crossfade preview + arrow keys | bento/accordion |
Coverage: minimal V1 · dense V2 · action/queue V3+V5 · narrative/stepper V4. PASS (≥3 axes differ per pair, incl. A or C).

### Table 3 — coverage
C17/C4/C5/C6/C18: **5/5 each** · A13: **5/5** · C14 empty copy: 5/5 (must-include) · KEEP honesty/tokens: 5/5.

---

#### F08 V1 “Calm Grid”
Keeps: all frozen. Sketch:
```
[siderail 232 | H1 Projects        Work Hub · View quotes]
[             | lede · verdict: 2 projects in progress    ]
[             | (2 hero)(2 In progress)(Started 10/5/2026)]
[             | chips: All · In progress   search · sort ]
[             | ┌ Khandesh card ┐ ┌ B2B card ┐            ]
```
Signature: removable-feel filter chips with `aria-live` count. API: list/stats/health. Refs: shadcn Projects List, curated-client-view. Shell standard; 375px: 1-col cards, KPI stack. Risk: only 2 cards → generous card anatomy, no fake third card.

#### F08 V2 “Ops Ledger”
```
[compact head: Projects  2│2│10/5/2026        ⌘K]
[status▾ search sort▾ | table: PROJECT│STATUS│STARTED│→]
[2 dense rows, sticky head, mono dates · mobile→cards ]
```
Signature: sortable sticky table (`aria-sort`, URL state) + ⌘K real actions. Refs: Sprintrix, shadcn URL tables. Risk: table at 375 → explicit card fallback (C16 spirit).

#### F08 V3 “Next-Step Hero”
```
[▶ Continue: Khandesh Spice… In progress · Open project →]
[verdict sentence · count-up 2 · sticky mobile CTA       ]
[grid of 2 below · B2B honest note                        ]
```
Signature: action hero uses only frozen facts (no invented %: progress lives on F09). Refs: JetAdmin attention-home, ClientVenue tracker. Risk: hero must not import F09’s 57% into list truth — phrased as “open to see delivery progress”.

#### F08 V4 “Delivery Story”
```
[editorial head · timeline: ●10/5/2026 Khandesh started ]
[                        ●10/5/2026 B2B started        ]
[spine draws on scroll (stroke-dashoffset) · cards right]
```
Signature: date-spine narrative + IO reveals (reduced-motion safe). Refs: timeline views, report narrative KEEP. Risk: identical dates → group honestly under one date chapter.

#### F08 V5 “Bento Board”
```
[┌ big Khandesh tile ┐┌ status tile┐]
[│ preview crossfade │└ B2B tile ──┘]
[└ banner/help tile ─┴─ preview ───┘]  ←→ keys move focus
```
Signature: selecting a tile crossfades a preview pane (frozen fields only). Refs: shadcn card variance, board grouping. Risk: bento reflow at 390 → single column, preview below tiles.
