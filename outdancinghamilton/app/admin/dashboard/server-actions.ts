// app/admin/dashboard/server-actions.ts
"use server";
import { prisma } from "@/src/lib/prisma";
import { EventStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Approve Event
export async function approveEvent(data: FormData) {
  const id = Number(data.get("id"));
  if (!id) return;

  await prisma.event.update({
    where: { id },
    data: { status: EventStatus.APPROVED },
  });

  revalidatePath("/admin/dashboard");
}

// Reject Event
export async function rejectEvent(data: FormData) {
  const id = Number(data.get("id"));
  if (!id) return;

  await prisma.event.update({
    where: { id },
    data: { status: EventStatus.REJECTED },
  });

  revalidatePath("/admin/dashboard");
}

// Update Event (Edit)
export async function updateEvent(data: FormData) {
  const id = Number(data.get("id"));
  if (!id) return;

  const updatedEvent = {
    eventName: String(data.get("eventName")),
    description: String(data.get("description")),
    location: String(data.get("location")),
    date: new Date(String(data.get("date"))),
    price: String(data.get("price")),
    status: data.get("status") as EventStatus,
  };

  await prisma.event.update({
    where: { id },
    data: updatedEvent,
  });

  revalidatePath("/admin/dashboard");
  return updatedEvent;
}

// Submit Event
export async function submitEvent(data: FormData) {
  "use server";

  const eventName = data.get("eventName")?.toString();
  const location = data.get("location")?.toString();
  const price = data.get("price")?.toString();
  const age = data.get("age")?.toString();
  const email = data.get("email")?.toString();
  const createdAt = new Date();
  const description = data.get("description")?.toString();
  const dateStr = data.get("date")?.toString();
  const imgUrl = data.get("imgUrl")?.toString(); // ✅ keep imgUrl

  if (
    !eventName ||
    !location ||
    !price ||
    !age ||
    !email ||
    !description ||
    !dateStr ||
    !imgUrl
  )
    return;

  const date = new Date(dateStr);

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
      imgUrl, // store imgUrl
      status: 'PENDING', // pending by default
    },
  });

  revalidatePath("/");
}




