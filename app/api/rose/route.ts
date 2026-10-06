import { NextResponse } from "next/server";
import { getRoseTenant } from "@/lib/rose-db";
import { retrieveRoseContext, type RoseHistoryMessage } from "@/lib/rose-retrieval";
import { generateRoseAnswer } from "@/lib/rose-groq";
import {
  isRoseInternalDataRequest,
  roseInternalDataResponse,
} from "@/lib/rose-privacy";

type RoseRequestBody = {
  message?: unknown;
  history?: unknown;
};

function parseHistory(value: unknown): RoseHistoryMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (item): item is RoseHistoryMessage =>
        Boolean(
          item &&
            typeof item === "object" &&
            "role" in item &&
            "content" in item &&
            (((item as { role?: unknown }).role === "user") ||
              ((item as { role?: unknown }).role === "assistant")) &&
            typeof (item as { content?: unknown }).content === "string",
        ),
    )
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, 500),
    }))
    .filter((item) => item.content.length > 0)
    .slice(-8);
}

export async function POST(request: Request) {
  let body: RoseRequestBody;

  try {
    body = (await request.json()) as RoseRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (typeof body.message !== "string") {
    return NextResponse.json(
      { error: "A message is required." },
      { status: 400 },
    );
  }

  const message = body.message.trim();

  if (!message) {
    return NextResponse.json(
      { error: "Please enter a question." },
      { status: 400 },
    );
  }

  if (message.length > 500) {
    return NextResponse.json(
      { error: "Please keep your question under 500 characters." },
      { status: 400 },
    );
  }

  const history = parseHistory(body.history);
  const tenantId = process.env.ROSE_TENANT_ID?.trim().toLowerCase() || "anora";
  const tenant = await getRoseTenant(tenantId);

  const ownerName =
    tenant?.display_name ||
    process.env.ROSE_OWNER_NAME?.trim() ||
    "Anora";

  const assistantName =
    tenant?.assistant_name ||
    process.env.ROSE_ASSISTANT_NAME?.trim() ||
    "Rose";

  if (isRoseInternalDataRequest(message)) {
    return NextResponse.json({
      answer: roseInternalDataResponse(ownerName),
    });
  }

  const retrieval = await retrieveRoseContext(message, history, {
    tenantId,
    ownerName,
    assistantName,
  });

  const generated = await generateRoseAnswer(message, retrieval, history, {
    ownerName,
    assistantName,
  });

  return NextResponse.json({
    answer: generated.answer,
  });
}
