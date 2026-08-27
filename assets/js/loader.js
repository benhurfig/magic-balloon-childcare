"use strict";

(() => {
  const intro = document.querySelector("[data-site-intro]");

  if (!intro) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const removalDelay = reducedMotion ? 220 : 1600;

  window.setTimeout(() => {
    intro.remove();
  }, removalDelay);
})();
