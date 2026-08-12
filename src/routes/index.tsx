import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

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
  console.log("INDEX_RENDER");
  return (
    <>
      <TestProbe />
      {/*<SmoothScroll />*/}
      {/*<ScrollProgress />*/}
      {/*<Cursor />*/}
      {/*<MouseGlow />*/}
      {/*<Nav />*/}
      <main className="relative z-10">{false && (<>
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
      </>)}</main>
      {/*<Footer />*/}
    </>
  );
}

function TestProbe() {
  const [n, setN] = useState(0);
  useEffect(() => { console.log("PROBE_EFFECT"); setN(1); }, []);
  return <div data-probe={n} style={{position:"fixed",zIndex:999}}>probe {n}</div>;
}
