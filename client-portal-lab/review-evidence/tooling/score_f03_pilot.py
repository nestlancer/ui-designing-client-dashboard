#!/usr/bin/env python3
"""F03 pilot first-pass scores (rank prompt S3/S4). Evidence from raw/F03-V*-raw.json,
raw/F03-probe.json, raw/F03-probe2.json, raw/js-syntax-scan.json + screenshot inspection.
Written BEFORE reading any prior winner claim (S4.1). Totals recompute from the fixed formula."""
import json, pathlib, datetime

EV = pathlib.Path(__file__).resolve().parents[1]
WEIGHTS = {"task_clarity": 25, "usability": 20, "visual_craft": 15,
           "responsive": 15, "accessibility": 15, "integrity": 10}

def total(dims): return round(sum(WEIGHTS[k] * v / 4 for k, v in dims.items()), 1)

def shots(v):
    b = f"review-evidence/screenshots/F03/F03-{v}"
    return {"desktop": f"{b}-desktop-light-top.png", "mobile": f"{b}-mobile-light-top.png",
            "tablet": f"{b}-tablet-light-top.png", "dark": f"{b}-desktop-dark-top.png",
            "task_desktop": f"{b}-desktop-light-task.png", "task_mobile": f"{b}-mobile-light-task.png",
            "primary_desktop": f"{b}-desktop-light-primary.png", "navopen_mobile": f"{b}-mobile-light-navopen.png",
            "fullpage_desktop": f"{b}-desktop-light-fullpage.png"}

V = []
def add(**kw): V.append(kw)

add(version="V1", name="Calm Overview", source_path="client-portal-lab/families/F03-dashboard-overview/V1/index.html",
  dims={"task_clarity":3,"usability":1,"visual_craft":2,"responsive":2,"accessibility":2,"integrity":2},
  cap={"applied": True, "capped_total": 49.0,
       "reason": "Critical usability cap (S3): inline script block 2 fails to parse in Chromium "
                 "(SyntaxError: missing ) after argument list; node --check fails, extra '}' in the "
                 "count-up callback). Every interaction wired in that block is dead: workbench tabs "
                 "cannot leave the default Quotes panel (Pay now queue unreachable), Complete checkout "
                 "and all data-demo controls give zero feedback, palette never opens, theme button and "
                 "mobile menu do nothing. The family core task (act on the pending-payment queue) cannot "
                 "be completed. Page loads and status remains readable, which is why the uncapped total "
                 "is also recorded."},
  evidence={
    "task_clarity": "Desktop first screen names the page (H1 Overview), states status (verdict banner: "
                    "₹31,875.00 pending) and next step (Complete checkout). But the same CTA appears twice "
                    "in one screen (top-right + hero card) and Awaiting you starts below the fold.",
    "usability": "Script SyntaxError on every load (all 4 viewports). Tab click leaves aria-selected=false "
                 "and Quotes panel shown; primary CTA/demo nav produce no toast; palette stays hidden; "
                 "theme toggle false->false; mobile menu does not open the sidebar (stays at left:-286).",
    "visual_craft": "Calm, spacious single column and complete icon sprite; but pipeline fill spans render "
                    "0x0 (display:inline ignores width) so all four bars look empty, brand wordmark is "
                    "clipped by the 232px sidebar, and duplicated CTAs dilute hierarchy.",
    "responsive": "Family-common shell defect: at 390px the page scrolls 64px horizontally, the bell is "
                  "clipped and avatar off-screen (right edge 454px), menu button is 2px wide. Content "
                  "cards stack cleanly below the header; tablet/desktop have no overflow.",
    "accessibility": "Skip link + visible focus on all 15 tabbed stops and a correct H1; but the tab "
                     "pattern, palette button and theme toggle are operable-looking yet inert, and axe "
                     "flags color-contrast 4.33:1 (#465fff on #ecf3ff) on nav/verdict text (3 nodes light, 6 dark).",
    "integrity": "Frozen sections all present with correct amounts, but silent dead buttons are a misleading "
                 "affordance (not the documented demo toast), the help text under Awaiting you is designer "
                 "meta-copy ('The strongest idea in the product...'), and manifest verification claims "
                 "node --check PASS / 0 JS errors for this file, contradicted by direct test."},
  tasks={"T1_first_screen":"pass (static read)","T2_keyboard":"partial (focus visible; controls inert)",
         "T3_core_tab_switch":"fail (Pay now unreachable)","T3b_primary_action":"fail (no feedback)",
         "T4_theme":"partial (toggle dead; ?theme=dark works)","T5_demo_honesty":"fail (silent buttons)",
         "T6_mobile":"fail (nav dead + 2px button + h-scroll)","T7_axe":"1 rule: color-contrast x3 (dark x6)"},
  issues=[{"id":"F03-V1-I1","severity":"critical","title":"Whole in-page script fails to parse; all interactions dead","ref":"raw/F03-V1-raw.json pageErrors; raw/js-syntax-scan.json"},
          {"id":"F03-COM-01","severity":"major","title":"Mobile topbar overflows 64px; bell clipped, avatar off-screen, menu button 2px wide","ref":"raw/F03-probe.json mobile"},
          {"id":"F03-COM-02","severity":"major","title":"Pipeline bar fills render 0x0 (inline span) - bars read as 0%","ref":"probe .fill rects"},
          {"id":"F03-COM-03","severity":"minor","title":"Brand text 4.33:1 contrast on brand-50 (AA needs 4.5:1)","ref":"axe color-contrast"},
          {"id":"F03-V1-I5","severity":"minor","title":"Complete checkout duplicated in first screen; meta-copy under Awaiting you","ref":"desktop-light-top.png"}])

add(version="V2", name="Verdict Hero", source_path="client-portal-lab/families/F03-dashboard-overview/V2/index.html",
  dims={"task_clarity":4,"usability":3,"visual_craft":3,"responsive":2,"accessibility":2,"integrity":3},
  cap={"applied": False},
  evidence={
    "task_clarity": "Split hero puts the verdict sentence (₹31,875.00 is pending... Complete checkout to "
                    "unblock delivery), invoiced/pending amounts, both CTAs, and the full Awaiting-you queue "
                    "(Pay/Review/Open) in the first screen - the only version where status, next step and "
                    "queue are all visible without scrolling.",
    "usability": "Tab switch to Pay now works (aria-selected=true, correct panel), primary and demo controls "
                 "give the honest lab toast, palette opens with focus in the input and Escape returns focus "
                 "to the trigger, theme toggle works. Friction: mobile menu affordance is a 2px sliver.",
    "visual_craft": "Polished, coherent hero/rail composition; faults are small and enumerable: Profile and "
                    "Settings sidebar icons are blank (sprite lacks #i-user/#i-settings), the invoiced-pending "
                    "separator renders as a heavy black square at display size, pipeline fills render 0x0, "
                    "brand clip (shared shell).",
    "responsive": "Same shared 390px topbar overflow (64px h-scroll, bell clipped, avatar at 454px, menu "
                  "button 2px); but hero, queue actions and vitals restack well and Pay/Review are visible "
                  "early on mobile. Desktop/tablet clean.",
    "accessibility": "Correct H1, skip link, 15/15 visible-focus stops, working tab semantics and palette "
                     "focus management; held back by shared 4.33:1 brand-text contrast (2 nodes; 4 in dark), "
                     "the 2px-wide mobile menu target, and 19px-high gallery/prev/next text links.",
    "integrity": "All frozen sections present (verdict, vitals, pipeline, awaiting, 4-tab workbench with "
                 "empty states, activity) with correct money formatting and honest demo toasts. Gaps: "
                 "pipeline bars visually imply 0% beside correct % text, sub-copy reads 'value + % + reason'."},
  tasks={"T1_first_screen":"pass","T2_keyboard":"pass (15 stops, focus visible)","T3_core_tab_switch":"pass",
         "T3b_primary_action":"pass (honest demo toast)","T4_theme":"pass","T5_demo_honesty":"pass",
         "T6_mobile":"partial (nav opens; button 2px, header clipped)","T7_axe":"color-contrast x2 (dark x4)"},
  issues=[{"id":"F03-COM-01","severity":"major","title":"Mobile topbar overflow / 2px menu button (shared shell)","ref":"raw/F03-probe.json"},
          {"id":"F03-COM-02","severity":"major","title":"Pipeline fills 0x0 (shared pattern)","ref":"probe .fill"},
          {"id":"F03-V2-I3","severity":"minor","title":"Sidebar Profile/Settings icons blank - sprite missing i-user/i-settings","ref":"desktop-light-top.png; symbol scan"},
          {"id":"F03-COM-03","severity":"minor","title":"Brand contrast 4.33:1","ref":"axe"},
          {"id":"F03-V2-I5","severity":"minor","title":"Separator glyph renders as black square between invoiced/pending","ref":"desktop-light-top.png"}])

add(version="V3", name="Awaiting-You Spine", source_path="client-portal-lab/families/F03-dashboard-overview/V3/index.html",
  dims={"task_clarity":3,"usability":3,"visual_craft":3,"responsive":2,"accessibility":2,"integrity":2},
  cap={"applied": False},
  evidence={
    "task_clarity": "Queue-first: H1-sized 'Awaiting you' with '6 items need your attention - start with the "
                    "payment' and a Pay button make the next action unmissable; but the page no longer calls "
                    "itself Overview (H1 replaced), and the same ₹31,875 payment is offered again as "
                    "Complete checkout in the workbench below.",
    "usability": "Primary/demo actions give honest toasts, palette and theme work with correct focus handling; "
                 "there is no tab pattern - queues are stacked, so scanning is scroll-driven, and the Quotes "
                 "queue has no workbench representation (only the expiring-quotes rail row). Mobile nav opens.",
    "visual_craft": "Clean sticky rail plus live column, consistent spacing and complete icons; pipeline fills "
                    "0x0 and brand clip as shared. The rail card ends mid-viewport, leaving the left column "
                    "noticeably emptier than the right at first load.",
    "responsive": "Best mobile queue (Pay/Review/Open/Download all in the first screen) but vitals are pushed "
                  "below the whole queue, and the shared topbar overflow/2px menu button applies. Desktop/tablet clean.",
    "accessibility": "Keyboard, focus and palette behaviour strong; H1 names the queue rather than the page "
                     "topic, shared 4.33:1 contrast (2 nodes; 5 in dark), 2px menu target and 19px footer links.",
    "integrity": "Deviates from frozen spec: H1 'Overview' replaced, 4-tab workbench replaced by a mixed stack "
                 "despite copy claiming 'One queue at a time', Quotes 0 empty state absent, and one pending "
                 "amount presented as two different actions (Pay vs Complete checkout). Demo toasts honest."},
  tasks={"T1_first_screen":"pass (queue-first)","T2_keyboard":"pass","T3_core_tab_switch":"not applicable (no tab pattern by design)",
         "T3b_primary_action":"pass (honest demo toast)","T4_theme":"pass","T5_demo_honesty":"pass",
         "T6_mobile":"partial (queue excellent; header clipped)","T7_axe":"color-contrast x2 (dark x5)"},
  issues=[{"id":"F03-V3-I1","severity":"major","title":"H1/frozen page name replaced by 'Awaiting you'","ref":"probe headings"},
          {"id":"F03-V3-I2","severity":"major","title":"Same ₹31,875 shown as both Pay (rail) and Complete checkout (workbench)","ref":"desktop-light-top.png"},
          {"id":"F03-COM-01","severity":"major","title":"Mobile topbar overflow / 2px menu button","ref":"probe"},
          {"id":"F03-COM-02","severity":"major","title":"Pipeline fills 0x0","ref":"probe"},
          {"id":"F03-V3-I5","severity":"minor","title":"'One queue at a time' copy contradicts stacked queues; Quotes empty state missing","ref":"desktop-light-top.png"}])

add(version="V4", name="Health Bento", source_path="client-portal-lab/families/F03-dashboard-overview/V4/index.html",
  dims={"task_clarity":3,"usability":2,"visual_craft":2,"responsive":2,"accessibility":2,"integrity":2},
  cap={"applied": False},
  evidence={
    "task_clarity": "Breadcrumb/eyebrow still identify Overview, the hero tile leads with 'One action will "
                    "unblock your workspace' + Complete checkout, and Awaiting you (Pay) is in the first "
                    "screen - so purpose/next step are recoverable, but there is no Overview headline and "
                    "no verdict sentence; the equal-weight Workspace health tile competes for attention. "
                    "(Pairwise re-check note: missing H1 is penalised under Accessibility/Integrity, not "
                    "double-counted here.)",
    "usability": "What exists works (primary/demo toasts, palette focus, theme, mobile nav), but there is no "
                 "workbench: Pay-now items, quote/message queues and empty states cannot be inspected from "
                 "this dashboard at all - only counts and two Awaiting rows.",
    "visual_craft": "Tidy bento grid, but hero and Workspace-health tiles are mostly empty space, pipeline "
                    "bars shrink to stubs (fills 0x0) with truncated why-lines ('Collected.'), the invoiced/"
                    "pending separator is the same black square, and the page ends after Recent activity "
                    "leaving the lower half of a 1000px viewport void.",
    "responsive": "Stacks cleanly with no version-specific clipping, but mobile KPI cards are full-width and "
                  "mostly empty, making the queue a long scroll; shared topbar overflow/2px menu applies.",
    "accessibility": "No H1 anywhere (headings start at sidebar H2s) - a structural barrier for heading "
                     "navigation; otherwise skip link, visible focus and palette behaviour are strong, with "
                     "shared 4.33:1 contrast (2 nodes; 4 dark) and small mobile targets.",
    "integrity": "Money formatting drops frozen paise (₹81,500 / ₹31,875 instead of .00), invents "
                 "client-facing jargon ('FLEET HEALTH', 'Fleet status at a glance (A9)') with an internal "
                 "coverage code in the UI, and omits the live workbench/empty-state content entirely."},
  tasks={"T1_first_screen":"partial (no Overview headline)","T2_keyboard":"pass","T3_core_tab_switch":"not applicable (no workbench)",
         "T3b_primary_action":"pass (honest demo toast)","T4_theme":"pass","T5_demo_honesty":"pass",
         "T6_mobile":"partial (long empty cards; header clipped)","T7_axe":"color-contrast x2 (dark x4)"},
  issues=[{"id":"F03-V4-I1","severity":"major","title":"No H1 element on the page","ref":"probe headings; grep <h1 =0"},
          {"id":"F03-V4-I2","severity":"major","title":"Live workbench queues/empty states omitted","ref":"section-presence scan"},
          {"id":"F03-V4-I3","severity":"minor","title":"Internal jargon in UI: FLEET HEALTH / (A9); money drops .00","ref":"desktop-light-top.png"},
          {"id":"F03-COM-01","severity":"major","title":"Mobile topbar overflow / 2px menu button","ref":"probe"},
          {"id":"F03-COM-02","severity":"major","title":"Pipeline fills 0x0","ref":"probe"}])

add(version="V5", name="Dense Ops Workbench", source_path="client-portal-lab/families/F03-dashboard-overview/V5/index.html",
  dims={"task_clarity":3,"usability":3,"visual_craft":3,"responsive":1,"accessibility":2,"integrity":1},
  cap={"applied": False, "considered": "Mobile table truncation considered for cap; not applied - the primary "
       "Complete checkout action and amounts remain reachable at 390px (status pills are clipped, not hidden "
       "entirely), and the page is fully usable on desktop. Recorded as responsive=1 instead."},
  evidence={
    "task_clarity": "For a repeat user this is the fastest scan: Overview + pending one-liner, 5-KPI strip, "
                    "and the Pay now table open by default with Complete checkout on the pending row. First-time "
                    "context is thin - no verdict explanation, awaiting or pipeline context.",
    "usability": "Tabs work (Pay now panel correct), primary/demo toasts honest, palette/theme correct; the "
                 "tab-led table is efficient on desktop. Sort/chips claimed in the concept were not separately "
                 "exercised in this pilot (not observed, not scored as a pass).",
    "visual_craft": "Clean dense table with text+colour status pills and consistent type; let down by the "
                    "page ending at ~45% of the viewport (reads unfinished), a dangling small '.00' after the "
                    "KPI amount, and an API-path footer line.",
    "responsive": "Major clipping at 390px: the workbench table's STATUS column and pills are cut off at the "
                  "card edge ('STAT...', 'Pen...', 'Not...'), the Pay now tab wraps, and the documented "
                  "mobile card-fallback does not occur - on top of the shared topbar overflow. Desktop/tablet clean.",
    "accessibility": "H1 present, highest axe pass count (28), tab semantics present; shared barriers remain - "
                     "4.33:1 brand contrast (2 nodes; 3 dark), 2px mobile menu target, 19px footer links, and "
                     "mobile status text truncation also harms low-vision mobile users.",
    "integrity": "Largest spec deviation: frozen Pipeline & billing, Awaiting you and Recent activity sections "
                 "are absent entirely; 'Pay now 4' shows only 2 rows with no pagination note; footer exposes "
                 "raw API endpoints ('Data: GET /api/v1/...') to clients. Amounts shown are correct."},
  tasks={"T1_first_screen":"pass (desktop)","T2_keyboard":"pass","T3_core_tab_switch":"pass",
         "T3b_primary_action":"pass (honest demo toast)","T4_theme":"pass","T5_demo_honesty":"pass",
         "T6_mobile":"fail (table status clipped)","T7_axe":"color-contrast x2 (dark x3); 28 passes"},
  issues=[{"id":"F03-V5-I1","severity":"major","title":"Frozen Pipeline/Awaiting/Activity sections omitted","ref":"section-presence scan; fullpage 1000px"},
          {"id":"F03-V5-I2","severity":"major","title":"Mobile table clips STATUS column/pills; no card fallback","ref":"mobile-light-top.png"},
          {"id":"F03-V5-I3","severity":"minor","title":"Pay now count 4 vs 2 rows, no pagination note","ref":"desktop-light-top.png"},
          {"id":"F03-COM-01","severity":"major","title":"Mobile topbar overflow / 2px menu button","ref":"probe"},
          {"id":"F03-V5-I5","severity":"minor","title":"Footer lists raw API endpoints","ref":"desktop-light-top.png"}])

for rec in V:
    rec["dimension_scores"] = rec.pop("dims")
    rec["uncapped_total"] = total(rec["dimension_scores"])
    rec["total"] = 49.0 if rec["cap"].get("applied") else rec["uncapped_total"]
    rec["screenshots"] = shots(rec["version"])
    rec["raw_evidence"] = [f"review-evidence/raw/F03-{rec['version']}-raw.json",
                           "review-evidence/raw/F03-probe.json", "review-evidence/raw/F03-probe2.json"]
    rec["major_or_critical_issues"] = sum(1 for i in rec["issues"] if i["severity"] in ("critical", "major"))

order = sorted(V, key=lambda r: (-r["total"], r["version"]))
for i, r in enumerate(order, 1): r["rank"] = i
# practical tie groups: within 2.0 of neighbour (chained check on sorted totals)
ties = []
for a, b in zip(order, order[1:]):
    if a["total"] - b["total"] <= 2.0: ties.append([a["version"], b["version"]])

pairs = [
 ["V1","V2","V2","Working tabs/palette/theme + queue in first screen vs fully dead script"],
 ["V1","V3","V3","Working queue actions vs inert controls"],
 ["V1","V4","V4","V4's actions/palette work; V1's complete content cannot be acted on. This pair triggered a re-check of V4 task clarity (see V4 evidence): shell labels give it purpose/action, H1 absence scored under accessibility"],
 ["V1","V5","V5","Working tab table vs dead tabs"],
 ["V2","V3","V2","Frozen workbench tabs + hero verdict retained vs renamed H1 and duplicated payment"],
 ["V2","V4","V2","Full queues/workbench and page identity vs missing H1/workbench"],
 ["V2","V5","V2","Complete context (pipeline/activity) and intact mobile actions vs omitted sections + clipped mobile table"],
 ["V3","V4","V3","Queues inspectable and H1 present vs no workbench/H1"],
 ["V3","V5","V3","Across viewports V3's mobile queue stays intact; V5's core table clips on mobile"],
 ["V4","V5","V5","Actionable tabbed queues on desktop vs counts-only dashboard (narrow margin, consistent with 58.8 vs 56.2)"],
]

scores = {
 "schema": "client-portal-lab-review-scores", "schema_version": 1,
 "run": {"stage": "PILOT", "date_utc": datetime.datetime.now(datetime.timezone.utc).isoformat(),
         "manifest": "review-evidence/review-manifest.json",
         "warning": "AI heuristic review by one evaluator - NOT user research. Totals are rubric-derived "
                    "(fixed S3 weights), not measured user-preference percentages. 100 personas are a "
                    "coverage matrix with no votes (personas.json).",
         "families_scored": ["F03"], "families_pending": ["F04","F05","F06","F07","F08","F09","F10","F11",
          "F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22"],
         "production_review": "NOT YET RUN (pilot gate). No production finding is claimed in this file."},
 "rubric": {"version": "rank-prompt S3 v1 (fixed before scoring)",
            "formula": "total = sum(weight * score / 4)", "weights": WEIGHTS,
            "scale": "integer 0-4 against S3 anchors", "critical_cap": 49.0,
            "tie_rule": "<=2.0 points = practical tie group"},
 "blind_boards": {"mapping_file": "review-evidence/raw/blind-mapping.json", "seed_base": 20261028,
   "board_notes_recorded_before_unblinding": {
     "A": "amount, CTA and awaiting queue all in first screen; strongest hierarchy",
     "B": "calm/sequential; awaiting below fold; duplicated CTA on mobile",
     "C": "queue-first spine prominent; title reads as queue not Overview; best mobile queue",
     "D": "bento fragmented; large near-empty health tile; tall empty mobile cards",
     "E": "dense table directly actionable; small type; mobile status column truncated; page half-empty"},
   "honesty_note": "One AI evaluator generated the board and mapping; board notes above were recorded in "
                   "the session transcript before the mapping file was opened. This is a bias-reduction "
                   "aid, not true experimental blinding."},
 "pairwise_consistency_checks": {
   "note": "One evaluator's 10-pair consistency check (S4.2), not human votes; no Bradley-Terry/Elo applied. "
           "All 10 agree with the rubric order; the V1-V4 pair prompted the documented V4 task-clarity re-check.",
   "pairs": [{"a": a, "b": b, "better_for_family_task": w, "reason": r} for a, b, w, r in pairs]},
 "persona_coverage_note": "Coverage relevance only: shared mobile header/menu defect is most relevant to "
   "phone one-handed and motor-access profiles; 4.33:1 contrast to low-vision profiles; V4 missing H1 and "
   "V1 inert tab pattern to keyboard/screen-reader profiles; V3 duplicated payment to cognitive-access and "
   "first-time profiles; V5 context-thin density to first-time profiles. No persona preferred or voted.",
 "families": [{
   "family_id": "F03", "family_dir": "F03-dashboard-overview",
   "family_task": "Dashboard overview (/dashboard): a client landing here must grasp workspace status, see "
                  "what needs their attention, and take the next action - complete the pending checkout "
                  "(₹31,875.00), review expiring quotes, open unread messages - using verdict, vitals, "
                  "pipeline, Awaiting you and the live workbench queues.",
   "baseline_context": "Frozen content per docs/BASELINE-MAP.md: H1 Overview, verdict figures "
                       "(invoiced ₹81,500.00 / ₹31,875.00 pending), 4 vitals, labelled pipeline bars, "
                       "Awaiting you, 4 count-bearing workbench tabs (Quotes 0 / Pay now 4 / Projects 0 / "
                       "Inbox 2) with instructive empty states, recent activity. Demo affordances (sidebar "
                       "routes, checkout) are documented lab demo behaviour per DECISIONS.md SS3 - scored on "
                       "honest feedback, not real payment.",
   "task_script": "Generic T1-T7 in manifest + F03 core: switch workbench tab to Pay now (where a tab "
                  "pattern exists), invoke Complete checkout and a data-demo nav item (honest feedback), "
                  "open Cmd-K palette (focus/Escape), theme toggle, mobile menu open, axe light/dark/mobile.",
   "shared_shell_findings": [
     "COM-01 (all 5): 390px topbar needs 454px - 64px horizontal page scroll, bell clipped at 368-400px, "
     "avatar off-screen at 408-454px, 'Open navigation menu' button 2px wide (invisible affordance; center-click still works where JS lives).",
     "COM-02 (V1-V4): pipeline .fill spans are display:inline, so inline width% never renders (0x0 measured); bars read as empty tracks - the %/value text beside them is correct.",
     "COM-03 (all 5): shared token pair --brand-500 #465fff on --brand-50 #ecf3ff = 4.33:1 at 12-14px (axe color-contrast serious; AA normal text needs 4.5:1). More nodes fail in dark (3-6).",
     "Brand wordmark overflows its sidebar flex box (scroll 212px vs client 203px) in all 5 - visually clipped at the border in this font environment.",
     "'Festive Season Campaign' (V1,V2,V3,V5) - looks like a typo for 'Festive'; no baseline file in-repo confirms captured spelling, so flagged once at family level, not scored per version."],
   "confidence": "medium",
   "confidence_basis": "Complete screenshot set (5 versions x desktop/tablet/mobile/dark/task/fullpage) + "
                       "interaction/axe/keyboard runs under one pinned environment; gaps: single evaluator, "
                       "tab arrow-key pattern and V5 sort not exercised, designed empty/loading/error states "
                       "have no public trigger and were not observed, system-font fallback instead of Outfit.",
   "production_equivalence": {"status": "not yet reviewed (pilot gate)",
                              "expected_route": "/dashboard per docs/BASELINE-MAP.md - equivalence to be confirmed read-only in S6, not assumed here"},
   "winner": order[0]["version"],
   "tie_groups": ties,
   "ranking": [r["version"] for r in order],
   "versions": sorted(V, key=lambda r: r["version"]),
   "score_change_log": ["V4 task_clarity set to 3 (not 2) at first-pass after the V1-V4 pairwise re-check: "
                         "visual purpose/action are supplied by breadcrumb/eyebrow/hero; missing H1 is scored "
                         "under accessibility+integrity to avoid triple-counting one defect. No scores were "
                         "changed after unblinding or after any total was computed for another version. "
                         "Prior DECISIONS/DELIVERY winners remain unread."]
 }]
}
(EV / "scores.json").write_text(json.dumps(scores, indent=2, ensure_ascii=False) + "\n")

# verify formula
for fam in scores["families"]:
    for r in fam["versions"]:
        assert abs(total(r["dimension_scores"]) - r["uncapped_total"]) < 0.051, r["version"]
print("F03 order:", [(r['version'], r['total'], 'cap' if r['cap'].get('applied') else '') for r in order])
print("tie groups:", ties)
print("scores.json written + formula verified")
