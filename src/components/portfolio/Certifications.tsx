import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { EASE, MaskReveal } from "./motion-primitives";
import { useState, useRef } from "react";
import { Lightbox } from "./Lightbox";

import aiCert from "@/assets/portfolio/Coursera UJW4YG3NV3HD-1.png";
import promptingCert from "@/assets/portfolio/Coursera 8ZFI6MR6JYYK-1.png";
import agileCert from "@/assets/portfolio/Coursera ZK36NDAF5DWD-1.png";
import foundationsCert from "@/assets/portfolio/Coursera JFC9KLJ27H6N-1.png";

type CertIcon = "ai" | "prompt" | "agile" | "foundations";

const certs: {
  title: string;
  issuer: string;
  date: string;
  topics: string[];
  image: string;
  verifyUrl: string;
  icon: CertIcon;
}[] = [
  {
    title: "Google AI Essentials",
    issuer: "Google",
    date: "Aug 4, 2025",
    topics: ["Introduction to AI", "AI Productivity", "Prompting Art", "Responsible AI"],
    image: aiCert,
    verifyUrl: "https://coursera.org/verify/specialization/UJW4YG3NV3HD",
    icon: "ai",
  },
  {
    title: "Google Prompting Essentials",
    issuer: "Google",
    date: "Aug 5, 2025",
    topics: ["Prompt Engineering", "Work Automation", "Data Analysis", "AI Partners"],
    image: promptingCert,
    verifyUrl: "https://coursera.org/verify/specialization/8ZFI6MR6JYYK",
    icon: "prompt",
  },
  {
    title: "Google Agile Essentials",
    issuer: "Google",
    date: "Jul 30, 2025",
    topics: ["Agile Frameworks", "Scrum", "Kanban", "Team Delivery"],
    image: agileCert,
    verifyUrl: "https://coursera.org/verify/ZK36NDAF5DWD",
    icon: "agile",
  },
  {
    title: "Foundations of Project Management",
    issuer: "Google",
    date: "Apr 3, 2024",
    topics: ["Project Planning", "Execution", "Stakeholders", "Agile Fundamentals"],
    image: foundationsCert,
    verifyUrl: "https://coursera.org/verify/JFC9KLJ27H6N",
    icon: "foundations",
  },
];

/* Subtle Google "G" mark (monochrome, warm-paper friendly). */
function GoogleMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.6 12.227c0-.709-.064-1.39-.182-2.045H12v3.868h5.382a4.6 4.6 0 0 1-2 3.018v2.51h3.232c1.891-1.742 2.986-4.305 2.986-7.351z"
        opacity=".55"
      />
      <path
        fill="currentColor"
        d="M12 22c2.7 0 4.964-.895 6.614-2.422l-3.232-2.51c-.896.6-2.04.955-3.382.955-2.6 0-4.804-1.755-5.59-4.115H3.073v2.59A9.997 9.997 0 0 0 12 22z"
        opacity=".75"
      />
      <path
        fill="currentColor"
        d="M6.41 13.908A6.01 6.01 0 0 1 6.09 12c0-.664.114-1.31.32-1.908V7.502H3.073A9.997 9.997 0 0 0 2 12c0 1.614.386 3.14 1.073 4.498l3.337-2.59z"
        opacity=".4"
      />
      <path
        fill="currentColor"
        d="M12 5.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C16.96 2.992 14.695 2 12 2A9.997 9.997 0 0 0 3.073 7.502l3.337 2.59C7.195 7.732 9.4 5.977 12 5.977z"
      />
    </svg>
  );
}

/* Per-cert decorative SVG drawn into the preview area. */
function CertIconArt({ kind }: { kind: CertIcon }) {
  const common = "w-24 h-24 text-foreground/80";
  switch (kind) {
    case "ai":
      return (
        <svg viewBox="0 0 64 64" className={common} fill="none" stroke="currentColor" strokeWidth="1.2">
          <motion.path
            d="M32 8 L36 26 L54 30 L36 34 L32 52 L28 34 L10 30 L28 26 Z"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: EASE }}
          />
          <motion.circle
            cx="32" cy="30" r="3" fill="currentColor"
            initial={{ scale: 0 }} whileInView={{ scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 1, ease: EASE }}
          />
        </svg>
      );
    case "prompt":
      return (
        <svg viewBox="0 0 64 64" className={common} fill="none" stroke="currentColor" strokeWidth="1.2">
          <motion.rect
            x="10" y="14" width="44" height="28" rx="4"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true }} transition={{ duration: 1.4, ease: EASE }}
          />
          <path d="M22 50 L28 42 L36 42 Z" fill="currentColor" stroke="none" />
          <motion.line x1="18" y1="24" x2="46" y2="24"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          />
          <motion.line x1="18" y1="32" x2="38" y2="32"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          />
        </svg>
      );
    case "agile":
      return (
        <svg viewBox="0 0 64 64" className={common} fill="none" stroke="currentColor" strokeWidth="1.2">
          {[0, 1, 2].map((col) => (
            <g key={col}>
              <rect x={8 + col * 18} y={10} width={14} height={44} rx="2" />
              {[0, 1, 2].map((row) => (
                <motion.rect
                  key={row}
                  x={10 + col * 18} y={14 + row * 13} width={10} height={9} rx="1"
                  fill="currentColor" stroke="none" opacity={0.15 + row * 0.2}
                  initial={{ y: 14 + row * 13 - 4, opacity: 0 }}
                  whileInView={{ y: 14 + row * 13, opacity: 0.15 + row * 0.2 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + col * 0.15 + row * 0.08, ease: EASE }}
                />
              ))}
            </g>
          ))}
        </svg>
      );
    case "foundations":
      return (
        <svg viewBox="0 0 64 64" className={common} fill="none" stroke="currentColor" strokeWidth="1.2">
          <motion.circle cx="32" cy="32" r="22"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true }} transition={{ duration: 1.4, ease: EASE }}
          />
          <motion.circle cx="32" cy="32" r="13"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
          />
          <motion.circle cx="32" cy="32" r="4" fill="currentColor" stroke="none"
            initial={{ scale: 0 }} whileInView={{ scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.1, ease: EASE }}
          />
        </svg>
      );
  }
}

/* Slowly rotating circular seal with curved text + animated check. */
function VerifiedSeal() {
  return (
    <div className="absolute -top-5 -right-5 md:-top-6 md:-right-6 size-20 md:size-24">
      <motion.svg
        viewBox="0 0 100 100"
        className="size-full text-foreground"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path
            id="sealCircle"
            d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
          />
        </defs>
        <circle cx="50" cy="50" r="44" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 3" />
        <text fill="currentColor" fontSize="8.5" letterSpacing="2.4" style={{ fontFamily: "var(--font-sans)" }}>
          <textPath href="#sealCircle" startOffset="0">
            VERIFIED · CREDENTIAL · ISSUED · BY · GOOGLE ·
          </textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-foreground">
          <motion.path
            d="M5 12.5 L10 17.5 L19 7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          />
        </svg>
      </div>
    </div>
  );
}

/* CertCard component that tracks mouse coordinates and coordinates tilt + spotlight glow */
function CertCard({
  c,
  i,
  setOpen,
}: {
  c: typeof certs[0];
  i: number;
  setOpen: (open: { src: string; alt: string; caption?: string } | null) => void;
}) {
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
  const bgX = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const bgY = useTransform(springY, [-0.5, 0.5], [-6, 6]);

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
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
      className="group relative perspective-1000"
    >
      {/* Sibling offset background frame - moves in opposition */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 border border-foreground/10 dark:border-foreground/20 rounded-xl pointer-events-none group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      />

      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ y: -3, x: -3 }}
        transition={{ duration: 0.5, ease: EASE }}
        data-cursor-text={c.image ? "ZOOM" : "CERT"}
        className="relative rounded-xl border border-border bg-card/45 transition-all duration-500 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.02)] group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.04)] dark:group-hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.01)]"
      >
        {/* Spotlight glow following the cursor */}
        <motion.div
          style={{ background: glowBg }}
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        />

        {i === 0 && <VerifiedSeal />}
        <button
          type="button"
          onClick={() =>
            c.image &&
            setOpen({ src: c.image, alt: `${c.title} certificate`, caption: `${c.issuer} · ${c.date}` })
          }
          className={`relative block w-full aspect-[4/3] bg-muted overflow-hidden border-b border-border/60 rounded-t-xl text-left ${
            c.image ? "cursor-zoom-in" : "cursor-default"
          }`}
          aria-label={c.image ? `View ${c.title} certificate` : c.title}
        >
          {c.image ? (
            <img
              src={c.image}
              alt={`${c.title} certificate`}
              loading="lazy"
              className="size-full object-contain bg-white p-1.5 transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <>
              {/* subtle dot grid */}
              <div
                className="absolute inset-0 opacity-[0.5]"
                style={{
                  backgroundImage:
                    "radial-gradient(currentColor 0.6px, transparent 0.6px)",
                  backgroundSize: "14px 14px",
                  color: "hsl(var(--muted-foreground) / 0.25)",
                }}
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-transparent to-muted/60" />
              <div className="relative size-full flex flex-col items-center justify-center text-center px-8">
                <CertIconArt kind={c.icon} />
                <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Credential · {String(i + 1).padStart(2, "0")} / 04
                </p>
              </div>
              {/* hover shine sweep */}
              <div
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[420%] transition-all duration-[1400ms] ease-out"
                aria-hidden
              />
            </>
          )}
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full bg-background/80 backdrop-blur border border-border/60 text-muted-foreground">
            <GoogleMark className="w-3 h-3 text-foreground" />
            {c.issuer}
          </span>
          {c.image && (
            <span className="absolute bottom-4 right-4 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-background/80 backdrop-blur border border-border/60 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              View ↗
            </span>
          )}
        </button>
        <div className="p-6 md:p-7">
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <h3 className="font-serif text-2xl md:text-[28px] tracking-tight leading-[1.1]">
              {c.title}
            </h3>
            <span className="text-xs text-muted-foreground tabular-nums shrink-0">
              {c.date}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {c.topics.map((t) => (
              <span
                key={t}
                className="text-[11px] px-2.5 py-1 rounded-full border border-border/70 text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            {c.verifyUrl ? (
              <a
                href={c.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs inline-flex items-center gap-1.5 text-foreground border-b border-foreground/40 hover:border-foreground transition-colors"
              >
                Verify credential
                <motion.span
                  aria-hidden
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  →
                </motion.span>
              </a>
            ) : (
              <span className="text-xs text-muted-foreground/70">Credential on file</span>
            )}
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-foreground/40 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-foreground" />
              </span>
              Verified
            </span>
          </div>
        </div>
      </motion.article>
    </motion.li>
  );
}

export function Certifications() {
  const [open, setOpen] = useState<{ src: string; alt: string; caption?: string } | null>(null);
  return (
    <section id="certifications" className="border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 md:px-10 pt-32 pb-16">
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div>
            <p className="text-xs tracking-wide uppercase text-muted-foreground mb-4">
              Section / 05
            </p>
            <MaskReveal
              text="Certifications."
              className="font-serif text-5xl md:text-7xl tracking-tight leading-none block"
            />
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Continuous learning — credentials from Google covering AI, prompting, and
            project delivery.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.18em] text-muted-foreground"
        >
          <span className="inline-flex items-center gap-2">
            <GoogleMark className="w-3.5 h-3.5" />
            Issued by Google
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/60 animate-pulse" />
            04 credentials
          </span>
          <span>2024 — 2025</span>
          <span className="inline-flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 L9 17 L4 12" />
            </svg>
            All verified
          </span>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10 pb-32 md:pb-40">
        <ul className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {certs.map((c, i) => (
            <CertCard key={c.title} c={c} i={i} setOpen={setOpen} />
          ))}
        </ul>
      </div>

      <Lightbox
        src={open?.src ?? null}
        alt={open?.alt ?? ""}
        caption={open?.caption}
        onClose={() => setOpen(null)}
      />
    </section>
  );
}