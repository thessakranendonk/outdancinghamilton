import SubmitEventForm from "@/src/components/ui/SubmitEventForm"; // your client component
import { submitEvent } from "../admin/dashboard/server-actions";




export default function SubmitEvent() {
  return (
    <main className="p-8 max-w-2xl mx-auto mt-20">
      <div className="max-w-3xl mx-auto bg-white/90 rounded-lg p-10">
            <h2 className="text-5xl text-brand-pink font-[Bungee] text-center mb-10">Submit Your Event</h2>
          <SubmitEventForm serverAction={submitEvent} />
          </div>
    </main>
  );
}

