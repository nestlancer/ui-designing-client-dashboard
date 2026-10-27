# F06 · Request · New Form — Gate T · TEMPLATE-RESEARCH

**Order respected:** Gate S (`BASELINE-MAP.md`) → Gate R (`REPORT-STUDY.md`) → Gate A (`API-MAP.md`) → complete UI requirements below → **only then** web searches.

## Complete UI requirements (restated before searching)

One route `/requests/new`, full app shell (232 + 64 + breadcrumb + ⌘K + theme + bell + avatar, Explore popover), H1 `New request` + frozen intro + `Back to requests`, exactly three sections (`Brief`, `Budget`, `Timeline & requirements`) with their frozen descriptions, exactly 10 locked fields (Title*, Description*, Category, Budget min, Budget max, Currency, Budget is flexible, Preferred start, Deadline, Requirements one-per-line) + 10 help affordances, a sticky footer (`Cancel`, `Save draft`) honest about completion, **attachment-at-creation styled dropzone** and **budget guide** (family ADDs, both wired to Gate-A endpoints), inline validation / skeleton loading / error-with-retry / success states, cancel that never loses work, one locked blue token scheme (C4/C5/C6/C18), light + dark, 360–1440, keyboard + reduced motion.

## GATE T (F06)
Queries run: 6 · Refs opened: 11/≥8 · TEMPLATE-RESEARCH.md written: YES
Patterns mapped to V1–V5: YES · No invented API features: YES · Order S→R→A→T respected: YES
Gate: PASS

## 1 · Search queries used

1. `multi-step intake form UI design patterns inline validation progress indicator sticky footer dropzone`
2. `file upload dropzone UI design pattern progress states accessible styled input file`
3. `form live preview summary side rail sticky design pattern two column intake form UX`
4. `shadcn admin dashboard data table template empty loading error states sortable pagination design`
5. `accessible multi step form progress aria-current step wizard 2026`
6. `SaaS filtering saved views URL state dashboard reference` (cross-family pattern for the gallery/saved-draft link)

## 2 · References opened and studied (11)

| # | Name | URL | Page-job match | Patterns to adopt (layout/hierarchy/interaction only) | Patterns rejected + why |
|---|---|---|---|---|---|
| 1 | **SaaSUI — Multi-Step Form & Wizard UX 2026** | https://www.saasui.design/blog/saas-multi-step-form-wizard-ux-patterns | Exact job: 10-field intake split into 3 meaningful sections | Group by meaning (Brief / Budget / Timeline), honest named stepper (“Step 2 of 3”), **validate per step before advancing**, lossless Back, save-and-resume → V2/V4 | Conditional branching / “a dozen one-field steps” — F06 has exactly 3 sections and 10 locked fields; extra steps would invent fields. |
| 2 | **UXPatterns.dev — File Input Pattern** | https://uxpatterns.dev/patterns/forms/file-input | Exact job: attachment-at-creation dropzone | Dashed dropzone with visually hidden (not `display:none`) native input; `role=button` + Enter/Space; `aria-live` file names; `role=progressbar` with `aria-valuenow`; success/error per file; constraints shown inside the zone; file list **below** the zone → all 5 variants | Native visible file input (banned by F06), cloud-picker SDKs, camera capture — no Gate-A endpoint / out of scope. |
| 3 | **Pixso — File Upload UI: Progress, Retry & Errors** | https://pixso.net/tips/file-upload-ui-design/ | Upload state machine | Separate Selected / Validating / Uploading / Processing / Failed / Complete, each with its own recovery action; “never animate a percentage not tied to real progress”; keep rows stable; distinguish local validation from server decisions → dropzone states + honesty note | Its hypothetical “5 files / 20 MB / PDF-PNG” rules replaced by Gate-A facts (`attachments[] maxItems:10`, `size` 1…524288000, `fileType` enum). |
| 4 | **shadcn.io — Form with Live Preview** | https://www.shadcn.io/blocks/form-with-preview | Exact job: live summary of the brief | Form left + live preview right, character counters tied to fields, keyboard radio groups, one live region announcing save results, failed submit focuses the first invalid field, preview stacks under the form on phone → V5 bento split | Its “Publish entry” action and changelog labels — F06 has one primary `Save draft` (`POST /api/v1/requests`); no publish endpoint. |
| 5 | **NN/g — Website Forms Usability: Top 10** | https://www.nngroup.com/articles/web-form-design/ | Form fundamentals | Single column by default; top-aligned labels; group related fields; **no Reset/Clear Form button** (destructive); visible labels for screen readers → V1/V3 and the cancel-confirm design | “Keep it short / remove fields” — the 10 fields are content-locked; cannot delete any. |
| 6 | **shadcn/ui — Data Table docs** | https://ui.shadcn.com/docs/components/base/data-table | State discipline (cross-checked from F05 research) | Stable state model for sorting/filtering; designed empty/loading states; keep headers visible → applied to the F06 attachment list (empty/processing/ready) | React/TanStack dependency — offline lab, hand-written JS only. |
| 7 | **Kiranism — next-shadcn-dashboard-starter (GitHub)** | https://github.com/Kiranism/next-shadcn-dashboard-starter | Full dashboard starter with forms/wizards | URL-synced form/filter state, real create/update mutations with cache invalidation, multi-step + dialog/sheet form patterns → `?draft=` resume + success state | Next.js/Clerk/TanStack stack, AI-first features — no CDN/framework allowed and no Gate-A AI endpoint. |
| 8 | **Reform — Mobile Multi-Step Forms guide** | https://www.reform.app/blog/mobile-multi-step-forms-responsive-ux-guide | 360/390px intake | 3–5 related fields per screen, 44–48px targets, **sticky primary action in a bottom bar**, thin progress bar + “Step 2 of 3” on small screens, validate on blur, keep entered data → mobile footer + V2 | Form analytics / conditional routing / conversion tracking — no endpoint, would invent telemetry. |
| 9 | **Setproduct — Data table UI design 2026** | https://www.setproduct.com/blog/data-table-ui-design | Cross-checked for the attachment queue | Table anatomy + per-cell status badges + “designed empty state where rows would be”; numbers right-aligned → attachment chip list with icon+text status | Bulk selection/toolbar — no bulk-delete client endpoint in Gate A. |
| 10 | **shadcn.io — Empty Table example** | https://www.shadcn.io/examples/empty-table | Dropzone empty state | Icon media + title + teaching line + one action; decorative icon `aria-hidden` → “No files yet — add a brief, screenshot or spec” | Generic “Add Entry” copy — replaced with frozen F06 wording. |
| 11 | **Nestlancer repo PR #4 — client portal lab shared kit v2** | https://github.com/nestlancer/ui-designing-client-dashboard/pull/4 | Same repo, sibling lab pages | `?state=loading\|error`, theme persistence, sheets/toasts/palette, headless verification light+dark at 430/1366/1440 → adopted the **state URL convention** and the footer/toast anatomy | Its shared `kit.css`/`kit.js` and any F06-like form code are **not adopted** — F06 prompt §9.1 allows only `tokens.css` + `base.css` in `shared/`; §1.3 requires hand-authored per-variant CSS. Files are not present in this checkout (removed in `a5ec0bb`). |

Additional sources read as search excerpts (recorded, not counted as opened): [Mironsoft accessible steppers](https://www.mironsoft.de/en/blog/accessible-multi-step-forms-progress) (`aria-current="step"`), [Shadcn Studio AdminCN](https://shadcnstudio.com/templates/admin-dashboard/admincn) (form wizard + validation page inventory), [ui-craft forms skill](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/forms.md) (validate on blur, debounce, never on mount), [Codefronts sticky two-column layout](https://codefronts.com/layouts/css-two-column-layout/css-two-column-layout-sticky-sidebar/).

## 3 · Adopted patterns → concept axes (§8.2)

| Pattern | Axis | Variant(s) |
|---|---|---|
| Single-column classic, grouped sections, sticky footer, no reset button (1, 5, 8) | A single-column · D airy · C static sections | **V1 Classic Brief** |
| Honest named stepper, per-step validation, `aria-current="step"`, lossless Back (1, 8) | C stepper-led · B narrative-first · E step transitions | **V2 Three Steps** |
| Dense two-column field grid, compact rhythm, budget meter (3, 6, 9) | A compact grid · D dense · B numbers-first | **V3 Compact Desk** |
| Chapter-sticky left rail, scroll-spy, autosave/resume (1, 4, 7) | A 2-col sticky rail · C chapter-sticky · E scroll-spy | **V4 Guided Narrative** |
| Form + live preview rail, char counters, one live region, stacks on phone (4, 7) | A bento split · B verdict-first · E live preview/count-up | **V5 Bento Split** |
| Styled dropzone state machine + per-file status (2, 3, 9, 10) | D honest surfaces · E progress/toasts | V1–V5 (5/5) |
| `?state=loading\|error` deep links + theme persistence (11) | E drawer/toast/status | V1–V5 |

## 4 · Cross-check against Gate A (no invented features)

- No cloud-picker, no AI assist, no publish/submit-for-quote mutation, no bulk file operations, no analytics/telemetry, no extra fields — none has a client endpoint in `API-MAP.md`.
- Dropzone constraints come from `media.openapi.json` (`fileType` enum, `size` bounds) and `CreateRequestDto.attachments[] maxItems:10`; the budget guide uses `BudgetDto` + captured placeholders only.
- **No features invented from templates; all CTAs still Gate-A or demo-labelled.**
