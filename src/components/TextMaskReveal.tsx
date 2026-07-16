import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ensemble from "@/assets/ensemble-wallpaper.jpg";
import spring from "@/assets/poster-spring.jpg";

/**
 * A 300vh pinned section where the phrase "君に届け" acts as a mask —
 * a full-bleed film reveals itself only through the strokes of the kanji,
 * while a slow zoom + hue-shift plays underneath. The ultimate cinematic beat.
 */
export function TextMaskReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1.4]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.4, 0.75, 1], [0, 0.1, 0.45, 0.9]);
  const captionY = useTransform(scrollYProgress, [0.6, 1], [40, 0]);
  const captionOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
  const chapterOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative bg-background" style={{ height: "300vh" }}>
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden bg-ink">
        {/* Chapter tag */}
        <motion.div style={{ opacity: chapterOpacity }} className="absolute left-8 top-8 z-30 text-[10px] uppercase tracking-[0.5em] text-white/60 md:left-16 md:top-12">
          Chapter · 届 · The Delivery
        </motion.div>
        <motion.div style={{ opacity: chapterOpacity }} className="absolute right-8 top-8 z-30 text-[10px] uppercase tracking-[0.5em] text-white/60 md:right-16 md:top-12" >
          Plate · Nº XI
        </motion.div>

        {/* Base film — always present, slow zoom */}
        <motion.img
          src={ensemble}
          alt=""
          style={{ scale, opacity: bgOpacity }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Dark veil that grows */}
        <motion.div style={{ opacity: veilOpacity }} className="absolute inset-0" >
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 20%, oklch(0 0 0 / 0.9) 80%)" }} />
        </motion.div>

        {/* SVG mask reveal — the kanji cuts through into a second image */}
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <defs>
            <mask id="kanji-mask">
              <rect width="1600" height="900" fill="black" />
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                fill="white"
                style={{ fontFamily: "var(--font-jp)", fontSize: 380, fontWeight: 500, letterSpacing: "0.02em" }}
              >
                君に届け
              </text>
            </mask>
            <linearGradient id="stroke-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.95 0.05 15)" />
              <stop offset="100%" stopColor="oklch(0.88 0.06 340)" />
            </linearGradient>
          </defs>

          {/* image revealed through the letters */}
          <image href={spring} width="1600" height="900" preserveAspectRatio="xMidYMid slice" mask="url(#kanji-mask)" />

          {/* outline of the letters on top */}
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            fill="none"
            stroke="url(#stroke-grad)"
            strokeWidth="1.2"
            style={{ fontFamily: "var(--font-jp)", fontSize: 380, fontWeight: 500, letterSpacing: "0.02em" }}
          >
            君に届け
          </text>
        </svg>

        {/* Bottom caption */}
        <motion.div style={{ y: captionY, opacity: captionOpacity }} className="absolute inset-x-0 bottom-16 z-30 mx-auto flex max-w-4xl flex-col items-center px-8 text-center md:bottom-24">
          <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-white/50">Kimi ni Todoke — 君に届け</div>
          <div className="font-serif text-2xl italic leading-snug text-white md:text-4xl">
            &ldquo;From me — through wind, through winter, through every hesitation — to you.&rdquo;
          </div>
          <div className="mt-4 h-px w-24 bg-white/30" />
          <div className="mt-4 text-[10px] uppercase tracking-[0.4em] text-white/50">Curatorial Plate · 2026</div>
        </motion.div>
      </div>
    </section>
  );
}
