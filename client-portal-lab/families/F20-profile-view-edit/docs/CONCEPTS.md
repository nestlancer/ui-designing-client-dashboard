# F20 · Profile (View + Edit) — CONCEPTS (Gate 1)

Designed before writing any variant HTML. Every variant shares the locked single-blue token system (`shared/tokens.css` + `shared/base.css`), Arjun Mehta's frozen profile (`AM`, `Arjun Mehta`, `arjun.mehta@nestlancer.com`, `+919825012345`, `Proprietor · Mehta Wholesale Traders (Ahmedabad · Wholesale)`, bio, 4 skills `Proprietor, B2B Trade, Inventory, GST Invoicing`), **C20** honest `"Public profile"` IA framing + read-only visibility badge (`Public · Email hidden · Phone hidden`) linking to Settings ▸ Account (`F21`), both **View** and **Edit** states, styled avatar upload/remove, governed skills autocomplete combobox, sticky `Save changes`, inline DTO validation, dirty-state warning, and `Data / Empty / Loading / Error` states.

---

## Concept Cards & ASCII Sketches

### V1 · Calm Editorial Public Card (`Minimal`)
- **Persona & Moment:** Proprietor checking how Nestlancer project leads see his public card and making a calm, focused tweak to his headline or skills.
- **Axis A (Layout):** Centered single-column (`780px`) editorial dossier card with seamless top `Public view` ↔ `Edit profile` mode switch and sticky bottom `Unsaved changes` bar in Edit mode.
- **Axis B (Hierarchy):** Large `AM` monogram + `Arjun Mehta` + `Public` visibility pill anchor the top; structured bio & skill pills read like a clean executive dossier.
- **Axis C (Narrative):** *"Your public identity card on Nestlancer"* — leads with how collaborators view Arjun (`C20`), with a quiet privacy strip pointing straight to Settings ▸ Account (`F21`).
- **Axis D (Density):** Generous (`24–28px` card padding, airy vertical rhythm, zero visual clutter).
- **Axis E (JS Interaction):** Smooth View ↔ Edit mode toggle + governed skills combobox (`Enter`/click suggestion, `Backspace` remove) + `FileReader` avatar preview + dirty-navigation confirmation dialog.
- **Gate T Refs:** R1 + R3 + R4 + R8.

```
+-------------------------------------------------------------------+
| [Sidebar 232px] | Public profile          [View card | Edit form] |
|                 | [Visibility: Public · Email/Phone hidden ->F21] |
|                 | +---------------------------------------------+ |
|                 | | (AM) Arjun Mehta                            | |
|                 | |      Proprietor · Mehta Wholesale Traders...| |
|                 | | Bio: Runs a wholesale distribution...       | |
|                 | | Skills: [Proprietor][B2B Trade][Inventory]  | |
|                 | +---------------------------------------------+ |
+-------------------------------------------------------------------+
```

### V2 · Live Split Editor + Collaborator Preview (`Action / Live-Preview`)
- **Persona & Moment:** Client actively rewriting his headline, bio, and skill tags who wants to see the exact collaborator-facing card update keystroke-by-keystroke beside the form.
- **Axis A (Layout):** Asymmetric 2-column split workbench (`1.25fr` Edit Form on left + sticky `0.95fr` Live Collaborator Card & Privacy Summary on right; tabbed `Edit` / `Preview` toggle on mobile & full-page View mode toggle).
- **Axis B (Hierarchy):** Form field groups with live character counters (`47 / 160`, `99 / 2000`) on the left mirrored immediately in the elevated collaborator preview card on the right.
- **Axis C (Narrative):** *"Edit on the left, verify what collaborators see on the right"* — eliminates guesswork about what is public (`Name`, `Headline`, `Bio`, `Skills`) vs hidden (`Email`, `Phone` per `F21` settings).
- **Axis D (Density):** Balanced studio density (`18px` card padding, side-by-side comparison).
- **Axis E (JS Interaction):** Real-time keystroke mirroring into the collaborator preview card + interactive skill suggestion drawer + simulated Save Success / Save Failure retry toggle + sticky save bar.
- **Gate T Refs:** R2 + R5 + R6 + R9.

```
+-------------------------------------------------------------------+
| Public Profile Workbench     [Mode: Split Edit | Read-Only View]  |
+------------------------------------+------------------------------+
| EDIT PUBLIC IDENTITY               | LIVE COLLABORATOR PREVIEW    |
| Avatar: (AM) [Upload] [Remove]     | +--------------------------+ |
| First: [Arjun]  Last: [Mehta]      | | (AM) Arjun Mehta  [Pub]  | |
| Headline (57/160): [Proprietor...] | | Proprietor · Mehta...    | |
| Skills: [x Proprietor][+ Add...]   | | Email/Phone hidden ->F21 | |
| [Sticky: Unsaved · Discard · Save] | +--------------------------+ |
+------------------------------------+------------------------------+
```

### V3 · Dense Identity & Schema Ledger (`Dense`)
- **Persona & Moment:** Detail-oriented B2B operator auditing every profile attribute, API validation rule (`E.164`, `maxLength`), and field-level visibility status in one compact table-like specification sheet.
- **Axis A (Layout):** Full-width (`1040px`) structured key-value ledger (`Field · Current Value / Input · Public Visibility · Constraint`) with compact top identity bar and sticky action header.
- **Axis B (Hierarchy):** Three-column field rows align labels, values/inputs, and explicit visibility badges (`Visible on public profile` vs `Account-only · Hidden per Settings ▸ Account`) vertically.
- **Axis C (Narrative):** *"Complete identity & field-exposure specification"* — makes every field's privacy rule (`C20`) and `UpdateProfileDto` constraint transparent at a glance.
- **Axis D (Density):** High density (`12–14px` row padding, mono phone/email/counters, zero wasted vertical scroll).
- **Axis E (JS Interaction):** Instant View ↔ Edit table row transformation + inline E.164/length validator badges + keyboard combobox skill tagger + dirty diff counter (`"N fields modified"`).
- **Gate T Refs:** R2 + R6 + R7 + R9.

```
+-------------------------------------------------------------------+
| (AM) Arjun Mehta · Public Profile Ledger  [Edit all] [Save] [F21] |
+-----------------+-------------------------------+-----------------+
| FIELD           | VALUE / CONTROL               | EXPOSURE (C20)  |
| Full name       | Arjun Mehta                   | Public          |
| Email (locked)  | arjun.mehta@nestlancer.com    | Hidden (->F21)  |
| Phone (E.164)   | +919825012345                 | Hidden (->F21)  |
| Headline (≤160) | Proprietor · Mehta Wholesa... | Public          |
| Skills (4 tags) | Proprietor · B2B Trade · ...  | Public          |
+-----------------+-------------------------------+-----------------+
```

### V4 · Section-by-Section Inline Workbench (`Action / Queue-led`)
- **Persona & Moment:** Client who only wants to update *one* card (e.g., adding `"ERP Integration"` to Skills or swapping Avatar) without turning the whole page into a giant intimidating form.
- **Axis A (Layout):** Modular 2-column Bento grid (`Identity & Avatar`, `Contact & Privacy`, `Bio`, `Skills & Expertise`) where each card flips independently into inline Edit mode **or** opens a unified `"Edit all fields"` mode.
- **Axis B (Hierarchy):** Focused active-card elevation (`--brand-500` border ring on the currently edited module) while untouched cards remain in crisp read-only view.
- **Axis C (Narrative):** *"Quick surgical edits, one block at a time"* — keeps the calm read view intact while letting Arjun edit Avatar, Headline/Contact, Bio, or Skills in place.
- **Axis D (Density):** Medium modular cards (`16–20px` padding, 2-up bento grid on desktop).
- **Axis E (JS Interaction):** Per-card inline `"Edit"` / `"Save"` / `"Cancel"` + full-page `"Edit profile"` mode + curated B2B wholesale skill quick-add chips + dirty-state guard.
- **Gate T Refs:** R1 + R5 + R8.

```
+-------------------------------------------------------------------+
| Public Profile · Arjun Mehta         [Edit full profile] [-> F21] |
+---------------------------------+---------------------------------+
| IDENTITY & AVATAR        [Edit] | VISIBILITY & CONTACT    [->F21] |
| (AM) Arjun Mehta                | Profile: Public                 |
| Proprietor · Mehta Wholesale... | Email/Phone: Hidden on profile  |
+---------------------------------+---------------------------------+
| ABOUT / BIO              [Edit] | SKILLS & TAGS      [Editing...] |
| Runs a wholesale distribution...| [Proprietor x][B2B Trade x]     |
|                                 | [+ Type or pick suggestion...]  |
+---------------------------------+---------------------------------+
```

### V5 · Guided Public Profile Readiness Stepper (`Narrative / Stepper-led`)
- **Persona & Moment:** Client preparing to post a new project request who wants a guided review ensuring his public profile gives Nestlancer delivery teams complete business context.
- **Axis A (Layout):** Top 4-step **Profile Readiness Stepper** (`1. Identity & Photo` → `2. Business Bio` → `3. Domain Skills` → `4. Visibility Check`) + `2fr / 1fr` main stage and Readiness Checklist rail.
- **Axis B (Hierarchy):** Readiness score (`4 / 5 profile signals complete — optional photo remaining`) and active step header lead; sticky step-navigation + `Save changes` footer anchors the bottom.
- **Axis C (Narrative):** *"Help Nestlancer teams understand your business before scoping quotes"* — frames every field around why project managers read it (`Ahmedabad · Wholesale`, `GST Invoicing`, `B2B Trade`).
- **Axis D (Density):** Guided editorial cards (`20px` padding, clear step milestones).
- **Axis E (JS Interaction):** 4-stage interactive wizard (or one-click `"View completed public card"`) + live readiness checklist + governed skill combobox + `UpdateProfileDto` step validation.
- **Gate T Refs:** R2 + R3 + R7 + R9.

```
+-------------------------------------------------------------------+
| Public Profile  [1. Identity] -> [2. Bio] -> [3. Skills] -> [4]   |
+-------------------------------------------+-----------------------+
| STEP 3 · DOMAIN SKILLS & TAGS             | PROFILE READINESS 80% |
| [Proprietor x] [B2B Trade x] [Inventory x]| [v] Name & Headline   |
| [GST Invoicing x] [+ Autocomplete...]     | [v] Wholesale Bio     |
| Suggestions: +ERP +Multi-Tier Pricing     | [v] 4 Domain Skills   |
| [<- Back]          [Save changes] [Next->]| [ ] Optional Photo    |
+-------------------------------------------+-----------------------+
```

---

## Difference Test Matrix (§8.2 — All 10 Pairs Verified)

| Variant | Archetype | Unique A (Layout) + C (Narrative) Signature |
|---|---|---|
| **V1** | Minimal | Centered `780px` single-column card + *"Your public identity card on Nestlancer"* |
| **V2** | Live-Preview Split | `1.25fr / 0.95fr` side-by-side form & live preview + *"Edit on the left, verify collaborator card on the right"* |
| **V3** | Dense | `1040px` 3-column specification ledger + *"Complete identity & field-exposure specification"* |
| **V4** | Action / Modular | 2×2 Bento inline-edit cards + *"Quick surgical edits, one block at a time"* |
| **V5** | Narrative / Stepper | 4-step wizard + `2fr/1fr` readiness rail + *"Help Nestlancer teams understand your business"* |

Pairwise axes differing (`≥3` required, `≥1` in `{A, C}`):
- All 10 pairs (`V1–V2`, `V1–V3`, `V1–V4`, `V1–V5`, `V2–V3`, `V2–V4`, `V2–V5`, `V3–V4`, `V3–V5`, `V4–V5`) differ on **4 to 5 axes**, including both **A** and **C**.

## Required CHANGE / ADD / KEEP Coverage (5/5 Variants)

| Item | Description | V1 | V2 | V3 | V4 | V5 |
|---|---|---|---|---|---|---|
| **C20** | Honest `"Public profile"` framing + read-only visibility summary (`Public · Email/Phone hidden`) deep-linking to `F21` | YES | YES | YES | YES | YES |
| **View + Edit + Skills** | Both View & Edit states, avatar upload/remove, skills autocomplete combobox (`skills: string[]`), sticky save, validation, dirty guard | YES | YES | YES | YES | YES |
| **C17, C4, C5, C6, C18** | 232px sidebar + Explore, AA badges, single blue ramp, tokenised cards, Outfit display H1 | YES | YES | YES | YES | YES |
| **4 States** | Data + Empty bio/skills preview + Loading skeleton + Save/Load Error w/ retry | YES | YES | YES | YES | YES |

```
## GATE 1 (F20)
Concepts: 5 · Sketches: 5 · Difference Test: PASS (all 10 pairs ≥4 axes, unique A+C)
Archetype spread: minimal (V1) · live-split (V2) · dense (V3) · action/modular (V4) · narrative/stepper (V5)
Gate: PASS
```
