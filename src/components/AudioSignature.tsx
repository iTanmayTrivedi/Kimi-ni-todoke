import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * A "spectrogram" of the show's silence — a live SVG waveform driven by a
 * gentle sine + noise composite. No audio actually plays; the animation
 * evokes an editorial score sheet.
 */
export function AudioSignature() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const [tick, setTick] = useState(0);
  useEffect(() => {
    let raf = 0;
    let last = 0;
    const loop = (t: number) => {
      if (t - last > 60) {
        setTick((n) => n + 1);
        last = t;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // 64 bars, sine + slight noise
  const bars = Array.from({ length: 64 }, (_, i) => {
    const phase = (tick / 30) + i * 0.35;
    const base = Math.sin(phase) * 0.5 + 0.5;
    const noise = (Math.sin(i * 12.9898 + tick) + 1) * 0.15;
    return Math.max(0.06, Math.min(1, base * 0.7 + noise));
  });

  return (
    <motion.section ref={ref} style={{ opacity }} className="relative bg-background py-32 md:py-48">
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-6 md:px-12">
        <div className="col-span-12 md:col-span-4">
          <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ink/50">Chapter · 音 · Score of Silence</div>
          <h2 className="font-serif text-4xl italic leading-[0.95] text-ink md:text-6xl">
            The sound<br/><span className="text-ink/40">of not-speaking.</span>
          </h2>
          <div className="mt-6 max-w-sm text-sm font-light leading-relaxed text-ink/60">
            Kimi ni Todoke is scored more by pauses than by notes. Between two heartbeats, a snowfall — this is the waveform of what is left unsaid.
          </div>
          <div className="mt-8 space-y-2 text-[10px] uppercase tracking-[0.4em] text-ink/40">
            <div className="flex justify-between"><span>Composer</span><span>S. Chihara</span></div>
            <div className="flex justify-between"><span>Motif</span><span>Kimi no Iru Machi</span></div>
            <div className="flex justify-between"><span>Tempo</span><span>68 bpm · Andante</span></div>
            <div className="flex justify-between"><span>Register</span><span>Piano · Strings</span></div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-8">
          <div className="relative aspect-[16/8] w-full border border-ink/10 bg-paper p-6 md:p-10">
            {/* graph paper */}
            <svg className="absolute inset-0 h-full w-full opacity-40" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(0.85 0.02 15)" strokeWidth="0.4" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* waveform bars */}
            <div className="relative flex h-full items-center gap-[3px]">
              {bars.map((v, i) => (
                <div key={i} className="flex-1" style={{ height: `${v * 100}%`, background: `linear-gradient(180deg, oklch(0.7 0.12 15) 0%, oklch(0.85 0.06 340) 100%)`, opacity: 0.75 }} />
              ))}
            </div>

            {/* corner labels */}
            <div className="absolute left-4 top-4 text-[9px] uppercase tracking-[0.4em] text-ink/40">Track 04 · Yuki no Ato</div>
            <div className="absolute right-4 top-4 text-[9px] uppercase tracking-[0.4em] text-ink/40">03 : 22</div>
            <div className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.4em] text-ink/40">−∞ dB</div>
            <div className="absolute bottom-4 right-4 text-[9px] uppercase tracking-[0.4em] text-ink/40">0 dB</div>
          </div>
          <div className="mt-4 flex justify-between text-[10px] uppercase tracking-[0.4em] text-ink/40">
            <span>Waveform reconstructed for exhibit</span>
            <span>Rendered live · 60 fps</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
