# PROJECT

Magic Balloon Childcare

## LOCAL PATH

`/Users/ben/Documents/WebSites/MateGrowth/ Magic Ballon Childcare`

## REPOSITORY

`https://github.com/benhurfig/magic-balloon-childcare`

## CURRENT PHASE

Header, Hero, Trust Strip, Monthly Bulletin, and About Lucineia complete; Cloudflare Pages deployed and production DNS propagating

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

- Magic Balloon Childcare
- Production domain selected: `https://www.magicballoonchildcare.com/`
- Framingham, MA
- Phone/SMS: `+1 774-427-9253`
- Instagram: `https://www.instagram.com/magicballoonchildcare/`
- Google Business: `https://share.google/8fcb4kHO6Of0jBol9`

## PENDING

- Local folder still uses the former `Magic Ballon Childcare` spelling and must not be renamed during active development.
- Regenerate or edit all logo and brand image assets to display `Magic Balloon Childcare`; their existing filenames and image content remain unchanged for now.
- GA4 Measurement ID (`G-XXXXXXXXXX` is intentionally inactive).
- Family Request URL.
- Final page content and final SEO copy.
- Programs, Reviews, FAQ, Local SEO, and Final CTA content.
- Legal copy and localized legal-page architecture.
- Local SEO pages and reviews.
- Search Console and Analytics deployment.
- Wait for Cloudflare to finish activating the apex zone after the authoritative nameserver change.
- Add `magicballoonchildcare.com` to the Pages project after zone activation and configure the apex-to-`www` redirect.
- Complete public apex, redirect, and route verification after global DNS and SSL propagation.

## COMPLETED

- Real English, Portuguese, and Spanish page foundations.
- Root technical redirect to `/en/`.
- Brand variables, typography fallbacks, global accessibility styles, and mobile-first base.
- Fixed header foundation with mobile menu, overlay, Escape handling, focus return, and scroll state.
- Accessible language selector using real links and `aria-current`.
- Automatic month/year logic based on page language.
- Accessible floating Start Here/SMS component using the confirmed phone number.
- Consent infrastructure using `magicBalloonCookieConsent`, with Analytics and advertising denied by default.
- Central configuration and generic consent-gated analytics events.
- Canonical, hreflang, Open Graph, X card, favicon, manifest, robots, sitemap, and redirect foundations.
- Minimal legal-page placeholders without invented legal copy.
- Header completed in all three languages with horizontal logo, desktop navigation, real-language dropdown, desktop CTA, and accessible mobile drawer with its own CTA.
- Hero completed in all three languages with approved copy, responsive text-first layout, trust line, CTAs, and the existing `assets/images/hero/hero.jpg` image.
- Visual direction uses a light cloud-white background, navy typography, restrained brand-color details, organic image framing, and subtle CSS cloud shapes.
- Responsive review completed at 375px, 430px, 700px, 980px, and 1440px with no horizontal overflow or browser console errors.
- Files updated in this phase: `en/index.html`, `pt/index.html`, `es/index.html`, `assets/css/header.css`, `assets/css/hero.css`, `assets/js/main.js`, and `PROJECT-STATUS.md`.
- Balloon intro overlay added to all three language pages using the existing lightweight `magic-ballon-favicon.png` asset. The balloon was enlarged by approximately 70%, reaching about 208px at 375px, 239px at 430px, and 264px from tablet through desktop.
- The branded intro now includes localized copy: “Welcome to”, “Bem-vindo à”, or “Bienvenido a”, followed by “Magic Balloon Childcare”.
- The intro sequence lasts approximately 2.5 seconds: balloon rise, copy fade-in, brief hold, and overlay fade-out. The overlay is removed from the DOM after 2.6 seconds.
- Reduced-motion visitors receive no rise animation, a short 240ms composition fade, and DOM removal after 280ms.
- Intro refinement: desktop balloon increased by a further 20% to approximately 317px during its final animation state, while mobile sizing remains unchanged. The company name now follows the approved logo palette, with navy supporting words and multicolor “Balloon” lettering.
- Hero eyebrow updated from a decorative line to a reusable `section-eyebrow` component with the balloon icon and four simple color modifiers.
- Files added for this enhancement: `assets/css/loader.css` and `assets/js/loader.js`. Updated: `assets/css/style.css`, `assets/css/hero.css`, `en/index.html`, `pt/index.html`, `es/index.html`, and `PROJECT-STATUS.md`.
- About, Programs, Reviews, FAQ, Local SEO, and Final CTA remained pending and were not changed in the intro enhancement.
- Monthly Bulletin / Now Enrolling completed in English, Portuguese, and Spanish immediately after the Hero.
- The Bulletin was refined into a modern monthly panel with layered paper styling and prominent automatic localized month/year.
- Availability is communicated without a fixed opening count. The panel explains Full-Time Monday–Friday care, Private Pay, Child Care Voucher acceptance, and introduces the Family Request process.
- Its three cards now share the same icon, label, title, and supporting-text hierarchy. The tracked CTA links to `#family-request`.
- Bulletin layout remains mobile-first with stacked cards at 375px and 430px, changing to three columns from the existing 700px breakpoint.
- Files added for this phase: `assets/css/bulletin.css`. Updated: `assets/css/style.css`, `en/index.html`, `pt/index.html`, `es/index.html`, and `PROJECT-STATUS.md`.
- Official brand spelling updated across visible copy, metadata, configuration, consent storage, manifest, and technical SEO to `Magic Balloon Childcare`.
- Production URLs now use `https://www.magicballoonchildcare.com/` in canonical, hreflang, Open Graph, sitemap, robots, and configuration references.
- Trust Strip moved to immediately after the Hero and before the Monthly Bulletin, with compact spacing and four confirmed trust signals: EEC Licensed, Child Care Vouchers Accepted, Full-Time Monday–Friday care, and Portuguese/English exposure.
- Trust Strip heading structure now uses one localized visually hidden `h2` per page and `h3` headings for the four trust items, preserving the single page `h1`.
- Cookie settings is now a discreet structural link after the page content instead of a fixed viewport button. It appears after a consent choice and can reopen the consent controls.
- Root redirect to `/en/` is marked permanent in `_redirects`; canonical production URLs consistently use `https://www.magicballoonchildcare.com/`.
- Production readiness check found the public domain still using Namecheap parking DNS, with no active site SSL on `www`. Cloudflare deployment, DNS replacement, SSL, apex-to-`www` redirect, and final route checks remain pending until authenticated hosting access is available.
- The previously approved mobile Hero content-order correction is included in the current working changes; text and H1 precede the Hero image on mobile.
- Existing logo and image files were not renamed or edited and still require a later brand-asset correction.
- GitHub repository renamed from `magic-ballon-childcare` to `magic-balloon-childcare` without creating or duplicating a repository. Local `origin` now uses `https://github.com/benhurfig/magic-balloon-childcare.git`; fetch succeeded and `origin/main` is available.
- Dedicated Cloudflare Pages project `magic-balloon-childcare` created from the official GitHub repository with production branch `main`, no framework preset, no build command, and `/` as the static output directory.
- Initial Pages deployment completed successfully at `https://magic-balloon-childcare.pages.dev`; root redirects to `/en/`, and EN/PT/ES, CSS, JavaScript, images, and the favicon are served from the deployment.
- `www.magicballoonchildcare.com` was added to the Pages project and Cloudflare reports it as active with SSL enabled.
- Namecheap DNS was updated before nameserver migration with `CNAME`, host `www`, target `magic-balloon-childcare.pages.dev`, TTL `30 min`.
- DNS management was moved from Namecheap BasicDNS to Cloudflare using assigned nameservers `daisy.ns.cloudflare.com` and `quentin.ns.cloudflare.com`. Public resolver propagation has started, while Cloudflare zone activation remains pending.
- Namecheap requires no additional manual action at this stage. Apex Pages binding, apex-to-`www` redirect, final SSL validation, and full production-route tests remain pending until Cloudflare finishes zone activation.
- About Lucineia completed in English, Portuguese, and Spanish immediately after the Monthly Bulletin, using the confirmed Pedagogy and Early Childhood Education studies completed in Brazil and EEC Licensed status.
- The About section uses a mobile-first semantic order of eyebrow, H2, copy, credentials, and visual; desktop CSS places the visual beside the content without changing the DOM order.
- No suitable real photo of Lucineia was found in the project. The photo frame is prepared with a temporary decorative brand-icon placeholder; no stock or artificial person was added.
- Unconfirmed claims about 10+ years of experience, pediatric offices, CDA, CPR, and First Aid were not added.
- Each language page links the block stylesheet with a version identifier so the newly populated `about.css` is not masked by a previously cached empty file.

## NEXT STEP

`Build Child Care / Learning section`
