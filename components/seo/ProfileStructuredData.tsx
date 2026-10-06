import { getSiteUrl, siteContent } from "@/content/site-content";

export function ProfileStructuredData() {
  const siteUrl = getSiteUrl();
  const imageUrl = new URL(siteContent.images.hero.src, siteUrl + "/").toString();

  const publicOffers = siteContent.publicServices.map((service, index) => ({
    "@type": "Offer",
    "@id": siteUrl + "/#public-service-" + (index + 1),
    itemOffered: {
      "@type": "Service",
      name: service.title,
      description: service.description,
      areaServed: {
        "@type": "City",
        name: siteContent.profile.city,
      },
    },
  }));

  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": siteUrl + "/#profile-page",
    url: siteUrl,
    name: siteContent.seo.title,
    description: siteContent.seo.description,
    mainEntity: {
      "@type": "Person",
      "@id": siteUrl + "/#person",
      name: siteContent.profile.name,
      jobTitle: siteContent.profile.profession,
      description: siteContent.profile.serviceSummary,
      image: imageUrl,
      url: siteUrl,
      homeLocation: {
        "@type": "Place",
        name: siteContent.profile.location,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteContent.profile.city,
          addressCountry: siteContent.profile.countryCode,
        },
      },
      knowsLanguage: ["English"],
      makesOffer: publicOffers,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(profilePage).replace(/</g, "\\u003c"),
      }}
    />
  );
}
