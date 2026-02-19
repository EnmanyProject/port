import { NextResponse } from "next/server";
import { verifyPassword, createSession, destroySession } from "@/lib/auth";

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
