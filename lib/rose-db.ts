const SUPABASE_URL = process.env.SUPABASE_URL?.trim();
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

export type DbRoseChunk = {
  id: string;
  content: string;
  metadata: Record<string, unknown> | null;
  score: number;
};

export function isRoseDatabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

function headers() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Rose database is not configured.");
  }

  return {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
  };
}

export async function searchRoseDatabase(
  tenantId: string,
  query: string,
  limit = 6,
): Promise<DbRoseChunk[]> {
  if (!isRoseDatabaseConfigured()) return [];

  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/match_rose_chunks`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      p_tenant_id: tenantId,
      p_query: query,
      p_limit: limit,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Rose database search failed: ${response.status}`);
  }

  return (await response.json()) as DbRoseChunk[];
}

export type RoseChunkInsert = {
  tenant_id: string;
  source_id: string;
  ordinal: number;
  content: string;
  metadata: Record<string, unknown>;
};

export async function createRoseSource(input: {
  tenantId: string;
  sourceType: string;
  fileName: string;
  itemCount: number;
}) {
  if (!isRoseDatabaseConfigured()) {
    throw new Error("Rose database is not configured.");
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/rose_sources?select=id`,
    {
      method: "POST",
      headers: {
        ...headers(),
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        tenant_id: input.tenantId,
        source_type: input.sourceType,
        file_name: input.fileName,
        item_count: input.itemCount,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Could not create Rose source: ${response.status}`);
  }

  const rows = (await response.json()) as Array<{ id: string }>;
  const source = rows[0];

  if (!source) throw new Error("Rose source was not created.");

  return source.id;
}

export async function insertRoseChunks(chunks: RoseChunkInsert[]) {
  if (!chunks.length) return;
  if (!isRoseDatabaseConfigured()) {
    throw new Error("Rose database is not configured.");
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/rose_chunks`, {
    method: "POST",
    headers: {
      ...headers(),
      Prefer: "return=minimal",
    },
    body: JSON.stringify(chunks),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Could not store Rose chunks: ${response.status}`);
  }
}


export async function upsertRoseTenant(input: {
  tenantId: string;
  displayName: string;
  assistantName: string;
}) {
  if (!isRoseDatabaseConfigured()) {
    throw new Error("Rose database is not configured.");
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/rose_tenants?on_conflict=id`,
    {
      method: "POST",
      headers: {
        ...headers(),
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify({
        id: input.tenantId,
        display_name: input.displayName,
        assistant_name: input.assistantName,
        updated_at: new Date().toISOString(),
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Could not upsert Rose tenant: ${response.status}`);
  }
}

export async function getRoseTenant(tenantId: string) {
  if (!isRoseDatabaseConfigured()) return null;

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/rose_tenants?id=eq.${encodeURIComponent(tenantId)}&select=id,display_name,assistant_name&limit=1`,
    {
      headers: headers(),
      cache: "no-store",
    },
  );

  if (!response.ok) return null;

  const rows = (await response.json()) as Array<{
    id: string;
    display_name: string;
    assistant_name: string;
  }>;

  return rows[0] ?? null;
}
