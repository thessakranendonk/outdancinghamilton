"use client";
import { useState, useTransition } from "react";
import EditEventModal from "./EditEventModal";

import { approveEvent, deleteEvent, rejectEvent, updateEvent } from "@/app/admin/dashboard/server-actions";
import DeleteModal from "./DeleteModal";
import EventCard from "./EventCard";
import { event_status, event } from "@prisma/client";

interface Props {
  events: event[];
  statusFilter: event_status;
}

export default function DashboardEventListWithModal({ events, statusFilter }: Props) {
  const [editingEvent, setEditingEvent] = useState<event | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<event | null>(null);

  const [isPending, startTransition] = useTransition();

  const openEditModal = (event: event) => setEditingEvent(event);
  const closeEditModal = () => setEditingEvent(null);

  const openDeleteModal = (event: event) => setDeletingEvent(event);
  const closeDeleteModal = () => setDeletingEvent(null);

  const handleUpdateEvent = async (formData: FormData) => {
    startTransition(async () => {
      await updateEvent(formData);
      closeEditModal(); // automatically close modal after save
    });
  };

  return (
    <>
      {/* Status Filter Form */}
      <form method="get" className="flex space-x-2 justify-end mb-4 mr-5">
        {["PENDING", "APPROVED", "REJECTED"].map((s) => (
          <button
            key={s}
            type="submit"
            name="status"
            value={s}
            className={`px-4 py-2 rounded ${
              statusFilter === s ? "bg-brand-pop text-white" : "bg-brand-darkest border-1 border-brand-pop"
            }`}
          >
            {s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </form>

      {/* Event List */}
      {events.length  ? (
        <>
      <EventCard
        events={events}
        heading={`${statusFilter.charAt(0) + statusFilter.slice(1).toLowerCase()} Events`}
        approveAction={approveEvent}
        rejectAction={rejectEvent}
        deleteAction={deleteEvent}
        openEditModal={openEditModal}
        openPopupModal={openDeleteModal}
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

       {/* Delete Modal */}
      {deletingEvent && (
        <DeleteModal
          event={deletingEvent}
          eventAction={deleteEvent}
          onClose={closeDeleteModal}
          message={`Are you sure you want to delete `}
          eventActionButtonLabel="Delete"
        />
      )}
      </>
    ):( 
       <p className="text-center text-xl font-quicksand mt-10">
    No {statusFilter.charAt(0) + statusFilter.slice(1).toLowerCase()} Events
    {statusFilter === "PENDING" ? "" : "" }
  </p>
      )}
    </>
  );
}
