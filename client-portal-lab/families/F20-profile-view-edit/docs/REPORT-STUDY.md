# F20 · Profile View + Edit — REPORT-STUDY (Gate R)

Studied in full:
- `reports/NESTLANCER_CLIENT_PORTAL_UI_RESEARCH_REPORT.md` (§1–§8 cover-to-cover)
- `reports/Nestlancer_Client_Portal_UI_Research_Report.xlsx` — **all 10 sheets opened and verified** (`1. Executive Findings` → `10. Sources`). `.md` wins on minor formatting differences (`₹` vs `Rs`).

## 1. Executive Findings & Inventory Rows Touching F20 (Quoted)

- **Finding #3 (High — Badge Contrast):** Status/visibility badges use full-saturation hue on 12% tint (`1.73–3.23:1` FAIL); fixed via darkened AA tokens (`--status-*-text`) + icon + text (C4).
- **Finding #4 (High — Dual Brand Systems):** Consolidate `--ta-brand-*` blue as sole `--primary` and delete violet `--accent-1` / auth teal (C5).
- **Finding #10, #11, #12 (Mobile, Dark Mode, Raw Card Classes):** Replace `border-gray-200/80 bg-white` with `--card` / `--border` / `--shadow-xs` (C6); guarantee dark-mode parity and 360–1440px responsiveness.
- **Page Inventory #42 (`/profile`, Sheet 3 Row 45):** *"Avatar, name, email, headline, bio, skill chips, 'Looking for security or notifications?' — Issue: Profile is **public-facing** (visibility toggle) yet lives under ACCOUNT in a private portal — concept mismatch."*
- **Page Inventory #43 (`/profile/edit`, Sheet 3 Row 46):** *"Photo upload/remove, first/last/phone/headline/bio/skills, sticky Save — Issue: Skill field is a **single comma-separated textarea/input** — should be chips + autocomplete."*

## 2. Token Table Summary (Report §3.2 + §5.2 Lock)

All 5 variants import `shared/tokens.css` + `shared/base.css` verbatim:
- **Brand:** `--brand-50 #ecf3ff` → `--brand-500 #465fff` → `--brand-700 #2a31d8` (dark `--primary-ink #a9bcff` for ≥4.5:1 AA text).
- **Typography:** `Outfit` display H1 `32–40px` (C18), H2 `20–24px`, body `14–16px`, meta `12px`, `--mono` for E.164 phone/timestamps/character counters (`≥11px`).
- **Surfaces:** `--background`, `--card`, `--muted`, `--border`, `--shadow-xs/sm`.

## 3. Benchmark Patterns Applied (Report §5, Sources [1]–[13])

- **AdminLTE Client Portals [1]:** *Scope visibility per client & explain what is public vs private* — directly informs our **C20** "Public profile" framing banner/card showing exactly what collaborators see (`Visibility: Public · Email hidden · Phone hidden`) with a real deep link to `Settings ▸ Account`.
- **AdminLTE Dashboard Rules [2]:** *Status is never colour alone* — `Public` visibility badge pairs globe/eye icon + AA-safe colour + text.
- **Tailwind Admin [7] & TailGrids [12]:** Production form hygiene — inline field validation, dirty-state unsaved-changes guard, accessible keyboard chips/combobox, dark parity, mobile sticky CTA without clipping.
- **Assembly [10]:** Clean client identity card paired with modular self-service links.

## 4. CHANGE / ADD / KEEP Scope for F20

### CHANGE (5/5 variants mandatory)
- **C20 — Resolve Profile placement conflict:** Frame `/profile` honestly as **"Public profile"** (how you appear to studio collaborators/clients), surface the live read-only visibility state from `Settings ▸ Account` (`Public · Email hidden on profile · Phone hidden on profile`), and deep-link directly to `../../F21-settings/V1/index.html?tab=account` to change privacy — **never a dead/fake toggle**.
- **C17 — Compress sidebar (232px) + Explore popover** (Blog & Portfolio).
- **C4 — AA badge contrast** (`--status-*-text/bg/border`, icon + text).
- **C5 — Single blue brand ramp** (`--brand-*`).
- **C6 — Tokenised cards** (`--card`, `--border`, `--shadow-xs`).
- **C18 — Display type scale** (`H1` 32–40px).

### Family Must-Include Upgrades (§4 — mandatory in 5/5; no numbered A-items target F20)
- **Skills autocomplete + chips input** upgrading `#profile-skills` (`Skills (comma-separated)`) while keeping comma-entry support.
- **Styled avatar dropzone/upload + remove preview** (never a bare native `<input type="file">`).
- **Both View (`/profile`) and Edit (`/profile/edit`) states** interactive in every variant, with **sticky save bar**, **inline validation**, **dirty-state warning**, and **save success / degraded-error states**.

### KEEP (5/5 variants)
- **Visibility honesty** — Public / Private / Connections only semantics + email/phone privacy microcopy from `Settings ▸ Account`.
- **Graceful wording** — Razorpay mobile helper (`"Used to pre-fill Razorpay checkout. Indian mobile required for INR payments."`) and `"Looking for security or notifications?"` card.

## 5. Roadmap & Acceptance Checklist (QA Gate)

- **Roadmap phases:** **P1** (Foundations: C4, C5, C6, C18) · **P3** (IA clarity: C20) · **P6** (Mobile 360–768px) · **P7** (Motion & polish).
- **Acceptance Checklist (§7.1):** Hierarchy <2s · One primary action per mode · Grouped sidebar ≤9 items + accurate ⌘K · Single blue ramp + AA contrast ≥4.5:1 / ≥3:1 UI · Outfit + mono type scale (H1 32–40px, nothing <11px) · Dark mode verified · Full keyboard nav + ARIA combobox/dialog/tabs + focus rings · Empty (no skills/bio fallback) + Skeleton + Error w/ retry · Mobile 360–768px zero horizontal scroll.

```
## GATE R (F20)
MD read: YES · XLSX sheets: 10/10 · C-items mapped: 6/6 (C20, C17, C4, C5, C6, C18) · A-items mapped: 0 numbered (+ §4 skills autocomplete & sticky save in 5/5)
KEEP listed: YES · Checklist copied: YES
Gate: PASS
```
