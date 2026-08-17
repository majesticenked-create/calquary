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

function renderResult(panel, result) {
  panel.classList.add("visible");
  const primaryValue = panel.querySelector(".result-primary .value");
  const primaryLabel = panel.querySelector(".result-primary .label");
  primaryValue.textContent = result.primary.value;
  primaryLabel.textContent = result.primary.label;

  const secWrap = panel.querySelector(".result-secondary");
  secWrap.innerHTML = "";
  (result.secondary || []).forEach((item) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<div class="v">${item.v}</div><div class="l">${item.l}</div>`;
    secWrap.appendChild(div);
  });

  const noteEl = panel.querySelector(".result-notes");
  if (result.note) {
    noteEl.textContent = result.note;
    noteEl.style.display = "block";
  } else {
    noteEl.style.display = "none";
  }
}

function initCalculator(calcId) {
  const calc = getCalculator(calcId);
  if (!calc) return;

  const fieldsContainer = document.getElementById("calc-fields");
  const resultPanel = document.getElementById("calc-result");
  const form = document.getElementById("calc-form");

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

  document.getElementById("calc-reset")?.addEventListener("click", () => {
    renderFieldsInto(fieldsContainer, calc);
    resultPanel.classList.remove("visible");
  });

  // Auto-calculate once on load with defaults so the page never feels empty
  runCalculation();
}
