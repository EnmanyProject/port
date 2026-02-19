import { cookies } from "next/headers";

const SESSION_NAME = "portfolio_admin";
const SESSION_VALUE = "authenticated";
const MAX_AGE = 60 * 60 * 24; // 24 hours

export async function verifyPassword(password: string): Promise<boolean> {
  const adminPw = process.env.ADMIN_PASSWORD;
  console.log("[auth] ADMIN_PASSWORD set:", !!adminPw, "length:", adminPw?.length);
  console.log("[auth] input length:", password?.length);
  return password === adminPw;
}

export async function createSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_NAME, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_NAME);
  return session?.value === SESSION_VALUE;
}
