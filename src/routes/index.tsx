import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Characters } from "@/components/Characters";
import { Timeline } from "@/components/Timeline";
import { Letters } from "@/components/Letters";
import { Footer } from "@/components/Footer";
import { BreezeCursor } from "@/components/BreezeCursor";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-background text-ink">
      <BreezeCursor />
      <Hero />
      <Characters />
      <Timeline />
      <Letters />
      <Footer />
    </main>
  );
}
