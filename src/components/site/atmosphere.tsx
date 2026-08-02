import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* ---------------- Lenis smooth scroll ---------------- */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let raf = 0;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const instance = new Lenis({ duration: 1.15, smoothWheel: true, lerp: 0.09 });
      lenis = instance;
      const loop = (time: number) => {
        instance.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
  return null;
}

/* ---------------- Scroll progress ---------------- */
export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px]">
      <div
        className="h-full origin-left bg-[linear-gradient(90deg,var(--primary),var(--accent),var(--violet))]"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}

/* ---------------- Custom cursor ---------------- */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const cur = { ...target };
    let raf = 0;

    const move = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = (e.target as HTMLElement)?.closest?.(
        "a,button,[data-cursor='hover'],input,textarea",
      );
      ring.current?.classList.toggle("scale-[2.1]", !!el);
      ring.current?.classList.toggle("bg-primary/20", !!el);
    };

    const loop = () => {
      cur.x += (target.x - cur.x) * 0.16;
      cur.y += (target.y - cur.y) * 0.16;
      if (dot.current)
        dot.current.style.transform = `translate3d(${target.x - 3}px,${target.y - 3}px,0)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${cur.x - 18}px,${cur.y - 18}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] hidden md:block">
      <div
        ref={ring}
        className="absolute top-0 left-0 h-9 w-9 rounded-full border border-primary/60 transition-[transform,background-color,scale] duration-300 ease-out will-change-transform"
      />
      <div ref={dot} className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-accent" />
    </div>
  );
}

/* ---------------- Particle + grid canvas background ---------------- */
export function ParticleField({ className = "" }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = canvas.current;
    if (!cvs) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -999, y: -999 };
    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let pts: P[] = [];

    const resize = () => {
      w = cvs.offsetWidth;
      h = cvs.offsetHeight;
      cvs.width = w * dpr;
      cvs.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.round((w * h) / 18000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.4,
      }));
    };

    const onMove = (e: MouseEvent) => {
      const r = cvs.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        const near = d < 160;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + (near ? 0.8 : 0), 0, Math.PI * 2);
        ctx.fillStyle = near ? "rgba(0,255,136,0.75)" : "rgba(0,212,255,0.42)";
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i]!;
          const b = pts[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);

          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,212,255,${0.13 * (1 - d / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvas} aria-hidden className={`h-full w-full ${className}`} />;
}

/* ---------------- Mouse-follow glow ---------------- */
export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: MouseEvent) => {
      if (ref.current)
        ref.current.style.transform = `translate3d(${e.clientX - 320}px,${e.clientY - 320}px,0)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      aria-hidden
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-0 hidden h-[640px] w-[640px] rounded-full opacity-60 blur-[120px] transition-transform duration-700 ease-out md:block"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--primary) 18%, transparent), transparent 65%)",
      }}
    />
  );
}

/* ---------------- Loading screen ---------------- */
const BOOT = [
  "> initializing secure kernel ......... ok",
  "> mounting /dev/entropy ............. ok",
  "> negotiating tls 1.3 handshake ..... ok",
  "> verifying signature chain ......... ok",
  "> access granted",
];

export function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (reduced) {
      setOpen(false);
      onDone();
      return;
    }
    const started = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - started) / 2400, 1);
      setProgress(Math.round(p * 100));
      setLines(BOOT.slice(0, Math.ceil(p * BOOT.length)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setOpen(false);
          onDone();
        }, 420);
      }
    };
    raf = requestAnimationFrame(tick);
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [onDone, reduced]);

  useEffect(() => {
    if (!open) document.body.style.overflow = "";
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="preloader"
          exit={{ opacity: 0, filter: "blur(14px)" }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <div className="absolute inset-0 cyber-grid opacity-40" />
          <div className="relative w-[min(92vw,560px)] px-2">
            <div className="mb-10 text-center">
              <div className="font-display text-[clamp(1.4rem,4vw,2.2rem)] font-medium tracking-[-0.04em]">
                <span className="text-primary">CSS</span>
                <span className="text-muted-foreground"> // </span>
                CYBER SECURITY SOCIETY
              </div>
            </div>
            <pre className="min-h-[9rem] font-mono text-[11px] leading-6 text-accent/85 md:text-xs">
              {lines.join("\n")}
              <span className="animate-glowpulse">_</span>
            </pre>
            <div className="mt-8 h-px w-full bg-border">
              <div
                className="h-px bg-[linear-gradient(90deg,var(--primary),var(--accent))]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between font-mono text-[11px] text-muted-foreground">
              <span>DECRYPTING SESSION</span>
              <span className="text-primary">{progress}%</span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
