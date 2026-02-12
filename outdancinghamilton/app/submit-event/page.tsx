import SubmitEventForm from "@/src/components/ui/SubmitEventForm"; // your client component
import { submitEvent, submitEventWithEmail } from "../admin/dashboard/server-actions";




export default function SubmitEvent() {
  return (
    <main className="md:flex p-8 max-w-6xl mx-auto mt-20 gap-10">
      <div className="flex-0.5 mx-auto bg-white/90 rounded-lg p-10">
            <h2 className="text-3xl md:text-5xl text-brand-pink font-[Bungee] text-center mb-5 md:mb-10">Submit Your Event</h2>
          <a href="/submit-event#event-criteria" className="md:hidden block text-brand-pink text-sm text-center font-medium font-quicksand pb-5">See our Event Criteria <u> below</u>.</a>
          <SubmitEventForm serverAction={submitEventWithEmail} /> 
          </div>
          <div className="flex-1 px-5 md:pl-10">
            <h3 id="event-criteria" className="text-3xl font-bungee text-brand-pink my-10">Event Criteria</h3>
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

