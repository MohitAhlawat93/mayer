const rawWhatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ?? "";
const rawTelegramHandle = process.env.NEXT_PUBLIC_TELEGRAM_HANDLE?.trim() ?? "";

const whatsappNumber = rawWhatsappNumber.replace(/\D/g, "");
const telegramHandle = rawTelegramHandle.replace(/^@/, "");

// CLONE CONTROL: update this profile block first when reusing the site for another person.
const profile = {
  name: "Anora",
  profession: "Dancer",
  city: "Bangalore",
  countryCode: "IN",
  location: "Bangalore, IN",
  status: "Available in Bangalore",
  eyebrow: "ANORA · BANGALORE, IN",
  tagline: "Elegant presence. Quiet confidence.",
  serviceSummary:
    "Bangalore-based dancer available for private studio, on-location, and full-day dance bookings.",
  intro:
    "Warm, discreet, and easy to talk to. I value privacy, cleanliness, respectful communication, and a relaxed atmosphere.",
  bio:
    "I’m Anora, 27, currently in Bangalore. I like things to feel natural, comfortable, and uncomplicated. Good manners, discretion, and clear communication matter to me. If you would like to know more or verify my profile, WhatsApp or Telegram is the easiest way to reach me.",
  quote:
    "I prefer simple things done beautifully — good conversation, good energy, and mutual respect.",
} as const;

// CLONE CONTROL: edit this SEO block when the person, city, profession, or search intent changes.
const seo = {
  siteUrl: "https://dancerportfolio.vercel.app",
  title: "Anora | Dancer in Bangalore – Private Dance Bookings",
  description:
    "Meet Anora, a Bangalore-based dancer available for private studio, on-location and full-day dance bookings. View her profile, gallery, rates and contact options.",
  serviceLabel: "Dance bookings",
  serviceDescription:
    `Choose from private studio, on-location, and full-day dance bookings in ${profile.city}, with clear rates and direct enquiry.`,
  searchTargets: [
    "Anora dancer Bangalore",
    "Anora Bangalore dancer",
    "private dance booking Bangalore",
    "dance booking Bangalore",
  ],
} as const;

export function getWhatsAppHref(
  message = `Hi ${profile.name}, I would like to inquire about a booking.`,
) {
  if (!whatsappNumber) return "#contact";
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getTelegramHref() {
  if (!telegramHandle) return "#contact";
  return `https://t.me/${telegramHandle}`;
}

export const siteContent = {
  profile,
  images: {
    // CLONE CONTROL: heroSlides controls the slow-changing homepage background.
    heroSlides: [
      { src: "/images/profile/gallery-04.jpg", alt: "Anora full-length portrait" },
      { src: "/images/profile/gallery-03.jpg", alt: "Anora indoor portrait" },
      { src: "/images/profile/gallery-06.jpeg", alt: "Anora portrait with a soft color backdrop" },
      { src: "/images/profile/about.jpeg", alt: "Anora portrait" },
    ],
    hero: {
      src: "/images/profile/gallery-04.jpg",
      alt: "Portrait of Anora, a Bangalore-based dancer",
    },
    about: {
      src: "/images/profile/gallery-03.jpg",
      alt: "Anora, Bangalore-based dancer",
    },
    gallery: [
      { src: "/images/profile/gallery-04.jpg", alt: "Anora gallery portrait 1" },
      { src: "/images/profile/hero.jpeg", alt: "Anora gallery portrait 2" },
      { src: "/images/profile/about.jpeg", alt: "Anora gallery portrait 3" },
      { src: "/images/profile/gallery-01.jpeg", alt: "Anora gallery portrait 4" },
      { src: "/images/profile/gallery-05.jpeg", alt: "Anora gallery portrait 5" },
      { src: "/images/profile/gallery-06.jpeg", alt: "Anora gallery portrait 6" },
    ],
  },
  bodyMeasurements: [
    { label: "Bust", value: "34" },
    { label: "Waist", value: "28" },
    { label: "Hips", value: "38" },
  ],
  facts: [
    { label: "Age", value: "27" },
    { label: "Height", value: "158 cm / 5′2″" },
    { label: "Languages", value: "English · Fluent" },
    { label: "Hair", value: "Black" },
    { label: "Ethnicity", value: "Asian" },
    { label: "Nationality", value: "Indian" },
    { label: "Gender", value: "Female" },
    { label: "City", value: profile.city },
  ],
  danceBookings: [
    {
      title: "Private Studio Dance Session",
      price: "₹17,000",
      suffix: "per hour",
      note: "A private one-to-one studio dance booking.",
      inquiry: `Hi ${profile.name}, I would like to inquire about the Private Studio Dance Session.`,
    },
    {
      title: "On-Location Dance Session",
      price: "₹20,000",
      suffix: "per hour",
      note: `A dance booking at a suitable ${profile.city} location.`,
      inquiry: `Hi ${profile.name}, I would like to inquire about the On-Location Dance Session.`,
    },
    {
      title: "Full-Day Dance Booking",
      price: "₹50,000",
      suffix: "full day",
      note: "An extended dance or appearance booking.",
      inquiry: `Hi ${profile.name}, I would like to inquire about the Full-Day Dance Booking.`,
    },
  ],
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
