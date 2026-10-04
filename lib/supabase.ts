import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  // The app can still render in demo mode without Supabase.
  // Auth features will not work until .env.local is configured.
}

export const supabase = createBrowserClient(
  url || "https://placeholder.supabase.co",
  key || "placeholder-anon-key"
);
