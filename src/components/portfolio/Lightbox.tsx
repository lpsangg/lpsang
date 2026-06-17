import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { EASE } from "./motion-primitives";

export function Lightbox({
  src,
  alt,
  caption,
  onClose,
}: {
  src: string | null;
  alt: string;
  caption?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-background/85 backdrop-blur-md flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full max-h-full flex flex-col gap-4 cursor-default"
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-md shadow-[0_40px_120px_-30px_rgba(0,0,0,0.45)] bg-muted"
            />
            {caption && (
              <p className="text-xs text-muted-foreground text-center uppercase tracking-[0.2em]">
                {caption}
              </p>
            )}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-12 right-0 size-9 rounded-full border border-border bg-background/80 backdrop-blur grid place-items-center hover:bg-foreground hover:text-background transition-colors"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}