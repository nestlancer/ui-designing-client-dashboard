# Legacy Client Portal — UI Audit (45 screens)

Source: `Nestlancer-clients-screenshots/clients/*.webp` (45 full-page captures, 1440px wide desktop, single viewport, no mobile evidence).
Purpose: establish exactly what exists today so the 2030 system is a deliberate redesign — not a reskin.

All hex values below are **sampled/estimated** from the screenshots and are directional, not authoritative tokens.

---

## 1. Shell anatomy (measured)

| Element | Measurement | Notes |
|---|---|---|
| App sidebar | 228 px fixed, full height | Wordmark + 3 collapsible groups (MAIN / EXPLORE / ACCOUNT) |
| Sidebar item | 36 px tall, 12 px radius, 15 px icon + 14 px label | Active = soft indigo fill + 1 px indigo border |
| Icon rail | 56 px | Appears only on messaging / full-bleed pages |
| Top bar | 64 px, hairline bottom | Back chevron, breadcrumb, centered search, theme, messages, bell (badge), avatar menu |
| Page gutter | 32 px | Content stretches to ~1140 px, never wider |
| Page header | eyebrow 11 px caps → H1 ~32 px → 14 px description → right action cluster | Repeated on almost every screen |
| Footer | 44 px "© 2026 Nestlancer" | Sits inside the scroll container on every page |
| Card | white, 12 px radius, 1 px #E5E7EB, near-zero shadow | The only container primitive |
| Section gap | 24 px | No zoning, no vertical rhythm above 24 px |

## 2. Observed visual tokens

**Colour** — page `#F8F9FB`, card `#FFFFFF`, ink `#111827`, muted `#6B7280`, faint `#9CA3AF`, hairline `#E5E7EB`, primary indigo `≈#4338CA / #3B37E8`, active-nav wash `≈#E8E9FD`.
**Status pills** (soft tint bg + saturated text): green `#D1FAE5/#047857`, amber `#FEF3C7/#B45309`, red `#FEE2E2/#B91C1C`, violet `#EDE9FE/#6D28D9`, blue `#DBEAFE/#1D4ED8`.
**Type** — UI sans ≈14 px/400 body; micro-labels 11 px/600 uppercase, +0.08em tracking; H1 alternates between a heavy grotesque (lists) and a **transitional serif** (project detail, quote titles); numerals not tabular.
**Shape** — radii 8 (buttons/inputs), 10 (inner rows), 12 (cards), 999 (pills). One shadow only, barely visible.
**Number formatting** — inconsistent: `₹52,200.00`, `₹31,875`, `₹1,81,500.00`, `₹ 19,200.00`. Indian lakh grouping used in places, not everywhere.

## 3. Screen-by-screen notes

| # | Screen | What it does | Structural read |
|---|---|---|---|
| 001 | Payment details — completed | Order summary, state rail, receipt/invoice | Serif total, 5-node vertical state stepper, right column of meta cards |
| 002 | Payment details — not due yet | Same shell, amber "Not due yet", checkout locked | State rail shows *Not due yet → Pending* as two active nodes (contradiction) |
| 003 | Invoices | 3-row archive table | 70 % of screen empty; no filters, no totals, no sort |
| 004 | Messages (index) | 3 stat tiles + 2 conversations | A whole page to show two rows |
| 005 | Messaging panel | 3-pane: queue / empty thread / inbox snapshot | Right summary column duplicates the left queue counts |
| 006 | New message | Centered card "To: Nestlancer Support" | No subject, no template, no attachments |
| 007 | Thread detail | Bubbles, quick replies, composer, search | Read receipts only "Sent"; no attachments in composer |
| 008 | Notifications | ~40 flat rows, tab filters | No grouping, no bulk action, every timestamp "5 days ago" |
| 009 | Billing center | 3 money tiles + transaction table | "Checkout" as a table cell action; no ledger context |
| 010 | Checkout — pay online | Order summary, Razorpay block, status rail | Best-structured screen in the set; long explanatory UPI warning |
| 011 | Payment methods | Empty state + explanation | Dotted empty box, no illustration, no alternative path |
| 012 | Profile | Avatar, headline, bio, skill chips | Narrow 670 px column leaves half the page blank |
| 013 | Profile edit | Stacked form | No sectioning, no dirty/saved state, bottom bar overlays |
| 014 | Projects | One project card on an empty page | Card shows status + start date only — no progress, money, next action |
| 015 | Project detail — Overview | Hero, progress, status grid, feed, feedback form | 4 nested card levels; "40 % complete" vs "2/2 milestones" disagree |
| 016 | Project detail — Deliverables | One deliverable row | No versioning, no approval action, no comment |
| 017 | Project detail — Files | One file tile | No upload, no folders, no batch actions |
| 018 | Project detail — Messages | Chat + search rail | Duplicates the global messaging surface |
| 019 | Project detail — Milestones | Vertical milestone rail, pay / request changes | Strongest pattern in the product; buried three clicks deep |
| 020 | Project detail — Progress | Dated feed + request-changes box | Filter chips (All/Updates/Milestones/Deliverables) only used here |
| 021 | Quotes | 1 row + 4 counters | "Declined" quote sits in a table with no reason or recovery path |
| 022 | Quote detail — accepted | Line items, payment schedule, docs, T&C | Excellent information model; flat visual hierarchy, tiny legal type |
| 023 | Requests (Work Hub) | Stats + tabs + list | "Work Hub" / "Requests" / "Projects" all compete for the same job |
| 024 | Request detail | Brief, requirements, attachments, 8-node status history | Timeline boxes repeat the same label 4× |
| 025 | Settings — Account | Privacy + danger zone | Sticky save bar covers the last 80 px of content |
| 026 | Settings — Activity | 50 identical LOGIN rows | No filtering by event type, no date grouping |
| 027 | Settings — Files | Uploader, chips, file cards, generated docs | Dense but coherent; file names truncate with no tooltip |
| 028 | Settings — Notifications | Channel matrix (email/push/in-app × 6 categories) | Warm-down on typography, 18 toggles with no "all off" |
| 029 | Settings — Security | Password, 2FA (disabled), 8 sessions | Session list is a wall of IPs; no device icons, no geo |
| 030 | Dashboard — inbox panel | Vitals, pulse, awaiting, workbench, activity | 5 competing zones above the fold |
| 031 | Dashboard — pay now panel | Same, pay queue active | Panel switch is a tab inside a card inside a page |
| 032 | Dashboard — projects panel | Same, projects queue | Empty-state row is a bare card |
| 033 | Dashboard — quotes panel | 17 requests / 7 quotes variant | Proves the vitals grid collapses under real volume |
| 034 | Files — archive preview | Modal, "no in-app preview" | Dead-end modal |
| 035 | Files — actions menu | Preview / Download / provenance | Menu is the only place provenance appears ("Shared with you · Nestlancer") |
| 036 | Files — list view | List rows + generated documents | Best density in the product, but only reachable from Settings |
| 037 | Global search | ⌘K palette, nav + actions | No recent items, no results, no scoping — nav list only |
| 038 | Messages — edit form | Inline edit | No edit history, no "edited" marker |
| 039 | Messages — members panel | Group info, 3 members, leave | No roles, no invite, no remove |
| 040 | Messages — reply composer | Reply-to strip | Typing state unclear |
| 041 | New request | 3 stacked field groups | No stepper, no progress, no estimate, no save indicator |
| 042 | Checkout — bank / UPI | Account block, UTR, receipt upload | Manual reconciliation flow with no status feedback |
| 043 | Files — document preview | Full-bleed modal, blank canvas | No page nav, zoom, download-in-place |
| 044 | Quote — awaiting signature | Acceptance form + T&C | Good; CTA is disabled with a vague "complete the agreement" label |
| 045 | Requests — projects view | Same Work Hub, projects tab | Two tabs produce near-identical layouts |

## 4. Defect log

| ID | Defect | Severity |
|---|---|---|
| D01 | Five chrome layers before content (sidebar → top bar → breadcrumb → eyebrow → H1) | High |
| D02 | Single-record pages leave 60–75 % of the viewport empty (003, 014, 016, 017, 021) | High |
| D03 | No density control; every row is 62 px regardless of data volume | Medium |
| D04 | H1 typography inconsistent (serif on detail pages, grotesque on indexes) | Medium |
| D05 | Raw UUIDs shown to clients (`0a1a0a2c-…`, `01a10a2c-…`) with no human handle | High |
| D06 | Contradictory state vocabulary: "Not due yet" *and* "Pending" as current state (#002); "Issued" vs "Completed" | High |
| D07 | Money formatting drifts (decimals, grouping, spacing) and is never tabular | Medium |
| D08 | Notifications are an ungrouped 40-row firehose, all stamped "5 days ago" | High |
| D09 | Duplicated destinations: Billing / Invoices / Payments / Billing history; Requests / Work Hub / Projects; Profile / Account / Security | Medium |
| D10 | Feedback is a transient toast ("Signed in"), never an inline, persistent confirmation | Medium |
| D11 | Archives have no sortable headers and only one status select | Medium |
| D12 | Settings save bar overlays content; danger zone sits behind it | Medium |
| D13 | Theme toggle exists but no dark theme is designed | Medium |
| D14 | "AI" appears only as a decorative chip in the avatar cluster — zero assistive capability | High (vs. 2030 brief) |
| D15 | No responsive/mobile design evidence; 3-pane chat and 7-column tables cannot reflow | High |
| D16 | Accessibility: 11 px micro-labels, `#9CA3AF` on white ≈ 2.8:1, icon-only buttons unlabelled | High |
| D17 | Progress math is unexplained and self-contradictory ("40 %" with 2/2 milestones, 1/1 deliverables) | High |
| D18 | Payment state machine is ambiguous; "Cancel pending payment" offered where nothing is cancellable | Medium |
| D19 | Empty states are raw boxes with no guidance or next action | Medium |
| D20 | No provenance: clients cannot see why an amount is due, which milestone maps to it, or who approved it | High |
| D21 | Truncation without tooltips (`Corporate LMS for 200 Employe…`) | Low |
| D22 | Up to 3 nested card borders inside one panel (#025, #015) | Medium |
| D23 | Non-tabular numerals; ₹ symbol spacing inconsistent | Low |
| D24 | Flat zoning — everything is a white card on near-white; no elevation or rhythm hierarchy | Medium |

## 5. Keep (brand equity worth carrying forward)

1. Feather mark + `Nestlancer.` wordmark lockup.
2. Editorial serif for *project and quote titles* — a distinctive, human signal among SaaS portals.
3. Indian-rupee-first commerce: lakh grouping, GST line, UPI/UTR flows, Razorpay trust block.
4. The **milestone × payment ledger** model (deposit / mid / final tied to approvals) — genuinely good.
5. The vertical milestone rail (019) and quote information model (022).
6. Copy voice: calm and declarative — *"One action will unlock your workspace."*

## 6. Retire

Permanent 228 px nav · white-card-on-white composition · status pills as the only colour event · micro-caps metadata as a decorative texture · UUID exposure · per-page ad-hoc layouts · toast-only feedback · settings tab sprawl · notification firehose · decorative "AI" chip · anything that requires the client to reconstruct system state from three screens.

---

**Verdict:** the legacy portal is a competent 2020-era CRUD shell with one good idea (the milestone ledger) buried under chrome. The 2030 redesign must keep the ledger, kill the chrome, and add ambient state, provenance, density control, and a real assistant.
