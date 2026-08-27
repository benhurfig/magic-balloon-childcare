"use strict";

(() => {
  const sendEvent = (name, parameters = {}) => {
    if (!window.analyticsConsentGranted || typeof window.gtag !== "function") return;
    window.gtag("event", name, {
      page_path: window.location.pathname,
      page_language: document.documentElement.lang,
      transport_type: "beacon",
      ...parameters
    });
  };

  document.addEventListener("click", (event) => {
    const element = event.target.closest("[data-track]");
    if (!element) return;
    const eventName = {
      cta: "cta_click",
      family_request: "family_request_click",
      phone: "phone_click",
      text: "text_click",
      email: "email_click",
      instagram: "instagram_click",
      google_profile: "google_profile_click",
      language: "language_change",
      navigation: "navigation_click"
    }[element.dataset.track];
    if (!eventName) return;
    sendEvent(eventName, {
      cta_location: element.dataset.location || undefined,
      link_url: element.getAttribute("href") || undefined
    });
  });
})();
