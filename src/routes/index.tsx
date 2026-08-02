import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Cursor, MouseGlow, Preloader, ScrollProgress, SmoothScroll } from "@/components/site/atmosphere";
import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { CinematicGallery } from "@/components/site/gallery";
import { About, Conference, Timeline } from "@/components/site/sections-core";
import { Highlights, Speakers, Workshops } from "@/components/site/sections-showcase";
import { Faq, Footer, Join, Sponsors, Testimonials } from "@/components/site/sections-closing";

const title = "Cyber Security Society — Sentinel Summit 2027";
const description =
  "An elite collective of security researchers, engineers and students. Join the society, register for Sentinel Summit 2027, and train with the people defending what matters.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [, setReady] = useState(false);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <MouseGlow />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <CinematicGallery />
        <About />
        <Conference />
        <Highlights />
        <Speakers />
        <Workshops />
        <Timeline />
        <Sponsors />
        <Testimonials />
        <Join />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
