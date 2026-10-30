import { getPrismaClient } from "@/lib/prisma";

/**
 * Phase 0 feasibility check: proves that the deployed/running app can reach
 * Neon PostgreSQL through Prisma using the pooled connection.
 *
 * Errors are logged on the server only. The response never exposes SQL
 * messages, connection strings, or stack traces.
 */
export async function GET() {
  try {
    const prisma = getPrismaClient();
    const result = await prisma.$queryRaw<Array<{ ok: number }>>`SELECT 1 AS ok`;

    return Response.json(
      {
        status: "ok",
        database: "reachable",
        queryResult: result[0]?.ok ?? null,
        checkedAt: new Date().toISOString(),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[health/db] Database check failed:", error);

    return Response.json(
      {
        status: "error",
        database: "unreachable",
        message: "Database check failed. See server logs for details.",
        checkedAt: new Date().toISOString(),
      },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
