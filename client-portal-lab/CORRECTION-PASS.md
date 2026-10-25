# CORRECTION PASS — HTML format, structure and placement audit

A second audit of all **116** pages in `client-portal-lab/` (115 variants + gallery), run after the
initial build, looking specifically for *format* defects: wrong heading levels, dead links, broken
references, invalid nesting, and content rendered in the wrong place. Every fix below was a targeted
in-place edit; no page was regenerated and no generator script was used.

**32 of the 116 files were changed.** Result of the closing run:

| Check | Result |
|---|---|
| Runtime smoke — every page executed in a real DOM engine | 116/116 pages, **0 JavaScript errors** |
| Tag balance / stray / unclosed tags / duplicate `id` | **0 problems** |
| Exactly one `<h1>` per page | **116/116** |
| Internal links resolve on disk | **2008 checked, 0 missing** |
| `href="#"` dead links | **0** (was 51) |
| `aria-*` / `<label for>` / in-page anchor references | **0 broken** (was 15) |
| Block-level elements nested inside `<p>`/`<button>`/`<a>` | **0** (was 4 files) |
| CSS parse errors | **0** |
| Footer / note elements stranded in a multi-column grid | **0** (was 2) |

---

## 1. Heading structure — one `h1` per page

Corrected where a page had zero or several `h1` elements, which broke the document outline:

| File | Was | Fix |
|---|---|---|
| F01-V3 login (two-step) | 2 × `h1` (step 1 + step 2) | step 2 heading → `h2` |
| F02-V2 signup (3 beats) | 3 × `h1` | page `h1` + `h2` per beat |
| F02-V5 register/reset | 2 × `h1` (register + reset panels) | reset panel → `h2` |
| F04-V1 … V5 (search) | **no `h1` at all** | one screen-reader `h1` per page |
| F06-V2 stepper | 4 × `h1` | stable page `h1` + `h2` per step |
| F06-V5 conversation | no `h1` | screen-reader `h1` added |
| F07-V5 story | 7 × `h1` (one per chapter) | request title is the `h1`; chapters → `h2` |
| F08-V3, F10-V3 (split preview) | no `h1` | screen-reader `h1` added |

Visual weight is unchanged — the h2 elements carry the same class/selector, and the new `h1`s use the
existing `.sr-only` utility.

## 2. Dead `href="#"` links → real controls

- **F01-V3** "Change" (switch account) and **F02-V4** "Forgot your password?" were anchors pointing at
  `#`. They are actions, not navigation → converted to `<button type="button">`, styles kept by extending
  the existing selectors.
- **F16-V3 checkout** — four "Use card instead / send a bank transfer / Switch to UPI / Go back to UPI"
  anchors became buttons (the handler already called `preventDefault()`).
- **F17-V5** — "Receipt" and "Raise a dispute" became buttons.
- **F22-V5** — four generated-document links became buttons.
- **F23-V3** — "Save for later" is an action → button.
- **F23-V1/V2/V3/V5 (Explore)** — the post and portfolio links contain headings and block content, so
  converting them to buttons would have produced invalid HTML. They now point at a real, resolvable URL
  — `?open=<slug>` — which the existing handler intercepts. The parameter is also honoured **on load**,
  so a shared link opens that same entry instead of landing on a dead page. Slugs are derived from each
  entry's title (e.g. `?open=why-a-bank-transfer-shows-as-processing`).

## 3. Content that was being rendered in the wrong place

These are the serious ones — they corrupted the page at runtime:

1. **F08-V3 — the first project row was destroyed on load.** The preview panel's target attributes
   (`data-desc`, `data-kv`, `data-ms`) had the *same names* as the data carriers on the rows, and the rows
   come first in the DOM. So `document.querySelector('[data-desc]')` returned the **row itself** and
   overwrote its children with a plain string. Preview targets renamed to a `data-p-*` namespace
   (`data-p-desc`, `data-p-kv`, `data-p-ms`, `data-p-t`, `data-p-d`, `data-p-acts`), matching the
   convention already used by F05 and F10.
2. **F04-V3 — the first search result was destroyed on load.** Same cause: the preview breadcrumb
   `data-crumb` collided with the `data-crumb` carried by all ten result items → renamed to `data-pv-crumb`.
3. **F05-V3 / F08-V3 / F10-V3 — the row list included the header's toolbar.** These pages styled their
   data rows with `.row`, which is also a generic flex utility in `base.css`. The header's
   `<div class="row">` matched first, so the preview rendered from a button wrapper (and threw on
   `JSON.parse(undefined)`). Component class renamed to a unique name — `.rrow`, `.prow`, `.qrow` —
   in the CSS, the markup and the `querySelectorAll`.
4. **F21-V4 — a crash on the action-only row.** The settings loop assumed every `[data-row]` had a form
   control; the "Account deletion" row has only a status. Guarded with `if(!ctl||!st)return;`.
5. **Footers stranded in a two-column grid.** `F08-V3`, `F10-V3` and `F09-V5` placed their footer (and
   F10-V3's data-honesty note) as a direct child of a 2-column grid without spanning, so they sat under
   the left column only. Added `grid-column:1/-1`.

## 4. Broken references

- **F09-V1** — three "Review deliverable" links pointed at `#tab-deliverables`, an id that did not exist.
  Pointed at the actual Deliverables tabpanel (`#p3`), preserving the no-JS fallback.
- **F21-V2** — eleven `<label for="…">` elements referenced ids that did not exist. Single-switch rows now
  give the `<button role="switch">` the matching `id`; the six notification rows (three switches each)
  became a group label (`<span class="lbl" id="qN">` plus `role="group" aria-labelledby="qN"`); the
  non-interactive "This device" row became a plain `.lbl` span.

## 5. Invalid nesting (buttons containing block elements)

`<button>` accepts phrasing content only, so `<h2>`/`<p>`/`<div>` inside a card-as-button was invalid
HTML. The block elements were replaced with `span`-based equivalents and the selectors updated
(`display:block` added where the element needed it):

- **F08-V4** — `<h2>` inside `.tile` → `span.h2`
- **F21-V3** — six `<h2>` + six `<p>` inside `.tile` → `span.h2` / `span.p`
- **F23-V3** — `<p>` and `<div class="tags">` inside `.wcard` → `span.p` / `span.tags`
- **F23-V4** — nine cards: `div.ph`, `div.bd`, `<h2>`, `<p>`, `div.ft` → spans

The elements remain native buttons, so keyboard activation and focus behaviour are unchanged.

## 6. Filter controls bound to the wrong element (latent)

`F14-V4`, `F18-V1` and `F22-V2` selected their filter `<select>` with the same attribute name their data
rows used (`data-st`, `data-pj`, `data-status`, `data-type`). They worked only because the `<select>`
happened to precede the rows in the DOM. Renamed to an explicit `data-f-*` namespace so the binding can
no longer drift. Verified functionally: filtering 11→6, 5→3 and 9→2 rows respectively.

## 7. How this was verified

- **Real DOM execution of all 116 pages** (jsdom 30, with `matchMedia`, `IntersectionObserver`,
  `dialog` and clipboard polyfilled because jsdom lacks them): zero uncaught errors on load and after a
  theme-toggle and tab click on every page.
- **Functional interaction tests** on the changed pages: two-step login back-navigation, forgot-password,
  payment-method switching, receipt/dispute, document download, Explore feature swap + save, the
  `?open=` deep links, all three split-preview panes (correct preview text, rows intact), and the three
  re-bound filters.
- **Static validation**: tag balance, duplicate ids, heading count, on-disk link resolution, ARIA/label
  reference integrity, block-in-phrasing nesting, CSS parse, and grid-span placement.

### Honest limitation

**No real browser was available in this environment** (no Chrome/Chromium binary, and browser downloads
are blocked), so there was **no pixel-level visual inspection and no screenshot comparison** of the
rendered result. The checks above are DOM- and source-level. Anything that depends purely on visual
appearance — optical spacing, colour rendering, font loading — was **not** verified here and is still
unverified, exactly as recorded in `DECISIONS.md` §10 and `audit.json`.
