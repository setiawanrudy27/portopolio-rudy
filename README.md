# Personal IT Portfolio & CMS

Personal portfolio website with a custom admin dashboard (CMS), built according to
`PRD_Personal_IT_Portfolio_CMS.md` (v3.2 Final).

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Prisma ·
Neon PostgreSQL · Auth.js · S3-compatible storage · FormSubmit.co · Vercel

## Status

- Phase 0 — Technical feasibility: **in progress** (local setup done, cloud
  credentials and deployment pending)
- Phase 1+ — not started

## Requirements

- Node.js 20.9+ (tested with v24.16.0)
- npm 10+ (tested with 11.13.0)
- A Neon PostgreSQL project (pooled + direct connection strings)
- A Vercel account and a GitHub repository (for deployment)

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create the local environment file and fill it in:

   ```bash
   copy .env.example .env
   ```

   Only fill secrets in your own local `.env`. Never paste them into chat,
   commit them, or expose them with a `NEXT_PUBLIC_` prefix.

3. Generate the Prisma client:

   ```bash
   npm run db:generate
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Verify the database connection (requires `DATABASE_URL`):

   <http://localhost:3000/api/health/db>

   Expected response:

   ```json
   { "status": "ok", "database": "reachable", "queryResult": 1 }
   ```

## Scripts

| Command              | Purpose                                            |
| -------------------- | -------------------------------------------------- |
| `npm run dev`        | Start the development server                       |
| `npm run build`      | Production build                                   |
| `npm run start`      | Run the production build locally                   |
| `npm run lint`       | ESLint                                             |
| `npm run typecheck`  | TypeScript check (`tsc --noEmit`)                  |
| `npm run db:generate`| Generate the Prisma client into `src/generated/prisma` |
| `npm run db:migrate` | Create/apply a development migration               |
| `npm run db:status`  | Check migration status                             |

## Environment variables

See `.env.example`. Summary:

| Variable | Scope | Notes |
| --- | --- | --- |
| `DATABASE_URL` | server | Neon **pooled** connection string (runtime) |
| `DIRECT_URL` | server | Neon **direct** connection string (Prisma migrations) |
| `AUTH_SECRET`, `AUTH_URL` | server | Auth.js (Phase 2) |
| `S3_*` | server | Object storage (Phase 5) |
| `FORMSUBMIT_EMAIL` | server | FormSubmit.co recipient (Phase 6) |
| `NEXT_PUBLIC_SITE_URL` | public | Public site URL only |

## Project structure

```text
prisma/
  schema.prisma        # database schema (Prisma 7)
prisma7.config.ts      # Prisma CLI config (migrations use DIRECT_URL)
src/
  app/                 # App Router: public site, /admin, /api
  generated/prisma/    # generated Prisma client (git-ignored)
  lib/prisma.ts        # Prisma client singleton (Neon adapter)
```

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import it in Vercel.
3. Add the environment variables above for **Production** and **Preview**.
4. Deploy, then open `/api/health/db` on the deployed URL and confirm
   `"status": "ok"`.

## Notes

- `src/generated/prisma` is generated on install via the `postinstall` script,
  so it is not committed.
- Do not use the Vercel filesystem for permanent files; uploads go to
  S3-compatible storage.
- Never commit `.env` or any credentials.
