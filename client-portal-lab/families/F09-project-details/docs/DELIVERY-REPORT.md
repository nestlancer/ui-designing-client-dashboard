# F09 · Project Details + 6 Tabs — Delivery Report (Gate 3)

**Routes:** `/projects/{id}` + `?tab=progress|milestones|deliverables|messages|files` · **Family dir:** `families/F09-project-details/` · **Authored:** 2026-10-27, hand-authored (no design-generation script).

## 1 · What shipped

| Variant | Name | Size | Geometry (A) | Narrative (C) | Signature interaction |
|---|---|---|---|---|---|
| V1 | Classic Cockpit | 57 KB | full-width sections | static sections | full tablist keyboard model + C13 dialog |
| V2 | Delivery Journey | 47 KB | stepper-spine column | gated journey | clickable journey steps → detail line |
| V3 | Your Moves | 41 KB | 2-col sticky rail | queue-led | awaiting-you + unlock rail, always visible |
| V4 | One Story | 42 KB | single editorial column | chapter tabs | A15 digest as the Overview spine |
| V5 | Delivery Console | 41 KB | dense console | tab-led | stat strip + 1–6 keyboard tab switching |

Coverage spread: airy (V1) · dense (V5) · queue-led (V3) · narrative/stepper-led (V2, V4) · motion-led (V2 reveals) — all five prompts satisfied. All ≤70 KB soft budget; all import the locked tokens as-is.

## 2 · Gate 3 checklist

| Check | Result |
|---|---|
| Frozen content (57%, 1/2, two × ₹30,000.00, “Not due yet” ×2, 0/0, Riya Kapoor thread, 20.3 KB PDF, captured-empties verbatim) | ✅ 5/5 — no invented milestone, fee, or pay-now |
| All 6 tabs in-page with deep-link `?tab=` | ✅ 5/5 (Overview · Progress · Milestones · Deliverables · Messages · Files) |
| CHANGE C2 verdict line / C13 real preview / C19 why-locked / C17 shell / C4 AA / C5 one ramp / C6 tokens / C18 H1 | ✅ 5/5 |
| ADD P1: A1 Ask-AI (demo-labelled, frozen facts) / A2 Help hub / A3 unlock explainer / A4 reject+revision-with-reason / A13 degraded state | ✅ 5/5 |
| ADD P3: A14 expectation log / A15 activity digest | ✅ 5/5 (exceeds ≥3/5) |
| KEEP: dual Delivery/Payment status, gated locks, “Awaiting you”, graceful wording | ✅ 5/5 |
| States: populated / loading / 502 error boundary (“Something went wrong / Network Error / Try again” + status banner) | ✅ 5/5 via “Lab states” + `?state=` |
| Real endpoints cited for every write (milestone approve/revision, deliverable approve/reject, feedback, request-changes, messaging, media) | ✅ per `API-MAP.md`; calls stay offline and say so |

## 3 · Verification (honest)

- `node --check` on extracted inline scripts: **PASS 5/5**.
- BeautifulSoup parse: exactly one H1 (project title), **6 `role="tab"` tabs in Overview→Files order**, zero `href="#"`, zero remote assets; frozen keywords present (57%, ₹30,000, “Why is payment locked”, “Ask AI”, “Expectation log”, “Activity digest”, “No deliverables yet”, “Riya Kapoor”, “wireframes.pdf”, “Something went wrong”, “Your team will post”).
- **Not run:** browser/screenshot QA — no browser binary in the sandbox. Tabs/dialog/focus behaviour is implemented to the ARIA pattern and verified by static + syntax checks only; pixel parity is not claimed.

## 4 · Winner

**V3 · Your Moves.** On this page the client's first question is always “do I need to do anything right now?” V3 is the only layout that keeps that answer on screen from every tab: a sticky rail that names whose move it is, celebrates “nothing waits on you today” when that's the truth, and turns the report's gaming pattern (A3, “Unlock me”) into a calm, explicit unlock panel. It reuses the F05 “Awaiting you” pattern (a report KEEP), keeps the dual-status milestones untouched, and still carries the complete six-tab surface. V1 is the reference implementation; V3 is the product idea.

## 5 · Preview

```
python3 -m http.server 8130   # from repo root
→ /client-portal-lab/  (gallery, F09 section) or /client-portal-lab/families/F09-project-details/V3/index.html?tab=milestones
```
