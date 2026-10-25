"use strict";

(() => {
  const PIXEL_ID = "2124085064913325";
  const CONSENT_EVENT = "magicballoon:advertising-consent";
  const CONSENT_KEY = "magicBalloonAdvertisingConsent";
  const isLocalEnvironment =
    window.location.protocol === "file:" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const state = window.__magicBalloonMetaPixelV1 || {
    initialized: false,
    pageViewSent: false,
    finalCTAViewSent: false
  };
  window.__magicBalloonMetaPixelV1 = state;
  const isGpcEnabled = () => navigator.globalPrivacyControl === true;
  const readConsent = () => {
    try {
      return window.localStorage.getItem(CONSENT_KEY);
    } catch (_) {
      return null;
    }
  };

  const hasAdvertisingConsent = () =>
    window.magicBalloonAdvertisingConsentGranted === true &&
    !isGpcEnabled();

  const updateChoiceControls = () => {
    const status = document.querySelector("[data-advertising-consent-status]");
    const allow = document.querySelector('[data-advertising-consent="granted"]');
    const decline = document.querySelector('[data-advertising-consent="denied"]');
    const preference = readConsent();

    if (allow) allow.setAttribute("aria-pressed", String(preference === "granted"));
    if (decline) decline.setAttribute("aria-pressed", String(preference === "denied"));
    if (!status) return;

    if (isGpcEnabled()) {
      status.textContent = status.dataset.gpcMessage;
    } else if (preference === "granted") {
      status.textContent = status.dataset.grantedMessage;
    } else if (preference === "denied") {
      status.textContent = status.dataset.deniedMessage;
    } else {
      status.textContent = status.dataset.unknownMessage;
    }
  };

  const sendMetaClickEvent = (element, eventOptions) => {
    if (!hasAdvertisingConsent() || !state.initialized || typeof window.fbq !== "function") return false;

    const action = element.dataset.track;
    const location = element.dataset.location || "unspecified";
    const language = document.documentElement.lang || "unspecified";
    const isFinalCTA = /(?:^|_)final(?:_|$)|final_cta/i.test(location) ||
      Boolean(element.closest(".global-final-cta, .lp-request-card, [data-final-cta]"));
    const parameters = { cta_location: location, page_language: language };

    const contactEvent = {
      phone: "PhoneClick",
      text: "TextClick",
      email: "EmailClick"
    }[action];

    if (contactEvent) {
      window.fbq("trackSingleCustom", PIXEL_ID, contactEvent, parameters);
    } else if (action === "family_request") {
      // FamilyRequestClick is the primary conversion click and owns the
      // navigation callback. FinalCTAClick is supplementary only.
      window.fbq("trackSingleCustom", PIXEL_ID, "FamilyRequestClick", parameters, eventOptions);
    }

    if (isFinalCTA) {
      window.fbq("trackSingleCustom", PIXEL_ID, "FinalCTAClick", {
        ...parameters,
        cta_action: action || "other"
      });
    }

    return Boolean(contactEvent || action === "family_request" || isFinalCTA);
  };

  const observeFinalCTA = () => {
    if (!hasAdvertisingConsent() || !state.initialized || state.finalCTAViewSent) return;
    const targets = document.querySelectorAll(".global-final-cta, .lp-request-card, [data-final-cta]");
    if (!targets.length || typeof window.IntersectionObserver !== "function") return;

    const observer = new IntersectionObserver((entries) => {
      if (!hasAdvertisingConsent() || state.finalCTAViewSent) {
        observer.disconnect();
        return;
      }
      const visible = entries.find((entry) => entry.isIntersecting);
      if (!visible) return;

      state.finalCTAViewSent = true;
      window.fbq("trackSingleCustom", PIXEL_ID, "FinalCTAView", {
        cta_location: visible.target.dataset.location || visible.target.id || "final_cta",
        page_language: document.documentElement.lang || "unspecified"
      });
      observer.disconnect();
    }, { threshold: 0.1 });

    targets.forEach((target) => observer.observe(target));
  };

  const initialize = () => {
    if (isLocalEnvironment || !hasAdvertisingConsent() || state.initialized) return;

    if (!window.fbq) {
      const fbq = function () {
        if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
        else fbq.queue.push(arguments);
      };
      window.fbq = fbq;
      if (!window._fbq) window._fbq = fbq;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = [];
    }

    if (!document.querySelector("script[data-magic-balloon-meta-pixel]")) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      script.dataset.magicBalloonMetaPixel = "";
      document.head.appendChild(script);
    }

    state.initialized = true;
    window.fbq("consent", "grant");
    window.fbq("init", PIXEL_ID);
    if (!state.pageViewSent) {
      state.pageViewSent = true;
      window.fbq("track", "PageView");
    }
    observeFinalCTA();
  };

  const applyConsent = (granted, persist) => {
    const allowed = granted === true && !isGpcEnabled();
    window.magicBalloonAdvertisingConsentGranted = allowed;

    if (persist) {
      try {
        window.localStorage.setItem(CONSENT_KEY, granted === true ? "granted" : "denied");
      } catch (_) {
        // This explicit choice applies for the current page if storage is unavailable.
      }
    }

    if (window.fbq) {
      window.fbq("consent", allowed ? "grant" : "revoke");
    }
    if (allowed) initialize();
    updateChoiceControls();
  };

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : event.target?.parentElement;
    const element = target?.closest("[data-track]");
    if (!element) return;

    const isLandingRequest = element.dataset.track === "family_request" &&
      element.dataset.location?.startsWith("landing_") &&
      element.hostname === "www.smartimateapp.com";
    const isSameTabNavigation = !element.target || element.target.toLowerCase() === "_self";
    const isUnmodifiedPrimaryClick = event.button === 0 &&
      !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

    // Give the browser Pixel time to send the click event before same-tab navigation.
    // If consent is absent or the click opens a new tab, leave normal navigation untouched.
    if (!isLandingRequest || !isSameTabNavigation || !isUnmodifiedPrimaryClick ||
        !hasAdvertisingConsent() || !state.initialized || typeof window.fbq !== "function") {
      sendMetaClickEvent(element);
      return;
    }

    event.preventDefault();
    let navigated = false;
    const destination = element.href;
    const navigate = () => {
      if (navigated) return;
      navigated = true;
      window.clearTimeout(fallbackTimer);
      window.location.assign(destination);
    };
    const fallbackTimer = window.setTimeout(navigate, 2200);
    const sent = sendMetaClickEvent(element, {
      eventCallback: navigate,
      eventTimeout: 1800
    });

    if (!sent) navigate();
  });

  document.querySelectorAll("[data-advertising-consent]").forEach((button) => {
    button.addEventListener("click", () => {
      applyConsent(button.dataset.advertisingConsent === "granted", true);
    });
  });

  // Keep other open tabs in sync when a visitor changes their choice.
  window.addEventListener("storage", (event) => {
    if (event.key !== CONSENT_KEY) return;
    applyConsent(event.newValue === "granted", false);
  });

  // External consent managers can update the preference through this event.
  window.addEventListener(CONSENT_EVENT, (event) => {
    applyConsent(event.detail?.granted === true, true);
  });

  applyConsent(readConsent() === "granted", false);
})();
