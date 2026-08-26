# PROJECT

Magic Ballon Childcare

## LOCAL PATH

`/Users/ben/Documents/WebSites/MateGrowth/ Magic Ballon Childcare`

## REPOSITORY

`https://github.com/benhurfig/magic-ballon-childcare`

## CURRENT PHASE

Header and Hero complete

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
- Header completed in all three languages with horizontal logo, desktop navigation, real-language dropdown, desktop CTA, and accessible mobile drawer with its own CTA.
- Hero completed in all three languages with approved copy, responsive text-first layout, trust line, CTAs, and the existing `assets/images/hero/hero.jpg` image.
- Visual direction uses a light cloud-white background, navy typography, restrained brand-color details, organic image framing, and subtle CSS cloud shapes.
- Responsive review completed at 375px, 430px, 700px, 980px, and 1440px with no horizontal overflow or browser console errors.
- Files updated in this phase: `en/index.html`, `pt/index.html`, `es/index.html`, `assets/css/header.css`, `assets/css/hero.css`, `assets/js/main.js`, and `PROJECT-STATUS.md`.
- Balloon intro overlay added to all three language pages using the existing lightweight `magic-ballon-favicon.png` asset. The balloon was enlarged by approximately 70%, reaching about 208px at 375px, 239px at 430px, and 264px from tablet through desktop.
- The branded intro now includes localized copy: “Welcome to”, “Bem-vindo à”, or “Bienvenido a”, followed by “Magic Ballon Childcare”.
- The intro sequence lasts approximately 2.5 seconds: balloon rise, copy fade-in, brief hold, and overlay fade-out. The overlay is removed from the DOM after 2.6 seconds.
- Reduced-motion visitors receive no rise animation, a short 240ms composition fade, and DOM removal after 280ms.
- Intro refinement: desktop balloon increased by a further 20% to approximately 317px during its final animation state, while mobile sizing remains unchanged. The company name now follows the approved logo palette, with navy supporting words and multicolor “Ballon” lettering.
- Hero eyebrow updated from a decorative line to a reusable `section-eyebrow` component with the balloon icon and four simple color modifiers.
- Files added for this enhancement: `assets/css/loader.css` and `assets/js/loader.js`. Updated: `assets/css/style.css`, `assets/css/hero.css`, `en/index.html`, `pt/index.html`, `es/index.html`, and `PROJECT-STATUS.md`.
- Bulletin, About, Programs, Reviews, FAQ, Local SEO, and Final CTA remain pending and were not changed in this enhancement.

## NEXT STEP

`Build Monthly Bulletin / Now Enrolling section`
