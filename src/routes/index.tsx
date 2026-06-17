import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { ProjectShowcase } from "@/components/portfolio/ProjectShowcase";
import { HorizontalRail } from "@/components/portfolio/HorizontalRail";
import { Experience } from "@/components/portfolio/Experience";
import { About } from "@/components/portfolio/About";
import { Certifications } from "@/components/portfolio/Certifications";
import { Contact } from "@/components/portfolio/Contact";
import { ScrollProgress } from "@/components/portfolio/motion-primitives";
import ogImage from "@/assets/og.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Le Phuoc Sang — AI/ML Engineer" },
      { name: "description", content: "AI/ML Engineer building end-to-end AI solutions and automating workflows. Computer vision, GenAI, time-series and MLOps." },
      { property: "og:title", content: "Le Phuoc Sang — AI/ML Engineer" },
      { property: "og:description", content: "AI/ML Engineer building end-to-end AI solutions and automating workflows." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: ogImage },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <ProjectShowcase />
      <HorizontalRail />
      <Certifications />
      <Contact />
    </main>
  );
}
