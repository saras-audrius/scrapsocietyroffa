"use client";

import { motion } from "framer-motion";
import { stickerPeel } from "../animations/variants";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-block font-[family-name:var(--font-special-elite)] border-none cursor-pointer relative";

  const variants = {
    primary: "bg-vintage-red text-white",
    secondary: "bg-mustard text-charcoal",
    outline: "bg-transparent border-2 border-vintage-red text-vintage-red",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-7 py-3.5 text-lg",
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      style={{ transform: "rotate(-1deg)" }}
      variants={stickerPeel}
      initial="initial"
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : "tap"}
    >
      <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      {children}
    </motion.button>
  );
}
