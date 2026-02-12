import { prisma } from "@/src/lib/prisma";
import nodemailer from "nodemailer";

function getWeekBounds(date = new Date()) {
  const monday = new Date(date);
  monday.setDate(date.getDate() - date.getDay() + 1);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 7);

  return { monday, sunday };
}

export async function GET() {
  const { monday, sunday } = getWeekBounds();

  const events = await prisma.event.findMany({
    where: {
      status: "APPROVED",
      date: { gte: monday, lt: sunday },
    },
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
  });

  if (events.length === 0) {
    console.log("No events this week — skipping email");
    return new Response(JSON.stringify({ message: "No events" }), { status: 200 });
  }

  // Group events by day
  const eventsByDay = events.reduce<Record<string, string[]>>((acc, event) => {
    const day = event.date.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
    if (!acc[day]) acc[day] = [];
    acc[day].push(event.eventName);
    return acc;
  }, {});

  const orderedDays = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY"];

  const htmlBody = `
    <p>HAMILTON DANCE EVENTS THIS WEEK</p>
    ${orderedDays
      .filter(day => eventsByDay[day]?.length)
      .map(day => `<p><strong>${day}:</strong> ${eventsByDay[day].join(", ")}</p>`)
      .join("")}
    <p>See full details on the website.</p>
  `;

  // Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: `Hamilton Dance Events – Week of ${monday.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
    html: htmlBody,
  });

  console.log(`Sent weekly events email with ${events.length} events`);

  return new Response(JSON.stringify({ sent: events.length }), { status: 200 });
}
