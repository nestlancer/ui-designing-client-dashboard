# F12 · Messages Home (Overview → Inbox) — Gate T · TEMPLATE-RESEARCH

Study of 9 real-world SaaS, client portal, and collaborative split-pane inbox references informing the 5 variants of **F12 · Messages Home (Overview → Inbox)** (`/messages`, `/messages/inbox`, `/messages/new/direct`).

```
## GATE T (F12)
References studied: 9 (report §5: 4 · fresh search: 5) · Borrow/reject logged: YES
Gate: PASS
```

---

## 1 · Reference Inventory Summary

| # | Name | Source | Live URL | Assigned Variants |
|---|---|---|---|---|
| R1 | **Moxo Client Portal — Unified Messaging & Action Workspace** | Report §5 `[1]` | `https://www.moxo.com/blog/client-portal-design` | V1, V4 |
| R2 | **AdminLTE — "One Question Per Screen" Entry Consolidation** | Report §5 `[2]` | `https://adminlte.io/blog/dashboard-design-examples/` | V1, V2 |
| R3 | **Webflow / Apex — Honest Command Palette & Action Bar** | Report §5 `[4]` | `https://webflow.com/made-in-webflow/website/Command-Palette` | V2, V5 |
| R4 | **Eleken — High-Density Split-Pane SaaS Workspace** | Report §5 `[7]` | `https://www.eleken.co/blog-posts/dashboard-design-examples-that-catch-the-eye` | V2, V3 |
| R5 | **Intercom Help Desk Inbox UI Design (SaaSFrame)** | Fresh Search | `https://www.saasframe.io/examples/intercom-help-desk-inbox` | V1, V3 |
| R6 | **Intercom — Customizable 3-Pane Inbox Panels** | Fresh Search | `https://www.intercom.com/help/en/articles/7911926-customize-the-inbox-to-suit-you-and-how-work-best` | V1, V5 |
| R7 | **FlowDesk / Linear-Inspired 3-Pane Operational Inbox** | Fresh Search | `https://github.com/Ryanakml/flowdesk-ai/issues/218` | V2, V4 |
| R8 | **Front vs. Intercom — Shared Queue & Channel Triage** | Fresh Search | `https://www.layer3labs.io/comparisons/front-vs-intercom` | V3, V4 |
| R9 | **Missive — Collaborative Split-Pane & Context Rail** | Fresh Search | `https://www.getmacha.com/blog/front-vs-missive` | V4, V5 |

---

## 2 · Detailed Reference Breakdown

### R1 · Moxo Client Portal — Direct-to-Inbox Entry (Report §5 `[1]`)
- **Live URL:** `https://www.moxo.com/blog/client-portal-design`
- **Category:** Client portal messaging & collaboration shell
- **Layout & hierarchy:** Opens directly into the 3-pane conversation workspace when the user clicks `Messages` in the left navigation — never forcing an intermediate marketing/overview splash screen (`C11`).
- **Component patterns:** Integrated top health strip (`Open conversations 2 · Unread messages 0 All caught up · Unread threads 0 None waiting`) above the 3-pane inbox (`Conversation queue` + `Reading pane` + `Inbox snapshot`).
- **Typography & density:** Balanced 3-pane density (`320px` queue + `1fr` centre pane + `260px` snapshot rail).
- **Interaction & state design:** Clicking a thread either previews it in-pane or opens the full thread view (`F13`) in 1 click.
- **What we borrow (`→ V1, V4`):** Direct inspiration for **C11 (merging `/messages` and `/messages/inbox` into a single 1-click entry)**.
- **What we reject:** Separate landing pages that require clicking `"Open messaging panel"` before seeing the queue.

### R2 · AdminLTE — "One Question Per Screen" KPI Consolidation (Report §5 `[2]`)
- **Live URL:** `https://adminlte.io/blog/dashboard-design-examples/`
- **Category:** Operational dashboard & metric consolidation
- **Layout & hierarchy:** Cited directly by Report C11: *"Render `/messages/inbox` directly at `/messages` (redirect `/messages/inbox` → `/messages`). Keep the 3-pane layout; fold the overview's 3 KPIs into the right 'Inbox snapshot' rail which currently wastes 260px on raw counts."*
- **Component patterns:** Merged `Inbox snapshot` rail combining `Open (2 · Active threads)`, `Unread (0 · All caught up)`, `Waiting (0 · None waiting)`, and `By type (Project 0 · Direct 1 · Group 1)`.
- **Typography & density:** Tabular numerals + semantic status captions (`All caught up`, `None waiting`).
- **Interaction & state design:** Clicking any type breakdown (`Direct 1`, `Group 1`, `Project 0`) filters the left conversation queue immediately.
- **What we borrow (`→ V1, V2`):** Folding the 3 overview KPIs into the 3-pane workspace and enriching the 260px `Inbox snapshot` rail (`C11`).
- **What we reject:** Duplicating the same counts in three separate disconnected places without interactive linkage.

### R3 · Webflow / Apex Command Palette — Honest Messaging Actions (Report §5 `[4]`)
- **Live URL:** `https://webflow.com/made-in-webflow/website/Command-Palette`
- **Category:** Command palette & quick action design
- **Layout & hierarchy:** Ensures every action in `Search ⌘K` and page headers maps to a real client-permitted capability (`Message support` → `/messages/new/direct`) and never promises client-to-client DMs (`C12`).
- **Component patterns:** Inline `New message` (`/messages/new/direct`) drawer/card with explicit domain honesty: `"Platform support admin for your account. Client-to-client messaging is not available."`
- **Typography & density:** Crisp modal/drawer framing with clear primary (`Start conversation`) and secondary (`Cancel`) actions.
- **Interaction & state design:** Keyboard shortcut `N` or clicking `Message support` opens the `New message` card in-place or via the `/messages/new/direct` route tab.
- **What we borrow (`→ V2, V5`):** In-workspace `New message` drawer/tab preserving the exact `/messages/new/direct` copy and honesty note.
- **What we reject:** Fake recipient autocomplete inputs when only `Nestlancer Support` is supported for client-initiated direct threads.

### R4 · Eleken — High-Density Split-Pane SaaS Workspace (Report §5 `[7]`)
- **Live URL:** `https://www.eleken.co/blog-posts/dashboard-design-examples-that-catch-the-eye`
- **Category:** B2B SaaS split-pane & queue design
- **Layout & hierarchy:** Multi-pane layout with a collapsible/resizable look, filter chips (`All · Unread · Direct · Project · Group`), state switcher (`Inbox · Active · Archived`), and sort dropdown (`Unread first · Longest wait · Latest`).
- **Component patterns:** High-contrast thread cards with avatar initials (`AP`, `RK`), channel badge (`Group`, `Direct`), relative timestamp (`20 days ago`), and 2-line preview snippet.
- **Typography & density:** `14px` bold thread titles, `13px` muted previews, `11px` AA badges (`C4`).
- **Interaction & state design:** Instant client-side search (`Search by name, preview, or ID…`) and filter chips.
- **What we borrow (`→ V2, V3`):** Dense, keyboard-navigable conversation queue with live filter chips and sort controls.
- **What we reject:** Low-contrast pastel badges on `Group` and `Direct` pills (`C4`).

### R5 · Intercom Help Desk Inbox UI Design — SaaSFrame (Fresh Search)
- **Live URL:** `https://www.saasframe.io/examples/intercom-help-desk-inbox`
- **Category:** Customer messaging split-pane inbox
- **Layout & hierarchy:** Fixed left app navigation (`232px`), conversation queue column (`340px`), dominant centre reading/empty pane (`1fr`), and contextual right rail (`268px`).
- **Component patterns:** Refined `"Select a conversation"` empty-selection state (`Choose a thread from the list to read messages and send a reply.`) paired with quick-launch cards for the 2 recent conversations and `Message support`.
- **Typography & density:** Clean structural dividers (`1px solid var(--border)`) and subtle `--shadow-xs` depth.
- **Interaction & state design:** Selecting a thread in the queue either previews the conversation in the centre pane or jumps directly into the full thread (`F13`).
- **What we borrow (`→ V1, V3`):** Turning the centre `"Select a conversation"` pane into both a faithful empty-selection state AND an interactive preview/launcher for the 2 captured threads.
- **What we reject:** Leaving the centre pane completely dead when a user clicks a thread row.

### R6 · Intercom — Collapsible 3-Pane Inbox Customization (Fresh Search)
- **Live URL:** `https://www.intercom.com/help/en/articles/7911926-customize-the-inbox-to-suit-you-and-how-to-work-best`
- **Category:** Adaptive 3-pane workspace ergonomics
- **Layout & hierarchy:** Lets users toggle the right-hand `Inbox snapshot` rail (`[` / `]` or button toggle) and switch seamlessly between the merged 3-pane inbox (`/messages`), the `Recent conversations` overview strip, and the `New message` (`/messages/new/direct`) composer.
- **Component patterns:** Pane density/visibility toggles and route-state pills (`/messages (Merged Inbox)`, `/messages/inbox (Redirected)`, `/messages/new/direct (New Support Chat)`).
- **Typography & density:** Adaptive grid that gives the centre reading pane more horizontal breathing room when needed.
- **Interaction & state design:** Smooth pane toggling and responsive tablet/mobile collapse.
- **What we borrow (`→ V1, V5`):** Route-consolidation switcher demonstrating how `/messages`, `/messages/inbox`, and `/messages/new/direct` now live in one unified workspace (`C11`).
- **What we reject:** Hiding the `Inbox snapshot` counts by default on desktop.

### R7 · FlowDesk / Linear-Inspired 3-Pane Operational Inbox (Fresh Search)
- **Live URL:** `https://github.com/Ryanakml/flowdesk-ai/issues/218`
- **Category:** Linear-inspired high-density operational inbox
- **Layout & hierarchy:** Ultra-crisp, keyboard-first 3-pane triage interface with subtle left accent border on the active/focused conversation item, monospace thread IDs (`#01a10a2b-f916`), and instant `J`/`K` or `↑`/`↓` queue navigation.
- **Component patterns:** Compact filter bar (`All · Unread · Direct · Project · Group`), `Inbox / Active / Archived` segmented control, and `Sort: Unread first / Longest wait / Latest`.
- **Typography & density:** High-density operational typography (`13px` UI controls, `--mono` counts and IDs).
- **Interaction & state design:** Keyboard-driven triage where pressing `Enter` on a queue item opens its corresponding `F13` thread variant.
- **What we borrow (`→ V2, V4`):** Linear-grade keyboard triage and compact queue rows in `V2`.
- **What we reject:** Agent-only assignment dropdowns (`Assign to agent`) that do not exist in the client portal API.

### R8 · Front vs. Intercom — Shared Queue & Channel Triage (Fresh Search)
- **Live URL:** `https://www.layer3labs.io/comparisons/front-vs-intercom`
- **Category:** Shared inbox vs. conversational support architecture
- **Layout & hierarchy:** Organises conversations by channel/type (`Group · Agency partner coordination` vs `Direct · Riya Kapoor` vs `Project · 0 threads`) with clear visual differentiation between multi-party coordination and 1:1 admin support.
- **Component patterns:** Channel-typed cards with participant avatar stacks (`RK`, `SP`, `AM`), unread/caught-up badges (`All caught up`), and direct support escalation (`Message support`).
- **Typography & density:** Clear scannable cards with type badges and last-message attribution.
- **Interaction & state design:** Clicking `Project (0)` explains that project-specific threads live inside `F09 Project Details` and provides a direct link there.
- **What we borrow (`→ V3, V4`):** Honest handling of the `Project: 0` filter chip with a helpful cross-link to `F09 Project Details`.
- **What we reject:** Email CC/BCC headers not used by Nestlancer's thread API.

### R9 · Missive — Collaborative Split-Pane & Context Rail (Fresh Search)
- **Live URL:** `https://www.getmacha.com/blog/front-vs-missive`
- **Category:** Collaborative split-pane inbox & right context rail
- **Layout & hierarchy:** Makes the 260px right-hand `Inbox snapshot` rail genuinely useful by folding the `/messages` overview KPIs (`Open conversations 2 · Active threads`, `Unread messages 0 · All caught up`, `Unread threads 0 · None waiting`), the `By type` breakdown (`Project 0 · Direct 1 · Group 1`), and the `Nestlancer Support` direct-message launcher into the right rail (`C11`).
- **Component patterns:** Enriched `Inbox snapshot` rail + inline `New message` card (`To: Nestlancer Support`).
- **Typography & density:** Cohesive 3-column workbench with zero wasted whitespace.
- **Interaction & state design:** One-click `"Start conversation"` with `Nestlancer Support` directly from the right rail or centre pane.
- **What we borrow (`→ V4, V5`):** Enriching the right `Inbox snapshot` rail with the folded `/messages` overview KPIs and the `Nestlancer Support` launcher (`C11`).
- **What we reject:** Multi-user collaborative draft cursors not applicable to a single client login.
