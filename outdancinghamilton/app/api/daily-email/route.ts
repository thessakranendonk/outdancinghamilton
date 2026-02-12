import { prisma } from "@/src/lib/prisma";
import nodemailer from "nodemailer";

export async function GET() {
  const today = new Date();
  today.setHours(0,0,0,0);

  const events = await prisma.event.findMany({
    where: { status: "APPROVED", date: today },
    orderBy: [{ startTime: "asc" }],
  });

  if (events.length === 0) {
    console.log("No events today — skipping email");
    return new Response(JSON.stringify({ message: "No events" }), { status: 200 });
  }

  const htmlBody = `
    <p>HAMILTON DANCE EVENTS TODAY (${today.toLocaleDateString("en-US")})</p>
    <ul>
      ${events.map(e => `<li>${e.eventName} @ ${e.location} (${e.startTime} - ${e.endTime})</li>`).join("")}
    </ul>
    <p>See full details on the website.</p>
  `;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: `Hamilton Dance Events Today – ${today.toLocaleDateString("en-US")}`,
    html: htmlBody,
  });

  console.log(`Sent daily events email with ${events.length} events`);

  return new Response(JSON.stringify({ sent: events.length }), { status: 200 });
}
