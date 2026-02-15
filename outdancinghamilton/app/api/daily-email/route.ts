// // import { drawTodaysEventImage } from "@/src/lib/image/drawTodaysEventImage";
// // import { prisma } from "@/src/lib/prisma";
// // import nodemailer from "nodemailer";

// // // route tester: curl -X GET http://localhost:3000/api/daily-email

// // export async function GET() {
// //   // Start of today (local)
// //   const start = new Date();
// //   start.setHours(0, 0, 0, 0);

// //   // Start of tomorrow
// //   const end = new Date(start);
// //   end.setDate(end.getDate() + 1);

// //   const events = await prisma.event.findMany({
// //     where: {
// //       status: "APPROVED",
// //       date: {
// //         gte: start,
// //         lt: end,
// //       },
// //     },
// //     orderBy: [{ startTime: "asc" }],
// //   });

// //   if (events.length === 0) {
// //     console.log("No events today — skipping email");
// //     return new Response(JSON.stringify({ message: "No events" }), { status: 200 });
// //   }

// //   const imageBuffer = await drawTodaysEventImage(events);

// //   const htmlBody = `
// //     <p>HAMILTON DANCE EVENTS TODAY (${start.toLocaleDateString("en-US")})</p>
// //     <ul>
// //       ${events
// //         .map(
// //           e =>
// //             `<li>${e.eventName} @ ${e.location} (${e.startTime} - ${e.endTime})</li>`
// //         )
// //         .join("")}
// //     </ul>
// //     <p>See full details on the website.</p>
// //   `;

// //   const transporter = nodemailer.createTransport({
// //     host: process.env.SMTP_HOST,
// //     port: Number(process.env.SMTP_PORT),
// //     secure: false,
// //     auth: {
// //       user: process.env.SMTP_USER,
// //       pass: process.env.SMTP_PASS,
// //     },
// //   });

// //   await transporter.sendMail({
// //     from: process.env.SMTP_USER,
// //     to: process.env.SMTP_USER,
// //     subject: `Hamilton Dance Events Today – ${start.toLocaleDateString("en-US")}`,
// //     html: htmlBody,
// //      attachments: [
// //       {
// //         filename: "todays-events.png",
// //         content: imageBuffer,
// //         contentType: "image/png",
// //       },
// //     ],
// //   });

// //   console.log(`Sent daily events email with ${events.length} events`);

// //   return new Response(JSON.stringify({ sent: events.length }), { status: 200 });
// // }

// import { drawTodaysEventImage } from "@/src/lib/image/drawTodaysEventImage";
// import { prisma } from "@/src/lib/prisma";
// import nodemailer from "nodemailer";
// import { registerFonts } from "@/app/api/fonts/registerFonts"; // your runtime-safe helper

// export async function GET() {
//   // Register fonts at runtime (before creating any canvas)
//   registerFonts();

//   // Start of today (local)
//   const start = new Date();
//   start.setHours(0, 0, 0, 0);

//   // Start of tomorrow
//   const end = new Date(start);
//   end.setDate(end.getDate() + 1);

//   const events = await prisma.event.findMany({
//     where: {
//       status: "APPROVED",
//       date: {
//         gte: start,
//         lt: end,
//       },
//     },
//     orderBy: [{ startTime: "asc" }],
//   });

//   if (events.length === 0) {
//     console.log("No events today — skipping email");
//     return new Response(JSON.stringify({ message: "No events" }), { status: 200 });
//   }

//   const imageBuffer = await drawTodaysEventImage(events);

//    const htmlBody = `
//      <p>HAMILTON DANCE EVENTS TODAY (${start.toLocaleDateString("en-US")})</p>
//      <ul>
//        ${events
//         .map(
//           e =>
//             `<li>${e.eventName} @ ${e.location} (${e.startTime} - ${e.endTime})</li>`
//         )
//         .join("")}
//     </ul>
//     <p>See full details on the website.</p>
//   `;

//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT),
//     secure: false,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.SMTP_USER,
//     to: process.env.SMTP_USER,
//     subject: `Hamilton Dance Events Today – ${start.toLocaleDateString("en-US")}`,
//     html: htmlBody,
//      attachments: [
//       {
//         filename: "todays-events.png",
//         content: imageBuffer,
//         contentType: "image/png",
//       },
//     ],
//      });

//   console.log(`Sent daily events email with ${events.length} events`);

//   return new Response(JSON.stringify({ sent: events.length }), { status: 200 });
// }

import { drawTodaysEventImage } from "@/src/lib/image/drawTodaysEventImage";
import { prisma } from "@/src/lib/prisma";
import nodemailer from "nodemailer";
import { registerFonts } from "../fonts/registerFonts";

export const runtime = "nodejs";

export async function GET() {
  try {
    // Register fonts before any canvas usage
    registerFonts();

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
