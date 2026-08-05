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

  useEffect(() => {
    if (!play) return;
    let frame = 0;
    const start = window.setTimeout(() => {
      const id = window.setInterval(() => {
        frame += 1;
        if (frame > 6) {
          setShown(char);
          window.clearInterval(id);
          return;
        }
        setShown(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
      }, 45);
    }, index * 38);
    return () => window.clearTimeout(start);
  }, [play, char, index]);

  return (
    <span
      className="inline-flex h-7 w-[0.72em] items-center justify-center rounded-[2px] text-[13px] tabular-nums md:h-8 md:text-base"
      style={{
        background: "oklch(0.24 0.015 250)",
        color: "oklch(0.93 0.09 90)",
        boxShadow: "inset 0 -1px 0 oklch(0.99 0 0 / 0.12)",
        fontFamily: "var(--font-sans)",
        letterSpacing: "0.02em",
      }}
    >
      {shown === " " ? "\u00A0" : shown}
    </span>
  );
}

function BoardRow({ row, play, offset }: { row: Row; play: boolean; offset: number }) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-white/10 py-4 md:grid-cols-[auto_auto_1fr_auto_auto] md:gap-8">
      <div className="flex gap-[2px]">
        {row.time.split("").map((c, i) => (
          <Flap key={i} char={c} index={offset + i} play={play} />
        ))}
      </div>

      <div
        className="text-2xl md:text-3xl"
        style={{ fontFamily: "var(--font-jp)", color: "oklch(0.9 0.05 90)" }}
      >
        {row.jp}
      </div>

      <div className="flex flex-wrap gap-[2px]">
        {row.dest.split("").map((c, i) => (
          <Flap key={i} char={c} index={offset + 6 + i} play={play} />
        ))}
      </div>

      <div className="hidden text-[9px] uppercase tracking-[0.35em] md:block" style={{ color: "oklch(0.85 0.03 90 / 0.55)" }}>
        {row.note}
      </div>

      <div
        className="flex h-8 w-8 items-center justify-center rounded-full text-[11px]"
        style={{ border: "1px solid oklch(0.9 0.06 90 / 0.4)", color: "oklch(0.92 0.07 90)" }}
      >
        {row.platform}
      </div>
    </div>
  );
}

export function Departures() {
  const ref = useRef<HTMLElement>(null);
  const play = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      id="departures"
      className="chapter-cv relative overflow-hidden py-40"
      style={{ background: "linear-gradient(180deg, oklch(0.24 0.02 260) 0%, oklch(0.18 0.02 265) 100%)" }}
    >
      {/* platform lamp glow */}
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-96 w-[70vw] -translate-x-1/2"
        aria-hidden
        style={{ background: "radial-gradient(ellipse at 50% 0%, oklch(0.85 0.07 90 / 0.16), transparent 70%)" }}
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
          className="rounded-sm p-6 md:p-10"
          style={{
            background: "oklch(0.15 0.02 265)",
            boxShadow: "0 40px 90px -40px oklch(0 0 0 / 0.7), inset 0 1px 0 oklch(0.99 0 0 / 0.06)",
          }}
        >
          <div
            className="mb-4 flex items-center justify-between border-b border-white/15 pb-4 text-[9px] uppercase tracking-[0.4em]"
            style={{ color: "oklch(0.85 0.04 90 / 0.5)" }}
          >
            <span>Time · 時刻</span>
            <span className="hidden md:inline">Destination · 行先</span>
            <span>Track · 番線</span>
          </div>

          {rows.map((r, i) => (
            <BoardRow key={r.time} row={r} play={play} offset={i * 4} />
          ))}

          <div className="mt-6 text-[9px] uppercase tracking-[0.4em]" style={{ color: "oklch(0.85 0.04 90 / 0.4)" }}>
            Mind the gap · 白線の内側までお下がりください
          </div>
        </motion.div>
      </div>
    </section>
  );
}
