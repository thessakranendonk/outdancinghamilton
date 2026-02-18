import { prisma } from "@/src/lib/prisma";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, subject, message, eventId, reject } = await req.json();

    if (!email || !subject || !message) {
      return new Response("Missing fields", { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true if using 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Hamilton Dance Admin" <${process.env.SMTP_USER}>`,
      to: email,
      subject,
      replyTo: process.env.SMTP_USER,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <p>${message.replace(/\n/g, "<br/>")}</p>
          <br/>
          <p>— Hamilton Dance Team</p>
        </div>
      `,
    });

    // Optional: Reject event automatically
    if (reject && eventId) {
      await prisma.event.update({
        where: { id: eventId },
        data: { status: "REJECTED" },
      });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email send failed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
