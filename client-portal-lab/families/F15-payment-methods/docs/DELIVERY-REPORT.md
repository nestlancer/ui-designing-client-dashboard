# F15 · Payment Methods — Delivery Report (Gate 3)

**Route:** `/payments/methods` · **Family dir:** `families/F15-payment-methods/` · **Authored:** 2026-10-28, five standalone `index.html` files hand-written one at a time (no design-generation script; no branch/commit/push).

## 1 · What shipped

| Variant | Name | A · Geometry | B · Priority | C · Narrative | D · Density | E · Signature interaction |
|---|---|---|---|---|---|---|
| V1 | Token Wallet Ledger | sidebar + wallet list | verdict-first | list-led | dense | Honest first-use empty state + demo add-method dialog |
| V2 | Method Rail & Settings | settings rail + tabs | action-first | tab-led | dense | Cards / Mandates tabs, default-first ordering, nicknames |
| **V3 ★** | **Card Deck** | selectable card deck | object-first | card-led | airy | Make-primary / rename / remove on each pressed card |
| V4 | Security-First Split | explainer + list split | narrative-first | trust-led | airy | Token-only security explainer + mandate consent note |
| V5 | Empty-State Onboarding | single narrative column | narrative-first | accordion | airy | Three-step “add your first method” guide + captured empty state |

All five keep the captured “**No saved methods yet**” empty state, the trust strip and processor chips (UPI · Cards · Netbanking · Wallets), and “Go to payments”. Add / rename / remove / make-primary are demo-labelled. **UPI AutoPay mandates are explained, never silently enabled** — no mandate endpoint exists.

## 2 · Gate printouts

```
## GATE S (F15)   Screenshots + HTML snapshot 27 + audit metadata mapped · docs/BASELINE-MAP.md · Gate: PASS
## GATE R (F15)   MD + 10/10 XLSX sheets studied · C/KEEP/A items mapped · Gate: PASS
## GATE A (F15)   2 specs + README read · 10 distinct spec endpoints referenced · 5 demo-only CTAs · Gate: PASS
## GATE T (F15)   5 primary + 4 supplementary queries · 12/≥8 refs opened (R13 search snippet excluded) · Gate: PASS
## GATE 1 (F15)   Concept cards 5/5 · Sketches 5/5 · Difference test PASS · C 5/5 · A6 ≥3/5 · Gate: PASS
## GATE 2a (F15)  V1 pilot hand-built and frozen: 4 states, 2 themes, 5 widths, keyboard end-to-end · Gate: PASS
## GATE 2b (F15)  V2–V5 hand-authored one by one + self-critique · gallery F15 section + manifest 5 records + DECISIONS §9 appended · generator scripts: 0 · Gate: PASS
## GATE 3 (F15)   Variants built by hand: 5/5 · Generator scripts: 0
                  Widths×themes checked: 5 × 2 = 10 per variant (360/390/768/1024/1440 light+dark)
                  Checklist pass: 5/5 · Blockers open: 0 · Gate: PASS
```

## 3 · Verification matrix (measured)

| Check | Result |
|---|---|
| `node --check` on the 10 inline scripts of this family | **0 errors** |
| Script-stripped `href`/`src` target check | **0 broken** · remote assets **0** · `href="#"` **0** · duplicate IDs **0** |
| Chromium 156 headless: 5 variants × 2 themes × 5 widths = **50 page loads** | **0 console errors · 0 page errors · 0 failed requests · 0 page-level horizontal overflow** |
| Interaction suite (⌘K, theme + `aria-pressed`, 4 state pills + Data, `data-demo-nav` boundary dialog + Tab trap + Esc + focus restore, ARIA tabs) | **5/5 PASS** |
| Exhaustive button smoke test (native `prompt`/`confirm` stubbed) | **72 buttons clicked · 0 JS errors · 0 leaked scroll locks** |
| Computed-colour AA sweep, light + dark | **0 text failures** |
| Computed font-size sweep | **0 visible text below 11px** |
| No-JS context | **5/5** render the captured empty state, trust copy and navigation with no horizontal scroll |
| `reducedMotion: reduce` | **5/5** all `.reveal` content visible |

## 4 · Findings classification

- **Blockers (0 open).** 20 dead F20/F21/F23 nav links in this family were replaced with real gallery hrefs + honest `data-demo-nav` boundary dialogs. No `href="#"` remains.
- **Major (resolved).** F15 variants had no `noscript` fallback. All five now state that “No saved methods yet” is the captured state and that add / rename / remove are demo-only.
- **Minor (known).** V2–V5 use the native `window.prompt()` for rename. It is functional and keyboard-reachable but is **not** a styled in-page dialog; the lab's focus-trapped `Lab.openDlg` is used everywhere else. This is recorded rather than hidden.
- **Minor (known).** Sample saved rows are labelled sample tokens, never presented as captured production data. No raw card number is ever accepted or displayed by the lab.
- **Not measured.** “Hierarchy understood in <2s” is a perceptual claim; only its structural preconditions (one `<h1>`, one hero, KPI value+label+why where present) were verified.

## 5 · Winner

**F15 · V3 “Card Deck” — `families/F15-payment-methods/V3/index.html`.** Saved methods are objects you recognise, not table rows. V3's selectable cards put default / rename / remove exactly where the eye expects them, keeping the captured empty state honest and the trust copy close to the action. V5 is the better first-use teacher; V3 is the better everyday screen.

## 6 · Limitations (stated, not hidden)

- No live backend and no Razorpay SDK. “Add card” demonstrates the `POST /api/v1/payments/methods` payload with a fake `tokenId` and is labelled demo.
- **No UPI-mandate, card-verification or raw-card-token endpoint exists.** Mandate panels are explanatory only; “Verify card” is never shown as an action. Stripe's guidance that future UPI charges require explicit customer authorization is the reason for this restraint.
- `GET /api/v1/payments/methods`, `POST`, `PATCH /{id}` and `DELETE /{id}` are documented, not called.
- Pixel screenshots were not archived; light/dark parity is asserted from computed colours and contrast ratios.
- Dates, KPI figures (`₹81,500.00 / ₹31,875.00 / ₹0.00`) and the “Go to payments” link come from the captured screen; no new account data was invented.

## 7 · Preview

```bash
cd /home/user/ui-designing-client-dashboard
python3 -m http.server 8130
# http://localhost:8130/client-portal-lab/                      (gallery)
# http://localhost:8130/client-portal-lab/families/F15-payment-methods/V3/index.html
```

Docs: `BASELINE-MAP.md` · `REPORT-STUDY.md` · `API-MAP.md` · `TEMPLATE-RESEARCH.md` · `CONCEPTS.md` · `DECISIONS.md` · this report. Shared evidence: `DECISIONS.md` §9, `manifest.json` (F15 records), gallery `index.html` (`#f15`).
