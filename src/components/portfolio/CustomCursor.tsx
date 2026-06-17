import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const sy = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse), and when motion is allowed.
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.setAttribute("data-cursor", "on");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest(
        'a, button, [role="button"], [data-cursor="link"], input, textarea, select, label',
      );
      setHover(interactive);

      const textTarget = target?.closest("[data-cursor-text]") as HTMLElement | null;
      const text = textTarget ? textTarget.getAttribute("data-cursor-text") : null;
      setCursorText(text);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.removeAttribute("data-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="fixed top-0 left-0 z-[200] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <motion.div
          animate={{
            width: cursorText ? 80 : hover ? 48 : 28,
            height: cursorText ? 80 : hover ? 48 : 28,
            opacity: hover ? 0.65 : 0.7,
            scale: pressed ? 0.85 : 1,
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-full border border-white flex items-center justify-center relative overflow-hidden"
        >
          <AnimatePresence>
            {cursorText && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="text-[9px] font-sans font-semibold tracking-[0.18em] text-white uppercase text-center select-none whitespace-nowrap pl-[0.18em]"
              >
                {cursorText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="fixed top-0 left-0 z-[200] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <motion.div 
          animate={{
            scale: cursorText ? 0 : 1,
            opacity: cursorText ? 0 : 1,
          }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="size-1.5 rounded-full bg-white" 
        />
      </motion.div>
    </>
  );
}