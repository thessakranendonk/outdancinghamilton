import { prisma} from "@/src/lib/prisma";
import DashboardEventListWithModal from "@/src/components/ui/DashboardEventListWithModal";
import SubmitEventForm from "@/src/components/ui/SubmitEventForm";
import { submitEvent } from "./server-actions";
import { event_status } from "@prisma/client";

interface AdminDashboardProps {
  searchParams?: Record<string, string> | Promise<Record<string, string>>;
}

const now = new Date();
const startOfTodayUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));

export default async function AdminDashboard({ searchParams }: AdminDashboardProps) {
  // Unwrap searchParams if it is a Promise
  const params = searchParams instanceof Promise ? await searchParams : searchParams ?? {};

  // Determine current status filter
  const rawStatus = typeof params.status === "string" ? params.status : "PENDING";
  const status: event_status =
    ["PENDING", "APPROVED", "REJECTED"].includes(rawStatus)
      ? (rawStatus as event_status)
      : event_status.PENDING;

      console.log(status)

  // Fetch events from Prisma
  const events = await prisma.event.findMany({
    where: { status,
      date: {
        gte: startOfTodayUTC,
      }
     },
    orderBy: { date: "asc" },
  });


  const pendingEvents = await prisma.event.findMany({
  where: { status: "PENDING" },
  orderBy: { date: "asc" },
});

console.log("Pending events in DB:", pendingEvents);


  return (
    <div className="mt-20">
    <DashboardEventListWithModal events={events} statusFilter={status} />
    <div className="max-w-3xl mx-auto bg-white/90 rounded-lg p-10 mt-20">
      <h2 className="text-5xl text-brand-pink font-[Bungee] text-center mb-10">Add a new event</h2>
    <SubmitEventForm serverAction={submitEvent} />
    </div>
    </div>
  );
}
