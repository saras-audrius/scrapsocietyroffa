"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cardTilt } from "../animations/variants";
import { ReactNode } from "react";

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: ReactNode;
  variant?: "paper" | "kraft" | "lined";
  tornEdge?: "none" | "top" | "bottom" | "all";
  rotation?: number;
}

export function Card({
  children,
  variant = "paper",
  tornEdge = "none",
  rotation = -1,
  className = "",
  ...props
}: CardProps) {
  const variants = {
    paper: "bg-cream",
    kraft: "paper-kraft",
    lined: "notebook-paper",
  };

  const tornEdges = {
    none: "",
    top: "torn-edge-top",
    bottom: "torn-edge-bottom",
    all: "torn-edge-all",
  };

  return (
    <motion.div
      className={`p-6 shadow-[var(--shadow-paper)] ${variants[variant]} ${tornEdges[tornEdge]} ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      variants={cardTilt}
      initial="initial"
      whileHover="hover"
      {...props}
    >
      {children}
    </motion.div>
  );
}
