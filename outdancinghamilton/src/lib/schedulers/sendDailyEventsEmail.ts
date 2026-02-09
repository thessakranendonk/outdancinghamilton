// import cron from "node-cron";
// import { prisma } from "../prisma";
// import nodemailer from "nodemailer";
// import { drawEventImage } from "../image/drawEventImage";

// export function scheduleDailyEventsEmail() {
//   // Runs every day at 6:00 AM server time
// //   cron.schedule("0 6 * * *", async () => {
//   cron.schedule("* * * * *", async () => {

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);

//     const events = await prisma.event.findMany({
//       where: { date: { gte: today, lt: tomorrow }, status: "APPROVED" },
//       orderBy: { startTime: "asc" },
//     });

//     if (events.length === 0) return; // nothing to send

//     const imageBuffer = await drawEventImage(events);

//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: Number(process.env.SMTP_PORT),
//       secure: false,
//       auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
//     });

//     await transporter.sendMail({
//       from: process.env.SMTP_USER,
//       to: process.env.SMTP_USER, // or a list of subscribers
//       subject: `Today's Events (${today.toDateString()})`,
//       html: `<p>Here are today's events:</p>`,
//       attachments: [
//         {
//           filename: "todays-events.png",
//           content: imageBuffer,
//           contentType: "image/png",
//         },
//       ],
//     });

//     console.log(`Sent daily events email with ${events.length} events`);
//   });
// }

// lib/schedulers/sendDailyEventsEmail.ts
import cron from "node-cron";
import { prisma } from "../prisma";
import nodemailer from "nodemailer";
import { drawEventImage } from "../image/drawEventImage";

export async function runDailyEventsEmail(date = new Date()) {
  const today = new Date(date);
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const events = await prisma.event.findMany({
    where: { date: { gte: today, lt: tomorrow }, status: "APPROVED" },
    orderBy: { startTime: "asc" },
  });

  if (events.length === 0) {
    console.log("No events today — skipping email");
    return;
  }

  const imageBuffer = await drawEventImage(events);

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
    html: `<p>Here are today's events:</p>`,
    attachments: [
      {
        filename: "todays-events.png",
        content: imageBuffer,
        contentType: "image/png",
      },
    ],
  });

  console.log(`Sent daily events email with ${events.length} events`);
}

export function scheduleDailyEventsEmail() {
  // 6:00 AM server time
  cron.schedule("* * * * *", () => {
    runDailyEventsEmail().catch(console.error);
  });
}
