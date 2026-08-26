"use strict";

(() => {
  const intro = document.querySelector("[data-site-intro]");

  if (!intro) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const removalDelay = reducedMotion ? 120 : 1550;

  window.setTimeout(() => {
    intro.remove();
  }, removalDelay);
})();
