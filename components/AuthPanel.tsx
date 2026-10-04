"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState("");

  const refreshUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  useEffect(() => {
    refreshUser();
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  async function submit(e?: FormEvent) {
    e?.preventDefault();
    setMessage("");

    if (!email || password.length < 8) {
      setMessage("Email दें और कम से कम 8 characters का password रखें.");
      return;
    }

    const result = mode === "login"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    setMessage(mode === "signup" ? "Account created. Email verification may be required." : "Login successful.");
    setEmail("");
    setPassword("");
    await refreshUser();
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  if (user) {
    return (
      <div className="authbar">
        <span>Signed in as <b>{user.email}</b></span>
        <button type="button" onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <form className="authbar" onSubmit={submit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password (8+)"
        type="password"
      />
      <button type="submit">{mode === "login" ? "Login" : "Sign up"}</button>
      <button
        type="button"
        className="ghost"
        onClick={() => setMode((prev) => (prev === "login" ? "signup" : "login"))}
      >
        {mode === "login" ? "Create account" : "I have an account"}
      </button>
      {message && <span>{message}</span>}
    </form>
  );
}
