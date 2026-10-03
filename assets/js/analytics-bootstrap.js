"use strict";

(() => {
  const config = window.MAGIC_BALLOON_CONFIG || {};
  const id = config.ga4MeasurementId;
  if (!/^G-[A-Z0-9]+$/.test(id || "") || document.querySelector("[data-google-analytics]")) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.analyticsConsentGranted = true;
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "granted",
    security_storage: "granted"
  });
  window.gtag("js", new Date());
  window.gtag("config", id, {
    transport_type: "beacon",
    linker: {
      domains: ["magicballoonchildcare.com", "smartimateapp.com"],
      accept_incoming: true,
      decorate_forms: true
    }
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  script.dataset.googleAnalytics = "";
  document.head.appendChild(script);
})();
