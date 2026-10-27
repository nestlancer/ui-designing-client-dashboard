# F06 · Request · New Form — Gate R · REPORT-STUDY

**Read cover-to-cover:** `reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md` (§1 → §8) · `reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx` — all 10 sheets opened.

## GATE R (F06)
MD read: YES · XLSX sheets: 10/10 · C-items mapped: 5/5 · A-items mapped: 2/2 (family ADDs)
KEEP listed: YES · Checklist copied: YES
Gate: PASS

## 1 · Executive findings that touch this page (quoted)

- **#3 (HIGH)** — “Status badge text fails WCAG AA … 1.73 – 3.23 : 1” → validation/status chips in F06 use `--status-*-text` + icon + text.
- **#4 (HIGH)** — “Two colour systems coexist … focus rings violet” → captured form uses `focus:ring-ta-brand-500/20` on fields but `focus-visible:ring-primary/40` on help buttons; F06 makes every ring `--primary` (blue).
- **#10 (HIGH)** — “Mobile is a afterthought” → the 2-column Budget grid and sticky footer must collapse cleanly at 360/390.
- **#11 (MEDIUM)** — “Dark mode is a checkbox, not a theme … hard-coded `gray-200/80`, `gray-800`, `white` card borders” → the captured form is exactly that (`dark:bg-white/[0.02]`, `dark:border-gray-800`); all surfaces tokenised.
- **#12 (MEDIUM)** — “card borders are re-declared as raw hex in 6+ different forms” → C6.
- **#2, #5, #7, #8, #9, #13** — context: the 502 is a Projects-Service defect and does **not** fire on `/requests/new`; F06’s submit-error state is a designed degraded state, not a copied capture.
- Report §3.1/§3.2: “Outfit (self-hosted) … no mono for IDs/references/timestamps” → F06 uses `--mono` for the created request id + field counters.

## 2 · Full token table (§5.2 — one locked scheme)

| Group | Light | Dark |
|---|---|---|
| Neutrals | `--background:#f6f8fb` · `--card:#ffffff` · `--muted:#f1f5f9` · `--border:#dbe3ec` · `--foreground:#0f1c2e` · `--muted-foreground:#45556b` | `--background:#0b1220` · `--card:#111b2e` · `--muted:#16233a` · `--border:#24344f` · `--foreground:#e8eef4` · `--muted-foreground:#9fb0c3` |
| Brand | `--brand-50:#ecf3ff` · `-100:#d9e6ff` · `-500:#465fff` · `-600:#3641f5` · `-700:#2a31d8` · `-950:#161950` · `--primary:var(--brand-500)` · `--primary-hover` · `--ring` | `--brand-500:#5b7bff` · `--primary:var(--brand-500)` |
| Status | success `#e5f6ec / #166534 / #86c9a3` · warning `#fdf3e0 / #8a5a00 / #e8c477` · error `#fdecec / #b42318 / #f0a8a0` · info `#e6f4fd / #0c5d8a / #8fcbe8` · purple `#f1e8fd / #5b21b6 / #c4a8ef` | text `#4ade80 / #fbbf24 / #f87171 / #38bdf8 / #c084fc`; bg = 12–16% hue tint over `--card` (shared formula) |
| Shape | radius `6 / 10 / 14 / 20px`; shadows `xs 0 1px 2px rgba(15,28,46,.06)`, `sm 0 4px 14px rgba(15,28,46,.08)` | `xs 0 1px 2px rgba(0,0,0,.4)`, `sm 0 8px 28px rgba(0,0,0,.45)` |
| Type | `--font` Outfit stack · `--mono` ui-monospace stack | same |
| Layout | `--sidebar:232px` · `--header:64px` · `--content:1400px` | same |
| Scale | H1 32–40 · H2 20–24 · card title 16–18 · body 14–16 · meta 12 · micro 11 floor | same |
| Motion | fast 150 / normal 280 / slow 500 ms; transform+opacity only | same |

**Bans:** second brand hue · violet accent · raw card classes · external CDNs/fonts/chart libs · emoji · glass over dense text.

## 3 · Page-inventory rows (sheet 3 / report §4)

| # | Route | Status | Components | Principal issue |
|---|---|---|---|---|
| 13 | `/requests/new` | OK | “Brief / Budget / Timeline & requirements cards, 10 inputs, help tooltips, sticky footer” | “Very good form; **missing attachments at creation, budget guide, progress indicator**” → the two family ADDs + progress/section navigation |
| 14–15 | `/requests/[id]` | OK | details, attachments, status history, actions | F07 scope — the current form’s intro says attachments are edited there; F06 adds them at creation too |
| 10–12 | `/requests` | OK / 502 | Work Hub | F05 scope — Cancel/Back real destination |

## 4 · Benchmark patterns applied (13 report sources)

- **[1] AdminLTE client-portal examples** — “explain every number”, “show the next step” → budget guide explains the min/max band; footer always says what `Save draft` does next.
- **[2] AdminLTE dashboard examples** — one thing clearly most important → one primary `Save draft`; `Cancel` stays secondary.
- **[7] Tailwind Admin checklist** — grouped nav, one accent, matching dark mode, keyboard/ARIA → tooltips are real `aria-expanded` popovers with Esc + focus restore.
- **[8] WrapPixel / Asanah** — milestone/task model → stepper-led V2 (composition only, no new feature).
- **[9] AdminLTE SaaS** — “design the customer-facing page as carefully as the admin one” → honest loading/success/error states for submit.
- **[10] Assembly** — module-card intake structure → V5 bento split (form + live summary rail).
- **[11] Softr** — forms + resource hub → inline help/budget guide (no Ask-AI: no Gate-A endpoint).
- **[12] TailGrids** — production readiness (a11y, responsive) → full keyboard flow, 360px proof.
- **[13] AdminLTE finance** — `tabular-nums` big numbers → budget band display.
- **[3] Dribbble / [4] Webflow / [5] AdminLTE templates / [6] Tabler** — visual/density references only.

## 5 · CHANGE items — all 5 mandatory in 5/5 variants

| ID | Specifics | F06 implementation |
|---|---|---|
| **C17** | 260→232px sidebar; Blog/Portfolio behind a single `Explore` popover | `--sidebar:232px`, MAIN + ACCOUNT + `Explore` popover; mobile drawer; matches F03 shell. |
| **C4** | AA-safe status text + icon + text, never colour alone | Validation errors, upload statuses, save-state chips and steppers all use icon + `--status-*-text` + label. |
| **C5** | one blue `--primary`; violet deleted | All 5 import `shared/tokens.css`; help-button rings become blue. |
| **C6** | tokenise every card/border/shadow | All form cards, dropzone, summary rail, footer use `--card` / `--border` / `--shadow-xs`. |
| **C18** | H1 32–40px display; money hero 32–40 `tabular-nums` | H1 34–38px / 28–32px mobile; section titles 20–24px; budget band value 32px mono. |

## 6 · ADD items (family must-includes → all 5 variants)

| ID | Priority | Requirement | API basis | Coverage |
|---|---|---|---|---|
| **Family ADD · Attachment at creation** | P1-equivalent (mandatory all 5) | Styled dropzone (never a native visible file input) wired to media upload; empty + uploading + uploaded + error states | `POST /api/v1/media/upload/direct` (multipart `file`, `fileType`), `POST /api/v1/media/upload/request` + `/confirm`, chunked init/part/complete/status; resulting media UUIDs go into `CreateRequestDto.attachments[]` (max 10) | 5/5 |
| **Family ADD · Budget guide** | P1-equivalent (mandatory all 5) | Inline guidance for a realistic band, built only from captured placeholders + Swagger constraints (`budget.min`, `budget.max`, `currency` ISO-3, `flexible`) | `BudgetDto` | 5/5 |

No A1–A15 item is claimed for F06; A11 (PWA) and A13 (degraded banner) are P3 global and out of this family’s ADD list. Report §3 “progress indicator” gap is addressed as a **hierarchy fix** (stepper/progress in V1–V5), not an invented feature.

## 7 · KEEP (must survive in every variant)

- **Graceful wording** — the intro, three section descriptions, placeholders and footer labels survive **verbatim**; tooltip body copy is lab-authored (see `BASELINE-MAP.md`) but helper text never becomes scolding.
- **The shadcn-style token architecture** — one token file, one reset file, hand-written per-variant CSS.
- Domain-specific honesty: “You can edit attachments and submit for quotes from the request page when you’re ready.” stays; the success state repeats it instead of pretending a quote was requested.

## 8 · Roadmap phases touching F06

- **P1** — one brand ramp, AA badges, tokenised cards, display scale → C4/C5/C6/C18.
- **P2** — “design the customer-facing page as carefully as the admin one” → submit states.
- **P6** — mobile-first intake, drawer nav, offline/degraded state → responsive + retry.
- **P7** — restrained motion → step transitions, reduced-motion.

## 9 · Acceptance checklist (copied verbatim as F06 QA list; sheet 9 / report §7.1)

Hierarchy < 2 s · KPI = value+label+why, one hero (F06: one hero = the primary action) · correct chart type (none used) · tables search/filter/sort/pagination (F06: attachment list has remove + status, no table) · grouped sidebar ≤ 9 + real ⌘K actions · one brand ramp + icon/colour/text status + AA contrast · one font family + mono for IDs + ≤ 4 body sizes · matching tokenised dark theme · full keyboard, focus, ARIA, skip link · designed empty/loading/error for every panel · 375/414/768 px no horizontal scroll or clipped CTA · skeletons not spinners, no async CLS · legal/cancellation route findable (`Cancel`, `Back to requests`).

## 10 · MD ↔ XLSX differences (MD wins; recorded)

1. **Sheet 3 row 13** says “10 inputs”; the DOM has 10 named form controls **plus** 10 help buttons + footer — F06 freezes exactly 10 fields (prompt §4), no 11th field invented.
2. **MD §6.1 C5** allows a separate teal marketing brand; **F06 prompt §5.1** locks one blue for all 23 families → blue only (family prompt is the task).
3. **Report §1 #10** says 375px; F06 prompt §9.2/§12 says 360/390/768/1024/1440 → superset checked.
4. **Sheet 2** recommends “Add a mono for IDs/references/timestamps”; §5.2 of the family prompt already provides `--mono` — no new token needed.
5. **Report §2.2** lists the 502 as affecting `/projects` only; `audit-metadata.json` shows the CORS console error also on `/requests?view=all` / `?view=projects`, **but not on `/requests/new`** → F06’s error state is labelled a designed degraded-submit state, not a captured 502.
