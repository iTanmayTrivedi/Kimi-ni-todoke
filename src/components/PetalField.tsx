import { useEffect, useRef } from "react";

/** Ambient falling petals rendered on a canvas — cheap and smooth. */
export function PetalField({ density = 40, className = "" }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const wind = useRef({ x: 0.3, y: 0 });

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const count = reduced ? 0 : Math.round(density * (window.innerWidth < 768 ? 0.5 : 1));

    const resize = () => {
      c.width = c.offsetWidth * dpr;
      c.height = c.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; s: number; r: number; vr: number; vy: number; a: number };
    const petals: P[] = Array.from({ length: count }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      s: (6 + Math.random() * 10) * dpr,
      r: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.02,
      vy: 0.4 + Math.random() * 0.8,
      a: 0.5 + Math.random() * 0.5,
    }));

    const onMove = (e: MouseEvent) => {
      wind.current.x = ((e.clientX / window.innerWidth) - 0.5) * 2.5;
    };
    window.addEventListener("mousemove", onMove, { passive: true });


    const drawPetal = (p: P) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.globalAlpha = p.a;
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.s);
      g.addColorStop(0, "rgba(255, 220, 230, 0.95)");
      g.addColorStop(1, "rgba(240, 180, 200, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.s * 0.9, p.s * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const p of petals) {
        p.x += (wind.current.x + Math.sin(p.y * 0.005) * 0.5) * dpr;
        p.y += p.vy * dpr;
        p.r += p.vr;
        if (p.y > c.height + 20) { p.y = -20; p.x = Math.random() * c.width; }
        if (p.x > c.width + 20) p.x = -20;
        if (p.x < -20) p.x = c.width + 20;
        drawPetal(p);
      }
      raf = requestAnimationFrame(tick);
    };

    // Only animate while the canvas is actually on screen.
    let running = false;
    const start = () => { if (!running && count) { running = true; tick(); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: "100px" });
    io.observe(c);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [density]);


  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
