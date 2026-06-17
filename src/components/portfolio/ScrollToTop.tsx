import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export function ScrollToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Monitor scroll height, show button if user scrolled past 400px
  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 400);
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : [0.65, 1, 0.65], // Gentle pulsing opacity when not hovered
            scale: 1, 
            y: 0 
          }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{
            opacity: isHovered 
              ? { duration: 0.2 } 
              : { repeat: Infinity, duration: 2.4, ease: "easeInOut" },
            scale: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            y: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
          }}
          data-cursor-text="TOP"
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 size-11 md:size-12 rounded-full border border-border bg-background/80 backdrop-blur-md text-foreground shadow-sm hover:shadow-md hover:border-foreground hover:bg-foreground hover:text-background transition-colors duration-300 flex items-center justify-center cursor-pointer select-none pointer-events-auto"
          aria-label="Scroll to top"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.0"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
