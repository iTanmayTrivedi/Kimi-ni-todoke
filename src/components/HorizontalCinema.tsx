import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import sawakoAsset from "@/assets/sawako-real.jpg";
import kazehayaAsset from "@/assets/kazehaya-real.jpg";
import chizuruAsset from "@/assets/chizuru-real.jpg";
import ayaneAsset from "@/assets/ayane-real.jpg";
const sawako = sawakoAsset.url;
const kazehaya = kazehayaAsset.url;
const chizuru = chizuruAsset.url;
const ayane = ayaneAsset.url;
import pathway from "@/assets/hero-pathway.jpg";
import classroom from "@/assets/classroom.jpg";
import fireworks from "@/assets/fireworks.jpg";
import winter from "@/assets/winter.jpg";

// Vertical scroll pins the section, translating its inner rail horizontally.
// A dozen oversized plates pass by like film through a projector.
const plates = [
  { src: pathway, kanji: "序", en: "The Pathway", jp: "はじまりの道" },
  { src: sawako, kanji: "爽", en: "Sawako", jp: "黒沼 爽子" },
  { src: kazehaya, kanji: "風", en: "Kazehaya", jp: "風早 翔太" },
  { src: classroom, kanji: "間", en: "The Classroom", jp: "放課後の光" },
  { src: chizuru, kanji: "友", en: "Chizuru", jp: "吉田 千鶴" },
  { src: ayane, kanji: "静", en: "Ayane", jp: "矢野 あやね" },
  { src: fireworks, kanji: "夏", en: "Summer", jp: "花火の夜" },
  { src: winter, kanji: "雪", en: "Winter", jp: "雪のあと" },
];

export function HorizontalCinema() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // move the rail from 0 to -(plates - 1) * 100vw approximately
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(plates.length - 1) * 80}vw`]);
  const railProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative bg-background" style={{ height: `${plates.length * 90}vh` }}>
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        {/* Chapter label */}
        <div className="flex items-center justify-between px-8 pt-10 md:px-16">
          <div className="text-[10px] uppercase tracking-[0.5em] text-ink/60">
            Chapter · 映写 · The Projection Room
          </div>
          <div className="text-[10px] uppercase tracking-[0.5em] text-ink/40" style={{ fontFamily: "var(--font-jp)" }}>
            八 枚 の 板 · Eight plates
          </div>
        </div>

        {/* Horizontal rail */}
        <motion.div style={{ x }} className="mt-8 flex flex-1 items-center gap-[10vw] pl-[10vw] pr-[10vw]">
          {plates.map((p, i) => (
            <Plate key={i} plate={p} index={i} />
          ))}
        </motion.div>

        {/* Bottom progress rail */}
        <div className="relative mx-16 mb-10 mt-4 h-px bg-ink/15">
          <motion.div style={{ width: railProgress }} className="absolute inset-y-0 left-0" >
            <div className="h-full w-full" style={{ background: "linear-gradient(90deg, transparent, oklch(0.7 0.15 15), oklch(0.85 0.08 145))" }} />
          </motion.div>
          <div className="mt-4 flex justify-between text-[9px] uppercase tracking-[0.4em] text-ink/40">
            <span>Reel 01 / 01</span>
            <span>Scroll to advance</span>
            <span>16 : 9 · 24 fps · silent</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Plate({ plate, index }: { plate: (typeof plates)[number]; index: number }) {
  return (
    <div className="relative flex h-[70vh] w-[70vw] shrink-0 items-end md:w-[60vw]">
      <div className="absolute inset-0 overflow-hidden">
        <img src={plate.src} alt={plate.en} className="h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, oklch(0 0 0 / 0.6))" }} />
      </div>

      {/* Gigantic kanji watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-4 top-2 select-none text-[22vw] leading-none text-white/15 md:text-[16vw]"
        style={{ fontFamily: "var(--font-jp)" }}
      >
        {plate.kanji}
      </div>

      {/* Plate metadata */}
      <div className="relative z-10 flex w-full items-end justify-between p-8 text-white md:p-12">
        <div>
          <div className="mb-3 text-[10px] uppercase tracking-[0.5em] text-white/70">
            Plate Nº {String(index + 1).padStart(2, "0")}
          </div>
          <div className="font-serif text-4xl italic md:text-6xl">{plate.en}</div>
          <div className="mt-2 text-sm tracking-[0.2em] text-white/80" style={{ fontFamily: "var(--font-jp)" }}>
            {plate.jp}
          </div>
        </div>
        <div className="hidden text-right text-[10px] uppercase tracking-[0.4em] text-white/60 md:block">
          <div>2E2T — {String(index + 1).padStart(3, "0")}</div>
          <div className="mt-1">Studio Furin</div>
        </div>
      </div>
    </div>
  );
}
