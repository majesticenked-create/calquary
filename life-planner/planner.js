/* ============================================================
   Life Planner — app logic
   Plain JS, no dependencies. One JSON document in localStorage,
   one render() path, event delegation for every interaction.
   ============================================================ */
(() => {
'use strict';

const KEY = 'lifeplanner:v1';
const THEME_KEY = 'lifeplanner:theme';

/* ---------- tiny utils ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const sum = arr => arr.reduce((a, b) => a + b, 0);
const avg = arr => arr.length ? sum(arr) / arr.length : null;
const pct = (a, b) => b ? Math.round((a / b) * 100) : 0;

/* ---------- dates (local YYYY-MM-DD strings, never re-parsed as UTC) ---------- */
const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseYmd = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const isYmd = s => /^\d{4}-\d{2}-\d{2}$/.test(s || '');
const today = () => ymd(new Date());
const addDays = (s, n) => { const d = parseYmd(s); d.setDate(d.getDate() + n); return ymd(d); };
const addMonthsYmd = (s, n) => {
  const d = parseYmd(s); const day = d.getDate();
  d.setDate(1); d.setMonth(d.getMonth() + n);
  const last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, last));
  return ymd(d);
};
const daysBetween = (a, b) => Math.round((parseYmd(b) - parseYmd(a)) / 864e5);
const weekStartOf = s => { const d = parseYmd(s); const diff = (d.getDay() - state.settings.weekStart + 7) % 7; d.setDate(d.getDate() - diff); return ymd(d); };
const monthKey = s => s.slice(0, 7);
const fmt = (s, o) => parseYmd(s).toLocaleDateString(undefined, o);
const fmtShort = s => fmt(s, { month: 'short', day: 'numeric' });
const fmtDay = s => fmt(s, { weekday: 'short', month: 'short', day: 'numeric' });
const fmtLong = s => fmt(s, { weekday: 'long', month: 'long', day: 'numeric' });
const fmtMonth = m => parseYmd(m + '-01').toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
function relDay(s) {
  const td = today();
  if (s === td) return 'Today';
  if (s === addDays(td, 1)) return 'Tomorrow';
  if (s === addDays(td, -1)) return 'Yesterday';
  const diff = daysBetween(td, s);
  if (diff > 1 && diff < 7) return fmt(s, { weekday: 'long' });
  return fmtShort(s);
}

/* ---------- seeded random for sample data ---------- */
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/* ============================================================
   Store
   ============================================================ */
const DEFAULT_AREAS = [
  { id: 'health', name: 'Health', emoji: '💪' },
  { id: 'career', name: 'Career', emoji: '💼' },
  { id: 'money', name: 'Money', emoji: '💰' },
  { id: 'relationships', name: 'Relationships', emoji: '❤️' },
  { id: 'growth', name: 'Growth', emoji: '🌱' },
  { id: 'home', name: 'Home', emoji: '🏡' },
];

function blank() {
  return {
    version: 1,
    meta: { sample: false },
    settings: { name: '', currency: 'USD', weekStart: 1 },
    areas: DEFAULT_AREAS.map(a => ({ ...a })),
    goals: [], tasks: [], habits: [],
    checkins: {}, txns: [], budgets: {}, savings: [], notes: [], reviews: {},
  };
}

function migrate(d) {
  const b = blank();
  for (const k of Object.keys(b)) if (d[k] === undefined || d[k] === null) d[k] = b[k];
  d.settings = { ...b.settings, ...d.settings };
  d.meta = { ...b.meta, ...d.meta };
  return d;
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return migrate(JSON.parse(raw));
  } catch (e) { /* fall through to sample data */ }
  return sampleData();
}

let saveWarned = false;
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch (e) {
    if (!saveWarned) { saveWarned = true; toast('Couldn’t save in this browser — export a backup from Settings.'); }
  }
}
function commit() { save(); render(); }

let undoSnapshot = null;
function snapshot() { undoSnapshot = JSON.stringify(state); }
function undo() {
  if (!undoSnapshot) return;
  state = migrate(JSON.parse(undoSnapshot)); undoSnapshot = null;
  commit(); toast('Restored');
}

/* ---------- sample data (relative to today so it always looks alive) ---------- */
function sampleData() {
  const d = blank(); d.meta.sample = true;
  const td = today(); const rnd = mulberry32(7);
  const pick = arr => arr[Math.floor(rnd() * arr.length)];

  const g = (title, areaId, why, target) => { const goal = { id: uid(), title, areaId, why, target, status: 'active', createdAt: td }; d.goals.push(goal); return goal.id; };
  const g1 = g('Run a 10K race', 'health', 'Feel strong and have more energy for the people I love.', addDays(td, 60));
  const g2 = g('Build a 3-month emergency fund', 'money', 'Sleep well knowing a surprise bill won’t sink me.', addDays(td, 150));
  const g3 = g('Get promoted to Senior', 'career', 'More ownership, bigger impact, better pay.', addDays(td, 120));
  const g4 = g('Read 24 books this year', 'growth', 'Learn from people who’ve already solved my problems.', `${td.slice(0, 4)}-12-31`);

  const t = (title, due, priority, areaId, goalId, extra = {}) => d.tasks.push({
    id: uid(), title, due: due === null ? null : addDays(td, due), priority, areaId, goalId,
    done: false, doneAt: null, focus: false, repeat: null, notes: '', createdAt: addDays(td, -14), ...extra,
  });
  t('Plan this week’s training runs', 0, 'med', 'health', g1, { focus: true });
  t('Transfer $200 to emergency fund', 0, 'high', 'money', g2, { focus: true, repeat: 'monthly' });
  t('Draft Q4 project proposal', 1, 'high', 'career', g3, { focus: true });
  t('Interval run — 5 × 400m', 0, null, 'health', g1, { repeat: 'weekly' });
  t('Call Mom', 0, null, 'relationships', null);
  t('Book dentist appointment', -2, 'med', 'health', null);
  t('Ask manager about the promotion path', 2, 'high', 'career', g3);
  t('Review subscriptions & cancel unused', 3, 'low', 'money', g2);
  t('Long run — 8 km', 4, null, 'health', g1);
  t('Finish “Atomic Habits”', 5, null, 'growth', g4);
  t('Grocery run', 1, null, 'home', null);
  t('Plan date night', 5, 'low', 'relationships', null);
  t('Fix the leaky kitchen faucet', null, null, 'home', null);
  t('Learn basic SQL', null, 'low', 'career', g3);
  t('Sign up for the 10K', -6, null, 'health', g1, { done: true, doneAt: addDays(td, -6) });
  t('Easy run — 5 km', -2, null, 'health', g1, { done: true, doneAt: addDays(td, -2) });
  t('Open a high-yield savings account', -10, null, 'money', g2, { done: true, doneAt: addDays(td, -10) });
  t('Set a monthly budget', -8, null, 'money', g2, { done: true, doneAt: addDays(td, -8) });
  t('Update resume', -4, null, 'career', g3, { done: true, doneAt: addDays(td, -4) });
  t('Finish “Deep Work”', -12, null, 'growth', g4, { done: true, doneAt: addDays(td, -12) });

  const habit = (name, emoji, goalId, p, doneToday) => {
    const log = {};
    for (let i = 1; i <= 90; i++) if (rnd() < p) log[addDays(td, -i)] = true;
    if (doneToday) log[td] = true;
    d.habits.push({ id: uid(), name, emoji, goalId, log, createdAt: addDays(td, -90) });
  };
  habit('Drink 8 glasses of water', '💧', null, 0.85, true);
  habit('Move for 30 minutes', '🏃', g1, 0.7, false);
  habit('Read 20 pages', '📖', g4, 0.65, true);
  habit('Journal', '✍️', null, 0.6, false);
  habit('Meditate 10 minutes', '🧘', null, 0.45, false);

  const grat = ['Morning coffee on the balcony', 'A long call with an old friend', 'Finished a hard task early', 'Sunny walk at lunch', 'Kind note from a coworker', 'Cooked a great dinner', 'Slept in a little', 'Good run in cool weather', 'Quiet evening with a book', 'Laughed a lot today', 'My health', 'A productive meeting'];
  const notes = ['Felt focused once I put my phone away.', 'Tired in the afternoon — need earlier bedtime.', 'Great energy after the run.', '', '', 'Busy but good.', ''];
  for (let i = 1; i <= 26; i++) {
    if (rnd() < 0.15) continue;
    const day = addDays(td, -i);
    d.checkins[day] = {
      mood: clamp(Math.round(3.4 + (rnd() - 0.4) * 2.6), 1, 5),
      energy: clamp(Math.round(3 + (rnd() - 0.45) * 3), 1, 5),
      sleep: Math.round((5.5 + rnd() * 3) * 2) / 2,
      water: 3 + Math.floor(rnd() * 6),
      gratitude: [pick(grat), pick(grat), rnd() < 0.6 ? pick(grat) : ''],
      note: pick(notes),
    };
  }

  // finance: last month in full + this month to date
  const curMonth = monthKey(td);
  const prevMonth = monthKey(addMonthsYmd(curMonth + '-01', -1));
  const tx = (date, type, amount, category, note) => { if (date <= td) d.txns.push({ id: uid(), date, type, amount: Math.round(amount * 100) / 100, category, note }); };
  for (const m of [prevMonth, curMonth]) {
    const days = new Date(+m.slice(0, 4), +m.slice(5, 7), 0).getDate();
    const dd = n => `${m}-${pad(n)}`;
    tx(dd(1), 'income', 2400, 'Salary', 'Paycheck');
    tx(dd(15), 'income', 2400, 'Salary', 'Paycheck');
    tx(dd(1), 'expense', 1450, 'Rent', 'Rent');
    tx(dd(3), 'expense', 15.99, 'Subscriptions', 'Streaming');
    tx(dd(3), 'expense', 11.99, 'Subscriptions', 'Music');
    tx(dd(12), 'expense', 118.4, 'Utilities', 'Electric + internet');
    for (let n = 2; n <= days; n += 3 + Math.floor(rnd() * 3)) tx(dd(n), 'expense', 38 + rnd() * 70, 'Groceries', pick(['Grocery store', 'Farmers market', 'Corner shop']));
    for (let n = 4; n <= days; n += 4 + Math.floor(rnd() * 4)) tx(dd(n), 'expense', 14 + rnd() * 48, 'Dining out', pick(['Lunch with team', 'Takeout', 'Brunch', 'Coffee + pastry']));
    for (let n = 5; n <= days; n += 7) tx(dd(n), 'expense', 28 + rnd() * 22, 'Transport', pick(['Gas', 'Transit pass top-up']));
    for (let n = 9; n <= days; n += 9 + Math.floor(rnd() * 6)) tx(dd(n), 'expense', 20 + rnd() * 60, 'Fun', pick(['Movie night', 'Concert tickets', 'Board game', 'Bowling']));
  }
  d.budgets = { Rent: 1450, Groceries: 450, 'Dining out': 180, Transport: 160, Subscriptions: 40, Fun: 150, Utilities: 140 };
  d.savings = [
    { id: uid(), name: 'Emergency fund', target: 9000, saved: 3850 },
    { id: uid(), name: 'Japan trip', target: 4000, saved: 1200 },
  ];

  const note = (kind, title, body, tags, status = '') => d.notes.push({ id: uid(), kind, title, body, tags, status, updatedAt: addDays(td, -Math.floor(rnd() * 10)) });
  note('note', 'Sunday reset checklist', '☐ Review last week (Review tab)\n☐ Pick 3 focus tasks for Monday\n☐ Check budget vs. spending\n☐ Meal plan + grocery list\n☐ Tidy desk, laundry, plants', ['routine']);
  note('book', 'Atomic Habits — James Clear', 'Make it obvious, attractive, easy, satisfying.\nIdentity > outcomes: “I’m a runner”, not “I want to run a 10K”.\nNever miss twice.', ['habits', 'self-improvement'], 'Reading');
  note('book', 'Deep Work — Cal Newport', 'Schedule deep work blocks. Embrace boredom. Quit shallow social media.', ['focus'], 'Finished');
  note('book', 'The Psychology of Money — Morgan Housel', '', ['money'], 'To read');
  note('idea', 'Side project: meal-prep planner', 'Weekly recipes → auto grocery list grouped by aisle. Could share with the running club.', ['side-project']);
  note('note', 'Gift ideas', 'Mom — pottery class\nAlex — trail running vest\nSam — that fountain pen they liked', ['people']);

  const lastWeek = addDays(weekStartOfWith(td, 1), -7);
  d.reviews[lastWeek] = {
    wins: 'Hit 4 of 5 runs. Updated my resume. Stayed under the dining budget.',
    lessons: 'Late screens wreck my sleep — mood dips the next day.',
    focus: 'Protect two deep-work mornings for the Q4 proposal.',
  };
  return d;
}
function weekStartOfWith(s, ws) { const d = parseYmd(s); d.setDate(d.getDate() - (d.getDay() - ws + 7) % 7); return ymd(d); }

let state = load();
const ui = {
  taskFilter: 'today', taskArea: '', weekOffset: 0, goalFilter: 'active',
  journalDate: null, month: null, noteKind: 'all', noteQuery: '', reviewWeek: null,
};

/* ============================================================
   Domain helpers
   ============================================================ */
const PRIORITY_ORDER = { high: 0, med: 1, low: 2 };
const PRIORITY_LABEL = { high: 'High', med: 'Medium', low: 'Low' };
const REPEAT_LABEL = { daily: 'Daily', weekdays: 'Weekdays', weekly: 'Weekly', monthly: 'Monthly' };
const MOODS = ['😞', '🙁', '😐', '🙂', '😄'];
const MOOD_WORD = ['Rough', 'Low', 'Okay', 'Good', 'Great'];

const areaById = id => state.areas.find(a => a.id === id);
const goalById = id => state.goals.find(g => g.id === id);
const taskById = id => state.tasks.find(t => t.id === id);
const habitById = id => state.habits.find(h => h.id === id);

const sortTasks = list => list.slice().sort((a, b) =>
  (a.done - b.done) ||
  ((a.due || '9999') < (b.due || '9999') ? -1 : (a.due || '9999') > (b.due || '9999') ? 1 : 0) ||
  ((PRIORITY_ORDER[a.priority] ?? 3) - (PRIORITY_ORDER[b.priority] ?? 3)) ||
  String(a.createdAt).localeCompare(String(b.createdAt)));

function stepRepeat(s, repeat) {
  if (repeat === 'daily') return addDays(s, 1);
  if (repeat === 'weekly') return addDays(s, 7);
  if (repeat === 'monthly') return addMonthsYmd(s, 1);
  if (repeat === 'weekdays') { let n = addDays(s, 1); while ([0, 6].includes(parseYmd(n).getDay())) n = addDays(n, 1); return n; }
  return s;
}
function nextDue(t) {
  const td = today();
  let n = stepRepeat(t.due || td, t.repeat);
  while (n <= td) n = stepRepeat(n, t.repeat);
  return n;
}

function toggleTask(id) {
  const t = taskById(id); if (!t) return;
  t.done = !t.done;
  t.doneAt = t.done ? today() : null;
  if (t.done && t.repeat && !t.spawned) {
    t.spawned = true;
    state.tasks.push({ ...t, id: uid(), done: false, doneAt: null, spawned: false, due: nextDue(t), createdAt: today() });
    toast(`Done — next one scheduled for ${relDay(nextDue(t))}`);
  }
}

function goalProgress(g) {
  const ts = state.tasks.filter(t => t.goalId === g.id);
  const done = ts.filter(t => t.done).length;
  return { done, total: ts.length, pct: pct(done, ts.length) };
}

function habitStreak(h) {
  let d = today(); if (!h.log[d]) d = addDays(d, -1);
  let n = 0; while (h.log[d]) { n++; d = addDays(d, -1); }
  return n;
}
function habitRate(h, days = 30) {
  const td = today(); let n = 0;
  for (let i = 0; i < days; i++) if (h.log[addDays(td, -i)]) n++;
  return pct(n, days);
}

function checkinStreak() {
  let d = today(); if (!state.checkins[d]) d = addDays(d, -1);
  let n = 0; while (state.checkins[d]) { n++; d = addDays(d, -1); }
  return n;
}

function monthTxns(m) { return state.txns.filter(t => t.date.startsWith(m)); }
function monthTotals(m) {
  const list = monthTxns(m);
  const income = sum(list.filter(t => t.type === 'income').map(t => t.amount));
  const expense = sum(list.filter(t => t.type === 'expense').map(t => t.amount));
  return { income, expense, net: income - expense, list };
}

function money(v, whole = false) {
  try {
    const o = { style: 'currency', currency: state.settings.currency };
    if (whole) { o.minimumFractionDigits = 0; o.maximumFractionDigits = 0; }
    return new Intl.NumberFormat(undefined, o).format(v);
  } catch (e) { return (whole ? Math.round(v) : v.toFixed(2)).toString(); }
}

/* ---------- natural-language quick add ---------- */
const WEEKDAYS = [['sun', 'sunday'], ['mon', 'monday'], ['tue', 'tues', 'tuesday'], ['wed', 'weds', 'wednesday'], ['thu', 'thur', 'thurs', 'thursday'], ['fri', 'friday'], ['sat', 'saturday']];
function findArea(token) {
  const q = token.toLowerCase();
  return state.areas.find(a => a.name.toLowerCase().replace(/\s+/g, '') === q) ||
         state.areas.find(a => a.name.toLowerCase().replace(/\s+/g, '').startsWith(q));
}
function parseQuick(text) {
  const out = { title: '', due: null, priority: null, areaId: null, repeat: null, focus: false };
  const words = text.trim().split(/\s+/).filter(Boolean);
  const keep = [];
  const td = today();
  const setDue = d => { out.due = d; if (['on', 'by', 'due'].includes((keep[keep.length - 1] || '').toLowerCase())) keep.pop(); };
  for (let i = 0; i < words.length; i++) {
    const w = words[i], lw = w.toLowerCase(), nx = (words[i + 1] || '').toLowerCase();
    if (/^!(high|h|1|!!)$/.test(lw) || lw === '!!!') { out.priority = 'high'; continue; }
    if (/^!(med|medium|m|2|!)$/.test(lw)) { out.priority = 'med'; continue; }
    if (/^!(low|l|3)?$/.test(lw)) { out.priority = 'low'; continue; }
    if (w.length > 1 && w[0] === '#') { const a = findArea(w.slice(1)); if (a) { out.areaId = a.id; continue; } }
    if (lw === '*') { out.focus = true; continue; }
    if (lw === 'today' || lw === 'tod' || lw === 'tonight') { setDue(td); continue; }
    if (['tomorrow', 'tmr', 'tmrw'].includes(lw)) { setDue(addDays(td, 1)); continue; }
    if (lw === 'next' && nx === 'week') { setDue(addDays(weekStartOf(td), 7)); i++; continue; }
    if (lw === 'next' && nx === 'month') { setDue(addMonthsYmd(td.slice(0, 7) + '-01', 1)); i++; continue; }
    const wd = WEEKDAYS.findIndex(names => names.includes(lw));
    if (wd >= 0) {
      const prevNext = (keep[keep.length - 1] || '').toLowerCase() === 'next';
      if (prevNext) keep.pop();
      let diff = (wd - parseYmd(td).getDay() + 7) % 7;
      if (prevNext && diff === 0) diff = 7;
      setDue(addDays(td, diff)); continue;
    }
    if (lw === 'in' && /^\d+$/.test(nx) && /^(d|days?|w|wks?|weeks?)$/i.test(words[i + 2] || '')) {
      const n = +nx; const unit = words[i + 2].toLowerCase()[0];
      setDue(addDays(td, unit === 'w' ? n * 7 : n)); i += 2; continue;
    }
    if (isYmd(w)) { setDue(w); continue; }
    if (/^\d{1,2}\/\d{1,2}$/.test(w)) {
      const [m, dd] = w.split('/').map(Number);
      if (m >= 1 && m <= 12 && dd >= 1 && dd <= 31) {
        let cand = `${td.slice(0, 4)}-${pad(m)}-${pad(dd)}`;
        if (cand < td) cand = `${+td.slice(0, 4) + 1}-${pad(m)}-${pad(dd)}`;
        setDue(cand); continue;
      }
    }
    if (lw === 'every' && ['day', 'week', 'month', 'weekday'].includes(nx)) {
      out.repeat = { day: 'daily', week: 'weekly', month: 'monthly', weekday: 'weekdays' }[nx]; i++; continue;
    }
    if (['daily', 'weekly', 'monthly', 'weekdays'].includes(lw)) { out.repeat = lw; continue; }
    keep.push(w);
  }
  out.title = keep.join(' ').trim();
  if (out.repeat && !out.due) out.due = td;
  return out;
}
function addTaskFromText(text, extra = {}) {
  const p = parseQuick(text);
  if (!p.title) return null;
  const t = {
    id: uid(), title: p.title, due: p.due, priority: p.priority, areaId: p.areaId, goalId: null,
    done: false, doneAt: null, focus: p.focus, repeat: p.repeat, notes: '', createdAt: today(),
  };
  for (const [k, v] of Object.entries(extra)) if (v !== undefined && v !== '' && v !== null && (k !== 'due' || !p.due)) t[k] = v;
  if (t.goalId && !t.areaId) t.areaId = goalById(t.goalId)?.areaId || null;
  state.tasks.push(t);
  return t;
}
function previewChips(p) {
  const chips = [];
  if (p.due) chips.push(`<span class="tag ${p.due === today() ? 'due-today' : ''}">📅 ${esc(relDay(p.due))}</span>`);
  if (p.priority) chips.push(`<span class="tag p-${p.priority}">${PRIORITY_LABEL[p.priority]} priority</span>`);
  if (p.areaId) { const a = areaById(p.areaId); chips.push(`<span class="tag">${esc(a.emoji)} ${esc(a.name)}</span>`); }
  if (p.repeat) chips.push(`<span class="tag">🔁 ${REPEAT_LABEL[p.repeat]}</span>`);
  if (p.focus) chips.push(`<span class="tag">★ Focus</span>`);
  return chips.join('');
}

/* ============================================================
   Shared components
   ============================================================ */
function taskItem(t, opts = {}) {
  const area = areaById(t.areaId), goal = goalById(t.goalId);
  const td = today();
  const meta = [];
  if (t.due && !opts.hideDue) {
    const cls = t.done ? '' : t.due < td ? 'due-over' : t.due === td ? 'due-today' : '';
    meta.push(`<span class="tag ${cls}">${t.due < td && !t.done ? 'Overdue · ' : ''}${esc(relDay(t.due))}</span>`);
  }
  if (t.priority && !t.done) meta.push(`<span class="tag p-${t.priority}">${PRIORITY_LABEL[t.priority]}</span>`);
  if (area && !opts.hideArea) meta.push(`<span class="tag">${esc(area.emoji)} ${esc(area.name)}</span>`);
  if (goal && !opts.hideGoal) meta.push(`<span class="tag">🎯 ${esc(goal.title)}</span>`);
  if (t.repeat) meta.push(`<span class="tag">🔁 ${REPEAT_LABEL[t.repeat]}</span>`);
  if (t.notes) meta.push(`<span class="tag" title="${esc(t.notes)}">📝 Note</span>`);
  return `<li class="task ${t.done ? 'done' : ''}" data-id="${t.id}" ${opts.draggable ? 'draggable="true"' : ''}>
    <input type="checkbox" class="check" data-action="toggle-task" data-id="${t.id}" data-key="tk-${t.id}" ${t.done ? 'checked' : ''} aria-label="${t.done ? 'Mark not done' : 'Complete'}: ${esc(t.title)}">
    <div class="body">
      <div class="title">${esc(t.title)}</div>
      ${meta.length ? `<div class="meta-row">${meta.join('')}</div>` : ''}
    </div>
    <div class="actions">
      ${opts.push && !t.done ? `<button type="button" class="icon-btn" data-action="push-task" data-id="${t.id}" data-key="ps-${t.id}" aria-label="Move to next day" title="Move to next day">→</button>` : ''}
      <button type="button" class="star" data-action="focus-task" data-id="${t.id}" data-key="st-${t.id}" aria-pressed="${!!t.focus}" aria-label="${t.focus ? 'Remove from focus' : 'Make a focus task'}" title="Focus">★</button>
      <button type="button" class="icon-btn" data-action="edit-task" data-id="${t.id}" aria-label="Edit task">✎</button>
    </div>
  </li>`;
}
const taskList = (list, opts) => list.length ? `<ul class="task-list">${list.map(t => taskItem(t, opts)).join('')}</ul>` : '';

function taskAddForm({ placeholder = 'Add a task…  try “Pay rent fri !high #money”', due = '', goalId = '', areaId = '', compact = false } = {}) {
  return `<form class="inline-form" data-form="task-add" autocomplete="off">
    <input class="input" name="text" placeholder="${esc(placeholder)}" aria-label="New task">
    <input type="hidden" name="due" value="${esc(due)}"><input type="hidden" name="goalId" value="${esc(goalId)}"><input type="hidden" name="areaId" value="${esc(areaId)}">
    ${compact ? '' : '<button class="btn btn-primary" type="submit">Add</button>'}
  </form>`;
}

function progressBar(p, label, over = false) {
  return `<div class="progress ${over ? 'over' : ''}" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${clamp(p, 0, 100)}" aria-label="${esc(label)}"><span style="width:${clamp(p, 0, 100)}%"></span></div>`;
}

function stat(label, value, hint = '') {
  return `<div class="stat"><div class="label">${esc(label)}</div><div class="value">${value}</div>${hint ? `<div class="hint">${hint}</div>` : ''}</div>`;
}

function chips(group, options, current) {
  return `<div class="chips" role="group">${options.map(([v, l]) =>
    `<button type="button" class="chip" data-action="chip" data-group="${group}" data-v="${esc(v)}" data-key="chip-${group}-${esc(v)}" aria-pressed="${String(current) === String(v)}">${l}</button>`).join('')}</div>`;
}

function areaOptions(sel, emptyLabel = 'No area') {
  return `<option value="">${emptyLabel}</option>` + state.areas.map(a => `<option value="${a.id}" ${a.id === sel ? 'selected' : ''}>${esc(a.emoji)} ${esc(a.name)}</option>`).join('');
}
function goalOptions(sel) {
  return `<option value="">No goal</option>` + state.goals.filter(g => g.status !== 'achieved' || g.id === sel).map(g => `<option value="${g.id}" ${g.id === sel ? 'selected' : ''}>${esc(g.title)}</option>`).join('');
}

/* ---------- daily check-in ---------- */
function checkinCard(date, heading = 'Daily check-in') {
  const c = state.checkins[date] || {};
  const water = c.water || 0;
  const grat = c.gratitude || ['', '', ''];
  return `<section class="card" aria-label="${esc(heading)}">
    <h2>📓 ${esc(heading)} <span class="meta">${esc(date === today() ? 'Today' : fmtDay(date))}</span></h2>
    <div class="checkin-grid">
      <div><div class="small muted" id="mood-l">Mood${c.mood ? ` · ${MOOD_WORD[c.mood - 1]}` : ''}</div>
        <div class="scale" role="group" aria-labelledby="mood-l">${MOODS.map((m, i) =>
          `<button type="button" data-action="ci-set" data-date="${date}" data-field="mood" data-v="${i + 1}" data-key="ci-mood-${i + 1}" aria-pressed="${c.mood === i + 1}" aria-label="${MOOD_WORD[i]}">${m}</button>`).join('')}</div></div>
      <div><div class="small muted" id="energy-l">Energy</div>
        <div class="scale" role="group" aria-labelledby="energy-l">${[1, 2, 3, 4, 5].map(n =>
          `<button type="button" data-action="ci-set" data-date="${date}" data-field="energy" data-v="${n}" data-key="ci-energy-${n}" aria-pressed="${c.energy === n}" aria-label="Energy ${n} of 5" style="font-size:15px;font-weight:700">${n}</button>`).join('')}</div></div>
      <div class="form-row">
        <div><div class="small muted">Sleep</div>
          <div class="stepper">
            <button type="button" class="btn btn-sm" data-action="ci-step" data-date="${date}" data-field="sleep" data-step="-0.5" data-key="ci-sleep-dn" aria-label="Less sleep">−</button>
            <output>${c.sleep != null ? c.sleep + 'h' : '—'}</output>
            <button type="button" class="btn btn-sm" data-action="ci-step" data-date="${date}" data-field="sleep" data-step="0.5" data-key="ci-sleep-up" aria-label="More sleep">+</button>
          </div></div>
        <div><div class="small muted">Water · ${water} glass${water === 1 ? '' : 'es'}</div>
          <div class="water">${Array.from({ length: 8 }, (_, i) =>
            `<button type="button" class="${i < water ? 'on' : ''}" data-action="ci-water" data-date="${date}" data-v="${i + 1}" data-key="ci-water-${i + 1}" aria-label="${i + 1} glasses"></button>`).join('')}</div></div>
      </div>
      <div><div class="small muted">Three good things</div>
        <div class="stack" style="gap:6px">${[0, 1, 2].map(i =>
          `<input class="input" data-ci="gratitude" data-i="${i}" data-date="${date}" value="${esc(grat[i] || '')}" placeholder="${['Something that made me smile…', 'Someone I’m thankful for…', 'A small win…'][i]}" aria-label="Gratitude ${i + 1}">`).join('')}</div></div>
      <label class="field">Notes
        <textarea class="input" data-ci="note" data-date="${date}" rows="3" placeholder="How did today go? What’s on your mind?">${esc(c.note || '')}</textarea></label>
    </div>
  </section>`;
}
function ensureCheckin(date) { return state.checkins[date] || (state.checkins[date] = { gratitude: ['', '', ''] }); }

/* ============================================================
   Charts (hand-rolled SVG, drawn after layout at real width)
   ============================================================ */
const chartSpecs = {};
function chartSlot(id, spec) {
  chartSpecs[id] = spec;
  return `<div class="chart-box" data-chart="${id}" style="min-height:${spec.height || 170}px" role="img" aria-label="${esc(spec.aria)}"></div>`;
}
function drawCharts() {
  $$('[data-chart]').forEach(el => {
    const spec = chartSpecs[el.dataset.chart]; if (!spec) return;
    const w = Math.max(240, Math.floor(el.clientWidth));
    el.innerHTML = spec.type === 'bar' ? barSvg(spec, w) : lineSvg(spec, w);
  });
}
function frame(spec, w) {
  const H = spec.height || 170, padL = 40, padR = 12, padT = 10, padB = 24;
  const iw = w - padL - padR, ih = H - padT - padB;
  const y = v => padT + ih - ((v - spec.yMin) / (spec.yMax - spec.yMin || 1)) * ih;
  const grid = spec.ticks.map(t => `<line class="grid-line" x1="${padL}" x2="${w - padR}" y1="${y(t)}" y2="${y(t)}"/><text class="axis-label" x="${padL - 8}" y="${y(t) + 4}" text-anchor="end">${esc(spec.tickFmt ? spec.tickFmt(t) : t)}</text>`).join('');
  return { H, padL, padR, padT, padB, iw, ih, y, grid };
}
function xLabels(spec, xs, H) {
  return spec.short.map((s, i) => s ? `<text class="axis-label" x="${xs(i)}" y="${H - 6}" text-anchor="middle">${esc(s)}</text>` : '').join('');
}
function lineSvg(spec, w) {
  const f = frame(spec, w), n = spec.values.length;
  const x = i => f.padL + (n === 1 ? f.iw / 2 : (i * f.iw) / (n - 1));
  let d = '', pen = false;
  spec.values.forEach((v, i) => { if (v == null) { pen = false; return; } d += `${pen ? 'L' : 'M'}${x(i).toFixed(1)},${f.y(v).toFixed(1)}`; pen = true; });
  const dots = spec.values.map((v, i) => v == null ? '' : `<circle class="dot" cx="${x(i)}" cy="${f.y(v)}" r="4"/>`).join('');
  const colW = n > 1 ? f.iw / (n - 1) : f.iw;
  const hits = spec.values.map((v, i) => `<g class="col"><line class="cross" x1="${x(i)}" x2="${x(i)}" y1="${f.padT}" y2="${f.padT + f.ih}"/><rect class="hit" x="${x(i) - colW / 2}" y="0" width="${colW}" height="${f.H}" data-tip="${esc(spec.labels[i])}: ${esc(v == null ? 'no entry' : spec.fmt(v))}"/></g>`).join('');
  return `<svg class="chart" width="${w}" height="${f.H}" viewBox="0 0 ${w} ${f.H}">${f.grid}${xLabels(spec, x, f.H)}<path class="series" d="${d}"/>${dots}${hits}</svg>`;
}
function topRound(x, y, w, h, r) {
  r = Math.min(r, w / 2, h);
  return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`;
}
function barSvg(spec, w) {
  const f = frame(spec, w), n = spec.values.length, band = f.iw / n;
  const x = i => f.padL + band * i + band / 2;
  const bars = spec.values.map((v, i) => {
    const top = v > 0 ? Math.min(f.y(v), f.padT + f.ih - 2) : f.padT + f.ih;
    const bw = Math.max(2, band - 2);
    const bar = v > 0 ? `<path d="${topRound(x(i) - bw / 2, top, bw, f.padT + f.ih - top, 4)}" fill="var(--brand)"/>` : '';
    return `<g class="col">${bar}<rect class="hit" x="${f.padL + band * i}" y="0" width="${band}" height="${f.H}" data-tip="${esc(spec.labels[i])}: ${esc(spec.fmt(v))}"/></g>`;
  }).join('');
  return `<svg class="chart" width="${w}" height="${f.H}" viewBox="0 0 ${w} ${f.H}">${f.grid}${xLabels(spec, x, f.H)}${bars}</svg>`;
}
function niceMax(v) {
  if (v <= 0) return 10;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / mag;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * mag;
}
function tableView(caption, rows, headers) {
  return `<details class="more"><summary>View as table</summary><div class="table-wrap"><table class="data"><caption class="sr-only">${esc(caption)}</caption>
    <thead><tr>${headers.map((h, i) => `<th class="${i ? 'num' : ''}">${esc(h)}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(r => `<tr>${r.map((c, i) => `<td class="${i ? 'num' : ''}">${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></details>`;
}

/* ============================================================
   Views
   ============================================================ */
function pageHead(title, sub, actions = '') {
  return `<header class="page-head"><div><h1>${title}</h1>${sub ? `<p class="sub">${sub}</p>` : ''}</div>${actions ? `<div class="head-actions">${actions}</div>` : ''}</header>`;
}

/* ---------- Today ---------- */
function viewToday() {
  const td = today();
  const h = new Date().getHours();
  const greet = h < 5 ? 'Good evening' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  const name = state.settings.name ? `, ${esc(state.settings.name)}` : '';

  const focus = sortTasks(state.tasks.filter(t => t.focus && (!t.done || t.doneAt === td)));
  const dueList = sortTasks(state.tasks.filter(t => !t.focus && ((!t.done && t.due && t.due <= td) || (t.done && t.doneAt === td))));
  const doneToday = state.tasks.filter(t => t.done && t.doneAt === td).length;
  const left = state.tasks.filter(t => !t.done && t.due && t.due <= td).length;

  const habitsDone = state.habits.filter(hb => hb.log[td]).length;
  const moods = [];
  for (let i = 0; i < 7; i++) { const c = state.checkins[addDays(td, -i)]; if (c?.mood) moods.push(c.mood); }
  const moodAvg = avg(moods);
  const m = monthKey(td), totals = monthTotals(m);
  const budgetTotal = sum(Object.values(state.budgets));
  const budgetExp = sum(totals.list.filter(t => t.type === 'expense' && state.budgets[t.category] != null).map(t => t.amount));

  const activeGoals = state.goals.filter(g => g.status === 'active');

  return `
  ${pageHead(`${greet}${name}`, esc(fmtLong(td)), `<button class="btn" type="button" data-action="quick-add">＋ Quick add</button>`)}
  ${state.meta.sample ? `<div class="welcome"><p><strong>Welcome!</strong> This is sample data so you can see how goals, tasks, habits and money connect. Explore, then start fresh when you’re ready.</p>
    <button class="btn btn-sm" type="button" data-action="keep-sample">Keep sample data</button>
    <button class="btn btn-primary btn-sm" type="button" data-action="clear-sample">Start fresh</button></div>` : ''}
  <div class="stats">
    ${stat('Tasks today', `${doneToday}<span class="muted" style="font-size:16px"> done</span>`, `${left} still to do`)}
    ${stat('Habits', `${habitsDone}/${state.habits.length}`, 'done today')}
    ${stat('Mood · 7 days', moodAvg ? `${MOODS[Math.round(moodAvg) - 1]} ${moodAvg.toFixed(1)}` : '—', moods.length ? `${moods.length} check-ins` : 'No check-ins yet')}
    ${stat('Spent this month', money(totals.expense, true), budgetTotal ? `${pct(budgetExp, budgetTotal)}% of budgeted ${money(budgetTotal, true)}` : 'No budget set')}
  </div>
  <div class="grid grid-today">
    <div class="stack">
      <section class="card">
        <h2>★ Today’s focus <span class="meta">${focus.filter(t => !t.done).length} open</span></h2>
        ${focus.length ? taskList(focus) : `<p class="empty">Star up to three tasks that would make today a win. ★</p>`}
        ${focus.filter(t => !t.done).length > 3 ? `<p class="hint">Tip: more than 3 focus tasks usually means none of them is the focus.</p>` : ''}
      </section>
      <section class="card">
        <h2>✅ Due today & overdue <span class="meta"><a href="#/tasks">All tasks →</a></span></h2>
        ${dueList.length ? taskList(dueList) : `<p class="empty">Nothing due. Nice. 🎉</p>`}
        <div style="margin-top:10px">${taskAddForm({ due: td, placeholder: 'Add a task for today…' })}</div>
      </section>
      <section class="card">
        <h2>🔁 Habits <span class="meta"><a href="#/habits">Details →</a></span></h2>
        ${state.habits.length ? state.habits.map(hb => {
          const on = !!hb.log[td]; const s = habitStreak(hb);
          return `<div class="habit-row" style="grid-template-columns:auto 1fr auto">
            <button type="button" class="day-dot ${on ? 'on' : ''}" style="width:36px;height:36px;font-size:16px" data-action="toggle-habit" data-id="${hb.id}" data-day="${td}" data-key="hb-${hb.id}-${td}" aria-pressed="${on}" aria-label="${esc(hb.name)} today">${on ? '✓' : esc(hb.emoji)}</button>
            <div class="habit-name">${esc(hb.name)}</div>
            <div class="streak">${s ? `🔥 ${s} day${s === 1 ? '' : 's'}` : '<span class="muted">Start a streak</span>'}</div></div>`;
        }).join('') : `<p class="empty">No habits yet. <a href="#/habits">Add one →</a></p>`}
      </section>
    </div>
    <div class="stack">
      ${checkinCard(td)}
      <section class="card">
        <h2>🎯 Goals <span class="meta"><a href="#/goals">All goals →</a></span></h2>
        ${activeGoals.length ? activeGoals.slice(0, 4).map(g => {
          const p = goalProgress(g);
          return `<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;gap:8px"><strong style="font-size:14px">${esc(g.title)}</strong></div>
            ${progressBar(p.pct, g.title)}<div class="progress-label"><span>${p.done}/${p.total} tasks</span><span>${p.pct}%</span></div></div>`;
        }).join('') : `<p class="empty">Set a goal and link tasks to it — progress fills in automatically.</p>`}
      </section>
      <section class="card">
        <h2>💰 ${esc(fmtMonth(m))} <span class="meta"><a href="#/finance">Money →</a></span></h2>
        <div class="form-row" style="margin-bottom:6px">
          <div><div class="small muted">Income</div><strong>${money(totals.income, true)}</strong></div>
          <div><div class="small muted">Spent</div><strong>${money(totals.expense, true)}</strong></div>
          <div><div class="small muted">Net</div><strong class="${totals.net >= 0 ? 'pos' : 'neg'}">${money(totals.net, true)}</strong></div>
        </div>
        ${budgetTotal ? `${progressBar(pct(budgetExp, budgetTotal), 'Budget used', budgetExp > budgetTotal)}<div class="progress-label"><span>Budget used</span><span>${money(budgetExp, true)} / ${money(budgetTotal, true)}</span></div>` : ''}
        <div style="margin-top:12px"><button class="btn btn-sm" type="button" data-action="quick-add" data-tab="money">＋ Log expense</button></div>
      </section>
    </div>
  </div>`;
}

/* ---------- Tasks ---------- */
function viewTasks() {
  const td = today();
  let list = state.tasks.filter(t => !ui.taskArea || t.areaId === ui.taskArea);
  const groups = [];
  const open = list.filter(t => !t.done);
  const f = ui.taskFilter;
  if (f === 'today' || f === 'all') {
    groups.push(['Overdue', open.filter(t => t.due && t.due < td)]);
    groups.push(['Today', open.filter(t => t.due === td)]);
  }
  if (f === 'upcoming' || f === 'all') {
    const up = sortTasks(open.filter(t => t.due && t.due > td));
    const byDay = {};
    up.forEach(t => (byDay[t.due] = byDay[t.due] || []).push(t));
    Object.keys(byDay).sort().forEach(d => groups.push([`${relDay(d)} · ${fmtShort(d)}`, byDay[d]]));
  }
  if (f === 'anytime' || f === 'all') groups.push(['No date', open.filter(t => !t.due)]);
  if (f === 'done') {
    const done = list.filter(t => t.done).sort((a, b) => String(b.doneAt).localeCompare(String(a.doneAt))).slice(0, 150);
    const byDay = {};
    done.forEach(t => (byDay[t.doneAt || '—'] = byDay[t.doneAt || '—'] || []).push(t));
    Object.keys(byDay).sort().reverse().forEach(d => groups.push([d === '—' ? 'Completed' : `Completed ${relDay(d)}`, byDay[d]]));
  }
  const body = groups.filter(([, ts]) => ts.length).map(([title, ts]) =>
    `<h3>${esc(title)} <span class="muted small">${ts.length}</span></h3>${taskList(f === 'done' ? ts : sortTasks(ts), { hideDue: title === 'Today' })}`).join('');
  const empties = { today: 'Nothing due today. Pick something from Upcoming, or enjoy it.', upcoming: 'Nothing scheduled ahead.', anytime: 'No undated tasks.', all: 'No open tasks — add one above.', done: 'Nothing completed yet.' };

  return `
  ${pageHead('Tasks', 'Everything you need to do, in one list.', `<button class="btn btn-primary" type="button" data-action="quick-add">＋ New task</button>`)}
  <section class="card">
    ${taskAddForm()}
    <p class="hint" style="margin:8px 0 0">Shortcuts: <strong>today</strong>, <strong>tomorrow</strong>, <strong>fri</strong>, <strong>in 3 days</strong>, <strong>10/24</strong> · <strong>!high</strong> <strong>!med</strong> <strong>!low</strong> · <strong>#area</strong> · <strong>every week</strong> · <strong>*</strong> = focus</p>
  </section>
  <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:16px 0">
    ${chips('taskFilter', [['today', 'Today'], ['upcoming', 'Upcoming'], ['anytime', 'Anytime'], ['all', 'All open'], ['done', 'Done']], f)}
    <select class="input" style="width:auto" data-ui="taskArea" aria-label="Filter by area">${areaOptions(ui.taskArea, 'All areas')}</select>
    ${f === 'done' && list.some(t => t.done) ? `<button class="btn btn-sm btn-danger" type="button" data-action="clear-done">Clear completed</button>` : ''}
  </div>
  <section class="card">${body || `<p class="empty">${empties[f]}</p>`}</section>`;
}

/* ---------- Week ---------- */
function viewWeek() {
  const td = today();
  const ws = addDays(weekStartOf(td), ui.weekOffset * 7);
  const days = Array.from({ length: 7 }, (_, i) => addDays(ws, i));
  const unscheduled = sortTasks(state.tasks.filter(t => !t.done && !t.due));
  return `
  ${pageHead('Week', `${esc(fmt(ws, { month: 'long', day: 'numeric' }))} – ${esc(fmt(days[6], { month: 'long', day: 'numeric', year: 'numeric' }))}`,
    `<button class="btn" type="button" data-action="week" data-v="-1" aria-label="Previous week">‹</button>
     <button class="btn" type="button" data-action="week" data-v="0">This week</button>
     <button class="btn" type="button" data-action="week" data-v="1" aria-label="Next week">›</button>`)}
  <p class="hint" style="margin-top:-8px">Drag tasks between days to reschedule, or use → to push a task to the next day.</p>
  <div class="week">
    ${days.map(d => {
      const ts = sortTasks(state.tasks.filter(t => t.due === d || (!t.due && t.done && t.doneAt === d)));
      const ci = state.checkins[d];
      return `<section class="day-col ${d === td ? 'today' : ''}" data-day="${d}" aria-label="${esc(fmtLong(d))}">
        <h3><span>${esc(fmt(d, { weekday: 'short' }))}${ci?.mood ? ` ${MOODS[ci.mood - 1]}` : ''}</span><span class="num">${parseYmd(d).getDate()}</span></h3>
        ${taskList(ts, { draggable: true, hideDue: true, hideArea: true, hideGoal: true, push: true }) || '<p class="empty small">Free</p>'}
        <div class="add-day">${taskAddForm({ due: d, placeholder: '+ Add', compact: true })}</div>
      </section>`;
    }).join('')}
  </div>
  <section class="card day-col" data-day="" style="min-height:0;margin-top:16px">
    <h2>📥 Unscheduled <span class="meta">drag onto a day</span></h2>
    ${taskList(unscheduled, { draggable: true, push: false }) || '<p class="empty">Everything has a date.</p>'}
  </section>`;
}

/* ---------- Goals ---------- */
function goalCard(g) {
  const p = goalProgress(g);
  const td = today();
  const left = g.target ? daysBetween(td, g.target) : null;
  const habits = state.habits.filter(hb => hb.goalId === g.id);
  const tasks = sortTasks(state.tasks.filter(t => t.goalId === g.id));
  const openCount = tasks.filter(t => !t.done).length;
  return `<article class="card goal ${g.status === 'achieved' ? 'achieved' : ''}">
    <div style="display:flex;gap:8px;align-items:flex-start">
      <h3 class="goal-title" style="flex:1">${g.status === 'achieved' ? '🏆 ' : ''}${esc(g.title)}</h3>
      <button type="button" class="icon-btn" data-action="edit-goal" data-id="${g.id}" aria-label="Edit goal">✎</button>
    </div>
    <div class="meta-row" style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px">
      ${g.status !== 'active' ? `<span class="tag">${g.status === 'achieved' ? 'Achieved' : 'Paused'}</span>` : ''}
      ${g.target && g.status === 'active' ? `<span class="tag ${left < 0 ? 'due-over' : ''}">${left < 0 ? `${-left} days past target` : left === 0 ? 'Target is today' : `${left} days left`}</span>` : ''}
      ${g.target ? `<span class="tag">📅 ${esc(fmt(g.target, { month: 'short', day: 'numeric', year: 'numeric' }))}</span>` : ''}
    </div>
    ${g.why ? `<p class="why">“${esc(g.why)}”</p>` : ''}
    ${progressBar(p.pct, `${g.title} progress`)}
    <div class="progress-label"><span>${p.total ? `${p.done} of ${p.total} tasks done` : 'Add tasks to track progress'}</span><span>${p.pct}%</span></div>
    ${habits.length ? `<div style="margin-top:10px" class="small">${habits.map(hb => `<div>${esc(hb.emoji)} ${esc(hb.name)} · <strong>${habitRate(hb)}%</strong> <span class="muted">last 30 days</span></div>`).join('')}</div>` : ''}
    ${g.status === 'active' && p.total && p.done === p.total ? `<button class="btn btn-sm btn-primary" type="button" style="margin-top:10px" data-action="goal-achieve" data-id="${g.id}">🏆 Mark achieved</button>` : ''}
    <details class="more" ${ui.openGoal === g.id ? 'open' : ''} data-goal="${g.id}"><summary>Tasks · ${openCount} open</summary>
      ${taskList(tasks, { hideGoal: true, hideArea: true })}
      <div style="margin-top:8px">${taskAddForm({ goalId: g.id, areaId: g.areaId || '', placeholder: 'Add a step toward this goal…', compact: true })}</div>
    </details>
  </article>`;
}
function viewGoals() {
  const f = ui.goalFilter;
  const goals = state.goals.filter(g => f === 'all' || g.status === f || (f === 'active' && g.status === 'paused'));
  const groups = state.areas.map(a => [a, goals.filter(g => g.areaId === a.id)]);
  groups.push([{ id: '', name: 'Other', emoji: '•' }, goals.filter(g => !areaById(g.areaId))]);
  const body = groups.filter(([, gs]) => gs.length).map(([a, gs]) =>
    `<section class="area-block"><h2 class="area-title">${esc(a.emoji)} ${esc(a.name)}</h2><div class="goal-grid">${gs.map(goalCard).join('')}</div></section>`).join('');
  return `
  ${pageHead('Goals', 'Life areas → goals → the tasks and habits that get you there.', `<button class="btn btn-primary" type="button" data-action="new-goal">＋ New goal</button>`)}
  <div style="margin-bottom:16px">${chips('goalFilter', [['active', 'In progress'], ['achieved', 'Achieved'], ['all', 'All']], f)}</div>
  ${body || `<section class="card"><p class="empty">${f === 'achieved' ? 'No achieved goals yet — they’ll collect here.' : 'No goals yet. What would make this year great?'}</p></section>`}`;
}

/* ---------- Habits ---------- */
function viewHabits() {
  const td = today();
  const days = Array.from({ length: 7 }, (_, i) => addDays(td, i - 6));
  const done = state.habits.filter(h => h.log[td]).length;
  const best = state.habits.reduce((b, h) => Math.max(b, habitStreak(h)), 0);
  const rate = state.habits.length ? Math.round(avg(state.habits.map(h => habitRate(h)))) : 0;

  const hs = addDays(weekStartOf(td), -77);
  const heatDays = Array.from({ length: 84 }, (_, i) => addDays(hs, i));

  return `
  ${pageHead('Habits', 'Small things, done often. Streaks and stats update automatically.', `<button class="btn btn-primary" type="button" data-action="new-habit">＋ New habit</button>`)}
  <div class="stats">
    ${stat('Done today', `${done}/${state.habits.length}`)}
    ${stat('Best current streak', `${best} day${best === 1 ? '' : 's'}`)}
    ${stat('30-day consistency', `${rate}%`, 'average across habits')}
  </div>
  <section class="card">
    <h2>Last 7 days</h2>
    ${state.habits.length ? state.habits.map(h => {
      const s = habitStreak(h); const goal = goalById(h.goalId);
      return `<div class="habit-row">
        <div class="habit-name">${esc(h.emoji)} ${esc(h.name)} <button type="button" class="icon-btn" data-action="edit-habit" data-id="${h.id}" aria-label="Edit habit">✎</button>
          ${goal ? `<div class="small muted">🎯 ${esc(goal.title)}</div>` : ''}</div>
        <div class="days" role="group" aria-label="${esc(h.name)}, last 7 days">${days.map(d => {
          const on = !!h.log[d];
          return `<button type="button" class="day-dot ${on ? 'on' : ''} ${d === td ? 'is-today' : ''}" data-action="toggle-habit" data-id="${h.id}" data-day="${d}" data-key="hb-${h.id}-${d}" aria-pressed="${on}" aria-label="${esc(fmtDay(d))}" data-tip="${esc(fmtDay(d))}: ${on ? 'done' : 'not done'}">${esc(fmt(d, { weekday: 'narrow' }))}</button>`;
        }).join('')}</div>
        <div class="streak">${s ? `🔥 ${s}` : '—'} streak<br><span class="muted">${habitRate(h)}% · 30d</span></div>
      </div>`;
    }).join('') : `<p class="empty">No habits yet. Start with one tiny habit you can do even on a bad day.</p>`}
  </section>
  ${state.habits.length ? `<section class="card" style="margin-top:16px">
    <h2>Last 12 weeks</h2>
    <div class="stack">${state.habits.map(h => `<div><div class="small" style="font-weight:600;margin-bottom:4px">${esc(h.emoji)} ${esc(h.name)}</div>
      <div class="heat" aria-label="${esc(h.name)} history">${heatDays.map(d => d > td ? '<i class="future"></i>' : `<i class="${h.log[d] ? 'l1' : ''}" data-tip="${esc(fmtDay(d))}: ${h.log[d] ? 'done' : 'not done'}"></i>`).join('')}</div></div>`).join('')}</div>
    <div class="legend"><i style="background:var(--seq-0)"></i> Not done <i style="background:var(--seq-4);margin-left:8px"></i> Done</div>
  </section>` : ''}`;
}

/* ---------- Journal ---------- */
function viewJournal() {
  const td = today();
  const date = ui.journalDate || td;
  const days = Array.from({ length: 30 }, (_, i) => addDays(td, i - 29));
  const moods = days.map(d => state.checkins[d]?.mood ?? null);
  const sleeps = days.map(d => state.checkins[d]?.sleep ?? null);
  const moodAvg = avg(moods.filter(v => v != null));
  const sleepAvg = avg(sleeps.filter(v => v != null));
  const short = days.map((d, i) => (i % 7 === 2 || i === 29) ? fmtShort(d) : '');
  const labels = days.map(fmtDay);
  const entries = Object.keys(state.checkins).sort().reverse().filter(d => {
    const c = state.checkins[d]; return c.mood || c.note || (c.gratitude || []).some(Boolean);
  }).slice(0, 30);
  const maxSleep = Math.max(10, ...sleeps.filter(v => v != null));

  return `
  ${pageHead('Journal', 'Daily check-ins: mood, energy, sleep, gratitude.', '')}
  <div class="stats">
    ${stat('Mood · 30 days', moodAvg ? `${MOODS[Math.round(moodAvg) - 1]} ${moodAvg.toFixed(1)}` : '—', 'out of 5')}
    ${stat('Avg sleep', sleepAvg ? `${sleepAvg.toFixed(1)}h` : '—', 'last 30 days')}
    ${stat('Check-in streak', `${checkinStreak()} days`)}
  </div>
  <div class="grid grid-2">
    <div class="stack">
      <div style="display:flex;gap:8px;align-items:center">
        <button class="btn btn-sm" type="button" data-action="jdate" data-v="-1" aria-label="Previous day">‹</button>
        <input class="input" type="date" style="width:auto" data-ui="journalDate" value="${date}" max="${td}" aria-label="Check-in date">
        <button class="btn btn-sm" type="button" data-action="jdate" data-v="1" aria-label="Next day" ${date >= td ? 'disabled' : ''}>›</button>
        ${date !== td ? `<button class="btn btn-sm btn-ghost" type="button" data-action="jdate" data-v="0">Today</button>` : ''}
      </div>
      ${checkinCard(date, date === td ? 'Today’s check-in' : 'Check-in')}
    </div>
    <div class="stack">
      <section class="card"><h2>Mood · last 30 days</h2>
        ${chartSlot('mood', { type: 'line', aria: 'Mood over the last 30 days, scale 1 to 5', values: moods, labels, short, yMin: 1, yMax: 5, ticks: [1, 2, 3, 4, 5], tickFmt: v => MOODS[v - 1], fmt: v => `${MOODS[v - 1]} ${MOOD_WORD[v - 1]}`, height: 180 })}
        ${tableView('Mood by day', days.map((d, i) => [fmtDay(d), moods[i] ? `${moods[i]} · ${MOOD_WORD[moods[i] - 1]}` : '—']).reverse(), ['Day', 'Mood'])}
      </section>
      <section class="card"><h2>Sleep · last 30 days</h2>
        ${chartSlot('sleep', { type: 'line', aria: 'Hours of sleep over the last 30 days', values: sleeps, labels, short, yMin: 0, yMax: maxSleep, ticks: [0, 4, 8, ...(maxSleep > 10 ? [12] : [])].filter(t => t <= maxSleep), tickFmt: v => `${v}h`, fmt: v => `${v}h`, height: 150 })}
      </section>
    </div>
  </div>
  <section class="card" style="margin-top:16px">
    <h2>Recent entries</h2>
    ${entries.length ? entries.map(d => {
      const c = state.checkins[d]; const g = (c.gratitude || []).filter(Boolean);
      return `<div style="padding:10px 0;border-bottom:1px solid var(--line-soft)">
        <div style="display:flex;gap:8px;align-items:center"><strong>${esc(fmtDay(d))}</strong>${c.mood ? `<span>${MOODS[c.mood - 1]}</span>` : ''}
          ${c.sleep != null ? `<span class="tag">😴 ${c.sleep}h</span>` : ''}${c.energy ? `<span class="tag">⚡ ${c.energy}/5</span>` : ''}
          <button class="btn btn-ghost btn-sm" style="margin-left:auto" type="button" data-action="jdate-set" data-v="${d}">Open</button></div>
        ${g.length ? `<div class="small muted">🙏 ${g.map(esc).join(' · ')}</div>` : ''}
        ${c.note ? `<div class="small" style="white-space:pre-wrap">${esc(c.note)}</div>` : ''}
      </div>`;
    }).join('') : '<p class="empty">Your check-ins will appear here.</p>'}
  </section>`;
}

/* ---------- Finance ---------- */
function viewFinance() {
  const td = today();
  const m = ui.month || monthKey(td);
  const { income, expense, net, list } = monthTotals(m);
  const expenses = list.filter(t => t.type === 'expense');
  const byCat = {};
  expenses.forEach(t => byCat[t.category] = (byCat[t.category] || 0) + t.amount);
  const cats = Array.from(new Set([...Object.keys(state.budgets), ...Object.keys(byCat)]))
    .sort((a, b) => (state.budgets[b] || 0) - (state.budgets[a] || 0) || (byCat[b] || 0) - (byCat[a] || 0));
  const daysIn = new Date(+m.slice(0, 4), +m.slice(5, 7), 0).getDate();
  const dayList = Array.from({ length: daysIn }, (_, i) => `${m}-${pad(i + 1)}`);
  const daily = dayList.map(d => sum(expenses.filter(t => t.date === d).map(t => t.amount)));
  const maxDaily = niceMax(Math.max(...daily));
  const allCats = Array.from(new Set([...Object.keys(state.budgets), ...state.txns.map(t => t.category)])).sort();
  const sorted = list.slice().sort((a, b) => b.date.localeCompare(a.date));
  const isCur = m === monthKey(td);
  const rate = income ? Math.round((net / income) * 100) : null;

  return `
  ${pageHead('Money', esc(fmtMonth(m)),
    `<button class="btn" type="button" data-action="month" data-v="-1" aria-label="Previous month">‹</button>
     ${isCur ? '' : '<button class="btn" type="button" data-action="month" data-v="0">This month</button>'}
     <button class="btn" type="button" data-action="month" data-v="1" aria-label="Next month">›</button>`)}
  <div class="stats">
    ${stat('Income', money(income))}
    ${stat('Spent', money(expense))}
    ${stat('Net', `<span class="${net >= 0 ? 'pos' : 'neg'}">${money(net)}</span>`)}
    ${stat('Savings rate', rate == null ? '—' : `${rate}%`, 'net ÷ income')}
  </div>
  <div class="grid grid-2">
    <section class="card">
      <h2>Budget <span class="meta"><button class="btn btn-sm" type="button" data-action="edit-budget">Edit budget</button></span></h2>
      ${cats.length ? cats.map(c => {
        const spent = byCat[c] || 0, lim = state.budgets[c];
        const over = lim != null && spent > lim;
        return `<div class="budget-row"><div class="top"><span>${esc(c)} ${over ? `<span class="over-flag">⚠ Over by ${money(spent - lim, true)}</span>` : ''}</span>
          <span class="amt">${money(spent, true)}${lim != null ? ` / ${money(lim, true)}` : ' · no budget'}</span></div>
          ${lim != null ? progressBar(pct(spent, lim), `${c} budget`, over) : ''}</div>`;
      }).join('') : '<p class="empty">Set monthly limits per category to see where your money goes.</p>'}
    </section>
    <section class="card">
      <h2>Daily spending</h2>
      ${chartSlot('spend', { type: 'bar', aria: `Spending per day in ${fmtMonth(m)}`, values: daily, labels: dayList.map(fmtDay), short: dayList.map((d, i) => (i === 0 || (i + 1) % 7 === 0) ? String(i + 1) : ''), yMin: 0, yMax: maxDaily, ticks: [0, maxDaily / 2, maxDaily], tickFmt: v => money(v, true), fmt: v => money(v), height: 190 })}
      ${tableView('Spending by category', cats.filter(c => byCat[c]).map(c => [c, money(byCat[c])]), ['Category', 'Spent'])}
      <h3>Savings goals</h3>
      ${state.savings.map(s => `<div class="budget-row"><div class="top"><span>${esc(s.name)} <button type="button" class="icon-btn" data-action="edit-saving" data-id="${s.id}" aria-label="Edit savings goal">✎</button></span>
        <span class="amt">${money(s.saved, true)} / ${money(s.target, true)}</span></div>
        ${progressBar(pct(s.saved, s.target), s.name)}
        <div class="progress-label"><span>${pct(s.saved, s.target)}%</span><button class="btn btn-sm btn-ghost" type="button" data-action="add-saving" data-id="${s.id}">＋ Add money</button></div></div>`).join('') || '<p class="empty">No savings goals yet.</p>'}
      <button class="btn btn-sm" type="button" data-action="new-saving" style="margin-top:8px">＋ New savings goal</button>
    </section>
  </div>
  <section class="card" style="margin-top:16px">
    <h2>Transactions <span class="meta">${list.length}</span></h2>
    <form class="form-row" data-form="txn-add" autocomplete="off" style="align-items:end;margin-bottom:12px">
      <label class="field">Type<select class="input" name="type"><option value="expense">Expense</option><option value="income">Income</option></select></label>
      <label class="field">Amount<input class="input" name="amount" type="number" step="0.01" min="0" required inputmode="decimal" placeholder="0.00"></label>
      <label class="field">Category<input class="input" name="category" list="cat-list" required placeholder="Groceries"></label>
      <label class="field">Date<input class="input" name="date" type="date" value="${isCur ? td : m + '-01'}" required></label>
      <label class="field">Note<input class="input" name="note" placeholder="Optional"></label>
      <button class="btn btn-primary" type="submit" style="justify-content:center">Add</button>
    </form>
    <datalist id="cat-list">${allCats.map(c => `<option value="${esc(c)}">`).join('')}</datalist>
    ${sorted.length ? `<div class="table-wrap"><table class="data"><thead><tr><th>Date</th><th>Category</th><th>Note</th><th class="num">Amount</th><th><span class="sr-only">Actions</span></th></tr></thead><tbody>
      ${sorted.map(t => `<tr><td style="white-space:nowrap">${esc(fmtShort(t.date))}</td><td>${esc(t.category)}</td><td class="muted">${esc(t.note || '')}</td>
        <td class="num ${t.type === 'income' ? 'pos' : ''}">${t.type === 'income' ? '+' : '−'}${money(t.amount)}</td>
        <td class="num"><button type="button" class="icon-btn" data-action="delete-txn" data-id="${t.id}" aria-label="Delete transaction">✕</button></td></tr>`).join('')}
    </tbody></table></div>` : '<p class="empty">No transactions this month.</p>'}
  </section>`;
}

/* ---------- Notes ---------- */
function noteResults() {
  const q = ui.noteQuery.trim().toLowerCase();
  const notes = state.notes.filter(n => (ui.noteKind === 'all' || n.kind === ui.noteKind) &&
    (!q || [n.title, n.body, ...(n.tags || [])].join(' ').toLowerCase().includes(q)))
    .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
  const icon = { note: '📝', book: '📚', idea: '💡' };
  return notes.length ? `<div class="note-grid">${notes.map(n => `<button type="button" class="card note-card" data-action="edit-note" data-id="${n.id}">
    <div class="note-title">${icon[n.kind] || '📝'} ${esc(n.title || 'Untitled')}</div>
    ${n.status ? `<div><span class="tag">${esc(n.status)}</span></div>` : ''}
    ${n.body ? `<div class="note-body">${esc(n.body)}</div>` : ''}
    ${(n.tags || []).length ? `<div class="chips">${n.tags.map(t => `<span class="tag">#${esc(t)}</span>`).join('')}</div>` : ''}
  </button>`).join('')}</div>` : `<p class="empty">${q ? 'No matches.' : 'Nothing here yet.'}</p>`;
}
function viewNotes() {
  return `
  ${pageHead('Notes', 'Your second brain: notes, books and ideas.', `<button class="btn btn-primary" type="button" data-action="new-note">＋ New note</button>`)}
  <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:16px">
    ${chips('noteKind', [['all', 'All'], ['note', '📝 Notes'], ['book', '📚 Books'], ['idea', '💡 Ideas']], ui.noteKind)}
    <input class="input" id="note-search" type="search" style="flex:1 1 200px;width:auto" placeholder="Search notes, tags…" value="${esc(ui.noteQuery)}" aria-label="Search notes">
  </div>
  <div id="note-results">${noteResults()}</div>`;
}

/* ---------- Weekly review ---------- */
function viewReview() {
  const td = today();
  const ws = ui.reviewWeek || weekStartOf(td);
  const we = addDays(ws, 6);
  const inWeek = d => d && d >= ws && d <= we;
  const doneTasks = state.tasks.filter(t => t.done && inWeek(t.doneAt));
  const elapsed = Math.max(0, Math.min(7, daysBetween(ws, td) + 1));
  const daysSoFar = Array.from({ length: elapsed }, (_, i) => addDays(ws, i));
  const checks = sum(state.habits.map(h => daysSoFar.filter(d => h.log[d]).length));
  const habitPct = pct(checks, state.habits.length * elapsed);
  const moods = daysSoFar.map(d => state.checkins[d]?.mood).filter(Boolean);
  const sleeps = daysSoFar.map(d => state.checkins[d]?.sleep).filter(v => v != null);
  const spent = sum(state.txns.filter(t => t.type === 'expense' && inWeek(t.date)).map(t => t.amount));
  const r = state.reviews[ws] || {};
  const past = Object.keys(state.reviews).filter(k => k !== ws).sort().reverse();
  const nextGoals = state.goals.filter(g => g.status === 'active');

  return `
  ${pageHead('Weekly review', `${esc(fmt(ws, { month: 'long', day: 'numeric' }))} – ${esc(fmt(we, { month: 'long', day: 'numeric' }))}`,
    `<button class="btn" type="button" data-action="rweek" data-v="-1" aria-label="Previous week">‹</button>
     <button class="btn" type="button" data-action="rweek" data-v="0">This week</button>
     <button class="btn" type="button" data-action="rweek" data-v="1" aria-label="Next week" ${ws >= weekStartOf(td) ? 'disabled' : ''}>›</button>`)}
  <div class="stats">
    ${stat('Tasks completed', doneTasks.length)}
    ${stat('Habit consistency', state.habits.length && elapsed ? `${habitPct}%` : '—', `${checks} check-offs`)}
    ${stat('Avg mood', moods.length ? `${MOODS[Math.round(avg(moods)) - 1]} ${avg(moods).toFixed(1)}` : '—')}
    ${stat('Avg sleep', sleeps.length ? `${avg(sleeps).toFixed(1)}h` : '—')}
    ${stat('Spent', money(spent, true))}
  </div>
  <div class="grid grid-2">
    <form class="card" data-form="review" data-week="${ws}">
      <h2>🔍 Reflect</h2>
      <label class="field review-q">🏆 What went well? Biggest wins?<textarea class="input" name="wins" rows="3">${esc(r.wins || '')}</textarea></label>
      <label class="field review-q">🧠 What didn’t? What did you learn?<textarea class="input" name="lessons" rows="3">${esc(r.lessons || '')}</textarea></label>
      <label class="field review-q">🎯 What’s the one focus for next week?<textarea class="input" name="focus" rows="2">${esc(r.focus || '')}</textarea></label>
      <button class="btn btn-primary" type="submit">${state.reviews[ws] ? 'Update review' : 'Save review'}</button>
    </form>
    <div class="stack">
      <section class="card"><h2>✅ Done this week <span class="meta">${doneTasks.length}</span></h2>
        ${doneTasks.length ? `<ul class="small" style="margin:0;padding-left:18px">${doneTasks.slice(0, 12).map(t => `<li>${esc(t.title)}</li>`).join('')}</ul>${doneTasks.length > 12 ? `<p class="hint">+${doneTasks.length - 12} more</p>` : ''}` : '<p class="empty">Nothing completed yet this week.</p>'}
      </section>
      <section class="card"><h2>🎯 Goal check</h2>
        ${nextGoals.length ? nextGoals.map(g => { const p = goalProgress(g); return `<div style="margin-bottom:10px"><div class="small"><strong>${esc(g.title)}</strong></div>${progressBar(p.pct, g.title)}<div class="progress-label"><span>${p.done}/${p.total}</span><span>${p.pct}%</span></div></div>`; }).join('') : '<p class="empty">No active goals.</p>'}
      </section>
    </div>
  </div>
  ${past.length ? `<section class="card review-history" style="margin-top:16px"><h2>Past reviews</h2>
    ${past.map(k => { const pr = state.reviews[k]; return `<details><summary>Week of ${esc(fmt(k, { month: 'short', day: 'numeric', year: 'numeric' }))}</summary>
      ${pr.wins ? `<p><strong>Wins:</strong> ${esc(pr.wins)}</p>` : ''}${pr.lessons ? `<p><strong>Lessons:</strong> ${esc(pr.lessons)}</p>` : ''}${pr.focus ? `<p><strong>Focus:</strong> ${esc(pr.focus)}</p>` : ''}
      <button class="btn btn-sm btn-ghost" type="button" data-action="rweek-set" data-v="${k}">Open</button></details>`; }).join('')}</section>` : ''}`;
}

/* ---------- Settings ---------- */
const CURRENCIES = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'NZD', 'INR', 'JPY', 'CNY', 'CHF', 'SEK', 'NOK', 'DKK', 'ZAR', 'BRL', 'MXN', 'SGD', 'HKD', 'PHP', 'NGN', 'AED'];
function viewSettings() {
  const s = state.settings;
  const theme = currentTheme();
  return `
  ${pageHead('Settings', 'Everything is stored privately in this browser.')}
  <div class="grid grid-2">
    <section class="card">
      <h2>Profile</h2>
      <div class="stack" style="gap:12px">
        <label class="field">Your name<input class="input" data-setting="name" value="${esc(s.name)}" placeholder="Used in your greeting"></label>
        <label class="field">Currency<select class="input" data-setting="currency">${CURRENCIES.map(c => `<option ${c === s.currency ? 'selected' : ''}>${c}</option>`).join('')}</select></label>
        <label class="field">Week starts on<select class="input" data-setting="weekStart"><option value="1" ${s.weekStart === 1 ? 'selected' : ''}>Monday</option><option value="0" ${s.weekStart === 0 ? 'selected' : ''}>Sunday</option></select></label>
        <div><div class="small muted" style="font-weight:600;margin-bottom:4px">Theme</div>${chips('theme', [['auto', 'Auto'], ['light', 'Light'], ['dark', 'Dark']], theme)}</div>
      </div>
    </section>
    <section class="card">
      <h2>Life areas</h2>
      <p class="small muted" style="margin-top:-6px">Areas group your goals and tasks. Use them with <strong>#name</strong> in quick add.</p>
      ${state.areas.map(a => `<div style="display:flex;gap:6px;margin-bottom:6px">
        <input class="input" style="width:56px;text-align:center" data-area="${a.id}" data-field="emoji" value="${esc(a.emoji)}" aria-label="Emoji for ${esc(a.name)}">
        <input class="input" data-area="${a.id}" data-field="name" value="${esc(a.name)}" aria-label="Area name">
        <button type="button" class="icon-btn" data-action="delete-area" data-id="${a.id}" aria-label="Delete area ${esc(a.name)}">✕</button></div>`).join('')}
      <form class="inline-form" data-form="area-add" style="margin-top:10px" autocomplete="off">
        <input class="input" name="emoji" style="flex:0 0 56px;text-align:center" placeholder="✨" aria-label="Emoji">
        <input class="input" name="name" placeholder="New area" required aria-label="New area name">
        <button class="btn" type="submit">Add</button>
      </form>
    </section>
    <section class="card">
      <h2>Your data</h2>
      <p class="small muted" style="margin-top:-6px">Your planner lives in this browser only — no account, nothing uploaded. Export a backup regularly, or to move to another device.</p>
      <div class="head-actions">
        <button class="btn btn-primary" type="button" data-action="export">⬇ Export backup</button>
        <label class="btn" style="cursor:pointer">⬆ Import backup<input type="file" accept="application/json,.json" id="import-file" hidden></label>
      </div>
      <h3>Start over</h3>
      <div class="head-actions">
        <button class="btn" type="button" data-action="load-sample">Load sample data</button>
        <button class="btn btn-danger" type="button" data-action="wipe">Erase everything</button>
      </div>
    </section>
    <section class="card">
      <h2>Keyboard</h2>
      <table class="data"><tbody>
        <tr><td><kbd>N</kbd> or <kbd>Ctrl/⌘ K</kbd></td><td>Quick add</td></tr>
        <tr><td><kbd>G</kbd> then <kbd>T</kbd> <kbd>K</kbd> <kbd>W</kbd> <kbd>O</kbd> <kbd>H</kbd> <kbd>J</kbd> <kbd>M</kbd> <kbd>R</kbd></td><td>Go to Today, Tasks, Week, gOals, Habits, Journal, Money, Review</td></tr>
        <tr><td><kbd>Esc</kbd></td><td>Close dialog</td></tr>
      </tbody></table>
    </section>
  </div>`;
}

/* ---------- More (mobile menu) ---------- */
function viewMore() {
  return `${pageHead('More', '')}<div class="grid grid-2">${ROUTES.filter(r => r.id !== 'more').map(r =>
    `<a class="card" href="#/${r.id}" style="text-decoration:none;color:inherit;display:flex;gap:12px;align-items:center"><span style="font-size:22px">${r.ico}</span><div><strong>${r.label}</strong><div class="small muted">${r.blurb}</div></div></a>`).join('')}</div>
    <p style="margin-top:16px"><button class="btn btn-ghost" type="button" data-action="theme">${themeLabel()}</button></p>`;
}

/* ============================================================
   Router
   ============================================================ */
const ROUTES = [
  { id: 'today', label: 'Today', ico: '☀️', view: viewToday, blurb: 'Your day at a glance' },
  { id: 'tasks', label: 'Tasks', ico: '✅', view: viewTasks, blurb: 'Every to-do in one place' },
  { id: 'week', label: 'Week', ico: '🗓️', view: viewWeek, blurb: 'Plan and reschedule the week' },
  { id: 'goals', label: 'Goals', ico: '🎯', view: viewGoals, blurb: 'Areas, goals and progress' },
  { id: 'habits', label: 'Habits', ico: '🔁', view: viewHabits, blurb: 'Streaks and consistency' },
  { id: 'journal', label: 'Journal', ico: '📓', view: viewJournal, blurb: 'Mood, sleep, gratitude' },
  { id: 'finance', label: 'Money', ico: '💰', view: viewFinance, blurb: 'Budget, spending, savings' },
  { id: 'notes', label: 'Notes', ico: '🗂️', view: viewNotes, blurb: 'Notes, books, ideas' },
  { id: 'review', label: 'Review', ico: '🔍', view: viewReview, blurb: 'Weekly reflection' },
  { id: 'settings', label: 'Settings', ico: '⚙️', view: viewSettings, blurb: 'Profile, areas, backup' },
  { id: 'more', label: 'More', ico: '☰', view: viewMore, blurb: '', hidden: true },
];
const MOBILE_NAV = ['today', 'tasks', 'habits', 'finance', 'more'];
const currentRoute = () => { const id = (location.hash.match(/^#\/(\w+)/) || [])[1]; return ROUTES.find(r => r.id === id) || ROUTES[0]; };

function renderNav(route) {
  const td = today();
  const dueCount = state.tasks.filter(t => !t.done && t.due && t.due <= td).length;
  const habitLeft = state.habits.filter(h => !h.log[td]).length;
  const counts = { tasks: dueCount || '', habits: habitLeft || '' };
  $('#nav').innerHTML = ROUTES.filter(r => !r.hidden).map(r =>
    `<a href="#/${r.id}" ${r.id === route.id ? 'aria-current="page"' : ''}><span class="ico" aria-hidden="true">${r.ico}</span>${r.label}${counts[r.id] ? `<span class="count" aria-label="${counts[r.id]} pending">${counts[r.id]}</span>` : ''}</a>`).join('');
  const mobileActive = MOBILE_NAV.includes(route.id) ? route.id : 'more';
  $('#bottom-nav').innerHTML = MOBILE_NAV.map(id => { const r = ROUTES.find(x => x.id === id);
    return `<a href="#/${id}" ${id === mobileActive ? 'aria-current="page"' : ''}><span class="ico" aria-hidden="true">${r.ico}</span>${r.label}</a>`; }).join('');
}

let lastRoute = null;
function render() {
  const route = currentRoute();
  const activeKey = document.activeElement?.dataset?.key;
  for (const k of Object.keys(chartSpecs)) delete chartSpecs[k];
  renderNav(route);
  $('#main').innerHTML = route.view();
  drawCharts();
  document.title = `${route.label} · Life Planner`;
  $('#theme-btn').textContent = themeLabel();
  if (route.id !== lastRoute) { window.scrollTo(0, 0); lastRoute = route.id; }
  else if (activeKey) $(`[data-key="${CSS.escape(activeKey)}"]`)?.focus({ preventScroll: true });
}

/* ============================================================
   Theme
   ============================================================ */
function currentTheme() { try { return localStorage.getItem(THEME_KEY) || 'auto'; } catch (e) { return 'auto'; } }
function setTheme(t) {
  try { if (t === 'auto') localStorage.removeItem(THEME_KEY); else localStorage.setItem(THEME_KEY, t); } catch (e) { /* per-viewer convenience only */ }
  if (t === 'auto') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', t);
  render();
}
const themeLabel = () => `Theme: ${{ auto: 'Auto', light: 'Light', dark: 'Dark' }[currentTheme()]}`;

/* ============================================================
   Modal & toast
   ============================================================ */
const dlg = $('#modal'), modalForm = $('#modal-form');
let modalSubmit = null;
function openModal(html, onSubmit) {
  modalForm.innerHTML = html; modalSubmit = onSubmit;
  if (!dlg.open) dlg.showModal();
  ($('[autofocus]', modalForm) || $('input, select, textarea', modalForm))?.focus();
}
function closeModal() { if (dlg.open) dlg.close(); modalSubmit = null; }
modalForm.addEventListener('submit', e => {
  e.preventDefault();
  if (!modalSubmit) return closeModal();
  const keepOpen = modalSubmit(new FormData(modalForm), modalForm) === false;
  if (!keepOpen) { closeModal(); commit(); }
});
const modalActions = (saveLabel = 'Save', extra = '') =>
  `<div class="modal-actions">${extra}<span class="spacer"></span><button class="btn" type="button" data-action="close-modal">Cancel</button><button class="btn btn-primary" type="submit">${saveLabel}</button></div>`;

function confirmModal(title, body, okLabel, onOk) {
  openModal(`<h2>${esc(title)}</h2><p style="margin:0">${body}</p>${modalActions(okLabel)}`, () => { onOk(); });
}

let toastTimer;
function toast(msg, withUndo = false) {
  const el = $('#toast');
  el.innerHTML = `<span>${esc(msg)}</span>${withUndo ? '<button type="button" data-action="undo">Undo</button>' : ''}`;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, withUndo ? 6000 : 3000);
}

/* ---------- quick add ---------- */
function quickAdd(tab = 'task') {
  const tabs = `<div class="chips" role="tablist">${[['task', '✅ Task'], ['money', '💰 Money'], ['note', '📝 Note']].map(([v, l]) =>
    `<button type="button" class="chip" role="tab" data-action="qa-tab" data-tab="${v}" aria-selected="${v === tab}" aria-pressed="${v === tab}">${l}</button>`).join('')}</div>`;
  const td = today();
  if (tab === 'task') {
    openModal(`<h2>Quick add</h2>${tabs}
      <input class="input" name="text" autofocus required placeholder="e.g. Call dentist tomorrow !high #health" aria-label="Task" autocomplete="off">
      <div class="parse-preview" id="parse-preview" aria-live="polite"></div>
      <label class="field">Link to goal (optional)<select class="input" name="goalId">${goalOptions('')}</select></label>
      <p class="hint" style="margin:0">Dates: today, tomorrow, fri, next week, in 3 days, 10/24 · Priority: !high !med !low · Area: #health · Repeat: every week · Focus: *</p>
      ${modalActions('Add task')}`, fd => {
      const t = addTaskFromText(fd.get('text'), { goalId: fd.get('goalId') || null });
      if (!t) return false;
      toast(`Added “${t.title}”${t.due ? ` · ${relDay(t.due)}` : ''}`);
    });
  } else if (tab === 'money') {
    const cats = Array.from(new Set([...Object.keys(state.budgets), ...state.txns.map(t => t.category)])).sort();
    openModal(`<h2>Quick add</h2>${tabs}
      <div class="form-row">
        <label class="field">Type<select class="input" name="type"><option value="expense">Expense</option><option value="income">Income</option></select></label>
        <label class="field">Amount<input class="input" name="amount" type="number" step="0.01" min="0" required autofocus inputmode="decimal" placeholder="0.00"></label>
      </div>
      <div class="form-row">
        <label class="field">Category<input class="input" name="category" list="qa-cats" required placeholder="Groceries"></label>
        <label class="field">Date<input class="input" name="date" type="date" value="${td}" required></label>
      </div>
      <datalist id="qa-cats">${cats.map(c => `<option value="${esc(c)}">`).join('')}</datalist>
      <label class="field">Note<input class="input" name="note" placeholder="Optional"></label>
      ${modalActions('Add')}`, fd => { if (!addTxn(fd)) return false; toast('Transaction added'); });
  } else {
    openModal(`<h2>Quick add</h2>${tabs}${noteFields({ kind: 'note' })}${modalActions('Add note')}`, fd => { saveNote(null, fd); toast('Note added'); });
  }
}
function addTxn(fd) {
  const amount = parseFloat(fd.get('amount'));
  const date = fd.get('date');
  const category = String(fd.get('category') || '').trim();
  if (!(amount > 0) || !isYmd(date) || !category) return false;
  state.txns.push({ id: uid(), date, type: fd.get('type') === 'income' ? 'income' : 'expense', amount: Math.round(amount * 100) / 100, category, note: String(fd.get('note') || '').trim() });
  return true;
}

/* ---------- edit modals ---------- */
function editTask(id) {
  const t = taskById(id); if (!t) return;
  openModal(`<h2>Edit task</h2>
    <label class="field">Title<input class="input" name="title" required value="${esc(t.title)}" autofocus></label>
    <div class="form-row">
      <label class="field">Due<input class="input" type="date" name="due" value="${esc(t.due || '')}"></label>
      <label class="field">Priority<select class="input" name="priority"><option value="">None</option>${Object.entries(PRIORITY_LABEL).map(([v, l]) => `<option value="${v}" ${t.priority === v ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
      <label class="field">Repeat<select class="input" name="repeat"><option value="">Never</option>${Object.entries(REPEAT_LABEL).map(([v, l]) => `<option value="${v}" ${t.repeat === v ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
    </div>
    <div class="form-row">
      <label class="field">Area<select class="input" name="areaId">${areaOptions(t.areaId)}</select></label>
      <label class="field">Goal<select class="input" name="goalId">${goalOptions(t.goalId)}</select></label>
    </div>
    <label class="field" style="flex-direction:row;align-items:center;gap:8px"><input type="checkbox" name="focus" ${t.focus ? 'checked' : ''}> ★ Focus task</label>
    <label class="field">Notes<textarea class="input" name="notes" rows="3">${esc(t.notes || '')}</textarea></label>
    ${modalActions('Save', `<button class="btn btn-danger" type="button" data-action="delete-task" data-id="${t.id}">Delete</button>`)}`, fd => {
    const title = String(fd.get('title')).trim(); if (!title) return false;
    const due = fd.get('due');
    Object.assign(t, {
      title, due: isYmd(due) ? due : null, priority: fd.get('priority') || null, repeat: fd.get('repeat') || null,
      areaId: fd.get('areaId') || null, goalId: fd.get('goalId') || null, focus: fd.get('focus') === 'on', notes: String(fd.get('notes') || ''),
    });
    if (t.repeat && !t.due) t.due = today();
    if (!t.repeat) t.spawned = false;
  });
}

function editGoal(id) {
  const g = id ? goalById(id) : { title: '', areaId: '', why: '', target: '', status: 'active' };
  openModal(`<h2>${id ? 'Edit goal' : 'New goal'}</h2>
    <label class="field">Goal<input class="input" name="title" required value="${esc(g.title)}" autofocus placeholder="e.g. Run a half marathon"></label>
    <label class="field">Why does this matter to you?<textarea class="input" name="why" rows="2" placeholder="Your reason keeps you going when motivation fades.">${esc(g.why || '')}</textarea></label>
    <div class="form-row">
      <label class="field">Life area<select class="input" name="areaId">${areaOptions(g.areaId)}</select></label>
      <label class="field">Target date<input class="input" type="date" name="target" value="${esc(g.target || '')}"></label>
      <label class="field">Status<select class="input" name="status">${[['active', 'In progress'], ['paused', 'Paused'], ['achieved', 'Achieved']].map(([v, l]) => `<option value="${v}" ${g.status === v ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
    </div>
    ${modalActions(id ? 'Save' : 'Create goal', id ? `<button class="btn btn-danger" type="button" data-action="delete-goal" data-id="${id}">Delete</button>` : '')}`, fd => {
    const title = String(fd.get('title')).trim(); if (!title) return false;
    const target = fd.get('target');
    const vals = { title, why: String(fd.get('why') || '').trim(), areaId: fd.get('areaId') || null, target: isYmd(target) ? target : null, status: fd.get('status') || 'active' };
    if (id) Object.assign(g, vals); else { const ng = { id: uid(), createdAt: today(), ...vals }; state.goals.push(ng); ui.openGoal = ng.id; }
  });
}

function editHabit(id) {
  const h = id ? habitById(id) : { name: '', emoji: '✨', goalId: '' };
  openModal(`<h2>${id ? 'Edit habit' : 'New habit'}</h2>
    <div style="display:flex;gap:8px">
      <label class="field" style="width:70px">Icon<input class="input" name="emoji" value="${esc(h.emoji)}" style="text-align:center"></label>
      <label class="field" style="flex:1">Habit<input class="input" name="name" required value="${esc(h.name)}" autofocus placeholder="e.g. Walk 20 minutes"></label>
    </div>
    <label class="field">Supports goal<select class="input" name="goalId">${goalOptions(h.goalId)}</select></label>
    <p class="hint" style="margin:0">Tip: make it so small you can do it on your worst day.</p>
    ${modalActions(id ? 'Save' : 'Add habit', id ? `<button class="btn btn-danger" type="button" data-action="delete-habit" data-id="${id}">Delete</button>` : '')}`, fd => {
    const name = String(fd.get('name')).trim(); if (!name) return false;
    const vals = { name, emoji: String(fd.get('emoji') || '').trim() || '✨', goalId: fd.get('goalId') || null };
    if (id) Object.assign(h, vals); else state.habits.push({ id: uid(), log: {}, createdAt: today(), ...vals });
  });
}

function noteFields(n) {
  return `<div class="form-row">
      <label class="field">Type<select class="input" name="kind">${[['note', '📝 Note'], ['book', '📚 Book'], ['idea', '💡 Idea']].map(([v, l]) => `<option value="${v}" ${n.kind === v ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
      <label class="field">Status (books)<select class="input" name="status">${['', 'To read', 'Reading', 'Finished'].map(s => `<option value="${s}" ${n.status === s ? 'selected' : ''}>${s || '—'}</option>`).join('')}</select></label>
    </div>
    <label class="field">Title<input class="input" name="title" value="${esc(n.title || '')}" ${n.id ? '' : 'autofocus'} placeholder="Title"></label>
    <label class="field">Body<textarea class="input" name="body" rows="7">${esc(n.body || '')}</textarea></label>
    <label class="field">Tags<input class="input" name="tags" value="${esc((n.tags || []).join(', '))}" placeholder="comma, separated"></label>`;
}
function saveNote(n, fd) {
  const vals = {
    kind: fd.get('kind') || 'note', status: fd.get('status') || '', title: String(fd.get('title') || '').trim(),
    body: String(fd.get('body') || ''), tags: String(fd.get('tags') || '').split(',').map(s => s.trim().replace(/^#/, '')).filter(Boolean), updatedAt: today(),
  };
  if (n) Object.assign(n, vals); else state.notes.push({ id: uid(), ...vals });
}
function editNote(id) {
  const n = id ? state.notes.find(x => x.id === id) : { kind: ui.noteKind === 'all' ? 'note' : ui.noteKind };
  openModal(`<h2>${id ? 'Edit note' : 'New note'}</h2>${noteFields(n)}
    ${modalActions(id ? 'Save' : 'Add', id ? `<button class="btn btn-danger" type="button" data-action="delete-note" data-id="${id}">Delete</button>` : '')}`, fd => {
    saveNote(id ? n : null, fd);
  });
}

function editSaving(id) {
  const s = id ? state.savings.find(x => x.id === id) : { name: '', target: '', saved: 0 };
  openModal(`<h2>${id ? 'Edit savings goal' : 'New savings goal'}</h2>
    <label class="field">Name<input class="input" name="name" required value="${esc(s.name)}" autofocus placeholder="e.g. New laptop"></label>
    <div class="form-row">
      <label class="field">Target<input class="input" type="number" min="1" step="0.01" name="target" required value="${esc(s.target)}"></label>
      <label class="field">Saved so far<input class="input" type="number" min="0" step="0.01" name="saved" value="${esc(s.saved)}"></label>
    </div>
    ${modalActions('Save', id ? `<button class="btn btn-danger" type="button" data-action="delete-saving" data-id="${id}">Delete</button>` : '')}`, fd => {
    const vals = { name: String(fd.get('name')).trim(), target: parseFloat(fd.get('target')) || 0, saved: parseFloat(fd.get('saved')) || 0 };
    if (!vals.name || !(vals.target > 0)) return false;
    if (id) Object.assign(s, vals); else state.savings.push({ id: uid(), ...vals });
  });
}

function editBudget() {
  const rows = Object.entries(state.budgets);
  const usedCats = Array.from(new Set(state.txns.filter(t => t.type === 'expense').map(t => t.category))).filter(c => state.budgets[c] == null);
  const all = [...rows, ...usedCats.map(c => [c, '']), ['', ''], ['', '']];
  openModal(`<h2>Monthly budget</h2>
    <p class="hint" style="margin:0">Set a monthly limit per category. Leave the limit empty to remove it.</p>
    <div class="stack" style="gap:6px;max-height:50vh;overflow:auto">${all.map(([c, v], i) => `<div style="display:flex;gap:6px">
      <input class="input" name="cat${i}" value="${esc(c)}" placeholder="Category" aria-label="Category">
      <input class="input" name="lim${i}" type="number" min="0" step="1" value="${esc(v)}" placeholder="Limit" style="width:120px" aria-label="Monthly limit"></div>`).join('')}</div>
    <input type="hidden" name="n" value="${all.length}">
    ${modalActions('Save budget')}`, fd => {
    const b = {};
    for (let i = 0; i < +fd.get('n'); i++) {
      const c = String(fd.get('cat' + i) || '').trim(), v = parseFloat(fd.get('lim' + i));
      if (c && v > 0) b[c] = v;
    }
    state.budgets = b;
  });
}

/* ============================================================
   Actions (event delegation)
   ============================================================ */
function removeWithUndo(label, fn) { snapshot(); fn(); closeModal(); commit(); toast(`${label} deleted`, true); }

const actions = {
  'quick-add': el => quickAdd(el.dataset.tab || 'task'),
  'qa-tab': el => quickAdd(el.dataset.tab),
  'close-modal': () => closeModal(),
  'undo': () => undo(),
  'theme': () => { const order = ['auto', 'light', 'dark']; setTheme(order[(order.indexOf(currentTheme()) + 1) % 3]); },

  'toggle-task': el => { toggleTask(el.dataset.id); commit(); },
  'focus-task': el => { const t = taskById(el.dataset.id); t.focus = !t.focus; commit(); },
  'edit-task': el => editTask(el.dataset.id),
  'push-task': el => { const t = taskById(el.dataset.id); t.due = addDays(t.due || today(), 1); commit(); },
  'delete-task': el => removeWithUndo('Task', () => { state.tasks = state.tasks.filter(t => t.id !== el.dataset.id); }),
  'clear-done': () => removeWithUndo('Completed tasks', () => { state.tasks = state.tasks.filter(t => !t.done || (ui.taskArea && t.areaId !== ui.taskArea)); }),

  'chip': el => {
    const g = el.dataset.group, v = el.dataset.v;
    if (g === 'theme') return setTheme(v);
    ui[g] = v; render();
  },
  'week': el => { const v = +el.dataset.v; ui.weekOffset = v === 0 ? 0 : ui.weekOffset + v; render(); },
  'month': el => { const v = +el.dataset.v; const cur = ui.month || monthKey(today()); ui.month = v === 0 ? null : monthKey(addMonthsYmd(cur + '-01', v)); render(); },
  'jdate': el => { const v = +el.dataset.v; const cur = ui.journalDate || today(); const n = v === 0 ? today() : addDays(cur, v); ui.journalDate = n > today() ? today() : n; render(); },
  'jdate-set': el => { ui.journalDate = el.dataset.v; render(); window.scrollTo(0, 0); },
  'rweek': el => { const v = +el.dataset.v; const cur = ui.reviewWeek || weekStartOf(today()); ui.reviewWeek = v === 0 ? null : addDays(cur, v * 7); render(); },
  'rweek-set': el => { ui.reviewWeek = el.dataset.v; render(); window.scrollTo(0, 0); },

  'new-goal': () => editGoal(null),
  'edit-goal': el => editGoal(el.dataset.id),
  'goal-achieve': el => { goalById(el.dataset.id).status = 'achieved'; commit(); toast('🏆 Goal achieved — congratulations!'); },
  'delete-goal': el => removeWithUndo('Goal', () => {
    const id = el.dataset.id;
    state.goals = state.goals.filter(g => g.id !== id);
    state.tasks.forEach(t => { if (t.goalId === id) t.goalId = null; });
    state.habits.forEach(h => { if (h.goalId === id) h.goalId = null; });
  }),

  'new-habit': () => editHabit(null),
  'edit-habit': el => editHabit(el.dataset.id),
  'toggle-habit': el => { const h = habitById(el.dataset.id), d = el.dataset.day; if (h.log[d]) delete h.log[d]; else h.log[d] = true; commit(); },
  'delete-habit': el => removeWithUndo('Habit', () => { state.habits = state.habits.filter(h => h.id !== el.dataset.id); }),

  'ci-set': el => { const c = ensureCheckin(el.dataset.date), f = el.dataset.field, v = +el.dataset.v; c[f] = c[f] === v ? undefined : v; commit(); },
  'ci-step': el => { const c = ensureCheckin(el.dataset.date); c.sleep = clamp((c.sleep ?? 7) + (c.sleep == null ? 0 : +el.dataset.step), 0, 14); commit(); },
  'ci-water': el => { const c = ensureCheckin(el.dataset.date), v = +el.dataset.v; c.water = c.water === v ? v - 1 : v; commit(); },

  'edit-budget': () => editBudget(),
  'delete-txn': el => removeWithUndo('Transaction', () => { state.txns = state.txns.filter(t => t.id !== el.dataset.id); }),
  'new-saving': () => editSaving(null),
  'edit-saving': el => editSaving(el.dataset.id),
  'delete-saving': el => removeWithUndo('Savings goal', () => { state.savings = state.savings.filter(s => s.id !== el.dataset.id); }),
  'add-saving': el => {
    const s = state.savings.find(x => x.id === el.dataset.id);
    openModal(`<h2>Add to “${esc(s.name)}”</h2>
      <label class="field">Amount (use a negative number to withdraw)<input class="input" type="number" step="0.01" name="amt" required autofocus></label>
      ${modalActions('Add')}`, fd => { const a = parseFloat(fd.get('amt')); if (!a) return false; s.saved = Math.max(0, Math.round((s.saved + a) * 100) / 100); });
  },

  'new-note': () => editNote(null),
  'edit-note': el => editNote(el.dataset.id),
  'delete-note': el => removeWithUndo('Note', () => { state.notes = state.notes.filter(n => n.id !== el.dataset.id); }),

  'delete-area': el => {
    const a = areaById(el.dataset.id);
    removeWithUndo(`Area “${a.name}”`, () => {
      state.areas = state.areas.filter(x => x.id !== a.id);
      [...state.tasks, ...state.goals].forEach(x => { if (x.areaId === a.id) x.areaId = null; });
    });
  },

  'keep-sample': () => { state.meta.sample = false; commit(); },
  'clear-sample': () => confirmModal('Start fresh?', 'This removes the sample tasks, goals, habits, journal entries, money and notes. Your life areas and settings stay.', 'Start fresh', () => {
    const fresh = blank(); fresh.settings = state.settings; fresh.areas = state.areas; state = fresh;
  }),
  'load-sample': () => confirmModal('Load sample data?', 'This replaces everything in your planner with sample data. Export a backup first if you want to keep your data.', 'Replace with sample', () => {
    const s = state.settings; state = sampleData(); state.settings = s;
  }),
  'wipe': () => confirmModal('Erase everything?', 'This permanently deletes all your tasks, goals, habits, journal, money and notes from this browser.', 'Erase everything', () => { state = blank(); }),
  'export': () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = `life-planner-backup-${today()}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast('Backup downloaded');
  },
};

document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el || el.disabled) return;
  const fn = actions[el.dataset.action];
  if (fn) fn(el, e);
});

/* ---------- forms in the page ---------- */
const forms = {
  'task-add': (form, fd) => {
    const t = addTaskFromText(String(fd.get('text') || ''), { due: fd.get('due') || null, goalId: fd.get('goalId') || null, areaId: fd.get('areaId') || null });
    if (!t) return;
    if (t.goalId) ui.openGoal = t.goalId;
    commit();
    // keep typing flow: refocus the same add box
    const sel = `form[data-form="task-add"] input[name="due"][value="${fd.get('due') || ''}"]`;
    const again = t.goalId ? $(`details[data-goal="${t.goalId}"] input[name="text"]`) : $(sel)?.form?.querySelector('input[name="text"]');
    again?.focus();
  },
  'txn-add': (form, fd) => { if (addTxn(fd)) { ui.month = monthKey(fd.get('date')) === monthKey(today()) ? null : monthKey(fd.get('date')); commit(); toast('Transaction added'); $('form[data-form="txn-add"] input[name="amount"]')?.focus(); } },
  'review': (form, fd) => {
    state.reviews[form.dataset.week] = { wins: String(fd.get('wins') || '').trim(), lessons: String(fd.get('lessons') || '').trim(), focus: String(fd.get('focus') || '').trim() };
    commit(); toast('Review saved');
  },
  'area-add': (form, fd) => {
    const name = String(fd.get('name') || '').trim(); if (!name) return;
    state.areas.push({ id: uid(), name, emoji: String(fd.get('emoji') || '').trim() || '✨' });
    commit();
  },
};
$('#main').addEventListener('submit', e => {
  const form = e.target.closest('form[data-form]'); if (!form) return;
  e.preventDefault();
  forms[form.dataset.form]?.(form, new FormData(form));
});

/* ---------- inputs that save without re-rendering ---------- */
let ciTimer;
document.addEventListener('input', e => {
  const el = e.target;
  if (el.dataset.ci) {
    const c = ensureCheckin(el.dataset.date);
    if (el.dataset.ci === 'gratitude') { c.gratitude = (c.gratitude || ['', '', '']).slice(); c.gratitude[+el.dataset.i] = el.value; }
    else c[el.dataset.ci] = el.value;
    clearTimeout(ciTimer); ciTimer = setTimeout(save, 300);
  } else if (el.id === 'note-search') {
    ui.noteQuery = el.value; $('#note-results').innerHTML = noteResults();
  } else if (el.name === 'text' && el.closest('#modal')) {
    $('#parse-preview').innerHTML = previewChips(parseQuick(el.value));
  } else if (el.dataset.area) {
    const a = areaById(el.dataset.area); if (a) { a[el.dataset.field] = el.value; save(); renderNav(currentRoute()); }
  }
});
document.addEventListener('change', e => {
  const el = e.target;
  if (el.dataset.setting) {
    const k = el.dataset.setting;
    state.settings[k] = k === 'weekStart' ? +el.value : el.value.trim();
    commit();
  } else if (el.dataset.ui) {
    const k = el.dataset.ui;
    if (k === 'journalDate') ui.journalDate = isYmd(el.value) ? (el.value > today() ? today() : el.value) : null;
    else ui[k] = el.value;
    render();
  } else if (el.id === 'import-file' && el.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data || !Array.isArray(data.tasks) || !data.settings) throw new Error('bad');
        confirmModal('Import backup?', `This replaces your current planner with the backup (${data.tasks.length} tasks, ${(data.goals || []).length} goals, ${(data.habits || []).length} habits).`, 'Import', () => { state = migrate(data); });
      } catch (err) { toast('That file isn’t a Life Planner backup.'); }
    };
    reader.readAsText(el.files[0]);
    el.value = '';
  } else if (el.dataset.ci) save();
});
document.addEventListener('toggle', e => {
  const d = e.target; if (d.dataset?.goal) ui.openGoal = d.open ? d.dataset.goal : (ui.openGoal === d.dataset.goal ? null : ui.openGoal);
}, true);

/* ---------- drag & drop (week view) ---------- */
let dragId = null;
document.addEventListener('dragstart', e => {
  const li = e.target.closest?.('.task[draggable="true"]'); if (!li) return;
  dragId = li.dataset.id; e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', dragId);
});
document.addEventListener('dragover', e => {
  const col = e.target.closest?.('[data-day]'); if (!col || !dragId) return;
  e.preventDefault(); $$('.drop').forEach(x => x !== col && x.classList.remove('drop')); col.classList.add('drop');
});
document.addEventListener('dragleave', e => { const col = e.target.closest?.('[data-day]'); if (col && !col.contains(e.relatedTarget)) col.classList.remove('drop'); });
document.addEventListener('drop', e => {
  const col = e.target.closest?.('[data-day]'); if (!col || !dragId) return;
  e.preventDefault();
  const t = taskById(dragId); dragId = null;
  if (t) { t.due = col.dataset.day || null; if (!t.due) t.repeat = null; commit(); }
});
document.addEventListener('dragend', () => { dragId = null; $$('.drop').forEach(x => x.classList.remove('drop')); });

/* ---------- tooltips ---------- */
const tip = $('#tooltip');
function placeTip(e) {
  const r = tip.getBoundingClientRect();
  let x = e.clientX + 12, y = e.clientY - r.height - 10;
  if (x + r.width > window.innerWidth - 8) x = e.clientX - r.width - 12;
  if (y < 8) y = e.clientY + 16;
  tip.style.left = x + 'px'; tip.style.top = y + 'px';
}
document.addEventListener('pointerover', e => {
  const el = e.target.closest?.('[data-tip]'); if (!el) return;
  tip.textContent = el.getAttribute('data-tip'); tip.hidden = false; placeTip(e);
});
document.addEventListener('pointermove', e => { if (!tip.hidden) placeTip(e); });
document.addEventListener('pointerout', e => { if (e.target.closest?.('[data-tip]') && !e.relatedTarget?.closest?.('[data-tip]')) tip.hidden = true; });
document.addEventListener('scroll', () => { tip.hidden = true; }, true);

/* ---------- keyboard ---------- */
let gPressed = 0;
document.addEventListener('keydown', e => {
  const typing = e.target.matches('input, textarea, select, [contenteditable]');
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); quickAdd(); return; }
  if (typing || e.metaKey || e.ctrlKey || e.altKey || dlg.open) return;
  const k = e.key.toLowerCase();
  if (gPressed && Date.now() - gPressed < 1200) {
    const map = { t: 'today', k: 'tasks', w: 'week', o: 'goals', h: 'habits', j: 'journal', m: 'finance', n: 'notes', r: 'review', s: 'settings' };
    gPressed = 0;
    if (map[k]) { location.hash = '#/' + map[k]; e.preventDefault(); }
    return;
  }
  if (k === 'g') { gPressed = Date.now(); return; }
  if (k === 'n') { e.preventDefault(); quickAdd(); }
});

/* ---------- boot ---------- */
let resizeTimer;
window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(drawCharts, 120); });
window.addEventListener('hashchange', render);
// Re-render when the date rolls over (e.g. tab left open overnight).
let bootDay = today();
setInterval(() => { if (today() !== bootDay) { bootDay = today(); render(); } }, 60000);
// Keep multiple tabs in sync.
window.addEventListener('storage', e => { if (e.key === KEY && e.newValue) { try { state = migrate(JSON.parse(e.newValue)); render(); } catch (err) { /* ignore */ } } });

save();
render();
})();
