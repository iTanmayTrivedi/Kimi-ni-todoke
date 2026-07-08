import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import spring from "@/assets/poster-spring.jpg.asset.json";
import winter from "@/assets/poster-winter.jpeg.asset.json";

export function SeasonsDiptych() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const springY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const winterY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const bridge = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section ref={ref} className="relative bg-background py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-20 text-center">
          <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ink/50">Chapter V · Two Weathers</div>
          <h2 className="mx-auto max-w-3xl font-serif text-5xl italic leading-[0.95] text-ink md:text-7xl">
            From first bloom<br/><span className="text-ink/40">to falling snow.</span>
          </h2>
          <motion.p
            style={{ opacity: bridge }}
            className="mx-auto mt-8 max-w-lg text-sm font-light leading-relaxed text-ink/60"
          >
            Between these two frames — a laugh in April, a held hand in December — an entire adolescence learns to love, aloud.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <motion.figure style={{ y: springY }} className="relative">
            <div className="group relative overflow-hidden bg-white shadow-[0_30px_60px_-20px_oklch(0.7_0.15_15/0.3)]">
              <img src={spring.url} alt="Spring — From Me to You" loading="lazy" className="w-full transition-transform duration-[1600ms] ease-out group-hover:scale-105" />
            </div>
            <figcaption className="mt-6 flex items-baseline justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-ink/40">Season Nº 01</div>
                <p className="mt-2 font-serif text-2xl italic text-ink">Hydrangea Spring</p>
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-ink/50">2010 · Production I.G</div>
            </figcaption>
          </motion.figure>

          <motion.figure style={{ y: winterY }} className="relative md:mt-24">
            <div className="group relative overflow-hidden bg-white shadow-[0_30px_60px_-20px_oklch(0.6_0.1_240/0.3)]">
              <img src={winter.url} alt="Winter — 3rd Season" loading="lazy" className="w-full transition-transform duration-[1600ms] ease-out group-hover:scale-105" />
            </div>
            <figcaption className="mt-6 flex items-baseline justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-ink/40">Season Nº 03</div>
                <p className="mt-2 font-serif text-2xl italic text-ink">A Held-Hand Winter</p>
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-ink/50">2024 · Production I.G</div>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
