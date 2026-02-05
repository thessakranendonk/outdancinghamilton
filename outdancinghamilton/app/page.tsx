
import Hero from "@/src/components/layout/Hero";
import AnimateOnScroll from "@/src/components/ui/animations/AnimateOnScroll";
import DashboardEventList from "@/src/components/ui/DashboardEventList";
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
    <div className="flex flex-col min-h-screen font-sans mt-14">

      <Hero />

      {/* Events */}
      <div className="lg:w-5xl flex flex-col mx-auto justify-center bg-white mt-35">

    </div>
    <div id="upcoming-events">
      <DashboardEventList events={events} heading="Upcoming Events" />
    </div>

    </div>
  );
}

