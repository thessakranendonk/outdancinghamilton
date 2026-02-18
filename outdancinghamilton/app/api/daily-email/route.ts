import { drawTodaysEventImage } from "@/src/lib/image/drawTodaysEventImage";
import { prisma } from "@/src/lib/prisma";
import nodemailer from "nodemailer";
import { deregisterAllFonts, registerFont } from "canvas";
import path from "path";


export const runtime = "nodejs";

export async function GET() {
  try {
    deregisterAllFonts();
    const fontPath = path.join(process.cwd(), "public/fonts/Arial.TTF");
    const boldPath = path.join(process.cwd(),"public/fonts/ARIALBD.TTF");
    registerFont(fontPath, { family: "Arial", weight: "400" });
     registerFont(boldPath, {family: "Arial", weight: "700",});

    // Start of today (local)
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    // Start of tomorrow
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const events = await prisma.event.findMany({
      where: {
        status: "APPROVED",
        date: {
          gte: start,
          lt: end,
        },
      },
      orderBy: [{ startTime: "asc" }],
    });

    if (events.length === 0) {
      console.log("No events today — skipping email");
      return Response.json({ message: "No events" });
    }

    const imageBuffer = await drawTodaysEventImage(events);

    const formattedDate = start.toLocaleDateString("en-US");

    const htmlBody = `
      <p><strong>HAMILTON DANCE EVENTS TODAY (${formattedDate})</strong></p>
      <ul>
        ${events
          .map(
            e =>
              `<li>${e.eventName} @ ${e.location} (${e.startTime} - ${e.endTime})</li>`
          )
          .join("")}
      </ul>
      <p>See full details on the website.</p>
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
      subject: `Hamilton Dance Events Today – ${formattedDate}`,
      html: htmlBody,
      attachments: [
        {
          filename: "todays-events.png",
          content: imageBuffer,
          contentType: "image/png",
        },
      ],
    });

    console.log(`Sent daily events email with ${events.length} events`);

    return Response.json({ sent: events.length });
  } catch (err) {
    console.error("Daily email failed:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
