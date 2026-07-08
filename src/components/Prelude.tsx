import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Cinematic opening curtain — kanji bloom, then two shoji panels slide open. */
export function Prelude() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 3200);
    document.body.style.overflow = "hidden";
    const t2 = setTimeout(() => (document.body.style.overflow = ""), 3400);
    return () => { clearTimeout(t); clearTimeout(t2); document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Two shoji panels */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: "-101%" }}
            transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
            className="absolute inset-y-0 left-0 w-1/2"
            style={{ background: "linear-gradient(90deg, oklch(0.985 0.008 15), oklch(0.97 0.012 15))", boxShadow: "inset -1px 0 0 oklch(0.9 0.02 15)" }}
          />
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: "101%" }}
            transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
            className="absolute inset-y-0 right-0 w-1/2"
            style={{ background: "linear-gradient(-90deg, oklch(0.985 0.008 15), oklch(0.97 0.012 15))", boxShadow: "inset 1px 0 0 oklch(0.9 0.02 15)" }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.7, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.6, ease: [0.2, 0.7, 0.1, 1] }}
              className="text-[clamp(4rem,14vw,10rem)] leading-none text-ink"
              style={{ fontFamily: "var(--font-jp)" }}
            >
              君に届け
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.0, duration: 1.4, ease: [0.2, 0.7, 0.1, 1] }}
              className="h-px w-40 origin-left bg-ink/40"
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="text-[10px] uppercase tracking-[0.6em] text-ink/60"
            >
              From Me — To You
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
