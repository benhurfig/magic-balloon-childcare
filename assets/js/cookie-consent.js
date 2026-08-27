"use strict";

(() => {
  const storageKey = "magicBalloonCookieConsent";
  const config = window.MAGIC_BALLOON_CONFIG || {};
  const copy = {
    "en-US": { text: "We use optional analytics cookies to improve the website.", accept: "Accept analytics", reject: "Decline", settings: "Cookie Settings", label: "Cookie consent" },
    "pt-BR": { text: "Usamos cookies opcionais de análise para melhorar o website.", accept: "Aceitar analytics", reject: "Recusar", settings: "Configurações de Cookies", label: "Consentimento de cookies" },
    es: { text: "Usamos cookies opcionales de análisis para mejorar el sitio web.", accept: "Aceptar analytics", reject: "Rechazar", settings: "Configuración de Cookies", label: "Consentimiento de cookies" }
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
    if (!/^G-[A-Z0-9]+$/.test(id || "") || document.querySelector("[data-google-analytics]")) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    script.dataset.googleAnalytics = "";
    document.head.appendChild(script);
    window.gtag("js", new Date());
    window.gtag("config", id, { transport_type: "beacon" });
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
    const settings = document.querySelector("[data-cookie-settings]");
    const panel = document.createElement("section");
    panel.className = "cookie-consent";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", copy.label);
    panel.hidden = true;
    panel.innerHTML = `<p>${copy.text}</p><div class="cookie-consent__actions"><button class="cookie-consent__button" type="button" data-cookie-reject>${copy.reject}</button><button class="cookie-consent__button cookie-consent__button--accept" type="button" data-cookie-accept>${copy.accept}</button></div>`;
    if (settings) settings.textContent = copy.settings;
    document.body.append(panel);

    const save = (value) => {
      try { localStorage.setItem(storageKey, value); } catch (error) { /* Storage may be unavailable. */ }
    };
    const choose = (accepted) => {
      save(accepted ? "accepted" : "rejected");
      applyChoice(accepted);
      panel.hidden = true;
      if (settings) settings.hidden = false;
    };
    panel.querySelector("[data-cookie-accept]").addEventListener("click", () => choose(true));
    panel.querySelector("[data-cookie-reject]").addEventListener("click", () => choose(false));
    settings?.addEventListener("click", () => {
      panel.hidden = false;
      settings.hidden = true;
      panel.querySelector("[data-cookie-reject]").focus();
    });

    let saved = null;
    try { saved = localStorage.getItem(storageKey); } catch (error) { /* Storage may be unavailable. */ }
    if (saved === "accepted" || saved === "rejected") {
      applyChoice(saved === "accepted");
      if (settings) settings.hidden = false;
    } else {
      panel.hidden = false;
    }
  }, { once: true });
})();
