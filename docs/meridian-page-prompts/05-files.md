# Part 05 — Files (library + preview)

Read `docs/meridian-page-prompts/README.md`. Canon: master §8.9, §9.F. **Requires part 00.** Prefer after Work/Money so provenance links resolve.

## Task
Build the file library where **provenance is visible without opening a menu**, plus a real HTML document preview (not an image).

### Files to write

| Path | Job |
|---|---|
| `meridian-lab/pages/files.html` | Library grid/list + quota + upload popover |
| `meridian-lab/pages/file-preview.html` | Invoice page-1 mock in HTML |

## Locked files (8 items, §8.9)
| Name | Origin |
|---|---|
| `nair-lms-course-builder-v2.zip` | Deliverable · P1 · M3 |
| `nair-lms-platform-setup.pdf` | Deliverable · P1 · M2 · approved |
| `nair-lms-okta-saml-metadata.xml` | Uploaded by Priya · 4 Feb 2030 |
| `nair-bilingual-cms-quote.pdf` | Quote `NL-QTE-2030-0051` |
| `nair-lms-mid-project-invoice.pdf` | Invoice `NL-INV-2030-0009` |
| `festive-campaign-final-assets.zip` | Deliverable · P3 |
| `brand-tokens-2030.fig` | Shared by Nestlancer |
| `accessibility-audit-lms.pdf` | Deliverable · P1 · M2 |

Storage: **184 MB of 5 GB**.

## Page notes
- **`files.html`:** toolbar (search, type filter `<details>`, view toggle, Upload primary); 4 px quota meter; generated docs grouped by origin; list view denser (44 px rows); empty folder as `<details>` example; upload via `popover`.
- **`file-preview.html`:** full-bleed paper on canvas; 760-wide HTML mock of invoice `NL-INV-2030-0009` with real §8.6 numbers; 3 thumbnails; top bar name mono + Page 1 of 4 + Download + Close; metadata rail + Used-in links (invoice → payment → milestone).

## Out of scope
Project-scoped `project-files.html` (already part 02). Account settings.

## Acceptance checks
- [ ] All 8 files listed with provenance on the tile/row
- [ ] Quota shows 184 MB / 5 GB
- [ ] Preview contains real invoice content (HTML), not a blank frame
- [ ] Close returns to files (real relative link)
- [ ] No script / no external images

## Hand-off line
```
Part 05 done. Next: docs/meridian-page-prompts/06-account.md
```
