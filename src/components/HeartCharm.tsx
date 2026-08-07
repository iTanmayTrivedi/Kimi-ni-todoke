import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// A cute 3D heart charm — pure CSS 3D (no WebGL, no three.js), so it costs
// almost nothing. It only animates while on-screen, and stops entirely for
// users who prefer reduced motion. Hovering makes it breathe; opening it
// reveals a wish excerpt with a soft, synthesized chime (no audio asset).

const SLICES = 14;

const wish = {
  seal: "願",
  plaque: "Ema Nº 0027 · left at the shrine gate, spring",
  jp: "この気持ちが、ちゃんと届きますように。",
  romaji: "Kono kimochi ga, chanto todokimasu yō ni.",
  en: "May this feeling reach you — properly, and all of it.",
  note: "Written small, in the corner, so no one else would read it. The ink ran once where a petal landed.",
};

function playChime() {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // soft fade-in, long fade-out
    master.gain.linearRampToValueAtTime(0.16, now + 0.5);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 3.4);

    [659.25, 987.77, 1318.51].forEach((f, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = f;
      g.gain.value = 0;
      g.gain.linearRampToValueAtTime(0.34 / (i + 1.4), now + 0.35 + i * 0.12);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 2.8 + i * 0.2);
      osc.connect(g);
      g.connect(master);
      osc.start(now + i * 0.06);
      osc.stop(now + 3.6);
    });

    setTimeout(() => void ctx.close(), 4000);
  } catch {
    /* audio is a garnish — never let it break the UI */
  }
}

export function HeartCharm() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setLive(!!e?.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const openWish = useCallback(() => {
    setOpen(true);
    if (!reduced) playChime();
  }, [reduced]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section
      id="omamori"
      ref={ref}
      className="chapter-cv relative overflow-hidden bg-background py-32 md:py-40"
    >
      <style>{`
        @keyframes charm-spin { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
        @keyframes charm-bob { 0%,100% { transform: translateY(-4px); } 50% { transform: translateY(6px); } }
        @keyframes charm-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.075); } }
        @keyframes charm-halo { 0%,100% { opacity: .35; transform: scale(1); } 50% { opacity: .8; transform: scale(1.12); } }
        @media (prefers-reduced-motion: reduce) {
          .charm-spin, .charm-bob, .charm-pulse, .charm-halo { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-12 md:items-center lg:pl-32">
        <div className="md:col-span-6">
          <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ink/50">
            Chapter · 御守 · The Charm
          </div>
          <h2 className="font-serif text-5xl italic leading-[1.02] text-ink md:text-6xl">
            A small thing,
            <br />
            <span className="text-ink/40">carried everywhere.</span>
          </h2>
          <div className="hairline my-8 max-w-xs" />
          <p className="max-w-md text-sm font-light leading-relaxed text-ink/60">
            心。Turned slowly in the light, the way you turn a feeling over when no one is watching — glass-smooth on
            one side, still a little unfinished on the other.
          </p>
          <div className="mt-8 text-[10px] uppercase tracking-[0.4em] text-ink/40">
            Object Nº 01 · hand-turned · press to read the wish
          </div>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <div
            className="relative mx-auto flex h-[300px] w-[300px] items-center justify-center"
            style={{ perspective: "900px" }}
          >
            {/* soft light pool */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, oklch(0.92 0.06 15 / 0.55), transparent 62%)",
              }}
            />

            {/* halo that wakes on hover */}
            <div
              aria-hidden
              className="charm-halo absolute h-[220px] w-[220px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.88 0.09 15 / 0.5), transparent 65%)",
                opacity: hover ? 0.7 : 0,
                transition: "opacity 700ms ease",
                animation: hover && live ? "charm-halo 2.6s ease-in-out infinite" : "none",
              }}
            />

            <button
              type="button"
              onClick={openWish}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onFocus={() => setHover(true)}
              onBlur={() => setHover(false)}
              aria-label="Open the wish written on this charm"
              className="relative cursor-none rounded-full outline-none"
            >
              <div
                className="charm-bob relative"
                style={{ animation: live ? "charm-bob 5.5s ease-in-out infinite" : "none" }}
              >
                <div
                  className="charm-pulse"
                  style={{
                    animation: hover && live ? "charm-pulse 1.35s ease-in-out infinite" : "none",
                    transition: "transform 600ms cubic-bezier(.2,.7,.1,1)",
                    transform: hover ? "scale(1.04)" : "scale(1)",
                  }}
                >
                  <div
                    className="charm-spin relative h-[150px] w-[150px]"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: "rotateX(-12deg)",
                      animation: live
                        ? `charm-spin ${hover ? 9 : 16}s linear infinite`
                        : "none",
                      willChange: "transform",
                    }}
                  >
                    {Array.from({ length: SLICES }).map((_, i) => {
                      const t = i / (SLICES - 1);
                      const z = (t - 0.5) * 34;
                      const s = 0.82 + Math.sin(t * Math.PI) * 0.18;
                      const lit = 0.72 + Math.sin(t * Math.PI) * 0.16;
                      return (
                        <div
                          key={i}
                          className="absolute inset-0"
                          style={{
                            transform: `translateZ(${z}px) scale(${s})`,
                            transformStyle: "preserve-3d",
                          }}
                        >
                          <svg viewBox="0 0 100 100" className="h-full w-full">
                            <path
                              d="M50 88 C20 66 8 49 8 33 C8 20 18 11 29 11 C38 11 46 16 50 25 C54 16 62 11 71 11 C82 11 92 20 92 33 C92 49 80 66 50 88 Z"
                              fill={`oklch(${lit} 0.11 15 / ${i === SLICES - 1 ? 0.95 : 0.5})`}
                            />
                          </svg>
                        </div>
                      );
                    })}

                    {/* front highlight */}
                    <div className="absolute inset-0" style={{ transform: "translateZ(19px)" }} aria-hidden>
                      <svg viewBox="0 0 100 100" className="h-full w-full">
                        <ellipse cx="34" cy="32" rx="10" ry="14" fill="oklch(0.995 0.01 15 / 0.6)" transform="rotate(-24 34 32)" />
                        <ellipse cx="66" cy="30" rx="4" ry="6" fill="oklch(0.995 0.01 15 / 0.35)" transform="rotate(-18 66 30)" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* silk cord + tassel */}
                <div className="pointer-events-none absolute left-1/2 top-[-58px] h-[58px] w-px -translate-x-1/2 bg-ink/25" />
                <div className="pointer-events-none absolute left-1/2 top-[-62px] h-2 w-2 -translate-x-1/2 rounded-full bg-ink/30" />
              </div>
            </button>

            {/* contact shadow */}
            <div
              aria-hidden
              className="absolute bottom-6 left-1/2 h-4 w-32 -translate-x-1/2 rounded-full"
              style={{
                background: "radial-gradient(ellipse, oklch(0.6 0.05 15 / 0.22), transparent 70%)",
                filter: "blur(4px)",
              }}
            />
          </div>

          <p
            className="mt-8 text-center text-2xl text-ink/60"
            style={{ fontFamily: "var(--font-script)" }}
          >
            keep it close
          </p>
          <div
            className="mt-2 text-center text-[10px] uppercase tracking-[0.4em] transition-opacity duration-500"
            style={{ opacity: hover ? 0.6 : 0.28, color: "var(--ink)" }}
          >
            Press to read the wish
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.1, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                background:
                  "radial-gradient(ellipse at 50% 40%, oklch(0.99 0.02 15 / 0.86), oklch(0.9 0.03 15 / 0.94))",
                backdropFilter: "blur(14px)",
              }}
              aria-hidden
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Wish excerpt"
              initial={{ opacity: 0, y: 26, scale: 0.97, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 14, scale: 0.985, filter: "blur(8px)" }}
              transition={{ duration: 0.85, ease: [0.2, 0.7, 0.1, 1] }}
              className="relative w-full max-w-xl overflow-hidden bg-background/95 px-8 py-12 md:px-14 md:py-16"
              style={{
                border: "1px solid var(--border)",
                boxShadow: "0 60px 140px -60px oklch(0.6 0.06 15 / 0.6)",
              }}
            >
              {/* hanko seal */}
              <div
                className="absolute right-8 top-8 flex h-12 w-12 items-center justify-center text-lg"
                style={{
                  border: "1.5px solid oklch(0.62 0.19 25 / 0.7)",
                  color: "oklch(0.62 0.19 25 / 0.8)",
                  fontFamily: "var(--font-jp)",
                  borderRadius: 4,
                }}
                aria-hidden
              >
                {wish.seal}
              </div>

              <div className="mb-6 text-[10px] uppercase tracking-[0.5em] text-ink/45">
                {wish.plaque}
              </div>

              <p
                className="text-3xl leading-relaxed text-ink md:text-4xl"
                style={{ fontFamily: "var(--font-jp)" }}
              >
                {wish.jp}
              </p>
              <div className="hairline my-8 max-w-[120px]" />
              <p className="font-serif text-2xl italic leading-snug text-ink/80 md:text-3xl">
                {wish.en}
              </p>
              <p className="mt-4 text-[11px] uppercase tracking-[0.32em] text-ink/40">{wish.romaji}</p>
              <p className="mt-8 max-w-md text-sm font-light leading-relaxed text-ink/55">{wish.note}</p>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-12 cursor-none text-[10px] uppercase tracking-[0.5em] text-ink/50 transition-colors hover:text-ink"
              >
                Fold it back — 閉じる
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
