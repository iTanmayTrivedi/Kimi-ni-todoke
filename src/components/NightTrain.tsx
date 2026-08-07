import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// 夜行 — Yakō. The night train home. Vertical scroll drives the landscape
// past the window: far hills, a distant town, telegraph poles snapping by,
// and a face half-reflected in the cold glass. All GPU transforms.

const poles = Array.from({ length: 14 }, (_, i) => i);
const townLights = Array.from({ length: 26 }, (_, i) => ({
  x: (i * 37) % 100,
  y: 46 + ((i * 13) % 9),
  d: (i % 7) * 0.4,
}));

export function NightTrain() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.35 });

  const hills = useTransform(p, [0, 1], ["6%", "-6%"]);
  const town = useTransform(p, [0, 1], ["18%", "-18%"]);
  const rail = useTransform(p, [0, 1], ["55%", "-55%"]);
  const reflect = useTransform(p, [0.15, 0.5, 0.85], [0, 0.55, 0]);
  const poemY = useTransform(p, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      id="yako"
      className="chapter-cv relative overflow-hidden py-40"
      style={{ background: "linear-gradient(180deg, oklch(0.16 0.02 265) 0%, oklch(0.12 0.02 270) 100%)" }}
    >
      <style>{`
        @keyframes yako-flicker { 0%,100%{opacity:.85} 50%{opacity:.35} }
        @keyframes yako-hum { 0%{transform:translateY(0)} 50%{transform:translateY(0.6px)} 100%{transform:translateY(0)} }
        .yako-car { }
        @media (prefers-reduced-motion: reduce) {
          .yako-car { animation: none; }
          [data-yako-anim] { animation: none !important; }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:pl-32">
        <div className="mb-16 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="mb-4 text-[10px] uppercase tracking-[0.5em]" style={{ color: "oklch(0.88 0.03 250 / 0.55)" }}>
              Chapter · 夜行 · The Night Train
            </div>
            <h2 className="font-serif text-5xl italic leading-[1.02] md:text-7xl" style={{ color: "oklch(0.95 0.01 250)" }}>
              The window keeps
              <br />
              <span style={{ color: "oklch(0.95 0.01 250 / 0.42)" }}>two of everything.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:self-end">
            <div className="hairline mb-6" style={{ opacity: 0.25 }} />
            <p className="text-sm font-light leading-relaxed" style={{ color: "oklch(0.9 0.02 250 / 0.6)" }}>
              夜の窓。Outside, the country goes by in the dark. Inside, a face you keep almost looking at — held in the
              glass, one carriage-length from saying it.
            </p>
          </div>
        </div>

        {/* the carriage window */}
        <div
          className="yako-car relative overflow-hidden rounded-[18px]"
          style={{
            border: "1px solid oklch(0.85 0.03 250 / 0.16)",
            boxShadow:
              "0 60px 120px -50px oklch(0 0 0 / 0.8), inset 0 1px 0 oklch(0.99 0 0 / 0.08), inset 0 0 60px oklch(0 0 0 / 0.6)",
            background: "linear-gradient(180deg, oklch(0.14 0.025 265) 0%, oklch(0.1 0.02 270) 100%)",
          }}
        >
          <div className="relative h-[54vh] min-h-[320px] w-full overflow-hidden md:h-[62vh]">
            {/* sky + stars */}
            <div
              className="absolute inset-0"
              aria-hidden
              style={{ background: "radial-gradient(ellipse at 70% 15%, oklch(0.32 0.04 265 / 0.7), transparent 65%)" }}
            />
            {Array.from({ length: 40 }).map((_, i) => (
              <span
                key={i}
                aria-hidden
                data-yako-anim
                className="absolute rounded-full"
                style={{
                  left: `${(i * 53) % 100}%`,
                  top: `${(i * 29) % 42}%`,
                  width: i % 5 === 0 ? 2 : 1.2,
                  height: i % 5 === 0 ? 2 : 1.2,
                  background: "oklch(0.96 0.02 250)",
                  opacity: 0.5,
                  animation: `yako-flicker ${3 + (i % 5)}s ease-in-out ${(i % 7) * 0.4}s infinite`,
                }}
              />
            ))}

            {/* far hills */}
            <motion.svg
              style={{ x: hills }}
              viewBox="0 0 1600 400"
              preserveAspectRatio="none"
              className="absolute inset-x-[-10%] bottom-0 h-[62%] w-[120%]"
              aria-hidden
            >
              <path
                d="M0 300 Q180 190 340 260 T680 210 Q860 150 1040 250 T1380 200 Q1520 160 1600 220 L1600 400 L0 400 Z"
                fill="oklch(0.19 0.025 268)"
              />
            </motion.svg>

            {/* distant town */}
            <motion.div style={{ x: town }} className="absolute inset-x-[-20%] bottom-0 h-[46%] w-[140%]" aria-hidden>
              {townLights.map((t, i) => (
                <span
                  key={i}
                  data-yako-anim
                  className="absolute rounded-[1px]"
                  style={{
                    left: `${t.x}%`,
                    top: `${t.y}%`,
                    width: 2.5,
                    height: 2.5,
                    background: "oklch(0.9 0.1 78)",
                    boxShadow: "0 0 8px oklch(0.88 0.12 78 / 0.8)",
                    animation: `yako-flicker ${2.4 + (i % 4)}s ease-in-out ${t.d}s infinite`,
                  }}
                />
              ))}
              <svg viewBox="0 0 1600 200" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[54%] w-full">
                <path
                  d="M0 150 L120 150 L120 110 L220 110 L220 140 L360 140 L360 96 L470 96 L470 150 L640 150 L640 120 L760 120 L760 150 L940 150 L940 104 L1050 104 L1050 150 L1240 150 L1240 126 L1360 126 L1360 150 L1600 150 L1600 200 L0 200 Z"
                  fill="oklch(0.15 0.02 268)"
                />
              </svg>
            </motion.div>

            {/* telegraph poles snapping past */}
            <motion.div style={{ x: rail }} className="absolute inset-x-[-60%] bottom-0 h-full w-[220%]" aria-hidden>
              {poles.map((i) => (
                <div
                  key={i}
                  className="absolute bottom-0"
                  style={{ left: `${i * 7.4}%`, height: `${58 + (i % 3) * 6}%`, width: 2 }}
                >
                  <div className="h-full w-full" style={{ background: "oklch(0.1 0.01 270)" }} />
                  <div
                    className="absolute left-1/2 top-[8%] h-[2px] w-[26px] -translate-x-1/2"
                    style={{ background: "oklch(0.1 0.01 270)" }}
                  />
                </div>
              ))}
            </motion.div>

            {/* embankment */}
            <div
              className="absolute inset-x-0 bottom-0 h-[16%]"
              aria-hidden
              style={{ background: "linear-gradient(180deg, oklch(0.11 0.015 270), oklch(0.08 0.01 270))" }}
            />

            {/* reflection in the glass — the carriage interior, receding */}
            <motion.div
              style={{ opacity: reflect }}
              className="pointer-events-none absolute inset-0"
              aria-hidden
            >
              {/* row of overhead lamps, receding toward the vanishing point */}
              {[0, 1, 2, 3, 4].map((i) => {
                const t = i / 4;
                const w = 92 - t * 66;
                return (
                  <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      left: `${8 + t * 54}%`,
                      top: `${22 + t * 9}%`,
                      width: w,
                      height: w * 0.3,
                      background:
                        "radial-gradient(ellipse at 50% 50%, oklch(0.95 0.05 85 / 0.5), oklch(0.9 0.06 85 / 0.12) 60%, transparent 75%)",
                      filter: "blur(2px)",
                      opacity: 1 - t * 0.55,
                    }}
                  />
                );
              })}

              {/* reflected seat-back line + luggage rack, one-point perspective */}
              <svg
                viewBox="0 0 400 300"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                style={{ filter: "blur(0.6px)" }}
              >
                <g stroke="oklch(0.85 0.03 250)" strokeWidth="0.8" opacity="0.18" fill="none">
                  <path d="M-10 96 L250 132" />
                  <path d="M-10 214 L250 170" />
                  <path d="M14 214 L14 108" />
                  <path d="M92 206 L92 116" />
                  <path d="M164 198 L164 124" />
                </g>
                <g fill="oklch(0.86 0.03 250)" opacity="0.1">
                  <path d="M-10 216 Q60 200 140 190 L150 214 Q70 224 -10 240 Z" />
                </g>
              </svg>

              {/* a fingertip heart drawn into the condensation */}
              <svg
                viewBox="0 0 100 100"
                className="absolute bottom-[26%] left-[13%] w-[74px] md:w-[92px]"
                aria-hidden
              >
                <path
                  d="M50 84 C22 64 10 48 10 34 C10 22 19 14 29 14 C37 14 45 19 50 27 C55 19 63 14 71 14 C81 14 90 22 90 34 C90 48 78 64 50 84 Z"
                  fill="none"
                  stroke="oklch(0.95 0.03 250)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  opacity="0.34"
                  style={{ filter: "blur(0.5px)" }}
                />
              </svg>
            </motion.div>


            {/* cold glass sheen + condensation */}
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              style={{
                background:
                  "linear-gradient(115deg, oklch(0.8 0.04 250 / 0.1) 0%, transparent 32%, transparent 68%, oklch(0.8 0.04 250 / 0.07) 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              style={{ background: "radial-gradient(ellipse at 50% 55%, transparent 40%, oklch(0.75 0.03 250 / 0.14) 100%)" }}
            />

            {/* vertical poem on the glass */}
            <motion.div
              style={{ y: poemY }}
              className="absolute right-6 top-8 text-2xl leading-tight md:right-10 md:text-3xl"
            >
              <span
                style={{
                  fontFamily: "var(--font-jp)",
                  writingMode: "vertical-rl",
                  color: "oklch(0.94 0.02 250 / 0.72)",
                  textShadow: "0 0 22px oklch(0.8 0.05 250 / 0.35)",
                }}
              >
                さよならは、次の駅で
              </span>
            </motion.div>
          </div>

          {/* window frame bottom rail */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 text-[9px] uppercase tracking-[0.4em]"
            style={{
              background: "linear-gradient(180deg, oklch(0.18 0.02 265), oklch(0.13 0.02 268))",
              color: "oklch(0.88 0.03 250 / 0.45)",
              borderTop: "1px solid oklch(0.85 0.03 250 / 0.12)",
            }}
          >
            <span>Car 3 · 自由席</span>
            <span className="hidden md:inline">さよならは、次の駅で · Goodbye at the next station</span>
            <span>Yakō · 夜行</span>
          </div>
        </div>

        <p className="mx-auto mt-14 max-w-md text-center text-sm font-light italic leading-relaxed" style={{ color: "oklch(0.9 0.02 250 / 0.55)" }}>
          Neither of them says it. The town goes out, one window at a time, and the glass keeps both faces a little
          longer than the night does.
        </p>
      </div>
    </section>
  );
}
