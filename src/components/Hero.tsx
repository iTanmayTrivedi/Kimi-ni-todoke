import { motion } from "framer-motion";
import heroImg from "@/assets/hero-pathway.jpg";
import { PetalField } from "./PetalField";

const TITLE = "From Me to You";

export function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-background">
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.2, 0.7, 0.1, 1] }}
        className="absolute inset-0"
      >
        <img
          src={heroImg}
          alt="Cherry blossom pathway at dawn"
          width={1920}
          height={1200}
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, oklch(0.99 0.01 20 / 0.35) 0%, oklch(0.985 0.01 20 / 0.15) 40%, oklch(0.985 0.01 20 / 0.75) 100%)" }} />
      </motion.div>

      <PetalField density={35} />

      <div className="relative z-10 flex h-full flex-col">
        <header className="flex items-center justify-between px-8 pt-8 md:px-16 md:pt-10">
          <div className="text-[10px] uppercase tracking-[0.4em] text-ink/70">Kimi ni Todoke — Digital Exhibition</div>
          <nav className="hidden gap-10 text-[10px] uppercase tracking-[0.4em] text-ink/70 md:flex">
            <a href="#characters" className="hover:text-ink transition-colors">Characters</a>
            <a href="#timeline" className="hover:text-ink transition-colors">Timeline</a>
            <a href="#letters" className="hover:text-ink transition-colors">Letters</a>
          </nav>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 text-[10px] uppercase tracking-[0.5em] text-ink/60">Chapter I · The Encounter</div>
          <h1 className="max-w-5xl font-serif text-[clamp(3rem,10vw,9rem)] leading-[0.95] text-ink">
            {TITLE.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.4 + i * 0.06, duration: 1, ease: [0.2, 0.7, 0.1, 1] }}
                className="inline-block italic"
                style={{ whiteSpace: ch === " " ? "pre" : "normal" }}
              >
                {ch}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 1.4 }}
            className="mt-10 max-w-md text-balance text-sm font-light leading-relaxed text-ink/70"
          >
            A quiet exhibition of a story told in whispers — of a girl who longed to be seen, and the boy who first said her name.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1.5 }}
          className="pb-10 text-center text-[10px] uppercase tracking-[0.5em] text-ink/50"
        >
          Scroll — softly
        </motion.div>
      </div>
    </section>
  );
}
