'use client'
import { useState } from "react";
import { rejectEvent } from "@/app/admin/dashboard/server-actions";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  eventId: number;
  participantEmail: string;
  participantName: string;
}

export default function AdminContactModal({
  isOpen,
  onClose,
  eventId,
  participantEmail,
  participantName,
}: Props) {

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const sendEmail = async () => {
    setLoading(true);

    await fetch("/api/reject-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: participantEmail,
        subject,
        message,
        eventId,
      }),
    });

    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white w-[90%] max-w-lg rounded-xl shadow-2xl p-6 space-y-4">

        <h2 className="font-quicksand text-2xl font-bold text-brand-pink">
          Contact "{participantName}"
        </h2>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border-1 text-brand-base border-brand-base rounded-md p-2 font-quicksand"
        />

        <textarea
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="w-full border-1 border-brand-base text-brand-base rounded-md p-2 font-quicksand"
        />

        <div className="flex justify-between gap-3 pt-4 font-quicksand">

          {/* Reject Immediately */}
          <form action={rejectEvent}>
            <input type="hidden" name="id" value={eventId} />
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Reject without contact
            </button>
          </form>

          {/* Send Email */}
          <button
            onClick={sendEmail}
            disabled={!subject || !message || loading}
            className="px-4 py-2 bg-brand-pink text-white rounded-md hover:text-brand-pop hover:bg-white duration-[400ms] rounded-lg md:rounded-l-lg border-2 border-pink-600"
          >
            {loading ? "Sending..." : "Send Email"}
          </button>

        </div>

        <div className="text-center pt-3">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 underline border-1 border-brand-base/30 rounded-md px-4 py-2 font-quicksand hover:bg-brand-base/70 hover:text-white"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
