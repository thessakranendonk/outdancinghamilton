"use client";
import { useState, useTransition } from "react";
import DashboardEventList from "./DashboardEventList";
import EditEventModal from "./EditEventModal";
import { Event } from "@prisma/client";
import { EventStatus } from "@prisma/client";
import { approveEvent, rejectEvent, updateEvent } from "@/app/admin/dashboard/server-actions";

interface Props {
  events: Event[];
  statusFilter: EventStatus;
}

export default function DashboardEventListWithModal({ events, statusFilter }: Props) {
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isPending, startTransition] = useTransition();

  const openEditModal = (event: Event) => setEditingEvent(event);
  const closeEditModal = () => setEditingEvent(null);

  const handleUpdateEvent = async (formData: FormData) => {
    startTransition(async () => {
      await updateEvent(formData);
      closeEditModal(); // automatically close modal after save
    });
  };

  return (
    <>
      {/* Status Filter Form */}
      <form method="get" className="flex space-x-2 mb-4">
        {["PENDING", "APPROVED", "REJECTED"].map((s) => (
          <button
            key={s}
            type="submit"
            name="status"
            value={s}
            className={`px-4 py-2 rounded ${
              statusFilter === s ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </form>

      {/* Event List */}
      <DashboardEventList
        events={events}
        heading={`Events: ${statusFilter.charAt(0) + statusFilter.slice(1).toLowerCase()}`}
        approveAction={approveEvent}
        rejectAction={rejectEvent}
        openEditModal={openEditModal}
      />

      {/* Edit Modal */}
      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          onClose={closeEditModal}
          onSave={handleUpdateEvent}
          isSaving={isPending}
        />
      )}
    </>
  );
}
