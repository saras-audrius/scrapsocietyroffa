"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { EventCard } from "@/components/sections/EventCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { Event } from "@/lib/kv";
import { staggerContainer, fadeInUp } from "@/components/animations/variants";
import Link from "next/link";

export default function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data: Event[]) => {
        const today = new Date().toISOString().split("T")[0];
        const filtered = data
          .filter((e) => (e.dateISO ? e.dateISO >= today : !e.isPast))
          .sort((a, b) => {
            if (a.dateISO && b.dateISO) return a.dateISO.localeCompare(b.dateISO);
            if (a.dateISO) return -1;
            if (b.dateISO) return 1;
            return 0;
          })
          .slice(0, 3);
        setUpcomingEvents(filtered);
      });
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* What is Scrap Society Section - Collage Style */}
        <section className="py-16 bg-kraft/10 relative overflow-hidden">
          {/* Background scraps */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-5 w-20 h-16 bg-tape-mint/20 rotate-12 torn-edge-all" />
            <div className="absolute bottom-20 right-10 w-24 h-20 bg-tape-yellow/25 -rotate-6 torn-edge-all" />
            <div className="absolute top-1/2 left-10 w-16 h-12 bg-tape-pink/20 rotate-3" />
          </div>

          <div className="max-w-6xl mx-auto px-4 relative">
            <motion.div
              className="grid md:grid-cols-2 gap-8 items-center"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {/* Text content - on notebook paper */}
              <motion.div variants={fadeInUp} className="relative">
                {/* Section label with tape */}
                <div className="relative inline-block mb-6">
                  <span className="inline-block px-4 py-2 bg-tape-yellow/80 text-sm font-[family-name:var(--font-special-elite)] rotate-[-2deg] shadow-sm">
                    📎 What is Scrap Society?
                  </span>
                </div>

                {/* Main content on paper */}
                <div className="relative">
                  <Card variant="paper" tornEdge="bottom" rotation={-1} className="relative">
                    {/* Tape holding the card */}
                    <div className="absolute -top-3 left-8 w-16 h-5 bg-tape-mint/80 rotate-[-5deg]" />

                    <h2 className="font-[family-name:var(--font-special-elite)] text-2xl mb-4 text-charcoal">
                      A community for
                      <span className="inline-block mx-2 px-2 bg-mustard/50 rotate-1">makers</span>
                    </h2>
                    <p className="text-charcoal/80 mb-4 leading-relaxed">
                      Scrap Society is Rotterdam&apos;s
                      <span className="inline-block mx-1 px-1 bg-tape-pink/40">coziest</span>
                      craft community. We believe everyone is creative - sometimes you just need the
                      right materials and a little
                      <span className="inline-block mx-1 px-1 bg-tape-yellow/50">inspiration</span>.
                    </p>
                    <p className="text-charcoal/80 leading-relaxed">
                      Every session, we gather with boxes of
                      <span className="inline-block mx-1 px-1 bg-sage/30">paper scraps</span>,
                      magazines, stickers, and all kinds of craft supplies. No
                      experience needed - just bring yourself
                      <span className="inline-block mx-1">(and maybe some scissors!)</span>
                      ✂️
                    </p>

                    {/* Corner decoration */}
                    <div className="absolute bottom-2 right-2 text-xl">🌸</div>
                  </Card>

                  {/* Sticky note addition */}
                  <motion.div
                    className="absolute -bottom-6 -right-4 bg-tape-yellow p-3 shadow-md rotate-3 max-w-[150px]"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-xs font-[family-name:var(--font-special-elite)] text-charcoal">
                      All skill levels welcome! 💕
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Polaroid grid - scattered style */}
              <motion.div
                className="relative min-h-[400px]"
                variants={fadeInUp}
              >
                {[
                  { icon: "✂️", label: "Cutting & pasting", bg: "from-tape-pink to-tape-yellow", rotate: -8, top: "0%", left: "10%" },
                  { icon: "📖", label: "Zine making", bg: "from-sage/50 to-tape-mint", rotate: 6, top: "5%", left: "55%" },
                  { icon: "💕", label: "Community", bg: "from-mustard/50 to-vintage-red/30", rotate: -4, top: "45%", left: "5%" },
                  { icon: "⭐", label: "Creativity", bg: "from-tape-mint to-sage/50", rotate: 8, top: "50%", left: "50%" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="polaroid absolute"
                    style={{
                      top: item.top,
                      left: item.left,
                      transform: `rotate(${item.rotate}deg)`,
                    }}
                    initial={{ opacity: 0, y: 30, rotate: item.rotate - 10 }}
                    whileInView={{ opacity: 1, y: 0, rotate: item.rotate }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, type: "spring" }}
                    whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
                  >
                    <div className={`w-28 h-28 bg-gradient-to-br ${item.bg} flex items-center justify-center`}>
                      <span className="text-4xl">{item.icon}</span>
                    </div>
                    <p className="mt-2 text-center text-xs font-[family-name:var(--font-special-elite)]">
                      {item.label}
                    </p>
                    {/* Tape on some polaroids */}
                    {i % 2 === 0 && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-tape-mint/80 rotate-2" />
                    )}
                  </motion.div>
                ))}

                {/* Scattered decorations */}
                <motion.span
                  className="absolute bottom-10 right-10 text-2xl"
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ✨
                </motion.span>
                <div className="absolute top-1/3 right-5 w-8 h-10 bg-tape-pink/40 rotate-12 torn-edge-all" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="py-16 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 right-20 w-16 h-20 bg-mustard/15 rotate-6 torn-edge-all" />
            <div className="absolute bottom-10 left-20 w-20 h-14 bg-sage/15 -rotate-3 torn-edge-all" />
            <motion.span
              className="absolute top-32 left-10 text-3xl opacity-50"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              📅
            </motion.span>
          </div>

          <div className="max-w-6xl mx-auto px-4 relative">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {/* Section header - bulletin board style */}
              <motion.div className="text-center mb-12" variants={fadeInUp}>
                <div className="inline-block relative">
                  <span className="inline-block px-5 py-2 bg-tape-mint/80 text-sm font-[family-name:var(--font-special-elite)] rotate-[-1deg] shadow-sm mb-4">
                    📌 Mark your calendar
                  </span>
                </div>
                <h2 className="font-[family-name:var(--font-special-elite)] text-3xl text-charcoal mt-4">
                  <span className="inline-block px-3 py-1 bg-tape-yellow/60 rotate-[-1deg]">Upcoming</span>
                  {" "}
                  <span className="inline-block px-3 py-1 bg-tape-pink/60 rotate-[1deg]">Sessions</span>
                </h2>
              </motion.div>

              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={staggerContainer}
              >
                {upcomingEvents.slice(0, 3).map((event, i) => (
                  <motion.div
                    key={event.id}
                    variants={fadeInUp}
                    style={{ transform: `rotate(${(i - 1) * 1.5}deg)` }}
                  >
                    <EventCard event={event} index={i} />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div className="text-center mt-10" variants={fadeInUp}>
                <Link href="/events">
                  <Button variant="secondary" size="lg">
                    See All Events ✨
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Instagram CTA Section - Scrapbook page style */}
        <section className="py-16 bg-gingham relative overflow-hidden">
          {/* Corner tape decorations */}
          <div className="absolute top-4 left-4 w-16 h-6 bg-tape-yellow/80 rotate-[-45deg]" />
          <div className="absolute top-4 right-4 w-16 h-6 bg-tape-mint/80 rotate-[45deg]" />
          <div className="absolute bottom-4 left-4 w-16 h-6 bg-tape-pink/80 rotate-[45deg]" />
          <div className="absolute bottom-4 right-4 w-16 h-6 bg-tape-yellow/80 rotate-[-45deg]" />

          <div className="max-w-4xl mx-auto px-4 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="paper" className="py-12 px-8 relative">
                {/* Pin at top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">📌</div>

                {/* Decorative tape strips */}
                <div className="absolute top-4 -left-4 w-20 h-5 bg-tape-mint/70 rotate-[-15deg]" />
                <div className="absolute top-4 -right-4 w-20 h-5 bg-tape-pink/70 rotate-[15deg]" />

                <motion.div
                  className="mb-6"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-5xl">📸</span>
                </motion.div>

                <h2 className="font-[family-name:var(--font-special-elite)] text-2xl mb-4 text-charcoal">
                  <span className="inline-block px-2 bg-tape-yellow/50 rotate-[-1deg]">Follow</span>
                  {" Our "}
                  <span className="inline-block px-2 bg-tape-pink/50 rotate-[1deg]">Journey</span>
                </h2>

                <p className="text-charcoal/80 mb-6 max-w-md mx-auto">
                  See what we&apos;ve been creating! Follow
                  <span className="inline-block mx-1 px-1 bg-mustard/40">@scrapsociety.nl</span>
                  on Instagram for session updates, member creations, and craft inspiration. ✨
                </p>

                <motion.a
                  href="https://instagram.com/scrapsociety.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-[family-name:var(--font-special-elite)] rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  @scrapsociety.nl
                </motion.a>

                {/* Corner stickers */}
                <div className="absolute bottom-4 left-4 text-2xl rotate-[-15deg]">🌟</div>
                <div className="absolute bottom-4 right-4 text-2xl rotate-[15deg]">💖</div>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
