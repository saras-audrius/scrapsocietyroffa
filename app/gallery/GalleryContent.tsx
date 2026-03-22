"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CutoutText } from "@/components/ui/CutoutText";
import { staggerContainer, fadeInUp } from "@/components/animations/variants";
import type { Event } from "@/lib/kv";

// Varying aspect ratios give the Pinterest stagger feel within CSS columns
const ASPECTS = [
  "aspect-[3/4]",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[2/3]",
  "aspect-[3/4]",
  "aspect-[4/3]",
];

const ROTATIONS = [-2, 1.5, -1, 2.5, -1.5, 3, -2.5, 1];

interface Photo {
  src: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  index: number; // global index for rotation/aspect
}

export function GalleryContent({ events }: { events: Event[] }) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const allPhotos: Photo[] = events.flatMap((event) => {
    const cover = event.coverImage ?? event.images[0];
    return event.images
      .filter((src) => src !== cover)
      .map((src, j) => ({
        src,
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        index: j,
      }));
  }).map((p, globalIdx) => ({ ...p, index: globalIdx }));

  const visiblePhotos = activeFilter
    ? allPhotos.filter((p) => p.eventId === activeFilter)
    : allPhotos;

  return (
    <main className="flex-grow">
      {/* Hero */}
      <section className="py-16 bg-kraft/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="initial" animate="animate" variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <span className="washi-tape washi-tape-pink text-sm mb-6 inline-block">
                Our memories
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="mb-6">
              <CutoutText text="Gallery" as="span" className="text-3xl" />
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-charcoal/80 max-w-2xl mx-auto"
            >
              A scrapbook of moments from all our crafty sessions in Rotterdam.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="py-6 border-b border-kraft/20 bg-cream sticky top-[calc(var(--header-height,72px))] z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-charcoal/50 font-[family-name:var(--font-special-elite)] mr-2 hidden sm:inline">
              Filter:
            </span>
            <button
              onClick={() => setActiveFilter(null)}
              className={`px-4 py-1.5 text-sm font-[family-name:var(--font-special-elite)] rounded transition-all ${
                activeFilter === null
                  ? "bg-charcoal text-cream shadow-sm"
                  : "bg-kraft/20 text-charcoal hover:bg-kraft/40"
              }`}
            >
              All sessions
            </button>
            {events.map((event) => (
              <button
                key={event.id}
                onClick={() =>
                  setActiveFilter(activeFilter === event.id ? null : event.id)
                }
                className={`px-4 py-1.5 text-sm font-[family-name:var(--font-special-elite)] rounded transition-all ${
                  activeFilter === event.id
                    ? "bg-vintage-red text-white shadow-sm"
                    : "bg-kraft/20 text-charcoal hover:bg-kraft/40"
                }`}
              >
                {event.title}
              </button>
            ))}
            {visiblePhotos.length > 0 && (
              <span className="ml-auto text-xs text-charcoal/40 font-[family-name:var(--font-special-elite)]">
                {visiblePhotos.length} photo{visiblePhotos.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {visiblePhotos.length === 0 ? (
            <div className="text-center py-24">
              <span className="text-5xl block mb-4">&#x1F4F8;</span>
              <p className="font-[family-name:var(--font-special-elite)] text-charcoal/50">
                No photos yet for this session.
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="columns-2 md:columns-3 lg:columns-4 gap-5">
                {visiblePhotos.map((photo) => (
                  <motion.div
                    key={photo.src}
                    className="break-inside-avoid mb-5 group"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    layout
                  >
                    <Link href={`/events/${photo.eventId}`}>
                      <div
                        className="polaroid transition-transform duration-300 group-hover:scale-[1.03]"
                        style={{
                          transform: `rotate(${ROTATIONS[photo.index % ROTATIONS.length]}deg)`,
                        }}
                      >
                        <div className={`relative w-full overflow-hidden ${ASPECTS[photo.index % ASPECTS.length]}`}>
                          <Image
                            src={photo.src}
                            alt={photo.eventTitle}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="mt-2 text-center pb-1">
                          <p className="font-[family-name:var(--font-special-elite)] text-xs text-charcoal truncate">
                            {photo.eventTitle}
                          </p>
                          <p className="font-[family-name:var(--font-caveat)] text-xs text-charcoal/50">
                            {photo.eventDate}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </main>
  );
}
