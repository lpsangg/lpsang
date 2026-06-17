import { motion } from "framer-motion";
import { MaskReveal, CountUp, EASE } from "./motion-primitives";
import pvcfc from "@/assets/portfolio/pvcfc.png";

const highlights = [
  {
    title: "AI-Driven Legal Automation",
    body: "Architected and deployed an internal Legal Agent chatbot on Microsoft Copilot Studio to resolve complex corporate policy queries. Designed structured conversational flows that streamlined access to internal legal documents, reducing query response times by 70%.",
  },
  {
    title: "RBI Database & Query Optimization",
    body: "Collaborated with plant engineers on the Risk-Based Inspection (RBI) management system. Refactored legacy contractor database queries, optimizing complex SQL access patterns for plant safety data analysis to achieve a 40% performance gain.",
  },
  {
    title: "Enterprise Data Architecture & ERP",
    body: "Analyzed enterprise-scale ERP models and digital transformation strategies at PVCFC. Researched Data Warehouse and Data Lake paradigms to map how centralized business intelligence drives massive factory operations.",
  },
  {
    title: "Cross-Functional Integration",
    body: "Engaged in cross-team discussions with engineers, database administrators, and business analysts to bridge the gap between technical infrastructure and enterprise goals, delivering actionable results to team leads.",
  },
];

const stats = [
  { n: 70, suffix: "%", label: "Faster legal response time" },
  { n: 40, suffix: "%", label: "Query performance gain" },
  { n: 3, suffix: " mo", label: "Onsite internship" },
];

export function Experience() {
  return (
    <section id="experience" className="border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 md:px-10 pt-32 pb-12">
        <p className="text-xs tracking-wide uppercase text-muted-foreground mb-4">Section / 02</p>
        <MaskReveal
          text="Experience."
          className="font-serif text-5xl md:text-7xl tracking-tight leading-none block"
        />
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5 md:sticky md:top-32 self-start">
            <div className="flex items-center gap-4 text-xs text-muted-foreground tracking-wide uppercase mb-8">
              <span>2025</span>
              <span className="h-px flex-1 bg-border" />
              <span>Jun — Aug</span>
            </div>
            <motion.img
              src={pvcfc}
              alt="PVCFC"
              loading="lazy"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="h-14 w-auto object-contain mb-6 mix-blend-multiply"
            />
            <h3 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight mb-3">
              AI / IT Intern
            </h3>
            <p className="text-muted-foreground">
              Petrovietnam Ca Mau Fertilizer Corporation (PVCFC)
            </p>
          </div>

          <div className="md:col-span-7 space-y-10">
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
                  className="border-t border-border/60 pt-6 group/highlight cursor-default transition-colors duration-500 hover:border-foreground/60"
                >
                  <h4 className="font-serif text-lg md:text-xl tracking-tight mb-2 text-foreground/90 group-hover/highlight:text-foreground group-hover/highlight:translate-x-1.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    {h.title}
                  </h4>
                  <p className="text-xs md:text-sm text-foreground/75 leading-relaxed group-hover/highlight:text-foreground/90 transition-colors duration-500">
                    {h.body}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/60">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-4xl md:text-6xl tracking-tight leading-none">
                    <CountUp to={s.n} suffix={s.suffix} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 max-w-[14ch]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}