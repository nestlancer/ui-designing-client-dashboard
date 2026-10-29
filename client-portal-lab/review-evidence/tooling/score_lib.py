"""Shared scoring helpers: build version/family records into scores.json from raw evidence
+ evaluator-supplied dimension scores/evidence. Totals always recompute from fixed weights."""
import json, pathlib

EV = pathlib.Path(__file__).resolve().parents[1]
LAB = EV.parent
W = {"task_clarity":25,"usability":20,"visual_craft":15,"responsive":15,"accessibility":15,"integrity":10}

def total(d): return round(sum(W[k]*v/4 for k,v in d.items()),1)

def load():
    return json.loads((EV/"scores.json").read_text())

def save(S):
    S["families"].sort(key=lambda f: f["family_id"])
    scored=[f["family_id"] for f in S["families"]]
    S["run"]["families_scored"]=scored
    S["run"]["families_pending"]=[f"F{i:02d}" for i in range(3,23) if f"F{i:02d}" not in scored]
    (EV/"scores.json").write_text(json.dumps(S,indent=2,ensure_ascii=False)+"\n")

def raw_of(fid,v): return json.loads((EV/"raw"/f"{fid}-{v}-raw.json").read_text())

def _ax(a):
    vs=(a or {}).get("violations",[])
    return ", ".join(f"{x['id']} x{x['nodes']}" for x in vs) if vs else "no violations"

def auto_tasks(fid,v, extra=None):
    r=raw_of(fid,v); c=r["checks"]
    t={}
    facts=c.get("factsDesktop") or {}
    t["T1_first_screen"]=f"H1={facts.get('h1')!r}; see desktop/mobile top screenshots"
    kb=c.get("keyboardDesktop") or []
    if kb: t["T2_keyboard"]=f"{sum(1 for s in kb if s.get('focusStyled'))}/{len(kb)} stops focus-styled, {sum(1 for s in kb if s.get('inViewport'))}/{len(kb)} in viewport"
    for lab,key in [("T3_core_desktop","coreTaskDesktop"),("T3_core_mobile","coreTaskMobile")]:
        x=c.get(key) or {}
        t[lab]=f"{x.get('result','-')}" + (f" via {x['via']}" if x.get('via') else "") + (f" ({str(x.get('detail'))[:90]})" if x.get('detail') else "")
    for s in c.get("supplementaryTasks",[]):
        t[f"T3_supp_{s.get('viewport','')}"]=f"{s.get('result')}: {s.get('task','')}"[:170]
    th=c.get("themeTask") or {}
    t["T4_theme"]=f"toggle: {th.get('result','-')} ({th.get('detail','')}); dark capture applied={c.get('darkClassApplied')}"
    dt=c.get("demoToast")
    if isinstance(dt,dict): t["T5_demo_honesty"]=("honest feedback shown: "+dt.get("text","")[:110]) if dt.get("visible") else "data-demo click produced no visible toast in probe"
    elif dt is None: t["T5_demo_honesty"]="no [data-demo] element probed (none present or pilot family - see probe2)"
    mn=c.get("mobileNav") or {}
    t["T6_mobile"]=f"h-scroll mobile={(c.get('overflow_mobile') or {}).get('actualHScrollPx', (c.get('overflow_mobile') or {}).get('horizontalOverflow'))}; nav probe opened={mn.get('opened')} btnW={mn.get('btnWidth')}; tap<24px={(c.get('tapTargetsMobile') or {}).get('under24px')}"
    t["T7_axe"]=f"desktop: {_ax(c.get('axeDesktopDefault'))}; dark: {_ax(c.get('axeDarkDefault'))}"
    if r["pageErrors"]: t["JS_errors"]="; ".join(sorted(set(r["pageErrors"])))[:200]
    if r["consoleErrors"]: t["console_errors"]="; ".join(sorted(set(r["consoleErrors"])))[:200]
    if extra: t.update(extra)
    return t

def auto_issues(fid,v, manual=None):
    r=raw_of(fid,v); c=r["checks"]; out=[]; n=[0]
    def add(sev,title,ref):
        n[0]+=1; out.append({"id":f"{fid}-{v}-I{n[0]}","severity":sev,"title":title,"ref":ref})
    if r["pageErrors"]:
        add("critical","JS page error on load: "+sorted(set(r["pageErrors"]))[0][:130], f"raw/{fid}-{v}-raw.json pageErrors")
    hs=(c.get("overflow_mobile") or {})
    px=hs.get("actualHScrollPx")
    if px is None and hs.get("horizontalOverflow"): px=">0"
    if px not in (0,None,False):
        add("major",f"Horizontal page scroll at 390px ({px}px); rightmost: {str(hs.get('maxRight'))[:110]}",
            f"raw overflow_mobile; {fid}-{v}-mobile-light-top.png")
    facts=c.get("factsDesktop") or {}
    if facts and not facts.get("h1"):
        add("major","No <h1> on page","probe factsDesktop/headings")
    for state,key in [("desktop","axeDesktopDefault"),("dark","axeDarkDefault")]:
        for x in (c.get(key) or {}).get("violations",[]):
            tgt=", ".join(x.get("targets",[])[:2])
            summ=f" {x['summary']}" if x.get("summary") else ""
            add("minor" if x["id"]=="color-contrast" else "major",
                f"axe {state}: {x['id']} x{x['nodes']} ({tgt}){summ[:120]}", f"axe-core 4.10.2 {state}")
    tt=(c.get("tapTargetsMobile") or {})
    if (tt.get("under24px") or 0) >= 5:
        add("minor",f"{tt['under24px']} mobile tap targets under 24px, e.g. {tt.get('examples',[])[:3]}","raw tapTargetsMobile")
    for m in (manual or []): add(m[0],m[1],m[2] if len(m)>2 else "screenshot inspection")
    return out

def version(fid, fdir, v, name, dims, evidence, cap=None, manual_issues=None, extra_tasks=None):
    b=f"review-evidence/screenshots/{fid}/{fid}-{v}"
    # F03 pilot used capture.mjs naming (fullpage .png + extra shots); keep generic names that exist
    shots={"desktop":f"{b}-desktop-light-top.png","mobile":f"{b}-mobile-light-top.png",
           "tablet":f"{b}-tablet-light-top.png","dark":f"{b}-desktop-dark-top.png",
           "task_desktop":f"{b}-desktop-light-task.png","task_mobile":f"{b}-mobile-light-task.png"}
    fp_png, fp_jpg = f"{b}-desktop-light-fullpage.png", f"{b}-desktop-light-fullpage.jpg"
    shots["fullpage_desktop"]= fp_jpg if (LAB/fp_jpg).exists() else fp_png
    unc=total(dims)
    issues=auto_issues(fid,v,manual_issues)
    return {"version":v,"name":name,"source_path":f"client-portal-lab/families/{fdir}/{v}/index.html",
      "dimension_scores":dims,"evidence":evidence,
      "cap":cap or {"applied":False},"uncapped_total":unc,
      "total": (49.0 if (cap or {}).get("applied") and unc>49 else unc),
      "tasks":auto_tasks(fid,v,extra_tasks),"issues":issues,
      "major_or_critical_issues":sum(1 for i in issues if i["severity"] in ("critical","major")),
      "screenshots":shots,"raw_evidence":[f"review-evidence/raw/{fid}-{v}-raw.json"]}

def family(S, fid, fdir, task, baseline, task_script, shared, versions, pairs,
           confidence="medium", conf_basis="", prod_route="", board_notes=None, change_log=None):
    order=sorted(versions,key=lambda r:(-r["total"],r["version"]))
    for i,r in enumerate(order,1): r["rank"]=i
    ties=[]
    for a,b in zip(order,order[1:]):
        if a["total"]-b["total"]<=2.0: ties.append([a["version"],b["version"]])
    fam={"family_id":fid,"family_dir":fdir,"family_task":task,"baseline_context":baseline,
      "task_script":task_script,"shared_shell_findings":shared,"confidence":confidence,
      "confidence_basis":conf_basis or ("Complete screenshot set + interaction/axe/keyboard runs in one pinned "
        "environment; single evaluator; designed empty/loading/error states generally have no public trigger "
        "and were not observed unless a version's task notes say so; system-font fallback instead of Outfit."),
      "production_equivalence":{"status":"pending production pass","expected_route":prod_route},
      "winner":order[0]["version"],"tie_groups":ties,"ranking":[r["version"] for r in order],
      "versions":sorted(versions,key=lambda r:r["version"]),
      "pairwise":[{"a":a,"b":b,"better_for_family_task":w,"reason":rs} for a,b,w,rs in pairs],
      "blind_board_notes":board_notes or {},
      "score_change_log":change_log or ["First-pass scores assigned from blind boards + raw evidence before reading prior winner claims (still unread)."]}
    S["families"]=[f for f in S["families"] if f["family_id"]!=fid]+[fam]
    return fam
