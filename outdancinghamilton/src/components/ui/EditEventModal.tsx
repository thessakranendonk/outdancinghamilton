"use client";
import { Event, EventStatus } from "@prisma/client";

interface EditEventModalProps {
  event: Event;
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>; // make onSave async
  isSaving: boolean;
}

export default function EditEventModal({ event, onClose, onSave, isSaving }: EditEventModalProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Wait for the server action to finish
    await onSave(formData);

    // Close modal after save
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="id" value={event.id} />

          <div>
            <label className="block font-medium">Event Name</label>
            <input name="eventName" defaultValue={event.eventName} className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea name="description" defaultValue={event.description} className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block font-medium">Location</label>
            <input name="location" defaultValue={event.location} className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block font-medium">Date</label>
            <input
              type="datetime-local"
              name="date"
              defaultValue={new Date(event.date).toISOString().slice(0, 16)}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Price</label>
            <input name="price" defaultValue={event.price} className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block font-medium">Status</label>
            <select name="status" defaultValue={event.status} className="w-full border rounded p-2">
              {Object.values(EventStatus).map((s) => (
                <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
