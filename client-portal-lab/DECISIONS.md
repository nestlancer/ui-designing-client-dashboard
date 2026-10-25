# DECISIONS — Nestlancer client portal template lab

Everything in `client-portal-lab/` was decided here. If a decision is not written down, it was not made.

- **Branch**: `arena/6cd802c1-ui-designing-client-dashboard`
- **Base commit**: `8bd198d174a8b41a12724d62cfd1ac3320df2c01` (`main`)
- **Scope of change**: `client-portal-lab/` and `docs/` only. No screenshots, HTML snapshots, research reports, Swagger specs or `example-demo-prompt/` files were modified.

---

## 1. Authorship

All 115 variant pages, the shared stylesheets and the gallery were **written by hand**, one file at a time.

- No generator, template engine, scaffolding script, `node`/`python`/`*.mjs`/`*.cjs` script or npm task created or overwrote any variant HTML or CSS.
- Automation was used for **read-only HTML/CSS QA and data-file accounting**, not page authorship: Python `html.parser`, `node --check`, link resolution, jsdom execution/interactions and real Chromium rendering/workflows. QA scripts remained outside the deliverable and did not generate or mass-overwrite variant HTML or CSS. The earlier hand-directed link corrections are itemised in §9.
- `manifest.json` and `audit.json` are **data** files assembled from the finished pages (titles, byte sizes, check output). They are not inputs to any page.
- Where a page started from a sibling, it was copied by hand and then redesigned — layout, section order, controls and copy all changed.

## 2. One colour scheme

- `shared/tokens.css` is the single source of colour. Every variant links it, then `shared/base.css` and `shared/kit.css`, then its own hand-authored `<style>` block; every variant also loads `shared/kit.js`. The gallery uses the same three shared stylesheets and kit runtime.
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
- **F15 keeps absence explicit.** V1 uses the verified HDFC card ending 4242 (expiry 09/2028) and derives its ₹81,500 method split from the seven settled F14 rows: UPI ₹64,340, bank ₹14,400, card ₹2,760. UPI and bank-transfer slots remain visibly unsaved. Additional method arrangements in V2–V5 are pattern examples and must retain their visible example/local labels rather than implying newly captured account data.

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
| D3 | Server-synced saved views / saved filters | F05, F10, F14 | the preferences endpoint covers notification prefs only; browser-local views are separate and real (§6a) |
| D4 | Combined statement of account / GST summary PDF | F14, F18 | only per-invoice PDF download exists; F18 V2 says so in a toast |
| D5 | UPI mandate / auto-pay management | F15 | Razorpay-hosted, no API surface |
| D6 | Typing indicator, read receipts, SLA timer | F13 | no endpoint; websocket health only |
| D7 | PWA install row | F03 | platform UI, shown as a setting row |
| D8 | Skills autocomplete taxonomy | F20 | free-text `skills[]` only |
| D9 | "Open support thread" from an error card | F08, F09 | composes `POST /messages/threads/direct`; copy is seeded |
| D10 | Quote negotiation *chat* | F11 | real path is `POST /quotes/{id}/request-changes`; the chat presentation is illustrative |

Every other CTA resolves to an endpoint listed in `docs/API-MAP.md`, to another page in the lab, or to an explicitly labelled local/demo behavior in §6a.

### 6a. Functional browser-local conveniences

These features are real within the static lab but make no server/sync claim:

- **Workbench saved views:** stored under a path-specific `localStorage` key on the 24 compatible collection pages; the UI says “Local views” and save/apply feedback says “on this device.” Search, facets, sort, grouping, density, selection and comparison operate on the records already loaded in the HTML.
- **CSV export:** generated from the current local selection as a browser Blob/download. No export endpoint or background job is implied.
- **F06 drafts and quick-fill/category preferences:** explicit browser-local save/restore/clear controls. Drafts are never auto-submitted; selected files are never persisted with them.
- **F06/F16 file selection:** accepts only the user’s actual local files, with type/size validation and removal. File bytes stay in the page session; no upload, fabricated attachment or persistent File object is claimed.
- **Gallery comparison:** interactive local iframes with independent viewport/theme controls, preset and swap. It does not use screenshots or remote embeds.

## 7. States, themes, widths

- Each variant carries empty, skeleton and error treatments drawn in its own layout — not a shared grey box pasted at the bottom. Files: `F22` upload states, `F08` degraded project list, `F19` empty queue, `F23` no-results, `F07`/`F11` expired quote.
- Light and dark both come from the same tokens; the boot script resolves `?theme=` → `localStorage['nl-theme']` → `prefers-color-scheme`, so a page never flashes the wrong theme.
- Layouts are designed for 360px–1440px. The final rendered matrix exercises 375px and 1440px in light and dark; bounded table scrollers, stacked message/split panes and shrinking grid tracks are implemented in the relevant page/shared media queries.
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
4. Two anchors used a data-attribute as `href` (`F01` V3 "Change", `F02` V4 "Forgot password") → `href="#"` with the existing handlers already calling `preventDefault()`. *(Superseded by §9a: both are now real `<button>` elements.)*
5. `F16` V2 had no gallery link; `F04` V4 had no variant segment → both added.
6. `F10` V1–V5 gained the visible data-honesty note described in §4.

## 9a. Second correction pass — format, structure and placement

A later audit of all 116 pages for *format* defects (heading levels, dead links, broken references,
invalid nesting, content rendering in the wrong place) changed 32 files. The full itemised list, the
verification run and its limitation are in **`CORRECTION-PASS.md`**. Summary:

- one `h1` per page (8 files had zero or several);
- 51 `href="#"` dead links replaced with real controls — buttons where the link was an action, and
  `?open=<slug>` deep links (honoured on load) where the link wrapped block content;
- fixed three pages whose list rows and preview targets shared the same `data-*` names, which made the
  first row's contents get overwritten at runtime (F04-V3, F08-V3) and the preview read from the header
  toolbar (F05-V3/F08-V3/F10-V3);
- renamed component row classes `.row` → `.rrow`/`.prow`/`.qrow` so they no longer collide with the
  `.row` flex utility in `base.css`;
- repaired 15 broken `aria-*`/`<label for>`/anchor references (F09-V1, F21-V2);
- replaced block elements nested inside `<button>` with span equivalents (F08-V4, F21-V3, F23-V3, F23-V4);
- restored footer/honesty-note placement inside two-column grids (F08-V3, F09-V5, F10-V3);
- re-bound three filters whose `<select>` shared an attribute name with the data rows (F14-V4, F18-V1,
  F22-V2), verified by exercising them.

That correction pass was verified in jsdom. The current expansion has since been rechecked with static validation, jsdom and real Chromium; the current counts and the distinction between rendered checks and untested browsers are recorded in §10 and `audit.json`.

## 10. Verification and remaining boundaries

- **Static/source:** 116 files parsed; every inline script passed `node --check`; 2,200 internal links and all referenced local assets resolved; zero external style/script/image URLs or banned framework classes.
- **jsdom:** all 116 pages executed with zero captured runtime/fatal errors, duplicate IDs, broken ARIA/label references, dead `#` links or audited nested controls. Every page has one `h1` and a first-focusable skip link; every variant has all four shared kit imports. The gallery and 15 bespoke auth/search surfaces are the documented palette exceptions.
- **Real Chromium:** 464 combinations (116 pages × 375/1440px × light/dark) completed with zero flagged combinations. The gate covers visible right-edge clipping, unnamed buttons/form fields, invalid audited control nesting, one-H1/theme state, runtime/console errors, failed local assets and external requests. Intentional internal table scrollers and hidden off-canvas content are not false-counted as page overflow.
- **Driven workflows:** keyboard palette/focus recovery, workbench search/density/selection/compare, an actual CSV download, saved-view persistence, honest degraded Retry/support, F06 draft persistence without File persistence, F16 local proof selection, and live gallery iframe preset/swap/Escape behavior passed in Chromium. Focused jsdom suites also passed for all F06 drafts/attachments, all F16 checkout variants, workbench grouping/filtering/pruning and gallery filtering/comparison controls.
- **Boundary:** this is Chromium QA, not Firefox/WebKit certification, and there is no historical pixel-baseline/screenshot-diff claim. Source and behavior were checked; backend availability is not mocked into a success claim.
- Real Razorpay hand-off, server upload/sync and server-generated downloads remain simulated or browser-local as labelled. No page makes a network call. The live projects `502 origin_bad_gateway` and unread quotes endpoint remain honest constraints, not silently repaired data.

## 11. Expansion and reconciliation decisions

- The shared kit is a family-agnostic progressive layer, not a template generator. It adds chrome, overlay/state behavior and workbench controls only to compatible authored collections; bespoke statements, timelines, split options, direct-link rows and grouped ledgers retain their own semantics.
- The gallery owns a hand-authored 115-variant axis map; manifest data is not needed at runtime. Search, domain/axis filters and side-by-side live comparison are local and work without a build step.
- Final source-of-truth reconciliation renamed gallery/concept entries to the upgraded variant titles and corrected F14-V1 to seven settled payments plus two open records. F15-V1 now uses the F14-derived split **₹64,340 UPI + ₹14,400 bank + ₹2,760 card = ₹81,500**, 79/18/3 percent bars, three UPI payments, and the verified 09/2028 card expiry.
