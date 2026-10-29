#!/usr/bin/env python3
"""Pre-scoring artifacts generator (rank prompt S0.6, S5, S8.3/S8.5).
Writes review-manifest.json + personas.json from the actual disk inventory.
Creates NO scores. Re-run safe: personas roster is deterministic and stable.
"""
import json, pathlib, subprocess, datetime, itertools

ROOT = pathlib.Path(__file__).resolve().parents[3]  # repo root (.../tooling->review-evidence->client-portal-lab->repo)
LAB = ROOT / "client-portal-lab"
EV = LAB / "review-evidence"

# ---------- inventory from disk (never assumed) ----------
fam_dirs = sorted(p for p in (LAB / "families").glob("F*-*") if p.is_dir())
inventory = []
for fam in fam_dirs:
    versions = []
    for v in range(1, 6):
        p = fam / f"V{v}" / "index.html"
        versions.append({"version": f"V{v}", "path": str(p.relative_to(LAB)),
                         "exists": p.exists(),
                         "bytes": p.stat().st_size if p.exists() else None})
    docs = sorted(str(p.relative_to(LAB)) for p in (fam / "docs").glob("*.md")) if (fam / "docs").exists() else []
    inventory.append({"family_id": fam.name.split("-")[0], "family_dir": fam.name,
                      "versions": versions, "docs": docs})
n_pages = sum(1 for f in inventory for v in f["versions"] if v["exists"])
missing = [f"{f['family_dir']}/{v['version']}" for f in inventory for v in f["versions"] if not v["exists"]]

rev = subprocess.run(["git", "rev-parse", "HEAD"], cwd=ROOT, capture_output=True, text=True).stdout.strip()
dirty = subprocess.run(["git", "status", "--porcelain"], cwd=ROOT, capture_output=True, text=True).stdout.strip().splitlines()

manifest = {
  "schema": "client-portal-lab-review-manifest", "schema_version": 1,
  "protocol": "rank-ai-prompt.md (reproducible UI review and ranking), operator-supplied 2026-10-28",
  "run_status": "PREFLIGHT_COMPLETE_SCORING_NOT_STARTED",
  "repo": {"root": "ui-designing-client-dashboard", "revision": rev,
           "working_tree_at_preflight": "clean except review-evidence/ additions by this run" if dirty else "clean"},
  "date": {"utc": datetime.datetime.now(datetime.timezone.utc).isoformat(),
           "operator_timezone": "Asia/Kolkata"},
  "evaluator": "AI heuristic reviewer (browser QA operator) - one evaluator; NOT user research",
  "server": {"command": "python3 -m http.server 8130 --bind 0.0.0.0  (from repo root)",
             "base_url_internal": "http://127.0.0.1:8130/client-portal-lab/",
             "file_protocol_used": False},
  "environment": {
    "os": "Debian GNU/Linux 13 (trixie), Linux 6.1 x86_64, container sandbox (NOT canonical Docker)",
    "browser": "Chromium 131.0.6778.33 (HeadlessChrome, Playwright bundled build chromium-1148)",
    "playwright_version": "1.49.1 (pinned in review-evidence/tooling/package.json)",
    "axe_core_version": "4.10.2 (pinned)",
    "node": "v20.20.2", "python": "3.13.16",
    "device_scale_factor": 1, "color_scheme_default": "light",
    "reduced_motion": "emulated 'reduce' for screenshots",
    "fonts": "Outfit NOT installed and no remote font is loaded (0 remote assets by lab design); "
             "CSS falls back to system-ui stack in this container (DejaVu Sans / Noto Sans present). "
             "Recorded as an environment difference vs a machine with Outfit installed.",
    "pixel_reproducibility": "NOT cross-machine pixel-reproducible: no Docker in sandbox; pinned "
                             "Playwright/Chromium used consistently for every page in this run.",
    "image_diff_tool": "None used to judge quality. Direct screenshot inspection only (per S1)."
  },
  "captures_per_version": [
    {"id": "desktop", "viewport": "1440x1000", "scheme": "light", "state": "initial, page top"},
    {"id": "mobile", "viewport": "390x844", "scheme": "light", "state": "initial, page top"},
    {"id": "tablet", "viewport": "768x1024", "scheme": "light", "state": "initial, page top"},
    {"id": "dark", "viewport": "1440x1000", "scheme": "dark via ?theme=dark (.dark class + lab-theme)",
     "state": "initial"},
    {"id": "task-desktop/task-mobile", "viewport": "1440x1000 and 390x844", "scheme": "light",
     "state": "one safe family-relevant interaction outcome (same script per family)"},
    {"id": "fullpage-desktop", "viewport": "1440 width, full height", "scheme": "light",
     "state": "supplemental only"}
  ],
  "blind_boards": {"method": "5 equal-size desktop screenshots/family, neutral labels A-E, "
                             "seeded shuffle; mapping stored in scores.json",
                   "seed": 20261028},
  "rubric": {
    "version": "rank-prompt S3 v1 - fixed before scoring; weights/anchors will not change mid-run",
    "dimensions": [
      {"id": "task_clarity", "label": "Task clarity and visual hierarchy", "weight": 25},
      {"id": "usability", "label": "Usability and interaction", "weight": 20},
      {"id": "visual_craft", "label": "Visual craft and legibility", "weight": 15},
      {"id": "responsive", "label": "Responsive layout", "weight": 15},
      {"id": "accessibility", "label": "Accessibility evidence", "weight": 15},
      {"id": "integrity", "label": "Content/spec/trust integrity", "weight": 10}],
    "scale": "Integer 0-4 per dimension against S3 anchors; evidence note required per score",
    "formula": "total = sum(weight * dimension_score / 4); range 0-100, stored/displayed to 1 decimal",
    "critical_cap": "Total capped at 49 only for reproducible blocker (fails to load / primary content "
                    "or action hidden/blocked at a required viewport / core task impossible)",
    "tie_rule": "Totals within 2.0 = practical tie group; tie-break: task-clarity, then fewer "
                "major/critical issues, then responsive; else joint rank"
  },
  "task_script_generic": [
    {"id": "T1", "task": "First screen: identify page purpose, current status, next useful action (desktop + mobile)"},
    {"id": "T2", "task": "Keyboard: Tab/Shift+Tab through first 15 focusables; focus visible? logical order? Enter/Space/Escape where apt"},
    {"id": "T3", "task": "Family core interaction (same per family: tab switch / primary CTA / drawer / filter / palette as documented)"},
    {"id": "T4", "task": "Theme switch to dark and back; state persists; no unreadable surface"},
    {"id": "T5", "task": "Demo-affordance honesty: documented demo control gives honest feedback, no fake success/navigation"},
    {"id": "T6", "task": "Mobile (390px): navigation reachable, no horizontal scroll, tap targets usable, sticky UI does not block core action"},
    {"id": "T7", "task": "Automated: axe-core on default state (+ open/validation state where meaningful); console/network errors recorded"}
  ],
  "anti_anchoring": "Prior winner claims (DECISIONS.md 'Winners' sections, DELIVERY-REPORT.md verdicts) "
                    "were NOT read before first-pass scoring: docs were machine-redacted for winner/rank/"
                    "verdict sections at preflight (note: F03 V2's concept NAME 'Verdict Hero' was "
                    "over-redacted by that filter; its neutral axes were taken from manifest.json, "
                    "which contains no winner field). Prior winners may be compared only after "
                    "first-pass scores are saved.",
  "context_read_at_preflight": [
    "client-portal-lab/manifest.json (meta + all 100 records; no winner/rank fields exist)",
    "client-portal-lab/DECISIONS.md SS0-6 + later content-lock/coverage sections (winner sections redacted)",
    "client-portal-lab/shared/tokens.css, base.css (locked single blue scheme; .dark overrides)",
    "client-portal-lab/index.html gallery (exists, 168K; served 200)",
    "families/F03-*/docs/CONCEPTS.md + BASELINE-MAP.md (pilot family, redacted)"
  ],
  "inventory": {"families_discovered": len(inventory), "pages_existing": n_pages,
                "missing_versions": missing, "families": inventory},
  "production_review": {
    "url": "https://app.nestlancer.com/",
    "status": "CREDENTIALS_SUPPLIED_BY_OPERATOR_PENDING_PILOT_GATE - no login attempted yet",
    "accounts_authorized": ["Account A - Arjun Mehta (arjun.mehta@nestlancer.com)",
                            "Account B - Samira Patel (samira.patel@nestlancer.com)",
                            "Account C - Rahul Desai (rahul.desai@nestlancer.com)"],
    "credential_handling": "Password held only in operator session; never written to disk, logs, "
                           "screenshots, or reports; to be entered only into the normal login form "
                           "via transient in-memory variable; logout before account switch",
    "rules": "Read-only. No create/edit/send/approve/delete/upload/pay/submit. No production "
             "screenshots with personal data stored. Equivalence judged per route/task only."
  },
  "run_plan": {"approved_default": "Pilot F03 (5 versions) end-to-end for operator approval, then "
                                   "remaining 19 families unchanged rubric, then production S6",
               "source_templates_edited": False},
  "exclusions_and_limits": [
    "No Docker available -> not a canonical pixel-reproducible run (see environment).",
    "No screen-reader test claimed; axe + manual keyboard checks only.",
    "100 personas are a coverage matrix, not votes/users (S5).",
    "Scores are one AI evaluator's rubric judgments, not measured user preference."
  ]
}
(EV / "review-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")

# ---------- 100 synthetic reviewer profiles: coverage matrix, NOT votes ----------
urgency = ["urgent single-task visit", "routine weekly check-in", "first-ever login", "deadline-driven (quote expiring)", "billing-problem visit"]
familiarity = ["first-time client", "occasional client (monthly)", "repeat client (weekly)", "power client (many projects)", "client returning after 6 months away"]
access = ["no stated access need", "low vision - needs strong contrast/large text", "keyboard-only navigation", "screen-reader user", "motor - large tap targets, imprecise pointer",
          "cognitive - needs plain language, one task at a time", "reduced-motion preference", "colour-vision deficiency - status must not be colour-only"]
device = ["desktop 1440px, mouse", "mid-range Android phone 390px", "iPhone 390px, one-handed", "tablet 768px touch", "older laptop 1280px, slow network"]
priority = ["knowing what to pay next", "seeing project progress", "replying to messages fast", "comparing quotes carefully", "downloading invoices for accounts",
            "raising a new request without errors", "finding one item via search", "checking nothing is awaiting them"]
context = ["quiet office, focused", "on the move, interrupted often", "shared screen with an accountant/partner", "low-light evening use (dark mode)", "high-stress: payment failed"]

personas = []
i = 0
for combo in itertools.product(range(5), range(4), range(5)):  # 100 deterministic combos
    u = urgency[combo[0]]; d = device[combo[1]]; pr = priority[(combo[0] + combo[2]) % 8]
    f = familiarity[(combo[1] + combo[2]) % 5]; a = access[(combo[0] * 3 + combo[2]) % 8]
    c = context[(combo[1] * 2 + combo[2]) % 5]
    i += 1
    tags = []
    if "phone" in d or "iPhone" in d: tags += ["mobile", "tap-targets", "no-horizontal-scroll"]
    if "keyboard" in a or "screen-reader" in a: tags += ["keyboard", "focus-visible", "accessible-names"]
    if "low vision" in a: tags += ["contrast", "text-size"]
    if "colour-vision" in a: tags += ["status-not-colour-only"]
    if "cognitive" in a: tags += ["plain-language", "single-next-action"]
    if "dark" in c: tags += ["dark-mode"]
    if "pay" in pr or "invoices" in pr: tags += ["billing-clarity", "amounts"]
    if "search" in pr: tags += ["findability"]
    if "first" in f or "first" in u: tags += ["first-screen-clarity", "empty-states"]
    personas.append({
        "id": f"P{i:03d}", "synthetic": True,
        "profile": f"{f}; {u}; on {d}; context: {c}; access: {a}; top priority: {pr}.",
        "task_urgency": u, "familiarity": f, "access_needs": a, "device": d,
        "work_context": c, "information_priority": pr, "coverage_tags": sorted(set(tags))})

roster = {
  "schema": "client-portal-lab-review-personas", "schema_version": 1,
  "warning": "100 SYNTHETIC reviewer profiles used ONLY as a coverage matrix (S5). They are not "
             "100 humans, not 100 sessions, not 100 votes. No survey results, quotes, averages, "
             "or persona-majority ranking are derived from them. Ranking is by fixed rubric (S3).",
  "cohort": "Cohort 1 - created 2026-10-28; reuse unchanged on repeat runs unless operator requests a new cohort",
  "count": len(personas), "personas": personas}
(EV / "personas.json").write_text(json.dumps(roster, indent=2) + "\n")

print(f"families={len(inventory)} pages={n_pages} missing={missing}")
print(f"personas={len(personas)} unique={len({p['profile'] for p in personas})}")
print("wrote review-manifest.json + personas.json")
