import { motion } from "framer-motion";

const phrases = [
  "君に届け",
  "From Me to You",
  "そっと、静かに",
  "Softly, quietly",
  "春の風",
  "A Spring Wind",
  "はじめての名前",
  "Your name, for the first time",
];

export function Marquee() {
  const items = [...phrases, ...phrases];
  return (
    <section aria-hidden className="relative overflow-hidden border-y border-border/60 bg-background py-10">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {items.map((p, i) => (
          <span
            key={i}
            className="mx-12 font-serif text-2xl italic text-ink/50 md:text-4xl"
            style={/[\u3040-\u30ff\u4e00-\u9faf]/.test(p) ? { fontFamily: "var(--font-jp)", fontStyle: "normal" } : undefined}
          >
            {p}
            <span className="ml-12 text-ink/20">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
