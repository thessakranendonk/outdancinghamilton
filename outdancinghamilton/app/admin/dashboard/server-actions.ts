// app/admin/dashboard/server-actions.ts
"use server";
import { prisma } from "@/src/lib/prisma";
import { event_status } from "@prisma/client";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";

export async function deletePastEvents() {
  const now = new Date();
  const result = await prisma.event.deleteMany({
    where: { date: { lt: now } },
  });
  console.log(`Deleted ${result.count} past events`);
}

// Approve Event
export async function approveEvent(data: FormData) {
  await deletePastEvents();

  const id = Number(data.get("id"));
  if (!id) return;

  await prisma.event.update({
    where: { id },
    data: { status: event_status.APPROVED },
  });

  revalidatePath("/admin/dashboard");
}

// Reject Event
export async function rejectEvent(data: FormData) {
  const id = Number(data.get("id"));
  if (!id) return;

  await prisma.event.update({
    where: { id },
    data: { status: event_status.REJECTED },
  });

  revalidatePath("/admin/dashboard");
}

// Update Event (Edit)
export async function updateEvent(data: FormData) {
  const id = Number(data.get("id"));
  if (!id) return;

  const rawDate = data.get("date") as string;

const [year, month, day] = rawDate.split("-").map(Number);
// Create date at LOCAL noon (safe)
const safeDate = new Date(year, month - 1, day, 12, 0, 0, 0);


  const updatedEvent = {
    eventName: String(data.get("eventName")),
    description: String(data.get("description")),
    location: String(data.get("location")),
    date: safeDate,
    startTime: String(data.get("startTime")),
    endTime: String(data.get("endTime")),
    price: String(data.get("price")),
    age: String(data.get("age")),
    ticketLink: String(data.get("ticketLink")),
    eventLink: String(data.get("eventLink")),
    status: data.get("status") as event_status,
  };

  await prisma.event.update({
    where: { id },
    data: updatedEvent,
  });

  revalidatePath("/admin/dashboard");
  return updatedEvent;
}

// Delete Event
export async function deleteEvent(data: FormData) {
  const id = Number(data.get("id"));
  if (!id) return;

  await prisma.event.delete({
    where: { id },
  });

  revalidatePath("/admin/dashboard");
}



// Submit Event
export async function submitEvent(data: FormData) {
  await deletePastEvents();

  const eventName = data.get("eventName")?.toString();
  const location = data.get("location")?.toString();
  const price = data.get("price")?.toString();
  const age = data.get("age")?.toString();
  const email = data.get("email")?.toString();
  const createdAt = new Date();
  const description = data.get("description")?.toString();
  const dateInput = data.get("date") as string;
  const startTime = data.get("startTime") as string;
  const endTime = data.get("endTime") as string;
  const ticketLink = data.get("ticketLink")?.toString();
  const eventLink= data.get("eventLink")?.toString();
  const imgUrl = data.get("imgUrl")?.toString(); 

  if (
    !eventName ||
    !location ||
    !price ||
    !age ||
    !email ||
    !description ||
    !dateInput ||
    !startTime ||
    !endTime
  )
    return;

const date = new Date(dateInput);


  await prisma.event.create({
    data: {
      eventName,
      location,
      price,
      age,
      email,
      createdAt,
      description,
      date,
      startTime,
      endTime,
      imgUrl,
      ticketLink,
      eventLink,
      status: 'PENDING',
    },
  });

  revalidatePath("/");
}

// Submit with Email event
export async function submitEventWithEmail(data: FormData) {
  // 1. Delete past events
  const now = new Date();
  await prisma.event.deleteMany({ where: { date: { lt: now } } });

  // 2. Extract form fields
  const eventName = data.get("eventName")?.toString();
  const location = data.get("location")?.toString();
  const price = data.get("price")?.toString();
  const age = data.get("age")?.toString();
  const email = data.get("email")?.toString();
  const description = data.get("description")?.toString();
  const dateInput = data.get("date")?.toString();
  const startTime = data.get("startTime")?.toString();
  const endTime = data.get("endTime")?.toString();
  const ticketLink = data.get("ticketLink")?.toString();
  const eventLink = data.get("eventLink")?.toString();
  const imgUrl = data.get("imgUrl")?.toString();

  if (
    !eventName ||
    !location ||
    !price ||
    !age ||
    !email ||
    !description ||
    !dateInput ||
    !startTime ||
    !endTime
  ) return;

  const date = new Date(dateInput);

  // 3. Save event to database and capture created event
  const newEvent = await prisma.event.create({
    data: {
      eventName,
      location,
      price,
      age,
      email,
      description,
      date,
      startTime,
      endTime,
      imgUrl,
      ticketLink,
      eventLink,
      status: "PENDING",
      createdAt: new Date(),
    },
  });

  revalidatePath("/"); // refresh homepage

  // 4. Prepare email body
  const approveLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/approve-event?id=${newEvent.id}&token=${process.env.APPROVAL_SECRET}`;

    const emailHtml = `
      <h2>New Event Submission</h2>
      <p><strong>Event Name:</strong> ${eventName}</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Date:</strong> ${date.toDateString()}</p>
      <p><strong>Start Time:</strong> ${startTime}</p>
      <p><strong>End Time:</strong> ${endTime}</p>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p>
        <a href="${approveLink}" 
          style="display:inline-block;padding:10px 20px;background-color:#4CAF50;color:white;text-decoration:none;border-radius:5px;">
          Approve Event
        </a>
      </p>
    `;

  // 5. Send email
  const uploadedFile = data.get("file-upload") as File | null;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const attachments: any[] = [];

  if (uploadedFile) {
    const arrayBuffer = await uploadedFile.arrayBuffer();
    attachments.push({
      filename: uploadedFile.name,
      content: Buffer.from(arrayBuffer),
      contentType: uploadedFile.type,
    });
  }

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: `New Event Submission: ${eventName}`,
    html: emailHtml,
    attachments,
  });

  return newEvent;
}
