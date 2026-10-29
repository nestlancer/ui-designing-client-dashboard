import json, pathlib
rawp=pathlib.Path("client-portal-lab/review-evidence/raw")
scan=json.loads((rawp/"js-syntax-scan.json").read_text())
syntaxfail={r['path'] for r in scan['results'] if r['fails']}
rows=[]
for p in sorted(rawp.glob("F*-V*-raw.json")):
    r=json.load(open(p)); c=r['checks']
    axd=c.get('axeDesktopDefault',{}); axk=c.get('axeDarkDefault',{})
    kb=c.get('keyboardDesktop') or []
    facts=c.get('factsDesktop') or c.get('firstScreenDesktop') or {}
    def ax(a): return ",".join(f"{v['id']}x{v['nodes']}" for v in a.get('violations',[])) or "-"
    taskD=c.get('coreTaskDesktop',{}); taskM=c.get('coreTaskMobile',{})
    rows.append({
      'id': f"{r['family']}/{r['version']}", 'h1': (facts.get('h1') or 'NONE')[:28],
      'err': f"{len(r['consoleErrors'])}/{len(r['pageErrors'])}/{len(r['failedRequests'])}",
      'syntax': 'SYNTAX-FAIL' if r['sourcePath'].replace('client-portal-lab/','') in syntaxfail else '',
      'hsD': (c.get('overflow_desktop') or {}).get('actualHScrollPx', (c.get('overflow_desktop') or {}).get('horizontalOverflow')),
      'hsM': (c.get('overflow_mobile') or {}).get('actualHScrollPx', (c.get('overflow_mobile') or {}).get('horizontalOverflow')),
      'hsT': (c.get('overflow_tablet') or {}).get('actualHScrollPx', (c.get('overflow_tablet') or {}).get('horizontalOverflow')),
      'taskD': taskD.get('result'), 'taskM': taskM.get('result'),
      'theme': (c.get('themeTask') or {}).get('result'), 'dark': c.get('darkClassApplied'),
      'axeD': ax(axd), 'axeDark': ax(axk),
      'kb': f"{sum(1 for s in kb if s.get('focusStyled'))}/{len(kb)}" if kb else '-',
      'nav': (c.get('mobileNav') or {}).get('opened'),
      'tap24': (c.get('tapTargetsMobile') or {}).get('under24px'),
      'pageH': c.get('fullPageHeight'),
      'supp': "; ".join(s.get('result','') for s in c.get('supplementaryTasks',[])) or '',
      'demo': (c.get('demoToast') or {}).get('visible') if isinstance(c.get('demoToast'),dict) else c.get('demoToast'),
    })
hdr=f"{'id':10} {'h1':29} {'errCErr':8} {'hsD/M/T':14} {'taskD/M':16} {'thm':11} {'dark':5} {'kb':6} {'nav':6} {'t24':4} {'pageH':6} axeD | axeDark | notes"
print(hdr)
out=[hdr]
for x in rows:
    line=f"{x['id']:10} {str(x['h1']):29} {x['err']:8} {str(x['hsD'])+'/'+str(x['hsM'])+'/'+str(x['hsT']):14} {str(x['taskD'])+'/'+str(x['taskM']):16} {str(x['theme']):11} {str(x['dark']):5} {x['kb']:6} {str(x['nav']):6} {str(x['tap24']):4} {str(x['pageH']):6} {x['axeD']} | {x['axeDark']} | {x['syntax']} supp:{x['supp']} demo:{x['demo']}"
    print(line); out.append(line)
(rawp/"digest-all.txt").write_text("\n".join(out)+"\n")
print("\nsaved raw/digest-all.txt")
