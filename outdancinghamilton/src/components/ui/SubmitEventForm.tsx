"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type AddEventFormProps = {
  serverAction: (data: FormData) => Promise<void>;
};

export default function AddEventForm({ serverAction }: AddEventFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);

 async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const form = e.currentTarget; // ← store reference immediately
  const formData = new FormData(form);
  if (file) formData.set("image", file);

  startTransition(async () => {
    await serverAction(formData);
    router.refresh(); // refresh Pending Events
    form.reset(); // ← safe, we stored the reference
    setFile(null);
  });
}

  return (
    <form onSubmit={handleSubmit} className="space-y-2" encType="multipart/form-data">
      <input name="eventName" placeholder="Event Name" className="border p-2 w-full rounded" required />
      <textarea name="description" placeholder="Event Description" className="border p-2 w-full rounded" required />
      <input name="location" placeholder="Event Location" className="border p-2 w-full rounded" required />
      <label>Event Date</label>
      <input type="date" name="date" className="border p-2 w-full rounded" required />
      <input type="email" name="email" placeholder="Email" className="border p-2 w-full rounded" required />
      <input name="age" className="border p-2 w-full rounded" placeholder="List any age requirements" required />
      <input name="price"  className="border p-2 w-full rounded" placeholder="Ticket Price if applicable" required />

      <input
        type="file"
        accept="image/*"
        className="border p-2 w-full rounded"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={isPending}
      >
        {isPending ? "Adding..." : "Add Event"}
      </button>
    </form>
  );
}
