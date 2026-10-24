# Part 06 — Account (profile + settings)

Read `docs/meridian-page-prompts/README.md`. Canon: master §8.1, §9.G. **Requires part 00.** Settings shell must stay consistent across the four tabs.

## Task
Build identity and control surfaces. Danger zone must be reachable without a sticky bar covering it. Every toggle explains its consequence.

### Files to write

| Path | Job |
|---|---|
| `meridian-lab/pages/profile.html` | Identity + working-with + account health |
| `meridian-lab/pages/profile-edit.html` | Edit groups + honest save bar |
| `meridian-lab/pages/settings-account.html` | Privacy, export, danger zone |
| `meridian-lab/pages/settings-security.html` | Password, 2FA, sessions |
| `meridian-lab/pages/settings-notifications.html` | Channels + quiet hours + matrix |
| `meridian-lab/pages/settings-activity.html` | 10-row activity with exceptions first |

## Locked identity (§8.1)
- **Priya Nair** — Head of Learning & Development
- Org: Nair Learning Systems · Kochi, Kerala
- Email `priya.nair@nairlearning.in` · Mobile `+91 98950 11223`
- Client ID `NL-CLT-2029-0087`
- Studio contacts: Riya Kapoor · Karthik Menon · Meera Shah

## Page notes
- **Settings shell (all four):** H1 `Settings` · tabs Account · Security · Notifications · Activity · content 720 · Related rail 300.
- **`settings-account.html`:** danger zone = 1 px clay rule (not pink card); typed `DELETE` confirmation; disabled reason visible; fully visible without scrolling past sticky chrome.
- **`settings-security.html`:** 2FA `Not enabled` + 3 steps; **8** session rows (device first, IP second); Sign out everywhere in `<details>`.
- **`settings-notifications.html`:** matrix 6×3 as real `<table>`; usable at 360 px; presets Everything on / Only what's due / Everything off.
- **`settings-activity.html`:** 10 rows not 50; sign-ins collapsed; new device/location exceptions surfaced.
- **`profile-edit.html`:** sticky save bar reserves `padding-block-end`; Last saved 09:41.

## Out of scope
States showcase pages (part 07). Do not invent extra sessions beyond the 8-row demo.

## Output protocol
2–3 pages per turn. Keep tab chrome identical across settings files.

## Acceptance checks
- [ ] 6 Account pages on disk; settings tabs cross-link correctly
- [ ] Danger zone reachable and explained
- [ ] Notification matrix accessible (named switches, table headers)
- [ ] Profile right column is real content, not empty
- [ ] No script / §8 identity only

## Hand-off line
```
Part 06 done. Next: docs/meridian-page-prompts/07-states-qa.md
```
