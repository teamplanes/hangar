"use client";

import { useState } from "react";

export function AdminLogin({ configured }: { configured: boolean }) {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("checking");
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      window.location.reload();
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-sm">
      <div className="label mb-2">Admin</div>
      <h1 className="text-[2rem] font-black tracking-tight">Curation</h1>
      <p className="mt-2 text-ink/70 text-sm">
        {configured
          ? "Enter the admin password to manage skills and plugins."
          : "Admin password not set yet (ADMIN_PASSWORD). Ask whoever set up the deploy."}
      </p>
      <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          autoFocus
          disabled={!configured}
          className="border border-ink bg-cream px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={!configured || status === "checking" || !password}
          className="btn-ink text-sm font-mono uppercase tracking-[0.14em] disabled:opacity-50"
        >
          {status === "checking" ? "Checking…" : "Sign in"}
        </button>
        {status === "error" && (
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-coral">
            Wrong password
          </span>
        )}
      </form>
    </div>
  );
}
