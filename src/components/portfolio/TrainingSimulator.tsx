import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export function TrainingSimulator() {
  const [lr, setLr] = useState<number>(0.015); // 0.001, 0.015, 0.15
  const [status, setStatus] = useState<"idle" | "training" | "converged" | "exploded" | "slow">("idle");
  const [epoch, setEpoch] = useState(0);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const [accuracyHistory, setAccuracyHistory] = useState<number[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTraining = () => {
    // Reset states
    setEpoch(0);
    setLossHistory([1.0]);
    setAccuracyHistory([15]);
    
    if (lr === 0.15) {
      setStatus("exploded");
    } else if (lr === 0.001) {
      setStatus("slow");
    } else {
      setStatus("training");
    }
  };

  const stopTraining = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setStatus("idle");
  };

  useEffect(() => {
    if (status === "idle") {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setEpoch((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          if (timerRef.current) clearInterval(timerRef.current);
          setStatus("converged");
          return 100;
        }

        // Compute loss based on learning rate
        let loss = 1.0;
        let accuracy = 15;

        if (lr === 0.15) {
          // Exploding gradient: bounces wildly
          loss = Math.max(0.15, 0.5 + Math.sin(next * 0.8) * 0.35 + Math.random() * 0.15);
          accuracy = Math.round(15 + Math.random() * 20);
        } else if (lr === 0.001) {
          // Slow convergence
          loss = Math.max(0.1, 1.0 - (next / 100) * 0.2 - Math.random() * 0.01);
          accuracy = Math.round(15 + (next / 100) * 20 + Math.random() * 2);
        } else {
          // Optimal convergence
          loss = 0.9 * Math.exp(-next / 22) + 0.1 + (Math.random() - 0.5) * 0.025;
          loss = Math.max(0.08, loss);
          accuracy = Math.round(100 - loss * 85 + (Math.random() - 0.5) * 2);
          accuracy = Math.min(99, Math.max(15, accuracy));
        }

        setLossHistory((history) => [...history, loss]);
        setAccuracyHistory((history) => [...history, accuracy]);

        return next;
      });
    }, 45);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, lr]);

  // Generate SVG path for loss history
  const graphWidth = 240;
  const graphHeight = 120;
  const points = lossHistory.map((val, idx) => {
    const px = (idx / 100) * graphWidth;
    // val is 0.0 -> 1.2. Map to graph height (val = 1.0 -> y = 10, val = 0.0 -> y = 110)
    const py = graphHeight - 10 - val * (graphHeight - 20);
    return `${px},${py}`;
  });

  const pathD = points.length > 0 ? `M ${points.join(" L ")}` : "";

  return (
    <div 
      data-cursor-text="TRAIN"
      className="border border-border/60 bg-card/45 backdrop-blur-sm rounded-xl p-5 md:p-6 space-y-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.01)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.02)] transition-shadow duration-500 cursor-default"
    >
      <div className="flex items-center justify-between border-b border-border/20 pb-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
          <h4 className="text-xs uppercase tracking-[0.18em] font-mono text-foreground font-semibold">
            Interactive ML Training Sandbox
          </h4>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground uppercase">
          Status / {status}
        </span>
      </div>

      <div className="grid sm:grid-cols-12 gap-5 items-center">
        {/* Control Sliders */}
        <div className="sm:col-span-5 space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-mono tracking-wider uppercase text-muted-foreground">
              <span>Learning Rate (lr)</span>
              <span className="text-foreground font-medium">{lr}</span>
            </div>
            <div className="flex gap-2">
              {[0.001, 0.015, 0.15].map((val) => (
                <button
                  key={val}
                  type="button"
                  disabled={status === "training" || status === "slow" || status === "exploded"}
                  onClick={() => setLr(val)}
                  className={`flex-1 text-[10px] font-mono py-1 rounded border transition-colors ${
                    lr === val
                      ? "bg-foreground text-background border-foreground font-semibold"
                      : "border-border hover:border-foreground/50 text-muted-foreground disabled:opacity-40"
                  }`}
                >
                  {val === 0.001 ? "Low" : val === 0.015 ? "Optimum" : "High"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground block">
              Epoch Progress
            </span>
            <div className="h-2 w-full bg-border/40 rounded-full overflow-hidden relative">
              <motion.div
                animate={{ width: `${epoch}%` }}
                transition={{ duration: 0.1 }}
                className={`h-full absolute left-0 top-0 ${
                  status === "exploded" 
                    ? "bg-destructive/80" 
                    : status === "converged" 
                    ? "bg-emerald-500" 
                    : "bg-foreground/80"
                }`}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground/80">
              <span>Epoch {String(epoch).padStart(3, "0")}/100</span>
              <span>
                Loss: {lossHistory.length > 0 ? lossHistory[lossHistory.length - 1].toFixed(4) : "1.0000"}
              </span>
            </div>
          </div>

          <div className="flex gap-2.5 pt-2">
            {(status === "training" || status === "slow" || status === "exploded") ? (
              <button
                type="button"
                onClick={stopTraining}
                className="w-full text-[10px] font-mono tracking-widest uppercase border border-destructive/30 hover:bg-destructive hover:text-white transition-colors duration-300 rounded-full py-1.5 text-destructive cursor-pointer"
              >
                Abort
              </button>
            ) : (
              <button
                type="button"
                onClick={startTraining}
                className="w-full text-[10px] font-mono tracking-widest uppercase border border-foreground bg-foreground text-background hover:bg-foreground/80 transition-colors duration-300 rounded-full py-1.5 font-semibold cursor-pointer"
              >
                Start Training
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Loss Chart */}
        <div className="sm:col-span-7 flex flex-col items-center justify-center bg-background/30 rounded-lg p-3 border border-border/20 relative h-[140px] overflow-hidden">
          {/* Chart gridlines */}
          <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none opacity-[0.2]" aria-hidden>
            <div className="w-full border-t border-dashed border-foreground/35" />
            <div className="w-full border-t border-dashed border-foreground/35" />
            <div className="w-full border-t border-dashed border-foreground/35" />
          </div>

          {lossHistory.length > 0 ? (
            <svg viewBox={`0 0 ${graphWidth} ${graphHeight}`} className="w-full h-full overflow-visible relative z-10">
              <motion.path
                d={pathD}
                fill="none"
                stroke={status === "exploded" ? "hsl(var(--destructive))" : "currentColor"}
                strokeWidth="2.2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.1 }}
              />
              {/* Pulse circle at current coordinate */}
              {points.length > 0 && (
                <circle
                  cx={(epoch / 100) * graphWidth}
                  cy={graphHeight - 10 - lossHistory[lossHistory.length - 1] * (graphHeight - 20)}
                  r="3.5"
                  className={status === "exploded" ? "fill-destructive" : "fill-foreground"}
                />
              )}
            </svg>
          ) : (
            <span className="text-[10px] font-mono text-muted-foreground/60 uppercase">
              Click Start to plot Loss
            </span>
          )}

          {/* Accuracy floating indicator */}
          <AnimatePresence>
            {accuracyHistory.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-2 right-3 z-20 font-mono text-[9px] uppercase tracking-wide text-muted-foreground bg-background/85 px-2 py-0.5 rounded border border-border/40"
              >
                Train Acc: <span className="font-semibold text-foreground">{accuracyHistory[accuracyHistory.length - 1]}%</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Simulation Result feedback message */}
      <AnimatePresence mode="wait">
        {status === "converged" && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[10px] font-mono text-emerald-600 bg-emerald-500/10 px-3 py-1.5 rounded border border-emerald-500/20 text-center"
          >
            ✔ Model converged successfully! Accuracy reached 98% with optimal Learning Rate.
          </motion.p>
        )}
        {status === "exploded" && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[10px] font-mono text-destructive bg-destructive/10 px-3 py-1.5 rounded border border-destructive/20 text-center"
          >
            ✘ Exploding Gradient! Loss diverged. Learning rate (0.15) is too high.
          </motion.p>
        )}
        {status === "slow" && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[10px] font-mono text-amber-600 bg-amber-500/10 px-3 py-1.5 rounded border border-amber-500/20 text-center text-balance"
          >
            ⚠ Convergence too slow. Loss remaining high (0.8000+). Learning rate is set too low.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
