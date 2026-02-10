import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { drawEventImage } from "@/src/lib/image/drawTodaysEventImage";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const eventId = Number(searchParams.get("eventId"));

  if (!eventId) {
    return NextResponse.json({ error: "Missing eventId" }, { status: 400 });
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId, status: "APPROVED" },
  });

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const imageBuffer: Buffer = await drawEventImage([
  {
    eventName: event.eventName,
    date: event.date,
    startTime: event.startTime,
    endTime: event.endTime,
    location: event.location,
  },
]);


  // Convert Buffer to Uint8Array for NextResponse
  const body = new Uint8Array(imageBuffer);

  return new NextResponse(body, {
    headers: { "Content-Type": "image/png" },
  });
}
