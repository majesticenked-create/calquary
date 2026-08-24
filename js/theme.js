/* ============================================================
   Calquary — theme toggle (light / dark / system)
   The early blocking script in each page's <head> (duplicated per
   page, same as favicon links elsewhere) already applies any stored
   preference before first paint to avoid a flash of the wrong theme.
   This file only wires up the toggle button's click behavior.
   ============================================================ */

(function () {
  var STORAGE_KEY = "calquary-theme";

  function getStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function setStored(value) {
    try {
      if (value) localStorage.setItem(STORAGE_KEY, value);
      else localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  function apply(value) {
    if (value === "light" || value === "dark") {
      document.documentElement.setAttribute("data-theme", value);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  function label(value) {
    if (value === "dark") return "dark";
    if (value === "light") return "light";
    return "auto";
  }

  // Sun / crescent-moon / half-filled-circle ("auto", following system),
  // stroke="currentColor" so each just inherits the button's color — same
  // pattern as the category icons.
  var ICONS = {
    light: '<circle cx="12" cy="12" r="4.5"/><path d="M12 3v2M12 19v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M3 12h2M19 12h2M4.6 19.4l1.4-1.4M18 6l1.4-1.4"/>',
    dark: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.2 6.2 0 0 0 10.5 10.5Z"/>',
    auto: '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" stroke="none"/>',
  };
  function iconSvg(value) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[label(value)] + '</svg>';
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    var order = [null, "light", "dark"];

    function refresh() {
      var stored = getStored();
      btn.innerHTML = iconSvg(stored);
      btn.setAttribute("aria-label", "Color theme: " + label(stored) + ". Click to change.");
    }
    refresh();

    btn.addEventListener("click", function () {
      var current = getStored();
      var next = order[(order.indexOf(current) + 1) % order.length];
      setStored(next);
      apply(next);
      refresh();
    });
  });
})();
