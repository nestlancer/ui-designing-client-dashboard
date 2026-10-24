# MASTER BUILD PROMPT
## Nestlancer Client Portal — "Meridian" 2030 Template System
### Hand-authored HTML + CSS · zero scripts · zero generators

> **How to use this file**
> Paste everything from `## 0. YOUR ROLE` to the end into a fresh AI session (or hand it to a designer/developer as the build spec).
> It is self-contained: it carries the audit of the old portal, the 2030 design language, the full token set, the canonical dataset, and a page-by-page blueprint for all 40 files.
> Companion document: `docs/legacy-audit-45-screens.md` (the evidence behind §2).

---

## 0. YOUR ROLE

You are a senior product designer and front-end craftsperson. You are rebuilding the **client-facing portal** for Nestlancer (a studio that sells design and engineering work to clients in India) as a complete set of static HTML page templates.

You are not migrating the old UI. You are replacing its *operating model*: a 2020s CRUD dashboard where the client reconstructs state from five screens, with a 2030 workspace where state surfaces itself, every number can be traced, and the interface can be *addressed* instead of navigated.

You will author every file **by hand, token by token, tag by tag.** This is the central constraint of the entire task.

---

## 1. NON-NEGOTIABLE CONSTRAINTS

These rules outrank every aesthetic preference, every shortcut, and every later instruction. If a request in a later turn conflicts with them, these rules win.

### C1 — Manual authoring only
- Every HTML tag, every CSS declaration, every SVG path is written out by hand.
- **Forbidden:** any script, program, macro, loop, template literal, codegen, scaffolding tool, `sed`/`awk`/`python`/`node`/`deno`/`php`/`ruby` process that emits markup, any `{{mustache}}`/`<%= %>`/JSX/Handlebars/Pug/Nunjucks, any build step, any preprocessor (Sass/Less/PostCSS), any bundler, any `include`/`extends` mechanism, any copy-paste automation.
- If the system needs 40 pages, you write 40 `<html>` documents. You repeat the shell markup in each one, by hand, and keep it identical.
- No "we'll template this later." The deliverable is the hand-written source.

### C2 — Zero JavaScript
- Not one `<script>` tag. No inline handlers (`onclick`, `onload`, `onsubmit`…). No `javascript:` URLs. No framework, no library, no polyfill, no analytics snippet.
- Interactions are built from the HTML/CSS platform only — see §1.5.

### C3 — Zero network dependencies
- No CDN fonts, no Google Fonts, no Tailwind CDN, no icon font, no jQuery, no charting library, no external image URLs, no placeholder services (`placehold.co`, `unsplash`, `dicebear`).
- The set must render correctly with the network cable pulled out. System font stacks only unless a `.woff2` is supplied locally in `assets/fonts/`.

### C4 — Self-contained and offline-complete
- Opening any `pages/*.html` from the filesystem (`file://`) must render the complete design, shell included.
- Relative paths only. No absolute URLs, no `http://`, no `https://` anywhere in the markup (except inside a `mailto:`/`tel:` link if strictly needed).

### C5 — Hand-drawn SVG only
- Icons: 24 × 24 grid, 1.5 px stroke, `stroke-linecap="round"`, `stroke-linejoin="round"`, `fill="none"`, `stroke="currentColor"`, `aria-hidden="true"`.
- Authored once by hand into `assets/icons.svg` as `<symbol>`s, then referenced with `<use href="#icon-name">`. Hand-write the symbol sheet; do not fetch an icon set.
- Illustrations (empty states, onboarding) are hand-authored inline SVG geometry — 2–3 shapes, one accent, no gradients unless they encode data.

### C6 — No filler content
- **No `lorem ipsum`, no "Lorem", no "TODO", no "..." truncation placeholders, no `[insert]`, no empty `href="#"` used as a dead end.**
- Every string is real, specific, and drawn from the canonical dataset in §8. Every page uses the *same* client, projects, amounts and dates, so the set reads as one product.
- No emoji anywhere. No stock photography. No generic AI-generated portraits: avatars are typographic initials on a deterministic tint of `--avatar-1…6`.

### C7 — Every page is complete
- Full document: `<!doctype html>`, `<html lang="en-IN">`, `<head>` with title + description + theme colour, skip link, `<header>`, `<nav>`, `<main id="main">`, `<footer>`.
- Never write "…rest of the page is similar" or abbreviate a repeated block. If a table needs 8 rows, type 8 rows.

### C8 — One visual system
- Every page consumes the same tokens and the same components. No page invents a local colour, radius, shadow, font size, or spacing value outside the token scale.
- Anything that must vary (chart bar width, progress value) uses a per-instance custom property, never a hard-coded colour or size.

### C9 — States are pages, not scripts
Because there is no JS, every meaningful state is its own hand-authored HTML file: `payment-pending.html`, `payment-not-due.html`, `payment-completed.html`, `quote-awaiting-signature.html`, `quote-accepted.html`, `states-empty.html`, `states-loading.html`, `states-error.html`, etc. Tabs, drawers and menus that would need JS are expressed with the CSS-only techniques in §1.5 and each demonstrable state gets a URL.

### C10 — No inline styles, with one exception
CSS lives in `assets/css/*.css`. The only permitted inline CSS is a data-bearing custom property on a chart/progress element, e.g. `style="--value:40"`. Even the `<svg>` presentation attributes should come from classes.

### C11 — Static, but not fake
- Do not simulate liveness you cannot deliver ("Live in 30s" counters, animated fake activity). If the design implies recency, express it as a truthful timestamp.
- Disabled/blocked controls must be `disabled` + explained inline, never a dead button that looks live.

### 1.5 — Allowed platform features (this is how you get interaction with no JS)

Use these deliberately, and note in a code comment which one each interactive block uses:

| Need | Technique |
|---|---|
| Menus, dropdowns, popovers, tooltips | `popover` attribute + `popovertarget` / `popovertargetaction` (HTML only) |
| Disclosure, FAQ, filters panel, inline detail | `<details>` / `<summary>` |
| Modal-ish sheet anchored to an element | CSS Anchor Positioning (`anchor-name`, `position-anchor`, `anchor()`) |
| Tab-like views | Radio + `:checked` sibling selectors, or `:has()` on a container |
| Theme switch (Paper / Night / High-contrast) | Three radios + `html:has(#theme-night:checked)` + `light-dark()` |
| Density switch (Comfortable / Compact) | Radio + `html:has(#density-compact:checked)` overriding `--row-h` |
| Focus mode (distraction-free) | Checkbox + `:has()` collapsing the rail and Now bar |
| Deep-linkable panels / drawers | `:target` on the drawer element |
| Overlay scrims | `dialog`-free: a `popover` with `::backdrop` |
| Page-to-page morph | `@view-transition { navigation: auto; }` + `view-transition-name` |
| Sticky table headers, list virtualisation feel | `position: sticky` inside a `max-block-size` scroller |
| Responsive components | Container queries (`@container`) |
| Theming maths | `color-mix()`, `oklch()`, `light-dark()` |
| Advanced fields | `field-sizing: content`, `:user-valid`, `:user-invalid` |
| Card/table reflow | `subgrid`, `grid-template-areas` |

Every non-trivial use of these earns a one-line HTML comment, e.g. `<!-- density: css-only via :has() on html, see tokens.css -->`.

---

## 2. WHAT EXISTS TODAY (the "before")

Read this as a list of things not to reproduce. Full evidence: `docs/legacy-audit-45-screens.md`.

**The shell:** 228 px sidebar with three collapsible groups (MAIN / EXPLORE / ACCOUNT) · 64 px top bar with a breadcrumb pill, centred search, theme toggle, messages icon, notification bell with badge, and an avatar menu · 32 px gutters · ~1140 px content width · a `© 2026 Nestlancer` footer on every page.

**The look:** `#F8F9FB` page, white cards with 1 px `#E5E7EB` borders and 12 px radii, near-black headings, `#6B7280` body, 11 px uppercase micro-labels, soft-tinted status pills, one barely-visible shadow. Primary colour: indigo. Type: 14 px sans for UI, a transitional serif for detail-page H1s — inconsistently applied.

**The screens:** dashboard (5 vitals + pulse + awaitings + workbench queue + activity) · Work Hub / Requests / Projects (three overlapping destinations for the same job) · Projects list and a 6-tab project detail (Overview, Progress, Milestones, Deliverables, Messages, Files) · Quotes list and detail · Billing, Invoices, Payment details (4 states), Payment methods · Messages (index, 3-pane workspace, thread, new message, members, edit) · Notifications · Profile + edit · Settings (Account, Security, Notifications, Files, Activity) · global ⌘K palette · files library (grid/list/preview/actions).

**Concretely broken — do not carry any of this forward:**
1. Five chrome layers before any content; the footer is inside the scroll area.
2. Single-record pages that are 70 % empty (Invoices with 3 rows; Projects with 1 card).
3. Contradictory states: a payment that is simultaneously "Not due yet" and "Pending"; "Issued" vs "Completed" for the same object.
4. Raw UUIDs shown to humans (`0a1a0a2c-530e-…`).
5. Progress maths that disagrees with itself ("40 % complete", "2/2 milestones", "1/1 deliverables").
6. An ungrouped 40-row notification firehose, every row stamped "5 days ago".
7. Toast-only confirmation ("Signed in") with no persistent state.
8. A decorative "AI" chip in the avatar cluster — zero actual assistance.
9. Settings save bar overlapping content; danger zone unreachable.
10. No dark theme despite a toggle; no mobile design anywhere.

**Keep:** the feather mark + `Nestlancer.` wordmark; a serif voice for project and quote titles; ₹-first commerce (lakh grouping, GST line, UPI/UTR, Razorpay trust block); and above all the **milestone ⟷ payment ledger** with its vertical rail.

---

## 3. THE 2030 THESIS

> **2030 does not mean neon. It means the software stopped asking the client to do the system's work.**

Three claims the design must prove, on screen, without explanation:

**3.1 Ambient.** State is visible before it is searched. The client should never have to open three screens to learn one fact. One persistent strip answers *"what is true right now, and what does it cost me if I ignore it?"*

**3.2 Composed.** One screen, one decision. Every page has exactly one recommended next action, visually ranked above everything else. Everything else is evidence, folded away until asked for.

**3.3 Addressable.** Navigation is a fallback, not the primary mode. The client types what they want ("pay the LMS milestone", "why is this invoice 52,200", "who approved the deliverable") into one surface that answers *and* cites.

### Design principles (enforce, don't decorate)

| # | Principle | Concrete enforcement in this build |
|---|---|---|
| P1 | **State before navigation** | A Now bar on every page; a State ribbon above content when something is blocked or due |
| P2 | **One primary action per page** | Exactly one `.btn--primary` per viewport; a second primary is a bug |
| P3 | **Every number is a door** | Money, percentage and count are always links to their ledger/evidence drawer or page |
| P4 | **Provenance or it didn't happen** | Any derived value carries a "why" affordance: source object, actor, timestamp |
| P5 | **Density is a user right** | Comfortable ↔ Compact switch, CSS-only, persisted per page state |
| P6 | **Quiet by default, loud on exception** | Colour is a signal, not a surface. At most 3 chromatic events on any screen |
| P7 | **Craft over chrome** | Hairlines and type hierarchy instead of borders, shadows and containers |
| P8 | **Consent-gated assistance** | AI proposes, cites, and is undoable. It never silently mutates money, contracts, or state |

---

## 4. DESIGN LANGUAGE — "MERIDIAN"

### 4.1 Art direction

Think **an instrument panel drawn by a book designer.** The reference set is Swiss editorial grids, banking ledgers, aviation annunciator panels, Japanese stationery, and a well-set annual report — *not* sci-fi HUDs.

- **Material:** paper and ink. A warm off-white base, near-black type, one-hairline structure. A single "lift" layer for things that genuinely float (palette, drawer, sheet). No glass, no blur, no frosted scrim, no neon glow, no 3D bevels, no wireframe-grid backgrounds.
- **Texture:** an optional 1.5 % paper grain as an inline SVG data-URI on `body::before`, `prefers-reduced-transparency` respected. No noise on dark.
- **Colour:** near-monochrome, with **one** interactive accent (Iris) reserved for links, focus, and the assistant. Primary CTAs are **ink-black pills**, not blue. Semantics (Moss / Amber / Clay) appear only as text, 2 px marks, and 8 % washes — never as filled buttons.
- **Type:** a serif for *editorial objects* (project name, quote title, page title on focus screens), a neutral grotesque for UI, and a monospace for anything a human might reconcile: amounts, IDs, timestamps, percentages.
- **Space:** generous but rhythmic. Section gaps step 24 → 40 → 72. Never more than two container levels deep; a card inside a card is a defect.
- **Motion:** 120–260 ms, one easing curve, transforms and opacity only. Content never bounces. `prefers-reduced-motion` collapses everything to 0 ms.
- **Feel:** expensive, unhurried, legible. It should look like it was set, not generated.

### 4.2 The five signatures

These are the things a reviewer should recognise at a glance, on any page:

1. **The Now bar** — a 52 px strip under the top bar: today's date · what is due · the next deadline · a quiet system status. Collapsible. It is the ambient layer that replaces dashboard-hunting.
2. **The Ledger** — money is never a bare number. Every amount is a five-part artefact: `₹ amount` (mono, tabular) · currency · state · the object it belongs to · an evidence affordance. Used in tables, cards, drawer, checkout.
3. **The Rail** — the vertical milestone/timeline rail, promoted from a buried project tab to the spine of the commercial experience. Nodes are 18 px, connected by a 1 px hairline, each with a state, a date, and a receipt.
4. **The Evidence drawer** — any figure, status or approval can open a right-hand 480 px drawer showing the chain: which document, which actor, which timestamp, which policy. This is how trust is designed, not claimed.
5. **The Navigator** — the assistant, present as a slim command surface rather than a chat sidebar. It answers with *provenance chips* and an *agent log* of what it did and what it wants permission to do. It never occupies more than 420 px and never floats over content uninvited.

### 4.3 What "2030" must NOT look like

Explicitly banned, no exceptions: glassmorphism cards, frosted panels over blurred photos, neon/electric gradients, purple-to-pink mesh backgrounds, giant glowing orbs, holographic chrome, "AI sparkle" ✨ iconography, dark-mode-as-default, token-styled "cyber" monospace everywhere, 3D isometric illustrations, floating rounded pills for everything, animated gradient borders, and any decoration that does not carry information.

---

## 5. TOKENS

Author these into `assets/css/tokens.css`, inside `@layer tokens`. Nothing in the build may use a raw hex value outside this file. Use `oklch()` where a perceptual step is needed, `color-mix()` for washes, `light-dark()` for theme-aware pairs.

### 5.1 Colour — Paper (light, default)

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F6F4EF` | app background |
| `--surface` | `#FFFFFF` | cards, tables, sheets |
| `--surface-2` | `#FBFAF7` | secondary blocks, table head, code |
| `--canvas` | `#EDE9E0` | recessed zones, rails, wells |
| `--ink` | `#14120E` | primary text, ink CTAs |
| `--ink-2` | `#4E4941` | secondary text |
| `--ink-3` | `#77726A` | tertiary text, meta (≥4.6:1 on `--paper`) |
| `--ink-4` | `#9A948A` | decorative only, never text |
| `--line` | `rgba(20,18,14,.12)` | hairline |
| `--line-strong` | `rgba(20,18,14,.24)` | emphasised hairline, table head rule |
| `--iris` | `#3A2FE0` | links, focus, assistant, interactive accent |
| `--iris-ink` | `#241C9E` | hover/pressed accent |
| `--iris-wash` | `color-mix(in oklab, var(--iris) 8%, var(--surface))` | selected rows, AI surface |
| `--moss` | `#1F6B4A` | success / paid / approved |
| `--amber` | `#8F5600` | pending / due / attention |
| `--clay` | `#A8321F` | danger / declined / overdue |
| `--sky` | `#12587A` | informational / in progress |
| `--focus` | `var(--iris)` | focus ring |
| `--avatar-1…6` | six `oklch()` tints at L .88 C .05 | deterministic initials |

State washes are always `color-mix(in oklab, var(--tone) 10%, var(--surface))` — never a hard-coded pastel.

### 5.2 Colour — Night (dark)

| Token | Value |
|---|---|
| `--paper` | `#0C0B09` |
| `--surface` | `#151310` |
| `--surface-2` | `#1B1916` |
| `--canvas` | `#100F0C` |
| `--ink` | `#F2EFE8` |
| `--ink-2` | `#BDB6AA` |
| `--ink-3` | `#8E887D` |
| `--line` | `rgba(242,239,232,.14)` |
| `--iris` | `#9C93FF` |
| `--moss` | `#6FD3A4` |
| `--amber` | `#F0B357` |
| `--clay` | `#FF8B78` |
| `--sky` | `#7FC8E8` |

Dark mode is a **designed** theme, not an inversion: reduce border contrast, keep the ink-on-ink CTA as `--ink` on `--paper`, drop the grain, and never re-tint status text to reach contrast by desaturating the hue.

A third theme, `--theme-contrast`, sets `--ink` to pure black/white, `--line` to 0.4 alpha, and removes all washes.

### 5.3 Typography

```
--font-display: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Palatino, Georgia, "Times New Roman", serif;
--font-ui: ui-sans-serif, -apple-system, "Segoe UI Variable Text", "Segoe UI", Inter, "Helvetica Neue", Arial, sans-serif;
--font-mono: ui-monospace, "SF Mono", "JetBrains Mono", "Cascadia Mono", Menlo, Consolas, monospace;
```

| Role | Size / line | Weight | Family | Tracking |
|---|---|---|---|---|
| `--t-display` (focus screens) | 46 / 1.06 | 400 | display | −0.02em |
| `--t-h1` (page title) | 34 / 1.12 | 400 | display | −0.015em |
| `--t-h2` (section) | 20 / 1.3 | 600 | ui | −0.01em |
| `--t-h3` (card title) | 15 / 1.4 | 600 | ui | 0 |
| `--t-lead` | 16 / 1.55 | 400 | ui | 0 |
| `--t-body` | 14 / 1.55 | 400 | ui | 0 |
| `--t-sm` | 13 / 1.45 | 400 | ui | 0 |
| `--t-micro` | 11 / 1.4 | 600 | ui | +0.07em, uppercase |
| `--t-money` | 15 / 1.3 | 500 | mono | −0.01em, `font-variant-numeric: tabular-nums` |
| `--t-money-lg` | 34 / 1.1 | 500 | mono | −0.02em |
| `--t-id` | 12 / 1.4 | 400 | mono | +0.01em |

Rules: `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs. `font-optical-sizing: auto`. Body measure capped at 68 ch. Never centre a paragraph longer than two lines. Never use the serif below 20 px.

### 5.4 Space, shape, depth, motion

```
--s-1: 4px;  --s-2: 8px;  --s-3: 12px; --s-4: 16px; --s-5: 20px;
--s-6: 24px; --s-8: 32px; --s-10: 40px; --s-14: 56px; --s-18: 72px; --s-24: 96px;

--r-xs: 6px;  --r-sm: 8px;  --r-md: 12px; --r-lg: 16px; --r-xl: 24px; --r-pill: 999px;

--hair: 1px solid var(--line);
--lift-1: 0 1px 2px rgba(20,18,14,.06);
--lift-2: 0 18px 40px -24px rgba(20,18,14,.30);
--lift-3: 0 40px 80px -40px rgba(20,18,14,.45);

--dur-1: 120ms; --dur-2: 180ms; --dur-3: 260ms;
--ease: cubic-bezier(.2,.7,.2,1);
--ease-exit: cubic-bezier(.4,0,1,1);
```

Row height is tokenised and density-aware: `--row-h: 52px` (comfortable) / `44px` (compact) / `60px` (touch).

### 5.5 Grid & breakpoints

12-column fluid grid. Container widths: `--w-shell: 1440px`, `--w-content: 1180px`, `--w-reading: 720px`.
Shell regions: rail `--rail: 76px` (icon+label on hover) · expanded `--rail-open: 268px` · drawer `--drawer: 480px` · Now bar `--now: 52px` · top bar `--top: 60px`.

| Name | Width | Behaviour |
|---|---|---|
| `compact` | < 640 | single column, bottom tab bar, sheets replace drawers, Now bar becomes a 1-line ticker |
| `medium` | 640–1023 | rail forced to icons, split views stack, tables hide columns 4+ |
| `wide` | 1024–1439 | rail + content, split canvas at ≥1180 |
| `ultra` | ≥1440 | rail + content + context column (320–360) |

Use `@container` for component-level reflow (stats, ledgers, message bubbles) and media queries only for the shell.

### 5.6 Chart palette

Maximum three hues per chart. Series order: `--ink` → `--iris` → `--moss`; anything pending uses `--amber`; anything failed uses `--clay`. Bars are 6–8 px, `border-radius: 2px`, track = `--line`. Sparklines are 1.5 px stroke, 28 × 72 px, no axes, no dots except the terminal one. Every chart has a text equivalent in `<figcaption>` or an adjacent `<dl>`.

---

## 6. COMPONENTS

Build these in `assets/css/components.css` under `@layer components`. Each entry: what it is, its anatomy, and the states it must visually cover.

**App rail** — 76 px, ink-on-paper, wordmark at top, 6 primary destinations + 3 secondary, a "Navigator" trigger at the bottom, an account cluster. Active item = 2 px left ink mark + ink text; item needing attention = 6 px Amber dot. Hover reveals the label in a small paper chip. Collapses to 0 under `compact`.

**Now bar** — 52 px. Left: `Tue 12 Feb 2030 · 09:41 IST`. Centre: 2–3 ambient facts as ledger fragments. Right: system status dot + "All systems normal" + a `<details>` for the long version. Collapsible via a hand-written checkbox. On `compact`, a single scrolling line.

**State ribbon** — full-width strip directly under the page title when one thing blocks progress. Ink background, paper text, one action, one dismissal. Maximum one per page.

**Page header** — optional eyebrow (max 3 words, sentence case, `--t-micro` but *not* as decoration — only when it names a real branch such as `Billing`), serif H1, one-line lead ≤ 96 characters, then a right-aligned action cluster with exactly one primary.

**Segmented control** — 32 px pills on `--canvas`, active pill is `--surface` + hairline + `--lift-1`. Used for All / Requests / Projects, and for Comfortable / Compact.

**Tabs** — 40 px, hairline underline, active = 2 px ink underline. Used only inside project detail and settings.

**Stat** — label (`--t-micro`) · value (`--t-money-lg` for money, 26 px ink for counts) · delta/context line · optional 28 px sparkline. Never more than 4 in a row; above 4, they become a ledger list.

**Ledger row** — the workhorse. 4 columns on wide: object (title + 12 px mono reference) · state pill · amount (`--t-money`, right-aligned) · action. Rows are 52/44 px, hairline separators, hover = `--surface-2`. Whole row is one link; the trailing action is a nested button with `pointer-events` isolation and an `aria-label`.

**Data table** — `<caption>` always; `<th scope="col">` always; sortable headers show a static chevron pair with `aria-sort` set to a real value; sticky head; zebra-free. Numbers right-aligned and tabular. Never more than 6 visible columns; the rest live in the row's evidence drawer.

**Timeline rail** — 18 px nodes: hollow (upcoming), ink-filled with check (done), pulsing ring (current, 2 s, disabled under reduced-motion), locked glyph (blocked). 1 px connector. Each node carries title, `Due 1 Mar 2030`, a state pill and a receipt link. This is the product's signature; make it beautiful.

**Status pill** — 24 px tall, `--r-pill`, 6 px dot + label, 12 px text, wash background. Five tones only: neutral (ink-3), moss, amber, clay, sky. Copy is fixed vocabulary (§13.4).

**Money block** — the Ledger primitive. `label` + amount in mono + `INR` + state + evidence link. Used everywhere money appears. Amounts ≥ 1 lakh use Indian grouping (`₹1,81,500`); totals show paise only in checkout and invoices (`₹52,200.00`).

**Evidence drawer** — 480 px right panel, `--surface`, `--lift-3`, hairline left edge. Header (object name + close), then a 3-part body: *What this is* (2 sentences), *Where it comes from* (a mini ledger of source rows), *Who and when* (actor, timestamp, policy reference). Opens via `:target` or `popover`. On `compact` it becomes a full-width sheet.

**Navigator (assistant)** — 420 px panel, `--iris-wash` surface, no bubble UI. Structure: an input row at top (always), then *Answer* (≤3 sentences, with provenance chips), then *Actions it can take* (each with an explicit "Ask me first" state), then *Agent log* (a 5-row mono list of what it did, each row undoable). Every assertion carries a chip like `Invoice NL-INV-2030-0004`. Never present an assistant message without a chip or an explicit "no source — a suggestion".

**Command palette** — 640 px `popover`, 44 px input, grouped results (Navigate / Act / Find), each row 40 px with title + `--t-id` hint, footer with keyboard legend. Must cover three states as three files/sections: default, with a query, and empty.

**Composer** — message input: 44 px min, grows with `field-sizing: content`, attachment affordance, send in ink. Shows mention chips, a 12 px "Sending…"/"Draft" status, and a visible "Edited 09:44" marker pattern.

**Uploader** — dashed `--line-strong` 1 px, `--canvas` at 40 %, 148 px tall, one line of instruction + accepted types + a 4 px quota meter below. Active/dragover state uses `--iris-wash` and a 2 px iris border.

**Empty state** — 3 shapes: a hand-drawn 64 px SVG, a 20 px sentence-case title, one line of explanation ≤ 90 characters, one action. Never an empty white box.

**Skeleton** — 3 bars, `--canvas` base with a 1.2 s `background-position` shimmer (removed under reduced-motion). Skeleton screens are their own file (`states-loading.html`), not overlays.

**Inline banner** — 44 px, 3 px left tone rule, 13 px text, one action, no close button unless it is genuinely dismissible with a checkbox.

**Field** — label above (13 px, 500), control 40 px, help text 12 px `--ink-3`, error 12 px `--clay` with a 2 px clay left rule and `aria-describedby`. `:user-invalid` styling only after interaction. Radios/checkboxes are 18 px, ink, never brand-coloured.

**Stepper** — 4 nodes for New request: numbered, hairline connectors, current node ink-filled. Also the payment state machine (Created → Pending → Processing → Completed; Refunded as a branch, not a fifth step).

**Trust block** — 56 px, hairline top, shield glyph + "Secured by Razorpay" + "256-bit TLS · PCI-DSS" + method chips. Present on every money screen, identical each time.

**Footer** — 56 px, outside `<main>`, `© 2030 Nestlancer` + three quiet links (Privacy, Terms, Status) + the build stamp `Meridian v1 · static templates`.

---

## 7. SIGNATURE PATTERNS

**7.1 Ambient → Focus → Evidence** (the primary loop)
Every page answers *what is happening* (Now bar) → *what to do* (one primary action, ranked) → *why* (evidence drawer). If a page cannot complete this loop in three interactions, it is not finished.

**7.2 The ledger spine**
On Project detail, the Milestones tab is the default tab — not Overview. The rail is the page's left spine at ≥1180 px, with the detail pane on the right. Money and delivery are the same object here; never split them into separate modules.

**7.3 Split canvas**
At ≥1180 px: list (360–420 px) + detail (fluid). At <1180: list, then detail as a full page. Applies to Quotes, Invoices, Requests, Messages, Files.

**7.4 Density switch**
Two labelled radios, wired with `:has()` to `--row-h`, `--s-4`→`--s-3`, and `--t-body`→`--t-sm`. Placed in the page header's overflow menu on every list page. State is visible in the URL as `#compact` so it is shareable.

**7.5 Provenance chips**
A 20 px chip: `Invoice NL-INV-2030-0004` with a hairline border and `--t-id`. Used inline after any claim in the Navigator, in the Evidence drawer header, and beside derived values (`40 % complete · 2 of 5 milestones`).

**7.6 Exception surface**
Anything overdue, disputed, or blocked gets: Clay 2 px left rule, a 12 px mono timestamp, and a single recovery action. Never a red screen, never a modal.

---

## 8. CANONICAL DATASET (use verbatim on every page)

One client, one world, one arithmetic. Do not invent new numbers; if a page needs a figure not listed here, derive it from these and keep the labelling consistent.

### 8.1 The account

| Field | Value |
|---|---|
| Organisation | Nair Learning Systems · Kochi, Kerala |
| Sector | EdTech / corporate learning |
| Signed-in user | **Priya Nair** — Head of Learning & Development |
| Email | `priya.nair@nairlearning.in` |
| Mobile | `+91 98950 11223` |
| Client ID | `NL-CLT-2029-0087` |
| Account manager | **Riya Kapoor**, Delivery Lead, Nestlancer |
| Delivery engineer | **Karthik Menon**, Nestlancer |
| Producer | **Meera Shah**, Nestlancer |
| Portal session | Tue 12 Feb 2030, 09:41 IST |
| Timezone | Asia/Kolkata (IST, UTC+05:30) |

### 8.2 Money, at a glance (must reconcile on the Overview)

| Bucket | Amount |
|---|---|
| Paid to date | **₹31,320.00** |
| Due now | **₹36,540.00** |
| Not yet due | **₹69,822.00** |
| Awaiting your signature | **₹1,80,540.00** |

Check: paid `15,660 + 15,660`; due `20,880 + 15,660`; not yet due `15,660 + 54,162`.

### 8.3 Projects

**P1 · Corporate LMS for 200 Employees** — `PRJ-2030-0011`
90-seat-to-200-seat corporate LMS: course builder with video modules, quiz engine with pass/fail thresholds, completion tracking, PDF certificates, SAML SSO via the client's Okta tenant, Malayalam subtitles on compliance courses.
Status **In progress** · progress **40 % (2 of 5 milestones)** · total **₹52,200.00** · started 18 Dec 2029 · target 5 Apr 2030.
Payment schedule: deposit ₹15,660.00 (30 %, paid) · mid-project ₹20,880.00 (40 %, **due 20 Feb 2030**) · final ₹15,660.00 (30 %, not due).

Milestones:
| # | Milestone | Due | Delivery | Payment |
|---|---|---|---|---|
| 1 | Deposit | 5 Dec 2029 | — | ₹15,660.00 **Paid** 12 Dec 2029 · `NL-RCPT-2029-0311` |
| 2 | LMS platform setup | 1 Feb 2030 | **Approved** 28 Jan 2030 | ₹20,880.00 **Due** 20 Feb 2030 |
| 3 | Course builder & video pipeline | 8 Mar 2030 | In progress · 60 % | ₹0 (covered by mid-project) |
| 4 | Okta SAML & HR dashboard | 22 Mar 2030 | Not started | ₹15,660.00 **Not due** |
| 5 | Launch & handover | 5 Apr 2030 | Not started | — |

**P2 · Malayalam–English Bilingual CMS** — `PRJ-2030-0019`
Editorial CMS with side-by-side Malayalam/English authoring, glossary enforcement, and a translation-status dashboard. Status **Awaiting signature** (cannot start) · total **₹1,80,540.00** · deposit ₹54,162.00 · start targeted 2 Mar 2030.

**P3 · Festive Season Campaign Landing Pages** — `PRJ-2029-0044`
Three campaign pages (Onam, Diwali, Christmas), Zoho CRM lead capture, GA4 event map. Status **Delivered** · progress **100 %** · total **₹31,320.00** · deposit ₹15,660.00 paid 4 Nov 2029 · final ₹15,660.00 **Due** 22 Feb 2030.

### 8.4 Requests

| Ref | Title | Stage | Detail |
|---|---|---|---|
| `NL-REQ-2030-0114` | Corporate LMS for 200 Employees | **Converted to project** | Submitted 3 Nov 2029 · became P1 |
| `NL-REQ-2030-0126` | Blockchain-based skill credential platform | **Under review** | Submitted 6 Feb 2030 · budget ₹35,00,000–₹50,00,000 · needs feasibility note by 18 Feb |
| `NL-REQ-2030-0129` | Malayalam–English bilingual CMS | **Quoted** | Submitted 21 Jan 2030 · quote `NL-QTE-2030-0051` awaiting signature |
| `NL-REQ-2030-0131` | Warehouse & fleet operations portal | **Declined** | 30 Jan 2030 · declined by client — "budget deferred to FY31" (show the reason, not just the pill) |

### 8.5 Quotes

**Q1 · `NL-QTE-2030-0042`** — Corporate LMS for 200 Employees — **Accepted & signed** 4 Dec 2029 · ₹52,200.00 · contract `NL-CTR-2029-0061` · signatory Priya Nair.
Line items: platform setup & course builder ₹16,800 · quiz engine, PDF certificates, Malayalam subtitles ₹16,800 · Okta SAML SSO & launch ₹8,400 · bilingual CMS add-on ₹6,000 · HR completion dashboard ₹4,200. Subtotal ₹52,200.00 · GST 18 % included · valid until 4 Dec 2030.

**Q2 · `NL-QTE-2030-0051`** — Malayalam–English Bilingual CMS — **Awaiting signature** · issued 9 Feb 2030 · expires **24 Feb 2030** (12 days).
Line items: bilingual editorial CMS ₹96,000 · glossary & terminology enforcement ₹28,000 · translation-status dashboard ₹18,000 · migration of 340 existing articles ₹11,000. Subtotal **₹1,53,000.00** · GST 18 % **₹27,540.00** · **Total ₹1,80,540.00**.
Schedule: deposit 30 % ₹54,162.00 on signature · mid 40 % ₹72,216.00 on CMS beta approval · final 30 % ₹54,162.00 on launch.
Signature block: legal name field, "I have read the service agreement" checkbox, `Accept quote & sign agreement` (disabled until both are satisfied, with the reason inline).

**Q3 · `NL-QTE-2030-0038`** — Warehouse & fleet operations portal — **Declined** 30 Jan 2030 · ₹19,800.00 · reason recorded: "Budget deferred to FY31. Please re-quote in June." Show a **Re-open quote** action so a decline is not a dead end.

### 8.6 Payments & invoices

| Ref | Object | Milestone | Amount | State | Dates |
|---|---|---|---|---|---|
| `PMT-2030-0207` | P1 LMS | Deposit | ₹15,660.00 | **Paid** | paid 12 Dec 2029 · ref `RZP-9F21A4` |
| `PMT-2030-0244` | P1 LMS | Mid-project | ₹20,880.00 | **Due** | created 10 Feb 2030 · due 20 Feb 2030 |
| `PMT-2030-0245` | P1 LMS | Final | ₹15,660.00 | **Not due** | unlocks on M4 approval |
| `PMT-2030-0239` | P3 Festive | Final | ₹15,660.00 | **Due** | due 22 Feb 2030 |
| `PMT-2030-0251` | P2 CMS | Deposit | ₹54,162.00 | **Blocked** | blocked by Q2 signature |

Invoices: `NL-INV-2030-0004` ₹15,660.00 **Paid** 12 Dec 2029 · `NL-INV-2030-0009` ₹20,880.00 **Issued** due 20 Feb 2030 · `NL-INV-2030-0011` ₹15,660.00 **Issued** due 22 Feb 2030 · `NL-INV-2029-0088` ₹15,660.00 **Paid** 4 Nov 2029.
Settlement account for bank/UPI: Nestlancer Pvt Ltd · HDFC Current `5020012345678` · IFSC `HDFC0001234` · UPI `nestlancer@hdfcbank` · primary settlement account.

### 8.7 Conversations

1. **`Payments ops — LMS settlement`** · GROUP (Priya, Riya, Karthik) · 3 unread of 11
2. **`Riya Kapoor`** · DIRECT · last message 2 days ago
3. **`LMS delivery — weekly`** · PROJECT (P1) · 4 members · quiet

Opening thread text (verbatim, use on `thread.html`):
- Riya Kapoor, 09:32: *"Priya — the mid-project invoice went out this morning for the platform setup milestone. It is due on 20 February. The delivery side is unaffected either way."*
- Priya Nair, 09:36: *"Thanks. I have it. Our finance team needs the GST breakdown on the PDF before they release it — is that on the invoice already?"*
- Karthik Menon, 09:38: *"It is. Subtotal, GST at 18 %, and the total are on page one. I can reissue with a purchase-order number if your AP team needs one."*
- Priya Nair, 09:41: *"No PO needed. I will settle it before the 20th."* (current user, last)

### 8.8 Notifications (12 rows, grouped — replace the old 40-row firehose)

Today · 12 Feb: *Payment due in 8 days* (₹20,880.00 · LMS mid-project) · *Quote expires in 12 days* (`NL-QTE-2030-0051`) · *Deliverable ready for review* (Course builder, milestone 3).
This week: *Invoice issued* `NL-INV-2030-0009` · *Message from Riya Kapoor* · *Milestone approved* (LMS platform setup) · *Request under review* (`NL-REQ-2030-0126`).
Earlier: *Payment received* ₹15,660.00 · *Quote accepted* `NL-QTE-2030-0042` · *Project created* from accepted quote · *Data export ready* · *New device signed in* (Chrome · Kochi).

### 8.9 Files (8 items, with provenance)

| Name | Type | Size | Origin |
|---|---|---|---|
| `nair-lms-course-builder-v2.zip` | archive | 18.4 MB | Deliverable · P1 · M3 |
| `nair-lms-platform-setup.pdf` | PDF | 2.1 MB | Deliverable · P1 · M2 · approved |
| `nair-lms-okta-saml-metadata.xml` | XML | 14 KB | Uploaded by Priya · 4 Feb 2030 |
| `nair-bilingual-cms-quote.pdf` | PDF | 240 KB | Quote `NL-QTE-2030-0051` |
| `nair-lms-mid-project-invoice.pdf` | PDF | 186 KB | Invoice `NL-INV-2030-0009` |
| `festive-campaign-final-assets.zip` | archive | 46.2 MB | Deliverable · P3 |
| `brand-tokens-2030.fig` | Figma | 8.7 MB | Shared by Nestlancer |
| `accessibility-audit-lms.pdf` | PDF | 1.4 MB | Deliverable · P1 · M2 |

Storage used: **184 MB of 5 GB**.

### 8.10 Microcopy rules

- Sentence case for everything except `--t-micro` labels, which are also sentence case (never ALL CAPS WORDS, only letter-spaced small text).
- No exclamation marks. No "Oops". No "Whoops". No emoji. No "Please" twice in one screen.
- Verbs are active and specific: "Pay ₹20,880", not "Continue". "Sign quote", not "Submit".
- Every destructive action names its object: "Decline quote NL-QTE-2030-0051", not "Decline".
- Errors state the cause and the fix in that order, ≤ 24 words.
- Relative dates (`2 days ago`) always sit next to an absolute one (`10 Feb 2030`). Never relative-only.
- Currency: `₹` with no space, Indian grouping, no paise in ledgers and tables, paise in checkout/invoice totals.
- Reference IDs are always set in `--t-id` mono and always paired with a human-readable name.

---

## 9. PAGE BLUEPRINTS

40 hand-authored HTML files. Build them in the batch order given in §17. For each page: **Job** (the one decision), **Shell** (which chrome), **Layout**, **Sections** (in reading order), **States**, **Done when**.

Vocabulary note — navigation is 6 items only: **Overview · Work · Money · Messages · Files · Account**. Everything the old portal split across Work Hub / Requests / Projects lives under **Work**; Billing / Invoices / Payments / Quotes live under **Money**; Profile / Settings / Security / Activity live under **Account**.

---

### A · System & shell

**`shell-reference.html`** — *Reference, not a product screen.*
**Job:** prove the chrome and every component in one place.
**Layout:** rail (76) + main column at `--w-content`. Sections: shell anatomy with labelled callouts (numbered 1–8 in `--t-id`), then the component gallery in the exact order of §6, each in a labelled frame showing default / hover / focus / disabled / error.
**Must include:** the Now bar in all three states, the density switch, the three theme states side by side (three nested scopes using a `.theme-night` / `.theme-contrast` class so all three are visible at once), and the token tables for colour and type rendered as live swatches.
**Done when:** a developer can build any page from this one file without asking a question.

**`index.html`** — *Launcher.*
**Job:** get a reviewer anywhere in 4 seconds.
**Layout:** single column, 3 grouped sections (Orientation, Work, Money, Conversation, Files, Account, States), each a list of 40 hairline rows: number, title, purpose (one line), and a state chip (`focus`, `dark`, `mobile`, `empty`). Header carries the wordmark, `Meridian v1`, `40 files`, and the density + theme switches.
**Done when:** every file in the set is linked exactly once, and the list reads like a table of contents, not a demo reel.

**`command-palette.html`** — *Overlay page.*
**Job:** search, navigate, and act from one surface.
**Layout:** the Overview rendered at 40 % opacity behind a paper scrim with a 3 px blur; centred 640 px panel, `--lift-3`.
**Sections:** 44 px input with placeholder `Search, or say what you need` · grouped results (`Navigate` 6, `Act` 4, `Find` 4) · footer legend (`↑↓ move · ↵ open · esc close`).
**Find results must be real objects:** `Invoice NL-INV-2030-0009 · ₹20,880.00 · due 20 Feb`, `Milestone 2 · LMS platform setup · approved`, `Riya Kapoor · delivery lead`, `nair-lms-course-builder-v2.zip · 18.4 MB`.
**States:** provide `default`, `query` and `no-results` as three sections on the page, each with a heading so a reviewer can see all three.
**Done when:** the palette proves it can reach money, a person, a file and an action — not just pages.

---

### B · Orientation

**`overview.html`** — the command surface.
**Job:** *"What needs me today, and what does it cost if I ignore it?"*
**Shell:** rail + Now bar + content, no drawer.
```
┌ rail │
       │ NOW BAR    Tue 12 Feb 2030 · 09:41 IST · ₹36,540 due · all systems normal
       ├──────────────────────────────────────────────────────────────────────────
       │ RIBBON     ₹36,540 is due in 10 days. Paying the LMS milestone releases
       │            the Okta build.                                  [ Pay ]  ✕
       ├──────────────────────────────────────────────────────────────────────────
       │ HEAD       Priya Nair / Overview                [ Pay ₹20,880 ]   Focus
       │            40 % delivered. One payment is holding the Okta build.
       ├──────────────────────────────────────────────────────────────────────────
       │ MONEY      Paid 31,320.00 · Due 36,540.00 · Later 69,822.00 · 1 unsigned
       ├───────────────────────────────────────────┬──────────────────────────────
       │ THE LEDGER (rail spine)                   │ NAVIGATOR
       │                                           │
       │  ✓  Deposit                  paid         │ "Pay the LMS milestone."
       │     12 Dec 2029 · receipt                 │  40 % of ₹52,200 is settled.
       │                                           │  [Invoice NL-INV-2030-0009]
       │  ◉  Platform setup        approved        │  [Milestone M2 · approved]
       │     ₹20,880.00 · due 20 Feb   [ Pay ]     │  [Policy · 30 / 40 / 30]
       │                                           │
       │  ○  Course builder           8 Mar        │  Agent log
       │  ○  Okta SAML               22 Mar        │  · drafted this summary    ↩
       │  ○  Launch                   5 Apr        │  · matched invoice to M2
       ├───────────────────────────────────────────┴──────────────────────────────
       │ NEEDS YOU  3 rows · pay ₹20,880 · sign NL-QTE-2030-0051 · review file
       ├──────────────────────────────────────────────────────────────────────────
       │ RECENT     6 one-line rows · absolute + relative time · one link each
```
**Sections:** 1) Now bar. 2) State ribbon: *"₹36,540 is due in the next 10 days. Paying the LMS milestone releases the Okta build."* with `Pay` and a dismissal checkbox. 3) Header: eyebrow `Tuesday 12 February`, serif H1 `Overview`, lead *"Two payments and one signature are open. Everything else is on schedule."*, primary `Pay ₹20,880`, secondary `Focus`. 4) **Ledger strip** — 3 money blocks + 1 signature block, each a link. 5) **The spine** — 5 milestone nodes with the mid-project node in the `due` state carrying the only primary button on the page. 6) **Needs you** — exactly 3 rows: pay, sign, review. Each row: object, why, time left, one action. 7) **Navigator pane** — pre-loaded answer to *"Why is ₹20,880 due?"* with 3 provenance chips and an agent log of 2 entries, one undoable.
**States:** this file is the populated state; `overview-focus.html` is the focus state; `overview-night.html` is the dark state; the blocked ribbon variant is demonstrated on `payment-not-due.html`.
**Done when:** a client can settle their whole week from this page in under 30 seconds, and the money strip reconciles with §8.2.

**`overview-focus.html`** — focus mode.
**Job:** one task, nothing else.
**Layout:** rail and Now bar collapsed (CSS-only via the focus checkbox), 720 px centred column, one milestone card, the amount, the evidence link, the pay action, and a `Leave focus` control. Everything else is absent from the DOM, not merely hidden.
**Done when:** the page contains exactly one button and one link.

**`notifications.html`**
**Job:** triage, not scrolling.
**Layout:** reading column `--w-content`; grouped by day with sticky `Today / This week / Earlier` headers; 12 rows; each row = tone dot + title (15 px, 500) + one-line context + object chip + timestamp + an inline action.
**Sections:** header with `Mark all read` (secondary) and filter chips (All · Money · Work · Messages · Account) as CSS-only radio tabs · grouped list · a right-hand 300 px "Delivery" card linking to Settings → Notifications and showing the current channel matrix in miniature.
**States:** `All` popover demonstrates the empty variant with copy *"Nothing unread. The last 30 days are below."*
**Done when:** 12 rows scan in one screen at 1440 × 900, and no row's timestamp is ambiguous.

---

### C · Work

**`work-hub.html`** — one destination for requests and projects.
**Job:** *"Where is my work, and what is the next move on each?"*
**Layout:** header + 4-up stat ledger + segmented control (`All · Requests 4 · Projects 3`) + filter row (status `<details>`, search field, density switch) + ledger list.
**Sections:** each row is a `Ledger row`: title (serif, 17 px), `Request · Custom · submitted 6 Feb 2030` in `--t-sm`, state pill, next-action hint (`Needs your go-ahead`), amount if commercial, chevron. Requests and projects share one row grammar; the only difference is the object chip.
**States:** `All` (7 rows), `Requests` (4), `Projects` (3), plus an empty-filter result. Show the Declined row with its **recorded reason** and a `Re-open` action.
**Done when:** no row requires opening the record to know what to do next.

**`request-new.html`** — 4-step brief.
**Job:** capture a brief without a wall of fields.
**Layout:** 720 px column + a sticky 260 px summary card (`What happens next`: review in 2 working days · indicative range · your account manager). Stepper: `Brief → Budget → Timeline → Review`. Each step is its own `<section>` with a heading; the whole form is one page with anchors (no JS), and the stepper links to `#step-1…4`.
**Fields:** title · description (`field-sizing: content`, min 5 rows) · category (radio cards, 6 options, not a select) · budget min/max with `₹` prefix and a "Not sure yet" radio that reveals the range hint · preferred start / deadline (native date inputs) · requirements (repeatable-looking textarea with 3 example chips) · attachments (uploader).
**Sidebar:** `Draft saved 09:41` with a mono timestamp · `Cancel` · `Save draft` (secondary) · `Review brief` (primary).
**Done when:** every field has visible help, the primary is unreachable-looking-valid, and the page explains what happens after submit.

**`request-detail.html`**
**Job:** decide whether the brief is understood, and see its whole life.
**Layout:** split canvas at ≥1180 (main 720 + aside 320); mobile stacks.
**Sections:** header (ref in mono, serif title, stage pill) · **Brief** (description, budget, timeline, category) · **Requirements** as a 2-column definition list, not chips · **Attachments** (2 files) · **Status history** as the Rail: 6 nodes, each with actor and absolute + relative time, and the redundant repeats from the old design collapsed into one node per transition. Aside: linked quote card (amount + `Awaiting signature` + `Review quote`), `Your next move` card, and `Who is on this` (Riya, avatar stack).
**Done when:** the history has no duplicate nodes and every node names an actor.

**`projects.html`**
**Job:** portfolio health in one glance.
**Layout:** 3-column card grid at ≥1180 (each card 340 × 220), 2 at medium, 1 at compact. No table.
**Card anatomy:** object chip + state pill · serif title (2 lines max) · a 4 px progress rule with `40 % · 2 of 5 milestones` · next date · amount due (Ledger fragment) · one action (`Open` or `Pay`). Hover lifts 1 px and reveals the evidence link.
**Sections:** header + `New request` primary · filter chips (All · In progress · Awaiting you · Delivered) · grid · a quiet `Archived (4)` `<details>`.
**States:** In progress ×1 (P1), Awaiting signature ×1 (P2), Delivered ×1 (P3) — exactly three, matching §8.3.
**Done when:** each card answers progress, next date, and money without a click.

**`project.html`** — project detail, **Milestones as the default tab**.
**Job:** *"What is delivered, what is paid, what unlocks next?"*
**Layout:** hero (serif H1, description, 2 pills) · progress row (`40 %` + a 4 px rule + `2 of 5 milestones` + `Next: mid-project payment`) · sticky tab bar (`Milestones · Progress · Deliverables · Files`) · then split: rail spine (360) + node detail (fluid).
```
┌ Milestones (default) ─────────────────────────────────────┐
│ progress rule  ████████░░░░░░  40 % · 2 of 5 · next: pay  │
│ ┌ rail ──────────┬ node detail ──────────────────────────┐ │
│ │ ● 1 Deposit    │ LMS platform setup                    │ │
│ │   paid 12 Dec  │ Delivery   ✓ Approved 28 Jan 2030     │ │
│ │ ◉ 2 Platform   │ Payment    ₹20,880.00 · due 20 Feb    │ │
│ │   setup ● due  │ [Pay ₹20,880] [Request a change]      │ │
│ │ ○ 3 Course...  │ Evidence: invoice, approval, reviewer │ │
│ │ ○ 4 Okta SAML  │ ─────────────────────────────────────  │ │
│ │ ○ 5 Launch     │ What was delivered  (3 bullets)        │ │
│ └────────────────┴───────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
```
**Sections:** 4 tabs (the contract and scope live on `quote-accepted.html`, not in a fifth tab) · rail with 5 nodes (paid / approved+due / in progress / not started / not started) · node detail for the selected node (delivery state, payment state, evidence list, actions) · `Request a change` opens the Evidence drawer pattern instead of a textarea-in-a-card.
**Done when:** delivery and payment for the same milestone are visible together, the 40 % is explained by "2 of 5", and only one node shows a primary action.

**`project-progress.html`**
**Job:** trust the work is moving, without meetings.
**Layout:** 720 + 320. Filter chips (`All · Milestones · Updates · Deliverables`) as CSS-only radios. Entries grouped by date with a sticky date header, each entry = type chip + title + 2-line body + actor + timestamp.
**Sections:** progress rule at top · timeline of 7 entries across 3 dates (mix approved / update / deliverable) · `Request a change` composer at the end (collapsed `<details>` by default) · aside: `Who is working on this` + `Cadence: weekly, Thursdays`.
**Done when:** every entry names an actor and a milestone, and nothing says "Daily update" twice in a row.

**`project-deliverables.html`**
**Job:** approve or reject, with evidence.
**Layout:** list of deliverables grouped by milestone; each row 96 px: icon, title, one-line description, version, size, `Preview` + `Download`, and the approval state with actor + timestamp.
**Sections:** M2 group with 2 deliverables (one approved, one in review) · M3 group with 1 (draft) · a `Review` action on the in-review item that opens the preview page.
**Done when:** an approval always shows who approved it and when.

**`project-files.html`**
**Job:** find the file, preview it, act on it.
**Layout:** toolbar (view toggle, search, type filter, upload) + 4-column grid at ≥1180 / 3 / 2 · each tile 220 × 180 with a type glyph, name (2-line clamp), `18.4 MB · 12 Feb 2030`, and provenance (`Deliverable · M3`). Hover reveals `Preview` + a `popover` action menu (`Download`, `Copy link`, `See evidence`).
**Done when:** provenance is visible on the tile itself, not only in a menu.

---

### D · Money

**`billing.html`** — the money centre.
**Job:** *"What do I owe, what did I pay, and can I prove it?"*
**Layout:** 4-up money ledger (Paid · Due now · Not yet due · In dispute ₹0) as one hairline-divided strip, not four cards · then **Open payments** (2 rows, primary actions) · then **Payment history** (5 rows, table) · then the trust block.
```
┌ Paid 31,320.00 │ Due 36,540.00 │ Later 69,822.00 │ Disputes 0 ┐
├───────────────────────────────────────────────────────────────┤
│ Open payments                                                  │
│ LMS mid-project      ₹20,880.00  due in 8 days   [Pay now →]   │
│ Festive final        ₹15,660.00  due in 10 days  [Pay now]     │
├───────────────────────────────────────────────────────────────┤
│ History  (Date · Object · Milestone · Amount · State · Doc)    │
│ 12 Dec 2029  LMS      Deposit    ₹15,660.00  Paid   Receipt    │
├───────────────────────────────────────────────────────────────┤
│ Secured by Razorpay · UPI · Cards · Netbanking · Wallets       │
└───────────────────────────────────────────────────────────────┘
```
**Sections:** ledger strip · open payments · history with sortable headers and a `<details>` filter panel · methods summary (saved: none — with a link) · trust block · `Statements` (a quiet link to download a FY-to-date statement).
**Done when:** the four ledger numbers reconcile with §8.2 and every history row links to its invoice.

**`payment-pending.html`** — checkout, online.
**Job:** pay ₹20,880 with no ambiguity about what it buys.
**Layout:** 2 columns (main 660 + aside 380). Main: order summary block (object, milestone, amount as `--t-money-lg`, currency, reference, created) · the payment method segmented control (`Pay online` / `Bank or UPI transfer`, linking to the sibling file) · primary `Proceed to secure payment` · the UPI-on-desktop explanation condensed to 2 sentences + 3 short bullets · `Invoice` and `Cancel payment` as secondary/danger-quiet.
**Aside:** the payment state machine (Created ✓ · Pending ● · Processing · Completed · Refunded as a branch), then Payment details (mono IDs with copy affordance), then `What this pays for` (a real sentence naming M2 and what it releases).
**Done when:** the amount appears exactly once as the hero, the state machine has exactly one current node, and `Cancel payment` is absent — this payment is not cancellable, so the control must not exist rather than sit there disabled.

**`payment-bank-transfer.html`**
**Job:** pay by NEFT/UPI and have it reconciled.
**Layout:** same 2-column shell; main swaps to the transfer instructions.
**Sections:** account block (bank, account name, number, IFSC, UPI) each with a copy affordance and mono type · a 1-line tip · UTR field (required) · amount field pre-filled and read-only with a lock glyph · notes · receipt uploader · `Submit for verification` primary · a 3-step "what happens next" list with a 24-hour expectation.
**Done when:** the reference the client must quote is also printed in the instructions, so nobody has to remember it.

**`payment-completed.html`**
**Job:** confirm, and leave a receipt.
**Layout:** 2 columns; main opens with a 3 px moss top rule and `Payment recorded 12 Dec 2029 · 14:22 IST` in mono, then the summary, then `Download receipt` / `Download invoice` as the primary pair.
**Done when:** there is no celebratory illustration, no confetti — just a clean record with two documents.

**`payment-not-due.html`**
**Job:** explain a locked state without frustrating.
**Layout:** 2 columns; a state ribbon at the top of main: *"This payment unlocks when Okta SAML is approved. Expected 22 March 2030."* · summary with the amount in `--ink-3` (not ink) · the state machine with one current node `Not due` · `Remind me` (secondary, additive) · no cancel action.
**Done when:** a locked payment contains zero disabled-looking-primary buttons and exactly one useful action.

**`payment-methods.html`**
**Job:** set up a faster next payment.
**Layout:** 720 column. `No saved methods` empty state with a hand-drawn card glyph, one sentence, and `Pay ₹20,880` as the action (not `Go to payments`).
**Sections:** empty state · `How methods are added` (3 numbered lines: complete a checkout → choose "save card" → it appears here) · trust block.
**Done when:** the empty state has a next action that is the actual next action.

**`invoices.html`**
**Job:** retrieve a document, or a year of them.
**Layout:** ledger table (Invoice · Object · Issued · Amount · State · Documents) 4 rows, tabular numerals, sticky head, `Download` + `View` per row. Footer row: `4 invoices · ₹67,860.00 billed · ₹31,320.00 settled`.
**Sections:** header + `Download all (PDF bundle)` secondary · filter `<details>` (year, state) · table · `Statements` note.
**Done when:** the footer totals reconcile and each row exposes both documents.

**`quotes.html`**
**Job:** find the quote that needs you.
**Layout:** ledger rows, 3 items. Header: `1 awaiting signature` as a state chip beside the H1.
**Sections:** segmented control (`Open · Signed · Declined`) · rows: title (serif), ref (mono), amount, state pill, expiry countdown for the open one (`Expires in 12 days`), one action.
**Done when:** the declined quote shows its recorded reason inline and offers a re-open path.

**`quote-awaiting-signature.html`**
**Job:** understand ₹1,80,540 and sign safely.
**Layout:** reading column 760 + aside 320 (sticky summary: total, validity, `Complete the signature to start`).
```
┌ Quote NL-QTE-2030-0051 · awaiting your signature · expires 24 Feb ┐
│ Malayalam–English Bilingual CMS                                    │
│ ─ Line items (5 rows)                    Subtotal   ₹1,53,000.00   │
│                                          GST 18 %     ₹27,540.00   │
│                                          Total     ₹1,80,540.00   │
│ ─ Payment schedule (3 rows, mono amounts, due triggers)            │
│ ─ Documents: quote PDF · service agreement (draft)                 │
│ ─ Accept & sign                                                    │
│   ☐ I have read the service agreement and the terms                │
│   Legal name [ Priya Nair            ]                             │
│   [ Sign quote ]  ← disabled until both, reason shown inline       │
│ ─ Terms (10 items, 13 px, numbered, with a "Show all" details)     │
└────────────────────────────────────────────────────────────────────┘
```
**Sections:** line items table with a totals block · payment schedule · documents · acceptance block (checkbox + legal name + disabled primary with an explicit reason line) · terms in `<details>` with the first 3 visible · aside summary.
**Done when:** the disabled button explains itself in 12 words, the totals reconcile, and the legal text is legible at 13 px with 1.6 line height.

**`quote-accepted.html`**
**Job:** see the contract, not a receipt.
**Sections:** accepted banner (moss 3 px rule, `Signed 4 Dec 2029 by Priya Nair`) · line items · schedule with paid/paid/due states against the ledger · service agreement block (contract ref, `Download signed agreement`, `View audit trail`) · related project link.
**Done when:** every schedule row links to its payment or invoice.

---

### E · Conversation

**`messages.html`**
**Job:** see which conversation needs a reply, and open it.
**Layout:** 3-region: compact thread list (360) + preview (fluid) + context (300, only at ≥1440). At <1180 the list is the page and the preview is its own route (`thread.html`).
**Sections:** header (`3 conversations · 3 unread`) · search field · filter chips (`All · Unread · Direct · Project`) · 3 thread rows (avatar stack, name, type chip, last line clamped to 1 line, unread dot, relative + absolute time) · empty preview pane with `Select a conversation` and a 2-line instruction · context column: `Who is in this thread` + `Response times` (Nestlancer replies within 1 working day · last reply 2 h).
**Done when:** the list is scannable at 3 rows with no wasted panel, and the preview pane never repeats list data.

**`thread.html`** — the messaging workspace, full page.
**Job:** read, reply, and attach — with the object in view.
**Layout:** 3-pane at ≥1440: rail-collapsed list 300 · thread 1fr · context 320. At 1180–1439: list 280 + thread. At <1180: thread only, with a back link.
```
┌ list 300 ─────┬ thread ──────────────────────┬ context 320 ──┐
│ Payments ops  │ Payments ops — LMS settlement│ About this     │
│ ● 3 unread    │ Group · 3 members · P1 LMS   │ Project  P1    │
│ Riya Kapoor   │ ────────────────────────────  │ Milestone  M2  │
│ LMS weekly    │ 09:32 Riya  (bubble)         │ Amount   20,880│
│               │ 09:36 Priya (bubble)         │ Files     2    │
│               │ 09:38 Karthik                │ ─────────────  │
│               │ 09:41 Priya  Sent ✓✓ 09:41   │ Search in thread│
│               ├──────────────────────────────┤                │
│               │ [Attach] Write a message… [→]│                │
└───────────────┴──────────────────────────────┴────────────────┘
```
**Sections:** day divider with an absolute date · 4 messages (own messages right-aligned in ink, others in surface with a hairline) · each message footer: name, time, `Sent`/`Read`, and on own messages `Edit` / `Delete` behind a `popover` · composer with attachment, mention chips, and a visible draft state · context column with the linked project, milestone, amount, files, and a search-in-thread field.
**Done when:** the thread is visibly connected to P1 and M2, and the composer shows an honest send state.

**`message-new.html`**
**Job:** start the right conversation, not a blank one.
**Layout:** 640 column.
**Sections:** 3 recipient cards (Your delivery lead · Nestlancer support · Start a project thread) as radios, each with a person, a response expectation, and a note · subject field · first message · attach · `Start conversation` primary with a disabled reason if no recipient is selected.
**Done when:** the client cannot accidentally message the wrong audience, and the response expectation is stated.

---

### F · Files

**`files.html`**
**Job:** the library, with provenance.
**Layout:** toolbar row (search, type filter `<details>`, view toggle, `Upload` primary) · quota meter (184 MB of 5 GB, 4 px) · grid/list toggle · `Generated documents` grouped by origin at the bottom.
**Sections:** 8 tiles/rows · grouped generated docs (invoices, receipts, contracts, quotes with mono refs) · empty folder state as a `<details>` example · uploader in a `popover` triggered by `Upload`.
**Done when:** every tile states where the file came from, and the list view is genuinely denser than the grid (44 px rows).

**`file-preview.html`**
**Job:** look at the document without leaving.
**Layout:** full-bleed paper sheet on a canvas background, 760 wide, page-1 mock of a real invoice (header, bill-to, line items, totals, footer) drawn in HTML — not an image. Left: 3 thumbnails. Top bar: name in mono, `Page 1 of 4`, `Download`, `Close`.
**Sections:** document mock with real numbers from §8.6 · metadata rail (origin, uploaded by, size, checksum line) · `Used in` links (invoice → payment → milestone).
**Done when:** the preview contains the actual document content, and closing returns to the exact file.

---

### G · Account

**`profile.html`**
**Job:** confirm identity and how the studio sees you.
**Layout:** 2 columns — 320 identity card (avatar 96, name, role, org, email, phone, `Edit profile` secondary) + 720 content (headline, bio, `Working with` people, `Preferences` summary with 3 rows linking to settings).
**Sections:** identity · about · who you work with · a 2-row `Account health` block (2FA on/off, active sessions) that links to Security.
**Done when:** no page half-empty — the right column is real content, not a dead zone.

**`profile-edit.html`**
**Job:** change details and know they saved.
**Layout:** 720 column, 4 field groups (Photo · Identity · About · Contact), sticky bottom action bar that never overlaps content (`padding-block-end` reserves its height).
**Sections:** each group in a hairline section (no cards inside cards) · `Save changes` primary, `Discard` secondary, and an inline `Last saved 09:41` state.
**Done when:** the save bar reserves space and the disabled/dirty states are honest.

**`settings-account.html`**
**Job:** privacy and data, without fear.
**Layout:** settings shell: H1 `Settings`, 4 tabs (Account · Security · Notifications · Activity), content 720, right 300 "Related" rail linking to Profile and Files.
**Sections:** privacy (visibility select, two toggles with explanations) · data (export: what it contains, how long, `Request export` — and an "Export ready" state) · danger zone separated by a 1 px clay rule, not a pink card, with a typed confirmation (`Type DELETE`) and a disabled reason.
**Done when:** the danger zone is fully visible without scrolling past a sticky bar, and every toggle explains its consequence.

**`settings-security.html`**
**Job:** make the account hard to take over.
**Sections:** password (3 fields + strength note) · two-factor (state `Not enabled`, 3 numbered steps, `Start setup` primary) · active sessions (8 rows with device glyph, browser, approximate location, IP in mono, last active, `This device` chip, `Sign out`) · `Sign out everywhere` in a `<details>` confirmation.
**Done when:** every session row is scannable by device first and IP second.

**`settings-notifications.html`**
**Job:** control the noise.
**Sections:** channels available (3 chips, push shown as `Not set up` with a link) · quiet hours (toggle + from/to/timezone, disabled until the toggle is on — visibly disabled with a reason) · the matrix (6 categories × 3 channels) rendered as a real `<table>` with `<th scope>`, 18 switches, each with an accessible name · footer: `Everything on` / `Only what's due` / `Everything off` presets.
**Done when:** the matrix is usable at 360 px (stack into 3 labelled rows per category), and the presets are one click.

**`settings-activity.html`**
**Job:** prove what happened to my account.
**Sections:** filter chips (All · Sign-ins · Money · Files · Settings) · grouped by date · 10 rows: event chip, sentence, actor, absolute time, and a `Details` link where evidence exists. Sign-in rows collapse into one expandable group ("14 sign-ins this month") with the exception rows (new device, new location) surfaced above it.
**Done when:** the page is 10 rows, not 50, and exceptions sit at the top.

---

### H · States, showcases

**`states-empty.html`** — 6 empty states in labelled frames: no requests, no invoices, no saved methods, no unread notifications, empty folder, no search results. Each: hand-drawn glyph, one-sentence title, one line of explanation, one action.
**`states-loading.html`** — the Overview and a ledger table as skeletons, plus a 400 ms-delayed-reveal rule documented in a note. Shimmer disabled under `prefers-reduced-motion`.
**`states-error.html`** — 4 exception surfaces: payment failed (Clay rule, cause, fix, `Try another method`), quote expired (`Re-request quote`), file too large (limit stated in MB), and a 404 with a real search field.
**`mobile-showcase.html`** — the Overview, Work hub and thread at 390 × 844 in three device frames drawn with CSS (hairline bezel, no shadows), plus a written note on what reflows and what is dropped. Bottom tab bar visible: Overview · Work · Money · Messages · Account.
**`overview-night.html`** — the Overview in Night theme, plus a 3-up theme comparison strip at the end so the reviewer sees Paper / Night / Contrast in one place.

---

## 10. STATE MATRIX

Every list page must demonstrate, somewhere in the set, these five states. Map them explicitly in the index:

| State | Where it lives | Rule |
|---|---|---|
| Populated | the page itself | Enough rows to prove the layout (3 minimum, 8 for tables) |
| Empty | `states-empty.html` + a `<details>` example on the page | Never a blank panel |
| Loading | `states-loading.html` | Skeleton mirrors the real layout's geometry |
| Error / exception | `states-error.html`, `payment-not-due.html` | Cause → fix → action, in that order |
| Permission / blocked | `payment-not-due.html`, P2 awaiting signature | Say what unlocks it and when |

Additional mandatory states: long content (a 3-line project title must not break a card), zero money (`₹0.00` renders as `₹0.00`, never blank), a declined object with its reason, a file over quota, and a form with 3 validation errors at once.

---

## 11. RESPONSIVE

| Region | ultra ≥1440 | wide 1024–1439 | medium 640–1023 | compact <640 |
|---|---|---|---|---|
| Rail | 76 + hover labels | 76 | 64 icon-only | hidden, bottom bar |
| Now bar | 3 facts + status | 2 facts | 1 fact | single-line ticker, 40 px |
| Content | content + 320 context | content | single column | single column, 16 px gutters |
| Split canvas | list + detail side by side | list + detail | list only | list, detail = new page |
| Tables | 6 columns | 4 columns (hide 5–6) | 3 columns, 2 rows-per-record | definition-list cards |
| Drawers | 480 right panel | 480 | full-width sheet | full-screen sheet |
| Type | as specified | −1 step on H1 only | H1 28, body 14 | H1 26, body 15, `--row-h: 60` |
| Actions | inline cluster | inline | one primary + overflow | sticky bottom bar |

Non-negotiables: no horizontal scrolling at 320 px except inside a designated table scroller with a visible fade; touch targets ≥ 44 px below 1024; the Now bar never pushes content below the fold on a 390 × 844 device; the composer stays reachable with the keyboard open (visual-viewport-safe with `padding-block-end: env(safe-area-inset-bottom)`).

---

## 12. ACCESSIBILITY

Target **WCAG 2.2 AA**, verified by hand-checking not by assertion.

- **Structure:** one `<h1>` per page; heading order never skips; `<header>`, `<nav aria-label>`, `<main id="main">`, `<footer>` on every page; skip link as the first focusable element; `aria-current="page"` on the active nav item.
- **Contrast:** body text ≥ 4.5:1; ≥ 3:1 for 20 px+ and for UI boundaries. `--ink-3` is the lightest permitted text. Status pills pair a dot with a label — never colour alone.
- **Focus:** one visible ring everywhere: `outline: 2px solid var(--focus); outline-offset: 2px;`. Never `outline: none` without an equal replacement. Focus states must be shown on the shell reference page.
- **Targets:** 24 × 24 minimum, 44 × 44 for anything on touch width. Icon-only buttons require `aria-label`; `title` is a tooltip, not a label.
- **Forms:** every input has a real `<label>`; help and error text wired with `aria-describedby`; errors use `role="alert"` only on submit; required fields marked in text, not by asterisk alone; disabled controls state why.
- **Tables:** `<caption>` (visually hidden if needed), `<th scope="col">`, `aria-sort` only when true, row headers where a row has a name.
- **Media/preferences:** respect `prefers-reduced-motion`, `prefers-contrast`, `prefers-reduced-transparency`, `forced-colors`; test `@media (forced-colors: active)` and add `forced-color-adjust` where a border would vanish.
- **Zoom:** usable at 200 % text zoom and at 400 % reflow with no loss of content or function.
- **Language:** `lang="en-IN"`; Malayalam strings wrapped in `lang="ml"`.
- **Static honesty:** where a control would need JS (e.g. real-time filtering), the template must present the *result state* as its own page/section and never a broken live control. Note this in an HTML comment.

---

## 13. CONTENT & TONE

**13.1 Voice.** A competent colleague: direct, calm, never chatty, never apologetic, never salesy. Short sentences. Verbs first. No hedging ("we may possibly"). No corporate filler ("leverage", "seamless", "empower").

**13.2 Length.** Page lead ≤ 96 characters. Section description ≤ 72. Table cell ≤ 60 before it needs a better column. Button ≤ 24.

**13.3 Numbers.** Never show a percentage without its basis (`40 % · 2 of 5 milestones`). Never show an amount without a state and an object. Never show a count without a scope (`3 unread`, not `3`).

**13.4 Status vocabulary — use these words only.**
`Draft` · `Submitted` · `Under review` · `Quoted` · `Awaiting signature` · `Accepted` · `Declined` · `Converted to project` · `Not started` · `In progress` · `In review` · `Approved` · `Delivered` · `Blocked` · `Not due` · `Due` · `Pending` · `Processing` · `Paid` · `Refunded` · `Disputed` · `Overdue` · `Archived`.
No synonyms. "Issued" is retired in favour of `Due` + invoice state; "Not due yet" becomes `Not due`.

**13.5 Dates.** Absolute in ledgers and tables (`20 Feb 2030`), relative in conversation and activity (`2 days ago`), both in the Now bar. Never a bare `5d`.

**13.6 Empty and error copy.** Title = the fact. Body = the fix. Action = the verb. Example: *"No saved methods. Add one during your next checkout — it takes one step, and you can remove it here later. [Pay ₹20,880]"*

---

## 14. FILE STRUCTURE & STANDARDS

```
/
├── index.html                       ← launcher / table of contents
├── pages/
│   ├── shell-reference.html
│   ├── command-palette.html
│   ├── overview.html
│   ├── overview-focus.html
│   ├── overview-night.html
│   ├── notifications.html
│   ├── work-hub.html
│   ├── request-new.html
│   ├── request-detail.html
│   ├── projects.html
│   ├── project.html
│   ├── project-progress.html
│   ├── project-deliverables.html
│   ├── project-files.html
│   ├── quotes.html
│   ├── quote-awaiting-signature.html
│   ├── quote-accepted.html
│   ├── billing.html
│   ├── payment-pending.html
│   ├── payment-bank-transfer.html
│   ├── payment-completed.html
│   ├── payment-not-due.html
│   ├── payment-methods.html
│   ├── invoices.html
│   ├── messages.html
│   ├── thread.html
│   ├── message-new.html
│   ├── files.html
│   ├── file-preview.html
│   ├── profile.html
│   ├── profile-edit.html
│   ├── settings-account.html
│   ├── settings-security.html
│   ├── settings-notifications.html
│   ├── settings-activity.html
│   ├── states-empty.html
│   ├── states-loading.html
│   ├── states-error.html
│   ├── mobile-showcase.html
│   └── README.md                    ← how to open, what is static, what is not built
├── assets/
│   ├── css/
│   │   ├── tokens.css               ← @layer tokens
│   │   ├── base.css                 ← reset, typography, a11y utilities
│   │   ├── layout.css               ← shell, grid, rail, now bar, breakpoints
│   │   ├── components.css           ← §6
│   │   └── pages.css                ← page-specific composition only
│   └── icons.svg                    ← hand-authored <symbol> sheet
└── docs/
    └── legacy-audit-45-screens.md
```

**Markup standards**
- Class naming: BEM-ish (`card`, `card__title`, `card--due`), no utility-class soup, no `!important` outside `@layer` resets.
- Every page's `<head>` links the five stylesheets in order; `@layer` order is declared once in `tokens.css` (`tokens, base, layout, components, pages, overrides`).
- Data attributes for state: `data-state="due"`, `data-tone="moss"`. No state encoded only in a class name that could be mistaken for styling.
- No nested `<div>` beyond the depth needed to express the layout; use semantic elements (`<article>`, `<section>`, `<dl>`, `<figure>`).
- Comments: one file header comment per page (`<!-- page: billing · batch 4 · links: overview, invoices, payment-pending -->`) and one comment per CSS-only interaction used.

**Quality budgets:** total CSS ≤ 120 KB unminified · no page > 40 KB of HTML · `icons.svg` ≤ 24 KB · fonts 0 (system stack) · zero images; all visual assets are SVG or CSS.

---

## 15. DEFINITION OF DONE

A page is finished only when **all** of these are true:

1. It opens from `file://` with no network and no console error.
2. It contains no `<script>`, no `on*` attribute, no external URL.
3. It uses only tokens — grep for `#` hex values and `px` inside `pages.css` returns nothing outside the token file.
4. Exactly one primary button in the viewport, and it is the page's stated next action.
5. The Now bar and rail are byte-identical to every other page (shell verified by copy-diff).
6. Money, dates and IDs match §8 exactly — no invented figures.
7. Every number and state has a provenance affordance (chip, link or drawer).
8. All interactive elements are reachable and operable by keyboard alone, with a visible focus ring.
9. It survives: 320 px, 768 px, 1440 px, 200 % text zoom.
10. It renders correctly in Paper, Night and Contrast (`html:has()` theme switch).
11. It renders correctly in Comfortable and Compact density.
12. The empty and error variants exist or are demonstrated in the same file.
13. Copy passes §13: no exclamation marks, no emoji, no filler, no duplicated words across adjacent rows.
14. Nothing is truncated without a full-value affordance (`title` or drawer).
15. A reviewer can state the page's single decision after 5 seconds of looking at it.

**Set-level done:**
- `index.html` links all 40 files, each with its purpose and its special state.
- One integrated review pass at 1440 px and 390 px across all pages, logged in a table with `page · issue · fixed?`.
- The full money arithmetic reconciles on Overview, Billing and Invoices.

---

## 16. ANTI-PATTERNS — forbidden on sight

1. Glassmorphism, backdrop blur on cards, frosted panels.
2. Neon, glow, gradient text, purple mesh backgrounds, orb decorations.
3. Emoji as icons; "✨ AI" anywhere.
4. A sparkle icon used instead of an explanation.
5. Card inside card inside card.
6. Every element with the same 12 px radius and 1 px border.
7. Drop shadow on flat content.
8. A dashboard made of six equal stat cards.
9. A percentage with no denominator.
10. A disabled button with no stated reason.
11. A raw UUID in a headline or a quote title.
12. Colour as the only carrier of status.
13. Relative timestamps alone.
14. Toast-only feedback.
15. `href="#"` dead links.
16. Lorem ipsum or invented filler rows.
17. Placeholder avatars or external image URLs.
18. A "live" indicator that cannot be live.
19. Navigation that duplicates destinations.
20. Any page that needs more than 3 interactions to reach its evidence.

---

## 17. OUTPUT PROTOCOL

Build in **7 batches**, stopping after each for review. Never skip ahead, never batch two stages into one response.

| Batch | Files | Gate |
|---|---|---|
| 1 · Foundation | `tokens.css`, `base.css`, `layout.css`, `components.css`, `icons.svg`, `pages/shell-reference.html` | The system must be provable on the reference page before any product screen exists |
| 2 · Orientation | `index.html`, `pages/overview.html`, `overview-focus.html`, `overview-night.html`, `command-palette.html`, `notifications.html` | Overview must reconcile with §8.2 |
| 3 · Work | `work-hub`, `request-new`, `request-detail`, `projects`, `project`, `project-progress`, `project-deliverables`, `project-files` | Milestone rail must show delivery + payment together |
| 4 · Money | `quotes`, `quote-awaiting-signature`, `quote-accepted`, `billing`, `payment-pending`, `payment-bank-transfer`, `payment-completed`, `payment-not-due`, `payment-methods`, `invoices` | All four payment states must be visually distinguishable at a glance |
| 5 · Conversation & files | `messages`, `thread`, `message-new`, `files`, `file-preview` | Provenance visible without opening a menu |
| 6 · Account & states | `profile`, `profile-edit`, `settings-account`, `settings-security`, `settings-notifications`, `settings-activity`, `states-empty`, `states-loading`, `states-error`, `mobile-showcase` | Settings shell consistent across 4 tabs |
| 7 · QA | No new files | Run §15 in full; fix and re-emit any page that fails |

**Response format for each batch:**
1. One line: `Batch N — <name> — <count> files`.
2. For each file: the path as a heading, then the **complete** file content in a single fenced block. No ellipses, no `<!-- same as above -->`, no partial output.
3. After the files: a manifest table `file · purpose · primary action · states covered`.
4. Then stop. Do not summarise the design language back to the user. Do not ask for permission to continue beyond the stop itself.

**If a batch is too large for one response:** split it into `a`/`b` halves and say so in the batch line — never truncate a file to fit.

**Final instruction:** begin with Batch 1. Write every line yourself.

---

*End of build prompt — Nestlancer Client Portal, Meridian v1, 40 hand-authored files, zero scripts.*
