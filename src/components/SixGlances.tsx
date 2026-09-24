import { type CSSProperties, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import nightAsset from "@/assets/six-glances-night.jpg.asset.json";
import bloomAsset from "@/assets/six-glances-bloom.jpg.asset.json";
import popAsset from "@/assets/six-glances-pop.jpg.asset.json";
import afterglowAsset from "@/assets/six-glances-afterglow.jpg.asset.json";
import blushAsset from "@/assets/six-glances-blush.jpg.asset.json";
import rainAsset from "@/assets/six-glances-rain.png.asset.json";

const glances = [
  { src: nightAsset.url, jp: "星逢い", title: "Where the night listens", note: "A promise held beneath a thousand quiet stars.", position: "center" },
  { src: bloomAsset.url, jp: "花顔", title: "A smile in bloom", note: "The instant shyness begins to look like courage.", position: "center 34%" },
  { src: popAsset.url, jp: "胸騒ぎ", title: "Heart, suddenly louder", note: "A bright little storm of feelings with nowhere to hide.", position: "center" },
  { src: afterglowAsset.url, jp: "夕映え", title: "Afterglow", note: "Even an ordinary window remembers the light.", position: "center" },
  { src: blushAsset.url, jp: "初恋", title: "The first blush", note: "One look, magnified until it fills the whole world.", position: "center" },
  { src: rainAsset.url, jp: "雨音", title: "Rain between words", note: "What cannot be said still gathers at the eyes.", position: "center" },
] as const;

export function SixGlances() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), {
      rootMargin: "100px",
      threshold: 0.2,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || paused || reducedMotion) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % glances.length), 5200);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, visible]);

  const select = (index: number) => {
    setActive(index);
    setPaused(true);
  };

  const tilt = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType === "touch") return;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    stage.style.setProperty("--glance-x", `${((event.clientX - rect.left) / rect.width - 0.5) * 10}px`);
    stage.style.setProperty("--glance-y", `${((event.clientY - rect.top) / rect.height - 0.5) * 10}px`);
  };

  const resetTilt = () => {
    stageRef.current?.style.setProperty("--glance-x", "0px");
    stageRef.current?.style.setProperty("--glance-y", "0px");
  };

  const current = glances[active];

  return (
    <section ref={sectionRef} id="glances" className="chapter-cv glances-section relative overflow-hidden py-28 md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:pl-32">
        <div className="mb-12 grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="mb-5 flex items-center gap-4 text-[9px] uppercase tracking-[0.42em] text-ink/45">
              <span className="h-px w-10 bg-ink/20" />
              Visual archive · 六景
            </div>
            <h2 className="font-serif text-5xl italic leading-none text-ink md:text-8xl">Six glances.</h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-relaxed text-ink/55 md:col-span-4 md:col-start-9">
            Six frames. Six distances between a feeling and the courage to name it.
          </p>
        </div>

        <div
          ref={stageRef}
          onPointerMove={tilt}
          onPointerLeave={resetTilt}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="glances-stage relative"
          style={{ "--glance-x": "0px", "--glance-y": "0px" } as CSSProperties}
        >
          <div className="glances-frame relative aspect-[4/5] overflow-hidden md:aspect-[16/9]">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.src}
                src={current.src}
                alt={`${current.title} — Kimi ni Todoke anime scene`}
                initial={reducedMotion ? false : { opacity: 0, scale: 1.035, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={reducedMotion ? undefined : { opacity: 0, scale: 0.99, filter: "blur(5px)" }}
                transition={{ duration: 0.8, ease: [0.2, 0.7, 0.1, 1] }}
                style={{ objectPosition: current.position }}
                className="glances-image absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </AnimatePresence>
            <div className="glances-vignette pointer-events-none absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-6 p-6 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.title}
                  initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.55 }}
                >
                  <div className="font-serif text-3xl italic text-paper md:text-6xl">{current.title}</div>
                  <p className="mt-3 max-w-md text-xs font-light leading-relaxed text-paper/75 md:text-sm">{current.note}</p>
                </motion.div>
              </AnimatePresence>
              <div className="shrink-0 text-right text-paper/70">
                <div className="font-serif text-3xl md:text-5xl" style={{ fontFamily: "var(--font-jp)" }}>{current.jp}</div>
                <div className="mt-2 text-[8px] uppercase tracking-[0.35em]">{String(active + 1).padStart(2, "0")} / 06</div>
              </div>
            </div>
          </div>

          <div className="glances-strip mt-5 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3" role="tablist" aria-label="Select an exhibition frame">
            {glances.map((glance, index) => (
              <Button
                key={glance.src}
                type="button"
                variant="ghost"
                role="tab"
                aria-selected={active === index}
                aria-label={`Show frame ${index + 1}: ${glance.title}`}
                title={glance.title}
                onClick={() => select(index)}
                className={`glances-thumb group relative h-auto aspect-[16/9] overflow-hidden rounded-none p-0 ${active === index ? "is-active" : ""}`}
              >
                <img src={glance.src} alt="" aria-hidden loading="lazy" decoding="async" className="h-full w-full object-cover" style={{ objectPosition: glance.position }} />
                <span className="absolute bottom-2 left-2 text-[8px] tracking-[0.25em] text-paper/80">{String(index + 1).padStart(2, "0")}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="glances-index" aria-hidden>一瞬 · 永遠</div>
    </section>
  );
}