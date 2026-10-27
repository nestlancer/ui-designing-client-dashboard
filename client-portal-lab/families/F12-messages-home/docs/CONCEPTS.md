# F12 · Messages Home (Overview → Inbox) — Gate 1 · CONCEPTS

5 distinct layout, density, and interaction concepts for **F12 · Messages Home (Overview → Inbox)** (`/messages`, `/messages/inbox`, `/messages/new/direct`), all sharing the single locked token system (`client-portal-lab/shared/tokens.css`), the compressed 232px sidebar shell (`C17`), the frozen Arjun Mehta dataset (`18`, `19`, `20`), and **C11** (merging `/messages` overview + `/messages/inbox` 3-pane panel + `/messages/new/direct` into a single 1-click entry).

```
## GATE 1 (F12)
Concepts written: 5 (V1..V5) · All C-items placed: YES · All A-items placed: YES
Sketches included: YES · Difference table: YES
Gate: PASS
```

---

## Concept V1 — Unified 3-Pane Inbox with Enriched Snapshot Rail (Recommended Default)

- **1-sentence thesis:** Implements Report **C11** literally by rendering the 3-pane `/messages/inbox` directly at `/messages`, folding the 3 overview KPIs (`Open conversations 2 · Active threads`, `Unread messages 0 · All caught up`, `Unread threads 0 · None waiting`) into the 260px right-hand `Inbox snapshot` rail alongside `By type (Project 0 · Direct 1 · Group 1)` and an inline `/messages/new/direct` launcher.
- **References used:** R1 (Moxo), R2 (AdminLTE — cited in C11), R5 (Intercom Inbox), R6 (Intercom 3-Pane).
- **Density & spacing posture:** Classic Intercom-grade 3-pane split (`340px` Conversation queue + `1fr` Centre reading/empty/new-direct pane + `272px` Enriched Inbox snapshot rail).
- **ASCII Layout Skeleton:**
```
+-----------------------------------------------------------------------------------+
| [Sidebar 232px] | Breadcrumb: Dashboard > Messages          [Search ⌘K] [🌙] [6] AM|
|                 +-----------------------------------------------------------------+
|  Overview       | SUPPORT · H1: Messages [Live]  [Route: Inbox | New Support Msg] |
|  Requests (F05) | Your conversations with Nestlancer — pick a thread to continue. |
|  Projects (F08) +------------------------+-----------------------+----------------+
|  Quotes (F10)   | CONVERSATION QUEUE (2) | CENTRE WORKSPACE      | INBOX SNAPSHOT |
| *Messages (F12) | [Search name, ID…]     | • Empty selection:    | Open: 2 Active |
|  Notifications  | [All|Unread|Direct|..] |   "Select a           | Unread: 0      |
|  Explore ▾      | [Inbox|Active|Archive] |    conversation"      |   All caught up|
|                 | [Sort: Unread first ▾] | • + Recent threads    | Waiting: 0     |
|                 | ---------------------- |   quick-open cards    |   None waiting |
|                 | * AP Agency partner…   | • OR Live Preview of  | BY TYPE        |
|                 |   [Group] 20 days ago  |   selected thread +   | Project 0      |
|                 | • RK Riya Kapoor       |   [Open in F13 V1 →]  | Direct 1       |
|                 |   [Direct] 20 days ago | • OR New Message (20) | Group 1        |
+-----------------------------------------------------------------------------------+
```
- **Component treatment:**
  - **C11 Merged Architecture:** Eliminates the extra hop between `/messages` and `/messages/inbox`. A top mode bar lets reviewers inspect: `Default Merged Inbox (18+19)`, `Select a conversation (strict 19 empty centre)`, `Thread Preview Selected`, and `New message (/messages/new/direct — 20)`.
  - **Domain Honesty (`20`):** Clicking `Message support` opens the `New message` surface (`To: Nestlancer Support · Platform support admin for your account. Client-to-client messaging is not available.`) with `Start conversation` → `F13 V1 (?thread=direct)`.
- **State coverage plan:** `Merged Inbox (Default)` · `Strict Empty Selection (19)` · `New Message (20)` · `Empty Filter` · `Empty Inbox` · `Loading Skeleton` · `Error`.

---

## Concept V2 — Compact KPI Ribbon + High-Density Linear Split Triage

- **1-sentence thesis:** Places a compact horizontal 3-KPI + `By type` telemetry ribbon across the top of a high-density 2-pane/3-pane triage workbench with keyboard shortcuts (`J`/`K` row focus, `Enter` to open in `F13 V2`, `N` for `Message support`).
- **References used:** R2 (AdminLTE), R3 (Webflow/Apex Command Palette), R4 (Eleken), R7 (FlowDesk/Linear Inbox).
- **Density & spacing posture:** High-density operational layout (`44px` KPI ribbon, `320px` queue, `1fr` centre reading/preview pane, collapsible `240px` snapshot rail).
- **ASCII Layout Skeleton:**
```
+-----------------------------------------------------------------------------------+
| [Sidebar 232px] | Header: Dashboard > Messages                     [⌘K] [🌙] [6] AM|
|                 +-----------------------------------------------------------------+
|                 | SUPPORT · H1: Messages [Live]            [+ Message support (N)]|
|                 +-----------------------------------------------------------------+
|                 | [Open: 2 Active] [Unread: 0 All caught up] [Waiting: 0] [Types] |
|                 +--------------------------+--------------------------------------+
|                 | QUEUE (2 conversations)  | CENTRE TRIAGE & NEW MESSAGE PANE     |
|                 | [Search…] [Inbox|Archive]| • "Select a conversation" +          |
|                 | [All|Unread|Direct|Group]|   Recent conversations table (18)    |
|                 | [Sort: Unread first ▾]   | • Inline New Message card (20):      |
|                 | > AP Agency partner [Grp]|   To: Nestlancer Support             |
|                 |   RK Riya Kapoor [Direct]|   "Platform support admin for your…"|
|                 |                          |   [Start conversation → F13 V2]      |
+-----------------------------------------------------------------------------------+
```
- **Component treatment:**
  - Unifies `18` (`Recent conversations` + 3 KPIs), `19` (`Conversation queue` + `Select a conversation` + `Inbox snapshot`), and `20` (`New message`) into a fast keyboard-driven triage view.

---

## Concept V3 — Split-Screen Conversation Cards & Live Reading Preview

- **1-sentence thesis:** Combines card-styled conversation queue items on the left with a dual-mode centre workspace that displays both the `"Select a conversation"` empty state AND the 2 `Recent conversations` (`18`) as rich interactive cards that preview the latest messages before launching `F13 V3`.
- **References used:** R4 (Eleken), R5 (Intercom SaaSFrame), R8 (Front vs Intercom).
- **Density & spacing posture:** Generous card-based split view (`360px` card queue + `1fr` centre stage + `256px` `Inbox snapshot` rail).
- **ASCII Layout Skeleton:**
```
+-----------------------------------------------------------------------------------+
| [Sidebar 232px] | Header: Dashboard > Messages                     [⌘K] [🌙] [6] AM|
|                 +-----------------------------------------------------------------+
|                 | H1: Messages · Messaging panel [Live]         [Message support] |
|                 | [3 KPI Cards: Open 2 | Unread 0 All caught up | Unread threads 0]|
|                 +---------------------------+--------------------+----------------+
|                 | CONVERSATION QUEUE        | CENTRE STAGE       | INBOX SNAPSHOT |
|                 | [Search by name, ID…]     | "Select a          | Open 2         |
|                 | [All|Unread|Direct|Group] |  conversation"     | Unread 0       |
|                 | [Inbox ▾] [Unread first ▾]| + Recent activity  | Waiting 0      |
|                 | [Card: AP Agency partner] |   cards (from 18)  | BY TYPE        |
|                 | [Card: RK Riya Kapoor]    | + New Support Card | Proj 0/Dir 1/G1|
+-----------------------------------------------------------------------------------+
```
- **Component treatment:**
  - Top 3 KPI cards from `18` sit directly above the 3-pane split from `19`, while the `/messages/new/direct` card (`20`) is available both as a slide-over drawer and an inline tab.

---

## Concept V4 — Support Command Centre & Channel Hub

- **1-sentence thesis:** Organises the merged `/messages` workspace around channel intent — pairing the **Nestlancer Support Direct Channel (`20`)** and **Inbox Snapshot (`18` + `19`)** with the filtered **Conversation Queue** so clients immediately understand how support, group coordination, and project messaging work together.
- **References used:** R1 (Moxo), R7 (FlowDesk), R8 (Front), R9 (Missive).
- **Density & spacing posture:** Structured 3-column command layout (`320px` queue + `1fr` centre reading/recent hub + `280px` Support & Snapshot rail).
- **ASCII Layout Skeleton:**
```
+-----------------------------------------------------------------------------------+
| [Sidebar 232px] | Header: Dashboard > Messages                     [⌘K] [🌙] [6] AM|
|                 +-----------------------------------------------------------------+
|                 | SUPPORT · H1: Messages [Live] · Review your inbox at a glance…  |
|                 +-------------------------+----------------------+----------------+
|                 | CONVERSATION QUEUE (19) | CENTRE READING PANE  | SNAPSHOT &     |
|                 | [Search…]               | • Select a           | DIRECT SUPPORT |
|                 | [All|Unread|Direct|.. ] |   conversation (19)  | • Open: 2      |
|                 | [Inbox|Active|Archived] | • Recent             | • Unread: 0    |
|                 | [Sort: Unread first ▾]  |   conversations (18) | • Waiting: 0   |
|                 | • AP Agency partner…    |   1. AP Group        | • By type 0/1/1|
|                 | • RK Riya Kapoor        |   2. RK Direct       | • New Message  |
|                 |                         |   [Open in F13 V4 →] |   To: Support  |
+-----------------------------------------------------------------------------------+
```
- **Component treatment:**
  - Places the `/messages/new/direct` (`To: Nestlancer Support · Platform support admin for your account. Client-to-client messaging is not available.`) card directly inside the right-hand rail beneath `Inbox snapshot`, turning wasted right-rail space into a 1-click support launcher (`C11`).

---

## Concept V5 — Adaptive Docked Inbox & Modal/Drawer New-Direct Flow

- **1-sentence thesis:** Features a full-height 3-pane docked inbox where the `Overview` KPIs (`18`) and `Inbox snapshot` (`19`) merge into a unified collapsible telemetry rail, and `Message support` (`/messages/new/direct`, `20`) opens as an accessible, deep-linkable dialog or inline composer sheet.
- **References used:** R3 (Webflow/Apex), R6 (Intercom Customizable Inbox), R9 (Missive).
- **Density & spacing posture:** App-like full-viewport 3-pane workspace (`330px` queue + `1fr` centre pane + `264px` telemetry rail).
- **ASCII Layout Skeleton:**
```
+-----------------------------------------------------------------------------------+
| [Sidebar 232px] | Header: Dashboard > Messages                     [⌘K] [🌙] [6] AM|
|                 +-----------------------------------------------------------------+
|                 | H1: Messages [Live] [All caught up · 0 unread] [Message support]|
|                 +------------------------+-----------------------+----------------+
|                 | QUEUE PANE (330px)     | CENTRE PANE (1fr)     | TELEMETRY RAIL |
|                 | [Search by name, ID…]  | [Empty Selection (19) | INBOX SNAPSHOT |
|                 | [All|Unread|Direct|Grp]|  OR Selected Thread   | Open 2 / Unr 0 |
|                 | [Inbox|Active|Archived]|  Preview + Quick Jump | Waiting 0      |
|                 | [Sort: Unread first ▾] |  to F13 V5]           | Project 0      |
|                 | • AP Agency partner    |                       | Direct 1       |
|                 | • RK Riya Kapoor       | [Modal/Tab: New       | Group 1        |
|                 |                        |  message to Support]  | [Start Direct] |
+-----------------------------------------------------------------------------------+
```
- **Component treatment:**
  - Deep-linkable `?view=inbox|Empty|preview|new-direct` states so reviewers can test all 3 captured routes (`18`, `19`, `20`) inside one seamless single-entry design (`C11`).

---

## Variant Difference Table

| Dimension | V1 · Enriched 3-Pane | V2 · Linear KPI Ribbon | V3 · Split Cards & Stage | V4 · Support Command Hub | V5 · Adaptive Docked Inbox |
|---|---|---|---|---|---|
| **Primary layout** | 3-pane split w/ 3 KPIs folded into right `Inbox snapshot` rail | Top horizontal KPI ribbon + high-density 3-pane triage | 3 KPI cards on top + 3-pane card queue & stage below | 3-pane split w/ `Inbox snapshot` + `New message` in right rail | Full-height docked 3-pane + modal/inline `New message` sheet |
| **C11 Merge strategy** | Folds `18` KPIs into `19` right rail (exact Report C11 recommendation) | Consolidates `18` KPIs into a compact 44px top telemetry bar | Stacks `18` 3-KPI strip above `19` 3-pane workspace | Embeds `18` `Recent conversations` in centre + `20` in right rail | Merges `18` status pills into header + collapsible right rail |
| **`/messages/new/direct` (20)** | Switchable centre view or slide-over drawer (`Message support`) | Inline triage card (`Press N` or click `Message support`) | Dedicated tab & modal card with honesty banner | Always-visible right-rail Support Launcher + centre view | Accessible dialog (`role="dialog"`) + `?view=new-direct` state |
| **Centre pane default** | Captured `"Select a conversation"` (`19`) + quick-open cards (`18`) | `"Select a conversation"` + compact recent table + keyboard hints | `"Select a conversation"` hero + 2 rich preview cards | `"Select a conversation"` + channel guide (`Direct`/`Group`/`Project`) | `"Select a conversation"` + 1-click thread preview toggle |
| **Cross-link to F13** | Queue row click or `"Open thread →"` (`F13 V1`) | Row click / `Enter` key (`F13 V2`) | Card CTA `"Continue chat →"` (`F13 V3`) | Queue or Recent card click (`F13 V4`) | Queue row or preview header CTA (`F13 V5`) |
