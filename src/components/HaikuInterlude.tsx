import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const haiku = [
  { jp: "春風や", en: "A spring breeze —", ro: "haru kaze ya" },
  { jp: "君の名前を", en: "your name, spoken", ro: "kimi no namae wo" },
  { jp: "初めて呼ぶ", en: "for the first time.", ro: "hajimete yobu" },
];

export function HaikuInterlude() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden py-40 md:py-56" style={{ background: "linear-gradient(180deg, oklch(0.985 0.008 15) 0%, oklch(0.97 0.02 15) 50%, oklch(0.985 0.008 15) 100%)" }}>
      {/* Sumi-e ink circle (enso) */}
      <motion.svg
        style={{ y, opacity }}
        viewBox="0 0 400 400"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] max-h-[720px] max-w-[720px] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]"
        aria-hidden
      >
        <defs>
          <filter id="rough">
            <feTurbulence baseFrequency="0.02" numOctaves="3" />
            <feDisplacementMap in="SourceGraphic" scale="6" />
          </filter>
        </defs>
        <motion.circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="oklch(0.22 0.01 260)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray="900"
          filter="url(#rough)"
          initial={{ strokeDashoffset: 900 }}
          whileInView={{ strokeDashoffset: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 3.2, ease: [0.2, 0.7, 0.1, 1] }}
        />
      </motion.svg>

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <div className="mb-16 text-[10px] uppercase tracking-[0.5em] text-ink/40">Interlude · Haiku</div>

        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-center md:gap-16">
          {haiku.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.5, duration: 1.6, ease: [0.2, 0.7, 0.1, 1] }}
              className="flex flex-col items-center gap-6"
            >
              <div
                className="text-4xl leading-tight text-ink md:text-6xl"
                style={{ fontFamily: "var(--font-jp)", writingMode: "vertical-rl" as const, minHeight: "240px" }}
              >
                {h.jp}
              </div>
              <div className="hairline w-8" />
              <div className="max-w-[10rem] text-center">
                <div className="font-serif text-lg italic leading-snug text-ink md:text-xl">{h.en}</div>
                <div className="mt-2 text-[9px] uppercase tracking-[0.4em] text-ink/40">{h.ro}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2, duration: 1.5 }}
          className="mx-auto mt-24 max-w-md text-[10px] uppercase tracking-[0.5em] text-ink/40"
        >
          — After Bashō, imagined for Sawako
        </motion.div>
      </div>
    </section>
  );
}
