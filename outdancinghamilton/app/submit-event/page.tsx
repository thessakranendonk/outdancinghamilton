import SubmitEventForm from "@/src/components/ui/SubmitEventForm"; // your client component
import { submitEvent, submitEventWithEmail } from "../admin/dashboard/server-actions";




export default function SubmitEvent() {
  return (
    <main className="flex p-8 max-w-6xl mx-auto mt-20 gap-10">
      <div className="flex-0.5 mx-auto bg-white/90 rounded-lg p-10">
            <h2 className="text-5xl text-brand-pink font-[Bungee] text-center mb-10">Submit Your Event</h2>
          <SubmitEventForm serverAction={submitEventWithEmail} /> 
          </div>
          <div className="flex-1 pl-10">
            <h3 className="text-3xl font-bungee text-brand-pink my-10">Event Criteria</h3>
            <ul className="list-disc space-y-3 font-quicksand">
                <li><strong>In Hamilton, Ontario</strong></li>
                <li><strong>About dancing</strong> — not performances or classes. A short lesson is fine, but dancing is the main event.</li>
                <li><strong>Actually danceable</strong> — a real dance floor, space to move, and music meant for dancing. People should be dancing (not just vibing, moshing, or watching a band).</li>
                <li><strong>Inclusive and welcoming</strong> — no dress codes. Open to adults of all ages (19+ is fine if stated) or all-ages, with everyone treated like they belong.</li>
                <li><strong>Family-friendly in spirit</strong> — safe venues, respectful vibes, and nothing that would make most parents clutch their pearls.</li>
              </ul>
          </div>
    </main>
  );
}

