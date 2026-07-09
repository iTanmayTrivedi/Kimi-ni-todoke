import { useState } from "react";
import { motion } from "framer-motion";

type Entry = {
  kanji: string;
  romaji: string;
  meaning: string;
  gloss: string;
  stroke: number;
};

const entries: Entry[] = [
  { kanji: "届", romaji: "todoke", meaning: "to reach", gloss: "To be delivered — a letter, a feeling, a name.", stroke: 8 },
  { kanji: "君", romaji: "kimi", meaning: "you", gloss: "The tender, familiar 'you' — the one addressed in poems.", stroke: 7 },
  { kanji: "桜", romaji: "sakura", meaning: "cherry blossom", gloss: "Beauty in its own passing. A metaphor for youth.", stroke: 10 },
  { kanji: "静", romaji: "shizuka", meaning: "quiet", gloss: "The stillness in which small things become audible.", stroke: 14 },
  { kanji: "縁", romaji: "en", meaning: "invisible thread", gloss: "The bond that fate weaves between two people.", stroke: 15 },
  { kanji: "春", romaji: "haru", meaning: "spring", gloss: "A beginning — soft, uncertain, insistent.", stroke: 9 },
  { kanji: "心", romaji: "kokoro", meaning: "heart / mind", gloss: "The place where feeling and thought are one.", stroke: 4 },
  { kanji: "風", romaji: "kaze", meaning: "wind", gloss: "The messenger. It carries names, and petals, and time.", stroke: 9 },
];

export function KanjiGlossary() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="glossary" className="relative overflow-hidden bg-background px-6 py-40 md:px-16">
      <div className="pointer-events-none absolute right-8 top-16 select-none font-serif text-[10px] uppercase tracking-[0.4em] text-ink/40 md:right-16">
        Appendix · A Silent Dictionary
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-24 max-w-3xl">
          <div className="mb-6 text-[10px] uppercase tracking-[0.5em] text-ink/60">Chapter VII · 言葉</div>
          <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] italic text-ink">
            Eight words that hold the story.
          </h2>
          <p className="mt-8 max-w-xl text-sm font-light leading-relaxed text-ink/70">
            The kanji <em>Kimi ni Todoke</em> — 君に届け — literally translates as
            <em> from me, to you.</em> Hover a character to hear it whispered back in English.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px bg-border/60 md:grid-cols-4">
          {entries.map((e, i) => (
            <motion.button
              key={e.kanji}
              type="button"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.06, duration: 0.9, ease: [0.2, 0.7, 0.1, 1] }}
              className="group relative flex aspect-[3/4] flex-col items-start justify-between bg-background p-8 text-left transition-colors hover:bg-sakura/30 focus:outline-none focus-visible:bg-sakura/40"
              aria-label={`${e.kanji} — ${e.romaji}, ${e.meaning}`}
            >
              <div className="text-[9px] uppercase tracking-[0.4em] text-ink/40">
                Nº {String(i + 1).padStart(2, "0")} · {e.stroke} strokes
              </div>

              <div
                className="flex-1 self-center text-[7rem] leading-none text-ink/85 transition-transform duration-700 group-hover:scale-105 md:text-[8rem]"
                style={{ fontFamily: "var(--font-jp)" }}
              >
                {e.kanji}
              </div>

              <div className="w-full">
                <div className="mb-1 font-serif text-xl italic text-ink">{e.romaji}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-ink/50">{e.meaning}</div>
                <motion.p
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0, y: active === i ? 0 : 6 }}
                  transition={{ duration: 0.5 }}
                  className="mt-4 min-h-[3.5rem] font-serif text-sm italic leading-snug text-ink/70"
                >
                  &ldquo;{e.gloss}&rdquo;
                </motion.p>
              </div>

              {/* red hanko-style seal on hover */}
              <motion.div
                aria-hidden
                initial={false}
                animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 0.6, rotate: active === i ? -8 : 0 }}
                transition={{ duration: 0.6, ease: [0.2, 0.7, 0.1, 1] }}
                className="absolute right-6 top-6 grid h-10 w-10 place-items-center border border-[oklch(0.55_0.18_25)] text-[10px] tracking-widest text-[oklch(0.55_0.18_25)]"
                style={{ fontFamily: "var(--font-jp)" }}
              >
                読
              </motion.div>
            </motion.button>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-ink/40">
          <span>Compiled from the vocabulary of quiet things</span>
          <span>八 / 八</span>
        </div>
      </div>
    </section>
  );
}
