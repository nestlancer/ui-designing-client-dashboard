import json,pathlib
E=pathlib.Path(__file__).resolve().parents[1]; p=E/'scores.json'; S=json.loads(p.read_text()); M=json.loads((E/'review-manifest.json').read_text())
for f in S['families']:
 if 'pairwise' not in f and f['family_id']=='F03': f['pairwise']=S['pairwise_consistency_checks']['pairs']
 # Practical tie groups have total spread <=2, not transitive chains with >2 spread.
 ordered=sorted(f['versions'],key=lambda x:(-x['total'],x['version'])); groups=[]
 for r in ordered:
  if not groups or groups[-1][0]['total']-r['total']>2: groups.append([r])
  else: groups[-1].append(r)
 sorted_all=[]; rank_base=1
 for group in groups:
  key=lambda x:(-x['dimension_scores']['task_clarity'],x['major_or_critical_issues'],-x['dimension_scores']['responsive'])
  group.sort(key=lambda x:(*key(x),x['version']))
  for j,r in enumerate(group):
   r['rank']=rank_base+j if j==0 or key(r)!=key(group[j-1]) else group[j-1]['rank']
   r['joint_rank']=sum(key(other)==key(r) for other in group)>1
  sorted_all+=group; rank_base+=len(group)
 f['tie_groups']=[[r['version'] for r in g] for g in groups if len(g)>1]
 f['ranking']=[r['version'] for r in sorted_all]; f['winner']=sorted_all[0]['version']
 f['joint_winners']=[r['version'] for r in sorted_all if r['rank']==1]
 f['ranking_rule_note']='Totals within 2.0 form a practical group (maximum span 2.0); inside the group, task clarity, fewer major/critical issues, then responsive score decide order; equal tie-breakers share rank.'
 if f['family_id'] in ('F12','F13'):
  f['pairwise_note']='Pair entries are a rubric-derived consistency summary, not independent comparisons or votes; interaction evidence is incomplete.'
S['run']['stage']='IN_PROGRESS'; S['run']['production_review']='NOT YET RUN; no production finding claimed.'
p.write_text(json.dumps(S,indent=2,ensure_ascii=False)+'\n')
M['run_status']='IN_PROGRESS_PILOT_APPROVED'; M['progress']={'families_scored':S['run']['families_scored'],'families_pending':S['run']['families_pending'],'captured_pages':100,'production_review':'not yet started','blind_board_conversion':'Board PNGs converted to 2200px-wide JPEG at quality 82 for storage. Originals removed.','blindness_limitation':'Some screenshots contain page-embedded version identifiers. Shuffling was recorded, but true blinding was incomplete.','dark_correction':'F10–F13 dark states captured with real toggle; URL query is unsupported.'}
(E/'review-manifest.json').write_text(json.dumps(M,indent=2,ensure_ascii=False)+'\n')
print('updated scores and manifest')
