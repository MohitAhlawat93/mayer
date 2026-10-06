const rawWhatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ?? "";
const rawTelegramHandle = process.env.NEXT_PUBLIC_TELEGRAM_HANDLE?.trim() ?? "";

const whatsappNumber = rawWhatsappNumber.replace(/\D/g, "");
const telegramHandle = rawTelegramHandle.replace(/^@/, "");

// CLONE CONTROL: update this profile block first when reusing the site.
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

// CLONE CONTROL: edit this SEO block when the person, city, profession, or search intent changes.
const seo = {
  siteUrl: "https://mayer.vercel.app",
  title: "Mayer | Belly Dancer & Performer in Vienna, Austria",
  description:
    "Meet Mayer, a 24-year-old Vienna-based belly dancer and performer. Explore her profile, gallery, performance options, photography enquiries, and direct contact details.",
  serviceLabel: "Performance enquiries",
  serviceDescription:
    "Belly dance, photography, and selected event enquiries in Vienna, Austria, with direct contact for current availability.",
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
  images: {
    // Keep the existing approved image set. Only presentation/layout changes in this redesign.
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

  // Kept as reusable structured profile facts.
  bodyMeasurements: [
    { label: "Height", value: "170 cm" },
    { label: "Weight", value: "67 kg" },
    { label: "Language", value: "English" },
  ],

  facts: [
    { label: "Age", value: "24" },
    { label: "Height", value: "170 cm" },
    { label: "Weight", value: "67 kg" },
    { label: "Languages", value: "English" },
    { label: "City", value: profile.city },
    { label: "Country", value: profile.country },
  ],

  // Public, non-explicit experiences shown on the site.
  danceBookings: [
    {
      title: "Belly Dance",
      price: "By enquiry",
      suffix: "Performance",
      note: "Elegant belly dance performance enquiries for selected events and private occasions.",
      inquiry: "Hi Mayer, I would like to inquire about a belly dance performance.",
    },
    {
      title: "Photography",
      price: "By enquiry",
      suffix: "Creative",
      note: "Photography and creative collaboration enquiries, discussed directly in advance.",
      inquiry: "Hi Mayer, I would like to inquire about a photography collaboration.",
    },
    {
      title: "Event Appearance",
      price: "By enquiry",
      suffix: "Vienna & travel",
      note: "Selected appearance and event enquiries in Vienna, with travel discussed individually.",
      inquiry: "Hi Mayer, I would like to inquire about an event appearance.",
    },
  ],

  /*
    SELF-MANAGED PRIVATE CONTENT PLACEHOLDER
    This block is intentionally NOT rendered by the public UI.
    If you choose to publish additional lawful adult-only information yourself,
    replace the placeholder values here and build your own rendering logic.
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
