import json,pathlib
E=pathlib.Path(__file__).resolve().parents[1];p=E/'scores.json';s=json.loads(p.read_text());f={x['family_id']:x for x in s['families']}
r=next(v for v in f['F09']['versions'] if v['version']=='V3'); old=r['total'];r['dimension_scores']['responsive']=1
r['evidence']['responsive']='Rail stacks under the verdict, but at 390px the document overflows horizontally by 200px and the right side of the green queue text is clipped. Tablet and desktop have no measured page overflow.'
r['uncapped_total']=round(sum(r['dimension_scores'][k]*w/4 for k,w in {'task_clarity':25,'usability':20,'visual_craft':15,'responsive':15,'accessibility':15,'integrity':10}.items()),1);r['total']=r['uncapped_total']
f['F09']['shared_shell_findings']=[x.replace('No horizontal scroll at 390/768/1440 anywhere in the family','No horizontal scroll in V1/V2/V4/V5; V3 overflows by 200px at 390px') for x in f['F09']['shared_shell_findings']]
f['F09']['score_change_log'].append(f'Corrected V3 responsive 3→1 after re-checking raw overflow and the full-resolution mobile screenshot: 200px page overflow clips queue text. Total {old:.1f}→{r["total"]:.1f}; no critical cap because core tab was observed working.')
for x in f['F09']['pairwise']:
 if set((x['a'],x['b']))=={'V3','V5'}: x['better_for_family_task']='V5';x['reason']='Rechecked after scoring: V3 has stronger ownership clarity but clips queue text with 200px mobile page overflow; V5 fits and therefore is preferred overall.'
# Add evidence that the automatic issue collector originally checked only mobile overflow.
r=next(v for v in f['F22']['versions'] if v['version']=='V3'); r['issues'].append({'id':'F22-V3-tablet-overflow','severity':'major','title':'Horizontal page scroll of 89px at the 768px tablet viewport','ref':'raw/F22-V3-raw.json overflow_tablet'});r['major_or_critical_issues']+=1
r=next(v for v in f['F17']['versions'] if v['version']=='V4');r['issues'].append({'id':'F17-V4-conflicting-blocker','severity':'major','title':'Completed-payment card simultaneously claims one blocker and no blocker','ref':'desktop and mobile top screenshots'});r['major_or_critical_issues']+=1
r=next(v for v in f['F20']['versions'] if v['version']=='V2');r['tasks']['T3_supp_desktop']='partial: field changed; one occurrence in page text is consistent with live preview (input value is not counted as innerText); no save verified'
r=next(v for v in f['F21']['versions'] if v['version']=='V4');r['tasks']['T3_supp_desktop']='partial: 2FA-labelled control clicked, but no dialog opened; raw pass is not sufficient to establish enrollment flow'
p.write_text(json.dumps(s,indent=2,ensure_ascii=False)+'\n')
print('evidence corrections applied')
