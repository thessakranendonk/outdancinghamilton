import Hero from "@/src/components/layout/Hero";
import { prisma } from "@/src/lib/prisma";
import Divider from "@/src/components/ui/svgs/Divider";
import EventCard from "@/src/components/ui/EventCard";
import EventFilter from "@/src/components/ui/EventFilter";
import { event_status } from "@prisma/client";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{
    from?: string;
    to?: string;
  }>;
};

// Format a Date to YYYY-MM-DD
function formatDate(date: Date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Check if event is in the optional from/to range
function isEventInRange(eventDate: Date, from?: string, to?: string) {
  const day = formatDate(eventDate);
  if (from && day < from) return false;
  if (to && day > to) return false;
  return true;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const from = params.from;
  const to = params.to;

  // Fetch approved events directly from Prisma
  const events = await prisma.event.findMany({
    where: { status: event_status.APPROVED },
    orderBy: { date: "asc" },
  });

  // Apply from/to filtering if provided
  const filteredEvents = events.filter(event => isEventInRange(event.date, from, to));

  return (
    <div className="flex flex-col min-h-screen font-sans mt-14">
      <Hero />
      <Divider />

      <div id="upcoming-events" className="mb-10 md:mb-20">
        <EventFilter from={from} to={to} />
        <EventCard events={filteredEvents} heading="Upcoming Events" />
      </div>
    </div>
  );
}
