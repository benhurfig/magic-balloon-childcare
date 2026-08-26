# PROJECT

Magic Ballon Childcare

## LOCAL PATH

`/Users/ben/Documents/WebSites/MateGrowth/ Magic Ballon Childcare`

## REPOSITORY

`https://github.com/benhurfig/magic-ballon-childcare`

## CURRENT PHASE

Technical foundation

## ARCHITECTURE

Static website using semantic HTML, separate block-level CSS files imported by `style.css`, and small deferred JavaScript files. No framework, package manager, build step, dynamic translation, or CSS bundle is required.

## LANGUAGE STRATEGY

- `/en/` with `en-US`
- `/pt/` with `pt-BR`
- `/es/` with `es`
- Each language is a real page with independent metadata and future content.
- No dynamic translation, `languages.js`, `data-i18n`, or language preference storage.

## DEVELOPMENT RULES

- Pure HTML, CSS, and JavaScript.
- Mobile-first styles with shared breakpoints at `700px` and `980px`.
- CSS remains separated by block; no required bundle.
- Text and primary actions precede visual media in the DOM.
- Do not use CSS `order` to repair incorrect semantic order.
- Future non-hero images should use lazy loading. The future hero image should not.
- Add local `@font-face` declarations to `global.css` if licensed font files are provided.

## BRAND

- Navy: `#1F2A44`
- Pink: `#FF5C8A`
- Yellow: `#FFC845`
- Turquoise: `#2FB9B1`
- Purple: `#7B61FF`
- Light Blue: `#B8E3FF`
- Cloud White: `#F7F9FC`
- Headings: Fredoka with safe fallback.
- Body: Poppins with safe fallback.

## CONFIRMED BUSINESS DATA

- Magic Ballon Childcare
- Framingham, MA
- Phone/SMS: `+1 774-427-9253`
- Instagram: `https://www.instagram.com/magicballoonchildcare/`
- Google Business: `https://share.google/8fcb4kHO6Of0jBol9`

## PENDING

- Production domain and replacement of every `DOMAIN-PLACEHOLDER` value.
- GA4 Measurement ID (`G-XXXXXXXXXX` is intentionally inactive).
- Family Request URL.
- Final page content and final SEO copy.
- Header and Hero visual review.
- Bulletin, About, Programs, Reviews, FAQ, Local SEO, and Final CTA content.
- Legal copy and localized legal-page architecture.
- Local SEO pages and reviews.
- Search Console and Analytics deployment.
- Cloudflare, hosting, redirects, and production deployment.
- Add the final sitemap URL to `robots.txt` after the domain is confirmed.

## COMPLETED

- Real English, Portuguese, and Spanish page foundations.
- Root technical redirect to `/en/`.
- Brand variables, typography fallbacks, global accessibility styles, and mobile-first base.
- Fixed header foundation with mobile menu, overlay, Escape handling, focus return, and scroll state.
- Accessible language selector using real links and `aria-current`.
- Automatic month/year logic based on page language.
- Accessible floating Start Here/SMS component using the confirmed phone number.
- Consent infrastructure using `magicBallonCookieConsent`, with Analytics and advertising denied by default.
- Central configuration and generic consent-gated analytics events.
- Canonical, hreflang, Open Graph, X card, favicon, manifest, robots, sitemap, and redirect foundations.
- Minimal legal-page placeholders without invented legal copy.

## NEXT STEP

`Build and review Header + Hero`
