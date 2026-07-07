import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const milestones = [
  { title: "First Smile", when: "Spring · Year One", quote: "You called me Kuronuma. My real name. Just that — and the world tilted.", side: "left" as const },
  { title: "The Sports Day", when: "Autumn · Year One", quote: "Run. Just run. For once, for myself.", side: "right" as const },
  { title: "The Confession", when: "Winter · Year Two", quote: "I like you. Not as a friend. I want you to know.", side: "left" as const },
  { title: "New Year's Eve", when: "Winter · Year Two", quote: "Under the fireworks, everything I never said finally reached you.", side: "right" as const },
];

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const height = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  return (
    <section id="timeline" ref={ref} className="relative bg-background py-40">
      <div className="mx-auto mb-32 max-w-4xl px-6 text-center">
        <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ink/50">Chapter III · The Thread</div>
        <h2 className="font-serif text-5xl italic leading-tight text-ink md:text-7xl">
          A single thread<br/>between two hearts.
        </h2>
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border/60" />
        <motion.div
          style={{ height }}
          className="absolute left-1/2 top-0 w-px -translate-x-1/2"
        >
          <div className="h-full w-full" style={{ background: "linear-gradient(180deg, transparent, oklch(0.7 0.15 15) 20%, oklch(0.75 0.12 15) 80%, transparent)" }} />
        </motion.div>

        <div className="space-y-40">
          {milestones.map((m, i) => (
            <Milestone key={m.title} m={m} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Milestone({ m, i }: { m: (typeof milestones)[number]; i: number }) {
  const isLeft = m.side === "left";
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1.2, ease: [0.2, 0.7, 0.1, 1] }}
      className={`relative flex ${isLeft ? "justify-start" : "justify-end"}`}
    >
      <div className={`w-full max-w-md ${isLeft ? "pr-16 text-right md:pr-24" : "pl-16 md:pl-24"}`}>
        <div className="text-[10px] uppercase tracking-[0.4em] text-ink/40">{String(i + 1).padStart(2, "0")} — {m.when}</div>
        <h3 className="mt-3 font-serif text-3xl italic text-ink md:text-4xl">{m.title}</h3>
        <p className="mt-5 text-sm font-light leading-relaxed text-ink/70">&ldquo;{m.quote}&rdquo;</p>
      </div>
      <div className="absolute left-1/2 top-6 -translate-x-1/2">
        <div className="relative">
          <div className="h-3 w-3 rotate-45 bg-primary" style={{ boxShadow: "0 0 24px oklch(0.75 0.12 15 / 0.6)" }} />
        </div>
      </div>
    </motion.div>
  );
}
