# F11 · Quote Details — Gate 1 · CONCEPTS

5 distinct layout, density, and interaction concepts for **F11 · Quote Details (`/quotes/{id}`)**, all sharing the single locked token system (`client-portal-lab/shared/tokens.css`), the compressed 232px sidebar shell (`C17`), both frozen captured quotes (`16` `Quote #01a10f80` `₹1,770.00` with **C23** escaped `<img src=x onerror=alert(1)>` and `17` `Quote #01a10a2b` `Khandesh Spice D2C E-Commerce Store` `₹75,000.00`), **C8** one-step quote acceptance (`Accept → Contract Sign → Razorpay Deposit`), and **A5** quote expiry countdowns.

```
## GATE 1 (F11)
Concepts written: 5 (V1..V5) · All C-items placed: YES · All A-items placed: YES
Sketches included: YES · Difference table: YES
Gate: PASS
```

---

## Concept V1 — Sticky Commercial Rail & One-Step Sign-and-Pay Hub (Recommended Default)

- **1-sentence thesis:** Pairs a structured left-hand commercial breakdown (Line Items, Tax & Deposit Rules, 30/40/30 Payment Schedule, and 10 Contract Clauses) with a sticky right-hand **C8 One-Step Accept, Sign & Pay Deposit Rail** (or verified **Signed Agreement Certificate `NL-CTR-2026-000001`** on `17`).
- **References used:** R1 (Moxo Client Portal), R2 (Stripe Quotes), R5 (QwilrPay), R7 (HoneyBook Smart Files).
- **Density & spacing posture:** Balanced 2-column asymmetric workspace (`1fr` main document + `360px` sticky commercial action rail; `20px` gap).
- **ASCII Layout Skeleton:**
```
+-----------------------------------------------------------------------------------+
| [Sidebar 232px] | Breadcrumb: Dashboard > Quotes > Quote #01a10a2b   [⌘K] [🌙] AM |
|                 +-----------------------------------------------------------------+
|  Quotes (F10)   | [State Bar: #01a10a2b Accepted ₹75k (17) | #01a10f80 ₹1,770 (16)]|
|  Projects (F08) +-------------------------------------------+---------------------+
|  Messages (F12) | QUOTE DETAILS · Quote #01a10a2b [Accepted]| STICKY ACTION RAIL  |
|                 | Request: Khandesh Spice D2C Store         | Total: ₹75,000.00   |
|                 | [A5 Validity: Oct 20, 2026 · Signed Oct 5]| ✓ Signed Oct 5, 2026|
|                 |-------------------------------------------| NL-CTR-2026-000001  |
|                 | 1. LINE ITEMS (3 rows · ₹28k/₹32k/₹15k)   | [View Active Proj →]|
|                 | 2. TAX & DEPOSIT + NOTES                  | [Download PDF]      |
|                 | 3. PAYMENT SCHEDULE (30% / 40% / 30%)     | --- OR ON #01a10f80:|
|                 | 4. CONTRACT & TERMS (10 Clauses Accordion)| [C8: Accept, Sign & |
|                 |    [Expand all 10] [1..10 verbatim]       |  Pay ₹885 Deposit]  |
+-----------------------------------------------------------------------------------+
```
- **Component treatment:**
  - **Quote Switcher Bar:** 1-click toggle between `Quote #01a10a2b — Accepted ₹75,000.00 (Snapshot 17)`, `Quote #01a10f80 — Draft ₹1,770.00 (Snapshot 16, C23)`, `Simulated Pending Review — Ready for C8 Sign & Pay`, `Loading`, and `Error`.
  - **C8 Unified Acceptance Drawer/Rail:** Combines `POST /accept` + Contract Clause Sign-off (`NL-CTR-2026-000001`) + Razorpay Deposit Checkout (`50% ₹885.00` or `30% ₹22,500.00` via `POST /payments/intents`) in one continuous flow without leaving `/quotes/{id}`.
  - **C23 Safe Deliverable Rendering:** `<img src=x onerror=alert(1)>` rendered inside a safe monospace code badge on `Quote #01a10f80`.
  - **A5 Expiry Countdown:** Live countdown pill (`Valid until Oct 20, 2026 · Expires within 24h`) on unsigned quotes.

---

## Concept V2 — Precision Financial Audit Sheet & Split Clause Matrix

- **1-sentence thesis:** Leads with a 4-KPI executive financial ribbon (`Total Amount`, `Tax / GST`, `Upfront Deposit Due`, `Validity / A5 Countdown`) over a side-by-side **Line Items ↔ Payment Schedule** matrix and a searchable 10-clause legal ledger.
- **References used:** R2 (Stripe), R3 (AdminLTE), R4 (Eleken), R8 (Better Proposals).
- **Density & spacing posture:** High-density financial audit posture (`14px` table cells, `tabular-nums`, side-by-side commercial tables).
- **ASCII Layout Skeleton:**
```
+-----------------------------------------------------------------------------------+
| [Sidebar 232px] | Header: Dashboard > Quotes > Quote #01a10a2b       [⌘K] [🌙] AM |
|                 +-----------------------------------------------------------------+
|                 | Quote #01a10a2b [Accepted]   [Download PDF] [View Project (F09)]|
|                 +-----------------+-----------------+--------------+--------------+
|                 | Total: ₹75,000  | Tax: 0% / 18%   | Deposit: 30% | A5 Valid:    |
|                 | 3 Line Items    | (₹270 on #01a10)| ₹22,500 Kick | Oct 20, 2026 |
|                 +-----------------+-----------------+--------------+--------------+
|                 | LEFT: Line Items & Tax Breakdown  | RIGHT: 30/40/30 Schedule    |
|                 | - Storefront UX (₹28,000)         | - 30% Kickoff (₹22,500)     |
|                 | - Razorpay + Shiprocket (₹32,000) | - 40% Mid-project (₹30,000) |
|                 | - Admin Training (₹15,000)        | - 30% Launch (₹22,500)      |
|                 +-----------------------------------+-----------------------------+
|                 | C8 SIGN & PAY BAR + 10-CLAUSE CONTRACT LEDGER (Expand / Filter) |
+-----------------------------------------------------------------------------------+
```
- **Component treatment:**
  - Side-by-side comparison of **What You Get (Line Items)** and **How You Pay (Payment Schedule + Tax & Deposit)** above the 10-clause contract ledger and **C8** checkout bar.

---

## Concept V3 — Smart-File Stepper & Formal Contract Document Sheet

- **1-sentence thesis:** Presents the quote as an agency **Smart File** (`1. Scope & Line Items` · `2. Payment Schedule & Tax` · `3. Contract Agreement NL-CTR-2026-000001` · `4. Sign & Pay Deposit [C8]`) on a crisp paper-styled document sheet with all sections visible or jump-navigable.
- **References used:** R3 (AdminLTE), R5 (Qwilr), R6 (PandaDoc), R9 (Qwilr Upfront Deposit Template).
- **Density & spacing posture:** Editorial document sheet (`max-width: 980px` centred sheet with top Smart-File progress bar and persistent bottom/top **C8** action bar).
- **ASCII Layout Skeleton:**
```
+-----------------------------------------------------------------------------------+
| [Sidebar 232px] | Header: Dashboard > Quotes > Quote #01a10a2b       [⌘K] [🌙] AM |
|                 +-----------------------------------------------------------------+
|                 | [Smart File Bar: ① Scope ✓ ── ② Schedule ✓ ── ③ Contract ── ④ C8]|
|                 | +-------------------------------------------------------------+ |
|                 | | FORMAL PROPOSAL & AGREEMENT SHEET                           | |
|                 | | Quote #01a10a2b · Khandesh Spice D2C Store · ₹75,000.00     | |
|                 | | [A5 Validity Pill] · [Signed Oct 5 · NL-CTR-2026-000001]    | |
|                 | |-------------------------------------------------------------| |
|                 | | §1 Line Items · §2 Tax & Notes · §3 30/40/30 Milestones     | |
|                 | | §4 Standard Contract Clauses (1–10) + E-Signature Block     | |
|                 | +-------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------+
```
- **Component treatment:**
  - Formal proposal document sheet with embedded e-signature certificate block (`Signed on Oct 5, 2026 · Agreement NL-CTR-2026-000001`) and interactive **C8** inline signature pad + Razorpay deposit step when viewing an unsigned quote.

---

## Concept V4 — Contract-First Legal & Commercial Inspector

- **1-sentence thesis:** Elevates the **Contract & Terms (`NL-CTR-2026-000001`)** alongside a sticky left-hand **Clause & Milestone Navigator** so compliance-minded clients can inspect all 10 clauses alongside the line items before completing the **C8** one-step signature and deposit checkout.
- **References used:** R1 (Moxo), R6 (PandaDoc), R7 (HoneyBook).
- **Density & spacing posture:** 3-zone document inspector (`220px` section/clause outline + `1fr` commercial & contract body + sticky top **C8/A5** decision bar).
- **ASCII Layout Skeleton:**
```
+-----------------------------------------------------------------------------------+
| [Sidebar 232px] | Header: Dashboard > Quotes > Quote #01a10a2b       [⌘K] [🌙] AM |
|                 +-----------------------------------------------------------------+
|                 | STICKY DECISION BAR: Quote #01a10a2b · ₹75,000 · [C8 / Project] |
|                 +--------------------+--------------------------------------------+
|                 | OUTLINE NAV        | COMMERCIAL & LEGAL WORKSPACE               |
|                 | • Line Items (3)   | [Line Items Table + C23 Safe Deliverable]  |
|                 | • Tax & Deposit    | [Tax & Deposit + Notes + 30/40/30 Schedule]|
|                 | • Schedule (30/40) | [Contract NL-CTR-2026-000001 · 10 Clauses] |
|                 | • Clauses 1–10     |   Clause 1..10 with instant jump & expand  |
|                 | • Sign & Pay (C8)  | [Embedded C8 Sign & Razorpay Deposit Card] |
+-----------------------------------------------------------------------------------+
```
- **Component treatment:**
  - Dedicated clause-by-clause jump rail (`1. Parties and Project Scope` through `10. Governing Law and Dispute Resolution`) paired with the full commercial breakdown and **C8** unified acceptance block.

---

## Concept V5 — Interactive Milestone-to-Deliverable Checkout Workbench

- **1-sentence thesis:** Connects each deliverable directly to the milestone payment schedule (`30% Kickoff ₹22,500`, `40% Mid-project ₹30,000`, `30% Launch ₹22,500` or `50% Deposit ₹885.00` on `16`) with an interactive **C8** checkout simulator right beside the scope.
- **References used:** R4 (Eleken), R8 (Better Proposals / Delivvo), R9 (Qwilr Deposit Template).
- **Density & spacing posture:** Split interactive workbench (`58%` deliverable & contract stack + `42%` live **C8** milestone & Razorpay deposit calculator).
- **ASCII Layout Skeleton:**
```
+-----------------------------------------------------------------------------------+
| [Sidebar 232px] | Header: Dashboard > Quotes > Quote #01a10a2b       [⌘K] [🌙] AM |
|                 +-----------------------------------------------------------------+
|                 | Quote #01a10a2b / #01a10f80 Header + [A5 Expiry Countdown Pill] |
|                 +----------------------------------+------------------------------+
|                 | LEFT (58%): Scope & 10 Clauses   | RIGHT (42%): C8 Workbench    |
|                 | • Deliverable Cards / Table (C23)| • Step 1: Review Breakdown   |
|                 | • Notes & Tax Breakdown          | • Step 2: Sign Agreement     |
|                 | • 10 Contract Clauses Accordion  | • Step 3: Pay Deposit (UPI)  |
|                 |   (Expand all / Collapse all)    | • Or: Signed Certificate +   |
|                 |                                  |   [Open Project in F09 V5 →] |
+-----------------------------------------------------------------------------------+
```
- **Component treatment:**
  - Interactive 3-step **C8** card on the right that lets the user test the complete `Accept quote → Sign NL-CTR-2026-000001 → Pay Deposit via Razorpay UPI` flow in place, or inspect the completed `Signed on Oct 5, 2026` receipt and jump to `F09 V5`.

---

## Variant Difference Table

| Dimension | V1 · Sticky Action Rail | V2 · Financial Audit Sheet | V3 · Smart-File Sheet | V4 · Legal & Clause Inspector | V5 · Milestone Workbench |
|---|---|---|---|---|---|
| **Primary layout** | `1fr` commercial stack + `360px` sticky right action rail | 4-KPI ribbon + 2-col Line Items/Schedule matrix + Clauses | Centred `980px` Smart-File document sheet w/ stepper bar | Sticky top bar + `220px` clause outline + `1fr` body | `58% / 42%` split Scope & Clauses vs live C8 Workbench |
| **Section order** | Header → Line Items → Tax/Notes → Schedule → Clauses \| Rail | Header → 4 KPIs → Line Items \| Schedule → C8 Bar → Clauses | Smart-File Bar → Header → Scope → Schedule → Clauses → C8 Sign | Decision Bar → Outline \| Scope → Schedule → 10 Clauses → C8 | Header → Scope + Clauses \| Interactive 3-Step C8 Checkout |
| **C8 (1-step Sign & Pay)** | Sticky right rail + interactive Sign & Razorpay modal | Full-width commercial action bar with inline checkout drawer | Step ④ at bottom of Smart-File sheet with signature pad | Embedded Sign & Deposit card anchored by outline nav | Dedicated 42% right-hand interactive 3-step workbench |
| **C23 (`<img src=x>` fix)** | Escaped monospace code pill in Line Items table (`16`) | Deliverable cell w/ `QA Escaped String` badge (`16`) | Boxed literal code block inside §1 Scope (`16`) | Contained code token with security tooltip (`16`) | Deliverable card with safe `textContent` rendering (`16`) |
| **A5 (Expiry countdown)** | Header + sticky rail amber countdown pill (`⏳ <24h`) | Dedicated 4th KPI card (`Validity & Countdown`) | Document header seal with live countdown timer | Top decision bar urgency chip | Workbench header countdown meter |
