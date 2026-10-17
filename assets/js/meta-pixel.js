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

  const hasAdvertisingConsent = () =>
    window.magicBalloonAdvertisingConsentGranted === true &&
    navigator.globalPrivacyControl !== true;

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
    window.fbq("init", PIXEL_ID);
    if (!state.pageViewSent) {
      state.pageViewSent = true;
      window.fbq("track", "PageView");
    }
  };

  // A consent manager may grant consent by dispatching this event after an
  // explicit choice. This script does not display an on-page prompt.
  window.addEventListener(CONSENT_EVENT, (event) => {
    window.magicBalloonAdvertisingConsentGranted = event.detail?.granted === true;
    if (window.magicBalloonAdvertisingConsentGranted) initialize();
  });

  let savedConsent = null;
  try {
    savedConsent = window.localStorage.getItem(CONSENT_KEY);
  } catch (_) {
    // Ask on this visit when browser storage is unavailable.
  }

  if (navigator.globalPrivacyControl === true || savedConsent === "denied") {
    window.magicBalloonAdvertisingConsentGranted = false;
  } else if (savedConsent === "granted") {
    window.magicBalloonAdvertisingConsentGranted = true;
    initialize();
  } else {
    window.magicBalloonAdvertisingConsentGranted = false;
  }
})();
