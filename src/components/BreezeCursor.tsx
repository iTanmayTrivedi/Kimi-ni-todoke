import { useEffect, useRef } from "react";
import petalImg from "@/assets/petal.png";

export function BreezeCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let last = 0;
    const onMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 6}px, ${e.clientY - 6}px, 0)`;
      }
      const now = performance.now();
      if (now - last < 70 || !trailRef.current) return;
      last = now;
      const p = document.createElement("img");
      p.src = petalImg;
      p.className = "fixed pointer-events-none select-none";
      const size = 14 + Math.random() * 18;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${e.clientX - size / 2}px`;
      p.style.top = `${e.clientY - size / 2}px`;
      p.style.opacity = "0.9";
      p.style.transition = "transform 1.6s cubic-bezier(.2,.7,.1,1), opacity 1.6s ease-out";
      p.style.zIndex = "9998";
      trailRef.current.appendChild(p);
      requestAnimationFrame(() => {
        const dx = (Math.random() - 0.3) * 140;
        const dy = 80 + Math.random() * 120;
        const r = (Math.random() - 0.5) * 360;
        p.style.transform = `translate(${dx}px, ${dy}px) rotate(${r}deg) scale(0.6)`;
        p.style.opacity = "0";
      });
      setTimeout(() => p.remove(), 1700);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div ref={trailRef} aria-hidden className="pointer-events-none fixed inset-0 z-[9998]" />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full mix-blend-multiply"
        style={{ background: "oklch(0.75 0.12 15 / 0.7)", transition: "transform 60ms linear" }}
      />
    </>
  );
}
