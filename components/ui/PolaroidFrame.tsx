"use client";

import { motion } from "framer-motion";
import { polaroidDrop } from "../animations/variants";
import Image from "next/image";

interface PolaroidFrameProps {
  src: string;
  alt: string;
  caption?: string;
  rotation?: number;
  className?: string;
}

export function PolaroidFrame({
  src,
  alt,
  caption,
  rotation = -2,
  className = "",
}: PolaroidFrameProps) {
  return (
    <motion.div
      className={`bg-white p-3 pb-12 shadow-md inline-block ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      variants={polaroidDrop}
      initial="initial"
      animate="animate"
      whileHover={{
        rotate: 0,
        scale: 1.05,
        boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
        transition: { type: "spring", stiffness: 300 },
      }}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
      {caption && (
        <p className="mt-3 text-center font-[family-name:var(--font-special-elite)] text-charcoal text-sm">
          {caption}
        </p>
      )}
    </motion.div>
  );
}
