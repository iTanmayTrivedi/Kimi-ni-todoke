import { type CSSProperties, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import sawako from "@/assets/sawako-real.jpg";

type Offset = { x: number; y: number };

export function CelAtelier() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const frameRequest = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), {
      rootMargin: "160px",
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      if (frameRequest.current !== null) cancelAnimationFrame(frameRequest.current);
    },
    [],
  );

  const moveLayers = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType === "touch" || !visible || frameRequest.current !== null) return;
    const { clientX, clientY } = event;
    frameRequest.current = requestAnimationFrame(() => {
      const frame = frameRef.current;
      if (frame) {
        const rect = frame.getBoundingClientRect();
        setOffset({
          x: ((clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((clientY - rect.top) / rect.height - 0.5) * 2,
        });
      }
      frameRequest.current = null;
    });
  };

  const resetLayers = () => setOffset({ x: 0, y: 0 });
  const frameStyle = {
    "--cel-x": offset.x,
    "--cel-y": offset.y,
  } as CSSProperties;

  return (
    <section ref={sectionRef} id="cel" className="chapter-cv relative overflow-hidden bg-paper py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:pl-32">
        <div className="grid gap-14 md:grid-cols-12 md:items-center">
          <div className="md:col-span-4">
            <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ink/50">
              Interlude · 作画 · The Cel Atelier
            </div>
            <h2 className="font-serif text-5xl italic leading-[1.02] text-ink md:text-7xl">
              Before a feeling
              <br />
              <span className="text-ink/40">learns to move.</span>
            </h2>
            <div className="hairline my-8 max-w-xs" />
            <p className="max-w-sm text-sm font-light leading-relaxed text-ink/60">
              One painted breath, separated into line, colour and light. The smallest glance becomes a whole scene
              before the camera ever begins to turn.
            </p>
            <div className="mt-8 flex items-center gap-4 text-[9px] uppercase tracking-[0.36em] text-ink/40">
              <span className="h-px w-10 bg-primary/50" />
              Layout Nº 041 · Key frame A
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <motion.div
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.1, ease: [0.2, 0.7, 0.1, 1] }}
              className="relative mx-auto max-w-2xl"
            >
              <div
                ref={frameRef}
                onPointerMove={moveLayers}
                onPointerLeave={resetLayers}
                style={frameStyle}
                className="cel-frame group relative aspect-[4/5] overflow-hidden border border-border bg-background md:aspect-[5/4]"
                aria-label="Layered animation cel portrait of Sawako"
              >
                <img
                  src={sawako}
                  alt="Sawako Kuronuma in an animation cel study"
                  loading="lazy"
                  decoding="async"
                  className="cel-layer cel-layer-color absolute inset-0 h-full w-full object-cover object-top"
                />
                <img
                  src={sawako}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  className="cel-layer cel-layer-ink absolute inset-0 h-full w-full object-cover object-top"
                />

                <div className="cel-layer cel-layer-light pointer-events-none absolute inset-0" aria-hidden />

                <svg viewBox="0 0 600 480" className="cel-layer cel-layer-pencil pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
                  <g fill="none" stroke="currentColor" strokeLinecap="round">
                    <path d="M68 104 C154 58 244 48 326 72" strokeWidth="1.2" strokeDasharray="4 8" />
                    <path d="M405 350 C472 330 522 292 548 234" strokeWidth="1" />
                    <path d="M448 362 C490 356 528 332 553 300" strokeWidth="0.6" />
                    <circle cx="75" cy="78" r="19" strokeWidth="0.8" />
                    <path d="M75 50 V106 M47 78 H103" strokeWidth="0.7" />
                  </g>
                </svg>

                <div className="absolute left-5 top-5 border-l border-t border-ink/35 p-3 text-[8px] uppercase tracking-[0.35em] text-ink/55 md:left-8 md:top-8">
                  KNT · 01<br />
                  C-041 / A
                </div>
                <div className="absolute bottom-5 right-5 text-right md:bottom-8 md:right-8">
                  <div className="text-3xl text-ink/60 md:text-5xl" style={{ fontFamily: "var(--font-jp)" }}>
                    爽子
                  </div>
                  <div className="mt-2 text-[8px] uppercase tracking-[0.42em] text-ink/45">Hold · 12 frames</div>
                </div>

                <div className="cel-glint cel-glint-one" aria-hidden>✦</div>
                <div className="cel-glint cel-glint-two" aria-hidden>✧</div>
              </div>

              <div className="mx-auto flex w-[82%] items-start justify-between border-x border-b border-border bg-background/70 px-4 py-3 text-[8px] uppercase tracking-[0.3em] text-ink/45 backdrop-blur-sm md:px-6">
                <span>Paint · Sakura / Sage</span>
                <span>セル画 · 透明</span>
              </div>
              <div className="mx-auto flex w-28 justify-around border-x border-b border-border bg-background/80 py-2" aria-hidden>
                {[0, 1, 2].map((hole) => (
                  <span key={hole} className="h-2.5 w-5 rounded-full border border-border bg-paper" />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}