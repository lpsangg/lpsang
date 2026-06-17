import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { EASE, MaskReveal } from "./motion-primitives";

const notes = [
  {
    k: "01",
    t: "Ship the whole thing",
    d: "A model isn't a product until it's behind an API, in a UI, monitored, and useful. End-to-end is the only mode worth practising.",
  },
  {
    k: "02",
    t: "Product mindset first",
    d: "Start from the user, not the model. The right architecture is the one that makes the user's job feel easier the first time they try it.",
  },
  {
    k: "03",
    t: "Optimize what matters",
    d: "Accuracy on a benchmark is a hypothesis. Production latency, factory accuracy, and team adoption are the real scores.",
  },
  {
    k: "04",
    t: "Automate the boring",
    d: "CI/CD, tests, eval harnesses, dashboards. The interesting work happens when the boring work runs itself.",
  },
  {
    k: "05",
    t: "Learn in public",
    d: "Write the post, give the talk, share the repo. Teaching is the fastest way to find the gaps in your own understanding.",
  },
];

function HorizontalRailCard({ n, i }: { n: typeof notes[0]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for coordinate updates
  const springX = useSpring(x, { damping: 22, stiffness: 160 });
  const springY = useSpring(y, { damping: 22, stiffness: 160 });

  // Tilt rotation angles (max 6deg)
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  // Opposite translation for background offset frame
  const bgX = useTransform(springX, [-0.5, 0.5], [-7, 7]);
  const bgY = useTransform(springY, [-0.5, 0.5], [-7, 7]);

  // Glow position percentage coordinates
  const glowBg = useTransform([springX, springY], ([sx, sy]) => {
    const px = ((sx as number) + 0.5) * 100;
    const py = ((sy as number) + 0.5) * 100;
    return `radial-gradient(circle at ${px}% ${py}%, hsl(var(--foreground) / 0.055), transparent 65%)`;
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(normX);
    y.set(normY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="shrink-0 w-[82vw] md:w-[44vw] h-[60vh] relative group perspective-1000">
      {/* Sibling offset background frame - moves in opposition */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 border border-foreground/10 dark:border-foreground/20 rounded-lg pointer-events-none group-hover:translate-x-3.5 group-hover:translate-y-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      />

      {/* Main Card */}
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ y: -4, x: -4 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="size-full border border-border bg-card p-8 md:p-12 flex flex-col justify-between relative overflow-hidden rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.02)] transition-shadow duration-500 group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.04)] dark:group-hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.01)] cursor-grab active:cursor-grabbing"
      >
        {/* Soft ambient hover glow following the cursor */}
        <motion.div
          style={{ background: glowBg }}
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        />

        {/* Giant background number */}
        <span className="absolute right-6 bottom-0 font-serif italic text-[14rem] md:text-[18rem] leading-none text-foreground/[0.03] dark:text-foreground/[0.02] pointer-events-none select-none translate-y-6 md:translate-y-10 group-hover:text-foreground/[0.05] transition-colors duration-500">
          {n.k}
        </span>

        {/* Top Row: Index and Step Progress */}
        <div className="flex items-center justify-between text-xs tracking-[0.15em] uppercase text-muted-foreground/80 border-b border-border/40 pb-4">
          <span className="font-mono font-medium">{n.k}</span>
          <span className="font-mono text-[10px]">
            {i + 1} &middot; {notes.length}
          </span>
        </div>

        {/* Core Content */}
        <div className="relative z-10 my-auto pl-6 border-l border-foreground/15 group-hover:border-foreground/30 transition-colors duration-500">
          <h3 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight mb-4 text-foreground group-hover:text-foreground/90 transition-colors duration-300">
            {n.t}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground/90 leading-relaxed max-w-md">
            {n.d}
          </p>
        </div>

        {/* Bottom Row: Accent label */}
        <div className="flex items-center justify-between pt-4 border-t border-border/40 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
          <span>Working Principle</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-foreground font-semibold">
            Active &rarr;
          </span>
        </div>
      </motion.article>
    </div>
  );
}

export function HorizontalRail() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative h-[420vh] border-t border-border/60" id="principles">
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        <div className="mx-auto max-w-7xl w-full px-6 md:px-10 pt-28 pb-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs tracking-wide uppercase text-muted-foreground mb-4">Section / 04</p>
              <MaskReveal
                text="How I work."
                className="font-serif text-5xl md:text-7xl tracking-tight leading-none block"
              />
            </div>
            <span className="text-sm text-muted-foreground hidden md:block">Five principles</span>
          </div>
          <div className="mt-8 h-px bg-border relative overflow-hidden">
            <motion.div style={{ width: progress }} className="absolute inset-y-0 left-0 bg-foreground" />
          </div>
        </div>
        <motion.div style={{ x }} className="flex gap-6 md:gap-10 pl-6 md:pl-10 flex-1 items-center will-change-transform">
          {notes.map((n, i) => (
            <HorizontalRailCard key={n.k} n={n} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}