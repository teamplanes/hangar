"use client";

export function SignOut() {
  async function signOut() {
    await fetch("/api/admin-login", { method: "DELETE" });
    window.location.reload();
  }
  return (
    <button
      type="button"
      onClick={signOut}
      className="font-mono text-[0.7rem] text-ink/50 uppercase tracking-[0.14em] underline hover:text-ink"
    >
      Sign out
    </button>
  );
}
