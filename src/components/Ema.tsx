import { useEffect, useRef, useState } from "react";

// 絵馬 — Ema. Wooden votive plaques hung at a shrine, each carrying a wish
// written on its back. Pure SVG + CSS transforms: they sway on the same
// pendulum curve as the fūrin, pause off-screen, and honour reduced motion.

const plaques = [
  { kanji: "叶", jp: "叶いますように", en: "May it come true", wish: "That the words I rehearse all night arrive whole.", delay: 0, tilt: -3, hue: "oklch(0.88 0.055 55)" },
  { kanji: "友", jp: "はじめての友", en: "A first friend", wish: "Two names spoken back to me, without flinching.", delay: 0.9, tilt: 2, hue: "oklch(0.9 0.05 95)" },
  { kanji: "勇", jp: "少しの勇気", en: "A little courage", wish: "One step forward. Only one. Then another.", delay: 1.8, tilt: -2, hue: "oklch(0.87 0.06 30)" },
  { kanji: "縁", jp: "この縁", en: "This thread", wish: "Let the thread hold, even through a long winter.", delay: 2.7, tilt: 3, hue: "oklch(0.89 0.05 145)" },
  { kanji: "声", jp: "届く声", en: "A voice that carries", wish: "That my quiet is not mistaken for absence.", delay: 3.6, tilt: -1, hue: "oklch(0.88 0.05 340)" },
  { kanji: "春", jp: "また春に", en: "Spring, again", wish: "To stand under the same tree, a year braver.", delay: 4.5, tilt: 2, hue: "oklch(0.9 0.05 15)" },
];

export function Ema() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="ema"
      className="chapter-cv relative overflow-hidden py-40"
      style={{ background: "linear-gradient(180deg, oklch(0.96 0.018 60) 0%, oklch(0.975 0.012 30) 100%)" }}
    >
      <style>{`
        @keyframes ema-sway {
          0%   { transform: rotate(var(--a)); }
          12%  { transform: rotate(calc(var(--a) * 0.72)); }
          25%  { transform: rotate(0deg); }
          38%  { transform: rotate(calc(var(--a) * -0.72)); }
          50%  { transform: rotate(calc(var(--a) * -1)); }
          62%  { transform: rotate(calc(var(--a) * -0.72)); }
          75%  { transform: rotate(0deg); }
          88%  { transform: rotate(calc(var(--a) * 0.72)); }
          100% { transform: rotate(var(--a)); }
        }
        .ema-plaque {
          transform-origin: 50% 0%;
          backface-visibility: hidden;
          will-change: transform;
        }
        .ema-live .ema-plaque {
          animation: ema-sway 7.5s linear infinite;
          animation-timing-function: linear;
        }
        .ema-plaque:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .ema-live .ema-plaque { animation: none; }
        }
      `}</style>


      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:pl-32">
        <div className="mb-20 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ink/50">Chapter · 絵馬 · Votive Plaques</div>
            <h2 className="font-serif text-5xl italic leading-[1.02] text-ink md:text-7xl">
              Six wishes,
              <br />
              <span className="text-ink/40">hung out to weather.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:self-end">
            <div className="hairline mb-6" />
            <p className="text-sm font-light leading-relaxed text-ink/60">
              At the shrine you write the thing you cannot say aloud on a small cedar tablet, and leave it to the wind.
              Hover a plaque to still it and read the other side.
            </p>
          </div>
        </div>

        <div className={`grid grid-cols-2 gap-x-6 gap-y-16 sm:grid-cols-3 lg:grid-cols-6 ${live ? "ema-live" : ""}`}>
          {plaques.map((p, i) => (
            <div key={p.kanji} className="flex flex-col items-center">
              <div
                className="ema-plaque relative"
                style={{ ["--a" as string]: `${p.tilt}deg`, animationDelay: `-${p.delay}s` }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                {/* cord */}
                <svg viewBox="0 0 60 44" className="mx-auto block w-[60px]" aria-hidden>
                  <path d="M30 0 L14 40" stroke="oklch(0.62 0.09 25)" strokeWidth="1.4" fill="none" />
                  <path d="M30 0 L46 40" stroke="oklch(0.62 0.09 25)" strokeWidth="1.4" fill="none" />
                </svg>

                {/* the tablet: pentagonal cedar ema */}
                <svg viewBox="0 0 120 100" className="-mt-1 w-full max-w-[132px] drop-shadow-[0_16px_28px_oklch(0.3_0.05_40/0.28)]" role="img" aria-label={`${p.jp} — ${p.en}`}>
                  <defs>
                    <linearGradient id={`ema-g-${i}`} x1="0" y1="0" x2="0.4" y2="1">
                      <stop offset="0%" stopColor={p.hue} />
                      <stop offset="100%" stopColor="oklch(0.8 0.05 55)" />
                    </linearGradient>
                  </defs>
                  <path d="M60 2 L114 26 L114 96 L6 96 L6 26 Z" fill={`url(#ema-g-${i})`} stroke="oklch(0.5 0.06 45 / 0.5)" strokeWidth="1.5" />
                  {/* woodgrain */}
                  <g stroke="oklch(0.45 0.05 45 / 0.16)" strokeWidth="0.7">
                    {[38, 50, 62, 74, 86].map((y) => (
                      <path key={y} d={`M10 ${y} Q60 ${y - 3} 110 ${y}`} fill="none" />
                    ))}
                  </g>
                  <text
                    x="60"
                    y="72"
                    textAnchor="middle"
                    style={{ fontFamily: "var(--font-jp)", fontSize: 44, fill: "oklch(0.24 0.02 40 / 0.85)" }}
                  >
                    {p.kanji}
                  </text>
                </svg>
              </div>

              <div className="mt-5 min-h-[92px] text-center">
                <div className="text-sm text-ink/70" style={{ fontFamily: "var(--font-jp)" }}>{p.jp}</div>
                <div className="mt-1 text-[9px] uppercase tracking-[0.35em] text-ink/40">{p.en}</div>
                <p
                  className="mt-3 text-xs font-light italic leading-relaxed text-ink/60 transition-opacity duration-500"
                  style={{ opacity: hover === i ? 1 : 0 }}
                >
                  {p.wish}
                </p>
              </div>
            </div>
          ))}
          </div>
        </div>

      </div>
    </section>
  );
}
