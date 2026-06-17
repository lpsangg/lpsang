import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE, Magnetic } from "./motion-primitives";

const line1 = ["Le", "Phuoc", "Sang."];
const line2 = ["AI/ML", "Engineer"];
const rotating = ["Computer Vision", "GenAI Systems", "MLOps", "End-to-End ML"];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<{ stimulate?: () => void; jiggle?: () => void; grow?: () => void }>({});
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(6px)"]);

  const [rotIdx, setRotIdx] = useState(0);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = ref.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = section.offsetWidth);
    let height = (canvas.height = section.offsetHeight);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      pulseGlow?: number;
    }

    interface Pulse {
      x: number;
      y?: number;
      type: "backprop" | "click" | "grow";
      speed: number;
      radius: number;
      maxRadius: number;
      color: string;
    }

    const particles: Particle[] = [];
    const pulses: Pulse[] = [];

    const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
    const connectionDistance = 115;
    const mouse = { x: -1000, y: -1000, active: false };

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.8,
      });
    }

    // Expose control actions through the Ref
    controlsRef.current = {
      stimulate: () => {
        pulses.push({
          x: -100,
          type: "backprop",
          speed: 6.5,
          radius: 0,
          maxRadius: width + 200,
          color: "rgba(217, 119, 6, 0.8)", // Gold/amber wave
        });
      },
      jiggle: () => {
        particles.forEach((p) => {
          const angle = Math.random() * Math.PI * 2;
          const force = Math.random() * 3.5 + 2.5;
          p.vx = Math.cos(angle) * force;
          p.vy = Math.sin(angle) * force;
        });
      },
      grow: () => {
        const px = Math.random() * width;
        const py = Math.random() * height;
        particles.push({
          x: px,
          y: py,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          r: Math.random() * 2.0 + 1.2,
          pulseGlow: 1.0,
        });
        pulses.push({
          x: px,
          y: py,
          type: "grow",
          speed: 3.5,
          radius: 0,
          maxRadius: 120,
          color: "rgba(16, 185, 129, 0.7)", // Emerald green wave
        });
      },
    };

    const handleResize = () => {
      if (!canvas || !section) return;
      width = canvas.width = section.offsetWidth;
      height = canvas.height = section.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    const handleSectionClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a")) return; // skip ripples on controls/links

      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const isDark = document.documentElement.classList.contains("dark");
      pulses.push({
        x: clickX,
        y: clickY,
        type: "click",
        speed: 4,
        radius: 0,
        maxRadius: 150,
        color: isDark ? "rgba(244, 240, 230, 0.45)" : "rgba(24, 24, 27, 0.18)",
      });
    };

    window.addEventListener("resize", handleResize);
    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);
    section.addEventListener("click", handleSectionClick);

    const getColors = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return {
        particle: isDark ? "rgba(244, 240, 230, 0.15)" : "rgba(24, 24, 27, 0.07)",
        line: isDark ? "rgba(244, 240, 230, 0.05)" : "rgba(24, 24, 27, 0.03)",
        mouseLine: isDark ? "rgba(244, 240, 230, 0.12)" : "rgba(24, 24, 27, 0.05)",
      };
    };

    let colors = getColors();

    const observer = new MutationObserver(() => {
      colors = getColors();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Update active pulses
      for (let pIdx = pulses.length - 1; pIdx >= 0; pIdx--) {
        const pulse = pulses[pIdx];
        if (pulse.type === "backprop") {
          pulse.x += pulse.speed;
          if (pulse.x > width + 200) pulses.splice(pIdx, 1);
        } else {
          pulse.radius += pulse.speed;
          if (pulse.radius > pulse.maxRadius) pulses.splice(pIdx, 1);
        }
      }

      // Check highlights and apply click forces
      const pHighlights = particles.map((p) => {
        let isHighlighted = false;
        let highlightColor = "rgba(234, 179, 8, 0.8)";
        let glowRatio = 0;

        for (const pulse of pulses) {
          if (pulse.type === "backprop") {
            const dist = Math.abs(p.x - pulse.x);
            if (dist < 80) {
              isHighlighted = true;
              glowRatio = Math.max(glowRatio, 1 - dist / 80);
              highlightColor = pulse.color;
            }
          } else {
            const dist = Math.hypot(p.x - pulse.x, p.y - (pulse.y ?? 0));
            const distToFront = Math.abs(dist - pulse.radius);
            if (distToFront < 40) {
              isHighlighted = true;
              glowRatio = Math.max(glowRatio, 1 - distToFront / 40);
              highlightColor = pulse.color;
            }
          }
        }

        // Click pulse pushes nearby particles
        for (const pulse of pulses) {
          if (pulse.type === "click") {
            const dist = Math.hypot(p.x - pulse.x, p.y - (pulse.y ?? 0));
            if (dist > 0 && dist < pulse.radius && dist < 160) {
              const force = (1 - dist / 160) * 0.18;
              const angle = Math.atan2(p.y - (pulse.y ?? 0), p.x - pulse.x);
              p.vx += Math.cos(angle) * force;
              p.vy += Math.sin(angle) * force;
            }
          }
        }

        return { isHighlighted, highlightColor, glowRatio };
      });

      // Update positions and draw elements
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const h1 = pHighlights[i];

        // Apply mouse repulsion force (pushes nodes away from cursor)
        if (mouse.active) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const repulsionRadius = 130;
          if (dist < repulsionRadius && dist > 0) {
            const force = (1 - dist / repulsionRadius) * 0.5;
            p1.vx += (dx / dist) * force * 0.4;
            p1.vy += (dy / dist) * force * 0.4;
          }
        }

        p1.x += p1.vx;
        p1.y += p1.vy;

        // Apply friction/drag to stabilize jiggled, clicked, or pushed nodes
        const currentSpeed = Math.hypot(p1.vx, p1.vy);
        const normalMax = 0.35;
        if (currentSpeed > normalMax) {
          p1.vx *= 0.93; // slightly stronger friction to stabilize faster pushes
          p1.vy *= 0.93;
        }

        // Boundary constraints
        if (p1.x < 0) { p1.x = 0; p1.vx *= -1; }
        if (p1.x > width) { p1.x = width; p1.vx *= -1; }
        if (p1.y < 0) { p1.y = 0; p1.vy *= -1; }
        if (p1.y > height) { p1.y = height; p1.vy *= -1; }

        let drawRadius = p1.r;
        let drawColor = colors.particle;

        if (h1.isHighlighted) {
          drawRadius = p1.r * (1 + h1.glowRatio * 1.6);
          drawColor = h1.highlightColor;

          // Drawing localized glowing halo
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, drawRadius * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = h1.highlightColor.replace(/[\d.]+\)$/, "0.15)");
          ctx.fill();
        }

        // Fade effect for freshly spawned nodes
        if (p1.pulseGlow !== undefined && p1.pulseGlow > 0) {
          p1.pulseGlow -= 0.012;
          if (p1.pulseGlow < 0) p1.pulseGlow = 0;
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, drawRadius * (1 + p1.pulseGlow * 3.5), 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(16, 185, 129, " + (p1.pulseGlow * 0.45) + ")";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, drawRadius, 0, Math.PI * 2);
        ctx.fillStyle = drawColor;
        ctx.fill();

        // Draw connections/synapses
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const h2 = pHighlights[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            if (h1.isHighlighted && h2.isHighlighted) {
              // Highlight the synapse if both connecting nodes are firing
              ctx.strokeStyle = h1.highlightColor.replace(/[\d.]+\)$/, "0.26)");
              ctx.lineWidth = (1 - dist / connectionDistance) * 1.5;
            } else {
              ctx.strokeStyle = colors.line;
              ctx.lineWidth = (1 - dist / connectionDistance) * 0.7;
            }
            ctx.stroke();
          }
        }

        if (mouse.active) {
          const mouseDist = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
          if (mouseDist < connectionDistance * 1.5) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = colors.mouseLine;
            ctx.lineWidth = (1 - mouseDist / (connectionDistance * 1.5)) * 1.1;
            ctx.stroke();
          }
        }
      }

      // Draw active ripples
      for (const pulse of pulses) {
        if (pulse.type !== "backprop") {
          ctx.beginPath();
          ctx.arc(pulse.x, pulse.y ?? 0, pulse.radius, 0, Math.PI * 2);
          ctx.strokeStyle = pulse.color.replace(/[\d.]+\)$/, (1 - pulse.radius / pulse.maxRadius) * 0.22 + ")");
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
      section.removeEventListener("click", handleSectionClick);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const r = setInterval(() => setRotIdx((i) => (i + 1) % rotating.length), 2400);
    const fmt = () =>
      new Date().toLocaleTimeString("en-GB", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "2-digit",
        minute: "2-digit",
      });
    setTime(fmt());
    const t = setInterval(() => setTime(fmt()), 30_000);
    return () => {
      clearInterval(r);
      clearInterval(t);
    };
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-between px-6 md:px-10 pt-32 pb-10 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none -z-10"
      />
      {/* Floating Network Simulator Controls */}
      <div className="absolute top-24 md:top-28 right-6 md:right-10 z-20 flex flex-col items-end gap-1.5 pointer-events-auto select-none">
        <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-muted-foreground/60">
          Neural Net Stimulus
        </span>
        <div className="flex gap-2 mt-0.5">
          <button
            type="button"
            onClick={() => controlsRef.current.stimulate?.()}
            className="text-[10px] font-mono tracking-widest uppercase border border-border bg-background/80 hover:bg-foreground hover:text-background transition-all duration-300 rounded-full px-3.5 py-1 text-muted-foreground hover:text-foreground cursor-pointer hover:border-foreground"
            title="Trigger a backpropagation pulse wave"
          >
            Stimulate
          </button>
          <button
            type="button"
            onClick={() => controlsRef.current.jiggle?.()}
            className="text-[10px] font-mono tracking-widest uppercase border border-border bg-background/80 hover:bg-foreground hover:text-background transition-all duration-300 rounded-full px-3.5 py-1 text-muted-foreground hover:text-foreground cursor-pointer hover:border-foreground"
            title="Inject physics noise to scatter nodes"
          >
            Jiggle
          </button>
          <button
            type="button"
            onClick={() => controlsRef.current.grow?.()}
            className="text-[10px] font-mono tracking-widest uppercase border border-border bg-background/80 hover:bg-foreground hover:text-background transition-all duration-300 rounded-full px-3.5 py-1 text-muted-foreground hover:text-foreground cursor-pointer hover:border-foreground"
            title="Spawn a new neural node"
          >
            Grow
          </button>
        </div>
      </div>
      {/* subtle grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
        aria-hidden
      />
      {/* slow gradient orb */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="pointer-events-none absolute -top-40 right-[-10%] w-[55vmin] h-[55vmin] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, hsl(var(--foreground) / 0.06), transparent 60%)",
        }}
      />
      <motion.div
        style={{ y, opacity, filter: blur }}
        className="mx-auto max-w-7xl w-full flex-1 flex flex-col justify-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          className="text-sm text-muted-foreground mb-10 flex items-center gap-3"
        >
          <span className="inline-block h-px w-8 bg-foreground/30" />
          Building End-to-End AI Solutions · Ho Chi Minh City, Vietnam
        </motion.p>

        <h1 className="font-serif text-[clamp(3rem,11vw,11rem)] leading-[0.92] tracking-tight text-balance">
          <span className="block">
            {line1.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
                <motion.span
                  initial={{ y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: EASE, delay: 0.45 + i * 0.08 }}
                  className="inline-block will-change-transform"
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </span>
          <span className="block text-muted-foreground italic">
            {line2.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
                <motion.span
                  initial={{ y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: EASE, delay: 0.75 + i * 0.08 }}
                  className="inline-block will-change-transform"
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: EASE }}
          className="mt-8 flex items-center gap-3 text-sm md:text-base text-muted-foreground"
        >
          <span className="text-foreground/60">Focused on</span>
          <span className="relative inline-flex h-7 overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={rotating[rotIdx]}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="font-serif italic text-foreground whitespace-nowrap"
              >
                {rotating[rotIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-12 gap-8 items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease: EASE }}
            className="md:col-span-6 max-w-md text-base md:text-lg text-foreground/75 leading-relaxed"
          >
            Computer Science student at Can Tho University of Technology with a
            product mindset and a focus on machine learning model optimization,
            GenAI, and shipping reliable AI workflows.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: EASE }}
            className="md:col-span-6 md:justify-self-end flex items-center gap-4"
          >
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex items-center gap-3 bg-foreground text-background rounded-full pl-5 pr-2 py-2 text-sm transition-colors hover:bg-foreground/85"
              >
                View selected work
                <span className="size-7 rounded-full bg-background/15 grid place-items-center transition-transform duration-500 group-hover:rotate-45">
                  ↗
                </span>
              </a>
            </Magnetic>
            <a
              href="mailto:lpsang.nas@gmail.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors story-link"
            >
              Get in touch
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="mx-auto max-w-7xl w-full flex flex-wrap items-end justify-between gap-4 text-xs text-muted-foreground tracking-wide uppercase"
      >
        <span className="inline-flex items-center gap-3">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-600/60 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
          </span>
          {time ? `Ho Chi Minh City · ${time}` : "Ho Chi Minh City"}
        </span>
        <span className="hidden sm:inline">GPA 3.49 / 4.0 · CTUET</span>
        <span className="hidden md:flex items-center gap-3">
          Scroll
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            ↓
          </motion.span>
        </span>
      </motion.div>
    </section>
  );
}