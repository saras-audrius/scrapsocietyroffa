"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { EventCard } from "@/components/sections/EventCard";
import { Card } from "@/components/ui/Card";
import { CutoutText } from "@/components/ui/CutoutText";
import { staggerContainer, fadeInUp } from "@/components/animations/variants";
import type { Event } from "@/lib/kv";

export type { Event };

const ROTATIONS = [-2, 3, -1, 2];

export function EventsContent({
  upcomingEvents,
  pastEvents,
}: {
  upcomingEvents: Event[];
  pastEvents: Event[];
}) {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="py-16 bg-kraft/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="washi-tape washi-tape-mint text-sm mb-6 inline-block">
                Mark your calendar
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="mb-6">
              <CutoutText text="Events & Sessions" as="span" className="text-3xl" />
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-charcoal/80 max-w-2xl mx-auto"
            >
              Join us for crafty afternoons filled with creativity, good vibes,
              and endless paper scraps.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-10">
              <span className="washi-tape text-sm inline-block">Coming up</span>
              <h2 className="font-[family-name:var(--font-special-elite)] text-2xl text-charcoal mt-4">
                Upcoming Sessions
              </h2>
            </motion.div>

            {upcomingEvents.length > 0 ? (
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={staggerContainer}
              >
                {upcomingEvents.map((event, i) => (
                  <motion.div key={event.id} variants={fadeInUp}>
                    <EventCard event={event} index={i} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <Card variant="paper" className="text-center py-12">
                <span className="text-4xl mb-4 block">&#x1F4C5;</span>
                <h3 className="font-[family-name:var(--font-special-elite)] text-xl mb-2">
                  No upcoming events yet
                </h3>
                <p className="text-charcoal/70">
                  Follow us on Instagram to be the first to know about new sessions!
                </p>
              </Card>
            )}
          </motion.div>
        </div>
      </section>

      {/* Past Events Section */}
      {pastEvents.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="mb-10">
                <span className="washi-tape washi-tape-pink text-sm inline-block">
                  Memory lane
                </span>
                <h2 className="font-[family-name:var(--font-special-elite)] text-2xl text-charcoal mt-4">
                  Past Sessions
                </h2>
              </motion.div>

              <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={staggerContainer}
              >
                {pastEvents.flatMap((event, i) => {
                  if (event.images.length > 0) {
                    return event.images.map((src, j) => (
                      <motion.div
                        key={`${event.id}-${j}`}
                        variants={fadeInUp}
                        className="group"
                      >
                        <Link href={`/events/${event.id}`} className="block">
                          <div
                            className="polaroid transition-transform duration-200 group-hover:scale-105"
                            style={{ transform: `rotate(${ROTATIONS[(i + j) % 4]}deg)` }}
                          >
                            <div className="aspect-square relative overflow-hidden">
                              <Image
                                src={src}
                                alt={`${event.title} - photo ${j + 1}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="mt-2 text-center">
                              <p className="font-[family-name:var(--font-special-elite)] text-sm">
                                {event.title}
                              </p>
                              <p className="text-xs text-charcoal/60">{event.date}</p>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ));
                  }
                  return (
                    <motion.div key={event.id} variants={fadeInUp} className="group">
                      <Link href={`/events/${event.id}`} className="block">
                        <div
                          className="polaroid transition-transform duration-200 group-hover:scale-105"
                          style={{ transform: `rotate(${ROTATIONS[i % 4]}deg)` }}
                        >
                          <div className="aspect-square bg-gradient-to-br from-kraft/50 to-tape-yellow/30 flex items-center justify-center">
                            <span className="text-4xl group-hover:scale-110 transition-transform">
                              &#x1F4F8;
                            </span>
                          </div>
                          <div className="mt-2 text-center">
                            <p className="font-[family-name:var(--font-special-elite)] text-sm">
                              {event.title}
                            </p>
                            <p className="text-xs text-charcoal/60">{event.date}</p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Placeholder */}
                <motion.div variants={fadeInUp}>
                  <div className="polaroid opacity-60" style={{ transform: "rotate(-1deg)" }}>
                    <div className="aspect-square bg-kraft/20 flex items-center justify-center border-2 border-dashed border-kraft">
                      <span className="text-kraft text-sm font-[family-name:var(--font-special-elite)] text-center px-4">
                        More memories coming...
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}
    </main>
  );
}
