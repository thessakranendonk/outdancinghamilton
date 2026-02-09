"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import DocUpload from "./DocUpload";
import Link from "next/link";
import { event } from "@prisma/client";

// type SubmitEventFormProps = {
//   serverAction: (data: FormData) => Promise<void>;
// };

type SubmitEventFormProps = {
  serverAction: (data: FormData) => Promise<{
    id: number;
    eventName: string;
    description: string;
    location: string;
    date: Date;
    startTime: string | null;
    endTime: string | null;
    price: string;
    age: string;
    createdAt: Date;
    imgUrl: string | null;
    ticketLink: string | null;
    eventLink: string | null;
    status: string;
  } | any>;
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

  const today = new Date().toISOString().split("T")[0];

const [date, setDate] = useState(today);
const [startTime, setStartTime] = useState("18:00");
const [endTime, setEndTime] = useState("21:00");

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

    const startDateTime = `${date}T${startTime}`;
    formData.set("date", startDateTime);

    startTransition(async () => {
      await serverAction(formData); // send all form data + Cloudinary URL
      router.refresh(); // refresh events
      form.reset(); // reset inputs
      setFile(null);
      setShowSuccess(true); // show modal
    });
  }

  
  // const formClass="border border-brand-base/50 text-brand-base/80 p-2 w-full rounded"

  const formClass =
  "border border-brand-base/50 text-brand-base/80 px-3 py-2 w-full rounded-md " +
  "focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/30 focus:outline-none";


  return (
    <>
    <form
  onSubmit={handleSubmit}
  encType="multipart/form-data"
  className="space-y-5 text-brand-base"
>
  {/* EVENT DETAILS */}
  <section className="space-y-2">
    <h3 className="text-lg font-bold text-brand-base">Event Details</h3>

    <div className="space-y-2">
      <div>
        <label className="block text-sm mb-1">Event Name</label>
        <input name="eventName" className={formClass} required />
      </div>

      <div>
        <label className="block text-sm mb-1">Event Description</label>
        <textarea
          name="description"
          className={`${formClass} min-h-[96px]`}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Event Location</label>
        <input name="location" className={formClass} required />
      </div>
    </div>

    {/* DATE & TIME */}
    <div className="space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-1">Event Date</label>
          <input
            type="date"
            name="date"
            onChange={(e) => setDate(e.target.value)}
            className={formClass}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Start Time</label>
          <input
            type="time"
            name="startTime"
            onChange={(e) => setStartTime(e.target.value)}
            className={formClass}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">End Time</label>
          <input
            type="time"
            name="endTime"
            onChange={(e) => setEndTime(e.target.value)}
            className={formClass}
            required
          />
        </div>
      </div>
    </div>
    <div className="space-y-2">

      <div>
        <label className="block text-sm mb-1">Age Requirement</label>
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
      </div>

      <div>
        <label className="block text-sm mb-1">Price ($) - or enter Free</label>
        <input name="price" className={formClass} required />
      </div>
    </div>
  </section>

  {/* LINKS & MEDIA */}
  <section className="space-y-2">
    <h3 className="text-lg font-bold text-brand-base">Links & Media</h3>

    <div className="space-y-2">
      <input
        name="ticketLink"
        placeholder="Ticketlink (Optional)"
        className={formClass}
      />

      <input
        name="eventLink"
        placeholder="Website or social media (Optional)"
        className={formClass}
      />

<div>
        <label className="block text-sm mb-1">Email (Internal Use Only)</label>
        <input type="email" name="email" className={formClass} required />
      </div>
      <DocUpload
        id="imgUrl"
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        content={file ? "File uploaded ✔" : "Upload a file"}
        label="Please upload event poster or photo"
        description="Jpg, png, up to 8MB"
      />

      {file && (
        <p className="text-sm text-green-700">
          ✅ {file.name} uploaded
        </p>
      )}
    </div>
  </section>

  {/* SUBMIT */}
  <button
    type="submit"
    disabled={isPending}
    className="w-full bg-brand-pop text-white py-3 rounded-md border-2 border-pink-600 hover:bg-brand-highlight/80 transition"
  >
    {isPending ? "Submitting..." : "Submit Event"}
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
        className="bg-brand-pop text-white px-4 py-2 rounded-lg hover:bg-brand-highlight/70 border-2 border-pink-600 mr-3"
      >
        Submit More
      </button>
       <Link
       href="/"
        onClick={() => setShowSuccess(false)}
        className="bg-brand-pink  text-white px-4 py-3 rounded-lg hover:bg-brand-pink/70 border-2 border-pink-900"
      >
        Homepage
      </Link>
    </div>
  </div>
)}
</>
  );
}
