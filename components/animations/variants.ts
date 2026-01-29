import { Variants } from "framer-motion";

// Hover wiggle for paper elements
export const wiggle: Variants = {
  initial: { rotate: 0 },
  hover: {
    rotate: [0, -2, 2, -1, 0],
    transition: { duration: 0.4 },
  },
};

// Sticker peel effect on hover
export const stickerPeel: Variants = {
  initial: {
    y: 0,
    rotateX: 0,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  hover: {
    y: -4,
    rotateX: 10,
    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
    transition: { type: "spring", stiffness: 400, damping: 20 },
  },
  tap: {
    y: -2,
    scale: 0.98,
  },
};

// Tape stick-down animation on load
export const tapeStick: Variants = {
  initial: { y: -20, opacity: 0, rotate: -5 },
  animate: {
    y: 0,
    opacity: 1,
    rotate: -2,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

// Card tilt on hover
export const cardTilt: Variants = {
  initial: { rotate: -1, scale: 1 },
  hover: {
    rotate: 0,
    scale: 1.02,
    y: -4,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
};

// Fade in from bottom
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Stagger children animation
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Float animation for decorative elements
export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Rotate slightly back and forth
export const gentleSway: Variants = {
  initial: { rotate: -2 },
  animate: {
    rotate: [2, -2, 2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Paper flutter on hover
export const paperFlutter: Variants = {
  initial: { rotate: 0, scale: 1 },
  hover: {
    rotate: [0, -1, 1, -0.5, 0],
    scale: 1.01,
    transition: { duration: 0.5 },
  },
};

// Polaroid drop in
export const polaroidDrop: Variants = {
  initial: { opacity: 0, y: -50, rotate: -15 },
  animate: {
    opacity: 1,
    y: 0,
    rotate: -2,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

// Scale in with slight rotation
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.8, rotate: -5 },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Confetti piece animation
export const confettiPiece: Variants = {
  initial: { opacity: 0, y: -100, rotate: 0 },
  animate: (i: number) => ({
    opacity: [0, 1, 1, 0],
    y: [0, 100, 200, 300],
    x: [0, (i % 2 === 0 ? 1 : -1) * 50, (i % 2 === 0 ? -1 : 1) * 30, 0],
    rotate: [0, 180, 360, 540],
    transition: {
      duration: 2 + Math.random(),
      ease: "easeOut",
      delay: i * 0.1,
    },
  }),
};

// Button press effect
export const buttonPress: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

// Slide in from left
export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Slide in from right
export const slideInRight: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Typewriter cursor blink
export const cursorBlink: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      times: [0, 0.1, 0.9, 1],
    },
  },
};

// Paper scrap burst for splash page dissolution
export const paperScrapBurst: Variants = {
  initial: {
    opacity: 0,
    scale: 0,
    x: 0,
    y: 0,
    rotate: 0,
  },
  animate: (config: { angle: number; distance: number; delay: number; rotateAmount: number }) => ({
    opacity: [0, 1, 1, 1, 0],
    scale: [0, 1.2, 1, 0.8, 0],
    x: [
      0,
      Math.cos(config.angle) * config.distance * 0.3,
      Math.cos(config.angle) * config.distance * 0.6,
      Math.cos(config.angle) * config.distance,
    ],
    y: [
      0,
      Math.sin(config.angle) * config.distance * 0.3,
      Math.sin(config.angle) * config.distance * 0.6,
      Math.sin(config.angle) * config.distance,
    ],
    rotate: [0, config.rotateAmount * 0.3, config.rotateAmount * 0.7, config.rotateAmount],
    transition: {
      duration: 1.1,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: config.delay,
    },
  }),
};
