import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";

// 折鶴 — Orizuru. A sheet of paper folds itself into a crane as you descend,
// then lifts off. Pure SVG + scroll-linked transforms: no canvas, no rAF loop.

/** Six folds. Each has its own scroll window so the sheet becomes a bird. */
const folds = [
  // the flat sheet — it dissolves once the wings take over
  { d: "M60 20 L260 20 L260 220 L60 220 Z", from: 0.0, to: 0.1, out: 0.34, fill: "oklch(0.985 0.008 15)" },
  { d: "M60 20 L260 20 L160 130 Z", from: 0.08, to: 0.2, out: 0.4, fill: "oklch(0.955 0.02 12)" },
  { d: "M60 220 L260 220 L160 130 Z", from: 0.14, to: 0.26, out: 0.44, fill: "oklch(0.93 0.032 12)" },
  // wings
  { d: "M160 130 L26 34 L74 158 Z", from: 0.22, to: 0.36, fill: "oklch(0.905 0.048 14)" },
  { d: "M160 130 L294 34 L246 158 Z", from: 0.28, to: 0.42, fill: "oklch(0.875 0.058 12)" },
  // body + tail
  { d: "M160 130 L206 236 L118 202 Z", from: 0.36, to: 0.5, fill: "oklch(0.82 0.07 12)" },
];



function Fold({
  p,
  d,
  from,
  to,
  out,
  fill,
}: {
  p: MotionValue<number>;
  d: string;
  from: number;
  to: number;
  out?: number;
  fill: string;
}) {
  const opacity = useTransform(
    p,
    out ? [from, to, out, out + 0.14] : [from, to],
    out ? [0, 1, 1, 0] : [0, 1],
  );
  const scale = useTransform(p, [from, to], [0.86, 1]);
  return <motion.path d={d} fill={fill} style={{ opacity, scale, transformOrigin: "160px 130px" }} />;
}


function Verse({ p, from, jp, en }: { p: MotionValue<number>; from: number; jp: string; en: string }) {
  const opacity = useTransform(p, [from, from + 0.12], [0, 1]);
  const y = useTransform(p, [from, from + 0.12], [24, 0]);
  return (
    <motion.div style={{ opacity, y }} className="border-t border-ink/10 pt-5">
      <div className="font-serif text-lg italic leading-relaxed text-ink/75 md:text-xl">{jp}</div>
      <div className="mt-2 text-[9px] uppercase tracking-[0.45em] text-ink/40">{en}</div>
    </motion.div>
  );
}

const creases = Array.from({ length: 7 }, (_, i) => 44 + i * 26);

export function Orizuru() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.35 });

  const sheetRotate = useTransform(p, [0, 0.55, 1], [-12, 4, 12]);
  const sheetY = useTransform(p, [0, 1], [70, -70]);
  const liftY = useTransform(p, [0.5, 0.78, 1], [0, -120, -220]);
  const liftX = useTransform(p, [0.5, 1], [0, 110]);
  const wingTilt = useTransform(p, [0.5, 0.66, 0.82, 1], [0, -14, -2, -12]);
  const halo = useTransform(p, [0.32, 0.56], [0, 1]);
  const shadow = useTransform(p, [0.44, 0.68], [0.22, 0]);
  const headY = useTransform(p, [0, 1], [60, -60]);
  const countText = useTransform(p, [0, 1], [1, 1000]);
  const count = useTransform(countText, (v) => String(Math.max(1, Math.round(v))).padStart(4, "0"));

  return (
    <section
      ref={ref}
      id="orizuru"
      className="relative overflow-hidden py-44"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.985 0.008 15) 0%, oklch(0.96 0.015 30) 46%, oklch(0.94 0.02 60) 100%)",
      }}
    >
      {/* faint fold-grid, like the creases left on washi */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden>
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <g stroke="oklch(0.22 0.01 260 / 0.06)" strokeWidth="0.15">
            {[20, 40, 60, 80].map((x) => (
              <line key={x} x1={x} y1="0" x2={x} y2="100" />
            ))}
            <line x1="0" y1="0" x2="100" y2="100" />
            <line x1="100" y1="0" x2="0" y2="100" />
          </g>
        </svg>
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-16 px-6 lg:pl-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div style={{ y: headY }}>
          <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ink/50">Chapter · 折鶴 · One Thousand</div>
          <h2 className="max-w-xl font-serif text-5xl italic leading-[1.05] text-ink md:text-7xl">
            Fold it a
            <br />
            thousand times,
            <br />
            and it becomes
            <br />
            a wish.
          </h2>
          <p className="mt-8 max-w-md text-sm font-light leading-relaxed text-ink/60">
            千羽鶴。A single sheet, folded without cutting — the paper never loses anything, it only learns a shape.
            Scroll, and the sheet folds itself.
          </p>

          <div className="mt-10 flex items-baseline gap-4">
            <motion.span className="font-serif text-4xl italic tabular-nums text-ink/80">{count}</motion.span>
            <span className="text-[9px] uppercase tracking-[0.45em] text-ink/40">cranes folded · 千羽</span>
          </div>

          <div className="mt-12 space-y-8">
            <Verse p={p} from={0.12} jp="「一折り、ひと言。」" en="One fold · one unsaid word" />
            <Verse p={p} from={0.3} jp="「折り目は、消えない。」" en="A crease never truly disappears" />
            <Verse p={p} from={0.48} jp="「それでも、飛ぶ。」" en="And still — it flies" />
          </div>
        </motion.div>

        {/* the folding sheet */}
        <div className="relative mx-auto w-full max-w-md lg:sticky lg:top-28">
          <motion.div
            className="absolute inset-0 rounded-full"
            aria-hidden
            style={{ opacity: halo, background: "radial-gradient(circle, oklch(0.95 0.05 40 / 0.65), transparent 68%)" }}
          />
          <motion.div style={{ y: sheetY, x: liftX, rotate: sheetRotate }} className="relative">
            <motion.svg viewBox="0 0 320 260" className="w-full" style={{ y: liftY, rotate: wingTilt }} aria-hidden>
              {/* creases on the flat sheet, fading as folds take over */}
              <motion.g
                stroke="oklch(0.22 0.01 260 / 0.12)"
                strokeWidth="0.8"
                style={{ opacity: useTransform(p, [0, 0.22], [1, 0]) }}
              >
                {creases.map((y) => (
                  <line key={y} x1="60" y1={y} x2="260" y2={y} />
                ))}
              </motion.g>
              {folds.map((f) => (
                <Fold key={f.d} p={p} {...f} />
              ))}
              {/* beak + tail, the last two folds */}
              <motion.g style={{ opacity: useTransform(p, [0.44, 0.56], [0, 1]) }}>
                {/* neck + head, lifted to the left */}
                <path d="M160 130 L74 158 L36 96 L60 92 Z" fill="oklch(0.8 0.08 12)" />
                <path d="M36 96 L10 74 L44 82 Z" fill="oklch(0.72 0.1 12)" />
                {/* tail, pointing right */}
                <path d="M160 130 L246 158 L302 118 Z" fill="oklch(0.78 0.09 12)" />
              </motion.g>
              <motion.g stroke="oklch(0.99 0 0 / 0.55)" strokeWidth="1" fill="none" style={{ opacity: halo }}>
                <path d="M160 22 L160 232" />
                <path d="M60 20 L260 220" />
                <path d="M260 20 L60 220" />
              </motion.g>
            </motion.svg>
          </motion.div>

          {/* ground shadow that leaves with the bird */}
          <motion.div
            className="mx-auto mt-4 h-10 w-3/5"
            aria-hidden
            style={{
              opacity: shadow,
              background: "radial-gradient(ellipse at 50% 50%, oklch(0.22 0.01 260 / 0.5), transparent 70%)",
              filter: "blur(6px)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
