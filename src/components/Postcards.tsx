import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import spring from "@/assets/poster-spring.jpg.asset.json";
import winter from "@/assets/poster-winter.jpeg.asset.json";
import duo from "@/assets/duo-wallpaper.jpg.asset.json";
import confession from "@/assets/confession-panel.jpeg.asset.json";

const postcards = [
  {
    img: spring.url,
    stamp: "春",
    town: "Kitahoro · Hokkaidō",
    date: "April · Nº 04",
    note: "The pathway blooms again. I walked it thinking of you.",
    postmark: "北 幌 郵 便",
  },
  {
    img: winter.url,
    stamp: "雪",
    town: "Kitahoro · Hokkaidō",
    date: "January · Nº 11",
    note: "Snow softens every sound but yours.",
    postmark: "北 幌 郵 便",
  },
  {
    img: duo.url,
    stamp: "縁",
    town: "Kitahoro · Hokkaidō",
    date: "October · Nº 07",
    note: "We stood under one umbrella. It rained until we forgot to notice.",
    postmark: "北 幌 郵 便",
  },
  {
    img: confession.url,
    stamp: "好",
    town: "Kitahoro · Hokkaidō",
    date: "February · Nº 02",
    note: "I said your name for the first time out loud. The word stayed warm.",
    postmark: "北 幌 郵 便",
  },
];

/**
 * A "postcard drawer" — four cards spring-tilt to follow the cursor, each one
 * a miniature exhibit plate with stamp, postmark, watercolor overlay, and hand
 * script. Feels like opening a curator's private archive.
 */
export function Postcards() {
  return (
    <section className="relative bg-background py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-20 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ink/50">
              Chapter · 便 · The Postal Archive
            </div>
            <h2 className="font-serif text-5xl italic leading-[0.95] text-ink md:text-7xl">
              Four postcards,<br/><span className="text-ink/40">unsent.</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <div className="hairline mb-6" />
            <p className="max-w-md text-sm font-light leading-relaxed text-ink/60">
              Recovered from a shoebox on the third floor of a house in Kitahoro. Written but never mailed — as though the sending would have broken the spell.
            </p>
            <div className="mt-4 text-[10px] uppercase tracking-[0.4em] text-ink/40">Move your cursor across each card</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          {postcards.map((p, i) => (
            <Postcard key={i} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Postcard({ p, index }: { p: (typeof postcards)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 14 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 14 });
  const shineX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const [hover, setHover] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  const reset = () => {
    x.set(0); y.set(0); setHover(false);
  };

  const staggered = index % 2 === 0 ? "md:translate-y-0" : "md:translate-y-16";

  return (
    <div className={staggered} style={{ perspective: 1600 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[3/2] w-full shadow-[0_40px_80px_-40px_oklch(0.7_0.08_10/0.5)]"
      >
        {/* paper card */}
        <div className="absolute inset-0 grid grid-cols-5 bg-paper">
          {/* left: image */}
          <div className="relative col-span-3 overflow-hidden">
            <img src={p.img} alt="" className="h-full w-full object-cover" />
            {/* watercolor edge */}
            <div className="absolute inset-0 mix-blend-multiply" style={{ background: "radial-gradient(ellipse at 30% 70%, transparent 40%, oklch(0.94 0.04 10 / 0.55) 100%)" }} />
            {/* postmark circle */}
            <div className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[oklch(0.55_0.15_25)] text-[oklch(0.55_0.15_25)] opacity-80" style={{ transform: "rotate(-14deg)", fontFamily: "var(--font-jp)" }}>
              <div className="text-center leading-none">
                <div className="text-[8px] tracking-[0.2em]">{p.postmark.split(" ").slice(0, 2).join(" ")}</div>
                <div className="my-1 h-px w-8 bg-current mx-auto" />
                <div className="text-[10px] tracking-[0.2em]">{p.postmark.split(" ").slice(2).join(" ")}</div>
              </div>
            </div>
          </div>

          {/* right: written side */}
          <div className="relative col-span-2 flex flex-col justify-between p-5 md:p-6">
            {/* stamp */}
            <div className="flex items-start justify-between">
              <div className="text-[8px] uppercase tracking-[0.4em] text-ink/40">
                Postcard<br/>Nº 0{index + 1}
              </div>
              <div className="relative h-16 w-12 border border-ink/20 bg-blush/40 p-1">
                <div className="flex h-full w-full items-center justify-center border border-ink/15" style={{ fontFamily: "var(--font-jp)" }}>
                  <span className="text-3xl text-ink/70">{p.stamp}</span>
                </div>
                <div className="absolute -top-1 left-0 h-full w-full" style={{ background: "radial-gradient(circle at 4px 4px, transparent 2px, transparent 3px)" }} />
              </div>
            </div>

            {/* address lines */}
            <div className="my-4 space-y-2">
              {[0, 1, 2, 3].map((n) => (
                <div key={n} className="h-px w-full bg-ink/10" style={{ width: `${100 - n * 8}%` }} />
              ))}
            </div>

            {/* handwritten note */}
            <div>
              <div className="text-[18px] leading-snug text-ink/85" style={{ fontFamily: "'Homemade Apple', cursive" }}>
                {p.note}
              </div>
              <div className="mt-4 flex items-end justify-between border-t border-ink/10 pt-3 text-[9px] uppercase tracking-[0.4em] text-ink/40">
                <span>{p.town}</span>
                <span>{p.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* shine sweep on hover */}
        <motion.div
          aria-hidden
          animate={{ opacity: hover ? 1 : 0, backgroundPositionX: hover ? "120%" : "-20%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(105deg, transparent 40%, oklch(1 0 0 / 0.35) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
            mixBlendMode: "overlay",
          }}
        />
      </motion.div>
    </div>
  );
}
