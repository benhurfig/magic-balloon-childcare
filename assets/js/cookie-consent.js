"use strict";

(() => {
  const storageKey = "magicBalloonCookieConsent";
  const config = window.MAGIC_BALLOON_CONFIG || {};
  const copy = {
    "en-US": { text: "We use optional analytics cookies to improve the website.", accept: "Accept analytics", reject: "Decline", settings: "Cookie settings", label: "Cookie consent" },
    "pt-BR": { text: "Usamos cookies opcionais de análise para melhorar o website.", accept: "Aceitar analytics", reject: "Recusar", settings: "Configurar cookies", label: "Consentimento de cookies" },
    es: { text: "Usamos cookies opcionales de análisis para mejorar el sitio web.", accept: "Aceptar analytics", reject: "Rechazar", settings: "Configurar cookies", label: "Consentimiento de cookies" }
  }[document.documentElement.lang] || null;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.analyticsConsentGranted = false;
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "granted",
    security_storage: "granted"
  });

  const loadAnalytics = () => {
    const id = config.ga4MeasurementId;
    if (!id || id === "G-XXXXXXXXXX" || document.querySelector("[data-google-analytics]")) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    script.dataset.googleAnalytics = "";
    document.head.appendChild(script);
    window.gtag("js", new Date());
    window.gtag("config", id);
  };

  const applyChoice = (accepted) => {
    window.analyticsConsentGranted = accepted;
    window.gtag("consent", "update", {
      analytics_storage: accepted ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    if (accepted) loadAnalytics();
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (!copy) return;
    const panel = document.createElement("section");
    panel.className = "cookie-consent";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", copy.label);
    panel.hidden = true;
    panel.innerHTML = `<p>${copy.text}</p><div class="cookie-consent__actions"><button class="cookie-consent__button" type="button" data-cookie-reject>${copy.reject}</button><button class="cookie-consent__button cookie-consent__button--accept" type="button" data-cookie-accept>${copy.accept}</button></div>`;
    const settings = document.createElement("button");
    settings.className = "cookie-settings";
    settings.type = "button";
    settings.textContent = copy.settings;
    settings.hidden = true;
    document.body.append(panel, settings);

    const save = (value) => {
      try { localStorage.setItem(storageKey, value); } catch (error) { /* Storage may be unavailable. */ }
    };
    const choose = (accepted) => {
      save(accepted ? "accepted" : "rejected");
      applyChoice(accepted);
      panel.hidden = true;
      settings.hidden = false;
      settings.focus();
    };
    panel.querySelector("[data-cookie-accept]").addEventListener("click", () => choose(true));
    panel.querySelector("[data-cookie-reject]").addEventListener("click", () => choose(false));
    settings.addEventListener("click", () => {
      panel.hidden = false;
      settings.hidden = true;
      panel.querySelector("[data-cookie-reject]").focus();
    });

    let saved = null;
    try { saved = localStorage.getItem(storageKey); } catch (error) { /* Storage may be unavailable. */ }
    if (saved === "accepted" || saved === "rejected") {
      applyChoice(saved === "accepted");
      settings.hidden = false;
    } else {
      panel.hidden = false;
    }
  }, { once: true });
})();
