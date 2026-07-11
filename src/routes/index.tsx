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
import { MangaPanels } from "@/components/MangaPanels";
import { SeasonsDiptych } from "@/components/SeasonsDiptych";
import { Ensemble } from "@/components/Ensemble";
import { KanjiGlossary } from "@/components/KanjiGlossary";
import { ConfessionScene } from "@/components/ConfessionScene";
import { HorizontalCinema } from "@/components/HorizontalCinema";
import { TextMaskReveal } from "@/components/TextMaskReveal";
import { AudioSignature } from "@/components/AudioSignature";
import { Postcards } from "@/components/Postcards";
import { InkConstellation } from "@/components/InkConstellation";

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
        <Ensemble />
        <Gallery />
        <HorizontalCinema />
        <CuratorsNote />
        <MangaPanels />
        <HaikuInterlude />
        <ConfessionScene />
        <SeasonsDiptych />
        <Postcards />
        <Timeline />
        <AudioSignature />
        <KanjiGlossary />
        <TextMaskReveal />
        <Letters />
        <Footer />
      </div>
    </main>
  );
}
