"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { CutoutText } from "@/components/ui/CutoutText";
import { staggerContainer, fadeInUp } from "@/components/animations/variants";

export default function AboutPage() {
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
                <span className="washi-tape washi-tape-pink text-sm mb-6 inline-block">
                  Get to know us
                </span>
              </motion.div>
              <motion.h1 variants={fadeInUp} className="mb-6">
                <CutoutText text="About Scrap Society" as="span" className="text-3xl" />
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-charcoal/80 max-w-2xl mx-auto"
              >
                A Rotterdam craft community bringing people together through
                scissors, glue, and endless creativity.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-5 gap-8"
            >
              <motion.div variants={fadeInUp} className="md:col-span-3">
                <span className="washi-tape text-sm mb-6 inline-block">
                  Our Story
                </span>
                <Card variant="lined" rotation={0} className="p-8">
                  <h2 className="font-[family-name:var(--font-special-elite)] text-2xl mb-4 text-charcoal">
                    How it all started
                  </h2>
                  <div className="space-y-4 text-charcoal/80">
                    <p>
                      Scrap Society was born from a simple idea: everyone deserves
                      a space to be creative without pressure or judgment. What
                      started as casual crafting sessions with friends has grown
                      into Rotterdam&apos;s coziest craft community.
                    </p>
                    <p>
                      We believe that creativity isn&apos;t about being &quot;good&quot; at art
                      - it&apos;s about the joy of making something with your hands,
                      the meditative quality of cutting and pasting, and the
                      connections we make along the way.
                    </p>
                    <p>
                      Every session, we bring boxes overflowing with paper scraps,
                      vintage magazines, stickers, washi tape, and all sorts of
                      crafty treasures. Members bring their own finds too -
                      that&apos;s the beauty of scrap crafting, one person&apos;s trash is
                      another&apos;s perfect collage piece!
                    </p>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp} className="md:col-span-2 space-y-4">
                <div className="polaroid" style={{ transform: "rotate(-3deg)" }}>
                  <div className="aspect-square bg-gradient-to-br from-vintage-red/20 to-mustard/30 flex items-center justify-center">
                    <span className="text-6xl">&#x2702;</span>
                  </div>
                  <p className="mt-2 text-center text-xs font-[family-name:var(--font-special-elite)]">
                    Est. 2020
                  </p>
                </div>
                <div className="polaroid" style={{ transform: "rotate(2deg)" }}>
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src="/images/scrapsociety1.jpeg"
                      alt="Scrap Society crafting session"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-2 text-center text-xs font-[family-name:var(--font-special-elite)]">
                    Made with love
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* What to Expect Section */}
        <section className="py-16 bg-gingham">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <span className="washi-tape washi-tape-mint text-sm mb-4 inline-block">
                  First time?
                </span>
                <h2 className="font-[family-name:var(--font-special-elite)] text-3xl text-charcoal">
                  What to Expect
                </h2>
              </motion.div>

              <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
              >
                {[
                  {
                    icon: "&#x1F4E6;",
                    title: "Materials Provided",
                    description:
                      "We bring tons of paper scraps, magazines, stickers, and supplies. Just bring yourself!",
                  },
                  {
                    icon: "&#x2702;",
                    title: "Bring Scissors",
                    description:
                      "Your own scissors and glue stick are handy, but we have extras if you forget.",
                  },
                  {
                    icon: "&#x1F91D;",
                    title: "All Levels Welcome",
                    description:
                      "Never made a collage before? Perfect! We love first-timers and there's no wrong way to create.",
                  },
                  {
                    icon: "&#x2615;",
                    title: "Cozy Vibes",
                    description:
                      "Good music, friendly chats, and a relaxed atmosphere. Come as you are.",
                  },
                  {
                    icon: "&#x1F3A8;",
                    title: "Take Home Art",
                    description:
                      "Everything you make is yours to keep. Frame it, gift it, or add it to your journal!",
                  },
                  {
                    icon: "&#x1F465;",
                    title: "Make Friends",
                    description:
                      "Our community is the best part. Many members have become real friends outside sessions.",
                  },
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeInUp}>
                    <Card
                      variant="paper"
                      rotation={[-1, 1, -0.5, 0.5, -1, 1][i]}
                      className="h-full"
                    >
                      <span
                        className="text-3xl mb-3 block"
                        dangerouslySetInnerHTML={{ __html: item.icon }}
                      />
                      <h3 className="font-[family-name:var(--font-special-elite)] text-lg mb-2 text-charcoal">
                        {item.title}
                      </h3>
                      <p className="text-sm text-charcoal/70">{item.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <motion.div variants={fadeInUp}>
                <span className="washi-tape text-sm mb-6 inline-block">
                  Find us
                </span>
                <Card variant="kraft" rotation={-1} className="p-8">
                  <h2 className="font-[family-name:var(--font-special-elite)] text-2xl mb-4 text-charcoal">
                    Central Library Rotterdam
                  </h2>
                  <div className="space-y-3 text-charcoal/90">
                    <p className="flex items-start gap-2">
                      <span className="text-vintage-red">&#x2691;</span>
                      <span>
                        Hoogstraat 110
                        <br />
                        3011 PV Rotterdam
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-vintage-red">&#x1F687;</span>
                      <span>Metro: Blaak (5 min walk)</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-vintage-red">&#x1F68B;</span>
                      <span>Tram: Blaak (2 min walk)</span>
                    </p>
                  </div>
                  <div className="mt-6">
                    <span className="stamp">ROFFA</span>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <div className="aspect-video bg-kraft/30 rounded-lg flex items-center justify-center border-4 border-white shadow-lg">
                  <div className="text-center p-8">
                    <span className="text-5xl mb-4 block">&#x1F3DB;</span>
                    <p className="font-[family-name:var(--font-special-elite)] text-charcoal">
                      Central Library
                    </p>
                    <p className="text-sm text-charcoal/60 mt-2">
                      Rotterdam&apos;s iconic library building
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
