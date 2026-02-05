"use client";
import { Event, EventStatus } from "@prisma/client";

interface EditEventModalProps {
  event: Event;
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>; 
  isSaving: boolean;
}

const borderClass="w-full text-sm border rounded p-2 border-brand-base/30"

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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
     <div className="bg-white p-6 rounded w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-4xl text-center text-brand-pop font-[Bungee] font-bold mb-4">Update Event</h2>
        <form onSubmit={handleSubmit} className="space-y-2 text-brand-base">
          <input type="hidden" name="id" value={event.id} />

          <div>
            <label className="block font-medium">Event Name</label>
            <input name="eventName" defaultValue={event.eventName} className={borderClass} />
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea name="description" defaultValue={event.description} className={borderClass} />
          </div>

          <div>
            <label className="block font-medium">Location</label>
            <input name="location" defaultValue={event.location} className={borderClass} />
          </div>

          <div>
            <label className="block font-medium">Date</label>
            <input
              type="datetime-local"
              name="date"
              defaultValue={new Date(event.date).toISOString().slice(0, 16)}
              className={borderClass} 
            />
          </div>

                <select
  name="age"
  className={borderClass}
  required
  defaultValue=""
>
  <option value="" disabled>
    Select age requirement
  </option>
  <option value="all">All ages</option>
  <option value="18+">19+ only</option>
</select>


      <input
        name="price"
        className={borderClass}
        placeholder="$"
        defaultValue={event.price}
        required
      />
<label className="text-sm text-brand-base/50">{`Event Links (Optional)`}</label>
      <input
        name="ticketLink"
        placeholder="If your event is ticketed, enter the link here."
        className={borderClass}
        defaultValue={event.ticketLink ?? ""}
        />

      <input
        name="eventLink"
        placeholder="If your event has a website or social media, enter the link here"
        className={borderClass}
        defaultValue={event.eventLink ?? ""}
        />

          <div>
            <label className="block font-medium">Status</label>
            <select name="status" defaultValue={event.status} className={borderClass} >
              {Object.values(EventStatus).map((s) => (
                <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-brand-base/80 text-white rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-brand-pop text-white rounded" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
