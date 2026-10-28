# F20 · Profile View + Edit — API-MAP (Gate A)

Specs read and verified:
- `backend-api-swagger/README.md`
- `backend-api-swagger/users.openapi.json` (40 paths, 14 schemas — specifically `/api/v1/users/profile`, `/api/v1/users/avatar`, `/api/v1/users/preferences`)
- `backend-api-swagger/media.openapi.json` (50 paths — avatar media upload constraints)

## 1. UI Surface → Endpoint Mapping

| UI Element / Affordance | Method & Path | Schema / Field Constraints & Enums | States & Behaviour in Variants |
|---|---|---|---|
| Load profile view (`/profile`) & pre-fill edit form (`/profile/edit`) | `GET /api/v1/users/profile` | Returns `firstName`, `lastName`, `email`, `phone`, `headline`, `bio`, `skills[]`, `avatar` | Populates Arjun Mehta's frozen profile; supports Data, Empty (cleared optional bio/skills preview), Loading skeleton, and Error + Retry |
| Save profile form (`Save changes` sticky button) | `PATCH /api/v1/users/profile` | `UpdateProfileDto`: `firstName` (`string`, `minLength: 2`, `maxLength: 50`), `lastName` (`string`, `minLength: 2`, `maxLength: 50`), `phone` (`string`, E.164 `/^\+?[1-9]\d{1,14}$/`), `headline` (`string`, `maxLength: 160`), `bio` (`string`, `maxLength: 2000`), `skills` (`string[]`, each `maxLength: 50`) | Enforces exact DTO validation inline before submit; updates live View state on save; offers simulated 502 error + retry |
| Skills chips + autocomplete (`#profile-skills`) | `PATCH /api/v1/users/profile` (`skills: string[]`) | Array of strings (`maxLength: 50` per tag); comma-separated paste/type also supported | Arrow-key + Enter + Backspace accessible combobox; updates live skill chips |
| Photo `Upload` / styled dropzone | `POST /api/v1/users/avatar` (also `POST /api/v1/media/upload/direct` w/ `fileType: "IMAGE"`) | `multipart/form-data` (`image/jpeg`, `image/png`, ≤ 5 MB client check) | Reads selected JPG/PNG locally via `FileReader` to preview avatar immediately without network calls; validates MIME & size |
| Photo `Remove` button (from `013-profile-edit.webp`) | `DELETE /api/v1/users/avatar` | No body | Clears custom uploaded preview and reverts cleanly to `AM` monogram avatar |
| Public profile visibility summary banner/card (C20) | `GET /api/v1/users/preferences` | `PrivacyPreferencesDto`: `profileVisibility` (`"public" \| "private" \| "connections"`), `showEmail` (`boolean`), `showPhone` (`boolean`) | Displays captured read-only status (`Public · Email hidden · Phone hidden`) and deep-links to `../../F21-settings/V1/index.html?tab=account` (`Account settings` / `Open settings`) |
| Health check reference | `GET /api/v1/users/health` | Users service health | Cited in designed Error state card |

## 2. Honesty & Non-Invention Notes (Recorded in `DECISIONS.md`)

1. **No server-side skills taxonomy endpoint exists:** `users.openapi.json` stores `skills: string[]` (`maxLength: 50`) directly on `UpdateProfileDto` without a `/skills/suggest` endpoint. Therefore, the autocomplete dropdown uses a small curated client-side B2B/commerce/project suggestion list plus arbitrary custom skill creation via `Enter` or comma — explicitly noted as client-side autocomplete.
2. **Visibility is edited in F21 (`Settings ▸ Account`), not faked here (C20):** Rather than inventing duplicate privacy switches on `/profile`, every F20 variant shows the honest read-only visibility state (`Public · Email & phone hidden`) and links directly to `../../F21-settings/V1/index.html?tab=account` where `PATCH /api/v1/users/preferences` lives.
3. **No public vanity slug (`/u/arjun`), social links, or cover-banner upload exist in `UpdateProfileDto`:** None are invented.
4. **Demo-labelled affordances (2):**
   - `Save changes` & `Upload`/`Remove` avatar update the page's live state and `FileReader` preview offline (labelled demo, citing `PATCH /api/v1/users/profile` & `POST|DELETE /api/v1/users/avatar`).
   - Sidebar links to unbuilt families (`Dashboard` F03, `Blog`/`Portfolio` F23) open the honest lab-boundary dialog.

```
## GATE A (F20)
Specs read: 2/2 (users + media) · Endpoints mapped: 7 · Demo-only CTAs listed: 2
Gate: PASS
```
