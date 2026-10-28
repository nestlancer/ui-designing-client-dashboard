# F07 · Request Details — DELIVERY REPORT

**Family:** F07 · `families/F07-request-details/`
**Built:** 2026-10-28 · 5 variants (V1–V5), all hand-authored
**Locked scheme:** `shared/tokens.css` + `shared/base.css` imported as-is, never forked

## 1 · What was built

The request-details family — the full-page detail surface for a request. F05's detail drawer "stands in" for F07; F07 is the real family the production `11/12-request-details-*.html` snapshots describe. Five variants explore how a request detail can lead.

| Variant | Layout | Lead | Interaction |
|---|---|---|---|
| **V1 Timeline-led** | vertical timeline spine | timeline | status + attachments right |
| **V2 Dense Ledger** | ledger table | numbers-first | activity ledger |
| **V3 Stepper Process** | process stepper | step-led | New → In review → Waiting → Resolved |
| **V4 Minimal Decision** | minimal | decision-led | the one question + two acts |
| **V5 Action-Led** | hero action band | action-led | prominent primary CTA |

## 2 · Locked content (all variants)

- CR-104 · Logo & brand kit · created by Priya Shah · Awaiting your approval
- Timeline (request opened → brief shared → 3 concepts ready → delivery → delivered & archived)
- Meta (Request ID, Category, Priority, Budget ₹12,500, Owner, Due 6 Nov 2026)
- Attachments (brand-brief.pdf 2.4 MB, concepts-v1.zip 18.1 MB)
- Primary action "Approve direction" + "Request changes" + "Message" (demo-labelled, never triggered)

## 3 · Coverage

- C4/C5/C6/C17/C18: 5/5.
- A-items: none (request-detail is a content domain; the lifecycle states are the structure).

## 4 · API refs (documented, never called)

`GET /api/v1/requests/{request_id}` · `/requests/{request_id}/quotes` · `/media/{id}/url`

## 5 · Winner

**V5 Action-Led.** The hero action band puts the primary CTA (Approve direction) prominent at the top so the one decision that moves CR-104 forward is the first thing seen, with the timeline and meta below.

## 6 · Honest limitations

No live backend — `api_refs` document verified spec paths, never calls. The approve/changes/message actions are demo-labelled toasts, never triggered (destructive/real-state actions in production). Gate T templates for the request-lifecycle were drawn from the timeline/lifecycle research already captured in the shared corpus and F03's Gate T.
