import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const EASE = [0.76, 0, 0.24, 1];

const words = [
  "Hello",
  "Computer Vision",
  "Generative AI",
  "Time Series",
  "MLOps",
  "End-to-End",
  "Le Phuoc Sang"
];

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Disable scrolling when preloader is visible
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            document.body.style.overflow = "";
          }, 900);
          return 100;
        }
        // Smaller steps and larger interval for a more readable, premium pace
        const step = Math.floor(Math.random() * 3) + 2;
        return Math.min(prev + step, 100);
      });
    }, 110);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  const wordIndex = Math.min(
    Math.floor((progress / 100) * words.length),
    words.length - 1
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col justify-between p-8 md:p-12 select-none pointer-events-none"
        >
          {/* Liquid SVG Curtain Overlay */}
          <svg 
            className="absolute inset-0 size-full fill-background pointer-events-none" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
          >
            <motion.path
              initial={{ d: "M0 0 L100 0 L100 100 Q50 100 0 100 Z" }}
              exit={{
                d: [
                  "M0 0 L100 0 L100 100 Q50 100 0 100 Z",
                  "M0 0 L100 0 L100 100 Q50 65 0 100 Z",
                  "M0 0 L100 0 L100 0 Q50 0 0 0 Z"
                ],
                transition: { duration: 0.9, times: [0, 0.35, 1], ease: EASE }
              }}
            />
          </svg>

          {/* subtle grain overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            }}
            aria-hidden
          />

          {/* Info elements - fades out slightly before the curtain snaps up */}
          <motion.div
            exit={{ opacity: 0, y: -40, transition: { duration: 0.4, ease: "easeIn" } }}
            className="flex-1 flex flex-col justify-between z-10"
          >
            {/* Top row */}
            <div className="flex items-center justify-between text-xs tracking-[0.2em] uppercase text-muted-foreground/80 font-mono">
              <span>Le Phuoc Sang</span>
              <span>AI/ML Portfolio &copy; 2026</span>
            </div>

            {/* Center word morph with slide transition */}
            <div className="my-auto text-center flex flex-col justify-center items-center h-40">
              <div className="h-16 w-full relative overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={words[wordIndex]}
                    initial={{ y: 32, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -32, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute font-serif text-[clamp(2rem,6vw,5rem)] leading-none italic text-foreground whitespace-nowrap"
                  >
                    {words[wordIndex]}.
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 font-mono mt-6">
                <span>Initializing</span>
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/55 animate-ping" />
              </div>
            </div>

            {/* Bottom row: Status and percentage counter */}
            <div className="flex items-end justify-between">
              <span className="text-xs tracking-widest uppercase text-muted-foreground/60 font-mono">
                End-to-End Systems
              </span>
              <div className="font-serif italic text-6xl md:text-8xl leading-none text-foreground/90 tabular-nums">
                {String(progress).padStart(3, "0")}%
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
