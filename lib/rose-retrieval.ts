import { roseKnowledge } from "@/content/rose-knowledge";
import { roseTrainingData } from "@/content/rose-training-data";
import {
  isRoseDatabaseConfigured,
  searchRoseDatabase,
} from "@/lib/rose-db";

export type RoseHistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

export type RoseChunk = {
  id: string;
  category: string;
  title: string;
  text: string;
  searchText: string;
};

export type RoseRagResult = {
  chunks: RoseChunk[];
  confidence: number;
  fallbackAnswer: string;
  source: "database" | "file" | "general";
};

const STOP_WORDS = new Set([
  "a","an","and","are","as","at","be","can","could","did","do","does","for","from","had","has","have",
  "he","her","hers","him","his","how","i","if","in","is","it","its","me","my","of","on","or","our",
  "she","should","so","that","the","their","them","they","this","to","was","we","were","what","when",
  "where","which","who","why","will","with","would","you","your"
]);

const SYNONYMS: Record<string, string[]> = {
  boss: ["owner", "work", "assist"],
  owner: ["boss", "work", "assist"],
  night: ["evening", "late", "overnight"],
  evening: ["night", "late"],
  price: ["cost", "rate", "fee", "charge"],
  cost: ["price", "rate", "fee", "charge"],
  booking: ["book", "reserve", "appointment", "session"],
  book: ["booking", "reserve", "appointment", "session"],
  contact: ["message", "whatsapp", "telegram", "reach"],
  location: ["city", "based", "where"],
  available: ["availability", "free"],
  availability: ["available", "free"],
};

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9₹\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string) {
  const base = normalize(text)
    .split(" ")
    .filter(Boolean)
    .filter((token) => !STOP_WORDS.has(token));

  const expanded = new Set(base);

  for (const token of base) {
    for (const synonym of SYNONYMS[token] ?? []) expanded.add(synonym);
  }

  return [...expanded];
}

function buildKnowledgeChunks(): RoseChunk[] {
  const chunks: RoseChunk[] = [];

  chunks.push({
    id: "profile-summary",
    category: "profile",
    title: "Profile summary",
    text: [
      `${roseKnowledge.profile.name} is based in ${roseKnowledge.profile.city}, ${roseKnowledge.profile.country}.`,
      `Age: ${roseKnowledge.profile.age}.`,
      `Height: ${roseKnowledge.profile.height}.`,
      `Languages: ${roseKnowledge.profile.languages.join(", ")}.`,
      `Hair: ${roseKnowledge.profile.hair}.`,
      `Nationality: ${roseKnowledge.profile.nationality}.`,
      roseKnowledge.profile.shortBio,
    ].join(" "),
    searchText: "",
  });

  chunks.push({
    id: "booking-policy",
    category: "booking",
    title: "Booking policy",
    text: ["Advance booking is recommended.", ...roseKnowledge.booking.notes].join(" "),
    searchText: "",
  });

  chunks.push({
    id: "contact",
    category: "contact",
    title: "Contact",
    text: roseKnowledge.contact.preferredMessage,
    searchText: "",
  });

  chunks.push({
    id: "availability",
    category: "availability",
    title: "Availability guidance",
    text: roseKnowledge.boundaries.liveAvailability,
    searchText: "",
  });

  for (const item of roseKnowledge.pricing) {
    chunks.push({
      id: `pricing-${item.id}`,
      category: "pricing",
      title: item.title,
      text: `${item.title}: ${item.price} ${item.unit}. ${item.description}`,
      searchText: "",
    });
  }

  for (const faq of roseKnowledge.faq) {
    chunks.push({
      id: `faq-${faq.id}`,
      category: faq.category,
      title: faq.question,
      text: faq.answer,
      searchText: [faq.question, faq.answer, ...faq.keywords].join(" "),
    });
  }

  for (const qa of roseTrainingData.qa) {
    chunks.push({
      id: `qa-${qa.id}`,
      category: qa.category ?? "general",
      title: qa.question,
      text: qa.answer,
      searchText: [qa.question, qa.answer, ...(qa.aliases ?? [])].join(" "),
    });
  }

  for (const conversation of roseTrainingData.conversations) {
    for (let index = 0; index < conversation.messages.length - 1; index += 1) {
      const current = conversation.messages[index];
      const next = conversation.messages[index + 1];

      if (current.role !== "user" || next.role !== "assistant") continue;

      chunks.push({
        id: `conversation-${conversation.id}-${index}`,
        category: "conversation",
        title: current.content,
        text: next.content,
        searchText: `${current.content} ${next.content}`,
      });
    }
  }

  for (const document of roseTrainingData.documents) {
    const paragraphs = document.text
      .split(/\n\s*\n/)
      .map((part) => part.trim())
      .filter(Boolean);

    const parts = paragraphs.length ? paragraphs : [document.text];

    parts.forEach((part, index) => {
      chunks.push({
        id: `document-${document.id}-${index}`,
        category: document.category ?? "document",
        title: document.title,
        text: part,
        searchText: `${document.title} ${part}`,
      });
    });
  }

  return chunks.map((chunk) => ({
    ...chunk,
    searchText: chunk.searchText || `${chunk.title} ${chunk.text}`,
  }));
}

const FILE_KNOWLEDGE_CHUNKS = buildKnowledgeChunks();

function buildQuery(question: string, history: RoseHistoryMessage[]) {
  const recentUserContext = history
    .filter((item) => item.role === "user")
    .slice(-2)
    .map((item) => item.content)
    .join(" ");

  return `${recentUserContext} ${question}`.trim();
}

function scoreChunk(query: string, chunk: RoseChunk) {
  const normalizedQuery = normalize(query);
  const normalizedTitle = normalize(chunk.title);
  const normalizedSearch = normalize(chunk.searchText);
  const queryTokens = tokenize(query);
  const chunkTokens = new Set(tokenize(chunk.searchText));

  let score = 0;

  if (normalizedTitle && normalizedQuery.includes(normalizedTitle)) score += 10;

  for (const token of queryTokens) {
    if (chunkTokens.has(token)) score += token.length >= 5 ? 2.4 : 1.5;
    if (normalizedSearch.includes(token)) score += 0.5;
  }

  if (normalizedQuery.length >= 8 && normalizedSearch.includes(normalizedQuery)) {
    score += 8;
  }

  return score;
}

function isSmallTalk(question: string) {
  const q = normalize(question);
  return [
    "hi","hello","hey","how are you","how r you","thank you","thanks","who are you","what is your name"
  ].some((phrase) => q === phrase || q.startsWith(`${phrase} `));
}

function smallTalkFallback(question: string, assistantName: string, ownerName: string) {
  const q = normalize(question);

  if (q.includes("how are you")) return "I’m doing well, thank you. How are you?";
  if (q.includes("thank")) return "You’re very welcome.";
  if (q.includes("who are you") || q.includes("your name")) {
    return `I’m ${assistantName}, ${ownerName}’s personal assistant.`;
  }

  return `Hi! I’m ${assistantName}. How can I help you today?`;
}

function retrieveFileContext(query: string): RoseRagResult {
  const ranked = FILE_KNOWLEDGE_CHUNKS
    .map((chunk) => ({ chunk, score: scoreChunk(query, chunk) }))
    .sort((a, b) => b.score - a.score);

  const top = ranked.filter((item) => item.score > 1.5).slice(0, 5);
  const bestScore = top[0]?.score ?? 0;

  return {
    chunks: top.map((item) => item.chunk),
    confidence: Math.min(0.99, bestScore / 14),
    fallbackAnswer:
      top[0]?.chunk.text ?? roseKnowledge.boundaries.unknownAnswer,
    source: "file",
  };
}

export async function retrieveRoseContext(
  question: string,
  history: RoseHistoryMessage[] = [],
  options?: {
    tenantId?: string;
    assistantName?: string;
    ownerName?: string;
  },
): Promise<RoseRagResult> {
  const tenantId = options?.tenantId ?? "anora";
  const assistantName = options?.assistantName ?? roseKnowledge.assistant.name;
  const ownerName = options?.ownerName ?? roseKnowledge.assistant.ownerName;

  if (isSmallTalk(question)) {
    return {
      chunks: [],
      confidence: 1,
      fallbackAnswer: smallTalkFallback(question, assistantName, ownerName),
      source: "general",
    };
  }

  const query = buildQuery(question, history);

  if (isRoseDatabaseConfigured()) {
    try {
      const rows = await searchRoseDatabase(tenantId, query, 6);

      if (rows.length) {
        const chunks: RoseChunk[] = rows.map((row, index) => ({
          id: row.id,
          category:
            typeof row.metadata?.kind === "string"
              ? row.metadata.kind
              : "database",
          title:
            typeof row.metadata?.fileName === "string"
              ? row.metadata.fileName
              : `Knowledge ${index + 1}`,
          text: row.content,
          searchText: row.content,
        }));

        return {
          chunks,
          confidence: Math.min(0.99, Math.max(0.25, rows[0]?.score ?? 0.25)),
          fallbackAnswer: chunks[0]?.text ?? roseKnowledge.boundaries.unknownAnswer,
          source: "database",
        };
      }

      const allowFileFallback =
        process.env.ROSE_ALLOW_FILE_FALLBACK?.trim().toLowerCase() !== "false";

      if (!allowFileFallback) {
        return {
          chunks: [],
          confidence: 0,
          fallbackAnswer: roseKnowledge.boundaries.unknownAnswer,
          source: "database",
        };
      }
    } catch {
      // Keep Rose available by falling back to the existing local knowledge.
    }
  }

  return retrieveFileContext(query);
}
