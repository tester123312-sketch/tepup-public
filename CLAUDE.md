# Tepup — Vietnamese Education Platform

## Stack
- Next.js 16, React 19, TypeScript 5
- Prisma 7 + Supabase PostgreSQL
- NextAuth v5 (beta) with Prisma adapter
- Tailwind CSS 4, Lucide React icons
- Groq SDK (AI features)

## Essential Commands
All commands run from `tepup/` directory:
- `npm run dev` — dev server (port 3000)
- `npm run build` — production build (runs prisma generate first)
- `npx prisma db push` — sync schema to database
- `npx prisma studio` — visual database browser
- `npx tsx scripts/<name>.ts` — run seeding/utility scripts

## Project Structure
```
tepup/
├── app/
│   ├── (auth)/          # Login, register, feature-request
│   ├── admin/           # Admin dashboard (restricted routes)
│   ├── api/             # API routes
│   ├── contributor/     # Contributor pages
│   ├── courses/         # Course browsing
│   ├── learn/           # Learning experience
│   ├── library/         # Content library
│   ├── story/           # Story pages
│   └── page.tsx         # Homepage
├── components/          # Reusable React components
├── lib/                 # Utilities, helpers, Prisma client
├── prisma/schema.prisma # Database schema (single file)
├── scripts/             # Data seeding & utility scripts
├── types/               # TypeScript type definitions
└── public/              # Static assets
```

## Critical Rules
- **Database**: `.env` points to STAGING DB — dev DB is paused on Supabase
- **App Router only**: Use Next.js App Router patterns, never Pages Router
- **Do NOT edit**: node_modules/, .next/, generated Prisma client
- **Vietnamese content**: Course content is in Vietnamese — preserve diacritics exactly
- **Seeding scripts**: Each course level has its own script in `scripts/`

## Architecture Decisions
- Auth: NextAuth v5 beta + `@auth/prisma-adapter` + bcryptjs for passwords
- Admin routes use `app/admin/(restricted)/` route group
- API endpoints in `app/api/` following REST conventions
- Content blocks: `text | callout | image | question | library-document`
- Images stored in Supabase Storage

## Useful Docs
- `docs/01-ui-ux/` — UI/UX specifications
- `docs/02-backend/` — Backend architecture
- `docs/03-admin/` — Admin panel docs
- `docs/PLAN.md` — Project roadmap
