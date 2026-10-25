# F01 · Auth · Login — API-MAP (Gate A)

Specs read: `backend-api-swagger/auth.openapi.json` (13 paths) + `backend-api-swagger/gateway.openapi.json` (22 paths) + `backend-api-swagger/README.md`.

## GATE A (F01)
Specs read: 2/2 · Endpoints mapped: 8 · Demo-only CTAs listed: 4
Gate: PASS

**Scope check:** the gateway spec is **health + docs-specs only** — no search/routing API lives there (confirmed). Login UI never calls the gateway except the health probe used by the honest degraded banner.

---

## 1. UI element → endpoint map (every CTA in every variant resolves here)

| UI element | Method + path | Request (key fields / enums) | Response (key fields / enums) | States to design |
|---|---|---|---|---|
| **Sign in** (submit) | `POST /api/v1/auth/login` | `LoginDto`: `email`*, `password`*, `rememberMe` (bool — "a long-lived refresh token will be issued for persistent sessions"), `turnstileToken` (Cloudflare Turnstile — "Required on public login"), `portal` enum **`client` \| `admin`** ("When set, ADMIN accounts are rejected on client …") | **200** `LoginTokensDto` (envelope `status:"success"`): `accessToken`, `refreshToken`, `expiresIn` (e.g. 3600), `tokenType:"Bearer"`, `user: AuthUserSummaryDto` (`id` uuid, `email`, `firstName`, `lastName`, `phone` E.164, `avatar`, `role`, `emailVerified`, `twoFactorEnabled`) · **202** `TwoFactorChallengeDto`: `requires2FA:true`, `authSessionId`, `methodsAvailable:[ "totp" ]` · **201** empty object | idle → inline validation → **submit loading** (button `aria-busy`) → **200 success** (post-login redirect is shell scope, not this family) / **202 two-factor challenge** panel / **error** state |
| **Two-factor code submit** (202 branch) | `POST /api/v1/auth/verify-2fa` | `Verify2FADto`: `authSessionId`*, `code`* (6–10 chars: "numeric 6-digit TOTP code or an 8-10 character alphanumeric backup recovery code"), `method` enum **`totp` \| `backupCode`**, `rememberMe` (matched to initial choice) | **200** standard success envelope | code input (6-digit) · verify loading · wrong-code error (what/why/action) |
| **Keep me signed in** (checkbox) | *(field of `POST /api/v1/auth/login`)* | `rememberMe: true` → long-lived refresh token | — | checkbox checked/unchecked; feeds both login + verify-2fa |
| **Forgot password?** | *(navigation to `/forgot-password`, whose form posts `POST /api/v1/auth/forgot-password` — F02 scope)* | `ForgotPasswordDto` | **200** "If an account exists with this email, you will receive password reset instructions" (anti-enumeration) | F01 = real link only |
| **Sign up** | *(navigation to `/register`, whose form posts `POST /api/v1/auth/register` — F02 scope)* | `RegisterDto`: email, password 8–64 + complexity, firstName, lastName, phone E.164, `acceptTerms`, `marketingConsent`, turnstileToken | **201** `RegisterResultDto` | F01 = real link only |
| **Operator sign-in** | `https://admin.nestlancer.com/login` (external operator console; API basis: `LoginDto.portal:"admin"` rejects non-ADMIN on the admin portal and ADMIN on the client portal) | — | — | link only; the *honesty microcopy* is backed by the `portal` enum |
| **Logo → Nestlancer home** | `https://nestlancer.com` (public site) | — | — | link only |
| **Terms / Privacy / Privacy Policy** | `/terms`, `/privacy` (app routes) | — | — | links only |
| **Cookie Accept / Dismiss** | no API (essential-cookie notice; dismissal is local preference) | — | — | bar visible / dismissed (persisted locally) |
| **Theme toggle** | no API (local) | — | — | light/dark/system cycle |
| **Health check** (degraded banner basis) | `GET /api/v1/health` (+ `/ping`, `/live`, `/ready`) | — | **200** success envelope | the honest error card's "status" language is modelled on this surface |

Related auth endpoints mapped for completeness (not rendered on `/login` — F02/F21 scope): `POST /api/v1/auth/refresh` (`RefreshTokenDto`), `POST /api/v1/auth/logout` (`LogoutDto`), `POST /api/v1/auth/logout-all`, `POST /api/v1/auth/end-impersonation`, `POST /api/v1/auth/verify-email` (`VerifyEmailDto`), `POST /api/v1/auth/resend-verification`, `POST /api/v1/auth/reset-password`, `POST /api/v1/auth/check-email` (`CheckEmailDto` — anti-enumeration; deprecated `GET` returns **410**), `GET /api/v1/auth/health`.

## 2. The `portal` enum ↔ the operator door (why the honesty line is real)

`LoginDto.portal` accepts `client | admin`: "ADMIN accounts are rejected on client and non-ADMIN on admin." The page's locked microcopy — *"Administrator accounts cannot finish signing in here."* — is therefore **API-backed behaviour**, not decoration. Every variant keeps it verbatim.

## 3. Error / edge semantics the UI must honour

| Case | API basis | Designed state |
|---|---|---|
| Wrong email/password | login rejection (credentials) | error panel: **what** "We couldn't sign you in" · **why** "The email or password doesn't match our records." · **action** "Check your details and try again, or reset your password." + Try again + Forgot password? |
| ADMIN account on client portal | `portal:"client"` rejects ADMIN | same error family; the persistent operator door already routes staff away |
| 2FA enabled on account | **202** `TwoFactorChallengeDto` | in-form 2FA panel (authSessionId + code + method) with resend-free honesty (no invented resend) |
| Anti-enumeration on reset | forgot-password 200 is deliberately vague | link only — no enumeration hints on `/login` |
| CAPTCHA | `turnstileToken` "Required on public login" | no Turnstile widget is rendered (no external embeds allowed offline); documented as demo-labelled in `DECISIONS.md` |
| Offline demo (no backend) | — | Submit is a **demo affordance**: full loading + validation + error choreography runs locally, no network. Labelled in `DECISIONS.md`. |

## 4. Demo-only CTAs (offline lab — no network; listed per §7 Gate A rule)

| CTA | Real API/destination basis | Lab behaviour |
|---|---|---|
| **Sign in** submit | `POST /api/v1/auth/login` | simulated: validation → loading → error (or 2FA panel via demo state) |
| **Verify code** (2FA panel) | `POST /api/v1/auth/verify-2fa` | simulated verify loading + completion note |
| Cookie **Accept** / **Dismiss** | none (local preference) | hides bar; persists in `localStorage` where available |
| **Try again** (error recovery) | re-calls login | resets form to idle and refocuses email |

All navigation CTAs (Forgot password?, Sign up, Operator sign-in, Terms, Privacy, logo) resolve to **real destinations** (`https://app.nestlancer.com/…`, `https://admin.nestlancer.com/login`, `https://nestlancer.com`). No `href="#"` anywhere.
