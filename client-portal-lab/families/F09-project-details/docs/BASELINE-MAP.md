# F09 · Project Details + 6 Tabs — Gate S · BASELINE-MAP

The delivery cockpit, reconstructed exactly as captured before any pixel changes. Content below is **frozen** from `14` + `14b–14g` (Arjun Mehta session). Screenshots from other sessions prove anatomy only — they are never merged into this story.

## GATE S (F09)
Screenshots opened: 7/7 · HTML opened: 7/7 · audit-metadata read: YES
Routes mapped: /projects/{id} (+ ?tab=progress|milestones|deliverables|messages|files), 502 error boundary · Content frozen: YES
Gate: PASS

## Sources opened (in order)

1. Family prompt `F09-project-details.md` end-to-end + the two `example-demo-prompt/` discipline parents.
2. Screenshots **7/7**: `015` overview · `020` progress · `019` milestones · `016` deliverables · `018` messages · `017` files · `043` file-preview dialog — every one opened.
3. `nestlancer-client-pages-html/README.md` rows 18–24, all 7 HTML snapshots, `audit-metadata.json` filtered to `/projects/{id}`.
4. Report `.md` full + `.xlsx` 10/10 sheets (`REPORT-STUDY.md`); Swagger projects/progress/media/messaging/notifications (`API-MAP.md`).

## Screenshot ↔ HTML ↔ route map

| HTML | Route / state | Screenshot | Session note |
|---|---|---|---|
| `14-project-details.html` | `/projects/01a10a2b-5eaa-769e-a5d9-0d58fcca6924` — live **502 error boundary**: “Something went wrong / Network Error / Try again”, `h1 = null` | `015` | Arjun Mehta AM, bell 6 |
| `14b-…-overview-tab.html` | Overview (populated) | `015` | Arjun Mehta DOM = **content truth** |
| `14c-…-progress-tab.html` | `?tab=progress` | `020` | Arjun Mehta DOM |
| `14d-…-milestones-tab.html` | `?tab=milestones` | `019` | Arjun Mehta DOM |
| `14e-…-deliverables-tab.html` | `?tab=deliverables` | `016` | Arjun Mehta DOM |
| `14f-…-messages-tab.html` | `?tab=messages` | `018` | Arjun Mehta DOM |
| `14g-…-files-tab.html` | `?tab=files` + preview dialog | `017` + `043` | Arjun Mehta DOM |

**Alternate sessions in screenshots (anatomy only, never merged):** `015/016/017/019/043` show **Priya Nair — “Corporate LMS for 200 Employees”, 40%, ₹20,880.00, 3 milestones incl. a locked “Okta SAML & HR Dashboard”**; `018` shows **Samira Patel — “Festive Season Campaign Landing Pages”**; `020` shows **Karthik Menon — “UPI Switch Integration Layer”**. The prompt §4 is explicit: the report’s ₹20,880 / “Corporate LMS” / locked-third-milestone examples are illustrations — **freeze the captured Arjun Mehta figures instead**. The LMS screenshots do prove two reusable microcopy patterns, quoted (not their numbers): the lock explainer “Complete the current milestone (payment or delivery review) before moving to later milestones.” and dual Delivery/Payment badges.

## Frozen content truth (Arjun Mehta, `14b–14g` — verbatim in every variant)

**Header:** “Khandesh Spice D2C E-Commerce Store” · “Direct-to-consumer storefront for authentic Khandesh spices with subscription boxes, Razorpay checkout, and Delhivery shipping integration.” · “In progress” · “57% complete” · “Delivery milestones 1/2 completed” · “Overall progress 57%” · “Next: Razorpay Checkout & Delhivery Integration” · buttons `Message` · `View milestones`. Project UUID `01a10a2b-5eaa-769e-a5d9-0d58fcca6924`; started 10/5/2026 (F08 `13b`).

**Tabs (6):** Overview · Progress · Milestones · Deliverables · Messages · Files.

**Overview (`14b`):** “Project status / Overall contract status, milestone delivery, and file reviews are tracked separately.” → Project: “In progress / Set by your delivery team for the whole engagement.” · Milestones: “1/2 approved / Delivery milestones (payment schedule excluded) / Current: Razorpay Checkout & Delhivery Integration / Work in progress / View all milestones” · Deliverables: “0/0 approved / View deliverables” · “Daily progress / Team updates / End-of-day work logs and delivery notes from your team. / View progress timeline” · “Latest progress / Recent daily updates from your delivery team. / View all progress / No progress entries yet.” · “Recent updates / Summary from the progress feed. / No recent progress entries.” · “Submit feedback / Share notes with your delivery team. / Your feedback / Submit feedback”. (Report §4.1 row 17 flags Latest/Recent as the same feed twice — variants may de-duplicate the *hierarchy* but keep both labels reachable; they never invent feed entries to fill them.)

**Progress (`14c`):** “Daily progress / End-of-day updates from your delivery team, grouped by date. / No progress entries yet / Your team will post daily updates here as work continues.” + “Request changes / Ask your team to adjust scope or delivery based on recent progress. / Request changes / Send request”.

**Milestones (`14d`):** ① “Storefront MVP & Catalog · ₹30,000.00 · Due Oct 15, 2026 · Delivery: Approved · Payment: Not due yet” ② “Razorpay Checkout & Delhivery Integration · ₹30,000.00 · Due Oct 30, 2026 · Delivery: Work in progress · Payment: Not due yet”. **Gate-S lock verdict (C19):** the Arjun Mehta DOM has only 2 milestones; the gated/locked surface is **Payment: Not due yet** on both (payment is gated behind delivery), and Milestone 2’s completion is gated behind current work. Every “Not due yet” therefore carries “why + what unlocks it” (C19/A3). No third/locked milestone is invented.

**Deliverables (`14e`):** “No deliverables yet / Files and assets from your team will appear here when uploaded.” → 0/0. A4 review controls are therefore shown as a clearly-labelled review pattern exercised on the one captured file (see `DECISIONS.md` F09) — the empty state stays the default truth.

**Messages (`14f`):** “Project messages / Chat with Riya Kapoor about this project. / Mark read” · “Monday, Oct 5” — Riya Kapoor (RK): “Arjun ji — Milestone 1 wireframes uploaded. Checkout shows UPI, cards, and COD under ₹2,000.” (Oct 5 3:46 AM · Reply Pin Flag) · You (Y): “Looks good. For milestone 2, please prioritise Razorpay UPI and COD before wishlist — Navratri orders start mid-September.” (✓ · Reply Pin Edit Delete) · Riya Kapoor: “Noted — checkout and Shiprocket integration are first in the sprint backlog. Hindi product descriptions will follow in parallel.” · composer `Send` · “Search in conversation / Search”. (Frozen as captured — the message says Shiprocket while the project description says Delhivery; both spellings kept, discrepancy not silently “fixed”.)

**Files (`14g`):** `arjun-mehta-e-commerce-platform-milestone-1-wireframes.pdf` · “Media library” · “20.3 KB” · `Preview`. Screenshot `043` proves the live preview bug C13 fixes: a modal with filename + Open/Close over a **blank white box**.

**502 (`14`):** “Something went wrong / Network Error / Try again”. audit: `GET …/api/v1/projects/{id} → ERR_FAILED` + CORS console errors on the detail route. Designed honestly with A13 banner + retry + support.

**Derived-only (labelled as arithmetic):** two milestones × ₹30,000.00. No “Pay now ₹…” exists in the Arjun Mehta capture because payment is Not due yet — variants must **not** add a Pay-now amount. The C2 verdict is built from 57% + the ₹30,000.00 milestones only.
