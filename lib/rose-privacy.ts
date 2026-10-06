const INTERNAL_DATA_PATTERNS = [
  /system\s*prompt/i,
  /developer\s*prompt/i,
  /hidden\s*(prompt|instruction|message|context)/i,
  /internal\s*(prompt|instruction|message|context|data|source)/i,
  /knowledge\s*(base|source|entry|entries|chunk|chunks)/i,
  /retriev(ed|al|e)?\s*(context|data|source|chunk|message)/i,
  /rag\s*(data|source|context|chunk|message)/i,
  /training\s*(data|message|messages|example|examples)/i,
  /source\s*(file|files|document|documents|message|messages)/i,
  /(show|give|tell|reveal|list|print|display).*\b(source|sources|context|prompt|instructions|messages|knowledge|data)\b/i,
  /(what|which).*\b(messages|data|sources|files|context)\b.*\b(use|used|have|store|know|answer)/i,
  /how\s+(did|do)\s+you\s+(answer|know|decide|think)/i,
  /how\s+you\s+(think|answered|know)/i,
  /(show|see|explain).*\bhow\s+you\s+think\b/i,
  /what\s+do\s+you\s+have\s+(on|about)\s+her/i,
];

export function isRoseInternalDataRequest(message: string) {
  const text = message.trim();
  return INTERNAL_DATA_PATTERNS.some((pattern) => pattern.test(text));
}

export function roseInternalDataResponse(ownerName: string) {
  return `I can answer questions about ${ownerName}, but I can’t provide private source material, uploaded conversations, internal instructions, or details about how my knowledge system is configured. If you want, ask me a specific question and I’ll answer it directly.`;
}


const SOURCE_DISCLOSURE_PATTERNS = [
  /\b[a-z0-9_-]+\.(?:csv|json|txt|md)\b/i,
  /private\s+reference\s+\d+/i,
  /knowledge\s+entr(?:y|ies)/i,
  /retrieved\s+(?:knowledge|context|chunk|passage|source)/i,
  /system\s+prompt/i,
  /developer\s+prompt/i,
  /source\s+(?:file|document|message)/i,
];

export function containsRoseSourceDisclosure(text: string) {
  return SOURCE_DISCLOSURE_PATTERNS.some((pattern) => pattern.test(text));
}
