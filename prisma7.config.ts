// This file is read by the Prisma CLI (generate, migrate, studio).
// The application runtime connects through the Neon adapter in src/lib/prisma.ts.
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Migrations should use the direct (non-pooled) Neon connection when
    // available, because schema operations cannot run through PgBouncer.
    url: process.env["DIRECT_URL"] || process.env["DATABASE_URL"],
  },
});
