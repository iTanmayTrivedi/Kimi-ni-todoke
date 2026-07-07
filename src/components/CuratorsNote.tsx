import { motion } from "framer-motion";

export function CuratorsNote() {
  return (
    <section className="relative bg-background py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-12 md:px-12">
        <aside className="md:col-span-4">
          <div className="sticky top-24">
            <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ink/50">Interlude</div>
            <h2 className="font-serif text-4xl italic leading-tight text-ink md:text-6xl">A note<br/>from the curator.</h2>
            <div className="mt-10 space-y-3 text-[10px] uppercase tracking-[0.4em] text-ink/50">
              <div className="flex justify-between border-t border-border/60 pt-3"><span>Origin</span><span className="normal-case tracking-normal text-ink/70">Karuho Shiina · 2005</span></div>
              <div className="flex justify-between border-t border-border/60 pt-3"><span>Volumes</span><span className="normal-case tracking-normal text-ink/70">Thirty</span></div>
              <div className="flex justify-between border-t border-border/60 pt-3"><span>Seasons</span><span className="normal-case tracking-normal text-ink/70">Three, and a coda</span></div>
              <div className="flex justify-between border-t border-border/60 pt-3"><span>Setting</span><span className="normal-case tracking-normal text-ink/70">Kitahoro, Hokkaidō</span></div>
              <div className="flex justify-between border-t border-b border-border/60 py-3"><span>Runtime</span><span className="normal-case tracking-normal text-ink/70">A decade of quiet</span></div>
            </div>
          </div>
        </aside>

        <div className="md:col-span-7 md:col-start-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
            className="font-serif text-3xl italic leading-[1.4] text-ink md:text-5xl md:leading-[1.35]"
          >
            &ldquo;This is a story that moves with the patience of snowfall.&rdquo;
          </motion.p>

          <div className="mt-16 grid gap-10 text-base font-light leading-[1.9] text-ink/75 md:text-lg">
            <p>
              Kimi ni Todoke is a study in slowness. It refuses the shortcut of misunderstanding, the theatre of the love triangle, the shortcut of the villain. Instead, it stays in the long minute after a kind word — the minute in which a shy girl realises she has been kind to <em>herself</em> for the first time.
            </p>
            <p>
              Each portrait in this exhibition was rendered in watercolor because the medium holds its breath the way the story does. Ink meets water, water meets paper, and the edge between them is exactly where feeling lives. Nothing is loud. Nothing needs to be.
            </p>
            <p>
              To walk through these rooms is to be asked, gently: <em>What would happen if you allowed yourself to be understood, just once, by just one person?</em>
            </p>
          </div>

          <div className="mt-16 flex flex-wrap items-baseline gap-x-8 gap-y-4 border-t border-border/60 pt-8">
            <div className="text-[10px] uppercase tracking-[0.4em] text-ink/50">Curated by</div>
            <div className="font-serif text-xl italic text-ink">Studio Furin — Spring 2026</div>
            <div className="ml-auto text-[10px] uppercase tracking-[0.4em] text-ink/40">Exhibition Nº XXIV</div>
          </div>
        </div>
      </div>
    </section>
  );
}
