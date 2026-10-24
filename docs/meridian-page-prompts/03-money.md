# Part 03 — Money (billing, payments, quotes, invoices)

Read `docs/meridian-page-prompts/README.md`. Canon: master §8.2, §8.5–§8.6, §9.D. **Requires parts 00–02.** This is the largest part — split into sub-batches of 2–3 pages.

## Task
Build the commercial centre. All four payment **states** must be visually distinguishable at a glance. Money arithmetic must match Overview.

### Files to write

| Path | Job |
|---|---|
| `meridian-lab/pages/billing.html` | Money centre — ledger strip + open + history |
| `meridian-lab/pages/payment-pending.html` | Checkout online for ₹20,880 |
| `meridian-lab/pages/payment-bank-transfer.html` | NEFT / UPI + UTR |
| `meridian-lab/pages/payment-completed.html` | Receipt record (no confetti) |
| `meridian-lab/pages/payment-not-due.html` | Locked payment explained |
| `meridian-lab/pages/payment-methods.html` | Empty saved methods → real next action |
| `meridian-lab/pages/invoices.html` | 4 invoices + footer totals |
| `meridian-lab/pages/quotes.html` | 3 quotes; open one needs signature |
| `meridian-lab/pages/quote-awaiting-signature.html` | Sign ₹1,80,540 safely |
| `meridian-lab/pages/quote-accepted.html` | Contract view for Q1 |

Suggested sub-order: quotes trio → billing → payment states → invoices → methods.

## Locked money (must reconcile)
| Bucket | Amount |
|---|---|
| Paid | ₹31,320.00 |
| Due now | ₹36,540.00 |
| Not yet due | ₹69,822.00 |
| Awaiting signature | ₹1,80,540.00 |

**Payments:** see master §8.6 table (`PMT-2030-0207` Paid … `0251` Blocked).  
**Invoices:** `NL-INV-2030-0004` Paid · `0009` Due 20 Feb · `0011` Due 22 Feb · `NL-INV-2029-0088` Paid.  
**Quotes:** Q1 accepted · Q2 awaiting signature (expires 24 Feb) · Q3 declined + re-open.  
**Bank/UPI:** Nestlancer Pvt Ltd · HDFC `5020012345678` · IFSC `HDFC0001234` · UPI `nestlancer@hdfcbank`.

## Critical page rules
- **`billing.html`:** 4-up strip (not four cards); open payments include LMS mid-project + Festive final; trust block on every money screen.
- **`payment-pending.html`:** amount once as hero; state machine one current node; **no** Cancel control (not cancellable).
- **`payment-not-due.html`:** ribbon explains unlock (Okta SAML · 22 Mar); zero disabled-looking primaries; one useful action (`Remind me`).
- **`quote-awaiting-signature.html`:** totals reconcile; Sign disabled until checkbox + legal name, reason in 12 words; ASCII in master §9.D.
- **`payment-methods.html`:** empty state CTA is **Pay ₹20,880**, not “Go to payments”.
- Status vocab: use `Due` / `Not due` / `Paid` / `Blocked` — not “Issued” / “Not due yet” (master §13.4).

## Out of scope
Messages, files library, account settings. Do not invent payment rows.

## Output protocol
**At most 2–3 HTML pages per turn.** After each sub-batch continue until all 10 exist. Update `index.html` links.

## Acceptance checks
- [ ] 10 Money pages on disk
- [ ] Billing + Overview + Invoices totals reconcile
- [ ] Four payment states distinguishable without reading body copy
- [ ] Quote signature disabled state explains itself
- [ ] Trust block present on money screens
- [ ] No script / no filler

## Hand-off line
```
Part 03 done. Next: docs/meridian-page-prompts/04-conversation.md
```
