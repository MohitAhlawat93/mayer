import { getSiteUrl, siteContent } from "@/content/site-content";

const gaMeasurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

export const growthConfig = {
  client: {
    id:
      process.env.NEXT_PUBLIC_GROWTH_CLIENT_ID?.trim() ||
      siteContent.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: siteContent.profile.name,
    siteUrl: getSiteUrl(),
  },
  search: {
    googleVerificationConfigured: Boolean(
      process.env.GOOGLE_SITE_VERIFICATION?.trim(),
    ),
    sitemapPath: "/sitemap.xml",
    robotsPath: "/robots.txt",
    canonicalUrl: getSiteUrl(),
  },
  analytics: {
    provider: "google-analytics-4",
    gaMeasurementId,
    configured: /^G-[A-Z0-9]+$/i.test(gaMeasurementId),
  },
  trackedEvents: [
    "contact_cta_click",
    "whatsapp_click",
    "telegram_click",
    "booking_inquiry_click",
    "concierge_open",
    "concierge_message_sent",
  ],
} as const;

export type GrowthEventName = (typeof growthConfig.trackedEvents)[number];
