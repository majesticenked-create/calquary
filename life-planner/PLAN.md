# Life Planner — Build Plan

## 1. What the Etsy "Notion Ultimate Life Planner" gives you

Typical contents of the top-selling listings (the exact listing page was not reachable
from this environment, so this is based on the category's common feature set):

- Dashboard "hub" linking to many sub-pages
- To-do lists, weekly planner
- Goals / vision board / "dream life" page
- Habit tracker (weekly checkbox grid)
- Gratitude + journal pages, mood tracker
- Finance (income/expense tables, budget, savings)
- Fitness, nutrition / meal planning, wellness
- "Second brain": notes, reading list
- Aesthetic covers, a video tutorial for setup

## 2. Where those templates fall short

| Problem | Why it hurts |
|---|---|
| **Page sprawl** — 30-60 pages behind a dashboard | You open it, feel overwhelmed, stop using it within 2 weeks |
| **Nothing is connected** — habits don't feed goals, tasks don't roll up | Goals stay static text; progress is manual and ignored |
| **Manual everything** — progress bars typed in, streaks counted by hand | High friction = abandoned planner |
| **No review ritual** | Tracking without reflection doesn't change behaviour |
| **Slow + clunky on mobile** (Notion relations/rollups) | The phone is where you'd actually check things off |
| **Requires a Notion account + setup tutorial** | Setup friction before any value |
| **Aesthetic over function** | Pretty covers, but no "what should I do right now?" answer |

## 3. Design principles for the better version

1. **One screen answers "what do I do today?"** — Today view pulls overdue + due tasks,
   top-3 focus, today's habits, the daily check-in, and this month's money at a glance.
2. **Everything is linked**: Life Area → Goal → Tasks & Habits. Goal progress is
   computed automatically from its tasks; habit consistency shows on the goal card.
3. **Capture in 2 seconds**: global quick-add (`N` or `Ctrl/⌘+K`) with natural language —
   `Call dentist tomorrow !high #health` sets the due date, priority and area.
4. **Automatic stats**: streaks, 30-day completion, mood trend, budget burn — no manual math.
5. **Weekly review built in**: the review page pre-fills the week's numbers and asks
   three questions (wins, lessons, next week's focus).
6. **Fast, private, offline**: plain HTML/CSS/JS, no account, no dependencies.
   Data stays on the device, with one-click JSON export/import for backup.
7. **Mobile-first**: bottom nav on phones, sidebar on desktop, light/dark themes.
8. **Ships with sample data** so it's useful on first open, plus "clear sample data".

## 4. Modules

| Module | Contents |
|---|---|
| **Today** | Greeting, top-3 focus, overdue/today tasks, habit check-offs, daily check-in (mood, energy, sleep, water, 3 gratitudes, note), month money summary |
| **Tasks** | Filters (Today / Upcoming / Anytime / Done), by area, priority, due date, linked goal, repeat (daily/weekly/monthly) |
| **Week** | 7-day board, drag a task to another day to reschedule |
| **Goals** | Grouped by Life Area; auto progress bar from linked tasks; target date + "why"; linked habits |
| **Habits** | 7-day toggle row, current streak, 30-day %, 12-week heatmap per habit |
| **Journal** | Daily check-ins history + 30-day mood and sleep trend charts |
| **Finance** | Month switcher, income / expenses / net, budget bars per category (over-budget flagged), transactions, savings goals |
| **Notes** | Notes / Books / Ideas with tags and search (the "second brain") |
| **Review** | Weekly review with auto stats + saved reflections history |
| **Settings** | Name, currency, week start, theme, life areas, export/import, reset |

## 5. Data model (single JSON doc in localStorage, key `lifeplanner:v1`)

```
settings  { name, currency, weekStart, theme }
areas     [{ id, name, emoji }]
goals     [{ id, title, areaId, why, target, status }]
tasks     [{ id, title, done, doneAt, due, priority, areaId, goalId, focus, repeat, notes, createdAt }]
habits    [{ id, name, emoji, goalId, log: { 'YYYY-MM-DD': true } }]
checkins  { 'YYYY-MM-DD': { mood, energy, sleep, water, gratitude[3], note } }
txns      [{ id, date, type, amount, category, note }]
budgets   { category: monthlyLimit }
savings   [{ id, name, target, saved }]
notes     [{ id, kind, title, body, tags[], status, updatedAt }]
reviews   { 'YYYY-MM-DD (week start)': { wins, lessons, focus } }
```

## 6. Tech

- `life-planner/index.html`, `planner.css`, `planner.js` — self-contained folder, not
  touched by the calculator site's `build.js`, no new dependencies (matches the repo rule).
- Hash routing (`#/today`, `#/goals` …), render-on-state-change, one `save()` path.
- Dates handled as local `YYYY-MM-DD` strings built from y/m/d integers (avoids the UTC
  off-by-one bug noted in project memory).
- Charts are hand-rolled SVG: single-hue lines/bars/heatmaps, hover tooltips, text values
  alongside so nothing relies on colour alone.

## 7. Build order

1. Shell: layout, nav, router, store, theme, modal, quick-add parser
2. Today + Tasks + Week
3. Goals + Habits
4. Journal + Finance
5. Notes + Review + Settings (export/import/reset)
6. Sample data, mobile pass, browser test with Playwright (desktop + 375px, light + dark)

## 8. Later (not in v1)

- Notion import pack (CSV databases + Markdown pages) if you want to sell a Notion version
- Cloud sync across devices (needs a backend/account)
- Calendar (.ics) import, reminders/notifications
