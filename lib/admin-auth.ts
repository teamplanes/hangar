import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";

// Shared-password admin gate. The password lives in ADMIN_PASSWORD (Vercel env).
// On login we set an httpOnly cookie holding an HMAC token derived from the
// password, so it can be validated statelessly and can't be forged without
// knowing the password.

export const ADMIN_COOKIE = "hangar_admin";

function password(): string | null {
  return process.env.ADMIN_PASSWORD || null;
}

export function adminToken(): string | null {
  const pw = password();
  if (!pw) return null;
  return crypto.createHmac("sha256", pw).update("hangar-admin-v1").digest("base64url");
}

export function passwordMatches(submitted: string): boolean {
  const pw = password();
  if (!pw) return false;
  const a = Buffer.from(submitted);
  const b = Buffer.from(pw);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function tokenValid(value: string | undefined): boolean {
  const expected = adminToken();
  if (!expected || !value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// For server components (reads the cookie store).
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return tokenValid(store.get(ADMIN_COOKIE)?.value);
}

// For route handlers (reads the raw Cookie header).
export function isAdminRequest(req: Request): boolean {
  const header = req.headers.get("cookie") || "";
  const match = header.match(new RegExp(`(?:^|; )${ADMIN_COOKIE}=([^;]+)`));
  return tokenValid(match?.[1]);
}

export function adminConfigured(): boolean {
  return !!password();
}
