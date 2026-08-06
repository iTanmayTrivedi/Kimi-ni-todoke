import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// 発車標 — Hassha-hyō. The split-flap departure board on a rural station
// platform. Each row is a season of the story, "departing" for somewhere
// gentler. Letters flip in on stagger; nothing animates off-screen.

type Row = {
  time: string;
  jp: string;
  dest: string;
  platform: string;
  note: string;
};

const rows: Row[] = [
  { time: "07:12", jp: "春", dest: "FIRST MORNING", platform: "1", note: "local · all stops" },
  { time: "09:40", jp: "教室", dest: "CLASSROOM LIGHT", platform: "1", note: "delayed · 3 min" },
  { time: "13:05", jp: "友", dest: "TWO NEW NAMES", platform: "2", note: "limited express" },
  { time: "17:33", jp: "夕", dest: "GOLDEN HOUR", platform: "2", note: "on time" },
  { time: "20:18", jp: "花火", dest: "FIREWORKS BRIDGE", platform: "3", note: "seasonal service" },
  { time: "23:59", jp: "冬", dest: "SNOW, THEN SPRING", platform: "1", note: "last train" },
];

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ,·";

function Flap({ char, index, play }: { char: string; index: number; play: boolean }) {
  const [shown, setShown] = useState(" ");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!play) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(char);
      return;
    }
    let frame = 0;
    let id = 0;
    const start = window.setTimeout(() => {
      id = window.setInterval(() => {
        frame += 1;
        setTick((t) => t + 1);
        if (frame > 7) {
          setShown(char);
          window.clearInterval(id);
          return;
        }
        setShown(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
      }, 42);
    }, index * 34);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(id);
    };
  }, [play, char, index]);

  const settled = shown === char;

  return (
    <span
      className="relative inline-flex h-7 w-[0.72em] items-center justify-center overflow-hidden rounded-[2px] text-[13px] tabular-nums md:h-8 md:text-base"
      style={{
        background: "linear-gradient(180deg, oklch(0.27 0.015 250) 0%, oklch(0.27 0.015 250) 49%, oklch(0.2 0.015 250) 51%, oklch(0.22 0.015 250) 100%)",
        color: "oklch(0.93 0.09 90)",
        textShadow: settled ? "0 0 10px oklch(0.9 0.12 90 / 0.45)" : "none",
        boxShadow:
          "inset 0 1px 0 oklch(0.99 0 0 / 0.09), inset 0 -1px 0 oklch(0 0 0 / 0.5), 0 1px 2px oklch(0 0 0 / 0.4)",
        fontFamily: "var(--font-sans)",
        letterSpacing: "0.02em",
        transform: settled ? "none" : `translateY(${tick % 2 ? -0.5 : 0.5}px)`,
        transition: "text-shadow 400ms ease-out",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-1/2 h-[1px]"
        style={{ background: "oklch(0 0 0 / 0.55)" }}
      />
      {shown === " " ? "\u00A0" : shown}
    </span>
  );
}

function BoardRow({ row, play, offset, i }: { row: Row; play: boolean; offset: number; i: number }) {
  const last = i === rows.length - 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={play ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.25 + i * 0.09, duration: 0.7, ease: [0.2, 0.7, 0.1, 1] }}
      className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-white/10 py-4 transition-colors duration-500 md:grid-cols-[auto_auto_1fr_auto_auto] md:gap-8"
    >
      {/* rail highlight on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-4 inset-y-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "linear-gradient(90deg, oklch(0.85 0.07 90 / 0.08), transparent 70%)" }}
      />

      <div className="relative flex gap-[2px]">
        {row.time.split("").map((c, k) => (
          <Flap key={k} char={c} index={offset + k} play={play} />
        ))}
      </div>

      <div
        className="relative text-2xl transition-transform duration-500 group-hover:-translate-y-[2px] md:text-3xl"
        style={{
          fontFamily: "var(--font-jp)",
          color: "oklch(0.9 0.05 90)",
          textShadow: "0 0 18px oklch(0.85 0.08 90 / 0.35)",
        }}
      >
        {row.jp}
      </div>

      <div className="relative flex flex-wrap gap-[2px]">
        {row.dest.split("").map((c, k) => (
          <Flap key={k} char={c} index={offset + 6 + k} play={play} />
        ))}
      </div>

      <div
        className="relative hidden items-center gap-2 text-[9px] uppercase tracking-[0.35em] md:flex"
        style={{ color: "oklch(0.85 0.03 90 / 0.55)" }}
      >
        {last && (
          <span
            className="inline-block h-[5px] w-[5px] rounded-full"
            style={{ background: "oklch(0.85 0.13 45)", boxShadow: "0 0 8px oklch(0.85 0.13 45)", animation: "dep-blink 1.6s ease-in-out infinite" }}
          />
        )}
        {row.note}
      </div>

      <div
        className="relative flex h-8 w-8 items-center justify-center rounded-full text-[11px] transition-shadow duration-500 group-hover:shadow-[0_0_16px_oklch(0.9_0.08_90/0.35)]"
        style={{ border: "1px solid oklch(0.9 0.06 90 / 0.4)", color: "oklch(0.92 0.07 90)" }}
      >
        {row.platform}
      </div>
    </motion.div>
  );
}

export function Departures() {
  const ref = useRef<HTMLElement>(null);
  const play = useInView(ref, { once: true, margin: "-15%" });
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-GB", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setClock(fmt());
    const id = window.setInterval(() => setClock(fmt()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      id="departures"
      className="chapter-cv relative overflow-hidden py-40"
      style={{ background: "linear-gradient(180deg, oklch(0.24 0.02 260) 0%, oklch(0.18 0.02 265) 100%)" }}
    >
      <style>{`
        @keyframes dep-blink { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes dep-drift { 0%{transform:translateX(-4%)} 100%{transform:translateX(4%)} }
        @media (prefers-reduced-motion: reduce) {
          [data-dep-anim] { animation: none !important; }
        }
      `}</style>

      {/* platform lamp glow */}
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-96 w-[70vw] -translate-x-1/2"
        aria-hidden
        data-dep-anim
        style={{
          background: "radial-gradient(ellipse at 50% 0%, oklch(0.85 0.07 90 / 0.18), transparent 70%)",
          animation: "dep-drift 22s ease-in-out infinite alternate",
        }}
      />

      {/* distant track haze */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56"
        aria-hidden
        style={{ background: "linear-gradient(0deg, oklch(0.85 0.05 90 / 0.07), transparent)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:pl-32">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 text-[10px] uppercase tracking-[0.5em]" style={{ color: "oklch(0.85 0.04 90 / 0.6)" }}>
              Chapter · 発車標 · Departures
            </div>
            <h2 className="font-serif text-5xl italic leading-[1.02] md:text-7xl" style={{ color: "oklch(0.96 0.02 90)" }}>
              Every season
              <br />
              <span style={{ color: "oklch(0.96 0.02 90 / 0.45)" }}>leaves from platform one.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm font-light leading-relaxed" style={{ color: "oklch(0.9 0.02 90 / 0.6)" }}>
            六本の列車。The board clatters over, and a year of small courage is announced like a timetable.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={play ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.1, 1] }}
          className="relative overflow-hidden rounded-sm p-6 md:p-10"
          style={{
            background: "linear-gradient(180deg, oklch(0.17 0.02 265) 0%, oklch(0.13 0.02 265) 100%)",
            boxShadow:
              "0 50px 110px -45px oklch(0 0 0 / 0.75), inset 0 1px 0 oklch(0.99 0 0 / 0.07), inset 0 0 0 1px oklch(0.85 0.05 90 / 0.06)",
          }}
        >
          {/* scanlines + vignette for the enclosure glass */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
            style={{
              backgroundImage: "repeating-linear-gradient(180deg, oklch(0.99 0 0 / 0.5) 0 1px, transparent 1px 3px)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 50% 0%, transparent 45%, oklch(0 0 0 / 0.45) 100%)" }}
          />

          <div
            className="relative mb-4 flex items-center justify-between gap-4 border-b border-white/15 pb-4 text-[9px] uppercase tracking-[0.4em]"
            style={{ color: "oklch(0.85 0.04 90 / 0.55)" }}
          >
            <span>Time · 時刻</span>
            <span className="hidden md:inline">Destination · 行先</span>
            <span className="flex items-center gap-3">
              <span
                className="tabular-nums"
                style={{ color: "oklch(0.93 0.09 90)", textShadow: "0 0 10px oklch(0.9 0.12 90 / 0.4)" }}
              >
                {clock}
              </span>
              <span>Track · 番線</span>
            </span>
          </div>

          <div className="relative">
            {rows.map((r, i) => (
              <BoardRow key={r.time} row={r} play={play} offset={i * 4} i={i} />
            ))}
          </div>

          <div
            className="relative mt-6 flex flex-wrap items-center justify-between gap-3 text-[9px] uppercase tracking-[0.4em]"
            style={{ color: "oklch(0.85 0.04 90 / 0.42)" }}
          >
            <span>Mind the gap · 白線の内側までお下がりください</span>
            <span>Kitahoro Line · 北保呂線</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
