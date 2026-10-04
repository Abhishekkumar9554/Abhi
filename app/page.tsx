"use client";

import { FormEvent, useEffect, useState } from "react";
import AuthPanel from "@/components/AuthPanel";

type Message = { id: string; role: "user" | "ai"; text: string };

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "ai", text: "Namaste! 👋 Main AAVROX hoon. Demo mode mein aap mujhse kuch bhi pooch sakte hain." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e?: FormEvent) {
    e?.preventDefault();
    const value = input.trim();
    if (!value || loading) return;

    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", text: value }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value })
      });
      const data = await res.json();
      setMessages((m) => [...m, {
        id: crypto.randomUUID(),
        role: "ai",
        text: data.text || data.error || "No response."
      }]);
    } catch {
      setMessages((m) => [...m, {
        id: crypto.randomUUID(),
        role: "ai",
        text: "Network error. Please try again."
      }]);
    } finally {
      setLoading(false);
    }
  }

  function quick(prompt: string) {
    setInput(prompt);
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand"><span className="logo">A</span><b>AAVROX</b></div>
        <span className="status">AI UNIVERSE</span>
      </header>

      <section className="hero">
        <span className="pill">✦ BE BOLD • BE YOU</span>
        <h1>AAVROX</h1>
        <p>One futuristic workspace for chat, research, code and creative AI tools.</p>
      </section>

      <AuthPanel />

      <section className="chat">
        <div className="messages">
          {messages.map((m) => (
            <div key={m.id} className={`bubble ${m.role}`}>
              <small>{m.role === "ai" ? "AAVROX" : "YOU"}</small>
              <div>{m.text}</div>
            </div>
          ))}
          {loading && <div className="bubble ai"><small>AAVROX</small><div>Thinking…</div></div>}
        </div>

        <form className="composer" onSubmit={sendMessage}>
          <input
            value={input}
            maxLength={4000}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AAVROX anything…"
            aria-label="Message"
          />
          <button disabled={loading || !input.trim()} aria-label="Send">➤</button>
        </form>
      </section>

      <section className="section">
        <h2>Quick Start</h2>
        <div className="quick">
          {[
            "Explain space in simple Hindi",
            "Help me build an app",
            "Give me a business idea",
            "Write a professional message"
          ].map((p) => <button key={p} onClick={() => quick(p)}>{p}</button>)}
        </div>
      </section>

      <section className="section">
        <h2>AAVROX Tools</h2>
        <div className="grid">
          {[
            ["✦", "Chat", "AI conversations"],
            ["⌕", "Research", "Research workspace"],
            ["</>", "Code", "Developer assistant"],
            ["◉", "Image", "Image workflow"],
            ["▶", "Video", "Video workflow"],
            ["🎙", "Voice", "Voice interface"]
          ].map(([icon, name, desc]) => (
            <article className="card" key={name}>
              <span className="toolicon">{icon}</span>
              <h3>{name}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <footer>AAVROX © 2026 · Prototype</footer>
    </main>
  );
}
