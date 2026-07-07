import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import classroomImg from "@/assets/classroom.jpg";
import fireworksImg from "@/assets/fireworks.jpg";
import winterImg from "@/assets/winter.jpg";
import heroImg from "@/assets/hero-pathway.jpg";

const scenes = [
  { img: heroImg, title: "The Pathway", when: "April — the year they met", caption: "Petals fall as if scripted; a boy learns a girl's name." },
  { img: classroomImg, title: "Empty Classroom", when: "Late afternoon, any Tuesday", caption: "The hour when confessions almost happen, then don't." },
  { img: fireworksImg, title: "Fireworks", when: "August 15th", caption: "A summer breath held for the length of a spark." },
  { img: winterImg, title: "Snow at the Shrine", when: "New Year's Eve", caption: "Two silhouettes, one wish, folded and tied to a wooden slat." },
];

export function Gallery() {
  return (
    <section id="scenes" className="relative bg-background py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-24 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ink/50">Chapter III · Quiet Moments</div>
            <h2 className="font-serif text-5xl italic leading-[0.95] text-ink md:text-7xl">The seasons<br/>they crossed.</h2>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="max-w-md text-sm font-light leading-relaxed text-ink/60">A gallery of the small weather that surrounded a very slow love — the rooms it warmed, the skies it stood beneath.</p>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-12 md:gap-x-8 md:gap-y-24">
          {scenes.map((s, i) => (
            <Scene key={s.title} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Scene({ s, i }: { s: (typeof scenes)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Editorial asymmetric grid
  const spans = [
    "md:col-span-7 md:col-start-1",
    "md:col-span-4 md:col-start-9 md:mt-24",
    "md:col-span-5 md:col-start-2",
    "md:col-span-6 md:col-start-7 md:mt-16",
  ];

  return (
    <motion.figure ref={ref} style={{ y }} className={`relative ${spans[i]}`}>
      <div className="relative overflow-hidden" style={{ aspectRatio: i % 2 === 0 ? "16/10" : "4/5" }}>
        <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, oklch(0.98 0.01 20 / 0.35) 100%)" }} />
      </div>
      <figcaption className="mt-5 flex items-baseline justify-between gap-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-ink/40">Plate {String(i + 1).padStart(2, "0")}</div>
          <h3 className="mt-2 font-serif text-2xl italic text-ink">{s.title}</h3>
        </div>
        <div className="text-right text-[10px] uppercase tracking-[0.3em] text-ink/50">{s.when}</div>
      </figcaption>
      <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-ink/60">{s.caption}</p>
    </motion.figure>
  );
}
