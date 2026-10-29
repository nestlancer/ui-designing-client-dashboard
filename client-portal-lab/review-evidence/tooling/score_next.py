import sys
sys.path.insert(0,'client-portal-lab/review-evidence/tooling')
from score_lib import *
def record(fid,directory,data,task,base,script,shared,notes,route,confidence='medium'):
 S=load(); versions=[]
 for v,n,vals,e in data:
  versions.append(version(fid,directory,v,n,dict(zip(W,vals)),dict(zip(W,e))))
 pairs=[]
 for i,a in enumerate(versions):
  for b in versions[i+1:]:
   w='tie' if abs(a['total']-b['total'])<=2 else (a['version'] if a['total']>b['total'] else b['version'])
   reason=f"{a['version']}: {a['evidence']['task_clarity']} {b['version']}: {b['evidence']['task_clarity']}"
   pairs.append([a['version'],b['version'],w,reason])
 f=family(S,fid,directory,task,base,script,shared,versions,pairs,confidence=confidence,prod_route=route,board_notes=notes)
 f['pairwise_note']='Rubric-derived comparison summary, not independent pairwise judgments or votes. Read the recorded task evidence alongside scores.'
 save(S); print(fid,[(v['version'],v['total']) for v in sorted(versions,key=lambda x:-x['total'])])
