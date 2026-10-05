# Social Media Content Planner — Build Plan

## 1. What the typical Etsy planner does (and where it falls short)

Most "social media content planner spreadsheet" listings share the same layout:
12 separate monthly tabs + 52 weekly tabs, a pretty colour theme, columns for
date / time / caption / hashtags / status, and a manual follower-growth table.

Weaknesses that make them worse to *use* than they look in the photos:

| Problem | Why it hurts |
|---|---|
| Data split across 12–64 duplicate tabs | No single place to search, sort, or filter; reporting across months is impossible |
| Calendar is a blank grid you type into | You type every post twice (list + calendar), and they drift out of sync |
| No analytics, or a tracker that's only manual totals | You can't see which platform / pillar / format / weekday actually performs |
| No content-pillar balance | Feeds drift into "all promo" without noticing |
| No caption length checks | Posts fail at upload (X 280, Pinterest 500, Instagram 2,200…) |
| No overdue warnings | Planned posts silently slip |
| Hashtags pasted ad hoc | No reusable, counted sets; Instagram's 30-tag limit gets exceeded |
| Often Google-Sheets-only (or Excel-only) | Half of buyers can't use it properly |

## 2. Design principle: one source of truth, everything else is a view

**You enter each post exactly once, in the Content Log.** The calendar,
weekly view, dashboard and charts are all formula-driven views of that log.

## 3. Tabs

1. **Start Here** – 3-step quick start, colour legend (cells to edit vs. formulas), FAQ.
2. **Setup** – brand name, week start (Sun/Mon), platforms (+handle, monthly goal,
   caption character limit), content pillars (+target mix %), formats, team members.
   Every dropdown in the workbook reads from here.
3. **Content Log** – one row per post (500 rows). Dropdowns for platform, format,
   pillar, hashtag set, status, owner. Auto columns: weekday, caption length,
   ⚠ flags (Overdue / Caption too long / Too many hashtags), engagements, engagement rate.
   Performance metrics (impressions, reach, likes, comments, shares, saves, clicks) live
   on the same row, so planning and results stay connected.
4. **Monthly Calendar** – pick month + year; a 6-week grid fills itself from the log
   (up to 3 posts/day shown with status icon, time, platform, hook, plus "+N more").
   Out-of-month days greyed, today highlighted, month summary strip on top.
5. **Weekly View** – pick any date; shows that week's 7 days with up to 8 posts each.
6. **Dashboard** – pick a month (or Full Year). KPI cards (planned, published,
   scheduled, overdue, completion %, reach, engagements, avg ER), plus tables & charts:
   by platform (vs. goal), pillar mix vs. target, by format, best weekday, top 5 posts.
7. **Growth Tracker** – monthly follower counts per platform → net growth, % growth, chart.
8. **Ideas Bank** – capture ideas with pillar/platform/format/priority; promote to the log.
9. **Hashtag Bank** – named, reusable hashtag sets with auto tag counts; selectable in the log.

## 4. Improvements over the reference-style product

- Single entry → calendar/weekly/dashboard update automatically (no double entry).
- Real analytics: engagement rate per post, per platform, pillar, format, weekday; top posts.
- Pillar-mix balance vs. targets.
- Platform-aware caption limit checks and hashtag-count checks.
- Overdue detection.
- Status icons (💡 ✏️ 👀 🕒 ✅ ♻️) readable in the calendar without colour coding.
- Works in **Excel and Google Sheets**: only functions both support (INDEX/MATCH,
  COUNTIFS, SUMIFS, SUMPRODUCT, IFERROR), no XLOOKUP/FILTER/spill formulas,
  no cross-sheet conditional formatting (Sheets doesn't allow it).
- Sample data pre-filled so the buyer sees a working dashboard on open, with a
  clear "delete the sample rows" instruction.

## 5. Build approach

- `build_planner.py` (Python + openpyxl) generates `Social-Media-Content-Planner.xlsx`
  so the design is reproducible and easy to restyle (one palette dict).
- Recalculate with LibreOffice and require **zero formula errors**.
- Spot-check that the calendar, dashboard counts and top-posts pull the right rows.
- Render to PDF/PNG for a visual check of each tab.
