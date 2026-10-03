"use strict";

(() => {
  const decorateFamilyRequestLink = (element) => {
    if (element.dataset.track !== "family_request") return;
    try {
      const destination = new URL(element.href);
      if (destination.hostname !== "www.smartimateapp.com" && destination.hostname !== "smartimateapp.com") return;
      destination.searchParams.set(
        "analytics_consent",
        window.analyticsConsentGranted ? "granted" : "denied"
      );
      ["utm_source", "utm_medium", "utm_campaign"].forEach((parameter) => {
        const value = new URL(window.location.href).searchParams.get(parameter);
        if (value) destination.searchParams.set(parameter, value);
      });
      element.href = destination.toString();
    } catch (error) {
      // Preserve the existing destination if URL parsing is unavailable.
    }
  };

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
    decorateFamilyRequestLink(element);
    const eventName = {
      cta: "cta_click",
      family_request: "final_cta_request",
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
