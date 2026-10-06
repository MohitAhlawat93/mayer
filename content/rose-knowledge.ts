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
    ownerName: "Anora",
    greeting: "Hello, I’m Rose.",
    intro:
      "I’m Anora’s personal assistant. Ask me about Anora, her bookings and profile, or just chat with me if you need help with something else.",
    inputPlaceholder: "Ask Rose anything...",
  },

  profile: {
    name: "Anora",
    city: "Bangalore",
    country: "India",
    age: 27,
    height: "158 cm / 5′2″",
    languages: ["English"],
    hair: "Black",
    nationality: "Indian",
    shortBio:
      "Anora is based in Bangalore and is available for selected dance bookings and appearances.",
  },

  booking: {
    advanceBookingRecommended: true,
    sameDayGuaranteed: false,
    confirmationRequired: true,
    notes: [
      "Booking details should be confirmed directly before making plans.",
      "Live availability can change and should not be assumed from the website alone.",
      "Special requests can be discussed during direct communication.",
    ],
  },

  pricing: [
    {
      id: "private-studio",
      title: "Private Studio Dance Session",
      price: "₹17,000",
      unit: "per hour",
      description: "A private one-to-one studio dance booking.",
    },
    {
      id: "on-location",
      title: "On-Location Dance Session",
      price: "₹20,000",
      unit: "per hour",
      description: "A dance booking at a suitable Bangalore location.",
    },
    {
      id: "full-day",
      title: "Full-Day Dance Booking",
      price: "₹50,000",
      unit: "full day",
      description: "An extended dance or appearance booking.",
    },
  ],

  contact: {
    channels: ["WhatsApp", "Telegram"],
    preferredMessage:
      "For direct enquiries or booking confirmation, use the WhatsApp or Telegram options on the website.",
  },

  boundaries: {
    liveAvailability:
      "I can explain general availability information, but final availability must be confirmed directly with Anora.",
    unknownAnswer:
      "I don’t have confirmed information about that yet. Please contact Anora directly for an accurate answer.",
    offTopic:
      "I’m Anora’s personal assistant, so I can best help with her profile, bookings, pricing, location, availability, and contact information.",
  },

  quickQuestions: [
    {
      label: "Booking options",
      answer:
        "Anora currently offers private studio sessions, on-location dance sessions, and full-day dance bookings. I can explain any of these in more detail.",
    },
    {
      label: "Location",
      answer:
        "Anora is currently based in Bangalore, India. Exact arrangements can be discussed when you contact her directly.",
    },
    {
      label: "Prices",
      answer:
        "Current dummy pricing is ₹17,000 per hour for a private studio session, ₹20,000 per hour for an on-location session, and ₹50,000 for a full-day booking.",
    },
    {
      label: "Contact",
      answer:
        "You can contact Anora directly through the WhatsApp or Telegram options on this website.",
    },
  ],

  faq: [
    {
      id: "where-based",
      category: "location",
      question: "Where is Anora based?",
      answer: "Anora is currently based in Bangalore, India.",
      keywords: ["where", "location", "city", "bangalore", "based"],
    },
    {
      id: "how-contact",
      category: "contact",
      question: "How can I contact Anora?",
      answer:
        "You can contact Anora through the WhatsApp or Telegram options available on the website.",
      keywords: ["contact", "whatsapp", "telegram", "message", "reach"],
    },
    {
      id: "availability",
      category: "availability",
      question: "Is Anora available today?",
      answer:
        "I can provide general guidance, but live availability should always be confirmed directly with Anora.",
      keywords: ["available", "availability", "today", "tonight", "tomorrow"],
    },
    {
      id: "advance-booking",
      category: "booking",
      question: "Should I book in advance?",
      answer:
        "Yes. Booking in advance is recommended because same-day availability is not guaranteed.",
      keywords: ["advance", "book", "booking", "same day", "reserve"],
    },
    {
      id: "pricing",
      category: "pricing",
      question: "What are the booking prices?",
      answer:
        "Current dummy pricing is ₹17,000 per hour for a private studio session, ₹20,000 per hour for an on-location session, and ₹50,000 for a full-day booking.",
      keywords: ["price", "pricing", "cost", "rate", "rates", "fee"],
    },
    {
      id: "languages",
      category: "profile",
      question: "What language does Anora speak?",
      answer: "The current profile lists English.",
      keywords: ["language", "languages", "english", "speak"],
    },
    {
      id: "assistant-owner",
      category: "general",
      question: "Who is your boss?",
      answer: "Anora is the person I assist.",
      keywords: ["boss", "owner", "work for", "who do you work for", "your boss"],
    },
    {
      id: "night-bookings",
      category: "booking",
      question: "Does Anora do night bookings?",
      answer:
        "Night bookings can be discussed by prior arrangement. Final timing and availability should be confirmed directly with Anora.",
      keywords: ["night", "night booking", "late night", "evening booking", "overnight"],
    },
  ] satisfies RoseFaqItem[],
} as const;

/*
  HOW TO REPLACE DUMMY DATA LATER

  1. Keep the same field names.
  2. Replace only the values with verified real information.
  3. Add or remove FAQ entries as needed.
  4. Do not put secrets, private addresses, or API keys in this file.
  5. Live availability should come from a real source later, not a hard-coded answer.

  TO ADD YOUR OWN QUESTIONS:
  Add another object inside the faq array using this shape:

  {
    id: "unique-name",
    category: "general",
    question: "Your question here?",
    answer: "The approved answer Rose should use.",
    keywords: ["important", "matching", "words"],
  }

  Mature/adult FAQs can also be added here. Keep answers factual, respectful,
  and approved for the public site. Rose should not invent Anora-specific details
  that are not written in this knowledge file.
*/
