"use client";

import { motion } from "framer-motion";
import { staggerContainer, scaleIn } from "../animations/variants";

interface CutoutTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const bgColors = [
  "bg-mustard",
  "bg-cream",
  "bg-tape-pink",
  "bg-white",
  "bg-sage/50",
  "bg-tape-yellow",
];

const rotations = [-3, 2, -1, 3, -2, 1];

export function CutoutText({ text, className = "", as = "span" }: CutoutTextProps) {
  const words = text.split(" ");
  const Tag = motion[as];

  return (
    <Tag
      className={`inline-flex flex-wrap gap-1.5 ${className}`}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block px-2 py-1 ${bgColors[i % bgColors.length]} font-[family-name:var(--font-special-elite)] text-charcoal shadow-sm`}
          style={{
            transform: `rotate(${rotations[i % rotations.length]}deg)`,
          }}
          variants={scaleIn}
          whileHover={{
            scale: 1.1,
            rotate: 0,
            transition: { type: "spring", stiffness: 400 },
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
