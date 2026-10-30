import { PrismaNeon } from "@prisma/adapter-neon";

import { PrismaClient } from "@/generated/prisma/client";

/**
 * Prisma client singleton.
 *
 * Vercel runs the app as serverless functions, so a new client (and a new
 * connection pool) must not be created on every request. The instance is cached
 * on `globalThis` during development to survive hot reloads.
 *
 * Runtime connections use the pooled Neon connection string (DATABASE_URL).
 * Migrations are handled by the Prisma CLI (see prisma7.config.ts).
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const adapter = new PrismaNeon({ connectionString });

  return new PrismaClient({ adapter });
}

export function getPrismaClient(): PrismaClient {
  const client = globalForPrisma.prisma ?? createPrismaClient();

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}
