import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { getEvents } from "@/lib/kv";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

const ROTATIONS = [-2, 3, -1, 2];

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const events = await getEvents();
  const event = events.find((e) => e.id === id);

  if (!event) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-16">
        <div className="max-w-3xl mx-auto px-4">

          {/* Back link */}
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-charcoal mb-8 transition font-[family-name:var(--font-special-elite)]"
          >
            ← Back to events
          </Link>

          {/* Card */}
          <div className="relative bg-cream shadow-[var(--shadow-paper)] p-8 md:p-12">
            {/* Tape at top */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-tape-pink"
              style={{ transform: "rotate(-1deg)" }}
            />

            <h1 className="font-[family-name:var(--font-special-elite)] text-3xl text-charcoal mb-6">
              {event.title}
            </h1>

            <div className="space-y-2 mb-6 text-sm text-charcoal/80">
              <p className="flex items-center gap-2">
                <span className="text-vintage-red">&#x2702;</span>
                {event.date}{event.time ? ` • ${event.time}` : ""}
              </p>
              {event.location && (
                <p className="flex items-center gap-2">
                  <span className="text-vintage-red">&#x2691;</span>
                  {event.location}
                </p>
              )}
            </div>

            {/* Images */}
            {event.images.length > 0 && (
              <div className="flex flex-wrap gap-8 mb-8 justify-center">
                {event.images.map((src, i) => (
                  <div
                    key={src}
                    className="polaroid"
                    style={{ transform: `rotate(${ROTATIONS[i % 4]}deg)` }}
                  >
                    <div className="w-72 h-72 relative overflow-hidden">
                      <Image
                        src={src}
                        alt={`${event.title} photo ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-2 text-center font-[family-name:var(--font-caveat)] text-sm text-charcoal/70">
                      {event.title}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <p className="text-charcoal/80 leading-relaxed mb-8 whitespace-pre-wrap">
              {event.description}
            </p>

            {/* Register / Full */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {event.registrationOpen ? (
                <>
                  <Link href={`/contact?event=${event.id}${event.tikkieUrl ? `&tikkie=${encodeURIComponent(event.tikkieUrl)}` : ""}`}>
                    <Button variant="primary">Register now</Button>
                  </Link>
                  {event.spotsLeft && (
                    <span className="text-sm text-charcoal/60 font-[family-name:var(--font-special-elite)]">
                      {event.spotsLeft} spots left!
                    </span>
                  )}
                </>
              ) : (
                <span className="stamp text-sm">Full</span>
              )}
            </div>

            {/* Decorative corner */}
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-kraft/40" />
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
