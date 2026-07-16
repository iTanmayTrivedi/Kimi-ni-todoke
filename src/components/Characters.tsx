import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import sawakoAsset from "@/assets/sawako-real.jpg";
import kazehayaAsset from "@/assets/kazehaya-real.jpg";
import chizuruAsset from "@/assets/chizuru-real.jpg";
import ayaneAsset from "@/assets/ayane-real.jpg";
const sawakoImg = sawakoAsset.url;
const kazehayaImg = kazehayaAsset.url;
const chizuruImg = chizuruAsset.url;
const ayaneImg = ayaneAsset.url;

const characters = [
  {
    name: "Sawako Kuronuma",
    kanji: "黒沼 爽子",
    epithet: "The Girl Who Longed to Be Seen",
    img: sawakoImg,
    monologue: "If I could just be understood by one person — perhaps I could believe I exist.",
    tag: "Protagonist",
    color: "oklch(0.9 0.04 15)",
  },
  {
    name: "Shota Kazehaya",
    kanji: "風早 翔太",
    epithet: "The Boy Who Called Her Name",
    img: kazehayaImg,
    monologue: "You are the kind of person who makes the air around you feel like spring.",
    tag: "The Refrain",
    color: "oklch(0.88 0.05 145)",
  },
  {
    name: "Chizuru Yoshida",
    kanji: "吉田 千鶴",
    epithet: "Warmth Like an Open Window",
    img: chizuruImg,
    monologue: "You don't have to explain yourself to me. Just walk beside me — that's enough.",
    tag: "The Friend",
    color: "oklch(0.9 0.06 55)",
  },
  {
    name: "Ayane Yano",
    kanji: "矢野 あやね",
    epithet: "Softness Folded Like a Letter",
    img: ayaneImg,
    monologue: "Everyone thinks I'm sharp. Only you two ever asked if I was tired.",
    tag: "The Confidante",
    color: "oklch(0.88 0.05 340)",
  },
];

export function Characters() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const saturate = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 1]);

  return (
    <section id="characters" ref={ref} className="relative bg-background py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-24 grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ink/50">Chapter II · Shadows & Light</div>
            <h2 className="font-serif text-5xl italic leading-[0.95] text-ink md:text-7xl">
              Two silhouettes,<br/>
              <span className="text-ink/40">one horizon.</span>
            </h2>
          </div>
          <div className="md:col-span-5">
            <div className="hairline mb-6" />
            <p className="max-w-md text-sm font-light leading-relaxed text-ink/60">
              Between hesitation and courage, a friendship blooms — the way ink spreads through paper. Four figures orbit a single spring, each learning how to be seen, and how to see.
            </p>
            <div className="mt-6 text-[10px] uppercase tracking-[0.4em] text-ink/40">Portrait Series · Nº 01 — 04</div>
          </div>
        </div>

        <div className="grid gap-16 md:grid-cols-2 md:gap-x-16 md:gap-y-32">
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
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const isSawako = index === 0;
  const filter = useTransform(saturate, (s) =>
    isSawako ? `saturate(${s}) contrast(${0.9 + s * 0.2})` : `saturate(1)`
  );

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      className={`relative ${!isEven ? "md:mt-24" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="absolute -left-3 top-0 hidden text-[10px] uppercase tracking-[0.4em] text-ink/40 md:block" style={{ writingMode: "vertical-rl" }}>
        {c.tag} — Portrait Nº 0{index + 1}
      </div>

      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4", background: c.color }}>
        <motion.img
          src={c.img}
          alt={c.name}
          width={1050}
          height={1400}
          loading="lazy"
          style={{ filter }}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out"
          animate={{ scale: hover ? 1.05 : 1 }}
        />
        <motion.div
          initial={false}
          animate={{ opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-end p-8 md:p-10"
          style={{ background: "linear-gradient(180deg, transparent 20%, oklch(0.98 0.01 20 / 0.95) 100%)" }}
        >
          <p className="text-2xl leading-snug text-ink md:text-3xl" style={{ fontFamily: "'Homemade Apple', cursive" }}>
            &ldquo;{c.monologue}&rdquo;
          </p>
        </motion.div>
        <div className="absolute right-4 top-4 rounded-full bg-background/80 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-ink/60 backdrop-blur">
          Nº 0{index + 1}
        </div>
      </div>

      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-ink/50">{c.tag}</div>
          <h3 className="mt-2 font-serif text-3xl italic text-ink md:text-4xl">{c.name}</h3>
          <p className="mt-2 text-sm font-light text-ink/60">{c.epithet}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl text-ink/60" style={{ fontFamily: "var(--font-jp)" }}>{c.kanji}</div>
        </div>
      </div>
    </motion.div>
  );
}
