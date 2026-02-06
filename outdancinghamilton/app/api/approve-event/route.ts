// app/api/approve-event/route.ts
import { prisma } from "@/src/lib/prisma";
import { event_status } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const token = url.searchParams.get("token"); // simple security

    if (!id || token !== process.env.APPROVAL_SECRET) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await prisma.event.update({
      where: { id: Number(id) },
      data: { status: event_status.APPROVED },
    });

    return NextResponse.json({ success: true, message: "Event approved!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to approve event" }, { status: 500 });
  }
}
