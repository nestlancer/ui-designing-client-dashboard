import json,pathlib,re,hashlib
from html.parser import HTMLParser
LAB=pathlib.Path(__file__).resolve().parents[2]; EV=LAB/'review-evidence'; root=LAB.parent
S=json.loads((EV/'scores.json').read_text()); M=json.loads((EV/'review-manifest.json').read_text()); P=json.loads((EV/'personas.json').read_text()); errors=[]; warnings=[]
pages=sorted(LAB.glob('families/F[0-9][0-9]-*/V[0-9]*/index.html')); families={p.parents[1].name for p in pages}
expected={str(p.relative_to(root)) for p in pages}; scored={v['source_path'] for f in S['families'] for v in f['versions']}
if expected!=scored: errors.append('Inventory/source path mismatch: '+str((expected-scored,scored-expected)))
ids=[p['id'] for p in P['personas']]
if ids!=[f'P{i:03d}' for i in range(1,101)]:errors.append('Persona ID/count mismatch')
W={'task_clarity':25,'usability':20,'visual_craft':15,'responsive':15,'accessibility':15,'integrity':10}
for f in S['families']:
 vs=f['versions']; values={x['version'] for x in vs}; pairs=f.get('pairwise',[])
 if len(vs)!=5 or len(pairs)!=10 or len({tuple(sorted([p['a'],p['b']])) for p in pairs})!=10:errors.append(f['family_id']+' version/pair count mismatch')
 if any(p['a'] not in values or p['b'] not in values or p['better_for_family_task'] not in (p['a'],p['b'],'tie') for p in pairs):errors.append(f['family_id']+' invalid pair')
 for v in vs:
  val=round(sum(W[k]*v['dimension_scores'][k]/4 for k in W),1)
  if v['uncapped_total']!=val or v['total']!=(min(val,49.0) if v['cap'].get('applied') else val):errors.append(f['family_id']+'/'+v['version']+' invalid total')
  for kind,p in v['screenshots'].items():
   if not (LAB/p).is_file():errors.append(f['family_id']+'/'+v['version']+' missing screenshot '+p)
 for view in ('desktop-light-top','mobile-light-top'):
  if not (EV/f'boards/{f["family_id"]}-blind-board-{view}.jpg').is_file():errors.append('missing board '+f['family_id']+'/'+view)
 r=LAB/'families'/f['family_dir']/'rank.html'
 if not r.exists():errors.append('missing report '+str(r))
 else:
  txt=r.read_text()
  for v in vs:
   rank=str(v['rank'])+('=' if v.get('joint_rank') else '')
   if f'#{rank} · {v["version"]}' not in txt:errors.append('displayed rank mismatch '+f['family_id']+'/'+v['version'])
class LinkCheck(HTMLParser):
 def __init__(self,p):super().__init__();self.p=p
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  for k in ('src','href'):
   x=a.get(k,'')
   if x and not x.startswith(('#','http:','https:','mailto:','data:')) and not (self.p.parent/x.split('#')[0]).exists():errors.append('broken local link '+str(self.p.relative_to(LAB))+' '+x)
reports=[LAB/'rank.html']+list(LAB.glob('families/F[0-9][0-9]-*/rank.html'))
for r in reports:
 p=LinkCheck(r);p.feed(r.read_text())
# Structural signature scan only; not proof that all sensitive data has been excluded.
patterns=[re.compile(rb'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'),re.compile(rb'(?i)authorization\s*:\s*bearer\s+[A-Za-z0-9_.-]{15,}'),re.compile(rb'(?i)set-cookie\s*:\s*[^\s;=]+=[^\s;]{8,}')]
hits=0
for path in EV.rglob('*'):
 if not path.is_file() or path.is_symlink() or 'node_modules' in path.parts or path.suffix.lower() in ('.png','.jpg','.jpeg','.webp'):continue
 try:
  b=path.read_bytes()
  if any(q.search(b) for q in patterns):hits+=1
 except OSError: warnings.append('Could not scan '+str(path))
if hits:errors.append(f'{hits} files matched structural credential signatures; manual review required')
v=json.loads((EV/'raw/report-verification.json').read_text()); failed=[x for x in v['records'] if x['http']!=200 or x['hscroll'] or x['errors'] or x['failedLoadedImages'] or not x['firstFocus']['visible']]
if failed:errors.append(str(len(failed))+' generated-page viewport smoke checks failed')
result={'inventory_families':len(families),'inventory_pages':len(pages),'score_families':len(S['families']),'score_versions':len(scored),'personas':len(ids),'family_reports':len(reports)-1,'report_browser_checks':len(v['records']),'broken_links_or_errors':len(errors),'credential_signature_hits':hits,'errors':errors,'warnings':warnings,'limitations':['Credential-signature scan is limited and not proof of absence.','Browser verification checks the first Tab stop and loaded images; it is not an exhaustive accessibility or interaction audit.','Production reference is read-only and incomplete for detail, checkout, profile content, and dark theme; see production-summary.json.']}
(EV/'raw/lab-verification.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2));raise SystemExit(1 if errors else 0)
