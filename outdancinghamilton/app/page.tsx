
import Hero from "@/src/components/layout/Hero";
import DashboardEventList from "@/src/components/ui/DashboardEventList";
import { EventStatus, prisma } from "@/src/lib/prisma"
import { deletePastEvents } from "./admin/dashboard/server-actions";
import Divider from "@/src/components/ui/svgs/Divider";
import EventCard from "@/src/components/ui/EventCard";

const startOfToday = new Date()
startOfToday.setHours(0, 0, 0, 0)

export default async function Home() {
 await deletePastEvents();

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
    <Divider />
    <div id="upcoming-events">
      {/* <DashboardEventList events={events} heading="Upcoming Events" /> */}
    <EventCard events={events} heading="Upcoming Events"/>
    </div>

    </div>
  );
}

