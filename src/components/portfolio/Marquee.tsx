import { motion } from "framer-motion";

const items = [
  "Python",
  "TensorFlow",
  "PyTorch · Keras",
  "YOLOv8 + DeepSort",
  "OpenCV",
  "LangChain",
  "Google Gemini",
  "Ollama",
  "FastAPI",
  "Docker · CI/CD",
  "Microsoft Copilot Studio",
  "SQL Server",
];

export function Marquee() {
  return (
    <section className="py-20 md:py-28 border-y border-border/60 overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 55, ease: "linear", repeat: Infinity }}
        className="flex gap-16 whitespace-nowrap will-change-transform"
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span 
            key={i} 
            className="font-serif text-5xl md:text-7xl text-foreground/55 hover:text-foreground hover:scale-105 hover:italic transition-all duration-500 flex items-center gap-16 cursor-default select-none"
          >
            {item}
            <span className="size-2 rounded-full bg-foreground/25" />
          </span>
        ))}
      </motion.div>
    </section>
  );
}