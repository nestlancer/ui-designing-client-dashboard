# F01 · Auth · Login — REPORT-STUDY (Gate R)

Study of `reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md` (read cover-to-cover) + `reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx` (all 10 sheets opened).

## GATE R (F01)
MD read: YES · XLSX sheets: 10/10 · C-items mapped: 5/5 (C4, C5, C5+, C6, C18) · A-items mapped: 0 numbered + 6 family must-include
KEEP listed: YES · Checklist copied: YES
Gate: PASS

**MD vs XLSX agreement:** the two artefacts agree on all findings, C-items, A-items, KEEP, roadmap and checklist. Minor wording differences only (e.g. the XLSX C4 gives the worked example `--status-warning-text 32 90% 28% = 6.81:1`; the MD gives the token names). The MD wins on wording; nothing substantive to reconcile.

---

## 1. Executive findings that touch this family (quoted)

| # | Quote | Relevance to F01 |
|---|---|---|
| 3 | "Status badge text fails WCAG AA … measured contrast **1.73 – 3.23 : 1** (AA needs 4.5:1 for 12px text)" | C4 — the login hero preview shows 3 status badges (In progress / Deposit paid / ₹48,000) |
| 4 | "Two colour systems coexist. … Login page marketing panel uses a **third** palette (`--accent-1: 175 84% 26%` teal)" (XLSX wording: "Three colour systems coexist") | **the family's headline finding — C5+** |
| 13 | "the live app has 6 routes the screenshots don't cover (**login**/register/forgot-password, global search, dark mode, mobile, projects-populated)" | explains why this family has 0 screenshots |
| 11 | "Dark tokens exist … but hard-coded `gray-200/80` … drift" | every variant ships a real dark theme on tokens (C6) |
| 12 | "focus-visible rings (48) … but card borders are re-declared as raw hex" | C6 tokenise |

Page inventory row `/login` (sheet 3): "2-col split; form + 'Your delivery OS' hero; ping badge; operator sign-in link" — issue: "Marketing panel uses a TEAL brand vs portal blue; no SSO/passkey/social". **SSO/passkey/social is NOT in the ADD list** → not built (nothing invented).

## 2. Design token table (sheet 2) — the lab token file derives from this

| Group | Live values | Verdict → lab |
|---|---|---|
| Typeface | Outfit (+ Instrument Sans on public/auth) | `--font: "Outfit", system-ui…` stack (offline — no webfont fetch); `--mono` added (report: "no mono for IDs/references/timestamps" gap) |
| Type scale | H1 24/28 · H2 14 · body 14 · meta 12 · micro 11 | C18: display step **32–40px**; money hero 32–40 `tabular-nums`; meta ≥12; micro ≥11 |
| Neutrals | bg `210 40% 98%` · card white · border `214 32% 91%` · fg `222 47% 11%` | shadcn-style ramp — KEEP (§5.2) |
| Brand | `--ta-brand-*` `#ecf3ff…#465fff…#161950` | becomes *the* `--primary` ramp (C5) |
| Conflicting accent | `--accent-1 250 100% 52%` violet → `--primary`/`--ring` | **deleted**; focus rings use `--ring: var(--brand-500)` (documented) |
| Third palette | `.public-editorial --accent-1: 175 84% 26%` teal | **deleted from the lab**; auth renders blue (C5+) |
| Status hues | success `160 84% 39%` · warning `38 92% 50%` · error `0 84% 60%` · info `200 98% 48%` · purple `270 76% 53%` | hue kept; **darkened AA text tokens** (C4); badges = icon + colour + text |
| Radii | sm 6 · md 10 · lg 14 · xl 20 | kept as tokens |
| Shadows | mixed vocabulary | normalised: `--shadow-xs`, `--shadow-sm` |
| Layout | sidebar 232/260 · header 64 · content 1400 | `--sidebar:232px` (C17) · `--header:64px` · `--content:1400px` |
| Motion | fast 150 · normal 280 · slow 500 · spring | kept |

## 3. This family's CHANGE items — full specifics (sheet 5 = MD §6.1)

| # | Full specifics (quoted/paraphrased from the report) | How F01 implements it (all 5 variants) |
|---|---|---|
| **C5+** | (F01 prompt addition, report finding #4) "The login page's marketing panel uses a third palette … Auth pages use the same blue ramp as the rest of the lab — the discrepancy is fixed, not preserved." | Zero teal in the lab. Hero panel, buttons, links, focus, badges all on `--brand-*`/`--primary` blue. The violet `#330AFF` cookie-Accept renders blue. |
| **C4** | "Use darkened text tokens (`--status-warning-text 32 90% 28%` etc.) instead of full-saturation hues on 12% tints … status = icon + colour + text" | Hero-preview badges use `--status-*-bg` + `--status-*-text` + `--status-*-border`, each with an inline SVG icon + text. AA in both themes. |
| **C5** | "`--ta-brand-*` becomes *the* `--primary`; violet `--accent-1` is deleted or explicitly reserved for focus rings; pick ONE portal brand (blue) … and document" | `tokens.css` = one ramp. Focus ring = `--ring: var(--brand-500)`. Deletion documented in `DECISIONS.md`. |
| **C6** | "`border-gray-200/80 bg-white shadow-none …` → `--card` / `--border` / `--shadow-xs`" | Every surface in every variant reads `--card`/`--border`/`--shadow-*`. No raw hex surfaces. (The lab drops raw `bg-white` entirely — even the live window-chrome dots keep their tiny capture hexes as *illustrative chrome pixels*, noted in DECISIONS.) |
| **C18** | "Introduce a 32–40px display size for the H1 + big ₹ amount; current 24px H1 makes the portal read like an internal tool" | H1 = 32–40px display (desktop) / 28–32 (phone). The ₹48,000 figure gets the money-hero treatment where hierarchy calls for it. |

## 4. ADD items with priority

**No numbered A1–A15 item targets `/login`** (their scopes: Dashboard, Project, Quote, Billing, Payments, Notifications, Settings, Shell). Coverage rules for numbered items are therefore vacuous for F01 and no numbered ADD is invented into this family.

**Family must-include ADDs** (F01 prompt §4 — mandatory in 5/5): inline validation states · honest failed-sign-in error state · "Show" password toggle · keep-me-signed-in · operator door + honesty line · hero copy lock. These are bound to Gate S content + Gate A endpoints, not inventions.

## 5. KEEP list (sheet 7) — what survives in every variant

| Keep | F01 survival |
|---|---|
| **"Domain-specific honesty — 'Client-to-client messaging is not available' — rare and trust-building"** (§6.3 of MD names the honesty line pattern) | The clients-only honesty line + operator door microcopy ship verbatim in 5/5 (prompt §6 KEEP) |
| **The shadcn-style token architecture** — "the right foundation — just needs consolidation" | `shared/tokens.css` *is* that consolidation; imported as-is by 5/5 |
| Graceful microcopy everywhere | Locked microcopy preserved verbatim; new state copy (error/empty) written in the same voice (what/why/action) |
| Razorpay trust strip culture | The hero's "Razorpay / UPI" feature panel (locked copy) stays |

## 6. Benchmark patterns applied to this family (cite sources)

| Pattern | Source | Application on `/login` |
|---|---|---|
| "Design for the skeptical skimmer — lead with a verdict" | [1] AdminLTE client-dashboard rules | H1 + honesty line answer "is this for me?" in <2s; hero H2 is the single value promise |
| "Status is never colour alone" | [2] Home Assistant | all badges icon + text + colour (C4) |
| "Colour means state, not decoration; one accent" | [2][13] | single blue ramp; no decorative second hue (C5) |
| Typographic hierarchy: big number, cents lighter | [2] Mercury, [13] finance | money hero treatment for ₹48,000 in the preview |
| Auth pages = production readiness | [12] TailGrids | login ships validation, error, loading, 2FA-branch awareness |
| "Empty states that teach the next step" | [9] SaaS billing | preview empty state teaches "sign up / first request" |
| shadcn tokens aligned not reinvented | [5] templates market | tokens.css consolidation |

## 7. Roadmap phases that touch this family

| Phase | Contents (sheet 8) | F01 relation |
|---|---|---|
| **P1 — Foundations** | "Consolidate colour to one brand ramp; fix badge contrast (AA); tokenise card/border/shadow; lock the type scale incl. a display size; normalise radii; publish the token file" | **This family IS a P1 vehicle** (C4/C5/C6/C18) |
| P6 — Responsive & PWA | mobile-first, drawer nav, offline banner | responsive 360–1440 + honest states; PWA shell items belong to F03's shell — not built here |

## 8. Acceptance checklist (sheet 9) — copied as the F01 QA list (Gate 3)

| Gate | Pass criteria (verbatim) | F01 applicability |
|---|---|---|
| Hierarchy | "A user can name the single most important number on the dashboard in under 2 seconds" | auth variant: the single most important *action* (Sign in) and *promise* readable <2s |
| KPI cards | "Every card shows value + label + trend/why; exactly one hero" | hero-preview card: value + label + why (locked microcopy) |
| Charts | right chart type, no pies >3 | n/a (no charts) |
| Tables | search/filter/sort/pagination + mobile card-fallback | preview feed = the family's tabular surface → 375px card-fallback rows |
| Navigation | ≤9 items, palette real actions | auth page nav = logo + 5 real links only |
| Colour | "Exactly one brand ramp; colour reserved for state; status = icon + colour + text; text ≥ 4.5:1, UI ≥ 3:1" | enforced by tokens + C4 badges |
| Typography | one family + optional mono; ≤4 body sizes; display for money | Outfit stack + mono IDs; C18 display step |
| Dark mode | matching dark theme; tokenised; verified page by page | `.dark` token block; all 5 verified |
| Accessibility | full keyboard, visible focus, ARIA, skip link | skip link, focus-visible, form ARIA, focus trap in lab panel |
| Empty/loading/error | every panel has designed empty, skeleton and error states | form + preview both ship the trio |
| Mobile | 375/414/768 pass; no horizontal scroll; no clipped CTAs | verified at 360/390/768/1024/1440 |
| Performance | skeletons not spinners; FCP <1.5s; no CLS | inline CSS/JS, `?theme` boot before paint, skeletons |
| Legal | terms readable at 14px; e-signature explained; dispute routes findable | Terms/Privacy links present; no sign block on this family |

## 9. Sources (sheet 10) consulted for this family

[1] AdminLTE client-dashboard examples · [2] AdminLTE dashboard-design examples · [9] AdminLTE SaaS billing · [12] TailGrids React dashboards · [13] AdminLTE finance dashboards — the rest inform sibling families.
