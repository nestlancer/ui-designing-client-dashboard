#!/usr/bin/env python3
"""Render rank.html pages from review-evidence/scores.json (+ review-manifest.json).
Single source of truth: every displayed score/rank comes from scores.json."""
import json, pathlib, html

LAB = pathlib.Path(__file__).resolve().parents[2]
EV = LAB / "review-evidence"
S = json.loads((EV / "scores.json").read_text())
MAP = json.loads((EV / "raw" / "blind-mapping.json").read_text())
M = json.loads((EV / "review-manifest.json").read_text())
PROD = json.loads((EV / "production-summary.json").read_text()) if (EV / "production-summary.json").exists() else None
DIMS = [("task_clarity","Task clarity",25),("usability","Usability",20),("visual_craft","Visual craft",15),
        ("responsive","Responsive",15),("accessibility","Accessibility",15),("integrity","Integrity",10)]
esc = html.escape

CSS = """
:root{--bg:#f6f8fb;--card:#fff;--ink:#0f1c2e;--muted:#45556b;--brand:#3641f5;--brand50:#ecf3ff;
--line:#dbe3ec;--ok:#166534;--warn:#8a5a00;--bad:#b42318;--radius:14px}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);overflow-wrap:anywhere;
font:16px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}
main{max-width:1180px;margin:0 auto;padding:28px 20px 60px}
a{color:var(--brand)}a:focus-visible,button:focus-visible,input:focus-visible,summary:focus-visible{
outline:3px solid var(--brand);outline-offset:2px;border-radius:4px}
.banner{background:#fdf3e0;border:1px solid #e8c477;color:#5f3d00;border-radius:var(--radius);
padding:14px 18px;margin:0 0 20px}.banner strong{display:block;font-size:17px}
.pilot{background:#e6f4fd;border:1px solid #8fcbe8;color:#073d5c}
h1{font-size:clamp(28px,4vw,40px);letter-spacing:-.02em;margin:.2em 0 .3em}
h2{font-size:23px;margin:34px 0 10px;letter-spacing:-.01em}h3{font-size:18px;margin:20px 0 8px}
.sub{color:var(--muted);max-width:75ch}.card{background:var(--card);border:1px solid var(--line);
border-radius:var(--radius);padding:20px;margin:14px 0;box-shadow:0 1px 2px rgba(15,28,46,.06)}
.tablewrap{overflow-x:auto}table{border-collapse:collapse;width:100%;min-width:720px;font-size:15px}
th,td{border-bottom:1px solid var(--line);padding:9px 10px;text-align:left;vertical-align:top}
th{background:var(--brand50)}tr.winner td{background:#e5f6ec}
.bar{height:10px;background:#e7edf5;border-radius:5px;min-width:90px}.bar i{display:block;height:100%;
background:var(--brand);border-radius:5px}.total{font-weight:800;font-size:19px;white-space:nowrap}
.tag{display:inline-block;padding:2px 9px;border-radius:999px;font-size:12.5px;font-weight:700;border:1px solid}
.critical{color:var(--bad);border-color:#f0a8a0;background:#fdecec}.major{color:var(--warn);
border-color:#e8c477;background:#fdf3e0}.minor{color:var(--muted);border-color:var(--line);background:#f1f5f9}
.pass{color:var(--ok);font-weight:700}.prod{background:#eef3ff;border-color:#b7c6ea}.partial{color:var(--warn);font-weight:700}.fail{color:var(--bad);font-weight:700}
.shots{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px}
.shots figure{margin:0}.shots img{width:100%;height:auto;border:1px solid var(--line);border-radius:10px}
figcaption{font-size:13px;color:var(--muted);margin-top:5px}
details{border:1px solid var(--line);border-radius:10px;padding:10px 14px;margin:10px 0;background:#fbfcfe}
summary{cursor:pointer;font-weight:700}code{background:#f1f5f9;padding:1px 6px;border-radius:5px;font-size:.92em}
.searchrow{display:flex;gap:10px;flex-wrap:wrap;align-items:end;margin:14px 0}
.searchrow label{font-weight:700}.searchrow input{padding:9px 12px;border:1px solid var(--muted);
border-radius:9px;font-size:16px;min-width:260px;background:#fff}
.small{font-size:13.5px;color:var(--muted)}ul{padding-left:20px}footer{color:var(--muted);font-size:13.5px;margin-top:40px}
@media(max-width:640px){main{padding:18px 12px 44px}table{min-width:640px}}
"""

def shell(title, body):
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title><style>{CSS}</style></head><body><main>{body}</main></body></html>
"""

def dimcell(v): return f'{v} <span class="small">/4</span>'

# ---------------- family page(s) ----------------

def production_block(fam):
    p = fam.get("production_reference")
    if not p:
        return ""
    dims = ""
    if p.get("dimension_scores"):
        cells = "".join(f"<td>{p['dimension_scores'][k]} <span class=\"small\">/4</span></td>" for k, _, _ in DIMS)
        heads = "".join(f"<th scope=\"col\">{lbl}</th>" for _, lbl, _ in DIMS)
        dims = (f'<div class="tablewrap"><table><thead><tr><th scope="col">Comparison place</th><th scope="col">Page</th>'
                f'<th scope="col">Total /100</th>{heads}<th scope="col">Major+ issues</th></tr></thead><tbody><tr>'
                f'<td><strong>#{p["comparison_rank"]}</strong></td><td>Production · {esc(p["route"])}</td>'
                f'<td class="total">{p["total"]:.1f}</td>{cells}<td>{p["major_or_critical_issues"]}</td></tr></tbody></table></div>')
    if p.get("comparison_order"):
        rows = "".join(
            f'<li><strong>{esc(x["id"])}</strong> — {x["total"]:.1f} · comparison #{x["rank"]}'
            f'{" · inside a 2.0-point group" if x.get("tie") else ""}</li>'
            for x in p["comparison_order"])
        order = f"<ol>{rows}</ol>"
    else:
        order = "<p>No numeric rank. The equivalent production page was not opened, so it is not placed above or below the lab versions.</p>"
    issues = "".join(f"<li>{esc(x)}</li>" for x in (p.get("issues") or ["No product issue recorded beyond the shared limits."]))
    gaps = "".join(f"<li>{esc(x)}</li>" for x in p.get("not_observed", []))
    return f"""
<h2 id="production">Production page report and comparison rank</h2>
<div class="card prod">
<p><strong>{esc(p['headline'])}</strong></p>
<p>{esc(p['role'])} Route: <strong>{esc(p['route'])}</strong>. Outcome: <strong>{esc(p['outcome'].replace('_', ' '))}</strong>. Confidence: <strong>{esc(p['confidence'])}</strong>.</p>
{dims}
<p>{esc(p['evidence'])}</p>
<h3>Order if production is included</h3>
{order}
<p class="small">Lab-only ranks in the table above are unchanged. Inside a 2.0-point group, task clarity, fewer major issues, then responsive score decide the comparison place.</p>
<h3>Observed issues</h3><ul>{issues}</ul>
<h3>Not observed</h3><ul>{gaps}</ul>
<p class="small">{esc(p['shared_limits'])} {esc(p['screenshots'])}</p>
</div>
"""

for fam in S["families"]:
    fid, fdir = fam["family_id"], fam["family_dir"]
    vers = sorted(fam["versions"], key=lambda r: (r["rank"], r["version"]))
    mapping = MAP["families"][fid]["desktop-light-top"]
    maptext = " · ".join(f"{k}={v}" for k,v in mapping.items())
    def ranklabel(r): return str(r["rank"]) + ("=" if r.get("joint_rank") else "")
    def band(group):
        vals = [v["total"] for v in fam["versions"] if v["version"] in group]
        return ", ".join(group) + f" ({min(vals):.1f}–{max(vals):.1f})"
    rows = ""
    for r in vers:
        d = r["dimension_scores"]
        cap = ' <span class="tag critical">capped 49</span>' if r["cap"].get("applied") else ""
        cls = ' class="winner"' if r["rank"] == 1 else ""
        rows += (f'<tr{cls}><td><strong>#{ranklabel(r)}</strong></td>'
                 f'<td><a href="#{r["version"].lower()}"><strong>{r["version"]}</strong> · {esc(r["name"])}</a>{cap}</td>'
                 f'<td><span class="total">{r["total"]:.1f}</span><div class="bar" aria-hidden="true">'
                 f'<i style="width:{r["total"]:.0f}%"></i></div></td>'
                 + "".join(f"<td>{dimcell(d[k])}</td>" for k, _, _ in DIMS)
                 + f'<td>{r["major_or_critical_issues"]}</td></tr>')
    details = ""
    for r in sorted(fam["versions"], key=lambda x: x["version"]):
        sh = r["screenshots"]; rel = lambda p: "../../" + p
        ev = "".join(f'<p><strong>{esc(lbl)} ({r["dimension_scores"][k]}/4):</strong> {esc(r["evidence"][k])}</p>'
                     for k, lbl, _ in DIMS)
        capnote = ""
        if r["cap"].get("applied"):
            capnote = (f'<p><span class="tag critical">CRITICAL CAP APPLIED</span> Uncapped rubric total '
                       f'{r["uncapped_total"]:.1f} → capped at 49.0. {esc(r["cap"]["reason"])}</p>')
        elif r["cap"].get("considered"):
            capnote = f'<p><strong>Cap considered, not applied:</strong> {esc(r["cap"]["considered"])}</p>'
        tasks = "".join(
            f'<tr><td>{esc(k)}</td><td class="{"pass" if v.startswith("pass") else "partial" if v.startswith("partial") or "not applicable" in v else "fail" if v.startswith("fail") else ""}">{esc(v)}</td></tr>'
            for k, v in r["tasks"].items())
        issues = "".join(f'<li><span class="tag {esc(i["severity"])}">{esc(i["severity"])}</span> '
                         f'<code>{esc(i["id"])}</code> {esc(i["title"])} <span class="small">({esc(i["ref"])})</span></li>'
                         for i in r["issues"])
        details += f"""
<section class="card" id="{r['version'].lower()}" tabindex="-1">
<h3>#{ranklabel(r)} · {r['version']} · {esc(r['name'])} — {r['total']:.1f}</h3>
<p class="small">Source (unmodified): <a href="{r['version']}/index.html"><code>{esc(r['source_path'])}</code></a>
· Raw evidence: {", ".join(f'<code>{esc(x)}</code>' for x in r['raw_evidence'])}</p>
{capnote}{ev}
<details><summary>Interaction / task results ({r['version']})</summary>
<div class="tablewrap"><table><thead><tr><th scope="col">Task</th><th scope="col">Result</th></tr></thead>
<tbody>{tasks}</tbody></table></div></details>
<details><summary>Issues ({len(r['issues'])})</summary><ul>{issues}</ul></details>
<div class="shots">
<figure><a href="{rel(sh['desktop'])}"><img loading="lazy" src="{rel(sh['desktop'])}" alt="{r['version']} desktop 1440 by 1000 light, page top"></a><figcaption>Desktop 1440×1000 · light · top</figcaption></figure>
<figure><a href="{rel(sh['mobile'])}"><img loading="lazy" src="{rel(sh['mobile'])}" alt="{r['version']} mobile 390 by 844 light, page top"></a><figcaption>Mobile 390×844 · light · top</figcaption></figure>
<figure><a href="{rel(sh['tablet'])}"><img loading="lazy" src="{rel(sh['tablet'])}" alt="{r['version']} tablet 768 by 1024 light, page top"></a><figcaption>Tablet 768×1024 · light · top</figcaption></figure>
<figure><a href="{rel(sh['dark'])}"><img loading="lazy" src="{rel(sh['dark'])}" alt="{r['version']} desktop dark theme"></a><figcaption>Desktop · dark (theme applied)</figcaption></figure>
<figure><a href="{rel(sh['task_desktop'])}"><img loading="lazy" src="{rel(sh['task_desktop'])}" alt="{r['version']} desktop after core task attempt"></a><figcaption>Desktop · after core task attempt</figcaption></figure>
<figure><a href="{rel(sh['task_mobile'])}"><img loading="lazy" src="{rel(sh['task_mobile'])}" alt="{r['version']} mobile after core task attempt"></a><figcaption>Mobile · after core task attempt</figcaption></figure>
<figure><a href="{rel(sh['fullpage_desktop'])}"><img loading="lazy" src="{rel(sh['fullpage_desktop'])}" alt="{r['version']} full page desktop supplemental"></a><figcaption>Full page (supplemental)</figcaption></figure>
</div></section>"""
    pairs = "".join(f'<tr><td>{p["a"]} vs {p["b"]}</td><td><strong>{p["better_for_family_task"]}</strong></td>'
                    f'<td>{esc(p["reason"])}</td></tr>'
                    for p in fam["pairwise"])
    shared = "".join(f"<li>{esc(x)}</li>" for x in fam["shared_shell_findings"])
    clog = "".join(f"<li>{esc(x)}</li>" for x in fam["score_change_log"])
    body = f"""
<p><a href="../../rank.html">← Overall ranking</a> · <a href="../../index.html">Lab gallery</a></p>
<div class="banner" role="note"><strong>AI heuristic review — not user research</strong>
Scores are derived from a fixed rubric applied by one AI evaluator to rendered evidence. They are not a
measured user-preference percentage, and the 100 synthetic personas cast no votes.</div>
<h1>{fid} · {esc(fdir.split('-',1)[1].replace('-',' ').title())} — version ranking</h1>
<p class="sub"><strong>Family task:</strong> {esc(fam['family_task'])}</p>
<p class="sub"><strong>Baseline context:</strong> {esc(fam['baseline_context'])}</p>
<p><strong>Leading version(s): {esc(', '.join(fam.get('joint_winners',[fam['winner']]))) }</strong> · Confidence: <strong>{esc(fam['confidence'])}</strong> —
{esc(fam['confidence_basis'])}</p>
<p><strong>Tie groups:</strong> {"none (all gaps > 2.0)" if not fam['tie_groups'] else esc("; ".join(band(g) for g in fam['tie_groups']))}
· <strong>Production comparison:</strong> {esc(fam["production_reference"]["headline"])}</p>

<h2>Lab-only scores</h2>
<div class="tablewrap"><table>
<thead><tr><th scope="col">Rank</th><th scope="col">Version</th><th scope="col">Total /100</th>
{''.join(f'<th scope="col">{lbl} (w{w})</th>' for _, lbl, w in DIMS)}<th scope="col">Major+ issues</th></tr></thead>
<tbody>{rows}</tbody></table></div>
<p class="small">Formula: total = Σ(weight × score ÷ 4). Dimension scores are integers 0–4 against fixed
anchors (25 task clarity · 20 usability · 15 visual craft · 15 responsive · 15 accessibility · 10 integrity).
Totals within 2.0 form a practical group; ties are ordered by task clarity, fewer major/critical issues, then responsive score; exact ties after these checks share rank (=).</p>

{production_block(fam)}

<h2>Shared shell / family-wide findings</h2>
<div class="card"><ul>{shared}</ul></div>

<h2>Per-version evidence</h2>
{details}

<h2>Blind comparison boards</h2>
<div class="card"><p class="small">Seeded labels A–E; the screenshots contain in-page version identifiers, so true blinding was incomplete. Mapping (<code>review-evidence/raw/blind-mapping.json</code>): {esc(maptext)}.
{esc(S['blind_boards']['honesty_note'])}</p>
<div class="shots">
<figure><a href="../../review-evidence/boards/{fid}-blind-board-desktop-light-top.jpg"><img loading="lazy" src="../../review-evidence/boards/{fid}-blind-board-desktop-light-top.jpg" alt="Blind board, five desktop screenshots labelled A to E"></a><figcaption>Desktop blind board</figcaption></figure>
<figure><a href="../../review-evidence/boards/{fid}-blind-board-mobile-light-top.jpg"><img loading="lazy" src="../../review-evidence/boards/{fid}-blind-board-mobile-light-top.jpg" alt="Blind board, five mobile screenshots labelled A to E"></a><figcaption>Mobile blind board</figcaption></figure>

</div></div>

<h2>Pairwise consistency check (one evaluator, not votes)</h2>
<div class="tablewrap"><table><thead><tr><th scope="col">Pair</th><th scope="col">Better for family task</th>
<th scope="col">Reason</th></tr></thead><tbody>{pairs}</tbody></table></div>
<p class="small">{esc(fam.get('pairwise_note', S['pairwise_consistency_checks']['note']))}</p>

<h2>Coverage, limitations, change log</h2>
<div class="card">
<p><strong>Persona coverage (no votes):</strong> {esc(S['persona_coverage_note'])}</p>
<p><strong>Task script:</strong> {esc(fam['task_script'])}</p>
<ul>{clog}</ul>
<p class="small">Environment: {esc(M['environment']['browser'])} · Playwright {esc(M['environment']['playwright_version'])}
· axe-core {esc(M['environment']['axe_core_version'])} · {esc(M['environment']['pixel_reproducibility'])}
Full record: <code>review-evidence/review-manifest.json</code>; machine data: <code>review-evidence/scores.json</code>.</p>
</div>
<footer>Generated from scores.json by review-evidence/tooling/render_reports.py. No source template was edited.</footer>"""
    out = LAB / "families" / fdir / "rank.html"
    out.write_text(shell(f"{fid} ranking — Client Portal Lab review (in progress)", body))
    print("wrote", out)

# ---------------- overall page ----------------
inv = M["inventory"]["families"]
scored = {f["family_id"]: f for f in S["families"]}
frows = ""
for f in inv:
    fid = f["family_id"]
    if fid in scored:
        sf = scored[fid]; w = next(r for r in sf["versions"] if r["version"] == sf["winner"])
        pr = sf.get("production_reference") or {}
        if pr.get("comparison_rank"):
            prod_cell = f'<a href="families/{f["family_dir"]}/rank.html#production">#{pr["comparison_rank"]} · {pr["total"]:.1f}</a>'
        else:
            prod_cell = '<a href="families/%s/rank.html#production">Not ranked</a>' % f["family_dir"]
        frows += (f'<tr><td><a href="families/{f["family_dir"]}/rank.html">{fid} · {esc(f["family_dir"])}</a></td>'
                  f'<td class="pass">Scored</td><td><strong>{sf["winner"]} · {esc(w["name"])} — {w["total"]:.1f}</strong></td>'
                  f'<td>{prod_cell}</td><td>{esc(sf["confidence"])}</td></tr>')
    else:
        frows += (f'<tr><td>{fid} · {esc(f["family_dir"])}</td><td>Pending — scoring not yet completed</td>'
                  f'<td>—</td><td>—</td></tr>')
body = f"""
<div class="banner" role="note"><strong>AI heuristic review — not user research</strong>
One AI evaluator, fixed rubric, rendered evidence. Totals are not user-preference percentages; the 100
synthetic personas are a coverage matrix and cast no votes.</div>
<div class="banner pilot" role="note"><strong>{len(scored)} of 20 families scored; production comparison complete</strong>
Lab-only winners are unchanged. Every family page has a production report and comparison place.</div>
<h1>Client Portal Lab — UI ranking</h1>
<p class="sub">Question answered per family: for this family's intended client task, which version is clearest,
most usable, visually coherent, accessible and robust across the tested viewports — and what observed evidence
supports that order? <strong>Family winners are not comparable across families</strong> (different tasks).</p>

<h2>Coverage</h2>
<div class="card"><ul>
<li>Inventory (from disk): <strong>{M['inventory']['families_discovered']} families · {M['inventory']['pages_existing']} pages</strong>, missing: none.</li>
<li>Scored so far: <strong>{len(scored)} families / {len(scored)*5} pages</strong>. All 100 pages captured; task evidence is incomplete in some cases as documented.</li>
<li>Production (app.nestlancer.com): <strong>read-only reference reviewed</strong> for three authorized accounts. No production screenshots stored. <a href="review-evidence/production-summary.json">Production summary</a>.</li>
<li>Environment: {esc(M['environment']['browser'])} · Playwright {esc(M['environment']['playwright_version'])} ·
axe-core {esc(M['environment']['axe_core_version'])} · {esc(M['environment']['os'])}.
Marked <strong>not cross-machine pixel-reproducible</strong> (no Docker; pinned browser used consistently).</li>
</ul></div>

<h2>Families</h2>
<div class="searchrow"><label for="q">Filter families</label>
<input id="q" type="search" placeholder="e.g. billing, F14, scored" aria-describedby="qh">
<span id="qh" class="small">Filters the table below as you type.</span></div>
<div class="tablewrap"><table id="fam">
<thead><tr><th scope="col">Family</th><th scope="col">Status</th><th scope="col">Lab-only winner</th>
<th scope="col">Production comparison</th><th scope="col">Confidence</th></tr></thead><tbody>{frows}</tbody></table></div>

<h2 id="production">Production comparison</h2>
<div class="card prod">
<p>Each family page now has a <strong>Production page report and comparison rank</strong>. The score uses the same rubric but is stored separately from the lab versions. It does not replace the lab-only winner. No production screenshots are stored.</p>
<p><strong>Side effect:</strong> {esc((PROD or {}).get('side_effect','Opening notifications for two accounts was followed by a mark-all-read request.'))}</p>
<p class="small">Request and quote details were opened. Project detail, a readable message thread, and a payment receipt page were not reached; those scores reflect that limit. Pay now was opened only as a due-items tab. No payment, message, or form was submitted.</p>
</div>

<h2>Method in brief</h2>
<div class="card">
<p>Fixed rubric (weights 25/20/15/15/15/10, integer anchors 0–4, total = Σ weight×score÷4; critical-blocker
cap at 49; ≤2.0 = practical tie). Every version is rendered in Chromium at 1440×1000, 768×1024, 390×844,
dark, plus family task states; run through the same task script (first-screen, keyboard, core interaction,
theme, demo honesty, mobile nav, axe-core); compared on seeded boards (which leak version IDs inside screenshots); then scored against the rubric
before any prior winner claims are read. Full protocol record:
<code>review-evidence/review-manifest.json</code> · data: <code>review-evidence/scores.json</code> ·
personas: <code>review-evidence/personas.json</code> · <a href="review-evidence/persona-coverage.json">persona coverage matrix</a> · method sources: <code>review-evidence/RESEARCH.md</code>.</p>
<p><strong>Evidence limitations:</strong> Screenshots expose variant labels, so blinding was incomplete. Some pairwise entries are rubric-derived summaries, not independent judgments. Keyboard evidence samples the first 12 Tab stops; Shift+Tab, Enter, Space, Escape and all open/validation states were not exhaustively verified. Mobile-navigation selectors failed on some shells. No assistive-technology or WCAG conformance audit was performed.</p>
<p><strong>Limitations:</strong> {(" ".join(esc(x) for x in M['exclusions_and_limits']))}
Fonts: {esc(M['environment']['fonts'])}</p></div>
<footer>Generated from scores.json by review-evidence/tooling/render_reports.py. No lab source template was modified. Production was not intentionally edited; see the notifications side effect above.</footer>
<script>
document.getElementById('q').addEventListener('input',function(e){{
 var q=e.target.value.trim().toLowerCase();
 document.querySelectorAll('#fam tbody tr').forEach(function(tr){{
  tr.style.display=(!q||tr.textContent.toLowerCase().indexOf(q)>-1)?'':'none';}});}});
</script>"""
(LAB / "rank.html").write_text(shell("Client Portal Lab — UI ranking (in progress)", body))
print("wrote", LAB / "rank.html")
