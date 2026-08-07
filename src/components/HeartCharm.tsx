import { useEffect, useRef, useState } from "react";

// A cute 3D heart charm — pure CSS 3D (no WebGL, no three.js), so it costs
// almost nothing. It only animates while on-screen, and stops entirely for
// users who prefer reduced motion.

const SLICES = 14;

export function HeartCharm() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setLive(!!e?.isIntersecting),
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="omamori"
      ref={ref}
      className="chapter-cv relative overflow-hidden bg-background py-32 md:py-40"
    >
      <style>{`
        @keyframes charm-spin { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
        @keyframes charm-bob { 0%,100% { transform: translateY(-4px); } 50% { transform: translateY(6px); } }
        @media (prefers-reduced-motion: reduce) {
          .charm-spin, .charm-bob { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-12 md:items-center lg:pl-32">
        <div className="md:col-span-6">
          <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ink/50">
            Chapter · 御守 · The Charm
          </div>
          <h2 className="font-serif text-5xl italic leading-[1.02] text-ink md:text-6xl">
            A small thing,
            <br />
            <span className="text-ink/40">carried everywhere.</span>
          </h2>
          <div className="hairline my-8 max-w-xs" />
          <p className="max-w-md text-sm font-light leading-relaxed text-ink/60">
            心。Turned slowly in the light, the way you turn a feeling over when no one is watching — glass-smooth on
            one side, still a little unfinished on the other.
          </p>
          <div className="mt-8 text-[10px] uppercase tracking-[0.4em] text-ink/40">
            Object Nº 01 · hand-turned
          </div>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <div
            className="relative mx-auto flex h-[300px] w-[300px] items-center justify-center"
            style={{ perspective: "900px" }}
          >
            {/* soft light pool */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, oklch(0.92 0.06 15 / 0.55), transparent 62%)",
              }}
            />

            <div
              className="charm-bob relative"
              style={{ animation: live ? "charm-bob 5.5s ease-in-out infinite" : "none" }}
            >
              <div
                className="charm-spin relative h-[150px] w-[150px]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateX(-12deg)",
                  animation: live ? "charm-spin 16s linear infinite" : "none",
                  willChange: "transform",
                }}
              >
                {Array.from({ length: SLICES }).map((_, i) => {
                  const t = i / (SLICES - 1);
                  const z = (t - 0.5) * 34;
                  const s = 0.82 + Math.sin(t * Math.PI) * 0.18;
                  const lit = 0.72 + Math.sin(t * Math.PI) * 0.16;
                  return (
                    <div
                      key={i}
                      className="absolute inset-0"
                      style={{
                        transform: `translateZ(${z}px) scale(${s})`,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <svg viewBox="0 0 100 100" className="h-full w-full">
                        <path
                          d="M50 88 C20 66 8 49 8 33 C8 20 18 11 29 11 C38 11 46 16 50 25 C54 16 62 11 71 11 C82 11 92 20 92 33 C92 49 80 66 50 88 Z"
                          fill={`oklch(${lit} 0.11 15 / ${i === SLICES - 1 ? 0.95 : 0.5})`}
                        />
                      </svg>
                    </div>
                  );
                })}

                {/* front highlight */}
                <div
                  className="absolute inset-0"
                  style={{ transform: "translateZ(19px)" }}
                  aria-hidden
                >
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <ellipse cx="34" cy="32" rx="10" ry="14" fill="oklch(0.995 0.01 15 / 0.6)" transform="rotate(-24 34 32)" />
                    <ellipse cx="66" cy="30" rx="4" ry="6" fill="oklch(0.995 0.01 15 / 0.35)" transform="rotate(-18 66 30)" />
                  </svg>
                </div>
              </div>

              {/* silk cord + tassel */}
              <div className="pointer-events-none absolute left-1/2 top-[-58px] h-[58px] w-px -translate-x-1/2 bg-ink/25" />
              <div className="pointer-events-none absolute left-1/2 top-[-62px] h-2 w-2 -translate-x-1/2 rounded-full bg-ink/30" />
            </div>

            {/* contact shadow */}
            <div
              aria-hidden
              className="absolute bottom-6 left-1/2 h-4 w-32 -translate-x-1/2 rounded-full"
              style={{ background: "radial-gradient(ellipse, oklch(0.6 0.05 15 / 0.22), transparent 70%)", filter: "blur(4px)" }}
            />
          </div>

          <p className="mt-8 text-center text-2xl text-ink/60" style={{ fontFamily: "var(--font-script)" }}>
            keep it close
          </p>
        </div>
      </div>
    </section>
  );
}
