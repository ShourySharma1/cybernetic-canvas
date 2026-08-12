import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/probe")({
  head: () => ({ meta: [{ title: "Probe" }] }),
  component: ProbePage,
});

function ProbePage() {
  const [n, setN] = useState(0);
  useEffect(() => {
    console.log("PROBE_EFFECT");
    setN(1);
  }, []);
  return <div data-probe={n}>probe {n}</div>;
}
