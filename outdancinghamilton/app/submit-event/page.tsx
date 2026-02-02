import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

async function submitEvent(data: FormData) {
  "use server";

    const eventName = data.get("eventName")?.toString();
    const location = data.get("location")?.toString();
    const price = data.get("price")?.toString();
    const age = data.get("age")?.toString();
    const email = data.get("email")?.toString();
    const createdAt = new Date();
    const description = data.get("description")?.toString();
    const dateStr = data.get("date")?.toString();
  if ( !eventName || !location || !price || !age || !email || !description || !dateStr) return;

  const date = new Date(dateStr);

  await prisma.event.create({
    data: {
        eventName,      
        location,        
        price ,      
        age,   
        email,   
        createdAt,
        description,
        date,
        approved: false, // unapproved by default
    },
  });

  redirect("/")
}

export default async function SubmitEvent() {
  // Fetch only approved events
  const events = await prisma.event.findMany({
    where: { approved: true },
    orderBy: { date: "asc" },
  });

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Community Events</h1>

      <form action={submitEvent} className="mb-8 space-y-2">
        <input
          name="title"
          placeholder="Event Title"
          className="border p-2 w-full rounded"
        />
        <textarea
          name="description"
          placeholder="Event Description"
          className="border p-2 w-full rounded"
        />
        <input
          type="date"
          name="date"
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Event
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Approved Events</h2>
      <ul className="space-y-4">
        {events.length === 0 && <li>No events approved yet.</li>}
        {events.map((event) => (
          <li key={event.id} className="border p-4 rounded shadow-sm">
            <h3 className="text-xl font-bold">{event.eventName}</h3>
            <p>{event.description}</p>
            <p className="text-gray-500 text-sm">
              {event.date.toDateString()}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
