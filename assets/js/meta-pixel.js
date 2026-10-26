"use strict";

(() => {
  // This file is shared by the institutional site and both campaign landings.
  // Keep one controller even if a page accidentally includes it more than once.
  if (window.__magicBalloonMetaPixelController) return;

  const PIXEL_ID = "2124085064913325";
  const CONSENT_KEY = "magicBalloonAdvertisingConsent";
  const CONSENT_EVENT = "magicballoon:advertising-consent";
  const state = {
    initialized: false,
    pageViewSent: false,
    finalCTAViewSent: false
  };
  window.__magicBalloonMetaPixelController = state;

  const isLocalEnvironment = ["localhost", "127.0.0.1"].includes(window.location.hostname) ||
    window.location.protocol === "file:";
  const isGpcEnabled = () => navigator.globalPrivacyControl === true;
  const readChoice = () => {
    try {
      return window.localStorage.getItem(CONSENT_KEY);
    } catch (_) {
      return null;
    }
  };
  const hasAdvertisingConsent = () =>
    window.magicBalloonAdvertisingConsentGranted === true && !isGpcEnabled();

  const updateChoiceControls = () => {
    const status = document.querySelector("[data-advertising-consent-status]");
    const allow = document.querySelector('[data-advertising-consent="granted"]');
    const decline = document.querySelector('[data-advertising-consent="denied"]');
    const choice = readChoice();

    if (allow) allow.setAttribute("aria-pressed", String(choice === "granted"));
    if (decline) decline.setAttribute("aria-pressed", String(choice === "denied"));
    if (!status) return;

    status.textContent = isGpcEnabled()
      ? status.dataset.gpcMessage
      : choice === "granted"
        ? status.dataset.grantedMessage
        : choice === "denied"
          ? status.dataset.deniedMessage
          : status.dataset.unknownMessage;
  };

  const ensurePixelQueue = () => {
    if (typeof window.fbq === "function") return;
    const fbq = function () {
      if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
      else fbq.queue.push(arguments);
    };
    window.fbq = fbq;
    window._fbq = window._fbq || fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
  };

  const loadPixelScript = () => {
    const alreadyLoaded = document.querySelector(
      'script[data-magic-balloon-meta-pixel], script[src*="connect.facebook.net/en_US/fbevents.js"]'
    );
    if (alreadyLoaded) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    script.dataset.magicBalloonMetaPixel = "";
    document.head.appendChild(script);
  };

  const initializePixel = () => {
    if (isLocalEnvironment || !hasAdvertisingConsent() || state.initialized) return;
    ensurePixelQueue();
    loadPixelScript();

    state.initialized = true;
    window.fbq("consent", "grant");
    window.fbq("init", PIXEL_ID);
    if (!state.pageViewSent) {
      state.pageViewSent = true;
      window.fbq("trackSingle", PIXEL_ID, "PageView");
    }
    observeFinalCTA();
  };

  const applyConsentChoice = (granted, persist) => {
    const allowed = granted === true && !isGpcEnabled();
    window.magicBalloonAdvertisingConsentGranted = allowed;

    if (persist) {
      try {
        window.localStorage.setItem(CONSENT_KEY, granted === true ? "granted" : "denied");
      } catch (_) {
        // The explicit choice still applies for this page if storage is unavailable.
      }
    }

    if (state.initialized && typeof window.fbq === "function") {
      window.fbq("consent", allowed ? "grant" : "revoke");
    }
    if (allowed) initializePixel();
    updateChoiceControls();
  };

  const sendCustomEvent = (name, parameters, options) => {
    if (!hasAdvertisingConsent() || !state.initialized || typeof window.fbq !== "function") return false;
    window.fbq("trackSingleCustom", PIXEL_ID, name, parameters || {}, options);
    return true;
  };

  const observeFinalCTA = () => {
    if (!hasAdvertisingConsent() || !state.initialized || state.finalCTAViewSent ||
        typeof window.IntersectionObserver !== "function") return;
    const targets = document.querySelectorAll(".global-final-cta, .lp-request-card, [data-final-cta]");
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
      if (!hasAdvertisingConsent() || state.finalCTAViewSent) {
        observer.disconnect();
        return;
      }
      const visible = entries.find((entry) => entry.isIntersecting);
      if (!visible) return;

      state.finalCTAViewSent = sendCustomEvent("FinalCTAView", {
        cta_location: visible.target.dataset.location || visible.target.id || "final_cta",
        page_language: document.documentElement.lang || "unspecified"
      });
      observer.disconnect();
    }, { threshold: 0.1 });

    targets.forEach((target) => observer.observe(target));
  };

  const sendClickEvents = (element, navigationOptions) => {
    if (!hasAdvertisingConsent() || !state.initialized) return false;
    const action = element.dataset.track;
    const location = element.dataset.location || "unspecified";
    const parameters = {
      cta_location: location,
      page_language: document.documentElement.lang || "unspecified"
    };
    const isFinalCTA = /(?:^|_)final(?:_|$)|final_cta/i.test(location) ||
      Boolean(element.closest(".global-final-cta, .lp-request-card, [data-final-cta]"));
    const contactEvents = { phone: "PhoneClick", text: "TextClick", email: "EmailClick" };

    let sent = false;
    if (contactEvents[action]) {
      sent = sendCustomEvent(contactEvents[action], parameters);
    } else if (action === "family_request") {
      // The primary event owns the navigation callback. The final CTA event is supplementary.
      sent = sendCustomEvent("FamilyRequestClick", parameters, navigationOptions);
    }

    if (isFinalCTA) {
      sendCustomEvent("FinalCTAClick", {
        ...parameters,
        cta_action: action || "other"
      });
      sent = true;
    }
    return sent;
  };

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : event.target?.parentElement;
    const element = target?.closest("[data-track]");
    if (!element) return;

    const destination = element instanceof HTMLAnchorElement
      ? new URL(element.href, window.location.href)
      : null;
    const isLandingRequest = element.dataset.track === "family_request" &&
      element.dataset.location?.startsWith("landing_") &&
      destination?.hostname === "www.smartimateapp.com" &&
      destination.searchParams.get("company") === "magic-balloon-childcare";
    const sameTab = !element.target || element.target.toLowerCase() === "_self";
    const plainClick = event.button === 0 &&
      !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

    if (!isLandingRequest || !sameTab || !plainClick || !hasAdvertisingConsent() || !state.initialized) {
      sendClickEvents(element);
      return;
    }

    event.preventDefault();
    let navigated = false;
    const navigate = () => {
      if (navigated) return;
      navigated = true;
      window.clearTimeout(fallbackTimer);
      // landing.js prepares this URL before any click handler runs.
      window.location.assign(element.href);
    };
    const fallbackTimer = window.setTimeout(navigate, 1500);
    const sent = sendClickEvents(element, { eventCallback: navigate, eventTimeout: 1200 });
    if (!sent) navigate();
  }, { capture: true });

  document.querySelectorAll("[data-advertising-consent]").forEach((button) => {
    button.addEventListener("click", () => {
      applyConsentChoice(button.dataset.advertisingConsent === "granted", true);
    });
  });

  window.addEventListener("storage", (event) => {
    if (event.key === CONSENT_KEY) applyConsentChoice(event.newValue === "granted", false);
  });
  window.addEventListener(CONSENT_EVENT, (event) => {
    applyConsentChoice(event.detail?.granted === true, true);
  });

  applyConsentChoice(readChoice() === "granted", false);
})();
