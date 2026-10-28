# F03 · Dashboard Overview — CONCEPTS (Gate 1, 5 cards)

### V1 "Calm Overview"
Keeps: H1 Overview · verdict line · hero "One action will unblock your workspace." · vitals · pipeline · Awaiting you · 4 workbench tabs · recent activity.
Fixes/Adds: C1 C2 C3 C4 C5 C6 C14 C17 C18 · A9 (health mini-grid, P2)
Axes: A single-column · B verdict-first · C static sections · D airy · E palette+reveals
Sketch: `[sidebar] [ verdict+hero KPI | 4 vitals | pipeline | Awaiting you | workbench tabs | activity ]`
Signature: ⌘K palette + count-up vitals; instructive empty Projects tab.
API: system/status, payments, requests/stats, projects/stats, quotes, messages, notifications.
Templates: 925 Studios, Raw Studio.
Shell: owns the 232px shell + dark + 375px proof.

### V2 "Verdict Hero"
Keeps: same content.
Fixes/Adds: C1 C2 C3 C4 C5 C6 C14 C17 C18 · A11 (PWA-install hint, P3)
Axes: A split hero · B action-first · C static · D airy · E count-up+sticky CTA
Sketch: `[sidebar] [ verdict+hero+CTA  |  right rail: Awaiting you ]` then vitals/pipeline/tabs.
Signature: the verdict sentence + single "Complete checkout" owns the first screen.
Templates: Art of Style Frame, GenDesigns.

### V3 "Awaiting-You Spine"
Keeps: same content.
Fixes/Adds: C1 C2 C3 C4 C5 C6 C14 C17 C18 · A9
Axes: A 2-col sticky rail · B queue-first · C queue-led · D airy · E drawer/overlay
Sketch: `[sidebar] [ sticky Awaiting-you rail | vitals · pipeline · workbench · activity ]`
Signature: "Awaiting you" is the page spine; clicking a row opens a focus-trapped drawer.
Templates: Cybertize, AufaitUX.

### V4 "Health Bento"
Keeps: same content.
Fixes/Adds: C1 C2 C3 C4 C5 C6 C14 C17 C18 · A9 (health mini-grid, P2)
Axes: A bento grid · B numbers-first · C static · D bento · E crossfade preview
Sketch: `[sidebar] [ bento: hero | 4 vitals | pipeline | health grid | Awaiting you ]`
Signature: Signal-style health mini-grid + labelled pipeline bars.
Templates: Raw Studio, DataScale.

### V5 "Dense Ops Workbench"
Keeps: same content.
Fixes/Adds: C1 C2 C3 C4 C5 C6 C14 C17 C18 · A11
Axes: A dense grid · B numbers-first · C tab-led · D dense · E filter-chips+sort
Sketch: `[sidebar] [ compact KPI strip | pipeline | dense workbench table w/ tabs | activity ]`
Signature: compact multi-metric workbench for power clients; mobile card-fallback.
Templates: GenDesigns, AIDesigner.

## Difference test
| V | A | B | C | D | E |
|---|---|---|---|---|---|
| V1 | single-col | verdict | static | airy | palette+reveals |
| V2 | split hero | action | static | airy | count-up+sticky |
| V3 | 2-col rail | queue | queue-led | airy | drawer/overlay |
| V4 | bento | numbers | static | bento | crossfade |
| V5 | dense grid | numbers | tab-led | dense | chips+sort |
No two share A+C. **PASS.**

## Coverage
C1–C18 (9 items) 5/5 · A9 in V1,V3,V4 (3/5) · A11 in V2,V5 (+V3) (≥3/5). **PASS.**

## GATE 1 (F03)
Concept cards: 5/5 · Sketches: 5/5 · Difference test: PASS
C coverage 5/5: YES · P1 A coverage 5/5: YES · P2-P3 ≥3/5: YES
**Gate: PASS**
