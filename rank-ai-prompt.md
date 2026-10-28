# AI prompt — reproducible UI review and ranking

**Purpose:** use a browser-capable coding agent to inspect every client-portal lab HTML version in Chrome, review the production portal read-only, and create evidence-backed ranking pages. This is a review protocol—not a claim that the work has already been run.

**Why this protocol is stricter:** a subjective one-pass score, invented persona votes, mismatched screenshots, or scoring across unrelated page types can easily put a visually weak version above a strong one. This protocol fixes the inventory, render conditions, tasks, score anchors, tie rules, and evidence format before scoring. Images help reviewers see layout and polish; screenshot-diff tools detect visual changes, but do not by themselves tell us which UI is better.

---

## Copy from here into a browser-capable coding agent

### Role and goal

Act as a skeptical, evidence-led UI design reviewer and browser QA operator. Review the existing client portal designs in the repository and produce a reproducible, explainable ranking. Do not edit the source templates or make changes to the production application.

The final ranking must answer: **for this family’s intended client task, which version is clearest, most usable, visually coherent, accessible, and robust across the tested viewports—and what observed evidence supports that order?** Do not rank unrelated page families against one another as if they solve the same task.

### 0. Preflight: confirm you have the right files and access

1. Confirm the repository root and current working tree. If the repository or `client-portal-lab/` is absent, stop and ask for the correct repository path; do not invent an inventory or score pages from memory.
2. Inspect the gallery, `manifest.json`, `DECISIONS.md`, shared CSS/tokens, and each family’s relevant `docs/` files before evaluation. Treat documented constraints, frozen content, demo-only affordances, and known limitations as context—not automatic defects.
3. Discover files from disk. Include every existing `families/F##-*/V#/index.html`; record missing or extra versions. Do not assume there are exactly 100. At the time this prompt was written the lab contained 20 families × 5 versions = 100 pages, but verify that at run time.
4. Confirm Chrome is available. Serve the lab with a local HTTP server so relative assets work. Record the exact URL and command. Do not use `file://` if it changes behavior.
5. Before production review, check the credential prerequisite in §7. A Markdown prompt is not an authenticated browser session.
6. Do not start scoring until inventory and environment metadata have been written to the review manifest.

### 1. Reproducible browser and screenshot protocol

**Preferred canonical environment:** use the same pinned Chromium/Playwright environment for every lab page and every rerun. If Docker and Playwright are already available, use the repository’s pinned versions or a single explicitly pinned official Playwright image and matching Playwright package. Never silently change package versions. If these tools are unavailable, use Chrome consistently for the whole run and clearly mark the run as **not cross-machine pixel-reproducible**; do not claim a canonical Docker run that did not happen.

Record at minimum: date/time and timezone, OS/container image, Chrome/Chromium version, Playwright version if used, device scale factor, viewport, color scheme, reduced-motion setting, font availability if known, template commit or repository revision, and evaluator/model version if exposed. Keep these settings unchanged for every version in a family. Different operating systems, browser builds, fonts, and rendering settings can change screenshots, so do not compare images captured under mixed environments.

For each template, capture and inspect actual rendered screenshots—not just HTML/CSS source—under these fixed conditions:

| Capture | Viewport in CSS px | Color scheme | Content/state |
|---|---:|---|---|
| Desktop | 1440 × 1000 | Light | Initial/data state, page top |
| Mobile | 390 × 844 | Light | Initial/data state, page top |
| Tablet | 768 × 1024 | Light | Initial/data state, page top |
| Dark check | 1440 × 1000 | Dark, if supported | Initial/data state |
| Task state | 1440 × 1000 and 390 × 844 | Light | One safe, family-relevant interaction outcome |

Use the same viewport, state, data, scroll position, and capture framing when comparing versions in a family. Wait for fonts and local assets; disable motion for screenshots where possible; move the pointer away to avoid hover artifacts; use synthetic form values. Capture full-page images as supplemental evidence, not as a substitute for fixed-viewport comparisons. Do not mask a genuine layout defect. Mask only genuinely volatile content and record every mask.

Create a **blind comparison board** for each family: five equal-size screenshots with neutral labels A–E, same viewport and state, no score/name/winner visible. Randomize label-to-version assignment using a fixed, recorded seed, then preserve the mapping in the data file. Inspect the board and the individual full-resolution images. The board supports visual comparison; it is not itself an objective quality algorithm.

Use Playwright `toHaveScreenshot` / pixel diffs only to detect and document rendering changes or instability—not to decide which layout is aesthetically or functionally superior. A pixel diff measures visual difference from a baseline, not design quality. Optional services such as Chromatic or Applitools can provide standardized cloud rendering or visual regression comparison if already authorized and configured. Do not upload repository code, screenshots, account data, or production content to a third-party visual service without explicit authorization. Record tool, version, browser/rendering environment, and what it actually checked. If no image-diff tool is available, direct screenshot inspection remains required and must be reported as such.

### 2. Interaction and content review

For every version, test the most relevant safe interactions from its family docs and visible UI: keyboard Tab/Shift+Tab and Enter/Space/Escape where appropriate, primary CTA, menus/dialogs, tabs, search/filter/sort, form validation with synthetic data, feedback, theme switch, and mobile navigation. Do not click controls that would send real data. Record a short task script and run the **same script** on each comparable version. Note each task as pass / partial / fail / not testable, with a concrete observation and screenshot/state reference.

Inspect at least these design qualities:

- First-screen hierarchy: can a client identify the page purpose, current status, and next useful action quickly?
- Text legibility, line length, spacing, alignment, density, contrast, meaningful labels, and content grouping.
- Alignment, consistency, visual craft, and whether decoration competes with the task.
- Responsive reflow, clipped/overlapping content, horizontal scrolling, usable tap targets, and persistent/sticky UI obstruction.
- Feedback, loading/empty/error states when available, predictable controls, error prevention and recovery.
- Semantics, form labels, status text, keyboard access, visible focus, focus order, and accessible names.
- Honest behavior: distinguish functional behavior, documented demo behavior, and unsupported promises. Do not penalize an explicitly documented no-op as though it were a broken production integration; do report if a demo affordance misleads users.

Run an automated accessibility scan with axe-core or Lighthouse only if already available or installable without disrupting the repository. Scan the default state and meaningful open/validation states, record tool/version and findings, and deduplicate findings. Automated accessibility scores are a **separate diagnostic**, never an overall UI quality score and never proof of WCAG conformance. Manually test keyboard/focus behavior. Do not claim a full WCAG audit or screen-reader test unless actually performed with the relevant assistive technology.

Use Nielsen’s usability heuristics as an issue-finding checklist (status visibility, real-world language, control/freedom, consistency, error prevention, recognition, efficiency, minimalist design, error recovery, help). They guide inspection; they are not a substitute for evidence or a numeric score by themselves.

### 3. Fixed scoring rubric — score each version independently first

Score each dimension from **0 to 4** using the anchors below. Use whole numbers only. For each score, attach at least one evidence note; “looks good,” “modern,” or “I prefer it” is not evidence.

| Dimension | Weight | 0 | 1 | 2 | 3 | 4 |
|---|---:|---|---|---|---|---|
| Task clarity and visual hierarchy | 25 | Task/status/next step not discoverable | Major confusion | Understandable with significant scanning | Clear with minor friction | Primary task, status, and next step immediately obvious |
| Usability and interaction | 20 | Core task unusable | Several blocking/frustrating controls | Core task possible with notable friction | Predictable, mostly smooth | Clear, efficient, forgiving interactions and feedback |
| Visual craft and legibility | 15 | Broken/unreadable or incoherent | Major hierarchy/spacing/type issues | Adequate but uneven | Polished and coherent | Exceptional clarity, restraint, consistency, and finish |
| Responsive layout | 15 | Core content/action unusable on target viewport | Major clipping/overlap/overflow | Works with notable compromise | Good reflow, minor issue only | Deliberately adapted and fully usable at tested sizes |
| Accessibility evidence | 15 | Core access barrier observed | Multiple serious barriers | Mixed; notable barriers remain | Strong checks; only minor issues observed | Strong automated + manual evidence, no material barrier observed |
| Content/spec/trust integrity | 10 | Misleading or materially incorrect | Major inconsistency or unsupported claim | Some ambiguity | Accurate and honest with small gaps | Accurate, consistent, transparent, and well matched to family constraints |

Calculate the weighted score mechanically:

`total = Σ(weight × dimension_score ÷ 4)`

Total is 0–100. Keep one decimal place in the stored result and display one decimal. Do not add bonus points for novelty, visual trendiness, simulated persona popularity, or a Lighthouse percentage. Do not alter weights or anchors midway. If a criterion cannot be observed, mark it **not observed** and explain; do not silently award a 4. If comparison coverage is incomplete, lower confidence rather than guessing.

**Critical usability cap:** if a version fails to load, hides/blocks its primary content or action at a required viewport, or cannot complete the family’s core task because of a reproducible blocker, cap its total at 49. Record the exact reproduction and do not use the cap for subjective aesthetic dislikes. Other defects remain in the scored dimensions and issue list; do not invent extra penalty points.

### 4. Ranking algorithm and anti-drift checks

1. Score all versions independently against the fixed rubric before looking at their current/reported winners. Do not read prior ranking claims until these first-pass scores and evidence notes are saved. This reduces anchoring to earlier opinions.
2. For each family, compare all available version pairs at the same blind comparison board/state (for five versions, all 10 pairs). For each pair, choose **A better for the stated client task / B better / tie**, and give one or two concrete reasons tied to the rubric. Treat these as one AI evaluator’s consistency check—not as human votes, population preference, or statistically independent users.
3. The weighted rubric score is the **primary ordering**. Use pairwise outcomes to flag contradictions and re-open the evidence. Do not silently replace the score with a model’s visual preference. If pairwise checks conflict materially with the score order, explain the conflict and re-check the same screenshots/tasks; only change a score when evidence supports it, recording the old/new score and reason.
4. Use exact sorted order by total. If totals differ by **2.0 points or less**, label versions as a practical tie group and show the shared score band. Within a tie group only, use these fixed tie-breakers in order: higher task-clarity score, then fewer major/critical observed issues, then higher responsive score. If still tied, keep a joint rank; use version ID only for display ordering, not as a quality distinction.
5. Do not use Bradley–Terry, Elo, Borda, or statistical confidence intervals on synthetic persona outputs or one model’s pairwise choices. Pairwise-comparison models are appropriate for actual preference judgments, but they cannot turn correlated AI opinions into genuine user research. If real independent human evaluators later provide pairwise preferences, retain their raw anonymous choices and evaluator counts and then use Bradley–Terry (or another justified paired-comparison method) as a **separate** analysis; report ties, missing comparisons, model assumptions, and uncertainty. Keep the human and AI results separate.
6. Report confidence as **high / medium / low**, based on evidence completeness (screenshots and interaction coverage, environment consistency, and unresolved errors), not on the number of synthetic personas or decimal places. A ranking is an evidence-based recommendation, not an objective universal truth.

### 5. One hundred reviewer personas — coverage, not fake votes

Create exactly **100 distinct synthetic client-reviewer profiles** with stable IDs (`P001`–`P100`), differing in task urgency, product familiarity, vision/motor/hearing/cognitive access needs, device constraints, work context, and information priorities. Avoid caricatures. Save the roster once to `client-portal-lab/review-evidence/personas.json`; on repeat runs, reuse it unchanged unless the operator explicitly asks for a new cohort. Each persona must be a plausible perspective, not a fabricated real person.

Use the roster as a **coverage matrix**: identify which design risks and tasks matter to which profiles, and check that relevant needs are represented in the review evidence. The 100 profiles are not 100 humans, not 100 independent browser sessions, and not 100 independent votes. Do not create fake survey results, fictional quotes, statistical averages, confidence intervals, or a persona-majority ranking. The fixed weighted rubric in §3 determines the ranking. State this limitation prominently in all reports.

### 6. Production portal review — read-only and separate from the lab ranking

Production URL: <https://app.nestlancer.com/>. Inspect production UI as a **reference**, not as an automatic winner or a source for guessing missing design content. Match a production page to a lab family only when the route/task is genuinely equivalent; otherwise label it “no direct comparison.”

Inventory all client-facing pages reachable through visible navigation and relevant in-page links for each permitted account. Record route/page title and outcome (reviewed, unavailable, denied, not applicable). Review read-only at the same desktop and mobile sizes where practical. Keep production findings in their own section; never mix live account data into local design score data. Do not expose customer names, messages, invoices, balances, or other personal information in screenshots or reports; redact or omit them.

Do not create, edit, send, approve, delete, upload, pay, purchase, or submit real production data. Stop before any action that could mutate data. If a route or account is blocked, record the non-sensitive result and do not bypass access controls or repeatedly retry.

### 7. Authentication prerequisite and handling

The three authorized test-account identities are the ones named in the operator’s request:

- Account A — Arjun Mehta (`arjun.mehta@nestlancer.com`)
- Account B — Samira Patel (`samira.patel@nestlancer.com`)
- Account C — Rahul Desai (`rahul.desai@nestlancer.com`)

**This prompt intentionally contains no password. It cannot log in by itself.** Run it in the same secure agent session where the operator supplied the credentials, or have the operator enter them through the browser/agent’s approved secure credential input at run time. If neither is available, stop before production login and ask the operator to provide access securely. Never guess, retrieve, print, log, screenshot, or write credentials, cookies, tokens, or session material to files. Enter credentials only into the normal production login form. Log out before changing accounts. Do not repeat a password in any report or final response.

### 8. Required artifacts

Create these artifacts beneath `client-portal-lab/`; do not edit any existing `V#/index.html`, shared styles, or production code:

1. **`rank.html`** — polished overall dashboard with family winners, family links, inventory/coverage, production review coverage, methodology, limitations, and an explicit “AI heuristic review—not user research” label. Provide accessible search/filter controls; do not imply that cross-family winners are directly comparable.
2. **`families/F##-<family>/rank.html`** — one report per discovered family. Show the task and baseline context, rank/tie groups for every available version, total and six dimension scores, evidence-based rationale, observed issues/severity, screenshots, interaction coverage, production-equivalence status, and confidence/limitations.
3. **`review-evidence/review-manifest.json`** — schema/version, repository revision, inventory, capture environment, browser/tool versions, fixed viewports/states, scoring-rubric version, task scripts, date, exclusions, and completeness status.
4. **`review-evidence/scores.json`** — machine-readable scores, evidence references, task results, pairwise consistency checks, tie groups, caps and reasons, issue IDs/severity, confidence, and each version’s exact source path. Store the rubric values and formula or reference the versioned rubric in this prompt.
5. **`review-evidence/personas.json`** — the stable synthetic 100-persona roster and coverage tags; no simulated vote totals.
6. **`review-evidence/screenshots/`** — actual, consistently captured, non-sensitive lab screenshots and blind comparison boards, named with family/version/viewport/theme/state. Do not store production screenshots containing personal or account data. Do not add bulky video/trace artifacts unless needed to substantiate a specific issue.
7. **`review-evidence/RESEARCH.md`** — brief method note with links to the sources listed below, what each informed, and caveats. Avoid claiming any source proves the subjective ranking.

Generated HTML should be accessible, mobile responsive, keyboard operable, and visually polished. Use relative links and verify them. Include a concise score legend and a visible warning that the overall score is rubric-derived, not a measured user-preference percentage. Sort versions deterministically. Use no fabricated screenshot, score, observed browser result, production finding, or quote.

### 9. Verification and final report

Before claiming completion:

- Re-count discovered families/templates and verify each has a score record and review status. Every missing/unavailable page must be listed, not omitted.
- Validate `review-manifest.json`, `scores.json`, and `personas.json`; verify every score recomputes from the fixed formula and every displayed rank matches the stored data.
- Check all local HTML links and screenshot paths. Open the overall and family pages in Chrome at desktop and mobile sizes; check console errors, broken images, keyboard navigation, and horizontal overflow.
- Confirm scoreboards use the same environment and conditions. If they do not, downgrade confidence and state why.
- Confirm generated files contain no password, token, cookie, session material, or unredacted production personal data.
- Report only what actually ran: template/family counts, completed/blocked reviews, environment/browser versions, production accounts/pages reviewed, each family winner and tie, meaningful limitations, and deliverable paths. Never present synthetic persona coverage as user testing.

---

## Research basis and tool notes

These references informed the protocol. They support evaluation structure and tooling caveats; **none provides an algorithm that can objectively rank the best-looking UI from a screenshot alone**.

- Nielsen Norman Group, [10 Usability Heuristics for User Interface Design](https://www.nngroup.com/articles/ten-usability-heuristics/) — broad interaction-design principles used as an inspection checklist, not a universal numeric scoring system.
- W3C, [WCAG 2.2 Recommendation](https://www.w3.org/TR/WCAG22/) — testable accessibility success criteria. The prompt asks for automated checks plus manual review and prohibits unsupported conformance claims.
- Playwright, [Visual comparisons](https://playwright.dev/docs/test-snapshots) — screenshot baselines and pixel comparisons; documentation warns rendering varies with OS, browser version, settings, hardware, and headless mode. This is why capture conditions are recorded and pinned.
- Chrome for Developers, [Lighthouse accessibility scoring](https://developer.chrome.com/docs/lighthouse/accessibility/scoring) — Lighthouse’s accessibility score is a weighted average of pass/fail automated audits; manual audits do not affect that score. It is a diagnostic, not an overall design rank or WCAG proof.
- Orbán-Mihálykó et al., [Evaluating the capacity of paired comparison methods to aggregate rankings of separate groups](https://pmc.ncbi.nlm.nih.gov/articles/PMC9924872/) — paired-comparison ranking methods, including Bradley–Terry, are useful for aggregating actual comparison judgments under assumptions; they are not a way to make one model’s synthetic preferences into real user data.
- Chromatic, [Visual testing](https://www.chromatic.com/docs/visual/) — snapshot/baseline comparison is valuable for finding visual regressions missed by functional tests; a baseline diff identifies change, not which design is better.
- Applitools, [Writing visual tests](https://applitools.com/docs/eyes/getting-started/writing-tests) — visual checkpoints compare a rendered state to a chosen baseline; baseline selection and capture configuration matter. This is an optional visual-regression tool, not an automatic aesthetic judge.

**Tool decision:** for this repository, start with pinned Chrome/Chromium + Playwright screenshots and direct side-by-side review. Add axe-core/Lighthouse for automated accessibility signals. Use a hosted visual service only if already approved and configured. Do not require paid tools or pretend a screenshot diff is a design-quality ranking algorithm.