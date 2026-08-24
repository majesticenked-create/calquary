/* ============================================================
   Calquary — language dropdown open/close behavior
   Mirrors js/theme.js's #theme-toggle click-handler pattern (the button
   right next to this one): DOMContentLoaded, direct element lookup, a
   click listener that flips a class + aria-expanded. The menu markup
   itself (trigger + .locale-menu of .locale-item links) is generated
   server-side per locale by build.js's localeSwitcherHtml() — this file
   only handles show/hide, not which locales exist or where they link.
   ============================================================ */

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var switchers = document.querySelectorAll(".locale-switcher");
    if (!switchers.length) return;

    function closeAll(except) {
      switchers.forEach(function (el) {
        if (el === except) return;
        el.classList.remove("open");
        var trigger = el.querySelector(".locale-trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
    }

    switchers.forEach(function (el) {
      var trigger = el.querySelector(".locale-trigger");
      if (!trigger) return;

      trigger.addEventListener("click", function (e) {
        e.stopPropagation();
        var isOpen = el.classList.contains("open");
        closeAll(isOpen ? null : el);
        el.classList.toggle("open", !isOpen);
        trigger.setAttribute("aria-expanded", String(!isOpen));
      });
    });

    // Click outside any switcher closes whichever one is open.
    document.addEventListener("click", function () {
      closeAll(null);
    });

    // Escape closes and returns focus to the trigger, standard menu behavior.
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      switchers.forEach(function (el) {
        if (!el.classList.contains("open")) return;
        el.classList.remove("open");
        var trigger = el.querySelector(".locale-trigger");
        if (trigger) {
          trigger.setAttribute("aria-expanded", "false");
          trigger.focus();
        }
      });
    });
  });
})();
