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
  title: siteContent.seo.title,
  description: siteContent.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    type: "website",
    locale: "en_IN",
    siteName: siteContent.profile.name,
    images: [{ url: siteContent.images.hero.src, alt: siteContent.images.hero.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    images: [siteContent.images.hero.src],
  },
  robots: { index: true, follow: true },
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
