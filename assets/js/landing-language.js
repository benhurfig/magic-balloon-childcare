/* Preserve campaign identifiers only when switching landing language. */
"use strict";
(() => {
  const campaignParams = [...new URLSearchParams(window.location.search).entries()]
    .filter(([key, value]) => (/^utm_[a-z0-9_]+$/i.test(key) || key.toLowerCase() === "fbclid") && value.length <= 1000);
  if (!campaignParams.length) return;
  document.querySelectorAll("a[data-language-choice]").forEach((link) => {
    const destination = new URL(link.href, window.location.origin);
    campaignParams.forEach(([key, value]) => destination.searchParams.set(key, value));
    link.href = destination.pathname + destination.search + destination.hash;
  });
})();
