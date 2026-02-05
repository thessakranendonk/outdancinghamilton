import { prisma } from "@/src/lib/prisma";
import { EventStatus } from "@prisma/client";
import DashboardEventListWithModal from "@/src/components/ui/DashboardEventListWithModal";
import SubmitEventForm from "@/src/components/ui/SubmitEventForm";
import { submitEvent } from "./server-actions";

interface AdminDashboardProps {
  searchParams?: Record<string, string> | Promise<Record<string, string>>;
}

const startOfToday = new Date()
startOfToday.setHours(0, 0, 0, 0)

export default async function AdminDashboard({ searchParams }: AdminDashboardProps) {
  // Unwrap searchParams if it is a Promise
  const params = searchParams instanceof Promise ? await searchParams : searchParams ?? {};

  // Determine current status filter
  const rawStatus = typeof params.status === "string" ? params.status : "PENDING";
  const status: EventStatus =
    ["PENDING", "APPROVED", "REJECTED"].includes(rawStatus)
      ? (rawStatus as EventStatus)
      : EventStatus.PENDING;

  // Fetch events from Prisma
  const events = await prisma.event.findMany({
    where: { status,
      date: {
        gte: startOfToday,
      }
     },
    orderBy: { date: "asc" },
  });

  return (
    <div className="mt-20">
    <DashboardEventListWithModal events={events} statusFilter={status} />
    <div className="max-w-3xl mx-auto bg-white/90 rounded-lg p-10">
      <h2 className="text-5xl text-brand-pink font-[Bungee] text-center mb-10">Add a new event</h2>
    <SubmitEventForm serverAction={submitEvent} />
    </div>
    </div>
  );
}
