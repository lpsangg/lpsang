import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "./motion-primitives";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";

export function Nav() {
  const { theme, toggle } = useTheme();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5"
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between backdrop-blur-sm">
        <a href="#top" className="text-sm tracking-tight font-medium">
          Le Phuoc Sang<span className="text-muted-foreground"> — Nas</span>
        </a>
        <nav 
          onMouseLeave={() => setHoveredIdx(null)}
          className="hidden md:flex items-center gap-1 text-sm text-muted-foreground relative px-2 py-1 rounded-full border border-border bg-background/55 backdrop-blur-md"
        >
          {[
            ["About", "#about"],
            ["Experience", "#experience"],
            ["Work", "#work"],
            ["Contact", "#contact"],
          ].map(([label, href], idx) => (
            <a
              key={href}
              href={href}
              onMouseEnter={() => setHoveredIdx(idx)}
              className="relative px-3.5 py-1 hover:text-foreground transition-colors duration-300 z-10 select-none"
            >
              {label}
              {hoveredIdx === idx && (
                <motion.div
                  layoutId="nav-hover-pill"
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  className="absolute inset-0 bg-foreground/5 dark:bg-foreground/10 rounded-full -z-10"
                />
              )}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="relative size-9 rounded-full border border-foreground/15 grid place-items-center hover:bg-foreground hover:text-background transition-colors duration-500 overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ y: 16, opacity: 0, rotate: -45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -16, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex"
              >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </motion.span>
            </AnimatePresence>
          </button>
          <Magnetic>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-sm border border-foreground/15 rounded-full px-4 py-1.5 hover:bg-foreground hover:text-background transition-colors duration-500"
            >
              Available for work
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 opacity-75 animate-ping" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </span>
            </a>
          </Magnetic>
        </div>
      </div>
    </motion.header>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.5A9 9 0 1 1 11.5 3a7 7 0 0 0 9.5 9.5z" />
    </svg>
  );
}