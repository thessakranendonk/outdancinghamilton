"use client";
import { Event } from "@prisma/client";

interface DeleteModalProps {
  event: Event;
  message: string,
  onClose: () => void;
  eventAction?: (formData: FormData) => Promise<void>;
  eventActionButtonLabel?: string
}

export default function DeleteModal({ event, message, onClose, eventAction, eventActionButtonLabel }: DeleteModalProps) {
    const handleAction = async () => {
    if (!eventAction) return;
    const formData = new FormData();
    formData.append("id", event.id.toString());
    await eventAction(formData);
    onClose(); // close modal after action completes
  };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded w-full max-w-xl">
                <h2 className="text-xl text-brand-base font-semibold mb-4">{message}{`"${event.eventName}"?`}</h2>
                <div className="space-y-4">
                  <input type="hidden" name="id" value={event.id} />
        
                  <div className="flex justify-end space-x-2 mt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 rounded">Cancel</button>
                  {eventAction && (
              <button
                type="button"
                onClick={handleAction}
                className="bg-error text-white px-3 py-1 rounded"
              >
                {eventActionButtonLabel}
              </button>
            )}
                  
                
                  </div>
                </div>
              </div>
            </div>
    )
}