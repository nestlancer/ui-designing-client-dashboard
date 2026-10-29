import json,pathlib
E=pathlib.Path(__file__).resolve().parents[1]; mp=E/'review-manifest.json';sp=E/'scores.json';m=json.loads(mp.read_text());s=json.loads(sp.read_text())
m['run_status']='LAB_FIRST_PASS_COMPLETE_PRODUCTION_AUTH_BLOCKED'
m['production_review']['status']='PUBLIC_LOGIN_REACHED_AUTHENTICATED_REVIEW_NOT_STARTED'
m['production_review']['public_reference']='GET https://app.nestlancer.com/ redirected to /login and returned a client sign-in page; no account login attempted.'
m['production_review']['blocking_reason']='The supplied credential is not available to this continuation, and no approved secure credential input is exposed to the agent. Stop before login; request secure access. No session material was stored.'
m['production_review']['credential_handling']='Credentials must be entered only in the normal production login form through approved secure input; no passwords, cookies, tokens, session material or sensitive screenshots in artifacts. Log out before changing accounts.'
m['progress']['production_review']='Public sign-in page reachable; authenticated review blocked pending secure credential input. No account or route inventory beyond sign-in.'
m['progress']['screenshot_deduplication']='53 byte-identical screenshot files represented by relative symlinks to identical PNGs in the same folder; SHA-256 and original paths recorded in raw/identical-screenshot-links.json. Image pixels unchanged.'
m['progress']['limitations']=['Blind boards contain embedded version identifiers; blinding incomplete.','Keyboard evidence samples the first 12 Tab stops and is not comprehensive for every interactive state.','Several interaction results are partial or inconclusive, particularly F11–F13, F20–F22; no assistive-technology test.','Some pairwise entries were derived from rubric order rather than independently elicited; this does not meet the full protocol pairwise requirement.','Report verification covers 21 pages at two viewport sizes and sampled first Tab; see raw/report-verification.json.']
for x in m['captures_per_version']:
 if x['id']=='dark': x['scheme']='dark via ?theme=dark for supported families; F10–F13 captured after real theme toggle'
s['run']['stage']='LAB_FIRST_PASS_COMPLETE_PRODUCTION_AUTH_BLOCKED';s['run']['production_review']='Public sign-in page reached; authenticated review not started; secure credential input required.'
for f in s['families']:
 f['production_equivalence']['status']='not reviewed — authenticated reference blocked pending secure access'
mp.write_text(json.dumps(m,indent=2,ensure_ascii=False)+'\n');sp.write_text(json.dumps(s,indent=2,ensure_ascii=False)+'\n')
