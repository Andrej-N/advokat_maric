import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const envCheck = {
    DATABASE_URL: maskUrl(process.env.DATABASE_URL),
    DIRECT_URL: maskUrl(process.env.DIRECT_URL),
    SUPABASE_URL: process.env.SUPABASE_URL ? "set" : "MISSING",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
      ? "set"
      : "MISSING",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "set" : "MISSING",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "MISSING",
  };

  try {
    const count = await prisma.post.count();
    return NextResponse.json({
      ok: true,
      env: envCheck,
      postCount: count,
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        env: envCheck,
        error: {
          name: err instanceof Error ? err.name : "Unknown",
          message: err instanceof Error ? err.message : String(err),
          code: (err as { code?: string }).code,
        },
      },
      { status: 500 },
    );
  }
}

function maskUrl(url: string | undefined) {
  if (!url) return "MISSING";
  const hasQuotes = url.startsWith('"') || url.startsWith("'");
  const startsWithPg = url.replace(/^["']/, "").startsWith("postgresql://");
  return {
    length: url.length,
    startsWithQuote: hasQuotes,
    startsWithPostgresql: startsWithPg,
    host: url.match(/@([^:/]+)/)?.[1] || "unparseable",
    port: url.match(/:(\d+)\//)?.[1] || "unparseable",
  };
}
