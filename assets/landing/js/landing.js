/* Isolated landing behavior. No Pixel, new Lead event, form, or persistent storage. */
"use strict";
(() => {
  const body = document.body;
  if (!body.classList.contains("mb-landing")) return;
  const config = window.MAGIC_BALLOON_CONFIG || {};
  const fallback = "https://www.smartimateapp.com/family-request/?company=magic-balloon-childcare";
  const allowedHostnames = new Set(["www.smartimateapp.com", "smartimateapp.com"]);
  // Carry only campaign identifiers. Never forward arbitrary visitor query strings.
  const campaignKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id", "fbclid", "gclid"];
  const incoming = new URLSearchParams(window.location.search);
  let destination;
  try {
    destination = new URL(config.familyRequestUrl || fallback);
    if (destination.protocol !== "https:" || !allowedHostnames.has(destination.hostname)) {
      destination = new URL(fallback);
    }
  } catch (_) {
    destination = new URL(fallback);
  }
  destination.searchParams.set("company", "magic-balloon-childcare");
  campaignKeys.forEach((key) => {
    const value = incoming.get(key);
    if (value && value.length <= 1000) destination.searchParams.set(key, value);
  });
  document.querySelectorAll('a[data-track="family_request"]').forEach((anchor) => {
    anchor.href = destination.toString();
    // Same-tab handoff works without popups in social in-app browsers.
    anchor.removeAttribute("target");
  });
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  // Local/preview hosts never send test visits to the client's live GA4 property.
  // On the official site reuse BOTH existing scripts, unchanged and once each.
  const productionHosts = new Set(["www.magicballoonchildcare.com", "magicballoonchildcare.com"]);
  const loadExistingScript = (src, callback) => {
    if (document.querySelector(`script[data-landing-analytics="${src}"]`)) return;
    const script = document.createElement("script");
    script.src = src;
    script.dataset.landingAnalytics = src;
    script.async = false;
    if (callback) script.addEventListener("load", callback, { once: true });
    document.head.appendChild(script);
  };
  if (productionHosts.has(window.location.hostname)) {
    loadExistingScript("/assets/js/analytics-bootstrap.js", () => {
      loadExistingScript("/assets/js/analytics-events.js");
    });
  }

  // Progressive video enhancement: native controls remain the fallback.
  const video = document.querySelector("#daycare-tour");
  const playButton = document.querySelector("[data-play-tour]");
  const videoError = document.querySelector(".lp-video-error");
  if (video && playButton) {
    playButton.hidden = false;
    playButton.addEventListener("click", async () => {
      playButton.disabled = true;
      try {
        await video.play();
        playButton.hidden = true;
        video.focus();
      } catch (_) {
        playButton.hidden = true;
        if (videoError) videoError.hidden = false;
        video.controls = true;
      } finally {
        playButton.disabled = false;
      }
    });
    video.addEventListener("play", () => { playButton.hidden = true; });
    video.addEventListener("ended", () => { playButton.hidden = false; });
    video.addEventListener("error", () => {
      playButton.hidden = true;
      if (videoError) videoError.hidden = false;
    });
  }

  // Native <details> is functional without this optional single-open behavior.
  const questions = [...document.querySelectorAll('.lp-faq-list details')];
  questions.forEach((current) => {
    current.addEventListener("toggle", () => {
      if (current.open) questions.forEach((other) => {
        if (other !== current) other.open = false;
      });
    });
  });

  // Sticky actions appear only after the hero CTA, and disappear before the
  // full contact section. No overlapping buttons or blocking the page footer.
  const sticky = document.querySelector(".lp-mobile-bar");
  const heroAction = document.querySelector('[data-location="landing_hero_family_request"]');
  const contact = document.querySelector("#contact");
  let pending = false;
  const updateSticky = () => {
    pending = false;
    if (!sticky || !heroAction || !contact) return;
    const mobile = window.matchMedia("(max-width: 699px)").matches;
    const passedHero = heroAction.getBoundingClientRect().bottom < 70;
    const reachedContact = contact.getBoundingClientRect().top < window.innerHeight - 80;
    sticky.hidden = !mobile || !passedHero || reachedContact;
  };
  const scheduleSticky = () => {
    if (!pending) {
      pending = true;
      window.requestAnimationFrame(updateSticky);
    }
  };
  window.addEventListener("scroll", scheduleSticky, { passive: true });
  window.addEventListener("resize", scheduleSticky, { passive: true });
  window.addEventListener("pageshow", updateSticky);
  updateSticky();
})();
