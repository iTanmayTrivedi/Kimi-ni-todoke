import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import sawakoImg from "@/assets/sawako.jpg";
import kazehayaImg from "@/assets/kazehaya.jpg";

const characters = [
  {
    name: "Sawako Kuronuma",
    kanji: "黒沼 爽子",
    img: sawakoImg,
    monologue: "If I could just be understood by one person — perhaps I could believe I exist.",
    side: "left" as const,
  },
  {
    name: "Shota Kazehaya",
    kanji: "風早 翔太",
    img: kazehayaImg,
    monologue: "You are the kind of person who makes the air around you feel like spring.",
    side: "right" as const,
  },
];

export function Characters() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const saturate = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 1]);

  return (
    <section id="characters" ref={ref} className="relative min-h-[130vh] bg-background py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-24 flex items-end justify-between">
          <div>
            <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ink/50">Chapter II · Shadows & Light</div>
            <h2 className="font-serif text-5xl italic leading-none text-ink md:text-7xl">Two silhouettes,<br/>one horizon.</h2>
          </div>
          <div className="hidden max-w-xs text-sm font-light leading-relaxed text-ink/60 md:block">
            Between hesitation and courage, a friendship blooms slowly — the way ink spreads through paper.
          </div>
        </div>

        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          {characters.map((c, i) => (
            <CharacterCard key={c.name} c={c} index={i} saturate={saturate} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CharacterCard({
  c,
  index,
  saturate,
}: {
  c: (typeof characters)[number];
  index: number;
  saturate: ReturnType<typeof useTransform<number, number>>;
}) {
  const [hover, setHover] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const isSawako = index === 0;
  const filter = useTransform(saturate, (s) =>
    isSawako ? `saturate(${s}) contrast(${0.9 + s * 0.2})` : `saturate(1)`
  );

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      className={`relative ${index === 1 ? "md:mt-32" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative overflow-hidden bg-muted" style={{ aspectRatio: "3/4" }}>
        <motion.img
          src={c.img}
          alt={c.name}
          width={900}
          height={1200}
          loading="lazy"
          style={{ filter }}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out"
          animate={{ scale: hover ? 1.04 : 1 }}
        />
        <motion.div
          initial={false}
          animate={{ opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-end p-8"
          style={{ background: "linear-gradient(180deg, transparent 30%, oklch(0.98 0.01 20 / 0.9) 100%)" }}
        >
          <p className="font-script text-2xl leading-snug text-ink md:text-3xl" style={{ fontFamily: "'Homemade Apple', cursive" }}>
            &ldquo;{c.monologue}&rdquo;
          </p>
        </motion.div>
      </div>
      <div className="mt-6 flex items-baseline justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-ink/50">No. 0{index + 1}</div>
          <h3 className="mt-2 font-serif text-3xl italic text-ink">{c.name}</h3>
        </div>
        <div className="text-xl text-ink/50" style={{ fontFamily: "var(--font-jp)" }}>{c.kanji}</div>
      </div>
    </motion.div>
  );
}
