import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

// A pinned 500vh cinematic scene where a confession assembles itself from
// scattered words, a massive 好き kanji bleeds into view like ink on washi,
// and the whole background shifts through dawn → dusk.

function useParallax(v: MotionValue<number>, from: number, to: number) {
  return useTransform(v, [0, 1], [from, to]);
}

export function ConfessionScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // background choreography
  const bg = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.85, 1],
    [
      "radial-gradient(120% 100% at 50% 10%, oklch(0.985 0.008 15), oklch(0.985 0.008 15))",
      "radial-gradient(120% 100% at 50% 10%, oklch(0.96 0.04 15), oklch(0.985 0.01 15))",
      "radial-gradient(120% 100% at 50% 30%, oklch(0.9 0.06 20), oklch(0.94 0.04 340))",
      "radial-gradient(120% 100% at 50% 60%, oklch(0.72 0.11 350), oklch(0.55 0.13 285))",
      "radial-gradient(120% 100% at 50% 80%, oklch(0.35 0.09 275), oklch(0.18 0.05 265))",
    ]
  );
  const inkColor = useTransform(scrollYProgress, [0, 0.6, 1], ["oklch(0.22 0.01 260)", "oklch(0.22 0.01 260)", "oklch(0.99 0.01 20)"]);

  // 好き kanji — huge, ink-blooms across the scene
  const kanjiScale = useParallax(scrollYProgress, 0.4, 1.35);
  const kanjiOpacity = useTransform(scrollYProgress, [0, 0.15, 0.55, 0.85, 1], [0, 0.05, 0.16, 0.35, 0.55]);
  const kanjiBlur = useTransform(scrollYProgress, [0, 0.5, 1], [40, 6, 0]);
  const kanjiRotate = useParallax(scrollYProgress, -8, 4);

  // Scattered words fly to their positions
  const words = [
    { text: "You", x: [-60, 0], y: [-40, 0], r: [-12, 0], at: [0.05, 0.25] },
    { text: "are", x: [40, 0], y: [-30, 0], r: [8, 0], at: [0.1, 0.28] },
    { text: "the", x: [-30, 0], y: [30, 0], r: [-4, 0], at: [0.15, 0.32] },
    { text: "kind", x: [50, 0], y: [40, 0], r: [10, 0], at: [0.2, 0.36] },
    { text: "of", x: [-40, 0], y: [-20, 0], r: [-6, 0], at: [0.25, 0.42] },
    { text: "person", x: [60, 0], y: [20, 0], r: [12, 0], at: [0.32, 0.5] },
    { text: "who", x: [-50, 0], y: [-30, 0], r: [-10, 0], at: [0.4, 0.58] },
    { text: "makes", x: [40, 0], y: [30, 0], r: [8, 0], at: [0.48, 0.66] },
    { text: "the", x: [-20, 0], y: [-10, 0], r: [-4, 0], at: [0.55, 0.72] },
    { text: "air", x: [30, 0], y: [-40, 0], r: [6, 0], at: [0.6, 0.78] },
    { text: "feel", x: [-40, 0], y: [40, 0], r: [-8, 0], at: [0.66, 0.82] },
    { text: "like", x: [50, 0], y: [20, 0], r: [10, 0], at: [0.72, 0.86] },
    { text: "spring.", x: [-60, 0], y: [-30, 0], r: [-12, 0], at: [0.78, 0.92] },
  ];

  // Attribution reveal
  const attrOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
  const attrY = useTransform(scrollYProgress, [0.9, 1], [24, 0]);

  // Chapter marker
  const markerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative" style={{ height: "500vh" }}>
      <motion.div style={{ background: bg }} className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Chapter marker */}
        <motion.div
          style={{ opacity: markerOpacity, color: inkColor }}
          className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] md:top-12"
        >
          Chapter VI · 告白 · The Confession
        </motion.div>

        {/* Massive kanji bleed */}
        <motion.div
          aria-hidden
          style={{
            scale: kanjiScale,
            opacity: kanjiOpacity,
            filter: useTransform(kanjiBlur, (v) => `blur(${v}px)`),
            rotate: kanjiRotate,
            color: inkColor,
            fontFamily: "var(--font-jp)",
          }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center text-[70vw] leading-none select-none"
        >
          好き
        </motion.div>

        {/* Ink circles orbiting the scene */}
        <InkOrbit progress={scrollYProgress} />

        {/* Words assembling into the confession */}
        <motion.div style={{ color: inkColor }} className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <div className="font-serif text-[clamp(2rem,6vw,5.5rem)] leading-[1.15] italic">
            {words.map((w, i) => (
              <WordFly key={i} word={w} progress={scrollYProgress} />
            ))}
          </div>

          <motion.div
            style={{ opacity: attrOpacity, y: attrY, color: inkColor }}
            className="mt-16 flex flex-col items-center gap-3"
          >
            <div className="h-px w-16" style={{ background: "currentColor", opacity: 0.4 }} />
            <div className="text-[10px] uppercase tracking-[0.5em] opacity-70">
              Sawako, to Kazehaya — under falling snow
            </div>
            <div className="mt-4 text-2xl opacity-80" style={{ fontFamily: "var(--font-jp)" }}>
              あなたが好きです。
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05, 0.1], [1, 1, 0]), color: inkColor }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] opacity-60"
        >
          keep scrolling — she is trying to say it
        </motion.div>
      </motion.div>
    </section>
  );
}

function WordFly({
  word,
  progress,
}: {
  word: { text: string; x: number[]; y: number[]; r: number[]; at: number[] };
  progress: MotionValue<number>;
}) {
  const x = useTransform(progress, word.at, word.x);
  const y = useTransform(progress, word.at, word.y);
  const rotate = useTransform(progress, word.at, word.r);
  const opacity = useTransform(progress, [word.at[0], (word.at[0] + word.at[1]) / 2, word.at[1]], [0, 0.6, 1]);
  const blur = useTransform(progress, word.at, [12, 0]);
  return (
    <motion.span
      style={{ x, y, rotate, opacity, display: "inline-block", filter: useTransform(blur, (v) => `blur(${v}px)`) }}
      className="mx-2"
    >
      {word.text}
    </motion.span>
  );
}

function InkOrbit({ progress }: { progress: MotionValue<number> }) {
  const circles = [
    { cx: "18%", cy: "22%", r: 120, delay: 0.1 },
    { cx: "82%", cy: "30%", r: 180, delay: 0.2 },
    { cx: "12%", cy: "78%", r: 90, delay: 0.35 },
    { cx: "88%", cy: "82%", r: 150, delay: 0.5 },
    { cx: "50%", cy: "12%", r: 70, delay: 0.65 },
  ];
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="inkbleed" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.22 0.01 260)" stopOpacity="0.35" />
          <stop offset="60%" stopColor="oklch(0.22 0.01 260)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="oklch(0.22 0.01 260)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {circles.map((c, i) => (
        <InkCircle key={i} progress={progress} {...c} />
      ))}
    </svg>
  );
}

function InkCircle({ progress, cx, cy, r, delay }: { progress: MotionValue<number>; cx: string; cy: string; r: number; delay: number }) {
  const scale = useTransform(progress, [delay, delay + 0.3], [0, 1]);
  const opacity = useTransform(progress, [delay, delay + 0.2, 0.95, 1], [0, 1, 1, 0]);
  return (
    <motion.circle cx={cx} cy={cy} r={r} fill="url(#inkbleed)" style={{ scale, opacity, transformOrigin: `${cx} ${cy}`, transformBox: "fill-box" }} />
  );
}
