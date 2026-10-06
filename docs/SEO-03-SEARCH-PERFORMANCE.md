# SEO-03 — Search Performance & Ranking Foundation

SEO-03 starts after Google has already verified, crawled, and indexed the site.

The goal is not to add more indexing code. The goal is to measure which searches show the site and improve relevance and click-through rate using real Search Console evidence.

## Current target searches

These are the first queries to monitor for Anora:

1. `Anora dancer Bangalore`
2. `Anora Bangalore dancer`
3. `private dance booking Bangalore`
4. `dance booking Bangalore`

The first two are branded/local queries and are the most realistic early targets. The last two are broader service queries and may take more authority, content depth, and time.

## Where to change these yourself

Open:

`content/site-content.ts`

Inside the `seo` block you can change:

- `title`
- `description`
- `serviceLabel`
- `serviceDescription`
- `searchTargets`

For a cloned website, change this block together with the main `profile` block.

The `searchTargets` array is a measurement checklist for Search Console. It is intentionally NOT rendered as a meta-keywords tag.

## Why there is no meta-keywords field

Do not add a `<meta name="keywords">` list just to repeat target phrases. Ranking work should come from useful visible content, clear titles/headings, crawlable pages, links, and real authority signals.

## Search Console baseline

Go to:

Search Console → Performance → Search results

Turn on:

- Total clicks
- Total impressions
- Average CTR
- Average position

Use the **Queries** tab.

For a new site, use the last 28 days when enough data exists. Initially there may be little or no data; that is normal.

Record the target queries above when they start appearing.

## How to interpret the numbers

### Impressions = 0

Google has not shown the site for that query in the selected period, or the query volume/data is too small.

Do not repeatedly rewrite the page every day. Let crawl and performance data accumulate.

### Impressions > 0, position above 20

Google sees some relevance, but the page is not competitive yet.

Improve useful on-page information and build genuine authority/referrals rather than stuffing the phrase repeatedly.

### Position roughly 8–20 with impressions

This is often the best optimization opportunity.

Compare the search result with competing pages and improve:
- page usefulness
- title/snippet clarity
- service detail
- trust signals
- genuine relevant links/referrals

### Good position but low CTR

Focus first on the title and description because the site is being shown but users are not choosing it.

### Clicks increase

This is the strongest early evidence that the ranking work is producing actual search traffic.

## What SEO-03 changed on the page

The booking section now states the service and city more clearly in visible copy:

- `Dance bookings · Bangalore`
- `Dance bookings in Bangalore`
- a concise description of the three booking formats

This is visible, useful content rather than hidden keyword text.

Hard-coded Bangalore references in the About/Profile sections were also replaced with `siteContent.profile.city`, so changing the clone city does not leave stale city text elsewhere.

## Weekly measurement routine

Once Search Console has useful data, check it about weekly rather than reacting to every daily fluctuation.

For each target query record:

| Query | Impressions | Clicks | CTR | Avg position | Action |
| --- | ---: | ---: | ---: | ---: | --- |
| Anora dancer Bangalore | — | — | — | — | Wait for data |
| Anora Bangalore dancer | — | — | — | — | Wait for data |
| private dance booking Bangalore | — | — | — | — | Wait for data |
| dance booking Bangalore | — | — | — | — | Wait for data |

Google recommends focusing on trends in impressions and clicks rather than position alone.

## What not to do

Do not:
- repeat the same phrase unnaturally across every section
- create many near-identical Bangalore/city pages
- buy fake backlinks or reviews
- change title/description every day
- treat an incognito manual Google search as the main ranking measurement
- assume a good average position automatically means traffic

Use Search Console as the primary measurement source.

## Clone checklist

For another person/site:

1. Update the `profile` block in `content/site-content.ts`.
2. Update the `seo` block, especially title, description, service text, and `searchTargets`.
3. Set the correct `NEXT_PUBLIC_SITE_URL` in Vercel.
4. Verify the new Search Console property.
5. Submit its sitemap.
6. Wait for query data, then optimize based on evidence.
