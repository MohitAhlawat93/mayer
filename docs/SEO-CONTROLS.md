# SEO controls for cloned profile sites

This project keeps person-specific SEO controls centralized so the site can be reused for another profile without rewriting the SEO implementation.

## 1. Main file to edit

Edit:

`content/site-content.ts`

For a new person, review these fields first:

- `profile.name` — public name
- `profile.profession` — e.g. Dancer, Performer, Model
- `profile.city` — primary city
- `profile.countryCode` — two-letter country code
- `profile.location` — human-readable location
- `profile.status` — public availability label
- `profile.eyebrow` — small profile heading
- `profile.tagline` — premium brand line
- `profile.serviceSummary` — clear visible sentence explaining what the person does and where
- `profile.intro` / `profile.bio` / `profile.quote` — public profile copy
- `seo.title` — search-result title
- `seo.description` — search-result description
- `seo.siteUrl` — fallback canonical URL

Also update the images, facts, booking options, prices and contact configuration in the same file.

## 2. Production URL

Preferred control:

`NEXT_PUBLIC_SITE_URL`

Set this in Vercel to the final production domain, for example:

`https://example.com`

When it is set, metadata, canonical URLs, JSON-LD, robots.txt and sitemap.xml use it automatically.

If it is not set, Vercel production/deployment URLs are used. `seo.siteUrl` is the final local fallback.

## 3. Files that normally do not need person-specific edits

These files read the centralized content automatically:

- `app/layout.tsx` — title, description, canonical, Open Graph and Twitter metadata
- `components/seo/ProfileStructuredData.tsx` — ProfilePage + Person JSON-LD
- `app/robots.ts` — public crawler rules and sitemap location
- `app/sitemap.ts` — public homepage sitemap entry
- `components/sections/Hero.tsx` — visible profession/location/service context

Only change these structural files if the site's SEO behavior itself needs to change.

## 4. Search-foundation verification after cloning

After deployment verify:

1. Homepage HTML contains the expected `<title>` and meta description.
2. Canonical points to the new public domain.
3. JSON-LD contains the correct person, profession and location.
4. `/robots.txt` allows the public site and blocks internal routes.
5. `/sitemap.xml` contains the new public homepage URL.
6. The public domain loads without login or deployment protection.

Do not copy Anora's name, description, city, photos, rates or contact details into a different person's deployment.
