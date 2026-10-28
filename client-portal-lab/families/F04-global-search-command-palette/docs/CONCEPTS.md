# F04 · Global Search / ⌘K Command Palette — CONCEPTS (Gate 1)

**Family:** F04 · `families/F04-global-search-command-palette/`
**Prompt:** `client-portal-prompts/F04-global-search-command-palette.md`
**Gate 1:** PASS — five distinct concepts, each visually distinct.

## Locked brief (from the prompt + C12 + report)

One UI to jump to a place or run an action. The ⌘K binding, a header trigger, 12 canonical navigation routes, and a corrected action registry (replacing the production's flat "New message / AI" menu with honest jump targets — C12). The palette opens by default so the component is the page.

## Five concepts

| V | Concept | Layout | Lead | Interaction |
|---|---|---|---|---|
| **V1** | **Classic List** | one grouped column | quiet | flat list, keyboard nav |
| **V2** | **Grouped-by-Entity** | sections per entity | type chips | two-pane grouped |
| **V3** | **Action + Recent** | two-pane | action-first | actions left, recents right |
| **V4** | **Keystroke-Minimal** | one quiet field | minimal | flat list, ↵ to go |
| **V5** | **Dense Two-Pane** | two-pane | dense | all places + recents at once |

## Difference table

- V1 vs V2: V1 is a single quiet column; V2 splits into entity sections with type chips.
- V3 vs V5: V3 leads with actions + recents; V5 shows every place + recents at once (max density).
- V4 vs all: V4 strips everything to one field and a flat list — minimal hints, nothing competing.

## Coverage

- C4/C5/C6/C12/C17/C18: 5/5 (the ⌘K binding + header trigger + keyboard nav + no-results state in every variant).
- A-items: none (the palette is a navigation surface, not a content domain).
- Shared ⌘K trigger wired across every variant; palette opens by default.

## Covered axes (per variant, see manifest.json)

V1 single-col/quiet/flat-list/airy/keyboard · V2 sections/chips/airy/chips · V3 two-pane/action/split/airy/recent · V4 quiet-field/minimal/flat-list/airy/keyboard · V5 two-pane/dense/all-visible/dense/two-pane
