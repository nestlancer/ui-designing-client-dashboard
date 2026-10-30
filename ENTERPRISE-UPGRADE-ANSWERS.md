# Enterprise Upgrade — Answers (recorded) + resolutions

Answers as given. ⚠ = conflict or correction I had to resolve before writing the prompt. Resolutions are binding in `enterprise-upgrade-prompt-v2.md` §0.

```
Q01 ⚑ : D   Nestlancer brand, enterprise-calibrated
Q02 ⚑ : B   Async self-serve gallery, client clicks alone
Q03 ⚑ : A   "Looks like a startup's internal tool" → craft finish is Gate 1
Q04   : A, E   Financial-grade precision + consumer-grade polish
Q05 ⚑ : —   Derive from nestlancer.com  ✅ DONE (§5 of prompt)

Q06   : A (primary Stripe/Mercury) + B (stretch Linear)   ✅ compatible, both applied
Q07   : B   Two densities, toggleable
Q08   : B   Inter/Geist + Plex Mono intent  ⚠ resolved by Q05 → Instrument Sans + IBM Plex Mono
Q09   : A   Quiet authority
Q10   : B   Neutral core + one restrained accent  ⚠ resolved to jade (Q05), not indigo
Q11   : B   Full dark parity, verified
Q12   : B   Functional + signature moments
Q13   : A   One custom icon set, no illustration

Q14 ⚑ : A–H (all)
Q15 ⚑ : A   "Most endpoints exist"  ⚠ PARTLY WRONG — see verification below
Q16   : B   No badges; "documents available on request"
Q17   : Client-only portal, one business per account (multiple clients, each separate);
         admin / ops / other roles live in a separate app  ⚠ kills org switcher, seats, invites
Q18   : A   Keep frozen content, request volume unbounded/infinite
Q19   : A   Add Reporting/Insights as F24

Q20 ⚑ : B   All families (scope); page count set by Q21
Q21   : A   5 variants per family  (was B/3; re-ruled)
        → 24 families × 5 = **120 templates**
Q22   : B   New tree client-portal-lab-v2/, v1 preserved
Q23   : A   Add F01 Login, F02 Register+Forgot, F23 Explore
Q24   : B   375/768/1024/1280/1440/1920 + ultrawide
Q25 ⚑ : B   WCAG 2.2 AA + AAA body + keyboard + landmarks + reduced motion

Q26 ⚑ : A   Vanilla HTML/CSS/JS, offline
Q27   : B   CDN fonts allowed  ⚠ conflict with Q26-A + no-network preview
        → resolved: real fonts, self-hosted and base64-embedded. Still zero network requests.
Q28   : A, B, D   tokens + component inventory + per-page dev checklist  (+ C added, cheap)
Q29   : A   Hand-authored only, no generators

Q30 ⚑ : B   Real Chromium screenshots, pixel contrast, axe-core, before/after
Q31   : B   Pages + RATIONALE.md + annotated screenshots
Q32   : A   One master prompt file  ✅ enterprise-upgrade-prompt-v2.md
Q33   : B   Two gated passes (tokens+F03+F09 first, stop for approval)
```

## Q15 verification — what actually exists (this changed the prompt's §6)

I read all 17 OpenAPI specs and separated **client-role** endpoints from **admin-role** ones. Your "most exist" is true for identity/audit/bulk, but several enterprise signals a Fortune-100 reviewer will look for have **no client-reachable endpoint**:

**✅ REAL for a client**
- Identity & access: `/users/2fa/{enable,verify,disable,status,backup-codes,regenerate-codes}`, `/users/password`, `/users/change-password`, `/users/sessions`, `/users/sessions/{id}`, `/users/sessions/terminate-others`, `/users/activity`, `/users/export`
- Audit-ish: `/users/activity`, `/projects/{id}/timeline`, quote contract preview + `documents/versions`, payment `documents/versions`
- Approvals: `/quotes/{id}/accept|decline|request-changes`, `/milestones/{id}/approve|request-revision`, `/deliverables/{id}/approve|reject`, `/projects/{id}/approve|sign-contract|request-revision`
- Bulk / notifications: `/notifications/read-selected`, `/notifications/read-all`, `/notifications/clear-read`, channel matrix
- Reporting base: `/requests/stats`, `/projects/stats`, `/quotes/stats`, `/payments/stats`
- Documents: `/invoices/{id}/download`, `/payments/{id}/receipt|invoice`, per-row PDF download

**⚠ PARTIAL**
- Audit trail is **per-user activity + project timeline only** — there is no client-facing org-wide audit log with actor/object/before-after (`/api/audit*` is admin-only). → shown as project/user-scoped ledger, scope labelled.
- Trust & availability: `/health*` is infrastructure health, not client SLA. No uptime history exists. → status line only, no % claims.
- Exports: no generic "export this table as CSV" endpoint. Only specific PDFs and `/users/export`.

**❌ PROPOSED (no endpoint — must be labelled or omitted)**
- SSO / SAML / SCIM (only `auth` login + `verify-2fa`)
- Org members / seats / invites / delegated approvers / approval matrix
- Saved views, column configuration, server-side table preferences
- SLA attainment, uptime history, incident log
- Compliance certifications of any kind
- Time-series / trend / forecast analytics for F24

This is why §6 of the new prompt uses a four-way **REAL / PARTIAL / DEMO / PROPOSED** classification instead of a simple "endpoints exist" assumption. Showing an SSO switch or an SLA percentage would have been exactly the kind of detail a top-100 tech company's team catches in the review.
