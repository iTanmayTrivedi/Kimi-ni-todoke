import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Characters } from "@/components/Characters";
import { Gallery } from "@/components/Gallery";
import { CuratorsNote } from "@/components/CuratorsNote";
import { HaikuInterlude } from "@/components/HaikuInterlude";
import { Marquee } from "@/components/Marquee";
import { Timeline } from "@/components/Timeline";
import { Letters } from "@/components/Letters";
import { Footer } from "@/components/Footer";
import { BreezeCursor } from "@/components/BreezeCursor";
import { Prelude } from "@/components/Prelude";
import { FloatingNav } from "@/components/FloatingNav";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main id="top" className="relative bg-background text-ink">
      <Prelude />
      <BreezeCursor />
      <FloatingNav />
      <div className="paper-grain">
        <Hero />
        <Marquee />
        <Characters />
        <Gallery />
        <CuratorsNote />
        <HaikuInterlude />
        <Timeline />
        <Letters />
        <Footer />
      </div>
    </main>
  );
}
