export type ParsedRoseChunk = {
  content: string;
  metadata: Record<string, unknown>;
};

type ChatMessage = {
  sender: string;
  text: string;
  timestamp?: string;
};

function asText(value: unknown): string {
  if (typeof value === "string") return value;

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object" && "text" in item) {
          return asText((item as { text?: unknown }).text);
        }
        return "";
      })
      .join("");
  }

  return "";
}

function normalizeLine(text: string) {
  return text.replace(/\u200e/g, "").replace(/\s+/g, " ").trim();
}

function redactSensitiveText(text: string) {
  return text
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[private email]")
    .replace(/(?:\+?\d[\d\s().-]{7,}\d)/g, "[private phone]")
    .replace(/\b\d{12,19}\b/g, "[private number]")
    .replace(/\b[a-z0-9._-]{2,}@[a-z]{2,}\b/gi, "[private payment id]");
}

function sanitizeChunks(chunks: ParsedRoseChunk[]) {
  return chunks
    .map((chunk) => ({
      ...chunk,
      content: redactSensitiveText(chunk.content).trim(),
    }))
    .filter((chunk) => chunk.content.length > 0);
}

function parseWhatsApp(text: string): ChatMessage[] {
  const messages: ChatMessage[] = [];
  const lines = text.split(/\r?\n/);
  const pattern =
    /^(?:\[)?(\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?\s*(?:AM|PM|am|pm)?)(?:\])?\s*[-–]\s*([^:]+):\s*(.*)$/;

  let current: ChatMessage | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const match = line.match(pattern);

    if (match) {
      if (current?.text.trim()) messages.push(current);
      current = {
        timestamp: `${match[1]} ${match[2]}`,
        sender: normalizeLine(match[3]),
        text: normalizeLine(match[4]),
      };
      continue;
    }

    if (current && line.trim()) {
      current.text = normalizeLine(`${current.text} ${line}`);
    }
  }

  if (current?.text.trim()) messages.push(current);
  return messages;
}

function parseTelegramJson(text: string): ChatMessage[] {
  const parsed = JSON.parse(text) as {
    messages?: Array<Record<string, unknown>>;
  };

  return (parsed.messages ?? [])
    .filter((item) => item.type === "message")
    .map((item) => ({
      sender:
        (typeof item.from === "string" && item.from) ||
        (typeof item.actor === "string" && item.actor) ||
        "Unknown",
      text: normalizeLine(asText(item.text)),
      timestamp: typeof item.date === "string" ? item.date : undefined,
    }))
    .filter((message) => message.text.length > 0);
}

function conversationWindows(messages: ChatMessage[]): ParsedRoseChunk[] {
  const clean = messages.filter(
    (message) =>
      message.text.length > 0 &&
      !/security code|messages and calls are end-to-end encrypted/i.test(
        message.text,
      ),
  );

  if (!clean.length) return [];

  const chunks: ParsedRoseChunk[] = [];
  const windowSize = 8;
  const overlap = 2;
  const step = windowSize - overlap;

  for (let start = 0; start < clean.length; start += step) {
    const window = clean.slice(start, start + windowSize);
    if (!window.length) break;

    const content = window
      .map((message) => `${message.sender}: ${message.text}`)
      .join("\n");

    chunks.push({
      content,
      metadata: {
        kind: "conversation",
        participants: [...new Set(window.map((message) => message.sender))],
        firstTimestamp: window[0]?.timestamp ?? null,
        lastTimestamp: window[window.length - 1]?.timestamp ?? null,
      },
    });

    if (start + windowSize >= clean.length) break;
  }

  return chunks;
}

function genericTextChunks(text: string): ParsedRoseChunk[] {
  const clean = text.replace(/\r/g, "").trim();
  if (!clean) return [];

  const qaMatches = [...clean.matchAll(
    /(?:^|\n)\s*Q(?:uestion)?\s*:\s*([^\n]+)\n\s*A(?:nswer)?\s*:\s*([\s\S]*?)(?=\n\s*Q(?:uestion)?\s*:|$)/gi,
  )];

  if (qaMatches.length) {
    return qaMatches.map((match) => ({
      content: `Question: ${normalizeLine(match[1])}\nAnswer: ${normalizeLine(match[2])}`,
      metadata: { kind: "qa" },
    }));
  }

  const paragraphs = clean
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);

  const base = paragraphs.length ? paragraphs : [clean];
  const chunks: ParsedRoseChunk[] = [];
  let buffer = "";

  for (const paragraph of base) {
    const candidate = buffer ? `${buffer}\n\n${paragraph}` : paragraph;

    if (candidate.length > 1400 && buffer) {
      chunks.push({
        content: buffer,
        metadata: { kind: "document" },
      });
      buffer = paragraph;
    } else {
      buffer = candidate;
    }
  }

  if (buffer) {
    chunks.push({
      content: buffer,
      metadata: { kind: "document" },
    });
  }

  return chunks;
}

function parseCsv(text: string): ParsedRoseChunk[] {
  const lines = text.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) return genericTextChunks(text);

  const header = lines[0].split(",").map((item) => item.trim().toLowerCase());
  const qIndex = header.findIndex((item) => /question|query|user/.test(item));
  const aIndex = header.findIndex((item) => /answer|response|assistant/.test(item));

  if (qIndex < 0 || aIndex < 0) return genericTextChunks(text);

  return lines.slice(1).map((line) => {
    const cells = line.split(",").map((cell) => cell.trim().replace(/^"|"$/g, ""));
    return {
      content: `Question: ${cells[qIndex] ?? ""}\nAnswer: ${cells[aIndex] ?? ""}`,
      metadata: { kind: "qa" },
    };
  }).filter((chunk) => chunk.content.trim().length > 18);
}

export function parseRoseKnowledgeInput(input: {
  text: string;
  fileName?: string;
  mimeType?: string;
}): {
  sourceType: string;
  chunks: ParsedRoseChunk[];
} {
  const fileName = input.fileName?.toLowerCase() ?? "";
  const mime = input.mimeType?.toLowerCase() ?? "";

  if (fileName.endsWith(".json") || mime.includes("json")) {
    try {
      const messages = parseTelegramJson(input.text);
      if (messages.length) {
        return {
          sourceType: "telegram",
          chunks: sanitizeChunks(conversationWindows(messages)),
        };
      }
    } catch {
      // Fall through to generic JSON/text chunking.
    }
  }

  if (fileName.endsWith(".csv") || mime.includes("csv")) {
    return {
      sourceType: "csv",
      chunks: sanitizeChunks(parseCsv(input.text)),
    };
  }

  const whatsapp = parseWhatsApp(input.text);
  if (whatsapp.length >= 2) {
    return {
      sourceType: "whatsapp",
      chunks: sanitizeChunks(conversationWindows(whatsapp)),
    };
  }

  return {
    sourceType: fileName.endsWith(".md") ? "markdown" : "text",
    chunks: sanitizeChunks(genericTextChunks(input.text)),
  };
}
