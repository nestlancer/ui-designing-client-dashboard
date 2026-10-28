# F16 · Checkout — REPORT-STUDY (Gate R)

Read the 365-line `.md` cover-to-cover + all 10 `xlsx` sheets. MD wins on conflict.

**Findings touching checkout:** #1 hierarchy ("billing is more important than shell", spend on money screens) · #3 badge contrast 1.73–3.23:1 (C4) · #4 three colour systems (C5) · #5 three competing CTAs on checkout (C8) · #8 unstyled native file input (C15) · #10 mobile afterthought · #11 dark mode checkbox (C6) · #12 raw hex card borders (C6) · #13 24/32/600 H1 (C18) · #2 `/api/v1/projects` 502 → error+retry. Report §4.2: **🔴 decides cash-in — rich but noisy**. §6.3 KEEP: Razorpay trust strip, domain-specific honesty, graceful wording, shadcn tokens.

**Tokens (sheet 2/§3.2):** Outfit; H1 24/32/600 report vs captured 26/32/700 (DOM wins); body 14, meta 12, micro 11; **no mono** → `--mono` for `01a10a2b-…` references, UTR, A/C, IFSC. Neutrals `--background #f6f8fb`, `--card #fff`, `--muted #f1f5f9`, `--border #dbe3ec`, `--foreground #0f1c2e`, `--muted-foreground #45556b`; brand ramp `--ta-brand-50 #ecf3ff → -500 #465fff → -950 #161950` → `--primary`; violet `--accent-1` deleted (focus-ring only). Status hues keep hue + AA darkened text + border. Radii 6/10/14/20, shadows xs/sm, 232/64/1400, motion 150/280/500 + spring.

**Page inventory (sheet 3):** 28 pending online / 29 bank-UPI transfer — "Payment Details / Checkout" with order summary, tabs, trust strip; principal issue 3 competing CTAs + native upload.

**Benchmark (13 report sources + Gate T):** [9] customer-facing billing deserves admin-level care; [2][13] one dominant metric, colour for state; [3] trust via encryption signals near the CTA; [7] dense forms with clear labels; [11] self-service payments; [5][12] token architecture + keyboard. Gate T: Stripe checkout best practices + UI strategies, Razorpay/Checkout UI kits, Shopify-inspired sticky summary, adminLTE fintech, SaaSUI calm-exactness.

**CHANGE — 7/5 required (all 5):** **C8** one primary ("Proceed to secure checkout"), bank as secondary tab, single footer Cancel · **C15** styled dropzone (no native file input) · **C17** 232/64 shell + Explore popover · **C4** AA badges icon+text · **C5** one blue ramp · **C6** tokenised cards · **C18** H1 32–40 + money hero 32–40 tabular-nums. (C9/C16 appear as supporting behaviours for the not-due honesty note and mobile summary.)

**ADD:** none assigned to F16 in §6.2. Family must-includes (all 5): both captured states, one primary, order summary + hero ₹ + stepper, styled UTR upload, bank block, trust strip + chips, UPI-on-desktop honesty note, Invoice + Cancel links, success/failure/verification-pending states.

**KEEP (every variant):** Razorpay trust strip; full UPI-on-desktop explainer; honesty/graceful wording; tabular money + mono refs; shadcn-style tokens.

**Roadmap:** P1 foundations (C4/C5/C6/C18) · P2 money screens (C8/C15) · P6 responsive · P7 polish.

**§7.1 acceptance checklist:** hierarchy <2s; KPI value+label+trend/why, one hero; right chart type; table powers; nav ≤9 + working ⌘K; AA contrast text 4.5 / UI 3.0 + icon+text status; one family + mono refs; dark parity; keyboard/ARIA/skip; zero/skeleton/error on every list/tab/panel; 360–1440 no scroll; skeletons not spinners; legal/dispute routes findable.

**MD↔XLSX differences:** H1 24/32/600 vs captured 26/32/700 (DOM wins) · sheet 3 53 states vs README 55 files · sheet 5 C4 warning-text `32 90% 28%` vs §5.2 `#8a5a00` (tokens win).

```
## GATE R (F16)
MD read: YES · XLSX sheets: 10/10 · C-items mapped: 7/7 · ADD items: 0 (family must-includes mapped)
KEEP listed: YES · Checklist copied: YES
Gate: PASS
```
