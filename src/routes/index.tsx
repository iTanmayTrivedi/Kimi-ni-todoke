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
import { Kintsugi } from "@/components/Kintsugi";
import { Furin } from "@/components/Furin";
import { Tsukimi } from "@/components/Tsukimi";
import { Orizuru } from "@/components/Orizuru";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kimi ni Todoke — A Digital Exhibition in Seventeen Chapters" },
      {
        name: "description",
        content:
          "An immersive watercolour exhibition of Kimi ni Todoke: portraits, projection room, wind chimes, letters untold, and kintsugi — scroll-driven and quietly cinematic.",
      },
      { property: "og:title", content: "Kimi ni Todoke — A Digital Exhibition" },
      {
        property: "og:description",
        content: "Seventeen chapters of watercolour, ink and motion, devoted to the story of Sawako and Kazehaya.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});


function Index() {
  return (
    <main id="top" className="relative overflow-x-clip bg-background text-ink">
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
        <Rain />
        <Furin />

        <Tsukimi />
        <Timeline />


        <AudioSignature />
        <InkConstellation />
        <Kintsugi />
        <KanjiGlossary />
        <TextMaskReveal />
        <Letters />
        <Footer />
      </div>
    </main>
  );
}
