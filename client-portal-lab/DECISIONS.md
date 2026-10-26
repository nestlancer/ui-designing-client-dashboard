# client-portal-lab — DECISIONS

One section per family. Runs append/extend **only their own** section.

---

## F01 · Auth · Login (built from `client-portal-prompts/F01-auth-login.md`)

### Hand-authorship attestation

> **All F01 variants were hand-authored; no design-generation script was used.**

Each of `families/F01-auth-login/V1…V5/index.html` was written by hand (design + markup + CSS + JS), one variant at a time, with its own layout geometry, hierarchy, narrative, density and interaction. No `tools/generate-*`, no template string, no config-driven stamping, no shell loop emitting pages. A colour-token cleanup pass edited values in place via editor find-and-replace on the already-hand-authored files; it changed no design structure. `manifest.json` records were typed by hand.

### Demo-only CTAs (offline lab — no network calls)

| CTA | Real basis | Lab behaviour |
|---|---|---|
| **Sign in** (submit) | `POST /api/v1/auth/login` | Simulated locally: validation → submit-loading → error choreography. The `<form>` keeps `action="https://api.nestlancer.com/api/v1/auth/login"` so the no-JS path posts to the real endpoint; JS intercepts for the offline demo. |
| **Verify code** (2FA panel) | `POST /api/v1/auth/verify-2fa` | Simulated verify → "Code verified / Taking you to your workspace…" status. |
| **Try again** / **Retry** (preview) | re-issue the failed call | Resets to idle / re-runs loading → live. |
| Cookie **Accept** / **Dismiss** | local preference only | Hides the bar; remembers via `localStorage` (`nl-cookie`). |
| Theme button | local only | light → dark → system cycle (`nl-theme`). |
| **Lab states** panel (fixed, labelled "Demo controls — not part of the page") | — | Preview affordance so every required state (loading skeleton, empty, error, 2FA) is reachable offline; listed here per the Gate-A rule. |

Every **navigation** CTA is a real destination: `https://app.nestlancer.com/forgot-password|/register|/terms|/privacy`, `https://admin.nestlancer.com/login` (operator door), `https://nestlancer.com` (logo). Zero `href="#"` anywhere (Gate 3 checked).

### Content-lock rulings (recorded at Gate S, applied in 5/5)

1. **"Client portal · live" placement.** The capture (`00a-login.html`) places this line in the hero **intake-badge** (ping dot + text); the capture's footer holds only `Terms · Privacy`. The prompt's content-lock line lists it with the footer. Ruling: render **both** — the captured hero badge *and* a third footer item after Privacy — so neither reading drops content. Nothing is invented or lost.
2. **"teal signal" in the hero paragraph.** Kept **verbatim** (frozen snapshot copy). It describes the public-site studio surface (marketing brand stays teal per C5's documented split: one portal brand = blue, one marketing brand = teal). The auth *surface* renders 100% in the single blue ramp — the teal login door is fixed, not preserved (C5+). No variant ships any teal/violet CSS.
3. **Violet `--accent-1` (250 100% 52%)** is **deleted** from the lab, as specified. The capture's violet cookie-Accept now renders blue. Focus rings use `--ring: var(--brand-500)` — the "violet reserved for focus rings" option was NOT taken; the lab uses the brand ramp for rings, which is one hue total.

### Token rulings (§5 compliance)

1. **Dark status BG tints** use the §5.2 comment's sanction: computed per variant with the same formula — **14% of the status hue over `--card` (#111b2e)** → `#113139` success · `#312d29` warning · `#302131` error · `#0f2e49` info · `#221d47` purple. Identical values in all 5 variants.
2. **Derived dark surfaces on brand fields** (cards/rules on `--brand-950` in dark) are expressed as `color-mix()` over §5 tokens (`--brand-500`/`--brand-950`/`--brand-100`/`--foreground`/`--card`/`--muted`/`--border`) — no raw hex surfaces. Editor find/replace normalised an early draft's hexes into these token expressions.
3. **White (`#fff`) text on `--primary` buttons** (and step bullets) is the neutral on-primary label — not a hue. Dark-theme primary buttons use `--brand-600` surface so white text clears 4.5:1 (dark `--brand-500`+white is ~3.7:1).
4. **Product-stage window dots** (`#ff5f57 #febc2e #28c840`, V1–V3) are the *captured* browser-chrome pixels of the locked preview illustration, not UI colour tokens. Kept as capture content (analogous to locked copy).
5. **Ping/live dot** uses `--status-success-text` (not a fresh green).
6. `shared/tokens.css` = exactly the prompt §5.2 block + the §5.2 motion-token bullet (values verified against the live capture: 150/280/500ms, `ease-spring 0.34,1.56,0.64,1`). Never edited by variants.

### Link/destination rulings

- Product routes (`/forgot-password`, `/register`, `/terms`, `/privacy`) are pinned to their real live destinations at `https://app.nestlancer.com/…` (the capture's root-relative hrefs would 404 inside a static lab). Operator door keeps its captured absolute URL.
- Each variant links back to the gallery (`../../../index.html`) and carries in-family prev/next (V1 ↔ V5).

### A-item coverage

No A1–A15 item targets `/login` (their scopes are Dashboard/Project/Quote/Billing/Payments/Notifications/Settings/Shell). Nothing was invented into this family. The family must-include ADDs (validation states, honest error, Show toggle, keep-signed-in, operator door, honesty line, hero lock) ship in **5/5**.

### Interaction/design notes

- The 2FA panel is the designed **202** outcome of the real login endpoint (`TwoFactorChallengeDto`) — Gate A surface, not an invention.
- The failed-sign-in error is what/why/action ("We couldn't sign you in" / "doesn't match our records" / Try again + Reset), never a bare red box.
- Preview empty state teaches the next step ("Your workspace lights up after your first request… → Create an account").
- V3's chapter selection emphasises stage blocks; it never hides locked content. V4's tabs partition the locked preview facts (chrome line + progress/amounts/queue); without JS all panels render stacked so content stays reachable. V5's stepper is progressive annotation — all fields visible from first paint.
