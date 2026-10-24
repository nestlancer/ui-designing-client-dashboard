# Part 04 — Conversation (messages)

Read `docs/meridian-page-prompts/README.md`. Canon: master §8.7, §9.E. **Requires parts 00–01** (shell + Overview). Prefer after Money so context chips can link real invoice/milestone URLs.

## Task
Build the messaging workspace. Threads stay tied to commercial objects (P1 / M2 / ₹20,880).

### Files to write

| Path | Job |
|---|---|
| `meridian-lab/pages/messages.html` | Thread list + empty preview + context (≥1440) |
| `meridian-lab/pages/thread.html` | Full messaging workspace |
| `meridian-lab/pages/message-new.html` | Start conversation with audience cards |

## Locked conversations (§8.7)
1. **Payments ops — LMS settlement** · GROUP · 3 unread of 11
2. **Riya Kapoor** · DIRECT · last message 2 days ago
3. **LMS delivery — weekly** · PROJECT (P1) · quiet

**Opening thread (verbatim on `thread.html`):**
- Riya 09:32 — mid-project invoice out; due 20 February…
- Priya 09:36 — GST breakdown on PDF?
- Karthik 09:38 — Subtotal, GST 18 %, total on page one…
- Priya 09:41 — No PO needed. Will settle before the 20th. (current user, last)

## Layout rules
- **`messages.html`:** list 360 + preview fluid + context 300 at ≥1440; below 1180 list is the page (`thread.html` is the detail route).
- **`thread.html`:** 3-pane at ≥1440 (list 300 · thread · context 320). Day divider with absolute date. Own messages right/ink; others surface + hairline. Composer with draft state. Context links P1, M2, amount, files.
- **`message-new.html`:** 3 recipient radios (delivery lead · support · project thread); primary disabled with reason until recipient chosen.

## Out of scope
Global files library (part 05), settings notification matrix (part 06).

## Acceptance checks
- [ ] 3 conversation rows; unread counts honest
- [ ] Thread visibly connected to P1 + M2
- [ ] Verbatim messages present
- [ ] Composer shows honest draft/send state (static)
- [ ] No script; shell consistent

## Hand-off line
```
Part 04 done. Next: docs/meridian-page-prompts/05-files.md
```
