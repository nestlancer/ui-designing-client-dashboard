# F09 · Project Details + 6 Tabs — Gate 1 · CONCEPTS (printed BEFORE code)

One frozen Arjun Mehta story (57%, 2 × ₹30,000.00, payment Not due yet), one token file, five geometries. Every variant implements **all 6 tabs in-page** (`?tab=` deep-link, arrow-key tablist), verdict C2, unlock C19/A3, preview C13, Ask-AI A1 (demo), Help A2, review A4, banner A13, expectation A14, digest A15, 502/empty/skeleton states (`?state=`), feedback + request-changes forms.

## GATE 1 (F09)
Concept cards: 5/5 · Sketches: 5/5 · Difference test: PASS
C coverage 5/5: YES · P1 A coverage 5/5: YES · P2-P3 ≥3/5: YES (A14+A15 in 5/5)
Gate: PASS

### Table 1 — summary
| Variant | Keeps | Fixes | Adds | Axes | Signature | API core |
|---|---|---|---|---|---|---|
| V1 Classic Cockpit | header, 6 tabs, milestones, feeds, forms | C2 C13 C19 C17 C4 C5 C6 C18 | A1 A2 A3 A4 A13 A14 A15 | tab-classic 1-col · verdict · tab-led · airy · preview dialog | Faithful IA, upgraded hierarchy; focus-trapped C13 dialog | projects/{id}, progress, milestones, media, messages |
| V2 Delivery Journey | same | same 8 | same 7 | stepper spine · narrative · stepper-linked · editorial · timeline-draw | Lifecycle stepper drives tabs; spine animates (dashoffset) | + timeline, progress/status |
| V3 Your Moves | same | same 8 | same 7 | 2-col+sticky rail · action · queue-led · airy cards · drawer explainers | “Awaiting you” rail: whose move + unlock-me links | + milestones approve/revision, deliverables reject |
| V4 One Story | same | same 8 | same 7 | single narrative column · narrative · chapter-sticky · editorial · scroll-spy | A15 digest as home chapter; tabs become chapters | + timeline digest merge |
| V5 Delivery Console | same | same 8 | same 7 | 3-pane dense · numbers · tab-led dense · dense ops · ⌘K+sort/filter | Power cockpit: dense tables, ⌘K jump-to-approval/tab | full map incl. media storage, search |

### Table 2 — distinctness
| | A | B | C | D | E | A+C |
|---|---|---|---|---|---|---|
| V1 | single-col tabs | verdict-first | tab-led | airy minimal | dialog/drawer | 1col/tab |
| V2 | stepper journey | narrative-first | stepper-linked | editorial | timeline-draw + step nav | stepper/stepper |
| V3 | 2-col sticky rail | action-first | queue-led | airy cards | unlock drawer + sticky CTA | rail/queue |
| V4 | chapter column+TOC | narrative-first | chapter-sticky | editorial rules | scroll-spy crossfade | chapter/chapter |
| V5 | 3-pane console | numbers-first | tab-led (dense) | dense ops-table | ⌘K-first + filters | 3pane/tab-dense |
V1 vs V5 share “tab-led” word but differ on A (1-col vs 3-pane), B, D, E — A+C *combinations* unique. Coverage: minimal V1 · dense V5 · queue V3 · stepper/narrative V2+V4 · motion-signature V2 (family is F03/F09-class). PASS.

### Table 3 — coverage
C2/C13/C19/C17/C4/C5/C6/C18 **5/5** · A1/A2/A3/A4/A13 **5/5** · A14/A15 **5/5** (≥3 required) · KEEP stepper/dual-status/Awaiting-you/graceful wording **5/5**.

---

#### V1 “Classic Cockpit” — sketch
```
[verdict band][57% bar][Message][View milestones]
[Overview|Progress|Milestones|Deliverables|Messages|Files]
[status 3-cards · feeds · Ask-AI+Help row · forms      ]
```
Risk: long tab panels → sticky tab bar, skeleton per tab.

#### V2 “Delivery Journey” — sketch
```
[① Approved ━━━ ② In progress ━━━ ◯ Payment gated 🔒why]
[step detail card ↔ tabs below follow the selected step ]
```
Signature: stepper selection scrolls/filters relevant tab; SVG spine draws via IO. Risk: stepper ≠ extra milestones — steps are the 2 frozen milestones + payment gate, labelled.

#### V3 “Your Moves” — sketch
```
[main tabs column        ][sticky rail: YOUR MOVE: none due]
[                         ][TEAM'S MOVE: M2 delivery      ]
[                         ][Unlock explainer → deep links ]
```
Signature: honest queue — capture has *no* payment/approval due, rail says so and shows what will unlock. Risk: rail collapses above content at 375.

#### V4 “One Story” — sketch
```
[TOC chapters| digest: Oct5 start→msgs→file→M1✓→M2…    ]
[             | then tab chapters in reading order       ]
```
Signature: scroll-spy chapters + digest-first. Risk: deep-link `?tab=` must still land on right chapter.

#### V5 “Delivery Console” — sketch
```
[nav pane| dense tab tables (milestones/files) | inspector]
[⌘K: jump to tab / approval / file · density-tight rows   ]
```
Signature: ⌘K-first + sortable milestone/file tables + inspector preview. Risk: 3-pane → stacked panes <1024, cards <640.
