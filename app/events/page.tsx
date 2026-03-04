import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getEvents } from "@/lib/kv";
import { EventsContent } from "./EventsContent";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const allEvents = await getEvents();
  const today = new Date().toISOString().split("T")[0];
  const upcomingEvents = allEvents
    .filter((e) => (e.dateISO ? e.dateISO >= today : !e.isPast))
    .sort((a, b) => {
      if (a.dateISO && b.dateISO) return a.dateISO.localeCompare(b.dateISO);
      if (a.dateISO) return -1;
      if (b.dateISO) return 1;
      return 0;
    });
  const pastEvents = allEvents.filter((e) => e.isPast);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <EventsContent upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
      <Footer />
    </div>
  );
}
