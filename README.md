# AAVROX AI

A premium AI workspace starter built with Next.js, TypeScript, Supabase, and a demo-mode AI layer.

## Features

- Futuristic dark UI
- Chat interface with live demo replies
- Optional OpenAI integration via server-side API key
- Supabase-ready auth authentication setup
- Security middleware and protected environment configuration

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Environment setup

Create a `.env.local` file from `.env.example` and configure:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY` (optional)
- `AI_MODEL` (optional)

## Supabase setup

1. Create a Supabase project.
2. Add URL and anon key in `.env.local`.
3. Run `supabase/schema.sql` inside the Supabase SQL Editor.
4. Enable authentication as needed for your app flow.

## Notes

- If `OPENAI_API_KEY` is not present, the app automatically runs in safe demo mode.
- Do not commit `.env.local` or any secret key.
