# F13 · Messages Thread — Gate 1 · CONCEPTS

5 distinct layout, density, and interaction concepts for **F13 · Messages Thread (`/messages/thread/{id}`)**, all sharing the single locked token system (`client-portal-lab/shared/tokens.css`), the compressed 232px sidebar shell (`C17`), all 5 frozen HTML states (`21` Group default, `22` Members drawer, `23` Reply banner, `24` Inline edit state, `25` Direct thread), **C10** (high-contrast inline message edit textarea fix), and **A7** (response-time SLA indicator + read receipts).

```
## GATE 1 (F13)
Concepts written: 5 (V1..V5) · All C-items placed: YES · All A-items placed: YES
Sketches included: YES · Difference table: YES
Gate: PASS
```

---

## Concept V1 — 3-Pane Collaborative Thread Workbench (Recommended Default)

- **1-sentence thesis:** Combines the left `Conversation queue`, the centre message stream (with **A7** SLA header banner, **A7** read receipts, quick-reply pills, `@mention` chips, **C10**-fixed inline edit box, and `Replying to Riya Kapoor` composer banner), and the right `Group info / Members + Search in conversation` drawer into one responsive 3-pane workbench.
- **References used:** R1 (Moxo), R2 (WebAIM `C10`), R5 (Intercom SLAs `A7`), R6 (Intercom Read Receipts `A7`), R8 (SaaSFrame Composer).
- **Density & spacing posture:** Balanced 3-pane workspace (`310px` left queue + `1fr` centre thread stream + `296px` right `Group info & Search` drawer).
- **ASCII Layout Skeleton:**
```
+-----------------------------------------------------------------------------------+
| [Sidebar 232px] | Breadcrumb: Dashboard > Messages > Thread        [⌘K] [🌙] [6] AM|
|                 +-----------------------------------------------------------------+
|  Messages (F12) | [State Bar: 21 Group | 22 Members | 23 Reply | 24 Edit C10 | 25]|
|                 +--------------------+----------------------------+---------------+
|                 | CONVERSATION QUEUE | THREAD HEADER: AP Group    | GROUP INFO    |
|                 | [Panel → F12 V1]   | [A7: Riya Kapoor · Replies | Agency partner|
|                 | [Search…]          |  within 2 business hours]  | [RK][SP][AM]  |
|                 | [All|Unread|Direct]| [Members] [Mark read]      | [Leave group] |
|                 | * AP Agency partner|----------------------------| MEMBERS (3)   |
|                 |   [Group] 20d ago  | [Quick replies: Thanks…]   | • Riya (Admin)|
|                 | • RK Riya Kapoor   | • Samira joined the group  | • Samira      |
|                 |   [Direct] 20d ago | • Monday, Oct 5            | • Arjun       |
|                 |                    | • RK: Welcome both...      |---------------|
|                 |                    | • SP: Sharing our Navratri | SEARCH IN     |
|                 |                    | • Y: Useful reference...   | CONVERSATION  |
|                 |                    |   [C10 Edit: #0f172a/#fff] | [Search msg…] |
|                 |                    |   [✓✓ Seen by Riya · A7]   | [Search]      |
|                 |                    | • RK: Great — I'll sched...|               |
|                 |                    |----------------------------|               |
|                 |                    | [23: Replying to Riya ×]   |               |
|                 |                    | [@Riya] [@Samira] [Send]   |               |
+-----------------------------------------------------------------------------------+
```
- **Component treatment:**
  - **1-Click Captured State Bar:** Instantly switches between `21 Group Thread`, `22 Members Drawer Open`, `23 Reply Banner Active`, `24 Inline Edit (C10 Fixed)`, `25 Direct Thread (Riya Kapoor)`, `Empty Thread`, `Loading Skeleton`, and `Send Error`.
  - **C10 Ship-Blocker Fix:** In state `24` (or whenever clicking `Edit` on a self `Y` message), the inline `<textarea>` renders inside a high-contrast edit card (`background: var(--card); color: var(--fg); border: 1.5px solid var(--primary)`) achieving **15.8:1 contrast** in light mode and **15.4:1** in dark mode.
  - **A7 SLA & Read Receipts:** Header pill `"Riya Kapoor (Admin) · Usually replies within 2 business hours"` + self-message receipt `"Sent · ✓✓ Seen by Riya Kapoor & Samira Patel · Oct 5, 4:02 AM"`.

---

## Concept V2 — Linear-Grade High-Density Feed & Split Inspector

- **1-sentence thesis:** Formats the conversation as a full-width chronological Slack/Linear-style activity feed (rather than narrow left/right chat bubbles) so multi-line edits (`24` — **C10**), `@mentions`, and UTR/milestone references (`25`) have maximum horizontal readability alongside a compact queue and search rail.
- **References used:** R2 (WebAIM `C10`), R3 (Eleken), R4 (AdminLTE), R7 (Plain B2B Support Threads).
- **Density & spacing posture:** Compact Linear/Plain feed density (`280px` left queue + `1fr` full-width row feed + `280px` tabbed `Members / Search` inspector).
- **ASCII Layout Skeleton:**
```
+-----------------------------------------------------------------------------------+
| [Sidebar 232px] | Header: Dashboard > Messages > Thread            [⌘K] [🌙] [6] AM|
|                 +-----------------------------------------------------------------+
|                 | [State Switcher: 21 | 22 | 23 | 24 (C10 Fix) | 25 Direct | ...] |
|                 +------------------+-------------------------------+--------------+
|                 | QUEUE (280px)    | CHRONOLOGICAL FEED STREAM     | INSPECTOR    |
|                 | [← F12 V2 Panel] | Header + [A7 SLA: ≤ 2 biz hr] | [Members|Srch|
|                 | * AP Group       |-------------------------------| RK Admin     |
|                 | • RK Direct      | [RK] Riya Kapoor  Oct 5 3:46  | SP Client    |
|                 |                  | Welcome both — this group...  | AM Client    |
|                 |                  | [SP] Samira Patel Oct 5 3:46  | [Leave group]|
|                 |                  | Sharing our Navratri page...  |--------------|
|                 |                  | [Y] You (Arjun)   Oct 5 3:46  | Search msgs: |
|                 |                  | [C10 Inline Textarea + Save]  | [          ] |
|                 |                  | ✓✓ Seen by Riya Kapoor (A7)   |              |
+-----------------------------------------------------------------------------------+
```
- **Component treatment:**
  - Full-width message rows eliminate cramped bubble wrapping when editing a message (`24`), giving the **C10** `<textarea>` a wide, unmistakable editing frame with `Save` and `Cancel`.

---

## Concept V3 — Focus-First Conversation Canvas with Collapsible Queue & Slide-Over Drawer

- **1-sentence thesis:** Gives maximum width to the active conversation stream and docked composer (`23` reply banner + quick replies + `@mentions`) while keeping the `Conversation queue` in a compact top/left switcher and `Group info / Search` (`22`) in a dedicated right card column.
- **References used:** R3 (Eleken), R8 (SaaSFrame), R9 (Missive).
- **Density & spacing posture:** Generous conversation canvas (`280px` queue + `1fr` spacious bubble stream + `300px` `Group info` & `Search in conversation` cards).
- **ASCII Layout Skeleton:**
```
+-----------------------------------------------------------------------------------+
| [Sidebar 232px] | Header: Dashboard > Messages > Thread            [⌘K] [🌙] [6] AM|
|                 +-----------------------------------------------------------------+
|                 | Thread Header: AP Agency partner… | [A7 SLA Banner] | [21..25]  |
|                 +-------------------+------------------------------+--------------+
|                 | COMPACT QUEUE     | SPACIOUS BUBBLE CANVAS       | CONTEXT CARDS|
|                 | [Panel → F12 V3]  | [Quick Reply Suggestion Bar] | CARD 1:      |
|                 | [All|Unread|Grp]  | • System: Samira joined      | Group info   |
|                 | • AP Group (4)    | • RK Bubble (Left)           | 3 members    |
|                 | • RK Direct (3)   | • SP Bubble (Left)           | [Leave group]|
|                 |                   | • Y Bubble (Right — Primary) | CARD 2:      |
|                 |                   |   + C10 White Card Editor    | Search in    |
|                 |                   |   + A7 Read Receipt Pill     | conversation |
|                 |                   | • RK Bubble (Left)           |              |
|                 |                   | [23 Reply Banner + Composer] |              |
+-----------------------------------------------------------------------------------+
```
- **Component treatment:**
  - Separates `Group info / Members` (`22`) and `Search in conversation` into two distinct tokenised cards (`C6`) in the right column.

---

## Concept V4 — Support SLA & Milestone Context Thread

- **1-sentence thesis:** Highlights the business context of both threads — pairing the **A7 SLA & Read Receipt bar** with the **Group Members (`22`)** and **Direct Admin Payment Context (`25` — HDFC transfer & Milestone 2 UPI staging)** in a structured split layout.
- **References used:** R1 (Moxo), R5 (Intercom SLAs), R6 (Intercom Read Receipts), R7 (Plain).
- **Density & spacing posture:** Structured 3-column operational layout with a top **A7 Response SLA & Read Status Banner** inside the active thread pane.
- **ASCII Layout Skeleton:**
```
+-----------------------------------------------------------------------------------+
| [Sidebar 232px] | Header: Dashboard > Messages > Thread            [⌘K] [🌙] [6] AM|
|                 +-----------------------------------------------------------------+
|                 | [Thread Switcher: Group (21–24) | Direct w/ Riya Kapoor (25)]   |
|                 +--------------------+-----------------------------+--------------+
|                 | CONVERSATION QUEUE | THREAD + A7 SLA STATUS BAR  | GROUP INFO & |
|                 | [Search…]          | [⏱ A7: Riya Kapoor · Admin  | PARTICIPANTS |
|                 | [All|Unread|Direct]|  Replies < 2h · ✓✓ All read]| • RK Admin   |
|                 | [Inbox|Archived]   |-----------------------------| • SP Client  |
|                 | [Sort: Unread ▾]   | • Date: Monday, Oct 5       | • AM Client  |
|                 | * AP Group         | • Messages 1..4 (or 1..3)   | [Leave group]|
|                 | • RK Direct        | • Inline C10 Editor (State  |--------------|
|                 |                    |   24: 15.8:1 contrast)      | IN-THREAD    |
|                 |                    | • Reply Banner (State 23)   | SEARCH       |
+-----------------------------------------------------------------------------------+
```
- **Component treatment:**
  - Prominent **A7** SLA & Read Receipt status bar at the top of the message stream plus per-message receipt timeline.

---

## Concept V5 — Docked Split-Screen Messenger with Floating Action Composer

- **1-sentence thesis:** Pairs a unified left-hand queue + `Search in conversation` panel with a wide centre message stream and a right-hand `Group info / Members` inspector (`22`), featuring a floating card composer (`23` reply banner + `@mentions` + quick replies) and a zero-inheritance **C10** inline edit card (`24`).
- **References used:** R2 (WebAIM `C10`), R4 (AdminLTE), R9 (Missive).
- **Density & spacing posture:** Modern docked messenger (`320px` Queue + In-Thread Search on left, `1fr` centre thread + floating composer, `288px` `Group info / Members` drawer on right).
- **ASCII Layout Skeleton:**
```
+-----------------------------------------------------------------------------------+
| [Sidebar 232px] | Header: Dashboard > Messages > Thread            [⌘K] [🌙] [6] AM|
|                 +-----------------------------------------------------------------+
|                 | [State Bar: 21 Group | 22 Members | 23 Reply | 24 Edit | 25 Dir]|
|                 +----------------------+---------------------------+--------------+
|                 | QUEUE + THREAD SEARCH| ACTIVE MESSAGE STREAM     | GROUP INFO   |
|                 | [Conversation queue] | Header + [A7 SLA Badge]   | Agency partn.|
|                 | • AP Group           | • Samira joined the group | [RK][SP][AM] |
|                 | • RK Direct          | • RK, SP, Y (C10 Edit), RK| 3 Members    |
|                 |----------------------|   with A7 ✓✓ Seen receipt | • Riya Admin |
|                 | [Search in           |---------------------------| • Samira     |
|                 |  conversation…]      | +-----------------------+ | • Arjun      |
|                 | [Search]             | | 23: Replying to Riya  | | [Leave group]|
|                 |                      | | [@Riya] [@Samira]     | |              |
|                 |                      | | [Composer…      Send] | |              |
|                 |                      | +-----------------------+ |              |
+-----------------------------------------------------------------------------------+
```
- **Component treatment:**
  - Co-locates `Conversation queue` and `Search in conversation` on the left so the right drawer is dedicated 100% to `Group info` / `Members` (`22`) or Direct Admin SLA details (`25` / `A7`).

---

## Variant Difference Table

| Dimension | V1 · 3-Pane Workbench | V2 · Linear Activity Feed | V3 · Focus Canvas & Cards | V4 · SLA & Context Thread | V5 · Docked Split Messenger |
|---|---|---|---|---|---|
| **Primary layout** | 3-pane (`310px` Queue + `1fr` Bubbles + `296px` Drawer) | 3-pane w/ full-width chronological rows (no narrow bubbles) | `280px` Queue + wide bubble canvas + 2 stacked right cards | 3-pane w/ dedicated top A7 SLA/Receipt bar inside thread | Left Queue+Search + Centre Stream/Floating Composer + Right Members |
| **Message presentation** | Left incoming cards / Right `--primary` self bubbles | Full-width Slack/Linear rows w/ role badges & wide edit area | Spacious chat bubbles w/ avatar stacks & action pills | Structured timeline cards w/ vertical date connector | Modern chat bubbles w/ floating card composer |
| **C10 (`24` Inline edit fix)** | High-contrast white/dark card inside self bubble (`15.8:1`) | Full-width bordered edit box w/ `Save` / `Cancel` & Esc hint | Contained edit sheet inside self bubble w/ contrast badge | High-contrast inline editor w/ character count & `Save` | Elevated inner card (`bg: var(--card); color: var(--fg)`) |
| **A7 (SLA & Read receipts)** | Header SLA pill + `✓✓ Seen by Riya Kapoor` under `Y` bubble | Header SLA badge + inline receipt row w/ timestamp | Header SLA chip + reader avatar receipt under `Y` bubble | Top A7 SLA & Read Status banner + per-message `✓✓ Seen` | Header SLA pill + double-check `Seen` badge on self message |
| **Drawer & Search (`22`)** | Unified right drawer (`Group info` + `Members` + `Search`) | Tabbed right inspector (`Members (3)` \| `Search in thread`) | Two separate tokenised right-rail cards (`Group info` + `Search`) | Right participant ledger + pinned in-thread search bar | `Search in conversation` on left; `Group info/Members` on right |
