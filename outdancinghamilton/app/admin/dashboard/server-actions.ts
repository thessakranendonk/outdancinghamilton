// app/admin/dashboard/server-actions.ts
"use server";
import { prisma } from "@/src/lib/prisma";
import { event_status } from "@prisma/client";
import { revalidatePath } from "next/cache";

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

  const updatedEvent = {
    eventName: String(data.get("eventName")),
    description: String(data.get("description")),
    location: String(data.get("location")),
    date: new Date(String(data.get("date"))),
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




