import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Letter = {
  id: number;
  from: string;
  title: string;
  body: string;
  x: number;
  y: number;
  r: number;
};

const LETTERS: Letter[] = [
  { id: 1, from: "Sawako", title: "To the one who saw me", x: 15, y: 20, r: -8, body: "I did not know a name could feel like sunlight. When you called me Kuronuma — my name, not the other one — I understood, for the first time, that I was here." },
  { id: 2, from: "Kazehaya", title: "Untitled", x: 60, y: 15, r: 6, body: "There is a way you look at the world. Careful. Grateful. It makes me want to be worth all that attention. I don't know how to tell you this yet." },
  { id: 3, from: "Chizuru", title: "For my brave friend", x: 25, y: 55, r: 4, body: "You cried, and you kept walking. That is what courage is. Not the absence of fear, but the presence of you, still moving forward." },
  { id: 4, from: "Ayane", title: "A note in the margin", x: 70, y: 60, r: -5, body: "Everyone thinks I'm sharp. Only you two ever asked if I was tired. I keep that softness folded, like a letter I haven't sent." },
  { id: 5, from: "Sawako", title: "New Year", x: 42, y: 80, r: 10, body: "Under fireworks I felt small and enormous at once. I held your hand and thought: this is a year that begins because you are in it." },
  { id: 6, from: "Kazehaya", title: "After the confession", x: 5, y: 78, r: -3, body: "I have wanted to say your name aloud in every quiet room I've ever been in. Sawako. Sawako. There. The room is not quiet anymore." },
];

export function Letters() {
  const [open, setOpen] = useState<Letter | null>(null);
  const [positions, setPositions] = useState(LETTERS);
  const dragRef = useRef<{ id: number; ox: number; oy: number; px: number; py: number } | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = ((e.clientX - dragRef.current.px) / window.innerWidth) * 100;
      const dy = ((e.clientY - dragRef.current.py) / window.innerHeight) * 100;
      setPositions((prev) =>
        prev.map((l) =>
          l.id === dragRef.current!.id
            ? { ...l, x: Math.max(2, Math.min(90, dragRef.current!.ox + dx)), y: Math.max(2, Math.min(90, dragRef.current!.oy + dy)) }
            : l,
        ),
      );
    };
    const onUp = () => { dragRef.current = null; document.body.style.cursor = ""; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  return (
    <section id="letters" className="relative overflow-hidden py-40" style={{ background: "linear-gradient(180deg, oklch(0.14 0.02 260) 0%, oklch(0.1 0.03 265) 100%)" }}>
      <StarField />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-white/40">Chapter IV · Letters Untold</div>
        <h2 className="font-serif text-5xl italic leading-tight text-white md:text-7xl">The words<br/>we never sent.</h2>
        <p className="mx-auto mt-8 max-w-md text-sm font-light leading-relaxed text-white/60">Drift each envelope with your hand. Open one, and read what was almost said.</p>
      </div>

      <div className="relative z-10 mx-auto mt-24 h-[70vh] max-w-6xl px-6">
        {positions.map((l) => (
          <motion.button
            key={l.id}
            onMouseDown={(e) => {
              dragRef.current = { id: l.id, ox: l.x, oy: l.y, px: e.clientX, py: e.clientY };
              document.body.style.cursor = "grabbing";
            }}
            onClick={(e) => {
              // avoid opening when dragged
              if (Math.abs((dragRef.current?.px ?? e.clientX) - e.clientX) < 4) setOpen(l);
            }}
            style={{ left: `${l.x}%`, top: `${l.y}%`, rotate: `${l.r}deg` }}
            whileHover={{ scale: 1.05, rotate: l.r + 2 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 select-none"
          >
            <Envelope from={l.from} />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ background: "oklch(0.08 0.02 260 / 0.85)", backdropFilter: "blur(24px)" }}
            onClick={() => setOpen(null)}
          >
            <motion.article
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.9, ease: [0.2, 0.7, 0.1, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-paper p-12 md:p-20"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="text-[10px] uppercase tracking-[0.5em] text-ink/50">From {open.from}</div>
              <h3 className="mt-6 font-serif text-4xl italic leading-tight text-ink md:text-5xl">{open.title}</h3>
              <div className="my-8 h-px w-16 bg-ink/30" />
              <p className="whitespace-pre-line text-lg font-light leading-[1.9] text-ink/80" style={{ fontFamily: "var(--font-serif)" }}>{open.body}</p>
              <button onClick={() => setOpen(null)} className="mt-12 text-[10px] uppercase tracking-[0.5em] text-ink/50 hover:text-ink">
                — Close the letter
              </button>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Envelope({ from }: { from: string }) {
  return (
    <div className="group relative h-24 w-36 md:h-28 md:w-44" style={{ filter: "drop-shadow(0 20px 40px oklch(0 0 0 / 0.4))" }}>
      <div className="absolute inset-0 bg-paper" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, oklch(0.92 0.02 20) 50%)" }} />
      <svg viewBox="0 0 100 70" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <polygon points="0,0 100,0 50,45" fill="oklch(0.96 0.015 20)" stroke="oklch(0.7 0.05 15 / 0.3)" strokeWidth="0.5" />
      </svg>
      <div className="absolute inset-0 flex items-end justify-center pb-3 text-[9px] uppercase tracking-[0.3em] text-ink/60">{from}</div>
      <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary opacity-70" />
    </div>
  );
}

function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!; const ctx = c.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => { c.width = c.offsetWidth * dpr; c.height = c.offsetHeight * dpr; };
    resize(); window.addEventListener("resize", resize);
    const stars = Array.from({ length: window.innerWidth < 768 ? 70 : 140 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      r: Math.random() * 1.2 * dpr, a: Math.random(), s: 0.005 + Math.random() * 0.01,
    }));
    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const s of stars) {
        s.a += s.s; if (s.a > 1 || s.a < 0.2) s.s = -s.s;
        ctx.fillStyle = `rgba(255, 240, 245, ${s.a * 0.7})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      }
    };
    const tick = () => { draw(); raf = requestAnimationFrame(tick); };
    if (reduced) { draw(); return () => window.removeEventListener("resize", resize); }

    let running = false; let onScreen = false;
    const start = () => { if (!running && onScreen && !document.hidden) { running = true; tick(); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; e.isIntersecting ? start() : stop(); }, { rootMargin: "100px" });
    io.observe(c);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop(); io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" />;
}

