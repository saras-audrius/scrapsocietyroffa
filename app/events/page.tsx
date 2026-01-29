"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EventCard } from "@/components/sections/EventCard";
import { Card } from "@/components/ui/Card";
import { CutoutText } from "@/components/ui/CutoutText";
import { upcomingEvents, pastEvents } from "@/lib/events";
import { staggerContainer, fadeInUp } from "@/components/animations/variants";

export default function EventsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

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
                <span className="washi-tape text-sm inline-block">
                  Coming up
                </span>
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

        {/* How to Register Section */}
        <section className="py-16 bg-gingham">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <Card variant="paper" className="p-8 md:p-12">
                <motion.div variants={fadeInUp} className="text-center">
                  <h2 className="font-[family-name:var(--font-special-elite)] text-2xl mb-6 text-charcoal">
                    How to Join
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-6 text-left">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-vintage-red text-white rounded-full flex items-center justify-center mx-auto mb-3 font-[family-name:var(--font-special-elite)] text-xl">
                        1
                      </div>
                      <h3 className="font-[family-name:var(--font-special-elite)] mb-2">
                        Pick an Event
                      </h3>
                      <p className="text-sm text-charcoal/70">
                        Choose a session that fits your schedule
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-mustard text-charcoal rounded-full flex items-center justify-center mx-auto mb-3 font-[family-name:var(--font-special-elite)] text-xl">
                        2
                      </div>
                      <h3 className="font-[family-name:var(--font-special-elite)] mb-2">
                        Register
                      </h3>
                      <p className="text-sm text-charcoal/70">
                        Click register and fill out the form
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-sage text-charcoal rounded-full flex items-center justify-center mx-auto mb-3 font-[family-name:var(--font-special-elite)] text-xl">
                        3
                      </div>
                      <h3 className="font-[family-name:var(--font-special-elite)] mb-2">
                        Show Up & Create
                      </h3>
                      <p className="text-sm text-charcoal/70">
                        Bring scissors, glue, and your creativity!
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 p-4 bg-tape-yellow/30 rounded">
                    <p className="text-sm text-charcoal/80">
                      <strong>Note:</strong> Sessions are free or donation-based.
                      Space is limited, so please register in advance!
                    </p>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Past Events Section */}
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
                {pastEvents.map((event, i) => (
                  <motion.div
                    key={event.id}
                    variants={fadeInUp}
                    className="group"
                  >
                    <div
                      className="polaroid"
                      style={{
                        transform: `rotate(${[-2, 3, -1, 2][i % 4]}deg)`,
                      }}
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
                  </motion.div>
                ))}

                {/* Placeholder for more memories */}
                <motion.div variants={fadeInUp}>
                  <div
                    className="polaroid opacity-60"
                    style={{ transform: "rotate(-1deg)" }}
                  >
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
      </main>

      <Footer />
    </div>
  );
}
