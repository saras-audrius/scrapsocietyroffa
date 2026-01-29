"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { staggerContainer, fadeInUp } from "../animations/variants";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Layered paper background - like a collage board */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large background paper scraps */}
        <motion.div
          className="absolute -top-10 -left-20 w-64 h-80 bg-tape-yellow/30 rotate-12 torn-edge-all"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.div
          className="absolute top-20 -right-10 w-48 h-64 bg-tape-pink/40 -rotate-6 torn-edge-all"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-56 h-40 bg-tape-mint/30 rotate-3 torn-edge-bottom"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
        <motion.div
          className="absolute bottom-32 right-1/4 w-40 h-52 bg-kraft/20 -rotate-12 torn-edge-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* Scattered small scraps */}
        {[
          { top: "15%", left: "5%", w: 12, h: 16, color: "bg-vintage-red/20", rotate: 15 },
          { top: "70%", left: "15%", w: 10, h: 14, color: "bg-mustard/40", rotate: -8 },
          { top: "25%", right: "8%", w: 14, h: 10, color: "bg-sage/30", rotate: 20 },
          { top: "60%", right: "12%", w: 8, h: 12, color: "bg-tape-pink/50", rotate: -15 },
          { top: "45%", left: "8%", w: 10, h: 8, color: "bg-tape-yellow/60", rotate: 5 },
          { top: "80%", right: "25%", w: 12, h: 8, color: "bg-tape-mint/40", rotate: -10 },
        ].map((scrap, i) => (
          <motion.div
            key={i}
            className={`absolute ${scrap.color} torn-edge-all`}
            style={{
              top: scrap.top,
              left: scrap.left,
              right: scrap.right,
              width: `${scrap.w * 4}px`,
              height: `${scrap.h * 4}px`,
              transform: `rotate(${scrap.rotate}deg)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
          />
        ))}

        {/* Doodles and decorations */}
        <motion.span
          className="absolute top-[20%] left-[15%] text-4xl"
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 0.7, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          ✂️
        </motion.span>
        <motion.span
          className="absolute top-[30%] right-[10%] text-3xl text-mustard"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          ⭐
        </motion.span>
        <motion.span
          className="absolute bottom-[25%] left-[20%] text-3xl text-vintage-red"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ♥
        </motion.span>
        <motion.span
          className="absolute top-[50%] right-[5%] text-2xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          📎
        </motion.span>

        {/* Hand-drawn style squiggles (SVG) */}
        <svg className="absolute top-[40%] left-[3%] w-24 h-24 text-charcoal/20" viewBox="0 0 100 100">
          <path d="M10 50 Q 30 20, 50 50 T 90 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <svg className="absolute bottom-[15%] right-[8%] w-20 h-20 text-vintage-red/30" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="10 5" />
        </svg>
      </div>

      {/* Main content - on a "pinned" paper */}
      <motion.div
        className="relative max-w-5xl mx-auto px-4 py-16"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Main content card - like a pinned note */}
        <motion.div
          className="relative bg-cream/95 p-8 sm:p-12 shadow-lg"
          variants={fadeInUp}
          style={{ transform: "rotate(-0.5deg)" }}
        >
          {/* Push pin at top */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl z-10">📌</div>

          {/* Tape corners */}
          <div className="absolute -top-2 -left-2 w-12 h-6 bg-tape-yellow rotate-[-35deg] opacity-80" />
          <div className="absolute -top-2 -right-2 w-12 h-6 bg-tape-mint rotate-[35deg] opacity-80" />

          {/* Tagline - like a cut-out label */}
          <motion.div
            className="text-center mb-6"
            variants={fadeInUp}
          >
            <span className="inline-block px-4 py-2 bg-tape-pink/70 text-sm font-[family-name:var(--font-special-elite)] rotate-[-1deg] shadow-sm">
              ✨ your local craft club ✨
            </span>
          </motion.div>

          {/* Main heading - ransom note style */}
          <motion.div variants={fadeInUp} className="mb-6 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              <span className="inline-block px-2 py-1 bg-mustard/80 font-[family-name:var(--font-special-elite)] text-charcoal rotate-[-1deg] mx-1">
                Scrap
              </span>
              <span className="inline-block px-2 py-1 bg-tape-mint/80 font-[family-name:var(--font-special-elite)] text-charcoal rotate-[1deg] mx-1">
                Society
              </span>
              <br className="sm:hidden" />
              <span className="inline-block px-2 py-1 bg-tape-pink/80 font-[family-name:var(--font-special-elite)] text-charcoal rotate-[-0.5deg] mx-1 mt-2">
                Rotterdam
              </span>
            </h1>
          </motion.div>

          {/* Subtitle - handwritten style */}
          <motion.p
            className="text-base sm:text-lg text-charcoal/80 max-w-xl mx-auto mb-8 font-[family-name:var(--font-karla)] text-center leading-relaxed"
            variants={fadeInUp}
          >
            Bring your scraps, make art, meet friends.
            <span className="inline-block mx-1 px-1 bg-tape-yellow/50 rotate-1">Join</span>
            Rotterdam&apos;s coziest community for
            <span className="inline-block mx-1 px-1 bg-sage/30 -rotate-1">collage workshops</span>,
            <span className="inline-block mx-1 px-1 bg-tape-pink/40 rotate-1">zine making</span>, and
            <span className="inline-block mx-1 px-1 bg-mustard/30 -rotate-1">junk journaling</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            variants={fadeInUp}
          >
            <Link href="/events">
              <Button variant="primary" size="lg">
                ✂️ Join a Session
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Learn More →
              </Button>
            </Link>
          </motion.div>

          {/* Activity badges - like stickers */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={fadeInUp}
          >
            {[
              { icon: "✂️", label: "Collage", bg: "bg-tape-yellow/70", rotate: -2 },
              { icon: "📖", label: "Zines", bg: "bg-tape-mint/70", rotate: 1 },
              { icon: "📔", label: "Junk Journals", bg: "bg-tape-pink/70", rotate: -1 },
              { icon: "💕", label: "Community", bg: "bg-mustard/50", rotate: 2 },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className={`${item.bg} px-3 py-2 shadow-sm font-[family-name:var(--font-special-elite)] text-charcoal text-sm`}
                style={{ transform: `rotate(${item.rotate}deg)` }}
                initial={{ opacity: 0, scale: 0, rotate: item.rotate - 10 }}
                animate={{ opacity: 1, scale: 1, rotate: item.rotate }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 0 }}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </motion.div>
            ))}
          </motion.div>

          {/* Decorative corner doodle */}
          <div className="absolute bottom-2 right-2 text-2xl opacity-60">🌟</div>
        </motion.div>

        {/* Side decorations - floating polaroids */}
        <motion.div
          className="hidden lg:block absolute -left-32 top-1/4 polaroid"
          initial={{ opacity: 0, x: -50, rotate: -15 }}
          animate={{ opacity: 1, x: 0, rotate: -12 }}
          transition={{ delay: 1, duration: 0.6 }}
          whileHover={{ rotate: 0, scale: 1.05 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-tape-pink to-tape-yellow flex items-center justify-center">
            <span className="text-3xl">🎨</span>
          </div>
          <p className="mt-2 text-center text-xs font-[family-name:var(--font-special-elite)]">
            get creative!
          </p>
        </motion.div>

        <motion.div
          className="hidden lg:block absolute -right-28 top-1/3 polaroid"
          initial={{ opacity: 0, x: 50, rotate: 15 }}
          animate={{ opacity: 1, x: 0, rotate: 8 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          whileHover={{ rotate: 0, scale: 1.05 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-sage/50 to-tape-mint flex items-center justify-center">
            <span className="text-3xl">✨</span>
          </div>
          <p className="mt-2 text-center text-xs font-[family-name:var(--font-special-elite)]">
            make magic
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom torn paper edge */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-kraft/30 torn-edge-top" />
    </section>
  );
}
