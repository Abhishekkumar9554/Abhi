import { NextResponse } from "next/server";
import { chatSchema } from "@/lib/validation";
import { demoReply } from "@/lib/ai-providers";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = chatSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid message." }, { status: 400 });
    }

    const message = parsed.data.message;
    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.AI_MODEL || "gpt-4o-mini";

    if (!apiKey) {
      return NextResponse.json({ text: demoReply(message), mode: "demo" });
    }

    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: "You are AAVROX, a helpful, concise AI assistant. Answer in the user's language." },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 700
      }),
      cache: "no-store"
    });

    if (!upstream.ok) {
      return NextResponse.json({ text: "AI provider is temporarily unavailable." }, { status: 502 });
    }

    const data = await upstream.json();
    const text = data?.choices?.[0]?.message?.content?.trim();

    if (!text) return NextResponse.json({ error: "Empty AI response." }, { status: 502 });
    return NextResponse.json({ text, mode: "provider" });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
