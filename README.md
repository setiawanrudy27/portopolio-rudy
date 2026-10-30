# Personal IT Portfolio & CMS

Personal portfolio website with a custom admin dashboard (CMS), built according to
`PRD_Personal_IT_Portfolio_CMS.md` (v3.2 Final).

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Prisma ·
Neon PostgreSQL · Auth.js · S3-compatible storage · FormSubmit.co · Vercel

## Status

- Phase 0 — Technical feasibility: **done** (Neon connected locally and on Vercel)
- Phase 1 — Project foundation: **done** (shadcn/ui, schema + initial migration,
  public and admin layouts)
- Phase 2 — Authentication: not started
- Phase 3+ — not started

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

| Command                | Purpose                                                |
| ---------------------- | ------------------------------------------------------ |
| `npm run dev`          | Start the development server                           |
| `npm run build`        | Production build                                       |
| `npm run start`        | Run the production build locally                       |
| `npm run lint`         | ESLint                                                 |
| `npm run typecheck`    | Generate route types + TypeScript check                |
| `npm run format`       | Format the codebase with Prettier                      |
| `npm run format:check` | Check formatting without writing                       |
| `npm run db:generate`  | Generate the Prisma client into `src/generated/prisma` |
| `npm run db:migrate`   | Create/apply a development migration                   |
| `npm run db:status`    | Check migration status                                 |

## Environment variables

See `.env.example`. Summary:

| Variable                  | Scope  | Notes                                                 |
| ------------------------- | ------ | ----------------------------------------------------- |
| `DATABASE_URL`            | server | Neon **pooled** connection string (runtime)           |
| `DIRECT_URL`              | server | Neon **direct** connection string (Prisma migrations) |
| `AUTH_SECRET`, `AUTH_URL` | server | Auth.js (Phase 2)                                     |
| `S3_*`                    | server | Object storage (Phase 5)                              |
| `FORMSUBMIT_EMAIL`        | server | FormSubmit.co recipient (Phase 6)                     |
| `NEXT_PUBLIC_SITE_URL`    | public | Public site URL only                                  |

## Project structure

```text
prisma/
  schema.prisma        # 14 tables + enums (Prisma 7)
  migrations/          # applied migration history
prisma7.config.ts      # Prisma CLI config (migrations use DIRECT_URL)
src/
  app/
    (public)/          # public site: home, about, skills, projects, resume, contact
    (admin)/admin/     # custom admin dashboard shell
    api/health/db/     # database connectivity check
  components/
    ui/                # shadcn/ui components
    layout/            # public header/footer
    admin/             # admin sidebar/topbar/navigation
    providers/         # theme provider
    shared/            # shared building blocks
  generated/prisma/    # generated Prisma client (git-ignored)
  lib/
    prisma.ts          # Prisma client singleton (Neon adapter)
    site.ts            # shared site navigation/config
    utils.ts           # `cn` helper
```

## Database

The schema in `prisma/schema.prisma` contains the 14 tables required by the PRD:
`users`, `profiles`, `skill_categories`, `skills`, `tool_categories`, `tools`,
`project_categories`, `projects`, `project_images`, `project_tools`, `resumes`,
`social_links`, `contact_messages`, and `website_settings`.

Work experience and education/certification tables are intentionally **not**
created.

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
