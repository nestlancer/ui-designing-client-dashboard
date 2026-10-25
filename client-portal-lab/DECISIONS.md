# DECISIONS — Nestlancer client portal template lab

Everything in `client-portal-lab/` was decided here. If a decision is not written down, it was not made.

- **Branch**: `arena/20f82082-ui-designing-client-dashboard`
- **Base commit**: `161c02bdeb729f278f4425adfe10f056b310c525` (`main`)
- **Scope of change**: `client-portal-lab/` and `docs/` only. No screenshots, HTML snapshots, research reports, Swagger specs or `example-demo-prompt/` files were modified.

---

## 1. Authorship

All 115 variant pages, the shared stylesheets and the gallery were **written by hand**, one file at a time.

- No generator, template engine, scaffolding script, `node`/`python`/`*.mjs`/`*.cjs` script or npm task created or overwrote any variant HTML or CSS.
- The only automation used was **static checking**: `curl` for HTTP smoke tests, Python `html.parser` for tag balance, `node --check` for JavaScript parse, and link resolution over the built pages. Those checks report and, where a link was mechanically wrong (see §9), apply a small in-place correction to pages that already existed by hand.
- `manifest.json` and `audit.json` are **data** files assembled from the finished pages (titles, byte sizes, check output). They are not inputs to any page.
- Where a page started from a sibling, it was copied by hand and then redesigned — layout, section order, controls and copy all changed.

## 2. One colour scheme

- `shared/tokens.css` is the single source of colour. Every page links it, then `shared/base.css`, then its own `<style>` block.
- The brand ramp is blue: `#ecf3ff → #dbe7ff → #b9ccff → #8fa8ff → #6b88ff → #465fff → #3439b8 → #26237a → #161950`. `--primary` is `#465fff` everywhere, including the two auth families — no teal login, no per-family accent.
- The violet ramp is **not** a UI colour. Where it survives it is only the documented focus ring token. There is no purple button, chip or badge in the lab.
- Status colour is fixed: ok `#e5f6ec`/`#166534`, warn `#fdf3e0`/`#8a5a00`, error `#fdecec`/`#b42318`, info `#e6f4fd`/`#0c5d8a`. Status is always carried by a word as well as a tint, so nothing depends on hue alone.
- **No Bootstrap, no Tailwind, no CDN, no web fonts, no external requests.** Type is the system stack. Every icon is an inline `<svg><symbol>` sprite in the page that uses it, because an external `sprite.svg#id` reference fails inside a sandboxed preview frame.
- The `.btn` set is closed: `-p` primary, `-s` secondary, `-g` ghost, `-d` destructive. A variant may size and place those four; it may not invent a fifth.

## 3. Five real variants per family

- Exactly 5 directories per family (`V1`…`V5`), 23 families, 115 `index.html` files. No bonus page, no stub, no redirect, no "same as V1 in a different tint".
- Each variant was built against three of the five difference axes — **A** layout, **B** object/narrative ordering, **C** content story, **D** density, **E** interaction signature — and every sibling pair differs on at least three, one of which is A or C.
- Consequences of that rule are visible in the gallery: F05 V1 is a table, V4 is a board; F11 V2 leads with money while V4 leads with assurance; F14 V2 is a printable statement while V4 is an operations console.

## 4. Data policy

- Identities, money and references come from the captured material or the Swagger specs: **Arjun Mehta**, Khandesh Spice D2C (57%, M1 approved 15 Oct ₹48,000, M2 due 30 Oct ₹30,000, owner Riya Kapoor, from `NL-REQ-2026-0018`), B2B Wholesale Ordering Portal (78%, 2/3 milestones, ₹45,000 on M3 approval), vitals 10/0/0/0, **₹81,500 collected / ₹31,875 pending**, quote `#01a10f80` ₹1,500 + ₹270 GST = ₹1,770 split 50/50 at ₹885, deposit ₹625 `AUDIT-P25-20261005-73dhk`, invoices `NL-INV-2026-000001…000045`, checkout ₹30,000 ref `01a10a2b-5ed2-73bc-8aee-d1c6262906e9`, card `HDFC ••••4242 exp 09/2028`, bank `5010 0291 8873 / IFSC HDFC0001234`, UPI `nestlancer@okhdfc`.
- Ledger arithmetic is load-bearing and cross-checked: processing ₹30,000 + open invoice ₹1,875 = **₹31,875**; F14 completed rows sum to **₹81,500**; F18 totals are **₹87,000 invoiced / ₹55,125 collected / ₹31,875 open**; the ₹1,875 invoice is taxable ₹1,589 + GST ₹286.
- **No invented testimonials, ratings, client logos, growth percentages or "trusted by N teams" strips.** Where a marketing-style module would normally carry a metric, the lab shows a fact from the data or omits the module.
- **Known illustrative data**: the live quotes endpoint could not be read while the lab was built, so `F10` quote rows other than `#01a10f80` are sample records used to show the layout. Every F10 page carries a visible data-honesty note saying so, and no amount from those rows is repeated in F14, F16 or F18.
- **F15 is deliberately empty.** The captured state has no saved payment method. V1 is built on that empty state; the other four variants show saved-method layouts because the *pattern* has to be designed, and each labels the data as a saved-method example.

## 5. The live 502 is designed, not hidden

`GET /api/v1/projects` returned `502 origin_bad_gateway` and failed CORS during the audit. That is treated as a first-class state:

- F08 all five variants show a degraded state with **Retry**, a **support** route and a system-status line.
- F09 keeps the same banner above whatever section can still render.
- F05 V4 and the F03 variants surface the same banner when the project feed is unavailable.
- F08 V1's retry toggles `hidden` so a skeleton and stale cards never appear at the same time. No variant pretends the endpoint works, and none replaces the failure with an empty list.

## 6. Demo-only affordances

These have no endpoint in any of the 17 specs. Each appears in at most the families listed and is labelled in the page itself and again here.

| # | Affordance | Where | Why it is demo-only |
|---|---|---|---|
| D1 | "Ask AI about this project / quote / billing" | F09, F11, F14 | no AI endpoint in any spec |
| D2 | Project help & FAQ hub | F09 | content-only, no project-scoped CMS endpoint |
| D3 | Saved views / saved filters | F05, F10, F14 | the preferences endpoint covers notification prefs only |
| D4 | Combined statement of account / GST summary PDF | F14, F18 | only per-invoice PDF download exists; F18 V2 says so in a toast |
| D5 | UPI mandate / auto-pay management | F15 | Razorpay-hosted, no API surface |
| D6 | Typing indicator, read receipts, SLA timer | F13 | no endpoint; websocket health only |
| D7 | PWA install row | F03 | platform UI, shown as a setting row |
| D8 | Skills autocomplete taxonomy | F20 | free-text `skills[]` only |
| D9 | "Open support thread" from an error card | F08, F09 | composes `POST /messages/threads/direct`; copy is seeded |
| D10 | Quote negotiation *chat* | F11 | real path is `POST /quotes/{id}/request-changes`; the chat presentation is illustrative |

Every other CTA in the lab resolves to an endpoint listed in `docs/API-MAP.md`, or to another page in the lab.

## 7. States, themes, widths

- Each variant carries empty, skeleton and error treatments drawn in its own layout — not a shared grey box pasted at the bottom. Files: `F22` upload states, `F08` degraded project list, `F19` empty queue, `F23` no-results, `F07`/`F11` expired quote.
- Light and dark both come from the same tokens; the boot script resolves `?theme=` → `localStorage['nl-theme']` → `prefers-color-scheme`, so a page never flashes the wrong theme.
- Layouts hold from 360px to 1440px. The verification lists that convert to cards, the message panes that collapse to one column, and the tables that drop columns at narrow widths are all in each page's own media queries.
- `prefers-reduced-motion: reduce` is honoured wherever anything animates (progress bars, switches, hover reveals, drawer transforms).
- Keyboard: skip link first on every page, visible focus rings from tokens, Esc closes drawers/palettes, focus is restored to the trigger, and `aria-selected`/`aria-pressed`/`aria-expanded` track real state. Focus traps filter on `offsetParent !== null` so hidden controls are not tabbable.
- Without JavaScript the content is still reachable: all figures, tables, states and copy are in the HTML. Scripts only change what is already rendered; they never fetch content.

## 8. Structural conventions

- Shell: `.shell` (sidebar) or `.shell--top` (top nav) from `base.css`; `--sidebar: 232px`, `--header: 64px`, `--content: 1400px`.
- Every page: skip link, inline sprite, theme toggle, one footer with **← Gallery** (`../../../index.html`), the family/variant label, and a `V1…V5` segment with `aria-current="page"`.
- Cross-links follow one map: login ↔ register, post-login → F03-V1, search → F04-V1, privacy → F21-V1, terms → F23-V1, new request → F06-V1, request → F07-V1, quote → F11-V1, project → F09-V1, projects → F08-V1, messages → F12-V1, thread → F13-V1, billing → F14-V1, invoices → F18-V1, methods → F15-V1, checkout → F16-V1, status → F17-V1, notifications → F19-V1, files → F22-V1.
- `[hidden]` is forced to `display:none !important` at the end of `base.css`; toggled elements that need their own display set it explicitly when shown.
- Attributes never collide: a filter token never reuses the control's own `data-*` name (`data-f` vs `data-t`, `data-v` vs `data-amount`, `data-grp` vs `data-t`).

## 9. Corrections applied after the pages were written

Static checks found path errors, not design errors. Each was fixed in place by hand-directed edit, not regenerated:

1. Footer gallery links pointed at `families/index.html` (one `../` short) on 114 pages → corrected to `../../../index.html`.
2. `F14-billing-center` → `F14-billing` (3 links in F03 and F11).
3. `F04-command-palette` → `F04-global-search` (2 links in F23 V4).
4. Two anchors used a data-attribute as `href` (`F01` V3 "Change", `F02` V4 "Forgot password") → `href="#"` with the existing handlers already calling `preventDefault()`.
5. `F16` V2 had no gallery link; `F04` V4 had no variant segment → both added.
6. `F10` V1–V5 gained the visible data-honesty note described in §4.

## 10. What was not done

- **No browser or headless engine was available**, so no screenshot comparison, no visual regression run, and no manual click-through in a real browser. The lab therefore makes **no claim of visual QA**. See `docs/DELIVERY-REPORT.md` Gate 3.
- The checks that *were* run are listed in `audit.json` — tag balance, JavaScript parse, link resolution, absence of external requests, single token file, 115/115 coverage.
- Real Razorpay checkout, real uploads and real file downloads are simulated. Each simulation says so on the page (toast or inline note) rather than implying a live call.
