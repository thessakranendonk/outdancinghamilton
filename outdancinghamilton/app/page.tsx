import { EventStatus, prisma } from "@/src/lib/prisma"

const startOfToday = new Date()
startOfToday.setHours(0, 0, 0, 0)

export default async function Home() {
  const events = await prisma.event.findMany({
    where: { status: EventStatus.APPROVED, 
      date: {
        gte: startOfToday,
      }  },
    orderBy: { date: "asc" },
  });


  return (
    <div className="flex flex-col min-h-screen font-sans">

      {/* Left side */}
<div className="flex flex-row">
 <div className="flex-1 relative p-12 flex flex-col">

  <div
  aria-hidden="true"
  className="pointer-events-none absolute left-0 top-0 h-1/2 w-12 z-10"
  style={{
    background:
      `linear-gradient(45deg, #ed5818 25%, transparent 25%), ` +
      `linear-gradient(-45deg, #ed5818 25%, transparent 25%), ` +
      `linear-gradient(45deg, transparent 75%, #ed5818 75%), ` +
      `linear-gradient(-45deg, transparent 75%, #ed5818 75%)`,
    backgroundSize: "48px 48px",
    backgroundPosition: "0 0, 0 24px, 24px -24px, -24px 0",
    backgroundRepeat: "repeat",
  }}
/>

        {/* Top */}
        <div className="pl-10">
          {/* Left side */}
        <h1 className="text-6xl font-medium mb-6 tracking-tight leading-tight max-w-lg font-monoton mt-20">
          Out Dancing <br />
          <span className="text-pink-400">Hamilton</span>
        </h1>
        <p className="max-w-md mb-10 text-gray-300 leading-relaxed">
          <b>Out Dancing Hamilton</b> brings together Hamilton’s dance community, celebrating movement, connection, and fun. Dancing keeps you healthy, lifts your mood, and builds the sense of community we all crave.
        </p>

        <div className="flex space-x-6 mt-auto text-gray-400 text-xl opacity-70">
          <a href="#" aria-label="Instagram" className="hover:text-white transition">In</a>
        </div>   
        </div>     
      </div>

      {/* Right side */}
      
      <div className="flex-1 bg-orange-400 relative pl-40 p-12 overflow-hidden">

        <div className="absolute top-10 left-14 bg-yellow-400 px-4 py-2 rounded-lg shadow-md rotate-350 text-3xl  font-semibold text-red-700 select-none">
          Upcoming Events
          <br />
          <span className="text-red-500 text-sm italic"></span>
        </div>

       </div>

      </div>

      {/* Events */}
      <div className="lg:w-5xl flex flex-col mx-auto justify-center bg-white mt-35">
        <h1 className="w-full text-5xl text-black font-bold mb-6 bg-brand-base text-orange-400 text-center font-[Bungee] pb-20">Upcoming Events</h1>

      <ul className="w-full space-y-4">
        {events.length === 0 && <li>No events yet.</li>}
        {events.map((event) => (
          <li key={event.id} className="border p-4 rounded shadow-sm">
            {/* <div
            className={clsx("w-[300px] h-54 bg-cover bg-center")}
            style={{ backgroundImage: `url(${event.imgUrl})` }}
            /> */}

            <h3 className="text-xl font-bold">{event.eventName}</h3>
            <p>{event.description}</p>
            <p className="text-gray-500 text-sm">{event.date.toDateString()}</p>
            {event.imgUrl && (
              <img
                src={event.imgUrl}
                alt={event.eventName}
                className="w-65 h-120 object-cover rounded w-full"
                />
            )}
          </li>
        ))}
      </ul>
      </div>

    </div>
  );
}

