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

  const copyByLanguage = {
    en: {
      title: "Your privacy choices",
      message: "Allow the Meta Pixel to measure visits from our Meta ads. It will load only if you allow advertising cookies.",
      allow: "Allow advertising cookies",
      decline: "Decline",
      settings: "Privacy choices",
      privacy: "Privacy Policy",
      label: "Advertising cookie choices"
    },
    pt: {
      title: "Suas escolhas de privacidade",
      message: "Permita o Pixel da Meta para medir visitas que vieram dos nossos anúncios. Ele só será carregado se você aceitar cookies de publicidade.",
      allow: "Aceitar cookies de publicidade",
      decline: "Recusar",
      settings: "Opções de privacidade",
      privacy: "Política de Privacidade",
      label: "Escolhas sobre cookies de publicidade"
    },
    es: {
      title: "Tus opciones de privacidad",
      message: "Permite el Píxel de Meta para medir visitas que llegaron desde nuestros anuncios. Solo se cargará si aceptas las cookies publicitarias.",
      allow: "Aceptar cookies publicitarias",
      decline: "Rechazar",
      settings: "Opciones de privacidad",
      privacy: "Política de privacidad",
      label: "Opciones de cookies publicitarias"
    }
  };
  const lang = (document.documentElement.lang || "en").toLowerCase().slice(0, 2);
  const copy = copyByLanguage[lang] || copyByLanguage.en;
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

  const setConsent = (granted) => {
    window.magicBalloonAdvertisingConsentGranted = granted;
    try {
      window.localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
    } catch (_) {
      // Keep the choice for this page view if browser storage is unavailable.
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: { granted } }));
  };

  const showChoices = () => {
    if (document.getElementById("magic-balloon-ad-choices")) return;

    const banner = document.createElement("section");
    banner.id = "magic-balloon-ad-choices";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", copy.label);
    banner.style.cssText = "position:fixed;z-index:2147483000;left:16px;right:16px;bottom:16px;max-width:720px;margin:0 auto;padding:20px;border:1px solid #d5dfec;border-radius:14px;background:#fff;color:#17243a;box-shadow:0 8px 32px rgba(15,23,42,.22);font:16px/1.5 system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;";

    const title = document.createElement("h2");
    title.textContent = copy.title;
    title.style.cssText = "margin:0 0 6px;font-size:18px;line-height:1.3;";
    const message = document.createElement("p");
    message.textContent = copy.message;
    message.style.cssText = "margin:0 0 14px;";
    const actions = document.createElement("div");
    actions.style.cssText = "display:flex;flex-wrap:wrap;gap:10px;align-items:center;";

    const makeButton = (label, granted, primary) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.style.cssText = `min-height:42px;padding:9px 14px;border:1px solid ${primary ? "#263f67" : "#8392a8"};border-radius:8px;background:${primary ? "#263f67" : "#fff"};color:${primary ? "#fff" : "#17243a"};font:600 14px/1.3 system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;cursor:pointer;`;
      button.addEventListener("click", () => {
        setConsent(granted);
        banner.remove();
      });
      return button;
    };

    const privacyLink = document.createElement("a");
    privacyLink.href = lang === "pt" ? "/pt/privacy/" : lang === "es" ? "/es/privacy/" : "/privacy/";
    privacyLink.textContent = copy.privacy;
    privacyLink.style.cssText = "color:#234d86;font-size:14px;";
    actions.append(makeButton(copy.allow, true, true), makeButton(copy.decline, false, false), privacyLink);
    banner.append(title, message, actions);
    document.body.appendChild(banner);
  };

  const settings = document.createElement("button");
  settings.type = "button";
  settings.textContent = copy.settings;
  settings.setAttribute("aria-label", copy.label);
  settings.style.cssText = "position:fixed;z-index:2147482999;right:12px;bottom:12px;padding:7px 10px;border:1px solid #8392a8;border-radius:8px;background:#fff;color:#263f67;font:12px/1.3 system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;cursor:pointer;";
  settings.addEventListener("click", showChoices);
  document.body.appendChild(settings);

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
    showChoices();
  }
})();
