# F12 · Messages Home — Delivery Report (Gate 3)

**Routes:** `/messages`, `/messages/inbox`, `/messages/new/direct` · **Family dir:** `families/F12-messages-home/` · **Authored:** 2026-10-27, hand-authored individually via `write_file` (no design-generation script).

## 1 · What shipped

| Variant | Name | Geometry (A) | Info Priority (B) | Narrative (C) | Density (D) | Signature interaction (E) |
|---|---|---|---|---|---|---|
| **V1 ★** | **Unified Enriched 3-Pane Messaging Workspace** | 3-pane split (queue + centre hub + right snapshot) | queue-first | queue-led | balanced | Merges `/messages` (`18`), `/messages/inbox` (`19`), and `/messages/new/direct` (`20`) into one canonical 3-pane workspace (`C11`) |
| **V2** | **Linear-Grade KPI Ribbon & Triage** | KPI ribbon + 2-column triage | numbers-first | tab-led | dense | Horizontal KPI strip + keyboard `J/K` conversation triage |
| **V3** | **Bento Overview & Split Inbox Stage** | top bento strip + 2-column split stage | verdict-first | static sections | bento | Tokenised card surfaces replacing dark-on-light anti-patterns + split preview stage |
| **V4** | **Support Command Centre & Channel Hub** | 3-column support command grid | action-first | lane-led | airy minimal | Always-visible `New message` card (`20`) alongside `Conversation queue` (`19`) |
| **V5** | **Adaptive Docked Inbox & Modal New-Direct Flow** | full-height docked 3-pane | timeline-first | step-led | editorial | Full-height docked 3-pane inbox + modal `New message` dialog (`20`) |

## 2 · Gate 3 Verification Matrix (10 Checks × 5 Variants)

| # | Gate 3 Verification Check | V1 | V2 | V3 | V4 | V5 |
|---|---|---|---|---|---|---|
| 1 | **Frozen Content Parity (`18`, `19`, `20`):** All verbatim strings from `/messages` (`18`), `/messages/inbox` (`19`), and `/messages/new/direct` (`20`), including both captured threads (`Agency partner coordination — festive campaigns` and `Riya Kapoor`) and the honest support-only note | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS |
| 2 | **C11 Consolidation of 3 Entry Points:** Merges `/messages`, `/messages/inbox`, and `/messages/new/direct` into a single canonical workspace so clicking `Messages` in the sidebar lands directly in the functional inbox | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS |
| 3 | **Tokenised Surfaces (Fixes Dark-on-Light Anti-Pattern):** Replaces the captured `#090d16` dark-card-on-light-page anti-pattern on `/messages` (`18`) and `/messages/new/direct` (`20`) with `var(--card)` and `var(--border)` | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS |
| 4 | **Cross-Family Thread Handoff:** Clicking either thread or `Start conversation` opens the matching variant of `F13-messages-thread` (`?thread=group` or `?thread=direct`) | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS |
| 5 | **C17 / C4 / C5 / C6 / C18 Compliance:** Canonical 2-group sidebar, WCAG AA status pills (`--status-*`), single locked blue ramp, single `<h1>` | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS |
| 6 | **Required UI States:** Merged 3-Pane (`18+19`), New Direct (`20`), Empty Inbox, Loading, and Error (with retry) | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS |
| 7 | **Zero JS Syntax Errors (`node --check`):** Every inline `<script>` block parsed cleanly | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS |
| 8 | **Zero Undefined CSS Tokens:** All `var(--*)` resolve to `shared/tokens.css` | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS |
| 9 | **Zero Broken Relative Links & Zero Remote Assets:** All `href`/`src` resolve locally | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS |
| 10 | **Light + Dark Theme & Responsive Breakpoints (`360px`–`1440px`):** Full `.dark` parity and responsive CSS rules | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS |

## 3 · Winner Recommendation

**Winner: V1 · Unified Enriched 3-Pane Messaging Workspace (`families/F12-messages-home/V1/index.html`)**
- Directly implements **C11** by enriching the 3-pane `/messages/inbox` shell (`19`) with the KPI sub-captions and `Recent conversations` cards from `/messages` (`18`) and an inline `New message` (`20`) support composer in the centre stage.

## 4 · Preview

```bash
python3 -m http.server 8130   # from repo root
# Open http://localhost:8130/client-portal-lab/families/F12-messages-home/V1/index.html
```
