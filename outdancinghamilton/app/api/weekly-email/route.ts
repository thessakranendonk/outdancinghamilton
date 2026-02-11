import { drawWeeklyEventImage, getWeekRange } from "@/src/lib/image/drawWeeklyEventImage";
import { prisma } from "@/src/lib/prisma";
import nodemailer from "nodemailer";

/* -------------------- Helpers -------------------- */
function getWeekBounds(date = new Date()) {
  const monday = new Date(date);
  monday.setDate(date.getDate() - date.getDay() + 1);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 7);

  return { monday, sunday };
}

/* -------------------- API Route -------------------- */
export async function GET() {
  try {
    const { monday, sunday } = getWeekBounds();

    const events = await prisma.event.findMany({
      where: {
        date: { gte: monday, lt: sunday },
        status: "APPROVED",
      },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
    });

    if (events.length === 0) {
      console.log("No events this week — skipping email");
      return new Response("No events this week", { status: 200 });
    }

    const imageBuffer = await drawWeeklyEventImage(events);

    const eventsByDay = events.reduce<Record<string, string[]>>((acc, event) => {
      const day = event.date
        .toLocaleDateString("en-US", { weekday: "long" })
        .toUpperCase();

      if (!acc[day]) acc[day] = [];
      acc[day].push(event.eventName);

      return acc;
    }, {});

    const orderedDays = [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ];

    const htmlBody = `
      <p>HAMILTON DANCE EVENTS THIS WEEK ${getWeekRange().toUpperCase()}</p>
      ${orderedDays
        .filter((day) => eventsByDay[day]?.length)
        .map(
          (day) => `
            <p>
              <strong>${day}:</strong> ${eventsByDay[day].join(", ")}
            </p>
          `
        )
        .join("")}
      <p>For details of all events see the outdancinghamilton.com website (link in bio). And on every day that there are any events, early morning (typically 3am-6am) there's an Instagram Story listing them.</p>
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
      subject: `Hamilton Dance Events – Week of ${monday.toLocaleDateString(
        "en-US",
        { month: "short", day: "numeric" }
      )}`,
      html: htmlBody,
      attachments: [
        {
          filename: "weekly-events.png",
          content: imageBuffer,
          contentType: "image/png",
        },
      ],
    });

    console.log(`Sent weekly events email with ${events.length} events`);
    return new Response(`Weekly email sent with ${events.length} events`, { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Error sending weekly email", { status: 500 });
  }
}
