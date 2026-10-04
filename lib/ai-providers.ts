export type ProviderName = "demo" | "openai";

export const modelCatalog = [
  { id: "demo", provider: "demo", name: "AAVROX Demo", enabled: true },
  { id: "gpt-4o-mini", provider: "openai", name: "OpenAI GPT-4o mini", enabled: true }
] as const;

export function demoReply(message: string) {
  const q = message.toLowerCase();
  if (q.includes("hello") || q.includes("hi") || q.includes("namaste"))
    return "Namaste! 👋 Main AAVROX hoon. Abhi demo mode active hai.";
  if (q.includes("app"))
    return "AAVROX app ke liye frontend, secure backend, authentication aur model routing structure ready kiya ja sakta hai.";
  return `AAVROX demo received: "${message}". Real model connection ke liye server-side provider key configure karein.`;
}
