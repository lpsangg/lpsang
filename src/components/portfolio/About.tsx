import { motion } from "framer-motion";
import { EASE, MaskReveal } from "./motion-primitives";

const facts = [
  ["Education", "BSc Computer Science, CTUET"],
  ["GPA & Honors", "3.49 / 4.0 · Excellence Award"],
  ["Location", "Ho Chi Minh City, Vietnam"],
  ["Availability", "Open to AI/ML Engineer roles"],
  ["Languages", "Vietnamese · English (Technical)"],
];

const focusAreas = [
  {
    title: "Vision AI & Tracking",
    skills: "YOLOv8 · DeepSort · OpenCV · PyTorch · Biometric Fingerprints",
    desc: "Real-time object detection and tracking optimized for challenging physical environments, like moving factory production lines.",
  },
  {
    title: "GenAI & LLM Workflows",
    skills: "Gemini 2.5 · local VLMs (Qwen2.5-VL) · LangChain · Copilot Studio",
    desc: "Building context-aware chat agents, automated evaluation harnesses, and integrating natural language interfaces into apps.",
  },
  {
    title: "MLOps & Engineering",
    skills: "Docker · GitHub Actions CI/CD · FastAPI · React · Next.js · SQL",
    desc: "Packaging inference endpoints, writing optimized data access layers, and automating test-driven model releases.",
  },
];

const achievements = [
  {
    metric: "70%",
    label: "Faster Legal QA Response",
    desc: "Automated legal query flows on Ca Mau Fertilizer Corporation using MS Copilot Studio.",
  },
  {
    metric: "40%",
    label: "SQL Query Speedup",
    desc: "Optimized complex data pipelines for Risk-Based Inspection factory databases.",
  },
  {
    metric: "~92%",
    label: "Computer Vision Accuracy",
    desc: "Developed YOLOv8 classification & tracking models for moving production lines.",
  },
  {
    metric: "95%",
    label: "MLOps Code Coverage",
    desc: "Verified time-series LSTM price forecasting models with automated test actions.",
  },
];

const tools = [
  { name: "Python", icon: PythonIcon },
  { name: "PyTorch", icon: PyTorchIcon },
  { name: "FastAPI", icon: FastAPIIcon },
  { name: "Docker", icon: DockerIcon },
  { name: "Figma", icon: FigmaIcon },
  { name: "Photoshop", icon: PhotoshopIcon },
  { name: "Premiere", icon: PremiereIcon },
  { name: "Git", icon: GitIcon },
];

const sentence =
  "I'm Sang — an AI/ML engineer focused on building end-to-end. I bridge the gap between complex model architecture and reliable production-ready systems, ensuring that AI translates directly to real-world value.";
const tokens = sentence.split(/(\s+)/);

export function About() {
  return (
    <section id="about" className="border-t border-border/60 pt-16 pb-24 md:pt-20 md:pb-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl w-full px-6 md:px-10 grid md:grid-cols-12 gap-8 md:gap-16 items-start">
        
        {/* Left Column (Title, Intro, Personal Index, Tools) */}
        <div className="md:col-span-5 flex flex-col justify-start space-y-6 md:space-y-8 md:sticky md:top-24">
          <div>
            <p className="text-xs tracking-wide uppercase text-muted-foreground mb-3">Section / 01</p>
            <MaskReveal
              text="About."
              className="font-serif text-5xl md:text-7xl tracking-tight leading-none block"
            />
          </div>
          
          <div className="max-w-md">
            <p className="font-serif text-2xl md:text-3xl leading-[1.2] tracking-tight text-balance">
              {tokens.map((tok, i) =>
                /\s+/.test(tok) ? (
                  <span key={i}>{tok}</span>
                ) : (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0.15 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: EASE, delay: i * 0.012 }}
                    className="inline"
                  >
                    {tok}
                  </motion.span>
                ),
              )}
            </p>
          </div>

          {/* Personal Index */}
          <div className="border-t border-border/40 pt-6 max-w-md">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">Personal Index</h3>
            <dl className="space-y-2.5 text-xs md:text-sm">
              {facts.map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between border-b border-border/20 pb-1.5 last:border-0 last:pb-0 group/fact cursor-default transition-colors duration-300 hover:border-border/60"
                >
                  <dt className="text-muted-foreground group-hover/fact:text-foreground group-hover/fact:translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    {k}
                  </dt>
                  <dd className="font-medium text-right text-foreground group-hover/fact:-translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Stack & Tools */}
          <div className="border-t border-border/40 pt-6 max-w-md">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">Core Stack & Tools</h3>
            <div className="flex flex-wrap gap-6 items-center">
              {tools.map((t, idx) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: EASE, delay: idx * 0.04 }}
                  className="text-muted-foreground/60 hover:text-foreground transition-all duration-300 hover:scale-110 cursor-help flex items-center justify-center"
                  title={t.name}
                >
                  <t.icon className="w-6 h-6 md:w-7 md:h-7" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Technical Focus & Metrics) */}
        <div className="md:col-span-7 flex flex-col justify-start space-y-10 border-t md:border-t-0 md:border-l border-border/40 pt-8 md:pt-0 md:pl-12">
          
          {/* Technical Focus */}
          <div className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Technical Focus</h3>
            <div className="space-y-6">
              {focusAreas.map((area, idx) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE, delay: idx * 0.1 }}
                  className="border-b border-border/10 pb-6 last:border-0 last:pb-0 group/focus pl-0 hover:pl-6 border-l-0 hover:border-l-2 hover:border-foreground/85 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-default"
                >
                  <h4 className="font-serif text-xl md:text-3xl tracking-tight mb-1.5 text-foreground/80 group-hover/focus:text-foreground group-hover/focus:translate-x-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    {area.title}
                  </h4>
                  <p className="text-[10px] md:text-[11px] uppercase tracking-wider text-muted-foreground/80 group-hover/focus:text-foreground/90 font-semibold mb-2.5 transition-colors duration-500">
                    {area.skills}
                  </p>
                  <p className="text-xs md:text-sm text-foreground/70 group-hover/focus:text-foreground/90 leading-relaxed transition-colors duration-500">
                    {area.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Impact & Metrics */}
          <div className="space-y-6 border-t border-border/20 pt-8">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Featured Impact</h3>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE, delay: idx * 0.1 }}
                  className="space-y-1 group/metric cursor-default p-4 rounded-lg border border-transparent hover:border-border/30 hover:bg-card/25 transition-all duration-500"
                >
                  <div className="font-serif text-3xl md:text-5xl text-foreground/80 group-hover/metric:text-foreground group-hover/metric:scale-105 origin-left transition-all duration-500">
                    {item.metric}
                  </div>
                  <h4 className="text-xs font-semibold text-foreground tracking-tight">{item.label}</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

interface IconProps {
  className?: string;
}

// Minimalist inline SVG Icons for Core Stack
function PythonIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M14.25.18c.9 0 2 .1 2.8.3.8.2 1.4.6 1.9 1.1s.8 1.1 1 1.9c.2.8.3 1.7.3 2.7v2.2h-3v-1.1c0-.9-.1-1.7-.4-2.3-.3-.6-.7-1-1.3-1.3-.6-.3-1.4-.4-2.3-.4h-3.7c-.9 0-1.7.1-2.3.4-.6.3-1 .7-1.3 1.3-.3.6-.4 1.4-.4 2.3v3.7c0 .9.1 1.7.4 2.3.3.6.7 1 1.3 1.3.6.3 1.4.4 2.3.4h2.2v3H12c-.9 0-1.8-.1-2.6-.3-.8-.2-1.4-.6-1.9-1.1s-.8-1.1-1-1.9c-.2-.8-.3-1.7-.3-2.7V9.75c0-.9.1-1.8.3-2.6.2-.8.6-1.4 1.1-1.9s1.1-.8 1.9-1c.8-.2 1.7-.3 2.7-.3h2.25zM9.75 3.38a.94.94 0 1 0 0 1.88.94.94 0 0 0 0-1.88zM9.75 23.82c-.9 0-2-.1-2.8-.3-.8-.2-1.4-.6-1.9-1.1s-.8-1.1-1-1.9c-.2-.8-.3-1.7-.3-2.7v-2.2H6.7v1.1c0 .9.1 1.7.4 2.3.3.6.7 1 1.3 1.3.6.3 1.4.4 2.3.4h3.7c.9 0 1.7-.1 2.3-.4.6-.3 1-.7 1.3-1.3.3-.6.4-1.4.4-2.3v-3.7c0-.9-.1-1.7-.4-2.3-.3-.6-.7-1-1.3-1.3-.6-.3-1.4-.4-2.3-.4H9.75v-3H12c.9 0 1.8.1 2.6.3.8.2 1.4.6 1.9 1.1s.8 1.1 1 1.9c.2.8.3 1.7.3 2.7v5.25c0 .9-.1 1.8-.3 2.6-.2.8-.6 1.4-1.1 1.9s-1.1.8-1.9 1c-.8.2-1.7.3-2.7.3H9.75zm4.5-3.38a.94.94 0 1 0 0-1.88.94.94 0 0 0 0 1.88z" />
    </svg>
  );
}

function PyTorchIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2C8 6 6 9.5 6 12.5c0 3 2.5 5.5 6 5.5s6-2.5 6-5.5C18 9.5 16 6 12 2zm0 13c-1.4 0-2.5-1.1-2.5-2.5s2.5-4.5 2.5-4.5 2.5 3.1 2.5 4.5S13.4 15 12 15z" />
    </svg>
  );
}

function FastAPIIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5l-4.5-5.5h3v-4l4.5 5.5h-3v4z" />
    </svg>
  );
}

function DockerIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M13.983 8.871h-1.996V6.887h1.996v1.984zM11.467 8.871H9.47V6.887h1.997v1.984zM8.954 8.871H6.957V6.887h1.997v1.984zM13.983 6.368h-1.996V4.385h1.996v1.983zm-2.516 0H9.47V4.385h1.997v1.983zm0-2.502H9.47V1.882h1.997v1.984zM16.497 8.871h-1.997V6.887h1.997v1.984zm2.502 0h-1.997V6.887h1.997v1.984zm2.503 0h-1.997V6.887h1.997v1.984zM16.497 6.368h-1.997V4.385h1.997v1.983zm-11.455 6.27c0-2.484 1.547-4.515 3.978-4.515 2.43 0 3.978 2.03 3.978 4.515 0 2.484-1.547 4.516-3.978 4.516-2.43 0-3.978-2.032-3.978-4.516zm18.37 0h-3.978c0 2.484-1.547 4.516-3.978 4.516-2.43 0-3.978-2.032-3.978-4.516 0-2.484 1.548-4.515 3.978-4.515 2.431 0 3.978 2.03 3.978 4.515h3.978c0-3.868-2.316-7.018-5.968-7.018-3.652 0-5.967 3.15-5.967 7.018v.004c0 3.868 2.315 7.018 5.967 7.018 3.652 0 5.968-3.15 5.968-7.018z" />
    </svg>
  );
}

function FigmaIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3 3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zm0 8a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3 3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3zm-6-5a3 3 0 0 0 3 3h3V5a3 3 0 0 0-3-3 3 3 0 0 0-3 3zm0 8a3 3 0 0 0 3 3h3v-6H9a3 3 0 0 0-3 3zm0 5a3 3 0 0 0 3 3c1.66 0 3-1.34 3-3v-3H9a3 3 0 0 0-3 3z" />
    </svg>
  );
}

function PhotoshopIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <text x="12" y="12.5" fill="currentColor" fontSize="9.5" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5" textAnchor="middle" dominantBaseline="central">Ps</text>
    </svg>
  );
}

function PremiereIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <text x="12" y="12.5" fill="currentColor" fontSize="9.5" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5" textAnchor="middle" dominantBaseline="central">Pr</text>
    </svg>
  );
}

function GitIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22.6 11.4L12.6 1.4c-.8-.8-2-.8-2.8 0L8 3.2l3 3c.6-.2 1.3 0 1.8.5.5.5.7 1.2.5 1.8l3 3c.6-.2 1.3 0 1.8.5.8.8.8 2 0 2.8s-2 .8-2.8 0c-.5-.5-.7-1.2-.5-1.8l-3-3c-.2.6 0 1.3.5 1.8.5.5 1.2.7 1.8.5l3 3c-.2.6 0 1.3.5 1.8.8.8.8 2 0 2.8s-2 .8-2.8 0c-.8-.8-.8-2 0-2.8.2-.2.5-.4.8-.5l-3-3c-.6.2-1.3 0-1.8-.5-.5-.5-.7-1.2-.5-1.8l-3-3L1.4 11.4c-.8.8-.8 2 0 2.8l10 10c.8.8 2 .8 2.8 0l10-10c.8-.8.8-2 0-2.8z"/>
    </svg>
  );
}