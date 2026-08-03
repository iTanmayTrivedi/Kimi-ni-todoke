export function Footer() {
  return (
    <footer className="chapter-cv relative overflow-hidden border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-6xl leading-none text-ink/80" style={{ fontFamily: "var(--font-jp)" }}>
              君に届け
            </div>
            <p className="mt-6 max-w-sm font-serif text-2xl italic leading-snug text-ink/70">
              &ldquo;From me — to you, and to the quiet in everyone.&rdquo;
            </p>
            <div className="mt-8 text-[10px] uppercase tracking-[0.4em] text-ink/40">
              A Digital Exhibition · Studio Furin
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <div className="mb-6 text-[10px] uppercase tracking-[0.4em] text-ink/40">Chapters</div>
            <ul className="space-y-3 text-sm font-light text-ink/70">
              <li><a href="#characters" className="hover:text-ink transition-colors">II · Portraits</a></li>
              <li><a href="#scenes" className="hover:text-ink transition-colors">III · Quiet Moments</a></li>
              <li><a href="#timeline" className="hover:text-ink transition-colors">IV · The Thread</a></li>
              <li><a href="#letters" className="hover:text-ink transition-colors">V · Letters Untold</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 md:col-start-11">
            <div className="mb-6 text-[10px] uppercase tracking-[0.4em] text-ink/40">Colophon</div>
            <ul className="space-y-3 text-sm font-light text-ink/70">
              <li>Cormorant</li>
              <li>Shippori Mincho</li>
              <li>Homemade Apple</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-[10px] uppercase tracking-[0.4em] text-ink/40 md:flex-row md:items-center">
          <div>© Spring MMXXVI · Kimi ni Todoke — an unofficial homage</div>
          <div>Nº XXIV / Curated with quiet devotion</div>
          <div>Made with a slow hand</div>
        </div>
      </div>

      {/* Whisper */}
      <div aria-hidden className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 select-none font-serif text-[22vw] italic leading-none text-ink/[0.03]">
        todoke
      </div>
    </footer>
  );
}
