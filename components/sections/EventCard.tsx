"use client";

import { motion } from "framer-motion";
import { Event } from "@/lib/events";
import { Button } from "../ui/Button";
import { cardTilt } from "../animations/variants";
import Link from "next/link";

interface EventCardProps {
  event: Event;
  index?: number;
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const rotations = [-2, 1, -1, 2, -1.5];
  const bgColors = ["bg-cream", "bg-white", "bg-tape-yellow/30"];

  return (
    <motion.article
      className={`relative ${bgColors[index % bgColors.length]} p-6 shadow-[var(--shadow-paper)]`}
      style={{ transform: `rotate(${rotations[index % rotations.length]}deg)` }}
      variants={cardTilt}
      initial="initial"
      whileHover="hover"
    >
      {/* Decorative tape at top */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-tape-pink"
        style={{ transform: "rotate(-1deg)" }}
      />

      {/* Event number badge */}
      <div className="absolute -top-2 -right-2 w-10 h-10 bg-vintage-red rounded-full flex items-center justify-center text-white font-[family-name:var(--font-special-elite)] text-sm shadow-md">
        #{index + 1}
      </div>

      {/* Content */}
      <div className="mt-2">
        <h3 className="font-[family-name:var(--font-special-elite)] text-xl text-charcoal mb-2">
          {event.title}
        </h3>

        <div className="space-y-1 mb-4 text-sm text-charcoal/80">
          <p className="flex items-center gap-2">
            <span className="text-vintage-red">&#x2702;</span>
            {event.date} • {event.time}
          </p>
          <p className="flex items-center gap-2">
            <span className="text-vintage-red">&#x2691;</span>
            {event.location}
          </p>
        </div>

        <p className="text-sm text-charcoal/70 mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {event.registrationOpen ? (
            <Link href={`/contact?event=${event.id}`}>
              <Button variant="primary" size="sm">
                Register
              </Button>
            </Link>
          ) : (
            <span className="stamp text-xs">Full</span>
          )}

          {event.spotsLeft && event.registrationOpen && (
            <span className="text-xs text-charcoal/60 font-[family-name:var(--font-special-elite)]">
              {event.spotsLeft} spots left!
            </span>
          )}
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-kraft/40" />
    </motion.article>
  );
}
