import { NextResponse } from "next/server";
import { verifyPassword, createSession, destroySession, isAuthenticated } from "@/lib/auth";

// 인증 상태 확인
export async function GET() {
  if (await isAuthenticated()) {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function POST(request: Request) {
  const { password } = await request.json();

  if (await verifyPassword(password)) {
    await createSession();
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, error: "Wrong password" }, { status: 401 });
}

export async function DELETE() {
  await destroySession();
  return NextResponse.json({ success: true });
}
