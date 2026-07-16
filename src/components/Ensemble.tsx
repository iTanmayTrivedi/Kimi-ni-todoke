import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ensemble from "@/assets/ensemble-wallpaper.jpg";
import duo from "@/assets/duo-wallpaper.jpg";

export function Ensemble() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.6]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-background">
      {/* Wide cinematic ensemble */}
      <div className="relative h-[90svh] w-full overflow-hidden">
        <motion.div style={{ scale, y }} className="absolute inset-0">
          <img src={ensemble} alt="The ensemble — Sawako, Kazehaya, Chizuru, Ayane, Ryu, Kento" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, oklch(0.985 0.01 20 / 0.4) 0%, transparent 30%, transparent 60%, oklch(0.985 0.01 20 / 0.85) 100%)" }} />
        </motion.div>

        <motion.div style={{ opacity }} className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-24 text-center">
          <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ink/70">Chapter VI · The Circle</div>
          <h2 className="max-w-4xl font-serif text-5xl italic leading-[0.95] text-ink md:text-8xl">
            Six friends<br/><span className="text-ink/60">one long spring.</span>
          </h2>
          <p className="mt-8 max-w-md text-sm font-light leading-relaxed text-ink/70">
            The circle that formed around a quiet girl — teasing, defending, waiting patiently for her to bloom.
          </p>
        </motion.div>
      </div>

      {/* Duo watercolor spread */}
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-32 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5 md:pt-24">
          <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ink/50">Editorial Plate · Nº XII</div>
          <h3 className="font-serif text-4xl italic leading-tight text-ink md:text-6xl">Uniforms &<br/>April light.</h3>
          <p className="mt-8 max-w-md text-sm font-light leading-relaxed text-ink/60">
            The first illustration Production I.G painted of them side by side — two shy silhouettes in cyan blazers, framed by wisteria and drifting petals. Neither looks at the other. Both are already thinking of the other.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 text-[10px] uppercase tracking-[0.3em] text-ink/50">
            <div><div className="text-ink/40">Illustration</div><div className="mt-1 tracking-normal text-ink/80">Production I.G</div></div>
            <div><div className="text-ink/40">Published</div><div className="mt-1 tracking-normal text-ink/80">April 2011</div></div>
            <div><div className="text-ink/40">Medium</div><div className="mt-1 tracking-normal text-ink/80">Watercolor</div></div>
            <div><div className="text-ink/40">Series</div><div className="mt-1 tracking-normal text-ink/80">Nº 2 · 2nd Season</div></div>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="relative overflow-hidden bg-white shadow-[0_40px_80px_-30px_oklch(0.2_0.04_20/0.25)]">
            <img src={duo} alt="Sawako and Kazehaya in spring uniforms" className="w-full" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
