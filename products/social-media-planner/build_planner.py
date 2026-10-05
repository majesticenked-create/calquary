"""Build the Social Media Content Planner workbook.

Run:  python3 build_planner.py
Output: Social-Media-Content-Planner.xlsx (same folder)

Design: the Content Log is the single source of truth. Calendar, Weekly View,
Dashboard and charts are formula-driven views of it. Only functions supported by
Excel, Google Sheets and LibreOffice are used.
"""
import datetime as dt
import os

from openpyxl import Workbook
from openpyxl.chart import BarChart, DoughnutChart, LineChart, Reference
from openpyxl.chart.label import DataLabelList
from openpyxl.comments import Comment
from openpyxl.formatting.rule import CellIsRule, ColorScaleRule, FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter as CL
from openpyxl.workbook.defined_name import DefinedName
from openpyxl.worksheet.datavalidation import DataValidation

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Social-Media-Content-Planner.xlsx")

# ---------------------------------------------------------------- palette
P = {
    "ink": "2E2A36",       # headings / header fill
    "soft": "6B6575",      # secondary text
    "accent": "C98B7E",    # terracotta-blush accent
    "accent_lt": "F4E4DF",
    "sage": "8FAE97",
    "sage_lt": "E5EFE7",
    "cream": "FFF9EC",     # input cells
    "paper": "FBF8F4",     # sheet background bands
    "line": "E3DDD5",
    "grey": "A39FA8",
    "white": "FFFFFF",
    "red": "B4443A",
    "red_lt": "F8DEDA",
    "blue_lt": "E1EAF5",
    "gold_lt": "FBEFD0",
    "lilac_lt": "ECE4F3",
}
FONT = "Arial"
LOG_FIRST, LOG_LAST = 5, 504          # Content Log data rows (500 posts)
N_PLAT, N_PILLAR, N_FORMAT, N_TEAM = 10, 8, 14, 8
MONTHS = ["January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"]
STATUSES = [("Idea", "💡"), ("Drafting", "✏️"), ("In Review", "👀"),
            ("Scheduled", "🕒"), ("Published", "✅"), ("Repurpose", "♻️")]
STATUS_FILL = {"Idea": P["lilac_lt"], "Drafting": P["gold_lt"], "In Review": P["blue_lt"],
               "Scheduled": P["accent_lt"], "Published": P["sage_lt"], "Repurpose": "EDEDED"}
DEFAULT_YEAR, DEFAULT_MONTH = 2026, "October"


def fill(c):
    return PatternFill("solid", start_color=c, end_color=c)


def font(size=10, bold=False, color=None, italic=False):
    return Font(name=FONT, size=size, bold=bold, italic=italic, color=color or P["ink"])


thin = Side(style="thin", color=P["line"])
BOX = Border(left=thin, right=thin, top=thin, bottom=thin)
BOTTOM = Border(bottom=Side(style="medium", color=P["accent"]))
WRAP_TOP = Alignment(wrap_text=True, vertical="top")
CENTER = Alignment(horizontal="center", vertical="center", wrap_text=True)
LEFT_MID = Alignment(horizontal="left", vertical="center", wrap_text=True)


def style(cell, f=None, fl=None, al=None, bd=None, nf=None):
    if f: cell.font = f
    if fl: cell.fill = fl
    if al: cell.alignment = al
    if bd: cell.border = bd
    if nf: cell.number_format = nf
    return cell


def title(ws, text, sub, width_cols):
    ws.sheet_view.showGridLines = False
    ws["A1"].value = None
    ws.row_dimensions[1].height = 34
    ws.row_dimensions[2].height = 20
    c = ws.cell(row=1, column=2, value=text)
    style(c, font(18, True), al=Alignment(vertical="center"))
    c = ws.cell(row=2, column=2, value=sub)
    style(c, font(10, color=P["soft"], italic=True), al=Alignment(vertical="center"))
    for col in range(1, width_cols + 1):
        ws.cell(row=2, column=col).border = BOTTOM
    ws.column_dimensions["A"].width = 2.5


def header_row(ws, row, col, labels, fill_color=None, auto_cols=()):
    for i, lab in enumerate(labels):
        c = ws.cell(row=row, column=col + i, value=lab)
        is_auto = (col + i) in auto_cols
        style(c, font(10, True, P["white"]), fill(P["soft"] if is_auto else (fill_color or P["ink"])),
              CENTER, BOX)
    ws.row_dimensions[row].height = 30


def inputs(ws, rng, nf=None, al=None):
    for row in ws[rng]:
        for c in row:
            style(c, font(10), fill(P["cream"]), al or LEFT_MID, BOX, nf)


def formula_cells(ws, rng, nf=None, al=None, color=None):
    for row in ws[rng]:
        for c in row:
            style(c, font(10, color=color or P["ink"]), fill(P["white"]), al or LEFT_MID, BOX, nf)


def dv_list(ws, formula, rng, prompt=None):
    dv = DataValidation(type="list", formula1=formula, allow_blank=True, showDropDown=False)
    dv.error = "Pick a value from the list (edit the list on the Setup tab)."
    dv.errorTitle = "Not in list"
    dv.errorStyle = "warning"
    if prompt:
        dv.prompt, dv.showInputMessage = prompt, True
    ws.add_data_validation(dv)
    dv.add(rng)


wb = Workbook()

# ===================================================================== SETUP
setup = wb.active
setup.title = "Setup"
title(setup, "⚙️  Setup", "Everything here feeds the dropdowns, goals and checks across the planner. "
      "Cream cells are yours to edit.", 17)
for col, w in {"B": 18, "C": 16, "D": 13, "E": 13, "F": 3, "G": 16, "H": 30, "I": 11,
               "J": 3, "K": 18, "L": 3, "M": 13, "N": 7, "O": 3, "P": 18, "Q": 3, "R": 12}.items():
    setup.column_dimensions[col].width = w

setup["B4"] = "Brand / account"
setup["C4"] = "Your Brand Co."
setup["B5"] = "Week starts on"
setup["C5"] = "Sunday"
for r in (4, 5):
    style(setup.cell(r, 2), font(10, True), al=LEFT_MID)
inputs(setup, "C4:E4")
setup.merge_cells("C4:E4")
inputs(setup, "C5:C5")
dv_list(setup, '"Sunday,Monday"', "C5")

# Platforms table -> B8:F18
header_row(setup, 8, 2, ["Platform", "Handle", "Monthly post goal", "Caption limit (chars)",
                         "Hashtag limit"])
platforms = [("Instagram", "@yourbrand", 12, 2200, 30), ("TikTok", "@yourbrand", 12, 4000, 10),
             ("YouTube", "@yourbrand", 4, 5000, 15), ("LinkedIn", "/company/yourbrand", 8, 3000, 5),
             ("Facebook", "/yourbrand", 8, 63206, 10), ("Pinterest", "@yourbrand", 10, 500, 20),
             ("X / Twitter", "@yourbrand", 12, 280, 3), ("Threads", "@yourbrand", 8, 500, 1)]
for i in range(N_PLAT):
    r = 9 + i
    vals = platforms[i] if i < len(platforms) else (None,) * 5
    for j, v in enumerate(vals):
        setup.cell(r, 2 + j, v)
inputs(setup, f"B9:F{8 + N_PLAT}")
for r in range(9, 9 + N_PLAT):
    for col in (4, 5, 6):
        setup.cell(r, col).number_format = "#,##0"
        setup.cell(r, col).alignment = CENTER

# Pillars -> H8:J16
header_row(setup, 8, 7, ["Content pillar", "What it covers", "Target mix"])
pillars = [("Educate", "Tips, how-tos, tutorials, myth-busting", 0.30),
           ("Inspire", "Results, stories, transformations, quotes", 0.20),
           ("Entertain", "Trends, humour, behind-the-scenes", 0.20),
           ("Promote", "Offers, launches, product features", 0.15),
           ("Community", "UGC, Q&A, polls, shout-outs", 0.15)]
for i in range(N_PILLAR):
    r = 9 + i
    vals = pillars[i] if i < len(pillars) else (None,) * 3
    for j, v in enumerate(vals):
        setup.cell(r, 7 + j, v)
inputs(setup, f"G9:I{8 + N_PILLAR}")
for r in range(9, 9 + N_PILLAR):
    setup.cell(r, 9).number_format = "0%"
    setup.cell(r, 9).alignment = CENTER
tr = 9 + N_PILLAR
setup.cell(tr, 8, "Total (aim for 100%)")
setup.cell(tr, 9, f"=SUM(I9:I{tr - 1})")
style(setup.cell(tr, 8), font(9, True, P["soft"]), al=Alignment(horizontal="right"))
style(setup.cell(tr, 9), font(10, True), al=CENTER, nf="0%", bd=BOX)
setup.conditional_formatting.add(f"I{tr}", FormulaRule(formula=[f"ROUND(I{tr},2)<>1"],
                                 font=Font(color=P["red"], bold=True)))

# Formats -> K8:K22
header_row(setup, 8, 11, ["Post format"])
formats = ["Reel / Short video", "Carousel", "Single image", "Story", "Long-form video", "Live",
           "Text post", "Thread", "Pin", "Poll", "Article / Blog", "Newsletter"]
for i in range(N_FORMAT):
    setup.cell(9 + i, 11, formats[i] if i < len(formats) else None)
inputs(setup, f"K9:K{8 + N_FORMAT}")

# Statuses (fixed) -> M8:N14
header_row(setup, 8, 13, ["Status", "Icon"], fill_color=P["soft"])
for i, (s, ic) in enumerate(STATUSES):
    style(setup.cell(9 + i, 13, s), font(10), fill(STATUS_FILL[s]), LEFT_MID, BOX)
    style(setup.cell(9 + i, 14, ic), font(11), fill(STATUS_FILL[s]), CENTER, BOX)
setup.cell(9 + len(STATUSES), 13, "Fixed list — used by formulas").font = font(8, italic=True, color=P["soft"])

# Team -> P8:P16
header_row(setup, 8, 16, ["Team / owner"])
team = ["Me", "Designer", "Video editor", "VA"]
for i in range(N_TEAM):
    setup.cell(9 + i, 16, team[i] if i < len(team) else None)
inputs(setup, f"P9:P{8 + N_TEAM}")

# Month list (for dropdowns) -> R8:R21
header_row(setup, 8, 18, ["Months"], fill_color=P["soft"])
for i, m in enumerate(MONTHS + ["Full Year"]):
    style(setup.cell(9 + i, 18, m), font(9, color=P["soft"]), al=LEFT_MID, bd=BOX)

setup["B21"] = ("Tips: add up to 10 platforms, 8 pillars, 14 formats and 8 team members — new entries "
                "appear in every dropdown, the Dashboard and the Growth Tracker automatically. "
                "Caption & hashtag limits drive the ✂ and # warnings in the Content Log.")
setup.merge_cells("B21:P22")
style(setup["B21"], font(9, italic=True, color=P["soft"]), al=WRAP_TOP)
setup.freeze_panes = "A4"

PLAT_RNG = f"Setup!$B$9:$B${8 + N_PLAT}"
PILLAR_RNG = f"Setup!$G$9:$G${8 + N_PILLAR}"
FORMAT_RNG = f"Setup!$K$9:$K${8 + N_FORMAT}"
STATUS_RNG = f"Setup!$M$9:$M${8 + len(STATUSES)}"
ICON_RNG = f"Setup!$N$9:$N${8 + len(STATUSES)}"
TEAM_RNG = f"Setup!$P$9:$P${8 + N_TEAM}"
MONTH_RNG = "Setup!$R$9:$R$20"
MONTH_FY_RNG = "Setup!$R$9:$R$21"
WEEKSTART = "Setup!$C$5"
HASH_FIRST, HASH_LAST = 5, 104

# ============================================================== CONTENT LOG
log = wb.create_sheet("Content Log")
LOG_COLS = [  # (header, width, kind)  kind: in=input, auto=formula, metric=input number
    ("Date", 12, "in"), ("Day", 6, "auto"), ("Time", 10, "in"), ("Platform", 13, "in"),
    ("Format", 16, "in"), ("Pillar", 12, "in"), ("Campaign", 14, "in"), ("Hook / Title", 30, "in"),
    ("Caption", 40, "in"), ("Chars", 7, "auto"), ("Call to action", 18, "in"),
    ("Hashtag set", 16, "in"), ("# Tags", 7, "auto"), ("Asset link", 16, "in"),
    ("Status", 12, "in"), ("Owner", 11, "in"), ("⚠ Flags", 20, "auto"), ("Post URL", 16, "in"),
    ("Impressions", 11, "metric"), ("Reach", 10, "metric"), ("Likes", 8, "metric"),
    ("Comments", 10, "metric"), ("Shares", 8, "metric"), ("Saves", 8, "metric"),
    ("Clicks", 8, "metric"), ("Engagements", 12, "auto"), ("Eng. rate", 9, "auto"),
    ("Notes", 24, "in"),
    # helpers
    ("helper: sort key", 12, "helper"), ("helper: day slot", 12, "helper"),
    ("helper: calendar label", 30, "helper"), ("helper: top-post score", 12, "helper"),
    ("helper: weekday", 8, "helper"),
]
C = {h: i + 1 for i, (h, _, _) in enumerate(LOG_COLS)}
L = {h: CL(i) for h, i in C.items()}
title(log, "📝  Content Log", "One row per post. Enter it here once — the Calendar, Weekly View and "
      "Dashboard fill themselves. Cream = you type · white = automatic.", len(LOG_COLS) - 5)
log.row_dimensions[3].height = 18
style(log.cell(3, C["Date"], "PLAN & CREATE"), font(9, True, P["accent"]))
style(log.cell(3, C["Impressions"], "RESULTS  (fill in after posting — Eng. rate = engagements ÷ reach)"),
      font(9, True, P["sage"]))
style(log.cell(3, C["helper: sort key"], "Helper columns — automatic, please don't edit"),
      font(9, True, P["grey"]))

auto_cols = {C[h] for h, _, k in LOG_COLS if k == "auto"}
header_row(log, 4, 1, [h for h, _, _ in LOG_COLS], auto_cols=auto_cols)
for h, w, k in LOG_COLS:
    log.column_dimensions[L[h]].width = w
    if k == "metric":
        log.cell(4, C[h]).fill = fill("5E7D66")
    if k == "helper":
        style(log.cell(4, C[h]), font(9, True, P["white"]), fill(P["grey"]), CENTER, BOX)

R = LOG_FIRST
DATE_R = f"'Content Log'!${L['Date']}${LOG_FIRST}:${L['Date']}${LOG_LAST}"


def lr(h):  # absolute log range for a column
    return f"'Content Log'!${L[h]}${LOG_FIRST}:${L[h]}${LOG_LAST}"


for r in range(LOG_FIRST, LOG_LAST + 1):
    a = lambda h: f"{L[h]}{r}"  # noqa: E731
    f = {
        "Day": f'=IF({a("Date")}="","",TEXT({a("Date")},"ddd"))',
        "Chars": f'=IF({a("Caption")}="","",LEN({a("Caption")}))',
        "# Tags": (f'=IF({a("Hashtag set")}="","",IFERROR(INDEX(\'Hashtag Bank\'!$E${HASH_FIRST}:$E${HASH_LAST},'
                   f'MATCH({a("Hashtag set")},\'Hashtag Bank\'!$B${HASH_FIRST}:$B${HASH_LAST},0)),""))'),
        "⚠ Flags": (
            f'=IF({a("Date")}&{a("Hook / Title")}="","",TRIM('
            f'IF(AND({a("Date")}<>"",{a("Date")}<TODAY(),{a("Status")}<>"Published",{a("Status")}<>"Repurpose"),"⚠ Overdue ","")'
            f'&IF(AND({a("Chars")}<>"",{a("Platform")}<>"",'
            f'IFERROR({a("Chars")}>INDEX(Setup!$E$9:$E${8 + N_PLAT},MATCH({a("Platform")},{PLAT_RNG},0)),FALSE)),"✂ Caption too long ","")'
            f'&IF(AND({a("# Tags")}<>"",{a("Platform")}<>"",'
            f'IFERROR({a("# Tags")}>INDEX(Setup!$F$9:$F${8 + N_PLAT},MATCH({a("Platform")},{PLAT_RNG},0)),FALSE)),"# Too many tags","")))'),
        "Engagements": (f'=IF(COUNT({a("Likes")}:{a("Saves")})=0,"",SUM({a("Likes")}:{a("Saves")}))'),
        "Eng. rate": f'=IF(OR({a("Engagements")}="",N({a("Reach")})=0),"",{a("Engagements")}/{a("Reach")})',
        "helper: sort key": f'=IF({a("Date")}="","",{a("Date")}+N({a("Time")})+ROW()/10^7)',
        "helper: day slot": (f'=IF({a("Date")}="","",TEXT({a("Date")},"0")&"|"&'
                             f'COUNTIFS({lr("Date")},{a("Date")},{lr("helper: sort key")},"<="&{a("helper: sort key")}))'),
        "helper: calendar label": (
            f'=IF({a("Date")}="","",IFERROR(INDEX({ICON_RNG},MATCH({a("Status")},{STATUS_RNG},0))&" ","")'
            f'&IF({a("Time")}="","",TEXT({a("Time")},"h:mm AM/PM")&" ")&{a("Platform")}'
            f'&IF({a("Hook / Title")}="",""," · "&{a("Hook / Title")}))'),
        "helper: top-post score": (
            f'=IF(OR({a("Date")}="",{a("Eng. rate")}=""),"",IF(AND({a("Date")}>=Dashboard!$G$4,'
            f'{a("Date")}<=Dashboard!$I$4),{a("Eng. rate")}+ROW()/10^9,""))'),
        "helper: weekday": f'=IF({a("Date")}="","",WEEKDAY({a("Date")},2))',
    }
    for h, _, k in LOG_COLS:
        c = log.cell(r, C[h])
        if h in f:
            c.value = f[h]
        if k in ("in", "metric"):
            style(c, font(10), fill(P["cream"]), LEFT_MID if k == "in" else CENTER, BOX)
        elif k == "auto":
            style(c, font(10, color=P["soft"]), fill(P["white"]), CENTER, BOX)
        else:
            style(c, font(8, color=P["grey"]), fill("F6F6F6"), LEFT_MID, BOX)
    log.cell(r, C["Date"]).number_format = "mmm d, yyyy"
    log.cell(r, C["Time"]).number_format = "h:mm AM/PM"
    for h in ("Impressions", "Reach", "Likes", "Comments", "Shares", "Saves", "Clicks", "Engagements"):
        log.cell(r, C[h]).number_format = "#,##0"
    log.cell(r, C["Eng. rate"]).number_format = "0.0%"
    log.cell(r, C["⚠ Flags"]).alignment = LEFT_MID
    log.cell(r, C["⚠ Flags"]).font = font(9, True, P["red"])
    for h in ("Hook / Title", "Caption", "Notes"):
        log.cell(r, C[h]).alignment = Alignment(vertical="center", wrap_text=False)

rng = lambda h: f"{L[h]}{LOG_FIRST}:{L[h]}{LOG_LAST}"  # noqa: E731
dv_list(log, f"={PLAT_RNG}", rng("Platform"))
dv_list(log, f"={FORMAT_RNG}", rng("Format"))
dv_list(log, f"={PILLAR_RNG}", rng("Pillar"))
dv_list(log, f"={STATUS_RNG}", rng("Status"))
dv_list(log, f"={TEAM_RNG}", rng("Owner"))
dv_list(log, f"='Hashtag Bank'!$B${HASH_FIRST}:$B${HASH_LAST}", rng("Hashtag set"))
dvd = DataValidation(type="date", operator="greaterThan", formula1="36526", allow_blank=True)
dvd.error, dvd.errorTitle, dvd.errorStyle = "Enter a date, e.g. 10/14/2026", "Date", "warning"
log.add_data_validation(dvd)
dvd.add(rng("Date"))

# conditional formats (same-sheet only, so they also work in Google Sheets)
for s, _ in STATUSES:
    log.conditional_formatting.add(rng("Status"), CellIsRule(operator="equal", formula=[f'"{s}"'],
                                   fill=fill(STATUS_FILL[s])))
log.conditional_formatting.add(rng("⚠ Flags"), FormulaRule(
    formula=[f'{L["⚠ Flags"]}{LOG_FIRST}<>""'], fill=fill(P["red_lt"])))
log.conditional_formatting.add(rng("Eng. rate"), ColorScaleRule(
    start_type="min", start_color="FFFFFF", end_type="max", end_color="9CC5A6"))
log.conditional_formatting.add(f"A{LOG_FIRST}:{L['Date']}{LOG_LAST}", FormulaRule(
    formula=[f'{L["Date"]}{LOG_FIRST}=TODAY()'], fill=fill(P["accent_lt"]), font=Font(bold=True)))

log.freeze_panes = f"{L['Platform']}{LOG_FIRST}"
log.auto_filter.ref = f"A4:{L['Notes']}{LOG_LAST}"
log.column_dimensions.group(L["helper: sort key"], L["helper: weekday"], hidden=True, outline_level=1)
log.cell(4, C["Date"]).comment = Comment("Tip: Data ▸ Sort by Date to keep the log tidy. "
                                         "The calendar orders posts by date + time automatically.", "Planner")
log.cell(4, C["Eng. rate"]).comment = Comment("Engagements ÷ Reach. Engagements = likes + comments + "
                                              "shares + saves (clicks tracked separately).", "Planner")

# ---- sample data (Sept/Oct 2026; 'today' when built = Oct 5, 2026)
d = lambda m, day: dt.date(DEFAULT_YEAR, m, day)  # noqa: E731
t = lambda h, mi=0: dt.time(h, mi)  # noqa: E731
SAMPLE = [
    # date, time, platform, format, pillar, campaign, hook, caption, cta, hashtag set, status, owner,
    # impressions, reach, likes, comments, shares, saves, clicks
    (d(9, 22), t(9), "Instagram", "Carousel", "Educate", "Evergreen", "5 mistakes killing your reach",
     "Swipe → the 5 mistakes we see every week (and the fix for each).", "Save for later",
     "IG – Growth tips", "Published", "Me", 8420, 6110, 512, 48, 66, 301, 40),
    (d(9, 24), t(18), "TikTok", "Reel / Short video", "Entertain", "Evergreen", "POV: it's launch day",
     "POV: it's launch day and the link is broken 😅", "Follow for part 2", "TikTok – Trends",
     "Published", "Video editor", 21800, 17400, 1490, 112, 240, 95, 0),
    (d(9, 26), t(12), "LinkedIn", "Text post", "Inspire", "Founder story", "What 3 years of posting taught me",
     "Three years, 700 posts, one lesson: consistency beats virality.", "Comment your #1 lesson",
     "LI – Professional", "Published", "Me", 5300, 3900, 210, 34, 18, 12, 61),
    (d(9, 29), t(10), "Pinterest", "Pin", "Educate", "Evergreen", "Content calendar template",
     "Free content calendar template — plan a month in an hour.", "Download now", "Pinterest – SEO",
     "Published", "Designer", 12600, 9800, 140, 3, 25, 410, 288),
    (d(10, 1), t(9), "Instagram", "Reel / Short video", "Promote", "Fall Launch", "Sneak peek: something new",
     "Something new drops Oct 15 👀 Turn on notifications.", "Turn on notifications", "IG – Launch",
     "Published", "Video editor", 15400, 11900, 980, 87, 130, 210, 155),
    (d(10, 1), t(17), "Threads", "Text post", "Community", "", "Ask me anything Friday",
     "AMA: content strategy, tools, burnout. Go 👇", "Reply below", "", "Published", "Me",
     2100, 1700, 96, 71, 4, 2, 0),
    (d(10, 2), t(11), "Facebook", "Single image", "Community", "", "Customer spotlight: Maya",
     "Meet Maya, who grew her shop 3x in 6 months using batching.", "Share your story",
     "", "Drafting", "VA", None, None, None, None, None, None, None),
    (d(10, 3), t(14), "YouTube", "Long-form video", "Educate", "Evergreen", "How I batch 30 posts in a day",
     "Full walkthrough of my batching system + free template.", "Subscribe", "YT – Tutorials",
     "Published", "Video editor", 9800, 7400, 620, 95, 41, 188, 302),
    (d(10, 3), t(19), "TikTok", "Reel / Short video", "Entertain", "", "Trend: 'tell me without telling me'",
     "Tell me you're a content creator without telling me…", "Duet this", "TikTok – Trends",
     "Published", "Video editor", 30500, 26100, 2390, 204, 410, 120, 0),
    (d(10, 5), t(9), "Instagram", "Story", "Community", "", "Poll: which colourway?",
     "Poll: sage or blush for the new planner?", "Vote", "", "Scheduled", "Me",
     None, None, None, None, None, None, None),
    (d(10, 6), t(12), "LinkedIn", "Carousel", "Educate", "Evergreen", "The 4-pillar content framework",
     "Educate, Inspire, Entertain, Promote — here's the mix that works.", "Repost if useful",
     "LI – Professional", "Scheduled", "Designer", None, None, None, None, None, None, None),
    (d(10, 7), t(18, 30), "X / Twitter", "Thread", "Educate", "Evergreen", "Thread: my posting workflow",
     "A thread on exactly how I plan, batch, schedule and review a full month of content across six "
     "platforms without losing my mind — including the spreadsheet I use, the review cadence, and the "
     "three metrics I actually look at every Friday afternoon to decide what to make more of next month.", "Follow for more", "X – Short",
     "In Review", "Me", None, None, None, None, None, None, None),
    (d(10, 8), t(10), "Pinterest", "Pin", "Inspire", "Fall Launch", "Cozy fall desk setup",
     "Cozy fall desk setup for focused planning days 🍂", "Save this pin", "Pinterest – SEO",
     "Scheduled", "Designer", None, None, None, None, None, None, None),
    (d(10, 9), t(17), "Instagram", "Reel / Short video", "Entertain", "", "Day in the life of a planner shop",
     "", "Follow", "IG – Growth tips", "Drafting", "Video editor", None, None, None, None, None, None, None),
    (d(10, 12), t(9), "Instagram", "Carousel", "Educate", "Fall Launch", "How to plan Q4 content",
     "", "Save for Q4", "IG – Growth tips", "Drafting", "Designer", None, None, None, None, None, None, None),
    (d(10, 13), t(12), "TikTok", "Reel / Short video", "Promote", "Fall Launch", "Countdown: 2 days",
     "", "Link in bio", "TikTok – Trends", "Idea", "Video editor", None, None, None, None, None, None, None),
    (d(10, 15), t(8), "Instagram", "Reel / Short video", "Promote", "Fall Launch", "LAUNCH DAY 🎉",
     "It's here! The planner that fills itself in.", "Shop now — link in bio", "IG – Launch",
     "Scheduled", "Me", None, None, None, None, None, None, None),
    (d(10, 15), t(12), "Facebook", "Single image", "Promote", "Fall Launch", "Launch announcement",
     "", "Shop now", "", "Scheduled", "VA", None, None, None, None, None, None, None),
    (d(10, 15), t(18), "LinkedIn", "Text post", "Inspire", "Fall Launch", "Why we built this",
     "", "Read the story", "LI – Professional", "Drafting", "Me", None, None, None, None, None, None, None),
    (d(10, 15), t(20), "Threads", "Text post", "Promote", "Fall Launch", "We're live!",
     "", "", "", "Idea", "Me", None, None, None, None, None, None, None),
    (d(10, 20), t(14), "YouTube", "Long-form video", "Educate", "", "Q4 content strategy masterclass",
     "", "Subscribe", "YT – Tutorials", "Idea", "Video editor", None, None, None, None, None, None, None),
    (d(10, 22), t(10), "Pinterest", "Pin", "Educate", "Evergreen", "Hashtag cheat sheet",
     "", "Save", "Pinterest – SEO", "Idea", "Designer", None, None, None, None, None, None, None),
    (d(10, 27), t(18), "Instagram", "Carousel", "Community", "", "Your best fall content (UGC)",
     "", "Tag us", "IG – Growth tips", "Idea", "VA", None, None, None, None, None, None, None),
    (d(10, 30), t(17), "TikTok", "Reel / Short video", "Entertain", "Halloween", "Spooky planner tour",
     "", "Follow", "TikTok – Trends", "Idea", "Video editor", None, None, None, None, None, None, None),
]
order = ["Date", "Time", "Platform", "Format", "Pillar", "Campaign", "Hook / Title", "Caption",
         "Call to action", "Hashtag set", "Status", "Owner", "Impressions", "Reach", "Likes",
         "Comments", "Shares", "Saves", "Clicks"]
for i, row in enumerate(SAMPLE):
    for h, v in zip(order, row):
        if v not in (None, ""):
            log.cell(LOG_FIRST + i, C[h], v)
log.cell(LOG_FIRST, C["Notes"], "SAMPLE ROW — delete sample rows before you start")
log.cell(LOG_FIRST, C["Notes"]).font = font(9, True, P["accent"])

# ============================================================== HASHTAG BANK
hb = wb.create_sheet("Hashtag Bank")
title(hb, "#️⃣  Hashtag Bank", "Save reusable hashtag sets, then pick them by name in the Content Log. "
      "Tag counts are automatic.", 6)
header_row(hb, 4, 2, ["Set name", "Platform", "Hashtags (separate with spaces)", "# Tags", "Notes"],
           auto_cols={5})
for col, w in {"B": 22, "C": 14, "D": 70, "E": 9, "F": 30}.items():
    hb.column_dimensions[col].width = w
for r in range(HASH_FIRST, HASH_LAST + 1):
    for col in (2, 3, 4, 6):
        style(hb.cell(r, col), font(10), fill(P["cream"]), LEFT_MID, BOX)
    hb.cell(r, 5, f'=IF(D{r}="","",LEN(D{r})-LEN(SUBSTITUTE(D{r},"#","")))')
    style(hb.cell(r, 5), font(10, color=P["soft"]), fill(P["white"]), CENTER, BOX)
sets = [
    ("IG – Growth tips", "Instagram", "#contentcreator #instagramtips #socialmediatips #contentstrategy "
     "#smallbusinesstips #marketingtips #reelstips #growoninstagram", "Rotate weekly"),
    ("IG – Launch", "Instagram", "#newlaunch #smallbusiness #shopsmall #plannerlove #productlaunch", ""),
    ("TikTok – Trends", "TikTok", "#fyp #contentcreator #smallbusinesscheck #creatortips", "Keep to 3–5"),
    ("LI – Professional", "LinkedIn", "#marketing #contentmarketing #entrepreneurship", "3 max on LinkedIn"),
    ("Pinterest – SEO", "Pinterest", "#contentcalendar #socialmediaplanner #plannertemplate", ""),
    ("YT – Tutorials", "YouTube", "#contentplanning #socialmediamarketing #tutorial", ""),
    ("X – Short", "X / Twitter", "#contentstrategy", "1–2 on X"),
]
for i, (n, p, h, note) in enumerate(sets):
    r = HASH_FIRST + i
    hb.cell(r, 2, n); hb.cell(r, 3, p); hb.cell(r, 4, h); hb.cell(r, 6, note)
dv_list(hb, f"={PLAT_RNG}", f"C{HASH_FIRST}:C{HASH_LAST}")
hb.freeze_panes = "B5"

# ================================================================ IDEAS BANK
ib = wb.create_sheet("Ideas Bank")
title(ib, "💡  Ideas Bank", "Capture ideas the moment they hit. When you're ready, copy one into the "
      "Content Log and set its status here to 'Planned'.", 10)
IB_COLS = [("Idea", 40), ("Pillar", 13), ("Platform", 13), ("Format", 17), ("Priority", 10),
           ("Inspiration / link", 26), ("Date added", 12), ("Status", 11), ("Notes", 26)]
header_row(ib, 4, 2, [h for h, _ in IB_COLS])
for i, (_, w) in enumerate(IB_COLS):
    ib.column_dimensions[CL(2 + i)].width = w
IB_LAST = 204
inputs(ib, f"B5:J{IB_LAST}")
for r in range(5, IB_LAST + 1):
    ib.cell(r, 8).number_format = "mmm d, yyyy"
dv_list(ib, f"={PILLAR_RNG}", f"C5:C{IB_LAST}")
dv_list(ib, f"={PLAT_RNG}", f"D5:D{IB_LAST}")
dv_list(ib, f"={FORMAT_RNG}", f"E5:E{IB_LAST}")
dv_list(ib, '"🔥 High,Medium,Low"', f"F5:F{IB_LAST}")
dv_list(ib, '"New,Planned,Parked,Used"', f"I5:I{IB_LAST}")
ideas = [
    ("Before/after of a messy vs. planned content week", "Inspire", "Instagram", "Carousel", "🔥 High",
     "Competitor post 9/18", d(9, 20), "New"),
    ("Myth: you need to post every day", "Educate", "TikTok", "Reel / Short video", "🔥 High", "", d(9, 25), "New"),
    ("Q&A: answer top 5 DMs of the month", "Community", "Instagram", "Story", "Medium", "", d(9, 28), "New"),
    ("Tool stack video: everything I use", "Educate", "YouTube", "Long-form video", "Medium", "", d(10, 1), "Parked"),
    ("Holiday gift guide for creators", "Promote", "Pinterest", "Pin", "Low", "", d(10, 2), "New"),
    ("Spooky planner tour", "Entertain", "TikTok", "Reel / Short video", "Medium", "", d(10, 3), "Planned"),
]
for i, row in enumerate(ideas):
    for j, v in enumerate(row):
        ib.cell(5 + i, 2 + j, v)
for lab, col in (("Planned", "D9E8DC"), ("Used", "EDEDED"), ("Parked", P["gold_lt"])):
    ib.conditional_formatting.add(f"I5:I{IB_LAST}", CellIsRule(operator="equal", formula=[f'"{lab}"'],
                                  fill=fill(col)))
ib.freeze_panes = "C5"
ib.auto_filter.ref = f"B4:J{IB_LAST}"

# =========================================================== MONTHLY CALENDAR
cal = wb.create_sheet("Monthly Calendar")
title(cal, "🗓️  Monthly Calendar", "Pick a month and year — the grid fills itself from the Content Log "
      "(first 3 posts per day, ordered by time).", 8)
for col in "BCDEFGH":
    cal.column_dimensions[col].width = 27
cal.column_dimensions["I"].width = 3
cal.column_dimensions["J"].width = 14
cal.column_dimensions["K"].width = 12
cal["B4"] = "Month"
cal["C4"] = DEFAULT_MONTH
cal["D4"] = "Year"
cal["E4"] = DEFAULT_YEAR
for ref in ("B4", "D4"):
    style(cal[ref], font(11, True), al=Alignment(horizontal="right", vertical="center"))
for ref in ("C4", "E4"):
    style(cal[ref], font(12, True, P["accent"]), fill(P["cream"]), CENTER, BOX)
cal["E4"].number_format = "0"
cal.row_dimensions[4].height = 24
dv_list(cal, f"={MONTH_RNG}", "C4")
# helpers (visible, small, out of the grid)
helpers = [("month #", f"=MATCH(C4,{MONTH_RNG},0)"), ("1st of month", "=DATE(E4,K4,1)"),
           ("grid start", f'=K5-MOD(WEEKDAY(K5)-IF({WEEKSTART}="Monday",2,1),7)'),
           ("month end", "=EOMONTH(K5,0)")]
for i, (lab, fm) in enumerate(helpers):
    style(cal.cell(4 + i, 10, lab), font(8, color=P["grey"]), al=Alignment(horizontal="right"))
    style(cal.cell(4 + i, 11, fm), font(8, color=P["grey"]),
          nf="0" if i == 0 else "mmm d, yyyy")
cnt = lambda extra="": (f"COUNTIFS({DATE_R},\">=\"&$K$5,{DATE_R},\"<=\"&$K$7{extra})")  # noqa: E731
cal["B5"] = ('="📅 "&' + cnt() + '&" posts planned     ✅ "&' + cnt(f',{lr("Status")},"Published"')
             + '&" published     🕒 "&' + cnt(f',{lr("Status")},"Scheduled"')
             + '&" scheduled     ⚠ "&' + cnt(f',{DATE_R},"<"&TODAY(),{lr("Status")},"<>Published",'
                                               f'{lr("Status")},"<>Repurpose"') + '&" overdue"')
cal.merge_cells("B5:H5")
style(cal["B5"], font(10, True, P["soft"]), fill(P["paper"]), LEFT_MID)
cal.row_dimensions[5].height = 22
# weekday header row 7
for d_i in range(7):
    c = cal.cell(7, 2 + d_i, f'=TEXT($K$6+{d_i},"dddd")')
    style(c, font(10, True, P["white"]), fill(P["ink"]), CENTER, BOX)
cal.row_dimensions[7].height = 24
POSTS_SHOWN = 3
BLOCK = POSTS_SHOWN + 2
for w in range(6):
    top = 8 + w * BLOCK
    for d_i in range(7):
        col = CL(2 + d_i)
        dc = cal.cell(top, 2 + d_i, f"=$K$6+{w * 7 + d_i}")
        style(dc, font(11, True), fill(P["paper"]), Alignment(horizontal="left", vertical="center", indent=1),
              Border(left=thin, right=thin, top=Side(style="thin", color=P["grey"])), "d")
        for k in range(1, POSTS_SHOWN + 1):
            pc = cal.cell(top + k, 2 + d_i,
                          f'=IFERROR(INDEX({lr("helper: calendar label")},MATCH(TEXT({col}${top},"0")&"|{k}",'
                          f'{lr("helper: day slot")},0)),"")')
            style(pc, font(8), fill(P["white"]), Alignment(vertical="center", wrap_text=True, shrink_to_fit=False),
                  Border(left=thin, right=thin))
        mc = cal.cell(top + POSTS_SHOWN + 1, 2 + d_i,
                      f'=IF(COUNTIF({DATE_R},{col}{top})>{POSTS_SHOWN},"+"&(COUNTIF({DATE_R},{col}{top})-{POSTS_SHOWN})'
                      f'&" more → see Weekly View","")')
        style(mc, font(8, True, P["accent"], italic=True), fill(P["white"]), Alignment(vertical="top"),
              Border(left=thin, right=thin, bottom=thin))
    cal.row_dimensions[top].height = 20
    for k in range(1, POSTS_SHOWN + 1):
        cal.row_dimensions[top + k].height = 30
    cal.row_dimensions[top + POSTS_SHOWN + 1].height = 14
    blk = f"B{top}:H{top + POSTS_SHOWN + 1}"
    cal.conditional_formatting.add(f"B{top}:H{top}", FormulaRule(formula=[f"B{top}=TODAY()"],
                                   fill=fill(P["accent"]), font=Font(color=P["white"], bold=True)))
    cal.conditional_formatting.add(blk, FormulaRule(formula=[f"MONTH(B${top})<>$K$4"],
                                   font=Font(color="C9C5CC"), fill=fill("F7F6F8")))
cal.freeze_panes = "A8"
cal.print_area = f"A1:H{8 + 6 * BLOCK - 1}"
cal.page_setup.orientation = "landscape"
cal.page_setup.fitToWidth = 1
cal.page_setup.fitToHeight = 1
cal.sheet_properties.pageSetUpPr.fitToPage = True

# ================================================================ WEEKLY VIEW
wk = wb.create_sheet("Weekly View")
title(wk, "📆  Weekly View", "Type any date — see that whole week, up to 8 posts a day, ordered by time.", 8)
for col in "BCDEFGH":
    wk.column_dimensions[col].width = 27
wk.column_dimensions["I"].width = 3
wk.column_dimensions["J"].width = 12
wk.column_dimensions["K"].width = 12
wk["B4"] = "Any date in the week"
style(wk["B4"], font(11, True), al=Alignment(horizontal="right", vertical="center"))
wk["C4"] = "=TODAY()"
style(wk["C4"], font(12, True, P["accent"]), fill(P["cream"]), CENTER, BOX, "mmm d, yyyy")
wk["C4"].comment = Comment("Shows the current week by default. Type any date to jump to that week; "
                           "type =TODAY() to go back.", "Planner")
wk["D4"] = '="Week of "&TEXT(K4,"mmm d")&" – "&TEXT(K4+6,"mmm d, yyyy")'
wk.merge_cells("D4:F4")
style(wk["D4"], font(11, True, P["soft"]), al=LEFT_MID)
style(wk.cell(4, 10, "week start"), font(8, color=P["grey"]), al=Alignment(horizontal="right"))
style(wk.cell(4, 11, f'=C4-MOD(WEEKDAY(C4)-IF({WEEKSTART}="Monday",2,1),7)'), font(8, color=P["grey"]),
      nf="mmm d, yyyy")
WK_POSTS = 8
for d_i in range(7):
    col = CL(2 + d_i)
    style(wk.cell(6, 2 + d_i, f'=TEXT($K$4+{d_i},"dddd")'), font(10, True, P["white"]), fill(P["ink"]), CENTER, BOX)
    style(wk.cell(7, 2 + d_i, f"=$K$4+{d_i}"), font(13, True), fill(P["paper"]), CENTER, BOX, "mmm d")
    style(wk.cell(8, 2 + d_i, f'=COUNTIF({DATE_R},{col}7)&" post"&IF(COUNTIF({DATE_R},{col}7)=1,"","s")'),
          font(8, color=P["soft"], italic=True), fill(P["paper"]), CENTER, BOX)
    for k in range(1, WK_POSTS + 1):
        c = wk.cell(8 + k, 2 + d_i, f'=IFERROR(INDEX({lr("helper: calendar label")},MATCH(TEXT({col}$7,"0")&"|{k}",'
                                    f'{lr("helper: day slot")},0)),"")')
        style(c, font(9), fill(P["white"]), Alignment(vertical="top", wrap_text=True), BOX)
wk.row_dimensions[6].height = 22
wk.row_dimensions[7].height = 26
for k in range(1, WK_POSTS + 1):
    wk.row_dimensions[8 + k].height = 44
wk.conditional_formatting.add("B7:H7", FormulaRule(formula=["B7=TODAY()"], fill=fill(P["accent"]),
                              font=Font(color=P["white"], bold=True)))
legend = "Status key:  " + "   ".join(f"{ic} {s}" for s, ic in STATUSES)
wk.cell(18, 2, legend)
style(wk.cell(18, 2), font(9, color=P["soft"], italic=True))
cal.cell(8 + 6 * BLOCK + 1, 2, legend)
style(cal.cell(8 + 6 * BLOCK + 1, 2), font(9, color=P["soft"], italic=True))
wk.page_setup.orientation = "landscape"
wk.sheet_properties.pageSetUpPr.fitToPage = True

# ================================================================= DASHBOARD
db = wb.create_sheet("Dashboard")
title(db, "📊  Dashboard", "Pick a month (or Full Year). Everything below — and the charts — "
      "updates from the Content Log.", 17)
for col in range(2, 18):
    db.column_dimensions[CL(col)].width = 11.5
db.column_dimensions["J"].width = 3
db.column_dimensions["B"].width = 16
db.column_dimensions["K"].width = 16
db["B4"] = "Period"
style(db["B4"], font(11, True), al=Alignment(horizontal="right", vertical="center"))
db["C4"] = DEFAULT_MONTH
db["D4"] = DEFAULT_YEAR
for ref in ("C4", "D4"):
    style(db[ref], font(12, True, P["accent"]), fill(P["cream"]), CENTER, BOX)
db["D4"].number_format = "0"
dv_list(db, f"={MONTH_FY_RNG}", "C4")
db["F4"], db["H4"] = "From", "To"
db["G4"] = f'=IF(MATCH(C4,{MONTH_FY_RNG},0)=13,DATE(D4,1,1),DATE(D4,MATCH(C4,{MONTH_FY_RNG},0),1))'
db["I4"] = f'=IF(MATCH(C4,{MONTH_FY_RNG},0)=13,DATE(D4,12,31),EOMONTH(G4,0))'
db["K4"] = f'=IF(MATCH(C4,{MONTH_FY_RNG},0)=13,12,1)'  # goal multiplier
db["L4"] = "← goal multiplier (months)"
for ref in ("F4", "H4"):
    style(db[ref], font(9, color=P["soft"]), al=Alignment(horizontal="right", vertical="center"))
for ref in ("G4", "I4"):
    style(db[ref], font(9, True, P["soft"]), al=CENTER, nf="mmm d, yyyy")
style(db["K4"], font(8, color=P["grey"]), al=CENTER)
style(db["L4"], font(8, color=P["grey"], italic=True))
db.row_dimensions[4].height = 24

IN = f'{DATE_R},">="&$G$4,{DATE_R},"<="&$I$4'
ST = lambda s: f',{lr("Status")},"{s}"'  # noqa: E731
cards = [
    ("Posts planned", f"=COUNTIFS({IN})", "0", "in this period"),
    ("Published", f"=COUNTIFS({IN}{ST('Published')})", "0",
     f'=IFERROR(TEXT(COUNTIFS({IN}{ST("Published")})/COUNTIFS({IN}),"0%")&" complete","—")'),
    ("Scheduled", f"=COUNTIFS({IN}{ST('Scheduled')})", "0", "queued & ready"),
    ("In progress", f"=COUNTIFS({IN}{ST('Idea')})+COUNTIFS({IN}{ST('Drafting')})+COUNTIFS({IN}{ST('In Review')})",
     "0", "idea · drafting · review"),
    ("Overdue", f'=COUNTIFS({IN},{DATE_R},"<"&TODAY(),{lr("Status")},"<>Published",{lr("Status")},"<>Repurpose")',
     "0", "past date, not published"),
    ("Reach", f"=SUMIFS({lr('Reach')},{IN})", "#,##0", "=\"impressions: \"&TEXT(SUMIFS(" + lr("Impressions") + f",{IN}),\"#,##0\")"),
    ("Engagements", f"=SUMIFS({lr('Engagements')},{IN})", "#,##0", "likes+comments+shares+saves"),
    ("Avg eng. rate", f"=IFERROR(SUMIFS({lr('Engagements')},{IN})/SUMIFS({lr('Reach')},{IN}),0)", "0.0%",
     "=\"clicks: \"&TEXT(SUMIFS(" + lr("Clicks") + f",{IN}),\"#,##0\")"),
]
for i, (lab, fm, nf, sub) in enumerate(cards):
    c0 = 2 + i * 2
    rng_ = lambda r: f"{CL(c0)}{r}:{CL(c0 + 1)}{r}"  # noqa: E731
    for r in (6, 7, 8):
        db.merge_cells(rng_(r))
    accent = P["red"] if lab == "Overdue" else (P["sage"] if lab == "Published" else P["accent"])
    style(db.cell(6, c0, lab.upper()), font(8, True, P["soft"]), fill(P["paper"]), CENTER)
    style(db.cell(7, c0, fm), font(20, True, accent), fill(P["paper"]), CENTER, nf=nf)
    style(db.cell(8, c0, sub), font(8, color=P["soft"], italic=True), fill(P["paper"]), CENTER)
    for r in (6, 7, 8):
        for cc in (c0, c0 + 1):
            db.cell(r, cc).fill = fill(P["paper"])
            db.cell(r, cc).border = Border(
                top=Side(style="medium", color=accent) if r == 6 else None,
                left=thin if cc == c0 else None, right=thin if cc == c0 + 1 else None,
                bottom=thin if r == 8 else None)
db.row_dimensions[6].height = 18
db.row_dimensions[7].height = 34
db.row_dimensions[8].height = 18


def section(ws, row, col, text, span):
    c = ws.cell(row, col, text)
    style(c, font(12, True))
    for cc in range(col, col + span):
        ws.cell(row, cc).border = Border(bottom=Side(style="thin", color=P["accent"]))


# By platform: B11 ; rows 13..22
section(db, 11, 2, "By platform", 8)
header_row(db, 12, 2, ["Platform", "Posts", "Published", "Goal", "% of goal", "Reach", "Engagements", "Eng. rate"])
PF0 = 13
for i in range(N_PLAT):
    r = PF0 + i
    pr = f"$B{r}"
    pin = f'{IN},{lr("Platform")},{pr}'
    vals = [f'=IF(Setup!B{9 + i}="","",Setup!B{9 + i})',
            f'=IF({pr}="","",COUNTIFS({pin}))',
            f'=IF({pr}="","",COUNTIFS({pin}{ST("Published")}))',
            f'=IF(OR({pr}="",Setup!D{9 + i}=""),"",Setup!D{9 + i}*$K$4)',
            f'=IF(OR({pr}="",N(E{r})=0),"",C{r}/E{r})',
            f'=IF({pr}="","",SUMIFS({lr("Reach")},{pin}))',
            f'=IF({pr}="","",SUMIFS({lr("Engagements")},{pin}))',
            f'=IF(OR({pr}="",N(G{r})=0),"",H{r}/G{r})']
    nfs = [None, "0", "0", "0", "0%", "#,##0", "#,##0", "0.0%"]
    for j, (v, nf) in enumerate(zip(vals, nfs)):
        style(db.cell(r, 2 + j, v), font(10, j == 0), fill(P["white"]), CENTER if j else LEFT_MID, BOX, nf)
db.conditional_formatting.add(f"F{PF0}:F{PF0 + N_PLAT - 1}", FormulaRule(
    formula=[f'AND(F{PF0}<>"",F{PF0}>=1)'], font=Font(color="3E7D4F", bold=True)))
db.conditional_formatting.add(f"F{PF0}:F{PF0 + N_PLAT - 1}", FormulaRule(
    formula=[f'AND(F{PF0}<>"",F{PF0}<0.5)'], font=Font(color=P["red"], bold=True)))

# By pillar: K11 ; rows 13..20
section(db, 11, 11, "Pillar mix vs. target", 6)
header_row(db, 12, 11, ["Pillar", "Posts", "Actual mix", "Target", "Gap", "Eng. rate"])
for i in range(N_PILLAR):
    r = PF0 + i
    pr = f"$K{r}"
    pin = f'{IN},{lr("Pillar")},{pr}'
    vals = [f'=IF(Setup!G{9 + i}="","",Setup!G{9 + i})',
            f'=IF({pr}="","",COUNTIFS({pin}))',
            f'=IF(OR({pr}="",N($B$7)=0),"",L{r}/$B$7)',
            f'=IF(OR({pr}="",Setup!I{9 + i}=""),"",Setup!I{9 + i})',
            f'=IF(OR(M{r}="",N{r}=""),"",M{r}-N{r})',
            f'=IF({pr}="","",IFERROR(SUMIFS({lr("Engagements")},{pin})/SUMIFS({lr("Reach")},{pin}),""))']
    nfs = [None, "0", "0%", "0%", '+0%;-0%;0%', "0.0%"]
    for j, (v, nf) in enumerate(zip(vals, nfs)):
        style(db.cell(r, 11 + j, v), font(10, j == 0), fill(P["white"]), CENTER if j else LEFT_MID, BOX, nf)
gap_rng = f"O{PF0}:O{PF0 + N_PILLAR - 1}"
db.conditional_formatting.add(gap_rng, FormulaRule(formula=[f'AND(O{PF0}<>"",O{PF0}<=-0.1)'],
                              font=Font(color=P["red"], bold=True)))
db.conditional_formatting.add(gap_rng, FormulaRule(formula=[f'AND(O{PF0}<>"",O{PF0}>=0.1)'],
                              font=Font(color="B07A1E", bold=True)))
db.cell(PF0 + N_PILLAR, 11, "Red gap = under-posting that pillar; amber = over-posting.").font = \
    font(8, italic=True, color=P["soft"])

# By format: B25 ; rows 27..40
FR0 = 27
section(db, 25, 2, "By format", 5)
header_row(db, 26, 2, ["Format", "Posts", "Reach", "Engagements", "Eng. rate"])
for i in range(N_FORMAT):
    r = FR0 + i
    pr = f"$B{r}"
    pin = f'{IN},{lr("Format")},{pr}'
    vals = [f'=IF(Setup!K{9 + i}="","",Setup!K{9 + i})',
            f'=IF({pr}="","",COUNTIFS({pin}))',
            f'=IF({pr}="","",SUMIFS({lr("Reach")},{pin}))',
            f'=IF({pr}="","",SUMIFS({lr("Engagements")},{pin}))',
            f'=IF(OR({pr}="",N(D{r})=0),"",E{r}/D{r})']
    nfs = [None, "0", "#,##0", "#,##0", "0.0%"]
    for j, (v, nf) in enumerate(zip(vals, nfs)):
        style(db.cell(r, 2 + j, v), font(10, j == 0), fill(P["white"]), CENTER if j else LEFT_MID, BOX, nf)
db.conditional_formatting.add(f"F{FR0}:F{FR0 + N_FORMAT - 1}", ColorScaleRule(
    start_type="min", start_color="FFFFFF", end_type="max", end_color="9CC5A6"))

# By weekday: K25 ; rows 27..33
section(db, 25, 11, "Best day to post", 5)
header_row(db, 26, 11, ["Day", "Posts", "Reach", "Engagements", "Eng. rate"])
for i, day in enumerate(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]):
    r = FR0 + i
    pin = f'{IN},{lr("helper: weekday")},{i + 1}'
    vals = [day, f"=COUNTIFS({pin})", f'=SUMIFS({lr("Reach")},{pin})', f'=SUMIFS({lr("Engagements")},{pin})',
            f'=IF(N(M{r})=0,"",N{r}/M{r})']
    nfs = [None, "0", "#,##0", "#,##0", "0.0%"]
    for j, (v, nf) in enumerate(zip(vals, nfs)):
        style(db.cell(r, 11 + j, v), font(10, j == 0), fill(P["white"]), CENTER if j else LEFT_MID, BOX, nf)
db.conditional_formatting.add(f"O{FR0}:O{FR0 + 6}", ColorScaleRule(
    start_type="min", start_color="FFFFFF", end_type="max", end_color="9CC5A6"))
db.cell(FR0 + 7, 11, '=IFERROR("⭐ Best day so far: "&INDEX(K27:K33,MATCH(MAX(O27:O33),O27:O33,0)),"")')
style(db.cell(FR0 + 7, 11), font(10, True, P["accent"]))

# Top 5 posts: row 43
TP0 = 44
section(db, 42, 2, "Top 5 posts by engagement rate", 15)
header_row(db, 43, 2, ["#", "Date", "Platform", "Format", "Hook / Title", "", "", "", "", "Pillar", "Reach",
                       "Engagements", "Eng. rate"])
db.merge_cells("F43:J43")
SCORE = lr("helper: top-post score")
for k in range(1, 6):
    r = TP0 + k - 1
    row_ = f"MATCH(LARGE({SCORE},{k}),{SCORE},0)"
    get = lambda h: f'=IFERROR(INDEX({lr(h)},{row_}),"")'  # noqa: E731
    vals = [k, get("Date"), get("Platform"), get("Format"), get("Hook / Title"), None, None, None, None,
            get("Pillar"), get("Reach"), get("Engagements"), get("Eng. rate")]
    nfs = ["0", "mmm d", None, None, None, None, None, None, None, None, "#,##0", "#,##0", "0.0%"]
    for j, (v, nf) in enumerate(zip(vals, nfs)):
        c = db.cell(r, 2 + j)
        if v is not None:
            c.value = v
        style(c, font(10, j == 0), fill(P["white"]), LEFT_MID if j == 4 else CENTER, BOX, nf)
    db.merge_cells(f"F{r}:J{r}")
    db.row_dimensions[r].height = 20

# Charts
ch = BarChart()
ch.type = "bar"
ch.title = "Posts by platform"
ch.style = 10
ch.add_data(Reference(db, min_col=3, min_row=12, max_row=PF0 + N_PLAT - 1), titles_from_data=True)
ch.add_data(Reference(db, min_col=4, min_row=12, max_row=PF0 + N_PLAT - 1), titles_from_data=True)
ch.set_categories(Reference(db, min_col=2, min_row=PF0, max_row=PF0 + N_PLAT - 1))
ch.series[0].graphicalProperties.solidFill = P["accent"]
ch.series[1].graphicalProperties.solidFill = P["sage"]
ch.y_axis.majorGridlines = None
ch.x_axis.scaling.orientation = "maxMin"
ch.height, ch.width = 8.5, 13
ch.legend.position = "b"
db.add_chart(ch, "R6")

dn = DoughnutChart()
dn.title = "Pillar mix (actual)"
dn.add_data(Reference(db, min_col=12, min_row=12, max_row=PF0 + N_PILLAR - 1), titles_from_data=True)
dn.set_categories(Reference(db, min_col=11, min_row=PF0, max_row=PF0 + N_PILLAR - 1))
dn.holeSize = 55
dn.height, dn.width = 8.5, 13
dn.legend.position = "r"
from openpyxl.chart.series import DataPoint  # noqa: E402
for i, col in enumerate([P["accent"], P["sage"], "D9B26F", "8C7FA8", "7FA7C4", "C9C5CC", "E3A99B", "B5CDB9"]):
    pt = DataPoint(idx=i)
    pt.graphicalProperties.solidFill = col
    dn.series[0].dPt.append(pt)
db.add_chart(dn, "R24")

wd = BarChart()
wd.title = "Engagement rate by weekday"
wd.add_data(Reference(db, min_col=15, min_row=26, max_row=FR0 + 6), titles_from_data=True)
wd.set_categories(Reference(db, min_col=11, min_row=FR0, max_row=FR0 + 6))
wd.series[0].graphicalProperties.solidFill = P["sage"]
wd.y_axis.numFmt = "0%"
wd.y_axis.scaling.min = 0
wd.y_axis.majorGridlines = None
wd.legend = None
wd.height, wd.width = 8.5, 13
db.add_chart(wd, "R42")
db.freeze_panes = "A5"
db.page_setup.orientation = "landscape"
db.page_setup.fitToWidth, db.page_setup.fitToHeight = 1, 0
db.sheet_properties.pageSetUpPr.fitToPage = True
db.print_area = "A1:Z62"

# ============================================================== GROWTH TRACKER
gt = wb.create_sheet("Growth Tracker")
title(gt, "📈  Growth Tracker", "Log follower counts once a month (e.g. on the 1st). Growth and the chart are "
      "automatic. Platforms come from Setup.", 13)
gt["B4"] = "Year"
gt["C4"] = DEFAULT_YEAR
style(gt["B4"], font(11, True), al=Alignment(horizontal="right", vertical="center"))
style(gt["C4"], font(12, True, P["accent"]), fill(P["cream"]), CENTER, BOX, "0")
gt.column_dimensions["B"].width = 14
for col in range(3, 3 + N_PLAT + 1):
    gt.column_dimensions[CL(col)].width = 12


def gt_block(top, label, kind):
    section(gt, top, 2, label, N_PLAT + 2)
    hdr = top + 1
    style(gt.cell(hdr, 2, "Month"), font(10, True, P["white"]), fill(P["ink"]), CENTER, BOX)
    for i in range(N_PLAT):
        style(gt.cell(hdr, 3 + i, f'=IF(Setup!B{9 + i}="","—",Setup!B{9 + i})'),
              font(10, True, P["white"]), fill(P["ink"]), CENTER, BOX)
    style(gt.cell(hdr, 3 + N_PLAT, "Total"), font(10, True, P["white"]), fill(P["accent"]), CENTER, BOX)
    gt.row_dimensions[hdr].height = 28
    return hdr + 1


F0 = gt_block(6, "Followers (enter on the 1st of each month)", "in")
N0 = gt_block(F0 + 13, "Net new followers", "auto")
G0 = gt_block(N0 + 13, "Growth %", "auto")
TOTC = CL(3 + N_PLAT)
for m in range(12):
    for base in (F0, N0, G0):
        style(gt.cell(base + m, 2, f'=TEXT(DATE($C$4,{m + 1},1),"mmm yyyy")'), font(10, True), fill(P["paper"]),
              LEFT_MID, BOX)
    for i in range(N_PLAT + 1):
        col = CL(3 + i)
        f_cell = gt.cell(F0 + m, 3 + i)
        if i < N_PLAT:
            style(f_cell, font(10), fill(P["cream"]), CENTER, BOX, "#,##0")
        else:
            f_cell.value = f'=IF(COUNT(C{F0 + m}:{CL(2 + N_PLAT)}{F0 + m})=0,"",SUM(C{F0 + m}:{CL(2 + N_PLAT)}{F0 + m}))'
            style(f_cell, font(10, True), fill(P["accent_lt"]), CENTER, BOX, "#,##0")
        cur, prev = f"{col}{F0 + m}", f"{col}{F0 + m - 1}"
        nfv = f'=IF(OR({cur}="",{prev}=""),"",{cur}-{prev})' if m else '=""'
        gfv = f'=IF(OR({cur}="",N({prev})=0),"",{cur}/{prev}-1)' if m else '=""'
        style(gt.cell(N0 + m, 3 + i, nfv), font(10), fill(P["white"]), CENTER, BOX, '+#,##0;-#,##0;0')
        style(gt.cell(G0 + m, 3 + i, gfv), font(10), fill(P["white"]), CENTER, BOX, '+0.0%;-0.0%;0.0%')
for base in (N0, G0):
    rng_ = f"C{base}:{TOTC}{base + 11}"
    gt.conditional_formatting.add(rng_, FormulaRule(formula=[f'AND(C{base}<>"",C{base}<0)'],
                                  font=Font(color=P["red"])))
    gt.conditional_formatting.add(rng_, FormulaRule(formula=[f'AND(C{base}<>"",C{base}>0)'],
                                  font=Font(color="3E7D4F")))
growth = {"Instagram": [4200, 4410, 4690, 5020, 5300, 5710, 6180, 6640, 7105, 7690],
          "TikTok": [1800, 2350, 2900, 3800, 4500, 5900, 7200, 8100, 9400, 11200],
          "YouTube": [610, 640, 690, 720, 790, 850, 920, 1010, 1100, 1230],
          "LinkedIn": [1500, 1560, 1610, 1690, 1740, 1800, 1890, 1960, 2040, 2110],
          "Pinterest": [900, 980, 1120, 1210, 1390, 1500, 1710, 1830, 2020, 2240]}
for i, (pname, *_rest) in enumerate(platforms):
    if pname in growth:
        for m, v in enumerate(growth[pname]):
            gt.cell(F0 + m, 3 + i, v)
lc = LineChart()
lc.title = "Total followers"
lc.add_data(Reference(gt, min_col=3 + N_PLAT, min_row=F0 - 1, max_row=F0 + 11), titles_from_data=True)
lc.set_categories(Reference(gt, min_col=2, min_row=F0, max_row=F0 + 11))
lc.series[0].graphicalProperties.line.solidFill = P["accent"]
lc.series[0].graphicalProperties.line.width = 28000
lc.series[0].smooth = True
lc.legend = None
lc.y_axis.majorGridlines = None
lc.y_axis.numFmt = "#,##0"
lc.height, lc.width = 9, 16
gt.add_chart(lc, f"{CL(5 + N_PLAT)}6")
gt.freeze_panes = "C6"

# ================================================================ START HERE
sh = wb.create_sheet("Start Here", 0)
title(sh, "✨  Social Media Content Planner", "Plan once. The calendar, weekly view and dashboard fill "
      "themselves.", 10)
sh.column_dimensions["B"].width = 4
sh.column_dimensions["C"].width = 26
for col in "DEFGHIJ":
    sh.column_dimensions[col].width = 14
row = 4


def para(text, size=10, bold=False, color=None, h=None, italic=False):
    global row
    sh.merge_cells(start_row=row, start_column=3, end_row=row, end_column=10)
    c = sh.cell(row, 3, text)
    style(c, font(size, bold, color, italic), al=Alignment(wrap_text=True, vertical="center"))
    if h:
        sh.row_dimensions[row].height = h
    row += 1


def step(n, head, body):
    global row
    style(sh.cell(row, 2, n), font(14, True, P["white"]), fill(P["accent"]), CENTER)
    sh.merge_cells(start_row=row, start_column=3, end_row=row, end_column=10)
    style(sh.cell(row, 3, head), font(12, True), al=Alignment(vertical="center"))
    sh.row_dimensions[row].height = 24
    row += 1
    para(body, 10, color=P["soft"], h=34)
    row += 1


para("QUICK START", 9, True, P["accent"])
row += 1
step(1, "Set up your brand  →  Setup tab",
     "Add your platforms (with handles, monthly post goals and caption/hashtag limits), your content pillars "
     "with a target mix, post formats and team members. These power every dropdown and goal in the planner.")
step(2, "Plan your posts  →  Content Log tab",
     "One row per post: date, time, platform, format, pillar, hook, caption, hashtag set and status. "
     "Delete the sample rows first. ⚠ Flags warn you about overdue posts, captions over the platform limit "
     "and too many hashtags.")
step(3, "See it & improve it  →  Calendar, Weekly View, Dashboard",
     "The Monthly Calendar and Weekly View build themselves. After posting, add reach, likes, comments, "
     "shares, saves and clicks to the log — the Dashboard shows what's working by platform, pillar, "
     "format and weekday, plus your top posts.")
para("WHAT'S IN THIS PLANNER", 9, True, P["accent"])
tabs = [("Setup", "Platforms, pillars, formats, team, week start"),
        ("Content Log", "The one place you enter posts + results"),
        ("Monthly Calendar", "Auto-filled month grid, status icons, overdue count"),
        ("Weekly View", "Any week at a glance, up to 8 posts/day"),
        ("Dashboard", "KPIs, platform goals, pillar balance, best day, top 5 posts, charts"),
        ("Growth Tracker", "Monthly followers per platform → growth + chart"),
        ("Ideas Bank", "Capture & prioritise ideas"),
        ("Hashtag Bank", "Reusable, counted hashtag sets")]
for tname, desc in tabs:
    style(sh.cell(row, 3, tname), font(10, True), al=LEFT_MID)
    sh.merge_cells(start_row=row, start_column=4, end_row=row, end_column=10)
    style(sh.cell(row, 4, desc), font(10, color=P["soft"]), al=LEFT_MID)
    sh.cell(row, 3).hyperlink = f"#'{tname}'!A1"
    sh.cell(row, 3).font = font(10, True, P["accent"])
    row += 1
row += 1
para("COLOUR KEY", 9, True, P["accent"])
style(sh.cell(row, 3, "Type here"), font(10), fill(P["cream"]), CENTER, BOX)
sh.merge_cells(start_row=row, start_column=4, end_row=row, end_column=10)
style(sh.cell(row, 4, "Cream cells are inputs — yours to edit."), font(10, color=P["soft"]), al=LEFT_MID)
row += 1
style(sh.cell(row, 3, "Automatic"), font(10, color=P["soft"]), fill(P["white"]), CENTER, BOX)
sh.merge_cells(start_row=row, start_column=4, end_row=row, end_column=10)
style(sh.cell(row, 4, "White cells and grey headers are formulas — leave them be."), font(10, color=P["soft"]),
      al=LEFT_MID)
row += 1
style(sh.cell(row, 3, "Status icons"), font(10), al=CENTER)
sh.merge_cells(start_row=row, start_column=4, end_row=row, end_column=10)
style(sh.cell(row, 4, "   ".join(f"{ic} {s}" for s, ic in STATUSES)), font(10), al=LEFT_MID)
row += 2
para("GOOD TO KNOW", 9, True, P["accent"])
for tip in [
    "• Works in Microsoft Excel and Google Sheets (File ▸ Import ▸ Upload in Sheets).",
    "• Engagement rate = (likes + comments + shares + saves) ÷ reach.",
    "• Need more than 3 posts on a day? The calendar shows '+N more' — open the Weekly View for all of them.",
    "• Room for 500 posts, 10 platforms, 8 pillars, 14 formats. Keep adding rows inside the cream area.",
    "• Sorting the Content Log: select the whole table (incl. headers) and sort by Date.",
]:
    para(tip, 10, color=P["ink"], h=18)
sh.sheet_view.zoomScale = 110

# ------------------------------------------------------------- finishing
tab_colors = {"Start Here": P["accent"], "Setup": P["soft"], "Content Log": P["ink"],
              "Monthly Calendar": P["accent"], "Weekly View": P["accent"], "Dashboard": P["sage"],
              "Growth Tracker": P["sage"], "Ideas Bank": "D9B26F", "Hashtag Bank": "D9B26F"}
order_tabs = ["Start Here", "Setup", "Content Log", "Monthly Calendar", "Weekly View", "Dashboard",
              "Growth Tracker", "Ideas Bank", "Hashtag Bank"]
wb._sheets = [wb[n] for n in order_tabs]
for n, col in tab_colors.items():
    wb[n].sheet_properties.tabColor = col
wb.active = 0
for ws in wb.worksheets:
    ws.sheet_view.showGridLines = False
    if ws.title in ("Start Here", "Setup", "Growth Tracker", "Ideas Bank", "Hashtag Bank"):
        ws.page_setup.orientation = "portrait" if ws.title == "Start Here" else "landscape"
        ws.page_setup.fitToWidth, ws.page_setup.fitToHeight = 1, 0
        ws.sheet_properties.pageSetUpPr.fitToPage = True
for chart in (ch, wd, lc):  # openpyxl hides axes by default in Excel
    chart.x_axis.delete = False
    chart.y_axis.delete = False
ch.gapWidth = 60
wd.gapWidth = 60
wb.defined_names["Platforms"] = DefinedName("Platforms", attr_text=PLAT_RNG)
wb.defined_names["Pillars"] = DefinedName("Pillars", attr_text=PILLAR_RNG)
wb.save(OUT)
print("saved", OUT)
