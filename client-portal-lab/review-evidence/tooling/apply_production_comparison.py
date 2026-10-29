"""Attach a separate production comparison to each family. Lab version scores stay unchanged."""
import json
from pathlib import Path

EV = Path(__file__).resolve().parents[1]
scores_path = EV / "scores.json"
S = json.loads(scores_path.read_text())
W = {"task_clarity": 25, "usability": 20, "visual_craft": 15, "responsive": 15, "accessibility": 15, "integrity": 10}

def total(dim):
    return round(sum(W[k] * dim[k] / 4 for k in W), 1)

SHARED = "Desktop document overflow was 0 on reviewed routes. An earlier mobile pass of accounts A and B also had no document overflow and a menu control; opening that menu was not proven. Dark mode was not activated. axe-core reported four serious color-contrast nodes on the shared shell. No production screenshot was stored."

PAGES = {
    "F03": dict(route="/dashboard", outcome="reviewed", confidence="medium", majors=1,
        dim={"task_clarity": 4, "usability": 3, "visual_craft": 3, "responsive": 3, "accessibility": 2, "integrity": 3},
        evidence="Account A showed heading Overview, with Workspace vitals, Awaiting you, Live workbench, Quotes to review, and Recent activity. Awaiting lanes were Quotes, Pay now, Projects, and Inbox. The same dashboard route opened for accounts B and C.",
        issues=["Shared shell has four serious automated color-contrast nodes."],
        gaps=["Dark theme not reviewed.", "Mobile menu was present but not opened.", "Keyboard sample was inconclusive."]),
    "F04": dict(route="shell command menu", outcome="reviewed", confidence="low", majors=1,
        dim={"task_clarity": 3, "usability": 2, "visual_craft": 3, "responsive": 3, "accessibility": 2, "integrity": 3},
        evidence="The shell button Open command menu opened a dialog with a text input and 15 options. No query was typed, and arrow keys or Enter were not used, so result selection was not observed.",
        issues=["Shared shell contrast finding."],
        gaps=["Typed search, keyboard selection, and result text were not tested.", "Dialog was not measured at 390px."]),
    "F05": dict(route="/requests", outcome="reviewed", confidence="medium", majors=1,
        dim={"task_clarity": 3, "usability": 3, "visual_craft": 3, "responsive": 3, "accessibility": 2, "integrity": 3},
        evidence="Heading Work Hub. Tabs included All, Requests, and Projects. A status select, a text input, and previous/next page controls were visible. A request detail link pattern existed, but a detail page was not opened.",
        issues=["Shared shell contrast finding."],
        gaps=["Sort was not confirmed.", "A request detail page was not opened."]),
    "F06": dict(route="/requests/new", outcome="reviewed", confidence="medium", majors=1,
        dim={"task_clarity": 4, "usability": 3, "visual_craft": 3, "responsive": 3, "accessibility": 2, "integrity": 3},
        evidence="Heading New request, with groups Brief, Budget, and Timeline & requirements. Visible labels included Title, Description, Category, Budget min, Budget max, Currency, Budget is flexible, Preferred start, Deadline, and Requirements. Save draft was visible and was not used.",
        issues=["Shared shell contrast finding."],
        gaps=["Validation was not run because the form was not submitted.", "This route was not separately measured at 390px."]),
    "F07": dict(route="/requests/:id", outcome="reviewed", confidence="medium", majors=1,
        dim={"task_clarity": 3, "usability": 2, "visual_craft": 3, "responsive": 3, "accessibility": 2, "integrity": 3},
        evidence="A request detail page opened from the work hub. The rendered page included status, timeline, attachments, files, and budget, and it used the word Draft. No decision button was visible in the captured controls. Nothing was submitted. Personal names and amounts were omitted.",
        issues=["Shared shell contrast finding."],
        gaps=["Owner and a decision control were not confirmed.", "Dark theme was not reviewed."]),
    "F08": dict(route="/projects", outcome="reviewed", confidence="low", majors=1,
        dim={"task_clarity": 2, "usability": 2, "visual_craft": 2, "responsive": 3, "accessibility": 2, "integrity": 2},
        evidence="Heading Projects was visible. One pass also showed a Try again control, so that load did not present the list. Other passes did not confirm project rows or a detail link. This is incomplete observation, not proof that every load is empty.",
        issues=["Shared shell contrast finding."],
        gaps=["Project status and the control that opens a project were not confirmed."]),
    "F09": dict(route="/projects/:id", outcome="reviewed", confidence="low", majors=1,
        dim={"task_clarity": 1, "usability": 1, "visual_craft": 2, "responsive": 3, "accessibility": 2, "integrity": 2},
        evidence="The projects list opened, but no project detail page could be reached from a safe link or row. One earlier pass showed a Try again control on that list. This score is for the task not being openable in review, not for an inspected project layout.",
        issues=["Project detail was not reachable from the reviewed list.", "Shared shell contrast finding."],
        gaps=["Milestone, file, and message tabs on a project page were not seen."]),
    "F10": dict(route="/quotes", outcome="reviewed", confidence="low", majors=1,
        dim={"task_clarity": 2, "usability": 2, "visual_craft": 2, "responsive": 3, "accessibility": 2, "integrity": 2},
        evidence="Heading Quotes and one select were visible. Quote rows, status, and expiry were not confirmed in the captured structure. This is incomplete observation, not proof of an empty list.",
        issues=["Shared shell contrast finding."],
        gaps=["Quote rows and a quote detail page were not confirmed."]),
    "F11": dict(route="/quotes/:id", outcome="reviewed", confidence="medium", majors=1,
        dim={"task_clarity": 3, "usability": 3, "visual_craft": 3, "responsive": 3, "accessibility": 2, "integrity": 3},
        evidence="A quote detail page opened from the list. The page included terms, deliverables, accept, pay, and download. Accept and pay were not used. Amounts and names were omitted.",
        issues=["Shared shell contrast finding."],
        gaps=["The decision controls were seen but not keyboard-tested."]),
    "F12": dict(route="/messages", outcome="reviewed", confidence="low", majors=1,
        dim={"task_clarity": 3, "usability": 2, "visual_craft": 3, "responsive": 3, "accessibility": 2, "integrity": 3},
        evidence="Heading Messages and section Recent conversations were visible. No conversation link was confirmed in the main area, and no thread was opened. Nothing was sent.",
        issues=["Shared shell contrast finding."],
        gaps=["Opening a conversation was not demonstrated."]),
    "F13": dict(route="/messages/thread/:id", outcome="reviewed", confidence="low", majors=1,
        dim={"task_clarity": 2, "usability": 1, "visual_craft": 2, "responsive": 3, "accessibility": 2, "integrity": 3},
        evidence="A thread route was reached once and produced no write request, but the conversation body and reply field were not confirmed. A later messages click opened the new-message route, which mentioned thread and conversation and had no composer. Nothing was sent.",
        issues=["Shared shell contrast finding."],
        gaps=["A readable thread and an unsent reply draft were not confirmed."]),
    "F14": dict(route="/payments", outcome="reviewed", confidence="medium", majors=1,
        dim={"task_clarity": 3, "usability": 3, "visual_craft": 3, "responsive": 3, "accessibility": 2, "integrity": 3},
        evidence="Heading Billing Center, section Transaction history, a select, and a history table were visible. A payment detail pattern existed. Pay now was not activated.",
        issues=["Shared shell contrast finding."],
        gaps=["A single payment record was not opened.", "Account C billing page was not reopened."]),
    "F15": dict(route="/payments/methods", outcome="reviewed", confidence="low", majors=1,
        dim={"task_clarity": 3, "usability": 2, "visual_craft": 3, "responsive": 3, "accessibility": 2, "integrity": 3},
        evidence="Heading Payment methods and section Add a payment method were visible. Saved methods and the add form fields were not confirmed. No method was added.",
        issues=["Shared shell contrast finding."],
        gaps=["Saved-method state and the add form were not confirmed."]),
    "F16": dict(route="/dashboard Pay now tab", outcome="reviewed", confidence="low", majors=1,
        dim={"task_clarity": 2, "usability": 2, "visual_craft": 3, "responsive": 3, "accessibility": 2, "integrity": 3},
        evidence="The dashboard Pay now tab opened a due-items section headed Pay now, with Pipeline & billing also visible. No pay button was activated and no payment write was recorded. Method names were seen on the billing page, not inside a checkout form.",
        issues=["Shared shell contrast finding."],
        gaps=["A checkout path was not selected.", "No payment proof or method form was opened."]),
    "F17": dict(route="/payments history", outcome="reviewed", confidence="low", majors=1,
        dim={"task_clarity": 2, "usability": 2, "visual_craft": 3, "responsive": 3, "accessibility": 2, "integrity": 3},
        evidence="Billing history showed a table with date, description, project, status, amount, and actions columns. A safe payment-status page was not opened, so a receipt view was not confirmed. No payment was made.",
        issues=["Shared shell contrast finding."],
        gaps=["Receipt or invoice detail for one payment was not opened."]),
    "F18": dict(route="/invoices", outcome="reviewed", confidence="medium", majors=1,
        dim={"task_clarity": 3, "usability": 3, "visual_craft": 3, "responsive": 3, "accessibility": 2, "integrity": 3},
        evidence="Heading Invoices and section Invoice archive, with a table and download controls. No document was downloaded, and document identifiers are omitted.",
        issues=["Shared shell contrast finding."],
        gaps=["Download and filter behavior were not exercised."]),
    "F19": dict(route="/notifications", outcome="reviewed", confidence="medium", majors=2,
        dim={"task_clarity": 3, "usability": 2, "visual_craft": 3, "responsive": 3, "accessibility": 2, "integrity": 2},
        evidence="Heading Notifications, with tabs All, Unread, Quotes, Payments, Messages, Projects, Requests, Account, and Settings. Individual items were not opened. Opening this route for accounts A and B was followed by the app's mark-all-read request. Account C's notifications page was not opened.",
        issues=["Shared shell contrast finding.", "Viewing the center was followed by POST /api/v1/notifications/read-all (HTTP 201). That was not an intentional mark-read click."],
        gaps=["Notification items were not opened.", "The route was not revisited after the side effect."]),
    "F20": dict(route="/profile", outcome="reviewed", confidence="low", majors=1,
        dim={"task_clarity": 2, "usability": 2, "visual_craft": 2, "responsive": 3, "accessibility": 2, "integrity": 2},
        evidence="Heading Profile was visible and the main area contained several content rows. Personal values were omitted. No edit control or labeled field was confirmed.",
        issues=["Shared shell contrast finding."],
        gaps=["Edit path and profile fields were not confirmed."]),
    "F21": dict(route="/settings/account, /settings/security, /settings/notifications", outcome="reviewed", confidence="medium", majors=1,
        dim={"task_clarity": 4, "usability": 3, "visual_craft": 3, "responsive": 3, "accessibility": 2, "integrity": 3},
        evidence="Settings tabs were Account, Security, Notifications, Files, and Activity. Account showed Privacy and Danger zone, including visibility and labeled delete/export controls. Security showed Change password, Two-factor authentication, and Active sessions. Notification settings showed channels, quiet hours, and category preferences. No password, 2FA, deletion, or preference was changed.",
        issues=["Shared shell contrast finding."],
        gaps=["No security control was completed.", "Dark theme preference was not changed."]),
    "F22": dict(route="/settings/files", outcome="reviewed", confidence="low", majors=1,
        dim={"task_clarity": 3, "usability": 2, "visual_craft": 3, "responsive": 3, "accessibility": 2, "integrity": 3},
        evidence="Files settings showed type tabs All, Images, Documents, Video, and Archives, plus source tabs and a file input. A file row was not confirmed. Nothing was uploaded, deleted, or downloaded.",
        issues=["Shared shell contrast finding."],
        gaps=["An individual file or preview was not opened."]),
}

def place(fam, prod):
    if prod["outcome"] != "reviewed":
        return None, "Not ranked. " + prod["not_observed"][0], []
    items = []
    for v in fam["versions"]:
        items.append({"id": v["version"], "total": v["total"], "task": v["dimension_scores"]["task_clarity"], "majors": v.get("major_or_critical_issues", 0), "responsive": v["dimension_scores"]["responsive"], "lab": True})
    items.append({"id": "Production", "total": prod["total"], "task": prod["dimension_scores"]["task_clarity"], "majors": prod["major_or_critical_issues"], "responsive": prod["dimension_scores"]["responsive"], "lab": False})
    items.sort(key=lambda x: -x["total"])
    groups = []
    for item in items:
        if not groups or groups[-1][0]["total"] - item["total"] > 2:
            groups.append([item])
        else:
            groups[-1].append(item)
    ordered = []
    rank_base = 1
    for group in groups:
        group.sort(key=lambda x: (-x["task"], x["majors"], -x["responsive"], x["id"]))
        for j, item in enumerate(group):
            key = (item["task"], item["majors"], item["responsive"])
            prev = group[j - 1] if j else None
            item["comparison_rank"] = rank_base + j if not prev or key != (prev["task"], prev["majors"], prev["responsive"]) else prev["comparison_rank"]
            item["tie"] = len(group) > 1
        ordered.extend(group)
        rank_base += len(group)
    prod_row = next(x for x in ordered if x["id"] == "Production")
    lab_winner = fam["winner"]
    headline = f"Comparison place #{prod_row['comparison_rank']} of 6 at {prod['total']:.1f}. Lab-only winner remains {lab_winner}."
    if prod_row["tie"]:
        headline += " Practical tie-break used inside a 2.0-point group."
    return prod_row["comparison_rank"], headline, [{"id": x["id"], "total": x["total"], "rank": x["comparison_rank"], "tie": x["tie"]} for x in ordered]

for fam in S["families"]:
    src = PAGES[fam["family_id"]]
    prod = {
        "role": "Live production reference. Same rubric, separate from lab version records. Not a lab template and not an automatic winner.",
        "route": src["route"],
        "outcome": src["outcome"],
        "confidence": src["confidence"],
        "evidence": src["evidence"],
        "issues": src.get("issues", []),
        "not_observed": src["gaps"],
        "shared_limits": SHARED,
        "screenshots": "None stored. Production pages can contain account data.",
        "affects_lab_scores": False,
    }
    if src["outcome"] == "reviewed":
        prod["dimension_scores"] = src["dim"]
        prod["total"] = total(src["dim"])
        prod["major_or_critical_issues"] = src["majors"]
        if abs(prod["total"] - total(src["dim"])) > 0:
            raise SystemExit("total mismatch")
    rank, headline, order = place(fam, prod)
    prod["comparison_rank"] = rank
    prod["headline"] = headline
    prod["comparison_order"] = order
    fam["production_reference"] = prod
    fam["production_equivalence"]["status"] = headline
    fam["production_equivalence"]["affects_lab_score"] = False

S["run"]["production_review"] = "Production comparison added to rank reports. Lab version scores and lab-only ranks were not changed. Six families have no production score because the equivalent page was not opened."
scores_path.write_text(json.dumps(S, indent=2, ensure_ascii=False) + "\n")
print("families", len(S["families"]))
for fam in S["families"]:
    p = fam["production_reference"]
    print(fam["family_id"], p["outcome"], p.get("total"), p["headline"])
