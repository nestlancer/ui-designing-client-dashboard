# Part 02 — Work (requests, projects, milestone rail)

Read `docs/meridian-page-prompts/README.md`. Canon: master §8.3–§8.4, §9.C. **Requires parts 00–01.** Update `index.html` links for these pages from `planned` → live.

## Task
Build the Work destination: one hub for requests + projects, and the project detail where **delivery and payment share the milestone rail**.

### Files to write

| Path | Job |
|---|---|
| `meridian-lab/pages/work-hub.html` | All requests + projects in one ledger |
| `meridian-lab/pages/request-new.html` | 4-step brief (anchors, no JS) |
| `meridian-lab/pages/request-detail.html` | Brief life + status rail |
| `meridian-lab/pages/projects.html` | 3 project cards (P1–P3) |
| `meridian-lab/pages/project.html` | Project detail — **Milestones default tab** |
| `meridian-lab/pages/project-progress.html` | Trust timeline |
| `meridian-lab/pages/project-deliverables.html` | Approve with evidence |
| `meridian-lab/pages/project-files.html` | Project file grid with provenance |

## Locked data
**Projects (exactly three):**
- **P1** `PRJ-2030-0011` Corporate LMS — In progress · **40 % (2 of 5)** · ₹52,200 · mid-project **₹20,880 Due 20 Feb**
- **P2** `PRJ-2030-0019` Bilingual CMS — Awaiting signature · ₹1,80,540
- **P3** `PRJ-2029-0044` Festive landing pages — Delivered · ₹31,320 · final **Due 22 Feb**

**Requests:** `NL-REQ-2030-0114` Converted · `0126` Under review · `0129` Quoted · `0131` Declined (show reason + Re-open).

**P1 milestones** (rail must show delivery + payment together): master §8.3 table — Deposit paid · Platform approved+due · Course in progress · Okta not started · Launch not started.

## Signature rule for this part
On `project.html`, Milestones is the default tab (not Overview). At ≥1180 px: rail spine left + node detail right. Only **one** node shows a primary (`Pay ₹20,880` on M2). Full ASCII: master §9.C.

## Page notes
- **`work-hub.html`:** segmented All / Requests 4 / Projects 3; ledger rows; Declined shows recorded reason.
- **`request-new.html`:** stepper Brief → Budget → Timeline → Review via `#step-1…4`; sticky “what happens next” card.
- **`projects.html`:** card grid (not table); each card answers progress, next date, money without a click.
- **`project-progress.html`:** 7 entries / 3 dates; every entry names actor + milestone.
- **`project-deliverables.html`:** M2 ×2 + M3 ×1; approval always shows who + when.
- **`project-files.html`:** provenance on the tile itself.

## Out of scope
Money checkout pages, messages, global files library, settings. Do not change Overview except fixing a broken cross-link.

## Output protocol
At most 2–3 HTML pages per turn. Keep shell identical to Overview.

## Acceptance checks
- [ ] 8 Work pages on disk and linked from `index.html`
- [ ] Milestone rail shows delivery + payment on the same node
- [ ] Progress 40 % explained as 2 of 5
- [ ] Declined request/quote path shows reason + re-open
- [ ] One primary per page; P1 M2 holds Pay on `project.html`
- [ ] No script / §8 data only

## Hand-off line
```
Part 02 done. Next: docs/meridian-page-prompts/03-money.md
```
