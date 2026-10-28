# F20 · Profile View & Edit — Gate 3 Delivery Report

- **Family**: `F20-profile-view-edit` (`/profile`)
- **Date**: `2026-10-28`
- **Baseline Lock**: Snapshots `34-profile-view.html`, `35-profile-edit.html` · Screenshots `012`, `013`, `026`, `036` · `users.openapi.json`
- **Token Scheme**: `shared/tokens.css` + `shared/base.css` (imported as-is, unmodified)

---

## 1 · Variant Matrix & Winner Selection

| Variant | Name | Archetype | Signature Layout & Interaction | Winner? |
|---|---|---|---|---|
| **V1** | **Calm Editorial Public Card** | Minimal (`800px`) | Editorial collaborator card with clean View ↔ Edit toggle, `FileReader` avatar upload/remove, governed skill combobox, C20 summary | — |
| **V2** | **Live Split Editor & Preview** | Split Workspace (`1.25fr / 0.95fr`) | Left edit form paired with a sticky right Public Collaborator Card updating keystroke-for-keystroke | **WINNER** |
| **V3** | **Dense Identity & Schema Ledger** | Dense (`1100px` spec table) | 3-column field ledger mapping values, `UpdateProfileDto` rules (`2–50`, E.164, `≤160`, `≤2000`), and C20 exposure + floating diff bar | — |
| **V4** | **Modular Bento Inline Workbench** | Action / Queue-led (`2×2` Bento) | 4 modular cards (`Identity`, `Visibility/Contact`, `Bio`, `Skills`) that flip independently or together into inline edit mode | — |
| **V5** | **Guided Readiness Stepper** | Narrative / Stepper-led | 4-step wizard + sticky Collaborator Readiness meter (`80%` → `100%` upon optional avatar upload) + Step 4 card review | — |

**Why V2 wins**: Clients editing their public profile always ask *"what will Nestlancer collaborators actually see vs. what stays private?"* **V2** answers that continuously in real time with a live side-by-side preview card while keeping contact visibility anchored in `F21` (**C20**).

---

## 2 · Defect & Enhancement Coverage (5 / 5 Variants)

- **C20 (Single-Home Privacy Ownership)**: Zero duplicated privacy toggles on `/profile`. All 5 variants render a clear read-only exposure summary (`Public · Email hidden · Phone hidden`) linking directly to `../../F21-settings/V1/index.html`.
- **Frozen Arjun Mehta Identity & `UpdateProfileDto` Validation**: `Arjun Mehta` (`AM`), immutable `arjun.mehta@nestlancer.com` (`Contact support to change`), E.164 `+919825012345`, `Proprietor · Mehta Wholesale Traders (Ahmedabad · Wholesale)` (`≤160`), wholesale bio (`≤2000`), and governed case-insensitive skill tags (`Proprietor`, `B2B Trade`, `Inventory`, `GST Invoicing`).
- **Dirty-State & Error Resilience**: Unsaved-changes confirmation dialog before discarding dirty edits, simulated `500` API save failure toggle for QA testing (`V1`–`V3`), 4 states (`Data`, `Empty`, `Loading`, `Error`), `<noscript>` fallback, and light/dark parity.

---

## 3 · Gate 3 Verification Results

- **Static checks**: `node --check` on all 5 inline scripts → **0 syntax errors** · Undefined CSS tokens → **0** · Broken local links → **0** · Remote URLs → **0** · Duplicate IDs → **0** · Nested `<button>`/`<a>` → **0** · Font sizes `< 11px` → **0**.
- **Headless JSDOM runtime**: Hydrated all 5 variants, tested View/Edit flips, skill tag add/remove, dirty-state dialogs, 4 state pills, theme toggle, and button smoke clicks → **0 runtime errors**, **0 post-hydration duplicate IDs**.
- **Honest limitations**: Avatar uploads preview client-side via `FileReader` (`≤5 MB` check) without persisting to a remote bucket; headless runtime checks ran in JSDOM rather than archived browser screenshots.
