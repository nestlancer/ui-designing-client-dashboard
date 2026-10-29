# Nestlancer Client Portal · **Enterprise Upgrade — Prompt Input Questionnaire (v2)**

> **Purpose:** the v1 lab (`client-portal-lab/`, 20 families × 5 = **100 hand-built variants**, locked blue token scheme) was built on the assumption that the client is a mid-size company. During review the client identity showed a **top-100 global technology company**. Their face said it: the work is competent, but it reads as *agency software*, not *enterprise software*.
>
> This questionnaire collects the decisions needed to write **ONE new master prompt** (`enterprise-upgrade-prompt-v2.md`) that upgrades the prototypes to a standard a Fortune-100 client can put its name on — without throwing away the 100 variants already built.
>
> **How to answer:** for each question, copy the letter into `ENTERPRISE-UPGRADE-ANSWERS.md` (or just reply in chat as `Q03-B, Q07-C`). Add a `+note` wherever you want to override. **Any question left blank falls back to the ⭐ default**, so partial answers still produce a usable prompt.

### ⏱ Two ways to use this

| Path | What you answer | Result |
|---|---|---|
| **Fast (≈5 min)** | Only the **12 questions marked ⚑** | A prompt at ~80 % effectiveness, defaults elsewhere |
| **Full (≈22 min)** | All 36 | A prompt that is deterministic — no guessing, no re-runs |

### ⚠ Read before answering (the one rule that protects us)

The redesign must make our **vendor-side** portal look enterprise-grade. It must **never** impersonate the client's own product brand, reuse their proprietary logo/fonts/colours, or **claim certifications they hold** (SOC 2, ISO 27001, FedRAMP, uptime numbers) as if Nestlancer holds them. Q01 and Q16 set that boundary — please answer them carefully, they are drop-dead constraints in the prompt.

---

## 0 · How your answers become the prompt

| Answers feed | Prompt section they will control |
|---|---|
| Q01–Q05, Q34–Q36 | §0 Client context & non-impersonation constraints · §12 Client-facing narrative |
| Q06–Q13 | §5 Design language system (tokens, type, density, motion, dark) |
| Q14–Q19 | §7 Enterprise credibility layer (new chapter vs v1) |
| Q20–Q25 | §4 Page families, scope matrix, states, a11y target |
| Q26–Q29 | §9 Build constraints & dev-handoff |
| Q30–Q33 | §6 Gates + §10 Verification matrix |

---

# SECTION A — Client identity & the real bar (5 questions)

### ⚑ Q01. How much of the client can the lab reference?
| | Option | Consequence in prompt |
|---|---|---|
| **A** | **Name + logo + their brand tokens** — mirror their look | Hard-codes a client-palette layer; legal risk flagged in prompt |
| **B** | **Name in write-ups only; no logo, no their colours** — Nestlancer brand stays | Prompt adds "plausible Fortune-100 vendor" language, no impersonation |
| **C** | **Fully anonymised** ("a top-100 global technology company") | Prompt bans all client identifiers; screenshots scrubbed |
| **D** | ⭐ **Nestlancer brand, enterprise-calibrated** — our product, raised to their procurement bar | Cleanest: all craft effort goes into quality, not mimicry |

### ⚑ Q02. What is the actual review setting for v2?
| | Option | Consequence |
|---|---|---|
| **A** | Live screen-share walkthrough by us | Prompt adds per-page "talk track" annotations + demo script |
| **B** | ⭐ Async self-serve link / gallery they click alone | Prompt adds self-explanatory overlays, rationale panels, compare mode |
| **C** | Formal design review, 10+ stakeholders | Prompt adds decision log, option matrix, "why not X" appendix |
| **D** | Design review **inside** a procurement/security assessment | Prompt adds a security & compliance dossier page |

### ⚑ Q03. What was the single thing that made the client's face change? (pick the worst one)
| | Option | Consequence |
|---|---|---|
| **A** | ⭐ **"This looks like a startup's internal tool"** — typography, spacing, generic admin feel | Prompt makes *craft/premium finish* the #1 gate |
| **B** | **"This is not accessible / not compliant"** | Prompt elevates WCAG 2.2 AA + audit artefacts to gate #1 |
| **C** | **"This is not how our scale works"** — no org context, roles, multi-entity, audit trail | Prompt prioritises enterprise IA over surface polish |
| **D** | **"It's not our brand / our journey"** | Prompt prioritises brand-integration layer |
| **E** | **"I can't tell what changed or why"** | Prompt prioritises rationale & before/after storytelling |

### Q04. Which domain norms must the portal radiate? (multi-select, pick ≤2)
| | Option |
|---|---|
| **A** | ⭐ **Financial-grade precision** — ledger alignment, tabular figures, unambiguous money states |
| **B** | **Engineering/dev-tool density** — keyboard-first, command palette, monospace metadata |
| **C** | **Consulting/editorial calm** — generous whitespace, narrative hierarchy |
| **D** | **Enterprise platform gravity** — Salesforce/ServiceNow-like scale signals, exhaustive state coverage |
| **E** | **Consumer-grade polish** — Stripe/Linear-level finish and motion |

### ⚑ Q05. Do we have the client's design guidelines (fonts, colours, components)?
| | Option | Consequence |
|---|---|---|
| A | Yes — brand book / design system docs available | Prompt adds a brand-fidelity gate + token mapping table |
| **B** | ⭐ No — must be inferred / ignored | Prompt defines its own enterprise token system, states it's not client-branded |
| C | Partly (fonts only, or colours only) | Prompt adds a partial-mapping note |

---

# SECTION B — Design language target (8 questions)

### ⚑ Q06. Which benchmark class is the ambition? (pick 1 primary, 1 stretch)
| | Option | What it means for the build |
|---|---|---|
| **A** | ⭐ **Stripe / Mercury** — precision, restraint, information density done elegantly | Hairline rules, strong type scale, no card-everything, tables that breathe |
| **B** | **Linear** — keyboard-first, motion polish, tight density, dark-first | Motion signature + ⌘K everywhere + compact rows |
| **C** | **Vercel / GitHub Enterprise** — mono metadata, hairline borders, engineering honesty | Mono-dominant, squared geometry, minimal colour |
| **D** | **Salesforce Lightning / ServiceNow** — platform scale, exhaustive states, roles | More chrome, more state coverage, denser tables |
| **E** | **IBM Carbon / Atlassian** — institutional, systematic, accessibility-first | Full documented token + component spec output |

### ⭐ Q07. Density target
| | Option |
|---|---|
| A | Comfortable (current v1 feel) |
| B | **Two densities, user-toggleable** — comfortable default + compact for ops users (**recommended**) |
| C | Compact enterprise (dense rows, 32–36 px tables) |
| D | Airy/editorial (fewer elements per screen) |

### ⭐ Q08. Typography direction
| | Option | Notes |
|---|---|---|
| A | Keep **Outfit** (v1) | Friendly, less institutional |
| B | **Inter / Geist + IBM Plex Mono** pairing (**recommended**) | Inter is the de-facto enterprise-neutral face; self-hosted, no CDN |
| C | Client-safe system stack only (`ui-sans-serif`) | Zero font risk, least character |
| D | A serif display accent + grotesque body | Editorial authority, harder to keep consistent |

### Q09. Visual signature
| | Option |
|---|---|
| **A** | ⭐ **Quiet authority** — hairline borders, near-invisible shadows, one accent, confidence through spacing and type |
| B | **Editorial** — rules, numerals, captions, magazine-grade rhythm |
| C | **Data-dense console** — grid, rails, density as a feature |
| D | **Brand-forward** — expressive colour and graphic moments |

### ⭐ Q10. Colour strategy (the v1 "one blue scheme" rule is likely part of what felt small)
| | Option | Consequence |
|---|---|---|
| **A** | Keep v1's single blue ramp | Consistency, still reads "SaaS template" |
| **B** | ⭐ **Enterprise neutral core** — ink/graphite neutrals + one restrained accent (deep indigo or jade), status hues for state only | Reads institutional; prompt rewrites the token chapter |
| **C** | Neutral core + **one per-family accent** (max 3 hues lab-wide, documented) | More expressive, needs a discipline gate |
| **D** | Full dual-theme with a distinct "executive" high-contrast skin | Extra variant surface |

### ⭐ Q11. Dark mode
| | Option |
|---|---|
| A | Light only (saves effort) |
| **B** | **Full parity, both themes verified per variant** (v1 claimed parity but could not screenshot it) |
| C | Dark as the *flagship* (dark-first design, light as fallback) |

### ⭐ Q12. Motion
| | Option |
|---|---|
| A | Functional only (150–280 ms, no flourish) |
| **B** | **Functional + 3–4 signature moments** (count-up on money, timeline draw, drawer spring, crossfade preview) |
| C | Rich motion system with documented easing tokens |

### Q13. Iconography & illustration
| | Option |
|---|---|
| **A** | ⭐ **One custom-drawn icon set (24 px optical grid), no illustration** |
| B | Lucide outline set (v1) |
| C | Custom set + a small set of functional diagrams (timeline, pipeline, data-viz) |
| D | Set + editorial illustration for empty states |

---

# SECTION C — The enterprise credibility layer (6 questions) — *this is what v1 was missing*

### ⚑ Q14. Which enterprise signals must the v2 prototypes show? (multi-select — these become a mandatory checklist)
| | Signal |
|---|---|
| **A** | **Org context** — organisation switcher, seats, roles/permissions (Owner/Finance/Approver/Viewer) |
| **B** | **Identity & access** — SSO status, MFA enforcement, active-session/device list, SCIM badge |
| **C** | **Audit trail** — "who changed what", exportable activity log, immutable record styling |
| **D** | **Approval workflows** — multi-step approvals, delegated approver, approval matrix |
| **E** | **Trust & availability** — status indicator, SLA/"last synced", incident banner, data-residency line |
| **F** | **Procurement readiness** — security/compliance dossier page (docs available on request, *not* fake badges) |
| **G** | **Operational scale** — bulk actions, saved views/filters, column config, CSV/PDF export, print-grade invoices |
| **H** | **Assistive layer** — guided next-step "what happens next", inline help, keyboard shortcuts map |

### ⚑ Q15. Are those backed by real API endpoints today? (**anti-invention gate**)
| | Option | Consequence |
|---|---|---|
| **A** | Yes, most exist in the 17 Swagger specs | Prompt maps each signal to a real endpoint |
| **B** | ⭐ **Some exist, many don't** — mark non-backed ones as clearly-labelled demo affordances | Prompt adds a "demo-affordance" ledger + honest labelling rule |
| **C** | Assume none — design them as **roadmap surfaces** | Prompt adds a visible "proposed / not yet in API" classification per element |
| **D** | We will extend the backend — design freely | Prompt drops Gate A and allows invented features (⚠ weakens credibility; not recommended) |

### ⭐ Q16. Compliance claim policy
| | Option |
|---|---|
| **A** | Show only certifications Nestlancer actually holds (tell us which) |
| **B** | ⭐ **No badges at all** — instead "security & compliance documents available on request" links |
| C | Neutral UI placeholders labelled "example — pending verification" (clearly internal-only screens) |

### ⭐ Q17. Does the client portal serve a *single person* or an *organisation*?
| | Option |
|---|---|
| **A** | Single client user (v1 assumption — Arjun Mehta) |
| **B** | ⭐ **Org account with multiple users** — needs org switcher, member list, role chips, "invite colleague", per-user notification prefs |
| C | Org + multiple client entities (parent/sub-accounts, cost centres) |
| D | Both — single-user mode and org mode must coexist |

### ⭐ Q18. Sample content realism
| | Option |
|---|---|
| A | Keep v1's frozen audit content (₹, Indian names, same 12 requests) |
| **B** | ⭐ **Keep the frozen content, add an enterprise-scale scenario** (bigger org, more line items, multi-currency reference, longer timelines) as a second data state |
| C | Rewrite sample data to look like a Fortune-100 engagement entirely |
| D | Both frozen + synthetic switchable via a "data scenario" toggle |

### Q19. Add a **Reporting / Insights** surface (executive spend, delivery health, SLA attainment)?
| | Option | Consequence |
|---|---|---|
| **A** | ⭐ **Yes — add as family F24** (which v1 lacked entirely; enterprise buyers expect a reporting layer) | Scope grows by 3–5 variants |
| **B** | No — stay inside the 20 existing families | Scope locked |
| **C** | Add only a reporting *tab* inside F03 Dashboard | Cheap, contained |

---

# SECTION D — Scope, structure & standards (6 questions)

### ⚑ Q20. What exactly do we rebuild?
| | Option | Output size |
|---|---|---|
| **A** | **Upgrade all 20 active families × 5 variants = 100 pages** | Largest effort; everything consistent |
| **B** | ⭐ **All 20 families, but each converges to 1 flagship + 1 alt** (40 pages) + full design-system spec | Faster, more coherent, "one approved direction" |
| **C** | 5 hero families × 5 (Dashboard, Project Details, Quote Details, Checkout, Messages) = 25 pages, rest untouched | Demo-driven |
| **D** | Full 23 families × 3 variants (adds F01/F02 auth + F23 Explore, + F24 reporting) | Complete product surface |

### ⭐ Q21. Keep the 5-variant exploration model?
| | Option |
|---|---|
| A | Yes — 5 distinct concepts per family (v1 model) |
| **B** | **3 variants** — quality over quantity; each must survive a stricter gate |
| C | 1 finalist + documented rationale + rejected-alternatives appendix |
| D | 5 variants for hero families, 1 finalist elsewhere |

### Q22. Where does v2 live?
| | Option |
|---|---|
| A | In-place upgrade inside `client-portal-lab/` (git history keeps v1) |
| **B** | ⭐ **New parallel tree** `client-portal-lab-v2/` — v1 preserved for before/after comparison |
| C | New branch only, single tree |
| D | v2 replaces v1 and v1 is archived under `archive/v1/` |

### ⭐ Q23. Family coverage gaps to close
| | Option |
|---|---|
| **A** | ⭐ Add the missing **F01 Login / F02 Register+Forgot / F23 Explore** (v1 has no auth or public surfaces in the lab) |
| B | A only |
| C | A **+ new families**: Org & Members, SSO/Security center, Audit Log, Reporting (Q19-A) |
| D | No new families — polish only |

### ⭐ Q24. Viewport & device scope
| | Option |
|---|---|
| A | 1440 + 390 (v1) |
| **B** | **375 / 768 / 1024 / 1280 / 1440 / 1920** + ultrawide behaviour for dense tables |
| C | Desktop-first only (1280–1920), mobile out of scope |
| D | Add print/PDF stylesheet (invoices, quotes, delivery reports) |

### ⭐ Q25. Accessibility standard
| | Option |
|---|---|
| A | WCAG 2.2 **AA** |
| **B** | **WCAG 2.2 AA + documented AAA on body text + full keyboard + screen-reader landmarks + reduced-motion** (**recommended** — this is what enterprise a11y audits check) |
| C | Client's internal a11y standard (tell us) |
| D | AA + an accessibility conformance report (ACR/VPAT-style) document as a deliverable |

---

# SECTION E — Technical constraints & handoff (4 questions)

### ⭐ Q26. Prototype stack
| | Option | Consequence |
|---|---|---|
| A | Vanilla HTML + CSS + small JS, fully offline (v1) | Safest for the lab viewer; zero dependencies |
| **B** | ⭐ **Vanilla HTML + a real token pipeline**: `tokens.json` → `tokens.css`, self-hosted fonts, no CDN | Enterprise-looking *and* handoff-ready |
| C | Tailwind + shadcn, compiled locally, mirroring `app.nestlancer.com` | Closest to production codebase, harder to hand-author |
| D | React/Next components, real routes | Heaviest, most convincing to engineers |

### ⭐ Q27. Must the prototypes stay 100 % offline (viewer sandbox has no network)?
| | Option |
|---|---|
| **A** | ⭐ **Yes — zero external requests, fonts and icons inlined/self-hosted** |
| B | CDN fonts allowed (degrades in preview, fine in a real browser) |
| C | Offline lab + a separate "production-parity" build that may use the real stack |

### Q28. Dev-handoff artefacts we must produce (multi-select)
| | Artefact |
|---|---|
| **A** | ⭐ `tokens.json` + CSS variable map + light/dark tables |
| **B** | ⭐ Component inventory with states (anatomy, do/don't, motion spec) |
| **C** | Mapping table: lab component → existing Tailwind class / file in `app.nestlancer.com` |
| **D** | ⭐ Per-page implementation checklist for the developer team |
| **E** | Redlines / spacing & type spec sheets per family |

### ⭐ Q29. How strict on "no generators, hand-authored only" (v1 §1.3 rule)?
| | Option |
|---|---|
| **A** | ⭐ **Keep it** — every variant hand-written; audit trail in `DECISIONS.md` |
| B | Allow a shared component layer (`kit.css`) so 100 pages stay consistent | 
| C | Allow generators for scaffolding, hand-finish every page |
| D | Don't care — optimise for output speed |

---

# SECTION F — Process, gates & proof (4 questions)

### ⭐ Q30. Verification level (v1's honest weakness: *no screenshots could be taken — no browser in the sandbox*)
| | Option | Consequence |
|---|---|---|
| **A** | Keep jsdom + DOM assertions, state the limitation again | Fast, unproven visually |
| **B** | ⭐ **Real headless-Chromium screenshots**: 1440/1920 light+dark per page, contrast measured from rendered pixels, a11y via axe-core, before/after image pairs | Prompt adds a screenshot-evidence gate; needs a browser available |
| C | B + visual-regression diff against v1 | Adds a "what improved" proof pack |
| D | We do manual review; prompt just outputs a checklist | Cheapest |

### ⭐ Q31. Per-family deliverables
| | Option |
|---|---|
| **A** | Just the HTML pages |
| **B** | ⭐ Pages + `RATIONALE.md` (concept, hierarchy decisions, what failed in v1) + annotated screenshots |
| C | B + a client-facing "design decisions & evidence" appendix per family |
| D | B + a v1→v2 changelog table per family |

### ⭐ Q32. Prompt architecture
| | Option |
|---|---|
| **A** | ⭐ **One master prompt file** (like v1) — self-contained, paste-and-run |
| B | Master + 23–25 per-family prompt files (like `client-portal-prompts/`) |
| C | Master "system/standards" prompt + a small per-page task prompt |
| D | Master + a machine-readable `spec.json` that a runner executes |

### Q33. Effort/iteration budget
| | Option |
|---|---|
| A | Single gated pass, stop at first PASS |
| **B** | ⭐ **Two gated passes**: pass 1 = tokens + 2 hero families for your approval, pass 2 = the rest |
| C | Continuous until I say stop |
| D | Fixed: ship in one run regardless of quality |

---

# SECTION G — What the client sees (3 questions)

### ⭐ Q34. Client-facing artefact
| | Option |
|---|---|
| **A** | Internal lab gallery only |
| **B** | ⭐ **Curated gallery with a before/after slider + rationale panels** (a "we heard you" narrative) |
| C | B + a polished HTML "design case study" deck they can forward internally |
| D | B + a 20-minute click-through demo script with talk track |

### ⭐ Q35. Do we frame this to the client as an apology/re-set, or as a straight upgrade?
| | Option |
|---|---|
| A | Straight upgrade — no reference to the first round |
| **B** | ⭐ **Quiet re-set** — one line acknowledging the bar we now design to, then only evidence |
| C | Explicit "what we got wrong / what changed" note |
| D | You decide in the prompt |

### ⭐ Q36. Tone of the writing inside the UI (microcopy + rationale)
| | Option |
|---|---|
| A | Neutral, functional |
| **B** | ⭐ **Precise, calm, confident** — short sentences, no exclamation, no marketing adjectives |
| C | Warm and advisory ("we recommend…") |
| D | Terse/technical (labels only) |

---

## ✅ Answer sheet — copy this into `ENTERPRISE-UPGRADE-ANSWERS.md`

```
Q01:      Q10:      Q19:      Q28:
Q02:      Q11:      Q20:      Q29:
Q03:      Q12:      Q21:      Q30:
Q04:      Q13:      Q22:      Q31:
Q05:      Q14:      Q23:      Q32:
Q06:      Q15:      Q24:      Q33:
Q07:      Q16:      Q25:      Q34:
Q08:      Q17:                Q35:
Q09:      Q18:                Q36:
```

**Minimum 12 (⚑) to unblock everything:** `Q01 Q02 Q03 Q05 Q06 Q14 Q15 Q20 Q25 Q26 Q30 Q34`
*(Q04, Q07, Q10, Q11, Q16, Q17, Q18, Q19, Q21, Q22, Q23, Q24, Q27–Q29, Q31–Q33, Q35, Q36 have safe ⭐ defaults.)*

### Free-text you may want to add (optional, 6 lines)
1. Anything the client said verbally in that meeting that isn't covered above:
2. Any hard "never do this" from our side (legal, NDA, brand):
3. Existing assets I can point at (brand book, client style guide, internal design system):
4. Which 3 pages the client actually looked at / cares most about:
5. Deadline of the next client touchpoint:
6. Anything in v1 you personally want preserved, no matter what:

---

## What I will produce once you answer

1. **`enterprise-upgrade-prompt-v2.md`** — a single self-contained master prompt, same rigour as v1 (roles → gates → token system → concept cards → manual build → verification) but rebuilt around *enterprise credibility*, with:
   - a **new §7 Enterprise credibility layer** (org, IAM, audit, approvals, procurement) mapped to the real Swagger specs with a demo-affordance ledger,
   - a **DS-1 … DS-n design-system chapter** producing `tokens.json` + component spec + dev mapping,
   - a **screenshot-evidence gate** (or its honest substitute, per Q30),
   - **hard anti-impersonation and anti-fake-certification rules** (per Q01/Q16),
   - a **v1→v2 delta table** so the client sees exactly what was raised and why.
2. **`ENTERPRISE-UPGRADE-ANSWERS.md`** — blank, ready to fill.
3. A **one-page cover note** you can send with the prompt so anyone on the team can run it the same way.

> Nothing in the repo will be modified or committed until you say so. v1 stays untouched.
