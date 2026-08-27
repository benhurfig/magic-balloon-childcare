"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector("[data-site-header]");
  const navigation = document.querySelector("[data-navigation]");
  const menuButton = document.querySelector("[data-menu-toggle]");
  const menuOverlay = document.querySelector("[data-menu-overlay]");
  const languageSelector = document.querySelector("[data-language-selector]");
  const languageButton = document.querySelector("[data-language-toggle]");
  const languageMenu = document.querySelector("[data-language-menu]");
  const floatingContact = document.querySelector("[data-floating-contact]");
  const floatingToggle = document.querySelector("[data-floating-toggle]");
  let menuReturnFocus = null;

  const closeNavigation = (restoreFocus = true) => {
    if (!navigation || !menuButton || !menuOverlay) return;
    const wasOpen = navigation.classList.contains("is-open");
    navigation.classList.remove("is-open");
    menuButton.classList.remove("is-open");
    menuOverlay.classList.remove("is-visible");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", menuButton.dataset.menuOpenLabel || "Open navigation menu");
    menuOverlay.setAttribute("aria-hidden", "true");
    body.classList.remove("no-scroll");
    if (wasOpen && restoreFocus) menuReturnFocus?.focus();
    menuReturnFocus = null;
  };

  const openNavigation = () => {
    if (!navigation || !menuButton || !menuOverlay) return;
    menuReturnFocus = document.activeElement;
    navigation.classList.add("is-open");
    menuButton.classList.add("is-open");
    menuOverlay.classList.add("is-visible");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", menuButton.dataset.menuCloseLabel || "Close navigation menu");
    menuOverlay.setAttribute("aria-hidden", "false");
    body.classList.add("no-scroll");
    navigation.querySelector("a")?.focus();
  };

  menuButton?.addEventListener("click", () => {
    navigation?.classList.contains("is-open") ? closeNavigation() : openNavigation();
  });
  menuOverlay?.addEventListener("click", () => closeNavigation());
  navigation?.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeNavigation(false);
  });

  const closeLanguageMenu = (restoreFocus = false) => {
    languageSelector?.classList.remove("is-open");
    languageButton?.setAttribute("aria-expanded", "false");
    languageMenu?.setAttribute("aria-hidden", "true");
    if (restoreFocus) languageButton?.focus();
  };

  languageButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = languageSelector?.classList.toggle("is-open") ?? false;
    languageButton.setAttribute("aria-expanded", String(open));
    languageMenu?.setAttribute("aria-hidden", String(!open));
    if (open) languageMenu?.querySelector('[aria-current="page"]')?.focus();
  });

  languageMenu?.addEventListener("keydown", (event) => {
    const links = [...languageMenu.querySelectorAll("a")];
    const current = links.indexOf(document.activeElement);
    let next = null;
    if (event.key === "ArrowDown") next = (current + 1) % links.length;
    if (event.key === "ArrowUp") next = (current - 1 + links.length) % links.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = links.length - 1;
    if (next !== null) {
      event.preventDefault();
      links[next]?.focus();
    }
  });

  const setFloatingOpen = (open) => {
    floatingContact?.classList.toggle("is-open", open);
    floatingToggle?.setAttribute("aria-expanded", String(open));
    floatingContact?.querySelector("[data-floating-menu]")?.setAttribute("aria-hidden", String(!open));
    if (open) floatingContact?.querySelector("a")?.focus();
  };

  floatingToggle?.addEventListener("click", () => {
    setFloatingOpen(!floatingContact?.classList.contains("is-open"));
  });
  floatingContact?.addEventListener("click", (event) => {
    if (event.target.closest("a")) setFloatingOpen(false);
  });

  document.addEventListener("click", (event) => {
    if (languageSelector && !languageSelector.contains(event.target)) closeLanguageMenu();
    if (floatingContact && !floatingContact.contains(event.target)) setFloatingOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeNavigation();
    closeLanguageMenu(true);
    if (floatingContact?.classList.contains("is-open")) {
      setFloatingOpen(false);
      floatingToggle?.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 980) closeNavigation(false);
  });

  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 20);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const localeMap = { "en-US": "en-US", "pt-BR": "pt-BR", es: "es-ES" };
  const locale = localeMap[document.documentElement.lang] || "en-US";
  const now = new Date();
  document.querySelectorAll("[data-current-month]").forEach((element) => {
    element.textContent = new Intl.DateTimeFormat(locale, { month: "long" }).format(now);
  });
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(now.getFullYear());
  });

  const faqButtons = [...document.querySelectorAll("[data-faq-button]")];

  const setFaqOpen = (button, open) => {
    const item = button.closest(".faq-item");
    const answer = document.getElementById(button.getAttribute("aria-controls"));
    item?.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    answer?.setAttribute("aria-hidden", String(!open));
    const indicator = button.querySelector("[data-faq-indicator]");
    if (indicator) indicator.textContent = open ? "−" : "+";
  };

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const shouldOpen = button.getAttribute("aria-expanded") !== "true";
      faqButtons.forEach((otherButton) => setFaqOpen(otherButton, false));
      if (shouldOpen) setFaqOpen(button, true);
    });

    button.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
        setFaqOpen(button, false);
      }
    });
  });
});
