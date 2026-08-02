import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Lock, Terminal } from "lucide-react";
import { MagneticLink, SplitWords } from "./primitives";
import { ParticleField } from "./atmosphere";

const FRAGMENTS = [
  "0xDEADBEEF",
  "AES-256-GCM",
  "sha256:9f2a…",
  "curl -sSL /etc/shadow",
  "nmap -sS -T4",
  "SIGINT::TRACE",
  "rsa-4096",
  "chmod 700 ./root",
];

function Ticker() {
  const items = [
    "SENTINEL SUMMIT 2026",
    "MARCH 12–14",
    "AURORA CONVENTION CENTRE",
    "40 SPEAKERS",
    "6 LIVE TRACKS",
  ];
  return (
    <div className="relative w-full overflow-hidden border-y border-border/70 py-3">
      <div className="flex w-max animate-marquee-slow">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {items.map((t) => (
              <span
                key={`${k}-${t}`}
                className="flex items-center gap-6 px-6 font-mono text-[11px] tracking-[0.24em] text-muted-foreground"
              >
                {t}
                <span className="h-1 w-1 rounded-full bg-primary/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => setMounted(true), []);

  return (
    <div id="top" ref={ref} className="relative min-h-[100svh] w-full overflow-hidden">
      {/* layered background */}
      <div aria-hidden className="absolute inset-0 mesh" />
      <div aria-hidden className="absolute inset-0 cyber-grid opacity-70 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]" />
      <div aria-hidden className="absolute inset-0 noise-overlay" />
      {mounted ? (
        <div aria-hidden className="absolute inset-0 opacity-70">
          <ParticleField />
        </div>
      ) : null}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-[520px] w-[1100px] -translate-x-1/2 rounded-full opacity-40 blur-[140px]"
        style={{
          background:
            "conic-gradient(from 180deg, color-mix(in oklab,var(--primary) 40%,transparent), color-mix(in oklab,var(--violet) 40%,transparent), color-mix(in oklab,var(--accent) 30%,transparent), color-mix(in oklab,var(--primary) 40%,transparent))",
        }}
      />

      {/* floating code fragments */}
      {mounted && !reduced
        ? FRAGMENTS.map((f, i) => (
            <motion.span
              key={f}
              aria-hidden
              className="pointer-events-none absolute hidden font-mono text-[10px] tracking-widest text-primary/25 md:block"
              style={{
                left: `${8 + ((i * 11) % 84)}%`,
                top: `${18 + ((i * 23) % 64)}%`,
              }}
              animate={{ y: [0, -22, 0], opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 9 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
            >
              {f}
            </motion.span>
          ))
        : null}

      <motion.div
        style={reduced ? {} : { y, opacity, scale }}
        className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 pt-32 pb-16 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.6, ease: [0.19, 1, 0.22, 1] }}
          className="glass mb-10 flex items-center gap-3 rounded-full px-4 py-2"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.28em] text-muted-foreground">
            REGISTRATION OPEN — SENTINEL SUMMIT 2026
          </span>
        </motion.div>

        <h1 className="max-w-6xl font-display text-[clamp(2.6rem,10.5vw,9.5rem)] leading-[0.86] font-medium tracking-[-0.05em]">
          <SplitWords text="CYBER SECURITY" delay={2.7} stagger={0.08} />
          <span className="block text-glow text-accent">
            <SplitWords text="SOCIETY" delay={2.9} stagger={0.08} />
          </span>


        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 3.25, ease: [0.19, 1, 0.22, 1] }}
          className="mt-8 max-w-xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Securing tomorrow. Empowering innovators. A collective of researchers,
          builders and defenders advancing the practice of security.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.45, ease: [0.19, 1, 0.22, 1] }}
          className="mt-11 flex flex-col items-center gap-3 sm:flex-row"
        >
          <MagneticLink href="#join">
            <Lock className="h-4 w-4" /> Join Society
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </MagneticLink>
          <MagneticLink href="#conference" variant="ghost">
            <Terminal className="h-4 w-4 text-accent" /> Register Conference
          </MagneticLink>
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <Ticker />
      </div>
    </div>
  );
}
