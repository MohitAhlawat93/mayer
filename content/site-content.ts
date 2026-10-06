const rawWhatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ?? "";
const rawTelegramHandle = process.env.NEXT_PUBLIC_TELEGRAM_HANDLE?.trim() ?? "";

const whatsappNumber = rawWhatsappNumber.replace(/\D/g, "");
const telegramHandle = rawTelegramHandle.replace(/^@/, "");

// ============================================================
// MAYER MAIN CONTROL FILE
// Most routine website changes can be made in this file.
// See MAYER-CUSTOMIZATION-GUIDE.md for a complete walkthrough.
// ============================================================

const profile = {
  name: "Mayer",
  profession: "Belly Dancer & Performer",
  city: "Vienna",
  country: "Austria",
  countryCode: "AT",
  location: "Vienna, Austria",
  status: "Based in Vienna, Austria",
  eyebrow: "MAYER · VIENNA, AUSTRIA",
  tagline: "Elegant movement. Warm presence.",
  serviceSummary:
    "Vienna-based belly dancer and performer available for selected performance, event, and photography enquiries.",
  intro:
    "A refined, image-led profile for performance and creative enquiries in Vienna and beyond.",
  bio:
    "I’m Mayer, 24, based in Vienna, Austria. I’m 170 cm tall, 67 kg, and speak English. I enjoy expressive movement, polished presentation, photography, and creating memorable experiences with a calm, elegant atmosphere.",
  quote:
    "Movement should feel effortless, expressive, and unforgettable.",
} as const;

const hero = {
  kicker: "Vienna based performer",
  titleLine1: "Exotic",
  titleLine2: "Elegance",
  description:
    "Elegant belly dance performances, creative appearances, and photography enquiries from Vienna, Austria.",
  primaryCtaLabel: "Book a Performance",
  primaryCtaHref: "#rates",
  secondaryCtaLabel: "View Gallery",
  secondaryCtaHref: "#gallery",
} as const;

const seo = {
  siteUrl: "https://mayer.vercel.app",
  locale: "en_AT",
  title: "Mayer | Belly Dancer & Performer in Vienna, Austria",
  description:
    "Meet Mayer, a 24-year-old Vienna-based belly dancer and performer. Explore her profile, gallery, public performance services, photography enquiries, and contact details.",
  category: "Performing Arts",
  serviceLabel: "Dance bookings",
  serviceDescription:
    "Public dance-performance and appearance enquiries in Vienna, Austria, with current availability confirmed directly.",
  searchTargets: [
    "Mayer Vienna belly dancer",
    "belly dancer Vienna",
    "performer Vienna Austria",
    "event belly dancer Vienna",
    "photography performer Vienna",
  ],
} as const;

export function getWhatsAppHref(
  message = "Hi " + profile.name + ", I would like to inquire about your profile and availability.",
) {
  if (!whatsappNumber) return "#contact";
  return "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
}

export function getTelegramHref() {
  if (!telegramHandle) return "#contact";
  return "https://t.me/" + telegramHandle;
}

export const siteContent = {
  profile,
  hero,

  images: {
    // IMAGE CONTROL: first homepage image remains gallery-04.jpg.
    heroSlides: [
      { src: "/images/profile/gallery-04.jpg", alt: "Mayer portrait in Vienna" },
      { src: "/images/profile/gallery-03.jpg", alt: "Mayer portrait" },
      { src: "/images/profile/gallery-06.jpeg", alt: "Mayer portrait with a soft color backdrop" },
      { src: "/images/profile/about.jpeg", alt: "Portrait of Mayer" },
    ],
    hero: {
      src: "/images/profile/gallery-04.jpg",
      alt: "Mayer, a Vienna-based belly dancer and performer",
    },
    about: {
      src: "/images/profile/gallery-03.jpg",
      alt: "Mayer, Vienna-based performer",
    },
    gallery: [
      { src: "/images/profile/gallery-04.jpg", alt: "Mayer gallery portrait 1" },
      { src: "/images/profile/hero.jpeg", alt: "Mayer gallery portrait 2" },
      { src: "/images/profile/about.jpeg", alt: "Mayer gallery portrait 3" },
      { src: "/images/profile/gallery-01.jpeg", alt: "Mayer gallery portrait 4" },
      { src: "/images/profile/gallery-05.jpeg", alt: "Mayer gallery portrait 5" },
      { src: "/images/profile/gallery-06.jpeg", alt: "Mayer gallery portrait 6" },
    ],
  },

  facts: [
    { label: "Age", value: "24" },
    { label: "Height", value: "170 cm" },
    { label: "Weight", value: "67 kg" },
    { label: "Languages", value: "English" },
    { label: "City", value: profile.city },
    { label: "Country", value: profile.country },
  ],

  publicServices: [
    {
      title: "Belly Dance",
      eyebrow: "Performance",
      description:
        "Selected belly dance performance enquiries for events and private occasions.",
    },
    {
      title: "Photography",
      eyebrow: "Creative",
      description:
        "Photography and creative collaboration enquiries discussed in advance.",
    },
    {
      title: "Event Appearance",
      eyebrow: "Vienna & Travel",
      description:
        "Selected event and appearance enquiries in Vienna, with travel discussed individually.",
    },
    {
      title: "Private Dance Session",
      eyebrow: "By Arrangement",
      description:
        "Private dance-session enquiries with timing and location confirmed directly.",
    },
    {
      title: "Custom Performance",
      eyebrow: "Tailored",
      description:
        "Custom performance concepts and choreography can be discussed for suitable events.",
    },
    {
      title: "Travel Enquiry",
      eyebrow: "Destination",
      description:
        "Travel availability for selected performance opportunities can be discussed directly.",
    },
  ],

  // PUBLIC DANCE RATE CARDS. Edit titles/durations/prices here.
  danceBookings: [
    {
      title: "Private Dance Session",
      duration: "1 hour",
      price: "Set price",
      note: "A one-hour private dance booking. Location and timing are confirmed directly.",
      inquiry: "Hi Mayer, I would like to ask about a 1-hour private dance session.",
    },
    {
      title: "Private Dance Session",
      duration: "2 hours",
      price: "Set price",
      note: "A two-hour private dance booking. Location and timing are confirmed directly.",
      inquiry: "Hi Mayer, I would like to ask about a 2-hour private dance session.",
    },
    {
      title: "On-Location Dance Session",
      duration: "1 hour",
      price: "Set price",
      note: "A one-hour dance booking at a suitable agreed location.",
      inquiry: "Hi Mayer, I would like to ask about a 1-hour on-location dance session.",
    },
    {
      title: "On-Location Dance Session",
      duration: "2 hours",
      price: "Set price",
      note: "A two-hour dance booking at a suitable agreed location.",
      inquiry: "Hi Mayer, I would like to ask about a 2-hour on-location dance session.",
    },
    {
      title: "Extended Evening Dance Booking",
      duration: "Extended",
      price: "By enquiry",
      note: "A longer evening dance or appearance booking arranged in advance.",
      inquiry: "Hi Mayer, I would like to ask about an extended evening dance booking.",
    },
    {
      title: "Full-Night Dance Booking",
      duration: "Full night",
      price: "By enquiry",
      note: "An extended dance or event appearance booking with details agreed in advance.",
      inquiry: "Hi Mayer, I would like to ask about a full-night dance booking.",
    },
  ],

  /*
    PRIVATE / SELF-MANAGED PLACEHOLDER
    This data is NOT rendered and is NOT included in SEO, structured data,
    Rose, or public rate cards.
  */
  privateServicesPlaceholder: {
    heading: "Private details",
    items: [
      "ADD_YOUR_OWN_LAWFUL_PRIVATE_DETAIL_01",
      "ADD_YOUR_OWN_LAWFUL_PRIVATE_DETAIL_02",
      "ADD_YOUR_OWN_LAWFUL_PRIVATE_DETAIL_03",
    ],
  },

  contact: {
    whatsapp: {
      label: "WhatsApp",
      configured: Boolean(whatsappNumber),
    },
    telegram: {
      label: "Telegram",
      configured: Boolean(telegramHandle),
    },
  },

  seo,
} as const;

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const vercelDeploymentUrl = process.env.VERCEL_URL?.trim();
  const candidate =
    configuredUrl || vercelProductionUrl || vercelDeploymentUrl || siteContent.seo.siteUrl;

  const withProtocol = /^https?:\/\//.test(candidate)
    ? candidate
    : "https://" + candidate;

  return withProtocol.replace(/\/$/, "");
}
