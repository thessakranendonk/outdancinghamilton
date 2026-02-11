import { prisma } from "@/src/lib/prisma";
import nodemailer from "nodemailer";
import { drawTodaysEventImage, formatTimeRange } from "@/src/lib/image/drawTodaysEventImage";

export async function GET() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const events = await prisma.event.findMany({
    where: { date: { gte: today, lt: tomorrow }, status: "APPROVED" },
    orderBy: { startTime: "asc" },
  });

  if (events.length === 0) return new Response("No events today");

  const imageBuffer = await drawTodaysEventImage(events);

  const htmlBody = `
    <p>Here are today's events:</p>
    ${events
      .map(
        (event) => `
        <p>
          <strong>${event.eventName}</strong><br/>
          ${formatTimeRange(event.startTime, event.endTime)} @ ${event.location.split(",")[0]}
        </p>
      `
      )
      .join("")}
  `;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: `Today's Events (${today.toDateString()})`,
    html: htmlBody,
    attachments: [
      {
        filename: "todays-events.png",
        content: imageBuffer,
        contentType: "image/png",
      },
    ],
  });

  return new Response(`Sent daily events email with ${events.length} events`);
}
