import json,pathlib
E=pathlib.Path(__file__).resolve().parents[1];p=E/'scores.json';s=json.loads(p.read_text());W={'task_clarity':25,'usability':20,'visual_craft':15,'responsive':15,'accessibility':15,'integrity':10}
for f in s['families']:
 for v in f['versions']:
  if v['dimension_scores']['accessibility']==4:
   old=v['total'];v['dimension_scores']['accessibility']=3
   v['evidence']['accessibility']+=' Automated checks and a sample of tab stops do not constitute the strong manual coverage required for 4/4.'
   v['uncapped_total']=round(sum(v['dimension_scores'][k]*w/4 for k,w in W.items()),1)
   v['total']=min(v['uncapped_total'],49.0) if v['cap'].get('applied') else v['uncapped_total']
   f['score_change_log'].append(f"{v['version']} accessibility 4→3; automated scans plus sampled Tab focus alone do not establish strong manual access evidence. Total {old:.1f}→{v['total']:.1f}.")
p.write_text(json.dumps(s,indent=2,ensure_ascii=False)+'\n')
