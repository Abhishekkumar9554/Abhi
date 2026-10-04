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

export async function saveMessage(
  conversationId: string,
  role: "user" | "ai",
  content: string
) {
  try {
    const { error } = await supabase.from("messages").insert([
      {
        conversation_id: conversationId,
        role,
        content
      }
    ]);
    if (error) throw error;
  } catch (err) {
    console.error("Failed to save message:", err);
  }
}

export async function createConversation(title: string) {
  try {
    const { data, error } = await supabase
      .from("conversations")
      .insert([{ title }])
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Failed to create conversation:", err);
    return null;
  }
}

export async function getUserConversations() {
  try {
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("Failed to fetch conversations:", err);
    return [];
  }
}

export async function getConversationMessages(conversationId: string) {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("Failed to fetch messages:", err);
    return [];
  }
}
