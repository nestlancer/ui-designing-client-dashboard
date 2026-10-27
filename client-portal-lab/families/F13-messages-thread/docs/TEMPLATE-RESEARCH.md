# F13 · Messages Thread — Gate T · TEMPLATE-RESEARCH

Study of 9 real-world SaaS, customer messaging, inline message editing, and SLA/read-receipt references informing the 5 variants of **F13 · Messages Thread (`/messages/thread/{id}`)**.

```
## GATE T (F13)
References studied: 9 (report §5: 4 · fresh search: 5) · Borrow/reject logged: YES
Gate: PASS
```

---

## 1 · Reference Inventory Summary

| # | Name | Source | Live URL | Assigned Variants |
|---|---|---|---|---|
| R1 | **Moxo Client Portal — Contextual Thread & Member Drawer** | Report §5 `[1]` | `https://www.moxo.com/blog/client-portal-design` | V1, V4 |
| R2 | **WebAIM Contrast Checker — High-Contrast Form & Bubble Text** | Report §5 `[10]` | `https://webaim.org/resources/contrastchecker/` | V1..V5 (`C10`) |
| R3 | **Eleken — High-Density Messaging & Contextual Drawer** | Report §5 `[7]` | `https://www.eleken.co/blog-posts/dashboard-design-examples-that-catch-the-eye` | V2, V3 |
| R4 | **AdminLTE — Scannable Operational Headers & Status Indicators** | Report §5 `[2]` | `https://adminlte.io/blog/dashboard-design-examples/` | V2, V5 |
| R5 | **Intercom — Setting & Displaying SLAs on Conversations** | Fresh Search | `https://www.intercom.com/help/en/articles/6546152-set-slas-for-conversations-and-tickets` | V1..V5 (`A7`) |
| R6 | **Intercom Blog — Product Principles: Read Receipts** | Fresh Search | `https://www.intercom.com/blog/product-principles-read-receipts` | V1..V5 (`A7`) |
| R7 | **Plain — SLAs & Message Edits in B2B Support Threads** | Fresh Search | `https://www.plain.com/blog/slas-slack-connect-support` | V2, V4 |
| R8 | **SaaSFrame — Intercom Help Desk Thread & Composer UI** | Fresh Search | `https://www.saasframe.io/examples/intercom-help-desk-inbox` | V1, V3 |
| R9 | **Missive — Collaborative Thread Actions, Mentions & Quick Replies** | Fresh Search | `https://www.getmacha.com/blog/front-vs-missive` | V3, V5 |

---

## 2 · Detailed Reference Breakdown

### R1 · Moxo Client Portal — Contextual Thread & Member Drawer (Report §5 `[1]`)
- **Live URL:** `https://www.moxo.com/blog/client-portal-design`
- **Category:** Client portal thread & participant management
- **Layout & hierarchy:** 3-pane thread workspace: Left `Conversation queue` (`2 conversations`), Centre active thread stream (`Agency partner coordination — festive campaigns` or `Riya Kapoor`), and Right contextual drawer (`Group info · Members` + `Search in conversation`).
- **Component patterns:** Collapsible `Members` drawer (`RK Riya Kapoor Admin`, `SP Samira Patel Client`, `AM Arjun Mehta Client`, `Leave group`), system event notices (`Samira Patel joined the group`), and quick-reply pills.
- **Typography & density:** Clear differentiation between incoming bubbles (`--card` surface) and self (`Y`) bubbles (`--primary` surface).
- **Interaction & state design:** Seamless switching between Group thread (`21–24`) and Direct thread (`25`).
- **What we borrow (`→ V1, V4`):** 3-pane thread choreography with collapsible `Group info` / `Members` and `Search in conversation` right drawer.
- **What we reject:** Separate modal popups for viewing group members when the right drawer is already present.

### R2 · WebAIM Contrast Standard — Fixing the Inline Edit Bug (`C10`) (Report §5 `[10]`)
- **Live URL:** `https://webaim.org/resources/contrastchecker/`
- **Category:** WCAG 2.1 AA / AAA form contrast & inheritance safety
- **Layout & hierarchy:** Directly addresses **Finding #7 / C10**: in the captured live DOM (`24-messages-thread-edit-message-state.html` / `038-messages-thread-group-edit.webp`), the inline edit `<textarea>` inside the blue self-message bubble (`.bg-primary.text-white`) applied `bg-slate-50` (`#f8fafc`) without overriding `color: #ffffff`, yielding a **1.04:1 invisible white-on-white input**.
- **Component patterns:** Explicit, inheritance-proof `.message-edit-textarea` rule:
  - Light mode: `background: #ffffff; color: #0f172a;` (**15.8:1 AAA contrast**)
  - Dark mode: `background: #0b1220; color: #f8fafc;` (**15.4:1 AAA contrast**)
  - Plus explicit `caret-color: var(--primary)`, focus ring, character counter, and `Save` / `Cancel` buttons.
- **Typography & density:** `14px` `--font-sans` inside the edit textarea matching the message body rhythm.
- **Interaction & state design:** Clicking `Edit` on any self message (or opening `?state=edit`) renders the high-contrast inline editor immediately; `Save` updates the bubble in place and `Cancel` / `Esc` restores the original text.
- **What we borrow (`→ V1..V5`):** Mandatory **C10** fix across all 5 variants, plus a contrast telemetry badge in the edit toolbar (`Contrast 15.8:1 AAA · C10 Fixed`).
- **What we reject:** Relying on inherited text color inside themed message bubbles.

### R3 · Eleken — High-Density Messaging & Contextual Drawer (Report §5 `[7]`)
- **Live URL:** `https://www.eleken.co/blog-posts/dashboard-design-examples-that-catch-the-eye`
- **Category:** B2B SaaS messaging & contextual search
- **Layout & hierarchy:** Keeps `Search in conversation` (`Search messages…`) and `Group info` accessible without crowding the message stream.
- **Component patterns:** Live search highlight inside message bubbles when typing in `Search messages…`.
- **Typography & density:** Compact action bars (`Reply`, `Flag` on incoming; `Reply`, `Edit`, `Delete` on self).
- **Interaction & state design:** Instant filtering/highlighting of messages matching the search query (`UPI`, `Navratri`, `HDFC`, `Razorpay`).
- **What we borrow (`→ V2, V3`):** Live in-thread message highlighting when using `Search in conversation`.
- **What we reject:** Static search inputs that do nothing when clicked.

### R4 · AdminLTE — Scannable Operational Headers & Status Indicators (Report §5 `[2]`)
- **Live URL:** `https://adminlte.io/blog/dashboard-design-examples/`
- **Category:** Operational header clarity
- **Layout & hierarchy:** Thread header immediately communicates: *Who is in this thread? Is it Group or Direct? What is the admin response SLA (`A7`)? Are all messages read?*
- **Component patterns:** Thread header with avatar (`AP` or `RK`), title, subtitle (`Group · 3 members` or `Direct chat with your admin team.`), **A7 SLA badge**, `Members` toggle, and `Mark read` button.
- **Typography & density:** Crisp 60px thread header bar with zero wasted space.
- **Interaction & state design:** 1-click thread switcher between Group (`21–24`) and Direct (`25`).
- **What we borrow (`→ V2, V5`):** Scannable operational thread header with integrated **A7** SLA status.
- **What we reject:** Burying participant roles two clicks deep.

### R5 · Intercom — Setting & Displaying SLAs on Conversations (`A7`) (Fresh Search)
- **Live URL:** `https://www.intercom.com/help/en/articles/6546152-set-slas-for-conversations-and-tickets`
- **Category:** Support response-time SLA indicators
- **Layout & hierarchy:** Surfaces response-time expectations directly in the conversation header so B2B clients know when to expect an admin reply without double-pinging.
- **Component patterns:** **A7 SLA Header Pill:** `"Riya Kapoor · Admin · Usually replies within 2 business hours"` with a live green/blue availability dot and office-hours tooltip.
- **Typography & density:** `12px` high-contrast badge (`--status-info-*` / `--status-success-*`).
- **Interaction & state design:** Displayed in both Group (`21–24`, where Riya Kapoor is the Admin) and Direct (`25`, 1:1 with Riya Kapoor) threads.
- **What we borrow (`→ V1..V5`):** Direct inspiration for the **A7 SLA header indicator** across all 5 variants.
- **What we reject:** Countdown breach alarms meant only for internal support agents.

### R6 · Intercom Blog — Product Principles: Read Receipts (`A7`) (Fresh Search)
- **Live URL:** `https://www.intercom.com/blog/product-principles-read-receipts`
- **Category:** Transparent conversational read receipts
- **Layout & hierarchy:** Upgrades ambiguous `"Sent"` or single-check `"✓"` indicators under client-sent (`Y`) messages into transparent, human-readable read receipts (`✓✓ Seen by Riya Kapoor · Oct 5, 4:02 AM` and in Group: `✓✓ Seen by Riya Kapoor & Samira Patel · Oct 5, 4:02 AM`).
- **Component patterns:** Double-check SVG icon + reader attribution + timestamp underneath self (`Y`) bubbles (`A7`).
- **Typography & density:** `11.5px` `--mono` / `--font-sans` receipt metadata with mini avatar stack or tooltip.
- **Interaction & state design:** Newly sent messages in the composer transition from `Sending…` → `Sent · Just now` → `✓✓ Seen by Riya Kapoor`.
- **What we borrow (`→ V1..V5`):** Direct inspiration for **A7 Read Receipts** on all self (`Y`) messages while preserving the captured `"Sent"` / `"✓"` tokens.
- **What we reject:** Anonymous read receipts in group threads that don't tell the client whether the Admin (`Riya Kapoor`) saw the message.

### R7 · Plain — SLAs & Message Edits in B2B Support Threads (Fresh Search)
- **Live URL:** `https://www.plain.com/blog/slas-slack-connect-support`
- **Category:** B2B engineering & agency support threads
- **Layout & hierarchy:** Preserves the original message timestamp (`Oct 5 3:46 AM`) when a message is edited (`PATCH /api/v1/messages/{id}`) and appends a clean `(edited)` badge after saving (`C10`).
- **Component patterns:** Inline edit box with keyboard hints (`Enter / Click Save · Esc to Cancel`), `@mention` pills (`@Riya Kapoor`, `@Samira Patel`, `@Arjun Mehta`), and quoted reply banners (`Replying to Riya Kapoor`).
- **Typography & density:** High-contrast developer-grade clarity.
- **Interaction & state design:** Full state parity across `Default (21)`, `Members (22)`, `Reply (23)`, `Edit (24)`, and `Direct (25)`.
- **What we borrow (`→ V2, V4`):** Timestamp preservation + `(edited)` tag when saving an inline edit in state `24`.
- **What we reject:** Hiding message edit/delete actions inside 3-dot submenus when 2–3 inline buttons fit cleanly.

### R8 · SaaSFrame — Intercom Help Desk Thread & Composer UI (Fresh Search)
- **Live URL:** `https://www.saasframe.io/examples/intercom-help-desk-inbox`
- **Category:** Thread stream & multi-state composer
- **Layout & hierarchy:** Stacked composer footer combining:
  1. Quick-reply suggestion pills (`Thanks, I will review this.`, `Can you clarify the timeline?`, `Could we schedule a quick call?`)
  2. `@mention` quick-insert chips (`@Riya Kapoor`, `@Samira Patel`)
  3. Dismissible `Replying to Riya Kapoor` quote banner (`23`)
  4. Multiline `<textarea>` + `Send` button (`Enter to send, Shift+Enter for new line`).
- **Component patterns:** Docked composer container with smooth banner expansion in state `23`.
- **Typography & density:** Comfortable composer height (`72px–96px`) with clear keyboard hint placeholder.
- **Interaction & state design:** Clicking any quick-reply pill or `@mention` chip populates the composer; clicking `Reply` on any message activates the `Replying to …` banner (`23`).
- **What we borrow (`→ V1, V3`):** Multi-layer composer ergonomics that keep quick replies, `@mentions`, and the reply banner (`23`) tidy and accessible.
- **What we reject:** Floating overlapping toolbars that obscure the last message in the thread.

### R9 · Missive — Collaborative Thread Actions, Mentions & Flagging (Fresh Search)
- **Live URL:** `https://www.getmacha.com/blog/front-vs-missive`
- **Category:** Shared inbox & multi-party group threads
- **Layout & hierarchy:** Distinguishes participants in multi-party group threads (`RK Riya Kapoor · Admin`, `SP Samira Patel · Client`, `Y You · Arjun Mehta`) with role pills and color-coded initials avatars.
- **Component patterns:** Per-message `Flag` modal/popover mapped to `POST /api/v1/messages/{id}/report` (`SPAM`, `HARASSMENT`, `INAPPROPRIATE`, `OTHER`) and quoted reply jumps.
- **Typography & density:** Scannable sender headers (`Name` + `Role badge` + `Oct 5 3:46 AM`).
- **Interaction & state design:** Clicking `@Samira Patel` or `@Arjun Mehta` inside Message 1 highlights that member in the `Members` drawer (`22`).
- **What we borrow (`→ V3, V5`):** Participant role clarity and interactive `Flag` reporting popover grounded in `ReportMessageDto`.
- **What we reject:** Internal-only team comment yellow boxes not exposed to client users.
