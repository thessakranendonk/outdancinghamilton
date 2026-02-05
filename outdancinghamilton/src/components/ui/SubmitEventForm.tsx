"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import DocUpload from "./DocUpload";

type SubmitEventFormProps = {
  serverAction: (data: FormData) => Promise<void>;
};

export function toDatetimeLocal(date: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

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

  
  const formClass="border border-brand-base/50 text-brand-base/80 p-2 w-full rounded"


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
        className={formClass}
        required
      />
      <textarea
        name="description"
        placeholder="Event Description"
        className={formClass}
        required
      />
      <input
        name="location"
        placeholder="Event Location"
        className={formClass}
        required
      />
      <label className="text-sm text-brand-base/50">Event Date</label>
      <input type="datetime-local" name="date" className={formClass} required />
      <input
        type="datetime-local"
        name="date"
        defaultValue={toDatetimeLocal(new Date())}
        className={formClass}
      />




      <input
        type="email"
        name="email"
        placeholder="Email"
        className={formClass}
        required
      />

   <select
  name="age"
  className={formClass}
  required
  defaultValue=""
>
  <option value="" disabled>
    Select age requirement
  </option>
  <option value="All ages">All ages</option>
  <option value="19+ only">19+ only</option>
</select>


      <input
        name="price"
        className={formClass}
        placeholder="$"
        required
      />
<label className="text-sm text-brand-base/50">{`Event Links (Optional)`}</label>
      <input
        name="ticketLink"
        placeholder="If your event is ticketed, enter the link here."
        className={formClass}
        />

      <input
        name="eventLink"
        placeholder="If your event has a website or social media, enter the link here"
        className={formClass}
        />

  <DocUpload id={"imgUrl"} type={"file"} onChange={(e) => setFile(e.target.files?.[0] || null)} content={"Upload a file"} label={"Please upload event poster or photo"} description={"Jpg, png, up to 8MB"} />


      <button
        type="submit"
        className="bg-brand-pop text-white px-4 py-2 rounded"
        disabled={isPending}
      >
        {isPending ? "Adding..." : "Add Event"}
      </button>
    </form>

    {/* SUCCESS MODAL */}
    {showSuccess && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
      <h2 className="text-2xl font-bold mb-2 text-brand-pink font-[Bungee]">
        Event Submitted
      </h2>
      <p className="text-gray-600 mb-4">
        Thank you, your event has been submitted and is pending approval.
      </p>

      <button
        onClick={() => setShowSuccess(false)}
        className="bg-brand-pop text-white px-4 py-2 rounded hover:bg-brand-base/70"
      >
        Close
      </button>
    </div>
  </div>
)}
</>
  );
}
