# F11 · Quote Details (Accept & Sign) — Gate S · BASELINE-MAP

The revenue-conversion screen (`/quotes/{id}`), reconstructed from its 2 screenshots, 2 HTML snapshots, and `audit-metadata.json` before changing a single pixel.

```
## GATE S (F11)
Screenshots opened: 2/2 · HTML opened: 2/2 · audit-metadata read: YES
Routes mapped: /quotes/01a10f80-3144-755f-a145-b48ad8a72557 (Viewed/Awaiting & Expired), /quotes/01a10a2b-5c32-72e7-99ac-ba6c1c58b2ad (Accepted) · Content frozen: YES
Gate: PASS
```

---

## 1 · Sources Opened (in order)

1. `client-portal-prompts/F11-quote-details.md` + discipline references (`example.homepage-prompt.md`, `example.portfolio-listing-prompt.md`).
2. Screenshots **2/2**:
   - `Nestlancer-clients-screenshots/clients/044-quote-awaiting-acceptance-and-signature.webp` (Arjun Mehta `AM` — `Quote #01a10f80` in `Viewed` awaiting-acceptance & e-signature state).
   - `Nestlancer-clients-screenshots/clients/022-quotes-details.webp` (Priya Nair `PN` — `Quote #01a10a2c` in `Accepted` state, showing the `Open project` button inside the `Service agreement` card).
3. `nestlancer-client-pages-html/README.md` (rows 26–27) + HTML snapshots **2/2**:
   - `nestlancer-client-pages-html/16-quote-details-awaiting-acceptance.html` (`/quotes/01a10f80-3144-755f-a145-b48ad8a72557`)
   - `nestlancer-client-pages-html/17-quote-details-accepted.html` (`/quotes/01a10a2b-5c32-72e7-99ac-ba6c1c58b2ad`)
   - Plus `nestlancer-client-pages-html/audit-metadata.json`.
4. `reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md` + `reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx` (10/10 sheets).
5. `backend-api-swagger/README.md` + `quotes.openapi.json` + `payments.openapi.json`.

---

## 2 · Screenshot ↔ HTML ↔ Route Map & Capture Timing Note

| Artifact | Route / Quote ID | State Captured | Account | Key Observation |
|---|---|---|---|---|
| **Screenshot `044`** | `/quotes/01a10f80-3144-755f-a145-b48ad8a72557` | **`Viewed` (Awaiting acceptance & signature)** | Arjun Mehta (`AM`) | Captured before Oct 20, 2026: shows `Preview service agreement (draft)`, the full `Service agreement / ACCEPT & SIGN` card (checkbox + `Legal name (e-signature)` + `Accept quote & sign agreement →`), and the sticky footer (`Negotiate` · `Decline` · `Complete the agreement section above to accept ₹1,770.00` · `Complete agreement to accept`). |
| **HTML `16`** | `/quotes/01a10f80-3144-755f-a145-b48ad8a72557` | **`Expired`** | Arjun Mehta (`AM`) | Crawled on Oct 24, 2026 after `Valid until: Oct 20, 2026` had passed: badge flips to `Expired`, and the draft agreement preview, `ACCEPT & SIGN` card, and `Negotiate`/`Decline` buttons are hidden. |
| **HTML `17`** | `/quotes/01a10a2b-5c32-72e7-99ac-ba6c1c58b2ad` | **`Accepted` (Signed service agreement)** | Arjun Mehta (`AM`) | Shows `Quote #01a10a2b` (`For: Khandesh Spice D2C E-Commerce Store`, `₹75,000.00`), `Download signed service agreement`, and `Signed on Oct 5, 2026 · Agreement NL-CTR-2026-000001`. Note: `GET /api/v1/projects/by-quote/01a10a2b-5c32-72e7-99ac-ba6c1c58b2ad` failed with CORS/502 during the crawl, hiding the `Open project` button seen in screenshot `022`. |
| **Screenshot `022`** | `/quotes/01a10a2c-...` | **`Accepted`** | Priya Nair (`PN`) | Proves the `Open project` primary button sits inside the `Service agreement` card right below `Signed on Oct 5, 2026 · Agreement NL-CTR-2026-…`. |

Per prompt §4, every F11 variant covers **all three states** in-page via state tabs/switcher (`?state=awaiting|accepted|expired`, plus `loading` and `error`):
1. **Awaiting acceptance (`Quote #01a10f80` — `Viewed`)**: Reconstructed verbatim from screenshot `044` + `16` + `quotes.openapi.json`.
2. **Accepted (`Quote #01a10a2b` — `Accepted`)**: Frozen from `17` + the `Open project` link to `F09` (`01a10a2b-5eaa-769e-a5d9-0d58fcca6924`).
3. **Expired (`Quote #01a10f80` — `Expired`)**: Frozen from `16` with an honest explanation of what expired (`Valid until: Oct 20, 2026`) and next-step actions (`Request validity extension / changes` or `View request`).

---

## 3 · Audit Metadata Census (`audit-metadata.json`)

- **`16-quote-details-awaiting-acceptance.html`**:
  - H1: `Quote #01a10f80` (`26px`, `700`)
  - H2s: `Line items`, `Payment schedule`, `Documents`, `Terms & conditions`
  - H3s: `STANDARD TERMS`, `PROJECT-SPECIFIC TERMS`
  - Tables: 2 (`DESCRIPTION | QTY | UNIT PRICE | TOTAL`, 4 rows incl. subtotal/GST/total; `MILESTONE | SHARE | AMOUNT | DUE`, 2 rows)
- **`17-quote-details-accepted.html`**:
  - H1: `Quote #01a10a2b` (`26px`, `700`)
  - H2s: `Line items`, `Payment schedule`, `Documents`, `Service agreement`, `Terms & conditions`
  - H3s: `STANDARD TERMS`, `PROJECT-SPECIFIC TERMS`
  - Tables: 2 (`DESCRIPTION | QTY | UNIT PRICE | TOTAL`, 5 rows; `MILESTONE | SHARE | AMOUNT | DUE`, 3 rows)
  - Console Errors: `Access to XMLHttpRequest at 'https://api.nestlancer.com/api/v1/projects/by-quote/01a10a2b-5c32-72e7-99ac-ba6c1c58b2ad' from origin 'https://app.nestlancer.com' has been blocked by CORS policy` (`net::ERR_FAILED`).

---

## 4 · Frozen Content Truth (Verbatim)

### 4.1 Quote A — `Quote #01a10f80` (Awaiting Acceptance in `044` / Expired in `16`)
- **Top links:** `← Back to quotes` (`/quotes`) · `View request` (`/requests/01a10f7f-7698-71f1-8c99-709e45f72b67`)
- **Eyebrow:** `QUOTE`
- **H1:** `Quote #01a10f80`
- **Subtitle:** `For: AUDIT-P23-20261005-6rdsf Request to Quote Builder`
- **Badge:** `Viewed` (in awaiting state, screenshot `044`) / `Expired` (in expired state, HTML `16`)
- **Line items (`₹1,770.00`):**
  - Row 1: `AUDIT-P23 edited deliverable: quote builder regression package safe HTML text <img src=x onerror=alert(1)>` (rendered safely as escaped literal text, never raw HTML!) · Qty `1` · Unit price `₹1,500.00` · Total `₹1,500.00`
  - `Subtotal`: `₹1,500.00`
  - `GST (18%)`: `₹270.00`
  - `Total`: `₹1,770.00`
- **Payment schedule (`Installments due over the life of this engagement`):**
  - `Deposit` · `50%` · `₹885.00` · `Upon acceptance`
  - `Final payment` · `50%` · `₹885.00` · `Upon prior milestone approval`
- **Documents (`Download the latest quote PDF and service agreement.`):**
  - `Download quote PDF`
  - `Preview service agreement (draft)` (in awaiting state, from `044`)
- **Service agreement (`Review the draft service agreement before accepting. Acceptance electronically signs the Nestlancer service agreement for this project.`):**
  - `ACCEPT & SIGN`
  - Checkbox: `I have read the service agreement and agree to the terms & conditions for this project.`
  - Field label: `Legal name (e-signature)` · Placeholder: `Type your full legal name`
  - E-sign disclosure (C7): `Your legal name will be used as an e-signature on Agreement NL-CTR-2026-000001`
  - Primary CTA: `Accept quote & sign agreement →` (disabled until checkbox + legal name completed)
  - Helper microcopy: `Check the agreement box below to continue.` / `Complete the agreement section above to accept`
  - Bottom actions (`044`): `Negotiate` · `Decline` · `Quote summary ₹1,770.00` · `Complete agreement to accept`
- **Project-specific terms:** `AUDIT-P23 project-specific term: client supplies approvals within two business days.`
- **Validity:** `Valid until: Oct 20, 2026`

### 4.2 Quote B — `Quote #01a10a2b` (Accepted in `17`)
- **Top links:** `← Back to quotes` (`/quotes`) · `View request` (`/requests/01a10a2b-52c4-7483-a920-455246fe10ec`)
- **Eyebrow:** `QUOTE`
- **H1:** `Quote #01a10a2b`
- **Subtitle:** `For: Khandesh Spice D2C E-Commerce Store`
- **Badge:** `Accepted`
- **Line items (`₹75,000.00`):**
  - Row 1: `UX design, wireframes, and Shiprocket integration architecture` · Qty `1` · Unit price `₹22,500.00` · Total `₹22,500.00`
  - Row 2: `Storefront, Razorpay checkout (UPI/COD), inventory API` · Qty `1` · Unit price `₹37,500.00` · Total `₹37,500.00`
  - Row 3: `QA, Shiprocket go-live, Hindi SEO, and handoff` · Qty `1` · Unit price `₹15,000.00` · Total `₹15,000.00`
  - `Subtotal`: `₹75,000.00`
  - `Total`: `₹75,000.00`
- **Payment schedule (`Installments due over the life of this engagement`):**
  - `Deposit` · `30%` · `₹22,500.00` · `Upon acceptance`
  - `Mid-project payment` · `40%` · `₹30,000.00` · `Upon prior milestone approval`
  - `Final payment` · `30%` · `₹22,500.00` · `Upon prior milestone approval`
- **Documents (`Download the latest quote PDF and service agreement.`):**
  - `Download quote PDF`
  - `Download signed service agreement`
- **Service agreement:**
  - `Signed on Oct 5, 2026 · Agreement NL-CTR-2026-000001`
  - `Open project` → links to `../../F09-project-details/V#/index.html` (`/projects/01a10a2b-5eaa-769e-a5d9-0d58fcca6924`)
- **Project-specific terms:** `Service agreement required before milestone work begins. Navratri launch window is binding.`
- **Validity:** `Valid until: Oct 5, 2027`
- **Bottom summary:** `Quote summary ₹75,000.00`

### 4.3 Standard Terms (10 Numbered Clauses — Frozen Verbatim Across Both Quotes)
1. `1. Validity — This quote remains valid until the date shown above unless extended in writing by Nestlancer.`
2. `2. Acceptance — Engagement begins when the client accepts this quote in the Nestlancer dashboard and, where applicable, completes the first scheduled payment.`
3. `3. Payment — Fees follow the payment schedule in this quote. Late payment may pause work until the account is current.`
4. `4. Scope — Deliverables are limited to the line items and description in this quote. Additional work requires a written change order.`
5. `5. Revisions — Included revision rounds are as stated in this quote; extra rounds may be billed at the rate shown or as mutually agreed.`
6. `6. Client responsibilities — Timely feedback, content, credentials, and approvals are required so delivery dates can be met.`
7. `7. Intellectual property — Upon full payment of all amounts due, the client receives the agreed rights to final deliverables. Nestlancer retains ownership of pre-existing tools, libraries, and generic components.`
8. `8. Confidentiality — Both parties will keep non-public information shared during the project confidential.`
9. `9. Limitation of liability — Nestlancer's total liability under this quote is limited to fees paid hereunder, except where applicable law does not permit such limitation.`
10. `10. Governing law — These terms are governed by the laws of India; courts at Nestlancer's principal place of business have exclusive jurisdiction unless otherwise agreed in writing.`
