import json,pathlib,collections
E=pathlib.Path(__file__).resolve().parents[1];p=json.loads((E/'personas.json').read_text());tags=collections.defaultdict(list)
for r in p['personas']:
 for t in r['coverage_tags']:tags[t].append(r['id'])
evidence={
 'mobile':('390×844 captures and overflow probes across F03–F22; raw JSON/screenshots.','No real-device or assistive-technology sessions.'),
 'no-horizontal-scroll':('Overflow probe for each viewport; e.g. F09/V3 200px mobile and F22/V3 115px mobile/89px tablet.','Internal scroll containers need separate contextual review.'),
 'tap-targets':('Mobile target-size probes; e.g. F19/V2 18 targets under 24px, F21/V3 23.','Geometry alone does not establish touch usability.'),
 'contrast':('axe light/dark default states, e.g. F10/V4 dark 79 color-contrast nodes.','No manual full-state color or low-vision user study.'),
 'dark-mode':('Dark captures and axe results all families; F10–F13 captured via actual toggle.','No full state/theme matrix.'),
 'text-size':('Desktop/mobile screenshot inspection and target-size diagnostics.','No browser zoom/reflow or low-vision user test.'),
 'keyboard':('First 12 Tab stops, focus-style sampling in raw per-version JSON.','Shift+Tab, Enter, Space, Escape and full focus journeys not exhaustively covered.'),
 'focus-visible':('First 12 tab-stop focus-style probe per version.','Automated style detection is not a comprehensive visibility or focus-order assessment.'),
 'accessible-names':('axe default-state results and targeted notes, e.g. F04 palette input names.','No comprehensive screen-reader or accessible-name audit.'),
 'empty-states':('Documented initial states and screenshots; e.g. F15/V5 captured empty payment-method state.','Empty/loading/error controls were not exhaustively exercised.'),
 'first-screen-clarity':('Blind-board impressions and task-clarity notes for each version in scores.json.','Boards leak variant identifiers and are not independent human tests.'),
 'amounts':('F14/F16/F17/F18 rubric notes compare displayed synthetic amounts and statuses.','No production balances or live financial records inspected.'),
 'billing-clarity':('F14 billing and F16 checkout hierarchy notes; no payment performed.','Checkout completion not tested.'),
 'plain-language':('Integrity notes flag client-facing implementation labels, e.g. F20/V3 DTO language.','One evaluator; no comprehension study.'),
 'single-next-action':('Task hierarchy notes include F19 priority lanes and F14 work queue.','No timed task-completion test.'),
 'status-not-colour-only':('Screenshots show status text as well as color, e.g. F17 completed state.','No complete non-color or color-vision simulation audit.'),
 'findability':('F04 search and F18 issued-filter probes; task notes and screenshots.','Search across all page states not exhaustively tested.')}
out={'warning':'Synthetic perspectives are a coverage checklist only. They do not vote, represent real users, or establish an accessibility result.','coverage':[{'tag':t,'persona_ids':ids,'evidence':evidence[t][0],'limitations':evidence[t][1]} for t,ids in sorted(tags.items())]}
(E/'persona-coverage.json').write_text(json.dumps(out,indent=2,ensure_ascii=False)+'\n');print(len(tags),'coverage tags mapped')
