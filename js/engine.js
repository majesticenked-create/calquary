/* ============================================================
   Calquary — Calculator Engine
   Renders a calculator's inputs from config, computes results,
   and displays them. One engine drives every tool page.
   ============================================================ */

function renderFieldsInto(container, calc) {
  container.innerHTML = "";
  calc.fields.forEach((f) => {
    const wrap = document.createElement("div");
    wrap.className = "field";

    const label = document.createElement("label");
    label.setAttribute("for", `f-${f.id}`);
    label.innerHTML = f.label + (f.unit ? ` <span class="unit-note">(${f.unit})</span>` : "");
    wrap.appendChild(label);

    let input;
    if (f.type === "select") {
      input = document.createElement("select");
      input.id = `f-${f.id}`;
      f.options.forEach((opt) => {
        const o = document.createElement("option");
        o.value = opt.v;
        o.textContent = opt.l;
        if (opt.v === f.default) o.selected = true;
        input.appendChild(o);
      });
    } else if (f.type === "textarea") {
      input = document.createElement("textarea");
      input.id = `f-${f.id}`;
      input.value = f.default || "";
    } else if (f.type === "checkbox-group") {
      input = document.createElement("div");
      input.className = "checkbox-group";
      input.id = `f-${f.id}`;
      f.options.forEach((opt) => {
        const cbLabel = document.createElement("label");
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.value = opt.v;
        cb.checked = (f.default || []).includes(opt.v);
        cb.dataset.groupField = f.id;
        cbLabel.appendChild(cb);
        cbLabel.appendChild(document.createTextNode(opt.l));
        input.appendChild(cbLabel);
      });
    } else if (f.type === "date") {
      input = document.createElement("input");
      input.type = "date";
      input.id = `f-${f.id}`;
      input.value = f.default;
    } else {
      input = document.createElement("input");
      input.type = f.type === "text" ? "text" : "number";
      input.id = `f-${f.id}`;
      input.value = f.default;
      if (f.step !== undefined) input.step = f.step;
      if (f.min !== undefined) input.min = f.min;
      if (f.max !== undefined) input.max = f.max;
    }

    wrap.appendChild(input);
    container.appendChild(wrap);
  });
}

function collectValues(calc) {
  const values = {};
  calc.fields.forEach((f) => {
    if (f.type === "checkbox-group") {
      const checked = Array.from(
        document.querySelectorAll(`input[data-group-field="${f.id}"]:checked`)
      ).map((el) => el.value);
      values[f.id] = checked;
    } else if (f.type === "select" || f.type === "date" || f.type === "text" || f.type === "textarea") {
      values[f.id] = document.getElementById(`f-${f.id}`).value;
    } else {
      values[f.id] = parseFloat(document.getElementById(`f-${f.id}`).value) || 0;
    }
  });
  return values;
}

function retriggerSettle(el, delay) {
  el.style.setProperty("--delay", `${delay}s`);
  // Removing the class, forcing a reflow, then re-adding it restarts the CSS
  // animation — re-adding the same class alone is a no-op once it's already run.
  el.classList.remove("settle-in");
  void el.offsetWidth;
  el.classList.add("settle-in");
}

function renderResult(panel, result) {
  panel.classList.add("visible");
  const primaryValue = panel.querySelector(".result-primary .value");
  const primaryLabel = panel.querySelector(".result-primary .label");
  primaryValue.textContent = result.primary.value;
  primaryLabel.textContent = result.primary.label;
  retriggerSettle(primaryValue, 0);

  const secWrap = panel.querySelector(".result-secondary");
  secWrap.innerHTML = "";
  (result.secondary || []).forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<div class="v settle-in" style="--delay:${0.05 + i * 0.05}s">${item.v}</div><div class="l">${item.l}</div>`;
    secWrap.appendChild(div);
  });

  const noteEl = panel.querySelector(".result-notes");
  if (result.note) {
    noteEl.textContent = result.note;
    noteEl.style.display = "block";
  } else {
    noteEl.style.display = "none";
  }

  // Optional scrollable data table (e.g. an amortization schedule) — most
  // tools never set result.table, so this stays hidden for them.
  const tableWrap = panel.querySelector(".result-table-wrap");
  if (tableWrap) {
    if (result.table && result.table.rows && result.table.rows.length) {
      const thead = tableWrap.querySelector("thead");
      const tbody = tableWrap.querySelector("tbody");
      thead.innerHTML = `<tr>${result.table.columns.map((c) => `<th>${c}</th>`).join("")}</tr>`;
      tbody.innerHTML = result.table.rows
        .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
        .join("");
      tableWrap.style.display = "block";
    } else {
      tableWrap.style.display = "none";
    }
  }
}

/* ---------- Dimension diagrams ----------
   Simple technical-style line diagrams showing what each input field refers
   to on the real-world object being measured. Single-color (styled via CSS,
   not inline), no fill — matches the category icon stroke treatment. */

function dimLineH(x1, x2, y, label) {
  return `
    <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}"/>
    <line x1="${x1}" y1="${y - 4}" x2="${x1}" y2="${y + 4}"/>
    <line x1="${x2}" y1="${y - 4}" x2="${x2}" y2="${y + 4}"/>
    <text x="${(x1 + x2) / 2}" y="${y + 13}" text-anchor="middle">${label}</text>
  `;
}

function dimLineV(y1, y2, x, label) {
  return `
    <line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}"/>
    <line x1="${x - 4}" y1="${y1}" x2="${x + 4}" y2="${y1}"/>
    <line x1="${x - 4}" y1="${y2}" x2="${x + 4}" y2="${y2}"/>
    <text x="${x - 6}" y="${(y1 + y2) / 2}" text-anchor="end" dominant-baseline="middle">${label}</text>
  `;
}

function diagramWrap(inner) {
  return `<svg viewBox="0 0 300 150" class="calc-diagram-svg" aria-hidden="true">${inner}</svg>`;
}

// Slab/bed diagrams: concrete, gravel, mulch — a plan-view rectangle (one or
// two labeled edges) plus a thin side-elevation panel showing depth/thickness.
function diagramSlab(topLabels, depthLabel) {
  const rectX = 50, rectY = 18, rectW = 114, rectH = 88;
  let topPart;
  if (topLabels.length === 2) {
    topPart = `
      <rect x="${rectX}" y="${rectY}" width="${rectW}" height="${rectH}"/>
      ${dimLineH(rectX, rectX + rectW, rectY + rectH + 14, topLabels[0])}
      ${dimLineV(rectY, rectY + rectH, rectX - 14, topLabels[1])}
    `;
  } else {
    topPart = `
      <rect x="${rectX}" y="${rectY}" width="${rectW}" height="${rectH}"/>
      <text x="${rectX + rectW / 2}" y="${rectY + rectH / 2 + 4}" text-anchor="middle">${topLabels[0]}</text>
    `;
  }
  const sideX = 245, sideY = 78, sideW = 50, sideH = 14;
  const sidePart = `
    <rect x="${sideX}" y="${sideY}" width="${sideW}" height="${sideH}"/>
    ${dimLineV(sideY, sideY + sideH, sideX - 14, depthLabel)}
  `;
  return diagramWrap(topPart + sidePart);
}

// Area diagrams: paint, flooring, drywall, roofing, insulation, tile, paver —
// a plain rectangle showing length x width composing the area field's value.
function diagramArea(areaLabel) {
  const x = 60, y = 16, w = 180, h = 92;
  const inner = `
    <rect x="${x}" y="${y}" width="${w}" height="${h}"/>
    ${dimLineH(x, x + w, y + h + 14, "length")}
    ${dimLineV(y, y + h, x - 14, "width")}
    <text x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle">${areaLabel}</text>
  `;
  return diagramWrap(inner);
}

// Fence diagram: a run divided into repeating panels.
function diagramFence() {
  const x1 = 24, x2 = 276, y = 78, panelCount = 4;
  const step = (x2 - x1) / panelCount;
  let ticks = "";
  for (let i = 0; i <= panelCount; i++) {
    const x = x1 + i * step;
    ticks += `<line x1="${x}" y1="${y - 16}" x2="${x}" y2="${y + 16}"/>`;
  }
  const rail = `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}"/>`;
  const overall = dimLineH(x1, x2, y - 32, "fence length");
  const panel = dimLineH(x1 + step, x1 + step * 2, y + 32, "panel width");
  return diagramWrap(ticks + rail + overall + panel);
}

// Board diagram: lumber — a side elevation (length) plus an end-view
// cross-section (width x thickness), since a board's dimensions aren't a
// flat area the way a slab or wall is.
function diagramBoard() {
  const bx = 20, by = 60, bw = 120, bh = 18;
  const side = `
    <rect x="${bx}" y="${by}" width="${bw}" height="${bh}"/>
    ${dimLineH(bx, bx + bw, by + bh + 14, "length")}
  `;
  const ex = 210, ey = 48, ew = 42, eh = 42;
  const end = `
    <rect x="${ex}" y="${ey}" width="${ew}" height="${eh}"/>
    ${dimLineH(ex, ex + ew, ey + eh + 14, "width")}
    ${dimLineV(ey, ey + eh, ex - 14, "thickness")}
  `;
  return diagramWrap(side + end);
}

function renderDiagram(calc) {
  const container = document.getElementById("calc-diagram");
  if (!container || !calc.diagram) return;
  const d = calc.diagram;
  let svg = "";
  if (d.type === "slab") svg = diagramSlab(d.topLabels, d.depthLabel);
  else if (d.type === "area") svg = diagramArea(d.label);
  else if (d.type === "fence") svg = diagramFence();
  else if (d.type === "board") svg = diagramBoard();
  if (svg) {
    container.innerHTML = svg;
    container.style.display = "block";
  }
}

// opts lets a page mount more than one live instance without ID collisions
// (renderFieldsInto generates fixed `f-${field.id}` input IDs) — every tool
// page calls this with no opts, so the defaults below must keep matching the
// tool template's element IDs exactly. `live: true` also recalculates on
// every input/change, not just submit — for a compact instance meant to feel
// immediate (e.g. a homepage preview) rather than click-to-calculate.
// The online timer is a live, continuously-running widget (start/pause/
// countdown), fundamentally different from every other tool's
// compute-once-on-submit model — it gets its own init path rather than
// being forced through renderFieldsInto/collectValues/compute.
function initOnlineTimer(fieldsId, resultId, formId) {
  const form = document.getElementById(formId);
  const fieldsContainer = document.getElementById(fieldsId);
  const resultPanel = document.getElementById(resultId);
  if (!form || !fieldsContainer || !resultPanel) return;
  form.style.display = "none";
  resultPanel.classList.remove("visible");

  const widget = document.createElement("div");
  widget.className = "timer-widget";
  widget.innerHTML = `
    <div class="timer-display" id="timer-display">05:00</div>
    <div class="timer-inputs">
      <label>Minutes <input type="number" id="timer-min" min="0" max="999" value="5" /></label>
      <label>Seconds <input type="number" id="timer-sec" min="0" max="59" value="0" /></label>
    </div>
    <div class="timer-actions">
      <button type="button" id="timer-start" class="btn-primary">Start</button>
      <button type="button" id="timer-pause" class="btn-ghost" disabled>Pause</button>
      <button type="button" id="timer-reset" class="btn-ghost">Reset</button>
    </div>
  `;
  form.parentElement.insertBefore(widget, form);

  const display = widget.querySelector("#timer-display");
  const minInput = widget.querySelector("#timer-min");
  const secInput = widget.querySelector("#timer-sec");
  const startBtn = widget.querySelector("#timer-start");
  const pauseBtn = widget.querySelector("#timer-pause");
  const resetBtn = widget.querySelector("#timer-reset");

  let remaining = 300;
  let intervalId = null;

  function format(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  function renderDisplay() {
    display.textContent = format(Math.max(0, remaining));
    display.classList.toggle("timer-done", remaining <= 0);
  }

  function beep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) { /* Audio unsupported/blocked — silent countdown still works. */ }
  }

  function tick() {
    remaining -= 1;
    renderDisplay();
    if (remaining <= 0) {
      clearInterval(intervalId);
      intervalId = null;
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      display.textContent = "Time's up!";
      display.classList.add("timer-done");
      beep();
    }
  }

  startBtn.addEventListener("click", () => {
    if (intervalId) return;
    if (remaining <= 0) {
      remaining = (parseInt(minInput.value, 10) || 0) * 60 + (parseInt(secInput.value, 10) || 0);
    }
    if (remaining <= 0) return;
    display.classList.remove("timer-done");
    intervalId = setInterval(tick, 1000);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    minInput.disabled = true;
    secInput.disabled = true;
  });

  pauseBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = null;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  });

  resetBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = null;
    minInput.disabled = false;
    secInput.disabled = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    remaining = (parseInt(minInput.value, 10) || 0) * 60 + (parseInt(secInput.value, 10) || 0);
    display.classList.remove("timer-done");
    renderDisplay();
  });

  [minInput, secInput].forEach((input) => {
    input.addEventListener("input", () => {
      remaining = (parseInt(minInput.value, 10) || 0) * 60 + (parseInt(secInput.value, 10) || 0);
      renderDisplay();
    });
  });

  renderDisplay();
}

// Same live-widget rationale as initOnlineTimer above, but checks the
// wall clock each second against a target time instead of counting
// down a fixed duration.
function initOnlineAlarm(fieldsId, resultId, formId) {
  const form = document.getElementById(formId);
  const fieldsContainer = document.getElementById(fieldsId);
  const resultPanel = document.getElementById(resultId);
  if (!form || !fieldsContainer || !resultPanel) return;
  form.style.display = "none";
  resultPanel.classList.remove("visible");

  const widget = document.createElement("div");
  widget.className = "timer-widget";
  widget.innerHTML = `
    <div class="timer-display" id="alarm-current">--:--:--</div>
    <div class="timer-inputs">
      <label>Hour <input type="number" id="alarm-hour" min="1" max="12" value="7" /></label>
      <label>Minute <input type="number" id="alarm-minute" min="0" max="59" value="0" /></label>
      <select id="alarm-period" aria-label="AM or PM">
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
    <div class="timer-actions">
      <button type="button" id="alarm-set" class="btn-primary">Set Alarm</button>
      <button type="button" id="alarm-cancel" class="btn-ghost" disabled>Cancel</button>
    </div>
    <p id="alarm-status" style="margin-top:16px;color:var(--muted);font-size:0.9rem;"></p>
  `;
  fieldsContainer.parentElement.insertBefore(widget, form);

  const currentEl = widget.querySelector("#alarm-current");
  const hourInput = widget.querySelector("#alarm-hour");
  const minuteInput = widget.querySelector("#alarm-minute");
  const periodSelect = widget.querySelector("#alarm-period");
  const setBtn = widget.querySelector("#alarm-set");
  const cancelBtn = widget.querySelector("#alarm-cancel");
  const statusEl = widget.querySelector("#alarm-status");

  let target = null; // { hour24, minute }
  let rang = false;
  let intervalId = null;

  function beep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      let t = ctx.currentTime;
      for (let i = 0; i < 3; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.2, t);
        osc.start(t);
        osc.stop(t + 0.3);
        t += 0.4;
      }
    } catch (e) { /* Audio unsupported/blocked — visual alert still works. */ }
  }

  function tick() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    currentEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    if (target && !rang && now.getHours() === target.hour24 && now.getMinutes() === target.minute) {
      rang = true;
      statusEl.textContent = "⏰ Alarm ringing!";
      currentEl.classList.add("timer-done");
      beep();
    }
  }

  setBtn.addEventListener("click", () => {
    let h = parseInt(hourInput.value, 10) || 12;
    h = h % 12;
    if (periodSelect.value === "PM") h += 12;
    target = { hour24: h, minute: parseInt(minuteInput.value, 10) || 0 };
    rang = false;
    currentEl.classList.remove("timer-done");
    const pad = (n) => String(n).padStart(2, "0");
    statusEl.textContent = `Alarm set for ${pad(h)}:${pad(target.minute)}.`;
    setBtn.disabled = true;
    cancelBtn.disabled = false;
    [hourInput, minuteInput, periodSelect].forEach((el) => (el.disabled = true));
  });

  cancelBtn.addEventListener("click", () => {
    target = null;
    rang = false;
    currentEl.classList.remove("timer-done");
    statusEl.textContent = "Alarm cancelled.";
    setBtn.disabled = false;
    cancelBtn.disabled = true;
    [hourInput, minuteInput, periodSelect].forEach((el) => (el.disabled = false));
  });

  intervalId = setInterval(tick, 1000);
  tick();
}

function initOnlineStopwatch(fieldsId, resultId, formId) {
  const form = document.getElementById(formId);
  const fieldsContainer = document.getElementById(fieldsId);
  const resultPanel = document.getElementById(resultId);
  if (!form || !fieldsContainer || !resultPanel) return;
  form.style.display = "none";
  resultPanel.classList.remove("visible");

  const widget = document.createElement("div");
  widget.className = "timer-widget";
  widget.innerHTML = `
    <div class="timer-display" id="stopwatch-display">00:00.0</div>
    <div class="timer-actions">
      <button type="button" id="stopwatch-start" class="btn-primary">Start</button>
      <button type="button" id="stopwatch-lap" class="btn-ghost" disabled>Lap</button>
      <button type="button" id="stopwatch-reset" class="btn-ghost">Reset</button>
    </div>
    <ol id="stopwatch-laps" class="stopwatch-laps"></ol>
  `;
  form.parentElement.insertBefore(widget, form);

  const display = widget.querySelector("#stopwatch-display");
  const startBtn = widget.querySelector("#stopwatch-start");
  const lapBtn = widget.querySelector("#stopwatch-lap");
  const resetBtn = widget.querySelector("#stopwatch-reset");
  const lapsList = widget.querySelector("#stopwatch-laps");

  let running = false;
  let startedAt = 0;
  let elapsedBeforeStart = 0;
  let intervalId = null;
  let lapCount = 0;
  let lastLapElapsed = 0;

  function format(ms) {
    const totalTenths = Math.floor(ms / 100);
    const tenths = totalTenths % 10;
    const totalSeconds = Math.floor(ms / 1000);
    const s = totalSeconds % 60;
    const m = Math.floor(totalSeconds / 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${tenths}`;
  }

  function currentElapsed() {
    return running ? elapsedBeforeStart + (Date.now() - startedAt) : elapsedBeforeStart;
  }

  function render() {
    display.textContent = format(currentElapsed());
  }

  startBtn.addEventListener("click", () => {
    if (running) {
      running = false;
      elapsedBeforeStart = currentElapsed();
      clearInterval(intervalId);
      intervalId = null;
      startBtn.textContent = "Resume";
      lapBtn.disabled = true;
    } else {
      running = true;
      startedAt = Date.now();
      intervalId = setInterval(render, 100);
      startBtn.textContent = "Stop";
      lapBtn.disabled = false;
    }
  });

  lapBtn.addEventListener("click", () => {
    lapCount += 1;
    const elapsed = currentElapsed();
    const lapTime = elapsed - lastLapElapsed;
    lastLapElapsed = elapsed;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCount}: ${format(lapTime)} (total ${format(elapsed)})`;
    lapsList.insertBefore(li, lapsList.firstChild);
  });

  resetBtn.addEventListener("click", () => {
    running = false;
    clearInterval(intervalId);
    intervalId = null;
    elapsedBeforeStart = 0;
    lapCount = 0;
    lastLapElapsed = 0;
    startBtn.textContent = "Start";
    lapBtn.disabled = true;
    lapsList.innerHTML = "";
    render();
  });

  render();
}

function initOnlineClock(fieldsId, resultId, formId) {
  const form = document.getElementById(formId);
  const fieldsContainer = document.getElementById(fieldsId);
  const resultPanel = document.getElementById(resultId);
  if (!form || !fieldsContainer || !resultPanel) return;
  form.style.display = "none";
  resultPanel.classList.remove("visible");

  const widget = document.createElement("div");
  widget.className = "timer-widget";
  widget.innerHTML = `
    <div class="timer-display" id="clock-time">--:--:--</div>
    <div id="clock-date" style="color:var(--muted);font-size:1rem;"></div>
  `;
  form.parentElement.insertBefore(widget, form);

  const timeEl = widget.querySelector("#clock-time");
  const dateEl = widget.querySelector("#clock-date");

  function render() {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    dateEl.textContent = now.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  }

  render();
  setInterval(render, 1000);
}

function initCalculator(calcId, opts = {}) {
  const {
    fieldsId = "calc-fields",
    resultId = "calc-result",
    formId = "calc-form",
    resetId = "calc-reset",
    live = false,
  } = opts;

  if (calcId === "online-timer") {
    initOnlineTimer(fieldsId, resultId, formId);
    return;
  }
  if (calcId === "online-alarm-clock") {
    initOnlineAlarm(fieldsId, resultId, formId);
    return;
  }
  if (calcId === "online-stopwatch") {
    initOnlineStopwatch(fieldsId, resultId, formId);
    return;
  }
  if (calcId === "current-time") {
    initOnlineClock(fieldsId, resultId, formId);
    return;
  }

  const calc = getCalculator(calcId);
  if (!calc) return;

  const fieldsContainer = document.getElementById(fieldsId);
  const resultPanel = document.getElementById(resultId);
  const form = document.getElementById(formId);
  if (!fieldsContainer || !resultPanel || !form) return;

  renderDiagram(calc);
  renderFieldsInto(fieldsContainer, calc);

  function runCalculation() {
    const values = collectValues(calc);
    const result = calc.compute(values);
    renderResult(resultPanel, result);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    runCalculation();
  });

  document.getElementById(resetId)?.addEventListener("click", () => {
    renderFieldsInto(fieldsContainer, calc);
    resultPanel.classList.remove("visible");
  });

  if (live) {
    fieldsContainer.addEventListener("input", runCalculation);
    fieldsContainer.addEventListener("change", runCalculation);
  }

  // Auto-calculate once on load with defaults so the page never feels empty
  runCalculation();

  // Print support: build a compact "what you entered" summary and a small
  // site-identifier footer right before the print dialog opens, so a printed
  // page reflects whatever is currently in the form, not stale defaults.
  window.addEventListener("beforeprint", () => {
    const summaryEl = document.getElementById("print-summary");
    if (summaryEl) {
      const parts = calc.fields
        .filter((f) => f.type !== "checkbox-group" && f.type !== "textarea")
        .map((f) => {
          const input = document.getElementById(`f-${f.id}`);
          if (!input) return null;
          let val = input.value;
          if (f.type === "select") {
            const opt = f.options.find((o) => o.v === input.value);
            val = opt ? opt.l : input.value;
          }
          return `${f.label}: ${val}${f.unit ? ` ${f.unit}` : ""}`;
        })
        .filter(Boolean);
      summaryEl.textContent = "You entered — " + parts.join(" · ");
    }
    const footerEl = document.getElementById("print-footer");
    if (footerEl) {
      footerEl.textContent = `Calquary — calquary.com${window.location.pathname}`;
    }
  });
}
