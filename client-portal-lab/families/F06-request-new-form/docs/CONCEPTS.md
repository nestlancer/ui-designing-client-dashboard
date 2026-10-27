# F06 · Request · New Form — Gate 1 · CONCEPTS (printed BEFORE code)

Five different design ideas, one locked token file, one frozen 10-field story, all C-items 5/5, both family ADDs 5/5. Colour is never an axis.

## GATE 1 (F06)
Concept cards: 5/5 · Sketches: 5/5 · Difference test: PASS
C coverage 5/5: YES · P1 A coverage 5/5: YES · P2-P3 ≥3/5: N/A (no P2–P3 ADD in F06; both family ADDs are 5/5)
Gate: PASS

---

### F06 · Request · New Form · V1 “Classic Brief”

- **Keeps:** H1 `New request`, frozen intro, `Back to requests`, three sections + descriptions, 10 fields + help, sticky `Cancel` / `Save draft`.
- **Fixes/Adds:** C17, C4, C5, C6, C18 · attachment-at-creation dropzone · budget guide.
- **Axes:** **A** single column (max 760px) · **B** narrative-first · **C** static sections · **D** airy minimal · **E** inline validation + tooltips + sticky CTA.
- **Signature interaction:** help `?` buttons open real `aria-expanded` popovers (Esc closes, focus restores); inline errors appear on blur/submit next to the field; footer shows an honest completion count (“7 of 10 fields ready”) and never enables a Reset button.
- **API basis:** `POST /requests` (`CreateRequestDto`), `POST /media/upload/direct`, `GET /media/{id}/status`, `PATCH /requests/{id}` documented.
- **Template refs:** NN/g single-column form · SaaSUI wizard validation timing · UXPatterns file input.
- **Layout sketch:**
```
┌ sidebar 232 ┬ header 64: breadcrumb · ⌘K · theme · bell · avatar ┐
│ MAIN        │ New request                        [Back to requests]│
│ Explore▾    │ Describe your project and save a draft…               │
│ ACCOUNT     │ ┌ Brief ───────────────────────────────────────────┐ │
│             │ │ Title * [?]   Description * [?]   Category [?]    │ │
│             │ ├──────────────────────────────────────────────────┤ │
│             │ │ Budget min [?]  Budget max [?]  Currency [?]      │ │
│             │ │ [✓] Budget is flexible [?]  · budget guide panel  │ │
│             │ ├──────────────────────────────────────────────────┤ │
│             │ │ Preferred start [?]  Deadline [?]  Requirements   │ │
│             │ │ ┌ dropzone (dashed) ────────────────────────────┐ │ │
│             │ │ │ file rows: name · size · ● status · remove     │ │ │
│             │ └──────────────────────────────────────────────────┘ │
│             │ sticky footer: 7 of 10 ready   [Cancel] [Save draft]  │
└─────────────┴──────────────────────────────────────────────────────┘
```
- **Shell / dark / 375 notes:** standard shell; dark token swap; at 375 all field pairs stack, footer becomes full-width two-button bar with safe-area padding.
- **Risk:** sticky footer hiding the last field → `scroll-padding-bottom` + footer height reserved in `main`.

---

### F06 · Request · New Form · V2 “Three Steps”

- **Keeps:** same 10 fields, same three section titles (now steps), same footer labels.
- **Fixes/Adds:** C17, C4, C5, C6, C18 · dropzone in step 3 · budget guide in step 2.
- **Axes:** **A** centred step stage · **B** progress-first · **C** stepper/progress-linked · **D** airy · **E** per-step validation + `aria-current="step"`.
- **Signature interaction:** named stepper (`01 Brief · 02 Budget · 03 Timeline & requirements`); `Next` validates only that step and moves focus to the first error; Back is lossless; `Step X of 3` visible on phone.
- **API basis:** `POST /requests` (single create at the end), `POST /media/upload/direct`, `GET /media/{id}/status`.
- **Template refs:** SaaSUI wizard UX · Reform mobile steps · Mironsoft `aria-current` stepper (search excerpt).
- **Layout sketch:**
```
┌ header 64 ─────────────────────────────────────────────────────────┐
│ New request                                     [Back to requests]  │
│  ① Brief ━━━━━ ② Budget ━━━━━ ③ Timeline & requirements             │
│  Step 2 of 3                                                         │
│ ┌─────────────── step card (one idea) ────────────────────────────┐ │
│ │ Budget · Approximate range in INR.                               │ │
│ │ fields (3–4) + inline budget guide                               │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│ [← Back]                        [Next →] / [Save draft] (step 3)     │
└────────────────────────────────────────────────────────────────────┘
```
- **Shell / dark / 375 notes:** stepper becomes a thin progress bar + “Step 2 of 3” at 375; completed steps remain clickable; dark step rail uses `--brand-50` equivalent tint via tokens.
- **Risk:** hiding fields makes the “10 locked fields” feel fewer → a persistent “10 fields · 3 steps” counter and all fields reachable via Back/click.

---

### F06 · Request · New Form · V3 “Compact Desk”

- **Keeps:** all 10 fields visible simultaneously; no hidden step content.
- **Fixes/Adds:** C17, C4, C5, C6, C18 · dropzone as a compact horizontal strip · budget band meter.
- **Axes:** **A** 12-column compact grid · **B** numbers-first · **C** static sections · **D** dense ops form · **E** live budget-band meter + autosave chip.
- **Signature interaction:** typing min/max updates a 32px `tabular-nums` band display and a slim range meter; every field has an inline character/constraint counter; autosave chip shows “Draft kept on this device”.
- **API basis:** `POST /requests` (`BudgetDto.min/max/currency/flexible`), `POST /media/upload/direct`, `GET /media/{id}/status`.
- **Template refs:** Codefronts two-column form grid · Setproduct numeric alignment · shadcn data-table state discipline.
- **Layout sketch:**
```
┌ header 64 ─────────────────────────────────────────────────────────┐
│ New request · compact desk            10 fields · autosaved ●        │
│ ┌ Brief (6col) ─────────┐ ┌ Budget (6col) ───────────────────────┐  │
│ │ Title*  Description*  │ │ ₹ 50,000 ─ ₹ 1,50,000  (32px mono)   │  │
│ │ Category              │ │ min [ ] max [ ] INR [ ] ☑ flexible   │  │
│ ├───────────────────────┴─┴───────────────────────────────────────┤  │
│ │ Timeline & requirements: start · deadline · requirements · dropzone│ │
│ └──────────────────────────────────────────────────────────────────┘ │
│ sticky footer: validation summary + [Cancel] [Save draft]            │
└────────────────────────────────────────────────────────────────────┘
```
- **Shell / dark / 375 notes:** 2-col grid collapses to 1 col at 768; dense rows still ≥44px targets; dark meter fill = `--primary`.
- **Risk:** dense layout + tooltips could overlap → popovers portal-free but absolutely positioned with `z-index` and collision flip.

---

### F06 · Request · New Form · V4 “Guided Narrative”

- **Keeps:** all frozen copy; adds narrative questions written **only** from section descriptions (no invented brand claims).
- **Fixes/Adds:** C17, C4, C5, C6, C18 · dropzone in chapter 3 · budget guide in chapter 2.
- **Axes:** **A** 2-col with sticky left rail · **B** narrative-first · **C** chapter-sticky · **D** editorial rules · **E** scroll-spy + autosave/resume.
- **Signature interaction:** left rail is a chapter TOC with completion ticks; IntersectionObserver sets `aria-current`; a “Resume draft” chip restores `?draft=` values from `localStorage` with a live-region announcement.
- **API basis:** `POST /requests`, `PATCH /requests/{id}` (resume documented), `POST /media/upload/direct`, `GET /media/{id}/status`.
- **Template refs:** SaaSUI wizard save-and-resume · Codefronts sticky sidebar · Kiranism URL state.
- **Layout sketch:**
```
┌ header 64 ─────────────────────────────────────────────────────────┐
│ ┌ left rail sticky ───────┐ ┌ narrative column ───────────────────┐ │
│ │ 01 Brief          ✓     │ │ “Tell us about your project”         │ │
│ │ 02 Budget         ●     │ │ Brief fields + help + tooltips       │ │
│ │ 03 Timeline        ○    │ │ ─ rule ─ Budget + guide ─ rule ─     │ │
│ │ progress 4/10           │ │ Timeline + dropzone                  │ │
│ │ [Resume draft] [gallery]│ │ sticky mini footer [Cancel][Save]    │ │
│ └────────────────────────┘ └──────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```
- **Shell / dark / 375 notes:** rail becomes a top sticky progress strip; dark rules use `--border`; reduced motion disables scroll-spy transforms.
- **Risk:** scroll-spy vs manual focus race → observer updates only the rail, never moves focus.

---

### F06 · Request · New Form · V5 “Bento Split”

- **Keeps:** all 10 fields; the preview shows **only** data the user typed (no invented client data).
- **Fixes/Adds:** C17, C4, C5, C6, C18 · dropzone as a hero bento tile · budget guide as a tile.
- **Axes:** **A** bento split (form 2/3 + preview 1/3) · **B** verdict-first · **C** accordion sections · **D** bento · **E** live preview + count-up + toasts.
- **Signature interaction:** a live “Request card” preview (title, description excerpt, category, budget band, dates, requirement chips, attachment count) updates on every input; one polite live region announces save/validation results; failed submit focuses the first invalid field.
- **API basis:** `POST /requests` (payload exactly mirrors the preview), `POST /media/upload/direct`, `GET /media/{id}/status`, `GET /requests/{id}` (success state).
- **Template refs:** shadcn.io Form with Live Preview · shadcn.io Empty Table · Pixso upload states.
- **Layout sketch:**
```
┌ header 64 ─────────────────────────────────────────────────────────┐
│ New request        [Back to requests]                                │
│ ┌ form column ─────────────────────────┐ ┌ preview rail (sticky) ─┐ │
│ │ [Brief ▾]  fields 1–3                │ │ REQUEST CARD           │ │
│ │ [Budget ▾] fields 4–7 + guide tile   │ │ Title…                 │ │
│ │ [Timeline ▾] fields 8–10             │ │ ₹ 50,000 – 1,50,000   │ │
│ │ ┌ dropzone tile ───────────────────┐ │ │ ● 0 files · 0 reqs    │ │
│ │ │ dashed · constraints · statuses │ │ │ [Save draft]           │ │
│ │ └─────────────────────────────────┘ │ │ completion 4/10        │ │
│ └─────────────────────────────────────┘ └────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```
- **Shell / dark / 375 notes:** preview rail un-sticks and stacks **below** the form on phone; accordions are real `<button aria-expanded>`; dark preview uses `--card`.
- **Risk:** accordion hiding fields could break “all fields reachable” → `no-JS` fallback shows all sections open (CSS-only open state), JS enhances.

---

## Table 1 — variant × keeps / fixes / adds / axes / signature / API

| Variant | Keeps | Fixes (C#) | Adds | Axes (A/B/C/D/E) | Signature interaction | API endpoints |
|---|---|---|---|---|---|---|
| V1 Classic Brief | 10 fields + 3 sections + footer copy | C17 C4 C5 C6 C18 | dropzone + budget guide | single-col / narrative / static / airy / validation+tooltips | help popovers + honest completion count | POST requests · media/upload/direct · media/{id}/status |
| V2 Three Steps | same, sections as steps | C17 C4 C5 C6 C18 | dropzone + guide | stage / progress / stepper / airy / per-step gates | Next validates step, focus first error | POST requests · media/upload/direct |
| V3 Compact Desk | same, all visible | C17 C4 C5 C6 C18 | dropzone + guide | compact grid / numbers / static / dense / live band meter | ₹ band meter + autosave chip | POST requests · media/upload/direct |
| V4 Guided Narrative | same + chapter TOC | C17 C4 C5 C6 C18 | dropzone + guide | sticky rail / narrative / chapter-sticky / editorial / scroll-spy | resume draft + scroll-spy ticks | POST/PATCH requests · media/upload/direct |
| V5 Bento Split | same + live preview | C17 C4 C5 C6 C18 | dropzone + guide | bento split / verdict / accordion / bento / live preview | live request-card preview | POST requests · GET requests/{id} · media/upload/direct |

## Table 2 — distinctness (axes A–E)

| Variant | A · Layout | B · Hierarchy | C · Narrative | D · Density | E · Interaction | A+C pair |
|---|---|---|---|---|---|---|
| V1 | single column | narrative-first | static sections | airy | validation + tooltips | single/static |
| V2 | centred step stage | progress-first | stepper | airy | step gates + `aria-current` | stage/stepper |
| V3 | 12-col compact grid | numbers-first | static sections | dense | band meter + counters | grid/static* |
| V4 | 2-col sticky rail | narrative-first | chapter-sticky | editorial | scroll-spy + resume | rail/chapters |
| V5 | bento split + rail | verdict-first | accordion | bento | live preview + toasts | split/accordion |

\* V3 shares “static sections” with V1 but its A (compact grid vs single column), B (numbers vs narrative), D (dense vs airy) and E (meter vs tooltips) differ → 4/5 axes. All other pairs differ on ≥3 axes including A or C. **Difference test: PASS.**

## Table 3 — coverage

| Requirement | V1 | V2 | V3 | V4 | V5 | Coverage |
|---|---|---|---|---|---|---|
| C17 compressed shell | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 |
| C4 AA status (icon+text) | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 |
| C5 one brand ramp | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 |
| C6 tokenised cards | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 |
| C18 display type scale | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 |
| Family ADD · attachment at creation | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 |
| Family ADD · budget guide | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 |
| 10 fields + 3 section titles + sticky footer | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 |
| Validation / skeleton / error+retry / success / cancel-safe | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 |
| Light + dark · 360–1440 · keyboard · reduced motion | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 |
