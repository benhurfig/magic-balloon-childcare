# Landing page files

The public landing pages remain at `/` (English) and `/pt/landing/` (Portuguese). The root route is served as `/landing/` through the existing Cloudflare Pages routing. `/en/landing/` remains covered by the existing permanent redirect.

## Landing-only assets

- `css/landing.css` — visual styles used only by the landing pages.
- `js/landing.js` and `js/landing-language.js` — landing interactions and EN/PT switching.
- `images/` — the landing social preview, gallery images, video poster, and educator image.

## Shared website assets

- `/assets/images/hero/hero-{480,800,1200}.webp` and `hero.jpg` — shared Home and landing Hero artwork. The source illustration is `/assets/images/hero/Coloring Together in a Cheerful Classroom.png`.
- `/assets/videos/our-space/magic-balloon-tour-web.mp4` — shared by the landing and Our Space pages.
- Analytics, consent, Meta Pixel, and website-wide styles/scripts remain under `/assets/css/` and `/assets/js/`.

Keep page HTML at its current route locations.
