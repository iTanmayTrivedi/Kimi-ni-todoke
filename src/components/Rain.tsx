import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// 雨 — Ame. The shared umbrella. Three depth layers of rain (CSS transforms,
// GPU-composited), a scroll-tilting wagasa, drips, puddle ripples and a
// mirrored reflection. Everything is scroll-linked; nothing runs on rAF.

const layer = (n: number, seed: number, len: [number, number], dur: [number, number], op: [number, number], w: number) =>
  Array.from({ length: n }, (_, i) => ({
    left: ((i * seed) % 1000) / 10,
    delay: ((i * 17) % 26) / 10,
    dur: dur[0] + ((i * 7) % 10) / 10 * (dur[1] - dur[0]),
    len: len[0] + ((i * 11) % 10) / 10 * (len[1] - len[0]),
    op: op[0] + ((i * 5) % 5) / 5 * (op[1] - op[0]),
    w,
  }));

const far = layer(26, 37.3, [22, 44], [3.6, 5.2], [0.06, 0.14], 1);
const mid = layer(22, 43.7, [46, 88], [2.4, 3.4], [0.14, 0.3], 1);
const near = layer(10, 61.1, [110, 190], [1.4, 2.1], [0.22, 0.42], 2);

const ripples = [
  { x: 34, d: 0, s: 1 },
  { x: 52, d: 1.1, s: 0.7 },
  { x: 66, d: 2.2, s: 1.15 },
  { x: 45, d: 3.1, s: 0.85 },
];

const drips = [22, 48, 74, 92, 158, 226, 252, 278];

export function Rain() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.35 });

  const umbrellaY = useTransform(p, [0, 1], [70, -50]);
  const umbrellaTilt = useTransform(p, [0, 0.5, 1], [-5, 0, 5]);
  const umbrellaScale = useTransform(p, [0, 0.5, 1], [0.94, 1.02, 0.98]);
  const glow = useTransform(p, [0.15, 0.6], [0, 1]);
  const lineY = useTransform(p, [0, 1], [50, -50]);
  const mist = useTransform(p, [0, 0.5, 1], [0.1, 0.55, 0.2]);
  const reflectOpacity = useTransform(p, [0.2, 0.6], [0, 0.35]);
  const quoteY = useTransform(p, [0, 1], [30, -30]);

  return (
    <section
      ref={ref}
      id="ame"
      className="relative overflow-hidden py-44"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.95 0.012 240) 0%, oklch(0.88 0.02 235) 42%, oklch(0.9 0.022 220) 72%, oklch(0.93 0.02 200) 100%)",
      }}
    >
      <style>{`
        @keyframes ame-fall {
          0%   { transform: translate3d(0, -20vh, 0); opacity: 0 }
          8%   { opacity: 1 }
          100% { transform: translate3d(-7vh, 118vh, 0); opacity: 0 }
        }
        @keyframes ame-ripple {
          0%   { transform: scale(0.2); opacity: 0 }
          15%  { opacity: 0.7 }
          100% { transform: scale(1.6); opacity: 0 }
        }
        @keyframes ame-drip {
          0%, 62%  { transform: translate3d(0, 0, 0) scaleY(0.4); opacity: 0 }
          70%      { opacity: 0.85 }
          100%     { transform: translate3d(0, 84px, 0) scaleY(1.6); opacity: 0 }
        }
      `}</style>

      {/* rain — three depths */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {[far, mid, near].map((set, li) =>
          set.map((s, i) => (
            <span
              key={`${li}-${i}`}
              className="absolute top-0"
              style={{
                left: `${s.left}%`,
                width: s.w,
                height: s.len,
                background: "linear-gradient(180deg, transparent, oklch(0.99 0.01 240 / 0.95))",
                opacity: s.op,
                filter: li === 0 ? "blur(1.2px)" : li === 2 ? "blur(0.2px)" : "none",
                animation: `ame-fall ${s.dur}s linear ${s.delay}s infinite`,
                willChange: "transform, opacity",
              }}
            />
          )),
        )}
      </div>

      {/* drifting mist veils */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        aria-hidden
        style={{
          opacity: mist,
          background:
            "radial-gradient(ellipse at 30% 100%, oklch(0.99 0.005 240 / 0.9), transparent 60%), radial-gradient(ellipse at 78% 100%, oklch(0.99 0.005 240 / 0.7), transparent 62%)",
        }}
      />

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
        <motion.div
          style={{ y: umbrellaY, rotate: umbrellaTilt, scale: umbrellaScale }}
          className="relative mx-auto mt-20 w-64 md:w-96"
        >
          <motion.div
            className="absolute -inset-16 rounded-full"
            style={{ opacity: glow, background: "radial-gradient(circle, oklch(0.98 0.03 20 / 0.6), transparent 68%)" }}
          />
          <svg viewBox="0 0 320 260" className="relative w-full" aria-hidden>
            <defs>
              <linearGradient id="ame-canopy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.92 0.07 18)" />
                <stop offset="55%" stopColor="oklch(0.82 0.1 14)" />
                <stop offset="100%" stopColor="oklch(0.7 0.12 11)" />
              </linearGradient>
              <linearGradient id="ame-sheen" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(1 0 0 / 0.5)" />
                <stop offset="45%" stopColor="oklch(1 0 0 / 0.06)" />
                <stop offset="100%" stopColor="oklch(1 0 0 / 0)" />
              </linearGradient>
            </defs>
            <path d="M16 108 C 16 44, 76 8, 160 8 C 244 8, 304 44, 304 108 Z" fill="url(#ame-canopy)" />
            <path d="M16 108 C 16 44, 76 8, 160 8 C 244 8, 304 44, 304 108 Z" fill="url(#ame-sheen)" />
            <g stroke="oklch(0.99 0 0 / 0.4)" strokeWidth="1.2" fill="none">
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
            {/* drips from the canopy rim */}
            <g fill="oklch(0.99 0.01 240 / 0.9)">
              {drips.map((x, i) => (
                <rect
                  key={x}
                  x={x}
                  y={118}
                  width="1.4"
                  height="12"
                  rx="0.7"
                  style={{
                    animation: `ame-drip ${2.6 + (i % 4) * 0.45}s linear ${(i * 0.37) % 2.4}s infinite`,
                    willChange: "transform, opacity",
                  }}
                />
              ))}
            </g>
            <path d="M160 8 L160 214" stroke="oklch(0.3 0.02 60)" strokeWidth="4" strokeLinecap="round" />
            <path d="M160 214 C 160 236, 138 240, 134 222" fill="none" stroke="oklch(0.3 0.02 60)" strokeWidth="4" strokeLinecap="round" />
            {/* two silhouettes beneath */}
            <g fill="oklch(0.22 0.01 260 / 0.85)">
              <circle cx="128" cy="150" r="15" />
              <path d="M108 256 C 108 200, 118 176, 128 176 C 138 176, 148 200, 148 256 Z" />
              <circle cx="192" cy="144" r="16" />
              <path d="M170 256 C 170 196, 182 170, 192 170 C 202 170, 214 196, 214 256 Z" />
              {/* the barely-touching shoulders */}
              <path d="M148 206 C 158 200, 166 200, 172 204 L 172 214 C 164 210, 156 210, 148 216 Z" opacity="0.7" />
            </g>
          </svg>
        </motion.div>

        {/* puddle: mirrored umbrella + ripples */}
        <div className="relative mx-auto mt-1 w-64 md:w-96">
          <motion.svg
            viewBox="0 0 320 260"
            className="w-full"
            aria-hidden
            style={{ opacity: reflectOpacity, transform: "scaleY(-0.42)", filter: "blur(3px)" }}
          >
            <path d="M16 108 C 16 44, 76 8, 160 8 C 244 8, 304 44, 304 108 Z" fill="oklch(0.8 0.09 14)" />
            <path d="M160 8 L160 214" stroke="oklch(0.3 0.02 60)" strokeWidth="4" />
          </motion.svg>
          <div
            className="absolute inset-x-0 bottom-0 h-20"
            aria-hidden
            style={{
              background: "radial-gradient(ellipse at 50% 100%, oklch(0.99 0.01 240 / 0.75), transparent 72%)",
              filter: "blur(2px)",
            }}
          />
          {ripples.map((r) => (
            <span
              key={`${r.x}-${r.d}`}
              aria-hidden
              className="absolute rounded-[50%] border"
              style={{
                left: `${r.x}%`,
                bottom: 6,
                width: 44 * r.s,
                height: 12 * r.s,
                borderColor: "oklch(0.99 0.01 240 / 0.8)",
                animation: `ame-ripple ${3.2 + r.d * 0.3}s ease-out ${r.d}s infinite`,
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>

        <motion.div style={{ y: quoteY }} className="mt-20 border-t border-ink/10 pt-8">
          <p className="max-w-xl font-serif text-xl italic leading-relaxed text-ink/75 md:text-2xl">
            “濡れてもいい。もう少し、このまま。”
          </p>
          <div className="mt-4 text-[9px] uppercase tracking-[0.5em] text-ink/40">
            I don’t mind getting wet · a little longer, like this
          </div>
        </motion.div>
      </div>
    </section>
  );
}
