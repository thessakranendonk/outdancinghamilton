// import { prisma } from "@/src/lib/prisma";
// import DashboardEventList from "@/src/components/ui/DashboardEventList";
// import { revalidatePath } from "next/cache";
// import { EventStatus } from "@prisma/client";
// import { useState } from "react";
// import EditEventModal from "@/src/components/ui/EditEventModal";

// // Server actions
// async function approveEvent(data: FormData) {
//   "use server";
//   const id = Number(data.get("id"));
//   if (!id) return;

//   await prisma.event.update({
//     where: { id },
//     data: { status: EventStatus.APPROVED },
//   });

//   revalidatePath("/admin/dashboard");
// }

// async function rejectEvent(data: FormData) {
//   "use server";
//   const id = Number(data.get("id"));
//   if (!id) return;

//   await prisma.event.update({
//     where: { id },
//     data: { status: EventStatus.REJECTED },
//   });

//   revalidatePath("/admin/dashboard");
// }


// export async function updateEvent(data: FormData) {
//   "use server";

//   const id = Number(data.get("id"));
//   if (!id) return;

//   const updatedEvent = {
//     eventName: String(data.get("eventName")),
//     description: String(data.get("description")),
//     location: String(data.get("location")),
//     date: new Date(String(data.get("date"))),
//     price: String(data.get("price")),
//     status: data.get("status") as EventStatus,
//   };

//   await prisma.event.update({
//     where: { id },
//     data: updatedEvent,
//   });

//   // Revalidate the dashboard page
//   revalidatePath("/admin/dashboard");
// }

// // Props type
// interface AdminDashboardProps {
//   searchParams?: Record<string, string> | Promise<Record<string, string>>;
// }

// // Component
// export default async function AdminDashboard({ searchParams }: AdminDashboardProps) {
//   // Unwrap searchParams if it is a Promise
//   const params = searchParams instanceof Promise ? await searchParams : searchParams ?? {};

//   // Modal events
//   const [editingEvent, setEditingEvent] = useState<typeof events[0] | null>(null);

//   const openEditModal = (event: typeof events[0]) => setEditingEvent(event);
//   const closeEditModal = () => setEditingEvent(null);

//   // Determine current status
//   const rawStatus = typeof params.status === "string" ? params.status : "PENDING";

//   const status: EventStatus =
//     ["PENDING", "APPROVED", "REJECTED"].includes(rawStatus)
//       ? (rawStatus as EventStatus)
//       : EventStatus.PENDING;

//   // Fetch events from Prisma
//   const events = await prisma.event.findMany({
//     where: { status },
//     orderBy: { date: "asc" },
//   });

//   // Map string to enum
//   const statusMap: Record<string, EventStatus> = {
//     PENDING: EventStatus.PENDING,
//     APPROVED: EventStatus.APPROVED,
//     REJECTED: EventStatus.REJECTED,
//   };

//   return (
//     <main className="p-8 max-w-3xl mx-auto space-y-8">
//       <h1 className="text-3xl font-bold">Admin Dashboard</h1>

//       {/* Status buttons as GET form */}
//       <form method="get" className="flex space-x-2 mb-4">
//         {["PENDING", "APPROVED", "REJECTED"].map((s) => (
//           <button
//             key={s}
//             type="submit"
//             name="status"
//             value={s}
//             className={`px-4 py-2 rounded ${
//               status === statusMap[s] ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//           >
//             {s.charAt(0) + s.slice(1).toLowerCase()}
//           </button>
//         ))}
//       </form>

//       {/* Event list */}
//       <DashboardEventList
//         events={events}
//         heading={`Events: ${status.charAt(0) + status.slice(1).toLowerCase()}`}
//         approveAction={approveEvent}
//         rejectAction={rejectEvent}
//         openEditModal={openEditModal}
//       />
//        {/* Modal */}
//       {editingEvent && (
//         <EditEventModal event={editingEvent} onClose={closeEditModal} />
//       )}
//     </main>
//   );
// }


// app/admin/dashboard/page.tsx
import { prisma } from "@/src/lib/prisma";
import { EventStatus } from "@prisma/client";
import DashboardEventListWithModal from "@/src/components/ui/DashboardEventListWithModal";
import SubmitEventForm from "@/src/components/ui/SubmitEventForm";
import { submitEvent } from "./server-actions";

interface AdminDashboardProps {
  searchParams?: Record<string, string> | Promise<Record<string, string>>;
}

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
    where: { status },
    orderBy: { date: "asc" },
  });

  return (
    <div>
    <DashboardEventListWithModal events={events} statusFilter={status} />
    <SubmitEventForm serverAction={submitEvent} />
    </div>
  );
}
