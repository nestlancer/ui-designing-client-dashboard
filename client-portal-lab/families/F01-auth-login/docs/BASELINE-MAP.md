# F01 · Auth · Login — BASELINE-MAP (Gate S)

Product archaeology of the *current* `/login` page. Sources opened for this family:

| Source | Status |
|---|---|
| `nestlancer-client-pages-html/00a-login.html` (2,338-line full-DOM snapshot, inlined CSS) | opened top-to-bottom, incl. CSS tokens |
| `nestlancer-client-pages-html/audit-metadata.json` → slug `00a-login` (+ `failedRequests` / `consoleErrors` filtered to `/login`) | read |
| `nestlancer-client-pages-html/README.md` (file ↔ URL ↔ screenshot map) | read |
| Screenshots for this family | **0 — none exist** (auth surface; report finding #13 confirms login/register/forgot were never screenshot-captured). The HTML snapshot is the only visual truth. |

## GATE S (F01)
Screenshots opened: 0/0 (none exist for this family) · HTML opened: 1/1 · audit-metadata read: YES
Routes mapped: `/login` · Content frozen: YES
Gate: PASS

---

## 1. Route map

| HTML snapshot | Route | State | Screenshot |
|---|---|---|---|
| `00a-login.html` | `https://app.nestlancer.com/login` | Client Portal Sign-In page (single state captured) | — (auth surface) |

- Document title: `Sign In · Nestlancer Client Portal`
- Skip link: `Skip to main content` → `#main-content`
- No app shell (no sidebar / ⌘K / bell). **Split auth layout**: left column = header + form + footer; right column = `aside.hero-orbs` brand/hero panel (`aria-hidden` in the capture; hidden below `lg`). On mobile the hero is **not** rendered at all in the live page — the lab upgrades this (hero copy becomes reachable at 360–390px).

## 2. Page anatomy (DOM order)

1. **Cookie notice bar** (top, `z-[100]`, border-b): "We use essential cookies to keep you signed in and remember your preferences. See our **Privacy Policy** for details." + buttons **Dismiss** (secondary) · **Accept** (primary).
2. **`.public-editorial` wrapper** — this is the third-palette scope (see §4).
3. **Left column (form side)**:
   - `header`: Nestlancer logo link (light/dark SVG variants → `https://nestlancer.com`) + round theme button ("Use system appearance", 44px).
   - `main#main-content` → `max-w-md` column:
     - Icon tile 48×48 (`rounded-xl bg-primary/10`, Lucide **log-in** icon 24×24 `stroke-width=2`).
     - **H1 "Sign in"** (audit: 28px/700 — C18 target).
     - Honesty line: **"For clients only. Administrator and operator accounts must use the operator console — not this page."**
     - `form[method=post][novalidate]`:
       - **Email \*** — `input[type=email]#email`, `autocomplete="email"`, placeholder `you@company.com`
       - **Password \*** — `input[type=password]#password`, `autocomplete="current-password"`, placeholder `Enter your password`, + **Show** toggle (`aria-pressed`, `aria-label="Show password"`)
       - Row: **Keep me signed in** (`checkbox#rememberMe`) + **Forgot password?** → `/forgot-password`
       - Submit **Sign in** (full-width, 44px)
       - Operator door: "Staff or platform operator?" + **Operator sign-in** → `https://admin.nestlancer.com/login`
       - Operator microcopy: "Administrator accounts cannot finish signing in here."
       - Sign-up line: "Don't have an account?" + **Sign up** → `/register`
   - `footer`: **Terms** → `/terms` · **Privacy** → `/privacy` (× `aria-hidden` dots).
4. **Right column `aside.hero-orbs`** (brand/hero panel):
   - **intake-badge**: live ping dot (`animate-ping`, success) + **"Client portal · live"**
   - **fig-label "FIG · Portal"**
   - **H2 "Your delivery OS — from brief to payout."** (audit: 44px/700)
   - Paragraph: **"Same studio surface as the public site: engineered panels, teal signal, and money you can read at a glance — after you sign in."**
   - **product-stage** (live-portal preview):
     - chrome: 3 window dots (`#ff5f57` `#febc2e` `#28c840`) + mono **`project-hub · NL-204`** + right mono **`68%`**
     - card: mono **`NL-204 · Milestone 3`** · **"Frontend — SaaS Landing Redesign"** · badges **In progress** / **Deposit paid** / **₹48,000** · progress bar **68%** · feed list:
       - **NL** · "Staging build pushed" · "14 min ago · deliverable linked"
       - **RH** · "Rahul: Hero CTA above the fold?" · "1h ago · thread"
   - Feature panels ×3: **Project Hub** — "Milestones, files, and threads in one surface." · **Milestone payments** — "Pay deposit, mid, and final as work is approved." · **Razorpay / UPI** — "Tabular money — deposits and payouts clear."

## 3. Content freeze (field-by-field verified against the DOM)

| Item | Frozen value | Verified |
|---|---|---|
| H1 | `Sign in` | DOM + audit |
| Honesty line | `For clients only. Administrator and operator accounts must use the operator console — not this page.` | DOM |
| Labels | `Email *`, `Password *` (both with required asterisk) | DOM |
| Placeholders | `you@company.com`, `Enter your password` | DOM |
| Show toggle | `Show` ↔ `Hide`, `aria-pressed`, `aria-label="Show password"` | DOM |
| Checkbox | `Keep me signed in` | DOM |
| Links | `Forgot password?` → `/forgot-password` · `Sign up` → `/register` · `Operator sign-in` → `https://admin.nestlancer.com/login` · `Terms` → `/terms` · `Privacy` → `/privacy` · logo → `https://nestlancer.com` | DOM |
| Operator door | `Staff or platform operator?` + `Administrator accounts cannot finish signing in here.` | DOM |
| Cookie notice | `We use essential cookies to keep you signed in and remember your preferences. See our Privacy Policy for details.` + `Dismiss` + `Accept` | DOM |
| Footer | `Terms · Privacy` | DOM |
| Live badge | `Client portal · live` (ping dot) | DOM — see placement note below |
| Hero | `FIG · Portal` · `Your delivery OS — from brief to payout.` · `Same studio surface as the public site: engineered panels, teal signal, and money you can read at a glance — after you sign in.` | DOM |
| Preview | `project-hub · NL-204` · `68%` · `NL-204 · Milestone 3` · `Frontend — SaaS Landing Redesign` · `In progress` · `Deposit paid` · `₹48,000` · feed rows NL/RH verbatim | DOM |
| Feature panels | `Project Hub` / `Milestone payments` / `Razorpay / UPI` + the 3 locked blurbs | DOM |

**Placement note (recorded per "verify field-by-field"):** the capture places **"Client portal · live"** inside the hero **intake-badge** (ping + text); the `footer` contains only `Terms · Privacy`. The prompt's content-lock line lists "the footer (Terms · Privacy · 'Client portal · live')". To satisfy both the capture and the lock as written, every variant renders **"Client portal · live" in the hero intake badge (as captured) and as a third footer item after Privacy**. Nothing is dropped.

**Copy note (C5 interplay):** the hero paragraph's phrase "teal signal" is frozen snapshot copy describing the public-site studio surface (the marketing brand stays teal per C5's documented split: one portal brand = blue, one marketing brand = teal). The auth **surface** renders 100% in the single blue ramp (C5+). The phrase is kept verbatim per the content lock and flagged in `DECISIONS.md`.

## 4. Tokens observed in the snapshot (the C5 evidence)

| System | Where | Values | Problem |
|---|---|---|---|
| Violet accent | `:root` (`--accent-1: 250 100% 52%` = `#330AFF`) | `--primary: var(--accent-1)`; audit: cookie **Accept** button `rgb(51,10,255)` | violet primary (C5) |
| **Auth teal** | `.public-editorial` (`--accent-1: 175 84% 26%`, `--primary: 175 84% 26%` = `rgb(11,122,113)`) | audit: **Sign in** button `rgb(11,122,113)`; accent-color `rgb(11,122,113)` | **third palette — the teal login door (C5+)** |
| Portal blue | `--ta-brand-*` | `#ecf3ff → #465fff → #3641f5 → #2a31d8 → #161950` | the ramp the lab keeps as *the* `--primary` |
| Status hues | `--status-*` at full saturation on 12% tints | success `160 84% 39%`, warning `38 92% 50%`, error `0 84% 60%`, info `200 98% 48%`, purple `270 76% 53%` | badge text 1.73–3.23:1 (C4) |
| Type | Outfit + Instrument Sans (page), 28px H1 / 44px H2 | — | H1 compressed (C18) |
| Cards | raw `bg-white` / `gray-200/80`-style classes in the broader app | — | C6 |

## 5. Audit-metadata facts (slug `00a-login`)

- H1: `Sign in` @ **28px**/700 — C18 lifts this to 32–40px display.
- H2: `Your delivery OS — from brief to payout.` @ 44px/700.
- Buttons (5): `Dismiss` · `Accept` (violet `rgb(51,10,255)`) · theme toggle · `Show` · `Sign in` (teal `rgb(11,122,113)`).
- Inputs (3): `email` · `password` · `checkbox rememberMe`.
- Tables: none (no data tables in this family → "375px card-fallback" applies to the hero preview feed list).
- `failedRequests` for `/login`: one `GET /login?_rsc=… net::ERR_ABORTED` (Next.js RSC prefetch abort — benign, capture artefact). `consoleErrors`: none on this route.

## 6. States this family must show (cross-cutting, per §4 of the prompt)

Real, keyboard-reachable states in every variant: inline validation (error text, `aria-invalid`, disabled submit until valid in V5-style flows) · submit **loading** (button `aria-busy`, skeleton treatment) · **failed sign-in error** (what/why/action + retry + reset route) · hero-preview **empty / loading-skeleton / error-with-retry** (the family's "table" surface = the preview feed; its 375px treatment is card-fallback rows) · light + dark · `?theme=` boot · reduced-motion · no-JS content reachable.
