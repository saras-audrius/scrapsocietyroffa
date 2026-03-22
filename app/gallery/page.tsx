import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getEvents } from "@/lib/kv";
import { GalleryContent } from "./GalleryContent";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const allEvents = await getEvents();
  const pastEventsWithPhotos = allEvents.filter((e) => e.isPast && e.images.length > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <GalleryContent events={pastEventsWithPhotos} />
      <Footer />
    </div>
  );
}
