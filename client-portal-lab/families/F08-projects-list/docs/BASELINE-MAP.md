# F08 · Projects List — Gate S · BASELINE-MAP

Screenshot ↔ HTML map confirmed from the repo captures before any design. Content below is **frozen**; anything not listed as verified is not invented.

## GATE S (F08)
Screenshots opened: 1/1 · HTML opened: 2/2 · audit-metadata read: YES
Routes mapped: /projects (live 502 error state + route-fulfilled populated DOM) · Content frozen: YES
Gate: PASS

## Sources opened (in order)

1. This family prompt `client-portal-prompts/F08-projects-list.md` end-to-end, then the two discipline parents in `example-demo-prompt/` (gates + hand-crafted-only rule).
2. Screenshot **1/1**: `Nestlancer-clients-screenshots/clients/014-projects.webp` — opened and studied top-to-bottom (shell, H1, header links, single project card).
3. `nestlancer-client-pages-html/README.md` rows 16–17 (file ↔ URL ↔ screenshot), then both HTML snapshots + `audit-metadata.json` filtered to `/projects`.
4. Report `.md` in full + `.xlsx` all 10 sheets (see `REPORT-STUDY.md`).
5. Swagger `projects.openapi.json` + `health.openapi.json` (see `API-MAP.md`).

## Screenshot ↔ HTML ↔ route map

| HTML snapshot | Route / state | Screenshot | Session | What it proves |
|---|---|---|---|---|
| `13-projects-list.html` | `/projects` — live **502 error state** | `014-projects.webp` | Arjun Mehta (`AM`, bell 6) | Real production error card: “Could not load projects / Network Error / Try again” |
| `13b-projects-list-populated.html` | `/projects` — populated DOM via Playwright route-fulfil | `014-projects.webp` | Arjun Mehta (`AM`, bell 6) | Intended populated grid: 2 projects, both “In progress”, both “Started 10/5/2026” |

**Alternate-session warning (do not merge):** screenshot `014-projects.webp` itself shows a *different* signed-in session — **Ananya Iyer (AI)**, bell 52, one card **“Razorpay Settlement Reconciliation Engine · Revision requested · Started 10/5/2026”**. Like the F05 run’s Priya Nair / Ananya Iyer screenshots, this is an alternate capture session, **not** the Arjun Mehta DOM truth in `13/13b`. It proves the card anatomy (icon tile, status badge top-right, serif title, “Started” meta) and that a `Revision requested` badge style exists — but its project record is **not** merged into the frozen Arjun Mehta list. No third project is invented from it.

## Frozen content truth (copy verbatim into every variant)

| Element | Frozen value (source) |
|---|---|
| H1 | `Projects` (`13`, audit `h1`; live 26px — C18 raises to 32–40px, text unchanged) |
| Header line | “Follow active work, milestones, and delivery from kickoff through completion.” (`13`, `13b`) |
| Companion links | `Work Hub` · `View quotes` (`13`, `13b`, screenshot) |
| Error card | “Could not load projects” / “Network Error” / `Try again` (`13`) |
| Project 1 | **Khandesh Spice D2C E-Commerce Store** · badge “In progress” · “Started 10/5/2026” (`13b`) |
| Project 2 | **B2B Wholesale Ordering Portal** · badge “In progress” · “Started 10/5/2026” (`13b`) |
| Shell | Sidebar groups MAIN (Dashboard, Requests, **Projects** current, Quotes, Messages, Billing, Invoices, Notifications) / EXPLORE (Blog, Portfolio) / ACCOUNT (Profile, Settings); header breadcrumb `Dashboard › Projects`, `Search ⌘K`, theme, bell **6**, avatar `AM Arjun Mehta`; mobile bottom nav Dashboard / Projects / Messages / Billing / Menu; footer “© 2026 Nestlancer” |
| Empty state | **Report-specified, not in captures:** “Accept a quote to open your first project →” (report C14 §6.1, citing copy that exists on `/projects`). Designed in, labelled report-specified. |

Derived-only numbers allowed (arithmetic on frozen rows, always phrased as such): **2 projects · 2 In progress · started 10/5/2026**. No progress %, budget, deadline or team member exists in `13b` — none is invented on F08 cards. (The 57% / milestones story belongs to F09’s detail page for Project 1; F08 cards do not import it, except the card link through to F09.)

## audit-metadata evidence (filtered to this family)

- `13-projects-list`: `h1 = "Projects"` (26px Outfit 700), 12 buttons incl. shell groups, `Search ⌘K`, bell `6`, `AM Arjun Mehta`, `Try again`, `Menu`.
- `failedRequests`: repeated `GET https://api.nestlancer.com/api/v1/projects → net::ERR_FAILED`.
- `consoleErrors`: “Access to XMLHttpRequest at `…/api/v1/projects` … blocked by CORS policy: No `Access-Control-Allow-Origin` header” on `/projects` (and `/dashboard`, `/requests?view=projects`).
- Report finding #2 / §2.2 names the root cause: **HTTP 502 Cloudflare `origin_bad_gateway`** + CORS-blocked. This family therefore designs the populated UI **and** the honest degraded state (A13) — it never pretends the 502 away.

## States every variant must cover

Populated (2 cards) · Empty (C14 copy) · Loading skeleton · 502 error + retry + support + system-status banner (A13) — all reachable in-page via the lab state switcher (`?state=…`), plus light + dark and 360–1440px.
