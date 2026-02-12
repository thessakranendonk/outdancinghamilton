import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Could also validate credentials from the body
  // but for now we accept anything already checked on client
  const res = NextResponse.json({ message: "Logged in" });

  // Set HTTP-only cookie valid for 1 day
  res.cookies.set({
    name: "admin",
    value: "true",
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "strict",
  });

  return res;
}
