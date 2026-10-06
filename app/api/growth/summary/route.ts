import { NextRequest, NextResponse } from "next/server";
import { getGrowthSnapshot } from "@/lib/growth/snapshot";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(request: NextRequest) {
  const expected =
    process.env.GROWTH_ADMIN_SECRET?.trim() ||
    process.env.ROSE_ADMIN_SECRET?.trim() ||
    "";
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  return Boolean(expected && supplied && supplied === expected);
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json(await getGrowthSnapshot(), {
    headers: { "Cache-Control": "no-store" },
  });
}
