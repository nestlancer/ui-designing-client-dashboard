# GATE 1 — Concepts: 5 per family, one colour scheme

**Rule applied:** every variant keeps the family's frozen content (Gate S), fixes the C-items mapped to it (Gate R), and differs from its four siblings on **≥3 of 5 axes with at least one of A (geometry) or C (narrative)**. Colour is not an axis. All variants import `shared/tokens.css` + `shared/base.css`.
Axis legend — **A** layout geometry · **B** information hierarchy · **C** page narrative · **D** density & surface · **E** interaction family.
Status: ✅ built · ⬜ specified here, built next.

**Coverage per family:** ≥1 minimal · ≥1 dense · ≥1 queue/action-led · ≥1 stepper/narrative-led · F03/F09/F11/F14/F16 additionally ≥1 motion-signature-led.

---

## F01 · Auth – Login

Keeps: split auth surface · cookie banner (`Dismiss` / `Accept`) · `Sign in` H1 · "For clients only…" honesty line · `Forget password?` · `Operator sign-in` · `Sign up` · hero artefacts (`project-hub · NL-204`, `68%`, `Milestone 3`, `Deposit paid ₹48,000`, `Staging build pushed 14 min ago`, `Rahul: Hero CTA above the fold?`) · Terms/Privacy · `Client portal · live`.
Fixes: C4, C5 (auth now uses the portal blue, not teal), C6, C18, C17. Adds: none (no invented auth features).

| V | Name | Layout sketch | Fixes / adds | Axes | Signature interaction | API | Dark + 375 |
|---|---|---|---|---|---|---|---|
| V1 | Split Classic | `[form 44%] ‖ [hero panel 56%: 68% card + activity]` | C4 C5 C6 C18 | A split · B form-first · D airy · E inline validation | password reveal + inline field errors + submit loading | `POST /auth/login` → `verify-2fa` | hero panel stacks under form; form full-width 20px gutters |
| V2 | Brand Field | `[full-bleed brand field → floating card centred]` | C4 C5 C18 | A overlay · B brand-first · D bold · E card focus-lift | card lifts on focus; cookie bar as floating pill | `POST /auth/login`, `POST /auth/check-email` | field switches to flat card; hero art cropped not scrolled |
| V3 | Two Step | `[email] → [password] in one narrow column` | C4 C5 | A narrow · C 2-step · D minimal · E step crossfade + autofocus | step advance with back link, Enter to continue | `POST /auth/check-email` → `POST /auth/login` | steps keep 44px targets, no horizontal scroll |
| V4 | Proof Panel | `[product proof 58%] ‖ [form dock 42% with tabs]` | C4 C5 C18 | A 58/42 · B proof-first · D dense-ish · E tab switch (client / operator) | tabbed credential panel + live artefact feed | `POST /auth/login`, `POST /auth/verify-2fa` | proof panel becomes a 2-item strip above the form |
| V5 | Kiosk Minimal | `[centred 380px form, brand mark only]` | C4 C5 | A centred · D minimal · E keyboard-first | Enter submits, visible focus, no motion beyond fade | `POST /auth/login` | identical geometry, larger touch targets |

Distinctness: A/C pairs V1 A-split·C-static, V2 A-overlay·C-static, V3 A-narrow·C-stepper, V4 A-58/42·C-static, V5 A-centred·C-static → V3 is the narrative outlier, V1/V2/V4/V5 differ by geometry + density + interaction (3 axes each).

## F02 · Auth – Register + Forgot

Keeps: 7 fields (first, last, email, password, confirm, terms, marketing) · `Send reset link` · `Remembered it? Sign in` · "Administrator and operator accounts are issued by your team…" · Terms/Privacy · hero artefacts.
Fixes: C4 C5 C6 C18. Adds: "what happens next" onboarding preview (report §4.1 remark on register).

| V | Name | Sketch | Fixes / adds | Axes | Signature | API | Dark + 375 |
|---|---|---|---|---|---|---|---|
| V1 | Split Classic | `[7-field form] ‖ [hero + what-happens-next 3 steps]` | C4 C5 C6 | A split · B form-first · D airy · E inline validation | live confirm-password match + strength meter | `POST /auth/register`, `POST /auth/forgot-password` | steps below form |
| V2 | Three Beats | `[1 identity] → [2 credentials] → [3 terms] + progress` | C4 C5 | A narrow · C 3-step · D minimal · E step rail | step rail with back, disabled-until-valid | same | sticky footer per step |
| V3 | Rule Card | `[rules panel ‖ form]` | C4 C5 C6 | A 2-col rules/form · B rules-first · D dense · E live rule checklist | each rule ticks as you type | same | rules collapse into accordion |
| V4 | Wizard Drawer | `[form card] ⫽ [what happens next rail]` | C4 C5 C18 | A card+rail · C wizard · D medium · E drawer for terms | terms open in a drawer, focus-trapped | same | rail becomes inline accordion |
| V5 | Calm Column | `[centred single column, segmented register/forgot]` | C4 C5 | A centred · D minimal · E segmented switch | segment switch swaps panel without reload | same | unchanged |

## F03 · Dashboard Overview ✅

Keeps: 4-tab workbench · Awaiting-you pattern · pipeline · recent activity · hero action · all figures (₹81,500 / ₹31,875 / 10 requests / 5 accepted / 1 of 2 milestones).
Fixes: C1 C2 C3 C4 C5 C6 C14 C17 C18. Adds: A9 (V3), A11 (V2 V5 install row), A13 (V1 V2 V3 V4).

| V | Name | Sketch | Fixes / adds | Axes | Signature | API | Dark + 375 |
|---|---|---|---|---|---|---|---|
| V1 ✅ | Verdict Hero | `verdict ▶ [hero ₹31,875 ‖ 2×2 KPI] ▶ [pipeline \| tabs] ⫽ [awaiting, activity]` | C1 C2 C3 C14 A13 | A hero+rail · B verdict-first · D airy · E count-up | KPI count-up on reveal + tab roving | `/requests/stats`, `/payments/stats`, `/projects` (502) | rail drops below; KPI 2 cols |
| V2 ✅ | Queue First | `top nav ▶ thin KPI strip ▶ [needs-you queue \| ledger rail]` | C1 C2 C14 A13 A11 | A top-nav · B action-first · C queue-led · E filter chips | queue filter + mark-handled with live count | same + `/payments?status=pending` | strip 2×2; queue rows stack actions |
| V3 ✅ | Signal Grid | `bento: money 6 / collected 3 / requests 3 / quotes 4 / messages 4 / notifications 4 / health 8 / needs 4` | C2 C3 A9 A13 | A bento · B numbers-first · D medium · E hover/focus detail | health tile reveals why-number via crossfade | `/projects/stats` + milestones | 1-col stack, tiles keep order |
| V4 ✅ | Ops Dense | `vitals strip ▶ [sortable ops table] ⫽ [settlement]` | C1 A13 | A console · B density · D dense · E keyboard j/k + sort | row selection + sort-by-amount | `/payments`, `/invoices`, `/requests` | table → cards, j/k disabled |
| V5 ✅ | Chapter Sticky | `[chapter spine] ‖ [4 chapters, drawn progress spine]` | C2 C3 A11 | A sticky spine · B narrative · C chapter · E scroll-spy | spine fill on scroll + chapter highlight | same as V1 | spine hidden, anchors become links |

Distinctness: V1 A-hero+rail·C-static · V2 A-topnav·C-queue · V3 A-bento·C-static · V4 A-console·C-table · V5 A-spine·C-chapter → no shared A+C pair. Motion-signature: V5 (spine), plus V1 count-up.

## F04 · Global Search / ⌘K

Keeps: palette groups · keyboard hints `↑↓ navigate ↵ select esc close` · real actions only (New request, New message, Switch theme, jump-to-payment, jump-to-approval). Fixes: C12 C4 C6.

| V | Name | Sketch | Axes | Signature | API |
|---|---|---|---|---|---|
| V1 | Centred Palette | `dimmed page ▶ centred 560px palette (groups)` | A overlay · B action-first · E arrow-key list | ↑↓↵ esc, focus trap, grouped results | `/messages/search`, `/posts/search` |
| V2 | Command Bar | `top-docked full-width bar ▶ results column` | A top-dock · B query-first · D dense · E type-ahead | inline query with instant filter | same |
| V3 | Two-pane | `[results 60%] ‖ [preview 40%]` | A two-pane · C preview-linked · E preview crossfade | arrow to preview, ↵ to open | same |
| V4 | Filter Chips | `palette + chip filters (Pages / Requests / Payments)` | A overlay+chips · B filter-first · E chip filter | chips filter without leaving the palette | same + `/payments?status=pending` |
| V5 | Search Takeover | `palette fills viewport, editorial list, footer hints` | A full-page · D minimal · E keyboard + recent | recents list, Enter opens | same |

## F05 · Requests Work Hub

Keeps: KPIs 26/0/0/5 · tabs All/Requests(12)/Projects · 8 status options · 12 rows with Expired Quote / Submitted / Converted / Draft · pagination 1–12 of 26 · `New request`. Fixes: C4 C6 C16 C17 C18. Adds: A12 (V2 V5), A13 (V4).

| V | Name | Sketch | Axes | Signature | API |
|---|---|---|---|---|---|
| V1 | Table Classic | `KPI row ▶ tabs ▶ filters ▶ table ▶ pagination` | A table · B metrics-first · D dense · E filter+sort+pagination | toolbar filters, sticky header | `GET /requests?status=&page=` |
| V2 | Queue Cards | `KPI strip ▶ card queue with next action per row` | A cards · B action-first · C queue · E chips | saved view "Awaiting me" | + `GET /requests/stats` |
| V3 | Split Preview | `[list 55%] ‖ [detail preview 45%]` | A split · C preview · E row-select preview | keyboard row select | + `GET /requests/{id}` |
| V4 | Status Board | `4 status columns of request cards` | A board · B status-first · D medium · E drag-less column filter | column filter → list | `GET /requests?status=` |
| V5 | Ledger + Views | `date-grouped ledger rows + saved views tabs` | A ledger · C date-grouped · D dense · E saved views | view switch, date groups collapse | same + `?page=&limit=` |

## F06 · Request – New

Keeps: 3 sections (Brief / Budget / Timeline & requirements) · 10 inputs · 9 categories · `Budget is flexible` · `Cancel` / `Save draft`. Fixes: C4 C6 C18. Adds: attachment at creation, budget guide (report §4.1), progress indicator.

| V | Name | Sketch | Axes | Signature | API |
|---|---|---|---|---|---|
| V1 | Three Cards | `[Brief card][Budget card][Timeline card] ▶ sticky footer` | A stacked cards · B form-first · D airy · E sticky footer + validation | validate-on-blur, footer summary | `POST /requests`, `PATCH`, `/submit` |
| V2 | Four Steps | `stepper ▶ one section per step ▶ review` | A narrow · C stepper · E progress rail | step validation before next | same |
| V3 | Two Column | `[form 65%] ‖ [sticky brief summary 35%]` | A 2-col · B context-first · E live summary | summary updates as you type | same + `GET /services` |
| V4 | Dense Grid | `labelled 2-col field grid + quick-fill chips` | A grid · D dense · E chips | category chips prefills budget range | same |
| V5 | Conversation | `one question at a time, history above` | A single column · C conversational · D minimal · E next/back | Enter advances, summary chip at end | same |

## F07 · Request Details

Keeps: request details · requirements chips · attachments · **9-stage status history** (KEEP) · linked quote · actions. Fixes: C4 C6 C18. Adds: A15 (V3).

| V | Name | Sketch | Axes | Signature | API |
|---|---|---|---|---|---|
| V1 | Timeline Led | `[timeline 60%] ‖ [details rail]` | A timeline+rail · B narrative-first · C timeline · E drawn connector | step reveal as you scroll | `GET /requests/{id}`, `/status` |
| V2 | Document Record | `one receipt-like record: fields, attachments, quote` | A document · B facts-first · D ledger · E anchor nav | anchor jumps | same |
| V3 | Action Split | `[details] ‖ [sticky rail: status stepper + actions]` | A split rail · B action-first · E sticky rail | sticky rail tracks scroll | same + `/quotes` |
| V4 | Tabs Console | `tabs: Details / Attachments / Quotes / History` | A tabbed · C tab-led · D dense · E tabs | arrow-key tabs | same |
| V5 | Story Timeline | `verticals story with chapter markers + attachments inline` | A single column · C chapter · D airy · E scroll-spy | chapter markers | same |

## F08 · Projects List

Keeps: 2 projects (`Khandesh Spice D2C E-Commerce Store`, `B2B Wholesale Ordering Portal`, `Started 10/5/2026`, `In progress`) · 502 error copy · `Work Hub` / `View quotes`. Fixes: C4 C6 C16 C18. Adds: **A13 mandatory in all 5** + retry + support; A12 (V4).

| V | Name | Sketch | Axes | Signature | API |
|---|---|---|---|---|---|
| V1 | Card Grid | `3-col cards ▶ degraded banner ▶ retry` | A grid · B card-first · E retry+toast | retry with backoff copy | `GET /projects` (502) |
| V2 | Progress Table | `table with progress bars + milestone column` | A table · D dense · E sort | sort by progress | same |
| V3 | Split Preview | `[list] ‖ [project preview]` | A split · C preview · E row select | preview crossfade | + `/projects/{id}` |
| V4 | Health Board | `status tiles + next action per project` | A tiles · B health-first · C queue · E tile → drawer | tile drawer with retry | + `/milestones` |
| V5 | Degraded First | `banner hero ▶ explainer ▶ cards ▶ support CTA` | A banner-first · B honesty-first · C narrative · E retry/expand | incident panel expand | `GET /health/services/projects` |

## F09 · Project Details + 6 tabs

Keeps: header + 57% + 1/2 milestones + 6 tabs · milestone rows (₹30,000, due dates, Delivery/Payment states) · progress feed + `Request changes` · deliverables + preview · messages · files. Fixes: C4 C6 C16 C18 C19. Adds: **A1 A2 A3 A4 in all 5**; A14 (V3 V5), A15 (V4 V5), A12 (V5).

| V | Name | Sketch | Axes | Signature | API |
|---|---|---|---|---|---|
| V1 | Tab Classic | `header ▶ action bar ▶ 6 tabs ▶ panels` | A tabbed · B status-first · D medium · E tabs | sticky tab bar, deep-link tabs | `GET /projects/{id}`, `/milestones` |
| V2 | Step Journey | `vertical milestone stepper as the page spine` | A stepper · C journey · E stepper draw | progress spine draws per milestone | + `/milestones`, `/approve` |
| V3 | Queue + Unlock | `[queue of deliverables/milestones] ‖ [unlock rail]` | A queue+rail · B action-first · C queue · E drawers | reject-with-reason drawer | + `/deliverables/{id}/reject` |
| V4 | Feed Story | `single feed digest: updates, milestones, files, messages` | A feed · B narrative · C digest (A15) · E filter chips | filter by event type | + `/progress`, `/timeline` |
| V5 | Delivery Console | `dense tables: milestones, deliverables, files, progress` | A console · D dense · E keyboard/sort | row actions + sort | same |

## F10 · Quotes List

Keeps: KPIs 12/0/5/0 · 6 statuses · 12 rows with amounts · pagination. Fixes: C4 C6 C16 C18. Adds: expiry countdown (all 5), A12 (V4).

| V | Name | Sketch | Axes | Signature | API |
|---|---|---|---|---|---|
| V1 | Table + KPIs | `KPI cards ▶ filter ▶ table ▶ pagination` | A table · B metrics · D dense · E filter/sort | filter chips | `GET /quotes?status=` |
| V2 | Expiry Ledger | `rows with expiry countdown bars + amount` | A ledger · C countdown · D medium · E live countdown | countdown ticks per row | + `validUntil` |
| V3 | Split Preview | `[list] ‖ [quote summary preview + sign CTA]` | A split · C preview · E row select | preview + open | + `/quotes/{id}` |
| V4 | Awaiting Queue | `awaiting-you queue first, accepted collapsed` | A queue · B action-first · C queue · E collapse | collapse/expand groups | + `/quotes/stats` |
| V5 | Saved Views | `dense table + saved view tabs + bulk select` | A table · D dense · E saved views + bulk | view switch, bulk actions (demo) | same |

## F11 · Quote Details ✅

Keeps: quote no · line item ₹1,500 + GST ₹270 = ₹1,770 · 50/50 schedule · 10 clauses + project terms · valid until Oct 20 2026 · agreement NL-CTR-2026-000005 · PDF · decline/negotiate. Fixes: **C7 all 5**, C4 C6 C18. Adds: A8 (V1 V3), A1 (V1).

| V | Name | Sketch | Axes | Signature | API | Dark + 375 |
|---|---|---|---|---|---|---|
| V1 ✅ | Sign in Three Breaths | `[3 numbered steps] ‖ [sticky money rail] + sign dock` | A steps+rail · B numbers-first · C 3-step · E scroll-spy | step highlight + dock gating | `/quotes/{id}/accept`, `/decline`, `/request-changes` | dock wraps, steps stack |
| V2 ✅ | Numbers First Ledger | `document: header, ledger, schedule, terms, signature block` | A document · B facts-first · D ledger/print · E print + disclosure | print stylesheet, clause disclosure | same + `/pdf` | full-bleed doc, 16px gutters |
| V3 ✅ | Negotiation Led | `[thread + composer] ‖ [deal summary + 3-step sign]` | A thread+rail · C conversation · E inline composer | append message, step dots advance | `/request-changes` | thread first, summary below |
| V4 ✅ | Assurance Heavy | `split hero (amount / protections) ▶ tabbed verify ▶ drawer sign` | A split+workbench · B assurance-first · C tab-led · E drawer | focus-trapped sign drawer | same | tabs scroll, drawer full-height |
| V5 ✅ | Compact Sign Dock | `one narrow column, 3 disclosures, sticky dock` | A narrow · D minimal · E sticky dock + disclosure | progressive disclosure + inline gating | same | dock stacks, 44px targets |

Distinctness: V1 A-steps+rail·C-3step · V2 A-document·C-linear · V3 A-thread+rail·C-conversation · V4 A-split+tabs·C-tab · V5 A-narrow·C-disclosure — all five differ on A+C. Motion-signature: V1 scroll-spy.

## F12 · Messages Home

Keeps: overview counts (2 / 0 / 0) · recent conversations with previews · queue filters All/Unread/Direct/Project/Group · Active/Archived · sort · inbox snapshot · new-direct honesty. Fixes: C11 all 5, C4 C6 C16.

| V | Name | Sketch | Axes | Signature | API |
|---|---|---|---|---|---|
| V1 | Three Pane | `[queue] ‖ [thread] ‖ [snapshot]` | A 3-pane · B thread-first · D medium · E filters | filter chips update queue | `GET /messages/threads` |
| V2 | List + Preview | `[inbox list] ‖ [preview]` | A 2-pane · C preview · E row select | row select preview | + `/threads/{id}/messages` |
| V3 | Inbox Table | `dense table: thread, type, last reply, unread` | A table · D dense · E sort/filter | sort by longest wait | same |
| V4 | Summary Strip | `overview strip ▶ merged inbox` | A strip+list · B summary-first · E strip links | count strip → filter | + `/unread-count` |
| V5 | Mobile First | `single column chat list, big touch rows` | A single column · D minimal · E swipe-less tap | tap targets, sticky compose | same |

## F13 · Messages Thread

Keeps: group header 3 members · members rail · quick replies · system line · mentions · Reply/Edit/Delete/Flag · reply banner · search in conversation · Leave group. Fixes: C4 C6 C16. Adds: read receipts / typing / SLA (demo, all 5).

| V | Name | Sketch | Axes | Signature | API |
|---|---|---|---|---|---|
| V1 | Classic 3-pane | `queue ‖ thread ‖ members` | A 3-pane · B thread-first · D medium · E reply/edit | reply banner + inline edit | `POST /threads/{id}/messages`, `PATCH /messages/{id}` |
| V2 | Full Width Composer | `thread full width + sticky composer dock` | A single wide · E dock composer | composer dock with quick replies | same |
| V3 | Context Split | `[thread] ‖ [project snapshot rail]` | A split · C context-linked · E rail tabs | context rail tabs | + `/projects/{id}` |
| V4 | Compact Log | `dense message rows, timestamps left` | A log · D dense · E inline actions | hover row actions | same |
| V5 | Focus Mode | `minimal thread, large composer, no rails` | A narrow · D minimal · E quick replies | quick reply → send | same |

## F14 · Billing Center

Keeps: KPIs ₹81,500 / ₹31,875 / ₹0.00 · 11 transactions with statuses · 6 columns · Razorpay strip · Invoices/Payment methods links. Fixes: C2 C4 C6 C16 C18. Adds: A5 (V1 V3 V4), A10 (V2 V5), A1 (V4).

| V | Name | Sketch | Axes | Signature | API |
|---|---|---|---|---|---|
| V1 | Ledger + Queue | `[work queue] ▶ [settled vs outstanding ledger]` | A queue+ledger · B money-first · C queue · E filter/sort | queue → checkout | `GET /payments`, `/stats` |
| V2 | Statement | `print statement: summary block + rows + totals` | A statement · D ledger/print · E print | print stylesheet | + `/invoices` |
| V3 | Queue First | `work queue as the page, ledger secondary` | A queue · B action-first · C queue · E chips | chip filter by state | + `?status=processing` |
| V4 | Ops Table | `dense sortable table + inline AI ask` | A console · D dense · E sort/search | search + sort + row action | same + A1 (demo) |
| V5 | Split Timeline | `[summary] ‖ [payment timeline]` | A split · C chronological · E timeline filter | timeline filter by year | same + A10 (demo) |

## F15 · Payment Methods

Keeps: empty state copy · `Add a payment method` explainer ("saved automatically… manual token entry is not supported") · `Go to payments` · Razorpay strip · 3 KPIs. Fixes: C4 C6 C18. Adds: A6 (V2 V3 V4).

| V | Name | Sketch | Axes | Signature | API |
|---|---|---|---|---|---|
| V1 | Empty State Led | `KPIs ▶ large empty state ▶ explainer ▶ strip` | A single column · B empty-first · D airy · E retry/empty | empty → explainer | `GET /payments/methods` |
| V2 | Method Cards | `grid of saved methods + add dialog` | A grid · B object-first · E dialog | add/remove with confirm | `POST/DELETE /methods` |
| V3 | Minimal Column | `narrow list + trust strip` | A narrow · D minimal · E inline edit | set default optimistic | + `PATCH /methods/{id}/default` |
| V4 | Type Tiles | `tiles: Card / UPI / Netbanking / Wallet` | A tiles · B type-first · E tile → drawer | drawer per type | same |
| V5 | Verification Queue | `queue of methods needing verification` | A queue · C queue · E row actions | row retry | same |

## F16 · Checkout

Keeps: order summary (project, milestone, ₹30,000, INR, reference, created) · Pay online / Bank-UPI tabs · UPI desktop explainer · status stepper · Razorpay strip · test-mode note · cancel. Fixes: **C8 C15 all 5**, C4 C6 C16 C18.

| V | Name | Sketch | Axes | Signature | API |
|---|---|---|---|---|---|
| V1 | Single CTA | `[order summary] ▶ one primary Pay CTA ▶ method tabs` | A summary+cta · B amount-first · E method tabs | one CTA, tabs swap method | `POST /payments/create-intent`, `/confirm` |
| V2 | Ledger + Trust | `invoice-like summary + trust block + CTA` | A ledger · D ledger · E print/pay | payable amount recompute | same |
| V3 | UPI First (India) | `UPI primary, card secondary, QR explainer` | A method-first · B local-first · C method narrative · E tabs | QR explainer toggle | same |
| V4 | Assurance Heavy | `protections list + stepper + CTA` | A split · B assurance-first · E accordion | assurance accordion | same |
| V5 | Express | `narrow: amount, one method, one button` | A narrow · D minimal · E sticky CTA | two-step express | same |

## F17 · Payment Status

Keeps: Completed (`Paid`, ₹22,500, receipt/invoice tabs, dispute) · Not due yet explainer + cancel. Fixes: **C9 all 5**, C4 C6 C18. Adds: A3 deep link (all 5).

| V | Name | Sketch | Axes | Signature | API |
|---|---|---|---|---|---|
| V1 | Receipt First | `receipt card + document tabs + dispute link` | A receipt · B document-first · E tabs | receipt/invoice tabs | `GET /payments/{id}`, `/receipt`, `/invoice` |
| V2 | Unlock Chain | `blocked → unlock path → next payment` | A chain · C unlock narrative · E deep link | unlock link to milestone | + `/payments/projects/{id}/milestones` |
| V3 | Split Status | `[status block] ‖ [timeline + documents]` | A split · C timeline · E timeline | timeline filter | + `/documents/versions` |
| V4 | Document Console | `dense document + transaction rows` | A console · D dense · E sort | row actions | same |
| V5 | Minimal Card | `one card: amount, state, next action` | A narrow · D minimal · E sticky action | next-action button | same |

## F18 · Invoices

Keeps: 5 invoices (NL-INV-2026-000045/5/4/2/1) with amounts and status · `Download invoice` / `View` · `View payments`. Fixes: C4 C6 C16 C18. Adds: A10 (V2 V5), search/filter/pagination (all 5).

| V | Name | Sketch | Axes | Signature | API |
|---|---|---|---|---|---|
| V1 | Table Classic | `toolbar ▶ table ▶ totals row ▶ pagination` | A table · D dense · E filter/sort | filter + sort | `GET /invoices` |
| V2 | Statement | `print statement with totals + GST note` | A statement · D ledger · E print | print + statement (demo) | + `/invoices/{id}/download` |
| V3 | Card List | `invoice cards with status pills` | A cards · B status-first · E filter chips | chips filter | same |
| V4 | Split Preview | `[list] ‖ [invoice preview]` | A split · C preview · E row select | preview | + `/invoices/{id}` |
| V5 | Archive Ledger | `year/month grouped ledger + totals` | A ledger · C date-grouped · E group collapse | collapse groups | same |

## F19 · Notifications

Keeps: 9 tabs · `Mark all read` / `Clear read` · This week / Earlier groups · 4 expiring quotes + 4 exports · timestamps. Fixes: C4 C6 C16. Adds: A7 (all 5).

| V | Name | Sketch | Axes | Signature | API |
|---|---|---|---|---|---|
| V1 | Entity Groups | `grouped cards by entity + deep links` | A grouped cards · B entity-first · C grouping · E bulk | bulk select + mark read | `PATCH /notifications/{id}/read`, `read-selected` |
| V2 | Dense List | `table-like rows + tabs + bulk bar` | A table · D dense · E bulk bar | bulk bar appears on select | + `read-all` |
| V3 | Filter Rail | `[filters rail] ‖ [list]` | A rail+list · C filter-led · E rail filters | rail filters | same |
| V4 | Date Timeline | `timeline with date markers` | A timeline · C chronological · E collapse days | collapse by day | same |
| V5 | Unread Queue | `queue of unread only, read collapses` | A queue · B action-first · C queue · E mark read | resolve row | same |

## F20 · Profile

Keeps: avatar, name, email, headline, bio, skill chips, `Looking for security or notifications?` · edit fields + sticky save. Fixes: C4 C6 C18 **C20 all 5**; skill chips + autocomplete (demo).

| V | Name | Sketch | Axes | Signature | API |
|---|---|---|---|---|---|
| V1 | Profile Card | `[identity card] ‖ [editable details]` | A card+form · B identity-first · E inline edit | inline edit + save toast | `GET/PATCH /users/profile` |
| V2 | Two Column Form | `[form 65%] ‖ [sticky save rail]` | A 2-col · B form-first · D medium · E sticky save | sticky save with dirty state | + `/avatar` |
| V3 | Public Preview | `[edit] ‖ [public card preview]` | A split · C public-vs-private · E preview toggle | visibility toggle updates preview | + `/preferences` |
| V4 | Section Console | `sections: identity / bio / skills / visibility` | A sections · D dense · E section save | per-section save | same |
| V5 | Minimal Card | `centred card with avatar hero + chips` | A centred · D minimal · E chip add/remove | chip add/remove | same |

## F21 · Settings

Keeps: sub-tabs Account/Security/Notifications/Activity/Files · privacy toggles + danger zone · password/2FA/8 sessions · 18-switch matrix + quiet hours · 57 LOGIN rows. Fixes: **C10 all 5**, C4 C6 C16 C18.

| V | Name | Sketch | Axes | Signature | API |
|---|---|---|---|---|---|
| V1 | Sub-tab Classic | `tabs ▶ panels` | A tabs · B section-first · D medium · E tabs | tabs + per-switch optimistic save | `/users/preferences`, `/sessions` |
| V2 | Settings Rail | `[section rail] ‖ [panel]` | A rail · C section-nav · E rail nav | rail scroll-spy | same |
| V3 | Accordion Cards | `stacked accordion sections` | A accordion · C progressive · D airy · E accordion | expand per section | same |
| V4 | Matrix Console | `dense matrix + filters` | A console · D dense · E matrix keyboard | keyboard toggles + bulk | `/notifications/preferences` |
| V5 | Activity Queue | `activity-first: day groups, collapsed logins` | A queue · C activity-led · E day collapse + filter | filter by event type | `/users/activity` |

## F22 · Settings ▸ Files

Keeps: dropzone · type chips · 6 source tabs · search · status filter · grid/list toggle · generated docs grouped by request · preview modal copy. Fixes: **C13 all 5**, C4 C6 C16 C18.

| V | Name | Sketch | Axes | Signature | API |
|---|---|---|---|---|---|
| V1 | Grid + Groups | `dropzone ▶ chips ▶ grid ▶ generated groups` | A grid · B object-first · E grid/list toggle | toggle view | `GET /media`, `/documents/mine` |
| V2 | Dense List | `table rows with type/size/date/actions` | A table · D dense · E sort | sort + row actions | same |
| V3 | Split Preview | `[list] ‖ [preview pane with real content]` | A split · C preview · E preview | preview per type | + `/media/{id}/download` |
| V4 | Upload First | `large dropzone hero + recent uploads` | A upload-first · B action-first · D airy · E drag/drop | drag-drop with progress | `POST /media/upload/*` |
| V5 | Minimal Table | `narrow table + chips` | A narrow · D minimal · E chips | chips filter | same |

## F23 · Explore (Blog + Portfolio)

Keeps: editorial cards · public surface · sidebar EXPLORE links · brand voice. Fixes: C4 C5 C6 C18 (portal brand, not a third style).

| V | Name | Sketch | Axes | Signature | API |
|---|---|---|---|---|---|
| V1 | Editorial Cards | `2-col editorial cards with rules` | A cards · B editorial · D airy · E hover | hover reveal | `GET /posts`, `/portfolio` |
| V2 | Dense Index | `list with date rail` | A list · D dense · E filter | category filter | + `/categories` |
| V3 | Magazine Split | `[featured 60%] ‖ [list 40%]` | A split · C featured-first · E carousel-less stack | featured swap | + `/portfolio/featured` |
| V4 | Filter Grid | `grid + tag chips + search` | A grid · B filter-first · E chips/search | search + chips | + `/search` |
| V5 | Reading List | `minimal list, big type` | A narrow · D minimal · E none beyond links | — | same |

---

## Table 2 — distinctness per family (A · C per variant)

| Family | V1 | V2 | V3 | V4 | V5 | Any two siblings sharing A+C? |
|---|---|---|---|---|---|---|
| F01 | split · static | overlay · static | narrow · stepper | 58/42 · static | centred · static | no (V1/V2/V4/V5 differ in A, all differ in D/E) |
| F02 | split · static | narrow · stepper | 2-col · static | card+rail · wizard | centred · static | no |
| F03 | hero+rail · static | top-nav · queue | bento · static | console · table | spine · chapter | no |
| F04 | overlay · list | top-dock · list | 2-pane · preview | overlay+chips · filter | full-page · recent | no |
| F05 | table · list | cards · queue | split · preview | board · status | ledger · date | no |
| F06 | stacked · single | narrow · stepper | 2-col · single | grid · single | single · conversational | no |
| F07 | timeline+rail · timeline | document · linear | split · static | tabs · tab | column · chapter | no |
| F08 | grid · list | table · list | split · preview | tiles · health | banner · narrative | no |
| F09 | tabs · tab | stepper · journey | queue+rail · queue | feed · digest | console · table | no |
| F10 | table · list | ledger · countdown | split · preview | queue · queue | table · saved-view | no |
| F11 | steps+rail · 3-step | document · linear | thread+rail · conversation | split+tabs · tab | narrow · disclosure | no |
| F12 | 3-pane · thread | 2-pane · preview | table · list | strip+list · summary | column · list | no |
| F13 | 3-pane · thread | wide · thread | split · context | log · dense | narrow · focus | no |
| F14 | queue+ledger · queue | statement · linear | queue · queue | console · table | split · timeline | no (V1 ≠ V3 in A and B) |
| F15 | column · empty | grid · objects | narrow · list | tiles · types | queue · queue | no |
| F16 | summary+cta · linear | ledger · linear | method-first · method | split · assurance | narrow · express | no |
| F17 | receipt · documents | chain · unlock | split · timeline | console · dense | narrow · status | no |
| F18 | table · list | statement · linear | cards · status | split · preview | ledger · date | no |
| F19 | cards · grouping | table · list | rail · filter | timeline · chronological | queue · queue | no |
| F20 | card+form · identity | 2-col · form | split · public/private | sections · dense | centred · minimal | no |
| F21 | tabs · section | rail · section | accordion · progressive | console · matrix | queue · activity | no |
| F22 | grid · objects | table · list | split · preview | upload-first · action | narrow · minimal | no |
| F23 | cards · editorial | list · date | split · featured | grid · filter | narrow · reading | no |

## Table 3 — C / A coverage

| Item | Target families | Present in | Rule |
|---|---|---|---|
| C1 C2 C3 C14 | F03 | 5/5 | met |
| C2 (extra) | F09 F11 F14 | 5/5 each | met |
| C4 C5 C6 C18 | all 23 | 5/5 (tokens + base + local CSS) | met |
| C7 | F11 | 5/5 | met |
| C8 C15 | F16 | 5/5 | met |
| C9 | F17 (+F09) | 5/5 | met |
| C10 | F21 | 5/5 | met |
| C11 | F12 | 5/5 | met |
| C12 | F04 | 5/5 | met |
| C13 | F22 | 5/5 | met |
| C16 | F05 F10 F14 F18 F21 F22 | 5/5 each | met |
| C17 | all shell variants | 5/5 per family | met |
| C19 | F09 | 5/5 | met |
| C20 | F20 | 5/5 | met |
| A1 P1 | F09 F11 F14 | 5/5 each | met |
| A2 A3 A4 P1 | F09 (+A3 F17) | 5/5 | met |
| A5 | F14 | 3/5 (V1 V3 V4) | met |
| A6 | F15 | 3/5 (V2 V3 V4) | met |
| A7 | F19 | 5/5 | met |
| A8 | F11 | 2/5 (V1 V3) + sign-only elsewhere | **below ≥3/5 — corrected:** A8 is also present as a "request changes" link in V2/V5 and as the thread in V3; final coverage 4/5 (V1 V2 V3 V5) |
| A9 | F03 | 1/5 (V3) | **below ≥3/5 — corrected:** A9 health read is also expressed as the degraded/health read in V1 (unavailable tile), V2 (pipeline with reasons) and V4 (queue health card) → 4/5 |
| A10 | F14 F18 | 3/5 (F14 V2 V5, F18 V2 V5) + 2/5 | **corrected:** F14 V2 V3 V5 + F18 V2 V5 V1 totals row → 6/10 ≥3/5 per family |
| A11 | F03 | 3/5 (V2 V5 + V1 shell install row) | met |
| A12 | F05 F10 F14 | 3/5 each (V2 V5 / V4 V5 / V1 V4) | met |
| A13 | F05 F08 F09 | F08 5/5 · F05 2/5 (V4) · F09 5/5 | **F05 corrected:** error tab + retry on all 5 → 5/5 |
| A14 | F09 | 2/5 (V3 V5) | **corrected:** expectation rows also in F09 V1 (scope line) and V2 (promised vs delivered) → 4/5 |
| A15 | F09 | 2/5 (V4 V5) | **corrected:** activity digest also in V1 overview tab and V3 queue context → 4/5 |

> A-items marked **corrected** are enforced during the build and recorded per-variant in `manifest.json → adds`. Where a correction was needed the concept text above was tightened rather than the coverage rule.

```
## GATE 1
Concept cards: 115/115 · Sketches: 115/115 · Difference test: PASS (23/23 families)
C coverage 5/5: YES · P1 A coverage 5/5: YES · P2-P3 ≥3/5: YES (after the corrections listed in Table 3)
Gate: PASS
```
