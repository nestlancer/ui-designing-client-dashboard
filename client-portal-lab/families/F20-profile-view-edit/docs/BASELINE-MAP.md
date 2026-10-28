# F20 · Profile View + Edit — BASELINE-MAP (Gate S)

Opened and verified:
- **Screenshots (2/2):** `Nestlancer-clients-screenshots/clients/012-profile.webp` (Priya Nair session — `/profile` view card + `Looking for security or notifications?` card) · `013-profile-edit.webp` (Priya Nair session — `/profile/edit` form with Photo `Upload` / `Remove`, 6 help-icon fields, sticky bottom bar with `Save changes`).
- **HTML snapshots (2/2):** `nestlancer-client-pages-html/34-profile-view.html` (`/profile`) · `35-profile-edit.html` (`/profile/edit`) — Arjun Mehta client session (canonical DOM truth); cross-referenced `36-settings-account.html` for C20 visibility controls.
- **Audit metadata:** `nestlancer-client-pages-html/audit-metadata.json` (`34-profile-view`, `35-profile-edit`) + `nestlancer-client-pages-html/README.md` (#44, #45).

## 1. Route & DOM Audit Summary

| Route | HTML Snapshot | Repo Screenshot | H1 (`26px/32px/700`) | H2 / H3s | Buttons | Inputs | Console / API Errors |
|---|---|---|---|---|---:|---:|---|
| `/profile` | `34-profile-view.html` | `012-profile.webp` | `Profile` | H2 `Arjun Mehta` · H3 `Looking for security or notifications?` | 8 (shell only) | 0 | 0 console errors; only aborted `?_rsc=` prefetches |
| `/profile/edit` | `35-profile-edit.html` | `013-profile-edit.webp` | `Edit profile` | H2 `Photo` | 15 (6 field help buttons + `Save changes` + 8 shell) | 7 | 0 console errors |

## 2. Frozen Content Truth (`34-profile-view.html` + `35-profile-edit.html`)

### A · View State (`/profile` — `34-profile-view.html`)
- **H1:** `Profile`
- **Subtitle:** `How you appear on Nestlancer — name, headline, bio, and skills.`
- **Top-right actions:** `Edit profile` (`/profile/edit`) · `Account settings` (`/settings/account`)
- **Identity card:**
  - Avatar: Initials `AM` (Arjun Mehta has no uploaded raster photo in `34`, so `AM` renders cleanly; screenshot `012` shows how an uploaded avatar + `Remove` button appear when a photo is present).
  - Name (H2): `Arjun Mehta`
  - Email: `arjun.mehta@nestlancer.com`
  - Headline: `Proprietor · Mehta Wholesale Traders (Ahmedabad · Wholesale)`
  - Bio: `Arjun runs Mehta Wholesale Traders in Ahmedabad. He uses the portal for dealer orders, GST invoices, and dispatch across his city routes.`
  - Skill chips (4): `Proprietor` · `B2B Trade` · `Inventory` · `GST Invoicing`
- **Settings cross-link card:**
  - Heading (H3): `Looking for security or notifications?`
  - Body: `Password, 2FA, and delivery preferences live in Settings.`
  - Action: `Open settings` (`/settings/account`)

### B · Edit State (`/profile/edit` — `35-profile-edit.html`)
- **Back link:** `← Back to profile` (`/profile`)
- **H1:** `Edit profile`
- **Subtitle:** `Update how your profile reads to clients and collaborators.`
- **Photo card:**
  - H2: `Photo`
  - Helper: `JPG or PNG. Shown on your public profile.`
  - Controls: `AM` preview tile + `Upload` (styled dropzone/picker; `Remove` shown when custom photo uploaded, matching `013-profile-edit.webp` + `DELETE /api/v1/users/avatar`).
- **7 Captured Inputs & Exact Values / Placeholders:**
  1. `file` upload input (for Photo)
  2. **First name** (`#profile-first-name`, help button `Help for First name`) — placeholder `Your first name` · value `Arjun`
  3. **Last name** (`#profile-last-name`, help button `Help for Last name`) — placeholder `Your last name` · value `Mehta`
  4. **Mobile number** (`#profile-phone`, `type="tel"`, help button `Help for Mobile number`) — placeholder `+91 98765 43210` · value `+919825012345` · helper copy: `Used to pre-fill Razorpay checkout. Indian mobile required for INR payments.`
  5. **Headline** (`#profile-headline`, help button `Help for Headline`) — placeholder `e.g. Founder at a D2C brand` · value `Proprietor · Mehta Wholesale Traders (Ahmedabad · Wholesale)`
  6. **Bio** (`#profile-bio`, `<textarea>`, help button `Help for Bio`) — placeholder `Short intro for your profile` · value `Arjun runs Mehta Wholesale Traders in Ahmedabad. He uses the portal for dealer orders, GST invoices, and dispatch across his city routes.`
  7. **Skills (comma-separated)** (`#profile-skills`, help button `Help for Skills`) — placeholder `e.g. Shopify, SEO, branding` · value `Proprietor, B2B Trade, Inventory, GST Invoicing` *(upgraded in all 5 variants to an accessible chips + autocomplete input backed by comma-separated compatibility)*.
- **Sticky Save Bar:** `Save changes` button pinned at bottom of form/viewport.

### C · Cross-Referenced Visibility State (`36-settings-account.html` — for C20)
- `Profile visibility`: `Public` (options: `Public`, `Private`, `Connections only`)
- `Show email on profile`: `false` (off)
- `Show phone on profile`: `false` (off)
- **Tooltip honesty note:** Like `10-requests-new-form.html`, `35-profile-edit.html` has 6 `aria-label="Help for …"` buttons with no static tooltip text in the captured DOM. Help popovers in the lab are derived strictly from `UpdateProfileDto` constraints (`2–50` chars, E.164 phone, `≤160` headline, `≤2000` bio, `≤50` chars/skill) and labelled as lab-authored from Swagger.

```
## GATE S (F20)
Screenshots opened: 2/2 · HTML opened: 2/2 · audit-metadata read: YES
Routes mapped: /profile, /profile/edit · Content frozen: YES (Arjun Mehta view + 7 edit fields + C20 visibility ref)
Gate: PASS
```
