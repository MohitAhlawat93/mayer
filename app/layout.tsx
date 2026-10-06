import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { GrowthAnalytics } from "@/components/growth/GrowthAnalytics";
import { getSiteUrl, siteContent } from "@/content/site-content";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const googleSiteVerification =
  process.env.GOOGLE_SITE_VERIFICATION?.trim() ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: siteContent.profile.name,
  title: siteContent.seo.title,
  description: siteContent.seo.description,
  keywords: [...siteContent.seo.searchTargets],
  creator: siteContent.profile.name,
  category: siteContent.seo.category,
  alternates: { canonical: "/" },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    type: "website",
    locale: siteContent.seo.locale,
    siteName: siteContent.profile.name,
    url: "/",
    images: [
      {
        url: siteContent.images.hero.src,
        alt: siteContent.images.hero.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    images: [siteContent.images.hero.src],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "AT-9",
    "geo.placename": siteContent.profile.city,
  },
  ...(googleSiteVerification
    ? {
        verification: {
          google: googleSiteVerification,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={displayFont.variable + " " + sansFont.variable}>
        {children}
        <GrowthAnalytics />
      </body>
    </html>
  );
}
