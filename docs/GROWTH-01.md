# GROWTH-01 — Search & Analytics Foundation

This phase creates reusable search and measurement plumbing without building
geo-grid rank tracking, competitor monitoring, or automated SEO recommendations.

## Public configuration

Set these in Vercel Project Settings → Environment Variables:

- `NEXT_PUBLIC_SITE_URL` — canonical production URL.
- `NEXT_PUBLIC_GROWTH_CLIENT_ID` — stable client slug used by future growth data.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — GA4 web stream measurement ID, e.g. `G-XXXXXXXXXX`.
- `GOOGLE_SITE_VERIFICATION` — Google Search Console HTML-tag verification token only,
  not the entire meta tag.

Values with `NEXT_PUBLIC_` are intentionally exposed to the browser. Do not put
secrets in them.

## Server-only Search Console readiness

Reserved environment variables:

- `GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL`
- `GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY`

These must stay server-only. They are never rendered by the dashboard or public
site. Creating/authorizing a Google service account and querying Search Console
data is intentionally deferred until a Google account/property is connected.

## Conversion events

The site emits these GA4 events when GA4 is configured:

- `contact_cta_click`
- `whatsapp_click`
- `telegram_click`
- `booking_inquiry_click`
- `concierge_open`
- `concierge_message_sent`

Event names are centralized in `content/growth-config.ts`.

## Verification

After production deploy:

1. Open `/robots.txt` and confirm the sitemap and admin disallow rules.
2. Open `/sitemap.xml` and confirm the canonical production URL.
3. Inspect the homepage source for canonical metadata and JSON-LD.
4. Open `/growth-admin`; it must be noindex and must never display credential values.
5. When GA4 is configured, use GA4 Realtime/DebugView and trigger contact,
   WhatsApp/Telegram, booking and concierge actions.
6. In Search Console, use URL Inspection for the homepage and test the live URL.
