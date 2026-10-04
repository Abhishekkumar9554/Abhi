* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  min-height: 100%;
  font-family: Inter, system-ui, -apple-system, Segoe UI, sans-serif;
  background:
    radial-gradient(circle at top, rgba(110, 86, 255, 0.24), transparent 28%),
    linear-gradient(180deg, #04050a 0%, #090b12 100%);
  color: #f4f4f7;
}

button, input, select {
  font: inherit;
}

button {
  cursor: pointer;
}

.shell {
  max-width: 1100px;
  margin: auto;
  padding: 0 18px 70px;
}

.topbar {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.model-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #dfe6ff;
  font-size: 0.8rem;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.02);
  border-radius: 999px;
  padding: 6px 10px;
}

.model-selector select {
  background: transparent;
  color: white;
  border: 0;
  outline: none;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  letter-spacing: 2px;
}

.logo {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: inset 0 0 18px rgba(255,255,255,0.05);
}

.status,
.hero-badge,
.pill {
  font-size: 11px;
  color: #d5d7df;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  padding: 7px 11px;
  background: rgba(255, 255, 255, 0.03);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero {
  text-align: center;
  padding: 62px 0 24px;
}

.hero h1 {
  font-size: clamp(55px, 12vw, 110px);
  line-height: 0.88;
  margin: 18px 0 12px;
  background: linear-gradient(180deg, #ffffff 0%, #7d8aa5 100%);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  letter-spacing: -6px;
}

.hero p {
  max-width: 660px;
  margin: auto;
  color: #a8adbb;
  line-height: 1.7;
  font-size: 1.06rem;
}

.hero-actions {
  margin-top: 28px;
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-actions button,
.authbar button,
.quick button,
.composer button,
.clear-chat {
  transition: transform 0.18s ease, opacity 0.18s ease, box-shadow 0.18s ease;
}

.hero-actions button:hover,
.authbar button:hover,
.quick button:hover,
.composer button:hover,
.clear-chat:hover {
  transform: translateY(-1px);
}

.primary,
.secondary {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 12px 18px;
}

.primary {
  background: linear-gradient(135deg, #fff 0%, #ddd 100%);
  color: #05070b;
  box-shadow: 0 12px 30px rgba(255,255,255,0.08);
}

.secondary {
  background: rgba(255,255,255,0.02);
  color: #edf1ff;
}

.authbar {
  max-width: 900px;
  margin: 18px auto 0;
  padding: 16px 18px;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  background: rgba(11, 12, 18, 0.9);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.18);
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.authbar input {
  min-width: 180px;
  flex: 1 1 180px;
  background: #0b0d13;
  color: white;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 12px 13px;
  outline: none;
}

.authbar button {
  border: 1px solid rgba(255,255,255,0.08);
  background: #f2f4f8;
  color: #080b12;
  border-radius: 12px;
  padding: 11px 15px;
  font-weight: 600;
}

.authbar button.ghost {
  background: rgba(255,255,255,0.04);
  color: #eef3ff;
}

.authbar span {
  width: 100%;
  color: #d7dbe8;
  font-size: 0.94rem;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  max-width: 900px;
  margin: 26px auto 0;
}

.metric-card {
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.02);
  border-radius: 18px;
  padding: 18px 16px;
}

.metric-label {
  display: block;
  color: #9199ae;
  font-size: 0.76rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.metric-card strong {
  font-size: 1.05rem;
}

.chat {
  max-width: 900px;
  margin: 28px auto 0;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  background: rgba(11, 11, 16, 0.9);
  overflow: hidden;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.35);
}

.chat-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  color: #cfd8f9;
  font-size: 0.9rem;
  background: rgba(255,255,255,0.02);
}

.clear-chat {
  border: 1px solid rgba(255,255,255,0.08);
  background: transparent;
  color: #edf3ff;
  padding: 8px 10px;
  border-radius: 10px;
}

.messages {
  min-height: 230px;
  max-height: 540px;
  overflow: auto;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bubble {
  max-width: 82%;
  padding: 12px 15px;
  border-radius: 16px;
  line-height: 1.6;
}

.bubble small {
  display: block;
  font-size: 9px;
  opacity: 0.65;
  margin-bottom: 5px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.bubble.ai {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  align-self: flex-start;
}

.bubble.user {
  background: #eef3ff;
  color: #0b1015;
  align-self: flex-end;
}

.composer {
  display: flex;
  gap: 10px;
  padding: 12px 12px 14px;
  border-top: 1px solid rgba(255,255,255,0.08);
}

.composer input {
  flex: 1;
  min-width: 0;
  background: #090b10;
  color: white;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 14px;
  padding: 14px 15px;
  outline: none;
}

.composer button {
  width: 52px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(135deg, #ffffff 0%, #b9c4d4 100%);
  color: #090b10;
  font-size: 1.1rem;
}

.composer button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.section {
  max-width: 900px;
  margin: 42px auto 0;
}

.section-heading {
  margin-bottom: 16px;
}

.section h2 {
  font-size: 1.15rem;
  margin: 0;
}

.quick {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.quick button {
  background: rgba(255,255,255,0.03);
  color: #e5ebff;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 10px 13px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.card {
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  background: linear-gradient(145deg, rgba(15, 16, 20, 0.95), rgba(8, 9, 12, 0.95));
  min-height: 150px;
}

.toolicon {
  font-size: 24px;
}

.card h3 {
  margin: 12px 0 6px;
  font-size: 1.05rem;
}

.card p {
  margin: 0;
  color: #8f97ad;
  font-size: 0.92rem;
  line-height: 1.55;
}

footer {
  text-align: center;
  color: #697187;
  margin-top: 62px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

@media (max-width: 700px) {
  .grid,
  .metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero {
    padding-top: 42px;
  }

  .hero h1 {
    letter-spacing: -4px;
  }
}

@media (max-width: 520px) {
  .grid,
  .metrics {
    grid-template-columns: 1fr;
  }

  .shell {
    padding: 0 12px 60px;
  }

  .bubble {
    max-width: 92%;
  }

  .authbar {
    padding: 14px;
  }
}
