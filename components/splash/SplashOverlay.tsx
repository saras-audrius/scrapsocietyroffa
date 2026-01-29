"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

type SplashState = "idle" | "cutting" | "splitting" | "hidden";

const CUTTING_DURATION = 2000; // Time for scissors to cut down
const SPLIT_DURATION = 800; // Time for halves to split apart

// Generate cutting sound using Web Audio API
function playCuttingSound() {
  try {
    const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

    const duration = 2;
    const sampleRate = audioContext.sampleRate;
    const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    // Create a cutting/snipping sound pattern
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      // Rhythmic snipping pattern (like scissors opening and closing)
      const snipFreq = 8; // snips per second
      const snipPhase = (t * snipFreq) % 1;
      const snipEnvelope = snipPhase < 0.3 ? Math.sin(snipPhase * Math.PI / 0.3) : 0;

      // Crisp paper cutting noise
      const noise = (Math.random() * 2 - 1) * 0.3;
      const crinkle = Math.sin(t * 2000 + Math.random() * 100) * 0.1;

      // Combine with envelope
      data[i] = (noise + crinkle) * snipEnvelope * (1 - t / duration) * 0.5;
    }

    const source = audioContext.createBufferSource();
    source.buffer = buffer;

    // Add some filtering for a more realistic sound
    const filter = audioContext.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 3000;
    filter.Q.value = 1;

    source.connect(filter);
    filter.connect(audioContext.destination);
    source.start();

    return audioContext;
  } catch {
    console.log("Audio not supported");
    return null;
  }
}

export function SplashOverlay() {
  const [state, setState] = useState<SplashState>("idle");
  const [mounted, setMounted] = useState(false);
  const [cutProgress, setCutProgress] = useState(0);
  const scissorsControls = useAnimation();
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleClick = useCallback(async () => {
    if (state === "idle") {
      setState("cutting");

      // Play cutting sound
      audioContextRef.current = playCuttingSound();

      // Animate scissors moving down
      scissorsControls.start({
        top: "100%",
        transition: { duration: CUTTING_DURATION / 1000, ease: "linear" }
      });

      // Animate cut progress
      const startTime = Date.now();
      const animateCut = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / CUTTING_DURATION, 1);
        setCutProgress(progress);

        if (progress < 1) {
          requestAnimationFrame(animateCut);
        } else {
          // Cutting done, now split
          setState("splitting");
          setTimeout(() => {
            setState("hidden");
          }, SPLIT_DURATION);
        }
      };
      requestAnimationFrame(animateCut);
    }
  }, [state, scissorsControls]);

  if (!mounted || state === "hidden") {
    return null;
  }

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 cursor-pointer overflow-hidden"
        style={{ zIndex: 9999 }}
        onClick={handleClick}
      >
        {/* Left half of the paper */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-cream overflow-hidden"
          initial={{ width: "50%", x: 0 }}
          animate={
            state === "splitting"
              ? { x: "-100%", rotateZ: -3 }
              : state === "cutting"
              ? { width: `calc(50% - ${cutProgress * 8}px)` }
              : { width: "50%", x: 0 }
          }
          transition={
            state === "splitting"
              ? { duration: SPLIT_DURATION / 1000, ease: [0.4, 0, 0.2, 1] }
              : { duration: 0.05 }
          }
          style={{ transformOrigin: "left center" }}
        >
          {/* Torn edge - only visible after cutting starts */}
          <motion.div
            className="absolute top-0 right-0 w-6 h-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: state !== "idle" ? 1 : 0 }}
          >
            <svg
              viewBox="0 0 30 100"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <path
                d="M0,0 L20,0 Q15,1 20,2 Q12,3 20,4 Q15,5 20,6 Q12,7 20,8 Q15,9 20,10 Q12,11 20,12 Q15,13 20,14 Q12,15 20,16 Q15,17 20,18 Q12,19 20,20 Q15,21 20,22 Q12,23 20,24 Q15,25 20,26 Q12,27 20,28 Q15,29 20,30 Q12,31 20,32 Q15,33 20,34 Q12,35 20,36 Q15,37 20,38 Q12,39 20,40 Q15,41 20,42 Q12,43 20,44 Q15,45 20,46 Q12,47 20,48 Q15,49 20,50 Q12,51 20,52 Q15,53 20,54 Q12,55 20,56 Q15,57 20,58 Q12,59 20,60 Q15,61 20,62 Q12,63 20,64 Q15,65 20,66 Q12,67 20,68 Q15,69 20,70 Q12,71 20,72 Q15,73 20,74 Q12,75 20,76 Q15,77 20,78 Q12,79 20,80 Q15,81 20,82 Q12,83 20,84 Q15,85 20,86 Q12,87 20,88 Q15,89 20,90 Q12,91 20,92 Q15,93 20,94 Q12,95 20,96 Q15,97 20,98 Q12,99 20,100 L0,100 Z"
                fill="#FDF6E9"
              />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-transparent" />
          </motion.div>

          {/* Content on left half */}
          <div className="absolute inset-0 flex items-center justify-end pr-8">
            <div className="text-right">
              <motion.div
                className="text-5xl sm:text-6xl md:text-8xl font-[family-name:var(--font-special-elite)] text-charcoal leading-none"
                animate={state === "idle" ? { rotate: [-1, 1, -1] } : {}}
                transition={{ duration: 4, repeat: Infinity }}
              >
                SCRAP
              </motion.div>
              <motion.div
                className="text-xl sm:text-2xl text-vintage-red font-[family-name:var(--font-special-elite)] mt-2"
                animate={state === "idle" ? { x: [0, 3, 0] } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ✂️ cut here
              </motion.div>
            </div>
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-8 left-8 text-3xl sm:text-4xl"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📎
          </motion.div>
          <div className="absolute bottom-16 left-8 w-12 h-12 sm:w-16 sm:h-16 bg-tape-pink rotate-6 torn-edge-all" />
          <div className="absolute top-1/4 left-1/4 w-10 h-10 sm:w-12 sm:h-12 bg-tape-yellow -rotate-12" />
          <div className="absolute bottom-1/3 left-1/3 w-8 h-8 bg-sage/40 rotate-3" />
        </motion.div>

        {/* Right half of the paper */}
        <motion.div
          className="absolute top-0 right-0 h-full bg-cream overflow-hidden"
          initial={{ width: "50%", x: 0 }}
          animate={
            state === "splitting"
              ? { x: "100%", rotateZ: 3 }
              : state === "cutting"
              ? { width: `calc(50% - ${cutProgress * 8}px)` }
              : { width: "50%", x: 0 }
          }
          transition={
            state === "splitting"
              ? { duration: SPLIT_DURATION / 1000, ease: [0.4, 0, 0.2, 1] }
              : { duration: 0.05 }
          }
          style={{ transformOrigin: "right center" }}
        >
          {/* Torn edge - only visible after cutting starts */}
          <motion.div
            className="absolute top-0 left-0 w-6 h-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: state !== "idle" ? 1 : 0 }}
          >
            <svg
              viewBox="0 0 30 100"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <path
                d="M30,0 L10,0 Q15,1 10,2 Q18,3 10,4 Q15,5 10,6 Q18,7 10,8 Q15,9 10,10 Q18,11 10,12 Q15,13 10,14 Q18,15 10,16 Q15,17 10,18 Q18,19 10,20 Q15,21 10,22 Q18,23 10,24 Q15,25 10,26 Q18,27 10,28 Q15,29 10,30 Q18,31 10,32 Q15,33 10,34 Q18,35 10,36 Q15,37 10,38 Q18,39 10,40 Q15,41 10,42 Q18,43 10,44 Q15,45 10,46 Q18,47 10,48 Q15,49 10,50 Q18,51 10,52 Q15,53 10,54 Q18,55 10,56 Q15,57 10,58 Q18,59 10,60 Q15,61 10,62 Q18,63 10,64 Q15,65 10,66 Q18,67 10,68 Q15,69 10,70 Q18,71 10,72 Q15,73 10,74 Q18,75 10,76 Q15,77 10,78 Q18,79 10,80 Q15,81 10,82 Q18,83 10,84 Q15,85 10,86 Q18,87 10,88 Q15,89 10,90 Q18,91 10,92 Q15,93 10,94 Q18,95 10,96 Q15,97 10,98 Q18,99 10,100 L30,100 Z"
                fill="#FDF6E9"
              />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
          </motion.div>

          {/* Content on right half */}
          <div className="absolute inset-0 flex items-center justify-start pl-8">
            <div className="text-left">
              <motion.div
                className="text-5xl sm:text-6xl md:text-8xl font-[family-name:var(--font-special-elite)] text-charcoal leading-none"
                animate={state === "idle" ? { rotate: [1, -1, 1] } : {}}
                transition={{ duration: 4, repeat: Infinity }}
              >
                SOCIETY
              </motion.div>
              <motion.div
                className="text-xl sm:text-2xl text-mustard font-[family-name:var(--font-special-elite)] mt-2"
                animate={state === "idle" ? { x: [0, -3, 0] } : {}}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                rotterdam ♥
              </motion.div>
            </div>
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-8 right-8 text-3xl sm:text-4xl"
            animate={{ rotate: [0, -15, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            ⭐
          </motion.div>
          <div className="absolute bottom-16 right-8 w-12 h-12 sm:w-16 sm:h-16 bg-tape-mint -rotate-6 torn-edge-all" />
          <div className="absolute top-1/4 right-1/4 w-10 h-10 sm:w-12 sm:h-12 bg-mustard/50 rotate-12" />
          <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-vintage-red/20 -rotate-6" />
        </motion.div>

        {/* Center dashed line (cut guide) */}
        {state === "idle" && (
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-0 border-l-2 border-dashed border-charcoal/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* Cut line progress indicator */}
        {(state === "cutting" || state === "splitting") && (
          <div
            className="absolute left-1/2 -translate-x-1/2 w-1 bg-transparent top-0"
            style={{ height: `${cutProgress * 100}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal/10 to-transparent" />
          </div>
        )}

        {/* Scissors - animated cutting down */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 z-20"
          initial={{ top: "0%", rotate: 180 }}
          animate={scissorsControls}
          style={{
            top: state === "idle" ? "50%" : undefined,
            translateY: state === "idle" ? "-50%" : "0%"
          }}
        >
          <motion.div
            className="text-4xl sm:text-5xl relative"
            animate={
              state === "idle"
                ? { y: [0, -15, 0] }
                : state === "cutting"
                ? { scale: [1, 1.1, 1] }
                : {}
            }
            transition={{
              duration: state === "cutting" ? 0.15 : 2,
              repeat: state === "idle" || state === "cutting" ? Infinity : 0
            }}
          >
            ✂️
            {/* Cutting sparkle effect */}
            {state === "cutting" && (
              <>
                <motion.span
                  className="absolute -left-2 top-1/2 text-xl text-yellow-400"
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], x: [-5, -15, -5] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                >
                  ✨
                </motion.span>
                <motion.span
                  className="absolute -right-2 top-1/2 text-xl text-yellow-400"
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], x: [5, 15, 5] }}
                  transition={{ duration: 0.3, repeat: Infinity, delay: 0.15 }}
                >
                  ✨
                </motion.span>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Click hint at bottom */}
        {state === "idle" && (
          <motion.div
            className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex flex-col items-center gap-2 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.p
              className="text-charcoal/70 font-[family-name:var(--font-special-elite)] text-lg sm:text-xl tracking-widest"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✂️ click to cut ✂️
            </motion.p>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
