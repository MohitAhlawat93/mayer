# GROWTH-02 — First-Party Growth Intelligence

This phase connects the GROWTH-01 tracking contract to live Google Search Console
and GA4 reporting APIs.

## What it adds

- Search Console query, page, country and device performance (top 10 each).
- GA4 sessions, users, page views and tracked conversion-event counts.
- A protected growth dashboard using a server-only admin secret.
- A protected JSON endpoint at `/api/growth/summary`.
- Graceful readiness/error states when Google accounts are not connected.

This phase does **not** implement geo-grid rank tracking, competitor monitoring,
third-party keyword trackers, AI recommendations, or auto-deployment.

## Required Vercel environment variables

Existing:
- `NEXT_PUBLIC_SITE_URL`
- `GOOGLE_SITE_VERIFICATION`

Analytics collection:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — GA4 web stream measurement ID, e.g. `G-XXXXXXXXXX`.

Reporting:
- `GOOGLE_ANALYTICS_PROPERTY_ID` — numeric GA4 property ID.
- `GOOGLE_SEARCH_CONSOLE_SITE_URL` — exact Search Console property string.
  For a URL-prefix property use the full URL. For a Domain property use
  `sc-domain:example.com`.

Google service account (server only):
- `GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`

Legacy GROWTH-01 names `GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL` and
`GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY` are still accepted as fallbacks.

Dashboard access:
- `GROWTH_ADMIN_SECRET` — recommended. If absent, the current implementation
  falls back to `ROSE_ADMIN_SECRET`.

## Google-side permissions

1. Create a Google Cloud service account and enable:
   - Google Search Console API
   - Google Analytics Data API
2. Add the service-account email to the Search Console property with read access.
3. Add the same service-account email to the GA4 property with Viewer access.
4. Put the client email/private key in Vercel server-only environment variables.
5. Redeploy and open `/growth-admin`.

No private key belongs in GitHub or any `NEXT_PUBLIC_*` variable.
