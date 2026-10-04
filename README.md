# AAVROX AI

A beginner-friendly Next.js starter for the AAVROX AI workspace.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Supabase

1. Create a Supabase project.
2. Put its URL and anon key in `.env.local`.
3. Run `supabase/schema.sql` in Supabase SQL Editor.
4. Authentication is handled through Supabase Auth.

## AI

Without `OPENAI_API_KEY`, the app runs in safe demo mode.
If you add a valid server-side `OPENAI_API_KEY`, `/api/chat` can call the configured model.

Do not commit `.env.local` or secret API keys to GitHub.

## Production

Use HTTPS, a trusted hosting provider, environment secrets, database RLS, rate limiting, logging/monitoring, backups, and provider-specific safety controls before public launch.
