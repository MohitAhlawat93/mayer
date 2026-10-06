import { NextResponse } from "next/server";
import {
  createRoseSource,
  insertRoseChunks,
  isRoseDatabaseConfigured,
  upsertRoseTenant,
} from "@/lib/rose-db";
import { parseRoseKnowledgeInput } from "@/lib/rose-ingest";

export const runtime = "nodejs";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}

export async function POST(request: Request) {
  const configuredSecret = process.env.ROSE_ADMIN_SECRET?.trim();
  const authorization = request.headers.get("authorization") ?? "";
  const suppliedSecret = authorization.startsWith("Bearer ")
    ? authorization.slice(7).trim()
    : "";

  if (!configuredSecret || suppliedSecret !== configuredSecret) {
    return unauthorized();
  }

  if (!isRoseDatabaseConfigured()) {
    return NextResponse.json(
      {
        error:
          "Database is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY first.",
      },
      { status: 503 },
    );
  }

  const formData = await request.formData();
  const tenantId = String(formData.get("tenantId") ?? "").trim().toLowerCase();
  const displayName = String(formData.get("displayName") ?? "").trim();
  const assistantName = String(formData.get("assistantName") ?? "Rose").trim() || "Rose";
  const pastedText = String(formData.get("text") ?? "").trim();
  const fileValue = formData.get("file");

  if (!/^[a-z0-9][a-z0-9-_]{1,63}$/.test(tenantId)) {
    return NextResponse.json(
      { error: "Tenant ID must use only letters, numbers, hyphens, or underscores." },
      { status: 400 },
    );
  }

  if (!displayName) {
    return NextResponse.json(
      { error: "Profile/owner name is required." },
      { status: 400 },
    );
  }

  let text = pastedText;
  let fileName = "pasted-text.txt";
  let mimeType = "text/plain";

  if (fileValue instanceof File && fileValue.size > 0) {
    if (fileValue.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: "Please keep uploads under 5 MB for now." },
        { status: 413 },
      );
    }

    text = await fileValue.text();
    fileName = fileValue.name || "upload.txt";
    mimeType = fileValue.type || "text/plain";
  }

  if (!text.trim()) {
    return NextResponse.json(
      { error: "Upload a chat/export file or paste some text." },
      { status: 400 },
    );
  }

  const parsed = parseRoseKnowledgeInput({
    text,
    fileName,
    mimeType,
  });

  if (!parsed.chunks.length) {
    return NextResponse.json(
      { error: "I could not find usable messages or knowledge in that upload." },
      { status: 400 },
    );
  }

  await upsertRoseTenant({
    tenantId,
    displayName,
    assistantName,
  });

  const sourceId = await createRoseSource({
    tenantId,
    sourceType: parsed.sourceType,
    fileName,
    itemCount: parsed.chunks.length,
  });

  const rows = parsed.chunks.map((chunk, ordinal) => ({
    tenant_id: tenantId,
    source_id: sourceId,
    ordinal,
    content: chunk.content,
    metadata: {
      ...chunk.metadata,
      sourceType: parsed.sourceType,
      fileName,
    },
  }));

  for (let start = 0; start < rows.length; start += 150) {
    await insertRoseChunks(rows.slice(start, start + 150));
  }

  return NextResponse.json({
    ok: true,
    tenantId,
    sourceId,
    sourceType: parsed.sourceType,
    chunksStored: rows.length,
    fileName,
  });
}
