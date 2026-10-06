export type RoseFaqItem = {
  id: string;
  category: "profile" | "booking" | "pricing" | "location" | "contact" | "availability" | "general";
  question: string;
  answer: string;
  keywords: string[];
};

export const roseKnowledge = {
  assistant: {
    name: "Rose",
    role: "Personal assistant",
    ownerName: "Mayer",
    greeting: "Hello, I’m Rose.",
    intro:
      "I’m Mayer’s personal assistant. Ask me about Mayer’s public profile, Vienna location, public dance services, photography enquiries, or how to get in touch.",
    inputPlaceholder: "Ask Rose anything...",
  },

  profile: {
    name: "Mayer",
    city: "Vienna",
    country: "Austria",
    age: 24,
    height: "170 cm",
    weight: "67 kg",
    languages: ["English"],
    shortBio:
      "Mayer is based in Vienna, Austria and is available for selected belly dance, event, photography, and public dance-session enquiries.",
  },

  booking: {
    advanceBookingRecommended: true,
    sameDayGuaranteed: false,
    confirmationRequired: true,
    notes: [
      "Current availability should be confirmed directly before making plans.",
      "Travel and event arrangements are discussed individually.",
      "Public website information covers non-explicit performance, profile, photography, and contact details.",
    ],
  },

  pricing: [],

  contact: {
    channels: ["WhatsApp", "Telegram"],
    preferredMessage:
      "For public dance-performance, photography, event, or general profile enquiries, use the WhatsApp or Telegram options on the website.",
  },

  boundaries: {
    liveAvailability:
      "I can explain Mayer’s public profile, but current availability must be confirmed directly.",
    unknownAnswer:
      "I don’t have confirmed public information about that. Please ask about Mayer’s profile, performances, photography, Vienna location, public dance bookings, or contact options.",
    offTopic:
      "I’m Mayer’s personal assistant, so I can best help with her public profile, Vienna location, performances, photography, availability, and contact information.",
  },

  quickQuestions: [
    {
      label: "Profile",
      answer:
        "Mayer is 24, 170 cm, 67 kg, English-speaking, and based in Vienna, Austria.",
    },
    {
      label: "Location",
      answer:
        "Mayer is currently based in Vienna, Austria. Travel or event arrangements can be discussed directly.",
    },
    {
      label: "Services",
      answer:
        "The public site highlights belly dance, event appearances, photography, private dance-session enquiries, custom performances, and selected travel enquiries.",
    },
    {
      label: "Contact",
      answer:
        "You can contact Mayer through the WhatsApp or Telegram options on this website.",
    },
  ],

  faq: [
    {
      id: "where-based",
      category: "location",
      question: "Where is Mayer based?",
      answer: "Mayer is currently based in Vienna, Austria.",
      keywords: ["where", "location", "city", "vienna", "austria", "based"],
    },
    {
      id: "profile-details",
      category: "profile",
      question: "What are Mayer’s public profile details?",
      answer: "Mayer is 24, 170 cm, 67 kg, speaks English, and is based in Vienna, Austria.",
      keywords: ["age", "height", "weight", "english", "profile", "details"],
    },
    {
      id: "how-contact",
      category: "contact",
      question: "How can I contact Mayer?",
      answer:
        "You can contact Mayer through the WhatsApp or Telegram options available on the website.",
      keywords: ["contact", "whatsapp", "telegram", "message", "reach"],
    },
    {
      id: "availability",
      category: "availability",
      question: "Is Mayer available today?",
      answer:
        "Live availability is not published. Please confirm current availability directly through the contact options.",
      keywords: ["available", "availability", "today", "tonight", "tomorrow"],
    },
    {
      id: "public-services",
      category: "booking",
      question: "What public services are listed?",
      answer:
        "The public site lists belly dance, photography, event appearances, private dance-session enquiries, custom performance, and selected travel enquiries.",
      keywords: ["belly dance", "performance", "event", "photography", "dance session", "services"],
    },
    {
      id: "languages",
      category: "profile",
      question: "What language does Mayer speak?",
      answer: "The current public profile lists English.",
      keywords: ["language", "languages", "english", "speak"],
    },
    {
      id: "assistant-owner",
      category: "general",
      question: "Who do you assist?",
      answer: "Mayer is the person I assist.",
      keywords: ["boss", "owner", "work for", "who do you work for", "assist"],
    },
  ] satisfies RoseFaqItem[],
} as const;
