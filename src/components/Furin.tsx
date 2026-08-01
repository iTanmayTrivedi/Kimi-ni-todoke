import { useEffect, useRef, useState } from "react";

// 風鈴 — Fūrin. The glass wind chime hung at the eaves in summer.
// Pure SVG + CSS transforms only: no canvas, no rAF loop, no per-frame JS.
// Each chime carries a tanzaku paper strip bearing one line of the story.
// Everything pauses when the section leaves the viewport, and honours
// prefers-reduced-motion.

const chimes = [
  { kanji: "風", en: "Wind", jp: "風のたより", line: "A breeze crosses the corridor and someone says your name.", delay: 0, len: 132, hue: "oklch(0.86 0.06 200)" },
  { kanji: "音", en: "Sound", jp: "澄んだ音", line: "Glass answers the air. Small, clear, unafraid.", delay: 0.7, len: 168, hue: "oklch(0.88 0.05 150)" },
  { kanji: "夏", en: "Summer", jp: "夕暮れの縁", line: "The long evenings when nothing happens, and everything does.", delay: 1.4, len: 108, hue: "oklch(0.9 0.05 30)" },
  { kanji: "待", en: "Waiting", jp: "待つ時間", line: "She waited a whole season to say one sentence.", delay: 2.1, len: 150, hue: "oklch(0.87 0.05 320)" },
  { kanji: "届", en: "Reaching", jp: "君に届け", line: "And when it reached him, the air itself rang.", delay: 2.8, len: 120, hue: "oklch(0.85 0.07 15)" },
];

export function Furin() {
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
      id="furin"
      className="relative overflow-hidden py-40"
      style={{ background: "linear-gradient(180deg, oklch(0.985 0.006 60) 0%, oklch(0.96 0.015 200) 100%)" }}
    >
      <style>{`
        /* True pendulum motion: sampled sine so the swing never "kicks" at the
           turnaround. Paired with animation-timing-function: linear. */
        @keyframes furin-sway {
          0%    { transform: translateZ(0) rotate(-6.5deg) }
          12.5% { transform: translateZ(0) rotate(-4.6deg) }
          25%   { transform: translateZ(0) rotate(0deg) }
          37.5% { transform: translateZ(0) rotate(4.6deg) }
          50%   { transform: translateZ(0) rotate(6.5deg) }
          62.5% { transform: translateZ(0) rotate(4.6deg) }
          75%   { transform: translateZ(0) rotate(0deg) }
          87.5% { transform: translateZ(0) rotate(-4.6deg) }
          100%  { transform: translateZ(0) rotate(-6.5deg) }
        }
        /* The paper strip trails the bell — same sine, wider arc, phase-lagged
           via a negative animation-delay. */
        @keyframes furin-strip {
          0%    { transform: translateZ(0) rotate(-11deg) }
          12.5% { transform: translateZ(0) rotate(-7.8deg) }
          25%   { transform: translateZ(0) rotate(0deg) }
          37.5% { transform: translateZ(0) rotate(7.8deg) }
          50%   { transform: translateZ(0) rotate(11deg) }
          62.5% { transform: translateZ(0) rotate(7.8deg) }
          75%   { transform: translateZ(0) rotate(0deg) }
          87.5% { transform: translateZ(0) rotate(-7.8deg) }
          100%  { transform: translateZ(0) rotate(-11deg) }
        }
      `}</style>


      {/* Eave line the chimes hang from */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-40">
        <div className="absolute inset-x-0 top-32 h-px bg-ink/15" />
        <div
          className="absolute inset-x-0 top-0 h-32"
          style={{ background: "linear-gradient(180deg, oklch(0.22 0.01 260 / 0.06), transparent)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ink/50">
          Chapter · 風鈴 · The Wind Chime
        </div>
        <h2 className="max-w-2xl font-serif text-5xl italic leading-[1.05] text-ink md:text-7xl">
          Five notes,
          <br />
          carried by the air.
        </h2>
        <p className="mt-8 max-w-md text-sm font-light leading-relaxed text-ink/60">
          Hover a chime to still it and read its tanzaku. 短冊に、ひとこと。
        </p>

        {/* Chime row */}
        <div className="mt-24 grid grid-cols-5 gap-2 md:gap-8">
          {chimes.map((c, i) => {
            const stilled = hover === i;
            const anim = live && !stilled;
            return (
              <button
                key={c.kanji}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                className="group flex flex-col items-center outline-none"
                aria-label={`${c.en} — ${c.line}`}
              >
                {/* string */}
                <div className="h-10 w-px bg-ink/25 md:h-16" />

                {/* pivot: bell + strip sway together */}
                <div
                  className="flex flex-col items-center"
                  style={{
                    transformOrigin: "50% 0%",
                    animation: `furin-sway ${3.4 + i * 0.35}s linear ${c.delay}s infinite`,
                    animationPlayState: anim ? "running" : "paused",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                >

                  {/* glass bell */}
                  <svg viewBox="0 0 80 90" className="h-16 w-16 md:h-24 md:w-24" aria-hidden>
                    <defs>
                      <radialGradient id={`g-${i}`} cx="35%" cy="25%" r="75%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.95" />
                        <stop offset="60%" stopColor={c.hue} stopOpacity="0.55" />
                        <stop offset="100%" stopColor={c.hue} stopOpacity="0.28" />
                      </radialGradient>
                    </defs>
                    <path
                      d="M40 8 C 18 8, 6 34, 6 56 C 6 72, 22 80, 40 80 C 58 80, 74 72, 74 56 C 74 34, 62 8, 40 8 Z"
                      fill={`url(#g-${i})`}
                      stroke="oklch(0.22 0.01 260 / 0.22)"
                      strokeWidth="1"
                    />
                    <ellipse cx="40" cy="80" rx="34" ry="5" fill="none" stroke="oklch(0.22 0.01 260 / 0.2)" />
                    <path d="M22 26 C 18 40, 18 54, 24 66" fill="none" stroke="white" strokeOpacity="0.7" strokeWidth="2.5" strokeLinecap="round" />
                    <text
                      x="40"
                      y="58"
                      textAnchor="middle"
                      style={{ fontFamily: "var(--font-jp)" }}
                      className="fill-ink/70"
                      fontSize="26"
                    >
                      {c.kanji}
                    </text>
                  </svg>

                  {/* tanzaku paper strip — same period as the bell, phase-lagged */}
                  <div
                    className="mt-1"
                    style={{
                      transformOrigin: "50% 0%",
                      animation: `furin-strip ${3.4 + i * 0.35}s linear ${c.delay - 0.42}s infinite`,
                      animationPlayState: anim ? "running" : "paused",
                      willChange: "transform",
                      backfaceVisibility: "hidden",
                    }}
                  >

                    <div
                      className="flex h-20 w-6 items-start justify-center bg-paper pt-2 text-[9px] leading-[1.4] tracking-[0.2em] text-ink/60 md:h-28 md:w-7"
                      style={{
                        writingMode: "vertical-rl",
                        fontFamily: "var(--font-jp)",
                        boxShadow: "0 10px 24px oklch(0 0 0 / 0.12)",
                      }}
                    >
                      {c.jp}
                    </div>
                  </div>
                </div>

                {/* label */}
                <div className="mt-6 text-[9px] uppercase tracking-[0.4em] text-ink/40 transition-colors duration-300 group-hover:text-ink">
                  {c.en}
                </div>
                <div
                  className="mt-3 h-px transition-all duration-500"
                  style={{ width: stilled ? 28 : 0, background: "oklch(0.7 0.15 15)" }}
                />
              </button>
            );
          })}
        </div>

        {/* read-out */}
        <div className="mt-16 min-h-24 border-t border-ink/10 pt-8">
          <p
            key={hover ?? "idle"}
            className="max-w-xl font-serif text-xl italic leading-relaxed text-ink/80 md:text-2xl"
            style={{ animation: "fade-in 0.5s ease-out" }}
          >
            {hover === null ? "五つの音が、ひとつの物語になる。" : chimes[hover]!.line}
          </p>
          <div className="mt-4 text-[9px] uppercase tracking-[0.5em] text-ink/40">
            {hover === null ? "Five notes, one story" : `${String(hover + 1).padStart(2, "0")} / 05 · ${chimes[hover]!.len} Hz`}
          </div>
        </div>
      </div>
    </section>
  );
}
