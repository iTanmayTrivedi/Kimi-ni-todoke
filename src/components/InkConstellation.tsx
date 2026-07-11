import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// A sumi-e "enso" — the imperfect circle of Zen — drawn as the reader scrolls.
// Around it, seven kanji orbit like stars in a moonless sky, each one a
// coordinate in the constellation of the story.

const orbit = [
  { k: "爽", romaji: "Sawako",   deg: -90 },
  { k: "風", romaji: "Kazehaya", deg: -38 },
  { k: "友", romaji: "Chizuru",  deg: 14 },
  { k: "静", romaji: "Ayane",    deg: 66 },
  { k: "縁", romaji: "En",       deg: 118 },
  { k: "桜", romaji: "Sakura",   deg: 170 },
  { k: "雪", romaji: "Yuki",     deg: 222 },
];

export function InkConstellation() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // enso stroke draws from 0 to ~0.92 (imperfect on purpose)
  const dash = useTransform(scrollYProgress, [0.15, 0.75], [1, 0.08]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const veil = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 0.7]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-background py-40">
      {/* faint horizon lines */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-1/2 h-px bg-ink/5" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-ink/5" />
      </div>

      <div className="mx-auto mb-24 max-w-4xl px-6 text-center">
        <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ink/50">
          Chapter · 円相 · Ensō — The Circle of Everything
        </div>
        <h2 className="font-serif text-5xl italic leading-tight text-ink md:text-7xl">
          One brushstroke.<br />
          <span className="text-ink/60">A universe.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-sm font-light leading-relaxed text-ink/60">
          The <em>ensō</em> is drawn in a single breath. Whole yet unfinished,
          it is the shape of first love — complete the moment it begins.
        </p>
      </div>

      <div className="relative mx-auto flex aspect-square max-w-[680px] items-center justify-center px-6">
        <motion.svg
          viewBox="0 0 600 600"
          className="h-full w-full"
          style={{ rotate }}
        >
          <defs>
            <radialGradient id="moon" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="oklch(0.98 0.02 20)" stopOpacity="0.9" />
              <stop offset="70%" stopColor="oklch(0.94 0.03 15)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="oklch(0.94 0.03 15)" stopOpacity="0" />
            </radialGradient>
            <filter id="sumi" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="4" />
              <feDisplacementMap in="SourceGraphic" scale="6" />
            </filter>
          </defs>

          {/* moon glow */}
          <circle cx="300" cy="300" r="260" fill="url(#moon)" />

          {/* the enso — animated dash */}
          <motion.circle
            cx="300"
            cy="300"
            r="220"
            fill="none"
            stroke="oklch(0.22 0.01 260)"
            strokeWidth="14"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            style={{ strokeDashoffset: dash, filter: "url(#sumi)" }}
            transform="rotate(-100 300 300)"
          />

          {/* ink splatter at start of stroke */}
          <circle cx="262" cy="82" r="6" fill="oklch(0.22 0.01 260)" opacity="0.7" />
          <circle cx="248" cy="94" r="2" fill="oklch(0.22 0.01 260)" opacity="0.5" />

          {/* orbiting kanji */}
          {orbit.map(({ k, romaji, deg }, i) => {
            const rad = (deg * Math.PI) / 180;
            const cx = 300 + Math.cos(rad) * 280;
            const cy = 300 + Math.sin(rad) * 280;
            return (
              <g key={i}>
                <motion.text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="var(--font-jp)"
                  fontSize="34"
                  fill="oklch(0.22 0.01 260)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.85 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 1.2 }}
                >
                  {k}
                </motion.text>
                <motion.text
                  x={cx}
                  y={cy + 26}
                  textAnchor="middle"
                  fontSize="8"
                  letterSpacing="4"
                  fill="oklch(0.22 0.01 260)"
                  fillOpacity="0.5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + i * 0.12, duration: 1 }}
                >
                  {romaji.toUpperCase()}
                </motion.text>
              </g>
            );
          })}

          {/* hanko seal at center */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.6, duration: 0.8, ease: [0.2, 0.7, 0.1, 1] }}
          >
            <rect x="278" y="278" width="44" height="44" fill="oklch(0.55 0.22 25)" />
            <text
              x="300"
              y="303"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-jp)"
              fontSize="20"
              fill="white"
            >
              届
            </text>
          </motion.g>
        </motion.svg>

        {/* soft veil overlay */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: veil,
            background: "radial-gradient(circle at center, transparent 40%, oklch(0.985 0.008 15 / 0.6))",
          }}
        />
      </div>

      <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-8 px-6 text-center text-[10px] uppercase tracking-[0.4em] text-ink/50">
        <div>
          <div className="font-serif text-2xl italic text-ink/80" style={{ fontFamily: "var(--font-jp)" }}>七</div>
          <div className="mt-2">Seven kanji</div>
        </div>
        <div>
          <div className="font-serif text-2xl italic text-ink/80" style={{ fontFamily: "var(--font-jp)" }}>一</div>
          <div className="mt-2">One breath</div>
        </div>
        <div>
          <div className="font-serif text-2xl italic text-ink/80" style={{ fontFamily: "var(--font-jp)" }}>無限</div>
          <div className="mt-2">Infinite meaning</div>
        </div>
      </div>
    </section>
  );
}
