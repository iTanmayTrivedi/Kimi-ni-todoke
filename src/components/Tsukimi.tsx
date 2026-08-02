import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// 月見 — Tsukimi. Moon-viewing. The moon fills as you descend, susuki grass
// leans in the dark, and one vertical line of the poem is written in the air.
// Scroll-linked transforms only; no rAF loop.

const lines = [
  { jp: "月がきれいですね", en: "The moon is beautiful, isn’t it." },
  { jp: "言えなかった言葉", en: "The words that were never said." },
  { jp: "それでも、届いた", en: "And still, they reached you." },
];

export function Tsukimi() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 });

  // Shadow disc slides off the moon: full crescent → full moon.
  const shadowX = useTransform(p, [0.1, 0.75], [0, 118]);
  const moonY = useTransform(p, [0, 1], [70, -70]);
  const glow = useTransform(p, [0.1, 0.7], [0.15, 0.55]);
  const grassY = useTransform(p, [0, 1], [40, -20]);
  const titleY = useTransform(p, [0, 1], [30, -30]);

  return (
    <section
      ref={ref}
      id="tsukimi"
      className="relative overflow-hidden py-48"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.96 0.015 200) 0%, oklch(0.32 0.05 265) 32%, oklch(0.19 0.04 270) 72%, oklch(0.24 0.03 250) 100%)",
      }}
    >
      {/* moon */}
      <motion.div
        style={{ y: moonY }}
        className="pointer-events-none absolute right-[8%] top-[18%] h-40 w-40 md:h-64 md:w-64"
      >
        <motion.div
          className="absolute -inset-24 rounded-full"
          style={{
            opacity: glow,
            background: "radial-gradient(circle, oklch(0.97 0.03 90 / 0.7), transparent 65%)",
          }}
        />
        <div className="relative h-full w-full overflow-hidden rounded-full" style={{ background: "oklch(0.96 0.035 90)" }}>
          <div
            className="absolute inset-0 opacity-30"
            style={{ background: "radial-gradient(circle at 62% 34%, oklch(0.72 0.03 90), transparent 55%)" }}
          />
          <motion.div
            className="absolute -top-4 h-[130%] w-[120%] rounded-full"
            style={{ x: shadowX, left: "-72%", background: "oklch(0.19 0.04 270)" }}
          />
        </div>
      </motion.div>

      {/* stars */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 46 }).map((_, i) => {
          const x = (i * 37.7) % 100;
          const y = (i * 61.3) % 78;
          const s = 1 + ((i * 13) % 3) * 0.6;
          return (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${x}%`,
                top: `${18 + y * 0.8}%`,
                width: s,
                height: s,
                background: "oklch(0.99 0.01 90)",
                opacity: 0.15 + ((i * 7) % 5) * 0.12,
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div style={{ y: titleY }}>
          <div className="mb-4 text-[10px] uppercase tracking-[0.5em]" style={{ color: "oklch(0.92 0.02 90 / 0.55)" }}>
            Chapter · 月見 · Moon Viewing
          </div>
          <h2
            className="max-w-2xl font-serif text-5xl italic leading-[1.05] md:text-7xl"
            style={{ color: "oklch(0.97 0.02 90)" }}
          >
            The moon fills
            <br />
            as the year empties.
          </h2>
        </motion.div>

        {/* vertical poem */}
        <div className="mt-24 flex gap-10 md:gap-16">
          {lines.map((l, i) => {
            const o = useTransform(p, [0.18 + i * 0.16, 0.32 + i * 0.16], [0, 1]);
            const ty = useTransform(p, [0.18 + i * 0.16, 0.42 + i * 0.16], [24, 0]);
            return (
              <motion.div key={l.jp} style={{ opacity: o, y: ty }} className="flex flex-col items-center">
                <div
                  className="text-base leading-[1.9] tracking-[0.35em] md:text-xl"
                  style={{ writingMode: "vertical-rl", fontFamily: "var(--font-jp)", color: "oklch(0.96 0.02 90 / 0.9)" }}
                >
                  {l.jp}
                </div>
                <div className="mt-6 h-8 w-px" style={{ background: "oklch(0.96 0.02 90 / 0.25)" }} />
                <div
                  className="mt-4 max-w-[7rem] text-center text-[9px] uppercase leading-relaxed tracking-[0.3em]"
                  style={{ color: "oklch(0.94 0.02 90 / 0.45)" }}
                >
                  {l.en}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* susuki grass silhouettes */}
      <motion.svg
        style={{ y: grassY }}
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-2 left-0 h-40 w-full md:h-56"
        aria-hidden
      >
        <g fill="none" stroke="oklch(0.14 0.03 270)" strokeWidth="3" strokeLinecap="round" opacity="0.85">
          {Array.from({ length: 34 }).map((_, i) => {
            const x = i * 36 + ((i * 17) % 20);
            const h = 110 + ((i * 29) % 90);
            const bend = ((i % 5) - 2) * 26;
            return <path key={i} d={`M${x} 220 C ${x + bend * 0.3} ${220 - h * 0.6}, ${x + bend} ${220 - h * 0.85}, ${x + bend * 1.5} ${220 - h}`} />;
          })}
        </g>
      </motion.svg>
    </section>
  );
}
