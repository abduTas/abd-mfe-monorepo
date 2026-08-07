import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { DEMO_USER, SESSION_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();

  if (body.email !== DEMO_USER.email || body.password !== "password123") {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  (await cookies()).set(SESSION_COOKIE, "demo-token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
