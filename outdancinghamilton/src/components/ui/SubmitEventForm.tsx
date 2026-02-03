"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type SubmitEventFormProps = {
  serverAction: (data: FormData) => Promise<void>;
};

export default function SubmitEventForm({ serverAction }: SubmitEventFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (file) {
      // Upload image to Cloudinary
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("upload_preset", "outdancinghamilton");

      const res = await fetch(
  `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
  {
    method: "POST",
    body: uploadData,
  }
);


      const result = await res.json();
      console.log("cloudinary:", result)
      const imgUrl = result.secure_url;

      // Cloudinary URL to formData for the server action
      formData.set("imgUrl", imgUrl);
    }

    startTransition(async () => {
      await serverAction(formData); // send all form data + Cloudinary URL
      router.refresh(); // refresh events
      form.reset(); // reset inputs
      setFile(null);
      setShowSuccess(true); // show modal
    });
  }

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="space-y-2"
      encType="multipart/form-data"
    >
      <input
        name="eventName"
        placeholder="Event Name"
        className="border p-2 w-full rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Event Description"
        className="border p-2 w-full rounded"
        required
      />
      <input
        name="location"
        placeholder="Event Location"
        className="border p-2 w-full rounded"
        required
      />
      <label>Event Date</label>
      <input type="date" name="date" className="border p-2 w-full rounded" required />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border p-2 w-full rounded"
        required
      />
      <input
        name="age"
        className="border p-2 w-full rounded"
        placeholder="List any age requirements"
        required
      />
      <input
        name="price"
        className="border p-2 w-full rounded"
        placeholder="Ticket Price if applicable"
        required
      />

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

    {/* SUCCESS MODAL */}
    {showSuccess && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-pink-200 rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
      <h2 className="text-2xl font-bold mb-2 text-orange-600 font-[Bungee]">
        Event Submitted
      </h2>
      <p className="text-gray-600 mb-4">
        Thank you, your event has been submitted and is pending approval.
      </p>

      <button
        onClick={() => setShowSuccess(false)}
        className="bg-brand-base text-white px-4 py-2 rounded hover:bg-brand-base/70"
      >
        Close
      </button>
    </div>
  </div>
)}
</>
  );
}
