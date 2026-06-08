"use client";

import { useEffect } from "react";

// Fires a one-time view beacon when a skill page mounts. Guards against double
// counting within a session via sessionStorage.
export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `viewed:${slug}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, event: "view" }),
      keepalive: true,
    }).catch(() => {});
  }, [slug]);
  return null;
}
