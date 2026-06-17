import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Magnetic } from "./motion-primitives";

const socials = [
  { label: "GitHub", href: "https://github.com/lpsangg" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lpsang/" },
  { label: "Email", href: "mailto:lpsang.nas@gmail.com" },
];

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="contact" ref={ref} className="relative border-t border-border/60 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-40 md:py-56 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs tracking-wide uppercase text-muted-foreground mb-10 flex items-center justify-center gap-3"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 opacity-75 animate-ping" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          Open to AI/ML opportunities — 2026
        </motion.p>

        <motion.h2
          style={{ y }}
          className="font-serif text-[clamp(3rem,13vw,13rem)] leading-[0.9] tracking-tight text-balance"
        >
          Let's build
          <br />
          <span className="italic text-muted-foreground">something useful.</span>
        </motion.h2>

        <Magnetic strength={0.25}>
          <motion.a
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            href="mailto:lpsang.nas@gmail.com"
            data-cursor-text="HELLO"
            className="group mt-16 inline-flex items-center gap-4 border border-foreground/25 rounded-full px-8 py-4 bg-transparent relative overflow-hidden transition-all duration-500 hover:border-foreground hover:scale-[1.03] hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_30px_-10px_rgba(255,255,255,0.02)]"
          >
            {/* Sliding background fill */}
            <div className="absolute inset-0 bg-foreground scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
            
            {/* Text content */}
            <span className="relative z-10 text-foreground group-hover:text-background transition-colors duration-500 font-serif italic text-base sm:text-2xl md:text-3xl tracking-wide select-all">
              lpsang.nas@gmail.com
            </span>

            {/* Flying arrow loop */}
            <span className="relative overflow-hidden flex items-center justify-center size-5 z-10 text-foreground group-hover:text-background transition-colors duration-500">
              <span className="absolute transition-transform duration-500 group-hover:translate-x-6 group-hover:-translate-y-6">
                →
              </span>
              <span className="absolute -translate-x-6 translate-y-6 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0">
                →
              </span>
            </span>
          </motion.a>
        </Magnetic>
      </div>

      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-8 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Le Phuoc Sang (Nas)</span>
          <div className="flex gap-4">
            {socials.map((s) => (
              <Magnetic key={s.label} strength={0.35}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-foreground transition-colors p-2 inline-block relative group"
                >
                  {s.label}
                  <span className="absolute bottom-1 left-2 right-2 h-px bg-foreground origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                </a>
              </Magnetic>
            ))}
          </div>
          <span>Ho Chi Minh City · 10.76°N</span>
        </div>
      </footer>
    </section>
  );
}