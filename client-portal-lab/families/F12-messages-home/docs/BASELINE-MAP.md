# F12 · Messages Home (Overview → Inbox) — Gate S · BASELINE-MAP

The messages entry and split-pane inbox (`/messages`, `/messages/inbox`, `/messages/new/direct`), reconstructed from its 3 screenshots, 3 HTML snapshots, and `audit-metadata.json` before changing a single pixel.

```
## GATE S (F12)
Screenshots opened: 3/3 · HTML opened: 3/3 · audit-metadata read: YES
Routes mapped: /messages, /messages/inbox, /messages/new/direct · Content frozen: YES
Gate: PASS
```

---

## 1 · Sources Opened (in order)

1. `client-portal-prompts/F12-messages-home.md` + discipline references (`example.homepage-prompt.md`, `example.portfolio-listing-prompt.md`).
2. Screenshots **3/3**:
   - `Nestlancer-clients-screenshots/clients/004-messages.webp` (`/messages` overview landing)
   - `Nestlancer-clients-screenshots/clients/005-messages-inbox.webp` (`/messages/inbox` split-pane inbox)
   - `Nestlancer-clients-screenshots/clients/006-messages-new-direct.webp` (`/messages/new/direct` new support message)
3. `nestlancer-client-pages-html/README.md` (rows 28–30) + HTML snapshots **3/3**:
   - `nestlancer-client-pages-html/18-messages-overview.html`
   - `nestlancer-client-pages-html/19-messages-inbox-panel.html`
   - `nestlancer-client-pages-html/20-messages-new-direct.html`
   - Plus `nestlancer-client-pages-html/audit-metadata.json`.
4. `reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md` + `reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx` (10/10 sheets).
5. `backend-api-swagger/README.md` + `messaging.openapi.json` + `users.openapi.json`.

---

## 2 · Screenshot ↔ HTML ↔ Route Map

| HTML file | Route | State captured | Matching screenshot | Session / Account |
|---|---|---|---|---|
| `18-messages-overview.html` | `/messages` | Messages overview landing page (3 KPIs + Recent conversations + `Open messaging panel`) | `004-messages.webp` | **Arjun Mehta (`AM`)**, 6 notifications (**Content Truth**; `004` is Ananya Iyer `AI`) |
| `19-messages-inbox-panel.html` | `/messages/inbox` | 3-pane inbox (`Conversation queue` + `Select a conversation` empty centre pane + `Inbox snapshot` right rail) | `005-messages-inbox.webp` | **Arjun Mehta (`AM`)** (**Content Truth**; `005` is Samira Patel `SP`) |
| `20-messages-new-direct.html` | `/messages/new/direct` | New direct message to `Nestlancer Support` with honesty note | `006-messages-new-direct.webp` | **Arjun Mehta (`AM`)** (**Content Truth**; `006` is Samira Patel `SP`) |

---

## 3 · Audit Metadata Census (`audit-metadata.json`)

- **`18-messages-overview.html` (`/messages`)**:
  - H1: `Messages` (`26px`, `700`) · H2: `Recent conversations` (`14px`, `600`).
  - Links: `/messages/new/direct` (`Message support`), `/messages/inbox` (`Open messaging panel` ×2), `/messages/thread/01a10a2b-f916-701a-9036-030e679c415c` (Group thread), `/messages/thread/01a10a2b-bc16-7143-86da-6f70b07d91c3` (Direct thread).
- **`19-messages-inbox-panel.html` (`/messages/inbox`)**:
  - H1: `Messaging panel` (`20px`, `800`) · H2: `Conversation queue` (`15px`, `700`).
  - Inputs (3): `<input type="search" placeholder="Search by name, preview, or ID…">`, `<select aria-label="Inbox">` (`Active=active`, `Archived=archived`), `<select aria-label="Sort">` (`Unread first=unread`, `Longest wait=waiting`, `Latest=recent`).
  - Filter buttons (5): `All` · `Unread` · `Direct` · `Project` · `Group`.
- **`20-messages-new-direct.html` (`/messages/new/direct`)**:
  - H1: `New message` (`26px`, `700`).
  - Buttons: `Start conversation`, link `Cancel` (`/messages`).
- **Failed requests / console errors on `/messages*`:** `0` API errors.

---

## 4 · Frozen Content Truth (Verbatim from `18`, `19`, `20` — Arjun Mehta DOM)

### 4.1 Merged Header & Overview KPIs (from `18` + `19`, merged per C11)
- **Eyebrow:** `Support`
- **H1:** `Messages` (and `/messages/inbox` subtitle `Messaging panel`)
- **Lead copy (`18`):** `Review your inbox at a glance, then open the messaging panel to chat.`
- **Lead copy (`19`):** `Your conversations with Nestlancer — pick a thread to continue.`
- **Status chip:** `Live`
- **Primary CTA:** `Message support` (`/messages/new/direct` — opens in-page New Message view/modal or state tab)
- **Overview KPIs (3 cards from `18`):**
  1. `Open conversations` · `2` · `Active threads`
  2. `Unread messages` · `0` · `All caught up`
  3. `Unread threads` · `0` · `None waiting`

### 4.2 Conversation Queue & Controls (from `18` + `19`)
- **Heading:** `Conversation queue` · `2 conversations — click to open in the workspace` (plus `Recent conversations` · `Latest activity in your inbox` from `18`)
- **Search placeholder:** `Search by name, preview, or ID…`
- **Type filter chips:** `All` · `Unread` · `Direct` · `Project` · `Group`
- **Inbox state tabs / select:** `Inbox` · `Active` · `Archived`
- **Sort options:** `Unread first` (`unread`) · `Longest wait` (`waiting`) · `Latest` (`recent`)
- **Captured Conversations (2 rows):**
  1. **Group thread (`01a10a2b-f916-701a-9036-030e679c415c`):**
     - Avatar initials: `AP` (or `AG` in `18`)
     - Title: `Agency partner coordination — festive campaigns`
     - Type badge: `Group`
     - Timestamp: `20 days ago`
     - Preview: `Great — I'll schedule a joint review of Razorpay UPI checkout patterns that worked across both projects.`
  2. **Direct thread (`01a10a2b-bc16-7143-86da-6f70b07d91c3`):**
     - Avatar initials: `RK` (or `RI` in `18`)
     - Title: `Riya Kapoor`
     - Type badge: `Direct`
     - Timestamp: `20 days ago`
     - Preview: `Noted. Milestone 2 staging link stays live through the weekend for your team to test UPI flows.`

### 4.3 Reading Pane Empty Selection State (from `19`)
- **Title:** `Select a conversation`
- **Body:** `Choose a thread from the list to read messages and send a reply.`
- *(When a user selects either of the 2 threads in F12, they can either preview the thread summary in-pane or click `"Open full thread →"` to jump directly to the same-numbered **F13 · Messages Thread** variant `../../F13-messages-thread/V#/index.html?thread=group|direct`!)*

### 4.4 Right Rail — `Inbox snapshot` (from `19`)
- **Heading:** `Inbox snapshot`
- **Counts:** `Open` `2` · `Unread` `0` · `Waiting` `0`
- **Subheading:** `By type`
- **Type breakdown:** `Project` `0` · `Direct` `1` · `Group` `1`

### 4.5 New Direct Message Flow (`/messages/new/direct` — from `20`)
- **Heading:** `New message`
- **Lead:** `Start a direct conversation with Nestlancer support. Existing support threads reopen automatically.`
- **Recipient card:**
  - Label: `To`
  - Recipient: `Nestlancer Support`
  - **Domain honesty note (KEEP):** `Platform support admin for your account. Client-to-client messaging is not available.`
  - Actions: `Start conversation` (opens/resumes the direct support thread with Riya Kapoor in F13) · `Cancel`
