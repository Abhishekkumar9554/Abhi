"use client";

import { FormEvent, useEffect, useState } from "react";
import AuthPanel from "@/components/AuthPanel";

type Message = { id: string; role: "user" | "ai"; text: string };
type ModelOption = { id: string; name: string; provider: string; enabled: boolean };

const quickPrompts = [
  "Explain space in simple Hindi",
  "Help me build an app",
  "Give me a business idea",
  "Write a professional message",
  "Plan my startup launch",
  "Teach me a coding concept"
];

const tools = [
  ["✦", "Chat", "AI conversations with smart, human-like replies"],
  ["⌕", "Research", "Explore ideas, summary and fast decision support"],
  ["</>", "Code", "Developer assistant for logic, automation and apps"],
  ["◉", "Image", "Creative visual workflows and prompt design"],
  ["▶", "Video", "Script and story planning for moving content"],
  ["🎙", "Voice", "Voice-first assistant experience for everyday tasks"]
];

const navItems = ["Overview", "Agents", "Workspace", "Models", "Settings"];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      text: "Namaste! 👋 Main AAVROX hoon. Demo mode mein aap mujhse kuch bhi pooch sakte hain."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableModels, setAvailableModels] = useState<ModelOption[]>([
    { id: "demo", name: "AAVROX Demo", provider: "demo", enabled: true }
  ]);
  const [selectedModel, setSelectedModel] = useState("demo");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aavrox-chat");
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as Message[];
          if (Array.isArray(parsed) && parsed.length) setMessages(parsed);
        } catch {
          // ignore invalid saved chat
        }
      }
    }

    fetch("/api/models")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data?.models) return;
        const models = data.models.filter((m: ModelOption) => m.enabled);
        setAvailableModels(models);
        if (models.length && !models.some((m: ModelOption) => m.id === selectedModel)) {
          setSelectedModel(models[0].id);
        }
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("aavrox-chat", JSON.stringify(messages));
    }
  }, [messages]);

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
        body: JSON.stringify({ message: value, model: selectedModel })
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "ai",
          text: data.text || data.error || "No response."
        }
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "ai",
          text: "Network error. Please try again."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function quick(prompt: string) {
    setInput(prompt);
  }

  return (
    <main className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">AAVROX</div>
            <small>AI Universe</small>
          </div>
        </div>

        <nav className="nav">
          {navItems.map((item, index) => (
            <button key={item} className={index === 2 ? "nav-item active" : "nav-item"}>
              {item}
            </button>
          ))}
        </nav>

        <div className="mini-card">
          <span>Workspace</span>
          <strong>Ready</strong>
        </div>
      </aside>

      <div className="workspace">
        <header className="workspace-topbar">
          <div>
            <p className="eyebrow">welcome back</p>
            <h2>AI Workspace</h2>
          </div>

          <div className="topbar-actions">
            <label className="model-selector">
              <span>Model</span>
              <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
                {availableModels.map((model) => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
            </label>
            <span className="status">AI UNIVERSE</span>
          </div>
        </header>

        <section className="hero-panel">
          <div>
            <div className="hero-badge">✦ BE BOLD • BE YOU</div>
            <h1>AAVROX</h1>
            <p>
              One futuristic workspace for chat, research, coding, content creation,
              and smart digital execution.
            </p>
            <div className="hero-actions">
              <button className="primary" onClick={() => quick("Help me build an app")}>Start building</button>
              <button className="secondary" onClick={() => quick("Give me a business idea")}>Explore ideas</button>
            </div>
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <span>Live mode</span>
            <strong>Demo ready</strong>
          </div>
          <div className="stat-card">
            <span>Stack</span>
            <strong>Next.js + Supabase</strong>
          </div>
          <div className="stat-card">
            <span>Focus</span>
            <strong>AI productivity</strong>
          </div>
        </section>

        <section className="content-grid">
          <div className="chat-panel">
            <div className="panel-header">
              <span>Workspace chat</span>
              <button type="button" className="clear-chat" onClick={() => setMessages([{ id: "welcome", role: "ai", text: "Chat cleared. Ask me anything new." }])}>Clear</button>
            </div>

            <div className="messages">
              {messages.map((m) => (
                <div key={m.id} className={`bubble ${m.role}`}>
                  <small>{m.role === "ai" ? "AAVROX" : "YOU"}</small>
                  <div>{m.text}</div>
                </div>
              ))}
              {loading && (
                <div className="bubble ai">
                  <small>AAVROX</small>
                  <div>Thinking…</div>
                </div>
              )}
            </div>

            <form className="composer" onSubmit={sendMessage}>
              <input
                value={input}
                maxLength={4000}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AAVROX anything…"
                aria-label="Message"
              />
              <button type="submit" disabled={loading || !input.trim()} aria-label="Send">
                ➤
              </button>
            </form>
          </div>

          <div className="right-panel">
            <div className="side-panel">
              <h3>Quick start</h3>
              <div className="quick-list">
                {quickPrompts.map((p) => (
                  <button key={p} onClick={() => quick(p)}>{p}</button>
                ))}
              </div>
            </div>

            <div className="side-panel tools-panel">
              <h3>AAVROX Tools</h3>
              <div className="tool-grid">
                {tools.map(([icon, name, desc]) => (
                  <article className="tool-card" key={name}>
                    <span>{icon}</span>
                    <div>
                      <strong>{name}</strong>
                      <small>{desc}</small>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AuthPanel />
      </div>
    </main>
  );
}
