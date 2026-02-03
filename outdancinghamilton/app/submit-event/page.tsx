import SubmitEventForm from "@/src/components/ui/SubmitEventForm"; // your client component
import { submitEvent } from "../admin/dashboard/server-actions";




export default function SubmitEvent() {
  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Submit a Community Event</h1>

      {/* Pass server action to client component */}
      <SubmitEventForm serverAction={submitEvent} />
    </main>
  );
}

