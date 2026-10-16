"use strict";

(() => {
  if (!document.body.classList.contains("landing-page")) return;

  const sticky = document.querySelector(".lp-mobile-bar");
  const hero = document.querySelector(".lp-hero");
  const finalCta = document.querySelector(".lp-final");
  const mobile = window.matchMedia("(max-width: 699px)");
  if (!sticky || !hero || !finalCta) return;

  let updatePending = false;

  const updateSticky = () => {
    updatePending = false;
    const heroRect = hero.getBoundingClientRect();
    const finalRect = finalCta.getBoundingClientRect();
    const passedHero = heroRect.bottom <= 0;
    const reachedFinalCta = finalRect.top < window.innerHeight;

    sticky.hidden = !mobile.matches || !passedHero || reachedFinalCta;
  };

  const scheduleUpdate = () => {
    if (updatePending) return;
    updatePending = true;
    window.requestAnimationFrame(updateSticky);
  };

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate, { passive: true });
  window.addEventListener("pageshow", updateSticky);

  if (typeof mobile.addEventListener === "function") {
    mobile.addEventListener("change", updateSticky);
  } else {
    mobile.addListener(updateSticky);
  }

  updateSticky();
})();
