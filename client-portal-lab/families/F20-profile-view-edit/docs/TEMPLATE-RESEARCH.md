# F20 · Profile (View + Edit) — TEMPLATE-RESEARCH (Gate T)

Online template & UX pattern research executed **after** Gates S, R, and A. Every reference R1–R9 below was genuinely fetched and read via `fetch_page` (status 200). **Colour-scheme discipline:** §5 single-blue token system (`shared/tokens.css`) is locked; zero palette ideas were imported.

## 1. Search Queries Run

- `SaaS user profile edit form UI design patterns public visibility skills tag autocomplete shadcn`

## 2. Reference Table (9/9 Opened & Verified)

| ID | Source & URL | Pattern / Product Archetype | Job Match |
|---|---|---|---|
| **R1** | [SaaSUI — SaaS Profile & Account UX Patterns (2026)](https://www.saasui.design/blog/saas-profile-account-ux-patterns) | Top identity block (avatar + monogram fallback + explicit save + current-state visibility) | Direct match for Arjun Mehta identity header + explicit sticky save |
| **R2** | [SaaSUI — SaaS Tags, Labels & Chips UX (2026)](https://www.saasui.design/blog/saas-tags-labels-chips-ux-patterns) | Governed open tag vocabulary: case-insensitive autocomplete + existing suggestions + removable input chips | Direct match for upgrading `#profile-skills` into a chip combobox |
| **R3** | [UX Patterns for Developers — User Profile Pattern](https://uxpatterns.dev/patterns/authentication/user-profile) | Public profile vs Account settings boundary, view ↔ edit mode switching, privacy-aware field display | Direct match for **C20** Public profile IA + View/Edit dual state |
| **R4** | [Shadcn Examples — Profile Page Block](https://shadcnexamples.com/profile-page) | Centered identity header card + structured field cards with avatar upload trigger | Direct match for clean tokenised profile card composition |
| **R5** | [shadcn.io — User Profile Edit Sheet](https://www.shadcn.io/examples/user-profile-edit-sheet) | Slide-over edit drawer preserving read-view context underneath, anchored footer save | Direct match for V3 contextual edit drawer / split editor |
| **R6** | [Shadcnblocks — Form Patterns 3 (Profile Edit Form)](https://www.shadcnblocks.com/component/form/form-patterns-3) | Server-mirrored `defaultValues`, explicit dirty tracking, inline field validation on save | Direct match for `UpdateProfileDto` validation & dirty-state guard |
| **R7** | [AdminLTE — 8 Best shadcn/ui Settings Templates 2026](https://adminlte.io/blog/shadcn-ui-settings-templates/) | Canonical `shadcn-admin` layout separating `Profile` (public identity) from `Account` (privacy/email/delete) | Direct match for **C20** cross-link between F20 Profile & F21 Account |
| **R8** | [SaaSUI — SaaS Avatar & User Presence UX Patterns (2026)](https://www.saasui.design/blog/saas-avatar-user-presence-ux-patterns) | High-contrast stable monogram fallback (`AM`), accessible avatar `alt`/labels, immediate upload preview | Direct match for Arjun Mehta `AM` monogram + `FileReader` upload |
| **R9** | [Shadcn Studio — Accessible Form Primitives](https://shadcnstudio.com/docs/components/form) | Semantic `Field` + `Label` + `aria-describedby` helper + `aria-invalid` error message composition | Direct match for WCAG 2.2 AA form error & helper wiring |

## 3. Per-Reference Notes (Borrow vs Reject)

- **R1 (SaaSUI Profile & Account UX):** *Layout:* Identity anchor card at top; explicit `Save changes` button (never silent blur auto-save on identity fields); unmistakable confirmation banner. *Borrow:* Identity-first framing + explicit sticky save bar + read-only email lock explanation. *Reject:* Mixing billing/plan cancellation on the profile page.
- **R2 (SaaSUI Tags, Labels & Chips UX):** *Component detail:* Distinguishes removable *input chips* (Edit mode) from read-only *tags* (View mode), with governed autocomplete that matches case-insensitively (`b2b` matches `B2B Trade`) and offers curated suggestions before minting a new tag. *Borrow:* Governed skill combobox (`role="combobox"`, `ArrowDown`/`Enter`/`Backspace`, duplicate prevention, `maxLength: 50` per `UpdateProfileDto`). *Reject:* Coloured rainbow tag pills (locked to single blue/neutral token ramp).
- **R3 (UX Patterns — User Profile):** *Layout:* Explicitly contrasts *User Profile* (how Nestlancer collaborators see you) with *Account Settings* (privacy, security, notifications). *Borrow:* **"Public profile"** framing + `"How Nestlancer collaborators see your card"` preview + **C20** visibility summary banner linking to Settings ▸ Account (`F21`). *Reject:* Follower/social-feed counters (not in Nestlancer's domain).
- **R4 (Shadcn Examples Profile Page):** *Layout:* Centered 48rem column with avatar upload/remove controls beside display name, headline, and contact metadata. *Borrow:* Clean editorial single-column rhythm for V1. *Reject:* Embedding Security/Notifications tabs inside `/profile` (those live in `F21`).
- **R5 (shadcn.io Profile Edit Sheet):** *Component detail:* Preserves the live public profile view while editing inside an anchored panel with sticky footer `Save changes` + `Cancel`. *Borrow:* Contextual side-by-side live card preview + editor in V2 and slide-over/inline edit drawer in V4. *Reject:* Hiding bio/skills fields behind extra clicks.
- **R6 (Shadcnblocks Form Patterns 3):** *Component detail:* Tracks dirty diff against frozen baseline (`Arjun Mehta`, `+919825012345`, headline, bio, 4 skills) so `Unsaved changes` bar and navigation guard only trigger when values actually differ. *Borrow:* Exact diff-based dirty indicator + `Discard changes` reset. *Reject:* Silent form reset without confirmation when dirty.
- **R7 (AdminLTE shadcn/ui Settings Templates):** *Layout:* Validates `Profile` vs `Account` split with helper copy under every control (`160` char counter on headline, `2000` char counter on bio, E.164 hint on phone). *Borrow:* Character counters + constraint helper copy matching `UpdateProfileDto`. *Reject:* Inventing social URL array fields (not in `UpdateProfileDto`).
- **R8 (SaaSUI Avatar UX):** *Component detail:* Stable `AM` monogram on brand-tinted surface, `FileReader` instant image preview on file pick, `Remove photo` reverting cleanly to `AM`, accessible label `"Avatar for Arjun Mehta"`. *Borrow:* Full `AM` ↔ uploaded image preview + `Remove` cycle. *Reject:* Fake server cropper endpoints.
- **R9 (Shadcn Studio Form):** *Component detail:* Associates every `<input>`/`<textarea>` with `<label for>`, `aria-describedby` constraint/error IDs, and `aria-invalid="true"` on validation failure, plus simulated save-error retry banner. *Borrow:* Strict ARIA form wiring across all 5 variants. *Reject:* Toast-only validation errors that vanish before reading.

## 4. Variant Inspiration Map

- **V1 (`Calm Editorial Public Card` — Minimal):** R1 + R3 + R4 + R8
- **V2 (`Live Split Editor + Public Preview` — Action / Queue-led):** R2 + R5 + R6 + R9
- **V3 (`Dense Identity & Field Spec Ledger` — Dense):** R2 + R6 + R7 + R9
- **V4 (`Field-by-Field Inline Edit Workbench` — Action / Inspector-led):** R1 + R5 + R8
- **V5 (`Guided Profile Readiness Stepper` — Narrative / Stepper-led):** R2 + R3 + R7 + R9

```
## GATE T (F20)
Queries run: 1 · References opened: 9 (≥8) · Variant inspiration mapped: 5/5
Gate: PASS
```
