import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// 雨 — Ame. The shared umbrella. Rain is CSS-transform streaks (few nodes,
// GPU-composited), the umbrella is SVG, and everything is scroll-linked.

const streaks = Array.from({ length: 34 }, (_, i) => ({
  left: (i * 29.7) % 100,
  delay: ((i * 13) % 20) / 10,
  dur: 0.9 + ((i * 7) % 9) / 10,
  len: 40 + ((i * 11) % 60),
  op: 0.12 + ((i * 5) % 5) * 0.06,
}));

export function Rain() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.35 });

  const umbrellaY = useTransform(p, [0, 1], [60, -40]);
  const umbrellaTilt = useTransform(p, [0, 0.5, 1], [-4, 0, 4]);
  const glow = useTransform(p, [0.15, 0.6], [0, 1]);
  const lineY = useTransform(p, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      id="ame"
      className="relative overflow-hidden py-44"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.95 0.012 240) 0%, oklch(0.88 0.02 235) 45%, oklch(0.93 0.02 200) 100%)",
      }}
    >
      <style>{`
        @keyframes ame-fall {
          0%   { transform: translate3d(0, -18vh, 0); opacity: 0 }
          10%  { opacity: 1 }
          100% { transform: translate3d(-6vh, 116vh, 0); opacity: 0 }
        }
      `}</style>

      {/* rain */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {streaks.map((s, i) => (
          <span
            key={i}
            className="absolute top-0 w-px"
            style={{
              left: `${s.left}%`,
              height: s.len,
              background: "linear-gradient(180deg, transparent, oklch(0.99 0.01 240 / 0.9))",
              opacity: s.op,
              animation: `ame-fall ${s.dur * 2.6}s linear ${s.delay}s infinite`,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div style={{ y: lineY }}>
          <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ink/50">Chapter · 雨 · One Umbrella</div>
          <h2 className="max-w-2xl font-serif text-5xl italic leading-[1.05] text-ink md:text-7xl">
            One umbrella,
            <br />
            two people walking slower.
          </h2>
          <p className="mt-8 max-w-md text-sm font-light leading-relaxed text-ink/60">
            相合傘。The oldest excuse in Japan for standing close to someone.
          </p>
        </motion.div>

        {/* umbrella */}
        <motion.div style={{ y: umbrellaY, rotate: umbrellaTilt }} className="relative mx-auto mt-20 w-64 md:w-96">
          <motion.div
            className="absolute -inset-16 rounded-full"
            style={{ opacity: glow, background: "radial-gradient(circle, oklch(0.98 0.03 20 / 0.55), transparent 68%)" }}
          />
          <svg viewBox="0 0 320 260" className="relative w-full" aria-hidden>
            <defs>
              <linearGradient id="ame-canopy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.88 0.09 15)" />
                <stop offset="100%" stopColor="oklch(0.74 0.11 12)" />
              </linearGradient>
            </defs>
            <path d="M16 108 C 16 44, 76 8, 160 8 C 244 8, 304 44, 304 108 Z" fill="url(#ame-canopy)" />
            <g stroke="oklch(0.99 0 0 / 0.45)" strokeWidth="1.4" fill="none">
              <path d="M62 108 C 62 52, 104 12, 160 8" />
              <path d="M110 108 C 110 56, 136 14, 160 8" />
              <path d="M210 108 C 210 56, 184 14, 160 8" />
              <path d="M258 108 C 258 52, 216 12, 160 8" />
            </g>
            <path
              d="M16 108 C 42 128, 62 128, 86 108 C 110 128, 136 128, 160 108 C 184 128, 210 128, 234 108 C 258 128, 280 128, 304 108"
              fill="none"
              stroke="oklch(0.66 0.11 12)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path d="M160 8 L160 214" stroke="oklch(0.3 0.02 60)" strokeWidth="4" strokeLinecap="round" />
            <path d="M160 214 C 160 236, 138 240, 134 222" fill="none" stroke="oklch(0.3 0.02 60)" strokeWidth="4" strokeLinecap="round" />
            {/* two silhouettes beneath */}
            <g fill="oklch(0.22 0.01 260 / 0.85)">
              <circle cx="128" cy="150" r="15" />
              <path d="M108 256 C 108 200, 118 176, 128 176 C 138 176, 148 200, 148 256 Z" />
              <circle cx="192" cy="144" r="16" />
              <path d="M170 256 C 170 196, 182 170, 192 170 C 202 170, 214 196, 214 256 Z" />
            </g>
          </svg>
        </motion.div>

        {/* puddle reflection */}
        <div
          className="mx-auto mt-2 h-16 w-64 md:w-96"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, oklch(0.99 0.01 240 / 0.7), transparent 70%)",
            filter: "blur(2px)",
          }}
        />

        <div className="mt-16 border-t border-ink/10 pt-8">
          <p className="max-w-xl font-serif text-xl italic leading-relaxed text-ink/75 md:text-2xl">
            “濡れてもいい。もう少し、このまま。”
          </p>
          <div className="mt-4 text-[9px] uppercase tracking-[0.5em] text-ink/40">
            I don’t mind getting wet · a little longer, like this
          </div>
        </div>
      </div>
    </section>
  );
}
