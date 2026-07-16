import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import confession from "@/assets/confession-panel.jpeg";
import ending from "@/assets/from-me-to-you-panel.jpg";

export function MangaPanels() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -120]);
  const rot1 = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const rot2 = useTransform(scrollYProgress, [0, 1], [3, -3]);

  return (
    <section ref={ref} className="relative bg-background py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-24 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ink/50">Chapter IV · Original Ink</div>
            <h2 className="font-serif text-5xl italic leading-[0.95] text-ink md:text-7xl">
              Panels that<br/>
              <span className="text-ink/40">held their breath.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:self-end">
            <div className="hairline mb-6" />
            <p className="text-sm font-light leading-relaxed text-ink/60">
              Two frames from Karuho Shiina's manga — the exact seconds a decade of feeling turned to language.
            </p>
          </div>
        </div>

        <div className="grid gap-16 md:grid-cols-12 md:gap-8">
          {/* Confession panel */}
          <motion.figure style={{ y: y1, rotate: rot1 }} className="md:col-span-6 md:col-start-1">
            <div className="relative overflow-hidden bg-white shadow-[0_40px_80px_-30px_oklch(0.2_0.04_20/0.25)]">
              <img src={confession} alt="The one I like is you" loading="lazy" className="w-full" />
              <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 20%, transparent 40%, oklch(0.98 0.01 20 / 0.35) 100%)" }} />
            </div>
            <figcaption className="mt-6">
              <div className="text-[10px] uppercase tracking-[0.4em] text-ink/40">Volume 05 · Panel Nº 137</div>
              <p className="mt-3 font-serif text-2xl italic leading-snug text-ink">
                &ldquo;Kuronuma&nbsp;— the one I like is you.&rdquo;
              </p>
              <p className="mt-3 text-sm font-light text-ink/60">The moment the shy girl became the named one.</p>
            </figcaption>
          </motion.figure>

          {/* Ending panel — offset */}
          <motion.figure style={{ y: y2, rotate: rot2 }} className="md:col-span-5 md:col-start-8 md:mt-32">
            <div className="relative overflow-hidden bg-white shadow-[0_40px_80px_-30px_oklch(0.2_0.04_20/0.25)]">
              <img src={ending} alt="From me to you — final volume" loading="lazy" className="w-full" />
              <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 30%, transparent 45%, oklch(0.98 0.01 20 / 0.3) 100%)" }} />
            </div>
            <figcaption className="mt-6">
              <div className="text-[10px] uppercase tracking-[0.4em] text-ink/40">Volume 30 · Final Page</div>
              <p className="mt-3 font-serif text-2xl italic leading-snug text-ink">&ldquo;…from me to you.&rdquo;</p>
              <p className="mt-3 text-sm font-light text-ink/60">A decade of quiet, folded closed with an embrace under bare trees.</p>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
