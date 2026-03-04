import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getEvents } from "@/lib/kv";
import { EventsContent } from "./EventsContent";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const allEvents = await getEvents();
  const upcomingEvents = allEvents.filter((e) => !e.isPast);
  const pastEvents = allEvents.filter((e) => e.isPast);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <EventsContent upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
      <Footer />
    </div>
  );
}
