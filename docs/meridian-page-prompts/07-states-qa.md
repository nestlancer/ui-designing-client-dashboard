# Part 07 — States, mobile showcase, and set QA

Read `docs/meridian-page-prompts/README.md`. Canon: master §9.H, §10, §15–§17. **Requires parts 00–06** (or as many product pages as exist — QA still runs on what is present).

## Task
1. Build the state / showcase pages.
2. Finish the launcher so every file is linked once with purpose + state chip.
3. Run set-level QA; fix blockers; log results in `meridian-lab/DECISIONS.md` or `meridian-lab/pages/README.md`.

### Files to write

| Path | Job |
|---|---|
| `meridian-lab/pages/states-empty.html` | 6 labelled empty states |
| `meridian-lab/pages/states-loading.html` | Overview + ledger skeletons |
| `meridian-lab/pages/states-error.html` | 4 exception surfaces + 404 search |
| `meridian-lab/pages/mobile-showcase.html` | Overview / Work hub / thread at 390×844 |
| `meridian-lab/pages/README.md` | How to open; what is static; QA table |
| `meridian-lab/index.html` | Update — all 40 linked, no `planned` left |

(`overview-night.html` belongs to part 01; if missing, create it here.)

## State page requirements
- **Empty (6):** no requests · no invoices · no saved methods · no unread · empty folder · no search results — each: hand-drawn glyph, sentence-case title, ≤90 char explanation, one action.
- **Loading:** skeleton mirrors real geometry; shimmer off under `prefers-reduced-motion`; note 400 ms delayed-reveal rule.
- **Error:** payment failed (cause → fix → Try another method) · quote expired (Re-request) · file too large (MB limit) · 404 with real search field.
- **Mobile showcase:** CSS device frames (hairline bezel, no shadows); bottom tab bar Overview · Work · Money · Messages · Account; note what reflows vs drops.

## Set QA checklist (master §15 + §17.7)

Run against the whole `meridian-lab/`:

- [ ] All §14 paths exist
- [ ] `index.html` links every file exactly once
- [ ] Zero `<script>` / `on*` / external `http(s)` (except mailto/tel)
- [ ] Overview · Billing · Invoices money reconciles (§8.2)
- [ ] Shell (rail + Now bar) consistent across product pages
- [ ] Status vocabulary matches §13.4
- [ ] Spot-check 320 / 768 / 1440 on Overview, project, billing, thread
- [ ] No generator scripts under `meridian-lab/`
- [ ] `DECISIONS.md` attests hand-authorship + QA notes (`page · issue · fixed?`)

## Out of scope
New product features not in the master blueprints. Do not commit/push.

## Output protocol
Write state pages (2 per turn), then QA fixes only. End with a short delivery report:

```
Part 07 · QA
Files: <count>/40
Money reconcile: PASS/FAIL
Blockers open: <n>
Preview: cd meridian-lab && python3 -m http.server 8130
```

## Hand-off line
```
Part 07 done. Meridian set complete (or list remaining blockers).
```
