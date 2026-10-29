# Method note — research basis and caveats

> **AI heuristic review — not user research.** These sources informed the *protocol structure and
> tooling caveats*. **None of them provides an algorithm that can objectively rank the best-looking
> UI from a screenshot alone**, and none is claimed to prove the resulting subjective ranking.
> The ranking comes from the fixed weighted rubric in `review-manifest.json` applied to observed
> rendered evidence (screenshots, interaction runs, automated checks).

| Source | What it informed here | Caveat applied |
|---|---|---|
| Nielsen Norman Group — [10 Usability Heuristics for User Interface Design](https://www.nngroup.com/articles/ten-usability-heuristics/) | Issue-finding checklist during inspection (status visibility, real-world language, control/freedom, consistency, error prevention, recognition, efficiency, minimalist design, error recovery, help) | A checklist, not a numeric scoring system and not a substitute for evidence |
| W3C — [WCAG 2.2 Recommendation](https://www.w3.org/TR/WCAG22/) | Testable accessibility success criteria behind the manual keyboard/focus/label checks and the axe-core scan | No WCAG conformance claim is made; automated + keyboard evidence only, no screen-reader test unless stated |
| Playwright — [Visual comparisons](https://playwright.dev/docs/test-snapshots) | Why capture conditions are pinned and recorded (OS, browser build, settings, headless mode all change rendering) | Pixel diffs detect *change from a baseline*, not design quality; no diff is used to decide which version is better |
| Chrome for Developers — [Lighthouse accessibility scoring](https://developer.chrome.com/docs/lighthouse/accessibility/scoring) | Why any Lighthouse/axe number is reported as a separate diagnostic, never folded into the UI-quality total | The accessibility score is a weighted average of automated pass/fail audits; manual audits don't affect it; it is not WCAG proof (this run uses axe-core 4.10.2 directly) |
| Orbán-Mihálykó et al. — [Evaluating the capacity of paired comparison methods…](https://pmc.ncbi.nlm.nih.gov/articles/PMC9924872/) | Why Bradley–Terry/Elo/Borda are **not** applied to one AI evaluator's pairwise choices or to synthetic personas | Paired-comparison models aggregate *actual* preference judgments under assumptions; they cannot turn correlated AI opinions into user data. Reserved for a future separate human-evaluator analysis with raw choices retained |
| Chromatic — [Visual testing](https://www.chromatic.com/docs/visual/) | Why hosted visual-regression was considered but not used without explicit authorization | A baseline diff identifies change, not which design is better; no code/screenshots were uploaded to any third party |
| Applitools — [Writing visual tests](https://applitools.com/docs/eyes/getting-started/writing-tests) | Same tool decision: visual checkpoints compare against a chosen baseline; baseline/configuration choices matter | Optional regression tool, not an aesthetic judge; not used in this run |

## Tool decision for this run

Pinned **Playwright 1.49.1 + bundled Chromium 131.0.6778.33** screenshots with direct side-by-side
(blind board) inspection, plus **axe-core 4.10.2** for automated accessibility signals and manual
keyboard/focus checks. No Docker was available in the sandbox, so the run is marked
**not cross-machine pixel-reproducible** (see `review-manifest.json → environment`). No paid or
hosted visual service was required or used, and no screenshot diff is presented as a design-quality
ranking algorithm.

## Production reference pass

On 2026-10-28 the authorized client accounts were reviewed read-only in the same pinned Chromium/Playwright environment. No production screenshot, cookie, token, or response body was stored. Findings are in `production-summary.json` and are not an input to the lab rubric. Opening the notifications center coincided with the app's own mark-all-read request; that limitation is recorded rather than treated as a lab defect.
