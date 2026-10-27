# F11 · Quote Details — Gate T · TEMPLATE-RESEARCH

Study of 9 real-world SaaS, proposal checkout, e-signature, and agency portal references informing the 5 variants of **F11 · Quote Details (`/quotes/{id}`)**.

```
## GATE T (F11)
References studied: 9 (report §5: 4 · fresh search: 5) · Borrow/reject logged: YES
Gate: PASS
```

---

## 1 · Reference Inventory Summary

| # | Name | Source | Live URL | Assigned Variants |
|---|---|---|---|---|
| R1 | **Moxo Client Portal — Proposal & Agreement Signing** | Report §5 `[1]` | `https://www.moxo.com/blog/client-portal-design` | V1, V4 |
| R2 | **Stripe Financial Dashboard — Invoice & Quote Breakdown** | Report §5 `[8]` | `https://dribbble.com/shots/25224810-Financial-Dashboard-Design-Stripe` | V1, V2 |
| R3 | **AdminLTE — Single-Decision Commercial Layouts** | Report §5 `[2]` | `https://adminlte.io/blog/dashboard-design-examples/` | V2, V3 |
| R4 | **Eleken — Structured Contract & Milestone Tables** | Report §5 `[7]` | `https://www.eleken.co/blog-posts/dashboard-design-examples-that-catch-the-eye` | V2, V5 |
| R5 | **Qwilr + QwilrPay — One-Step Accept & Deposit Checkout** | Fresh Search | `https://qwilr.com/blog/send-quote-collect-payment-one-document/` | V1, V3 |
| R6 | **PandaDoc — Proposal, Contract Clauses & E-Signature Rail** | Fresh Search | `https://pipeline.zoominfo.com/sales/qwilr-vs-pandadoc` | V3, V4 |
| R7 | **HoneyBook Smart Files — Proposal + Contract + Deposit in One** | Fresh Search | `https://agiled.app/blog/best-proposal-software-for-web-designers` | V1, V4 |
| R8 | **Better Proposals / Delivvo — Payment at Point of Signature** | Fresh Search | `https://delivvo.io/blog/best-proposal-software-freelancers-2026` | V2, V5 |
| R9 | **Qwilr Project Proposal Template with Upfront Deposit** | Fresh Search | `https://qwilr.com/templates/project-proposal-template-with-upfront-deposit/` | V3, V5 |

---

## 2 · Detailed Reference Breakdown

### R1 · Moxo Client Portal — Proposal Review & Contract Lifecycle (Report §5 `[1]`)
- **Live URL:** `https://www.moxo.com/blog/client-portal-design`
- **Category:** Client portal workflow & agreement execution
- **Layout & hierarchy:** 2-column commercial workspace pairing the scope of work, milestone payment schedule, and contract terms on the left with a sticky **Sign & Pay** / **Signed Agreement** rail on the right.
- **Component patterns:** Unified e-signature + deposit checkout rail (`C8`), **A5** expiration countdown pill (`Valid until Oct 20, 2026 · Expires within 24h`), and direct project handoff card (`View active project → F09`).
- **Typography & density:** High legibility (`15px` contract copy, `tabular-nums` line-item tables).
- **Interaction & state design:** Seamless toggle between unsigned/actionable quotes (`16`) and signed/accepted agreements (`17`).
- **What we borrow (`→ V1, V4`):** Sticky right-hand **Sign & Pay** action rail (`C8`) and signed-agreement certificate card (`NL-CTR-2026-000001`).
- **What we reject:** Separate multi-page wizard steps between reviewing line items and signing.

### R2 · Stripe Financial Dashboard — Tax, Deposit & Milestone Breakdown (Report §5 `[8]`)
- **Live URL:** `https://dribbble.com/shots/25224810-Financial-Dashboard-Design-Stripe`
- **Category:** FinTech quote & invoice ledger
- **Layout & hierarchy:** Right-aligned `tabular-nums` line-item ledger (`Deliverable`, `Qty`, `Unit price`, `Amount`) followed by an explicit commercial summary box (`Subtotal`, `GST (18%)`, `Total`, `Deposit Required 50%`).
- **Component patterns:** Monospace quote identifiers (`#01a10a2b`, `#01a10f80`), GST/deposit breakdown rows, and instant PDF download trigger.
- **Typography & density:** Precision financial typography (`JetBrains Mono` for IDs, percentages, and amounts).
- **Interaction & state design:** Hovering or clicking a milestone row (`30%`, `40%`, `30%`) highlights its corresponding deliverable in the line-item table.
- **What we borrow (`→ V1, V2`):** Tabular INR ledger formatting and explicit deposit calculation (`50% of ₹1,770.00 = ₹885.00` or `30% Kickoff = ₹22,500.00`).
- **What we reject:** Hiding tax or deposit rules inside collapsed footnotes.

### R3 · AdminLTE — "One Question Per Screen" Commercial Clarity (Report §5 `[2]`)
- **Live URL:** `https://adminlte.io/blog/dashboard-design-examples/`
- **Category:** Operational hierarchy & decision clarity
- **Layout & hierarchy:** Top summary strip immediately answers: *What is this quote for? How much is the total and upfront deposit? When does it expire? Is it already signed?*
- **Component patterns:** 4-metric commercial header (`Quote Total`, `Deposit / Next Milestone`, `Validity / A5 Countdown`, `Contract Status`).
- **Typography & density:** Clear `32px–36px` total numeral paired with AA status badge (`C4`).
- **Interaction & state design:** One-click state switcher between `Quote #01a10a2b (Accepted ₹75,000)` and `Quote #01a10f80 (Draft / Pending Review ₹1,770)`.
- **What we borrow (`→ V2, V3`):** Commercial executive summary strip at the top of the quote detail page.
- **What we reject:** Generic analytics charts unrelated to the specific quote.

### R4 · Eleken — High-Density Contract & Clause Accordion UI (Report §5 `[7]`)
- **Live URL:** `https://www.eleken.co/blog-posts/dashboard-design-examples-that-catch-the-eye`
- **Category:** SaaS enterprise document & table design
- **Layout & hierarchy:** Pairs a structured line-item and milestone matrix with a numbered 10-clause contract viewer featuring `"Expand all 10 clauses"` / `"Collapse all"` and clause search.
- **Component patterns:** Numbered clause cards (`1. Parties and Project Scope` … `10. Governing Law and Dispute Resolution`) with category tags (`Financial`, `IP`, `Liability`).
- **Typography & density:** Clean legal typography (`65ch` max line width inside clause bodies).
- **Interaction & state design:** Keyboard-accessible `<button aria-expanded>` clause accordions.
- **What we borrow (`→ V2, V5`):** Scannable 10-clause contract reader with expand-all/collapse-all controls and financial/IP clause highlights.
- **What we reject:** Tiny 11px legal fine print that fails readability standards.

### R5 · Qwilr + QwilrPay — One-Step Accept & Deposit Checkout (`C8`) (Fresh Search)
- **Live URL:** `https://qwilr.com/blog/send-quote-collect-payment-one-document/`
- **Category:** Interactive proposal & embedded checkout
- **Layout & hierarchy:** Embeds signature acceptance and deposit payment directly inside the **Accept Block** so the amount pulls automatically from the quote total (`₹885.00` 50% deposit or `₹22,500.00` 30% kickoff) with zero manual entry or page redirects (`C8`).
- **Component patterns:** Combined `Accept & Pay Deposit` step (`1. Confirm terms & typed/drawn e-signature → 2. Pay deposit via Razorpay UPI / Card / NetBanking`).
- **Typography & density:** Focused, high-trust checkout card with clear INR breakdown.
- **Interaction & state design:** Interactive 1-step **Sign & Pay** modal/drawer (`C8`) that transitions the quote to `Accepted · Signed` on completion.
- **What we borrow (`→ V1, V3`):** Direct inspiration for **C8 (One-Step Quote Acceptance → Contract Sign → Razorpay Deposit Checkout)**.
- **What we reject:** Redirecting the client out to a separate invoice page after accepting.

### R6 · PandaDoc — Proposal, Contract Clauses & Audit Certificate (Fresh Search)
- **Live URL:** `https://pipeline.zoominfo.com/sales/qwilr-vs-pandadoc`
- **Category:** Proposal, contract & e-signature platform
- **Layout & hierarchy:** Document-first layout with a sticky right-hand **Agreement Certificate & Signature Rail** showing agreement ID (`NL-CTR-2026-000001`), signed timestamp (`Signed on Oct 5, 2026`), and downloadable PDF actions.
- **Component patterns:** Verified e-signature seal, clause progress outline, and **A5** expiration countdown banner.
- **Typography & density:** Document sheet styling on `--card` surface with crisp `--border` framing.
- **Interaction & state design:** Clicking any clause in the outline scrolls smoothly to that clause and expands it.
- **What we borrow (`→ V3, V4`):** Formal **Agreement Certificate (`NL-CTR-2026-000001`)** and interactive clause table of contents.
- **What we reject:** Heavy PDF iframe embeds that break mobile responsiveness.

### R7 · HoneyBook Smart Files — Proposal + Contract + Deposit Unified Flow (Fresh Search)
- **Live URL:** `https://agiled.app/blog/best-proposal-software-for-web-designers`
- **Category:** Agency Smart File (Proposal + Contract + Invoice)
- **Layout & hierarchy:** Unifies the three traditional agency documents — **Scope Proposal**, **Service Agreement (`NL-CTR-2026-000001`)**, and **Milestone Deposit Schedule (`30% / 40% / 30%`)** — into one continuous, tabbed or stepped client experience (`C8`).
- **Component patterns:** Smart-file progress header (`1. Scope & Pricing → 2. Payment Schedule → 3. Agreement Terms → 4. Sign & Pay Deposit`).
- **Typography & density:** Editorial agency polish with clear milestone cards.
- **Interaction & state design:** Interactive step/section navigation with persistent bottom or side acceptance bar.
- **What we borrow (`→ V1, V4`):** Treating the quote, contract clauses, and milestone deposit as one cohesive Smart File (`C8`).
- **What we reject:** Hiding the `Decline quote` option (must remain an honest secondary button per `POST /api/v1/quotes/{id}/decline`).

### R8 · Better Proposals / Delivvo — Payment at Point of Signature (Fresh Search)
- **Live URL:** `https://delivvo.io/blog/best-proposal-software-freelancers-2026`
- **Category:** Proposal & instant deposit collection
- **Layout & hierarchy:** Highlights that collecting the deposit at the exact point of signature removes the multi-day gap between proposal approval and project kickoff.
- **Component patterns:** Instant Razorpay method selector (`UPI / QR`, `HDFC / ICICI NetBanking`, `Corporate Card`) inside the `Accept & Sign` confirmation drawer (`C8`).
- **Typography & density:** Compact checkout summary with instant verification feedback.
- **Interaction & state design:** Completing the simulated Razorpay deposit (`POST /intents` → `/confirm`) unlocks the `"View active project"` (`F09`) link immediately.
- **What we borrow (`→ V2, V5`):** In-drawer Razorpay UPI/NetBanking/Card selector inside the **C8** acceptance flow.
- **What we reject:** Requiring external popups that fail in offline sandboxed previews.

### R9 · Qwilr — Project Proposal Template with Upfront Deposit (Fresh Search)
- **Live URL:** `https://qwilr.com/templates/project-proposal-template-with-upfront-deposit/`
- **Category:** Project proposal template with milestone schedule
- **Layout & hierarchy:** Visualizes the 3-stage payment schedule (`30% Kickoff ₹22,500`, `40% Mid-project ₹30,000`, `30% Launch ₹22,500`) as a connected milestone timeline tied directly to the 3 line items (`Storefront UX & Catalog`, `Razorpay + Shiprocket Integration`, `Admin Training & Launch Support`).
- **Component patterns:** Connected Deliverable ↔ Milestone cards showing what each tranche funds.
- **Typography & density:** Clear percentage + INR badges (`30% · ₹22,500.00`).
- **Interaction & state design:** Interactive mapping between deliverables and payment milestones.
- **What we borrow (`→ V3, V5`):** Visual Deliverable-to-Milestone mapping for `Quote #01a10a2b` (`₹75,000.00`).
- **What we reject:** Marketing stock photography that distracts from the contract figures.
