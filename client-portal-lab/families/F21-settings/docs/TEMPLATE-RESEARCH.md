# F21 · Settings (Account / Security / Notifications / Activity) — TEMPLATE-RESEARCH (Gate T)

Online template & UX pattern research executed **after** Gates S, R, and A. Every reference R1–R9 below was genuinely fetched and read via `fetch_page` (status 200). **Colour-scheme discipline:** §5 single-blue token system (`shared/tokens.css`) is locked; zero palette ideas were imported.

## 1. Search Queries Run

- `SaaS account security settings UI 2FA active sessions notification matrix audit activity log design`

## 2. Reference Table (9/9 Opened & Verified)

| ID | Source & URL | Pattern / Product Archetype | Job Match |
|---|---|---|---|
| **R1** | [SaaSUI — SaaS Settings Page UX Patterns (2026)](https://www.saasui.design/blog/saas-settings-page-ux-patterns) | Left vertical rail vs horizontal tabs (≤5 sections), uniform section anatomy, danger-zone isolation | Direct match for 5-tab Settings IA (`Account · Security · Notifications · Files · Activity`) |
| **R2** | [SaaSUI — SaaS 2FA & Account Security UX Patterns (2026)](https://www.saasui.design/blog/saas-two-factor-authentication-security-ux-patterns) | Staged 2FA enrollment (password → QR + manual key → mandatory 6-digit verify), honest active sessions w/ `This device` | Direct match for KEEP 3-step 2FA flow + Active sessions hierarchy |
| **R3** | [SaaSUI — SaaS Activity Feed & Audit Log UX (2026)](https://www.saasui.design/blog/saas-activity-feed-audit-log-ux-patterns) | Day dividers + collapsing repeated burst events ("Signed in 18 times") with expand-for-detail | Direct match for **C10** Activity log rebuild (49 `LOGIN` + 1 `LOGOUT`) |
| **R4** | [JustFigma — Designing 2FA & Security Settings UI](https://justfigma.com/designing-two-factor-authentication-and-security-settings-ui-in-figma/) | `SecuritySettingsPanel` anatomy, 6-digit numeric OTP verification, backup codes, `Sign out all` destructive differentiation | Direct match for Inventory #45 fix (`Sign out all` vs `Sign out` distinction) |
| **R5** | [WorkOS — Complete Guide to User Management for B2B SaaS](https://workos.com/blog/user-management-for-b2b-saas) | TOTP MFA lifecycle, session metadata (browser, OS, IP, timestamp), immutable audit event structure | Direct match for Security & Activity audit fidelity |
| **R6** | [AdminLTE — 8 Best shadcn/ui Settings Templates 2026](https://adminlte.io/blog/shadcn-ui-settings-templates/) | Canonical `shadcn-admin` sticky sub-page rail + form cards vs top-tabbed settings blocks | Direct match for contrasting V1 (top tabs) vs V2 (left rail) vs V3 (dense console) |
| **R7** | [Shadcn Examples — Settings Page Block](https://shadcnexamples.com/settings-page) | Responsive settings switcher (collapses cleanly on 360px/390px), switches + radio groups + danger zone | Direct match for mobile responsive 5-section switching |
| **R8** | [AI Web Design Codex — SaaS Web Apps Settings & Shell](https://github.com/Eneryleen/ai-web-design-codex/blob/main/03-site-types/saas-web-apps.md) | 232–240px sidebar shell, settings search-at-top, red-bordered Danger zone requiring explicit confirmation | Direct match for C17 shell + V3 filterable control jump + Danger zone |
| **R9** | [Technource — Enterprise-Ready SaaS Audit Logs (2026)](https://www.technource.com/blog/enterprise-ready-saas/) | 9-field audit log clarity, event-type filtering, evidence export cross-link | Direct match for Activity event filter (`All`/`LOGIN`/`LOGOUT`) + pagination |

## 3. Per-Reference Notes (Borrow vs Reject)

- **R1 (SaaSUI Settings Page UX):** *Layout:* Compares horizontal tabs (ideal for 5 sections) with vertical sticky rails; isolates destructive actions at the bottom of Account. *Borrow:* Clean section intros matching captured copy + unmistakable Danger zone card. *Reject:* Mixing public bio/skills fields into Account settings (kept in `F20` with deep link).
- **R2 (SaaSUI 2FA & Security UX):** *Component detail:* Never mark 2FA enabled on QR display alone — require Step 3 (`6-digit code`) before flipping `Not enabled` → `Enabled`; mark `This device` unmistakably in Active sessions. *Borrow:* Interactive 3-step 2FA wizard (`password` → `SVG QR + manual TOTP key` → `6-digit verify` → `backup codes` note) + clear `This device` badge. *Reject:* Hiding `Sign out other devices` inside an overflow menu.
- **R3 (SaaSUI Activity Feed & Audit Log UX):** *Layout:* Clusters events under date headers (`Oct 10, 2026`, `Oct 9, 2026`, `Oct 8, 2026`) and collapses homogeneous bursts (`Signed in 18 times`) with a single click to expand the underlying rows. *Borrow:* Day-grouped + burst-collapsed Activity log (**C10**) with expand/collapse toggle so both the summary and all 50 captured timestamps remain inspectable! *Reject:* Deleting or dropping any of the 50 captured audit events.
- **R4 (JustFigma 2FA & Security Anatomy):** *Component detail:* Differentiates per-row `Sign out` (compact outline/ghost), `Sign out other devices` (secondary button), and `Sign out all` (destructive button with confirmation modal) — directly solving Report Inventory #45! *Borrow:* 3-tier session revocation button hierarchy + `inputmode="numeric"` 6-digit TOTP input. *Reject:* SMS-backup enrollment step (not in `users.openapi.json`).
- **R5 (WorkOS B2B User Management):** *Component detail:* Displays browser/OS (`Chrome 156.0.8078.4 · Linux`), device (`desktop`), mono IP (`136.69.252.98`, `115.98.214.188`), and `Last active` clearly in both desktop rows and mobile cards. *Borrow:* Monospace IP & timestamp formatting + session security posture summary. *Reject:* SAML/SCIM enterprise IdP controls (not in Nestlancer client API).
- **R6 & R7 (AdminLTE & Shadcn Examples Settings):** *Layout:* Demonstrates sticky left sub-navigation vs horizontal pill/underline tabs, collapsing cleanly to an accessible horizontal strip or selector at 360px. *Borrow:* Distinct navigation architectures across V1–V5 while keeping `Files` linked to `F22`. *Reject:* Duplicate desktop + mobile switch DOM trees (fixes the 37-switch baseline duplication down to 19 single-source switches).
- **R8 & R9 (AI Web Design Codex & Technource Audit Logs):** *Component detail:* Top quick-jump settings filter + structured audit event filter (`All (50)` · `LOGIN (49)` · `LOGOUT (1)`), day filter, and pagination with mobile card fallback (**C16**). *Borrow:* Client-side audit filtering, pagination, and mobile card fallback. *Reject:* Claiming server-side filter params on `GET /api/v1/users/activity`.

## 4. Variant Inspiration Map

- **V1 (`Calm Tabbed Preferences Hub` — Minimal):** R1 + R2 + R3 + R7
- **V2 (`Sticky Rail Control Center` — Action / Queue-led):** R2 + R4 + R6 + R8
- **V3 (`Dense Security & Audit Ledger` — Dense):** R3 + R5 + R8 + R9
- **V4 (`Posture-First Security & Alert Cards` — Action / Posture-led):** R1 + R2 + R4
- **V5 (`Guided Account Hardening & Privacy Walkthrough` — Narrative / Stepper-led):** R2 + R3 + R4 + R7

```
## GATE T (F21)
Queries run: 1 · References opened: 9 (≥8) · Variant inspiration mapped: 5/5
Gate: PASS
```
