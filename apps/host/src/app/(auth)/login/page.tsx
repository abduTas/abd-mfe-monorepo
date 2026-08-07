"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@pulseboard.dev");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      setError("Invalid credentials");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4 card p-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="text-sm text-slate-500">Demo user: admin@pulseboard.dev / password123</p>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded border p-2"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="w-full rounded border p-2"
      />
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      <button className="w-full rounded bg-slate-900 py-2 text-white">Sign in</button>
    </form>
  );
}
