"use strict";

(() => {
  const PIXEL_ID = "1768490507729160";
  const CONSENT_EVENT = "magicballoon:advertising-consent";
  const CONSENT_KEY = "magicBalloonAdvertisingConsent";
  const isLocalEnvironment =
    window.location.protocol === "file:" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const state = window.__magicBalloonMetaPixelV1 || {
    initialized: false,
    pageViewSent: false
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
