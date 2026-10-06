# Anora

Premium, mobile-first personal profile built with Next.js, TypeScript, and Tailwind CSS.

The Vercel project remains named `dancer-portfolio` because it is already connected to this GitHub repository. The public-facing site branding is Anora.

## Real profile photos

The current site uses the real uploaded repository images:

    public/images/profile/hero.jpeg
    public/images/profile/about.jpeg
    public/images/profile/gallery-01.jpeg
    public/images/profile/gallery-02.jpg
    public/images/profile/gallery-03.jpg
    public/images/profile/gallery-04.jpg
    public/images/profile/gallery-05.jpeg
    public/images/profile/gallery-06.jpeg

Any future image placed inside `public/` is served directly from the site root. For example:

    public/images/profile/new-photo.jpg

is available as:

    /images/profile/new-photo.jpg

Image references are centralized in:

    content/site-content.ts

## Quality checks

    npm install
    npm run lint
    npm run typecheck
    npm run build
    npx playwright install chromium
    npm run test:e2e


## Deployment sync

Latest production sync: 2026-10-03 22:56 IST.
