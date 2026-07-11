import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// 金継ぎ — Kintsugi. The Japanese art of repairing broken pottery with
// lacquer dusted with gold. The break is not hidden. It is honoured.
// Here, as the reader scrolls, gold veins draw themselves across a
// fractured bowl — a metaphor for a girl who was called cursed, and the
// boy who called her by her name.

// hand-authored crack paths across a 600×600 bowl
const veins = [
  "M 300 90  C 320 180, 260 240, 300 300  S 360 420, 300 510",
  "M 120 300 C 200 280, 260 340, 300 300 S 400 260, 480 300",
  "M 170 170 C 220 220, 260 260, 300 300",
  "M 430 170 C 380 220, 340 260, 300 300",
  "M 170 430 C 220 380, 260 340, 300 300",
  "M 430 430 C 380 380, 340 340, 300 300",
];

export function Kintsugi() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Each vein "heals" between two scroll waypoints, staggered.
  const p0 = useTransform(scrollYProgress, [0.2, 0.45], [1, 0]);
  const p1 = useTransform(scrollYProgress, [0.25, 0.5], [1, 0]);
  const p2 = useTransform(scrollYProgress, [0.3, 0.55], [1, 0]);
  const p3 = useTransform(scrollYProgress, [0.32, 0.58], [1, 0]);
  const p4 = useTransform(scrollYProgress, [0.35, 0.62], [1, 0]);
  const p5 = useTransform(scrollYProgress, [0.4, 0.68], [1, 0]);
  const dashes = [p0, p1, p2, p3, p4, p5];

  const glow = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const bowlRotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-background py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-px bg-ink/5" />
        <div className="absolute right-0 top-0 h-full w-px bg-ink/5" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:grid-cols-2 md:gap-24">
        {/* Left: essay */}
        <div className="flex flex-col justify-center">
          <div className="mb-6 text-[10px] uppercase tracking-[0.5em] text-ink/50">
            Chapter · 金 継 ぎ · Kintsugi
          </div>
          <h2 className="font-serif text-5xl italic leading-[1.05] text-ink md:text-6xl">
            The break is<br />
            not the flaw.<br />
            <span className="text-ink/60">It is the story.</span>
          </h2>

          <div className="mt-10 space-y-6 text-sm font-light leading-[1.9] text-ink/70">
            <p>
              She was called <em>Sadako</em>. Cursed. Untouchable. The other
              girls stepped around her as though the air itself would break.
            </p>
            <p>
              And then a boy said her name — her <em>real</em> name — and every
              crack she had ever carried filled, quietly, with gold.
            </p>
            <p className="text-ink/50">
              <span className="mr-3" style={{ fontFamily: "var(--font-jp)" }}>金継ぎ</span>
              — the art of repairing broken things not by hiding the wound,
              but by lining it in gold. Nothing is more whole than what was
              once broken, and gathered back together.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8 text-[10px] uppercase tracking-[0.4em] text-ink/50">
            <div>
              <div className="font-serif text-2xl italic text-ink/80" style={{ fontFamily: "var(--font-jp)" }}>侘</div>
              <div className="mt-2">Wabi</div>
            </div>
            <div>
              <div className="font-serif text-2xl italic text-ink/80" style={{ fontFamily: "var(--font-jp)" }}>寂</div>
              <div className="mt-2">Sabi</div>
            </div>
            <div>
              <div className="font-serif text-2xl italic text-ink/80" style={{ fontFamily: "var(--font-jp)" }}>金</div>
              <div className="mt-2">Kin — gold</div>
            </div>
          </div>
        </div>

        {/* Right: the bowl */}
        <div className="relative flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-[520px]">
            {/* soft warm halo behind the bowl */}
            <motion.div
              aria-hidden
              className="absolute inset-0"
              style={{
                opacity: glow,
                background:
                  "radial-gradient(circle at center, oklch(0.85 0.14 75 / 0.35), transparent 60%)",
                filter: "blur(30px)",
              }}
            />

            <motion.svg
              viewBox="0 0 600 600"
              className="relative h-full w-full"
              style={{ rotate: bowlRotate }}
            >
              <defs>
                <radialGradient id="clay" cx="50%" cy="45%" r="55%">
                  <stop offset="0%" stopColor="oklch(0.96 0.02 60)" />
                  <stop offset="70%" stopColor="oklch(0.88 0.03 50)" />
                  <stop offset="100%" stopColor="oklch(0.78 0.03 40)" />
                </radialGradient>
                <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="oklch(0.92 0.14 85)" />
                  <stop offset="50%" stopColor="oklch(0.78 0.16 75)" />
                  <stop offset="100%" stopColor="oklch(0.62 0.14 65)" />
                </linearGradient>
                <filter id="veinGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="clayGrain">
                  <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" />
                  <feColorMatrix values="0 0 0 0 0.2  0 0 0 0 0.15  0 0 0 0 0.1  0 0 0 0.08 0" />
                  <feComposite in2="SourceGraphic" operator="in" />
                </filter>
              </defs>

              {/* the bowl */}
              <circle cx="300" cy="300" r="240" fill="url(#clay)" />
              <circle cx="300" cy="300" r="240" fill="oklch(0.2 0 0)" opacity="0.06" filter="url(#clayGrain)" />
              {/* rim */}
              <circle
                cx="300"
                cy="300"
                r="240"
                fill="none"
                stroke="oklch(0.6 0.03 40)"
                strokeWidth="1.5"
                opacity="0.5"
              />
              <circle
                cx="300"
                cy="300"
                r="180"
                fill="none"
                stroke="oklch(0.6 0.03 40)"
                strokeWidth="1"
                opacity="0.25"
              />

              {/* Clip veins to the bowl */}
              <clipPath id="bowlClip">
                <circle cx="300" cy="300" r="238" />
              </clipPath>

              <g clipPath="url(#bowlClip)" filter="url(#veinGlow)">
                {veins.map((d, i) => (
                  <motion.path
                    key={i}
                    d={d}
                    fill="none"
                    stroke="url(#gold)"
                    strokeWidth={2.2 + (i % 3) * 0.6}
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray={1}
                    style={{ strokeDashoffset: dashes[i] }}
                  />
                ))}
                {/* gold flecks along the veins */}
                {[
                  [300, 300], [260, 260], [340, 340], [220, 300], [380, 300], [300, 220], [300, 380],
                ].map(([cx, cy], i) => (
                  <motion.circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={2.2}
                    fill="oklch(0.85 0.16 78)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: [0, 1, 0.7] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 + i * 0.12, duration: 1.6 }}
                  />
                ))}
              </g>

              {/* signature */}
              <g transform="translate(478 512)">
                <rect x="-14" y="-14" width="28" height="28" fill="oklch(0.55 0.22 25)" opacity="0.85" />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fontFamily="var(--font-jp)"
                  fontSize="16"
                  fill="white"
                >
                  爽
                </text>
              </g>
            </motion.svg>

            {/* caption */}
            <div className="absolute -bottom-14 left-0 right-0 flex items-baseline justify-between text-[10px] uppercase tracking-[0.4em] text-ink/50">
              <span>Plate Nº XI · Kintsugi</span>
              <span style={{ fontFamily: "var(--font-jp)" }}>金 繕 い</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
