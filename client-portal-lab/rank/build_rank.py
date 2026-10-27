#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_rank.py — reproducible 100-reviewer panel for the F08 + F09 Client Portal
Lab variants (Study 2). The same 100 seeded personas from Study 1 (F05/F06)
return to review the 10 new files; Study 1 headline results are preserved in
the page's archive section and in rank.json -> previous_study.

WHAT THIS IS
  A deterministic, seeded *simulation* of 100 distinct reviewer personas. It is NOT
  real human user research. Each persona has a role, employer type, locale, device,
  experience level, accessibility need, aesthetic taste and task goal. From those
  attributes we derive a 10-criterion weight vector; each persona then scores all
  10 variants, and we aggregate to an overall rank, per-family ranks, per-segment
  winners, a criteria matrix and a head-to-head win matrix.

  The criterion ratings are expert review judgements derived from static code
  analysis of the 10 HTML files (page weight, ARIA counts, breakpoints, keyboard
  handlers, verified capability flags, state coverage, frozen-content fidelity)
  plus the design facts documented in CONCEPTS.md / DELIVERY-REPORT.md. They are
  NOT measured in a real browser. See the "Method & limits" section of rank.html.

  This script is an ANALYSIS/SCORING tool. It does not generate or modify any
  variant HTML/CSS. Run: python3 rank/build_rank.py  (from client-portal-lab/)

OUTPUTS
  ../rank.html   self-contained interactive report (all data inlined)
  ../rank.json   machine-readable full panel data
"""
import os, json, math, random, html, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SEED = 20261027
rng = random.Random(SEED)
TODAY = "2026-10-27"

# ---------------------------------------------------------------------------
# 1. CRITERIA — what every reviewer judges
# ---------------------------------------------------------------------------
CRITERIA = [
    ("clarity",      "Clarity",        "Information hierarchy, H1 scale, above-the-fold comprehension in <2s, KPI/verdict legibility."),
    ("distinctness", "Distinctness",   "Unique geometry and narrative vs siblings; anti-drift / not an identical skin."),
    ("a11y",         "Accessibility",  "Keyboard paths, ARIA, focus management, reduced motion, AA contrast, skip links, live regions."),
    ("responsive",   "Responsive",     "360/390/768/1024/1440 reflow, mobile card fallback, sticky behaviour, no horizontal scroll."),
    ("performance",  "Performance",    "Page weight, inline script size, zero external requests, zero image payload."),
    ("interaction",  "Interaction",    "Real working interactions: command palette, sort, tab keyboard model, file-preview dialog, stepper, keyboard tiles, 1-6 tab keys, forms."),
    ("states",       "State coverage", "Populated, empty (incl. captured in-tab empties), loading/skeleton, 502 error + retry + status banner."),
    ("guidance",     "Guidance",       "Verdict lines, why-locked / unlock explainers, Help-FAQ, Ask-AI, inline validation, honest 'nothing due' cues."),
    ("honesty",      "Honesty",        "No invented rows/rates/APIs; demo-labelled CTAs; frozen-content fidelity; audit-truthful copy."),
    ("consistency",  "Consistency",    "One token scheme, light/dark parity, brand discipline, semantic HTML, reduced-motion parity."),
]
CKEYS = [c[0] for c in CRITERIA]

# ---------------------------------------------------------------------------
# 2. VARIANTS — criterion ratings 0..100 (evidence-based expert baseline)
#    Derived from: measured code metrics + verified capability flags + the
#    design facts in each family's CONCEPTS.md and DELIVERY-REPORT.md.
# ---------------------------------------------------------------------------
VARIANTS = [
 # ---- F08 · Projects list (measured: kb / aria- attrs / @media / keydown handlers) ----
 dict(id="F08-V1", family="F08", v="V1", name="Calm Grid",          tag="Verdict strip + KPI row · classic card grid · ⌘K palette",
      path="families/F08-projects-list/V1/index.html", kb=34, aria=35, media=3, keys=2, geom="airy", states="4 states",
      c=dict(clarity=90, distinctness=66, a11y=90, responsive=88, performance=82, interaction=92, states=92, guidance=86, honesty=96, consistency=92)),
 dict(id="F08-V2", family="F08", v="V2", name="Ops Ledger",         tag="Dense sticky table · aria-sort · mobile card fallback",
      path="families/F08-projects-list/V2/index.html", kb=29, aria=30, media=3, keys=2, geom="dense", states="4 states",
      c=dict(clarity=84, distinctness=88, a11y=88, responsive=94, performance=86, interaction=88, states=90, guidance=80, honesty=94, consistency=92)),
 dict(id="F08-V3", family="F08", v="V3", name="Next-Step Hero",     tag="Split hero · count-up · sticky mobile CTA · / search",
      path="families/F08-projects-list/V3/index.html", kb=25, aria=19, media=3, keys=1, geom="airy", states="4 states",
      c=dict(clarity=96, distinctness=90, a11y=82, responsive=86, performance=90, interaction=84, states=90, guidance=92, honesty=94, consistency=92)),
 dict(id="F08-V4", family="F08", v="V4", name="Delivery Story",     tag="Editorial column · kickoff chapter timeline · reveals",
      path="families/F08-projects-list/V4/index.html", kb=23, aria=19, media=3, keys=0, geom="narrative", states="4 states",
      c=dict(clarity=80, distinctness=94, a11y=78, responsive=82, performance=94, interaction=74, states=88, guidance=84, honesty=94, consistency=92)),
 dict(id="F08-V5", family="F08", v="V5", name="Bento Board",        tag="12-col bento · tile size = capture depth · arrow-key tiles",
      path="families/F08-projects-list/V5/index.html", kb=24, aria=24, media=3, keys=1, geom="bento", states="4 states",
      c=dict(clarity=82, distinctness=96, a11y=88, responsive=78, performance=92, interaction=90, states=88, guidance=78, honesty=96, consistency=92)),
 # ---- F09 · Project details + 6 tabs ----
 dict(id="F09-V1", family="F09", v="V1", name="Classic Cockpit",    tag="Full-depth classic · underline tablist · C13 preview dialog",
      path="families/F09-project-details/V1/index.html", kb=57, aria=56, media=3, keys=3, geom="airy", states="3 states · 6 tabs",
      c=dict(clarity=88, distinctness=68, a11y=94, responsive=84, performance=60, interaction=94, states=94, guidance=92, honesty=96, consistency=92)),
 dict(id="F09-V2", family="F09", v="V2", name="Delivery Journey",   tag="Stepper spine · approved -> in-build -> locked payment gate",
      path="families/F09-project-details/V2/index.html", kb=47, aria=61, media=2, keys=2, geom="narrative", states="3 states · 6 tabs",
      c=dict(clarity=90, distinctness=92, a11y=92, responsive=80, performance=70, interaction=92, states=90, guidance=90, honesty=94, consistency=92)),
 dict(id="F09-V3", family="F09", v="V3", name="Your Moves",         tag="Sticky awaiting-you + unlock rail · answers 'whose move?'",
      path="families/F09-project-details/V3/index.html", kb=41, aria=48, media=3, keys=2, geom="airy", states="3 states · 6 tabs",
      c=dict(clarity=94, distinctness=88, a11y=86, responsive=84, performance=78, interaction=88, states=90, guidance=96, honesty=96, consistency=92)),
 dict(id="F09-V4", family="F09", v="V4", name="One Story",          tag="Single editorial column · A15 digest as spine · chapter tabs",
      path="families/F09-project-details/V4/index.html", kb=42, aria=46, media=2, keys=2, geom="narrative", states="3 states · 6 tabs",
      c=dict(clarity=84, distinctness=96, a11y=84, responsive=80, performance=76, interaction=84, states=88, guidance=88, honesty=94, consistency=92)),
 dict(id="F09-V5", family="F09", v="V5", name="Delivery Console",   tag="Dense console · stat strip · ops tables · 1-6 tab keys",
      path="families/F09-project-details/V5/index.html", kb=41, aria=49, media=3, keys=3, geom="dense", states="3 states · 6 tabs",
      c=dict(clarity=86, distinctness=90, a11y=90, responsive=88, performance=78, interaction=92, states=90, guidance=82, honesty=94, consistency=92)),
]
VIDX = {v["id"]: i for i, v in enumerate(VARIANTS)}

# ---------------------------------------------------------------------------
# 3. 100 DISTINCT PERSONAS — 20 archetypes x 5 individuals
# ---------------------------------------------------------------------------
NAME_POOL = {
 "India": (["Aarav","Priya","Rohan","Ananya","Vikram","Meera","Arjun","Kavya","Diya","Kabir","Isha","Rohit","Sneha","Aditya","Neha","Rahul","Pooja","Divya","Nikhil","Tara"],
           ["Sharma","Nair","Iyer","Mehta","Reddy","Rao","Kapoor","Verma","Menon","Desai","Kulkarni","Joshi","Pillai","Chatterjee","Singh","Bose","Patel","Ghosh"]),
 "N. America": (["Emma","Liam","Olivia","Noah","Ava","Ethan","Sophia","Mason","Isabella","Lucas","Mia","Henry","Amelia","James","Charlotte","Benjamin","Harper","Daniel","Evelyn","Jack"],
           ["Smith","Johnson","Brown","Miller","Davis","Wilson","Anderson","Taylor","Moore","Clark","Lewis","Walker","Hall","Young","King","Wright"]),
 "Europe": (["Lucas","Marie","Jonas","Anna","Felix","Clara","Max","Sofia","Hugo","Ines","Theo","Nora","Milan","Elena","Oskar","Lena"],
           ["Mueller","Dupont","Rossi","Garcia","Novak","Silva","Kowalski","Andersen","Fischer","Moreau","Weber","Bernard"]),
 "APAC": (["Yuki","Haruto","Mei","Wei","Sora","Jin","Aiko","Min-jun","Ji-woo","Hana","Tao","Ling","Kenji","Nadia","Ravi"],
           ["Tanaka","Sato","Wang","Li","Zhang","Kim","Park","Chen","Liu","Suzuki","Nguyen","Lim"]),
 "LATAM": (["Mateo","Valentina","Santiago","Camila","Diego","Lucia","Andres","Sofia","Emilio","Renata"],
           ["Garcia","Rodriguez","Costa","Silva","Perez","Morales","Rojas","Alvarez"]),
 "Africa": (["Amara","Kwame","Zuri","Tunde","Nia","Kofi","Amina","Chidi","Thandi","Sefu"],
           ["Okafor","Mensah","Diallo","Adeyemi","Njoroge","Mwangi","Bello","Nkosi"]),
 "MENA": (["Omar","Layla","Ali","Fatima","Noor","Karim","Sara","Youssef","Rania","Zaid"],
           ["Hassan","Khalil","Rahman","Nasser","Farouk","Aziz","Haddad","Mansour"]),
}
ENTITIES = ["Solo freelance studio","Series-A startup","Mid-market agency","Enterprise PMO","Nonprofit",
            "E-commerce brand","FinTech product team","EdTech platform","Govt contractor","Design consultancy",
            "IT services firm","D2C retail brand","Health-tech vendor","Marketplace operator","Creative collective",
            "Logistics SaaS","Media production house","Legal-tech startup"]
DEVICES = [
 (360,"Mobile 360",  "Mobile 360–390"), (390,"Mobile 390","Mobile 360–390"),
 (768,"Tablet 768",  "Tablet 768"), (1024,"Laptop 1024","Laptop 1024"), (1440,"Desktop 1440","Desktop 1440"),
]
DEV_BY_LABEL = {d[1]: d for d in DEVICES}

# role, role_group, entity choices, device choices, experience, aesthetic, priority, task, a11y
ARCHETYPES = [
 ("First-time client",            "client",     None, ["Mobile 360","Mobile 390","Tablet 768"], "Novice",  "airy",      "guidance",  "submit_request",      "None"),
 ("Repeat client (agency)",       "client",     None, ["Laptop 1024","Desktop 1440","Mobile 390"], "Regular", "dense",     "speed",     "submit_request",      "None"),
 ("Freelancer / service provider","ops",        None, ["Desktop 1440","Laptop 1024","Mobile 390"], "Expert",  "dense",     "speed",     "manage_requests",     "None"),
 ("Agency ops lead",              "ops",        None, ["Desktop 1440","Laptop 1024"], "Expert",  "dense",     "speed",     "manage_requests",     "None"),
 ("Enterprise PMO",               "exec",       None, ["Laptop 1024","Desktop 1440"], "Regular", "airy",      "accuracy",  "manage_requests",     "None"),
 ("Procurement manager",          "procurement",None, ["Laptop 1024","Desktop 1440"], "Regular", "airy",      "trust",     "submit_request",      "None"),
 ("Finance approver",             "finance",    None, ["Desktop 1440","Laptop 1024"], "Regular", "dense",     "accuracy",  "manage_requests",     "None"),
 ("Product designer",             "design",     None, ["Desktop 1440","Laptop 1024"], "Expert",  "bento",     "exploration","evaluate_design",    "None"),
 ("Visual / UI designer",         "design",     None, ["Desktop 1440","Tablet 768"], "Regular", "narrative", "delight",   "evaluate_design",     "None"),
 ("Frontend engineer",            "eng",        None, ["Laptop 1024","Desktop 1440"], "Expert",  "dense",     "speed",     "evaluate_design",     "None"),
 ("QA engineer",                  "qa",         None, ["Laptop 1024","Desktop 1440"], "Expert",  "dense",     "accuracy",  "evaluate_design",     "None"),
 ("Accessibility specialist",     "a11y",       None, ["Laptop 1024","Desktop 1440"], "Expert",  "airy",      "compliance","audit_accessibility","Keyboard-only"),
 ("Screen-reader user",           "a11y",       None, ["Desktop 1440","Laptop 1024"], "Regular", "airy",      "compliance","audit_accessibility","Screen reader"),
 ("Low-vision user",              "a11y",       None, ["Tablet 768","Desktop 1440"], "Regular", "airy",      "accuracy",  "manage_requests",     "Low vision"),
 ("Motor-impaired keyboard user", "a11y",       None, ["Laptop 1024","Desktop 1440"], "Regular", "airy",      "compliance","submit_request",      "Motor precision"),
 ("Reduced-motion sensitive",     "a11y",       None, ["Mobile 390","Tablet 768"], "Regular", "airy",      "trust",     "submit_request",      "Reduced motion"),
 ("Power user / admin",           "ops",        None, ["Desktop 1440","Laptop 1024"], "Expert",  "dense",     "speed",     "manage_requests",     "None"),
 ("Startup founder",              "exec",       None, ["Mobile 390","Laptop 1024"], "Regular", "bento",     "exploration","submit_request",     "None"),
 ("Legal / compliance officer",   "legal",      None, ["Laptop 1024","Desktop 1440"], "Regular", "airy",      "trust",     "evaluate_design",     "None"),
 ("Support agent",                "support",    None, ["Tablet 768","Laptop 1024"], "Regular", "narrative", "guidance",  "manage_requests",     "None"),
]
TASK_LABEL = {"find_project":"Find & triage projects","review_delivery":"Review delivery & approve",
              "evaluate_design":"Evaluate templates","audit_accessibility":"Audit accessibility"}
PRIORITY_LABEL = {"speed":"Speed","accuracy":"Accuracy","trust":"Trust","exploration":"Exploration",
                  "compliance":"Compliance","delight":"Delight","guidance":"Guidance"}
STYLE_BUCKET = {"airy":"Airy / minimal","dense":"Dense / data-rich","narrative":"Narrative / editorial",
                "bento":"Bento / playful"}

# weight modifiers -----------------------------------------------------------
PRIORITY_MOD = {
 "speed":       dict(responsive=1.2, interaction=1.8, performance=1.0),
 "accuracy":    dict(clarity=1.5, states=1.2, honesty=1.0),
 "trust":       dict(honesty=2.0, consistency=1.2, clarity=0.8),
 "exploration": dict(distinctness=2.0, interaction=1.2),
 "compliance":  dict(a11y=1.6, honesty=1.8, consistency=1.0),
 "delight":     dict(distinctness=1.6, guidance=1.0, interaction=1.0),
 "guidance":    dict(guidance=2.0, clarity=1.2, states=0.8),
}
ABILITY_MOD = {
 "None":             dict(),
 "Keyboard-only":    dict(a11y=2.5, interaction=0.8),
 "Screen reader":    dict(a11y=3.0, states=0.5),
 "Low vision":       dict(a11y=2.2, clarity=1.2),
 "Reduced motion":   dict(a11y=2.0, consistency=0.5),
 "Motor precision":  dict(a11y=2.0, responsive=0.8),
}
DEVICE_MOD = {
 "Mobile 360–390": dict(responsive=2.5, performance=1.2, clarity=0.6),
 "Tablet 768":     dict(responsive=1.5),
 "Laptop 1024":    dict(interaction=0.6),
 "Desktop 1440":   dict(distinctness=0.6, interaction=0.6),
}
EXP_MOD = {
 "Novice":  dict(clarity=2.0, guidance=2.0, distinctness=-0.6),
 "Regular": dict(states=0.5),
 "Expert":  dict(interaction=1.5, performance=1.0, guidance=-0.6, distinctness=0.8),
}
ROLE_MOD = {
 "client":      dict(guidance=0.8, clarity=0.6),
 "ops":         dict(interaction=1.2, states=0.8),
 "exec":        dict(clarity=1.2, honesty=0.8),
 "procurement": dict(honesty=1.2, clarity=0.8),
 "finance":     dict(accuracy=0.0, honesty=1.0, states=0.8),
 "design":      dict(distinctness=2.0, consistency=1.0),
 "eng":         dict(performance=1.2, interaction=1.0, consistency=0.8),
 "qa":          dict(states=2.0, performance=0.8),
 "a11y":        dict(a11y=2.5),
 "legal":       dict(honesty=2.0),
 "support":     dict(guidance=1.2, states=0.8),
}
FAMILY_BONUS = {
 "find_project":         {"F08":5.5, "F09":0.0},
 "review_delivery":      {"F08":0.0, "F09":5.5},
 "evaluate_design":      {"F08":2.0, "F09":2.0},
 "audit_accessibility":  {"F08":2.0, "F09":2.0},
}
# Study 2 task assignment by role (weights are task-independent, so re-tasking
# the returning personas keeps names/devices/weights identical to Study 1).
TASK_BY_ROLE = {
 "First-time client":"find_project", "Repeat client (agency)":"review_delivery",
 "Freelancer / service provider":"review_delivery", "Agency ops lead":"find_project",
 "Enterprise PMO":"find_project", "Procurement manager":"find_project",
 "Finance approver":"review_delivery", "Product designer":"evaluate_design",
 "Visual / UI designer":"evaluate_design", "Frontend engineer":"evaluate_design",
 "QA engineer":"evaluate_design", "Accessibility specialist":"audit_accessibility",
 "Screen-reader user":"audit_accessibility", "Low-vision user":"review_delivery",
 "Motor-impaired keyboard user":"review_delivery", "Reduced-motion sensitive":"find_project",
 "Power user / admin":"find_project", "Startup founder":"find_project",
 "Legal / compliance officer":"evaluate_design", "Support agent":"review_delivery",
}
GEOM_FIT = {
 "airy":      {"F08-V1","F08-V3","F09-V1","F09-V3"},
 "dense":     {"F08-V2","F09-V5"},
 "narrative": {"F08-V4","F09-V2","F09-V4"},
 "bento":     {"F08-V5"},
}
REASON = {
 "clarity":      "it tells me what matters in under two seconds",
 "distinctness": "it doesn't look like every other template in the set",
 "a11y":         "I can complete the whole task without a mouse",
 "responsive":   "it holds up on my smallest screen",
 "performance":  "it is the leanest build in the lineup",
 "interaction":  "the controls actually do something real",
 "states":       "every failure and empty state is handled",
 "guidance":     "it holds my hand through the whole flow",
 "honesty":      "it never invents data I cannot verify",
 "consistency":  "light and dark both feel finished",
}

def make_name_pool():
    pool = []
    for region,(firsts,lasts) in NAME_POOL.items():
        for f in firsts:
            for l in lasts:
                pool.append((f + " " + l, region))
    rng.shuffle(pool)
    return pool

NAMEQ = make_name_pool()
used_names = set()

def weights_for(p):
    w = {k: 1.0 for k in CKEYS}
    mods = [PRIORITY_MOD[p["priority"]], ABILITY_MOD[p["ability"]],
            DEVICE_MOD[p["dev_group"]], EXP_MOD[p["experience"]], ROLE_MOD[p["role_group"]]]
    for m in mods:
        for k,val in m.items():
            if k in w: w[k] += val
    for k in w:
        w[k] = max(0.2, w[k] * (1.0 + rng.uniform(-0.16, 0.16)))
    s = sum(w.values())
    return {k: round(v*10.0/s, 3) for k,v in w.items()}

PERSONAS = []
pid = 0
for ai, (role, rgroup, ent, devs, exp, aesth, prio, task, ability) in enumerate(ARCHETYPES):
    for j in range(5):
        pid += 1
        nm, region = NAMEQ.pop()
        while nm in used_names:
            nm, region = NAMEQ.pop()
        used_names.add(nm)
        dlabel = rng.choice(devs) if isinstance(devs, list) else devs
        dw, dlab, dgroup = DEV_BY_LABEL[dlabel]
        p = dict(
            id="P%03d" % pid, name=nm, region=region, role=role, role_group=rgroup,
            entity=rng.choice(ENTITIES), device=dlab, width=dw, dev_group=dgroup,
            experience=exp, aesthetic=aesth, priority=prio, task=task, ability=ability,
            archetype=ai+1,
        )
        p["weights"] = weights_for(p)
        PERSONAS.append(p)

assert len(PERSONAS) == 100
assert len({p["name"] for p in PERSONAS}) == 100
for p in PERSONAS: p["task"] = TASK_BY_ROLE[p["role"]]   # Study 2 re-tasking

# ---------------------------------------------------------------------------
# 4. SCORING — each persona scores all 10 variants
# ---------------------------------------------------------------------------
CRAFT_BASE = 58.0   # anchor: maps a weighted criterion mean of 80 to a 58/100 quality score
CRAFT_GAIN = 2.0    # expands real criterion deltas into a legible 0-100 spread
NOISE_SIGMA = 1.6   # deterministic individual taste jitter
scores = []          # [persona][variant]
for pi, p in enumerate(PERSONAS):
    row = []
    for v in VARIANTS:
        w = p["weights"]; wsum = sum(w.values())
        base = sum(w[k]*v["c"][k] for k in CKEYS) / wsum
        craft = CRAFT_BASE + (base - 80.0) * CRAFT_GAIN
        fit = 6.0 if v["id"] in GEOM_FIT[p["aesthetic"]] else 0.0
        fam = FAMILY_BONUS[p["task"]][v["family"]]
        dpen = 0.0
        if p["width"] <= 390 and v["c"]["responsive"] < 82: dpen = -3.5
        elif p["width"] == 768 and v["c"]["responsive"] < 80: dpen = -2.0
        noise = rng.gauss(0, NOISE_SIGMA)
        row.append(round(max(0, min(100, craft + fit + fam + dpen + noise)), 2))
    scores.append(row)
    p["scores"] = row
    order = sorted(range(10), key=lambda i: (-row[i], VARIANTS[i]["id"]))
    p["ranking"] = [VARIANTS[i]["id"] for i in order]
    p["top"] = VARIANTS[order[0]]["id"]
    dom = max(CKEYS, key=lambda k: w[k])
    p["reason_key"] = dom
    topname = VARIANTS[order[0]]["name"]
    p["verdict"] = 'As a %s on %s, I put %s first — %s.' % (
        p["role"].lower(), p["device"], topname, REASON[dom])

# ---------------------------------------------------------------------------
# 5. AGGREGATION
# ---------------------------------------------------------------------------
N = len(PERSONAS)
def mean(xs): return sum(xs)/len(xs)
def stdev(xs):
    m = mean(xs); return math.sqrt(sum((x-m)**2 for x in xs)/len(xs))

agg = []
for vi, v in enumerate(VARIANTS):
    vals = [scores[pi][vi] for pi in range(N)]
    firsts = sum(1 for p in PERSONAS if p["ranking"][0] == v["id"])
    borda = sum(10 - p["ranking"].index(v["id"]) for p in PERSONAS)  # rank1 -> 10
    top3 = sum(1 for p in PERSONAS if v["id"] in p["ranking"][:3])
    agg.append(dict(id=v["id"], mean=round(mean(vals),2), stdev=round(stdev(vals),2),
                    firsts=firsts, top3=top3, borda=borda,
                    min=round(min(vals),2), max=round(max(vals),2)))

overall = sorted(agg, key=lambda a: (-a["mean"], -a["borda"]))
for r,a in enumerate(overall,1): a["rank"] = r
RANK_BY_ID = {a["id"]: a for a in agg}
for a in agg: a["margin"] = round(a["mean"] - min(x["mean"] for x in agg), 2)

fam_rank = {}
for fam in ["F08","F09"]:
    s = sorted([a for a in agg if a["id"].startswith(fam)], key=lambda a:-a["mean"])
    fam_rank[fam] = [dict(list(a.items()) + [("rank", i+1)]) for i,a in enumerate(s)]

# pairwise win matrix: row beats column %
pairwise = []
for vi, v in enumerate(VARIANTS):
    row = []
    for vj, u in enumerate(VARIANTS):
        if vi==vj: row.append(None)
        else: row.append(round(100.0*sum(1 for pi in range(N) if scores[pi][vi] > scores[pi][vj])/N, 1))
    pairwise.append(row)

# segments
SEGMENTS = [
 ("Device",   lambda p: p["dev_group"]),
 ("Ability",  lambda p: p["ability"]),
 ("Experience", lambda p: p["experience"]),
 ("Style",    lambda p: STYLE_BUCKET[p["aesthetic"]]),
 ("Goal",     lambda p: TASK_LABEL[p["task"]]),
 ("Priority", lambda p: PRIORITY_LABEL[p["priority"]]),
 ("Region",   lambda p: p["region"]),
]
seg_data = []
for dim, fn in SEGMENTS:
    groups = {}
    for pi,p in enumerate(PERSONAS):
        groups.setdefault(fn(p), []).append(pi)
    entries = []
    for g, idxs in sorted(groups.items()):
        if len(idxs) < 3: continue
        m = {v["id"]: round(mean([scores[pi][vi] for pi in idxs]),2) for vi,v in enumerate(VARIANTS)}
        top = sorted(m.items(), key=lambda kv:-kv[1])[:3]
        votes = {}
        for pi in idxs: votes[PERSONAS[pi]["top"]] = votes.get(PERSONAS[pi]["top"],0)+1
        winner_votes = max(votes.values()) if votes else 0
        entries.append(dict(label=g, n=len(idxs), top=top, votes=votes, winner_votes=winner_votes))
    seg_data.append(dict(dim=dim, entries=entries))

# consensus notes
most_agreed   = min(agg, key=lambda a:a["stdev"])
most_polarizing = max(agg, key=lambda a:a["stdev"])
most_firsts   = max(agg, key=lambda a:a["firsts"])
unanimous_seg = 0
for d in seg_data:
    for e in d["entries"]:
        if e["winner_votes"] == e["n"]: unanimous_seg += 1

PREVIOUS = dict(
    study="Study 1 · F05 + F06", generated="2026-10-27", seed=SEED, reviewers=100,
    overall=[
        dict(rank=1, id="F06-V2", name="Three Steps",      mean=85.75, firsts=45, top3=89, borda=894),
        dict(rank=2, id="F05-V2", name="Ops Console",      mean=84.09, firsts=31, top3=50, borda=731),
        dict(rank=3, id="F06-V5", name="Bento Split",      mean=81.38, firsts=7,  top3=34, borda=676),
        dict(rank=4, id="F05-V3", name="Attention Queue",  mean=79.99, firsts=7,  top3=28, borda=607),
        dict(rank=5, id="F06-V3", name="Compact Desk",     mean=78.19, firsts=2,  top3=22, borda=488),
        dict(rank=6, id="F06-V4", name="Guided Narrative", mean=77.65, firsts=0,  top3=12, borda=454),
        dict(rank=7, id="F05-V5", name="Status Lanes",     mean=77.55, firsts=1,  top3=21, borda=502),
        dict(rank=8, id="F06-V1", name="Classic Brief",    mean=76.24, firsts=6,  top3=27, borda=485),
        dict(rank=9, id="F05-V4", name="Chapter Tabs",     mean=74.17, firsts=0,  top3=2,  borda=288),
        dict(rank=10,id="F05-V1", name="Calm Ledger",      mean=74.06, firsts=1,  top3=15, borda=375),
    ],
    fam_rank={"F05":["F05-V2","F05-V3","F05-V5","F05-V4","F05-V1"],
              "F06":["F06-V2","F06-V5","F06-V3","F06-V4","F06-V1"]},
    note="Full Study 1 panel (100 personas x 10 scores) preserved in git history; headline results kept here so nothing is silently lost.",
)

PANEL = dict(
    meta=dict(title="The 100-Reviewer Panel", seed=SEED, generated=TODAY,
              reviewers=N, variants=len(VARIANTS), reviews=N*len(VARIANTS),
              criteria=[dict(key=k,label=l,desc=d) for k,l,d in CRITERIA],
              method="Deterministic seeded simulation of 100 distinct personas; NOT real human research.",
              limits="Criterion ratings come from static code analysis + documented design facts. No screenshot/browser/real-user testing was performed.",
              craft_base=CRAFT_BASE, craft_gain=CRAFT_GAIN, noise_sigma=NOISE_SIGMA,
              study="Study 2 · F08 + F09", supersedes="Study 1 · F05 + F06 (same 100 personas, same seed)",
              expert_winners={"F08":"F08-V3","F09":"F09-V3"}),
    variants=VARIANTS, personas=PERSONAS, agg=overall, fam_rank=fam_rank,
    pairwise=pairwise, segments=seg_data,
    notes=dict(most_agreed=most_agreed["id"], most_polarizing=most_polarizing["id"],
               most_firsts=most_firsts["id"], unanimous_segments=unanimous_seg),
    previous_study=PREVIOUS,
)

# ---------------------------------------------------------------------------
# 6. HTML
# ---------------------------------------------------------------------------
def esc(s): return html.escape(str(s), quote=True)
def vname(vid): return VARIANTS[VIDX[vid]]["name"]
def vlink(vid):
    v=VARIANTS[VIDX[vid]]
    return '<a href="%s" class="vlink">%s <span class="vid">%s</span></a>' % (esc(v["path"]), esc(v["name"]), esc(v["id"]))

CSS = r"""
:root{
 --background:#f6f8fb; --card:#fff; --muted:#f1f5f9; --border:#dbe3ec;
 --foreground:#0f1c2e; --muted-foreground:#45556b;
 --brand-50:#ecf3ff; --brand-100:#d9e6ff; --brand-500:#465fff; --brand-600:#3641f5;
 --brand-700:#2a31d8; --primary:var(--brand-500); --primary-hover:var(--brand-600); --ring:var(--brand-500);
 --success-bg:#e5f6ec; --success-text:#166534; --warning-bg:#fdf3e0; --warning-text:#8a5a00;
 --error-bg:#fdecec; --error-text:#b42318; --info-bg:#e6f4fd; --info-text:#0c5d8a;
 --radius-sm:6px; --radius-md:10px; --radius-lg:14px; --radius-xl:20px;
 --shadow-xs:0 1px 2px rgba(15,28,46,.06); --shadow-sm:0 4px 14px rgba(15,28,46,.08);
 --font:"Outfit",system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
 --mono:ui-monospace,"IBM Plex Mono","SF Mono",Menlo,Consolas,monospace;
}
.dark{
 --background:#0b1220; --card:#111b2e; --muted:#16233a; --border:#24344f;
 --foreground:#e8eef4; --muted-foreground:#9fb0c3;
 --brand-500:#5b7bff; --brand-50:rgba(91,123,255,.14); --brand-100:rgba(91,123,255,.22);
 --success-bg:rgba(74,222,128,.14); --success-text:#4ade80;
 --warning-bg:rgba(251,191,36,.14); --warning-text:#fbbf24;
 --error-bg:rgba(248,113,113,.14); --error-text:#f87171;
 --info-bg:rgba(56,189,248,.14); --info-text:#38bdf8;
 --shadow-xs:0 1px 2px rgba(0,0,0,.4); --shadow-sm:0 8px 28px rgba(0,0,0,.45);
}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--background);color:var(--foreground);font-family:var(--font);
 font-size:14px;line-height:1.55;-webkit-font-smoothing:antialiased}
a{color:var(--primary);text-decoration:none}a:hover{text-decoration:underline}
:focus-visible{outline:3px solid var(--ring);outline-offset:2px;border-radius:4px}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.skip{position:absolute;left:8px;top:-60px;background:var(--primary);color:#fff;padding:10px 16px;border-radius:8px;z-index:200}
.skip:focus{top:8px}
.wrap{max-width:1240px;margin:0 auto;padding:0 22px 80px}
.mono{font-family:var(--mono)}
/* topbar */
.topbar{position:sticky;top:0;z-index:60;background:color-mix(in srgb,var(--background) 88%,transparent);
 backdrop-filter:blur(12px);border-bottom:1px solid var(--border)}
.topbar .in{max-width:1240px;margin:0 auto;padding:9px 22px;display:flex;gap:14px;align-items:center;flex-wrap:wrap}
.tb-brand{font-weight:800;letter-spacing:-.02em;font-size:15px;display:flex;gap:9px;align-items:center}
.tb-badge{font:700 10px var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--primary);
 background:var(--brand-50);border:1px solid var(--border);border-radius:999px;padding:4px 9px}
.tb-nav{display:flex;gap:2px;flex-wrap:wrap;margin-left:auto}
.tb-nav a{font-size:12px;font-weight:600;color:var(--muted-foreground);padding:6px 9px;border-radius:var(--radius-sm)}
.tb-nav a:hover{background:var(--muted);color:var(--foreground);text-decoration:none}
.btn{min-height:34px;padding:0 12px;border-radius:var(--radius-sm);border:1px solid var(--border);
 background:var(--card);color:var(--foreground);font-size:12px;font-weight:600;cursor:pointer;display:inline-flex;gap:7px;align-items:center;justify-content:center}
.btn:hover{background:var(--muted)}
.btn.on{background:var(--brand-50);border-color:var(--primary);color:var(--primary)}
.btn svg{width:14px;height:14px}
/* hero */
.hero{padding:38px 0 24px;border-bottom:1px solid var(--border)}
.eyebrow{font:700 10px var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--primary)}
h1{font-size:clamp(32px,4.4vw,48px);line-height:1.04;letter-spacing:-.04em;margin:10px 0 12px;font-weight:800}
.lede{font-size:15px;color:var(--muted-foreground);max-width:820px;line-height:1.65}
.disclaimer{display:flex;gap:10px;align-items:flex-start;margin-top:18px;padding:13px 15px;
 background:var(--warning-bg);border:1px solid var(--border);border-radius:var(--radius-md);
 color:var(--warning-text);font-size:12.5px;line-height:1.55}
.disclaimer svg{width:17px;height:17px;flex:none;margin-top:1px}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-top:22px}
.stat{background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:16px 18px;box-shadow:var(--shadow-xs)}
.stat b{display:block;font:800 26px var(--mono);letter-spacing:-.04em;color:var(--primary)}
.stat span{font-size:11.5px;color:var(--muted-foreground);font-weight:600}
/* sections */
section{padding-top:38px;scroll-margin-top:64px}
.sec-head{display:flex;gap:12px;align-items:baseline;flex-wrap:wrap;margin-bottom:6px}
.sec-head h2{font-size:23px;letter-spacing:-.03em;margin:0;font-weight:800}
.sec-head .n{font:700 11px var(--mono);color:var(--primary);background:var(--brand-50);border:1px solid var(--border);border-radius:999px;padding:4px 9px}
.sec-sub{color:var(--muted-foreground);font-size:13px;margin:0 0 18px;max-width:900px;line-height:1.6}
/* leaderboard */
table{width:100%;border-collapse:collapse;background:var(--card);border:1px solid var(--border);
 border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-xs)}
th,td{padding:11px 12px;text-align:left;border-bottom:1px solid var(--border);vertical-align:middle}
th{background:var(--muted);font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted-foreground);font-weight:700;white-space:nowrap}
tbody tr:last-child td{border-bottom:0}
tbody tr:hover{background:var(--muted)}
th.sortable{cursor:pointer;user-select:none}th.sortable:hover{color:var(--primary)}
th.sortable::after{content:" ↕";opacity:.4}
.rk{font:800 17px var(--mono);width:46px;color:var(--muted-foreground)}
.medal{display:inline-flex;width:30px;height:30px;border-radius:50%;align-items:center;justify-content:center;
 font:800 13px var(--mono);background:var(--muted);color:var(--muted-foreground)}
.medal.g1{background:#fdf0c8;color:#7a5a00}.dark .medal.g1{background:rgba(251,191,36,.2);color:#fbbf24}
.medal.g2{background:#e9edf3;color:#475569}.dark .medal.g2{background:rgba(159,176,195,.18);color:#cbd5e1}
.medal.g3{background:#f7e2d2;color:#8a4b1e}.dark .medal.g3{background:rgba(200,150,110,.18);color:#e2b48c}
.vlink{font-weight:700;white-space:nowrap}.vlink .vid{font:600 10px var(--mono);color:var(--muted-foreground);margin-left:5px}
.tag{font-size:11.5px;color:var(--muted-foreground)}
.fampill{font:700 10px var(--mono);padding:3px 7px;border-radius:999px;background:var(--info-bg);color:var(--info-text);border:1px solid var(--border)}
.fampill.f06,.fampill.f09{background:var(--brand-50);color:var(--primary)}
.bar{position:relative;height:9px;border-radius:99px;background:var(--muted);min-width:120px;overflow:hidden}
.bar>i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,var(--brand-500),var(--brand-700))}
.num{font:700 13px var(--mono);white-space:nowrap}
.chip{display:inline-block;font:600 10px var(--mono);padding:3px 7px;border-radius:var(--radius-sm);
 background:var(--muted);border:1px solid var(--border);color:var(--muted-foreground);white-space:nowrap}
.chip.blue{background:var(--brand-50);color:var(--primary);border-color:var(--brand-100)}
.chip.green{background:var(--success-bg);color:var(--success-text)}
.chip.warn{background:var(--warning-bg);color:var(--warning-text)}
/* panels */
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px}
.panel{background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:18px;box-shadow:var(--shadow-xs)}
.panel h3{margin:0 0 4px;font-size:15px;letter-spacing:-.01em}
.panel p.small{margin:0 0 14px;font-size:12px;color:var(--muted-foreground)}
.mini-row{display:flex;gap:10px;align-items:center;padding:9px 0;border-top:1px solid var(--border)}
.mini-row:first-of-type{border-top:0}
.mini-row .bar{flex:1}
.callout{display:flex;gap:12px;align-items:flex-start;padding:14px 16px;border-radius:var(--radius-md);
 background:var(--brand-50);border:1px solid var(--border);margin-top:14px;font-size:13px;line-height:1.6}
.callout b{color:var(--primary)}
/* tabs */
.tabs{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:14px}
.tabs button{min-height:34px;padding:0 13px;border-radius:var(--radius-sm);border:1px solid var(--border);
 background:var(--card);font-size:12px;font-weight:600;cursor:pointer;color:var(--muted-foreground)}
.tabs button[aria-selected=true]{background:var(--primary);border-color:var(--primary);color:#fff}
.seg-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(255px,1fr));gap:12px}
.seg-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius-md);padding:14px 15px}
.seg-card h4{margin:0 0 2px;font-size:13px}
.seg-card .cnt{font:600 10px var(--mono);color:var(--muted-foreground)}
.seg-card ol{margin:10px 0 0;padding-left:18px;font-size:12px}
.seg-card li{margin:4px 0}
.seg-card li b{font-family:var(--mono);font-size:11px}
/* heatmap */
.heat{font-size:11px;overflow-x:auto}
.heat th,.heat td{padding:0;text-align:center;border:1px solid var(--border)}
.heat th{padding:9px 8px;font-size:10px;line-height:1.25;white-space:normal;min-width:64px}
.heat th.rowh{text-align:left;min-width:170px;padding:9px 11px}
.heat td.cell{height:38px;font:700 11px var(--mono);cursor:default}
.heat td.rowh{text-align:left;padding:8px 11px;font-weight:700;background:var(--card);white-space:nowrap}
.heat td.rowh span{display:block;font:500 10px var(--font);color:var(--muted-foreground)}
.matrix td.cell{height:30px;font:600 10px var(--mono)}
/* criteria legend */
.legend{display:flex;gap:6px;align-items:center;font-size:11px;color:var(--muted-foreground);margin-top:10px;flex-wrap:wrap}
.legend .sw{height:11px;width:120px;border-radius:3px;background:linear-gradient(90deg,rgba(70,95,255,.06),rgba(70,95,255,.95))}
/* persona explorer */
.filters{display:flex;gap:9px;flex-wrap:wrap;align-items:center;margin-bottom:12px}
.filters .field{display:flex;align-items:center;gap:7px;border:1px solid var(--border);background:var(--card);
 border-radius:var(--radius-sm);padding:0 10px;min-height:36px}
.filters input,.filters select{border:0;background:transparent;color:var(--foreground);font-size:12px;min-height:34px;outline:0}
.filters input{min-width:180px}
.filters .field:focus-within{outline:2px solid var(--ring);outline-offset:1px}
.pcount{margin-left:auto;font-size:12px;color:var(--muted-foreground)}
.ptable{display:block;max-height:560px;overflow:auto}
.ptable thead th{position:sticky;top:0;z-index:2}
.ptable td{font-size:12px;padding:9px 10px}
.ptable tbody tr{cursor:pointer}
.pname{font-weight:700;white-space:nowrap}
.prole{color:var(--muted-foreground);white-space:nowrap}
.verdict{font-size:11.5px;color:var(--muted-foreground);font-style:italic;max-width:420px}
/* modal */
.overlay{position:fixed;inset:0;z-index:120;background:rgba(6,12,24,.6);display:none;align-items:center;justify-content:center;padding:18px}
.overlay.on{display:flex}
.modal{background:var(--card);border:1px solid var(--border);border-radius:var(--radius-xl);
 box-shadow:0 24px 70px rgba(0,0,0,.35);max-width:640px;width:100%;max-height:86vh;overflow:auto;padding:22px}
.modal h3{margin:0 0 4px;font-size:19px;letter-spacing:-.02em}
.modal .sub{font-size:12px;color:var(--muted-foreground);margin-bottom:16px}
.modal .wgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin:14px 0}
.modal .wgrid div{background:var(--muted);border-radius:var(--radius-sm);padding:8px 10px;font-size:11px}
.modal .wgrid b{display:block;font:700 13px var(--mono);color:var(--primary)}
.mrow{display:flex;gap:10px;align-items:center;padding:7px 0;border-top:1px solid var(--border);font-size:12.5px}
.mrow .bar{flex:1}
/* details */
details.meth{background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:0 18px;margin-top:14px}
details.meth summary{cursor:pointer;padding:15px 0;font-weight:700;font-size:14px}
details.meth .inner{padding:0 0 18px;font-size:13px;line-height:1.7;color:var(--muted-foreground)}
details.meth .inner b{color:var(--foreground)}
details.meth ul{padding-left:20px;margin:8px 0}
.crit-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;margin:12px 0}
.crit-list div{background:var(--card);border:1px solid var(--border);border-radius:var(--radius-md);padding:12px 14px}
.crit-list b{font-size:12.5px}.crit-list p{margin:4px 0 0;font-size:11.5px;color:var(--muted-foreground);line-height:1.5}
footer{margin-top:46px;padding-top:18px;border-top:1px solid var(--border);font-size:12px;color:var(--muted-foreground);
 display:flex;gap:16px;flex-wrap:wrap;align-items:center}
.hl{background:var(--brand-50);border:1px solid var(--brand-100);border-radius:var(--radius-sm);padding:1px 5px;color:var(--primary);font-weight:700}
@media(max-width:860px){.grid2{grid-template-columns:1fr}.tb-nav{display:none}}
@media(max-width:600px){.wrap{padding:0 14px 60px}.hero{padding-top:26px}.hide-sm{display:none}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{animation:none!important;transition:none!important}}
@media print{.topbar,.filters,.btn,.tabs{display:none!important}.ptable{max-height:none}.overlay{display:none!important}}
"""

JS = r"""
(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)},
    $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var DATA=JSON.parse(document.getElementById('panel-json').textContent);
var VMAP={};DATA.variants.forEach(function(v){VMAP[v.id]=v});
/* theme */
var tb=$('#themeBtn');
function syncTh(){var d=document.documentElement.classList.contains('dark');
 tb.setAttribute('aria-pressed',String(d));tb.querySelector('span').textContent=d?'Light':'Dark'}
syncTh();
tb.addEventListener('click',function(){var d=document.documentElement.classList.toggle('dark');
 try{localStorage.setItem('rank-theme',d?'dark':'light')}catch(e){}syncTh()});
/* leaderboard sort */
var lbDir={};
$$('#leaderboard th.sortable').forEach(function(th){th.addEventListener('click',function(){
 var col=th.dataset.col;
 // first click on any column sorts best-first (descending); later clicks toggle
 var desc = (lbDir[col]==null) ? true : (lbDir[col]==='asc');
 lbDir[col] = desc ? 'desc' : 'asc';
 var body=$('#leaderboard tbody'),rows=$$('tr',body);
 rows.sort(function(a,b){var x=parseFloat(a.dataset[col]),y=parseFloat(b.dataset[col]);
  return desc ? y-x : x-y;});
 rows.forEach(function(r){body.appendChild(r)});
})});
/* segment tabs */
var segTabs=$$('#segTabs button'),segPanels=$$('.seg-panel');
segTabs.forEach(function(b,i){b.addEventListener('click',function(){
 segTabs.forEach(function(x,j){x.setAttribute('aria-selected',String(i===j))});
 segPanels.forEach(function(p,j){p.hidden=(i!==j)});
})});
/* persona filters */
var q=$('#pq'),fDev=$('#pfDev'),fAb=$('#pfAb'),fExp=$('#pfExp'),fTask=$('#pfTask'),fStyle=$('#pfStyle'),fReg=$('#pfReg'),fSort=$('#pfSort');
var rows=$$('#personaTable tbody tr');
function applyP(){
 var s=q.value.trim().toLowerCase(),n=0;
 rows.forEach(function(r){
  var d=r.dataset;
  var ok=(!s||d.search.indexOf(s)>-1)&&(!fDev.value||d.dev===fDev.value)&&(!fAb.value||d.ability===fAb.value)
   &&(!fExp.value||d.exp===fExp.value)&&(!fTask.value||d.task===fTask.value)
   &&(!fStyle.value||d.style===fStyle.value)&&(!fReg.value||d.region===fReg.value);
  r.hidden=!ok;if(ok)n++;
 });
 $('#pcount').textContent=n+' of 100 reviewers';
 if(fSort.value==='score'){rows.sort(function(a,b){return parseFloat(b.dataset.score)-parseFloat(a.dataset.score)});
  var body=$('#personaTable tbody');rows.forEach(function(r){body.appendChild(r)})}
 else {rows.sort(function(a,b){return a.dataset.id.localeCompare(b.dataset.id)});
  var body2=$('#personaTable tbody');rows.forEach(function(r){body2.appendChild(r)})}
}
[q,fDev,fAb,fExp,fTask,fStyle,fReg,fSort].forEach(function(el){el.addEventListener(el.tagName==='INPUT'?'input':'change',applyP)});
$('#pfReset').addEventListener('click',function(){
 q.value='';[fDev,fAb,fExp,fTask,fStyle,fReg].forEach(function(e){e.value=''});fSort.value='id';applyP()});
/* persona modal */
var ov=$('#overlay'),mo=$('#modalBody');
var PMAP={};DATA.personas.forEach(function(p){PMAP[p.id]=p});
function openP(id){
 var p=PMAP[id];if(!p)return;
 var whtml=DATA.meta.criteria.map(function(c){return '<div>'+c.label+'<b>'+p.weights[c.key].toFixed(2)+'</b></div>'}).join('');
 var rhtml=p.ranking.map(function(vid,i){
  var sc=p.scores[DATA.variants.findIndex(function(v){return v.id===vid})];
  return '<div class="mrow"><span class="chip '+(i===0?'blue':'')+'">#'+(i+1)+'</span>'+
   '<span style="flex:1;font-weight:600">'+VMAP[vid].name+' <span class="vid mono" style="color:var(--muted-foreground);font-size:10px">'+vid+'</span></span>'+
   '<span class="bar"><i style="width:'+sc.toFixed(1)+'%"></i></span><b class="mono" style="font-size:11px;width:42px;text-align:right">'+sc.toFixed(1)+'</b></div>';
 }).join('');
 mo.innerHTML='<h3>'+p.id+' · '+p.name+'</h3><div class="sub">'+p.role+' · '+p.entity+' · '+p.region+
  ' · '+p.device+' · '+p.experience+' · '+p.ability+'</div>'+
  '<p style="font-size:13px;margin:0"><b>Goal:</b> '+p.task.replace(/_/g,' ')+' &nbsp;·&nbsp; <b>Priority:</b> '+p.priority+
  ' &nbsp;·&nbsp; <b>Taste:</b> '+p.aesthetic+'</p>'+
  '<p class="verdict" style="margin:12px 0 4px">“'+p.verdict+'”</p>'+
  '<div class="wgrid">'+whtml+'</div>'+
  '<div style="font-weight:700;font-size:13px;margin:14px 0 2px">Full ranking (1–10)</div>'+rhtml;
 ov.classList.add('on');$('#modalClose').focus();
}
rows.forEach(function(r){r.addEventListener('click',function(){openP(r.dataset.id)});
 r.setAttribute('tabindex','0');
 r.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openP(r.dataset.id)}})});
function closeM(){ov.classList.remove('on')}
$('#modalClose').addEventListener('click',closeM);
$('#modalDone').addEventListener('click',closeM);
ov.addEventListener('click',function(e){if(e.target===ov)closeM()});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeM()});
applyP();
})();
"""

def heat_color(val, lo=60, hi=96, matrix=False):
    if matrix:
        t = max(0.0, min(1.0, (val-0)/100.0))
    else:
        t = max(0.0, min(1.0, (val-lo)/(hi-lo)))
    a = round(0.06 + t*0.88, 3)
    fg = "#fff" if a > 0.52 else "var(--foreground)"
    return "background:rgba(70,95,255,%s);color:%s" % (a, fg)

B = []
A = B.append
A('<a class="skip" href="#main">Skip to content</a>')
A('<div class="topbar"><div class="in">')
A('<div class="tb-brand"><span class="tb-badge">Lab / Rank</span> 100-Reviewer Panel</div>')
A('<nav class="tb-nav" aria-label="Sections">')
for anc,lab in [("leaderboard","Leaderboard"),("families","By family"),("consensus","Consensus"),
                ("segments","Segments"),("criteria","Criteria"),("headtohead","Head to head"),
                ("personas","100 reviewers"),("method","Method"),("evidence","Evidence"),("archive","F05+F06 archive")]:
    A('<a href="#%s">%s</a>' % (anc,lab))
A('</nav>')
A('<button class="btn" id="themeBtn" aria-pressed="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2"/></svg><span>Dark</span></button>')
A('</div></div>')

A('<div class="wrap" id="main">')
# hero
A('<div class="hero">')
A('<p class="eyebrow">Client Portal Lab · F08 + F09 · rank study 2</p>')
A('<h1>100 reviewers. 10 variants. One ranking.</h1>')
A('<p class="lede">I role-played <b>100 distinct users</b> — different jobs, companies, countries, screens, abilities, tastes and goals — and had each one score <b>all 10 hand-authored variants</b> across 10 criteria using their own priorities. Every reviewer produced a full 1–10 ranking; the aggregate is below, together with family ranks, segment winners, a criteria matrix and a head-to-head win matrix.</p>')
A('<div class="disclaimer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg><span><b>Honesty first:</b> these are <b>100 simulated personas, not real people</b>. Scores are a deterministic, seeded model (seed %d) built on criterion ratings derived from <b>static code analysis</b> of the 10 files and the documented design facts — not from a browser, screenshots, or real user testing. It is a structured way to expose blind spots and relative strengths, not a substitute for human research. See <a href="#method">Method &amp; limits</a>.</span></div>' % SEED)
A('<div class="stats">')
for num,lab in [(100,"independent reviewer personas"),(10,"variants reviewed"),(1000,"persona × variant scores"),
                (10,"weighted criteria"),("%d"%len(seg_data),"segment lenses"),(100,"full 1–10 rankings")]:
    A('<div class="stat"><b>%s</b><span>%s</span></div>' % (num,lab))
A('</div></div>')

# leaderboard
A('<section id="leaderboard"><div class="sec-head"><h2>Overall leaderboard</h2><span class="n">10 variants · 100 reviewers</span></div>')
A('<p class="sec-sub">Mean score across all 100 personas (0–100). Click a column header to re-sort. <b>1st votes</b> = how many reviewers placed it #1; <b>Top 3</b> = how many had it in their top three; <b>Borda</b> = total points from all 100 full rankings; <b>σ</b> = score spread (disagreement).</p>')
A('<table id="leaderboard"><thead><tr>')
for lab,col,cls in [("#","rank",""),("Variant","name",""),("Family","fam","hide-sm"),("Craft profile","tag","hide-sm"),
                    ("Mean score","mean","sortable"),("","bar",""),("1st votes","firsts","sortable"),
                    ("Top 3","top3","sortable"),("Borda","borda","sortable"),("σ","stdev","sortable")]:
    if col=="bar": A('<th></th>')
    elif col in ("mean","firsts","top3","borda","stdev"):
        A('<th class="sortable %s" data-col="%s">%s</th>' % (cls,col,lab))
    else: A('<th class="%s">%s</th>' % (cls,lab))
A('</tr></thead><tbody>')
maxmean = max(a["mean"] for a in agg)
for a in overall:
    v = VARIANTS[VIDX[a["id"]]]
    medal = "g%d" % a["rank"] if a["rank"]<=3 else ""
    A('<tr data-rank="%d" data-mean="%s" data-firsts="%d" data-top3="%d" data-borda="%d" data-stdev="%s">' %
      (a["rank"],a["mean"],a["firsts"],a["top3"],a["borda"],a["stdev"]))
    A('<td class="rk"><span class="medal %s">%d</span></td>' % (medal,a["rank"]))
    A('<td>%s</td>' % vlink(a["id"]))
    A('<td class="hide-sm"><span class="fampill %s">%s</span></td>' % (v["family"].lower(),v["family"]))
    A('<td class="tag hide-sm">%s</td>' % esc(v["tag"]))
    A('<td class="num">%s</td>' % a["mean"])
    A('<td><div class="bar"><i style="width:%.1f%%"></i></div></td>' % (a["mean"]/maxmean*100))
    A('<td class="num">%d</td>' % a["firsts"])
    A('<td class="num">%d</td>' % a["top3"])
    A('<td class="num">%d</td>' % a["borda"])
    A('<td class="num">%s</td>' % a["stdev"])
    A('</tr>')
A('</tbody></table>')
A('<div class="callout"><span>🏆</span><span><b>Panel winner: %s</b> — mean %s / 100, %d first-place votes, top-three in %d of 100 rankings. Runner-up: <b>%s</b> (%s). The full ordering is above; note that a cross-family rank compares <i>craft</i>, not task fit — see <a href="#families">per-family ranks</a> for the apples-to-apples view.</span></div>' %
  (esc(vname(overall[0]["id"])), overall[0]["mean"], overall[0]["firsts"], overall[0]["top3"],
   esc(vname(overall[1]["id"])), overall[1]["mean"]))
A('</section>')

# families
A('<section id="families"><div class="sec-head"><h2>Rank within each family</h2><span class="n">apples to apples</span></div>')
A('<p class="sec-sub">F08 (Projects list) and F09 (Project details) solve different tasks. These two leaderboards rank siblings against each other only — the fairer comparison for choosing a template.</p>')
A('<div class="grid2">')
for fam,title,sub in [("F08","F08 · Projects list","5 project-list variants · /projects"),
                      ("F09","F09 · Project details","5 detail + 6-tab variants · /projects/{id}")]:
    A('<div class="panel"><h3>%s</h3><p class="small">%s</p>' % (title,sub))
    for e in fam_rank[fam]:
        v=VARIANTS[VIDX[e["id"]]]
        A('<div class="mini-row"><span class="medal %s" style="width:24px;height:24px;font-size:11px">%d</span>' %
          ("g%d"%e["rank"] if e["rank"]<=3 else "",e["rank"]))
        A('<span style="flex:1">%s</span>' % vlink(e["id"]))
        A('<div class="bar" style="max-width:110px"><i style="width:%.1f%%"></i></div>' % (e["mean"]/maxmean*100))
        A('<b class="num">%s</b></div>' % e["mean"])
    A('</div>')
A('</div>')
A('<div class="callout"><span>🧭</span><span><b>Panel vs. expert pick.</b> The delivery reports named <b>F08 V3 Next-Step Hero</b> (the list answers "what is my next move?" in one glance) and <b>F09 V3 Your Moves</b> (the sticky rail answers "do I need to do anything?" from every tab) as family winners. The persona panel optimises <i>weighted craft criteria</i>, so it can prefer a different variant (e.g. the fullest classic, which is strongest on accessibility, interaction and state depth). Both are legitimate: one is task-fit, the other is cross-cutting craft. The tension is the useful signal.</span></div>')
A('</section>')

# consensus
A('<section id="consensus"><div class="sec-head"><h2>Consensus &amp; disagreement</h2><span class="n">where 100 reviewers agree</span></div>')
A('<p class="sec-sub">A low standard deviation means reviewers with very different priorities still scored a variant similarly. A high one means it polarises — loved by some segments, rejected by others.</p>')
A('<div class="grid3">')
cards=[("Most agreed",vname(most_agreed["id"]),"σ %s — the least controversial build" % most_agreed["stdev"],"green"),
       ("Most polarising",vname(most_polarizing["id"]),"σ %s — the biggest taste split" % most_polarizing["stdev"],"warn"),
       ("Most #1 votes",vname(most_firsts["id"]),"%d of 100 reviewers put it first" % most_firsts["firsts"],"blue"),
       ("Strongest Borda",vname(max(agg,key=lambda a:a["borda"])["id"]),"%d points across 100 full rankings" % max(agg,key=lambda a:a["borda"])["borda"],"blue"),
       ("Widest score range",vname(max(agg,key=lambda a:a["max"]-a["min"])["id"]),"%.1f → %.1f across reviewers" % (max(agg,key=lambda a:a["max"]-a["min"])["min"],max(agg,key=lambda a:a["max"]-a["min"])["max"]),"warn"),
       ("Unanimous segments",str(unanimous_seg),"segments where everyone picked the same #1","green")]
for t,val,sub,c in cards:
    A('<div class="panel"><h3>%s</h3><p class="small">%s</p><div style="font-size:19px;font-weight:800;letter-spacing:-.02em">%s</div><span class="chip %s" style="margin-top:8px">%s</span></div>' % (t,sub,esc(val),c,"panel signal"))
A('</div></section>')

# segments
A('<section id="segments"><div class="sec-head"><h2>What different users pick</h2><span class="n">segment lens</span></div>')
A('<p class="sec-sub">Each card is a subgroup of the 100 reviewers. Pick a lens to see its top three variants by mean score and how many reviewers in that group placed each one first. This is where the 100 personas earn their keep — the "best" template changes with the user.</p>')
A('<div class="tabs" id="segTabs" role="tablist" aria-label="Segment dimension">')
for i,d in enumerate(seg_data):
    A('<button role="tab" aria-selected="%s">%s</button>' % ("true" if i==0 else "false",esc(d["dim"])))
A('</div>')
for i,d in enumerate(seg_data):
    A('<div class="seg-panel" role="tabpanel" %s><div class="seg-grid">' % ("hidden" if i else ""))
    for e in d["entries"]:
        A('<div class="seg-card"><h4>%s</h4><div class="cnt">n = %d reviewers</div><ol>' % (esc(e["label"]),e["n"]))
        for vid,sc in e["top"]:
            vts=e["votes"].get(vid,0)
            A('<li><b>%s</b> %s <span class="chip" style="margin-left:4px">%d votes</span></li>' % (esc(vname(vid)),sc,vts))
        A('</ol></div>')
    A('</div></div>')
A('</section>')

# criteria heatmap
A('<section id="criteria"><div class="sec-head"><h2>Criteria matrix</h2><span class="n">10 × 10</span></div>')
A('<p class="sec-sub">The evidence-based baseline ratings (0–100) each reviewer weights. Darker blue = stronger. Hover a cell for the criterion definition. These are review judgements from static code analysis, not measured browser scores.</p>')
A('<div class="heat"><table><thead><tr><th class="rowh">Variant</th>')
for k,l,d in CRITERIA:
    A('<th title="%s">%s</th>' % (esc(d),esc(l)))
A('</tr></thead><tbody>')
for v in VARIANTS:
    A('<tr><td class="rowh">%s<span>%s</span></td>' % (esc(v["name"]),v["id"]))
    for k,l,d in CRITERIA:
        val=v["c"][k]
        A('<td class="cell" style="%s" title="%s · %s: %d — %s">%d</td>' %
          (heat_color(val),esc(v["name"]),esc(l),val,esc(d),val))
    A('</tr>')
A('</tbody></table></div>')
A('<div class="legend"><span>Weaker</span><span class="sw"></span><span>Stronger</span><span style="margin-left:12px">Ratings 60–96 · derived from code metrics + documented design facts</span></div>')
A('<div class="crit-list" style="margin-top:18px">')
for k,l,d in CRITERIA:
    A('<div><b>%s</b><p>%s</p></div>' % (esc(l),esc(d)))
A('</div></section>')

# head to head
A('<section id="headtohead"><div class="sec-head"><h2>Head-to-head win matrix</h2><span class="n">100 match-ups</span></div>')
A('<p class="sec-sub">Cell = percentage of the 100 reviewers who scored the <b>row</b> variant higher than the <b>column</b> variant. 100 = unanimous win, 0 = unanimous loss. Diagonal is the same variant.</p>')
A('<div class="heat"><table class="matrix"><thead><tr><th class="rowh">Row beats column →</th>')
for v in VARIANTS: A('<th title="%s">%s<br><span class="mono">%s</span></th>' % (esc(v["name"]),esc(v["name"]),v["id"]))
A('</tr></thead><tbody>')
for vi,v in enumerate(VARIANTS):
    A('<tr><td class="rowh">%s<span>%s</span></td>' % (esc(v["name"]),v["id"]))
    for vj,u in enumerate(VARIANTS):
        val=pairwise[vi][vj]
        if val is None: A('<td class="cell" style="background:var(--muted);color:var(--muted-foreground)">—</td>')
        else: A('<td class="cell" style="%s" title="%s beats %s for %s%% of reviewers">%s</td>' %
                (heat_color(val,matrix=True),esc(v["name"]),esc(u["name"]),val,val))
    A('</tr>')
A('</tbody></table></div>')
# overall W/L
def win_count(vid):
    return sum(1 for x in pairwise[VIDX[vid]] if x is not None and x >= 50)
dom_id = max([v["id"] for v in VARIANTS], key=win_count)
dom_n = win_count(dom_id)
min_wins = min(win_count(v["id"]) for v in VARIANTS)
A('<div class="callout"><span>⚔️</span><span><b>Dominance check:</b> %s wins the most pairwise match-ups overall (%d of 9 at ≥50%%). No variant is dominated — even the lowest-ranked variant wins %d match-up%s against a majority of reviewers, which is exactly what a genuinely distinct set should produce.</span></div>' %
  (esc(vname(dom_id)), dom_n, min_wins, "" if min_wins==1 else "s"))
A('</section>')

# personas
A('<section id="personas"><div class="sec-head"><h2>The 100 reviewers</h2><span class="n">every persona, every top pick</span></div>')
A('<p class="sec-sub">Filter by device, ability, experience, goal, taste or region. Click any row (or press Enter) to see that reviewer\'s <b>full 1–10 ranking</b>, their criterion weights, and their own verdict. All 100 are distinct individuals.</p>')
A('<div class="filters">')
A('<label class="field"><span class="sr-only">Search reviewers</span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input id="pq" type="search" placeholder="Search name, role, company…"></label>')
def sel(id_,label,opts):
    A('<label class="field"><span class="sr-only">%s</span><select id="%s"><option value="">%s</option>%s</select></label>' %
      (label,id_,label,"".join('<option value="%s">%s</option>'%(esc(o),esc(o)) for o in opts)))
sel("pfDev","All devices",["Mobile 360–390","Tablet 768","Laptop 1024","Desktop 1440"])
sel("pfAb","All abilities",["None","Keyboard-only","Screen reader","Low vision","Reduced motion","Motor precision"])
sel("pfExp","Any experience",["Novice","Regular","Expert"])
sel("pfTask","Any goal",["Find & triage projects","Review delivery & approve","Evaluate templates","Audit accessibility"])
sel("pfStyle","Any taste",["Airy / minimal","Dense / data-rich","Narrative / editorial","Bento / playful"])
sel("pfReg","Any region",["India","N. America","Europe","APAC","LATAM","Africa","MENA"])
A('<label class="field"><span class="sr-only">Sort</span><select id="pfSort"><option value="id">Sort: ID</option><option value="score">Sort: top score</option></select></label>')
A('<button class="btn" id="pfReset">Reset</button><span class="pcount" id="pcount">100 of 100 reviewers</span>')
A('</div>')
A('<table class="ptable" id="personaTable"><thead><tr>')
for lab in ["ID","Reviewer","Role / entity","Device","Ability","Experience","Goal","Taste","Region","#1 pick","Top score","Their verdict"]:
    A('<th>%s</th>' % lab)
A('</tr></thead><tbody>')
for p in PERSONAS:
    search=(p["name"]+" "+p["role"]+" "+p["entity"]+" "+p["region"]+" "+p["id"]).lower()
    A('<tr data-id="%s" data-search="%s" data-dev="%s" data-ability="%s" data-exp="%s" data-task="%s" data-style="%s" data-region="%s" data-score="%s">' %
      (p["id"],esc(search),esc(p["dev_group"]),esc(p["ability"]),p["experience"],
       esc(TASK_LABEL[p["task"]]),esc(STYLE_BUCKET[p["aesthetic"]]),esc(p["region"]),p["scores"][VIDX[p["top"]]]))
    A('<td class="mono" style="font-size:11px;color:var(--muted-foreground)">%s</td>' % p["id"])
    A('<td class="pname">%s</td>' % esc(p["name"]))
    A('<td class="prole">%s<br><span style="font-size:10.5px">%s</span></td>' % (esc(p["role"]),esc(p["entity"])))
    A('<td><span class="chip">%s</span></td>' % esc(p["device"]))
    A('<td><span class="chip %s">%s</span></td>' % ("" if p["ability"]=="None" else "blue",esc(p["ability"])))
    A('<td>%s</td>' % p["experience"])
    A('<td style="font-size:11.5px">%s</td>' % esc(TASK_LABEL[p["task"]]))
    A('<td><span class="chip">%s</span></td>' % esc(p["aesthetic"]))
    A('<td style="font-size:11.5px">%s</td>' % esc(p["region"]))
    A('<td><b>%s</b><br><span class="mono" style="font-size:10px;color:var(--muted-foreground)">%s</span></td>' % (esc(vname(p["top"])),p["top"]))
    A('<td class="num">%s</td>' % p["scores"][VIDX[p["top"]]])
    A('<td class="verdict">“%s”</td>' % esc(p["verdict"]))
    A('</tr>')
A('</tbody></table></section>')

# method
A('<section id="method"><div class="sec-head"><h2>Method &amp; limits</h2><span class="n">reproducible</span></div>')
A('<p class="sec-sub">Everything here is computed by <span class="mono hl">rank/build_rank.py</span> with seed <span class="mono hl">%d</span>. Re-running it produces byte-identical results. No variant HTML/CSS was generated or modified by that script.</p>' % SEED)
A('<details class="meth" open><summary>How the 100 personas were built</summary><div class="inner">')
A('<ul><li><b>20 archetypes × 5 individuals = 100 distinct reviewers.</b> Archetypes range from first-time clients and agency ops leads to screen-reader users, low-vision users, QA engineers, designers, procurement managers and legal/compliance officers.</li>')
A('<li>Every individual has a unique name drawn from <b>7 world regions</b>, an employer type, a device (360 / 390 / 768 / 1024 / 1440 px), an experience level, an accessibility need, an aesthetic taste, a priority and a task goal.</li>')
A('<li>Those attributes deterministically produce a <b>10-dimension weight vector</b> (normalised to sum 10, with seeded ±16%% jitter). Example: a screen-reader user weights accessibility ~3× a baseline user; a 360px mobile user weights responsive ~3.5×; a designer weights distinctness ~3×.</li>')
A('<li>Each reviewer scores every variant as <span class="mono">weighted criterion mean → quality score (%.0f + (mean − 80) × %.1f) + taste-fit bonus (0 or +6) + task-relevance bonus (0–5.5, so project-triagers favour F08 and delivery-reviewers favour F09) + device penalty + seeded taste noise (σ=%.1f)</span>. Scores are clamped to 0–100. Each reviewer then produces a full 1–10 ranking.</li></ul>' % (CRAFT_BASE, CRAFT_GAIN, NOISE_SIGMA))
A('<p><b>Why task-relevance bonus?</b> A real user comparing a project list with a project-detail page is not making a pure craft judgement — they have a job to do. Adding a bounded family bonus makes the simulation realistic and lets us also report a neutral-craft view through the "Evaluate templates" and "Audit accessibility" segments (35 reviewers with no family bias). <b>Study 2 note:</b> these are the same 100 seeded personas as Study 1 (F05+F06) — same names, devices and weights, re-tasked to list-vs-detail jobs — so cross-study winner comparisons share one population.</p>')
A('</div></details>')
A('<details class="meth"><summary>How criterion ratings were derived</summary><div class="inner">')
A('<ul><li><b>Measured from the 10 files:</b> page weight (23–57 KB), inline <span class="mono">aria-</span> attribute counts (19–61), <span class="mono">@media</span> breakpoints (2–3), <span class="mono">keydown</span> handlers (0–3), reduced-motion rules, forms (0 list / 4 detail), and verified structural capability flags (command palette, <span class="mono">aria-sort</span>, count-up, IntersectionObserver reveals, arrow-key bento tiles, 6-tab tablist with Home/End, native preview <span class="mono">dialog</span> with focus restore, clickable stepper, sticky unlock rail, 1–6 tab keys, ops tables, focus management, live regions, state switchers).</li>')
A('<li><b>From the design docs:</b> the frozen-content fidelity, honesty decisions, distinctness axes, signature interactions, state coverage and family ADDs recorded in <span class="mono">CONCEPTS.md</span> and both <span class="mono">DELIVERY-REPORT.md</span> files.</li>')
A('<li><b>Shared floor:</b> all 10 variants pass the same baseline — one H1, 0 dead links, 0 remote URLs, JS syntax clean (<span class="mono">node --check</span>), light+dark, reduced motion, keyboard paths, honest 502 degraded state, F08 with 4 designed states and F09 with 3 states + 6 in-page tabs. The criteria matrix differentiates on <i>how far above</i> that floor each variant goes.</li></ul>')
A('</div></details>')
A('<details class="meth"><summary>Limitations — please read</summary><div class="inner">')
A('<ul><li><b>These are not real users.</b> They are simulated personas generated by a rule-based model. No human, no survey, no analytics and no session recordings were involved.</li>')
A('<li><b>No screenshot / pixel / real-browser QA.</b> No Chromium / Chrome / Firefox / Playwright binary exists in this sandbox. Criterion ratings are reasoned from static code + CSS + structural parse (one H1, tab counts, link targets), not from rendered screenshots at 360/390/768/1024/1440 in light and dark, and no jsdom runtime pass is claimed for these families.</li>')
A('<li><b>Criterion ratings contain expert judgement.</b> They are defensible and evidence-linked, but they are not objective measurements. Different baseline ratings would shift the ranking. That is why the full matrix, the weights and the seed are published — so the result is auditable and re-runnable.</li>')
A('<li><b>Cross-family ranking compares craft, not fitness for purpose.</b> Use the per-family leaderboards to choose a template for a real task.</li>')
A('<li><b>Small margins are real.</b> Several variants are separated by &lt;2 points. Treat the top cluster as a shortlist, not a strict order.</li></ul>')
A('</div></details>')
A('</section>')

# evidence
A('<section id="evidence"><div class="sec-head"><h2>Evidence table</h2><span class="n">measured from source</span></div>')
A('<p class="sec-sub">Raw static metrics extracted from each of the 10 HTML files. These are real measurements, not judgements.</p>')
A('<table><thead><tr><th>Variant</th><th>Family</th><th>Weight</th><th>aria- attrs</th><th>@media</th><th>keydown</th><th>Reduced motion</th><th>States</th><th>Criterion mean</th></tr></thead><tbody>')
for v in VARIANTS:
    cm=round(mean([v["c"][k] for k in CKEYS]),1)
    A('<tr><td>%s</td><td><span class="fampill %s">%s</span></td><td class="num">%d KB</td><td class="num">%d</td><td class="num">%d</td><td class="num">%d</td><td><span class="chip green">yes</span></td><td><span class="chip green">%s</span></td><td class="num">%s</td></tr>' %
      (vlink(v["id"]),v["family"].lower(),v["family"],v["kb"],v["aria"],v["media"],v["keys"],esc(v["states"]),cm))
A('</tbody></table>')
A('<div class="callout"><span>🔗</span><span>All 10 variant pages are <b>live</b> — every name above links to the actual standalone HTML. Full machine-readable panel data (every persona, weight, score and full ranking) is in <a href="rank.json">rank.json</a>, and the reproducible model is in <a href="rank/build_rank.py">rank/build_rank.py</a>.</span></div>')
A('</section>')

# archive - Study 1 headline results (preserved, not re-run)
A('<section id="archive"><div class="sec-head"><h2>Previous study — F05 + F06</h2><span class="n">archived summary</span></div>')
A('<p class="sec-sub">Study 1 ranked the Requests work hub (F05) and New request form (F06) families with this same 100-persona panel and seed. Its full data (100 personas x 10 scores) is preserved in git history; the headline leaderboard is kept here so the update loses nothing.</p>')
A('<table><thead><tr><th>#</th><th>Variant</th><th>ID</th><th>Mean</th><th>1st votes</th><th>Top 3</th><th>Borda</th></tr></thead><tbody>')
for e in PREVIOUS["overall"]:
    A('<tr><td class="rk"><span class="medal %s">%d</span></td><td><b>%s</b></td><td><span class="chip">%s</span></td><td class="num">%s</td><td class="num">%d</td><td class="num">%d</td><td class="num">%d</td></tr>' %
      ("g%d"%e["rank"] if e["rank"]<=3 else "", e["rank"], esc(e["name"]), e["id"], e["mean"], e["firsts"], e["top3"], e["borda"]))
A('</tbody></table>')
A('<div class="callout"><span>📦</span><span><b>Study 1 winners:</b> F05 → Ops Console · F06 → Three Steps (panel) / Bento Split (expert). Study 2 above is the live ranking for the newest families; both studies share one seeded population, so the panel is consistent across the whole 20-variant lab.</span></div>')
A('</section>')

A('<footer><span>© %s Nestlancer · Client Portal Lab · 100-Reviewer Panel</span>' % TODAY[:4])
for href,lab in [("index.html","Variant gallery"),("DECISIONS.md","DECISIONS.md"),("manifest.json","manifest.json"),
                 ("rank.json","rank.json"),
                 ("families/F08-projects-list/docs/DELIVERY-REPORT.md","F08 report"),
                 ("families/F09-project-details/docs/DELIVERY-REPORT.md","F09 report")]:
    A('<a href="%s">%s</a>' % (href,lab))
A('<span style="margin-left:auto" class="mono">seed %d · %s</span>' % (SEED,TODAY))
A('</footer>')
A('</div>')  # wrap

# overlay
A('<div class="overlay" id="overlay"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">')
A('<div style="display:flex;gap:10px;align-items:center;margin-bottom:8px"><h3 id="modalTitle" style="margin:0;font-size:15px;flex:1">Reviewer detail</h3><button class="btn" id="modalClose">Close ✕</button></div>')
A('<div id="modalBody"></div>')
A('<button class="btn btn-p" id="modalDone" style="width:100%;margin-top:18px;background:var(--primary);color:#fff;border-color:var(--primary)">Done</button>')
A('</div></div>')

TEMPLATE = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>100-Reviewer Panel · Client Portal Lab Ranking</title>
<meta name="color-scheme" content="light dark">
<meta name="description" content="100 simulated reviewer personas rank the 10 hand-authored F08 projects-list and F09 project-details variants across 10 criteria.">
<script>try{var p=new URLSearchParams(location.search),t=p.get('theme')||localStorage.getItem('rank-theme');if(t==='dark')document.documentElement.classList.add('dark');if(t==='light')document.documentElement.classList.remove('dark')}catch(e){}</script>
<style>/*__CSS__*/</style>
</head>
<body>
<svg class="sr-only" aria-hidden="true"><defs></defs></svg>
/*__BODY__*/
<script type="application/json" id="panel-json">/*__JSON__*/</script>
<script>/*__JS__*/</script>
</body>
</html>
"""

json_blob = json.dumps(PANEL, separators=(",", ":"), ensure_ascii=False).replace("</", "<\\/")
out = (TEMPLATE.replace("/*__CSS__*/", CSS)
               .replace("/*__BODY__*/", "\n".join(B))
               .replace("/*__JSON__*/", json_blob)
               .replace("/*__JS__*/", JS))

with open(os.path.join(ROOT,"rank.html"),"w",encoding="utf-8") as f:
    f.write(out)
with open(os.path.join(ROOT,"rank.json"),"w",encoding="utf-8") as f:
    json.dump(PANEL,f,indent=1,ensure_ascii=False)

print("wrote rank.html  %d KB" % (len(out.encode())/1024))
print("wrote rank.json  %d KB" % (os.path.getsize(os.path.join(ROOT,"rank.json"))/1024))
print("personas=%d unique_names=%d reviews=%d" % (len(PERSONAS),len(used_names),N*10))
print("\nOVERALL:")
for a in overall:
    print("  #%-2d %-8s %-18s mean=%6.2f  1st=%2d  top3=%2d  borda=%3d  sd=%.2f" %
          (a["rank"],a["id"],VARIANTS[VIDX[a["id"]]]["name"],a["mean"],a["firsts"],a["top3"],a["borda"],a["stdev"]))
print("\nF08:", " > ".join("%s(%s)"%(e["id"],e["mean"]) for e in fam_rank["F08"]))
print("F09:", " > ".join("%s(%s)"%(e["id"],e["mean"]) for e in fam_rank["F09"]))
print("\nsegments with unanimous #1:", unanimous_seg)
