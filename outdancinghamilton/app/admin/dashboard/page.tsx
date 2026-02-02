import { prisma } from "@/src/lib/prisma";
import SubmitEventForm from "@/src/components/ui/SubmitEventForm"
import fs from "fs";
import path from "path";

async function approveEvent(data: FormData) {
  "use server";
  const idStr = data.get("id")?.toString();
  if (!idStr) return;
  const id = parseInt(idStr, 10);
  if (isNaN(id)) return;

  await prisma.event.update({
    where: { id },
    data: { approved: true },
  });
}

async function addEvent(data: FormData) {
  "use server";

   const eventName = data.get("eventName")?.toString();
    const location = data.get("location")?.toString();
    const price = data.get("price")?.toString();
    const age = data.get("age")?.toString();
    const email = data.get("email")?.toString();
    const createdAt = new Date();
  const description = data.get("description")?.toString();
  const dateStr = data.get("date")?.toString();
  const imgFile = data.get("image") as File;

  if ( !eventName || !location || !price || !age || !email || !description || !dateStr) return;

  const date = new Date(dateStr);

  let imgUrl: string | null = null;

  if (imgFile && imgFile.size > 0) {
    // save to /public/uploads
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

    const filePath = path.join(uploadsDir, imgFile.name);
    const buffer = Buffer.from(await imgFile.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    imgUrl = `/uploads/${imgFile.name}`;
  }

  await prisma.event.create({
    data: {
        eventName,      
        location,        
        price,      
        age,      
        createdAt,
        description,
        email,
        date,
        approved: false,
        imgUrl: imgUrl || null,
    },
  });

}


export default async function AdminDashboard() {
  const pendingEvents = await prisma.event.findMany({
    where: { approved: false },
    orderBy: { date: "asc" },
  });

  return (
    <main className="p-8 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Section 1: Approve pending events */}
      <section className="border p-4 rounded space-y-4">
        <h2 className="text-xl font-semibold mb-2">Pending Events</h2>
        {pendingEvents.length === 0 && <p>No pending events.</p>}
        <ul className="space-y-2">
          {pendingEvents.map((event) => (
            <li
              key={event.id}
              className="border p-2 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{event.eventName}</p>
                <p className="text-sm">{event.location}</p>
                <p className="text-sm">{event.description}</p>
                <p className="text-gray-500 text-sm">{event.date.toDateString()}</p>
              </div>
              <form action={approveEvent}>
                <input type="hidden" name="id" value={event.id} />
                <button className="bg-green-500 text-white px-3 py-1 rounded">
                  Approve
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 2: Manually add new event */}
      <section className="border p-4 rounded space-y-4">
        <h2 className="text-xl font-semibold">Add New Event</h2>
        <SubmitEventForm serverAction={addEvent} />
      </section>
     
    </main>
  );
}