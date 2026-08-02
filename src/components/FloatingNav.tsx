import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const chapters = [
  { id: "top", label: "I", name: "Encounter" },
  { id: "characters", label: "II", name: "Portraits" },
  { id: "scenes", label: "III", name: "Scenes" },
  { id: "ame", label: "IV", name: "Ame" },
  { id: "furin", label: "V", name: "Fūrin" },
  { id: "tsukimi", label: "VI", name: "Tsukimi" },
  { id: "timeline", label: "VII", name: "Thread" },
  { id: "letters", label: "VIII", name: "Letters" },


];


export function FloatingNav() {
  const [active, setActive] = useState("top");
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
      let current = "top";
      for (const c of chapters) {
        const el = c.id === "top" ? null : document.getElementById(c.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.4) current = c.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
      >
        <div className="h-full w-full" style={{ background: "linear-gradient(90deg, transparent, oklch(0.7 0.15 15), oklch(0.85 0.08 145), transparent)" }} />
      </motion.div>

      {/* Side chapter rail */}
      <motion.nav
        initial={false}
        animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -20 }}
        transition={{ duration: 0.6 }}
        className="pointer-events-auto fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 lg:block"
        aria-label="Chapter navigation"
      >
        <ul className="flex flex-col gap-6">
          {chapters.map((c) => {
            const on = active === c.id;
            return (
              <li key={c.id}>
                <a
                  href={c.id === "top" ? "#top" : `#${c.id}`}
                  onClick={(e) => {
                    if (c.id === "top") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="group flex items-center gap-4"
                >
                  <span
                    className="block h-px transition-all duration-500"
                    style={{
                      width: on ? 40 : 20,
                      background: on ? "oklch(0.22 0.01 260)" : "oklch(0.22 0.01 260 / 0.3)",
                    }}
                  />
                  <span
                    className="text-[9px] uppercase tracking-[0.4em] transition-colors duration-500"
                    style={{ color: on ? "oklch(0.22 0.01 260)" : "oklch(0.22 0.01 260 / 0.4)" }}
                  >
                    {c.label} · {c.name}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </motion.nav>
    </>
  );
}
