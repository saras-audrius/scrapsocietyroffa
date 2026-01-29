"use client";

import { motion } from "framer-motion";
import { tapeStick } from "../animations/variants";
import { ReactNode } from "react";

interface WashiTapeProps {
  children: ReactNode;
  color?: "yellow" | "pink" | "mint";
  rotation?: number;
  className?: string;
}

export function WashiTape({
  children,
  color = "yellow",
  rotation = -2,
  className = "",
}: WashiTapeProps) {
  const colors = {
    yellow: "bg-tape-yellow",
    pink: "bg-tape-pink",
    mint: "bg-tape-mint",
  };

  return (
    <motion.div
      className={`relative inline-block px-8 py-2 ${colors[color]} ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      variants={tapeStick}
      initial="initial"
      animate="animate"
    >
      {/* Left torn edge */}
      <span
        className="absolute left-0 top-0 w-2 h-full opacity-70"
        style={{
          background: "inherit",
          clipPath: "polygon(0 0, 100% 10%, 100% 90%, 0 100%)",
          marginLeft: "-4px",
        }}
      />
      {/* Right torn edge */}
      <span
        className="absolute right-0 top-0 w-2 h-full opacity-70"
        style={{
          background: "inherit",
          clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0 90%)",
          marginRight: "-4px",
        }}
      />
      <span className="relative z-10 font-[family-name:var(--font-special-elite)]">
        {children}
      </span>
    </motion.div>
  );
}
