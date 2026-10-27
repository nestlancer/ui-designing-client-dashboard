# F13 · Messages Thread — Gate S · BASELINE-MAP

The active conversation workspace (`/messages/thread/{id}`), reconstructed from its 4 screenshots, 5 HTML snapshots, and `audit-metadata.json` before changing a single pixel.

```
## GATE S (F13)
Screenshots opened: 4/4 · HTML opened: 5/5 · audit-metadata read: YES
Routes mapped: /messages/thread/01a10a2b-f916-701a-9036-030e679c415c (group + members + reply + edit), /messages/thread/01a10a2b-bc16-7143-86da-6f70b07d91c3 (direct) · Content frozen: YES
Gate: PASS
```

---

## 1 · Sources Opened (in order)

1. `client-portal-prompts/F13-messages-thread.md` + discipline references (`example.homepage-prompt.md`, `example.portfolio-listing-prompt.md`).
2. Screenshots **4/4**:
   - `Nestlancer-clients-screenshots/clients/007-messages-thread-group.webp` (Group thread default)
   - `Nestlancer-clients-screenshots/clients/038-messages-thread-group-edit.webp` (Group thread inline edit state — shows white-on-white bug!)
   - `Nestlancer-clients-screenshots/clients/039-messages-thread-group-members.webp` (Group thread with `Group info` / `Members` right drawer open)
   - `Nestlancer-clients-screenshots/clients/040-messages-thread-group-reply.webp` (Group thread with `Replying to Riya Kapoor` composer banner)
3. `nestlancer-client-pages-html/README.md` (rows 31–35) + HTML snapshots **5/5**:
   - `nestlancer-client-pages-html/21-messages-thread-group.html`
   - `nestlancer-client-pages-html/22-messages-thread-group-members-panel.html`
   - `nestlancer-client-pages-html/23-messages-thread-reply-composer.html`
   - `nestlancer-client-pages-html/24-messages-thread-edit-message-state.html`
   - `nestlancer-client-pages-html/25-messages-thread-direct.html`
   - Plus `nestlancer-client-pages-html/audit-metadata.json`.
4. `reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md` + `reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx` (10/10 sheets).
5. `backend-api-swagger/README.md` + `messaging.openapi.json` + `media.openapi.json`.

---

## 2 · Screenshot ↔ HTML ↔ Route Map

| HTML file | Route | State captured | Matching screenshot | Session / Account |
|---|---|---|---|---|
| `21-messages-thread-group.html` | `/messages/thread/01a10a2b-f916-701a-9036-030e679c415c` | Group thread (`Agency partner coordination — festive campaigns`, 3 members, 4 messages) | `007-messages-thread-group.webp` | **Arjun Mehta (`AM`)**, 6 notifications (**Content Truth**; `007` is Samira Patel `SP`) |
| `22-messages-thread-group-members-panel.html` | `/messages/thread/01a10a2b-f916-701a-9036-030e679c415c` | Group thread + `Group info` / `Members` right drawer open (`Hide members`) | `039-messages-thread-group-members.webp` | **Arjun Mehta (`AM`)** (**Content Truth**; `039` is Samira Patel `SP`) |
| `23-messages-thread-reply-composer.html` | `/messages/thread/01a10a2b-f916-701a-9036-030e679c415c` | Group thread + `Replying to Riya Kapoor` composer quote banner | `040-messages-thread-group-reply.webp` | **Arjun Mehta (`AM`)** (**Content Truth**; `040` is Samira Patel `SP`) |
| `24-messages-thread-edit-message-state.html` | `/messages/thread/01a10a2b-f916-701a-9036-030e679c415c` | Group thread + inline edit `<textarea>` on self message (`Save` / `Cancel` — white-on-white bug in live DOM) | `038-messages-thread-group-edit.webp` | **Arjun Mehta (`AM`)** (**Content Truth**; `038` is Samira Patel `SP`) |
| `25-messages-thread-direct.html` | `/messages/thread/01a10a2b-bc16-7143-86da-6f70b07d91c3` | Direct thread (`Riya Kapoor · Direct chat with your admin team.`, 3 messages) | — (HTML-only capture) | **Arjun Mehta (`AM`)**, 6 notifications |

---

## 3 · Audit Metadata Census (`audit-metadata.json`)

- **Console errors / failed requests across `21`–`25`:** `0`.
- **H1 (`21`–`25`):** `Messages` (`20px`, `800`).
- **H2 (`21`–`25`):** `Conversation queue` (`15px`, `700`), `Agency partner coordination — festive campaigns` (`15px`, `700`, in `21–24`) or `Riya Kapoor` (`15px`, `700`, in `25`).
- **Inputs in `24-messages-thread-edit-message-state.html` (6):**
  1. `<input type="search" placeholder="Search by name, preview, or ID…">`
  2. `<select aria-label="Inbox">` (`Active=active`, `Archived=archived`)
  3. `<select aria-label="Sort">` (`Unread first=unread`, `Longest wait=waiting`, `Latest=recent`)
  4. **Inline edit `<textarea>`** (pre-filled with self message text — inherits `color: rgb(255, 255, 255)` from `.bg-primary.text-white` bubble while applying `bg-slate-50` `rgb(248, 250, 252)`, causing **1.04:1 white-on-white invisible text** — fixed in **C10**!)
  5. Composer `<textarea placeholder="Message Agency partner coordination — festive campaigns… (Enter to send, Shift+Enter for new line)">`
  6. `<input type="search" placeholder="Search messages…">` (inside `Search in conversation`)

---

## 4 · Frozen Content Truth (Verbatim from `21`–`25` — Arjun Mehta DOM)

### 4.1 Left Conversation Queue (Shared Across Both Threads)
- **Top header:** `Messages` · `Panel` link (`/messages/inbox` → links to same-numbered **F12 · Messages Home** variant)
- **Queue header:** `Conversation queue` · `2 conversations — click to open in the workspace`
- **Search:** `Search by name, preview, or ID…`
- **Filter chips:** `All` · `Unread` · `Direct` · `Project` · `Group`
- **Tabs & sort:** `Inbox` · `Active` · `Archived` · `Sort: Unread first / Longest wait / Latest`
- **Rows (2):**
  1. `AP` · `Agency partner coordination — festive campaigns` · `Group` · `20 days ago` · `Great — I'll schedule a joint review of Razorpay UPI checkout patterns that worked across both projects.`
  2. `RK` · `Riya Kapoor` · `Direct` · `20 days ago` · `Noted. Milestone 2 staging link stays live through the weekend for your team to test UPI flows.`

---

### 4.2 Thread 1 — Group Thread (`21`–`24` · `/messages/thread/01a10a2b-f916-701a-9036-030e679c415c`)

- **Thread Header:**
  - Avatar: `AP`
  - Title: `Agency partner coordination — festive campaigns`
  - Subtitle: `Group · 3 members`
  - Actions: `Members` (toggles to `Hide members` when drawer open) · `Mark read`
- **Quick-Reply Suggestion Pills:**
  - `Thanks, I will review this.`
  - `Can you clarify the timeline?`
  - `Could we schedule a quick call?`
- **System Event Pill:** `Samira Patel joined the group`
- **Date Separator:** `Monday, Oct 5`
- **Messages (4):**
  1. **`RK` · `Riya Kapoor`** · `Oct 5 3:46 AM`
     - Body: `Welcome both — this group is for coordinating cross-client festive campaign learnings.` `@Samira Patel` `@Arjun Mehta`
     - Actions: `Reply` · `Flag`
  2. **`SP` · `Samira Patel`** · `Oct 5 3:46 AM`
     - Body: `Sharing our Navratri page conversion stats — 4.8% on Meta traffic with Marathi headline variant.`
     - Actions: `Reply` · `Flag`
  3. **`Y` (You — `Arjun Mehta`)** · `Oct 5 3:46 AM` · Status: `Sent`
     - Body: `Useful reference. Our D2C spice store is targeting similar numbers for Navratri — checkout UPI flow is priority this week.`
     - Actions: `Reply` · `Edit` · `Delete`
  4. **`RK` · `Riya Kapoor`** · `Oct 5 3:46 AM`
     - Body: `Great — I'll schedule a joint review of Razorpay UPI checkout patterns that worked across both projects.`
     - Actions: `Reply` · `Flag`
- **Mention Pills Above Composer:** `@Riya Kapoor` · `@Samira Patel`
- **Composer Placeholder:** `Message Agency partner coordination — festive campaigns… (Enter to send, Shift+Enter for new line)` · `Send`
- **Captured Sub-State A — `Members` Drawer (`22`):**
  - Eyebrow: `Group info`
  - Title: `Agency partner coordination — festive campaigns` · `Group · 3 members`
  - Avatar stack: `RK` · `SP` · `AM`
  - Action: `Leave group`
  - Section: `Members`
    - `RK` · `Riya Kapoor` · `Admin · admin@nestlancer.com`
    - `SP` · `Samira Patel` · `Client · samira.patel@nestlancer.com`
    - `AM` · `Arjun Mehta` · `Client · arjun.mehta@nestlancer.com`
  - Section: `Search in conversation` · `<input placeholder="Search messages…">` · `Search`
- **Captured Sub-State B — `Reply` Banner (`23`):**
  - Banner header: `Replying to Riya Kapoor` (with dismiss `×`)
  - Quoted preview: `Welcome both — this group is for coordinating cross-client festive campaign learnings. @Samira Patel @Arjun Mehta`
- **Captured Sub-State C — `Edit` Message (`24`):**
  - Inline `<textarea>` inside Message 3 (`Y`): `Useful reference. Our D2C spice store is targeting similar numbers for Navratri — checkout UPI flow is priority this week.`
  - Buttons: `Save` · `Cancel`

---

### 4.3 Thread 2 — Direct Thread (`25` · `/messages/thread/01a10a2b-bc16-7143-86da-6f70b07d91c3`)

- **Thread Header:**
  - Avatar: `RK`
  - Title: `Riya Kapoor`
  - Subtitle: `Direct chat with your admin team.`
  - Action: `Mark read`
- **Quick-Reply Suggestion Pills:**
  - `Thanks, I will review this.`
  - `Can you clarify the timeline?`
  - `Could we schedule a quick call?`
- **Date Separator:** `Monday, Oct 5`
- **Messages (3):**
  1. **`RK` · `Riya Kapoor`** · `Oct 5 3:46 AM`
     - Body: `Arjun ji — quick check on the Spice D2C mid-payment. UTR pending for the 40% milestone installment.`
     - Actions: `Reply` · `Flag`
  2. **`Y` (You — `Arjun Mehta`)** · `Oct 5 3:46 AM` · Status: `✓`
     - Body: `Accounts team will release HDFC transfer by Monday. Navratri prep is keeping us busy — thanks for the checkout-first sprint.`
     - Actions: `Reply` · `Edit` · `Delete`
  3. **`RK` · `Riya Kapoor`** · `Oct 5 3:46 AM`
     - Body: `Noted. Milestone 2 staging link stays live through the weekend for your team to test UPI flows.`
     - Actions: `Reply` · `Flag`
- **Composer Placeholder:** `Message Riya Kapoor… (Enter to send, Shift+Enter for new line)` · `Send`
- **Right Rail (`Search in conversation`):** `<input placeholder="Search messages…">` · `Search`
