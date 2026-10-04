"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => data.subscription.unsubscribe();
  }, []);

  async function submit() {
    setMessage("");
    if (!email || password.length < 8) {
      setMessage("Email दें और कम से कम 8 characters का password रखें.");
      return;
    }

    const result = mode === "login"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (result.error) setMessage(result.error.message);
    else setMessage(mode === "signup" ? "Account created. Email verification may be required." : "Login successful.");
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  if (user) {
    return <div className="authbar">Signed in as <b>{user.email}</b><button onClick={logout}>Logout</button></div>;
  }

  return (
    <div className="authbar">
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (8+)" type="password" />
      <button onClick={submit}>{mode === "login" ? "Login" : "Sign up"}</button>
      <button className="ghost" onClick={() => setMode(mode === "login" ? "signup" : "login")}>
        {mode === "login" ? "Create account" : "I have an account"}
      </button>
      {message && <span>{message}</span>}
    </div>
  );
}
