// app/components/ui/DashboardEventList.tsx
import { Event } from "@prisma/client";

export interface DashboardEventListProps {
  events: Event[];
  heading: string;
  approveAction?: (data: FormData) => Promise<void>;
  rejectAction?: (data: FormData) => Promise<void>;
  openEditModal: (event: Event) => void;
}

export default function DashboardEventList({
  events,
  heading,
  approveAction,
  rejectAction,
  openEditModal
}: DashboardEventListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{heading}</h2>
      {events.length === 0 && <p>No events.</p>}
      <ul className="space-y-2">
        {events.map((event) => (
          <li key={event.id} className="border p-2 rounded flex justify-between items-center">
            <div>
              <p className="font-bold">{event.eventName}</p>
              <p className="text-sm">{event.location}</p>
              <p className="text-sm">{event.description}</p>
              <p className="text-gray-500 text-sm">{event.date.toDateString()}</p>
            </div>
            <div className="flex gap-2">
              {approveAction && (
                <form action={approveAction}>
                  <input type="hidden" name="id" value={event.id} />
                  <button className="bg-green-500 text-white px-3 py-1 rounded">
                    Approve
                  </button>
                </form>
              )}
              {rejectAction && (
                <form action={rejectAction}>
                  <input type="hidden" name="id" value={event.id} />
                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Reject
                  </button>
                </form>
              )}
              {/* Edit Button */}
          <button
            onClick={() => openEditModal(event)}
              className="px-2 py-1 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
